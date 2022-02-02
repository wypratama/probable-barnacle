import { Form, Input, Modal, message } from 'antd';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import useStore from '../utils/store';

type Props = {
  toggle: boolean;
  setToggle: () => void;
  ref?: any;
  source: string;
};

const linkProp = (source: string | undefined) => {
  if (source === 'Login') {
    return (
      <span style={{ justifySelf: 'flex-end' }}>
        Dont have an account? <Link href='/register'>Register</Link>
      </span>
    );
  } else {
    return (
      <span style={{ justifySelf: 'flex-end' }}>
        Already have an account? <Link href='/login'>Login</Link>
      </span>
    );
  }
};

const AccountModal: NextPage<Props> = ({ toggle, setToggle, source }) => {
  const [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    [loading, setLoading] = useState(false),
    setUser = useStore((state) => state.setUser),
    [form] = Form.useForm(),
    submitFunction = async () => {
      try {
        console.log(email, password);
        const validate = await form.validateFields();
        console.log(validate);
        if (!validate.errorFields) {
          setLoading(true);
          console.log('berhasil');
          const response = await fetch(`/api/${source.toLowerCase()}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
          const parsed = await response.json();
          if (!response.ok) throw parsed;
          localStorage.setItem('token', parsed.token);
          // localStorage.setItem('userlog', email);
          setUser(email);
          setToggle();
          setLoading(false);
        }
      } catch (error: any) {
        setLoading(false);
        if (error.error) message.error(error.error);
        if (error.email) message.error(error.email[0]);
        else if (error.password) message.error(error.password[0]);
      }
    };
  return (
    <Modal
      title={source}
      centered
      visible={toggle}
      okText={source === 'Login' ? 'Login' : 'Register'}
      onOk={submitFunction}
      onCancel={() => setToggle()}
      confirmLoading={loading}
      destroyOnClose={true}
    >
      <div>
        <Form labelCol={{ span: 4 }} form={form}>
          <Form.Item
            label='Email'
            name='email'
            rules={[
              { required: true, message: 'Please input your username!' },
              { type: 'email', message: 'Input must be email' },
            ]}
          >
            <Input
              size='large'
              placeholder='email@host.domain'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </Form.Item>
          <Form.Item
            label='Password'
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              size='large'
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </Form.Item>
        </Form>
        {linkProp(source)}
      </div>
    </Modal>
  );
};

export default AccountModal;
