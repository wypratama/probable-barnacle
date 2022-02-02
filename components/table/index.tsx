import type { NextPage } from 'next';
import { Table, Tag, Space, Button, Input } from 'antd';
import type { ItemsWithKey } from '../../utils/types';
import tableHeader from './table-header';
import columns from './table-column';
import useStore from '../../utils/store';

type Props = {
  setToggle: (val: boolean) => void;
};

const ComponentTable: NextPage<Props> = ({ setToggle }) => {
  const data = useStore((state) => state.data),
    dataLoading = useStore((state) => state.dataLoading),
    onSearch = () => {},
    header = tableHeader(onSearch, setToggle);
  if (!data) return <span>Loading</span>;
  return (
    <Table
      columns={columns()}
      dataSource={data as Array<ItemsWithKey>}
      bordered
      tableLayout='fixed'
      loading={dataLoading}
      title={header}
    />
  );
};

export default ComponentTable;
