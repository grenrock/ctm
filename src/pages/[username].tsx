import React, { useEffect, useState } from 'react';
import { AboutLayout } from '@/layouts';
import { AboutHeader, AboutParagraph, AboutImage } from '@/components';
import { getBaseApiUrl, ok } from '@/utils/api';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import Loading from '@/components/Loading';

type User = {
  id: number;
  username: string;
  displayName: string;
  bio: string;
  pfp: string;
};

const UserPage = () => {
  const router = useRouter();
  const [status, setStatus] = useState(0);
  const [pageContent, setPageContent] = useState<User | null>(null);
  const [selfBrowse, setSelfBrowse] = useState(false);
  useEffect(() => {
    if (router.isReady) {
      fetch(
        `api/${process.env.NEXT_PUBLIC_API_VERSION}/user/${router.query.username}`,
      ).then((userRes) => {
        if (ok(userRes)) {
          userRes.json().then((user) => {
            setSelfBrowse(user.id === getCookie('uid'));
            setPageContent(user);
          });
        }
        setStatus(userRes.status);
      });
    }
  }, [router]);
  if (status === 0) {
    return <Loading />;
  }
  if (status === 404) {
    return <>not found</>;
  }
  if (status === 403) {
    return <>blocked haha</>;
  }
  if (status === 200) {
    return <>gr8</>;
  }
};

export default UserPage;
