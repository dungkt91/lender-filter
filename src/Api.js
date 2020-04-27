var domain = 'https://lender-filter-backend-test.herokuapp.com';

function fetchCars(){
    return fetch(`${domain}/cars/`);
}

function fetchLenders(){
    return fetch(`${domain}/lenders/`);
}

function fetchLenderPrograms(){
    return fetch(`${domain}/lenders/programs/`);
}

function fetchLenderTerms(){
    return fetch(`${domain}/lenders/terms/`)
}


export {fetchCars, fetchLenders, fetchLenderPrograms, fetchLenderTerms};