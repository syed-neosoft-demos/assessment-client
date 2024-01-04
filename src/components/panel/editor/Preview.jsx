import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import FirstTemp from "../templates/FirstTemp";

const Preview = () => {
  const [key, setKey] = useState("temp_one");
  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3 text-dark"
    >
      <Tab eventKey="temp_one" title="temp One">
        <FirstTemp />
      </Tab>
      <Tab eventKey="temp_two" title="Temp Two">
        SecTemp{" "}
      </Tab>
    </Tabs>
  );
};

export default Preview;
