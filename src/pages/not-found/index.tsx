import "./index.css";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound">
      <h1 className="notfound__code">404</h1>
      <h2 className="notfound__title">Page not found</h2>
      <p className="notfound__desc">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <button className="notfound__button" onClick={() => navigate("/")}>
        ← Back to Home
      </button>
    </div>
  );
};

export default NotFoundPage;
