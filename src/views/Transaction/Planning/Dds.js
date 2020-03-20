import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button } from 'reactstrap';
import Table2Edit from '../../Commons/Table/Table2Edit';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import { POSITION } from '../../Constants/Position';
import { INPUT } from '../../Constants/Input';
import Swal from 'sweetalert2';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

import API from '../../../API';

class Dds extends Component {
  constructor(props) {
    super(props);

    var today = new Date(),
        date = ("0" + today.getDate()).slice(-2) + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-' + today.getFullYear();

    this.state = {
      fadeIn: true,
      listForm: [],
      datas: [],
      distDatas: [],
      temp: [],
      footer: {
        distT1: -1,
        distT2: -1,
        distT3: 0,
        distT4: -1,
        distT5: -1,
        distT6: 0,
        distT7: 0,
        distT8: 0,
        distT9: -1,
        distT10: 0,
      },
      blocking: false,
      date: date
    };   
  }

  componentDidMount() {
    this.setBody();
  }

  //-----table-----
  bold = (cell, row) => {
    return  <b>{ row.nama }</b>;
  }
  
  setBody() {
    this.setState({blocking: true});
    const dts = [
      {id: 1, desc: "MPS", t1: "15", t2: "11", t3: "20", t4: "15", t5: "15", t6: "20", t7: "30", t8: "30", t9: "10", t10: "30", total: "195"},
      {id: 2, desc: "%", t1: "8", t2: "18", t3: "28", t4: "38", t5: "48", t6: "58", t7: "68", t8: "78", t9: "88", t10: "98", total: ""},
      {id: 3, desc: "X", t1: "1.00", t2: "0.51", t3: "1.03", t4: "0.77", t5: "0.77", t6: "1.03", t7: "1.54", t8: "1.54", t9: "0.51", t10: "1.54", total: ""},
    ]
    this.setState({ datas: this.state.datas.concat(dts) });
    const dt = [
      {id: 1, md: "MD A", dp: '20', t1: "2", t2: "1", t3: "2", t4: "2", t5: "2", t6: "2", t7: "3", t8: "3", t9: "1", t10: "3", total: "21", selisih: "1"},
      {id: 2, md: "MD B", dp: '30', t1: "2", t2: "2", t3: "3", t4: "2", t5: "2", t6: "3", t7: "5", t8: "5", t9: "2", t10: "5", total: "31", selisih: "1"},
      {id: 3, md: "MD C", dp: '50', t1: "4", t2: "3", t3: "5", t4: "4", t5: "4", t6: "5", t7: "8", t8: "8", t9: "3", t10: "8", total: "52", selisih: "2"},
      {id: 4, md: "MD D", dp: '35', t1: "3", t2: "2", t3: "4", t4: "3", t5: "3", t6: "4", t7: "5", t8: "5", t9: "2", t10: "5", total: "36", selisih: "1"},
      {id: 5, md: "MD E", dp: '60', t1: "5", t2: "3", t3: "6", t4: "5", t5: "5", t6: "6", t7: "9", t8: "9", t9: "3", t10: "9", total: "60", selisih: "0"},
      {id: 6, md: "", dp: '195', t1: "16", t2: "11", t3: "20", t4: "16", t5: "20", t6: "30", t7: "11", t8: "30", t9: "11", t10: "30"},
    ]
    this.setState({ distDatas: this.state.distDatas.concat(dt) }, () => this.afterSetStateFinished());
  }

  calc = (passObj) => {
    var stateCopy = [];
    // this.state.distDatas.length = 0;
    this.state.temp.length = 0;
    // this.state.footer.distT1 = 0;
    // this.state.footer.distT2 = 0;
    // this.state.footer.distT3 = 0;
    // this.state.footer.distT4 = 0;
    // this.state.footer.distT5 = 0;
    // this.state.footer.distT6 = 0;
    // this.state.footer.distT7 = 0;
    // this.state.footer.distT8 = 0;
    // this.state.footer.distT9 = 0;
    // this.state.footer.distT10 = 0;
    stateCopy = Object.assign({}, passObj);
    
    console.log(stateCopy, 'copy');

    for (let index = 0; index < Object.keys(stateCopy).length; index++) {
      this.state.temp.push({
        id: stateCopy[index].id,
        md: stateCopy[index].md,
        dp: stateCopy[index].dp,
      });
      // this.state.footer.distBK += parseInt(stateCopy[index].bk*stateCopy[index].dp/100);
      // this.state.footer.distWH += parseInt(stateCopy[index].wh*stateCopy[index].dp/100);
      // this.state.footer.distRD += parseInt(stateCopy[index].rd*stateCopy[index].dp/100);
    }
    // this.state.footer.distTotal += parseInt(this.state.footer.distBK) + this.state.footer.distWH + this.state.footer.distRD;
    // this.setState({ distDatas: this.state.temp });
    // this.setState( prevState => ({footer :
    //   {...prevState.footer, distBK: this.state.footer.distBK},
    // }))
    // this.setState( prevState => ({footer :
    //   {...prevState.footer, distWH: this.state.footer.distWH},
    // }))
    // this.setState( prevState => ({footer :
    //   {...prevState.footer, distRD: this.state.footer.distRD},
    // }))
    // this.setState( prevState => ({footer :
    //   {...prevState.footer, distTotal: this.state.footer.distTotal},
    // }))
    this.setState({blocking: false});
  }

  afterSetStateFinished = () => {
    this.calc(this.state.distDatas);
  }

  handleAction = (oldValue, newValue, row, column) => {
    var stateCopy = [];
    stateCopy[0] = Object.assign({}, row);
    var tempArray = this.state.datas.map(obj => stateCopy.find(o => o.id === obj.id) || obj);
    this.calc(tempArray);
  }
  //-----end table-----

  render() {
    const columns = [
      { 
        dataField: 'desc',
        text: 'Tanggal',
        headerAlign: 'center',
        align: 'center',
        headerStyle: (colum, colIndex) => {
          return { width: '100px' };
        },
        editable: false
      },
      { 
        dataField: 't1',
        text: '1', 
        headerAlign: 'center',
        align: 'center',
        editable: (content, row, rowIndex, columnIndex) => rowIndex === 0
      },
      { 
        dataField: 't2', 
        text: '2', 
        headerAlign: 'center',
        align: 'center',
        editable: (content, row, rowIndex, columnIndex) => rowIndex === 0
      },
      { 
        dataField: 't3', 
        text: '3', 
        headerAlign: 'center', 
        align: 'center',
        editable: (content, row, rowIndex, columnIndex) => rowIndex === 0
      },
      { 
        dataField: 't4', 
        text: '4', 
        headerAlign: 'center', 
        align: 'center',
        editable: (content, row, rowIndex, columnIndex) => rowIndex === 0
      },
      { 
        dataField: 't5', 
        text: '5', 
        headerAlign: 'center', 
        align: 'center',
        editable: (content, row, rowIndex, columnIndex) => rowIndex === 0
      },
      { 
        dataField: 't6', 
        text: '6', 
        headerAlign: 'center', 
        align: 'center',
        editable: (content, row, rowIndex, columnIndex) => rowIndex === 0
      },
      { 
        dataField: 't7', 
        text: '7', 
        headerAlign: 'center', 
        align: 'center',
        editable: (content, row, rowIndex, columnIndex) => rowIndex === 0
      },
      { 
        dataField: 't8', 
        text: '8', 
        headerAlign: 'center', 
        align: 'center',
        editable: (content, row, rowIndex, columnIndex) => rowIndex === 0
      },
      { 
        dataField: 't9', 
        text: '9', 
        headerAlign: 'center', 
        align: 'center',
        editable: (content, row, rowIndex, columnIndex) => rowIndex === 0
      },
      { 
        dataField: 't10', 
        text: '10', 
        headerAlign: 'center', 
        align: 'center',
        editable: (content, row, rowIndex, columnIndex) => rowIndex === 0
      },
      { 
        dataField: 'total', 
        text: 'TOTAL', 
        headerAlign: 'center', 
        align: 'center',
        headerStyle: { backgroundColor: '#FFFDB3' },
        style: (cell, row, rowIndex, colIndex) => {
          if (rowIndex === 0) {
            return { backgroundColor: '#FFFDB3', fontWeight: 'bold' };
          }
          return { backgroundColor: '#fff', border: 'none' }
        },
        editable: false
      }
    ];
    
    const distColumns = [
      { 
        dataField: 'md',
        text: 'MD',
        headerAlign: 'center',
        footer: '',
        editable: false
      },
      { 
        dataField: 'dp',
        text: 'Dist Plan', 
        headerAlign: 'center',
        align: 'center',
        footer: 'Selisih',
        footerAlign: 'center',
        editable: false
      },
      { 
        dataField: 't1', 
        text: '1', 
        headerAlign: 'center',
        align: 'center',
        footerAlign: 'center',
        footer: columnData => columnData.reduce((acc, item) => this.state.footer.distT1, 0),
        footerStyle: (column, colIndex) => {
          if (this.state.footer.distT1 < 0) {
            return {
              backgroundColor: '#E92030'
            };
          }
          return {
            backgroundColor: '#92FFC6'
          };
        },
        editable: false
      },
      { 
        dataField: 't2', 
        text: '2', 
        headerAlign: 'center', 
        align: 'center',
        footerAlign: 'center',
        footer: columnData => columnData.reduce((acc, item) => this.state.footer.distT2, 0),
        footerStyle: (column, colIndex) => {
          if (this.state.footer.distT2 < 0) {
            return {
              backgroundColor: '#E92030'
            };
          }
          return {
            backgroundColor: '#92FFC6'
          };
        },
        editable: false
      },
      { 
        dataField: 't3', 
        text: '3', 
        headerAlign: 'center', 
        align: 'center',
        footerAlign: 'center',
        footer: columnData => columnData.reduce((acc, item) => this.state.footer.distT3, 0),
        footerStyle: (column, colIndex) => {
          if (this.state.footer.distT3 < 0) {
            return {
              backgroundColor: '#E92030'
            };
          }
          return {
            backgroundColor: '#92FFC6'
          };
        },
        editable: false
      },
      { 
        dataField: 't4', 
        text: '4', 
        headerAlign: 'center', 
        align: 'center',
        footerAlign: 'center',
        footer: columnData => columnData.reduce((acc, item) => this.state.footer.distT4, 0),
        footerStyle: (column, colIndex) => {
          if (this.state.footer.distT4 < 0) {
            return {
              backgroundColor: '#E92030'
            };
          }
          return {
            backgroundColor: '#92FFC6'
          };
        },
        editable: false
      },
      { 
        dataField: 't5', 
        text: '5', 
        headerAlign: 'center', 
        align: 'center',
        footerAlign: 'center',
        footer: columnData => columnData.reduce((acc, item) => this.state.footer.distT5, 0),
        footerStyle: (column, colIndex) => {
          if (this.state.footer.distT5 < 0) {
            return {
              backgroundColor: '#E92030'
            };
          }
          return {
            backgroundColor: '#92FFC6'
          };
        },
        editable: false
      },
      { 
        dataField: 't6', 
        text: '6', 
        headerAlign: 'center', 
        align: 'center',
        footerAlign: 'center',
        footer: columnData => columnData.reduce((acc, item) => this.state.footer.distT6, 0),
        footerStyle: (column, colIndex) => {
          if (this.state.footer.distT6 < 0) {
            return {
              backgroundColor: '#E92030'
            };
          }
          return {
            backgroundColor: '#92FFC6'
          };
        },
        editable: false
      },
      { 
        dataField: 't7', 
        text: '7', 
        headerAlign: 'center', 
        align: 'center',
        footerAlign: 'center',
        footer: columnData => columnData.reduce((acc, item) => this.state.footer.distT7, 0),
        footerStyle: (column, colIndex) => {
          if (this.state.footer.distT7 < 0) {
            return {
              backgroundColor: '#E92030'
            };
          }
          return {
            backgroundColor: '#92FFC6'
          };
        },
        editable: false
      },
      { 
        dataField: 't8', 
        text: '8', 
        headerAlign: 'center', 
        align: 'center',
        footerAlign: 'center',
        footer: columnData => columnData.reduce((acc, item) => this.state.footer.distT8, 0),
        footerStyle: (column, colIndex) => {
          if (this.state.footer.distT8 < 0) {
            return {
              backgroundColor: '#E92030'
            };
          }
          return {
            backgroundColor: '#92FFC6'
          };
        },
        editable: false
      },
      { 
        dataField: 't9', 
        text: '9', 
        headerAlign: 'center', 
        align: 'center',
        footerAlign: 'center',
        footer: columnData => columnData.reduce((acc, item) => this.state.footer.distT9, 0),
        footerStyle: (column, colIndex) => {
          if (this.state.footer.distT9 < 0) {
            return {
              backgroundColor: '#E92030'
            };
          }
          return {
            backgroundColor: '#92FFC6'
          };
        },
        editable: false
      },
      { 
        dataField: 't10', 
        text: '10', 
        headerAlign: 'center', 
        align: 'center',
        footerAlign: 'center',
        footer: columnData => columnData.reduce((acc, item) => this.state.footer.distT10, 0),
        footerStyle: (column, colIndex) => {
          if (this.state.footer.distT10 < 0) {
            return {
              backgroundColor: '#E92030'
            };
          }
          return {
            backgroundColor: '#92FFC6'
          };
        },
        editable: false
      },
      { 
        dataField: 'total', 
        text: 'TOTAL', 
        headerAlign: 'center', 
        align: 'center',
        footerAlign: 'center',
        style: (cell, row, rowIndex, colIndex) => {
          if (rowIndex === 5) {
            return { backgroundColor: '#fff', border: 'none' }
          }
          return { fontWeight: 'bold' }
        },
        editable: false
      },
      { 
        dataField: 'selisih', 
        text: 'GAP', 
        headerAlign: 'center', 
        align: 'center',
        footerAlign: 'center',
        style: (cell, row, rowIndex, colIndex) => {
          if (rowIndex === 5) {
            return { backgroundColor: '#FFFFFF', border: 'none' }
          }else if(row.selisih !== '0') {
            return { backgroundColor: '#E92030', fontWeight: 'bold' }
          }
          return { backgroundColor: '#92FFC6', fontWeight: 'bold' }
        },
        editable: false
      }
    ];
    
    const options = [
      {
        type: 'group', name: 'CUB', items: [
          { value: 'C1', label: 'Super Cub C125' },
          { value: 'C2', label: 'Revo X' },
          { value: 'C3', label: 'Supra X 125 FI' },
          { value: 'C4', label: 'Supra GTR 150' }
        ]
      },
      {
        type: 'group', name: 'MATIC', items: [
          { value: 'M1', label: 'Genio' },
          { value: 'M2', label: 'BeAT' },
          { value: 'M3', label: 'BeAT Street' },
          { value: 'M4', label: 'Vario 125 eSP' },
          { value: 'M5', label: 'Vario 150 eSP' },
          { value: 'M6', label: 'Scoopy' },
          { value: 'M7', label: 'PCX 150' },
          { value: 'M8', label: 'ADV 150' },
          { value: 'M9', label: 'PCX Hybrid' },
          { value: 'M10', label: 'SH 150i' },
          { value: 'M11', label: 'Forza' },
        ]
      },
      {
        type: 'group', name: 'SPORT', items: [
          { value: 'S1', label: 'CRF 150L' },
          { value: 'S2', label: 'CBR 150R' },
          { value: 'S3', label: 'CB 150R' },
          { value: 'S4', label: 'Sonic 150R' },
          { value: 'S5', label: 'CB 150 Verza' },
          { value: 'S6', label: 'CBR 250RR' },
          { value: 'S7', label: 'CRF 250RALLY' },
          { value: 'S8', label: 'Honda Monkey' }
        ]
      }
    ];
    const defaultOption = options[-1];

    return (
      <div className="animated fadeIn">
        <BlockUi tag="div" blocking={this.state.blocking}>
          <Row>
            <Col xs="12" sm="12" md="12">
              <Card className="card-accent-danger">
                <CardHeader>
                  <i className="icon-stack"></i>Daily Distribution Schedule / <b>{this.state.date}</b>
                </CardHeader>
                  <CardBody style={{minHeight: '430px'}}>
                    <div className="filterPage">
                      <label style={{color: '#73818f'}}>Select Product</label>
                      <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />
                    </div>
                    <div style={{ width: '100%%' }}>
                      <Table2Edit 
                        caption='Input Data DDS'
                        tableHead={ columns }
                        datas={ this.state.datas }
                        action={ this.handleAction }
                      />
                    </div>

                    <div style={{ width: '100%' }}>
                      <Table2Edit 
                        caption='Result Data DDS'
                        tableHead={ distColumns }
                        datas={ this.state.distDatas }
                      />
                    </div>
                    <Button className="btn-github btn-sm" style={{ width: '49%', float: 'left', padding: '10px' }}>
                        <i className="icon-download7"></i>
                        <span style={{ paddingLeft: '10px' }}>Save Temporary</span>
                    </Button>
                    <Button className="btn-pinterest btn-sm" style={{ width: '49%', float: 'right', padding: '10px' }}>
                        <i className="icon-paperplane"></i>
                        <span style={{ paddingLeft: '10px' }}>Submit Fix DDS</span>
                    </Button>
                  </CardBody>
              </Card>
            </Col>
          </Row>
        </BlockUi>
      </div>
    );
  }
}

export default Dds;