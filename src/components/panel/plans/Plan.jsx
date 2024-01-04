import { useState } from "react";
import toast from "react-hot-toast";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { postLogin } from "../../../services/apiCall";
import PanelLayout from "../../layout/PaynelLayout";
import "./Plan.css";

const Plan = () => {
  const [loader, setLoader] = useState(false);
  const [selected, setSelected] = useState();
  const data = [
    {
      id: "basic",
      title: "Basic",
      amount: 100,
    },
    {
      id: "professional",
      title: "Professional",
      amount: 200,
    },
    {
      id: "premium",
      title: "Premium",
      amount: 300,
    },
  ];

  const handleApiCall = async (payload) => {
    try {
      setLoader(true);
      setSelected(payload);

      postLogin.interceptors.request.use(function (config) {
        const token = localStorage.getItem("auth_token");
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      });
      const { data } = await postLogin.post("user/create-payment", payload);
      console.log("data", data);
      if (data?.success) {
        console.log("data", data);
        window.location.href = data?.data?.url;
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
      toast.error(error?.response?.data?.msg);
      console.log("error", error);
    }
  };
  return (
    <PanelLayout>
      <div className="plans">
        <div className="title">
          <h2>Choose Plans</h2>
        </div>
        <div className="plan-container">
          {data?.map((el) => (
            <div className="plan" key={el?.id}>
              <div className="heading">
                <h4>{el?.title}</h4>
                <h3>$ {el?.amount}</h3>
              </div>
              <div className="listing">
                <ul>
                  <li>
                    <IoIosCheckmarkCircleOutline />
                    Lorem ipsum dolor sit amet
                  </li>
                  <li>
                    <IoIosCheckmarkCircleOutline />
                    Lorem ipsum dolor sit amet
                  </li>
                  <li>
                    <IoIosCheckmarkCircleOutline />
                    Lorem ipsum dolor sit amet
                  </li>
                  <li>
                    <IoIosCheckmarkCircleOutline />
                    Lorem ipsum dolor sit amet
                  </li>
                  <li>
                    <IoIosCheckmarkCircleOutline />
                    Lorem ipsum dolor sit amet
                  </li>
                </ul>
              </div>
              <div className="button">
                <button type="button" onClick={() => handleApiCall(el)} disabled={loader}>
                  {selected?.id === el?.id
                    ? loader
                      ? "Loading..."
                      : "  Subscribe"
                    : "Subscribe"}
                  {}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PanelLayout>
  );
};

export default Plan;
