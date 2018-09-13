import React from 'react';
import { Title } from 'react-admin';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import config from '../config';

const title = config.title;

export const Dashboard = () => (
	<Card>
		<Title title={title} />
		<CardHeader title="Welcome to the administration" />
		<CardContent>React Admin Demo</CardContent>
	</Card>
);
