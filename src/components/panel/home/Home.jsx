import {
  IoIosCard,
  IoIosCreate,
  IoIosFlash,
  IoMdDocument,
  IoMdDownload,
  IoMdEye,
} from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllResume } from "../../../app/features/resume/asyncAction";
import { setEditMode } from "../../../app/features/resume/resumeSlice";
import { getUser } from "../../../app/features/user/asyncAction";
import temp1Img from "../../../assets/resume-temp-1.png";
import { planSetter } from "../../../utils/planSetter";
import PanelLayout from "../../layout/PaynelLayout";
import ResumeModal from "../shared/ResumeModal";

const Home = () => {
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);

  const resume = store?.resume?.savedResume;
  const user = store?.user?.user?.[0];

  const handleView = (el) => {
    setOpen(true);
    setSelected(el);
  };
  const handleEdit = (el) => {
    dispatch(setEditMode(el));
    navigate(`/panel/editor?resume_id=${el?._id}`);
  };

  useEffect(() => {
    dispatch(getAllResume());
    dispatch(getUser()); // eslint-disable-next-line
  }, []);
  return (
    <PanelLayout>
      <main className="main">
        <div className="main-header">
          <div className="main-header__intro-wrapper">
            <div className="main-header__welcome">
              <div className="main-header__welcome-title ">
                Welcome, <strong>{user?.username}</strong>
              </div>
              <div className="main-header__welcome-subtitle ">How are you today?</div>
            </div>
          </div>
        </div>
        <div className="main-overview">
          <div className="overviewCard">
            <div className="overviewCard-icon overviewCard-icon--document">
              <i className="far fa-file-alt"></i>
              <IoMdDocument />
            </div>
            <div className="overviewCard-description">
              <h3 className="overviewCard-title">
                Total <strong>Document</strong>
              </h3>
              <p className="overviewCard-subtitle">{resume?.length}</p>
            </div>
          </div>
          <div className="overviewCard">
            <div className="overviewCard-icon overviewCard-icon--calendar">
              <IoIosCard />
            </div>
            <div className="overviewCard-description">
              <h3 className="overviewCard-title ">
                <strong>Plan Type</strong>
              </h3>
              <p className="overviewCard-subtitle">{planSetter(user?.payment?.plan)}</p>
            </div>
          </div>
          <div className="overviewCard">
            <div className="overviewCard-icon overviewCard-icon--mail">
              <IoIosFlash />
            </div>
            <div className="overviewCard-description">
              <h3 className="overviewCard-title">
                Recent <strong>Documents</strong>
              </h3>
              <p className="overviewCard-subtitle">1</p>
            </div>
          </div>
          <div className="overviewCard">
            <div className="overviewCard-icon overviewCard-icon--photo">
              <IoMdDownload />
            </div>
            <div className="overviewCard-description">
              <h3 className="overviewCard-title ">
                Number <strong>Download</strong>
              </h3>
              <p className="overviewCard-subtitle">{user?.download}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card__header">
            <div className="card__header-title ">
              Your <strong>Documents</strong>
            </div>
          </div>

          <div className="documents">
            {resume?.length > 0 &&
              resume?.map((el) => (
                <div className="document" key={el}>
                  <div className="document__img">
                    <img src={temp1Img} alt="" />
                  </div>
                  <div className="document__title">{el?.about?.full_name}</div>
                  <div className="document__date">{el?.updatedAt?.substring(0, 10)}</div>
                  <div className="document__title ">
                    <IoMdEye className="resume_fn_icons" onClick={() => handleView(el)} />

                    <IoIosCreate className="resume_fn_icons" onClick={() => handleEdit(el)} />
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="card card--finance">
          <div className="card__header">
            <div className="card__header-title ">
              Active <strong>Plan</strong>
            </div>
          </div>
          <div className="chartdiv">
            <div className="home-plan-card">
              {user?.payment &&
                Object.entries(user?.payment).map((el) => (
                  <div className="plan-card" key={el?.[0]}>
                    <h6>{el?.[0]}</h6>
                    {console.log("el", el)}
                    <p>{el?.[1]}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
      <ResumeModal open={open} setOpen={setOpen} resume={selected} />
    </PanelLayout>
  );
};

export default Home;
