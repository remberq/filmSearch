import { Component } from 'react'
import './film-search.css'

export default class FilmSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }
    this.onChangeValue = this.onChangeValue.bind(this)
    this.onSubmitForm = this.onSubmitForm.bind(this)
  }

  onSubmitForm(e) {
    e.preventDefault()
  }

  onChangeValue(e) {
    this.setState({ value: e.target.value })
    if (e.target.value) {
      this.props.search(e.target.value)
    } else this.props.search('return')
  }

  render() {
    return (
      <form className="film-search-container" onSubmit={this.onSubmitForm}>
        <input
          className={'film-search-input'}
          onChange={this.onChangeValue}
          type="text"
          placeholder={'Type to search...'}
          value={this.state.value}
        />
      </form>
    )
  }
}
