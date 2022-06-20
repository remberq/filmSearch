import { Component, Fragment } from 'react'
import { Alert, Spin } from 'antd'
import 'antd/dist/antd.css'
import './film-app.css'

import { FilmList } from '../index'
import ApiLogic from '../../logic/api-logic'

class FilmApp extends Component {
  constructor() {
    super()
    this.api = new ApiLogic()
    this.state = {
      filmsData: [],
      loading: true,
      error: false,
    }
    this.getFilms()
  }

  onError() {
    this.setState({
      loading: false,
      error: true,
    })
  }

  getFilms() {
    this.api
      .getSearchedFilms('matrix')
      .then((val) => {
        this.setState({ filmsData: val, loading: false })
      })
      .catch(this.onError.bind(this))
  }

  render() {
    const { filmsData, loading, error } = this.state
    const hasData = !(loading || error)
    const errorMessage = error ? <Alert message={'Hi man'} description={'you lose'} type={'error'} /> : null
    const loader = loading ? (
      <div className={'example'}>
        <Spin size={'large'} />
      </div>
    ) : null
    const films = hasData ? <FilmList films={filmsData} /> : null
    return (
      <Fragment>
        {errorMessage}
        {loader}
        {films}
      </Fragment>
    )
  }
}
export default FilmApp
