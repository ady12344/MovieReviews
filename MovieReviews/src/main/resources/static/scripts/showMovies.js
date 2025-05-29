(function loadMovies() {
    const container = document.getElementById('movieContainer');
    const paginationContainer = document.getElementById('paginationContainer');
    const genreSelect = document.getElementById('genreSelect');
    let currentPage = 0;
    let selectedGenre = '';
    const pageSize = 8;

    function filterMoviesByGenre(page = 0) {
        selectedGenre = genreSelect.value;
        currentPage = page;

        const url = selectedGenre
            ? `/api/v1/getMoviesByGenre?genre=${selectedGenre}&page=${currentPage}&size=${pageSize}`
            : `/api/v1/getAllMovies?page=${currentPage}&size=${pageSize}`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                container.innerHTML = '';
                if (!data.content.length) {
                    container.innerHTML = '<p class="text-muted">No movies available.</p>';
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

                updatePagination(data.totalPages);
            })
            .catch(err => {
                console.error(err);
                container.innerHTML = '<p class="text-danger">Failed to load movies.</p>';
            });
    }

    function updatePagination(totalPages) {
        paginationContainer.innerHTML = '';
        if (totalPages <= 1) return;

        function createPageButton(pageNum, label = null) {
            const btn = document.createElement('button');
            btn.className = 'btn btn-secondary mx-1';
            btn.textContent = label ?? (pageNum + 1);
            btn.onclick = () => filterMoviesByGenre(pageNum);
            if (pageNum === currentPage) btn.classList.add('active');
            return btn;
        }

        function addEllipsis() {
            const span = document.createElement('span');
            span.textContent = '...';
            span.className = 'mx-2 text-muted';
            paginationContainer.appendChild(span);
        }

        const maxVisible = 5; // pages shown around current one (e.g. 2 before and after)
        const sideCount = Math.floor(maxVisible / 2);

        const start = Math.max(1, currentPage - sideCount);
        const end = Math.min(totalPages - 2, currentPage + sideCount);

        // Always show first page
        paginationContainer.appendChild(createPageButton(0));

        if (start > 1) addEllipsis();

        for (let i = start; i <= end; i++) {
            paginationContainer.appendChild(createPageButton(i));
        }

        if (end < totalPages - 2) addEllipsis();

        // Always show last page
        paginationContainer.appendChild(createPageButton(totalPages - 1));
    }

    genreSelect?.addEventListener('change', () => {
        currentPage = 0;
        filterMoviesByGenre();
    });

    if (container) filterMoviesByGenre();
})();
