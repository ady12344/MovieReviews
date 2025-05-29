(function loadMovies() {
    console.log("showMovies.js running");

    const container = document.getElementById('movieContainer');
    if (!container) {
        console.error("#movieContainer not found");
        return;
    }

    fetch('/api/v1/getAllMovies')
        .then(response => {
            if (!response.ok) throw new Error("API call failed");
            return response.json();
        })
        .then(data => {
            container.innerHTML = '';

            if (data.length === 0) {
                container.innerHTML = '<p class="text-muted">No movies available.</p>';
                return;
            }

            data.forEach(movie => {
                const col = document.createElement('div');
                col.className = 'col-md-3';

                col.innerHTML = `
                    <div class="card h-100 shadow-sm movie-card" data-id="${movie.id}" style="cursor: pointer;">
                        <img src="${movie.cover_url}" class="card-img-top" alt="${movie.title}" style="height: 300px; object-fit: cover;">
                        <div class="card-body">
                            <h5 class="card-title">${movie.title}</h5>
                            <p class="card-text"><strong>Author:</strong> ${movie.author}</p>
                            <p class="card-text"><strong>Rating:</strong> ⭐ ${movie.rating}</p>
                        </div>
                    </div>
                `;

                container.appendChild(col);

                // Click handler: load movie.html and inject the movie details
                col.querySelector('.movie-card').addEventListener('click', function () {
                    const id = this.getAttribute('data-id');

                    fetch('movie.html')
                        .then(res => res.text())
                        .then(html => {
                            document.getElementById('content').innerHTML = html;

                            // After movie.html content is injected, load the script
                            const script = document.createElement('script');
                            script.src = 'scripts/movieDetail.js';
                            script.onload = () => loadMovieDetail(id); // call function with ID
                            document.body.appendChild(script);
                        })
                        .catch(err => {
                            console.error("Failed to load movie.html:", err);
                        });
                });
            });
        })
        .catch(error => {
            console.error('Fetch error:', error);
            container.innerHTML = '<p class="text-danger">Could not load movies.</p>';
        });
})();
