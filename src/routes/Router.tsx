import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import SignUp from '@/pages/SignUp';
import './index.css';
import { useEffect, useState } from 'react';

const Router = () => {
  const [auth, setAuth] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setAuth(!!token);
  }, []);

  return (
    <BrowserRouter>
      {/* サイドバー(左) */}
      <Sidebar />
      {/* メインコンテンツ(右) */}
      <div
        className="main-content flex-grow-1 p-5 overflow-y-auto"
        style={{
          height: '100vh',
        }}
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {auth ? (
            // ログイン中
            <Route path="/" element={<Home />} />
          ) : (
            // <Navigate> 描写すると遷移する
            <Route path="/" element={<Navigate to="/login" replace />} />
          )}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Router;
