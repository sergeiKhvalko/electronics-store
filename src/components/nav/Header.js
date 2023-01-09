import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Badge } from "antd";
import {
  HomeOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
	ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import Search from "../forms/Search";

const Header = () => {
	const [current, setCurrent] = useState("home");
	
  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => ({ ...state }));

  const navigate = useNavigate();

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = async () => {
    await signOut(auth);

    dispatch({
      type: "LOGOUT",
      payload: null,
    });

    navigate("/login");
  };

  const items = [
    {
      label: <Link to="/">Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to="/shop">Shop</Link>,
      key: "shop",
      icon: <ShoppingOutlined />,
    },
    {
      label: <Link to="/cart">
							<Badge count={cart.length} offset={[9, 0]}>
								Cart
							</Badge>
						</Link>,
      key: "cart",
      icon: <ShoppingCartOutlined />,
      className: "mr-auto",
    },
		{
			label: <div><Search/></div>,
			// className: "p-1"
		},
    user && {
      label: `${user.email && user.email.split("@")[0]}`,
      key: "SubMenu",
      icon: <SettingOutlined />,
      children: [
        {
          type: "group",
          children: [
            user.role === "subscriber" && {
              label: <Link to="/user/history">Dashboard</Link>,
              key: "setting:1",
            },
            user.role === "admin" && {
              label: <Link to="/admin/dashboard">Dashboard</Link>,
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
		<header style={{flex: "0 0 auto"}}>
			<Menu
				onClick={handleClick}
				selectedKeys={[current]}
				mode="horizontal"
				items={items}
			/>
		</header>
  );
};

export default Header;
