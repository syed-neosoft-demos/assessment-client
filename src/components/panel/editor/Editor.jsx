/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  changeTemplate,
  editingRemove,
  setEditMode,
} from "../../../app/features/resume/resumeSlice";
import PanelLayout from "../../layout/PaynelLayout";
import FirstTemp from "../templates/FirstTemp";
import SecTemp from "../templates/SecTemp";
import "./Editor.css";
import Inputs from "./Inputs";

const Editor = () => {
  const resume = useSelector((store) => store?.resume);
  const cv = resume?.editingResume;
  const dispatch = useDispatch();

  const [loader, setLoader] = useState(false);
  // eslint-disable-next-line
  const [isEditing, setIsEditing] = useState(window.location.search?.split("resume_id=")[1]);

  const payloadFormatter = (json) => {
    const formData = new FormData();
    for (const key in json) {
      if (key === "about") {
        for (const aboutKey in json[key]) {
          formData.append(aboutKey, json?.about?.[aboutKey]);
        }
      }
      if (key === "address") {
        Object.entries(json[key]).forEach(([key, value]) => {
          formData.append(`address[${key}]`, value);
        });
      }
      if (key === "social") {
        Object.entries(json[key]).forEach(([key, value]) => {
          formData.append(`social[${key}]`, value);
        });
      }
      if (key === "experience") {
        json?.experience?.forEach((object, index) => {
          Object.entries(object).forEach(([key, value]) => {
            formData.append(`experience[${index}][${key}]`, value);
          });
        });
      }
      if (key === "education") {
        json?.education?.forEach((object, index) => {
          Object.entries(object).forEach(([key, value]) => {
            formData.append(`education[${index}][${key}]`, value);
          });
        });
      }
      if (key === "skills") {
        json?.skills?.forEach((object, index) => {
          Object.entries(object).forEach(([key, value]) => {
            formData.append(`skills[${index}][${key}]`, value);
          });
        });
      }
    }
    formData.append("templates", resume?.templates);
    return formData;
  };

  const handleSaveCV = async () => {
    if (cv?.skills?.length && cv?.education?.length && cv?.experience?.length) {
      try {
        setLoader(true);
        const payload = payloadFormatter(cv);
        const res = await axios({
          url: `${process.env.REACT_APP_SERVER_BASE_URL}/resume/create`,
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
          data: payload,
        });
        if (res?.status) {
          toast.success("resume successfully created");
        }
        setLoader(false);
        dispatch(editingRemove({}));
      } catch (error) {
        console.log("error", error);
        toast.error(error?.response?.data?.msg);
        setLoader(false);
      }
    } else {
      toast.error("You have some missing fields. please fill all the fields");
    }
  };
  const handleUpdateCV = async () => {
    if (cv?.skills?.length && cv?.education?.length && cv?.experience?.length) {
      try {
        setLoader(true);
        const payload = payloadFormatter(cv);
        payload.append("_id", cv?._id);
        const res = await axios({
          url: `${process.env.REACT_APP_SERVER_BASE_URL}/resume/update`,
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
          data: payload,
        });
        if (res?.status) {
          toast.success("resume successfully updated");
        }
        setLoader(false);
        dispatch(editingRemove({}));
      } catch (error) {
        toast.error(error?.response?.data?.msg);
        setLoader(false);
      }
    } else {
      toast.error("Resume edit log not completed, please complete cv then save");
    }
  };
  const handleChange = (type) => {
    dispatch(changeTemplate(type));
  };

  useEffect(() => {
    if (isEditing && resume?.savedResume?.length) {
      const cv = resume?.savedResume?.find((el) => el?._id === isEditing);
      dispatch(setEditMode(cv));
      dispatch(changeTemplate(cv?.templates));
    } else {
      dispatch(editingRemove({}));
    }
  }, [isEditing]);

  return (
    <PanelLayout>
      <div className="resume-container">
        <section className="resume-editor">
          <Inputs />
          <div className="resume-download-btn">
            <button
              className="save-btn"
              onClick={isEditing ? handleUpdateCV : handleSaveCV}
              disabled={loader}
            >
              {loader ? "Loading..." : isEditing ? "Update Resume" : "Save Resume"}
            </button>
          </div>
          <ButtonToolbar aria-label="Toolbar with button groups">
            <ButtonGroup className="me-2" aria-label="First group">
              <Button variant="secondary" onClick={() => handleChange("temp_one")}>
                Template 1
              </Button>
              <Button variant="secondary" onClick={() => handleChange("temp_two")}>
                Template 2
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </section>
        <section className="resume-preview">
          {resume?.templates === "temp_one" ? <FirstTemp /> : <SecTemp />}
        </section>
      </div>
    </PanelLayout>
  );
};

export default Editor;
