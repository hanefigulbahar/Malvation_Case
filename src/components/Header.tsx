import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const logoutHandle = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("status");
    navigate("/login");
  };
  return (
    <header className="w-1/4">
      <div>heder</div>
      <button onClick={logoutHandle}>Çık</button>
    </header>
  );
};

export default Header;
