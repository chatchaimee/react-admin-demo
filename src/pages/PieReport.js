import React from 'react';
import { Chart } from '../components';

const options = {};

export const PieReport = props => {
	return <Chart title="Pie Chart" type="pie" options={options} />;
};
