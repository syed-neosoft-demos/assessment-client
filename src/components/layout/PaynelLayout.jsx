import "../panel/Panel.css";
import Sidebar from "../panel/shared/Sidebar";
import TopHeader from "../panel/shared/TopHeader";

const PanelLayout = ({ children }) => {
  return (
    <div>
      <div className="grid">
        <TopHeader />
        <Sidebar />
        {children}
        <footer className="footer-main">
          <p>A NeoSOFT Assessment App @2024 by SHM</p>
        </footer>
      </div>
    </div>
  );
};

export default PanelLayout;
