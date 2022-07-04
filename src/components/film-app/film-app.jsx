import { Component, createContext } from 'react'
import { Alert, Spin, Pagination, Tabs } from 'antd'
import 'antd/dist/antd.css'
import './film-app.css'
import { debounce } from 'lodash'

import { FilmList, FilmSearch } from '../index'
import ApiLogic from '../../logic/api-logic'
// import getSession from '../../logic/guest-session'

const { Provider, Consumer } = createContext()

class FilmApp extends Component {
  constructor() {
    super()
    this.api = new ApiLogic()
    this.state = {
      filmsData: [],
      ratedFilmsData: [],
      genres: [],
      loading: true,
      error: false,
      isOffline: false,
      searchField: '',
      login: localStorage.getItem('login'),
      rateShow: false,
    }
    this.getFilms = this.getFilms.bind(this)
    this.login = localStorage.getItem('login')
  }

  componentDidMount() {
    this.api.getSession().then((val) => {
      localStorage.setItem('login', val)
    })
    window.addEventListener('offline', () => {
      this.setState({ isOffline: true })
    })
    window.addEventListener('online', () => {
      this.setState({ isOffline: false })
    })
    this.getFilms('return')
    this.getGenres()
  }

  onPaginationChange(e) {
    const { searchField } = this.state
    this.getFilms(searchField, e)
  }

  onError() {
    this.setState({
      loading: false,
      error: true,
    })
  }

  showRateFilms(page) {
    if (page === '2') {
      this.rateFilms()
    }
  }

  rateFilms() {
    this.api
      .getRatedFilms(this.login)
      .then((item) => this.setState({ ratedFilmsData: item, loading: false }))
      .catch(this.onError.bind(this))
  }

  getGenres() {
    this.api.getGenres().then((val) => this.setState({ genres: val }))
  }

  getFilms(text, page = 1) {
    this.setState({ searchField: text })
    this.api
      .getSearchedFilms(text, page)
      .then((val) => {
        this.setState({ filmsData: val, loading: false })
      })
      .catch(this.onError.bind(this))
  }

  render() {
    const { TabPane } = Tabs
    const { filmsData, ratedFilmsData, genres, loading, error, isOffline, login } = this.state
    const isOfflineMessage = isOffline ? <div className={'offline-message'}>Lost Connection</div> : null
    const hasData = !(loading || error)
    const errorMessage = error ? <Alert message={'Ooops!'} description={'Shit Happens!'} type={'error'} /> : null
    const loader = loading ? (
      <div className={'example'}>
        <Spin size={'large'} />
      </div>
    ) : null
    const films = hasData ? <FilmList films={filmsData} session={login} /> : null
    return (
      <Provider value={genres}>
        <div className={'main-container'}>
          <Tabs defaultActiveKey={'1'} onChange={(e) => this.showRateFilms.bind(this)(e)}>
            <TabPane tab={'Search'} key={'1'}>
              <FilmSearch search={debounce((text) => this.getFilms(text), 700)} />
              {isOfflineMessage}
              {errorMessage}
              {loader}
              {films}
            </TabPane>
            <TabPane tab={'Rated'} key={'2'}>
              {isOfflineMessage}
              {errorMessage}
              {loader}
              {hasData ? <FilmList films={ratedFilmsData} session={login} /> : null}
            </TabPane>
          </Tabs>
          {!this.state.rateShow ? (
            <Pagination onChange={this.onPaginationChange.bind(this)} defaultCurrent={1} total={50} />
          ) : null}
        </div>
      </Provider>
    )
  }
}
export { FilmApp, Consumer }
