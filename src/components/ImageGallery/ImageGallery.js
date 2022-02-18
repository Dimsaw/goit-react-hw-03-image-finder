// import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import s from './ImageGallery.module.css';

function ImageGallery({ images }) {
  return (
    <ul className={s.gallery}>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <li key={id} className={s.item}>
          <ImageGalleryItem
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
          />
        </li>
      ))}
    </ul>
  );
}

export default ImageGallery;
