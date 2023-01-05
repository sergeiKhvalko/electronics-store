import axios from "axios";

export const getProducts = async(sort, order, page) => {
	await axios.post(`${process.env.REACT_APP_API}/products`, {
		sort,
		order,
		page,
	})
}

export const getProductsCount = async() => {
	await axios.get(`${process.env.REACT_APP_API}/products/total`)
}