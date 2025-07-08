import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import styled from '@emotion/styled';
import LogoutButton from './LogoutButton';

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

const Sidebar = () => {
  const auth = useSelector((state: RootState) => state.auth.token !== null);
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <SidebarStyle className="sidebar d-flex flex-column bg-dark text-white">
      <h4 className="p-4">書籍レビューサイト</h4>
      <NavStyle className="flex-column">
        {auth ? (
          <>
            {/* asを使用し、Linkとして扱う */}
            <NavLinkStyle as={Link} to="/">
              ホーム
            </NavLinkStyle>
            <NavLinkStyle as={Link} to="/reviews">
              書籍レビュー一覧
            </NavLinkStyle>
            <NavLinkStyle as={Link} to="/new">
              書籍レビュー投稿
            </NavLinkStyle>
            <NavLinkStyle as={Link} to="/profile">
              プロフィール編集
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
          <div className="py-3">ログイン中 : {user?.name}</div>
          <LogoutButton />
        </div>
      )}
    </SidebarStyle>
  );
};

export default Sidebar;
