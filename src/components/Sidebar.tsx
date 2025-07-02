import '@/components/Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar bg-dark text-white p-4">
      <nav>
        <h4>サイドバー</h4>
        <ul>
          <li>
            <Link to={'/'}>ホーム</Link>
          </li>
          <li>
            <Link to={'/login'}>ログイン</Link>
          </li>
          <li>
            <Link to={'/signup'}>新規登録</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
