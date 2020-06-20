import React from 'react';
import Filter from '../Filter';
import ListFilter from "../ListFilter";
import RangeFilter from "../RangeFilter";

export default {
    title:'Filter',
    component: Filter
}

export const demonstration = () => {
    return (
        <Filter filters={[
            {
                "title":"Make",
                "type":"list",
                "options":["Make 1", "Make 2"]
            },
            {
                "title":"Model",
                "type":"list",
                "options":["Model 1", "Model 2"]
            },
            {
                "title":"Year",
                "type":"range",
                "minTitle":"Min",
                "maxTitle":"Max"
            }
        ]} />
    );
}