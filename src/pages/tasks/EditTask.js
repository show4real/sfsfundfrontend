import React, { useState } from "react";
import { Modal } from "reactstrap";
import { Col, Row, Form } from "react-bootstrap";
import { editTask } from "../../services/taskService";
import { Button } from "antd";

const EditTask = ({ task, toggle, saved }) => {
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(task.completed == 1 ? true : false);
  const [fields, setFields] = useState({
    title: task.title,
  });
  const [errors, setErrors] = useState({
    title: "",
  });

  const validate = (name, value) => {
    switch (name) {
      case "title":
        if (!value) {
          return "Task title is Required";
        } else {
          return "";
        }
      default: {
        return "";
      }
    }
  };

  const handleTaskInput = (e) => {
    setErrors({
      ...errors,
      [e.target.name]: validate(e.target.name, e.target.value),
    });
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });
  };

  const handleStatus = (e, state) => {
    setStatus(e);
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

    if (fields.title) {
      const data = {
        title: fields.title,
      };

      const completed = status === true ? 1 : 0;

      setSaving(true);

      editTask({
        title: data.title,
        completed,
        id: task.id,
      })
        .then(() => {
          setFields({
            title: "",
          });
          setErrors({
            title: "",
          });
          setSaving(false);
          toggle();
          saved();
        })
        .catch((err) => {
          setErrors({ err });
        });
    }
  };

  return (
    <Modal
      className="modal-dialog modal-dialog-centered"
      isOpen={task != null}
      toggle={() => !saving && toggle}
      style={{ maxWidth: 700, paddingLeft: 100 }}
    >
      <div className="col-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <button
              aria-label="Close"
              className="btn btn-outline-dark btn-sm"
              data-dismiss="modal"
              type="button"
              onClick={toggle}
              style={{ float: "right" }}
            >
              <span aria-hidden={true}>×</span>
            </button>
            <h4 className="card-title">Edit Task</h4>

            <p className="card-description"> </p>
            <form className="forms-sample">
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <label>Task title</label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      placeholder="Task title"
                      name="title"
                      value={fields.title}
                      onChange={handleTaskInput}
                      style={{ paddingTop: 10 }}
                    />
                    <div>
                      <span
                        style={{
                          paddingTop: 10,
                          fontSize: 12,
                          fontWeight: "bold",
                        }}
                        className="text-danger"
                      >
                        {errors.title}
                      </span>
                    </div>
                  </Form.Group>
                </Col>
              </Row>

              <Row style={{ paddingTop: 10 }}>
                <Col md={6}>
                  <div className="form-check">
                    <label
                      style={{ paddingLeft: 5 }}
                      className="form-check-label"
                    >
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={status}
                        onChange={(e) =>
                          handleStatus(e.target.checked, "status")
                        }
                      />
                      <i className="input-helper"></i>
                      Completed
                    </label>
                  </div>
                </Col>
              </Row>

              <div style={{ float: "right" }}>
                <Button
                  className="btn btn-outline-dark btn-sm"
                  type="submit"
                  loading={saving}
                  onClick={handleSubmit}
                >
                  Save
                </Button>

                <button
                  onClick={toggle}
                  className="btn btn-outline-dark btn-sm"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditTask;
