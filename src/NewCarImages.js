import * as React from "react";
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

class NewCarImages extends React.Component {
    render(){
        return (
            <ImageGallery items={this.props.images} showPlayButton={false} showFullscreenButton={false} showBullets={true} showThumbnails={false}/>
        )
    }
}

export default NewCarImages;

