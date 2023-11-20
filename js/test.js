const refs = {
  movieList: document.querySelector('.js-movie-list'),
  loadMoreBtn: document.querySelector('.js-load-more'),
}

const classes = {
  loadMoreHidden: 'load-more-hidden',
}

let page = 499;

serviceMovies()
  .then((data) => {
    console.log(data);
    refs.movieList.innerHTML = createMarkup(data.results);

    if (data.page < data.total_pages && data.page < 500) {
      refs.loadMoreBtn.classList.remove(classes.loadMoreHidden);
      refs.loadMoreBtn.addEventListener('click', handleLoadMore)
    }

  })
  .catch((err) => {
    console.log(err);
  });



function serviceMovies (page = 1) {
  const BASE_URL = 'https://api.themoviedb.org/3';
  const END_POINT = 'trending/movie/week';
  const API_KEY = '92a9a9e3708a3e9451b7037d5906879a';

  const params = new URLSearchParams({
    api_key: API_KEY,
    page,
  });

  return fetch(`${BASE_URL}/${END_POINT}?${params}`)
    .then((resp) => {
        if (!resp.ok) {
          throw new Error(resp.statusText)
      }
      return resp.json()
    })
}

function createMarkup(arr) {
  return arr.map(
    ({ poster_path, title, vote_average, release_date }) => `<li class='movie-card'>
    <img src='https://image.tmdb.org/t/p/w500/${poster_path}' alt='${title}'>
    <div class='movie-info'>
    <h2>${title}</h2>
    <p>vote_average: ${vote_average}</p>
    <p>release_date: ${release_date}</p>
    </div>
    </li>`
  ).join('')
}

function handleLoadMore(event) {
  page += 1;
  refs.loadMoreBtn.disabled = true;

  serviceMovies(page)
  .then((data) => {
    console.log(data);
    refs.movieList.insertAdjacentHTML('beforeend', createMarkup(data.results));

    if (data.page >= 500) {
      refs.loadMoreBtn.classList.add(classes.loadMoreHidden);
      refs.loadMoreBtn.removeEventListener('click', handleLoadMore)
      return
    }

    refs.loadMoreBtn.disabled = false;
  })
  .catch((err) => {
    console.log(err);
  });
}
