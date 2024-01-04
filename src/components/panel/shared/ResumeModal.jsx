import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { tempImageUrl } from "../../../utils/ImageUrl";
import "../templates/Temp.css";

function ResumeModal({ open, setOpen, resume }) {
  const user = useSelector((store) => store?.user?.user);
  const navigate = useNavigate();
  const handleDownload = async () => {
    try {
      if (user?.[0]?.payment?.status === "paid") {
        const input = document.getElementById("resume-view-1");
        const canvas = await html2canvas(input, { useCORS: true });
        const pdf = new jsPDF("p", "mm", "a4", true);
        pdf.addImage(canvas.toDataURL("image/png"), 0, 0, 210, 297);
        pdf.save(`${resume?.about?.full_name}-resume.pdf`);
      } else {
        toast.error("please do payment then download");
        navigate("/panel/plans");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <Modal
      show={open}
      onHide={() => setOpen(false)}
      dialogClassName="modal-100%"
      size="lg"
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-custom-modal-styling-title">
          <div className="resume-download-btn">
            <button className="save-btn" onClick={handleDownload}>
              Download
            </button>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div id="resume-view-1">
          <div className="resume">
            <div
              className={`resume_left ${
                resume?.templates === "temp_two" && "temp_two"
              }`}
            >
              <div className="resume_profile">
                <img
                  src={tempImageUrl(resume?.about?.image)}
                  alt="profile_pic"
                />
              </div>
              <div className="resume_content">
                <div className="resume_item resume_info">
                  <div className="title">
                    <p className="bold">{resume?.about?.full_name}</p>
                    <p className="regular">{resume?.about?.title}</p>
                  </div>
                  <ul>
                    <li>
                      <div className="data">
                        {resume?.address?.full_address}
                      </div>
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
                    {resume?.skills?.map((el) => (
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
                  {resume?.experience?.map((el) => (
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
                  {resume?.education?.map((el) => (
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
      </Modal.Body>
    </Modal>
  );
}

export default ResumeModal;
