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
      isOffline: false,
    }
    this.getFilms()
  }

  componentDidMount() {
    window.addEventListener('offline', () => {
      this.setState({ isOffline: true })
    })
    window.addEventListener('online', () => {
      this.setState({ isOffline: false })
    })
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
    const { filmsData, loading, error, isOffline } = this.state
    const isOfflineMessage = isOffline ? <div className={'offline-message'}>Lost Connection</div> : null
    const hasData = !(loading || error)
    const errorMessage = error ? <Alert message={'Ooops!'} description={'Shit Happens!'} type={'error'} /> : null
    const loader = loading ? (
      <div className={'example'}>
        <Spin size={'large'} />
      </div>
    ) : null
    const films = hasData ? <FilmList films={filmsData} /> : null
    return (
      <Fragment>
        {isOfflineMessage}
        {errorMessage}
        {loader}
        {films}
      </Fragment>
    )
  }
}
export default FilmApp
