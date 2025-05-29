// movieDetail.js

// Load movie details by ID
window.loadMovieDetailSPA = function(id) {
    const listSection = document.getElementById('movieListSection');
    const detailSection = document.getElementById('movieDetailSection');
    const detailContainer = document.getElementById('movieDetail');

    if (!id || !detailSection || !detailContainer) return;

    // Hide movie list, show detail
    if (listSection) listSection.style.display = 'none';
    detailSection.style.display = 'block';
    detailSection.style.minHeight = "100vh";
    detailSection.style.paddingTop = "40px";
    detailSection.style.paddingBottom = "40px";

    detailContainer.innerHTML = '<p class="text-white">Loading...</p>';

    // Use query param endpoint
    fetch(`/api/v1/getMovieById?id=${id}`)
        .then(res => {
            if (!res.ok) throw new Error("Movie not found");
            return res.json();
        })
        .then(movie => {
            detailContainer.innerHTML = `
                <button class="btn btn-sm btn-warning mb-4" id="backToList">← Back to List</button>
                <div class="card mx-auto p-4 shadow-lg text-white" style="max-width: 900px; background-color: rgba(0, 0, 0, 0.85); border: none;">
                    <div class="row g-4 align-items-start">
                        <div class="col-md-4 text-center">
                            <img src="${movie.cover_url}" class="img-fluid rounded" alt="${movie.title}">
                            <div class="mt-4 text-start">
                                <p><strong style="color: orange;">Genre:</strong> ${movie.genre}</p>
                                <p><strong style="color: orange;">Rating:</strong> ⭐ ${movie.rating}</p>
                                <p><strong style="color: orange;">Director:</strong> ${movie.author}</p>
                                <p><strong style="color: orange;">Released:</strong> ${movie.release_date}</p>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <h2 class="fw-bold" style="color: orange;">${movie.title}</h2>
                            <hr class="bg-light">
                            <p class="card-text mt-3 text-white">${movie.description}</p>
                        </div>
                    </div>
                </div>
            `;
        })
        .catch(() => {
            detailContainer.innerHTML = '<p class="text-danger">Could not load movie details.</p>';
        });
};

// Handle "Back to List" button
document.body.addEventListener("click", function (e) {
    if (e.target && e.target.id === "backToList") {
        const listSection = document.getElementById('movieListSection');
        const detailSection = document.getElementById('movieDetailSection');

        if (listSection && detailSection) {
            detailSection.style.display = "none";
            detailSection.style.minHeight = "";
            detailSection.style.paddingTop = "";
            detailSection.style.paddingBottom = "";

            listSection.style.display = "block";

            if (typeof window.fetchAndShowMovies === 'function') {
                window.fetchAndShowMovies(0); // Re-load first page of movie list
            }
        }
    }
});
