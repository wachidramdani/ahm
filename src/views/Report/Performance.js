import React, { Component } from 'react';
import { Table, Card, Form, FormGroup, Label, Input, Button, CardBody, CardHeader, Col, Row, Modal, ModalHeader, ModalBody, Collapse } from 'reactstrap';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css'
import Table2Edit from '../Commons/Table/Table2Edit';
import Swal from 'sweetalert2';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import API from '../../API';

class Performance extends Component {
  constructor(props) {
    super(props);

    var today = new Date(),
        date = ("0" + today.getDate()).slice(-2) + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-' + today.getFullYear();

    this.state = {
      fadeIn: true,
      collapseFilter: false,
      region: [],
      dealer: [],
      datas: [
          {id: 1, plant: 'P1', dt1: '1.800', dt2: '1473', dt3: '225', dt4: '80', dt5: '16.200', dt6: '11.784', dt7: '4.416', dt8:'73'},
          {id: 2, plant: 'P2', dt1: '280', dt2: '261', dt3: '150', dt4: '90', dt5: '2.400', dt6: '2.349', dt7: '51', dt8:'98'},
          {id: 3, plant: 'P3', dt1: '3.500', dt2: '3.481', dt3: '375', dt4: '99', dt5: '39.000', dt6: '38.291', dt7: '709', dt8:'98'},
          {id: 4, plant: 'P3A', dt1: '2.100', dt2: '1.792', dt3: '375', dt4: '85', dt5: '19.600', dt6: '19.712', dt7: '-112', dt8:'101'},
          {id: 5, plant: 'P4', dt1: '1.200', dt2: '953', dt3: '225', dt4: '79', dt5: '10.800', dt6: '8.000', dt7: '421', dt8:'80'},
          {id: 6, plant: 'P5', dt1: '38.00', dt2: '3.772', dt3: '150', dt4: '99', dt5: '38.000', dt6: '23.025', dt7: '-98', dt8:'101'},
      ],
      blocking: false,
      date: date
    };   

    this.toggleFilter = this.toggleFilter.bind(this);
  }

  toggleFilter() { this.setState({ collapseFilter: !this.state.collapseFilter }); }

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

  render() {
    const columns = [
        { 
          dataField: 'plant',
          text: 'Plant',
          headerAlign: 'center',
          editable: false
        },
        { 
          dataField: 'dt1',
          text: 'Target Daily Dist. (DO)', 
          headerAlign: 'center',
          align: 'center',
          editable: false
        },
        { 
          dataField: 'dt2', 
          text: 'Daily Dist', 
          headerAlign: 'center',
          align: 'center',
          editable: false
        },
        { 
            dataField: 'dt3', 
            text: 'Unfilled', 
            headerAlign: 'center',
            align: 'center',
            editable: false
        },
        { 
            dataField: 'dt4', 
            text: '% Ach Daily Dist', 
            headerAlign: 'center',
            align: 'center',
            editable: false,
            style: (cell, row, rowIndex, colIndex) => {
              if (rowIndex === 2 || rowIndex === 5) {
                return { backgroundColor: '#FFFDB3', fontWeight: 'bold' };
              }
              return { backgroundColor: '#E92030', fontWeight: 'bold' }
            },
        },
        { 
            dataField: 'dt5', 
            text: 'Target MTD Dist (DOS)', 
            headerAlign: 'center',
            align: 'center',
            editable: false
        },
        { 
            dataField: 'dt6', 
            text: 'MTD Dist', 
            headerAlign: 'center',
            align: 'center',
            editable: false
        },
        { 
            dataField: 'dt7', 
            text: 'Unfilled', 
            headerAlign: 'center',
            align: 'center',
            editable: false
        },
        { 
            dataField: 'dt8', 
            text: '% Ach MTD Dist', 
            headerAlign: 'center',
            align: 'center',
            editable: false,
            style: (cell, row, rowIndex, colIndex) => {
              if (rowIndex === 0) {
                return { backgroundColor: '#E92030', fontWeight: 'bold' };
              }else if(rowIndex === 3 || rowIndex === 5) {
                return { backgroundColor: '#FFFDB3', fontWeight: 'bold' };
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
                  <i className="icon-stack"></i>Distribution Performance
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
                                  <Input type='date' name='period'>
                                  </Input>
                                </Col>
                                <Col sm={1}>
                                  <Label>To</Label>
                                </Col>
                                <Col sm={4}>
                                  <Input type="date" name="date" />
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
                        caption='Distribution Performance by Plant / 11-03-2020'
                        tableHead={ columns }
                        datas={ this.state.datas }
                      />
                    </div>
                  </CardBody>
              </Card>
            </Col>
          </Row>
        </BlockUi>
      </div>
    );
  }
}

export default Performance;