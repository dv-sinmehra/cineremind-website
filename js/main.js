// configs
const TMDB_API_KEY = "4c5e11f029ea489e57411db8642c2fca";
const baseURL = "https://api.themoviedb.org/3";
const urlParams = `language=en-US&page=1&api_key=${TMDB_API_KEY}`;

//API urls
const popularMoviesURL = `${baseURL}/movie/popular?${urlParams}`;
const popularSeriesURL = `${baseURL}/tv/popular?${urlParams}`;
const topRatedMoviesURL = `${baseURL}/movie/top_rated?${urlParams}`;
const topRatedSeriesURL = `${baseURL}/tv/top_rated?${urlParams}`;

// element selectors
const popularMoviesGrid = document.getElementById("popular-movies-grid");
const popularMoviesLoader = document.getElementById("popular-movies-loading");
const popularMoviesEmpty = document.getElementById("popular-movies-empty");

const topRatedMoviesGrid = document.getElementById("top-rated-movies-grid");
const topRatedMoviesLoader = document.getElementById("top-rated-movies-loading");
const topRatedMoviesEmpty = document.getElementById("top-rated-movies-empty");

const popularSeriesGrid = document.getElementById("popular-series-grid");
const popularSeriesLoader = document.getElementById("popular-series-loading");
const popularSeriesEmpty = document.getElementById("popular-series-empty");

const topRatedSeriesGrid = document.getElementById("top-rated-series-grid");
const topRatedSeriesLoader = document.getElementById("top-rated-series-loading");
const topRatedSeriesEmpty = document.getElementById("top-rated-series-empty");

// data getter
const getData = () => {
  getPopularMovies();
  getPopularSeries();
  getTopRatedMovies();
  getTopRatedSeries();
};

// api wrappers
const getPopularMovies = async () => {
  try {
    const response = await fetch(popularMoviesURL);
    popularMoviesLoader.classList.add("hidden");
    if (response.ok) {
      const apiData = await response.json();
      if (apiData?.results && apiData?.results?.length > 0) {
        popularMoviesGrid.classList.remove('hidden')
        popularMoviesGrid.classList.add("grid")
        apiData?.results?.forEach((obj) => {
          popularMoviesGrid?.insertAdjacentHTML("beforeend", createCard(obj));
        });
      } else{
        popularMoviesEmpty.classList.remove("hidden")
        popularMoviesEmpty.classList.add("flex")
      }
    } else {
      throw new error("unable to fetch data");
    }
  } catch (error) {
    console.log(error);
    popularMoviesEmpty.classList.remove("hidden")
    popularMoviesEmpty.classList.add("flex")
  }
};

const getPopularSeries = async () => {
  try {
    const response = await fetch(popularSeriesURL);
    popularSeriesLoader.classList.add("hidden");
    if (response.ok) {
      const apiData = await response.json();
      if (apiData?.results && apiData?.results?.length > 0) {
        popularSeriesGrid.classList.remove('hidden')
        popularSeriesGrid.classList.add("grid")
        apiData?.results?.forEach((obj) => {
          popularSeriesGrid?.insertAdjacentHTML("beforeend", createCard(obj));
        });
      } else{
        popularSeriesEmpty.classList.remove("hidden")
        popularSeriesEmpty.classList.add("flex")
      }
    } else {
      throw new error("unable to fetch data");
    }
  } catch (error) {
    console.log(error);
    popularSeriesEmpty.classList.remove("hidden")
    popularSeriesEmpty.classList.add("flex")
  }
};

const getTopRatedSeries = async () => {
  try {
    const response = await fetch(topRatedSeriesURL);
    topRatedSeriesLoader.classList.add("hidden");
    if (response.ok) {
      const apiData = await response.json();
      if (apiData?.results && apiData?.results?.length > 0) {
        topRatedSeriesGrid.classList.remove('hidden')
        topRatedSeriesGrid.classList.add("grid")
        apiData?.results?.forEach((obj) => {
          topRatedSeriesGrid?.insertAdjacentHTML("beforeend", createCard(obj));
        });
      } else{
        topRatedSeriesEmpty.classList.remove("hidden")
        topRatedSeriesEmpty.classList.add("flex")
      }
    } else {
      throw new error("unable to fetch data");
    }
  } catch (error) {
    console.log(error);
    topRatedSeriesEmpty.classList.remove("hidden")
    topRatedSeriesEmpty.classList.add("flex")
  }
};

const getTopRatedMovies = async () => {
  try {
    const response = await fetch(topRatedMoviesURL);
    topRatedMoviesLoader.classList.add("hidden");
    if (response.ok) {
      const apiData = await response.json();
      if (apiData?.results && apiData?.results?.length > 0) {
        topRatedMoviesGrid.classList.remove('hidden')
        topRatedMoviesGrid.classList.add("grid")
        apiData?.results?.forEach((obj) => {
          topRatedMoviesGrid?.insertAdjacentHTML("beforeend", createCard(obj));
        });
      } else{
        topRatedMoviesEmpty.classList.remove("hidden")
        topRatedMoviesEmpty.classList.add("flex")
      }
    } else {
      throw new error("unable to fetch data");
    }
  } catch (error) {
    console.log(error);
    topRatedMoviesEmpty.classList.remove("hidden")
    topRatedMoviesEmpty.classList.add("flex")
  }
};

//  card
const createCard = (data) => {
  // console.log(data)
  const title = (data?.title || data?.name) ?? "--";
  const date = (data?.release_date || data?.first_air_date)  ? beautifyDate(data.release_date || data?.first_air_date) : "--";
  const rate = data?.vote_average?.toFixed(1) ?? "--";
  const posterPath = data?.poster_path;
  
  const template = `<div
              class="group  relative transition-all overflow-hidden duration-300"
            >
              <div
                class="relative aspect-[2/3] overflow-hidden ring-1 ring-white/[0.06] hover:ring-white/15 bg-cinema-800 rounded-lg"
              >
                <img
                  class="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                  src="https://image.tmdb.org/t/p/w342${posterPath}"
                  alt="${title}"
                  loading="lazy"
                  onerror="this.src = '/assets/placeholder.svg'"
                />
                <span class="absolute z-10 top-2 left-2 bg-black/60 rounded-md px-2 py-0.5 text-[11px] text-amber-500 backdrop-blur-md font-semibold">⭐ ${rate}</span>
                <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 md:block hidden"></div>
                <div class=" absolute bottom-0 translate-y-full group-hover:translate-y-0 inset-x-0 p-2.5 transition-all duration-300 md:block hidden">
                  <div class="grid grid-cols-2  gap-2 ">
                    <button class="btn-google bg-white text-black rounded-sm font-semibold text-[11px] px-4 py-2 cursor-pointer hover:bg-white/90 transition-all 
                    flex items-center justify-center text-center gap-1" title="Add to Google calendar">
                      <ion-icon class="flex-none" name="calendar-clear-outline"></ion-icon> Google</button>
                    <button class="btn-ics bg-primary text-primary-foreground rounded-sm font-semibold text-[11px] px-4 py-2 cursor-pointer hover:bg-primary/90 transition-all 
                    flex items-center justify-center text-center gap-1" title="Download for Apple / Outlook">
                      <ion-icon class="flex-none" name="arrow-down-outline"></ion-icon> Download</button>
                      
                  </div>
                </div>
              </div>
              <div class="mt-2.5">
                <h3 class="font-semibold text-[13px] leading-snug line-clamp-1" title="${title}">
                    ${title}
                </h3>
                <p class="text-[11px] text-foreground/60 mt-0.5">${date}</p>

                <div class="grid grid-cols-2 gap-2 md:hidden mt-2">
                    <button class="btn-google bg-white text-black rounded-sm font-semibold text-[11px] px-4 py-2 cursor-pointer hover:bg-white/90 transition-all 
                    flex items-center justify-center text-center gap-1" title="Add to Google calendar">
                      <ion-icon class="flex-none" name="calendar-clear-outline"></ion-icon> Google</button>
                    <button class="btn-ics bg-primary text-primary-foreground rounded-sm font-semibold text-[11px] px-4 py-2 cursor-pointer hover:bg-primary/90 transition-all 
                    flex items-center justify-center text-center gap-1" title="Download for Apple / Outlook">
                      <ion-icon class="flex-none" name="arrow-down-outline"></ion-icon> Download</button>
                      
                  </div>
              </div>
            </div>`;
  return template;
};

// helpers
const beautifyDate = (date) => {
  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return formattedDate;
};

// calling api
document.addEventListener("DOMContentLoaded", getData);
