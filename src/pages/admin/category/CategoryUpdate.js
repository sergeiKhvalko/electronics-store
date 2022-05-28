import { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { WithAdminDashboard } from "../../../hoc/WithAdminDashboard";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategory, updateCategory } from "../../../functions/category";
import { Link, useParams, useNavigate } from "react-router-dom";

const CategoryUpdate = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = () =>
    getCategory(slug).then((c) => setName(c.data.name));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateCategory(slug, { name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} is updated`);
        navigate("/admin/category");
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  //   const handleUpdate = async (slug) => {
  //     setLoading(true);
  //     updateCategory(slug, user.token)
  //       .then((res) => {
  //         setLoading(false);
  //         toast.success(`${res.data.name} updated`);
  //         loadCategories();
  //       })
  //       .catch((err) => {
  //         if (err.response.status === 400) {
  //           setLoading(false);
  //           toast.error(err.response.data);
  //         }
  //       });
  //   };

  const categoryForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setName(e.target.value)}
          value={name}
          autoFocus
          required
        />
        <br />
        <button className="btn btn-outline-primary">Save</button>
      </div>
    </form>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Update category</h4>
          )}
          {categoryForm()}
          <hr />
        </div>
      </div>
    </div>
  );
};

export default WithAdminDashboard(CategoryUpdate);
