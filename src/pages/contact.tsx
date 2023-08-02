import React from 'react';
import { application } from 'src/constants';
import {
  Input,
  TextInput,
  Textarea,
  Button,
  Group,
  Loader,
} from '@mantine/core';
import { useId } from '@mantine/hooks';
import { IMaskInput } from 'react-imask';
import { useState } from 'react';

type ContactPageProps = {
  isFirstMount: boolean;
  signedIn: boolean;
};

function ContactPage(props: ContactPageProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [assocName, setAssocName] = useState('');
  const [assocAddr, setAssocAddr] = useState('');
  const [details, setDetails] = useState('');
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendFailure, setSendFailure] = useState(false);
  const [loading, setLoading] = useState(false);
  const id = useId();
  const send = () => {
    setLoading(true);
    fetch('api/b1/contact', {
      method: 'POST',
      body: JSON.stringify({
        name,
        phone,
        email,
        assocName,
        assocAddr,
        details,
      }),
    }).then((res) => {
      setLoading(false);
      if (res.status === 201) {
        sessionStorage.setItem('contact', 'success');
        setSendSuccess(true);
      } else {
        setSendFailure(true);
      }
    });
  };

  if (sendSuccess || sessionStorage.getItem('contact')) {
    return (
      <div className="mx-auto -mt-24 flex items-center justify-center h-screen text-base lg:w-1/4 md:w-2/3 text-gray-500">
        <Group position="center">
          Thank you for your inquiry. Someone will reach out to you within 24
          hours.
        </Group>
      </div>
    );
  }

  if (sendFailure) {
    return (
      <div className="mx-auto -mt-24 flex items-center justify-center h-screen text-base lg:w-1/4 md:w-2/3 text-gray-500">
        <Group position="center">
          Something went wrong. Please try again later.
        </Group>
      </div>
    );
  }

  return (
    <div className="mx-auto px-8 text-base lg:w-1/4 md:w-2/3 leading-relaxed text-gray-500">
      <TextInput
        className="mb-4"
        label="Name"
        value={name}
        onChange={(event) => setName(event.currentTarget.value)}
      />
      <Input.Wrapper className="mb-4" id={id} label="Phone Number">
        <Input<any>
          component={IMaskInput}
          mask="(000) 000-0000"
          id={id}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setPhone(event.currentTarget.value)
          }
        />
      </Input.Wrapper>
      <TextInput
        className="mb-4"
        label="Email"
        value={email}
        onChange={(event) => setEmail(event.currentTarget.value)}
      />
      <TextInput
        className="mb-4"
        label="Association Name"
        value={assocName}
        onChange={(event) => setAssocName(event.currentTarget.value)}
      />
      <TextInput
        className="mb-4"
        label="Association Address"
        value={assocAddr}
        onChange={(event) => setAssocAddr(event.currentTarget.value)}
      />
      <Textarea
        className="mb-4"
        label="Additional Details"
        value={details}
        onChange={(event) => {
          setDetails(event.currentTarget.value);
        }}
      />
      <Group position="center">
        <Button
          onClick={() => {
            send();
          }}
          variant="outline"
        >
          Submit
        </Button>
      </Group>
      <Group position="center" className="mt-4">
        <p>Hablamos español</p>
      </Group>
      <Group position="center">
        <p>Nous parlons français</p>
      </Group>
      <Group position="center">
        <p>ما فارسی صحبت می کنیم</p>
      </Group>
      <Group position="center">
        <p>Մենք խոսում ենք հայերեն</p>
      </Group>
      {loading && (
        <Group position="center" className="mt-4">
          <Loader />
        </Group>
      )}
    </div>
  );
}

export default ContactPage;

ContactPage.getSeo = function getSeo() {
  const props = {
    title: application.title,
    description: application.description,
  };
  return props;
};
