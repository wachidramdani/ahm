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

class Formula extends Component {
  constructor(props) {
    super(props);

    var today = new Date(),
    date = ("0" + today.getDate()).slice(-2) + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-' + today.getFullYear();

    this.state = {
      fadeIn: true,
      listForm: [],
      tableHead: [],
      datas: [],
      blocking: false,
      blocking_modal: false,
      modalTitle: '',
      addModal: false,
      errors: {},
      date: date
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
      { inputType: INPUT.TEXT_FIELD, label: "Worksheet", name: "wks" },
      { inputType: INPUT.TEXT_FIELD, label: "Name", name: "name" },
      { inputType: INPUT.TEXT_FIELD, label: "Formula", name: "formula" },
    ];
    this.setState({ listForm: this.state.listForm.concat(headerColumns) });
  }

  handleValidation(dataForm){
    let formIsValid = true;

    //-----wks-----
    if(!dataForm.wks || dataForm.wks === undefined){
      formIsValid = false;
      this.setState(prevState => {
        let listForm = { ...prevState.listForm };
        listForm[0].error = true;         
        return listForm;
      });
    }

    //-----name-----
    if(!dataForm.name || dataForm.name === undefined){
      formIsValid = false;
      this.setState(prevState => {
        let listForm = { ...prevState.listForm };
        listForm[1].error = true;         
        return listForm;
      });
    }

    //-----formula-----
    if(!dataForm.formula || dataForm.formula === undefined){
      formIsValid = false;
      this.setState(prevState => {
        let listForm = { ...prevState.listForm };
        listForm[2].error = true;         
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
          url: dataForm.url,
          icon: dataForm.icon,
          title: dataForm.title,
          parent_id: dataForm.parent_id,
          sequence: dataForm.sequence
      }
      Swal.fire({
        title: 'Register Formula',
        text: "Are you sure your data is correct?",
        icon: 'warning',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!',
        confirmButtonColor: '#3085d6',
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          // API.put('api/auth/Formula/', form)
          // .then(res => {
          //     if(res.status === 201){                    
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
        //       }else{
        //           Swal.fire({  
        //             title: 'Warning',  
        //             icon: 'warning',  
        //             text: 'Your ID Unauthorized.',  
        //           });
        //           this.setState({blocking_modal: false});
        //       }
        //   }).catch((error) => {
        //       if(error && error.response && error.response.status === 422){
        //           Swal.fire({  
        //               title: 'Warning',  
        //               icon: 'warning',  
        //               text: 'The email has already been taken.',  
        //           });
        //           this.setState(prevState => {
        //             let listForm = { ...prevState.listForm };
        //             listForm[1].error = true;
        //             return listForm;
        //           });
        //       }else{
        //           Swal.fire({  
        //               title: 'Error',  
        //               icon: 'error',  
        //               text: 'Please Check Your Network Connection.',  
        //           });
        //       }
        //       // console.log(error.response);            
        //       this.setState({blocking_modal: false});
        //   });
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
                <Button className="btn-css3 btn-brand icon mr5px btn-sm" onClick={() => { this.handleAction('edit', row.id) } }>
                    <i className="icon-pencil7"></i>
                </Button>
                <Button className="btn-google-plus btn-brand icon btn-sm" onClick={() => { this.handleAction('delete', row.id) } }>
                    <i className="icon-cancel-circle2"></i>
                </Button>
            </div>;
  }

  icon = (cell, row) => {
    return  <i className={ row.icon }></i>;
  }

  title = (cell, row) => {
    let val = (row.title === '1') ? 'Yes' : 'No';
    return  <span>{ val }</span>;
  }

  bold = (cell, row) => {
    return  <span><code>
        IF(support_week=0) &#123;<br/>
        &nbsp;&nbsp;IF((stock_days + ltime)*avg_sls/30 + sls_m - begin_stock &#60; CMAX) &#123;<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;value = Max;<br/>
        &nbsp;&nbsp;&#125; ELSE &#123;<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;value = ((DP+ltime)*avg_sls/30)+sls_m-begin_stock;<br/>
        &nbsp;&nbsp;&#125;<br/>
        &#125; ELSE &#123;<br/>
        &nbsp;&nbsp;value = support_week;<br/>
        &#125;<br/><br/>
        End value =+ Adjustment
      </code></span>;
  }

  setHead() {
    var headerColumns = [
      { width: "150", title: "No", dataField: "no", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER, dataSort: true },
      { width: "150", title: "Worksheet", dataField: "wks", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER, dataSort: true, tdStyle: {whiteSpace: 'normal'} },
      { width: "150", title: "Name", dataField: "name", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER},
      { width: "", title: "Formula", dataField: "formula", headerAlign: POSITION.CENTER, dataAlign: POSITION.LEFT, dataFormat: this.bold.bind(this) },
      { width: "150", title: "Date", dataField: "date", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "100", title: "Action", dataField: "action", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER, dataFormat: this.actionTable.bind(this) }
    ];
    this.setState({ tableHead: this.state.tableHead.concat(headerColumns) });
  }

  setBody() {
    this.setState({blocking: true});
    this.setState({ datas: [
      {no: 1, wks: 'COLOR_DP', name: 'FMCOLOR', formula: 'icon-home2', date: '2020-03-20'},
    ] }, () => this.setState({blocking: false}));
    // API.get('api/auth/Formula/')
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
      case 'edit':
                alert('Edit!!!');
            break;  
      case 'delete':
                this.setState({blocking: true});
                Swal.fire({
                  title: 'Delete Formula',
                  text: "Are you sure to delete this formula?",
                  icon: 'warning',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes!',
                  confirmButtonColor: '#3085d6',
                  showCancelButton: true,
                }).then((result) => {
                  if (result.value) {
                    // API.delete('api/auth/Formula/'+val)
                    // .then(res => {
                    //     if(res.status === 200){                    
                            Swal.fire({
                              title: 'Failed!',
                              icon: 'success',
                              text: 'Delete Failed.',
                              showConfirmButton: false,
                              timer: 1500
                            })
                            .then(() => {
                              this.setBody();
                            })
                            this.setState({blocking: false});                    
                  //       }else{
                  //           Swal.fire({  
                  //             title: 'Warning',  
                  //             icon: 'warning',  
                  //             text: 'Your ID Unauthorized.',  
                  //           });
                  //           this.setState({blocking: false});
                  //       }
                  //   }).catch((error) => {
                  //       if(error && error.response && error.response.status === 500){
                  //           Swal.fire({  
                  //               title: 'Warning',  
                  //               icon: 'warning',  
                  //               text: 'Delete Failed.',  
                  //           });
                  //       }else{
                  //           Swal.fire({  
                  //               title: 'Error',  
                  //               icon: 'error',  
                  //               text: 'Please Check Your Network Connection.',  
                  //           });
                  //       }           
                  //       this.setState({blocking: false});
                  //   });
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
                  <i className="icon-magic-wand"></i>Formula Management
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
        <Modal isOpen={ this.state.addModal } toggle={ this.toggleAddModal } className='modal-dialog modal-info' backdrop="static">
          <BlockUi tag="div" blocking={this.state.blocking_modal}>
            <ModalHeader toggle={ this.toggleAddModal }>Register Formula</ModalHeader>
            <ModalBody>
              <label>Tanggal :</label> <b>{this.state.date}</b>
              <CommonFormPopUp action={ this.actionForm } list={ this.state.listForm } />
            </ModalBody>
          </BlockUi>
        </Modal>
      </div>
    );
  }
}

export default Formula;