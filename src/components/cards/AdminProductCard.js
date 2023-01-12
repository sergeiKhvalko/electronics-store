import { Card } from "antd";
import noImage from "../../images/no-image.png";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const AdminProductCard = ({product, handleRemove}) => {
	const { title, description, images, slug } = product;

	return (
		<Card
			cover={
					<img
						src={images?.length ? images[0].url : noImage}
						alt={slug}
						style={{height: "150px", objectFit: "contain"}}
						className="p-1"
					/>
			}
			actions={[
				<Link to={`/admin/product/${slug}`}>
					<EditOutlined className="text-warning" />
				</Link>,
				<DeleteOutlined
					onClick={() => handleRemove(slug)}
					className="text-danger"
				/>,
			]}
		>
			<Card.Meta
				title={title}
				description={`${description && description.substring(0, 40)}...`}
			/>
		</Card>
	)
}

export default AdminProductCard;