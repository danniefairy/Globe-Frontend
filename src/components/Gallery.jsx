import React, { useState, useEffect, useRef } from 'react';

function showImageModal(imageSrc) {
  var modal = document.createElement('div');
  modal.classList.add('fixed', 'inset-0', 'flex', 'items-center', 'justify-center', 'bg-black', 'bg-opacity-80');
  modal.style.zIndex=9999;

  var modalContent = document.createElement('div');
  modalContent.classList.add('bg-white', 'sm\:max-w-2xl', 'p-8');


  var image = document.createElement('img');
  image.src = imageSrc;
  image.classList.add('w-full');

  modalContent.appendChild(image);
  modal.appendChild(modalContent);

  document.body.appendChild(modal);

  modal.onclick = function() {
    modal.remove();
  };
}

function ImageGallery(props) {
  // State to track the visible images
  const [visibleImages, setVisibleImages] = useState([]);

  // Reference to the image container element
  const imageContainerRef = useRef(null);

  // Effect to handle scrolling and load more images
  useEffect(() => {
    // Scroll event handler
    const handleScroll = () => {
      const container = imageContainerRef.current;
      const scrollPosition = container.scrollTop + container.clientHeight;
      const shouldLoadMore = scrollPosition >= container.scrollHeight;

      if (shouldLoadMore) {
        // Load additional images when scrolling reaches the bottom
        const remainingImages = props.images.slice(
          visibleImages.length,
          visibleImages.length + 10
        );
        setVisibleImages(prevImages => [...prevImages, ...remainingImages]);
      }
    };

    const container = imageContainerRef.current;
    container.addEventListener('scroll', handleScroll);

    // Clean up the event listener when component unmounts
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [visibleImages, props.images]);

  // Effect to initialize the visible images when the component mounts
  useEffect(() => {
    // initialize
    const initialImages = props.images.slice(0, 10);
    setVisibleImages(initialImages);

    // Reset scroll position to top
    const container = imageContainerRef.current;
    container.scrollTop = 0;
  }, [props.images]);

  return (
    <div
      ref={imageContainerRef}
      className="w3-row-padding"
      style={{ overflow: 'auto', height: '100vh' }}
    >
      <h1 className="fixed-header">
        <b>
          <i className="fa fa-map-marker" style={{ font: '24px' }}></i>{' '}
          {props.city}
        </b>
      </h1>
      {visibleImages.map((image, index) => (
        <div className="w3-row-padding" key={index}>
          <div className="w3-first w3-container w3-margin-bottom">
            <div className="w3-container w3-white">
              <p>
                <b>
                  <i className="fa fa-clock-o" style={{ font: '36px' }}></i>{' '}
                  {image.date}
                </b>
              </p>
            </div>
            <img
              src={props.server_endpoint + image.url}
              alt="Norway"
              //className="w3-hover-opacity photo"
              onClick={() => showImageModal(props.server_endpoint + image.url)}
              class="clickable-image cursor-pointer w3-hover-opacity photo"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ImageGallery;
