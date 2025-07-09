import { useEffect, useState } from 'react';
import { Button, Form, Image } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import FormField from '@/components/FormField';
import { iconUpload, userUpdate } from '@/api/user';
import { useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store';
import { useDispatch } from 'react-redux';
import { fetchUser } from '@/store/auth';
import { useCompressedImage } from '@/hook/useCompressedImage';

interface SignUpFormData {
  name: string;
  icon: FileList | null;
}

const EditProfileForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [formError, setFormError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [iconUrl, setIconUrl] = useState<string | null>(null);

  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);

  const {
    register,
    handleSubmit,
    reset, // 初期値変更関数
    formState: { dirtyFields },
    watch,
  } = useForm<SignUpFormData>({
    mode: 'all',
    defaultValues: {
      name: user?.name || '',
    },
  });

  const icon = watch('icon');
  const compressedIcon = useCompressedImage(icon ? icon[0] : null);

  useEffect(() => {
    reset({ name: user?.name || '' });
  }, [user, reset]);

  useEffect(() => {
    setIconUrl(user?.iconUrl || null);
  }, [user?.iconUrl]);

  useEffect(() => {
    if (!compressedIcon) return;

    const reader = new FileReader();
    reader.onload = () => {
      setIconUrl(reader.result as string);
    };
    reader.readAsDataURL(compressedIcon);
  }, [compressedIcon]);

  // フォーム送信時の処理
  const onSubmit = async ({ name, icon }: SignUpFormData) => {
    setFormError(null);
    setIsLoading(true);

    try {
      const promises = [];

      // サインアップ
      if (dirtyFields.name) {
        promises.push(userUpdate({ name }));
      }
      if (icon && icon[0] && compressedIcon) {
        promises.push(iconUpload(token, compressedIcon));
      }

      await Promise.all(promises);

      alert(`プロフィールを編集しました`);
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
        registerProps={register('name', {})}
        isValidStyle={false}
      ></FormField>

      {/* アイコン */}
      <FormField
        label="アイコン"
        id="icon"
        type="file"
        accept="image/*"
        registerProps={register('icon', {})}
        isValidStyle={false}
      />

      {/* アイコンプレビュー */}
      {iconUrl && (
        <div className="mb-3">
          <Image
            src={iconUrl}
            alt={'プロフィールアイコン'}
            width={200}
            height={200}
            rounded
            className="border border-dark object-fit-cover object-position-center"
            loading="lazy"
          />
        </div>
      )}

      {/* サインアップボタン */}
      <Button
        variant="primary"
        type="submit"
        className="mb-3"
        disabled={isLoading || Object.keys(dirtyFields).length === 0}
      >
        更新
      </Button>

      {/* フォームエラー */}
      {formError && <div className="text-danger">{formError}</div>}
    </Form>
  );
};

export default EditProfileForm;
