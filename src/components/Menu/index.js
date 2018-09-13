import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { translate, DashboardMenuItem, MenuItemLink } from 'react-admin';
import { ListItem, ListItemIcon, ListItemText, Collapse } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import config from '../../config';

const { menus } = config;
const role = localStorage.getItem('role');

export class Menu extends Component {
	state = {};

	handleMenuClick = menuName => {
		this.setState({ [menuName]: !this.state[menuName] });
	};

	render() {
		const { onMenuClick } = this.props;

		return (
			<Fragment>
				<DashboardMenuItem onClick={onMenuClick} />
				{menus.map(menu => {
					if (menu.subMenus && menu.subMenus.length > 0) {
						if (role && menu.roles.indexOf(role) !== -1) {
							return (
								<div key={menu.name}>
									<ListItem
										button
										onClick={() => this.handleMenuClick(menu.name)}
										style={{ paddingLeft: 16 }}
									>
										<ListItemIcon>{menu.icon}</ListItemIcon>
										<ListItemText
											inset
											primary={menu.options.label}
											style={{ paddingLeft: 5 }}
										/>
										{this.state[menu.name] ? <ExpandLess /> : <ExpandMore />}
									</ListItem>
									<Collapse
										in={this.state[menu.name]}
										timeout="auto"
										unmountOnExit
									>
										{menu.subMenus.map(subMenu => {
											if (role && subMenu.roles.indexOf(role) !== -1) {
												return (
													<MenuItemLink
														key={subMenu.name}
														to={`/${subMenu.name}`}
														primaryText={subMenu.options.label}
														onClick={onMenuClick}
														style={{ paddingLeft: 63 }}
													/>
												);
											} else {
												return null;
											}
										})}
									</Collapse>
								</div>
							);
						} else {
							return null;
						}
					} else {
						if (role && menu.roles.indexOf(role) !== -1) {
							return (
								<MenuItemLink
									key={menu.name}
									to={`/${menu.name}`}
									primaryText={menu.options.label}
									onClick={onMenuClick}
									leftIcon={menu.icon}
								/>
							);
						} else {
							return null;
						}
					}
				})}
			</Fragment>
		);
	}
}

const enhance = compose(
	withRouter,
	connect(
		state => ({
			theme: state.theme,
			locale: state.i18n.locale
		}),
		{}
	),
	translate
);

enhance(Menu);
