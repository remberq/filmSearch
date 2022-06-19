import FilmListItem from '../film-list-item/film-list-item'
import './film-list.css'

function FilmList({ films }) {
  return (
    <ul className="film-list">
      {films.map((item) => (
        <FilmListItem key={item.id} film={item} />
      ))}
    </ul>
  )
}

export default FilmList
