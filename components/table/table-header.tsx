import { PlusOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import styles from '../../styles/Table.module.scss';

export default (searchFunction: () => void) => {
  return () => {
    return (
      <div className={styles.header}>
        <Button>
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
};
