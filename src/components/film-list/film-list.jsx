import FilmListItem from '../film-list-item/film-list-item'
import './film-list.css'

function FilmList({ films, session }) {
  return (
    <ul className="film-list">
      {films.map((item) => (
        <FilmListItem key={item.id} film={item} login={session} />
      ))}
    </ul>
  )
}

export default FilmList
