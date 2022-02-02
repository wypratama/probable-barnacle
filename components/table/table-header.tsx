import { PlusOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import { useRouter } from 'next/router';
import styles from '../../styles/Table.module.scss';

export default function tableHeader(
  searchFunction: () => void,
  setToggle: (val: boolean) => void
) {
  return function useHeader() {
    const router = useRouter();
    const onAddClick = () => {
      // setToggle(true);
      router.push('/add');
    };
    return (
      <div className={styles.header}>
        <Button onClick={onAddClick}>
          <PlusOutlined /> Add
        </Button>
        <Input.Search
          placeholder='input search text'
          onSearch={searchFunction}
          // enterButton
          style={{ width: 250 }}
        />
      </div>
    );
  };
}
