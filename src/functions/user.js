import axios from "axios"

export const userCart = async (cart, authtoken) =>
	await axios.post(`${process.env.REACT_APP_API}/user/cart`,
		{ cart },
		{
			headers: {
				authtoken
			}
		}
	)


export const addToWishlist = async (productId, authtoken) => 
	await axios.post(`${process.env.REACT_APP_API}/user/wishlist`,
		{ productId },
		{
			headers: {
				authtoken
			}
		}
	)

export const removeFromWishlist = async (productId, authtoken) => 
	await axios.put(`${process.env.REACT_APP_API}/user/wishlist/${productId}`,
		{},
		{
			headers: {
				authtoken
			}
		}
	)

