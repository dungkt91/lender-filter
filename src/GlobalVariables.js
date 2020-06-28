const globalDict = {
    filterValues:null,
    lenderInputs:null,
    lenderData:null
}

export function setFilterValues(newFilterValues){
    console.log('setFilterValues');
    console.log(newFilterValues);
    globalDict.filterValues = {...newFilterValues};
}

export function getFilterValues(){
    return {...globalDict.filterValues};
}

export function setLenderInputs(newLenderInputs){
    globalDict.lenderInputs = [...newLenderInputs];
}

export function getLenderInputs(){
    return [...globalDict.lenderInputs];
}

export function setLenderData(newLenderData){
    globalDict.lenderData = [...newLenderData];
}

export function getLenderData(){
    return [...globalDict.lenderData];
}