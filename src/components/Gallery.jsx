import React from 'react';

function ImageGallery(props) {
    return (
        <div className="w3-row-padding" style={{ overflow: 'auto', height: '100vh' }}>
            <h1 className="fixed-header"><b><i class="fa fa-map-marker" style={{ font:"24px" }}></i> {props.city}</b></h1>
            {props.images.map((image, index) => (
                <div class="w3-row-padding">
                    <div class="w3-first w3-container w3-margin-bottom">
                        <div class="w3-container w3-white">
                            <p><b><i class="fa fa-clock-o" style={{ font: "36px" }}></i> {image.date}</b></p>
                        </div>
                        <img src={props.server_endpoint+image.url} alt="Norway"  class="w3-hover-opacity photo" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ImageGallery;