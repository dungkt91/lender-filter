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

const getMaxProfit = (carDetail) => {
    let maxProfit = Number.NEGATIVE_INFINITY;

    if("car_calculation" in carDetail) {
        for (let carCalculation of carDetail["car_calculation"]) {
            let profit = carCalculation["profit"];

            if (profit != "NOT_FOUND" && profit > maxProfit) {
                maxProfit = profit;
            }
        }
    }

    return maxProfit;
}

const Utils = {
    convertStr:convertStr,
    sortImages:sortImages,
    getMaxProfit:getMaxProfit
}


export default Utils;