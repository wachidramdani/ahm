import React, { Component } from 'react';
import { Table, Card, Form, FormGroup, Label, Input, Button, CardBody, CardHeader, Col, Row, Modal, ModalHeader, ModalBody, Collapse } from 'reactstrap';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css'
import Table2Edit from '../Commons/Table/Table2Edit';
import Swal from 'sweetalert2';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import API from '../../API';

class Po extends Component {
  constructor(props) {
    super(props);

    var today = new Date(),
        date = ("0" + today.getDate()).slice(-2) + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-' + today.getFullYear();

    this.state = {
      fadeIn: true,
      modalTitle: '',
      modal: false,
      collapseFilter: false,
      region: [],
      dealer: [],
      datas: [
          {id: 1, plant: 'PT WAHANA MAKMUR SEJATI', dt1: 'OK', dt2: 'OK', dt3: 'OK', code:'WMS'},
          {id: 2, plant: 'PT MITRA SENDANG KEMAKMURAN', dt1: 'NOK', dt2: 'NOK', dt3: 'NOK', code:'MSK'},
          {id: 3, plant: 'PT DAYA ADICIPTA MOTORA', dt1: 'NOK', dt2: 'NOK', dt3: 'OK', code:'DAM'},
          {id: 4, plant: 'HS O CABANG SEMARANG', dt1: 'OK', dt2: 'OK', dt3: 'NOK', code:'SMG'},
          {id: 5, plant: 'HS O CABANG YOGYAKARTA', dt1: 'OK', dt2: 'OK', dt3: 'NOK', code:'DIY'},
          {id: 6, plant: 'PT MITRA PINASTHIKA MULIA-SBY', dt1: 'OK', dt2: 'NOK', dt3: 'OK', code:'SBY'},
          {id: 7, plant: 'PT MITRA PINASTHIKA MULIA-MLG', dt1: 'NOK', dt2: 'OK', dt3: 'OK', code:'MLG'},
          {id: 8, plant: 'HS O CABANG DENPASAR', dt1: 'OK', dt2: 'NOK', dt3: 'OK', code:'DPS'},
          {id: 9, plant: 'HS O CABANG MATARAM', dt1: 'NOK', dt2: 'NOK', dt3: 'OK', code:'MTR'},
          {id: 10, plant: 'HS O CABANG PALEMBANG', dt1: 'OK', dt2: 'OK', dt3: 'OK', code:'PLB'},
          {id: 11, plant: 'HS O CABANG BENGKULU', dt1: 'OK', dt2: 'OK', dt3: 'OK', code:'BKL'},
      ],
      detailDatas: [
        {id: 1, code: 'GB2-BB', dt1: '153', dt2: '46', dt3: '0', dt4:'153', dt5:'153', dt6:'0', dt7:'165', dt8:'165', dt9:'153', dt10:'12'},
        {id: 2, code: 'GB2-BG', dt1: '247', dt2: '59', dt3: '3', dt4:'247', dt5:'309', dt6:'0', dt7:'309', dt8:'309', dt9:'309', dt10:'0'},
        {id: 3, code: 'GB2-BR', dt1: '176', dt2: '35', dt3: '9', dt4:'176', dt5:'158', dt6:'18', dt7:'185', dt8:'185', dt9:'158', dt10:'27'},
        {id: 4, code: 'GD2-BK', dt1: '147', dt2: '74', dt3: '0', dt4:'147', dt5:'118', dt6:'29', dt7:'118', dt8:'118', dt9:'118', dt10:'0'},
        {id: 5, code: 'GD2-WH', dt1: '153', dt2: '23', dt3: '16', dt4:'153', dt5:'199', dt6:'0', dt7:'199', dt8:'199', dt9:'199', dt10:'0'},
        {id: 6, code: 'GE4-NH', dt1: '247', dt2: '99', dt3: '0', dt4:'247', dt5:'173', dt6:'74', dt7:'185', dt8:'185', dt9:'173', dt10:'12'},
        {id: 7, code: 'GE4-OR', dt1: '176', dt2: '88', dt3: '0', dt4:'176', dt5:'176', dt6:'0', dt7:'176', dt8:'176', dt9:'176', dt10:'0'},
        {id: 8, code: 'GF4-BK', dt1: '153', dt2: '46', dt3: '0', dt4:'153', dt5:'153', dt6:'0', dt7:'165', dt8:'165', dt9:'153', dt10:'12'},
        {id: 9, code: 'GF4-MH', dt1: '247', dt2: '59', dt3: '3', dt4:'247', dt5:'309', dt6:'0', dt7:'309', dt8:'309', dt9:'309', dt10:'0'},
        {id: 10, code: 'HJ6-BK', dt1: '176', dt2: '35', dt3: '9', dt4:'176', dt5:'158', dt6:'18', dt7:'185', dt8:'185', dt9:'158', dt10:'27'},
        {id: 11, code: 'HJ6-MH', dt1: '147', dt2: '74', dt3: '0', dt4:'147', dt5:'118', dt6:'29', dt7:'118', dt8:'118', dt9:'118', dt10:'0'},
      ],
      blocking: false,
      date: date,
    };   
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
  }

  getRegion(){
    API.get('api/auth/region').then(result=>{
      this.setState({
        region: this.state.region.concat(result.data.data)
      })
    })
  }

  getDealer(){
    API.get('api/auth/dealer').then(result=>{
      // console.log(result, 'deler')
      this.setState({
        dealer: this.state.dealer.concat(result.data.data)
      })
    })
  }

  componentDidMount(){
    this.getRegion();
    this.getDealer();
  }

  toggleFilter() { this.setState({ collapseFilter: !this.state.collapseFilter }); }

  toggleModal() { this.setState({ modal: !this.state.modal, }); }

  render() {
    const columns = [
      { 
        dataField: 'code',
        text: 'ID',
        headerAlign: 'center',
        align: 'center',
        editable: false,
        headerStyle: (colum, colIndex) => {
          return { width: '80px' };
        },
      },
      { 
        dataField: 'plant',
        text: 'Main Dealer',
        headerAlign: 'center',
        editable: false,
        headerStyle: (colum, colIndex) => {
          return { width: '240px' };
        },
      },
      { 
        dataField: 'dt1',
        text: '1st', 
        headerAlign: 'center',
        align: 'center',
        editable: false,
        style: (cell, row, rowIndex, colIndex) => {
          if (rowIndex === 1 || rowIndex === 2 || rowIndex === 6 || rowIndex === 8) {
            return { backgroundColor: '#E92030', fontWeight: 'bold' };
          }
          return { backgroundColor: '#92FFC6', fontWeight: 'bold' }
        },
      },
      { 
        dataField: 'dt2', 
        text: '5th', 
        headerAlign: 'center',
        align: 'center',
        editable: false,
        style: (cell, row, rowIndex, colIndex) => {
          if (rowIndex === 1 || rowIndex === 2 || rowIndex === 5 || rowIndex === 7 || rowIndex === 8) {
            return { backgroundColor: '#E92030', fontWeight: 'bold' };
          }
          return { backgroundColor: '#92FFC6', fontWeight: 'bold' }
        },
      },
      { 
        dataField: 'dt3', 
        text: 'H+2', 
        headerAlign: 'center',
        align: 'center',
        editable: false,
        style: (cell, row, rowIndex, colIndex) => {
          if (rowIndex === 1 || rowIndex === 3 || rowIndex === 4) {
            return { backgroundColor: '#E92030', fontWeight: 'bold' };
          }
          return { backgroundColor: '#92FFC6', fontWeight: 'bold' }
        },
      },
      { 
        dataField: 'dt4', 
        text: 'Detail', 
        headerAlign: 'center',
        align: 'center',
        editable: false,
        isDummyField: true,
        formatter: (cellContent, row) => {
          return (
            <span style={{background: 'paleturquoise', padding: '2px 4px', borderRadius: '2px', cursor: 'pointer'}}>
              <i className="icon-list2" style={{fontSize: '12px'}}> </i>
            </span>
          );
        },
        events: {
          onClick: (e, column, columnIndex, row, rowIndex) => {
            this.setState({modalTitle: row.plant})
            this.toggleModal();
          },
        }
      },
    ];

    const detailColumns = [
      { 
        dataField: 'code',
        text: 'Type-Color',
        headerAlign: 'center',
        align: 'center',
        editable: false,
      },
      { 
        dataField: 'dt1',
        text: 'Dist. Plan',
        headerAlign: 'center',
        editable: false,
      },
      { 
        dataField: 'dt2',
        text: 'PO', 
        headerAlign: 'center',
        align: 'center',
        editable: false,
        style: (cell, row, rowIndex, colIndex) => {
          if (rowIndex === 1 || rowIndex === 2 || rowIndex === 4 || rowIndex === 8 || rowIndex === 9) {
            return { backgroundColor: '#E92030', fontWeight: 'bold' };
          }
          return { backgroundColor: '#92FFC6', fontWeight: 'bold' }
        },
      },
      { 
        dataField: 'dt3', 
        text: 'Gap (25%)', 
        headerAlign: 'center',
        align: 'center',
        editable: false,
        style: (cell, row, rowIndex, colIndex) => {
          if (rowIndex === 1 || rowIndex === 2 || rowIndex === 4 || rowIndex === 8 || rowIndex === 9) {
            return { backgroundColor: '#E92030', fontWeight: 'bold' };
          }
          return { backgroundColor: '#92FFC6', fontWeight: 'bold' }
        },
      },
      { 
        dataField: 'dt4',
        text: 'Dist. Plan',
        headerAlign: 'center',
        editable: false,
      },
      { 
        dataField: 'dt5',
        text: 'PO', 
        headerAlign: 'center',
        align: 'center',
        editable: false,
        style: (cell, row, rowIndex, colIndex) => {
          if (rowIndex === 2 || rowIndex === 3 || rowIndex === 5 || rowIndex === 9 || rowIndex === 10) {
            return { backgroundColor: '#E92030', fontWeight: 'bold' };
          }
          return { backgroundColor: '#92FFC6', fontWeight: 'bold' }
        },
      },
      { 
        dataField: 'dt6', 
        text: 'Gap (25%)', 
        headerAlign: 'center',
        align: 'center',
        editable: false,
        style: (cell, row, rowIndex, colIndex) => {
          if (rowIndex === 2 || rowIndex === 3 || rowIndex === 5 || rowIndex === 9 || rowIndex === 10) {
            return { backgroundColor: '#E92030', fontWeight: 'bold' };
          }
          return { backgroundColor: '#92FFC6', fontWeight: 'bold' }
        },
      },
      { 
        dataField: 'dt7', 
        text: 'Dist. Plant (Prev Rev)', 
        headerAlign: 'center',
        align: 'center',
        editable: false,
      },
      { 
        dataField: 'dt8', 
        text: 'Dist. Plant (Last Rev)', 
        headerAlign: 'center',
        align: 'center',
        editable: false,
      },
      { 
        dataField: 'dt9', 
        text: 'PO', 
        headerAlign: 'center',
        align: 'center',
        editable: false,
        style: (cell, row, rowIndex, colIndex) => {
          if (rowIndex === 0 || rowIndex === 2 || rowIndex === 5 || rowIndex === 7 || rowIndex === 9) {
            return { backgroundColor: '#E92030', fontWeight: 'bold' };
          }
          return { backgroundColor: '#92FFC6', fontWeight: 'bold' }
        },
      },
      { 
        dataField: 'dt10', 
        text: 'Gap (100%)', 
        headerAlign: 'center',
        align: 'center',
        editable: false,
        style: (cell, row, rowIndex, colIndex) => {
          if (rowIndex === 0 || rowIndex === 2 || rowIndex === 5 || rowIndex === 7 || rowIndex === 9) {
            return { backgroundColor: '#E92030', fontWeight: 'bold' };
          }
          return { backgroundColor: '#92FFC6', fontWeight: 'bold' }
        },
      },
    ];

    return (
      <div className="animated fadeIn">
        <BlockUi tag="div" blocking={this.state.blocking}>
          <Row>
            <Col xs="12" sm="12" md="12">
              <Card className="card-accent-danger">
                <CardHeader>
                  <i className="icon-stack"></i>Po Completeness
                </CardHeader>
                  <CardBody style={{minHeight: '430px'}}>
                    <div style={{ width: '100%' }}>
                      <Card className="border-danger" style={{width: '60%', float: 'right'}}>
                        <CardHeader className="card-header-filter bg-danger">
                          Filter
                          <div className="card-header-actions">
                            <a className="card-header-action btn btn-minimize pointer" onClick={this.toggleFilter}><i className="icon-minus2"></i></a>
                          </div>
                        </CardHeader>
                        <Collapse isOpen={this.state.collapseFilter}>
                          <CardBody>
                            <Form>
                              <FormGroup row>
                                <Col sm={2}>
                                  <Label>Region</Label>
                                </Col>
                                <Col sm={4}>
                                  <Dropdown options={this.state.region} onChange={this._onSelect} value={this.state.region[-1]} placeholder="Select Region" />
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                              <Col sm={2}>
                                  <Label>Main Dealer</Label>
                                </Col>
                                <Col sm={4}>
                                  <Dropdown options={this.state.dealer} onChange={this._onSelect} value={this.state.dealer[-1]} placeholder="Select Dealer" />
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Col sm={2}>
                                  <Label>Period</Label>
                                </Col>
                                <Col sm={4}>
                                  <Input type='month' name='period'>
                                  </Input>
                                </Col>
                                <Col sm={1}>
                                  <Label>To</Label>
                                </Col>
                                <Col sm={4}>
                                  <Input type="month" name="date" />
                                </Col>
                              </FormGroup>
                              <FormGroup>
                                <Button className="btn-github btn-sm" style={{ width: '100%', float: 'left', padding: '6px' , marginBottom: '20px'}}>
                                  <i className="icon-search4"></i>
                                  <span style={{ paddingLeft: '10px' }}>Apply</span>
                                </Button>
                              </FormGroup>
                            </Form>
                          </CardBody>
                        </Collapse>
                      </Card>
                      <Table2Edit 
                        caption='Po Completeness / Mar-2020'
                        tableHead={ columns }
                        datas={ this.state.datas }
                      />
                    </div>
                  </CardBody>
              </Card>
            </Col>
          </Row>
        </BlockUi>
        <Modal style={{maxWidth: '1600px', width: '80%'}} isOpen={ this.state.modal } toggle={ this.toggleModal } className='modal-dialog modal-danger' backdrop="static">
          <BlockUi tag="div" blocking={this.state.blocking_modal}>
            <ModalHeader toggle={ this.toggleModal }>{this.state.modalTitle}</ModalHeader>
            <ModalBody>
              <Table style={{marginBottom: '0', border: '1px solid #c8ced3'}}>
                <tbody>
                  <tr>
                    <th style={{width: '9.1%'}}> </th>
                    <th style={{border: '1px solid #c8ced3', width: '27.3%', textAlign: 'center'}}>1st</th>
                    <th style={{border: '1px solid #c8ced3', width: '27.3%', textAlign: 'center'}}>5th</th>
                    <th style={{border: '1px solid #c8ced3', textAlign: 'center'}}>H+2</th>
                  </tr>
                </tbody>
              </Table>
              <Table2Edit 
                tableHead={ detailColumns }
                datas={ this.state.detailDatas }
              />
            </ModalBody>
          </BlockUi>
        </Modal>
      </div>
    );
  }
}

export default Po;