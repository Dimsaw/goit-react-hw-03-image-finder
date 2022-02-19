import { Component } from 'react';
import { GrSearch } from 'react-icons/gr';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    searchPictures: '',
  };

  handlePicturesChange = event => {
    this.setState({ searchPictures: event.currentTarget.value.toLowerCase() });
  };
  handleSubmit = event => {
    event.preventDefault();

    if (this.state.searchPictures.trim() === '') {
      return toast.error('Input is empty!');
    }
    this.props.onSubmit(this.state.searchPictures);
    this.setState({ searchPictures: '' });
  };

  render() {
    return (
      <>
        <header className={s.searchbar}>
          <form className={s.form} onSubmit={this.handleSubmit}>
            <button type="submit" className={s.button}>
              <span class="button-label">
                Search <GrSearch />
              </span>
            </button>

            <input
              className={s.input}
              type="text"
              autocomplete="off"
              // autofocus
              placeholder="Search images and photos"
              value={this.state.searchPictures}
              onChange={this.handlePicturesChange}
            />
          </form>
        </header>
      </>
    );
  }
}

export default Searchbar;
