import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { Card, Tabs, Tooltip } from "antd";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import noImage from "../../images/no-image.png"
import { showAverage } from "../../functions/rating";
import { HeartFilled, HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import ProductListItems from "./ProductListItems";


const SingleProduct = ({ product, onStarClick, star }) => {
	const [tooltip, setTooltip] = useState("Click to add");
	const [wishlist, setWishlist] = useState(false);

	const { user } = useSelector((state) => ({ ...state }));
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const { title, images, description, _id} = product;

	const handleAddToCart = () => {
		let cart = [];

		if(typeof window != "undefined") {
			if(localStorage.getItem("cart")) {
				cart = JSON.parse(localStorage.getItem("cart"))
			}

			// push new product to cart
			cart.push({
				...product,
				count: 1
			});

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
	};

	const handleAddToWishlist = () => {
		
	}

	const handleRemoveFromWishlist = () => {

	}


	return (
		<>
			<div className="col-md-7">
				{images && images.length ? (
					<Carousel showArrows={true} autoPlay infiniteLoop>
						{images.map((i) => <img
								src={i.url}
								alt={title}
								key={i.public_id}
							/>)}
					</Carousel>
				) : (
					<Card cover={<img src={noImage} alt="no-img" className="card-image mb-3" />}></Card>
				)}

				<Tabs
					type="card"
					defaultActiveKey="1"
					items={[
						{
							label: `Description`,
							key: '1',
							children: `${description && description}`,
						},
						{
							label: `More`,
							key: '2',
							children: `Call use on xxxx xxx xxx to learn more about this product.`,
						},
					]}
				>
				</Tabs>
			</div>

			<div className="col-md-5">
				<h1 className="bg-info p-3">{title}</h1>

				{product?.ratings?.length > 0 ? (
					showAverage(product)
				) : (
					<div className="text-center pt-1 pb-3">No rating yet</div>
				)}

				<Card
					actions={[
						<Tooltip placement="top" title={tooltip}>
							<a onClick={handleAddToCart} disabled={product.quantity < 1}>
								<ShoppingCartOutlined className="text-danger" />
								<br />
								{product.quantity < 1 ? "Out of Stock" : "Add to Cart"}
							</a>
						</Tooltip>,

						wishlist ? (
							<a onClick={handleRemoveFromWishlist}>
								<HeartFilled className="text-info" /> <br /> Remove from Wishlist
							</a>
						) : (
							<a onClick={handleAddToWishlist}>
								<HeartOutlined className="text-info" /> <br /> Add to Wishlist
							</a>
						),

						<RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor="red"
              />
            </RatingModal>,
					]}
				>
					<ProductListItems product={product} />
				</Card>
			</div>
		</>
	)
}

export default SingleProduct;