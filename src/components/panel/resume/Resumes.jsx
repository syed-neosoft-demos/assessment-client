import React, { useEffect, useState } from "react";
import { IoIosCreate, IoMdEye } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllResume } from "../../../app/features/resume/asyncAction";
import temp1Img from "../../../assets/resume-temp-1.png";
import temp2Img from "../../../assets/resume-temp-2.png";
import PanelLayout from "../../layout/PaynelLayout";
import ResumeModal from "../shared/ResumeModal";

const Resumes = () => {
  const resume = useSelector((store) => store?.resume?.savedResume);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const handleView = (el) => {
    setOpen(true);
    setSelected(el);
  };
  const handleEdit = (el) => {
    // dispatch(setEditMode(el));
    navigate(`/panel/editor?resume_id=${el?._id}`);
  };
  useEffect(() => {
    dispatch(getAllResume()); //eslint-disable-next-line
  }, []);
  return (
    <PanelLayout>
      <div className="card">
        <div className="card__header">
          <div className="card__header-title">
            Your <strong>Resume</strong>
          </div>
        </div>
        <div className="card">
          <div className="documents_main">
            {resume?.length &&
              resume.map((el) => (
                <div className="document" key={el?._id}>
                  <div className="document__img_main">
                    <img src={el?.templates === "temp_one" ? temp1Img : temp2Img} alt="" />
                  </div>
                  <div className="document__title">{el?.about?.full_name}</div>
                  <div className="document__date">{el?.about?.title}</div>
                  <div className="document__title ">
                    <IoMdEye className="resume_fn_icons" onClick={() => handleView(el)} />

                    <IoIosCreate className="resume_fn_icons" onClick={() => handleEdit(el)} />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <ResumeModal open={open} setOpen={setOpen} resume={selected} />
    </PanelLayout>
  );
};

export default Resumes;
