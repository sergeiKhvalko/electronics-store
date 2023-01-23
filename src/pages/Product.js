import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct, getRelated } from "../functions/product";
import ProductCard from "../components/cards/ProductCard";
import SingleProduct from "../components/cards/SingleProduct";

const Product = () => {
	const [product, setProduct] = useState({});
	const [related, setRealated] = useState([]);
	const [star, setStar] = useState(0);

	const { user } = useSelector((state) => ({ ...state }));

	const { slug } = useParams();

	useEffect(() => {
		loadSingleProduct();
	}, [slug]);

	const loadSingleProduct = () => {
		getProduct(slug).then((res) => {
			setProduct(res.data);
			getRelated(res.data._id).then((res) => setRealated(res.data));
		})
	}

	const onStarClick = () => {

	}

	return (
		<div className="container-fluid">
			<div className="row pt-5">
				<SingleProduct
					product={product}
					onStarClick={onStarClick}
					star={star}
				/>
			</div>

			<div className="row">
				<div className="col text-center pt-5 pb-5">
					<hr />
					<h4>Related products</h4>
					<hr />
				</div>
			</div>

			<div className="row pb-5">
				{related.length ? (
					related.map((r) => (
						<div key={r._id} className="col-md-4">
							<ProductCard product={r} />
						</div>
					))
				) : (
					<div className="col text-center">No Products Found</div>
				)}
			</div>
		</div>
	)
}

export default Product;