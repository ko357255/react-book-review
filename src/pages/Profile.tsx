import EditProfileForm from '@/components/EditProfileForm';

const Profile = () => {
  return (
    <div className="login">
      <title>書籍レビュー | プロフィール編集</title>
      <meta
        name="description"
        content="書籍レビューサイトのプロフィール編集ページです"
      />

      <h2 className="mb-3">プロフィール編集</h2>
      <EditProfileForm />
    </div>
  );
};

export default Profile;
