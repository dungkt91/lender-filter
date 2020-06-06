import * as React from "react";
import CarShowElement from "./CarShowElement";
import Grid from "@material-ui/core/Grid";
import {styled, useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {css} from "@emotion/core";
import {ClipLoader} from "react-spinners";
import './CarShow.css';
import {fetchCars} from "./Api";
import InfiniteScroll from "react-infinite-scroller";

const clipLoaderCss = css`
    border-color:rgb(55,71,172);
    position:absolute;
    border-bottom-color:transparent;
    top:50%;
`;

class CarShow extends React.Component {
    constructor() {
        super();

        this.state = {
            carShowElements: [],
            carDetailsList: [],
            carImagesList: [],
            isLoading: false,
            hasMoreItems: false,
            filtersInputs: null,
            lenderData: null
        }
    }

    componentDidMount() {
        this.updateCars(this.props.carJson, this.props.filtersInputs, null);
    }

    updateCars(carJson, filtersInputs, lenderData) {
        this.setState({isLoading: true, carDetailsList: [], carImagesList: [], carShowElements: [], filtersInputs: filtersInputs, lenderData: lenderData});

        if(carJson != ''){
            let json = carJson;
            let carDetailsList = []
            let carImagesList = []

            for (let i = 0; i < json.length; i++) {
                let car_details = json[i]
                let car_images = this.getCarImages(json[i])

                carDetailsList.push(car_details);
                carImagesList.push(car_images);
            }

            let carShowElements = [];

            for (let i = 0; i < 10 && i < carDetailsList.length; i++) {
                let carDetails = carDetailsList[i];
                let carImages = carImagesList[i];

                carShowElements.push(
                    <Grid item xs={12} xl={6}>
                        <CarShowElement details={carDetails} images={carImages} filtersInputs={filtersInputs}
                                        lenderData={lenderData}/>
                    </Grid>
                )
            }

            this.setState({
                carDetailsList: carDetailsList,
                carImagesList: carImagesList,
                isLoading: false,
                carShowElements: carShowElements,
                hasMoreItems: carDetailsList.length > 10
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        this.updateCars(nextProps.carJson, nextProps.filtersInputs, nextProps.lenderData);
    }

    getCarImages(carJson) {
        let dict = [];
        let imageNames = [];

        for (let i = 0; i < carJson["images"].length; i++) {
            let image = carJson["images"][i];

            let imageSrc = image.src;
            let imageName = image.name;
            // console.log(imageSrc);

            imageNames.push(imageName);
            if (imageName in imageNames){
                console.warn(imageName + ' is already in dicationary');
            }

            dict[imageName] = {
                original: imageSrc,
                thumbnail: imageSrc
            };
        }

        // Sort image names
        imageNames.sort();
        let result = [];

        for (let i = 0; i < imageNames.length;i++){
            result.push(dict[imageNames[i]]);
        }

        return result;
    }

    loadItems(page) {
        let numLoadItems = 10;
        let newCarShowElements = this.state.carShowElements;
        let originalLength = this.state.carShowElements.length;

        if (this.state.carShowElements.length < this.state.carDetailsList.length){
            while(newCarShowElements.length < originalLength + numLoadItems && newCarShowElements.length < this.state.carDetailsList.length){
                newCarShowElements.push(
                    <Grid item xs={12} xl={6}>
                        <CarShowElement details={this.state.carDetailsList[newCarShowElements.length]} images={this.state.carImagesList[newCarShowElements.length]} filtersInputs={this.state.filtersInputs} lenderData={this.state.lenderData}/>
                    </Grid>
                )
            }
        }

        let hasMoreItems = (newCarShowElements.length + numLoadItems) < this.state.carDetailsList.length;

        this.setState({hasMoreItems:hasMoreItems, carShowElements:newCarShowElements});
    }

    render() {
        const loader = <div className="loader">Loading ...</div>;

        return (
            <InfiniteScroll
                pageStart={0}
                loadMore={this.loadItems.bind(this)}
                hasMore={this.state.hasMoreItems}
                loader={loader}>
                <Grid container spacing={4} className={`car-show-grid ${this.state.isLoading ? "loading" : ""}`}>
                    {this.state.isLoading ?
                        <div className={"spinner"}><ClipLoader css={clipLoaderCss}/></div> : this.state.carShowElements}
                </Grid>
            </InfiniteScroll>
        );
    }
}

export default CarShow;