import { useRouteError, Link, useNavigate } from "react-router-dom";
import "../styles/error.scss";

// library imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faArrowTurnRight } from "@fortawesome/free-solid-svg-icons";

const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <main className="error">
      <div className="error-container">
        <h1>!مشکلی به وجود آمده است</h1>
        <p>{(error as Error).message || (error as Response).statusText}</p>
        <div className="back-to-home">
          <Link to="/">
            <span>خانه</span>
            <FontAwesomeIcon icon={faHome} />
          </Link>
          <button onClick={() => navigate(-1)}>
            <span>بازگشت</span>
            <FontAwesomeIcon icon={faArrowTurnRight} />
          </button>
        </div>
      </div>
    </main>
  );
};
export default Error;
