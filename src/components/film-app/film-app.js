import { Component } from 'react'

import FilmList from '../film-list/film-list'
import ApiLogic from '../../logic/api-logic'

class FilmApp extends Component {
  constructor() {
    super()
    this.api = new ApiLogic()
    this.state = {
      filmsData: [],
    }
  }

  componentDidMount() {
    this.getFilms()
  }

  getFilms() {
    this.api.getSearchedFilms('toy').then((val) => {
      this.setState({ filmsData: val })
    })
  }

  render() {
    return <FilmList films={this.state.filmsData} />
  }
}

export default FilmApp
