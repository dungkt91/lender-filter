import React from 'react';
import RangeFilter from "./RangeFilter";
import ListFilter from "./ListFilter";
import FilterSection from "./FilterSection";
import Utils from "../Utils";
import "./Filter.css";

class Filter extends React.Component {
    render() {
        return (
            <div className={"filter"}>
                <FilterSection name={"year_filter_section"} title={"Year"}>
                    <RangeFilter name="year"/>
                </FilterSection>
                <FilterSection name={"make_filter_section"} title={"Make"}>
                    <ListFilter name="make" titleTransformFunc={Utils.convertStr}/>
                </FilterSection>
                <FilterSection name={"model_filter_section"} title={"Model"}>
                    <ListFilter name="model" titleTransformFunc={Utils.convertStr}/>
                </FilterSection>
                <FilterSection name={"mileage_filter_section"} title={"Mileage"}>
                    <RangeFilter name="mileage" unit={"mi"} unit_position={"end"}/>
                </FilterSection>
                <FilterSection name={"total_cost_filter_section"} title={"Total cost"}>
                    <RangeFilter name="total_cost" unit={"$"} unit_position={"start"}/>
                </FilterSection>
            </div>
        )
    }
}

export default Filter;