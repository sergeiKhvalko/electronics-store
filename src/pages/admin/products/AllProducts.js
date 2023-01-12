import { useEffect, useState } from "react";
import { WithAdminDashboard } from "../../../hoc/WithAdminDashboard";
import AdminNav from "../../../components/nav/AdminNav";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import { getProductsByCount, removeProduct } from "../../../functions/product";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AllProducts = () => {
	const [loading, setLoading] = useState(false);
	const [products, setProducts] = useState([]);

	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		loadAllProducts();
	}, []);

	const loadAllProducts = () => {
		setLoading(true);
		getProductsByCount(100)
			.then((res) => {
				setProducts(res.data);
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				toast.error(err.response.data);
			});
	};

	const handleRemove = (slug) => {
		if(window.confirm("Delete?")) {
			removeProduct(slug, user.token)
				.then((res) => {
					loadAllProducts();
					toast.error(`${res.data.title} is deleted`);
				})
				.catch((err) => {
					if (err.response.status === 400) toast.error(err.response.data);
				})
		}
	}

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>

				<div className="col">
					{loading ? (
						<h4 className="text-danger">Loading</h4>
					) : (
						<h4>All Products</h4>
					)}

					<div className="row">
						{products.map((p) => (
							<div key={p._id} className="col-md-4 pb-3">
								<AdminProductCard product={p} handleRemove={handleRemove}/>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default WithAdminDashboard(AllProducts);