import "../styles/ad.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useState } from "react";
import Portal from "../components/Portal";
import AdModal from "../components/AdModal";
import Map from "../components/Map";
import {
  useLoaderData,
  LoaderFunctionArgs,
  useParams,
  useNavigate,
} from "react-router-dom";
import { useUser } from "../components/UserProvider";

// advertisement loader
export const adLoader = async ({ params }: LoaderFunctionArgs) => {
  const res = await fetch("http://localhost:3000/advertisements/" + params.id);
  const data = await res.json();
  return { data };
};

interface Data {
  id: number;
  phoneNumber: string;
  address: string;
  coordinates: [lat: number, lng: number];
  description: string;
  userId: number;
}

const Ad = () => {
  // handling adModal
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useLoaderData() as { data: Data };
  const { userInfo } = useUser();
  const { id: paramId } = useParams();
  const navigate = useNavigate();

  const handleModalClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleDelete = () => {
    Swal.fire({
      title: "آیا از حذف این آگهی مطمئن هستید؟",
      text: "!این عمل غیر قابل بازگشت است",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "!بله",
      cancelButtonText: "خیر",
    }).then(async (result) => {
      try {
        if (result.isConfirmed) {
          const res = await fetch(
            "http://localhost:3000/advertisements/" + paramId,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${userInfo?.accessToken}`,
              },
            }
          );
          if (res.ok) {
            navigate("/");
            Swal.fire("!حذف شد", ".آگهی مورد نظر با موفقیت حذف شد", "success");
          }
        }
      } catch (error) {
        if (error instanceof Error) console.log(error.message);
      }
    });
  };

  return (
    <>
      <main className="ad">
        <section>
          <span>آدرس:</span>
          <p>{data.address}</p>
        </section>
        <section>
          <span>مختصات دقیق:</span>
          <div className="ad-map-container">
            <Map coordinates={data.coordinates} />
          </div>
        </section>
        <section>
          <span>شماره تماس:</span>
          <p>{data.phoneNumber}</p>
        </section>
        <section>
          <span>توضیحات:</span>
          <p>{data.description}</p>
        </section>
        {userInfo?.user.id === data.userId && (
          <section className="change-ad-buttons">
            <button onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrash} /> حذف
            </button>
            <button onClick={handleModalClick}>
              <FontAwesomeIcon icon={faEdit} /> ویرایش
            </button>
          </section>
        )}
      </main>
      {isOpen && (
        <Portal>
          <AdModal closeModal={handleModalClick} data={data} />
        </Portal>
      )}
    </>
  );
};

export default Ad;
