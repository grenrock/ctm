import React from 'react';
import { AboutLayout } from '@/layouts';
import { AboutHeader, AboutParagraph } from '@/components';

const FoxdalePage = () => {
  return (
    <AboutLayout>
      <AboutHeader text={'Huntley French'} />
      <AboutParagraph text={'hi'} />
    </AboutLayout>
  );
};

export default FoxdalePage;

FoxdalePage.getSeo = function getSeo() {
  const props = {
    title: 'Trash Ferret',
    description: null,
  };
  return props;
};
