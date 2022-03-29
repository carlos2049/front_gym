import { useEffect, useState } from 'react'
import { fetchAllProfiles } from '../../store/slices/profiles';
import { useDispatch, useSelector } from 'react-redux'
import { Table, Space, Button, Pagination, Switch } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';


const Profiles = () => {

  const [page, setPage] = useState<number>(1)
  const { list } = useSelector((state: any) => state.profiles)
  const dispatch = useDispatch()
  // const page: number = 1
  const limit: number = 5
  useEffect(() => {
    dispatch(fetchAllProfiles(limit, page))
  }, [page])

  const handleSwitch = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  }

  const handlePagination = (page: number, pagesize: number) => {
    setPage(page)
  }

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
          <Button type="link" icon={<EditOutlined />} shape="circle" />
          <Button type="link" icon={<DeleteOutlined />} shape="circle" />
        </Space>
      ),
    },
  ];


  return (
    <>
      <Switch defaultChecked onChange={handleSwitch} />
      <Table columns={columns} rowKey='name' dataSource={list && list.rows ? list.rows : []} pagination={false} />
      <Pagination
        onChange={handlePagination}
        defaultPageSize={limit}
        defaultCurrent={1}
        total={list.count}
      />
    </>)
}

export default Profiles