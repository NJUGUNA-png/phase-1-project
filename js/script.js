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

    fetchMovies();
    
    async function fetchMovies() {
        try {
            const response = await fetch(API_URL);
            const movies = await response.json();
            displayMovies(movies);
        } catch (error) {
            console.error('Error fetching movies:', error);
            alert('Failed to fetch movies. Please check your connection.');
        }
    }
    
    function displayMovies(movies) {
        moviesContainer.innerHTML = '';
        
        if (movies.length === 0) {
            moviesContainer.innerHTML = '<p class="no-movies">No movies found. Add some to your collection!</p>';
            return;
        }
        
        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
            
            const posterUrl = movie.poster || 'https://via.placeholder.com/300x450?text=No+Poster';
            
            movieCard.innerHTML = `
                <div class="movie-poster" style="background-image: url('${posterUrl}')"></div>
                <div class="movie-info">
                    <h3>${movie.title}</h3>
                    <p><strong>Director:</strong> ${movie.director}</p>
                    <div class="movie-meta">
                        <span><strong>Year:</strong> ${movie.year}</span>
                        <span class="rating"><strong>Rating:</strong> ${movie.rating || 'N/A'}</span>
                    </div>
                    <span class="genre-tag">${movie.genre}</span>
                    <div class="movie-actions">
                        <button class="action-btn edit-btn" data-id="${movie.id}">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="action-btn delete-btn" data-id="${movie.id}">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            `;
            
            moviesContainer.appendChild(movieCard);
        });
        
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const movieId = e.target.closest('.edit-btn').getAttribute('data-id');
                editMovie(movieId);
            });
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const movieId = e.target.closest('.delete-btn').getAttribute('data-id');
                deleteMovie(movieId);
            });
        });
    }
    
    
});