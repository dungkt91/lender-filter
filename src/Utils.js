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

const Utils = {
    convertStr:convertStr
}

export default Utils;