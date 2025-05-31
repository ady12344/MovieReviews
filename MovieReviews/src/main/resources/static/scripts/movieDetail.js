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

    detailContainer.innerHTML = '<p class="text-warning">Se încarcă...</p>';

    fetch(`/api/v1/getMovieById?id=${id}`)
        .then(res => {
            if (!res.ok) throw new Error("Filmul nu a fost găsit.");
            return res.json();
        })
        .then(movie => {
            detailContainer.innerHTML = `
                <button onclick="goBack()" class="btn mb-4 fw-bold text-warning themed-btn">
                    ← Înapoi
                </button>

                <div class="container p-4 rounded" style="
                    background-color: rgba(0, 0, 0, 0.5); 
                    border: 1px solid orange; 
                    box-shadow: 0 0 15px orange;">
                    <div class="row mb-4">
                        <div class="col-md-4 text-center">
                            <img src="${movie.cover_url}" alt="${movie.title} Cover" 
                                class="img-fluid rounded shadow-sm" 
                                style="width: 290px; height: auto; box-shadow: 0 0 12px orange;" />
                        </div>
                        <div class="col-md-8">
                            <h2 class="text-warning fw-bold">${movie.title}</h2>
                            <p class="text-light">${movie.description}</p>
                        </div>
                    </div>

                    <form id="reviewForm" class="mb-5">
                        <div class="mb-3">
                            <label for="comment" class="form-label text-warning fw-bold">Comentariul tău</label>
                            <textarea id="comment" class="form-control themed-input" 
                                placeholder="Scrie comentariul tău..."></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="rating" class="form-label text-warning fw-bold">Rating</label>
                            <select id="rating" class="form-select themed-input">
                                <option value="" disabled selected>Selectează un rating</option>
                                <option value="1">⭐ - Foarte slab</option>
                                <option value="2">⭐⭐ - Slab</option>
                                <option value="3">⭐⭐⭐ - Mediocru</option>
                                <option value="4">⭐⭐⭐⭐ - Bun</option>
                                <option value="5">⭐⭐⭐⭐⭐ - Excelent</option>
                            </select>
                        </div>
                        <button type="submit" class="btn fw-bold text-warning themed-btn">
                            Trimite Recenzia
                        </button>
                    </form>

                    <h4 class="text-warning mb-3">Recenzii:</h4>
                    <div id="reviewsList" class="d-flex flex-column gap-3"></div>
                </div>
            `;

            document.querySelectorAll('.themed-btn').forEach(btn => {
                btn.style.border = '1px solid orange';
                btn.style.backgroundColor = 'transparent';
                btn.style.transition = 'box-shadow 0.3s ease, transform 0.3s ease';
                btn.style.boxShadow = '0 0 10px orange';
                btn.addEventListener('mouseenter', () => {
                    btn.style.boxShadow = '0 0 15px orange';
                    btn.style.transform = 'scale(1.05)';
                });
                btn.addEventListener('mouseleave', () => {
                    btn.style.boxShadow = '0 0 10px orange';
                    btn.style.transform = 'scale(1)';
                });
            });

            document.querySelectorAll('.themed-input').forEach(el => {
                el.style.backgroundColor = 'transparent';
                el.style.color = 'orange';
                el.style.border = '1px solid orange';
                el.style.boxShadow = '0 0 10px orange';
                el.style.borderRadius = '8px';
                el.style.transition = 'box-shadow 0.3s ease, outline 0.3s ease';

                el.addEventListener('focus', () => {
                    el.style.boxShadow = '0 0 15px orange';
                    el.style.outline = 'none';
                });
                el.addEventListener('blur', () => {
                    el.style.boxShadow = '0 0 10px orange';
                });

                // Special styling for select dropdowns
                if (el.tagName.toLowerCase() === 'select') {
                    el.style.webkitAppearance = 'none';
                    el.style.mozAppearance = 'none';
                    el.style.appearance = 'none';
                    el.style.paddingRight = '30px';
                    el.style.backgroundImage = 'url("data:image/svg+xml;charset=US-ASCII,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' fill=\'orange\' class=\'bi bi-caret-down-fill\' viewBox=\'0 0 16 16\'><path d=\'M7.247 11.14 2.451 5.658C1.885 5.023 2.324 4 3.204 4h9.592c.88 0 1.319 1.023.753 1.658l-4.796 5.482a1 1 0 0 1-1.506 0z\'/></svg>")';
                    el.style.backgroundRepeat = 'no-repeat';
                    el.style.backgroundPosition = 'right 10px center';
                    el.style.backgroundSize = '16px 16px';
                }
            });

            const style = document.createElement('style');
            style.textContent = `
                select.themed-input option {
                    background-color: black !important;
                    color: orange !important;
                }
            `;
            document.head.appendChild(style);

            loadReviews(id);

            const reviewForm = document.getElementById('reviewForm');
            reviewForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const comment = document.getElementById('comment').value.trim();
                const rating = document.getElementById('rating').value;

                if (!rating) {
                    alert("Selectează un rating.");
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
                        if (!res.ok) throw new Error("Eroare la trimiterea recenziei.");
                        document.getElementById('comment').value = '';
                        document.getElementById('rating').value = '';
                        loadReviews(id);
                    })
                    .catch(err => console.error(err));
            });
        })
        .catch(error => {
            detailContainer.innerHTML = `<p class="text-danger">Eroare la încărcarea filmului: ${error.message}</p>`;
        });
};

function loadReviews(movieId) {
    const reviewsList = document.getElementById('reviewsList');
    reviewsList.innerHTML = '<p class="text-light">Se încarcă recenziile...</p>';

    fetch(`/api/v1/reviews?movieId=${movieId}`)
        .then(res => {
            if (!res.ok) throw new Error("Nu s-au putut încărca recenziile.");
            return res.json();
        })
        .then(reviews => {
            if (reviews.length === 0) {
                reviewsList.innerHTML = '<p class="text-light">Nicio recenzie momentan.</p>';
                return;
            }

            reviewsList.innerHTML = '';
            reviews.forEach(review => {
                const stars = "⭐".repeat(review.rating);
                const reviewEl = document.createElement('div');
                reviewEl.className = 'p-3 rounded';
                reviewEl.style.backgroundColor = 'rgba(0, 0, 0, 0.65)';
                reviewEl.style.border = '1px solid orange';
                reviewEl.style.boxShadow = '0 0 10px orange';

                reviewEl.innerHTML = `
                    <strong class="text-warning">${review.username}</strong>
                    <p class="text-light mb-1">${review.comment}</p>
                    <span class="text-warning fw-bold">Rating: (${review.rating}/5) ${stars}</span>
                `;
                reviewsList.appendChild(reviewEl);
            });
        })
        .catch(err => {
            reviewsList.innerHTML = `<p class="text-danger">Eroare la încărcarea recenziilor: ${err.message}</p>`;
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