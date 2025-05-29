(function loadMovies() {
    console.log("loadMovies.js running");

    const container = document.getElementById('movieContainer');
    const paginationContainer = document.getElementById('paginationContainer');
    const genreSelect = document.getElementById('genreSelect');
    let currentPage = 0;
    let selectedGenre = '';
    const pageSize = 12;  // Increase the page size to 20

    if (!container) {
        console.error(" #movieContainer not found");
        return;
    }

    // Function to load movies based on genre and page
    function filterMoviesByGenre(page = 0) {
        selectedGenre = genreSelect.value; // Get selected genre
        currentPage = page;

        // Determine the API URL based on genre and pagination
        const url = selectedGenre && selectedGenre !== ""
            ? `/api/v1/getMoviesByGenre?genre=${selectedGenre}&page=${currentPage}&size=${pageSize}`
            : `/api/v1/getAllMovies?page=${currentPage}&size=${pageSize}`;  // Use pageSize (20)

        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error("API call failed");
                return response.json();
            })
            .then(data => {
                console.log("Movies received:", data);
                container.innerHTML = '';

                if (data.content.length === 0) {
                    container.innerHTML = '<p class="text-muted">No movies available.</p>';
                    return;
                }

                // Render movie cards
                data.content.forEach(movie => {
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

                // Update pagination
                updatePagination(data.totalPages, data.totalElements);
            })
            .catch(error => {
                console.error('Fetch error:', error);
                container.innerHTML = '<p class="text-danger">Could not load movies.</p>';
            });
    }

    // Function to update pagination UI
    function updatePagination(totalPages, totalElements) {
        paginationContainer.innerHTML = '';

        // Only show pagination if there are multiple pages
        if (totalPages > 1) {
            const prevButton = document.createElement('button');
            prevButton.className = 'btn btn-secondary mx-1';
            prevButton.innerHTML = 'Previous';
            prevButton.onclick = () => loadPage(currentPage - 1);
            prevButton.disabled = currentPage <= 0;
            paginationContainer.appendChild(prevButton);

            // Create page buttons (1, 2, 3, ...)
            for (let i = 0; i < totalPages; i++) {
                const button = document.createElement('button');
                button.className = 'btn btn-secondary mx-1';
                button.innerHTML = i + 1;
                button.onclick = () => loadPage(i);
                button.classList.toggle('active', i === currentPage); // Highlight active page
                paginationContainer.appendChild(button);
            }

            const nextButton = document.createElement('button');
            nextButton.className = 'btn btn-secondary mx-1';
            nextButton.innerHTML = 'Next';
            nextButton.onclick = () => loadPage(currentPage + 1);
            nextButton.disabled = currentPage >= totalPages - 1;
            paginationContainer.appendChild(nextButton);
        }
    }

    // Function to load a specific page
    function loadPage(page) {
        if (page < 0 || page >= 5) return;  // Make sure page is within range
        filterMoviesByGenre(page);
    }

    // Initialize the movie list on page load
    filterMoviesByGenre();

    // Event listener for genre selection change
    genreSelect.addEventListener('change', () => {
        currentPage = 0; // Reset to page 0 when the genre changes
        filterMoviesByGenre();
    });

})();
