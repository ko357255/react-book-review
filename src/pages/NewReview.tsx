import NewReviewForm from '@/components/NewReviewForm';

const NewReview = () => {
  return (
    <div className="new-review">
      <h2 className="mb-3">書籍レビュー投稿</h2>
      <NewReviewForm />
    </div>
  );
};

export default NewReview;
