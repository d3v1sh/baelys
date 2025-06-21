import React, { useMemo } from 'react';
import { Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';

const ImageLayer = ({ imageUrl, stageWidth, stageHeight }) => {
  const [image] = useImage(imageUrl, 'anonymous');

  const imageDimensions = useMemo(() => {
    if (!image || !stageWidth || !stageHeight) return { width: 0, height: 0, x: 0, y: 0 };

    // Since the stage dimensions are now calculated based on the actual image size,
    // we can simply fill the entire stage
    return { 
      width: stageWidth, 
      height: stageHeight, 
      x: 0, 
      y: 0 
    };
  }, [image, stageWidth, stageHeight]);

  return <KonvaImage image={image} {...imageDimensions} />;
};

export default ImageLayer; 