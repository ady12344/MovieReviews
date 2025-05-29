(function loadMovies() {
    console.log("loadMovies.js running");

    const container = document.getElementById('movieContainer');
    if (!container) {
        console.error(" #movieContainer not found");
        return;
    }

    // Function to load movies based on genre
    function filterMoviesByGenre() {
        const selectedGenre = document.getElementById('genreSelect').value;

        // Fetch movies from the API based on selected genre
        const url = selectedGenre
            ? `/api/v1/getMoviesByGenre?genre=${selectedGenre}`
            : '/api/v1/getAllMovies'; // Default to all movies if no genre is selected

        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error("API call failed");
                return response.json();
            })
            .then(data => {
                console.log("Movies received:", data);
                container.innerHTML = '';

                if (data.length === 0) {
                    container.innerHTML = '<p class="text-muted">No movies available.</p>';
                    return;
                }

                data.forEach(movie => {
                    const col = document.createElement('div');
                    col.className = 'col-md-3';

                    col.innerHTML = `
                        <div class="card h-100 shadow-sm">
                            <img src="${movie.cover_url}" class="card-img-top" alt="${movie.title}" style="height: 300px; object-fit: cover;">
                            <div class="card-body">
                                <h5 class="card-title">${movie.title}</h5>
                                <p class="card-text"><strong>Author:</strong> ${movie.author}</p>
                                <p class="card-text"><strong>Rating:</strong> ⭐ ${movie.rating}</p>
                            </div>
                        </div>
                    `;
                    container.appendChild(col);
                });
            })
            .catch(error => {
                console.error('Fetch error:', error);
                container.innerHTML = '<p class="text-danger">Could not load movies.</p>';
            });
    }

    // Initialize movies when page loads (in case there's no genre selected)
    filterMoviesByGenre();

    // Bind the filterMoviesByGenre function to the dropdown change event
    document.getElementById('genreSelect').addEventListener('change', filterMoviesByGenre);
})();
