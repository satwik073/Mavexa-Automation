


import { Button } from "@/Components/Images/External/UI/button";
import { set_token } from "@/Store/authSlice";
import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const UserVerificationRequests = () => {
  const navigate = useNavigate();
  const [is_logged_in, setIsLoggedIn] = useState<boolean>(localStorage.getItem('User-Settings') ? true : false); // Check token presence
  const dispatch = useDispatch()
  const handle_clear = () => {
      localStorage.removeItem('User-Settings');
      setIsLoggedIn(false);
      dispatch(set_token(null))
      navigate('/');
      console.log("Clicked Logout");
    };

  return (
    <div>UserVerificationRequests
      <Button onClick={handle_clear}>Logout</Button>
    </div>

  )
}

export default UserVerificationRequests