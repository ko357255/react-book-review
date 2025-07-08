import SignUpForm from '@/components/SignUp';

const SignUp = () => {
  return (
    <div className="SignUp">
      <title>書籍レビュー | 一覧</title>
      <meta
        name="description"
        content="書籍レビューサイトの新規登録ページです。"
      />

      <h2>新規登録</h2>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
