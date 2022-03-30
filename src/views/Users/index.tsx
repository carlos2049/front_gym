import { useEffect } from 'react'
import { Table, Space, Button, Switch } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { fetchAllUsers } from '../../store/slices/users'
import { useDispatch, useSelector } from 'react-redux'
import './styles.less'

const Users = () => {

  const { list } = useSelector((state: any) => state.users)

  console.log(list)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllUsers())
  }, [dispatch])

  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  }
  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
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
      dataIndex: 'profile',
      key: 'profile',
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
      <Table columns={columns} rowKey='email' dataSource={list ? list : []} />
    </>
  )
}

export default Users