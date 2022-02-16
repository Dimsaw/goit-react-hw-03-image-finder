import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import ImageGalleryItem from '../ImageGalleryItem';

const API_KEY = '24793371-9eea329880a97afb5c057777f';
const BASE_URL = 'https://pixabay.com/api/';

class ImageGallery extends Component {
  state = {
    searchImages: null,
    loading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchPictures !== this.props.searchPictures) {
      console.log('erre');
      this.setState({ loading: true });
      fetch(
        `${BASE_URL}?key=${API_KEY}&q=${this.props.searchPictures}&image_type=photo&per_page=12`,
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(
            new Error(`there are not ${this.props.searchPictures}`),
          );
        })

        .then(searchImages => this.setState({ searchImages }))
        .catch(error => this.setState(error))
        .finally(() => this.setState({ loading: false }));
    }
  }
  render() {
    const { loading, searchImages, error } = this.state;
    // const { searchPictures } = this.props;

    return (
      <div>
        {error && <h1>{error.message}</h1>}

        {loading && <div>Loading...</div>}
        {!searchImages && <div>Введите данные для поиска</div>}
        {/* {searchImages && (
          <div>
            {searchImages.hits[0].id}
            <img
              src={searchImages.hits[0].largeImageURL}
              alt={searchImages.hits[0].tags}
              width="300"
            />
          </div>
        )} */}
      </div>
    );
  }
}

// const ImageGallery = ({ searchPictures }) => (
//   <ul>
//     <li></li>
//     {/* {searchPictures.map(({ id, webformatURL, largeImageURL, tags }) => (
//       <ImageGalleryItem
//         id={id}
//         webformatURL={webformatURL}
//         largeImageURL={largeImageURL}
//         tags={tags}
//       />
//     ))} */}
//   </ul>
// );

export default ImageGallery;
