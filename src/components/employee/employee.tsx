import React, { FC, useEffect } from 'react';
import { Button, DatePicker, Form, Input, Select, Divider, Row, Col, InputNumber } from 'antd';
import { createEmployee, getNationalities, updateEmployee } from '../../api/methods';
import { EmployeeProps } from './interfaces';
import { Employee, Nationality } from '../../api/interfaces';
import moment from 'moment';

const EmployeeView: FC<EmployeeProps> = (props) => {
  const [nationalities, setNationalities] = React.useState<Nationality[]>([]);
  const [form] = Form.useForm<Employee>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const { mode, employee, onSuccess, onError, onCancel } = props;

  const setForm = () => {
    if (employee) {
      form.setFieldsValue({
        firstName: employee.firstName,
        lastName: employee.lastName,
        employeeNumber: employee.employeeNumber,
        curp: employee.curp,
        ssn: employee.ssn,
        phone: employee.phone,
        nationalityId: employee.nationalityId,
        birthDate: moment(employee.birthDate)
      });
    }
  };

  const fetchNationalities = () => {
    setLoading(true);

    getNationalities()
      .then(nationalities => {
        setNationalities(nationalities);
      })
      .catch(onError)
      .finally(() => setLoading(false));
  };

  const onFinish = (values: Employee) => {
    setLoading(true);
    const birthDate = moment(values.birthDate).format("YYYY-MM-DD");
    const data = { ...values, birthDate: birthDate, phone: values.phone?.toString()};
    
    if (mode === 'create') {
      createEmployee(data)
        .then(result => {
          form.resetFields();
          onSuccess(result);
        })
        .catch(onError)
        .finally(() => setLoading(false));
    } else {
      updateEmployee(employee?.id as number, data)
        .then(onSuccess)
        .catch(onError)
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    setForm();
  }, [employee]);

  useEffect(() => {
    fetchNationalities();
  }, []);

  return (
    <Form
      form={form}
      name="employee"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
      disabled={loading}
    >
      <Form.Item
        label="Nationality"
        name="nationalityId"
        rules={[{ required: true, message: 'Please input employee nationality!' }]}
      >
        <Select
          showSearch
          placeholder="Select a nationality"
          optionFilterProp="children"
          filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={nationalities.map(item => {
            return {value: item.id, label: item.description
          }})}
        />
      </Form.Item>

      <Form.Item
        label="First name"
        name="firstName"
        rules={[{ required: true, message: 'Please input employee first name!' }]}
      >
        <Input showCount maxLength={50} />
      </Form.Item>

      <Form.Item
        label="Last name"
        name="lastName"
        rules={[{ required: true, message: 'Please input employee last name!' }]}
      >
        <Input showCount maxLength={50} />
      </Form.Item>

      <Form.Item
        label="Birth date"
        name="birthDate"
        rules={[{ required: true, message: 'Please input employee birth date!' }]}
      >
        <DatePicker style={{width: '100%'}} />
      </Form.Item>

      <Form.Item
        label="Number"
        name="employeeNumber"
        rules={[{ required: true, message: 'Please input employee number!' }]}
      >
        <Input showCount maxLength={10} />
      </Form.Item>

      <Form.Item
        label="CURP"
        name="curp"
      >
        <Input showCount maxLength={18} />
      </Form.Item>

      <Form.Item
        label="SSN"
        name="ssn"
      >
        <Input showCount maxLength={9} />
      </Form.Item>

      <Form.Item
        label="Phone"
        name="phone"
        rules={[{ required: true, message: 'Please input employee phone!' }]}
      >
        <InputNumber minLength={10} maxLength={10} precision={0} style={{width: '100%'}} />
      </Form.Item>

      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button onClick={() => onCancel()}>
            Cancel
          </Button>
          <Divider type='vertical' />
          <Button type="primary" htmlType="submit" loading={loading}>
            OK
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default EmployeeView;