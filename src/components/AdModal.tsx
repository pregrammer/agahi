import { MouseEvent, FormEvent, useRef, useState } from "react";
import Map from "./Map";
import { useUser } from "./UserProvider";
import Swal from "sweetalert2";
import { useRefreshIndexPage } from "./RefreshIndexPageProvider";
import { useRevalidator } from "react-router-dom";

interface Prop {
  closeModal: () => void;
  data?: Data;
}

interface Data {
  id?: number;
  phoneNumber: string;
  address: string;
  coordinates: [lat: number, lng: number];
  description: string;
}

const AdModal = ({ closeModal, data }: Prop) => {
  const modalRef = useRef(null);

  const [inputs, setInputs] = useState<Data>({
    phoneNumber: data ? data.phoneNumber : "",
    address: data ? data.address : "",
    coordinates: data ? data.coordinates : [35.7219, 51.3347],
    description: data ? data.description : "",
  });

  const { userInfo } = useUser();
  const { setRefresh } = useRefreshIndexPage();
  let revalidator = useRevalidator();

  const onModalClick = (e: MouseEvent<HTMLElement>) => {
    if (e.target == modalRef.current) {
      closeModal();
    }
  };

  const handleInputChange = (
    e: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleCoordinates = ([lat, lng]: [lat: number, lng: number]) => {
    setInputs((values) => ({ ...values, coordinates: [lat, lng] }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const url = data
        ? `http://localhost:3000/advertisements/${data.id}`
        : "http://localhost:3000/advertisements";
      const res = await fetch(url, {
        method: data ? "PUT" : "POST",
        body: JSON.stringify({
          ...inputs,
          userId: userInfo?.user.id,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo?.accessToken}`,
        },
      });
      if (res.ok) {
        closeModal();
        setRefresh((prev) => !prev);
        Swal.fire(
          `${data ? "!ویرایش شد" : "!ثبت شد"}`,
          `آگهی مورد نظر با موفقیت ${data ? "ویرایش" : "ثبت"} شد`,
          "success"
        );
        if (data) {
          revalidator.revalidate();
        }
      }
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return (
    <div ref={modalRef} className="modal" onClick={onModalClick}>
      <div className="modal-content">
        <div className="modal-header">
          <span onClick={closeModal} className="close">
            &times;
          </span>
          <h3>{`${data ? "ویرایش" : "افزودن"} آگهی`}</h3>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label>شماره تماس:</label>
              <input
                type="number"
                value={inputs.phoneNumber}
                name="phoneNumber"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-control">
              <label>آدرس:</label>
              <input
                type="text"
                value={inputs.address}
                name="address"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-control">
              <label>مختصات دقیق:</label>
              <div className="map-container">
                <Map
                  coordinates={inputs.coordinates}
                  handleCoordinates={handleCoordinates}
                />
              </div>
            </div>
            <div className="form-control">
              <label>توضیحات:</label>
              <textarea
                name="description"
                onChange={handleInputChange}
                value={inputs.description}
                required
              />
            </div>
            <button type="submit">{data ? "ویرایش" : "ثبت"}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdModal;
