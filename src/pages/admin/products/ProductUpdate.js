import { useState, useEffect } from "react";
import { WithAdminDashboard } from "../../../hoc/WithAdminDashboard";
import AdminNav from "../../../components/nav/AdminNav";
import FileUpload from "../../../components/forms/FileUpload";
import { getProduct, updateProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";
import { toast } from "react-toastify";


const initialState = {
	title: "",
	description: "",
	price: "",
	category: "",
	subs: [],
	shipping: "",
	quantity: "",
	images: [],
	colors: ["Black", "Brown", "Silver", "White", "Blue"],
	brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
	color: "",
	brand: "",
};

const ProductUpdate = () => {
	const [values, setValues] = useState(initialState);
	const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [arrayOfSubs, setArrayOfSubs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
	const [loading, setLoading] = useState(false);

	const { user } = useSelector((state) => ({ ...state }));

	const navigate = useNavigate();
	const { slug } = useParams();

	useEffect(() => {
		loadProduct();
		loadCategories();
	}, []);

	const loadProduct = () => {
		getProduct(slug).then((p) => {
			// console.log("single product", p);
			// 1 load single proudct
			setValues({ ...values, ...p.data });
			// 2 load single product category subs
			getCategorySubs(p.data.category._id).then((res) => {
				setSubOptions(res.data); // on first load, show default subs
			});
			// 3 prepare array of sub ids to show as default sub values in antd Select
			let arr = [];
			p.data.subs.map((s) => {
				arr.push(s._id);
			});
			setArrayOfSubs((prev) => arr); // required for ant design select to work
		});
	};

	const loadCategories = () =>
		getCategories().then((c) => {
			setCategories(c.data);
		});


	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);

		values.subs = arrayOfSubs;
		values.category = selectedCategory ? selectedCategory : values.category;

		updateProduct(slug, values, user.token)
			.then((res) => {
				setLoading(false);
				toast.success(`"${res.data.title}" is updated`);
				navigate("/admin/products");
			})
			.catch((err) => {
				setLoading(false);
				toast.error(err.response.data.err);
			});
	};

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleCategoryChange = (e) => {
		e.preventDefault();
		setValues({ ...values, subs: [] });

		setSelectedCategory(e.target.value);

		getCategorySubs(e.target.value).then((res) => {
			setSubOptions(res.data);
		});

		// if user clicks back to the original category
		// show its sub categories in default
		if (values.category._id === e.target.value) {
			loadProduct();
		}
		// clear old sub category ids
		setArrayOfSubs([]);
	};


	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>
				<div className="col-md-10">
					{loading ? (
						<LoadingOutlined className="text-danger h1" />
					) : (
						<h4>Product update</h4>
					)}

					<div className="p-3">
						<FileUpload
							values={values}
							setValues={setValues}
							setLoading={setLoading}
						/>
					</div>

					<ProductUpdateForm
						handleSubmit={handleSubmit}
						handleChange={handleChange}
						setValues={setValues}
						values={values}
						handleCategoryChange={handleCategoryChange}
						categories={categories}
						subOptions={subOptions}
						arrayOfSubs={arrayOfSubs}
						setArrayOfSubs={setArrayOfSubs}
						selectedCategory={selectedCategory}
					/>
					<hr />
				</div>
			</div>
		</div>
	)
}

export default WithAdminDashboard(ProductUpdate);