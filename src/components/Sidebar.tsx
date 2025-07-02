import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div
      className="sidebar bg-dark text-white p-4"
      style={{
        width: '220px',
        height: '100vh',
      }}
    >
      <h4>サイドバー</h4>
      <Nav className="flex-column">
        <Nav.Item>
          {/* asを使用し、Linkとして扱う */}
          <Nav.Link as={Link} to="/">
            ホーム
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/login">
            ログイン
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/signup">
            新規登録
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Sidebar;
