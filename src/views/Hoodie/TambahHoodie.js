import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Row,
} from "reactstrap";
import DefaultImage from "../../assets/img/default-image.jpg";
import { getListCatHoodie } from "actions/CatHoodieAction";
import { connect } from "react-redux";

class TambahHoodie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image1: DefaultImage,
      image2: DefaultImage,
      imageToDB1: false,
      imageToDB2: false,

      nama: "",
      deskripsi: "",
      harga: 0,
      jenis: "",
      stok: 0,
      berat: 0,
      ukurans: ["S", "M", "L", "XL", "XXL", "XXXL"],
      ukuranSelected: [],
      ready: true,
      cathoodies: "",
    };
  }
  componentDidMount() {
    this.props.dispatch(getListCatHoodie());
  }

  render() {
    const {
      image1,
      image2,
      imageToDB1,
      imageToDB2,
      nama,
      deskripsi,
      harga,
      jenis,
      stok,
      berat,
      ukurans,
      ukuranSelected,
      ready,
      cathoodies,
    } = this.state;

    const { getListCatHoodieResult } = this.props;

    return (
      <div className="content">
        <Row>
          <Col>
            <Link to="/admin/hoodie" className="btn btn-primary">
              Kembali
            </Link>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardHeader tag="h4">Tambah Hoodie</CardHeader>
              <CardBody>
                <form>
                  <Row>
                    <Col md={6}>
                      <Row>
                        <Col>
                          <img
                            src={image1}
                            width="300"
                            alt="Foto Hoodie Depan"
                          />
                          <FormGroup>
                            <label>Foto Hoodie Depan</label>
                            <Input type="file" name="image1" />
                          </FormGroup>
                        </Col>
                        <Col>
                          <img
                            src={image2}
                            width="300"
                            alt="Foto Hoodie Detail"
                          />
                          <FormGroup>
                            <label>Foto Hoodie Detail</label>
                            <Input type="file" name="image2" />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <label>Nama Hoodie</label>
                        <Input type="text" value={nama} name={nama} />
                      </FormGroup>
                      <FormGroup>
                        <label>Deskripsi</label>
                        <Input
                          type="textarea"
                          value={deskripsi}
                          name={deskripsi}
                        />
                      </FormGroup>
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <label>Category Hoodie</label>
                            <Input type="select" name="cathoodies">
                              <option value="">--Pilih--</option>
                              {Object.keys(getListCatHoodieResult).map(
                                (key) => (
                                  <option value={key} key={key}>
                                    {getListCatHoodieResult[key].catHoodie}
                                  </option>
                                )
                              )}
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <label>Harga</label>
                            <Input type="number" value={harga} name={harga} />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}></Col>
                        <Col md={6}></Col>
                      </Row>
                    </Col>
                  </Row>
                </form>
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
});

export default connect(mapStateToProps, null)(TambahHoodie);
