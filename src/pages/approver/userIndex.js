import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { getUsers } from "../../services/userService";
import SpinDiv from "../../components/SpinDiv";

import { Pagination } from "antd";

const UserIndex = () => {
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoading(true);
    getUsers({ page, rows }).then(
      (res) => {
        setUsers(res.users.data);
        setPage(res.users.current_page);
        setTotal(res.users.total);
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

  return (
    <div>
      {loading && <SpinDiv />}
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <Row style={{}}></Row>
              <Row>
                <Col lg="8">
                  <h4 className="card-title">
                    Users{" "}
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
                      <th>Name </th>
                      <th>Email </th>
                      <th>Role </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td style={{ textTransform: "capitalize" }}>
                          {user.name}{" "}
                        </td>
                        <td>{user.email} </td>
                        <td>{user.role} </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Row>
                  <Col md={12} style={{ fontWeight: "bold", paddingTop: 3 }}>
                    {users.length > 0 && (
                      <Pagination
                        total={total}
                        showTotal={(total) => `Total ${total} users`}
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

export default UserIndex;
