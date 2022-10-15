import React from 'react';
import { GalleryLayout } from '@/layouts';
import { GalleryImagesContainer, PageTitle } from '@/components';

const root = 'comics';
const comicsDb = [
  {
    name: 'Sweet Home New Jersey',
    src: 'https://foxdale-images-202205271037.s3.us-west-1.amazonaws.com/shnj-cover.JPG',
    link: `${root}/shnj`,
  },
];

export default function ComicsPage() {
  return (
    <>
      <PageTitle pageTitle="Mr. Foxdale's Neighborhood" description={null} />
      <GalleryLayout>
        <GalleryImagesContainer images={comicsDb} />
      </GalleryLayout>
    </>
  );
}

ComicsPage.getSeo = function getSeo() {
  const props = {
    title: 'The Worst Stories Ever Told',
    description: null,
  };
  return props;
};
