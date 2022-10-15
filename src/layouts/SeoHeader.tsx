import { NextSeo } from 'next-seo';
import React from 'react';
import { useRouter } from 'next/dist/client/router';
import { application } from 'src/constants';

export interface SeoHeaderProps {
  title?: string;
  description?: string;
  image?: string;
  application?: any; // todo
}

const { url, locale, social } = application;

export const SeoHeader = ({
  title = application.title,
  description = application.description,
  image = application.image,
}) => {
  const openGraphImageUrl = `${url}${image}`;
  const pathName = useRouter().pathname;
  const pathFullUrl = pathName === '/' ? url : url + pathName;
  const twitterHandle = social.twitter || '';

  return (
    <NextSeo
      title={title}
      description={description}
      canonical={url}
      openGraph={{
        type: 'website',
        locale,
        url: pathFullUrl,
        title,
        description,
        images: [
          {
            url: openGraphImageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        site_name: title,
      }}
      twitter={{
        handle: twitterHandle,
        site: twitterHandle,
        cardType: 'summary_large_image',
      }}
    />
  );
};
