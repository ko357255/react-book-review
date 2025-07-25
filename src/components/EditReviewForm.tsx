import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { bookDelete, bookGet, bookUpdate, type BookData } from '@/api/book';
import FormField from '@/components/FormField';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

interface ReviewFormData {
  title: string;
  url: string;
  detail: string;
  review: string;
}

const EditReviewForm = ({ bookId }: { bookId: string }) => {
  const [formError, setFormError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [book, setBook] = useState<BookData | null>(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields },
  } = useForm<ReviewFormData>({
    mode: 'all',
  });

  useEffect(() => {
    const fetchBook = async () => {
      setIsLoading(true);
      setFormError(null);

      try {
        const book = await bookGet({ id: bookId });
        setBook(book);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setFormError(e.message);
        } else {
          setFormError('予期せぬエラーが発生しました');
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchBook();
  }, [bookId]);

  useEffect(() => {
    reset({
      title: book?.title || '',
      url: book?.url || '',
      detail: book?.detail || '',
      review: book?.review || '',
    });
  }, [book, reset]);

  const onSubmit = async ({ title, url, detail, review }: ReviewFormData) => {
    setFormError(null);
    if (!book?.id) {
      setFormError('書籍レビューが見つかりません');
      return;
    }

    if (!book?.isMine) {
      setFormError('レビューを編集する権限がありません');
      return;
    }

    setIsLoading(true);
    try {
      await bookUpdate(book?.id, {
        title,
        url,
        detail,
        review,
      });
      // キャッシュに再取得を促す
      queryClient.invalidateQueries({ queryKey: ['books'] });

      alert(`書籍レビューを編集しました`);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setFormError(e.message);
      } else {
        setFormError('予期せぬエラーが発生しました');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setFormError(null);
    if (!book?.id) {
      setFormError('書籍レビューが見つかりません');
      return;
    }

    if (!book?.isMine) {
      setFormError('レビューを編集する権限がありません');
      return;
    }

    const confirmDelete = window.confirm(
      'この書籍レビューを本当に削除しますか？',
    );
    if (!confirmDelete) return;

    setIsLoading(true);

    try {
      await bookDelete(book.id);
      queryClient.invalidateQueries({ queryKey: ['books'] });
      alert('書籍レビューを削除しました');
      navigate('/reviews');
    } catch (e: unknown) {
      if (e instanceof Error) {
        setFormError(e.message);
      } else {
        setFormError('予期せぬエラーが発生しました');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
      <FormField
        label="書籍タイトル"
        id="title"
        type="text"
        registerProps={register('title', {
          required: '書籍タイトルを入力してください',
        })}
        error={errors.title?.message}
        isTouched={touchedFields.title}
      />

      <FormField
        label="書籍情報参照URL"
        id="url"
        type="text"
        registerProps={register('url', {
          required: '書籍情報参照URLを入力してください',
        })}
        error={errors.url?.message}
        isTouched={touchedFields.url}
      />

      <FormField
        label="書籍詳細情報"
        id="detail"
        type="text"
        registerProps={register('detail', {
          required: '書籍詳細情報',
        })}
        error={errors.detail?.message}
        isTouched={touchedFields.detail}
      />

      <FormField
        label="感想"
        id="review"
        type="text"
        registerProps={register('review', {
          required: '感想を入力してください',
        })}
        error={errors.review?.message}
        isTouched={touchedFields.review}
      />

      <div className="d-flex justify-content-start mb-3">
        <Button variant="primary" type="submit" disabled={isLoading}>
          編集
        </Button>
        <Button
          variant="danger"
          className="ms-2"
          onClick={handleDelete}
          disabled={isLoading}
        >
          削除
        </Button>
      </div>

      {/* フォームエラー */}
      {formError && <div className="text-danger">{formError}</div>}
    </Form>
  );
};

export default EditReviewForm;
