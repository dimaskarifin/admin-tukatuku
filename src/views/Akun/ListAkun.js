import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Spinner,
  Table,
} from "reactstrap";
import { getListAkun } from "actions/AkunAction";

class ListAkun extends Component {
  componentDidMount() {
    this.props.dispatch(getListAkun());
  }

  render() {
    const { getListAkunLoading, getListAkunResult } = this.props;
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">User</CardTitle>
              </CardHeader>
              <CardBody>
                <Table>
                  <thead className="text-primary">
                    <tr>
                      <th>User ID</th>
                      <th>Nama User</th>
                      <th>Alamat</th>
                      <th>Email</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getListAkunResult ? (
                      //mapping data from firebase
                      Object.keys(getListAkunResult).map((key) => (
                        <tr key={key}>
                          <td>{getListAkunResult[key].uid}</td>
                          <td>{getListAkunResult[key].nama}</td>
                          <td>{getListAkunResult[key].alamat}</td>
                          <td>{getListAkunResult[key].email}</td>
                          <td>{getListAkunResult[key].status}</td>
                          <td></td>
                        </tr>
                      ))
                    ) : //Data Ada

                    getListAkunLoading ? (
                      //Spinner Loading
                      <tr>
                        <td colSpan="7" align="center">
                          <Spinner color="primary" />
                        </td>
                      </tr>
                    ) : getListAkunLoading ? (
                      //Tampilkan Error
                      <tr>
                        <td colSpan="7" align="center">
                          {getListAkunLoading}
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan="7" align="center">
                          Data Kosong
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getListAkunLoading: state.AkunReducer.getListAkunLoading,
  getListAkunResult: state.AkunReducer.getListAkunResult,
  getListAkunError: state.AkunReducer.getListAkunError,
});

export default connect(mapStateToProps, null)(ListAkun);
