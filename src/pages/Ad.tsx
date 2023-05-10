import "../styles/ad.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { useState } from "react";
import Portal from "../components/Portal";
import AdModal from "../components/AdModal";
import Map from "../components/Map";

interface Data {
  phoneNumber: string;
  address: string;
  coordinates: [lat: number, lng: number];
  description: string;
}

const Ad = () => {
  const [isOpen, setIsOpen] = useState(false);

  const data: Data = {
    phoneNumber: "0915555555",
    address: "تهراااااان",
    coordinates: [35.7219, 51.3347],
    description: "ندارددددد",
  };

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
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <>
      <main>
        <section>
          <span>آدرس:</span>
          <p>
            استان خراسان جنوبی - بیرجند - خیابان جمهوری - بعد از مدرسه ی شهاب -
            آخرین منزل جنوبی - پلاک 856
          </p>
        </section>
        <section>
          <span>مختصات دقیق:</span>
          <div className="ad-map-container">
            <Map coordinates={data.coordinates} />
          </div>
        </section>
        <section>
          <span>شماره تماس:</span>
          <p>09154862134</p>
        </section>
        <section>
          <span>توضیحات:</span>
          <p>ندارد</p>
        </section>
        <section className="change-ad-buttons">
          <button onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrash} /> حذف
          </button>
          <button onClick={handleModalClick}>
            <FontAwesomeIcon icon={faEdit} /> ویرایش
          </button>
        </section>
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
