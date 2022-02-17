// import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';

function ImageGallery({ images }) {
  return (
    <ul>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          id={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
        />
      ))}
    </ul>
  );
}

export default ImageGallery;

// class ImageGallery extends Component {
//   state = {
//     searchImages: null,
//     loading: false,
//     error: null,
//     page: 1,
//   };

//

//   componentDidUpdate(prevProps, prevState) {
//     if (prevProps.searchPictures !== this.props.searchPictures) {
//       console.log('erre');
//       this.setState({ loading: true });
//       fetch(
//         `${BASE_URL}?key=${API_KEY}&q=${this.props.searchPictures}&image_type=photo&per_page=12`,
//       )
//         .then(response => {
//           if (!response.ok) {
//             throw new Error(`there are not ${this.props.searchPictures}`);
//           }
//           return response.json();
//         })

//         .then(searchImages => this.setState({ searchImages }))
//         .catch(error => this.setState(error))
//         .finally(() => this.setState({ loading: false }));
//     }
//   }
//   render() {
//     const { loading, searchImages, error } = this.state;
//     // const { searchPictures } = this.props;

//     return (
//       <div>
//         {error && <h1>{error.message}</h1>}

//         {loading && <div>Loading...</div>}
//         {!searchImages && <div>Введите данные для поиска</div>}
//         {/* {searchImages && (
//           <div>
//             {searchImages.hits[0].id}
//             <img
//               src={searchImages.hits[0].largeImageURL}
//               alt={searchImages.hits[0].tags}
//               width="300"
//             />
//           </div>
//         )} */}
//       </div>
//     );
//   }
// }

// export default ImageGallery;
