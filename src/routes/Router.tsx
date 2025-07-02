import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import SignUp from '@/pages/SignUp';
import './index.css';

const Router = () => {
  return (
    <BrowserRouter>
      {/* サイドバー(左) */}
      <Sidebar />
      {/* メインコンテンツ(右) */}
      <div className="main-content flex-grow-1 p-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Router;
