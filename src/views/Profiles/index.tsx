import { useEffect } from 'react'
import { fetchAllProfiles } from '../../store/slices/profiles';
import { useDispatch, useSelector } from 'react-redux'
import { Table, Space, Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';


const Profiles = () => {

  const { list } = useSelector((state: any) => state.profiles)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllProfiles())
  }, [])

  console.log('prfiles', list)


  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Estado',
      dataIndex: 'state',
      key: 'state',
      render: (state: any) => <p>{state ? 'activado' : 'desactivado'}</p>
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} shape="circle" onClick={() => console.log('holaa')} />
          <Button type="link" icon={<DeleteOutlined />} shape="circle" />
        </Space>
      ),
    },
  ];


  return (
    <>
      <Table columns={columns} dataSource={list ? list : []} />
    </>)
}

export default Profiles