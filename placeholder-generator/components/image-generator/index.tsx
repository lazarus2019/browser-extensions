import { ChangeEvent, useState } from 'react';

import styles from './style.module.css';
import PreviewImage from '../preview-image';
import { generateCanvasPlaceholder } from '../../utils';

type ImageGeneratorProps = {
  width?: number;
  height?: number;
};

function ImageGenerator({ width = 400, height = 300 }: ImageGeneratorProps) {
  const [url, setUrl] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({
    width,
    height,
  });

  const handleDimensionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputData = e.target;
    setDimensions((prev) => ({ ...prev, [inputData.name]: inputData.value }));
  };

  const handleGenerateImage = () => {
    const urlBase64 = generateCanvasPlaceholder({
      ...dimensions,
    });

    console.log({ urlBase64 });
    setUrl(urlBase64);
  };

  return (
    <div className={styles['image-generator-container']}>
      <div className={styles['dimensions']}>
        <input
          value={dimensions.width}
          type="number"
          min={1}
          name="width"
          onChange={handleDimensionChange}
        />
        <span>X</span>
        <input
          value={dimensions.height}
          type="number"
          min={1}
          name="height"
          onChange={handleDimensionChange}
        />
        <button
          className={styles['btn-generate']}
          onClick={handleGenerateImage}
        >
          Generate
        </button>
      </div>

      <PreviewImage url={url} />
    </div>
  );
}

export default ImageGenerator;
