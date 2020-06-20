import React from 'react';
import ListFilter from '../ListFilter';

export default {
    title:'List Filter',
    component: ListFilter
}

export const demonstration = () => {
    return <ListFilter title={"Test List Filter"} options={["Item 1", "Item 2"]}/>
}