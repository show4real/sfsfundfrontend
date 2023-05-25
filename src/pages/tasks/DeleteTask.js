import React, { useState } from "react";
import { Button, Modal } from "reactstrap";

import { deleteTask } from "../../services/taskService";
import SpinDiv from "../../components/SpinDiv";

const DeleteTask = ({ task, toggle }) => {
  const [loading, setLoading] = useState(false);

  const onDelete = () => {
    setLoading(true);
    deleteTask(task.id)
      .then((res) => {
        setLoading(false);
        toggle();
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  return (
    <>
      <Modal
        className="modal-dialog-centered"
        isOpen={task != null}
        toggle={() => !loading && toggle}
        style={{ maxWidth: 600 }}
      >
        {loading && <SpinDiv text={"Deleting..."} />}
        <div className="modal-header" style={{ padding: "1rem" }}>
          <h3 className="modal-title" id="exampleModalLabel">
            Delete Task - {task.title}
          </h3>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={toggle}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body" style={{ border: "1px solid #eee" }}>
          Are you sure you want to delete this task? <br />
          <br />
          This action is irreversible and all data associated with this task
          will be lost permanently!
        </div>
        <div className="modal-footer" style={{ padding: "1rem" }}>
          <Button
            size="sm"
            color="secondary"
            data-dismiss="modal"
            type="button"
            disabled={loading}
            onClick={toggle}
          >
            Cancel
          </Button>
          <Button
            color="success"
            type="button"
            disabled={loading}
            size="sm"
            onClick={onDelete}
            style={{
              backgroundColor: "#EC3237",
              borderColor: "#EC3237",
              color: "#fff",
            }}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteTask;
