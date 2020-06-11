import * as React from "react";
import './NewCarDescription.css';

class NewCarDescription extends React.Component {
    getCarTitle() {
        let year = this.getRowValue('YEAR');
        let make = this.getRowValue('MAKE');
        let model = this.getRowValue('MODEL');
        let trim = this.getRowValue('TRIM');

        return `${year} ${make} ${model} ${trim}`;
    }

    getRowValue(rowName) {
        let row = this.getRowWithName(rowName);

        if (row != null) {
            return row.value;
        }

        return '';
    }

    getRowWithName(rowName) {
        let matches = this.props.details.filter(row => (row.name == rowName));

        if (matches.length > 0) {
            return matches[0];
        }

        return null;
    }

    render() {
        return (
            <React.Fragment>
                <div class="description_container">
                    <div>
                        <span className="car_title">{this.getCarTitle()}</span>
                    </div>
                    <div>
                        <span class="car_price">{this.getRowValue('TOTAL COST')}</span>
                        <span class="car_mileage">| {this.getRowValue('MILEAGE')} mi.</span>
                    </div>

                    <ul style={{listStyle: 'none', padding: 0, columnCount: 2}}>
                        {
                            this.props.details.map(row =>
                                <li>
                                    <strong>{row.title}</strong>: {row.value}
                                </li>
                            )
                        }
                    </ul>
                </div>
            </React.Fragment>
        )
    }
}

export default NewCarDescription;