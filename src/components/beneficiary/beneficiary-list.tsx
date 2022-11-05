import React, { FC, Fragment, useEffect } from 'react';
import { EditFilled, DeleteFilled, SmileFilled, PlusCircleFilled } from '@ant-design/icons';
import { FrownFilled } from '@ant-design/icons';
import { Button, Col, Divider, Modal, notification, Row, Tooltip, Typography } from 'antd';
import { deleteBeneficiary, getBeneficiaries } from '../../api/methods';
import { apiErrorToString } from '../../api/utitls';
import Table, { ColumnsType } from 'antd/lib/table';
import { Beneficiary } from '../../api/interfaces';
import BeneficiaryView from './beneficiary';
import { BeneficiaryListProps } from './interfaces';

const notifyError = (title: string, err: any) => {
  notification.open({
    message: title,
    description: apiErrorToString(err),
    icon: <FrownFilled style={{ color: 'red' }}/>
  });
}

const notifySuccess = (title: string, message: string) => {
  notification.open({
    message: title,
    description: message,
    icon: <SmileFilled style={{ color: 'green' }}/>
  });
}

const BeneficiaryListView: FC<BeneficiaryListProps> = (props) => {
  const [beneficiaries, setBeneficiaries] = React.useState<Beneficiary[]>([]);
  const [showCreate, setShowCreate] = React.useState<boolean>(false);
  const [toEdit, setToEdit] = React.useState<Beneficiary | undefined>();
  const [loading, setLoading] = React.useState<boolean>(true);
  const { employeeId } = props;
  const columns: ColumnsType<Beneficiary> = [
    {
      title: 'Id',
      dataIndex: 'id'
    },
    {
      title: 'First name',
      dataIndex: 'firstName'
    },
    { 
      title: 'Last name',
      dataIndex: 'lastName'
    },
    {
      title: 'Birth date',
      dataIndex: 'birthDate'
    },
    {
      title: 'CURP',
      dataIndex: 'curp'
    },
    {
      title: 'SSN',
      dataIndex: 'ssn'
    },
    {
      title: 'Phone',
      dataIndex: 'phone'
    },
    { 
      title: 'Nationality',
      dataIndex: 'nationality'
    },
    {
      title: 'Participarion',
      dataIndex: 'participationPercent',
      render: (value) => `${value}%`
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, record) => renderActions(record)
    },
  ];

  const fetchBeneficiaries = () => {
    setLoading(true);

    getBeneficiaries(employeeId)
      .then(beneficiaries => {
        setBeneficiaries(beneficiaries);
      })
      .catch(err => notifyError('An error ocurred obtaining beneficiaries', err))
      .finally(() => setLoading(false));
  };

  const onEditSuccess = (beneficiary: Beneficiary) => {
    notifySuccess('Success', 'Beneficiary has been updated');
    setBeneficiaries(beneficiaries.map((item) => {return item.id === beneficiary.id ? beneficiary : item}));
    setToEdit(undefined);
  };

  const onEditError = (err: any) => {
    notifyError("An error ocurred while updating beneficiary", err);
  };

  const onEditCancel = () => {
    setToEdit(undefined);
  };

  const onCreateSuccess = (beneficiary: Beneficiary) => {
    notifySuccess('Success', 'Beneficiary has been created');
    setBeneficiaries([...beneficiaries, beneficiary]);
    setShowCreate(false);
  };

  const onCreateError = (err: any) => {
    notifyError("An error ocurred while creating Beneficiary", err);
  };

  const onCreateCancel = () => {
    setShowCreate(false);
  };

  const handleDelete = (beneficiary: Beneficiary) => {
    setLoading(true);

    deleteBeneficiary(employeeId, beneficiary.id as number)
      .then(() => {
        notifySuccess('Success', 'Beneficiary has been deleted');
        setBeneficiaries(beneficiaries.filter(item => item.id !== beneficiary.id));
      })
      .catch(err => notifyError('An error ocurred deleting beneficiary', err))
      .finally(() => setLoading(false));
  };

  const renderActions = (beneficiary: Beneficiary) => (
    <Fragment>
      <Tooltip title="edit">
        <Button
          type="primary"
          shape="circle"
          icon={<EditFilled />}
          onClick={() => setToEdit(beneficiary)}
        />
      </Tooltip>
      <Divider type="vertical"/>
      <Tooltip title="delete">
        <Button 
          type="primary" 
          shape="circle"
          icon={<DeleteFilled />}
          onClick={() => renderDelete(beneficiary)}
          danger
        />
      </Tooltip>
    </Fragment>
  );

  const renderCreate = () => (
    <Modal
      title="Create beneficiary"
      open={showCreate}
      footer={false}
      closable={false}
    >
      <BeneficiaryView 
        mode="create"
        employeeId={employeeId}
        onSuccess={onCreateSuccess}
        onError={onCreateError}
        onCancel={onCreateCancel}
      />
    </Modal>
  );

  const renderEdit = () => (
    <Modal
      title="Edit beneficiary"
      open={toEdit !== undefined}
      footer={false}
      closable={false}
    >
      <BeneficiaryView 
        mode="edit"
        employeeId={employeeId}
        beneficiary={toEdit}
        onSuccess={onEditSuccess}
        onError={onEditError}
        onCancel={onEditCancel}
      />
    </Modal>
  );

  const renderDelete = (beneficiary: Beneficiary) => (
    Modal.confirm({
      title: 'Delete beneficiary',
      content: `Are you sure you want to delete the beneficiary ${beneficiary.firstName} ${beneficiary.lastName}?`,
      onOk: () => handleDelete(beneficiary)
    })
  );

  useEffect(() => {
    fetchBeneficiaries();
  }, []);

  return (
    <Fragment>
      <Row>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Typography.Title level={2}>Beneficiaries</Typography.Title>
        </Col>
      </Row>
      <Divider/>
      <Table
        columns={columns}
        dataSource={beneficiaries}
        loading={loading}
      />
      {renderCreate()}
      {renderEdit()}
      <Divider/>
      <Row>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Button 
            type="primary" 
            shape="round"
            size="large"
            icon={<PlusCircleFilled />}
            onClick={() => setShowCreate(true)}
          >
            New beneficiary
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
};

export default BeneficiaryListView;