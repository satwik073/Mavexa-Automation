import React from 'react';

type ImageContainerProps = {
  width: number;  
  height: number;
  src: string;
  alt: string;
  className?: string;
  layout?: 'fixed' | 'intrinsic' | 'responsive' | 'fill'; 
  priority?: boolean;
};

const ImageContainer: React.FC<ImageContainerProps> = ({
  width,
  height,
  src,
  alt,
  className,
  layout = 'intrinsic', 
}) => {
  return (
    <img
      src={src}
      width={layout === 'fill' ? undefined : width} 
      height={layout === 'fill' ? undefined : height}
      alt={alt}
      className={className}
    />
  );
}

export default ImageContainer;
