import Link from 'next/link';
import React from 'react';

type GalleryImageProps = {
  src: string;
  name: string;
  link: string;
};

type GalleryImagesContainerProps = {
  images: GalleryImageProps[];
};

export const GalleryImage: React.FC<GalleryImageProps> = ({
  src,
  name,
  link,
}) => {
  return (
    <div className="w-full mx-4 mb-20 lg:w-1/5 lg:h-full md:w-1/3 ctm-gallery-link">
      <Link href={link}>
        <a className="relative block h-full overflow-hidden rounded">
          <img
            alt="ecommerce"
            className="block object-cover object-center w-full h-full cursor-pointer"
            src={src}
          />
        </a>
      </Link>
      <div className="mt-4">
        <Link href={link}>
          <a className="text-lg font-medium title-font cursor-pointer">
            {name}
          </a>
        </Link>
      </div>
    </div>
  );
};

export const GalleryImagesContainer: React.FC<GalleryImagesContainerProps> = ({
  images,
}) => {
  return (
    <div className="flex flex-wrap -m-4 justify-center">
      {images.map((imageContent: GalleryImageProps, index: number) => (
        <GalleryImage key={index} {...imageContent} />
      ))}
    </div>
  );
};
