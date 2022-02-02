import {
  DeleteOutlined,
  DeleteTwoTone,
  EditOutlined,
  EditTwoTone,
} from '@ant-design/icons';
import { Button, Space } from 'antd';
import { useRouter } from 'next/router';
import { ItemsWithKey } from '../../utils/types';

export default function ColumnsOfTable() {
  const router = useRouter();
  return [
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
      render: (_: any, item: ItemsWithKey) => {
        // return (
        //   <span
        //     style={{
        //       inset: 0,
        //       position: 'absolute',
        //       display: 'flex',
        //       alignItems: 'center',
        //       justifyContent: 'flex-end',
        //       padding: '0 4px',
        //     }}
        //   >
        //     {new Intl.NumberFormat('id-ID', {
        //       style: 'currency',
        //       currency: 'IDR',
        //     }).format(+item.price)}
        //   </span>
        // );
        return new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
        }).format(+item.price);
      },
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
    {
      title: '',
      dataIndex: 'action',
      render: (_: any, item: ItemsWithKey) => {
        // console.log(item, 'dari column');
        return (
          <Space
            style={{ position: 'absolute', inset: 0, justifyContent: 'center' }}
          >
            <Button
              shape='circle'
              icon={
                <EditTwoTone
                  twoToneColor={'blue'}
                  style={{ fontSize: '20px' }}
                />
              }
              onClick={() => router.push(`/edit/${item.sku}`)}
            ></Button>
            <Button
              shape='circle'
              icon={
                <DeleteTwoTone
                  twoToneColor={'red'}
                  style={{ fontSize: '20px' }}
                />
              }
            ></Button>
          </Space>
        );
      },
    },
  ];
}

// export default tableColumn;
