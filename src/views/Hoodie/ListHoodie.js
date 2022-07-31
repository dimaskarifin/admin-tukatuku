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
import swal from "sweetalert";
import { getListHoodie } from "actions/HoodieAction";
import { numberWithCommas } from "utils";

class ListHoodie extends Component {
  componentDidMount() {
    this.props.dispatch(getListHoodie());
  }

  removeData = (image, id) => {};

  componentDidUpdate(prevProps) {}

  render() {
    const { getListHoodieLoading, getListHoodieResult, getListHoodieError } =
      this.props;
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Master Hoodie</CardTitle>
                <Link
                  to="/admin/hoodie/tambah"
                  className="btn btn-primary float-right"
                >
                  Tambah Hoodie
                </Link>
              </CardHeader>
              <CardBody>
                <Table>
                  <thead className="text-primary">
                    <tr>
                      <th>Foto</th>
                      <th>Nama Hoodie</th>
                      <th>Harga</th>
                      <th>Jenis</th>
                      <th>Stok</th>
                      <th>Berat</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getListHoodieResult ? (
                      //mapping data from firebase
                      Object.keys(getListHoodieResult).map((key) => (
                        <tr key={key}>
                          <td>
                            <img
                              src={getListHoodieResult[key].gambar[0]}
                              width="100"
                              alt={getListHoodieResult[key].gambar}
                            />
                          </td>
                          <td>{getListHoodieResult[key].nama}</td>
                          <td>
                            Rp{" "}
                            {numberWithCommas(getListHoodieResult[key].harga)}
                          </td>
                          <td>{getListHoodieResult[key].jenis}</td>
                          <td>{getListHoodieResult[key].stok}</td>
                          <td>{getListHoodieResult[key].berat}</td>
                          <td>
                            <Link
                              className="btn btn-warning"
                              to={"/admin/hoodie/edit/" + key}
                            >
                              <i className="nc-icon nc-ruler-pencil"></i> Edit
                            </Link>

                            <Button
                              color="danger"
                              className="ml-2"
                              onClick={() =>
                                this.removeData(
                                  getListHoodieResult[key].image,
                                  key
                                )
                              }
                            >
                              <i className="nc-icon nc-basket"></i> Hapus
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : //Data Ada

                    getListHoodieLoading ? (
                      //Spinner Loading
                      <tr>
                        <td colSpan="7" align="center">
                          <Spinner color="primary" />
                        </td>
                      </tr>
                    ) : getListHoodieError ? (
                      //Tampilkan Error
                      <tr>
                        <td colSpan="7" align="center">
                          {getListHoodieError}
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
  getListHoodieLoading: state.HoodieReducer.getListHoodieLoading,
  getListHoodieResult: state.HoodieReducer.getListHoodieResult,
  getListHoodieError: state.HoodieReducer.getListHoodieError,
});

export default connect(mapStateToProps, null)(ListHoodie);
