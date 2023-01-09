import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Search = () => {
	const dispatch = useDispatch();
	const { search } = useSelector((state) => ({...state}))
	const { text } = search;

	const navigate = useNavigate();

	const handleChange = (e) => {
		dispatch({
			type: "SEARCH_QUERY",
			payload: { text: e.target.value}
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		navigate(`/shop?${text}`);
	}

	return (
		<form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
			<input
				className="form-control mr-sm-2 border-0 outline-0 shadow-none mt-lg-1"
				type="search"
				value={text}
				onChange={handleChange}
				placeholder="Search"
			/>
			<SearchOutlined onClick={handleSubmit} style={{ cursor: "pointer" }} />
		</form>
	)
}

export default Search;