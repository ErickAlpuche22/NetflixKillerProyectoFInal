const movieList = document.getElementById("containerMovies");

fetch("https://api.themoviedb.org/3/movie/popular?api_key=64f0562e3f4f0ead0aa4b9f3cd158554&language=en-US&page=1")
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(response.status);
        }
    })
    .then(data => {
        console.log(data);
        renderMovies(data.results);
        const search = document.getElementById('search-bar');
        search.addEventListener('keyup', (e) => {
            const searchValue = e.target.value.toLowerCase();
            const movies = data.results.filter(movie => movie.title.toLowerCase().includes(searchValue));
            if (movies.length > 0) {
                setTimeout(() => {
                    renderMovies(movies);
                }, 800);
            } else {
                setTimeout(() => {
                    movieList.innerHTML = `<h1 class="text-center w-100 mt-5" style="height: 350px">No results found =(</h1>`;
                }, 800);
            }
        });
    })
    .catch(error => {
        console.log(error.message);
    });

const renderMovies = (movies) => {
    movieList.innerHTML = "";
    movies.forEach(movie => {
        movieList.innerHTML += `
        <div class="col">
            <div class="card shadow-sm">
                <img loading="lazy" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="card-img-top " alt="${movie.title}">

                <div class="card-body" style="height: 180px;">
                    <h4 class="card-title">${movie.title}</h4>
                    <p class="card-text" style="display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-overflow: ellipsis;">${movie.overview}</p>
                </div>
                <div class="d-flex justify-content-between p-3">
                    <a role="button" class="btn btn-primary movie-info" data-id="${movie.id}">Watch Info</a>
                </div>
            </div>
        </div>
        `;
    });

    const info = document.querySelectorAll('.movie-info');
    info.forEach(button => {
        button.addEventListener('click', (e) => {
            const movieId = e.target.getAttribute('data-id');
            localStorage.setItem('movieId', movieId);
            window.open('pages/details-movie.html?=' + movieId, '_blank');
        });
    });
};