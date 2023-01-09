import { useState } from 'react';
import { Link } from "react-router-dom";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { showAverage } from "../../functions/rating";
import noImage from "../../images/no-image.png";
import _ from "lodash";
import { useDispatch } from 'react-redux';

const ProductCard = ({product}) => {
	const [tooltip, setTooltip] = useState("Click to add")

	const dispatch = useDispatch();

	const handleAddToCart = () => {
		let cart = [];

		if(typeof window !== "undefined") {
			cart = JSON.parse(localStorage.getItem("cart"));
		}
		
		cart.push({
			...product,
			count: 1,
		})

		let unique = _.uniqWith(cart, _.isEqual);
		localStorage.setItem("cart", JSON.stringify(unique));
		setTooltip("Added");
		dispatch({
			type: "ADD_TO_CART",
			payload: unique
		});
		dispatch({
			type: "SET_VISIBLE",
			payload: true
		});
	}

	const { images, title, description, slug, price, ratings } = product;
	

	return (
		<>
			{ratings.length > 0 ? (
				showAverage(product)
			) : (
				<div className="text-center pt-1 pb-3">No rating yet</div>
			)}

			<Card
				cover={
					<img
						src={images?.length ? images[0].url : noImage}
						alt={product.slug}
						style={{height: "150px", objectFit: "contain"}}
						className="p-1"
					/>
				}
				actions={[
					<Link to={`/product/${slug}`}>
						<EyeOutlined className="text-warning" /> <br /> View Product
					</Link>,
					<Tooltip title={tooltip}>
						<button style={{border: "none", background: "transparent", outline: "none"}} onClick={handleAddToCart} disabled={product.quantity < 1}>
							<ShoppingCartOutlined className="text-danger" /> <br />
              {product.quantity < 1 ? "Out of stock" : "Add to Cart"}
						</button>
					</Tooltip>
				]}
			>
				<Card.Meta
					title={`${title} - ${price}`}
					description={`${description && description.substring(0, 40)}...`}
				/>
			</Card>
		</>
	)
}

export default ProductCard;