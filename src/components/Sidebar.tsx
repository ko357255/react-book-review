import '@/components/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar bg-dark text-white p-4">
      <nav>
        <h4>サイドバー</h4>
        <ul>
          <li>ホーム</li>
          <li>ログイン</li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
