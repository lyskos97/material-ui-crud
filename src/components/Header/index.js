import * as React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { AppBar, Button, Tabs, Menu, MenuItem } from '@material-ui/core';

import NavLink from './NavLink';

const navRoutes = [
  {
    label: 'Notes',
    value: '/',
    exact: true
  },
  {
    label: 'About',
    value: '/about'
  }
];

const isNavRoute = pathString => navRoutes.some(({ value }) => pathString === value);

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeNavRoute: false,
      anchorEl: null
    };
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const { pathname } = nextProps.location;

    if (isNavRoute(pathname)) {
      return {
        ...prevState,
        activeNavRoute: pathname
      };
    }
    return {
      ...prevState,
      activeNavRoute: false
    };
  };

  handleMenuOpen = e => {
    this.setState({ anchorEl: e.currentTarget });
  };

  handleMenuClose = e => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { activeNavRoute, anchorEl } = this.state;

    return (
      <AppBar style={{ flexDirection: 'row', margin: 0 }} position="sticky">
        <Tabs value={activeNavRoute} style={{ flex: 1 }}>
          {navRoutes.map(({ label, value, exact }) => (
            <NavLink label={label} key={value} value={value} exact={exact} />
          ))}
        </Tabs>
        <Button
          onClick={this.handleMenuOpen}
          color="inherit"
          style={{ marginRight: 20, textTransform: 'none' }}
        >
          lyskos97
        </Button>
        <Menu id="simple-menu" anchorEl={anchorEl} open={!!anchorEl} onClose={this.handleMenuClose}>
          <MenuItem component={Link} to="/profile" onClick={this.handleMenuClose}>
            My profile
          </MenuItem>
          <MenuItem onClick={this.handleMenuClose}>Logout</MenuItem>
        </Menu>
      </AppBar>
    );
  }
}

export default withRouter(Header);
