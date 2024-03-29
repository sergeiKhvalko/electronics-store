import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../cards/ShowPaymentInfo";


const Orders = ({ orders, handleStatusChange }) => {
	const showOrderInTable = (order) => (
		<table className="table table-bordered">
			<thead className="thead-light">
				<tr>
					<th scope="col">Title</th>
					<th scope="col">Price</th>
					<th scope="col">Brand</th>
					<th scope="col">Color</th>
					<th scope="col">Count</th>
					<th scope="col">Shipping</th>
				</tr>
			</thead>

			<tbody>
				{order.products.map((p, i) => (
					<tr key={i}>
						<td>
							<b>{p.product.title}</b>
						</td>
						<td>{p.product.price}</td>
						<td>{p.product.brand}</td>
						<td>{p.color}</td>
						<td>{p.count}</td>
						<td>
							{p.product.shipping === "Yes" ? (
								<CheckCircleOutlined style={{ color: "green" }} />
							) : (
								<CloseCircleOutlined style={{ color: "red" }} />
							)}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)

	return (
		<>
			{orders.map((order) => (
				<div key={order._id} className="row p-4">
					<div className="btn btn-block p-4 m-0 bg-light">
						<ShowPaymentInfo order={order} showStatus={true} />

						<div className="row">
							<div className="col-md-4">Delivery status</div>
							<div className="col-md-8">
								<select
									style={{cursor: "pointer"}}
									className="form-control"
									name="status"
									defaultValue={order.orderStatus}
									onChange={(e) => handleStatusChange(order._id, e.target.value)}
								>
									<option value="Not Processed">Not Processed</option>
									<option value="Cash On Delivery">Cash On Delivery</option>
									<option value="Processing">Processing</option>
									<option value="Dispatched">Dispatched</option>
									<option value="Cancelled">Cancelled</option>
									<option value="Completed">Completed</option>
								</select>
							</div>
						</div>
					</div>

					{showOrderInTable(order)}
				</div>
			))}
		</>
	)
}

export default Orders;