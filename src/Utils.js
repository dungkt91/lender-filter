function convertStr(str){
    let words = str.split(/(\s+)/);

    return words.map(word => {
        let result = '';

        if (word.length > 0){
            result += word.charAt(0).toUpperCase();
        }

        if (word.length > 1){
            result += word.substring(1).toLowerCase();
        }

        return result;
    }).join(' ');
}

function sortImages(images){
    images.sort((img1, img2) => {
        return img1["name"].localeCompare(img2["name"]);
    });
}

const Utils = {
    convertStr:convertStr,
    sortImages:sortImages
}

export default Utils;