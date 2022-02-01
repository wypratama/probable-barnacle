import type { NextPage } from 'next';
import { Table, Tag, Space, Button, Input } from 'antd';
import type { ItemsWithKey } from '../../utils/types';
import tableHeader from './table-header';

type Props = {
  data: Array<ItemsWithKey> | null;
};

const ComponentTable: NextPage<Props> = ({ data }) => {
  const onSearch = () => {},
    header = tableHeader(onSearch);
  const columns = [
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
    },
    {
      title: 'Product Name',
      dataIndex: 'product_name',
      key: 'product_name',
    },
    {
      title: 'Quantity',
      dataIndex: 'qty',
      key: 'qty',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={data as Array<ItemsWithKey>}
      bordered
      tableLayout='fixed'
      title={header}
    />
  );
};

export default ComponentTable;
