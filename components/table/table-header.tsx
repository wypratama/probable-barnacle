import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, message } from 'antd';
import { useRouter } from 'next/router';
import styles from '../../styles/Table.module.scss';
import useStore from '../../utils/store';

export default function tableHeader(
  searchFunction: (val: string) => void,
  changeFunction: (e: any) => void
) {
  return function useHeader() {
    const router = useRouter(),
      loggedUser = useStore((state) => state.loggedUser),
      onAddClick = () => {
        if (!loggedUser)
          message.error('You need to login'), router.push('/login');
        else router.push('/add');
      };
    return (
      <div className={styles.header}>
        <Button onClick={onAddClick}>
          <PlusOutlined /> Add
        </Button>
        <Input.Search
          placeholder='input search text'
          onSearch={searchFunction}
          onChange={changeFunction}
          // enterButton
          style={{ width: 250 }}
          allowClear
        />
      </div>
    );
  };
}
