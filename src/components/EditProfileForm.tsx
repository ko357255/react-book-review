import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import FormField from '@/components/FormField';
import { userUpdate } from '@/api/user';
import { useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store';
import { useDispatch } from 'react-redux';
import { fetchUser } from '@/store/auth';

interface SignUpFormData {
  name: string;
}

const EditProfileForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [formError, setFormError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector((state: RootState) => state.auth.user);

  const {
    register,
    handleSubmit,
    reset, // 初期値変更関数
    formState: { errors, touchedFields },
  } = useForm<SignUpFormData>({
    mode: 'all',
    defaultValues: {
      name: user?.name || '',
    },
  });

  useEffect(() => {
    reset({ name: user?.name || '' });
  }, [user, reset]);

  // フォーム送信時の処理
  const onSubmit = async ({ name }: SignUpFormData) => {
    setFormError(null);
    setIsLoading(true);
    try {
      // サインアップ
      const { name: updateName } = await userUpdate({ name });

      alert(`プロフィールを編集しました ${updateName}`);
      dispatch(fetchUser());
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
    // noValidate: ブラウザのバリデートをオフ
    // onSubmit にはフォームの値が渡される
    <Form noValidate onSubmit={handleSubmit(onSubmit)}>
      {/* 名前 */}
      <FormField
        label="ユーザー名"
        id="name"
        type="text"
        placeholder=""
        registerProps={register('name', {
          required: 'ユーザー名を入力してください',
        })}
        error={errors.name?.message}
        isTouched={touchedFields.name}
      ></FormField>

      {/* サインアップボタン */}
      <Button
        variant="primary"
        type="submit"
        className="mb-3"
        disabled={isLoading}
      >
        更新
      </Button>

      {/* フォームエラー */}
      {formError && <div className="text-danger">{formError}</div>}
    </Form>
  );
};

export default EditProfileForm;
