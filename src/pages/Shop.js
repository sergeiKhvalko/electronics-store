import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { getCategories } from "../functions/category";
import { getSubs } from "../functions/sub";
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../functions/product";
import Star from "../components/forms/Star";

import { Menu, Slider, Checkbox, Radio } from "antd";
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from "@ant-design/icons";

const Shop = () => {
	const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState("");
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState({});
  const [brands, setBrands] = useState([
    "Apple",
    "Samsung",
    "Microsoft",
    "Lenovo",
    "ASUS",
  ]);
  const [brand, setBrand] = useState("");
  const [colors, setColors] = useState([
    "Black",
    "Brown",
    "Silver",
    "White",
    "Blue",
  ]);
  const [color, setColor] = useState("");
  const [shipping, setShipping] = useState("");

  let dispatch = useDispatch();
	const { search } = useSelector((state) => ({...state}));
	const { text } = search;

	useEffect(() => {
		loadAllProducts();
		getCategories().then((res) => setCategories(res.data));
		getSubs().then((res) => setSubs(res.data));
	}, []);

	// 1. load products by default on page load
	const loadAllProducts = () => {
		setLoading(true);
		getProductsByCount(12).then((res) => {
			setProducts(res.data);
			setLoading(false);
		})
	}

	const fetchProducts = (arg) => {
		fetchProductsByFilter(arg).then((res) => {
			setProducts(res.data);
		});
	};

	// 2. load products on user search input
	useEffect(() => {
		const delayed = setTimeout(() => {
			fetchProducts({ query: text })
			if(!text) {
				loadAllProducts();
			}
		}, 300);
		return () => clearTimeout(delayed);
	}, [text]);

	// 3. load products based on price range
	useEffect(() => {
		fetchProducts({ price })
	}, [ok]);

	const handleSlider = (value) => {
		dispatch({
			type: "SEARCH_QUERY",
			payload: { text: "" },
		});

		setCategoryIds([]);
		setPrice(value);
		setStar("");
		setSub({});
		setBrand("");
		setColor("");
		setShipping("");
		setTimeout(() => {
			setOk(!ok);
		}, 300);
	}

	// 4. load products based on category
	// show categories in a list of checkbox
	const showCategories = () =>
		categories.map((c) => (
			<div key={c._id}>
				<Checkbox
					onChange={handleCheck}
					className="pb-2 pl-4 pr-4"
					value={c._id}
					name="category"
					checked={categoryIds.includes(c._id)}
				>
					{c.name}
				</Checkbox>
				<br />
			</div>
		));

	// handle check for categories
	const handleCheck = (e) => {
		// reset
		dispatch({
			type: "SEARCH_QUERY",
			payload: { text: "" },
		});
		setPrice([0, 0]);
		setStar("");
		setSub({});
		setBrand("");
		setColor("");
		setShipping("");
		// console.log(e.target.value);
		let inTheState = [...categoryIds];
		let justChecked = e.target.value;
		let foundInTheState = inTheState.indexOf(justChecked); // index or -1

		// indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
		if (foundInTheState === -1) {
			inTheState.push(justChecked);
		} else {
			// if found pull out one item from index
			inTheState.splice(foundInTheState, 1);
		}

		setCategoryIds(inTheState);
		// console.log(inTheState);
		fetchProducts({ category: inTheState });
	};


	// 5. show products by star rating
	const handleStarClick = (num) => {
		dispatch({
			type: "SEARCH_QUERY",
			payload: { text: "" },
		});
		setPrice([0, 0]);
		setCategoryIds([]);
		setStar(num);
		setSub({});
		setBrand("");
		setColor("");
		setShipping("");
		fetchProducts({ stars: num });
	};

	const showStars = () => (
		<div className="pr-4 pl-4 pb-2">
			<Star starClick={handleStarClick} numberOfStars={5} />
			<Star starClick={handleStarClick} numberOfStars={4} />
			<Star starClick={handleStarClick} numberOfStars={3} />
			<Star starClick={handleStarClick} numberOfStars={2} />
			<Star starClick={handleStarClick} numberOfStars={1} />
		</div>
	);

	// 6. show products by sub category
	const showSubs = () =>
		subs.map((s) => (
			<button
				key={s._id}
				onClick={() => handleSub(s)}
				className="p-1 m-1 badge badge-secondary border-0 outline-0"
				style={{ cursor: "pointer" }}
			>
				{s.name}
			</button>
		));

	const handleSub = (sub) => {
		setSub(sub);
		dispatch({
			type: "SEARCH_QUERY",
			payload: { text: "" },
		});
		setPrice([0, 0]);
		setCategoryIds([]);
		setStar("");
		setBrand("");
		setColor("");
		setShipping("");
		fetchProducts({ sub });
	};

	// 7. show products based on brand name
	const showBrands = () =>
		brands.map((b) => (
			<Radio
				key={b}
				value={b}
				name={b}
				checked={b === brand}
				onChange={handleBrand}
				className="pb-1 pl-4 pr-4"
			>
				{b}
			</Radio>
		));

	const handleBrand = (e) => {
		setSub({});
		dispatch({
			type: "SEARCH_QUERY",
			payload: { text: "" },
		});
		setPrice([0, 0]);
		setCategoryIds([]);
		setStar("");
		setColor("");
		setBrand(e.target.value);
		setShipping("");
		fetchProducts({ brand: e.target.value });
	};

	// 8. show products based on color
  const showColors = () =>
    colors.map((c) => (
      <Radio
        key={c}
        value={c}
        name={c}
        checked={c === color}
        onChange={handleColor}
        className="pb-1 pl-4 pr-4"
      >
        {c}
      </Radio>
    ));

  const handleColor = (e) => {
    setSub({});
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor(e.target.value);
    setShipping("");
    fetchProducts({ color: e.target.value });
  };

	// 9. show products based on shipping yes/no
	const showShipping = () => (
		<>
			<Checkbox
				className="pb-2 pl-4 pr-4"
				onChange={handleShippingchange}
				value="Yes"
				checked={shipping === "Yes"}
			>
				Yes
			</Checkbox>

			<Checkbox
				className="pb-2 pl-4 pr-4"
				onChange={handleShippingchange}
				value="No"
				checked={shipping === "No"}
			>
				No
			</Checkbox>
		</>
	);

	const handleShippingchange = (e) => {
		setSub({});
		dispatch({
			type: "SEARCH_QUERY",
			payload: { text: "" },
		});
		setPrice([0, 0]);
		setCategoryIds([]);
		setStar("");
		setBrand("");
		setColor("");
		setShipping(e.target.value);
		fetchProducts({ shipping: e.target.value });
	};


	function getItem(label, key, icon, children, type) {
		return {
			key,
			icon,
			children,
			label,
			type,
		};
	}
	
	const items = [
		getItem(<span className="h6">Price</span>, "sub1", <DollarOutlined />, [
					getItem(<Slider
										className="ml-4 mr-4"
										formatter={(v) => `$${v}`}
										range
										value={price}
										onChange={handleSlider}
										max="4999"
									/>, "1")
				]),
		getItem(<span className="h6">Categories</span>, "sub2", <DownSquareOutlined />, [
			{ type: "group",
				children: [getItem(<div style={{ maringTop: "-10px" }} className="d-flex flex-wrap">{showCategories()}</div>, "2")]
			}
		]),
		getItem(<span className="h6">Rating</span>, "sub3", <StarOutlined />, [
			{ type: "group",
				children: [getItem(<div style={{ maringTop: "-10px" }}>{showStars()}</div>, "3")]
			}
		]),
		getItem(<span className="h6">Sub Categories</span>, "sub4", <DownSquareOutlined />, [
			{ type: "group",
				children: [getItem(
					<div 
						style={{ maringTop: "-10px" }}
						className="d-flex flex-wrap"
					>
						{showSubs()}
					</div>,
					"4")]
			}
		]),
		getItem(<span className="h6">Brands</span>, "sub5", <DownSquareOutlined />, [
			{ type: "group",
				children: [getItem(<div style={{ maringTop: "-10px" }} className="d-flex flex-wrap">{showBrands()}</div>, "5")]
			}
		]),
		getItem(<span className="h6">Colors</span>, "sub6", <DownSquareOutlined />, [
			{ type: "group",
				children: [getItem(<div style={{ maringTop: "-10px" }} className="d-flex flex-wrap">{showColors()}</div>, "6")]
			}
		]),
		getItem(<span className="h6">Shipping</span>, "sub7", <DownSquareOutlined />, [
			{ type: "group",
				children: [getItem(<div style={{ maringTop: "-10px" }} className="pr-5">{showShipping()}</div>, "7")]
			}
		]),
	]

	
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-3 pt-2">
					<h4>Search/Filter</h4>
					<hr/>

					<Menu
						defaultOpenKeys={["sub1", "sub2", "sub3", "sub4", "sub5", "sub6", "sub7"]}
						mode="inline"
						items={items}
					/>
				</div>

				<div className="col-md-9 pt-2">
					{loading ? (
						<h4 className="text-danger">Loading...</h4>
					) : (
						<h4 className="text-danger">Products</h4>
					)}

					{products.length < 1 ? (
						<p>No products found</p>
					) : (
						<div className="row pb-5">
							{products.map((p) => (
								<div key={p._id} className="col-md-4 mt-3">
									<ProductCard product={p}/>
								</div>
							))}
						</div>
					)}


				</div>
			</div>
		</div>
	)
}

export default Shop;