import textSlice from '../../logic/text-logic'
import getDate from '../../logic/date-logic'

import './film-list-item.css'

function FilmListItem({ film }) {
  const imgUrl = film['backdrop_path']
    ? `https://image.tmdb.org/t/p/original/${film['backdrop_path']}`
    : 'https://c.tenor.com/x8v1oNUOmg4AAAAd/rickroll-roll.gif'
  // if not have poster url use image by default
  const slicedText = textSlice(film['overview']) // slice text by 200 symbols
  const dateRelease = getDate(film['release_date']) // format date
  return (
    <li className={'film-card'}>
      <div className="film-img">
        <img className={'film-img'} src={imgUrl} alt="film image" />
      </div>

      <div className="film-card__content">
        <h3 className={'film-card__title'}>{film['title']}</h3>
        <p className={'film-card__date'}>{dateRelease}</p>
        <div className="film-card__genre">
          <a className={'genre-item'} href="#">
            Action
          </a>
          <a className={'genre-item'} href="#">
            Drama
          </a>
        </div>
        <p className="film-card__text">{slicedText}</p>
      </div>
    </li>
  )
}

export default FilmListItem
