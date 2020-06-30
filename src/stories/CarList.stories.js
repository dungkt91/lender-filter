import React from 'react';
import CarList from '../CarList';
import { Card } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';

export default {
    title:'Car List',
    component: CarList
}

const testData = [
    {
        "id": 3452,
        "images": [
            {
                "id": 23592,
                "src": "https://drive.google.com/uc?export=view&id=1PNPS_e8i8a_m2Owox2ncuuFWNotAbYh6",
                "name": "88e2d36a93a013b0ddd2a63a79c42db1x.webp",
                "car_id": 3452
            }
        ],
        "title": "RAM 1500",
        "year": "2020",
        "make": "RAM",
        "model": "1500",
        "series": "-",
        "style": "-",
        "drive": "-",
        "fuel": "-",
        "mileage": "12339",
        "vin": "1C6SRFFTXLN113309",
        "trim": "BIGHORN SHORT WB",
        "color": "WHITE",
        "img_url": "Image Coming",
        "total_cost": 39700.0,
        "x_clean": 45100.0,
        "clean": 43300.0,
        "average": 41200.0,
        "rough": 39400.0
    },
    {
        "id": 3453,
        "images": [
            {
                "id": 23593,
                "src": "https://drive.google.com/uc?export=view&id=1PNPS_e8i8a_m2Owox2ncuuFWNotAbYh6",
                "name": "88e2d36a93a013b0ddd2a63a79c42db1x.webp",
                "car_id": 3453
            }
        ],
        "title": "RAM 1500",
        "year": "2020",
        "make": "RAM",
        "model": "1500",
        "series": "-",
        "style": "-",
        "drive": "-",
        "fuel": "-",
        "mileage": "14935",
        "vin": "1C6SRFFT3LN122420",
        "trim": "BIGHORN SHORT WB",
        "color": "WHITE",
        "img_url": "Image Coming",
        "total_cost": 39700.0,
        "x_clean": 45100.0,
        "clean": 43300.0,
        "average": 41200.0,
        "rough": 39400.0
    },
    {
        "id": 3454,
        "images": [
            {
                "id": 23594,
                "src": "https://drive.google.com/uc?export=view&id=1PNPS_e8i8a_m2Owox2ncuuFWNotAbYh6",
                "name": "88e2d36a93a013b0ddd2a63a79c42db1x.webp",
                "car_id": 3454
            }
        ],
        "title": "RAM 1500",
        "year": "2020",
        "make": "RAM",
        "model": "1500",
        "series": "-",
        "style": "-",
        "drive": "-",
        "fuel": "-",
        "mileage": "15848",
        "vin": "1C6SRFFT2LN113286",
        "trim": "BIGHORN SHORT WB",
        "color": "GREY",
        "img_url": "Image Coming",
        "total_cost": 39700.0,
        "x_clean": 0.0,
        "clean": 0.0,
        "average": 0.0,
        "rough": 0.0
    },
    {
        "id": 3455,
        "images": [
            {
                "id": 23595,
                "src": "https://drive.google.com/uc?export=view&id=1PNPS_e8i8a_m2Owox2ncuuFWNotAbYh6",
                "name": "88e2d36a93a013b0ddd2a63a79c42db1x.webp",
                "car_id": 3455
            }
        ],
        "title": "RAM 1500",
        "year": "2020",
        "make": "RAM",
        "model": "1500",
        "series": "-",
        "style": "-",
        "drive": "-",
        "fuel": "-",
        "mileage": "17730",
        "vin": "1C6SRFFT9LN126102",
        "trim": "BIGHORN SHORT WB",
        "color": "RED",
        "img_url": "Image Coming",
        "total_cost": 38500.0,
        "x_clean": 0.0,
        "clean": 0.0,
        "average": 0.0,
        "rough": 0.0
    },
    {
        "id": 3456,
        "images": [
            {
                "id": 23596,
                "src": "https://drive.google.com/uc?export=view&id=1PNPS_e8i8a_m2Owox2ncuuFWNotAbYh6",
                "name": "88e2d36a93a013b0ddd2a63a79c42db1x.webp",
                "car_id": 3456
            }
        ],
        "title": "RAM 1500",
        "year": "2020",
        "make": "RAM",
        "model": "1500",
        "series": "-",
        "style": "-",
        "drive": "-",
        "fuel": "-",
        "mileage": "19422",
        "vin": "1C6SRFMT2LN113257",
        "trim": "BIGHORN LONG WB",
        "color": "SILVER",
        "img_url": "Image Coming",
        "total_cost": 39700.0,
        "x_clean": 45200.0,
        "clean": 43400.0,
        "average": 41300.0,
        "rough": 39500.0
    },
    {
        "id": 3457,
        "images": [
            {
                "id": 23597,
                "src": "https://drive.google.com/uc?export=view&id=1PNPS_e8i8a_m2Owox2ncuuFWNotAbYh6",
                "name": "88e2d36a93a013b0ddd2a63a79c42db1x.webp",
                "car_id": 3457
            }
        ],
        "title": "RAM 1500",
        "year": "2020",
        "make": "RAM",
        "model": "1500",
        "series": "-",
        "style": "-",
        "drive": "-",
        "fuel": "-",
        "mileage": "19896",
        "vin": "1C6SRFMT1LN113248",
        "trim": "BIGHORN LONG WB",
        "color": "GREY",
        "img_url": "Image Coming",
        "total_cost": 39700.0,
        "x_clean": 0.0,
        "clean": 0.0,
        "average": 0.0,
        "rough": 0.0
    },
    {
        "id": 3458,
        "images": [
            {
                "id": 23598,
                "src": "https://drive.google.com/uc?export=view&id=1PNPS_e8i8a_m2Owox2ncuuFWNotAbYh6",
                "name": "88e2d36a93a013b0ddd2a63a79c42db1x.webp",
                "car_id": 3458
            }
        ],
        "title": "FORD F350",
        "year": "2019",
        "make": "FORD",
        "model": "F350",
        "series": "-",
        "style": "-",
        "drive": "-",
        "fuel": "-",
        "mileage": "1000KMS",
        "vin": "1FT8W3BT1KEF99023",
        "trim": "LARIAT SHORT BOX",
        "color": "WHITE",
        "img_url": "Image Coming",
        "total_cost": 73672.0,
        "x_clean": 51300.0,
        "clean": 49400.0,
        "average": 47100.0,
        "rough": 45200.0
    },
    {
        "id": 3459,
        "images": [
            {
                "id": 23599,
                "src": "https://drive.google.com/uc?export=view&id=1PNPS_e8i8a_m2Owox2ncuuFWNotAbYh6",
                "name": "88e2d36a93a013b0ddd2a63a79c42db1x.webp",
                "car_id": 3459
            }
        ],
        "title": "FORD F350",
        "year": "2019",
        "make": "FORD",
        "model": "F350",
        "series": "-",
        "style": "-",
        "drive": "-",
        "fuel": "-",
        "mileage": "11172KM",
        "vin": "1FT8W3BT3KEF07653",
        "trim": "LARIAT LONG BOX LIFTED",
        "color": "WHITE",
        "img_url": "Image Coming",
        "total_cost": 0.0,
        "x_clean": 51400.0,
        "clean": 49500.0,
        "average": 47200.0,
        "rough": 45300.0
    },
    {
        "id": 3460,
        "images": [
            {
                "id": 23600,
                "src": "https://drive.google.com/uc?export=view&id=1PNPS_e8i8a_m2Owox2ncuuFWNotAbYh6",
                "name": "88e2d36a93a013b0ddd2a63a79c42db1x.webp",
                "car_id": 3460
            }
        ],
        "title": "FORD FLEX",
        "year": "2019",
        "make": "FORD",
        "model": "FLEX",
        "series": "-",
        "style": "-",
        "drive": "-",
        "fuel": "-",
        "mileage": "11350KM",
        "vin": "2FMHK6C81KBA22068",
        "trim": "SEL",
        "color": "BLACK",
        "img_url": "Image Coming",
        "total_cost": 28163.0,
        "x_clean": 0.0,
        "clean": 0.0,
        "average": 0.0,
        "rough": 0.0
    }
];

export const demonstration = () => {
    return (
        <CarList detailsList={testData}/>
    );
}