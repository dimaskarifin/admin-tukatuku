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
  Table,
} from "reactstrap";
import swal from "sweetalert";
import DefaultImage from "../../assets/img/default-image.jpg";
import { updateCatHoodie, getDetailCatHoodie } from "actions/CatHoodieAction";

class EditCatHoodie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      imageLama: DefaultImage,
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
    const { catHoodie } = this.state;
    event.preventDefault();
    if (catHoodie) {
      //proses ke actions untuk tambah data ke firebase
      this.props.dispatch(updateCatHoodie(this.state));
    } else {
      swal("Failed!", "Maaf Nama Category Hoodie harus diisi", "error");
    }
  };

  componentDidMount() {
    this.props.dispatch(getDetailCatHoodie(this.props.match.params.id));
  }

  componentDidUpdate(prevProps) {
    const { updateCatHoodieResult, getDetailCatHoodieResult } = this.props;

    if (
      updateCatHoodieResult &&
      prevProps.updateCatHoodieResult !== updateCatHoodieResult
    ) {
      swal("Sukses", "Berhasil Update Category Hoodie", "success");
      this.props.history.push("/admin/category-hoodie");
    }
    if (
      getDetailCatHoodieResult &&
      prevProps.getDetailCatHoodieResult !== getDetailCatHoodieResult
    ) {
      this.setState({
        image: getDetailCatHoodieResult.image,
        catHoodie: getDetailCatHoodieResult.catHoodie,
        imageLama: getDetailCatHoodieResult.image,
      });
    }
  }

  render() {
    const { image, catHoodie } = this.state;
    const { updateCatHoodieLoading } = this.props;
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
                <CardTitle tag="h4">Edit Category Hoodie</CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <img src={image} width="200" alt="Logo Category Hoodie" />
                  </Col>
                </Row>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <label>Logo Category Hoodie</label>
                        <Input
                          type="file"
                          onChange={(event) => this.handleImage(event)}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <label>Nama Category Hoodie</label>
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
                      {updateCatHoodieLoading ? (
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
  updateCatHoodieLoading: state.CatHoodieReducer.updateCatHoodieLoading,
  updateCatHoodieResult: state.CatHoodieReducer.updateCatHoodieResult,
  updateCatHoodieError: state.CatHoodieReducer.updateCatHoodieError,

  getDetailCatHoodieLoading: state.CatHoodieReducer.getDetailCatHoodieLoading,
  getDetailCatHoodieResult: state.CatHoodieReducer.getDetailCatHoodieResult,
  getDetailCatHoodieError: state.CatHoodieReducer.getDetailCatHoodieError,
});

export default connect(mapStateToProps, null)(EditCatHoodie);
