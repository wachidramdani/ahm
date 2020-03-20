import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Button } from 'reactstrap';
import Table2Edit from '../../Commons/Table/Table2Edit';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import Swal from 'sweetalert2';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

import API from '../../../API';

class Daily extends Component {
  constructor(props) {
    super(props);

    var today = new Date(),
        date = ("0" + today.getDate()).slice(-2) + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-' + today.getFullYear();

    this.state = {
      fadeIn: true,
      listForm: [],
      datas: [
        { id: 1, date: '2020-03-11', nama: 'Main Dealer A', kd_dealer: '01', bk: '70', wh: '15', rd: '15', dp: '100', percent_dp: '11'},
        { id: 2, date: '2020-03-11', nama: 'Main Dealer B', kd_dealer: '02', bk: '16', wh: '20', rd: '64', dp: '200', percent_dp: '22'},
        { id: 3, date: '2020-03-11', nama: 'Main Dealer C', kd_dealer: '03', bk: '20', wh: '15', rd: '65', dp: '400', percent_dp: '44'},
        { id: 4, date: '2020-03-11', nama: 'Main Dealer D', kd_dealer: '04', bk: '50', wh: '24', rd: '26', dp: '200', percent_dp: '22'},
      ],
      sapDatas: [
        { id: 5, date: '2020-03-11', kd_barang: 'Scoopy', bk: '100', wh: '100', rd: '700', total: '900'}
      ],
      distDatas: [],
      temp: [],
      footer: {
        distBK: 0,
        distWH: 0,
        distRD: 0,
        distTotal: 0,
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
    
    // this.setState({blocking: true});
    
    // API.get('api/auth/daily/')
    // .then(res => {
    //   if(res.status === 200){ 
    //     this.setState({ datas: this.state.datas.concat(res.data.data) });
    //     API.get('api/auth/getStockSAP/')
    //     .then(res => {
    //       if(res.status === 200){ 
    //         this.setState({ sapDatas: this.state.sapDatas.concat(res.data.data) }, () => {
    //             this.afterSetStateFinished();
    //         });
    //       }
    //     }).catch((error) => {
    //       this.setState({blocking: false});
    //       Swal.fire({  
    //           title: 'Error',  
    //           icon: 'error',  
    //           text: 'Please Check Your Network Connection.',  
    //       });
    //     });
    //   }
    //   // this.setState({blocking: false});
    // }).catch((error) => {
    //   this.setState({blocking: false});
    //   Swal.fire({  
    //       title: 'Error',  
    //       icon: 'error',  
    //       text: 'Please Check Your Network Connection.',  
    //   });
    // });

    const dt = [
      {nama: "Dealer 1", id: 1, date: "2020-03-11", kd_dealer: "01", bk: "0", wh: "0", rd: "0", dp: "0", percent_dp: "0"},
      {nama: "Dealer 2", id: 2, date: "2020-03-11", kd_dealer: "02", bk: "0", wh: "0", rd: "0", dp: "0", percent_dp: "0"},
      {nama: "Dealer 3", id: 3, date: "2020-03-11", kd_dealer: "03", bk: "0", wh: "0", rd: "0", dp: "0", percent_dp: "0"},
      {nama: "Dealer 4", id: 4, date: "2020-03-11", kd_dealer: "04", bk: "0", wh: "0", rd: "0", dp: "0", percent_dp: "0"}
    ]
    this.setState({ distDatas: this.state.distDatas.concat(dt) }, () => this.afterSetStateFinished() );
  }

  calc = (passObj) => {
    console.log(passObj);
    var stateCopy = [];
    this.state.distDatas.length = 0;
    this.state.temp.length = 0;
    this.state.footer.distBK = 0;
    this.state.footer.distWH = 0;
    this.state.footer.distRD = 0;
    this.state.footer.distTotal = 0;
    stateCopy = Object.assign({}, passObj);
    // var tempArray = this.state.datas.map(obj => stateCopy.find(o => o.id === obj.id) || obj);

    for (let index = 0; index < Object.keys(stateCopy).length; index++) {
      // console.log(this.state.temp, 'tbk')
      this.state.temp.push({
        id: stateCopy[index].id,
        nama: stateCopy[index].nama,
        bk: stateCopy[index].bk*stateCopy[index].dp/100, 
        wh: stateCopy[index].wh*stateCopy[index].dp/100,
        rd: stateCopy[index].rd*stateCopy[index].dp/100,
        total: parseInt(stateCopy[index].bk*stateCopy[index].dp/100) + parseInt(stateCopy[index].wh*stateCopy[index].dp/100) + parseInt(stateCopy[index].rd*stateCopy[index].dp/100)
      });
      this.state.footer.distBK += parseInt(stateCopy[index].bk*stateCopy[index].dp/100);
      this.state.footer.distWH += parseInt(stateCopy[index].wh*stateCopy[index].dp/100);
      this.state.footer.distRD += parseInt(stateCopy[index].rd*stateCopy[index].dp/100);
    }
    this.state.footer.distTotal += parseInt(this.state.footer.distBK) + this.state.footer.distWH + this.state.footer.distRD;
    this.setState({ distDatas: this.state.temp });
    this.setState( prevState => ({footer :
      {...prevState.footer, distBK: this.state.footer.distBK},
    }))
    this.setState( prevState => ({footer :
      {...prevState.footer, distWH: this.state.footer.distWH},
    }))
    this.setState( prevState => ({footer :
      {...prevState.footer, distRD: this.state.footer.distRD},
    }))
    this.setState( prevState => ({footer :
      {...prevState.footer, distTotal: this.state.footer.distTotal},
    }))
    this.setState({blocking: false});
  }

  afterSetStateFinished = () => {
    this.calc(this.state.datas);
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
        dataField: 'nama',
        text: 'MD',
        headerAlign: 'center',
        footer: 'Total',
        footerStyle: { backgroundColor: '#c8e6c9' },
        headerStyle: (colum, colIndex) => {
          return { width: '100px' };
        },
        editable: false
      },
      { 
        dataField: 'bk',
        text: 'BK (%)', 
        headerAlign: 'center',
        align: 'center',
        footerAlign: 'center',
        footer: '',
        footerStyle: { backgroundColor: '#c8e6c9' },
        validator: (newValue, row, column) => {
          if (isNaN(newValue)) {
            return {
              valid: false,
              message: 'Price should be numeric'
            };
          }
          return true;
        }
      },
      { 
        dataField: 'wh', 
        text: 'WH (%)', 
        headerAlign: 'center',
        align: 'center',
        footerAlign: 'center',
        footer: '',
        footerStyle: { backgroundColor: '#c8e6c9' }
      },
      { 
        dataField: 'rd', 
        text: 'RD (%)', 
        headerAlign: 'center', 
        align: 'center',
        footerAlign: 'center',
        footer: '',
        footerStyle: { backgroundColor: '#c8e6c9' }
      },
      { 
        dataField: 'dp', 
        text: 'DP (Unit)', 
        headerAlign: 'center', 
        align: 'center',
        footerAlign: 'center',
        footer: columnData => columnData.reduce((acc, item) => acc + parseInt(item), 0),
        footerStyle: { backgroundColor: '#c8e6c9' },
        headerStyle: { backgroundColor: '#c8e6c9' },
        style: (cell, row, rowIndex, colIndex) => {
          return { backgroundColor: '#c8e6c9' };
        },
        editable: false
      },
      { 
        dataField: 'percent_dp', 
        text: 'DP (%)', 
        headerAlign: 'center', 
        align: 'center',
        footerAlign: 'center',
        footer: '',
        headerStyle: { backgroundColor: '#FFFDB3' },
        style: (cell, row, rowIndex, colIndex) => {
          return { backgroundColor: '#FFFDB3' };
        },
        editable: false
      }
    ];
    
    const sapColumns = [
      { 
        dataField: 'kd_barang',
        text: 'TYPE',
        headerAlign: 'center',
        align: 'center',
        style: (cell, row, rowIndex, colIndex) => {
          return { backgroundColor: '#81c784', fontWeight: 'bold' };
        },
        editable: false
      },
      { 
        dataField: 'bk',
        text: 'BK', 
        headerAlign: 'center',
        align: 'center',
        editable: false
      },
      { 
        dataField: 'wh', 
        text: 'WH', 
        headerAlign: 'center',
        align: 'center',
        editable: false
      },
      { 
        dataField: 'rd', 
        text: 'RD', 
        headerAlign: 'center', 
        align: 'center',
        editable: false
      },
      { 
        dataField: 'total', 
        text: 'TOTAL', 
        headerAlign: 'center', 
        align: 'center',
        headerStyle: { backgroundColor: '#c8e6c9' },
        style: (cell, row, rowIndex, colIndex) => {
          return { backgroundColor: '#c8e6c9', fontWeight: 'bold' };
        },
        editable: false
      }
    ];
    
    const distColumns = [
      { 
        dataField: 'nama',
        text: 'MD',
        headerAlign: 'center',
        footer: 'Total',
        footerStyle: { backgroundColor: '#c8e6c9' },
        editable: false
      },
      { 
        dataField: 'bk',
        text: 'BK', 
        headerAlign: 'center',
        align: 'center',
        footerAlign: 'center',
        footer: columnData => columnData.reduce((acc, item) => this.state.footer.distBK, 0),
        footerStyle: { backgroundColor: '#c8e6c9' },
        editable: false
      },
      { 
        dataField: 'wh', 
        text: 'WH', 
        headerAlign: 'center',
        align: 'center',
        footerAlign: 'center',
        footer: columnData => columnData.reduce((acc, item) => this.state.footer.distWH, 0),
        footerStyle: { backgroundColor: '#c8e6c9' },
        editable: false
      },
      { 
        dataField: 'rd', 
        text: 'RD', 
        headerAlign: 'center', 
        align: 'center',
        footerAlign: 'center',
        footer: columnData => columnData.reduce((acc, item) => this.state.footer.distRD, 0),
        footerStyle: { backgroundColor: '#c8e6c9' },
        editable: false
      },
      { 
        dataField: 'total', 
        text: 'TOTAL', 
        headerAlign: 'center', 
        align: 'center',
        footerAlign: 'center',
        footer: columnData => columnData.reduce((acc, item) => this.state.footer.distTotal, 0),
        footerStyle: { backgroundColor: '#c8e6c9' },
        headerStyle: { backgroundColor: '#c8e6c9' },
        style: (cell, row, rowIndex, colIndex) => {
          return { backgroundColor: '#c8e6c9' };
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
                  <i className="icon-stack"></i>Daily Planning / <b>{this.state.date}</b>
                </CardHeader>
                  <CardBody style={{minHeight: '430px'}}>
                    <div className="filterPage">
                      <label style={{color: '#73818f'}}>Select Product</label>
                      <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />
                    </div>
                    <div style={{ width: '49%', float: 'left' }}>
                      <Table2Edit 
                        caption='Persentase Bottom Up'
                        tableHead={ columns }
                        datas={ this.state.datas }
                        action={ this.handleAction }
                      />
                    </div>

                    <div style={{ width: '49%', float: 'right' }}>
                      <Table2Edit 
                        caption='Stock SAP'
                        tableHead={ sapColumns }
                        datas={ this.state.sapDatas }
                      />
                    </div>

                    <div style={{ width: '100%' }}>
                      <Table2Edit 
                        caption='Final Quantity Distribution (Step 1, for sample calculation)'
                        tableHead={ distColumns }
                        datas={ this.state.distDatas }
                      />
                    </div>
                    <Button className="btn-github btn-sm" style={{ width: '49%', float: 'left', padding: '6px' }}>
                        <i className="icon-download7"></i>
                        <span style={{ paddingLeft: '10px' }}>Save Temporary</span>
                    </Button>
                    <Button className="btn-pinterest btn-sm" style={{ width: '49%', float: 'right', padding: '6px' }}>
                        <i className="icon-paperplane"></i>
                        <span style={{ paddingLeft: '10px' }}>Submit Fix Plan</span>
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

export default Daily;