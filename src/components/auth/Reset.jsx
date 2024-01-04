import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { preLogin } from "../../services/apiCall";
import AuthLayout from "../layout/AuthLayout";

const initialValues = {
  password: "",
  cnfPassword: "",
};

const validation = Yup.object({
  password: Yup.string().required().min(6).max(18),
  cnfPassword: Yup.string()
    .required()
    .test("cnfPassword", "Passwords must match", function (value) {
      return this.parent.password === value;
    }),
  //matches("password", "Password not matched"),
});
const Reset = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [show, setShow] = useState(false);

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
      const res = await preLogin.post("/auth/reset", {
        password: payload?.password,
        token: window.location?.search.split("=")?.[1],
      });

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
            <h2>Reset your password</h2>
            <form autoComplete="off" onSubmit={formik.handleSubmit}>
              <div className="form">
                <div className="inputBox">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    placeholder="Enter you password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.password && formik.touched.password && (
                    <div className="error"> {formik.errors.password}</div>
                  )}
                </div>
                <div className="inputBox input-icon">
                  <label htmlFor="cnfPassword">Confirm Password</label>
                  <input
                    type={show ? "text" : "password"}
                    placeholder="Enter you confirm password"
                    name="cnfPassword"
                    value={formik.values.cnfPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {show ? (
                    <IoIosEye onClick={() => setShow(!show)} />
                  ) : (
                    <IoIosEyeOff onClick={() => setShow(!show)} />
                  )}
                  {formik.errors.cnfPassword && formik.touched.cnfPassword && (
                    <div className="error"> {formik.errors.cnfPassword}</div>
                  )}
                </div>

                <div className="inputBox">
                  <input type="submit" value={loader ? "Loading..." : "Update"} />
                </div>
                <div className="links">
                  <Link to="/auth/login">Back to login</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </AuthLayout>
  );
};

export default Reset;
