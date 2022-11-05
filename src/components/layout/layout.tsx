import React, { FC } from 'react';
import { Layout } from 'antd';
import { Route, Routes } from 'react-router-dom';
import HomeView from '../home/home';
import LoginView from '../login/login';
import EmployeeDetailsView from '../employee/employee-details';

const { Content } = Layout;

const LayoutView: FC = () => (
  <Layout className="layout">
    <Content style={{ padding: '50px 50px' }}>
      <Routes>
        <Route path='/' element={<HomeView/>}></Route>
        <Route path='/login' element={<LoginView/>}></Route>
        <Route path='/employee/:id' element={<EmployeeDetailsView/>}></Route>
      </Routes>
    </Content>
  </Layout>
);

export default LayoutView;