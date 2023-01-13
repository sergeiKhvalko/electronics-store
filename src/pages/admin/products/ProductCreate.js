import { useState, useEffect } from "react";
import { WithAdminDashboard } from "../../../hoc/WithAdminDashboard";
import AdminNav from "../../../components/nav/AdminNav";
import { LoadingOutlined } from "@ant-design/icons";
import FileUpload from "../../../components/forms/FileUpload";


/**
* EASY WAY TO RE-POPULATE SUBS IF USER SELECT ANOTHER CATEGORY??
	if (product.category._id === e.target.value) {
		loadProduct();
	} else {
		setArrayOfSubIds([]);
	}
*/

const initialState = {
	title: "Macbook Pro",
	description: "This is the best Apple product",
	price: "45000",
	categories: [],
	category: "",
	subs: [],
	shipping: "Yes",
	quantity: "50",
	images: [
		// {
		//   public_id: "jwrzeubemmypod99e8lz",
		//   url:
		//     "https://res.cloudinary.com/dcqjrwaoi/image/upload/v1599480909/jwrzeubemmypod99e8lz.jpg",
		// },
		// {
		//   public_id: "j7uerlvhog1eic0oyize",
		//   url:
		//     "https://res.cloudinary.com/dcqjrwaoi/image/upload/v1599480912/j7uerlvhog1eic0oyize.jpg",
		// },
		// {
		//   public_id: "ho6wnp7sugyemnmtoogf",
		//   url:
		//     "https://res.cloudinary.com/dcqjrwaoi/image/upload/v1599480913/ho6wnp7sugyemnmtoogf.jpg",
		// },
	],
	colors: ["Black", "Brown", "Silver", "White", "Blue"],
	brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
	color: "White",
	brand: "Apple",
};

const ProductCreate = () => {
	const [loading, setLoading] = useState(false);
	const [values, setValues] = useState(initialState);
	const [showSub, setShowSub] = useState(false);
	const [subOptions, setSubOptions] = useState([]);


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
						<h4>Product create</h4>
					)}
					<hr />

					<div className="pt-3">
						<FileUpload
							values={values}
							setValues={setValues}
							setLoading={setLoading}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default WithAdminDashboard(ProductCreate);