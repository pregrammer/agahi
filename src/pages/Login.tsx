import { FormEvent, useState } from "react";
import "../styles/auth.scss";
import logo from "/logo.png";
import { useUser } from "../components/UserProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const { setUserInfo } = useUser();
  const navigate = useNavigate();

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        body: JSON.stringify(inputs),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (res.status === 400) {
        Swal.fire({
          title: "!مشکلی به وجود آمده است",
          text: data,
          icon: "error",
          confirmButtonText: "باشه",
          confirmButtonColor: "#f00",
        });
        return;
      }

      setUserInfo(data);
      navigate("/");
      Swal.fire(
        "!خوش آمدید",
        "شما با موفقیت به حساب کاربری تان وارد شدید",
        "success"
      );
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="auth">
      <form onSubmit={handleSubmit}>
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="form-control">
          <label>ایمیل:</label>
          <input
            type="text"
            name="email"
            value={inputs.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-control">
          <label>رمز عبور:</label>
          <input
            type="password"
            name="password"
            value={inputs.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" disabled={loading ? true : false}>
          ورود
        </button>
      </form>
    </main>
  );
};

export default Login;
