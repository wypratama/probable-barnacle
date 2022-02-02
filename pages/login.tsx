import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { AccountModal } from '../components';

const Login: NextPage = () => {
  const [toggle, setToggle] = useState(false),
    element = useRef(),
    router = useRouter(),
    clodeModal = () => {
      setToggle(false);
      setTimeout(() => {
        router.push('/');
      }, 550);
    };

  useEffect(() => {
    setTimeout(() => {
      setToggle(true);
    }, 300);
  }, []);

  return (
    <>
      <AccountModal
        ref={element}
        toggle={toggle}
        setToggle={clodeModal}
        source='Login'
      />
      );
    </>
  );
};

export default Login;
