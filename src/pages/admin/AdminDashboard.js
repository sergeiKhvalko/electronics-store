import { WithAdminDashboard } from "../../hoc/WithAdminDashboard";
import AdminNav from "../../components/nav/AdminNav";
import Orders from "../../components/order/Orders";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { changeStatus, getOrders } from "../../functions/admin";
import { toast } from "react-toastify";


const AdminDashboard = () => {
	const [orders, setOrders] = useState([
		{
			_id: 1, 
			orderStatus: "Cash On Delivery",
			products: [
				{
					product: {title: "iphone", price: 1000, brand: "apple", shipping: "Yes"},
					color: "black",
					count: 5, 
				}
			],
			paymentIntent: {
				id: 1,
				amount: 10,
				currency: "usd",
				payment_method_types: ["processing"],
				status: "status",
				created: 1111111111
			}
		},
		{
			_id: 2, 
			orderStatus: "Not Processed",
			products: [
				{
					product: {title: "laptop", price: 11000, brand: "apple",},
					color: "white",
					count: 15, 
				}
			],
			paymentIntent: {
				id: 2,
				amount: 10,
				currency: "usd",
				payment_method_types: ["processing"],
				status: "status",
				created: 1111111111
			}
		},
		{
			_id: 3, 
			orderStatus: "processing",
			products: [
				{
					product: {title: "iphone", price: 100, brand: "apple",},
					color: "green",
					count: 50, 
				}
			],
			paymentIntent: {
				id: 3,
				amount: 10,
				currency: "usd",
				payment_method_types: ["processing"],
				status: "status",
				created: 1111111111
			}
		},
	]);
	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		// loadOrders();
	}, []);

	const loadOrders = () => {
		getOrders(user.token)
			.then((res) => {
				setOrders(res.data)
			})
	}

	const handleStatusChange = (orderId, orderStatus) => {
		changeStatus(orderId, orderStatus, user.token)
			.then((res) => {
				toast.success("Status updated");
				loadOrders();
			})
	}

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
					<h4>Admin Dashboard</h4>
					<Orders orders={orders} handleStatusChange={handleStatusChange} />
				</div>
      </div>
    </div>
  );
};

export default WithAdminDashboard(AdminDashboard);
