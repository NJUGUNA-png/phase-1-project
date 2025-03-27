document.addEventListener('DOMContentLoaded', () => {
    const moviesContainer = document.getElementById('movies-container');
    const searchInput = document.getElementById('search-input');
    const genreFilter = document.getElementById('genre-filter');
    const searchBtn = document.getElementById('search-btn');
    const addMovieBtn = document.getElementById('add-movie-btn');
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close-btn');
    const movieForm = document.getElementById('movie-form');
    const modalTitle = document.getElementById('modal-title');
    const movieIdField = document.getElementById('movie-id');
    const titleField = document.getElementById('title');
    const directorField = document.getElementById('director');
    const yearField = document.getElementById('year');
    const genreField = document.getElementById('genre');
    const ratingField = document.getElementById('rating');
    const posterField = document.getElementById('poster');

    const API_URL='http://localhost:3000/movies'

    let isEditMode = false;

    async function fetchMovies() {
        try {
            const response = await fetch(API_URL);
            const movies = await response.json();
            displayMovies(movies);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    }


    });
