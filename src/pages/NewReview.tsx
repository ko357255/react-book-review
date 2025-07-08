import NewReviewForm from '@/components/NewReviewForm';

const NewReview = () => {
  return (
    <div className="new-review">
      <title>書籍レビュー | 投稿</title>
      <meta
        name="description"
        content="書籍レビューサイトのレビュー投稿ページです。"
      />

      <h2 className="mb-3">書籍レビュー投稿</h2>
      <NewReviewForm />
    </div>
  );
};

export default NewReview;
