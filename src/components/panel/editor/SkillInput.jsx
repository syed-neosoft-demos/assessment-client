import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { editingSkills } from "../../../app/features/resume/resumeSlice";

const SkillInput = () => {
  const dispatch = useDispatch();
  const resume = useSelector((store) => store?.resume);
  const initialValues = {
    skill: "",
  };
  const validation = Yup.object({
    skill: Yup.string().required(),
  });
  const formik = useFormik({
    initialValues,
    validationSchema: validation,
    onSubmit(values) {
      const addSkill = resume?.editingResume?.skills.concat([values]);
      dispatch(editingSkills(addSkill));
      formik.resetForm();
    },
  });
  const handleRemove = () => {
    if (resume?.editingResume?.skills?.length) {
      const addSkill = [...resume?.editingResume?.skills];
      addSkill.pop();
      dispatch(editingSkills(addSkill));
    } else toast.error("no skills details found in the log");
  };
  return (
    <form autoComplete="off" onSubmit={formik.handleSubmit}>
      <section className="tab-form">
        <div className="editor-from">
          <div className="inputBox ">
            <label htmlFor="email">Add Skills</label>
            <input
              type="react"
              placeholder="Enter Skill"
              name="skill"
              value={formik.values.skill}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.skill && formik.touched.skill && (
              <div className="error"> {formik.errors.skill}</div>
            )}
          </div>

          {/* <div className="inputBox">
            <input type="submit" value="Add" />
          </div> */}
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

export default SkillInput;
