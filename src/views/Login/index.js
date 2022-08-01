import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Row,
  Spinner,
} from "reactstrap";
import logo from "logo.svg";
import { loginUser } from "actions/AuthAction";
import swal from "sweetalert";
import { checkLogin } from "actions/AuthAction";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  componentDidMount() {
    this.props.dispatch(checkLogin(this.props.history));
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    const { email, password } = this.state;
    event.preventDefault();

    if (email && password) {
      //Action Login
      this.props.dispatch(loginUser(email, password));
    } else {
      swal("Failed", "Maaf Email dan Password Harus Diisi", "error");
    }
  };

  componentDidUpdate(prevProps) {
    const { loginResult, checkLoginResult } = this.props;

    if (checkLoginResult && prevProps.checkLoginResult !== checkLoginResult) {
      this.props.history.push("/admin/dashboard");
    }

    if (loginResult && prevProps.loginResult !== loginResult) {
      this.props.history.push("/admin/dashboard");
    }
  }

  render() {
    const { email, password } = this.state;
    const { loginLoading } = this.props;
    return (
      <div className="content">
        <Row className="justify-content-center mt-5">
          <Col md="4" className="mt-5">
            <Card>
              <img
                src={logo}
                alt="react-logo"
                width="150"
                className="mx-auto d-block"
              />
              <CardHeader tag="h4">Login</CardHeader>
              <CardBody>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                  <FormGroup>
                    <label for="email">Email Address</label>
                    <Input
                      type="email"
                      name="email"
                      value={email}
                      placeholder="Masukkan Email"
                      onChange={(event) => this.handleChange(event)}
                    />
                  </FormGroup>

                  <FormGroup>
                    <label for="password">Password</label>
                    <Input
                      type="password"
                      name="password"
                      value={password}
                      placeholder="Masukkan Password"
                      onChange={(event) => this.handleChange(event)}
                    />
                  </FormGroup>

                  {loginLoading ? (
                    <Button color="primary" type="submit" disabled>
                      <Spinner size="sm" color="light" /> Loading
                    </Button>
                  ) : (
                    <Button color="primary" type="submi">
                      Login
                    </Button>
                  )}
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
  loginLoading: state.AuthReducer.loginLoading,
  loginResult: state.AuthReducer.loginResult,
  loginError: state.AuthReducer.loginError,

  checkLoginResult: state.AuthReducer.checkLoginResult,
});

export default connect(mapStateToProps, null)(Login);
