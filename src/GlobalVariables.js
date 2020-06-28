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
    if (globalDict.filterValues)
        return {...globalDict.filterValues};

    return null;
}

export function setLenderInputs(newLenderInputs){
    globalDict.lenderInputs = [...newLenderInputs];
}

export function getLenderInputs(){
    if (globalDict.lenderInputs)
        return [...globalDict.lenderInputs];

    return null;
}

export function setLenderData(newLenderData){
    globalDict.lenderData = [...newLenderData];
}

export function getLenderData(){
    if (globalDict.lenderData)
        return [...globalDict.lenderData];

    return null;
}