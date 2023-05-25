import React, { useState } from "react";
import { Modal } from "reactstrap";
import { Col, Row, Form } from "react-bootstrap";
import { approveTask } from "../../services/taskService";
import { Button } from "antd";

const EditTask = ({ task, toggle, saved }) => {
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(task.approve == 1 ? true : false);
  const [fields, setFields] = useState({
    title: task.title,
  });
  const [errors, setErrors] = useState({
    title: "",
  });

  const handleStatus = (e, state) => {
    setStatus(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const approve = status === true ? 1 : 0;

    setSaving(true);

    approveTask({
      approve,
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
            <h5 className="card-title">Approve Task</h5>

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
                      disabled
                      style={{ paddingTop: 10 }}
                    />
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
                        checked={task.completed == 1}
                      />
                      <i className="input-helper"></i>
                      Completed
                    </label>
                  </div>
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
                      Approve
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
