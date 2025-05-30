let currentPage = 0;
const pageSize = 5;

function loadUserReviews(page = 0) {
    currentPage = page;

    fetch(`/api/v1/userReviewsPaged?page=${page}&size=${pageSize}`)
        .then(response => {
            if (!response.ok) throw new Error("Failed to fetch user reviews");
            return response.json();
        })
        .then(data => {
            const container = document.getElementById('userReviewsContainer');
            container.innerHTML = '';

            if (data.content.length === 0) {
                container.innerHTML = '<p class="text-white">You haven’t posted any reviews yet.</p>';
                document.getElementById('paginationContainer').innerHTML = '';
                return;
            }

            data.content.forEach(review => {
                const card = document.createElement('div');
                card.className = 'card mb-3 p-3';

                card.innerHTML = `
                    <h5>${review.comment}</h5>
                    <p><strong>Movie:</strong> ${review.movieTitle}</p>
                    <p><strong>Rating:</strong> ${review.rating} ⭐</p>
                    <small><strong>Posted on:</strong> ${new Date(review.createdAt).toLocaleString()}</small>
                `;

                container.appendChild(card);
            });

            renderPagination(data.totalPages, currentPage);
        })
        .catch(error => {
            console.error("Error loading user reviews:", error);
            const container = document.getElementById('userReviewsContainer');
            if (container) {
                container.innerHTML = '<p class="text-danger">Failed to load your reviews.</p>';
            }
        });
}

function renderPagination(totalPages, currentPage) {
    const container = document.getElementById('paginationContainer');
    container.innerHTML = '';

    if (totalPages <= 1) return;

    const createPageButton = (page, label = null, isActive = false, isDisabled = false) => {
        const btn = document.createElement('button');
        btn.className = 'pagination-btn mx-1';
        btn.textContent = label || (page + 1);
        if (isActive) btn.classList.add('active');
        if (!isDisabled) {
            btn.onclick = () => loadUserReviews(page);
        } else {
            btn.disabled = true;
        }
        container.appendChild(btn);
    };

    // First page
    createPageButton(0, '1', currentPage === 0);

    // Left ellipsis
    if (currentPage > 3) {
        createPageButton(null, '...', false, true);
    }

    // Middle pages
    for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages - 2, currentPage + 2); i++) {
        createPageButton(i, null, i === currentPage);
    }

    // Right ellipsis
    if (currentPage < totalPages - 4) {
        createPageButton(null, '...', false, true);
    }

    // Last page
    if (totalPages > 1) {
        createPageButton(totalPages - 1, totalPages.toString(), currentPage === totalPages - 1);
    }
}

// ✅ Called automatically after the page is loaded into #content
window.onPageLoaded = () => {
    if (document.getElementById('userReviewsContainer')) {
        loadUserReviews(0);
    }
};
