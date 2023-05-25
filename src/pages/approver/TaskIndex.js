import React, { useState, useEffect } from "react";
import { ProgressBar, Row, Col, ButtonGroup, Button } from "react-bootstrap";
import { getApproverTasks } from "../../services/taskService";
import SpinDiv from "../../components/SpinDiv";

import { Pagination } from "antd";
import EditTask from "./EditTask";

const TaskIndex = () => {
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoading(true);
    getApproverTasks({ page, rows }).then(
      (res) => {
        setTasks(res.tasks.data);
        setPage(res.tasks.current_page);
        setTotal(res.tasks.total);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  const onPage = async (page, rows) => {
    await setPage(page);
    await setRows(rows);
    await getData();
  };

  const toggleEdit = () => {
    setEditTask(!editTask);
    getData();
  };

  const toggleEditTask = (editTask) => {
    setEditTask(editTask);
    getData();
  };

  return (
    <div>
      {editTask && (
        <EditTask saved={getData} task={editTask} toggle={toggleEdit} />
      )}

      {loading && <SpinDiv />}
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <Row style={{}}></Row>
              <Row>
                <Col lg="8">
                  <h4 className="card-title">
                    Tasks{" "}
                    <span
                      style={{
                        color: "#aaa",
                        fontSize: 14,
                        fontWeight: "normal",
                      }}
                    >
                      {" "}
                      ({total})
                    </span>
                  </h4>
                </Col>
              </Row>

              <div className="table-responsive">
                <table className="table table-nowrap ">
                  <thead>
                    <tr>
                      <th> Task Name </th>
                      <th> Completed </th>

                      <th> Approved </th>

                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((task) => (
                      <tr key={task.id}>
                        <td style={{ textTransform: "capitalize" }}>
                          {task.title}{" "}
                        </td>
                        <td>
                          <ProgressBar
                            variant={task.completed == 1 ? "success" : "danger"}
                            now={100}
                          />
                        </td>

                        <td>
                          <ProgressBar
                            variant={task.approve == 1 ? "success" : "danger"}
                            now={100}
                          />
                        </td>

                        <td>
                          <ButtonGroup>
                            <Button
                              variant="outline-dark"
                              onClick={() => toggleEditTask(task)}
                              size="sm"
                            >
                              Edit
                            </Button>
                          </ButtonGroup>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Row>
                  <Col md={12} style={{ fontWeight: "bold", paddingTop: 3 }}>
                    {tasks.length > 0 && (
                      <Pagination
                        total={total}
                        showTotal={(total) => `Total ${total} tasks`}
                        onChange={onPage}
                        pageSize={rows}
                        current={page}
                      />
                    )}
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskIndex;
