const movieId = localStorage.getItem('movieId');
const movieDetail = document.getElementById('movie-detail');
const title = document.getElementById('title');

fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=64f0562e3f4f0ead0aa4b9f3cd158554&language=en-US`)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(response.status);
        }
    })
    .then(data => {
        title.textContent = data.title;
        renderMovie(data);
        console.log(data);
    })
    .catch(error => {
        console.log(error.message);
    });

const renderMovie = (movie) => {
    let moviedetail = `
        <div class="row m-5 border p-4 shadow-lg" style="border-radius: 20px;">
            <div class="col-md-4">
                <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="img-fluid" alt="${movie.title}">
            </div>
            <div class="col-md-8">
                <h1>${movie.title}</h1>
                <p class="fs-5">${movie.overview}</p>
                <p class="fs-5 fw-bold">Release date: <span class="fw-normal">${movie.release_date}</span></p>
                <p class="fs-5 fw-bold">Rating: <span class="fw-normal">${movie.vote_average}</span></p>
                <p class="fs-5">`;
                movie.genres.forEach(genre => {
                    moviedetail += `<span class="rounded bg-success text-white mx-1 p-1">${genre.name}</span>`;
                });
    moviedetail += `
                </p>
            </div>
        </div>
        `;
    movieDetail.innerHTML = moviedetail;
}