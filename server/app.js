import express from 'express'
import Movie from '../models/Movie.js'

const app = express()

app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
  res.render('index', {
    title: 'Home',
    genres: Movie.allowedGenres,
    query: req.query,
    movies: await Movie.findAll(req.query)
  })
})

app.get('/reviews/:movieId', async (req, res) => {
  const { movieId } = req.params
  const movie = await Movie.findById(movieId)
  const reviews = await Movie.findReviews(movieId)
  res.render('reviews/index', {
    title: 'Reviews',
    movie,
    reviews
  })
})

app.use(express.static('public'))

export default app
