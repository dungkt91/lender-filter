export function fetchCarDetails(){
    return fetch("https://lender-filter-backend-test.herokuapp.com/cars/").then(reponse => reponse.json());
}

export function fetchLenders(){
    return fetch("https://lender-filter-backend-test.herokuapp.com/lenders/").then(reponse => reponse.json());
}

export function fetchLenderTerms(){
    return fetch("https://lender-filter-backend-test.herokuapp.com/lenders/terms/").then(reponse => reponse.json());
}

export function fetchLenderPrograms(){
    return fetch("https://lender-filter-backend-test.herokuapp.com/lenders/programs/").then(reponse => reponse.json());
}