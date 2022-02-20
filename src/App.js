import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { Oval } from 'react-loader-spinner';
import Modal from './components/Modal';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import fetchImages from './API-services';
import Button from './components/Button';
import s from './App.module.css';

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
    page: '',
    message: '',
    status: Status.IDLE,
    showModal: false,
    url: '',
    tags: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.searchPictures;
    const nextName = this.state.searchPictures;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevName !== nextName || prevPage !== nextPage) {
      this.setState({ status: Status.PENDING, loading: true });

      fetchImages(nextName, nextPage)
        .then(images => {
          this.setState(prevState => {
            return {
              status: Status.RESOLVED,
              images: [...prevState.images, ...images.hits],

              Loading: true,
            };
          });
          this.handleScroll();
          if (images.hits.length === 0) {
            this.setState({ loading: false });
            toast.error(
              'Sorry, there are no images matching your search query. Please try again.',
            );
          }
          const endPage = images.totalHits / images.hits.length;
          if (
            nextPage === endPage ||
            (images.hits.length < 12 && images.hits.length >= 1)
          ) {
            this.setState({ loading: false });
            toast.error(
              `We're sorry, but you've reached the end of search results.`,
            );
          }
        })

        .catch(error => this.setState({ message: 'ERROR' }));
    }
  }

  increment = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handelFormSubmit = searchPictures => {
    this.setState({ searchPictures, images: [], page: 1 });
  };

  handleScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleClick = (url, tags) => {
    this.setState({ url, tags });
    this.toggleModal();
  };

  render() {
    const { images, status, message, loading, showModal, url, tags } =
      this.state;
    return (
      <>
        <Searchbar onSubmit={this.handelFormSubmit} />
        {status === 'idle' && <p className={s.header}>Enter name.</p>}

        {status === 'pending' && (
          <Oval color="#00BFFF" height={80} width={80} />
        )}

        {status === 'rejected' && <div>{message}</div>}

        <ImageGallery images={images} tags={tags} onClick={this.handleClick} />

        {loading && <Button increment={this.increment} />}

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img className="imageLarge" alt={tags} src={url} />
          </Modal>
        )}
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}

export default App;
