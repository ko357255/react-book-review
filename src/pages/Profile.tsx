import ProfileEditForm from '@/components/ProfileEditForm';

const Profile = () => {
  return (
    <div className="login">
      <title>書籍レビュー | プロフィール編集</title>
      <meta
        name="description"
        content="書籍レビューサイトのプロフィール編集ページです"
      />

      <h2 className="mb-3">プロフィール編集</h2>
      <ProfileEditForm />
    </div>
  );
};

export default Profile;
