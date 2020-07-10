const initialState = {
    "loadDataFinished":false,
    "carDetails": [],
    "lenderPrograms": [],
    "lenderTerms": [],
    "lenders": [],
    "postProcessingCarDetails": [],
    "filters": {
        "year": {
            "type": "range",
            "min": "",
            "max": "",
            "currentMin": "",
            "currentMax": ""
        },
        "make": {
            "type": "list",
            "options": [],
            "selectedOptions": []
        },
        "model": {
            "type": "list",
            "options": [],
            "selectedOptions": []
        },
        "mileage": {
            "type": "range",
            "min": "",
            "max": "",
            "currentMin": "",
            "currentMax": ""
        },
        "total_cost": {
            "type": "range",
            "min": "",
            "max": "",
            "currentMin": "",
            "currentMax": ""
        }
    },
    "year_filter_section_expand": true,
    "make_filter_section_expand": true,
    "model_filter_section_expand": true,
    "mileage_filter_section_expand": true,
    "total_cost_filter_section_expand": true,
    "sortOptionIndex": 0,
    "tabIndex": 0,
    "viewTypeIndex": 0,
    "lenderIdToLenderNameDict": {},
    "lenderToPrograms": {},
    "lenderNameAndTierNameToProgram": {},
    "lenderNameToTerms": {},
    "selectedLender": "",
    "selectedTier": "",
    "lenderSelectDisabled": false,
    "tierSelectDisabled": true,
    "textFieldsDisabled": true,
    "addBtnDisabled": true,
    "resetBtnDisable": true,
    "payment": "",
    "downPayment": "",
    "tradeAllowance": "",
    "tradePayOff": "",
    "tradeAcv": "",
    "tax": "",
    "paymentDisabled": true,
    "downPaymentDisabled": true,
    "tradeAllowanceDisabled": true,
    "tradePayOffDisabled": true,
    "tradeAcvDisabled": true,
    "taxDisabled": true,
    "lenderInputs": [],
    "lenderInputDialogOpen":false,
    "isLoading":false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE_FILTER":
            return updateFilterNewState(state, action);
        case "FETCH_DATA_FINISHED":
            return fetchDataFinished(state, action);
        case "EXPAND_OR_COLLAPSE_FILTER_SECTION":
            return expandOrCollapseFilterSection(state, action);
        case "SORT_BY_SELECTION":
            return sortBy(state, action);
        case "CHANGE_TAB":
            return {...state, "tabIndex": action.index};
        case "CHANGE_VIEW_TYPE":
            return {...state, "viewTypeIndex": action.index};
        case "SELECT_LENDER":
            return {...state, "selectedLender": action.name, "tierSelectDisabled": false, "resetBtnDisable": false};
        case "SELECT_TIER":
            return {
                ...state, "selectedTier": action.name, "textFieldsDisabled": false, "addBtnDisabled": false,
                "paymentDisabled": false,
                "downPaymentDisabled": false,
                "tradeAllowanceDisabled": false,
                "tradePayOffDisabled": false,
                "tradeAcvDisabled": false,
                "taxDisabled": false
            };
        case "RESET_LENDER_INPUT":
            return {
                ...state,
                "selectedLender": "", "selectedTier": "", "lenderSelectDisabled": false,
                "tierSelectDisabled": true, "addBtnDisabled": "true", "resetBtnDisable": true,
                "payment": "", "downPayment": "", "tradeAllowance": "", "tradePayOff": "",
                "tradeAcv": "", "tax": "",
                "paymentDisabled": true,
                "downPaymentDisabled": true,
                "tradeAllowanceDisabled": true,
                "tradePayOffDisabled": true,
                "tradeAcvDisabled": true,
                "taxDisabled": true
            };
        case "CHANGE_LENDER_INPUT_FIELD":
            return {...state, [action.name]: action.value}
        case "ADD_LENDER":
            return addLender(state, action);
        case "REMOVE_LENDER_INPUT":
            return removeLenderInput(state, action);
        case "SELECT_INTEREST":
            return selectInterest(state, action);
        case "DELETE_LENDER_INPUT":
            return deleteLenderInput(state, action);
        case "CLOSE_LENDER_INPUT_DIALOG":
            return {...state, "lenderInputDialogOpen":false};
        case "OPEN_LENDER_INPUT_DIALOG":
            return {...state, "lenderInputDialogOpen":true};
        case "LOADING":
            return {...state, "isLoading":action.value}
        case "UPDATE_SCREEN_DATA":
            return {...state, "screenData" : action.value};
        default:
            return state;
    }
}

const deleteLenderInput = (state, action) => {
    let lenderInputs = [...state["lenderInputs"]];
    lenderInputs.splice(action.index, 1);

    return {
        ...state,
        "lenderInputs":lenderInputs
    }
}

const selectInterest = (state, action) => {
    let carDetail = action.carDetail;
    let lenderInputIndex = action.lenderInputIndex;
    let interest = action.interest;

    return {
        ...state,
        "postProcessingCarDetails": state["postProcessingCarDetails"].map(curCarDetail => {
            if(curCarDetail["id"] == carDetail["id"]){
                return {
                    ...curCarDetail,
                    "car_calculation": curCarDetail["car_calculation"].map((carCalculation, carCalculationIndex) => {
                        if (carCalculationIndex == lenderInputIndex) {
                            let newCarCalculation = {
                                ...carCalculation,
                                "interest": interest
                            };


                            return {
                                ...newCarCalculation,
                                ...calculateFrontAndProfit(newCarCalculation)
                            };
                        } else {
                            return carCalculation;
                        }
                    })
                }
            }else{
                return curCarDetail
            }
        })
    };
}

const removeLenderInput = (state, action) => {
    let newState = {...state};
    let newLenderInputs = [...newState["lenderInputs"]];

    newLenderInputs.splice(action.index, 1);
    newState["lenderInputs"] = newLenderInputs;
    newState["postProcessingCarDetails"] = [...newState["postProcessingCarDetails"]];
    updateCalculation(newState);
    sort(newState["postProcessingCarDetails"], newState["sortOptionIndex"]);

    return newState;
}

const addLender = (state, action) => {
    let newState = {...state};
    let newLenderInputs = [...newState["lenderInputs"]];

    newLenderInputs.push({
        "selectedLender": newState["selectedLender"],
        "selectedTier": newState["selectedTier"],
        "payment": newState["payment"],
        "downPayment": newState["downPayment"],
        "tradeAllowance": newState["tradeAllowance"],
        "tradePayOff": newState["tradePayOff"],
        "tradeAcv": newState["tradeAcv"],
        "tax": newState["tax"],
    })

    newState["lenderInputs"] = newLenderInputs;
    newState["postProcessingCarDetails"] = [...newState["postProcessingCarDetails"]];
    updateCalculation(newState);
    sort(newState["postProcessingCarDetails"], newState["sortOptionIndex"]);

    return {
        ...newState,
        "selectedLender": "", "selectedTier": "", "lenderSelectDisabled": false,
        "tierSelectDisabled": true, "addBtnDisabled": "true", "resetBtnDisable": true,
        "payment": "", "downPayment": "", "tradeAllowance": "", "tradePayOff": "",
        "tradeAcv": "", "tax": "",
        "paymentDisabled": true,
        "downPaymentDisabled": true,
        "tradeAllowanceDisabled": true,
        "tradePayOffDisabled": true,
        "tradeAcvDisabled": true,
        "taxDisabled": true
    }
}

function mileageToKms(mileage) {
    return mileage * 1.60934;
}

const updateCalculation = (state) => {
    let newCarDetails = state["postProcessingCarDetails"];
    let baseCarCalculations = createBaseCarCalculations(state);

    for(let carDetail of newCarDetails){
        carDetail["car_calculation"] = createCarCalculations(carDetail, baseCarCalculations, state);
    }

    state["postProcessingCarDetails"] = newCarDetails;
}

const createBaseCarCalculations = (state) => {
    let result = [];
    let lenderInputs = state["lenderInputs"];
    let lenderNameAndTierNameToProgram = state["lenderNameAndTierNameToProgram"];

    for(let lenderInput of lenderInputs){
        let lenderName = lenderInput["selectedLender"];
        let tierName = lenderInput["selectedTier"];
        let lenderProgram = null;

        // Find lender program
        if (lenderName in lenderNameAndTierNameToProgram && tierName in lenderNameAndTierNameToProgram[lenderName]){
            lenderProgram = lenderNameAndTierNameToProgram[lenderName][tierName];
        }

        // Create interest list
        let interestList = [];

        if(lenderProgram != null){
            for (let interest = lenderProgram.rate_min; interest <= lenderProgram.rate_max; interest += 1) {
                interestList.push(interest.toFixed(2));
            }
        }

        let firstInterest = "";
        if(interestList.length > 0){
            firstInterest = interestList[0];
        }

        result.push({
           "lenderProgram":lenderProgram,
           "advance": (lenderProgram != null)?lenderProgram.advance: "NOT_FOUND",
            "interestList":interestList,
            "interest": firstInterest
        });
    }

    return result;
}

const createCarCalculations = (carDetail, baseCarCalculations, state) => {
    let lenderInputs = state["lenderInputs"];
    let carCalculations = [];
    let carKms = mileageToKms(parseFloat(carDetail.mileage));
    let lenderNameToTerms = state["lenderNameToTerms"];

    for (let lenderInputIndex = 0; lenderInputIndex < lenderInputs.length; lenderInputIndex++){
        let lenderInput = lenderInputs[lenderInputIndex];
        let lenderName = lenderInput["selectedLender"];
        let lenderTerms = [];

        if(lenderName in lenderNameToTerms){
            lenderTerms = lenderNameToTerms[lenderName];
        }

        let foundLenderTerm = null;

        for(let lenderTerm of lenderTerms){
            if (lenderTerm.min_kms <= carKms && lenderTerm.max_kms >= carKms && lenderTerm.year == parseInt(carDetail.year)) {
                foundLenderTerm = lenderTerm;
                break;
            }
        }

        let carCalculation = {
            "carDetails":carDetail,
            "lenderInput":lenderInput,
            ...baseCarCalculations[lenderInputIndex],
            "lenderTerm":foundLenderTerm,
            "term":(foundLenderTerm != null)?foundLenderTerm["term"] : "NOT_FOUND",
            "back":0, // back is always 0
        }

        carCalculations.push({
            ...carCalculation,
            ...calculateFrontAndProfit(carCalculation)
        });
    }

    return carCalculations;
}

const calculateFrontAndProfit = (carCalculation) => {
    let maxFront = 'NOT_FOUND';
    let lenderTerm = carCalculation["lenderTerm"];
    let advance = carCalculation["advance"];
    let carDetails = carCalculation["carDetails"];
    let interest = carCalculation["interest"];
    let term = carCalculation["term"];
    let lenderProgram = carCalculation["lenderProgram"];
    let lenderInput = carCalculation["lenderInput"];

    if (lenderTerm !=null && advance != "NOT_FOUND"){
        let termType = lenderTerm.type.replace(/\s/g, '');
        console.log('termType = ' + termType);

        switch(termType.toLowerCase()){
            case 'x-clean':
                maxFront = carDetails.x_clean * advance - carDetails.total_cost;
                break;
            case 'clean':
                maxFront = carDetails.clean  * advance - carDetails.total_cost;
                break;
            case 'average':
                maxFront = carDetails.average  * advance - carDetails.total_cost;
                break;
            case 'rough':
                maxFront = carDetails.rough  * advance - carDetails.total_cost;
                break;
        }

        maxFront = Math.round(maxFront);
    }

    console.log('maxFront = ' + maxFront);

    let payment = lenderInput["payment"];
    // Calculate max profit
    let maxProfit = 'NOT_FOUND';

    if (interest != "" && term!='NOT_FOUND') {
        let discount = 0;
        let tax = 0;
        let financed = pv((interest / 100 + discount + tax) / 12, term, -payment, 0);
        let holdBack = lenderProgram.hold_back;
        let funded = financed * (1 - holdBack);

        console.log('financed = ' + financed);
        console.log('holdBack = ' + holdBack);
        console.log('funded = ' + funded);

        let lender = 0;
        let ppsa = 0;

        let tradeAllowance = 0;
        if (lenderInput["tradeAllowance"] != '' && !isNaN(lenderInput["tradeAllowance"])) {
            tradeAllowance = parseFloat(lenderInput["tradeAllowance"]);
        }

        let tradePayOff = 0;
        if (lenderInput["tradePayOff"] != '' && !isNaN(lenderInput["tradePayOff"])) {
            tradePayOff = parseFloat(lenderInput["tradePayOff"])
        }

        let downPayment = 0;
        if (lenderInput["downPayment"] != '' && !isNaN(lenderInput["downPayment"])) {
            downPayment = parseFloat(lenderInput["downPayment"]);
        }

        let tradeAcv = 0;
        if (lenderInput["tradeAcv"] != '' && !isNaN(lenderInput["tradeAcv"])) {
            tradeAcv = parseFloat(lenderInput["tradeAcv"])
        }

        console.log('tradeAllowance = ' + tradeAllowance);
        console.log('tradePayOff = ' + tradePayOff);
        console.log('downPayment = ' + downPayment);
        console.log('tradeAcv = ' + tradeAcv);

        let paidOut = funded - lender - ppsa + tradeAllowance - tradePayOff + downPayment;
        console.log('paidOut = ' + paidOut);

        let userInputTax = 0;

        if (lenderInput["tax"] != '' && !isNaN(lenderInput["tax"])) {
            console.log(lenderInput["tax"]);
            userInputTax = parseFloat(lenderInput["tax"]) / 100;
        }

        console.log('userInputTax = ' + userInputTax);

        let netPaid = paidOut*(1-userInputTax) + tradeAcv;
        console.log('netPaid = ' + netPaid);

        if (netPaid - carDetails.total_cost < maxFront){
            maxProfit = netPaid - carDetails.total_cost;
        }else {
            maxProfit = maxFront;
        }

        maxProfit = Math.round(maxProfit);
    }

    return {
        "front":maxFront,
        "profit":maxProfit
    }
}

function pv(rate, periods, payment, future, type) {
    // Initialize type
    var type = (typeof type === 'undefined') ? 0 : type;

    // Evaluate rate and periods (TODO: replace with secure expression evaluator)
    rate = eval(rate);
    periods = eval(periods);

    // Return present value
    if (rate === 0) {
        return - payment * periods - future;
    } else {
        return (((1 - Math.pow(1 + rate, periods)) / rate) * payment * (1 +rate * type) - future) / Math.pow(1 + rate, periods);
    }
}

function reverseNumberSign(number) {
    return -number;
}

const getMaxProfit = (carDetail) => {
    let maxProfit = Number.NEGATIVE_INFINITY;

    for(let carCalculation of carDetail["car_calculation"]){
        let profit = carCalculation["profit"];

        if(profit != "NOT_FOUND" && profit > maxProfit){
            maxProfit = profit;
        }
    }

    return maxProfit;
}

const sort = (carDetails, sortOptionIndex) => {
    let sortProfitIsPossible = false;
    if (carDetails.length > 0){
        let firstCarDetail = carDetails[0];

        if ("car_calculation" in firstCarDetail && firstCarDetail["car_calculation"].length > 0){
            sortProfitIsPossible = true;
        }
    }

    switch (sortOptionIndex) {
        case 0:
            break;
        case 1:
            if (sortProfitIsPossible){
                carDetails.sort((carDetail1, carDetail2) => {
                    let maxProfitCarDetail1 = getMaxProfit(carDetail1);
                    let maxProfitCarDetail2 = getMaxProfit(carDetail2);

                    return maxProfitCarDetail2 - maxProfitCarDetail1;
                });
            }
            break;
        case 2:
            if (sortProfitIsPossible){
                carDetails.sort((carDetail1, carDetail2) => {
                    let maxProfitCarDetail1 = getMaxProfit(carDetail1);
                    let maxProfitCarDetail2 = getMaxProfit(carDetail2);

                    return maxProfitCarDetail1 - maxProfitCarDetail2;
                });
            }
            break;
        case 3:
            carDetails.sort((carDetail1, carDetail2) => parseInt(carDetail1.total_cost) - parseInt(carDetail2.total_cost));
            break;
        case 4:
            carDetails.sort((carDetail1, carDetail2) => reverseNumberSign(parseInt(carDetail1.total_cost) - parseInt(carDetail2.total_cost)));
            break;
        case 5:
            carDetails.sort((carDetail1, carDetail2) => parseInt(carDetail1.mileage) - parseInt(carDetail2.mileage));
            break;
        case 6:
            carDetails.sort((carDetail1, carDetail2) => reverseNumberSign(parseInt(carDetail1.mileage) - parseInt(carDetail2.mileage)));
            break;
        case 7:
            carDetails.sort((carDetail1, carDetail2) => reverseNumberSign(parseInt(carDetail1.year) - parseInt(carDetail2.year)));
            break;
        case 8:
            carDetails.sort((carDetail1, carDetail2) => parseInt(carDetail1.year) - parseInt(carDetail2.year));
            break;
    }
}

const sortBy = (state, action) => {
    let sortOptionIndex = action.index;
    let newPostProcessingCarDetails = [...state["postProcessingCarDetails"]];

    sort(newPostProcessingCarDetails, sortOptionIndex);

    return {...state, "sortOptionIndex": action.index, "postProcessingCarDetails": newPostProcessingCarDetails, "isLoading":true};
}

const expandOrCollapseFilterSection = (state, action) => {
    let newState = {...state};

    newState[action.name + "_expand"] = action.value;

    return newState;
}
const convertKmToMileage = (carDetails) => {
    carDetails.forEach((carDetail) => {
        let mileageLowerCase = carDetail["mileage"].toLowerCase();

        if (mileageLowerCase.includes("km")) {
            carDetail["mileage"] = Math.floor(0.621371192 * parseFloat(mileageLowerCase.replace("km", "")));
        }
    })
}

const fetchDataFinished = (state, action) => {
    let newState = {...state, "loadDataFinished":true};

    console.log(action);

    newState["lenders"] = action["lenders"];
    newState["lenderTerms"] = action["lenderTerms"];
    newState["lenderPrograms"] = action["lenderPrograms"];

    let lenderToPrograms = {};
    let lenderIdToLenderNameDict = {};
    let lenderNameAndTierNameToProgram = {};

    action["lenders"].forEach(lender => lenderIdToLenderNameDict[lender["id"]] = lender["name"]);

    action["lenderPrograms"].forEach(lenderProgram => {
        let lenderId = lenderProgram["lender_id"];
        let lenderName = lenderIdToLenderNameDict[lenderId];
        let tierName = lenderProgram["name"];

        if (!(lenderName in lenderToPrograms)) {
            lenderToPrograms[lenderName] = [];
        }

        lenderToPrograms[lenderName].push(lenderProgram["name"]);

        if (!(lenderName in lenderNameAndTierNameToProgram)) {
            lenderNameAndTierNameToProgram[lenderName] = {};
        }

        lenderNameAndTierNameToProgram[lenderName][tierName] = lenderProgram;
    });

    newState["lenderIdToLenderNameDict"] = lenderIdToLenderNameDict;
    newState["lenderToPrograms"] = lenderToPrograms;
    newState["lenderNameAndTierNameToProgram"] = lenderNameAndTierNameToProgram;

    let lenderNameToTerms = {}

    action["lenderTerms"].forEach(term => {
        let lenderName = lenderIdToLenderNameDict[term.lender_id];

        if (!(lenderName in lenderNameToTerms)) {
            lenderNameToTerms[lenderName] = [];
        }

        lenderNameToTerms[lenderName].push(term);
    })

    newState["lenderNameToTerms"] = lenderNameToTerms;

    convertKmToMileage(action.carDetails);
    newState["carDetails"] = action.carDetails;
    newState["postProcessingCarDetails"] = action.carDetails;

    let yearSet = new Set();
    let makeSet = new Set();
    let modelSet = new Set();
    let mileageSet = new Set();
    let totalCostSet = new Set();
    let makeToCountDict = {};
    let modelToCountDict = {};

    for (let carDetail of newState["carDetails"]) {
        let make = carDetail["make"];
        let model = carDetail["model"];
        let year = carDetail["year"];
        let mileage = carDetail["mileage"];
        let totalCost = carDetail["total_cost"];

        if (!isNaN(year))
            yearSet.add(parseInt(year));

        if (!isNaN(mileage))
            mileageSet.add(parseInt(mileage));

        if (!isNaN(totalCost))
            totalCostSet.add(parseInt(totalCost));

        makeSet.add(make);

        if (!(make in makeToCountDict)) {
            makeToCountDict[make] = 0;
        }

        makeToCountDict[make] = makeToCountDict[make] + 1;

        modelSet.add(carDetail["model"]);

        if (!(model in modelToCountDict)) {
            modelToCountDict[model] = 0;
        }

        modelToCountDict[model] = modelToCountDict[model] + 1;
    }

    let minYear = Math.min(...yearSet);
    let maxYear = Math.max(...yearSet);

    newState["filters"]["year"] = {
        ...newState["filters"]["year"],
        "min": minYear,
        "max": maxYear,
        "currentMin": minYear,
        "currentMax": maxYear
    }

    newState["filters"]["make"] = {
        ...newState["filters"]["make"],
        "options": Array.from(makeSet),
        "selectedOptions": Array.from(makeSet),
        "counts": makeToCountDict
    }

    newState["filters"]["model"] = {
        ...newState["filters"]["model"],
        "options": Array.from(modelSet),
        "selectedOptions": Array.from(modelSet),
        "counts": modelToCountDict
    }

    let minMileage = Math.min(...mileageSet);
    let maxMileage = Math.max(...mileageSet);

    newState["filters"]["mileage"] = {
        ...newState["filters"]["mileage"],
        "min": minMileage,
        "max": maxMileage,
        "currentMin": minMileage,
        "currentMax": maxMileage
    }

    let minTotalCost = Math.min(...totalCostSet);
    let maxTotalCost = Math.max(...totalCostSet);

    newState["filters"]["total_cost"] = {
        ...newState["filters"]["total_cost"],
        "min": minTotalCost,
        "max": maxTotalCost,
        "currentMin": minTotalCost,
        "currentMax": maxTotalCost
    }

    console.log(newState);
    return newState;
}

const updateFilterNewState = (state, action) => {
    let newState = {...state, "isLoading":true};

    newState["filters"][action.name] = {...newState["filters"][action.name], ...action.value};

    if (action.name == "make") {
        // Update model options accordingly
        let modelOptions = new Set();

        for (let carDetail of state.carDetails) {
            if (action.value["selectedOptions"].includes(carDetail["make"])) {
                modelOptions.add(carDetail["model"]);
            }
        }

        newState["filters"]["model"] = {
            ...newState["filters"]["model"],
            "options": Array.from(modelOptions),
            "selectedOptions": Array.from(modelOptions)
        }
    }

    newState["postProcessingCarDetails"] = postProcess(newState);
    updateCalculation(newState);
    sort(newState["postProcessingCarDetails"], newState["sortOptionIndex"]);




    return newState;
}

const postProcess = (state) => {
    let postProcessingCarDetails = [];

    for (let carDetail of state["carDetails"]) {
        let reject = false;

        for (let filterName in state["filters"]) {
            let filter = state["filters"][filterName];

            if (filter["type"] == "range") {
                let val = parseInt(carDetail[filterName]);

                if (val < filter["currentMin"] || val > filter["currentMax"]) {
                    // console.log("reject "  + val + "," + filterName);
                    reject = true;
                    break;
                }
            } else if (filter["type"] == "list") {
                let val = carDetail[filterName];

                if (!filter["selectedOptions"].includes(val)) {
                    // console.log("reject "  + val + "," + filterName);
                    reject = true;
                    break
                }
            }
        }

        if (!reject)
            postProcessingCarDetails.push(carDetail);

    }

    return postProcessingCarDetails;
}

export {appReducer, initialState};