import { Button, Nav } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '@/store/auth';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth.token !== null);

  const handleOnClick = () => {
    // ログアウト処理
    dispatch(logout());
    localStorage.removeItem('authToken');
    // 履歴を残さずログインに遷移
    navigate('/login', { replace: true });
  };

  const linkStyle: React.CSSProperties = {
    borderBottom: '2px solid var(--bs-gray-700)',
    textAlign: 'left', // 左寄せ
  };

  return (
    <div
      className="sidebar d-flex flex-column bg-dark text-white p-4"
      style={{
        minWidth: '220px',
        height: '100vh',
      }}
    >
      <h4>サイドバー</h4>
      <Nav
        className="flex-column"
        style={{
          height: '100%',
        }}
      >
        {auth ? (
          <>
            {/* asを使用し、Linkとして扱う */}
            <Nav.Link as={Link} to="/" style={linkStyle}>
              ホーム
            </Nav.Link>
            <Nav.Link as={Link} to="/reviews" style={linkStyle}>
              書籍レビュー
            </Nav.Link>
          </>
        ) : (
          <>
            <Nav.Item>
              <Nav.Link as={Link} to="/login" style={linkStyle}>
                ログイン
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/signup" style={linkStyle}>
                新規登録
              </Nav.Link>
            </Nav.Item>
          </>
        )}
      </Nav>
      {auth && (
        <Button onClick={handleOnClick} variant="outline-primary">
          ログアウト
        </Button>
      )}
    </div>
  );
};

export default Sidebar;
