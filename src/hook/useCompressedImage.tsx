import Compressor from 'compressorjs';
import { useEffect, useState } from 'react';

// 画像圧縮のカスタムフック
export const useCompressedImage = (file: File | null) => {
  const [compressed, setCompressed] = useState<File | null>(null);

  useEffect(() => {
    if (!file) {
      setCompressed(null);
      return;
    }

    new Compressor(file, {
      convertSize: 1024, // 1M未満に圧縮
      success: (result) => {
        // result には Blob が入る
        const compressedFile = new File([result], file.name, {
          type: file.type,
        });
        setCompressed(compressedFile);
      },
      error: () => {
        setCompressed(null);
      },
    });
  }, [file]);

  // 圧縮画像を返す
  return compressed;
};
