import React, { FC, Fragment, useEffect } from 'react';
import { EditFilled, DeleteFilled, SmileFilled, EyeFilled, PlusCircleFilled } from '@ant-design/icons';
import { FrownFilled } from '@ant-design/icons';
import { Button, Col, Divider, Modal, notification, Row, Tooltip, Typography } from 'antd';
import { deleteEmployee, getEmployees } from '../../api/methods';
import { apiErrorToString } from '../../api/utitls';
import Table, { ColumnsType } from 'antd/lib/table';
import { Employee } from '../../api/interfaces';
import EmployeeView from './employee';

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

const EmployeeListView: FC = () => {
  const [employees, setEmployees] = React.useState<Employee[]>([]);
  const [showCreate, setShowCreate] = React.useState<boolean>(false);
  const [toEdit, setToEdit] = React.useState<Employee | undefined>();
  const [loading, setLoading] = React.useState<boolean>(true);
  const columns: ColumnsType<Employee> = [
    {
      title: 'Id',
      dataIndex: 'id'
    },
    {
      title: 'Employee number',
      dataIndex: 'employeeNumber'
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
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, record) => renderActions(record)
    },
  ];

  const fetchEmployees = () => {
    setLoading(true);

    getEmployees()
      .then(employees => {
        setEmployees(employees);
      })
      .catch(err => notifyError('An error ocurred obtaining employees', err))
      .finally(() => setLoading(false));
  };

  const onEditSuccess = (employee: Employee) => {
    notifySuccess('Success', 'Employee has been updated');
    setEmployees(employees.map((item) => {return item.id === employee.id ? employee : item}));
    setToEdit(undefined);
  };

  const onEditError = (err: any) => {
    notifyError("An error ocurred while updating employee", err);
  };

  const onEditCancel = () => {
    setToEdit(undefined);
  };

  const onCreateSuccess = (employee: Employee) => {
    notifySuccess('Success', 'Employee has been created');
    setEmployees([...employees, employee]);
    setShowCreate(false);
  };

  const onCreateError = (err: any) => {
    notifyError("An error ocurred while creating employee", err);
  };

  const onCreateCancel = () => {
    setShowCreate(false);
  };

  const handleDelete = (employee: Employee) => {
    setLoading(true);

    deleteEmployee(employee.id as number)
      .then(() => {
        notifySuccess('Success', 'Employee has been deleted');
        setEmployees(employees.filter(item => item.id !== employee.id));
      })
      .catch(err => notifyError('An error ocurred deleting the employee', err))
      .finally(() => setLoading(false));
  };

  const renderActions = (employee: Employee) => (
    <Fragment>
      <Tooltip title="edit">
        <Button
          type="primary"
          shape="circle"
          icon={<EditFilled />}
          onClick={() => setToEdit(employee)}
        />
      </Tooltip>
      <Divider type="vertical"/>
      <Tooltip title="details">
        <Button 
          type="primary" 
          shape="circle"
          icon={<EyeFilled />}
          onClick={() => window.location.replace(`/employee/${employee.id}`)}
        />
      </Tooltip>
      <Divider type="vertical"/>
      <Tooltip title="delete">
        <Button 
          type="primary" 
          shape="circle"
          icon={<DeleteFilled />}
          onClick={() => renderDelete(employee)}
          danger
        />
      </Tooltip>
    </Fragment>
  );

  const renderCreate = () => (
    <Modal
      title="Create employee"
      open={showCreate}
      footer={false}
      closable={false}
    >
      <EmployeeView 
        mode="create"
        onSuccess={onCreateSuccess}
        onError={onCreateError}
        onCancel={onCreateCancel}
      />
    </Modal>
  );

  const renderEdit = () => (
    <Modal
      title="Edit employee"
      open={toEdit !== undefined}
      footer={false}
      closable={false}
    >
      <EmployeeView 
        mode="edit"
        employee={toEdit}
        onSuccess={onEditSuccess}
        onError={onEditError}
        onCancel={onEditCancel}
      />
    </Modal>
  );

  const renderDelete = (employee: Employee) => (
    Modal.confirm({
      title: 'Delete employee',
      content: `Are you sure you want to delete the employee ${employee.firstName} ${employee.lastName}?`,
      onOk: () => handleDelete(employee)
    })
  );

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <Fragment>
      <Row>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Typography.Title level={2}>Employees</Typography.Title>
        </Col>
      </Row>
      <Divider/>
      <Table
        columns={columns}
        dataSource={employees}
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
            New employee
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
};

export default EmployeeListView;