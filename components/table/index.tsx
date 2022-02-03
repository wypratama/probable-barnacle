import type { NextPage } from 'next';
import { Table } from 'antd';
import type { ItemsWithKey } from '../../utils/types';
import tableHeader from './table-header';
import columns from './table-column';
import useStore from '../../utils/store';
import { useState } from 'react';

type Props = {
  setToggle: (val: boolean) => void;
};

const ComponentTable: NextPage<Props> = () => {
  const data = useStore((state) => state.data),
    dataLoading = useStore((state) => state.dataLoading),
    [filteredData, setFilteredData] = useState<ItemsWithKey[] | []>([]),
    [searchQuery, setSearchQuery] = useState(''),
    onSearch = () => {},
    changeFunction = (e: any) => {
      setSearchQuery(e.target.value);
      const filter = data!.filter((item) => {
        return (
          item.sku.toLowerCase().startsWith(e.target.value) ||
          item.product_name.toLowerCase().startsWith(e.target.value) ||
          item.unit.toLowerCase().startsWith(e.target.value) ||
          item.qty.toString().toLowerCase().startsWith(e.target.value) ||
          item.price.toString().toLowerCase().startsWith(e.target.value) ||
          item.status.toString().toLowerCase().startsWith(e.target.value)
        );
      });
      setFilteredData(filter);
    },
    header = tableHeader(onSearch, changeFunction);
  if (!data) return <span>Loading</span>;
  return (
    <Table
      columns={columns() as any}
      dataSource={searchQuery ? filteredData : (data as Array<ItemsWithKey>)}
      bordered
      tableLayout='fixed'
      loading={dataLoading}
      title={header}
      // scroll={{ x: '100%' }}
    />
  );
};

export default ComponentTable;
