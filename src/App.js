import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';

class App extends Component {
  state = {
    searchPictures: [],
  };

  // componentDidMount() {
  //   fetch(`${BASE_URL}?key=${API_KEY}&q=cat&image_type=photo&per_page=12`)
  //     .then(res => res.json())
  //     .then(searchPictures => this.setState({ searchPictures }));
  // }

  handelFormSubmit = searchPictures => {
    this.setState({ searchPictures });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handelFormSubmit} />
        <ImageGallery searchPictures={this.state.searchPictures} />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
