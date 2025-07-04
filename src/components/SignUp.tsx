import { useEffect, useState } from 'react';
import { Button, Form, Image } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Compressor from 'compressorjs';
import { useNavigate } from 'react-router-dom';
import FormField from './FormField';
import { iconUpload, userCreate } from '@/api/api';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  icon: FileList;
}

const SignUpForm = () => {
  const [formError, setFormError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [iconUrl, setIconUrl] = useState<string | null>(null);
  const [compresedIcon, setCompresedIcon] = useState<File | Blob | null>(null);

  const navigate = useNavigate();

  const {
    register, // 登録関数
    handleSubmit, // 送信時の関数
    formState: { errors, touchedFields },
    watch, // 値の監視関数
  } = useForm<SignUpFormData>({
    mode: 'all',
  });

  // フォーム送信時の処理
  const onSubmit = async ({ name, email, password }: SignUpFormData) => {
    if (!compresedIcon) {
      setFormError('アイコンが選択されていません');
      return;
    }

    setFormError(null);
    setIsLoading(true);
    try {
      // サインアップ
      const { token } = await userCreate({ name, email, password });
      // アイコンアップロード
      await iconUpload(token, compresedIcon);

      alert('新規登録が完了しました');
      navigate('/login');
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

  // 入力を監視
  const password = watch('password');
  const icon = watch('icon');

  // compresedIconを描写する
  useEffect(() => {
    if (!compresedIcon) {
      setIconUrl(null);
      return;
    }
    const render = new FileReader();
    render.onload = () => {
      setIconUrl(render.result as string);
    };
    render.readAsDataURL(compresedIcon);
  }, [compresedIcon]);

  // 画像の圧縮
  useEffect(() => {
    if (!icon || icon.length === 0) {
      setCompresedIcon(null);
      return;
    }
    new Compressor(icon[0], {
      convertSize: 1024, // 1M未満に圧縮
      success: (result) => {
        // result には File が入る
        setCompresedIcon(result);
      },
    });
  }, [icon]);

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

      {/* メールアドレス */}
      <FormField
        label="メールアドレス"
        id="email"
        type="email"
        placeholder="example@email.com"
        registerProps={register('email', {
          required: 'メールアドレスを入力してください',
          pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: '有効なメールアドレスを入力してください',
          },
        })}
        error={errors.email?.message}
        isTouched={touchedFields.email}
      />

      {/* パスワード */}
      <FormField
        label="パスワード"
        id="password"
        type="password"
        registerProps={register('password', {
          required: 'パスワードを入力してください',
        })}
        error={errors.password?.message}
        isTouched={touchedFields.password}
      />

      {/* パスワード */}
      <FormField
        label="パスワード(再確認)"
        id="confirmPassword"
        type="password"
        registerProps={register('confirmPassword', {
          required: 'パスワード(再確認)を入力してください',
          validate: (
            value, // カスタムバリデーション
          ) => value === password || 'パスワードが一致しません',
        })}
        error={errors.confirmPassword?.message}
        isTouched={touchedFields.confirmPassword}
      />

      {/* アイコン */}
      <FormField
        label="アイコン"
        id="icon"
        type="file"
        accept="image/*"
        registerProps={register('icon', {
          required: 'アイコンを設定してください',
        })}
        error={errors.icon?.message}
        isTouched={touchedFields.icon}
      />

      {/* アイコンプレビュー */}
      {icon && icon[0] && iconUrl && (
        <div className="mb-3">
          <Image
            src={iconUrl}
            alt={icon[0].name || '無題のアイコン'}
            width={200}
            height={200}
            rounded
            className="border border-dark"
            style={{
              objectFit: 'cover',
              objectPosition: 'cover',
            }}
          />
        </div>
      )}

      {/* サインアップボタン */}
      <Button
        variant="primary"
        type="submit"
        className="mb-3"
        disabled={isLoading}
      >
        新規登録
      </Button>

      {/* フォームエラー */}
      {formError && <div className="text-danger">{formError}</div>}
    </Form>
  );
};

export default SignUpForm;
