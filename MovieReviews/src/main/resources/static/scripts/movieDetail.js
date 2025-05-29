function loadMovieDetail(id) {
    if (!id) {
        document.getElementById("movieDetail").innerHTML = "<p class='text-danger'>Movie ID not provided.</p>";
        return;
    }

    fetch(`/api/v1/getMovieById?id=${id}`)
        .then(response => {
            if (!response.ok) throw new Error("Movie not found");
            return response.json();
        })
        .then(movie => {
            const container = document.getElementById("movieDetail");

            // Apply background like login page
            document.body.style.backgroundImage = "url('/assets/website/loginbg.jpg')";
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundPosition = "center";
            document.body.style.backgroundAttachment = "fixed";

            container.innerHTML = `
                <div class="card p-4 shadow-lg text-white" style="max-width: 900px; background-color: rgb(92, 92, 92);">
                    <div class="row g-4 align-items-start">
                        <!-- Left: Movie Cover -->
                        <div class="col-md-4 text-center">
                            <img src="${movie.cover_url}" class="img-fluid rounded" alt="${movie.title}">
                            <div class="mt-4 text-start">
                                <p><strong style="color: orange;">Genre:</strong> <span class="text-white">${movie.genre}</span></p>
                                <p><strong style="color: orange;">Rating:</strong> <span class="text-white">⭐ ${movie.rating}</span></p>
                                <p><strong style="color: orange;">Director:</strong> <span class="text-white">${movie.author}</span></p>
                                <p><strong style="color: orange;">Released:</strong> <span class="text-white">${movie.release_date}</span></p>
                            </div>
                        </div>

                        <!-- Right: Title and Description -->
                        <div class="col-md-8">
                            <h2 class="fw-bold" style="color: orange;">${movie.title}</h2>
                            <hr class="bg-light">
                            <p class="card-text mt-3 text-white">${movie.description}</p>
                        </div>
                    </div>
                </div>
            `;
        })
        .catch(error => {
            console.error("Error fetching movie:", error);
            document.getElementById("movieDetail").innerHTML = "<p class='text-danger'>Movie not found.</p>";
        });
}
