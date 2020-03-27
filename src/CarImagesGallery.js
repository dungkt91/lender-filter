import * as React from "react";
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './CarImagesGallery.css';

const images = [
    {
        original: 'https://www.dropbox.com/s/0xtbjp3gcm650fy/image_0.png?raw=1',
        thumbnail: 'https://www.dropbox.com/s/0xtbjp3gcm650fy/image_0.png?raw=1'
    },
    {
        original: 'https://www.dropbox.com/s/tuj84ho2up1vofh/image_1.png?raw=1',
        thumbnail: 'https://www.dropbox.com/s/tuj84ho2up1vofh/image_1.png?raw=1'
    },
    {
        original: 'https://www.dropbox.com/s/1sa79eyy7og6t51/image_2.png?raw=1',
        thumbnail: 'https://www.dropbox.com/s/1sa79eyy7og6t51/image_2.png?raw=1'
    },
    {
        original: 'https://www.dropbox.com/s/nfkkglb0odsu4te/image_3.png?raw=1',
        thumbnail: 'https://www.dropbox.com/s/nfkkglb0odsu4te/image_3.png?raw=1'
    },
    {
        original: 'https://www.dropbox.com/s/2vq1cj46oot8kf2/image_4.png?raw=1',
        thumbnail: 'https://www.dropbox.com/s/2vq1cj46oot8kf2/image_4.png?raw=1'
    },
    {
        original: 'https://www.dropbox.com/s/qvo9jf2ufn0p4kt/image_5.png?raw=1',
        thumbnail: 'https://www.dropbox.com/s/qvo9jf2ufn0p4kt/image_5.png?raw=1'
    },
    {
        original: 'https://www.dropbox.com/s/covz2iuq9sz6oe2/image_6.png?raw=1',
        thumbnail: 'https://www.dropbox.com/s/covz2iuq9sz6oe2/image_6.png?raw=1'
    },
    {
        original: 'https://www.dropbox.com/s/861x4fx5nl3pdtr/image_7.png?raw=1',
        thumbnail: 'https://www.dropbox.com/s/861x4fx5nl3pdtr/image_7.png?raw=1'
    },
    {
        original: 'https://www.dropbox.com/s/rf2z9ksajhmjzjj/image_8.png?raw=1',
        thumbnail: 'https://www.dropbox.com/s/rf2z9ksajhmjzjj/image_8.png?raw=1'
    },
];

export default class CarImagesGallery extends React.Component{
    render(){
        return (
            <ImageGallery items={images} showPlayButton={false} showFullscreenButton={false} showNav={false}/>
        );
    }
}