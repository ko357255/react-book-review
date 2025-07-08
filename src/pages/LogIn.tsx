import LoginForm from '@/components/LoginForm';

const Login = () => {
  return (
    <div className="login">
      <title>書籍レビュー | ログイン</title>
      <meta
        name="description"
        content="書籍レビューサイトのログインページです。"
      />

      <h2 className="mb-3">ログイン</h2>
      <LoginForm />
    </div>
  );
};

export default Login;
