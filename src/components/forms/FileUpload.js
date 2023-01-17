import Resizer from "react-image-file-resizer";
import { useSelector } from "react-redux";
import { Badge, Avatar } from "antd";
import { toast } from "react-toastify";
import { removeImage, uploadImages } from "../../functions/images";

const FileUpload = ({ values, setValues, setLoading }) => {
	const { user } = useSelector((state) => ({ ...state }));

	const fileUploadAndResize = (e) => {
		let files = e.target.files;
		let allUploadedFiles = values.images;

		if (files) {
			setLoading(true);
			for(let i = 0; i < files.length; i++) {
				Resizer.imageFileResizer(
					files[i],
					720,
					720,
					"JPEG",
					100,
					0,
					(uri) => {
						uploadImages(uri, user)
							.then((res) => {
								setLoading(false);
								allUploadedFiles.push(res.data);

								setValues({ ...values, images: allUploadedFiles });
							})
							.catch((err) => {
								setLoading(false);
							});
					},
					"base64"
				);
			}
		}
	}

	const handleImageRemove = (public_id) => {
		setLoading(true);
		removeImage(public_id, user)
			.then((res) => {
				setLoading(false);
				const { images } = values;
				const filteredImages = images.filter((item) => {
					return item.public_id !== public_id;
				});
				setValues({ ...values, images: filteredImages });
			})
			.catch((err) => {
				setLoading(false);
				toast(err);
			})
	}

	return (
		<>
			<div className="row">
				{values.images &&
					values.images.map((image) => (
						<Badge
							count="X"
							key={image.public_id}
							onClick={() => handleImageRemove(image.public_id)}
							style={{ cursor: "pointer" }}
						>
							<Avatar
								src={image.url}
								size={100}
								shape="square"
								className="ml-3"
							/>
						</Badge>
					))
				}
			</div>
			<div className="row">
				<label className="btn btn-primary btn-raised mt-3">
					Choose file
					<input
						type="file"
						multiple
						hidden
						accept="images/*"
						onChange={fileUploadAndResize}
					/>
				</label>
			</div>
		</>
		
	)
}

export default FileUpload;