import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Card,
  Row,
  Col,
  Form,
  Spinner,
  Button,
  InputGroup,
} from "react-bootstrap";
import { login } from "../services/authService";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Login = () => {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const MySwal = withReactContent(Swal);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const isValid = () => {
    const testemail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (password !== null && password !== "" && testemail.test(email.trim())) {
      return true;
    }
    return false;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    login({ email, password })
      .then(() => {
        setLoading(false);
        window.location.reload();
        history.push("/");
      })
      .catch((error) => {
        setLoading(false);
        setPassword("");
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: "Unauthorized user!",
        });
      });
  };

  return (
    <div>
      <Container>
        <Row style={{ marginTop: 100 }}>
          <Col md={3}></Col>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: 30,
                  }}
                >
                  Login
                </Card.Title>
                <Form className="pt-3">
                  <Form.Group className="d-flex search-field">
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      size="lg"
                      className="h-auto"
                      value={email}
                      onChange={onChangeEmail}
                    />
                  </Form.Group>
                  <Form.Group
                    className="d-flex search-field"
                    style={{ paddingTop: 20 }}
                  >
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon
                          icon={show ? faEyeSlash : faEye}
                          style={{ fontSize: 12, cursor: "pointer" }}
                          onClick={() => setShow(!show)}
                        />
                      </InputGroup.Text>
                      <Form.Control
                        required
                        size="lg"
                        type={show ? "text" : "password"}
                        value={password}
                        onChange={onChangePassword}
                        placeholder="Password"
                      />
                    </InputGroup>
                  </Form.Group>
                  <div className="mt-3">
                    <Button
                      disabled={!isValid() || loading}
                      type="submit"
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      onClick={onSubmit}
                    >
                      {loading ? (
                        <Spinner animation="grow" variant="light blue" />
                      ) : (
                        <span>Sign in</span>
                      )}
                    </Button>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Don't have an account?{" "}
                    <Link to="/auth/register" className="text-primary">
                      Sign up
                    </Link>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}></Col>
        </Row>
      </Container>
    </div>
  );
};
export default Login;
