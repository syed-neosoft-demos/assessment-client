import { useFormik } from "formik";
// import { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { editingSocial } from "../../../app/features/resume/resumeSlice";

const SocialInput = () => {
  const dispatch = useDispatch();
  const initialValues = {
    linked_in: "",
    facebook: "",
    github: "",
  };
  const validation = Yup.object({
    linked_in: Yup.string().required(),
    facebook: Yup.string().required(),
    github: Yup.string().required(),
  });
  const formik = useFormik({
    initialValues,
    validationSchema: validation,
    onSubmit(values) {
      console.log(values);
    },
  });
  const handleDispatch = () => {
    dispatch(editingSocial(formik.values));
  };
  return (
    <section className="tab-form">
      <div className="editor-from">
        <div className="inputBox ">
          <label htmlFor="email">LinkedIn</label>
          <input
            type="text"
            placeholder="Enter linkedIn profile url "
            name="linked_in"
            value={formik.values.linked_in}
            onChange={(e) => {
              formik.handleChange(e);
              handleDispatch();
            }}
            onBlur={formik.handleBlur}
          />
          {formik.errors.linked_in && formik.touched.linked_in && (
            <div className="error"> {formik.errors.linked_in}</div>
          )}
        </div>
        <div className="inputBox ">
          <label htmlFor="email">Facebook</label>
          <input
            type="email"
            placeholder="Enter facebook profile url"
            name="facebook"
            value={formik.values.facebook}
            onChange={(e) => {
              formik.handleChange(e);
              handleDispatch();
            }}
            onBlur={formik.handleBlur}
          />
          {formik.errors.facebook && formik.touched.facebook && (
            <div className="error"> {formik.errors.facebook}</div>
          )}
        </div>
        <div className="inputBox ">
          <label htmlFor="email">Github</label>
          <input
            type="email"
            placeholder="Enter github profile url"
            name="github"
            value={formik.values.github}
            onChange={(e) => {
              formik.handleChange(e);
              handleDispatch();
            }}
            onBlur={formik.handleBlur}
          />
          {formik.errors.github && formik.touched.github && (
            <div className="error"> {formik.errors.github}</div>
          )}
        </div>
        {/* <div className="inputBox">
          <input type="submit" value={"Save"} />
        </div> */}
      </div>
    </section>
  );
};

export default SocialInput;
