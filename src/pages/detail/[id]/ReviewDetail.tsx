import BookDetail from '@/components/BookDetail';
import { useParams } from 'react-router-dom';

const ReviewDetail = () => {
  const { id } = useParams();

  return (
    <div className="review-detail">
      <title>書籍レビュー | 詳細</title>
      <meta name="description" content="書籍レビューサイトの詳細ページです。" />

      <h2 className="mb-3">書籍レビュー詳細</h2>
      {id && <BookDetail bookId={id} />}
    </div>
  );
};

export default ReviewDetail;
