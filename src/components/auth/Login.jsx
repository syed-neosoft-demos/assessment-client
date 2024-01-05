import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { preLogin } from "../../services/apiCall";
import AuthLayout from "../layout/AuthLayout";
const Login = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [show, setShow] = useState(false);
  const initialValues = {
    email: "",
    password: "",
  };
  const validation = Yup.object({
    email: Yup.string().required(),
    password: Yup.string().required().min(6).max(18),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: validation,
    onSubmit(values) {
      handleApi(values);
    },
  });
  const handleApi = async (payload) => {
    try {
      setLoader(true);
      const res = await preLogin.post("/auth/login", payload);
      if (res?.data?.success) {
        const { token } = res?.data;
        localStorage.setItem("auth_token", token);
        toast.success(res.data?.msg);
        formik.resetForm();
        navigate("/panel/home");
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
            <h2>Login to your account</h2>
            <form autoComplete="off" onSubmit={formik.handleSubmit}>
              <div className="form">
                <div className="inputBox ">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    placeholder="Enter you email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.email && formik.touched.email && (
                    <div className="error"> {formik.errors.email}</div>
                  )}
                </div>

                <div className="inputBox input-icon">
                  <label htmlFor="password">Password</label>
                  <input
                    type={show ? "text" : "password"}
                    placeholder="Enter you Password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {show ? (
                    <IoIosEyeOff onClick={() => setShow(!show)} />
                  ) : (
                    <IoIosEye onClick={() => setShow(!show)} />
                  )}

                  {formik.errors.password && formik.touched.password && (
                    <div className="error"> {formik.errors.password}</div>
                  )}
                </div>

                <div className="links left">
                  <Link to="/auth/forget">Forgot Password</Link>
                </div>

                <div className="inputBox">
                  <input
                    type="submit"
                    value={loader ? "Loading..." : "Login"}
                    disabled={loader}
                  />
                </div>
                <div className="links">
                  New to App? <Link to="/auth/signup">Create account</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </AuthLayout>
  );
};

export default Login;
