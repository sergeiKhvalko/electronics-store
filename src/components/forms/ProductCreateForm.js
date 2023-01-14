import { Select } from "antd";

const ProductCreateForm = ({
	values,
	setValues,
	showSub,
	subOptions,
	handleSubmit,
	handleChange,
	handleCategoryChange
}) => {

const {
	title,
	description,
	price,
	categories,
	subs,
	quantity,
	colors,
	brands,
} = values;

	return (
		<form onSubmit={handleSubmit}>
			<div className="form-group">
				<label>Title</label>
				<input
					type="text"
					name="title"
					className="form-control"
					placeholder={title}
					onChange={handleChange}
				/>
			</div>

			<div className="form-group">
				<label>Description</label>
				<input
					type="text"
					name="description"
					className="form-control"
					placeholder={description}
					onChange={handleChange}
				/>
			</div>

			<div className="form-group">
				<label>Price</label>
				<input
					type="number"
					name="price"
					className="form-control"
					placeholder={price}
					onChange={handleChange}
				/>
			</div>

			<div className="form-group">
				<label>Shipping</label>
				<select
					name="shipping"
					className="form-control"
					onChange={handleChange}
				>
					<option>Please select</option>
					<option value="No">No</option>
					<option value="Yes">Yes</option>
				</select>
			</div>

			<div className="form-group">
				<label>Quantity</label>
				<input
					type="number"
					name="quantity"
					className="form-control"
					placeholder={quantity}
					onChange={handleChange}
				/>
			</div>

			<div className="form-group">
				<label>Color</label>
				<select
					name="colors"
					className="form-control"
					onChange={handleChange}
				>
					<option>Please select</option>
					{colors.map((color) => (
						<option key={color} value={color}>{color}</option>
					))}
				</select>
			</div>

			<div className="form-group">
				<label>Brand</label>
				<select
					name="brand"
					className="form-control"
					onChange={handleChange}
				>
					<option>Please select</option>
					{brands.map((brand) => (
						<option key={brand} value={brand}>{brand}</option>
					))}
				</select>
			</div>

			<div className="form-group">
				<label>Category</label>
				<select
					name="category"
					className="form-control"
					onChange={handleCategoryChange}
				>
					<option>Please select</option>
					{categories.length > 0 && categories.map((c) => (
						<option key={c._id} value={c._id}>
							{c.name}
						</option>
					))}
				</select>
			</div>

			{showSub && (
				<div>
					<label>Sub Categories</label>
					<Select
						mode="multiple"
						value={subs}
						style={{ width: "100%"}}
						placeholder="Please select"
						onChange={(value) => setValues({ ...values, subs: value })}
					>
						{subOptions.length &&
							subOptions.map((s) => (
								<Select.Option key={s._id} value={s._id}>
									{s.name}
								</Select.Option>
							))
						}
					</Select>
				</div>
			)}
			
			<br/>
			<button type="submit" className="btn btn-outline-info">Save</button>
		</form>
	)
}

export default ProductCreateForm;