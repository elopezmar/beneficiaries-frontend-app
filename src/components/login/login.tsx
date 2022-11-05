import React, { FC, Fragment } from 'react';
import { Button, Col, Divider, Form, Input, Row, Typography } from 'antd';
import { login } from '../../api/methods';
import { Admin } from '../../api/interfaces';

const LoginView: FC = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [form] = Form.useForm<Admin>();

  const onFinish = (data: Admin) => {
    setLoading(true);

    login(data)
      .then(() => window.location.replace('/'))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    <Fragment>
      <Row>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Typography.Title level={2}>Login</Typography.Title>
        </Col>
      </Row>
      <Divider/>
      <Row>
        <Col span={8} />
        <Col span={8} style={{ textAlign: 'center' }}>
          <Form
            form={form}
            name="login"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            onFinish={onFinish}
            autoComplete="off"
            disabled={loading}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Row>
              <Divider/>
              <Col span={24} style={{ textAlign: 'center' }}>
                <Button 
                  type="primary" 
                  shape="round"
                  size="large"
                  htmlType="submit"
                  loading={loading}
                >
                  Accept
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
};

export default LoginView;