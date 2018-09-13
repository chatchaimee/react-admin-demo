import React from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from './dataProvider';
import authProvider from './authProvider';
import { Dashboard, LineReport, BarReport, PieReport } from './pages';
import { Menu } from './components';
import config from './config';

const { host } = config;
const dataProvider = jsonServerProvider(host);

const App = () => (
	<Admin
		menu={Menu}
		dashboard={Dashboard}
		authProvider={authProvider}
		dataProvider={dataProvider}
	>
		{permissions => [
			<Resource name="linereport" list={LineReport} />,
			permissions === 'admin' ? <Resource name="barreport" list={BarReport} /> : null,
			permissions === 'admin' ? <Resource name="piereport" list={PieReport} /> : null
		]}
	</Admin>
);

export default App;
