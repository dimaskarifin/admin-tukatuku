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
import { deleteCatHoodie } from "actions/CatHoodieAction";
import { getListCatHoodie } from "actions/CatHoodieAction";
import swal from "sweetalert";

class ListHoodie extends Component {
  componentDidMount() {
    this.props.dispatch(getListCatHoodie());
  }

  removeData = (image, id) => {
    //akses ke actions
    this.props.dispatch(deleteCatHoodie(image, id));
  };

  componentDidUpdate(prevProps) {
    const { deleteCatHoodieResult } = this.props;

    if (
      deleteCatHoodieResult &&
      prevProps.deleteCatHoodieResult !== deleteCatHoodieResult
    ) {
      swal("Sukses!", deleteCatHoodieResult, "success");
      this.props.dispatch(getListCatHoodie());
    }
  }

  render() {
    const {
      getListCatHoodieLoading,
      getListCatHoodieResult,
      getListCatHoodieError,
    } = this.props;
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Master Category Hoodie</CardTitle>
                <Link
                  to="/admin/category-hoodie/tambah"
                  className="btn btn-primary float-right"
                >
                  Tambah Category Hoodie
                </Link>
              </CardHeader>
              <CardBody>
                <Table>
                  <thead className="text-primary">
                    <tr>
                      <th>Logo</th>
                      <th>Nama Category Hoodie</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>

                  <tbody>
                    {getListCatHoodieResult ? (
                      //mapping data from firebase
                      Object.keys(getListCatHoodieResult).map((key) => (
                        <tr key={key}>
                          <td>
                            <img
                              src={getListCatHoodieResult[key].image}
                              width="100"
                              alt={getListCatHoodieResult[key].catHoodie}
                            />
                          </td>
                          <td>{getListCatHoodieResult[key].catHoodie}</td>
                          <td>
                            <Link
                              className="btn btn-warning"
                              to={"/admin/category-hoodie/edit/" + key}
                            >
                              <i className="nc-icon nc-ruler-pencil"></i> Edit
                            </Link>

                            <Button
                              color="danger"
                              className="ml-2"
                              onClick={() =>
                                this.removeData(
                                  getListCatHoodieResult[key].image,
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

                    getListCatHoodieLoading ? (
                      //Spinner Loading
                      <tr>
                        <td colSpan="3" align="center">
                          <Spinner color="primary" />
                        </td>
                      </tr>
                    ) : getListCatHoodieError ? (
                      //Tampilkan Error
                      <tr>
                        <td colSpan="3" align="center">
                          {getListCatHoodieError}
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan="3" align="center">
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
  getListCatHoodieLoading: state.CatHoodieReducer.getListCatHoodieLoading,
  getListCatHoodieResult: state.CatHoodieReducer.getListCatHoodieResult,
  getListCatHoodieError: state.CatHoodieReducer.getListCatHoodieError,

  deleteCatHoodieLoading: state.CatHoodieReducer.deleteCatHoodieLoading,
  deleteCatHoodieResult: state.CatHoodieReducer.deleteCatHoodieResult,
  deleteCatHoodieError: state.CatHoodieReducer.deleteCatHoodieError,
});

export default connect(mapStateToProps, null)(ListHoodie);
