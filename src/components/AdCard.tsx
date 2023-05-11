import { Link } from "react-router-dom";

interface Prop {
  address: string;
  id: number;
}
const AdCard = ({ address, id }: Prop) => {
  return (
    <Link to={`advertisement/${id}`} style={{ textDecoration: "none" }}>
      <article className="ad-card">
        <p>{address}</p>
      </article>
    </Link>
  );
};

export default AdCard;
