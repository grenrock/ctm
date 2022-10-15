import React from 'react';
import { GalleryLayout } from '@/layouts';
import { GalleryImagesContainer, PageTitle } from '@/components';
import { application } from '@/constants';

const root = 'characters';
const charactersDb = [
  {
    name: 'Foxdale Axelrod',
    src: 'https://foxdale-images-202205271037.s3.us-west-1.amazonaws.com/foxdale.jpg',
    link: `${root}/foxdale`,
  },
  {
    name: 'Huntley French',
    src: 'https://foxdale-images-202205271037.s3.us-west-1.amazonaws.com/huntley.jpg',
    link: `${root}/huntley`,
  },
  {
    name: 'Roscoe Raleigh',
    src: 'https://foxdale-images-202205271037.s3.us-west-1.amazonaws.com/roscoe.jpg',
    link: `${root}/roscoe`,
  },
  {
    name: 'Grant Sloan',
    src: 'https://foxdale-images-202205271037.s3.us-west-1.amazonaws.com/grant.jpg',
    link: `${root}/grant`,
  },
];

export default function CharactersPage() {
  return (
    <>
      <PageTitle pageTitle="Mr. Foxdale's Neighborhood" description={null} />
      <GalleryLayout>
        <GalleryImagesContainer images={charactersDb} />
      </GalleryLayout>
    </>
  );
}

CharactersPage.getSeo = function getSeo() {
  const props = {
    title: 'Designated Smoking Area',
    description: application.description,
  };
  return props;
};
