import express from 'express'
import Movie from '../models/Movie.js'

const app = express()
app.use(express.urlencoded({ extended: true }))

// TODO: add your endpoints here
app.use(express.static('public'))
app.use(express.json())
app.set('views', 'views')
app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
    const movies = await Movie.findAll();
    const genres = Movie.allowedGenres

    res.render('index', { movies, genres })

})

app.get('/movie/:movieId', async (req, res) => {
    const movieId = req.params.movieId
    const movie = await Movie.findById(movieId)
    const reviews = await Movie.findReviews(movieId)

    res.render('movie', { movie, reviews })
})

app.post('/movies/:movieId/reviews', async (req, res) => {
    const movieId = req.params.movieId
    const review = req.body
    await Movie.addReview(movieId, review)
    res.redirect(`/movies/${movieId}`)
})

export default app
