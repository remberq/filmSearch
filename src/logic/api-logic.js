class ApiLogic {
  async getSearchedFilms(name) {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=9ddc83a20149c44c2c0b879e159d7ae6&query=${name}`
    )
    const res = await data.json()
    return await res.results.slice(0, 6)
  }
}
export default ApiLogic
