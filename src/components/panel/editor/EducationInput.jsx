import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { editingEducation, editingExperience } from "../../../app/features/resume/resumeSlice";

const EducationInput = ({ inUse }) => {
  const dispatch = useDispatch();
  const resume = useSelector((store) => store?.resume);
  const initialValues = {
    start_date: "01/01/2025",
    end_date: "01/01/2025",
    name: "",
    description: "",
  };
  const validation = Yup.object({
    start_date: Yup?.date()?.required()?.max(new Date(), "Please select valid date"),
    end_date: Yup?.date()
      .required()
      .when("start_date", (start_date, schema) => {
        return schema
          .min(start_date, "End date must be greater than or equal to the start date")
          .max(new Date(), "Please select valid date");
      }),
    name: Yup.string().required(),
    description: Yup.string().required(),
  });
  const formik = useFormik({
    initialValues,
    validationSchema: validation,
    onSubmit(values) {
      if (inUse === "education") {
        const addResume = resume?.editingResume?.education.concat([values]);
        dispatch(editingEducation(addResume));
      } else {
        const addEx = resume?.editingResume?.experience.concat([values]);
        dispatch(editingExperience(addEx));
      }
      formik.resetForm();
    },
  });
  const handleRemove = () => {
    if (inUse === "education") {
      if (resume?.editingResume?.education?.length > 0) {
        const addResume = [...resume?.editingResume?.education];
        addResume.pop();
        dispatch(editingEducation(addResume));
      } else toast.error("no education details found in the log");
    } else {
      if (resume?.editingResume?.experience?.length) {
        const addEx = [...resume?.editingResume?.experience];
        addEx.pop();
        dispatch(editingExperience(addEx));
      } else toast.error("no experience details found in the log");
    }
  };

  console.log("formik", formik);

  return (
    <form autoComplete="off" onSubmit={formik.handleSubmit}>
      <section className="tab-form">
        <div className="editor-from">
          <div className="inputBox ">
            <label htmlFor="email">Start Date</label>
            <input
              type="date"
              placeholder="Select start date"
              name="start_date"
              value={formik.values.start_date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.start_date && formik.touched.start_date && (
              <div className="error"> {formik.errors.start_date}</div>
            )}
          </div>
          <div className="inputBox ">
            <label htmlFor="email">End Date</label>
            <input
              type="date"
              placeholder="Select end date"
              name="end_date"
              value={formik.values.end_date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.end_date && formik.touched.end_date && (
              <div className="error"> {formik.errors.end_date}</div>
            )}
          </div>
          <div className="inputBox ">
            <label htmlFor="email">Institute/Organization Name</label>
            <input
              type="text"
              placeholder="Enter institute/organization name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name && (
              <div className="error"> {formik.errors.name}</div>
            )}
          </div>
          <div className="inputBox ">
            <label htmlFor="email">About</label>
            <input
              type="text"
              placeholder="Enter about"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.description && formik.touched.description && (
              <div className="error"> {formik.errors.description}</div>
            )}
          </div>
          <div className="group-button">
            <div className="inputBox">
              <input type="submit" value="Add" />
            </div>
            <div className="inputBox">
              <div className="remove-btn" onClick={handleRemove}>
                Remove
              </div>
            </div>
          </div>
        </div>
      </section>
    </form>
  );
};

export default EducationInput;
