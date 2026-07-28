// configs
const TMDB_API_KEY = "4c5e11f029ea489e57411db8642c2fca";
const baseURL = "https://api.themoviedb.org/3";
const urlParams = `language=en-US&page=1&api_key=${TMDB_API_KEY}`;

//API urls
const popularMoviesURL = `${baseURL}/movie/popular?${urlParams}`;
const topRatedMoviesURL = `${baseURL}/movie/top_rated?${urlParams}`;
const popularSeriesURL = `${baseURL}/tv/popular?${urlParams}`;
const topRatedSeriesURL = `${baseURL}/tv/top_rated?${urlParams}`;

// helpers
const beautifyDate = (date) => {
  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return formattedDate;
};

const getElement = (id) => {
  return document.getElementById(id);
};
// const getNextDay = (dateStr) => {
//   const date = new Date(`${dateStr}T00:00:00`);
//   date.setDate(date.getDate() + 1);
//   return date.toISOString().slice(0, 10).replace(/-/g, "");
// };

const buildGoogleCalendarUrl = (title, date, overview) => {
  const startDate = date.replace(/-/g, "");
  const endDate = startDate;
  const eventTitle = `${title} - WATCH`;
  const details = overview;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: eventTitle,
    dates: `${startDate}/${endDate}`,
    details: details,
  });

  const finalUrl = `https://calendar.google.com/calendar/render?${params.toString()}`;
  console.log(finalUrl);
  return finalUrl;
};

const escapeIcsText = (text) =>
  String(text ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");

const buildIcsContent = (title, reminderDate, details) => {
  const date = reminderDate.replace(/-/g, "");
  const eventTitle = `${title} — Watch`;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//CineRemind//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}-${Math.random().toString(36).slice(2)}@cineremind`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
    `DTSTART;VALUE=DATE:${date}`,
    `SUMMARY:${escapeIcsText(eventTitle)}`,
    `DESCRIPTION:${escapeIcsText(details)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
};
const downoladIcsFile = (title, date, overview) => {
  const blob = new Blob([buildIcsContent(title, date, overview)], {
    type: "text/calendar;charset=utf-8",
  });
  console.log(blob);
  const url= URL.createObjectURL(blob)
  console.log(url)
  const link= document.createElement('a')
  link.href=url
  
  link.download=`${title}.ics`
  console.log(link)
  link.click()
  URL.revokeObjectURL(url)
};

const attachCalendarListners = (card, data) => {
  const title = (data?.title || data?.name) ?? "--";
  const date = data?.release_date || data?.first_air_date;
  const overview = data?.overview;
  const mediaType = data?.title ? "movie" : "series";
  const handleClick = (action) => {
    console.log(action);
    if (!date) {
      alert("release date is not available for this title");
      return;
    }
    if (action === "google") {
      window.open(buildGoogleCalendarUrl(title, date, overview), "_blank");
    } else {
      downoladIcsFile(title, date, overview);
    }
  };
  const icsBtns = card.querySelectorAll('[data-action="ics"]');
  const googleBtns = card.querySelectorAll('[data-action="google"]');
  googleBtns.forEach((btn) => {
    btn.addEventListener("click", () => handleClick("google"));
  });
  icsBtns.forEach((btn) => {
    btn.addEventListener("click", () => handleClick("ics"));
  });
};

//  card
const createCard = (data, index) => {
  // console.log(data)

  const title = (data?.title || data?.name) ?? "--";
  const date =
    data?.release_date || data?.first_air_date
      ? beautifyDate(data.release_date || data?.first_air_date)
      : "--";
  const rate = data?.vote_average?.toFixed(1) ?? "--";
  const posterPath = data?.poster_path;
  const buttons = `<button  data-action="google" class=" bg-white text-black rounded-sm font-semibold text-[11px] px-4 py-2 cursor-pointer hover:bg-white/90 transition-all 
                    flex items-center justify-center text-center gap-1" title="Add to Google calendar">
                      <ion-icon class="flex-none" name="calendar-clear-outline"></ion-icon> Google</button>
                    <button data-action="ics" class=" bg-primary text-primary-foreground rounded-sm font-semibold text-[11px] px-4 py-2 cursor-pointer hover:bg-primary/90 transition-all 
                    flex items-center justify-center text-center gap-1" title="Download for Apple / Outlook">
                      <ion-icon class="flex-none" name="arrow-down-outline"></ion-icon> Download</button>`;

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
                    ${buttons}
                      
                  </div>
                </div>
              </div>
              <div class="mt-2.5">
                <h3 class="font-semibold text-[13px] leading-snug line-clamp-1" title="${title}">
                    ${title}
                </h3>
                <p class="text-[11px] text-foreground/60 mt-0.5">${date}</p>

                <div class="grid grid-cols-2 gap-2 md:hidden mt-2">
                    ${buttons}
                      
                  </div>
              </div>
            </div>`;

  return template;
};

// element selectors
const popularMoviesGrid = getElement("popular-movies-grid");
const popularMoviesLoader = getElement("popular-movies-loading");
const popularMoviesEmpty = getElement("popular-movies-empty");

const topRatedMoviesGrid = getElement("top-rated-movies-grid");
const topRatedMoviesLoader = getElement("top-rated-movies-loading");
const topRatedMoviesEmpty = getElement("top-rated-movies-empty");

const popularSeriesGrid = getElement("popular-series-grid");
const popularSeriesLoader = getElement("popular-series-loading");
const popularSeriesEmpty = getElement("popular-series-empty");

const topRatedSeriesGrid = getElement("top-rated-series-grid");
const topRatedSeriesLoader = getElement("top-rated-series-loading");
const topRatedSeriesEmpty = getElement("top-rated-series-empty");

// data getter
const getData = () => {
  getApiDataWrapper(
    popularMoviesURL,
    popularMoviesLoader,
    popularMoviesGrid,
    popularMoviesEmpty,
  );
  getApiDataWrapper(
    topRatedMoviesURL,
    topRatedMoviesLoader,
    topRatedMoviesGrid,
    topRatedMoviesEmpty,
  );
  getApiDataWrapper(
    popularSeriesURL,
    popularSeriesLoader,
    popularSeriesGrid,
    popularSeriesEmpty,
  );
  getApiDataWrapper(
    topRatedSeriesURL,
    topRatedSeriesLoader,
    topRatedSeriesGrid,
    topRatedSeriesEmpty,
  );
};

// api wrapper
// since we are using display property for showing and hiding data thats why we are removing and adding flex/grid/hidden classes
// by default empty state is always visible
const getApiDataWrapper = async (url, loaderEl, gridEl, emptyEl) => {
  try {
    emptyEl.classList.add("hidden"); // hiding empty state because by default it's always visible wheather api is called or not
    emptyEl.classList.remove("flex"); // hiding empty state by removing flex class too

    loaderEl.classList.remove("hidden"); // activating loader by removing hidden class
    loaderEl.classList.add("flex"); // activating loader by adding flex class too

    const response = await fetch(url);
    loaderEl.classList.add("hidden"); //deactivating loader by adding hidden class
    loaderEl.classList.remove("flex"); // deactivating loader by removing flex class too
    if (response.ok) {
      const apiData = await response.json();
      if (apiData?.results && apiData?.results?.length > 0) {
        gridEl.classList.remove("hidden"); // showing main grid by removing hidden class
        gridEl.classList.add("grid"); // showing main grid by adding grid class too
        apiData?.results?.forEach((obj, index) => {
          gridEl?.insertAdjacentHTML("beforeend", createCard(obj, index));
          attachCalendarListners(gridEl.lastElementChild, obj);
        });
      } else {
        emptyEl.classList.remove("hidden"); // showing empty class by removing hidden class
        emptyEl.classList.add("flex"); // showing empty by adding flex class too
      }
    } else {
      throw new error("unable to fetch data");
    }
  } catch (error) {
    console.log(error);
    emptyEl.classList.remove("hidden"); // showing empty class by removing hidden class
    emptyEl.classList.add("flex"); // showing empty by adding flex class too
  }
};

// calling api
document.addEventListener("DOMContentLoaded", getData);
