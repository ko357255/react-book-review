import { logout } from '@/store/auth';
import styled from '@emotion/styled';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LogoutStyle = styled(Button)`
  width: 100%;
`;

const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // ログアウト処理
    dispatch(logout());

    // 履歴を残さずログインに遷移
    navigate('/login', { replace: true });
  };

  return (
    <LogoutStyle onClick={handleLogout} variant="outline-primary">
      ログアウト
    </LogoutStyle>
  );
};

export default LogoutButton;
