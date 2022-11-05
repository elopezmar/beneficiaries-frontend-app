import React, { FC, useEffect } from 'react';
import { Button, DatePicker, Form, Input, Select, Divider, Row, Col, InputNumber } from 'antd';
import { createBeneficiary, getNationalities, updateBeneficiary } from '../../api/methods';
import { BeneficiaryProps } from './interfaces';
import { Beneficiary, Nationality } from '../../api/interfaces';
import moment from 'moment';

const BeneficiaryView: FC<BeneficiaryProps> = (props) => {
  const [nationalities, setNationalities] = React.useState<Nationality[]>([]);
  const [form] = Form.useForm<Beneficiary>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const { mode, employeeId, beneficiary, onSuccess, onError, onCancel } = props;

  const setForm = () => {
    if (beneficiary) {
      form.setFieldsValue({
        firstName: beneficiary.firstName,
        lastName: beneficiary.lastName,
        curp: beneficiary.curp,
        ssn: beneficiary.ssn,
        phone: beneficiary.phone,
        nationalityId: beneficiary.nationalityId,
        participationPercent: beneficiary.participationPercent,
        birthDate: moment(beneficiary.birthDate)
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

  const onFinish = (values: Beneficiary) => {
    setLoading(true);
    const birthDate = moment(values.birthDate).format("YYYY-MM-DD");
    const data = { ...values, birthDate: birthDate, phone: values.phone?.toString()};
    
    if (mode === 'create') {
      createBeneficiary(employeeId, data)
        .then(result => {
          form.resetFields();
          onSuccess(result);
        })
        .catch(onError)
        .finally(() => setLoading(false));
    } else {
      updateBeneficiary(employeeId, beneficiary?.id as number, data)
        .then(onSuccess)
        .catch(onError)
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    setForm();
  }, [props.beneficiary]);

  useEffect(() => {
    fetchNationalities();
  }, []);

  return (
    <Form
      form={form}
      name="beneficiary"
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
        rules={[{ required: true, message: 'Please input beneficiary nationality!' }]}
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
        rules={[{ required: true, message: 'Please input beneficiary first name!' }]}
      >
        <Input showCount maxLength={50} />
      </Form.Item>

      <Form.Item
        label="Last name"
        name="lastName"
        rules={[{ required: true, message: 'Please input beneficiary last name!' }]}
      >
        <Input showCount maxLength={50} />
      </Form.Item>

      <Form.Item
        label="Birth date"
        name="birthDate"
        rules={[{ required: true, message: 'Please input beneficiary birth date!' }]}
      >
        <DatePicker style={{width: '100%'}} />
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
        rules={[{ required: true, message: 'Please input beneficiary phone!' }]}
      >
        <InputNumber minLength={10} maxLength={10} precision={0} style={{width: '100%'}} />
      </Form.Item>

      <Form.Item
        label="Participarion %"
        name="participationPercent"
        rules={[{ required: true, message: 'Please input beneficiary participation percent!' }]}
      >
        <InputNumber precision={2} style={{width: '100%'}} />
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

export default BeneficiaryView;