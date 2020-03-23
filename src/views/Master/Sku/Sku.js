import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import CommonTable from '../../Commons/Table/CommonTable';
import CommonFormPopUp from '../../Commons/Form/CommonFormPopUp';
import { POSITION } from '../../Constants/Position';
import { INPUT } from '../../Constants/Input';
import Swal from 'sweetalert2';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

class Sku extends Component {
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
      { inputType: INPUT.TEXT_FIELD, label: "Tipe Motor", name: "tipeMotor" },
      { inputType: INPUT.TEXT_FIELD, label: "Warna Motor", name: "warnaMotor" },
      { inputType: INPUT.TEXT_FIELD, label: "Kode Warna", name: "kodeWarna" },
      // { inputType: INPUT.TEXT_FIELD, label: "", name: "tgl", type: "date" },
    ];
    this.setState({ listForm: this.state.listForm.concat(headerColumns) });
  }

  handleValidation(dataForm){
    let formIsValid = true;

    //-----tipe motor-----
    if(!dataForm.tipeMotor || dataForm.tipeMotor === undefined){
        formIsValid = false;
        this.setState(prevState => {
          let listForm = { ...prevState.listForm };
          listForm[0].error = true;         
          return listForm;
        });
      }

    //-----warna motor-----
    if(!dataForm.warnaMotor || dataForm.warnaMotor === undefined){
      formIsValid = false;
      this.setState(prevState => {
        let listForm = { ...prevState.listForm };
        listForm[1].error = true;         
        return listForm;
      });
    }

    //-----kode warna-----
    if(!dataForm.kodeWarna || dataForm.kodeWarna === undefined){
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
          warnaMotor: dataForm.warnaMotor,
          tipeMotor: dataForm.tipeMotor,
          kodeWarna: dataForm.kodeWarna,
      }
      Swal.fire({
        title: 'Tambah SKU',
        text: "Are you sure your data is correct?",
        icon: 'warning',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!',
        confirmButtonColor: '#3085d6',
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {                  
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
    return  <b>{ row.sequence }</b>;
  }

  setHead() {
    var headerColumns = [
      { width: "100", title: "No", dataField: "no", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER, dataSort: true },
      { width: "150", title: "Tipe Motor", dataField: "tipeMotor", headerAlign: POSITION.CENTER, dataAlign: POSITION.LEFT, dataSort: true, tdStyle: {whiteSpace: 'normal'} },
      { width: "150", title: "Warna Motor", dataField: "warnaMotor", headerAlign: POSITION.CENTER, dataAlign: POSITION.LEFT, dataSort: true, tdStyle: {whiteSpace: 'normal'} },
      { width: "150", title: "Kode Warna", dataField: "kodeWarna", headerAlign: POSITION.CENTER, dataAlign: POSITION.LEFT, dataSort: true, tdStyle: {whiteSpace: 'normal'} },
      { width: "150", title: "Tanggal Isi", dataField: "tgl", headerAlign: POSITION.CENTER, dataAlign: POSITION.LEFT, dataSort: true, tdStyle: {whiteSpace: 'normal'} },
      { width: "100", title: "Action", dataField: "action", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER, dataFormat: this.actionTable.bind(this) }
    ];
    this.setState({ tableHead: this.state.tableHead.concat(headerColumns) });
  }

  setBody() {
    this.setState({blocking: true});
    this.setState({ datas: [
      {id: 1, no: 1, tipeMotor:'Scoppy', warnaMotor:'Merah',kodeWarna:'SCRD2', tgl:'20/3/2020'},
      {id:2, no: 2, tipeMotor:'Vario', warnaMotor:'Hitam', kodeWarna:'VRBK1', tgl:'22/3/2020'},
      {id:3, no: 3, tipeMotor:'Supra X 125', warnaMotor:'Silver', kodeWarna:'SPXWHT3', tgl:'21/3/2020'}
    ] }, () => this.setState({blocking: false}));
  }

  handleAction = (tipe, val) => {
    switch (tipe) {
      case 'edit':
                alert('Edit!!!');
            break;  
      case 'delete':
                this.setState({blocking: true});
                Swal.fire({
                  title: 'Delete SKU',
                  text: "Are you sure to delete this SKU?",
                  icon: 'warning',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes!',
                  confirmButtonColor: '#3085d6',
                  showCancelButton: true,
                }).then((result) => {
                  if (result.value) {                   
                    Swal.fire({
                      title: 'Succes',
                      icon: 'success',
                      text: 'Delete Succes.',
                      showConfirmButton: false,
                      timer: 1500
                    })
                    .then(() => {
                      this.setBody();
                    })
                    this.setState({blocking: false});                    

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
                  <i className="icon-droplet"></i>Sku Management
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
            <ModalHeader toggle={ this.toggleAddModal }>Register SKU</ModalHeader>
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

export default Sku;