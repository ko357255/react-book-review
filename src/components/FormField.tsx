import { Form } from 'react-bootstrap';
import { type UseFormRegisterReturn } from 'react-hook-form';

interface Props {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  accept?: string;
  registerProps: UseFormRegisterReturn; // バリデーションの登録
  error?: string; // フォームのエラーメッセージ
  isTouched?: boolean; // フォームに触れたかどうか
}

const FormField = ({
  id,
  label,
  type = 'text',
  placeholder = '',
  accept,
  registerProps,
  error,
  isTouched,
}: Props) => (
  <Form.Group className="mb-3" controlId={id}>
    <Form.Label>{label}</Form.Label>
    <Form.Control
      // idをつけない（自動付与)
      type={type}
      placeholder={placeholder}
      accept={accept}
      {...registerProps}
      isInvalid={!!error} // エラースタイル
      isValid={isTouched && !error} // 完了スタイル
    />
    <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
  </Form.Group>
);

export default FormField;
