import React, { createElement } from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import './styles/default.less'

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const DefaultLayout = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout className='layout'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo"> {collapsed ? <h3>ALTUS</h3> : <h3>ALTUS COUCH</h3>} </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <SubMenu key="access" icon={<UserOutlined />} title="Acceso">
            <Menu.Item key="subUsers">Usuarios</Menu.Item>
            <Menu.Item key="subPermissions">Permisos</Menu.Item>
            <Menu.Item key="subProfiles">Perfiles</Menu.Item>
          </SubMenu>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            nav 2
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-header" style={{ padding: 0 }}>
          {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  )
}

export default DefaultLayout