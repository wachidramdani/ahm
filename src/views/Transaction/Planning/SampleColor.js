import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import TableEditCell from '../../Commons/Table/TableEditCell';
import TableEditNoHeader from '../../Commons/Table/TableEditNoHeader';
import { POSITION } from '../../Constants/Position';
import Swal from 'sweetalert2';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

import API from '../../../API';

class SampleColor extends Component {
  constructor(props) {
    super(props);

    var today = new Date(),
        date = ("0" + today.getDate()).slice(-2) + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-' + today.getFullYear();

    this.state = {
      fadeIn: true,
      listForm: [],
      tableHead: [],
      datas: [],
      tableHeadNas: [],
      datasNas: [{nama: 'NAS'}],
      tableHeadRoh: [],
      datasRoh: [{nama: 'ROH'}],
      blocking: false,
      date: date
    };   
  }

  componentDidMount() {
    this.setHead();
    this.setBody();
  }

  //-----table-----
  bold = (cell, row) => {
    return  <b>{ row.nama }</b>;
  }

  setHead() {
    var headerColumns = [
      { title: "PRESENTASE BOTTOM UP", row: '0', colSpan: '4', headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "120", row: '1', title: "MD", dataField: "nama", headerAlign: POSITION.CENTER, dataAlign: POSITION.LEFT, editable: false },
      { width: "70", row: '1', title: "BK", dataField: "a1", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", row: '1', title: "WH", dataField: "a2", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", row: '1', title: "RD", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", row: '0', rowSpan:'2', title: "DP", dataField: "a4", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", row: '0', rowSpan:'2', title: "%", dataField: "a5", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { title: "STEP 1", row: '0', colSpan: '3', headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", row: '1', title: "BK", dataField: "a1", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", row: '1', title: "WH", dataField: "a2", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", row: '1', title: "RD", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", row: '0', rowSpan:'2', title: "TOTAL", dataField: "a5", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { title: "% CONT / WARNA", row: '0', colSpan: '3', headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", row: '1', title: "BK", dataField: "a1", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", row: '1', title: "WH", dataField: "a2", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", row: '1', title: "RD", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { title: "STEP 2", row: '0', colSpan: '3', headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", row: '1', title: "BK", dataField: "a1", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", row: '1', title: "WH", dataField: "a2", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", row: '1', title: "RD", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", row: '0', rowSpan:'2', title: "TOTAL", dataField: "a5", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { title: "STEP 3 FIX", row: '0', colSpan: '3', headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", row: '1', title: "BK", dataField: "a1", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", row: '1', title: "WH", dataField: "a2", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", row: '1', title: "RD", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", row: '0', rowSpan:'2', title: "TOTAL", dataField: "a5", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { title: "STEP 3 FINAL", row: '0', colSpan: '3', headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", row: '1', title: "BK", dataField: "a1", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", row: '1', title: "WH", dataField: "a2", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", row: '1', title: "RD", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", row: '0', rowSpan:'2', title: "TOTAL", dataField: "a5", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
    ];
    this.setState({ tableHead: this.state.tableHead.concat(headerColumns) });
    var headerNasColumns = [
      { width: "120", dataField: "nama", headerAlign: POSITION.CENTER, dataAlign: POSITION.LEFT, editable: false, dataFormat: this.bold.bind(this) },
      { width: "70", dataField: "a1", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", dataField: "a2", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
    ];
    this.setState({ tableHeadNas: this.state.tableHeadNas.concat(headerNasColumns) });
    var headerRohColumns = [
      { width: "120", dataField: "nama", headerAlign: POSITION.CENTER, dataAlign: POSITION.LEFT, editable: false, dataFormat: this.bold.bind(this) },
      { width: "70", dataField: "a1", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", dataField: "a2", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
      { width: "70", dataField: "a3", headerAlign: POSITION.CENTER, dataAlign: POSITION.CENTER },
    ];
    this.setState({ tableHeadRoh: this.state.tableHeadRoh.concat(headerRohColumns) });
  }
  
  setBody() {
    this.setState({blocking: true});
    this.setState({ datas: [] });
    API.get('api/auth/daily/')
    .then(res => {
      if(res.status === 200){ 
        this.setState({ datas: this.state.datas.concat(res.data.data) });
      }
      this.setState({blocking: false});
    }).catch((error) => {
      this.setState({blocking: false});
      Swal.fire({  
          title: 'Error',  
          icon: 'error',  
          text: 'Please Check Your Network Connection.',  
      });
    });
  }

  handleAction = (tipe, val) => {
    switch (tipe) {
      case 'edit':
                alert('Edit!!!');
            break;  
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
                    API.delete('api/auth/menu/'+val)
                    .then(res => {
                        if(res.status === 200){                    
                            Swal.fire({
                              title: 'Success!',
                              icon: 'success',
                              text: 'Delete Success.',
                              showConfirmButton: false,
                              timer: 1500
                            })
                            .then(() => {
                              this.setBody();
                            })
                            this.setState({blocking: false});                    
                        }else{
                            Swal.fire({  
                              title: 'Warning',  
                              icon: 'warning',  
                              text: 'Your ID Unauthorized.',  
                            });
                            this.setState({blocking: false});
                        }
                    }).catch((error) => {
                        if(error && error.response && error.response.status === 500){
                            Swal.fire({  
                                title: 'Warning',  
                                icon: 'warning',  
                                text: 'Delete Failed.',  
                            });
                        }else{
                            Swal.fire({  
                                title: 'Error',  
                                icon: 'error',  
                                text: 'Please Check Your Network Connection.',  
                            });
                        }           
                        this.setState({blocking: false});
                    });
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
                  <i className="icon-stack"></i>Sample Color
                </CardHeader>
                  <CardBody className="card-body-nopad" style={{minHeight: '430px'}}>
                    <label className="scroll-title">Contoh DP Warna / {this.state.date}</label>
                    <div className="scroll">
                      <div className="scroll-item">
                        <TableEditCell 
                          tableHead={ this.state.tableHead }
                          datas={ this.state.datas }
                        />
                        <TableEditNoHeader 
                          tableHead={ this.state.tableHeadNas }
                          datas={ this.state.datasNas }
                          mt={-1}
                        />
                        <TableEditNoHeader
                          tableHead={ this.state.tableHeadRoh }
                          datas={ this.state.datasRoh }
                          mt={15}
                        />
                      </div>
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

export default SampleColor;