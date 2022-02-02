import type { NextPage } from 'next';
import {
  Modal,
  Button,
  Input,
  Space,
  InputNumber,
  Select,
  Form,
  AutoComplete,
  message,
} from 'antd';
import { Items } from '../utils/types';
import { useEffect, useState } from 'react';
import useSku from '../utils/useSku';
import { useRouter } from 'next/router';

type Props = {
  toggle: boolean;
  setToggle: () => void;
  ref?: any;
  data?: Items;
  cbForm: (arg: Items) => void;
  loading: boolean;
};

const DataModal: NextPage<Props> = ({
  toggle,
  setToggle,
  data,
  cbForm,
  loading,
}) => {
  const router = useRouter(),
    sku = useSku(),
    [form] = Form.useForm(),
    options = [
      { value: 'Sachet' },
      { value: 'Pcs' },
      { value: 'Box' },
      { value: 'Carton' },
      { value: 'Dus' },
      { value: 'Batang' },
    ],
    submitFuntion = async () => {
      try {
        const input = await form.validateFields();
        cbForm(input);
      } catch (error) {
        message.warning('please fill required fields');
      }
    };

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        sku: data.sku,
        product_name: data.product_name,
        price: data.price,
        qty: data.qty,
        unit: data.unit,
        image: data.image,
        status: data.status,
      });
    } else {
      form.setFieldsValue({
        sku,
      });
    }
  }, [data]);

  return (
    <Modal
      title={
        router.pathname.startsWith('/add')
          ? 'Add Data'
          : `Update ${data?.product_name}`
      }
      centered
      visible={toggle}
      okText='Submit New Data'
      onOk={submitFuntion}
      onCancel={() => setToggle()}
      confirmLoading={loading}
    >
      <Form labelCol={{ span: 5 }} form={form}>
        <Form.Item
          label='SKU'
          name='sku'
          rules={[{ required: true, message: 'Please input SKU' }]}
        >
          <Input
            size='large'
            placeholder='SKU'
            disabled={data ? true : false}
          />
        </Form.Item>
        <Form.Item
          label='Product'
          name='product_name'
          rules={[{ required: true, message: 'Please input Product Name' }]}
        >
          <Input size='large' placeholder='Product Name' />
        </Form.Item>
        {/* <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        > */}
        <Form.Item
          label='Price'
          name='price'
          rules={[{ required: true, message: 'Please input Price' }]}
        >
          <InputNumber
            addonBefore='Rp'
            addonAfter=',00'
            min={0}
            size='large'
            placeholder='Price'
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          label='Quantity'
          name='qty'
          rules={[{ required: true, message: 'Please input Quantity' }]}
        >
          <InputNumber
            size='large'
            placeholder='Quantity'
            // addonAfter={selectAfter}
            style={{ width: '100%' }}
          />
        </Form.Item>
        {/* </div> */}
        <Form.Item
          label='Unit'
          name='unit'
          rules={[{ required: true, message: 'Please input Unit' }]}
        >
          {/* <Input size='large' placeholder='Unit' /> */}
          <AutoComplete
            // style={{ width: 200 }}
            size='large'
            placeholder='Unit'
            options={options}
            filterOption={(inputValue, option) =>
              option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
          />
        </Form.Item>
        <Form.Item label='Image' name='image'>
          <Input size='large' placeholder='Image' />
        </Form.Item>
        <Form.Item
          label='Status'
          name='status'
          rules={[{ required: true, message: 'Please input Status' }]}
        >
          <InputNumber
            size='large'
            placeholder='Status'
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DataModal;
