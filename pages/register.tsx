import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { AccountModal } from '../components';

const Register: NextPage = () => {
  const [toggle, setToggle] = useState(false),
    element = useRef(),
    router = useRouter(),
    clodeModal = () => {
      setToggle(false);
      setTimeout(() => {
        router.push('/');
      }, 350);
    };

  useEffect(() => {
    setTimeout(() => {
      setToggle(true);
    }, 100);
  }, []);

  return (
    <>
      <AccountModal
        ref={element}
        toggle={toggle}
        setToggle={clodeModal}
        source='Register'
      />
      );
    </>
  );
};

export default Register;
