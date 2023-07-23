import { useEffect, useState } from 'react';

const useCachedImage = (src) => {
  const [cachedImage, setCachedImage] = useState(null);

  useEffect(() => {
    const imageCacheKey = `cached-image:${src}`;
    const cachedImage = localStorage.getItem(imageCacheKey);

    if (cachedImage) {
      setCachedImage(cachedImage);
    } else {
      fetch(src)
        .then((response) => response.blob())
        .then((blob) => {
          const reader = new FileReader();
          reader.onload = () => {
            const base64Image = reader.result;
            setCachedImage(base64Image);

            // Store the image in the cache
            localStorage.setItem(imageCacheKey, base64Image);
          };
          reader.readAsDataURL(blob);
        });
    }
  }, [src]);

  return cachedImage;
};

export default useCachedImage;
