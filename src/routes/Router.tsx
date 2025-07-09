import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import Sidebar from '@/components/Sidebar';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import SignUp from '@/pages/SignUp';
import Reviews from '@/pages/Reviews';
import styled from '@emotion/styled';
import Profile from '@/pages/Profile';
import NewReview from '@/pages/NewReview';
import ReviewDetail from '@/pages/detail/[id]/ReviewDetail';

const MainContentStyle = styled.div`
  height: 100vh;
  background-color: white;
`;

const Router = () => {
  const auth = useSelector((state: RootState) => state.auth.token !== null);
  return (
    <BrowserRouter>
      {/* サイドバー(左) */}
      <Sidebar />
      {/* メインコンテンツ(右) */}
      <MainContentStyle className="main-content flex-grow-1 p-5 overflow-y-auto">
        <Routes>
          {auth ? (
            // ログイン中
            <>
              <Route path="/" element={<Home />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/new" element={<NewReview />} />
              <Route path="/detail/:id" element={<ReviewDetail />} />

              {/* リダイレクト */}
              <Route
                path="/login"
                element={<Navigate to="/reviews" replace />}
              />
              <Route
                path="/signup"
                element={<Navigate to="/reviews" replace />}
              />
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
      </MainContentStyle>
    </BrowserRouter>
  );
};

export default Router;
