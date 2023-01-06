import axios from "axios";

export const getProducts = async(sort, order, page) => {
	return await axios.post(`${process.env.REACT_APP_API}/products`, {
		sort,
		order,
		page,
	})
}

export const getProductsCount = async() => {
	return await axios.get(`${process.env.REACT_APP_API}/products/total`)
}