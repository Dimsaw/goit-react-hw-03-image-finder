import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { Oval } from 'react-loader-spinner';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import fetchImages from './API-services';
import Button from './components/Button';

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
    status: Status.IDLE,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.searchPictures;
    const nextName = this.state.searchPictures;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevName !== nextName || prevPage !== nextPage) {
      console.log('erre');
      this.setState({ status: Status.PENDING, loading: true });

      fetchImages(nextName, nextPage)
        .then(images => {
          this.setState(prevState => {
            return {
              images: [...prevState.images, ...images.hits],
              status: Status.RESOLVED,
              Loading: true,
            };
          });
          if (images.hits.length === 0) {
            this.setState({ loading: false });
            toast.error(
              'Sorry, there are no images matching your search query. Please try again.',
            );
          }

          if (images.hits.length < 12 && images.hits.length >= 1) {
            this.setState({ loading: false });
            toast.error(
              `We're sorry, but you've reached the end of search results.`,
            );
          }
        })

        .catch(error => this.setState({ message: 'ERROR' }));
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
    const { images, status, message, loading } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handelFormSubmit} />
        {status === 'idle' && <p>Enter name.</p>}
        {status === 'resolved' && <ImageGallery images={images} />}
        {status === 'pending' && (
          <Oval color="#00BFFF" height={80} width={80} />
        )}
        {status === 'rejected' && <div>{message}</div>}

        {loading && <Button increment={this.increment} />}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
