class ApiLogic {
  constructor() {
    this.key = '9ddc83a20149c44c2c0b879e159d7ae6'
  }

  async getSearchedFilms(name, page) {
    const data = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.key}&query=${name}&page=${page}`)
    if (!data.ok) {
      throw new Error('Ooops!')
    }
    const res = await data.json()
    return await res.results.slice(0, 6)
  }

  async getGenres() {
    const genresRaw = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.key}&language=en-US`)
    return await genresRaw.json()
  }

  async getSession() {
    localStorage.clear()
    const session = await fetch(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${this.key}`)
    const dataSession = await session.json()
    return await dataSession['guest_session_id']
  }

  async getRatedFilms(param) {
    const rated = await fetch(
      `https://api.themoviedb.org/3/guest_session/${param}/rated/movies?api_key=${this.key}&language=en-US&sort_by=created_at.asc`
    )
    const dataRated = await rated.json()
    return await dataRated.results
  }

  async rateFilm(id, param, value) {
    await fetch(`https://api.themoviedb.org/3/movie/${id}/rating?api_key=${this.key}&guest_session_id=${param}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        value: value,
      }),
    })
  }

  ratingStyle(rate) {
    let color
    if (rate < 4) {
      color = '#E90000'
      return { border: `1px solid ${color}` }
    } else if (rate < 6) {
      color = '#E97E00'
      return { border: `1px solid ${color}` }
    } else if (rate < 8) {
      color = '#E9D100'
      return { border: `1px solid ${color}` }
    }
    color = '#66E900'
    return { border: `1px solid ${color}` }
  }

  addGenresToFilm(filmGenres, { genres }) {
    return genres.reduce((acc, item) => {
      if (filmGenres.includes(item.id)) {
        acc.push(item)
        return acc
      } else return acc
    }, [])
  }
}

export default ApiLogic
