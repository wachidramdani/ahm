import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/img_logo_ahm.png'
import sygnet from '../../assets/img/brand/img_logo_ahm_small.png'
import Swal from 'sweetalert2';
import 'react-block-ui/style.css';

import API from '../../API';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    Swal.fire({
      title: 'Logout',
      text: "Are you sure to logout?",
      icon: 'warning',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
      confirmButtonColor: '#3085d6',
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        this.props.history.push('/login');
        // API.get('api/auth/logout/')
        // .then(res => {
        //   if(res.status === 200){ 
        //     localStorage.clear();
        //     this.props.history.push('/login');
        //   }
        // }).catch((error) => {
        //   if(error && error.response && error.response.status === 401){
        //       Swal.fire({  
        //           title: 'Warning',  
        //           icon: 'warning',  
        //           text: 'Your ID Unauthorized.',  
        //       });
        //   }else{
        //       Swal.fire({  
        //           title: 'Error',  
        //           icon: 'error',  
        //           text: 'Please Check Your Network Connection.',  
        //       });
        //   }
        // });
      }
    });
  }

  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    const dataUser = JSON.parse(localStorage.getItem('data'));
    const usavatar = (dataUser) ? dataUser.avatar : '';
    const usname = (dataUser) ? dataUser.name.split(' ')[0] : '';

    return (
        <React.Fragment>
          <AppSidebarToggler className="d-lg-none" display="md" mobile />
          <AppNavbarBrand
            full={{ src: logo, width: 100, height: 30, alt: 'Logo' }}
            minimized={{ src: sygnet, width: 30, height: 30, alt: 'Logo' }}
          />
          <AppSidebarToggler className="d-md-down-none" display="lg" />

          <Nav className="d-md-down-none" navbar>
            {/* <NavItem className="px-3">
              <NavLink to="/dashboard" className="nav-link" >Dashboard</NavLink>
            </NavItem>
            <NavItem className="px-3">
              <Link to="/users" className="nav-link">Users</Link>
            </NavItem> */}
          </Nav>
          <Nav className="ml-auto" navbar>
            <NavItem className="d-md-down-none">
              <NavLink to="#" className="nav-link"><i className="icon-bell3"></i><Badge pill color="danger">5</Badge></NavLink>
            </NavItem>
            <UncontrolledDropdown nav direction="down">
              <DropdownToggle nav>
                <img src={ '../../assets/img/avatars/8.jpg' } className="img-avatar" alt="avatar" />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem header tag="div" className="text-center"><strong><span className="name-bar">Superadmin</span></strong></DropdownItem>
                <DropdownItem><i className="icon-user-tie"></i> Profile</DropdownItem>
                <DropdownItem><i className="icon-cogs"></i> Settings</DropdownItem>
                <DropdownItem onClick={this.handleSubmit}><i className="icon-lock5"></i> Logout</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          {/*<AppAsideToggler className="d-md-down-none" />
          <AppAsideToggler className="d-lg-none" mobile />*/}
        </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default withRouter(DefaultHeader);
