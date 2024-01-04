import "../auth/Auth.css";

const AuthLayout = ({ children }) => {
  return (
    <>
      <div className="auth-container">
        <div className="auth-layout">
          <aside className="auth-aside">
            <h3>Resume Builder App. By Hasnain</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In iste
              placeat harum
            </p>
          </aside>
          {children}
        </div>
        <footer className="footer">
          A NeoSOFT Assessment App @2024 by SHM{" "}
        </footer>
      </div>
    </>
  );
};

export default AuthLayout;
