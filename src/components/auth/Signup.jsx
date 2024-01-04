import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { preLogin } from "../../services/apiCall";
import AuthLayout from "../layout/AuthLayout";

//INITIAL VALUES > FOR FORMIK LIB
const initialValues = {
  email: "",
  username: "",
  number: "",
  password: "",
};
// VALIDATION SCHEMA > FOR YUP
const validation = Yup.object({
  email: Yup.string().required().email(),
  username: Yup.string().required().min(6).max(16),
  password: Yup.string().required().min(6).max(18),
  number: Yup.string().matches(/^\d{10}$/, "Mobile number must be 10 digits"),
});
const Signup = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [show, setShow] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema: validation,
    onSubmit(values) {
      handleApiCall(values);
    },
  });
  const handleApiCall = async (payload) => {
    try {
      setLoader(true);
      const res = await preLogin.post("/auth/signup", payload);
      if (res?.data?.success) {
        toast.success(res.data?.msg);
        formik.resetForm();
        navigate("/auth/login");
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
            <h2>Create and Account</h2>
            <form autoComplete="off" onSubmit={formik.handleSubmit}>
              <div className="form">
                <div className="inputBox ">
                  <label htmlFor="Email">
                    Email <span>*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter you email id"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.email && formik.touched.email && (
                    <div className="error"> {formik.errors.email}</div>
                  )}
                </div>
                <div className="inputBox ">
                  <label htmlFor="username">
                    Username <span>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter you username"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.username && formik.touched.username && (
                    <div className="error"> {formik.errors.username}</div>
                  )}
                </div>
                <div className="inputBox ">
                  <label htmlFor="number">Mobile No.</label>
                  <input
                    type="text"
                    placeholder="Enter you mobile number"
                    name="number"
                    value={formik.values.number}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.errors.number && formik.touched.number && (
                  <div className="error"> {formik.errors.number}</div>
                )}

                <div className="inputBox input-icon">
                  <label htmlFor="Email">
                    Password <span>*</span>
                  </label>
                  <input
                    type={show ? "text" : "password"}
                    placeholder="Enter you password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {show ? (
                    <IoIosEye onClick={() => setShow(!show)} />
                  ) : (
                    <IoIosEyeOff onClick={() => setShow(!show)} />
                  )}

                  {formik.errors.password && formik.touched.password && (
                    <div className="error"> {formik.errors.password}</div>
                  )}
                </div>

                <div className="inputBox">
                  <input
                    type="submit"
                    value={loader ? "Loading..." : "Create Account"}
                    disabled={loader}
                  />
                </div>
                <div className="links">
                  <Link to="/auth/login">Login</Link> if you already have an account
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </AuthLayout>
  );
};

export default Signup;
