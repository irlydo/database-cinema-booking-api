const express = require('express');
const router = express.Router();
const MovieDomain = require('../domains/movies');
const movieDomain = new MovieDomain();

// GET /movies - Get all movies
router.get('/', async (req, res) => {
    try {
        const movies = await movieDomain.getAllMovies();
        res.status(200).json({ movies });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /movies - Add a new movie
router.post('/', async (req, res) => {
    try {
        const { title, runtimeMins, screenings } = req.body;
        const newMovie = await movieDomain.addMovie(title, runtimeMins, screenings);
        res.status(201).json({ movie: newMovie });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /movies/:id - Get a movie by id
router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const movie = await movieDomain.getMovieById(id);
        if (movie) {
            res.status(200).json({ movie });
        } else {
            res.status(404).json({ message: 'Movie not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /movies/:id - Update a movie by id
router.put('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { title, runtimeMins } = req.body;
        const updatedMovie = await movieDomain.updateMovie(id, title, runtimeMins);
        if (updatedMovie) {
            res.status(201).json({ movie: updatedMovie });
        } else {
            res.status(404).json({ message: 'Movie not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;