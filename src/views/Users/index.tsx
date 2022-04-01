import { useEffect, useState } from 'react'
import { Table, Space, Button, Switch, Pagination } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { fetchAllUsers } from '../../store/slices/users'
import { useDispatch, useSelector } from 'react-redux'
import './styles.less'

const Users = () => {
  const [page, setPage] = useState<number>(1)
  const [state, setState] = useState<boolean>(true)

  const { list } = useSelector((state: any) => state.users)

  const limit: number = 5

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllUsers(limit, page, state))
  }, [dispatch, page, state])

  const onChange = (checked: boolean) => {
    setState(checked)

  }
  const handlePagination = (page: number, pagesize: number) => {
    setPage(page)
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
  ];

  return (
    <>
      <div className='button-active-switch'>
        <Switch defaultChecked onChange={onChange} />
      </div>
      <Table columns={columns}
        rowKey='email'
        dataSource={list && list.rows ? list.rows : []}
        pagination={false}

      />
      <Pagination
        onChange={handlePagination}
        defaultPageSize={limit}
        defaultCurrent={1}
        total={list.count}
      />
    </>
  )
}

export default Users