// // src/Userdashbord/Pages/Logout.js
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// function UserLogout() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     localStorage.clear(); // ✅ Clear login info

//     // Redirect to landing page
//     setTimeout(() => {
//       navigate("/"); // ✅ This is usually your Home
//     }, 100);
//   }, [navigate]);

//   return null; // No UI
// }

// export default UserLogout;






import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
    navigate("/");
  }, [navigate]);

  return null;
}

export default Logout;
