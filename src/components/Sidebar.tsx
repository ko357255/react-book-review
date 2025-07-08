import { Button, Nav } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '@/store/auth';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import styled from '@emotion/styled';

const SidebarStyle = styled.div`
  min-width: 220px;
  height: 100vh;
`;

const NavStyle = styled(Nav)`
  height: 100%;
`;

const NavLinkStyle = styled(Nav.Link)`
  border-bottom: 2px solid var(--bs-gray-700);
  text-align: left;
`;

const LogoutStyle = styled(Button)`
  width: 100%;
`;

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth.token !== null);

  const handleLogout = () => {
    // ログアウト処理
    dispatch(logout());

    // 履歴を残さずログインに遷移
    navigate('/login', { replace: true });
  };

  return (
    <SidebarStyle className="sidebar d-flex flex-column bg-dark text-white">
      <h4 className="p-4">サイドバー</h4>
      <NavStyle className="flex-column">
        {auth ? (
          <>
            {/* asを使用し、Linkとして扱う */}
            <NavLinkStyle as={Link} to="/">
              ホーム
            </NavLinkStyle>
            <NavLinkStyle as={Link} to="/reviews">
              書籍レビュー
            </NavLinkStyle>
          </>
        ) : (
          <>
            <NavLinkStyle as={Link} to="/login">
              ログイン
            </NavLinkStyle>
            <NavLinkStyle as={Link} to="/signup">
              新規登録
            </NavLinkStyle>
          </>
        )}
      </NavStyle>
      {auth && (
        <div className="p-4">
          <LogoutStyle onClick={handleLogout} variant="outline-primary">
            ログアウト
          </LogoutStyle>
        </div>
      )}
    </SidebarStyle>
  );
};

export default Sidebar;
