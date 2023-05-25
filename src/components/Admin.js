import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserSwitchOutlined,
  RadiusSettingOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";

import {
  Navigate,
  useNavigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useState } from "react";
import TaskIndex from "../pages/approver/TaskIndex";
import UserIndex from "../pages/approver/userIndex";

const { Header, Sider, Content } = Layout;

const Admin = () => {
  let navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
                navigate("/");
              },
            },
            {
              key: "2",
              icon: <UserSwitchOutlined />,
              label: "Users",
              onClick: () => {
                navigate("/users");
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
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
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
            <Route exact path="/" element={<TaskIndex />} />
            <Route exact path="/users" element={<UserIndex />} />
            {user !== null && (
              <Route path="/auth/login" element={<Navigate to="/" />} />
            )}
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Admin;
