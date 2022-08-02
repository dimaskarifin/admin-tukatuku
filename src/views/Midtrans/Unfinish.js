import React, { Component } from "react";
import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import logo from "logo.svg";
import { connect } from "react-redux";

class Unfinish extends Component {
  toHistory = () => {
    window.ReactNativeWebView.postMessage("Selesai");
  };
  render() {
    let search = window.location.search;
    let params = new URLSearchParams(search);

    const order_id = params.get("order_id");
    const transaction_status = params.get("transaction_status");

    return (
      <div>
        <Row className="justify-content-center mt-5">
          <Col md="4" className="mt-5">
            <Card>
              <img
                src={logo}
                alt="react-logo"
                width="150"
                className="mx-auto d-block"
              />
              <CardHeader tag="h4" className="text-center">
                Maaf transaksi anda belum selesai, silahkan selesaikan di
                halaman History
              </CardHeader>
              <CardBody className="text-center">
                <p>ORDER ID : {order_id}</p>

                <p>STATUS TRANSAKSI : {transaction_status}</p>

                <Button
                  color="primary"
                  type="submit"
                  onClick={() => this.toHistory()}
                >
                  Lanjutkan
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
export default connect()(Unfinish);
