import { useSelector } from "react-redux";
import { tempImageUrl } from "../../../utils/ImageUrl";
import "./Temp.css";

const FirstTemp = () => {
  const resume = useSelector((store) => store?.resume?.editingResume);
  const isEditing = window.location.search?.split("resume_id=")[1];

  const prepareUrl = () => {
    try {
      console.log("typeof", typeof resume?.about?.image);
      if (isEditing) {
        if (typeof resume?.about?.image === "string") {
          return tempImageUrl(resume?.about?.image);
        } else {
          return URL.createObjectURL(resume?.about?.image);
        }
      } else {
        return URL.createObjectURL(resume?.about?.image);
      }
    } catch (error) {
      tempImageUrl();
    }
  };

  return (
    <div>
      <div className="resume">
        <div className="resume_left">
          <div className="resume_profile">
            <img src={prepareUrl()} alt="profile_pic" />
          </div>
          <div className="resume_content">
            <div className="resume_item resume_info">
              <div className="title">
                <p className="bold">{resume?.about?.full_name}</p>
                <p className="regular">{resume?.about?.title}</p>
              </div>
              <ul>
                <li>
                  <div className="data">{resume?.address?.full_address}</div>
                </li>
                <li>
                  <div className="data"> {resume?.address?.mobile}</div>
                </li>
                <li>
                  <div className="data"> {resume?.address?.email}</div>
                </li>
                <li>
                  <div className="data"> {resume?.address?.website}</div>
                </li>
              </ul>
            </div>
            <div className="resume_item resume_skills">
              <div className="title">
                <p className="bold">skill's</p>
              </div>
              <ul>
                {resume?.skills.map((el) => (
                  <li key={el?.skill}>
                    <div className="skill_name">{el?.skill}</div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="resume_item resume_social">
              <div className="title">
                <p className="bold">Social</p>
              </div>
              <ul>
                <li>
                  <div className="data">
                    <p className="semi-bold">LinkedIN</p>
                    <p>{resume?.social?.linked_in}</p>
                  </div>
                </li>
                <li>
                  <div className="data">
                    <p className="semi-bold">Facebook</p>
                    <p>{resume?.social?.facebook}</p>
                  </div>
                </li>
                <li>
                  <div className="data">
                    <p className="semi-bold">Github</p>
                    <p>{resume?.social?.github}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="resume_right">
          <div className="resume_item resume_about">
            <div className="title">
              <p className="bold">About us</p>
            </div>
            <p>{resume?.about?.description}</p>
          </div>
          <div className="resume_item resume_work">
            <div className="title">
              <p className="bold">Work Experience</p>
            </div>
            <ul>
              {resume?.experience.map((el) => (
                <li key={el?.name}>
                  <div className="date">{`${el?.start_date} -- ${el?.end_date}`}</div>
                  <div className="info">
                    <p className="semi-bold">{el?.name}</p>
                    <p>{el?.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="resume_item resume_education">
            <div className="title">
              <p className="bold">Education</p>
            </div>
            <ul>
              {resume?.education.map((el) => (
                <li key={el?.name}>
                  <div className="date">{`${el?.start_date} -- ${el?.end_date}`}</div>
                  <div className="info">
                    <p className="semi-bold">{el?.name}</p>
                    <p>{el?.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstTemp;
