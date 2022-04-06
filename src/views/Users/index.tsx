import { useEffect, useState } from 'react'
import { Table, Space, Button, Switch, Pagination } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { fetchAllUsers } from '../../store/slices/users'
import { useDispatch, useSelector } from 'react-redux'
import TableDefault from '../../components/TableDefault';
import './styles.less'

import CreateUser from '../../components/Users/CreateUser';

// interface IColumn {
//   title: string,
//   dataIndex: string,
//   key: string,

// }

const Users = () => {
  const [page, setPage] = useState<number>(1)
  const [state, setState] = useState<boolean>(true)
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  const { list } = useSelector((state: any) => state.users)

  const limit: number = 5

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllUsers(limit, page, state))
  }, [dispatch, page, state])

  const onChange = (checked: boolean) => {
    setState(checked)
  }
  const handleModalVisible = (visible: any) => {
    setModalVisible(visible);
  }

  const handlePagination = (page: number, pagesize: number) => {
    setPage(page)
  }

  const fetchUsuers = () => {
    dispatch(fetchAllUsers(limit, page, state))
  }

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'names',
      key: 'names',
      // render: (text: string) => <p>{text}</p>,
    },
    {
      title: 'Rut',
      dataIndex: 'rut',
      key: 'rut',
    },
    {
      title: 'Telefono',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Perfil',
      dataIndex: 'id_perfil',
      key: 'id_perfil',
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} shape="circle" />
          <Button type="link" icon={<DeleteOutlined />} shape="circle" />
        </Space>
      ),
    },
  ]

  return (
    <>
      <CreateUser
        visible={modalVisible}
        handleModalVisible={handleModalVisible}
        fetchUsuers={fetchUsuers}
      />
      {/* <Button type="primary" onClick={handleModalVisible}>Primary Button</Button> */}
      {/* <button onChange={handleModalVisible}></button> */}
      <TableDefault
        columns={columns}
        list={list}
        onChange={onChange}
        handlePagination={handlePagination}
        limit={limit}
        rowKey='email'
        handleModalVisible={handleModalVisible}
      />
    </>
  )
}

export default Users