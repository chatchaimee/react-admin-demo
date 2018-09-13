import React, { Component, Fragment } from 'react';
import { Title, Responsive } from 'react-admin';
import { Card, CardContent, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { Line, Bar, Pie } from 'react-chartjs-2';
import config from '../../config';

const { title } = config;

const Layout = props => {
	return (
		<Fragment>
			<Card>
				<CardContent>
					<Title title={title} />
					<Typography variant="headline" component="h2">
						{props.title}
					</Typography>
					{props.children}
				</CardContent>
			</Card>
		</Fragment>
	);
};

const LineChart = props => {
	return (
		<Layout {...props}>
			<Line data={props.data} options={props.options} />
		</Layout>
	);
};

const BarChart = props => {
	return (
		<Layout {...props}>
			<Bar data={props.data} options={props.options} />
		</Layout>
	);
};

const PieChart = props => {
	return (
		<Layout {...props}>
			<Pie data={props.data} options={props.options} />
		</Layout>
	);
};

const RenderChart = props => {
	switch (props.type) {
		case 'line':
			return <LineChart {...props} />;
		case 'bar':
			return <BarChart {...props} />;
		case 'pie':
			return <PieChart {...props} />;
		default:
			return <Fragment />;
	}
};

class ChartComponent extends Component {
	state = {
		data: []
	};

	componentDidMount() {
		this.getData();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.views !== this.props.views) {
			this.getData();
		}
	}

	getData = () => {
		// TODO: fetch data from api
		let data = [];

		switch (this.props.type) {
			case 'line':
				data = {
					labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
					datasets: [
						{
							label: 'Data',
							fill: false,
							lineTension: 0.1,
							backgroundColor: 'rgba(75,192,192,0.4)',
							borderColor: 'rgba(75,192,192,1)',
							borderCapStyle: 'butt',
							borderDash: [],
							borderDashOffset: 0.0,
							borderJoinStyle: 'miter',
							pointBorderColor: 'rgba(75,192,192,1)',
							pointBackgroundColor: '#fff',
							pointBorderWidth: 1,
							pointHoverRadius: 5,
							pointHoverBackgroundColor: 'rgba(75,192,192,1)',
							pointHoverBorderColor: 'rgba(220,220,220,1)',
							pointHoverBorderWidth: 2,
							pointRadius: 1,
							pointHitRadius: 10,
							data: [65, 59, 80, 81, 56, 55, 40]
						}
					]
				};
				break;
			case 'bar':
				data = {
					labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
					datasets: [
						{
							label: 'My First dataset',
							backgroundColor: 'rgba(255,99,132,0.2)',
							borderColor: 'rgba(255,99,132,1)',
							borderWidth: 1,
							hoverBackgroundColor: 'rgba(255,99,132,0.4)',
							hoverBorderColor: 'rgba(255,99,132,1)',
							data: [65, 59, 80, 81, 56, 55, 40]
						}
					]
				};
				break;
			case 'pie':
				data = {
					labels: ['Red', 'Green', 'Yellow'],
					datasets: [
						{
							data: [300, 50, 100],
							backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
							hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
						}
					]
				};
				break;
			default:
				data = [];
		}

		this.setState({ data: data });
	};

	render() {
		const { data } = this.state;

		return (
			<Responsive
				xsmall={<RenderChart data={data} {...this.props} />}
				small={<RenderChart data={data} {...this.props} />}
				medium={<RenderChart data={data} {...this.props} />}
			/>
		);
	}
}

const mapStateToProps = state => ({
	views: state.admin.ui.viewVersion
});

export const Chart = connect(mapStateToProps, {})(ChartComponent);
