import { useNavigate } from "react-router-dom";

const LogoutLink = () => {
  const navigate = useNavigate();

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Clear user data
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("name");

    alert("You have been logged out ✅");
    navigate("/login"); // Redirect to login
  }

  return {handleLogout}

}

export default LogoutLink;