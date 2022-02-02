import { message, Modal } from 'antd';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { DataModal } from '../components';
import { Items } from '../utils/types';
import useStore from '../utils/store';

const Add: NextPage = () => {
  const [toggle, setToggle] = useState(false),
    [loading, setLoading] = useState(false),
    element = useRef(),
    router = useRouter(),
    setUser = useStore((state) => state.setUser),
    fetchData = useStore((state) => state.fetchData),
    clodeModal = () => {
      setToggle(false);
      setTimeout(() => {
        router.push('/');
      }, 350);
    },
    addFunction = async (input: Items) => {
      const token = localStorage.getItem('token');
      try {
        setLoading(true);
        const response = await fetch('/api/add', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(input),
          }),
          parsed = await response.json();
        if (!response.ok) throw { ...parsed, type: 'token' };
        if (parsed.message) throw { ...parsed, type: 'duplicate' };
        message.success('Success adding new data');
        fetchData();
        clodeModal();
        console.log(input, response, 'dari submit function');
      } catch (error: any) {
        console.log(error, 'error submit');
        if (error.type === 'token')
          Modal.confirm({
            title: 'Your login token is expired',
            content: 'you need to re-login to add product',
            onCancel: () => {
              router.push('/');
            },
            onOk: () => {
              console.log('tes');
              localStorage.removeItem('token');
              setUser(null);
              router.push('/login');
            },
          });
        if (error.type === 'duplicate') {
          message.error(`Product already exist with sku ${input.sku}`);
        }
      }
      setLoading(false);
    };

  useEffect(() => {
    setTimeout(() => {
      setToggle(true);
    }, 100);
  }, []);

  return (
    <>
      <DataModal
        ref={element}
        toggle={toggle}
        setToggle={clodeModal}
        cbForm={addFunction}
        loading={loading}
      />
      );
    </>
  );
};

export default Add;
