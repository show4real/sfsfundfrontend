import React, { useState } from "react";
import { Navigate, useNavigate, Routes, Route } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RadiusSettingOutlined,
} from "@ant-design/icons";
import { theme } from "antd";
import TaskIndex from "../pages/tasks/TaskIndex";

const { Header, Sider, Content } = Layout;

const Staff = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("user");
    navigate("/auth/login");
    window.location.reload();
  };

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <RadiusSettingOutlined />,
              label: "Tasks",
              onClick: () => {
                navigate("/Tasks");
              },
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            height: "auto",
          }}
        >
          <button
            type="button"
            className="btn btn-link text-primary"
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </button>

          <div style={{ float: "right", paddingRight: 20, paddingTop: 10 }}>
            <h6 style={{ fontSize: 15 }}>{user.name}</h6>
            <h6 style={{ fontSize: 10 }}>{user.role}</h6>
            <button onClick={logOut} className="btn btn-primary">
              logout
            </button>
          </div>
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Routes>
            <Route path="/" element={<TaskIndex />} />
            {user !== null && (
              <Route path="/auth/login" element={<Navigate to="/" />} />
            )}
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Staff;
