import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { Button, message, Modal, Space, Tag } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ItemsWithKey } from '../../utils/types';
import useStore from '../../utils/store';

export default function ColumnsOfTable() {
  const router = useRouter(),
    [loading, setLoading] = useState(false),
    setUser = useStore((state) => state.setUser),
    fetchData = useStore((state) => state.fetchData),
    loggedUser = useStore((state) => state.loggedUser),
    confirmDelete = (item: ItemsWithKey) => {
      if (!loggedUser)
        message.error('You need to login'), router.push('/login');
      else
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
            } catch (error: any) {
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
      onHeaderCell: (col: any) => {
        col.align = 'center';
      },
    },
    {
      title: 'Product Name',
      dataIndex: 'product_name',
      key: 'product_name',
      onHeaderCell: (col: any) => {
        col.align = 'center';
      },
    },
    {
      title: 'Quantity',
      dataIndex: 'qty',
      key: 'qty',
      align: 'right',
      onHeaderCell: (col: any) => {
        col.align = 'center';
      },
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      key: 'unit',
      onHeaderCell: (col: any) => {
        col.align = 'center';
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      align: 'right',
      onHeaderCell: (col: any) => {
        col.align = 'center';
      },
      render: (_: any, item: ItemsWithKey) => {
        return new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
        }).format(+item.price);
      },
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      onHeaderCell: (col: any) => {
        col.align = 'center';
      },
      render: (item: any) => (item ? item : 'unavailable'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status: number) =>
        status ? (
          <Tag color={'green'} key={status}>
            active
          </Tag>
        ) : (
          <Tag color={'red'} key={status}>
            inactive
          </Tag>
        ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      render: (_: any, item: ItemsWithKey) => {
        return (
          <>
            <Button
              shape='circle'
              icon={
                <EditTwoTone
                  twoToneColor={'blue'}
                  style={{ fontSize: '20px' }}
                />
              }
              onClick={() => {
                if (!loggedUser)
                  message.error('You need to login'), router.push('/login');
                else router.push(`/edit/${item.sku}`);
              }}
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
          </>
        );
      },
    },
  ];
}
