import { Component } from 'react'

import FilmListItem from '../film-list-item/film-list-item'
import './film-list.css'

function FilmList({ films, session }) {
  return (
    <ErrorBoundary>
      <ul className="film-list">
        {films.map((item) => (
          <FilmListItem key={item.id} film={item} login={session} />
        ))}
      </ul>
    </ErrorBoundary>
  )
}

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return <h1>Opps Something Wrong. Refresh the page</h1>
    }

    return this.props.children
  }
}

export default FilmList
