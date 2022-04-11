import { useEffect, useState } from 'react'
import { Table, Space, Button, Switch, Pagination, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { fetchAllUsers } from '../../store/slices/users'
import { ActivateAndDeactivate, getUser, resetUser } from '../../store/endpoints'
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

  const { list, user } = useSelector((state: any) => state.users)

  const limit: number = 5

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllUsers(limit, page, state))
  }, [dispatch, page, state])

  useEffect(() => {
    if (user) {
      setModalVisible(true)
    }
  }, [user])


  const onChange = (checked: boolean) => {
    setState(checked)
  }
  const handleModalVisible = (visible: boolean) => {
    setModalVisible(visible);
    dispatch(resetUser())

  }

  const handlePagination = (page: number, pagesize: number) => {
    setPage(page)
  }

  const fetchUsuers = () => {
    dispatch(fetchAllUsers(limit, page, state))
  }

  const getUserAndActiveModal = (id: number) => {
    dispatch(getUser(id))
  }

  const deactivateUser = (id: number) => {
    dispatch(ActivateAndDeactivate(id, fetchUsuers))
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
      render: (rowKey: { id: number }) => (
        <Space size="middle">
          <Button type="link"
            onClick={() => getUserAndActiveModal(rowKey.id)}
            //  handleModalVisible(true)} 
            icon={<EditOutlined />}
            shape="circle" />
          <Popconfirm
            title={`¿${state ? 'Desactivar' : 'Activar'} usuario?`}
            onConfirm={() => deactivateUser(rowKey.id)}
            onCancel={() => console.log('hola')}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" icon={<DeleteOutlined />} shape="circle" />
          </Popconfirm>


        </Space>
      ),
    },
  ]
  console.log('jdsjad', list.rows)
  return (
    <>

      <CreateUser
        visible={modalVisible}
        handleModalVisible={handleModalVisible}
        fetchUsuers={fetchUsuers}
        userObj={user}
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