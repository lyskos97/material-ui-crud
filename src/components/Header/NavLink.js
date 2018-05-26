import React from 'react';
import { NavLink } from 'react-router-dom';
import { Tab } from '@material-ui/core';

export default ({ label, value, exact, ...restProps }) => (
  <Tab label={label} component={NavLink} value={value} to={value} exact={exact} {...restProps} />
);
