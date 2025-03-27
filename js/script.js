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
    
    function openAddMovieModal() {
        isEditMode = false;
        modalTitle.textContent = 'Add New Movie';
        movieForm.reset();
        movieIdField.value = '';
        modal.style.display = 'block';
    }
    
    function openEditMovieModal(movie) {
        isEditMode = true;
        modalTitle.textContent = 'Edit Movie';
        movieIdField.value = movie.id;
        titleField.value = movie.title;
        directorField.value = movie.director;
        yearField.value = movie.year;
        genreField.value = movie.genre;
        ratingField.value = movie.rating || '';
        posterField.value = movie.poster || '';
        modal.style.display = 'block';
    }
    
    function closeModal() {
        modal.style.display = 'none';
    }
    
    async function editMovie(movieId) {
        try {
            const response = await fetch(`${API_URL}/${movieId}`);
            const movie = await response.json();
            openEditMovieModal(movie);
        } catch (error) {
            console.error('Error fetching movie for edit:', error);
            alert('Failed to fetch movie details. Please try again.');
        }
    }
    
    async function deleteMovie(movieId) {
        if (confirm('Are you sure you want to delete this movie?')) {
            try {
                await fetch(`${API_URL}/${movieId}`, {
                    method: 'DELETE'
                });
                fetchMovies();
                alert('Movie deleted successfully!');
            } catch (error) {
                console.error('Error deleting movie:', error);
                alert('Failed to delete movie. Please try again.');
            }
        }
    }
    
    async function handleFormSubmit(e) {
        e.preventDefault();
        
        
        if (!titleField.value || !directorField.value || !yearField.value || !genreField.value) {
            alert('Please fill in all required fields.');
            return;
        }
        
        const movieData = {
            title: titleField.value,
            director: directorField.value,
            year: yearField.value,
            genre: genreField.value,
            rating: ratingField.value ? parseFloat(ratingField.value) : null,
            poster: posterField.value || null
        };
        
        try {
            if (isEditMode) {
            
                await fetch(`${API_URL}/${movieIdField.value}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(movieData)
                });
                alert('Movie updated successfully!');
            } else {
                
                await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(movieData)
                });
                alert('Movie added successfully!');
            }
            
            closeModal();
            fetchMovies();
        } catch (error) {
            console.error('Error saving movie:', error);
            alert('Failed to save movie. Please try again.');
        }
    }
    
    async function filterMovies() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const genre = genreFilter.value;
        
        try {
            const response = await fetch(API_URL);
            let movies = await response.json();
            
            
            if (searchTerm) {
                movies = movies.filter(movie => 
                    movie.title.toLowerCase().includes(searchTerm) || 
                    movie.director.toLowerCase().includes(searchTerm)
                );
            }
            
            if (genre) {
                movies = movies.filter(movie => movie.genre === genre);
            }
            
            displayMovies(movies);
        } catch (error) {
            console.error('Error filtering movies:', error);
            alert('Failed to filter movies. Please try again.');
        }
    }
    
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
});