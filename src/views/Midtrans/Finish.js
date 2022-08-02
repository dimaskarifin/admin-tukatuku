import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Spinner,
} from "reactstrap";
import logo from "logo.svg";
import { connect } from "react-redux";
import { updatePesanan } from "actions/PesananAction";

class Finish extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order_id: "",
      transaction_status: "",
    };
  }

  componentDidMount() {
    let search = window.location.search;
    let params = new URLSearchParams(search);

    const order_id = params.get("order_id");
    const transaction_status = params.get("transaction_status");

    if (order_id) {
      this.setState({
        order_id: order_id,
        transaction_status: transaction_status,
      });
      //masuk ke action update status history
      this.props.dispatch(updatePesanan(order_id, transaction_status));
    }
  }

  toHistory = () => {
    window.ReactNativeWebView.postMessage("Selesai");
  };

  render() {
    const { order_id, transaction_status } = this.state;
    const { updatePesananLoading } = this.props;

    return (
      <Row className="justify-content-center mt-5">
        {updatePesananLoading ? (
          <Spinner color="primary" />
        ) : (
          <Col md="4" className="mt-5">
            <Card>
              <img
                src={logo}
                alt="react-logo"
                width="150"
                className="mx-auto d-block"
              />
              <CardHeader tag="h4" className="text-center">
                <p>
                  {transaction_status === "pending"
                    ? "Transaksi Belum Selesai"
                    : "Terima Kasih, Transaksi Anda Berhasil"}
                </p>
              </CardHeader>
              <CardBody className="text-center">
                <p>
                  {transaction_status === "pending" &&
                    "Untuk Selanjutnya Harap Selesai kan Pembayaran nya jika belum bayar, dan Silahkan Update Status Pembayaran di Halaman History"}
                </p>

                <p>ORDER ID : {order_id}</p>

                <p>
                  STATUS TRANSAKSI :{" "}
                  {transaction_status === "settlement" ||
                  transaction_status === "capture"
                    ? "Lunas"
                    : transaction_status}
                </p>

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
        )}
      </Row>
    );
  }
}
export default connect()(Finish);
