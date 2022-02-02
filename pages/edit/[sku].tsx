import useSelection from 'antd/lib/table/hooks/useSelection';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { DataModal } from '../../components';
import getConfig from 'next/config';
import type { Items } from '../../utils/types';

const Edit: NextPage<{ data: Items }> = ({ data }) => {
  const [toggle, setToggle] = useState(false),
    [editData, setEditData] = useState(null),
    element = useRef(),
    router = useRouter(),
    clodeModal = () => {
      setToggle(false);
      setTimeout(() => {
        router.push('/');
      }, 350);
    };
  console.log(data);

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
        data={data}
      />
      );
    </>
  );
};

export async function getServerSideProps({ params }) {
  const { serverRuntimeConfig } = getConfig();
  const response = await fetch(serverRuntimeConfig.apiUrl + '/item/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    }),
    parsedResponse = await response.json();
  if (!response.ok) return { notFound: true };
  return { props: { data: parsedResponse } };
}

export default Edit;
