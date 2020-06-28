const globalDict = {
    filterValues:null
}

export function setFilterValues(newFilterValues){
    console.log('setFilterValues');
    console.log(newFilterValues);
    globalDict.filterValues = {...newFilterValues};
}

export function getFilterValues(){
    return {...globalDict.filterValues};
}