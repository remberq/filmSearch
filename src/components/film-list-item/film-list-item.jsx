import { Rate } from 'antd'

import ApiLogic from '../../logic/api-logic'
import textSlice from '../../logic/text-logic'
import getDate from '../../logic/date-logic'
import { Consumer } from '../film-app/film-app'

import './film-list-item.css'

function FilmListItem({ film, login }) {
  const api = new ApiLogic()
  const imgUrl = film['backdrop_path']
    ? `https://image.tmdb.org/t/p/original/${film['backdrop_path']}` // if not have poster url use image by default
    : 'https://c.tenor.com/x8v1oNUOmg4AAAAd/rickroll-roll.gif'
  const slicedText = textSlice(film['overview']) // slice text by 200 symbols
  const dateRelease = getDate(film['release_date']) // format date
  const filmTitle = film['title'].length > 21 ? { fontSize: '15px' } : { fontSize: '20px' }
  const filmRating = film['rating'] ? film['rating'] : 0
  const style = api.ratingStyle(film['vote_average'])

  return (
    <Consumer>
      {(genres) => {
        const genresShow = () => {
          return api.addGenresToFilm(film['genre_ids'], genres)
        }
        const genresList = genresShow()
        return (
          <li className={'film-card'}>
            <div>
              <img className={'film-img'} src={imgUrl} alt="film image" />
            </div>

            <div className="film-card__content">
              <div className={'film-rating'} style={style}>
                <span className={'film-rating__score'}>{film['vote_average']}</span>
              </div>
              <h3 className={'film-card__title'} style={filmTitle}>
                {film['title']}
              </h3>
              <p className={'film-card__date'}>{dateRelease}</p>
              <div className="film-card__genre">
                {genresList.map((item) => {
                  return (
                    <a key={item.id} className={'genre-item'} href="#">
                      {item.name}
                    </a>
                  )
                })}
              </div>
              <p className="film-card__text">{slicedText}</p>
              <div className="rate-container">
                <Rate
                  allowHalf
                  defaultValue={filmRating}
                  count={10}
                  onChange={(rate) => api.rateFilm(film['id'], login, rate)}
                />
              </div>
            </div>
          </li>
        )
      }}
    </Consumer>
  )
}
export default FilmListItem
