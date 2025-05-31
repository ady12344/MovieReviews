(function () {
    const searchInput = document.getElementById('searchInput');
    const genreSelect = document.getElementById('genreSelect');
    const container = document.getElementById('movieContainer');
    const paginationContainer = document.getElementById('paginationContainer');

    let currentPage = 0;
    const pageSize = 8;
    let debounceTimeout = null;

    function fetchSearchResults(query, page = 0) {
        const url = `/api/v1/searchMoviesByTitle?title=${encodeURIComponent(query)}&page=${page}&size=${pageSize}`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                container.innerHTML = '';
                paginationContainer.innerHTML = '';

                if (!data.content?.length) {
                    container.innerHTML = '<p class="text-muted">No movies found.</p>';
                    return;
                }

                data.content.forEach(movie => {
                    const col = document.createElement('div');
                    col.className = 'col-md-3 mb-4';
                    col.innerHTML = `
                        <div class="card h-100 shadow-sm" style="cursor: pointer;" onclick="loadMovieDetailSPA(${movie.id})">
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

                updateSearchPagination(data.totalPages, page, query);
            })
            .catch(err => {
                console.error('Error during search:', err);
                container.innerHTML = '<p class="text-danger">Search failed.</p>';
            });
    }

    function updateSearchPagination(totalPages, current, query) {
        paginationContainer.innerHTML = '';
        if (totalPages <= 1) return;

        for (let i = 0; i < totalPages; i++) {
            const btn = document.createElement('button');
            btn.className = 'pagination-btn mx-1';
            btn.textContent = i + 1;
            if (i === current) btn.classList.add('active');
            btn.onclick = () => fetchSearchResults(query, i);
            paginationContainer.appendChild(btn);
        }
    }

    searchInput?.addEventListener('input', () => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            const query = searchInput.value.trim();
            currentPage = 0;

            if (query === '') {
                const event = new Event('change');
                genreSelect.dispatchEvent(event);
                return;
            }

            fetchSearchResults(query, currentPage);
        }, 400);
    });
})();
