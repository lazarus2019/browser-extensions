import clsx from 'classnames';

import { copyToClipboard, downloadImage } from '../../utils';
import styles from './style.module.css';

type PreviewImageProps = {
  url: string | null;
};

function PreviewImage({ url }: PreviewImageProps) {
  const disableBtn = Boolean(url);

  const handleCopyToClipboard = () => {
    if (url) copyToClipboard(url);
  };

  const handleDownload = () => {
    if (url) downloadImage(url);
  };

  return (
    <div className={styles['preview-image-container']}>
      <div className={styles['image-preview']}>
        {url && <img src={url} alt="Placeholder image" />}
      </div>
      <div className={styles['control-btn']}>
        <button
          className={clsx(styles['button'])}
          onClick={handleCopyToClipboard}
          disabled={disableBtn}
        >
          Copy Base64
        </button>
        <button
          className={clsx(styles['button'])}
          onClick={handleDownload}
          disabled={disableBtn}
        >
          Download
        </button>
      </div>
    </div>
  );
}

export default PreviewImage;
