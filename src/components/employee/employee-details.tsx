import React, {FC, Fragment, useEffect, useState} from "react";
import { Button, Col, Descriptions, Divider, notification, Row, Typography } from "antd";
import { FrownFilled, HomeFilled } from '@ant-design/icons';
import { useParams } from "react-router";
import { Employee } from "../../api/interfaces";
import { apiErrorToString } from "../../api/utitls";
import { getEmployee } from "../../api/methods";
import BeneficiaryListView from "../beneficiary/beneficiary-list";

const notifyError = (title: string, err: any) => {
  notification.open({
    message: title,
    description: apiErrorToString(err),
    icon: <FrownFilled style={{ color: 'red' }}/>
  });
}

const EmployeeDetailsView: FC = () => {
  const [employee, setEmployee] = useState<Employee>({});
  const [loading, setLoading] = React.useState<boolean>(false);
  const { id } = useParams();

  const fetchEmployee = () => {
    getEmployee(Number(id))
      .then(setEmployee)
      .catch(err => notifyError('An error occurred while obtainig employee', err))
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  const renderDetails = () => {
    return (
      <Descriptions title={`${employee.firstName} ${employee.lastName}`}>
        <Descriptions.Item label="Number">{employee.employeeNumber}</Descriptions.Item>
        <Descriptions.Item label="CURP">{employee.curp}</Descriptions.Item>
        <Descriptions.Item label="SSN">{employee.ssn}</Descriptions.Item>
        <Descriptions.Item label="Phone">{employee.phone}</Descriptions.Item>
        <Descriptions.Item label="Nationality">{employee.nationality}</Descriptions.Item>
        <Descriptions.Item label="Birth date">{employee.birthDate?.toString()}</Descriptions.Item>
      </Descriptions>
    );
  }

  return (
    <Fragment>
      <Row>
        <Col span={6} style={{ textAlign: 'center' }}>
          <Button 
            type="primary" 
            shape="round"
            size="large"
            icon={<HomeFilled />}
            onClick={() => window.location.replace('/')}
          >
            Home
          </Button>
        </Col>
        <Col span={12} style={{ textAlign: 'center' }}>
          <Typography.Title level={2}>Details</Typography.Title>
        </Col>
      </Row>
      <Divider/>
      {renderDetails()}
      <Divider/>
      {
        employee.id
        ? <BeneficiaryListView employeeId={Number(id)} />
        : null
      }
    </Fragment>
  );
};

export default EmployeeDetailsView;