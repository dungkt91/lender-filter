export const initialState = {
    carDetails:null,
    lenders:null,
    lenderTerms:null,
    lenderPrograms:null,
    filters:{},
    year_filter_expand:true,
    make_filter_expand:true,
    model_filter_expand:true,
    mileage_filter_expand:true,
    total_cost_filter_expand:true,
}

function createFilterValues(values){
    let min = Math.min(...values);
    let max = Math.max(...values);

    return {
        "min":min,
        "max":max,
        "current_min":min,
        "current_max":max
    }
}
const appReducer = (state=initialState, action) => {
    switch(action.type){
        case "FETCH_DATA":
            let makeOptions = new Set();
            let modelOptions = new Set();
            let years = [];
            let mileages = [];
            let totalCosts = [];
            let makeToCountDict = {};
            let modelToCountDict = {};


            for(let carDetail of action.carDetails){
                let make = carDetail["make"];
                let model = carDetail["model"];
                let year = carDetail["year"];
                let mileage = carDetail["mileage"];
                let total_cost = carDetail["total_cost"];

                makeOptions.add(make);
                modelOptions.add(model);
                if (!isNaN(year))
                    years.push(parseInt(year));

                if (!isNaN(mileage))
                    mileages.push(parseInt(mileage));

                if (!isNaN(total_cost))
                    totalCosts.push(parseInt(total_cost));

                if(!(make in makeToCountDict)){
                    makeToCountDict[make] = 0;
                }

                makeToCountDict[make] = makeToCountDict[make] + 1;

                if(!(model in modelToCountDict)){
                    modelToCountDict[model] = 0;
                }

                modelToCountDict[model] = modelToCountDict[model] + 1;
            }

            return {...state, ...{
                    carDetails:action.carDetails,
                    lenders:action.lenders,
                    lenderPrograms:action.lenderPrograms,
                    lenderTerms:action.lenderTerms
                }, filters:{
                    "year":{
                        ...createFilterValues(years)
                    },
                    "make":{
                        "options":Array.from(makeOptions),
                        "selectedOptions":Array.from(makeOptions),
                        "displayCount":true,
                        "counts":makeToCountDict
                    },
                    "model":{
                        "options":Array.from(modelOptions),
                        "selectedOptions":Array.from(modelOptions),
                        "displayCount":true,
                        "counts":modelToCountDict
                    },
                    "mileage":{
                        ...createFilterValues(mileages)
                    },
                    "total_cost":{
                        ...createFilterValues(totalCosts)
                    }
                }};
        case "UPDATE_FILTER":
            console.log("Update filter");
            let filter = state.filters[action.filter_name];
            filter = {...filter, ...action.value};
            let newFilters = {...state.filters};
            newFilters[action.filter_name] = filter;
            console.log(newFilters);
            return {...state, filters:newFilters};
        case "FILTER_EXPAND_COLLAPSE":
            let newState = {...state};
            newState[action.name + "_expand"] = action.state;

            return newState;
        default: return state;
    }
}

export default appReducer;