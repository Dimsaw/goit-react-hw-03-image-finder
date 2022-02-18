import React from 'react';
// import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  return <img src={webformatURL} alt={tags} />;
};

export default ImageGalleryItem;
