import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userCart } from "../functions/user";
import ProductCartInCheckout from "../components/cards/ProductCartInCheckout";

const Cart = () => {
	const { cart, user } = useSelector((state) => ({ ...state }));
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const getTotal = () => {
		return cart.reduce((currentValue, nextValue) => {
			return currentValue + nextValue.count * nextValue.price;
		}, 0);
	};

	const saveOrderToDb = () => {
		userCart(cart, user.token).then((res) => {
			if(res.data.ok) navigate("/checkout");
		})
		.catch((err) => toast(err));
	};

	const saveCashOrderToDb = () => {
		dispatch({
			type: "COD",
			payload: true
		});

		userCart(cart, user.token).then((res) => {
			if(res.data.ok) navigate("/checkout");
		})
		.catch((err) => toast(err));
	}

	const showCartItems = () => (
		<table className="table table-bordered">
			<thead className="thead-light">
				<tr>
					<th scope="col">Image</th>
					<th scope="col">Title</th>
					<th scope="col">Price</th>
					<th scope="col">Brand</th>
					<th scope="col">Color</th>
					<th scope="col">Count</th>
					<th scope="col">Shipping</th>
					<th scope="col">Remove</th>
				</tr>
			</thead>

			{cart.map((p) => (
				<ProductCartInCheckout key={p._id} p={p} />
			))}
		</table>
	)
	

	return (
		<div className="container-fluid pt-2">
			<div className="row">
				<div className="col-md-8">
					<h4>Cart / {cart.length} Product</h4>

					{!cart.length ? (
						<p>
							No products in cart. <Link to="/shop">Continue Shopping</Link>
						</p>
					) : (
						showCartItems()
					)}
				</div>

				<div className="col-md-4">
					<h4>Order Summary</h4>
					<hr />
					<p>Products</p>
					{cart.map((c, i) => (
						<div key={i}>
							<p>
								{c.title} x {c.count} = {c.count * c.price}$
							</p>
						</div>
					))}
					<hr />
					Total: <b>{getTotal()}</b>
					<hr />
					{user ? (
						<>
							<button
								onClick={saveOrderToDb}
								className="btn btn-sm btn-primary mt-2"
								disabled={!cart.length}
							>
								Proceed to Checkout
							</button>
							<br />
							<button
								onClick={saveCashOrderToDb}
								className="btn btn-sm btn-warning mt-2"
								disabled={!cart.length}
							>
								Pay Cash on Delivery
							</button>
						</>
					) : (
						<button className="btn btn-sm btn-primary mt-2">
							<Link
								to={{
									pathname: "/login",
									state: { from: "cart" },
								}}
							>
								Login to Checkout
							</Link>
						</button>
					)}
				</div>
			</div>
		</div>
	)
}

export default Cart;