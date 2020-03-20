import React, { Component } from 'react';
import Table2Edit from '../Commons/Table/Table2Edit';
import Table2EditClickRow from '../Commons/Table/Table2EditClickRow';
import { Table, Card, Form, FormGroup, Label, Input, Button, CardBody, CardHeader, Col, Row, Modal, ModalHeader, ModalBody, Collapse } from 'reactstrap';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css'
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import { Bar } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import Swal from 'sweetalert2';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import API from '../../API';

class Monthly extends Component {
  constructor(props) {
    super(props);

    var today = new Date(),
        date = ("0" + today.getDate()).slice(-2) + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-' + today.getFullYear();

    this.state = {
      fadeIn: true,
      labelBar: 'I3Z',
      region: [],
      dealer: [],
      indexEdit: 0,
      datas: [
          {id: 1, md: 'I3Z', dt1: 'WMS', dt2: '116', dt3: '1', dt4: '', dt5: '4952', dt6: '3844', dt7: '-1108', dt8:'4557', dt9: '2291', dt10: '2701', dt11: '410', dt12: '464', dt13: '0', dt14: '0'},
          {id: 2, md: 'J20', dt1: 'MSK', dt2: '24', dt3: '1', dt4: '', dt5: '618', dt6: '660', dt7: '42', dt8:'670', dt9: '318', dt10: '463', dt11: '145', dt12: '96', dt13: '0', dt14: '0'},
          {id: 3, md: 'J10', dt1: 'DAM', dt2: '222', dt3: '1', dt4: '', dt5: '5077', dt6: '4986', dt7: '-91', dt8:'5083', dt9: '2543', dt10: '3319', dt11: '776', dt12: '888', dt13: '0', dt14: '0'},
          {id: 4, md: 'K0Z', dt1: 'SMG', dt2: '150', dt3: '3', dt4: '', dt5: '3916', dt6: '3850', dt7: '-66', dt8:'3876', dt9: '2324', dt10: '2624', dt11: '300', dt12: '600', dt13: '0', dt14: '0'},
          {id: 5, md: 'L01', dt1: 'DIY', dt2: '87', dt3: '3', dt4: '', dt5: '2547', dt6: '2500', dt7: '-47', dt8:'2619', dt9: '2619', dt10: '1929', dt11: '264', dt12: '348', dt13: '0', dt14: '0'},
          {id: 6, md: 'M2Z', dt1: 'SBY', dt2: '249', dt3: '4', dt4: '', dt5: '5104', dt6: '5100', dt7: '-4', dt8:'5618', dt9: '2880', dt10: '3087', dt11: '207', dt12: '996', dt13: '0', dt14: '0'},
          {id: 7, md: 'M3Z', dt1: 'MLG', dt2: '32', dt3: '4', dt4: '', dt5: '810', dt6: '810', dt7: '-101', dt8:'822', dt9: '478', dt10: '502', dt11: '23', dt12: '128', dt13: '0', dt14: '0'},
          {id: 8, md: 'N01', dt1: 'DPS', dt2: '65', dt3: '5', dt4: 'WO', dt5: '512', dt6: '512', dt7: '-122', dt8:'409', dt9: '215', dt10: '270', dt11: '65', dt12: '260', dt13: '0', dt14: '0'},
          {id: 9, md: 'N02', dt1: 'MTR', dt2: '28', dt3: '6', dt4: '', dt5: '278', dt6: '236', dt7: '-42', dt8:'286', dt9: '144', dt10: '178', dt11: '33', dt12: '112', dt13: '0', dt14: '0'},
          {id: 10, md: 'G01', dt1: 'PLB', dt2: '58', dt3: '5', dt4: '', dt5: '816', dt6: '785', dt7: '-31', dt8:'817', dt9: '420', dt10: '556', dt11: '136', dt12: '116', dt13: '0', dt14: '0'},
          {id: 11, md: 'G02', dt1: 'BKL', dt2: '25', dt3: '5', dt4: '', dt5: '179', dt6: '100', dt7: '-79', dt8:'167', dt9: '88', dt10: '77', dt11: '-11', dt12: '50', dt13: '0', dt14: '0'},
      ],
      datas2: [
          {id: 1, md: 'I3Z', dt1: '2020-03-01', dt2: '116', dt3: '1', dt4: '', dt5: '4952'},
          {id: 2, md: 'I3Z', dt1: '2020-03-02', dt2: '24', dt3: '1', dt4: '', dt5: '618'},
          {id: 3, md: 'I3Z', dt1: '2020-03-03', dt2: '222', dt3: '1', dt4: '', dt5: '5077'},
          {id: 4, md: 'I3Z', dt1: '2020-03-04', dt2: '150', dt3: '3', dt4: '', dt5: '3916'},
          {id: 5, md: 'I3Z', dt1: '2020-03-05', dt2: '87', dt3: '3', dt4: '', dt5: '2547'},
          {id: 6, md: 'I3Z', dt1: '2020-03-06', dt2: '249', dt3: '4', dt4: '', dt5: '5104'},
          {id: 7, md: 'I3Z', dt1: '2020-03-07', dt2: '32', dt3: '4', dt4: '', dt5: '810'},
          {id: 8, md: 'I3Z', dt1: '2020-03-08', dt2: '65', dt3: '5', dt4: 'W.O.', dt5: '512'},
          {id: 9, md: 'I3Z', dt1: '2020-03-09', dt2: '28', dt3: '6', dt4: '', dt5: '278'},
          {id: 10, md: 'I3Z', dt1: '2020-03-10', dt2: '58', dt3: '5', dt4: '', dt5: '816'},
          {id: 11, md: 'I3Z', dt1: '2020-03-11', dt2: '25', dt3: '5', dt4: '', dt5: '179'},
      ],
      blocking: false,
      date: date
    };   
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

  actionSave = (oldValue, newValue, row, column) => {
    const dt7 = parseInt(row.dt6) - parseInt(row.dt5);
    const newDatas = [...this.state.datas];
    newDatas[this.state.indexEdit].dt7 = '' + dt7;
    this.setState({ datas:newDatas });
  }

  rowAction = (row, rowIndex) => {
    this.setState({indexEdit: rowIndex});
    this.setState({labelBar: row.md});
    const newDatas2 = [...this.state.datas2];
    for (let index = 0; index < newDatas2.length; index++) {
      newDatas2[index].md = row.md
    }
    this.setState({ datas2:newDatas2 });
  }

  render() {
    const columns = [
        { 
          dataField: 'md',
          text: 'MD',
          headerAlign: 'center',
          align: 'center',
          editable: false
        },
        { 
          dataField: 'dt1',
          text: 'Desc', 
          headerAlign: 'center',
          align: 'center',
          editable: false
        },
        { 
          dataField: 'dt2', 
          text: 'Qty OLA', 
          headerAlign: 'center',
          align: 'center',
          editable: false
        },
        { 
            dataField: 'dt3', 
            text: 'Lead Time', 
            headerAlign: 'center',
            align: 'center',
            editable: false
        },
        { 
            dataField: 'dt4', 
            text: 'Stat', 
            headerAlign: 'center',
            align: 'center',
            editable: false,
            style: (cell, row, rowIndex, colIndex) => {
              if (rowIndex === 7) {
                return { backgroundColor: '#FFFDB3', fontWeight: 'bold' };
              }
            },
        },
        { 
            dataField: 'dt5', 
            text: 'Awal', 
            headerAlign: 'center',
            headerStyle: { backgroundColor: '#FFFDB3' },
            align: 'center',
            editable: false
        },
        { 
            dataField: 'dt6', 
            text: 'OL', 
            headerAlign: 'center',
            headerStyle: { backgroundColor: '#FFFDB3' },
            align: 'center',
            // editable: false
        },
        { 
            dataField: 'dt7', 
            text: 'OL vs Awal', 
            headerAlign: 'center',
            headerStyle: { backgroundColor: '#FFFDB3' },
            align: 'center',
            editable: false
        },
        { 
            dataField: 'dt8', 
            text: 'Avg 4 Months', 
            headerAlign: 'center',
            headerStyle: { backgroundColor: '#c8e6c9' },
            align: 'center',
            style: (cell, row, rowIndex, colIndex) => {
              return { backgroundColor: '#c8e6c9', fontWeight: 'bold' };
            },
            editable: false,
        },
        { 
            dataField: 'dt9', 
            text: 'Awal', 
            headerAlign: 'center',
            headerStyle: { backgroundColor: '#FFFDB3' },
            align: 'center',
            editable: false
        },
        { 
            dataField: 'dt10', 
            text: 'Rev', 
            headerAlign: 'center',
            headerStyle: { backgroundColor: '#FFFDB3' },
            align: 'center',
            editable: false
        },
        { 
            dataField: 'dt11', 
            text: 'Rev vs Awal', 
            headerAlign: 'center',
            headerStyle: { backgroundColor: '#FFFDB3' },
            align: 'center',
            editable: false
        },
        { 
          dataField: 'dt12', 
          text: 'Initial Display', 
          headerAlign: 'center',
          align: 'center',
          style: (cell, row, rowIndex, colIndex) => {
            return { fontWeight: 'bold' };
          },
          // editable: false
        },
        { 
            dataField: 'dt13', 
            text: 'GC', 
            headerAlign: 'center',
            align: 'center',
            // editable: false
        },
        { 
            dataField: 'dt14', 
            text: 'Support', 
            headerAlign: 'center',
            align: 'center',
            // editable: false
        },
    ];

    const columns2 = [
      { 
        dataField: 'md',
        text: 'MD',
        headerAlign: 'center',
        headerStyle: (colum, colIndex) => {
          return { width: '70px' };
        },
        align: 'center',
        editable: false
      },
      { 
        dataField: 'dt1',
        text: 'Date', 
        headerAlign: 'center',
        headerStyle: (colum, colIndex) => {
          return { width: '110px' };
        },
        align: 'center',
        editable: false
      },
      { 
        dataField: 'dt2', 
        text: 'Qty OLA', 
        headerAlign: 'center',
        align: 'center',
        editable: false
      },
      { 
          dataField: 'dt3', 
          text: 'Lead Time', 
          headerAlign: 'center',
          align: 'center',
          editable: false
      },
    ];

    const bar = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Initial Display ' + this.state.labelBar,
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [65, 59, 80, 81, 56, 55, 40],
        },
      ],
    };

    const options = {
      tooltips: {
        enabled: false,
        custom: CustomTooltips
      },
      maintainAspectRatio: false
    }

    return (
      <div className="animated fadeIn">
        <BlockUi tag="div" blocking={this.state.blocking}>
          <Row>
            <Col xs="12" sm="12" md="12">
              <Card className="card-accent-danger">
                <CardHeader>
                  <i className="icon-stack"></i>Monthly View
                </CardHeader>
                  <CardBody  className="card-body-nopad" style={{height: '730px'}}>
                    <div style={{ width: '100%' , height: '730px'}}>
                      <div style={{margin: '20px 0 0 20px', padding: '20px 20px 40px 20px', width: '40%', border: '1px solid #C8CED3',
                          borderRadius: '4px'}}>
                        <Form>
                          <FormGroup row>
                            <Col sm={3}>
                              <Label>Group Link</Label>
                            </Col>
                            <Col sm={9}>
                              <Input type='text' name='period' />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                          <Col sm={3}>
                              <Label>Preiod</Label>
                            </Col>
                            <Col sm={9}>
                              <Input type='text' name='period' />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Col sm={3}>
                              <Label>Status</Label>
                            </Col>
                            <Col sm={9}>
                              <Dropdown options={this.state.dealer} onChange={this._onSelect} value={this.state.dealer[-1]} placeholder="Select Status" />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Col sm={3}>
                              <Label>Version</Label>
                            </Col>
                            <Col sm={9}>
                              <Dropdown options={this.state.dealer} onChange={this._onSelect} value={this.state.dealer[-1]} placeholder="Select Version" />
                            </Col>
                          </FormGroup>
                          <FormGroup style={{marginBottom: '10px'}}>
                            <Button className="btn-square" color="danger" style={{float:'left', margin: '2px', padding: '4px 8px'}}>
                              Reset
                            </Button>
                            <Button className="btn-square" color="primary" style={{float:'left', margin: '2px', padding: '4px 8px'}}>
                              Search
                            </Button>
                            <Button className="btn-square" color="success" style={{float:'left', margin: '2px', padding: '4px 8px'}}>
                              Export to Excel
                            </Button>
                          </FormGroup>
                        </Form>
                      </div>
                      <div style={{marginRight: '20px', marginTop: '-40px'}}>
                        <Button className="btn-square" color="primary" style={{float:'right', margin: '2px', padding: '4px 8px'}}>
                          Approve
                        </Button>
                        <Button className="btn-square" color="primary" style={{float:'right', margin: '2px', padding: '4px 8px'}}>
                          Submit
                        </Button>
                        <Button className="btn-square" color="primary" style={{float:'right', margin: '2px', padding: '4px 8px'}}>
                          Save Draft
                        </Button>
                        <Button className="btn-square" color="primary" style={{float:'right', margin: '2px', padding: '4px 8px'}}>
                          Run
                        </Button>
                        <Button className="btn-square" color="primary" style={{float:'right', margin: '2px', padding: '4px 8px'}}>
                          Run Whole Year
                        </Button>
                      </div>
                      <SplitterLayout primaryIndex={1} percentage secondaryInitialSize={68} customClassName="spliter">
                        <div>
                          <div style={{height: '100%'}}>
                            <div style={{width: '1200px'}}>
                              <Table style={{marginBottom: '0', border: '1px solid #c8ced3'}}>
                                <tbody>
                                  <tr>
                                    <th style={{width: '33.3%'}}> </th>
                                    <th style={{border: '1px solid #c8ced3', width: '20.1%', textAlign: 'center'}}>Sales M-1</th>
                                    <th style={{border: '1px solid #c8ced3', width: '6.7%', textAlign: 'center'}}></th>
                                    <th style={{border: '1px solid #c8ced3', width: '20.1%', textAlign: 'center'}}>Sales M</th>
                                    <th> </th>
                                  </tr>
                                </tbody>
                              </Table>
                              <Table2EditClickRow 
                                tableHead={ columns }
                                datas={ this.state.datas }
                                actionRow={ this.rowAction }
                                action={ this.actionSave }
                              />
                            </div>
                          </div>
                        </div>
                        <SplitterLayout vertical percentage secondaryInitialSize={50}>
                          <div>
                            <div style={{height: '100%'}}>
                              <div style={{width: '410px'}}>
                                  <Table2Edit 
                                    tableHead={ columns2 }
                                    datas={ this.state.datas2 }
                                  />
                              </div>
                            </div>
                          </div>
                          <div style={{height: '100%'}}>
                            <div style={{height: '100%'}}>
                              <div style={{width: '100%', height: '100%'}}>
                                <Bar data={bar} options={options} />
                              </div>
                            </div>
                          </div>
                        </SplitterLayout>
                      </SplitterLayout>
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

export default Monthly;