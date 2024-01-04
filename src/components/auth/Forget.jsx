import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { preLogin } from "../../services/apiCall";
import AuthLayout from "../layout/AuthLayout";

const Forget = () => {
  const [data, setData] = useState("");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState({
    status: true,
    msg: "",
  });

  const validationSchema = Yup.object({
    email: Yup.string().required().email(),
  });
  const handleValidate = async (e) => {
    try {
      const user = await validationSchema.validate({ email: data });
      if (user?.email) setError({ status: false, msg: "" });
    } catch (error) {
      setError({ status: true, msg: error?.message });
    }
  };
  const handleSend = async (async) => {
    try {
      if (error?.status) return;
      setLoader(true);
      const res = await preLogin.post("/auth/forget", { email: data });

      if (res?.data?.success) {
        toast.success(res.data?.msg);
        setData("");
      } else toast.error(res.data?.msg);
      setLoader(false);
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      setLoader(false);
    }
  };
  return (
    <AuthLayout>
      <main className="auth-main">
        <div className="signin">
          <div className="content">
            <h2>Reset you password</h2>

            <div className="form">
              <div className="inputBox ">
                <label htmlFor="Email">Email</label>
                <input
                  type="email"
                  required
                  placeholder="Enter you email id"
                  name="email"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  onBlur={(e) => handleValidate(e.target.value)}
                />
                {error?.status && <div className="error"> {error.msg}</div>}
              </div>

              <div className="inputBox">
                <input
                  type="submit"
                  value={loader ? "Loading..." : "Send mail"}
                  disabled={loader}
                  onClick={handleSend}
                />
              </div>
              <div className="links">
                <Link to="/auth/login">Back to login</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </AuthLayout>
  );
};

export default Forget;
