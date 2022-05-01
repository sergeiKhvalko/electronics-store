import { useState } from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const items = [
  {
    label: <Link to="/">Home</Link>,
    key: "home",
    icon: <HomeOutlined />,
  },
  {
    label: "Username",
    key: "SubMenu",
    icon: <SettingOutlined />,
    className: "mr-auto",
    children: [
      {
        type: "group",
        children: [
          {
            label: "Option 1",
            key: "setting:1",
          },
          {
            label: "Option 2",
            key: "setting:2",
          },
        ],
      },
    ],
  },
  {
    label: <Link to="/register">Register</Link>,
    key: "register",
    icon: <UserAddOutlined />,
  },
  {
    label: <Link to="/login">Login</Link>,
    key: "login",
    icon: <UserOutlined />,
  },
];

const Header = () => {
  const [current, setCurrent] = useState("home");

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Header;
