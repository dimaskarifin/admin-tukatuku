import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import DefaultImage from "../../assets/img/default-image.jpg";
import { connect } from "react-redux";
import swal from "sweetalert";
import { uploadHoodie } from "actions/HoodieAction";
import { getListCatHoodie } from "actions/CatHoodieAction";
import { getDetailHoodie } from "actions/HoodieAction";
import { updateHoodie } from "actions/HoodieAction";

class EditHoodie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      image1: DefaultImage,
      image2: DefaultImage,
      imageToDB1: false,
      imageToDB2: false,
      imageLama1: false,
      imageLama2: false,
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
      editUkuran: false,
    };
  }
  componentDidMount() {
    this.props.dispatch(getListCatHoodie());
    this.props.dispatch(getDetailHoodie(this.props.match.params.id));
  }

  componentDidUpdate(prevProps) {
    const { uploadHoodieResult, getDetailHoodieResult, updateHoodieResult } =
      this.props;

    if (
      uploadHoodieResult &&
      prevProps.uploadHoodieResult !== uploadHoodieResult
    ) {
      this.setState({
        [uploadHoodieResult.imageToDB]: uploadHoodieResult.image,
      });

      swal("Sukses", "Gambar Berhasil di Upload", "success");
    }

    if (
      updateHoodieResult &&
      prevProps.updateHoodieResult !== updateHoodieResult
    ) {
      swal("Sukses", updateHoodieResult, "success");
      this.props.history.push("/admin/hoodie");
    }
    if (
      getDetailHoodieResult &&
      prevProps.getDetailHoodieResult !== getDetailHoodieResult
    ) {
      this.setState({
        image1: getDetailHoodieResult.gambar[0],
        image2: getDetailHoodieResult.gambar[1],
        imageLama1: getDetailHoodieResult.gambar[0],
        imageLama2: getDetailHoodieResult.gambar[1],
        nama: getDetailHoodieResult.nama,
        deskripsi: getDetailHoodieResult.deskripsi,
        cathoodies: getDetailHoodieResult.cathoodies,
        harga: getDetailHoodieResult.harga,
        berat: getDetailHoodieResult.berat,
        jenis: getDetailHoodieResult.jenis,
        ready: getDetailHoodieResult.ready,
        stok: getDetailHoodieResult.stok,
        ukuranSelected: getDetailHoodieResult.ukuran,
      });
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleCheck = (event) => {
    const checked = event.target.checked;
    const value = event.target.value;

    if (checked) {
      //jika user admin ceklist ukuran
      //isi state array ukuranSelected
      this.setState({
        ukuranSelected: [...this.state.ukuranSelected, value],
      });
    } else {
      //jika user menghapus ceklist ukuran
      const ukuranBaru = this.state.ukuranSelected
        .filter((ukuran) => ukuran !== value)
        .map((filterUkuran) => {
          return filterUkuran;
        });

      this.setState({
        ukuranSelected: ukuranBaru,
      });
    }
  };

  handleImage = (event, imageToDB) => {
    if (event.target.files && event.target.files[0]) {
      const gambar = event.target.files[0];
      this.setState({
        [event.target.name]: URL.createObjectURL(gambar),
      });

      this.props.dispatch(uploadHoodie(gambar, imageToDB));
    }
  };

  handleSubmit = (event) => {
    const {
      nama,
      deskripsi,
      harga,
      jenis,
      stok,
      berat,
      ukuranSelected,
      cathoodies,
    } = this.state;

    event.preventDefault();

    if (
      nama &&
      deskripsi &&
      harga &&
      jenis &&
      stok &&
      berat &&
      ukuranSelected &&
      cathoodies
    ) {
      //actions tambah Hoodie
      this.props.dispatch(updateHoodie(this.state));
    } else {
      swal("Failed", "Maaf semua form wajib diisi", "error");
    }
  };

  editUkuran = () => {
    this.setState({
      editUkuran: true,
      ukuranSelected: [],
    });
  };

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
      ready,
      cathoodies,
      ukuranSelected,
      editUkuran,
      imageLama1,
      imageLama2,
    } = this.state;

    const { getListCatHoodieResult, updateHoodieLoading } = this.props;

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
              <CardHeader tag="h4">Edit Hoodie</CardHeader>
              <CardBody>
                <form onSubmit={(event) => this.handleSubmit(event)}>
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
                            <Input
                              type="file"
                              name="image1"
                              onChange={(event) =>
                                this.handleImage(event, "imageToDB1")
                              }
                            />
                          </FormGroup>
                          {image1 !== imageLama1 ? (
                            //selesai upload / proses upload
                            imageToDB1 ? (
                              <p>
                                <i className="nc-icon nc-check-2"></i> Selesai
                                Upload
                              </p>
                            ) : (
                              <p>
                                <i className="nc-icon nc-user-run"></i> Proses
                                Upload
                              </p>
                            )
                          ) : (
                            //belum upload
                            <p>
                              <i className="nc-icon nc-cloud-upload-94"></i>{" "}
                              Belum Upload
                            </p>
                          )}
                        </Col>
                        <Col>
                          <img
                            src={image2}
                            width="300"
                            alt="Foto Hoodie Detail"
                          />
                          <FormGroup>
                            <label>Foto Hoodie Detail</label>
                            <Input
                              type="file"
                              name="image2"
                              onChange={(event) =>
                                this.handleImage(event, "imageToDB2")
                              }
                            />
                          </FormGroup>
                          {image2 !== imageLama2 ? (
                            //selesai upload / proses upload
                            imageToDB2 ? (
                              <p>
                                <i className="nc-icon nc-check-2"></i> Selesai
                                Upload
                              </p>
                            ) : (
                              <p>
                                <i className="nc-icon nc-user-run"></i> Proses
                                Upload
                              </p>
                            )
                          ) : (
                            //belum upload
                            <p>
                              <i className="nc-icon nc-cloud-upload-94"></i>{" "}
                              Belum Upload
                            </p>
                          )}
                        </Col>
                      </Row>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <label>Nama Hoodie</label>
                        <Input
                          type="text"
                          value={nama}
                          name="nama"
                          onChange={(event) => this.handleChange(event)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <label>Deskripsi</label>
                        <Input
                          type="textarea"
                          value={deskripsi}
                          name="deskripsi"
                          onChange={(event) => this.handleChange(event)}
                        />
                      </FormGroup>
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <label>Category Hoodie</label>
                            <Input
                              type="select"
                              name="cathoodies"
                              value={cathoodies}
                              onChange={(event) => this.handleChange(event)}
                            >
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
                            <label>Harga (Rp.)</label>
                            <Input
                              type="number"
                              value={harga}
                              name="harga"
                              onChange={(event) => this.handleChange(event)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <label>Berat (Kg)</label>
                            <Input
                              type="number"
                              value={berat}
                              name="berat"
                              onChange={(event) => this.handleChange(event)}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <label>Jenis</label>
                            <Input
                              type="text"
                              value={jenis}
                              name="jenis"
                              onChange={(event) => this.handleChange(event)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <label>Ready</label>
                            <Input
                              type="select"
                              value={ready}
                              name="ready"
                              onChange={(event) => this.handleChange(event)}
                            >
                              <option value={true}>Ada</option>
                              <option value={false}>Kosong</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <label>Stok</label>
                            <Input
                              type="number"
                              value={stok}
                              name="stok"
                              onChange={(event) => this.handleChange(event)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <label>
                        Ukuran yang tersedia sekarang : (
                        {ukuranSelected.map((item, index) => (
                          <strong key={index}> {item} </strong>
                        ))}
                        )
                      </label>
                      {editUkuran ? (
                        <>
                          <FormGroup check>
                            {ukurans.map((ukuran, index) => (
                              <Label key={index} check className="mr-2">
                                <Input
                                  type="checkbox"
                                  value={ukuran}
                                  onChange={(event) => this.handleCheck(event)}
                                />
                                {ukuran}
                                <span className="form-check-sign">
                                  <span className="check"></span>
                                </span>
                              </Label>
                            ))}
                          </FormGroup>
                          <Button
                            color="primary"
                            size="sm"
                            onClick={() => this.setState({ editUkuran: false })}
                          >
                            Selesai Edit Ukuran
                          </Button>
                        </>
                      ) : (
                        <Button
                          color="primary"
                          size="sm"
                          onClick={() => this.editUkuran()}
                        >
                          Edit Ukuran
                        </Button>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {updateHoodieLoading ? (
                        <Button
                          type="submit"
                          color="primary"
                          className="float-right"
                          disabled
                        >
                          <Spinner size="sm" color="light" /> Loading . . .
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          color="primary"
                          className="float-right"
                        >
                          Submit
                        </Button>
                      )}
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

  getDetailHoodieLoading: state.HoodieReducer.getDetailHoodieLoading,
  getDetailHoodieResult: state.HoodieReducer.getDetailHoodieResult,
  getDetailHoodieError: state.HoodieReducer.getDetailHoodieError,

  uploadHoodieLoading: state.HoodieReducer.uploadHoodieLoading,
  uploadHoodieResult: state.HoodieReducer.uploadHoodieResult,
  uploadHoodieError: state.HoodieReducer.uploadHoodieError,

  updateHoodieLoading: state.HoodieReducer.updateHoodieLoading,
  updateHoodieResult: state.HoodieReducer.updateHoodieResult,
  updateHoodieError: state.HoodieReducer.updateHoodieError,
});

export default connect(mapStateToProps, null)(EditHoodie);
