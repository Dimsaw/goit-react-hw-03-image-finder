import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import fetchImages from './API-services';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class App extends Component {
  state = {
    searchPictures: '',
    images: [],
    loading: false,
    error: null,
    page: 1,
    message: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.searchPictures;
    const nextName = this.state.searchPictures;
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    if (prevName !== nextName || prevPage !== nextPage) {
      console.log('erre');
      this.setState({ status: Status.PENDING });

      fetchImages(nextName)
        .then(images =>
          this.setState(prevState => {
            return {
              images: [...prevState.images, ...images.hits],
              status: Status.RESOLVED,
            };
          }),
        )
        .catch(error => this.setState({ message: 'finish' }));
    }
  }

  handelFormSubmit = searchPictures => {
    this.setState({ searchPictures, images: [] });
  };

  increment = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handelFormSubmit} />
        <ImageGallery images={images} />
        <ToastContainer autoClose={3000} />
        <button type="button" onClick={this.increment}>
          load more
        </button>
      </div>
    );
  }
}

export default App;
