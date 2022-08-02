import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Spinner,
  Table,
} from "reactstrap";

import { numberWithCommas } from "utils";

import { getListPesanan } from "actions/PesananAction";
import { Pesanans } from "components";

class ListPesanan extends Component {
  componentDidMount() {
    this.props.dispatch(getListPesanan());
  }

  render() {
    const { getListPesananLoading, getListPesananResult, getListPesananError } =
      this.props;
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Master Pesanan</CardTitle>
              </CardHeader>
              <CardBody>
                <Table>
                  <thead className="text-primary">
                    <tr>
                      <th>Tanggal & Order ID</th>
                      <th>Pesanan</th>
                      <th>Status</th>
                      <th>Total Harga</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getListPesananResult ? (
                      //mapping data from firebase
                      Object.keys(getListPesananResult).map((key) => (
                        <tr key={key}>
                          <td>
                            <p>{getListPesananResult[key].tanggal}</p>
                            <p>{getListPesananResult[key].order_id}</p>
                          </td>
                          <td>
                            <Pesanans
                              pesanans={getListPesananResult[key].pesanans}
                            />
                          </td>
                          <td>{getListPesananResult[key].status}</td>
                          <td align="right">
                            <p>
                              Total Harga : Rp
                              {numberWithCommas(
                                getListPesananResult[key].totalHarga
                              )}
                            </p>
                            <p>
                              Ongkir : Rp
                              {numberWithCommas(
                                getListPesananResult[key].ongkir
                              )}
                            </p>
                            <p>
                              <strong>
                                Total : Rp
                                {numberWithCommas(
                                  getListPesananResult[key].ongkir +
                                    getListPesananResult[key].totalHarga
                                )}
                              </strong>
                            </p>
                          </td>
                          <td>
                            <a
                              href={getListPesananResult[key].url}
                              className="btn btn-primary"
                              target="_blank"
                            >
                              <i className="nc-icon nc-money-coins"></i>{" "}
                              Midtrans
                            </a>
                          </td>
                        </tr>
                      ))
                    ) : //Data Ada

                    getListPesananLoading ? (
                      //Spinner Loading
                      <tr>
                        <td colSpan="7" align="center">
                          <Spinner color="primary" />
                        </td>
                      </tr>
                    ) : getListPesananError ? (
                      //Tampilkan Error
                      <tr>
                        <td colSpan="7" align="center">
                          {getListPesananError}
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
  getListPesananLoading: state.PesananReducer.getListPesananLoading,
  getListPesananResult: state.PesananReducer.getListPesananResult,
  getListPesananError: state.PesananReducer.getListPesananError,
});

export default connect(mapStateToProps, null)(ListPesanan);
