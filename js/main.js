// configs
const TMDB_API_KEY='4c5e11f029ea489e57411db8642c2fca'
const baseURL='https://api.themoviedb.org/3'
const urlParams=`language=en-US&page=1&api_key=${TMDB_API_KEY}`


//API urls 
const popularMoviesURL= `${baseURL}/movie/popular?${urlParams}`
const popularSeriesURL =`${baseURL}/tv/popular?${urlParams}`
const topRatedMoviesURL=`${baseURL}/movie/top_rated?${urlParams}`
const topRatedSeriesURL=`${baseURL}/tv/top_rated?${urlParams}`


// data getter
const getData =  ()=>{
  getPopularMovies()
  getPopularSeries()
  getTopRatedMovies()
  getTopRatedSeries()
}


// api wrappers
const getPopularMovies = async()=>{
  try{
    const response =await fetch(popularMoviesURL) 
    if(response.ok){
      const data=await response.json()
      console.log(data)
    }
    else {
      throw new error ("unable to fetch data")
    }
  }
  catch (error){
  console.log(error)

  }

}

const getPopularSeries = async()=>{
   try {
    const response=await fetch (popularSeriesURL)
    if(response.ok){
      const data =await response.json()
      console.log(data)
    }
    else{
      throw new error ("unable to fetch data")
    }
   }
   catch (error){
    console.log(error)
   }
}

const getTopRatedSeries = async()=>{
   try {
    const response=await fetch (topRatedSeriesURL)
    if(response.ok){
      const data =await response.json()
      console.log(data)
    }
    else{
      throw new error ("unable to fetch data")
    }
   }
   catch (error){
    console.log(error)
   }
}

const getTopRatedMovies = async()=>{
   try {
    const response=await fetch (topRatedMoviesURL)
    if(response.ok){
      const data =await response.json()
      console.log(data)
    }
    else{
      throw new error ("unable to fetch data")
    }
   }
   catch (error){
    console.log(error)
   }
}

// calling api
document.addEventListener("DOMContentLoaded",getData)