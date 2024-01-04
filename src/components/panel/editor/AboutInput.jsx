import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { editingAbout } from "../../../app/features/resume/resumeSlice";

const AboutInput = () => {
  const dispatch = useDispatch();
  const initialValues = {
    full_name: "",
    title: "",
    description: "",
    image: "",
  };
  const validation = Yup.object({
    full_name: Yup.string().required(),
    title: Yup.string().required(),
    description: Yup.string().required(),
    image: Yup.mixed().required("Please select an image file"),
  });
  const formik = useFormik({
    initialValues,
    validationSchema: validation,
    onSubmit(values) {
      console.log(values);
    },
  });
  const handleDispatch = () => {
    dispatch(editingAbout(formik.values));
  };
  const handleImage = (e) => {
    console.log("typeof", typeof e.target.files[0]);
    const payload = { ...formik.values, image: e.target.files[0] };
    dispatch(editingAbout(payload));
  };

  return (
    <section className="tab-form">
      <div className="editor-from">
        <div className="inputBox ">
          <label htmlFor="email">Full Name</label>
          <input
            type="email"
            placeholder="Enter your full name"
            name="full_name"
            value={formik.values.full_name}
            onChange={(e) => {
              formik.handleChange(e);
              handleDispatch();
            }}
            onBlur={(e) => {
              formik.handleBlur(e);
              handleDispatch();
            }}
          />
          {formik.errors.full_name && formik.touched.full_name && (
            <div className="error"> {formik.errors.full_name}</div>
          )}
        </div>
        <div className="inputBox ">
          <label htmlFor="email">Title</label>
          <input
            type="email"
            placeholder="Enter your title"
            name="title"
            value={formik.values.title}
            onChange={(e) => {
              formik.handleChange(e);
              handleDispatch();
            }}
            onBlur={(e) => {
              formik.handleBlur(e);
              handleDispatch();
            }}
          />
          {formik.errors.title && formik.touched.title && (
            <div className="error"> {formik.errors.title}</div>
          )}
        </div>
        <div className="inputBox ">
          <label htmlFor="email">Description</label>
          <input
            type="email"
            placeholder="enter about yourself"
            name="description"
            value={formik.values.description}
            onChange={(e) => {
              formik.handleChange(e);
              handleDispatch();
            }}
            onBlur={(e) => {
              formik.handleBlur(e);
              handleDispatch();
            }}
          />
          {formik.errors.description && formik.touched.description && (
            <div className="error"> {formik.errors.description}</div>
          )}
        </div>
        <div className="inputBox ">
          <label htmlFor="address">Profile</label>
          <input
            type="file"
            placeholder="Select profile"
            name="image"
            value={formik.values.image?.name}
            onChange={(e) => handleImage(e)}
          />
          {formik.errors.image && formik.touched.image && (
            <div className="error"> {formik.errors.image}</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutInput;
