import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { LoadingOverlay, Modal, Tooltip, useMantineTheme } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { useForm } from 'react-hook-form';
import { ok } from '@/utils/api';
import { useRouter } from 'next/router';
import { ErrorCodes } from '@/dto';
import { SignUpErrorCodes } from '@/dto/sign-up';
import { animationDuration } from '@/constants';

type SignUpPageProps = {
  signedIn: boolean;
};

const contentAnimation = {
  animate: {
    transition: { staggerChildren: 0.1 },
  },
};

const titleAnimation = {
  initial: { y: 0, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: animationDuration,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

const inputsAnimation = {
  initial: { y: 0, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: animationDuration,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

const inputResponseAnimation = {
  initial: { rotate: [0, 0, 0] },
  animate: {
    rotate: [-2, 2, 0],
    color: ['rgb(239,103,103)', 'rgba(0, 0, 0, 100)'],
    transition: {
      repeat: 0,
      duration: animationDuration,
    },
  },
};

const SignUpPage = (props: SignUpPageProps) => {
  const router = useRouter();
  const clipboard = useClipboard({ timeout: 700 });
  const { register, handleSubmit, setFocus } = useForm();
  const [usernameAnimation, setUsernameAnimation] = React.useState(false);
  const [infoModalOpen, setInfoModalOpen] = React.useState(false);
  const [tosModalOpen, setTosModalOpen] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState('');
  const [randWord, setRandWord] = React.useState('');

  const theme = useMantineTheme();

  useEffect(() => {
    setFocus('username');
  }, [setFocus]);

  useEffect(() => {
    const words = [
      'a sensitive',
      'a personal',
      'a straight guy',
      'a Next.js',
      'a bitchy',
      'a touchy feely',
      'a large penis',
      'a gladiator movie',
      'a boyfriend',
      'a sonic porn',
      'a gay',
      "a guy's guy",
      'a sk8er boi',
      'a femboy fox',
      'a factually inaccurate',
      'a petrol-powered',
      'an Internet Explorer 6 compatible',
      'a Windows Vista ready',
      'a gay furry porn',
      'my least favourite',
      'a problematic',
      'an ISO 9001 non-compliant',
      'an upside down bouncing off the ceiling inside out crazy for this feeling',
      'a listening to Michelle Branch while driving my Dodge Neon to TJ Maxx to buy bras kind of',
    ];
    function getRandomInt(max: number) {
      return Math.floor(Math.random() * max);
    }
    const num = getRandomInt(words.length);
    if (!randWord) setRandWord(words[num]);
  });

  const onSubmit = handleSubmit(async (submitData) => {
    setSubmitting(true);
    const { username } = submitData;
    const body = JSON.stringify({
      username,
    });
    const res: Response = await fetch(
      `api/${process.env.NEXT_PUBLIC_API_VERSION}/sign_up`,
      {
        headers: { 'Content-Type': 'application/json' },
        body: body,
        method: 'POST',
      },
    );
    if (ok(res)) {
      setSubmitting(false);
      const data = await res.json();
      localStorage.setItem('tmp', data.tempPassword);
      router.push('sign-up/succes');
    } else {
      const data = await res.json();
      setUsernameAnimation(true);
      switch (data.code) {
        case SignUpErrorCodes.AWAITING_ACTIVATION:
          setError('Did you do the Inkbunny verificationtiontiontion?');
          break;
        case SignUpErrorCodes.USERNAME_EXISTS:
          setError('This username exists, bitch. Sorry, bitch.');
          break;
        case ErrorCodes.BACKEND_ERROR:
          setError(
            "We're currently sucking dick at running a website right now. Try again l8r, sk8r.",
          );
          break;
        case ErrorCodes.INVALID_DATA:
          setError(
            'Are you just shidding and farding on your keyboard right now?',
          );
      }
      setSubmitting(false);
    }
  });

  const signUpInfoModal = () => {
    return (
      <Modal
        overlayColor={theme.colors.dark[9]}
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={infoModalOpen}
        centered
        onClose={() => {
          setInfoModalOpen(false);
        }}
        withCloseButton={false}
      >
        <div className="text-2xl">Benefits</div>
        <div className="text-sm">
          <p>
            Access exclusive content such as sneak peaks, PSD files, comment
            threads, and more.
          </p>
        </div>
        <div className="text-2xl mt-6">To whom do you sell my data?</div>
        <p className={'text-sm'}>Jeff Bezo and Billy Gate</p>
        <div className="w-full mt-6 p-2">
          <button
            className="foxdale-button-plain mx-auto"
            onClick={() => {
              setInfoModalOpen(false);
            }}
          >
            K.
          </button>
        </div>
      </Modal>
    );
  };

  const tosModal = () => {
    return (
      <Modal
        overlayColor={theme.colors.dark[9]}
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={tosModalOpen}
        centered
        onClose={() => {
          setTosModalOpen(false);
        }}
        withCloseButton={false}
      >
        <div className="text-2xl">Terms of service agreement</div>
        <div className="text-sm">
          <p>Basically if you're a cunt, your account gets deleted.</p>
        </div>
        <div className="flex w-full mt-6 p-2">
          <button
            className="px-8 py-2 mx-auto text-lg text-white bg-red-800 outline-none outline border-0 rounded focus:outline-none hover:bg-red-700"
            onClick={() => {
              setTosModalOpen(false);
            }}
          >
            Decline
          </button>
          <button
            className="px-8 py-2 mx-auto text-lg text-white bg-teal-500 outline-none outline border-0 rounded focus:outline-none hover:bg-green-500"
            onClick={() => {
              setTosModalOpen(false);
            }}
          >
            Agree
          </button>
        </div>
      </Modal>
    );
  };

  return (
    <motion.section
      exit={{ opacity: 0 }}
      className="relative text-gray-700 body-font"
    >
      <LoadingOverlay visible={submitting} overlayOpacity={0} />
      {signUpInfoModal()}
      {tosModal()}
      <motion.div
        variants={contentAnimation}
        animate="animate"
        initial="initial"
        className="container px-5 mx-auto"
      >
        <motion.div
          variants={titleAnimation}
          className="flex flex-col w-full mb-8 text-center"
        >
          <h1 className="foxdale-glow-text mb-5 pt-24 text-2xl font-black text-gray-400 sm:text-3xl title-font">
            Sign Up
          </h1>

          <div className="text-gray-600 text-sm">
            <p className="mt-2">
              While in beta, sign up is restricted to Inkbunny* users only.
            </p>
            <p className="mt-2">Here's how it works...</p>
            <p className="mt-2">Sign in to Inkbunny</p>
            <p className="mt-2">
              Go to{' '}
              <span
                onClick={() => {
                  window.open('https://inkbunny.net/FoxdaleAxelrod');
                }}
                className="foxdale-link cursor-pointer"
              >
                inkbunny.net/FoxdaleAxelrod
              </span>
            </p>
            <div className="mt-2">
              Post a comment saying "
              <span className="text-gray-400">
                foxdale.gay is {randWord.split(' ')[0]}{' '}
                <span className="italic">
                  {randWord.split(' ').slice(1).join(' ')}
                </span>{' '}
                website
              </span>
              "{' '}
              <span className={'cursor-pointer '}>
                <Tooltip opened={clipboard.copied} label={'Copied'} withArrow>
                  <span
                    className={
                      clipboard.copied ? 'foxdale-glow-text' : 'foxdale-link'
                    }
                    onClick={() =>
                      clipboard.copy(`foxdale.gay is ${randWord} website`)
                    }
                  >
                    COPY
                  </span>
                </Tooltip>
              </span>
            </div>
            <p className="mt-2 mb-4">
              When you're done, enter your Inkbunny username below...
            </p>
          </div>
          {!error && (
            <p className="mx-auto text-base leading-relaxed lg:w-2/3">
              ~ Join the boys for some fun ~
            </p>
          )}
          {error && (
            <p className="mx-auto text-base leading-relaxed lg:w-2/3 foxdale-pink-text">
              {error}
            </p>
          )}
        </motion.div>
        <motion.div
          variants={inputsAnimation}
          className="mx-auto lg:w-1/2 md:w-2/3"
        >
          <form
            className={'flex flex-wrap -m-2'}
            onSubmit={onSubmit}
            autoComplete={'off'}
          >
            <motion.div
              className="w-full p-2 -mt-2"
              animate={usernameAnimation ? 'animate' : ''}
              variants={inputResponseAnimation}
              onAnimationStart={() => {
                setUsernameAnimation(false);
              }}
            >
              <input
                className="w-1/2 ml-auto mr-auto block px-4 py-2 text-base bg-gray-100 border border-gray-400 rounded focus:outline-none focus:border-red-500"
                placeholder={
                  props.signedIn
                    ? "You're signed in, fuckhead"
                    : 'Inkbunny Username'
                }
                type="text"
                {...register('username')}
                disabled={props.signedIn}
              />
            </motion.div>
            <div className="w-full p-4">
              {props.signedIn && (
                <button
                  className="foxdale-button mx-auto"
                  disabled={props.signedIn}
                >
                  Fuck You
                </button>
              )}
              {!props.signedIn && (
                <button
                  className="foxdale-button mx-auto"
                  type="submit"
                  disabled={props.signedIn}
                >
                  Send
                </button>
              )}
            </div>
          </form>
          <p className="text-xs mt-4 italic">
            * Inkbunny is not affiliated with foxdale.gay
          </p>
          <div className="w-full p-2 pt-8 mt-2 text-center border-t border-gray-200"></div>
          <p className="w-full text-center">
            Arreddy have an account?{' '}
            <button
              className={'foxdale-link'}
              onClick={() => setInfoModalOpen(true)}
            >
              Sign In
            </button>
          </p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default SignUpPage;
