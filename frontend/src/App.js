import React, {useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Component/login";
import Signup from "./Component/signup";
import Favourite from "./Pages/favourite";
import Home from "./Pages/home";
import { Toaster } from "react-hot-toast";
import { isLoggedIn } from "./Action/authAction";
import { useDispatch, useSelector } from "react-redux";


function App() {
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.auth.authenticated);

  useEffect(() => {
    if (!authenticated) {
      dispatch(isLoggedIn());
    }
  }, [dispatch, authenticated]);
  
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={true} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/favourite" element={<Favourite />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
