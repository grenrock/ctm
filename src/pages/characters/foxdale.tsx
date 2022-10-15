import React from 'react';
import { AboutLayout } from '@/layouts';
import { AboutHeader, AboutParagraph, AboutImage } from '@/components';

const FoxdalePage = () => {
  return (
    <AboutLayout>
      <AboutHeader text={'Foxdale Axelrod'} />
      <AboutParagraph
        text={'Foxdale sucks. Everything sucks. This is gay. Poop.'}
      />
      <AboutImage
        src="https://foxdale-images-202205271037.s3.us-west-1.amazonaws.com/foxdale+1.jpg"
        caption="dumb"
      />
    </AboutLayout>
  );
};

export default FoxdalePage;

FoxdalePage.getSeo = function getSeo() {
  const props = {
    title: 'Gay Fox',
    description: null,
  };
  return props;
};
