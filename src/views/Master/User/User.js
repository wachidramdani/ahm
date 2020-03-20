import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import CommonTable from '../../Commons/Table/CommonTable';
import CommonFormPopUp from '../../Commons/Form/CommonFormPopUp';
import { POSITION } from '../../Constants/Position';
import { INPUT } from '../../Constants/Input';
import Swal from 'sweetalert2';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

import API from '../../../API';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeIn: true,
      listForm: [],
      tableHead: [],
      datas: [],
      blocking: false,
      blocking_modal: false,
      modalTitle: '',
      ava: '',
      imgModal: false,
      addModal: false,
      errors: {},
    };   
    this.toggleImgModal = this.toggleImgModal.bind(this);
    this.toggleAddModal = this.toggleAddModal.bind(this);
  }

  componentDidMount() {
    this.setHead();
    this.setBody();
    this.setForm();
  }

  //-----modal-----
  toggleImgModal(name, avatar) { this.setState({ imgModal: !this.state.imgModal, modalTitle: name.toUpperCase(), ava: avatar }); }
  toggleAddModal() { this.setState({ addModal: !this.state.addModal, }); }
  //-----end modal-----

  //-----form-----
  setForm() {
    var headerColumns = [
      { inputType: INPUT.TEXT_FIELD, label: "Name", name: "name" },
      { inputType: INPUT.TEXT_FIELD, label: "Email", name: "email" },
      { inputType: INPUT.TEXT_FIELD, label: "Password", type: "password", name: "password" },
      { inputType: INPUT.TEXT_FIELD, label: "Password Confirmation", type: "password", name: "password_confirmation" }
    ];
    this.setState({ listForm: this.state.listForm.concat(headerColumns) });
  }

  handleValidation(dataForm){
    let formIsValid = true;

    //-----name-----
    if(!dataForm.name || dataForm.name === undefined){
      formIsValid = false;
      this.setState(prevState => {
        let listForm = { ...prevState.listForm };
        listForm[0].error = true;         
        return listForm;
      });
    }

    //-----email-----
    if(!dataForm.email || dataForm.email === undefined){
       formIsValid = false;
       this.setState(prevState => {
        let listForm = { ...prevState.listForm };
        listForm[1].error = true;         
        return listForm;
      });
    }

    if(dataForm.email !== undefined){
        let lastAtPos = dataForm.email.lastIndexOf('@');
        let lastDotPos = dataForm.email.lastIndexOf('.');

        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && dataForm.email.indexOf('@@') === -1 && lastDotPos > 2 && (dataForm.email.length - lastDotPos) > 2)) {
          formIsValid = false;
          this.setState(prevState => {
            let listForm = { ...prevState.listForm };
            listForm[1].error = true;         
            return listForm;
          });
        }
    }  
    
    //-----password-----
    if(!dataForm.password || dataForm.password === undefined){
      formIsValid = false;
      this.setState(prevState => {
        let listForm = { ...prevState.listForm };
        listForm[2].error = true;         
        return listForm;
      });
    }

    //-----password confirmation-----
    if(!dataForm.password_confirmation || dataForm.password_confirmation === undefined || dataForm.password_confirmation !== dataForm.password){
      formIsValid = false;
      this.setState(prevState => {
        let listForm = { ...prevState.listForm };
        listForm[3].error = true;         
        return listForm;
      });
    }

    return formIsValid;
  }

  actionForm = (dataForm) => {
    this.setState({blocking_modal: true});
    //-----set error false-----
    this.setState(prevState => {
      let listForm = { ...prevState.listForm };
      for(let i=0; i<this.state.listForm.length; i++){
        listForm[i].error = false;
      }
      return listForm;
    });

    if(this.handleValidation(dataForm)){
      const form = {
          name: dataForm.name,
          email: dataForm.email,
          password: dataForm.password,
          password_confirmation: dataForm.password_confirmation
      }
      Swal.fire({
        title: 'Register User',
        text: "Are you sure your data is correct?",
        icon: 'warning',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!',
        confirmButtonColor: '#3085d6',
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          // API.post('api/auth/signup/', form)
          // .then(res => {
          //     if(res.status === 200){                    
                  Swal.fire({
                    title: 'Success!',
                    icon: 'success',
                    text: 'Registration Success.',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  .then(() => {
                    this.toggleAddModal();
                    this.setBody();
                  })
                  this.setState({blocking_modal: false});                    
          //     }else{
          //         Swal.fire({  
          //           title: 'Warning',  
          //           icon: 'warning',  
          //           text: 'Your ID Unauthorized.',  
          //         });
          //         this.setState({blocking_modal: false});
          //     }
          // }).catch((error) => {
          //     if(error && error.response && error.response.status === 422){
          //         Swal.fire({  
          //             title: 'Warning',  
          //             icon: 'warning',  
          //             text: 'The email has already been taken.',  
          //         });
          //         this.setState(prevState => {
          //           let listForm = { ...prevState.listForm };
          //           listForm[1].error = true;
          //           return listForm;
          //         });
          //     }else{
          //         Swal.fire({  
          //             title: 'Error',  
          //             icon: 'error',  
          //             text: 'Please Check Your Network Connection.',  
          //         });
          //     }
          //     // console.log(error.response);            
          //     this.setState({blocking_modal: false});
          // });
        }else {
          this.setState({blocking_modal: false});
        }
      });
    }else {
      this.setState({blocking_modal: false});
      Swal.fire({  
          title: 'Error',  
          icon: 'error',  
          text: 'Please Check Your Data.',  
      });
    }
  }
  //-----end form-----

  //-----table-----
  actionTable = (cell, row) => {
    return  <div>
                <Button className="btn-google-plus btn-brand icon btn-sm" onClick={() => { this.handleAction('delete', row.id) } }>
                    <i className="icon-cancel-circle2"></i>
                </Button>
            </div>;
  }

  cbTable = (cell, row) => {
    let check = (row.active === '1') ? true : false;
    return  <input type='checkbox' defaultChecked={ check } disabled/>;
  }

  imgTable = (cell, row) => {
    return  <img className="imgTable" onClick={() => { this.toggleImgModal(row.name, row.avatar)} } src={`${process.env.PUBLIC_URL}/assets/img/avatars/`+row.avatar} alt="Avatar"/>;
  }

  setHead() {
    var headerColumns = [
      { width: "220", title: "Name", dataField: "name", headerAlign: POSITION.CENTER, dataAlign: POSITION.LEFT, dataSort: true },
      { width: "", title: "Email", dataField: "email", headerAlign: POSITION.CENTER, dataAlign: POSITION.LEFT, dataSort: true, tdStyle: {whiteSpace: 'normal'} },
      { width: "175", title: "Avatar", dataField: "avatar", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER, dataFormat: this.imgTable.bind(this) },
      { width: "175", title: "Active", dataField: "active", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER, dataFormat: this.cbTable.bind(this) },
      { width: "100", title: "Action", dataField: "action", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER, dataFormat: this.actionTable.bind(this) }
    ];
    this.setState({ tableHead: this.state.tableHead.concat(headerColumns) });
  }

  setBody() {
    this.setState({blocking: true});
    this.setState({ datas: [
      {id: 1, name: 'Superadmin', email: 'scrins844@gmail.com', email_verified_at: null, avatar: '8.jpg', active: '1'},
      {id: 2, name: 'Admin', email: 'john@mail.com', email_verified_at: null, avatar: '5.jpg', active: '0'},
      {id: 3, name: 'Tester', email: 'tester@mail.com', email_verified_at: null, avatar: '4.jpg', active: '1'},
      {id: 4, name: 'QC', email: 'qc@mail.com', email_verified_at: null, avatar: 'avatar.png', active: '1'},
    ] }, () => this.setState({blocking: false}) );
    // API.get('api/auth/dtuser/')
    // .then(res => {
    //   if(res.status === 200){ 
    //     this.setState({ datas: this.state.datas.concat(res.data.data) });
    //   }
    //   this.setState({blocking: false});
    // }).catch((error) => {
    //   this.setState({blocking: false});
    //   Swal.fire({  
    //       title: 'Error',  
    //       icon: 'error',  
    //       text: 'Please Check Your Network Connection.',  
    //   });
    // });
  }

  handleAction = (tipe, val) => {
    switch (tipe) {
        case 'delete':
                this.setState({blocking: true});
                Swal.fire({
                  title: 'Delete User',
                  text: "Are you sure to delete this user?",
                  icon: 'warning',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes!',
                  confirmButtonColor: '#3085d6',
                  showCancelButton: true,
                }).then((result) => {
                  if (result.value) {
                    // API.delete('api/auth/user/'+val)
                    // .then(res => {
                    //     if(res.status === 200){                    
                            Swal.fire({
                              title: 'Sample delete!',
                              icon: 'success',
                              text: 'Delete Failed.',
                              showConfirmButton: false,
                              timer: 1500
                            })
                            .then(() => {
                              this.setBody();
                            })
                            this.setState({blocking: false});                    
                    //     }else{
                    //         Swal.fire({  
                    //           title: 'Warning',  
                    //           icon: 'warning',  
                    //           text: 'Your ID Unauthorized.',  
                    //         });
                    //         this.setState({blocking: false});
                    //     }
                    // }).catch((error) => {
                    //     if(error && error.response && error.response.status === 500){
                    //         Swal.fire({  
                    //             title: 'Warning',  
                    //             icon: 'warning',  
                    //             text: 'Delete Failed.',  
                    //         });
                    //     }else{
                    //         Swal.fire({  
                    //             title: 'Error',  
                    //             icon: 'error',  
                    //             text: 'Please Check Your Network Connection.',  
                    //         });
                    //     }           
                    //     this.setState({blocking: false});
                    // });
                  }else{
                    this.setState({blocking: false});
                  }
                });
            break;
        case 'add':
                this.toggleAddModal();
            break;
        case 'download':
                alert('download');
            break;
        default:
            break;
    }
  }
  //-----end table-----

  render() {
    return (
      <div className="animated fadeIn">
        <BlockUi tag="div" blocking={this.state.blocking}>
          <Row>
            <Col xs="12" sm="12" md="12">
              <Card className="card-accent-primary">
                <CardHeader>
                  <i className="icon-users2"></i>User Management
                </CardHeader>
                  <CardBody className="card-body-nopad mt10px">
                    <CommonTable 
                      tableHead={ this.state.tableHead }
                      datas={ this.state.datas }
                      action={ this.handleAction }
                      />
                  </CardBody>
              </Card>
            </Col>
          </Row>
        </BlockUi>
        <Modal isOpen={ this.state.imgModal } toggle={ () => { this.toggleImgModal('', '')} } className='modal-dialog modal-info modal-sm'>
          <ModalHeader toggle={ () => { this.toggleImgModal('', '')} }>{this.state.modalTitle}</ModalHeader>
          <ModalBody>
            <img className="imgModal" src={`${process.env.PUBLIC_URL}/assets/img/avatars/`+this.state.ava} alt="Avatar"/>
          </ModalBody>
        </Modal>
        <Modal isOpen={ this.state.addModal } toggle={ this.toggleAddModal } className='modal-dialog modal-info' backdrop="static">
          <BlockUi tag="div" blocking={this.state.blocking_modal}>
            <ModalHeader toggle={ this.toggleAddModal }>Register User</ModalHeader>
            <ModalBody>
              <CommonFormPopUp action={ this.actionForm } list={ this.state.listForm } />
            </ModalBody>
          </BlockUi>
        </Modal>
      </div>
    );
  }
}

export default User;