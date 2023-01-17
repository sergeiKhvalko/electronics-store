import axios from "axios";

export const uploadImages = (uri, user) => {
	return axios.post(`${process.env.REACT_APP_API}/uploadimages`,
		{ image: uri },
		{
			headers: {
				authtoken: user ? user.token : "",
			}
		}
	)
}

export const removeImage = (public_id, user) => {
	return axios.post(`${process.env.REACT_APP_API}/removeimage`,
		{ public_id },
		{
			headers: {
				authtoken: user ? user.token : "",
			},
		}
	)
}