import BookDetail from '@/components/BookDetail';
import { useParams } from 'react-router-dom';

const ReviewEdit = () => {
  const { id } = useParams();

  return (
    <div className="review-edit">
      <title>書籍レビュー | 編集</title>
      <meta name="description" content="書籍レビューサイトの編集ページです。" />

      <h2 className="mb-3">書籍レビュー編集</h2>
      {id && <BookDetail bookId={id} />}
    </div>
  );
};

export default ReviewEdit;
