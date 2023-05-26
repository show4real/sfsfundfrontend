import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { register } from "../services/authService";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Button, Card } from "react-bootstrap";
import { getDepartment } from "../services/departmentService";

const Register = ({ alert }) => {
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [err, setErr] = useState("");
  const [fields, setFields] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    department: "",
    password: "",
    confirmPassword: "",
  });
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getDepartment().then(
      (res) => {
        setDepartments(res.departments);
      },
      (error) => {}
    );
  };

  const handleApprove = (e, state) => {
    setStatus(e);
  };

  const validate = (name, value) => {
    switch (name) {
      case "name":
        if (!value || value.trim() === "") {
          return "name is Required";
        } else {
          return "";
        }
      case "department":
        if (!value || value.trim() === "") {
          return "department is Required";
        } else {
          return "";
        }

      case "email":
        if (!value) {
          return "Email is Required";
        } else if (
          !value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
        ) {
          return "Enter a valid email address";
        } else {
          return "";
        }
      case "password":
        if (!value) {
          return "Password is Required";
        } else if (value.length < 8 || value.length > 15) {
          return "Please fill at least 8 character";
        } else {
          return "";
        }
      case "confirmPassword":
        if (!value) {
          return "Confirm Password Required";
        } else if (value !== fields.password) {
          return "New Password and Confirm Password Must be Same";
        } else {
          return "";
        }
      default: {
        return "";
      }
    }
  };

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validate(name, value),
    }));
    setFields((prevFields) => ({ ...prevFields, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};
    Object.keys(fields).forEach((name) => {
      const error = validate(name, fields[name]);
      if (error && error.length > 0) {
        validationErrors[name] = error;
      }
    });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (fields.name && fields.email && fields.password) {
      const data = {
        name: fields.name,
        department_id: fields.department,
        email: fields.email,
        password: fields.password,
      };
      const { name, email, password, department_id } = data;
      const approver = status === true ? 1 : 0;

      setSaving(true);
      register({ name, email, password, department_id, approver })
        .then((response) => {
          if (response.user) {
            setFields({
              name: "",
              department: "",
              email: "",
              password: "",
              confirmPassword: "",
            });
            setErr({ email: "" });
            MySwal.fire({
              icon: "success",
              title: "Congrat..",
              text: "Registration successful!",
            });
            setSaving(false);
          } else {
            setSaving(false);
            MySwal.fire({
              icon: "error",
              title: "Invalid Credentials",
              text: "Registration Failed!",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          setErr(err);
          setSaving(false);
        });
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div
              className="auth-form-light text-left py-5 px-4 px-sm-5"
              style={{
                backgroundColor: "#f8f9fa",
                borderRadius: "5px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h4>New here?</h4>
              <h6 className="font-weight-light">Sign up</h6>
              <form className="pt-3">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="First Name"
                    name="name"
                    value={fields.name}
                    onChange={handleUserInput}
                  />
                  <div>
                    <span className="text-danger">{errors.name}</span>
                  </div>
                </div>
                <div className="form-group" style={{ paddingTop: 10 }}>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    value={fields.email}
                    name="email"
                    onChange={handleUserInput}
                  />
                  <div>
                    <span className="text-danger">{errors.email}</span>
                    {err.email !== "" && (
                      <span className="text-danger">{err.email}</span>
                    )}
                  </div>
                </div>
                <div className="form-group" style={{ paddingTop: 10 }}>
                  <select
                    className="form-control"
                    name="department"
                    value={fields.department}
                    onChange={handleUserInput}
                  >
                    <option value="">Choose Department</option>
                    {departments.map((department) => (
                      <option value={department.id}>{department.name}</option>
                    ))}
                  </select>
                  <div>
                    <span className="text-danger">{errors.department}</span>
                  </div>
                </div>
                <div className="form-group" style={{ paddingTop: 15 }}>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    name="password"
                    placeholder="Password"
                    value={fields.password}
                    onChange={handleUserInput}
                  />
                  <div>
                    <span className="text-danger">{errors.password}</span>
                  </div>
                </div>
                <div className="form-group" style={{ paddingTop: 15 }}>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control form-control-lg"
                    placeholder="Confirm Password"
                    value={fields.confirmPassword}
                    onChange={handleUserInput}
                  />
                  <div>
                    <span className="text-danger">
                      {errors.confirmPassword}
                    </span>
                  </div>
                </div>
                <div className="form-check" style={{ paddingTop: 15 }}>
                  <label
                    style={{ paddingLeft: 5 }}
                    className="form-check-label"
                  >
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={status}
                      onChange={(e) =>
                        handleApprove(e.target.checked, "status")
                      }
                    />
                    <i className="input-helper"></i>
                    Approver
                  </label>
                </div>
                <div className="mt-3">
                  <Button type="submit" onClick={handleSubmit} loading={saving}>
                    {saving ? (
                      <Spinner animation="grow" variant="light blue" />
                    ) : (
                      <span>Sign up</span>
                    )}
                  </Button>
                </div>
                <div className="text-center mt-4 font-weight-light">
                  Already have an account?{" "}
                  <Link to="/auth/login" className="text-primary">
                    Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
