import React from 'react';
import RangeFilter from '../RangeFilter';

export default {
    title:'Range Filter',
    component: RangeFilter
}

export const demonstration = () => {
    return <RangeFilter title={"Test Range Filter"} minTitle="Min" maxTitle="Max"/>
}