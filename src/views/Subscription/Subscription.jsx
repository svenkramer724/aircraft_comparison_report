import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Subscription = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  useEffect(() => {
    sessionStorage.setItem("token", "enabled");
    navigate("/", { state: { prevRoute: pathname } });
  }, []);
  return (
    <div>
      <center>Redirecting</center>
    </div>
  );
};

export default Subscription;
