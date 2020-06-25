import * as React from "react";
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './CarImagesGallery.css';

export default class CarImagesGallery extends React.Component{
    render(){
        return (
            <ImageGallery items={this.props.images} showPlayButton={false} showFullscreenButton={false} showThumbnails={false}/>
        );
    }
}