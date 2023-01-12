import axios from "axios";

export const getProducts = async(sort, order, page) => 
	await axios.post(`${process.env.REACT_APP_API}/products`, {
		sort,
		order,
		page,
	})

export const getProductsCount = async() => 
	await axios.get(`${process.env.REACT_APP_API}/products/total`)


export const getProductsByCount = async(count) =>
	await axios.get(`${process.env.REACT_APP_API}/products/${count}`);


export const fetchProductsByFilter = async(arg) =>
	await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg);


export const removeProduct = async(slug, authtoken) =>
	await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
		headers: {
			authtoken
		}
	});