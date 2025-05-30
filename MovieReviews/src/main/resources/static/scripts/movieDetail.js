// movieDetail.js

window.loadMovieDetailSPA = function(id) {
    const listSection = document.getElementById('movieListSection');
    const detailSection = document.getElementById('movieDetailSection');
    const detailContainer = document.getElementById('movieDetail');

    if (!id || !detailSection || !detailContainer) return;

    if (listSection) listSection.style.display = 'none';
    detailSection.style.display = 'block';
    detailSection.style.minHeight = "100vh";
    detailSection.style.paddingTop = "40px";
    detailSection.style.paddingBottom = "40px";
    detailSection.style.backgroundColor = "rgba(0, 0, 0, 0.8)";

    detailContainer.innerHTML = '<p class="text-white">Loading...</p>';

    fetch(`/api/v1/getMovieById?id=${id}`)
        .then(res => {
            if (!res.ok) throw new Error("Movie not found");
            return res.json();
        })
        .then(movie => {
            detailContainer.innerHTML = `
                <button onclick="goBack()" class="btn text-white mb-4" style="background-color: orange; font-weight: bold;">
                    ← Back
                </button>

                <div class="container p-4 rounded" style="background-color: rgba(0, 0, 0, 0.6);">
                    <div class="row mb-4">
                        <div class="col-md-4 text-center">
                            <img src="${movie.cover_url}" alt="${movie.title} Cover" class="img-fluid rounded shadow-sm" style="width: 290px; height: auto;" />
                        </div>
                        <div class="col-md-8">
                            <h2 class="fw-bold" style="color: orange;">${movie.title}</h2>
                            <p class="text-white">${movie.description}</p>
                        </div>
                    </div>

                    <form id="reviewForm" class="mb-5">
                        <div class="mb-3">
                            <label for="comment" class="form-label text-warning fw-bold">Your Comment</label>
                            <textarea id="comment" class="form-control" placeholder="Write your comment..."></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="rating" class="form-label text-warning fw-bold">Rating</label>
                            <select id="rating" class="form-select">
                                <option value="" disabled selected>Select a rating</option>
                                <option value="1">⭐ - Very Bad</option>
                                <option value="2">⭐⭐ - Bad</option>
                                <option value="3">⭐⭐⭐ - Average</option>
                                <option value="4">⭐⭐⭐⭐ - Good</option>
                                <option value="5">⭐⭐⭐⭐⭐ - Excellent</option>
                            </select>
                        </div>
                        <button type="submit" class="btn text-white" style="background-color: orange; font-weight: bold;">
                            Submit Review
                        </button>
                    </form>

                    <h4 class="text-white mb-3">Reviews:</h4>
                    <div id="reviewsList" class="d-flex flex-column gap-2"></div>
                </div>
            `;

            loadReviews(id);

            const reviewForm = document.getElementById('reviewForm');
            reviewForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const comment = document.getElementById('comment').value;
                const rating = document.getElementById('rating').value;

                if (!rating) {
                    alert("Please select a rating.");
                    return;
                }

                fetch('/api/v1/addReview', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        movieId: id,
                        comment,
                        rating
                    })
                })
                    .then(res => {
                        if (!res.ok) throw new Error("Failed to post review");
                        document.getElementById('comment').value = '';
                        document.getElementById('rating').value = '';
                        loadReviews(id);
                    })
                    .catch(err => console.error(err));
            });
        })
        .catch(error => {
            detailContainer.innerHTML = `<p class="text-danger">Error loading movie: ${error.message}</p>`;
        });
};

function loadReviews(movieId) {
    const reviewsList = document.getElementById('reviewsList');
    reviewsList.innerHTML = '<p class="text-white">Loading reviews...</p>';

    fetch(`/api/v1/reviews?movieId=${movieId}`)
        .then(res => {
            if (!res.ok) throw new Error("Failed to load reviews");
            return res.json();
        })
        .then(reviews => {
            if (reviews.length === 0) {
                reviewsList.innerHTML = '<p class="text-light">No reviews yet.</p>';
                return;
            }

            reviewsList.innerHTML = '';
            reviews.forEach(review => {
                const stars = "⭐".repeat(review.rating);
                const createdAt = new Date(review.createdAt);
                const formattedDate = createdAt.toLocaleString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                });

                const reviewEl = document.createElement('div');
                reviewEl.className = 'bg-secondary text-white p-3 rounded';
                reviewEl.innerHTML = `
                    <strong>${review.username}</strong>: ${review.comment}<br>
                    <span class="text-warning fw-bold">Rating: (${review.rating}/5) ${stars}</span><br>
                    <small class="text-muted">Posted on: ${formattedDate}</small>
                `;
                reviewsList.appendChild(reviewEl);
            });
        })
        .catch(err => {
            reviewsList.innerHTML = `<p class="text-danger">Error loading reviews: ${err.message}</p>`;
        });
}

function goBack() {
    const listSection = document.getElementById('movieListSection');
    const detailSection = document.getElementById('movieDetailSection');
    const detailContainer = document.getElementById('movieDetail');

    detailContainer.innerHTML = '';
    if (listSection) listSection.style.display = 'block';
    detailSection.style.display = 'none';
}
