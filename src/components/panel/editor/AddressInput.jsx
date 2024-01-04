import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { editingAddress } from "../../../app/features/resume/resumeSlice";

const AddressInput = () => {
  const dispatch = useDispatch();
  const initialValues = {
    email: "",
    mobile: "",
    website: "",
    full_address: "",
  };
  const validation = Yup.object({
    email: Yup.string().required(),
    mobile: Yup.number().required().positive(),
    website: Yup.string().required(),
    full_address: Yup.string().required(),
  });
  const formik = useFormik({
    initialValues,
    validationSchema: validation,
    onSubmit(values) {
      console.log(values);
    },
  });

  useEffect(() => {
    dispatch(editingAddress(formik.values)); // eslint-disable-next-line
  }, [formik.values]);
  return (
    <section className="tab-form">
      <div className="editor-from">
        <div className="inputBox ">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
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
          <label htmlFor="email">Mobile number</label>
          <input
            type="email"
            placeholder="Enter your mobile"
            name="mobile"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.mobile && formik.touched.mobile && (
            <div className="error"> {formik.errors.mobile}</div>
          )}
        </div>
        <div className="inputBox ">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            placeholder="Enter website url"
            name="website"
            value={formik.values.website}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.website && formik.touched.website && (
            <div className="error"> {formik.errors.website}</div>
          )}
        </div>
        <div className="inputBox ">
          <label htmlFor="address">Full Address</label>
          <input
            type="email"
            placeholder="Enter full address"
            name="full_address"
            value={formik.values.full_address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.full_address && formik.touched.full_address && (
            <div className="error"> {formik.errors.full_address}</div>
          )}
        </div>
        {/* <div className="inputBox">
          <input type="submit" value={"Save"} />
        </div> */}
      </div>
    </section>
  );
};

export default AddressInput;
