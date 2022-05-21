import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu } from "antd";
import {
  HomeOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const Header = () => {
  const history = useNavigate();
  const [current, setCurrent] = useState("home");

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = async () => {
    await signOut(auth);

    dispatch({
      type: "LOGOUT",
      payload: null,
    });

    history("/login");
  };

  const items = [
    {
      label: <Link to="/">Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
		className: "mr-auto",
    },
    user && {
      label: `${user.email && user.email.split('@')[0]}`,
      key: "SubMenu",
      icon: <SettingOutlined />,
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
            {
              label: "Logout",
              icon: <LogoutOutlined />,
              onClick: logout,
            },
          ],
        },
      ],
    },
    !user && {
      label: <Link to="/register">Register</Link>,
      key: "register",
      icon: <UserAddOutlined />,
    },
    !user && {
      label: <Link to="/login">Login</Link>,
      key: "login",
      icon: <UserOutlined />,
    },
  ];

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
