import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import Sidebar from '@/components/Sidebar';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import SignUp from '@/pages/SignUp';
import Reviews from '@/pages/Reviews';
import './index.css';

const Router = () => {
  const auth = useSelector((state: RootState) => state.auth.token !== null);
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
          {auth ? (
            // ログイン中
            <>
              <Route path="/" element={<Home />} />
              <Route path="/reviews" element={<Reviews />} />
            </>
          ) : (
            // ログアウト中
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />

              {/* リダイレクト */}
              <Route path="/" element={<Navigate to="/login" replace />} />
            </>
          )}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Router;
