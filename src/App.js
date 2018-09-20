import React, { Component } from 'react';
import { Admin, Resource } from 'react-admin';
import { defaultDataProvider } from './dataProvider';
import authProvider from './authProvider';
import { Dashboard, LineReport, BarReport, PieReport } from './pages';
import { Menu } from './components';

class App extends Component {
	state = {
		dataProvider: null
	};

	async componentWillMount() {
		const dataProvider = await defaultDataProvider;

		this.setState({ dataProvider });
	}

	render() {
		const { dataProvider } = this.state;

		if (!dataProvider) {
			return (
				<div className="loader-container">
					<div className="loader">Loading...</div>
				</div>
			);
		}

		return (
			<Admin
				menu={Menu}
				dashboard={Dashboard}
				authProvider={authProvider}
				dataProvider={defaultDataProvider}
			>
				{permissions => [
					<Resource name="linereport" list={LineReport} />,
					permissions === 'admin' ? <Resource name="barreport" list={BarReport} /> : null,
					permissions === 'admin' ? <Resource name="piereport" list={PieReport} /> : null
				]}
			</Admin>
		);
	}
}

export default App;
