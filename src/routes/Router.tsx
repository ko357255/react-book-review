import Sidebar from "@/components/Sidebar";
import Home from "@/pages/Home";
import LogIn from "@/pages/LogIn";
import NotFound from "@/pages/NotFound";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <BrowserRouter>
      <Sidebar />
      <div className="main-content flex-grow-1 p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Router;
