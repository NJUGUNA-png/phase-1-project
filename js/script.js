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
    
    const API_URL = 'http://localhost:3000/movies';
    
    let isEditMode = false;
    
    
    addMovieBtn.addEventListener('click', openAddMovieModal);
    closeBtn.addEventListener('click', closeModal);
    movieForm.addEventListener('submit', handleFormSubmit);
    searchBtn.addEventListener('click', filterMovies);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') filterMovies();
    });
    genreFilter.addEventListener('change', filterMovies);
    
});