import { tambahCatHoodie } from "actions/CatHoodieAction";
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
  FormGroup,
  Input,
  Row,
  Spinner,
} from "reactstrap";
import swal from "sweetalert";
import DefaultImage from "../../assets/img/default-image.jpg";

class TambahCatHoodie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: DefaultImage,
      imageToDB: false,
      catHoodie: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      const gambar = event.target.files[0];
      this.setState({
        image: URL.createObjectURL(gambar),
        imageToDB: gambar,
      });
    }
  };

  handleSubmit = (event) => {
    const { imageToDB, catHoodie } = this.state;
    event.preventDefault();
    if (imageToDB && catHoodie) {
      //proses ke actions untuk tambah data ke firebase
      this.props.dispatch(tambahCatHoodie(this.state));
    } else {
      swal(
        "Failed!",
        "Maaf Nama Category Hoodie dan Logo Category Product harus diisi",
        "error"
      );
    }
  };

  componentDidUpdate(prevProps) {
    const { tambahCatHoodieResult } = this.props;

    if (
      tambahCatHoodieResult &&
      prevProps.tambahCatHoodieResult !== tambahCatHoodieResult
    ) {
      swal("Sukses", "Category Hoodie Berhasil Dibuat", "success");
      this.props.history.push("/admin/category-hoodie");
    }
  }

  render() {
    const { image, catHoodie } = this.state;
    const { tambahCatHoodieLoading } = this.props;
    return (
      <div className="content">
        <Row>
          <Col>
            <Link to="/admin/category-hoodie" className="btn btn-primary">
              Kembali
            </Link>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Tambah Category Product</CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <img src={image} width="200" alt="Logo Category Product" />
                  </Col>
                </Row>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <label>Logo Category Product</label>
                        <Input
                          type="file"
                          onChange={(event) => this.handleImage(event)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <label>Nama Category Product</label>
                        <Input
                          type="text"
                          value={catHoodie}
                          name="catHoodie"
                          onChange={(event) => this.handleChange(event)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {tambahCatHoodieLoading ? (
                        <Button color="primary" type="submit" disabled>
                          <Spinner size="sm" color="light" /> Loading
                        </Button>
                      ) : (
                        <Button color="primary" type="submit">
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
  tambahCatHoodieLoading: state.CatHoodieReducer.tambahCatHoodieLoading,
  tambahCatHoodieResult: state.CatHoodieReducer.tambahCatHoodieResult,
  tambahCatHoodieError: state.CatHoodieReducer.tambahCatHoodieError,
});

export default connect(mapStateToProps, null)(TambahCatHoodie);
