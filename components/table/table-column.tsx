import {
  DeleteOutlined,
  DeleteTwoTone,
  EditOutlined,
  EditTwoTone,
} from '@ant-design/icons';
import { Button, message, Modal, Space } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ItemsWithKey } from '../../utils/types';
import useStore from '../../utils/store';

export default function ColumnsOfTable() {
  const router = useRouter(),
    [loading, setLoading] = useState(false),
    setUser = useStore((state) => state.setUser),
    fetchData = useStore((state) => state.fetchData),
    confirmDelete = (item: ItemsWithKey) => {
      Modal.confirm({
        title: `Deleting ${item.product_name}`,
        content: `Are you sure you want to delete ${item.product_name}`,
        centered: true,
        okText: 'Delete',
        okType: 'danger',
        onOk: async () => {
          const token = localStorage.getItem('token');
          try {
            setLoading(true);
            const response = await fetch('/api/delete', {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sku: item.sku }),
              }),
              parsed = await response.json();
            if (!response.ok) throw { ...parsed, type: 'token' };
            if (parsed.message) throw { ...parsed, type: 'failure' };
            message.success(`Success deleting ${item.product_name}`);
            fetchData();
            console.log({ sku: item.sku }, response, 'dari submit function');
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
                  localStorage.removeItem('token');
                  setUser(null);
                  router.push('/login');
                },
              });
            if (error.type === 'failure') {
              message.error(`Product with ${item.sku} not found`);
            }
          }
          setLoading(false);
        },
      });
    };

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
              onClick={() => confirmDelete(item)}
            ></Button>
          </Space>
        );
      },
    },
  ];
}

// export default tableColumn;
