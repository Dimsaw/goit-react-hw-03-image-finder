import { Component } from 'react';
import { AiFillAlert } from 'react-icons/ai';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// const API_KEY = '24793371-9eea329880a97afb5c057777f';
// const BASE_URL = 'https://pixabay.com/api/';

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

  //   componentDidMount() {
  //     fetch(`${BASE_URL}?key=${API_KEY}&q=cat&image_type=photo&per_page=12`)
  //       .then(res => res.json())
  //       .then(searchPictures => this.setState({ searchPictures }));
  //   }

  render() {
    return (
      <header class="searchbar">
        <form class="form" onSubmit={this.handleSubmit}>
          <button type="submit" class="button">
            <span class="button-label">
              Search <AiFillAlert />
            </span>
          </button>

          <input
            class="input"
            type="text"
            autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
            value={this.state.searchPictures}
            onChange={this.handlePicturesChange}
          />
        </form>
        {/* <ImageGallery searchPictures={this.state.searchPictures} /> */}
      </header>
    );
  }
}

export default Searchbar;
