import { useEffect, useState } from 'react'
import { fetchAllProfiles } from '../../store/slices/profiles';
import { useDispatch, useSelector } from 'react-redux'
import { Table, Space, Button, Pagination, Switch } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';


const Profiles = () => {

  const dispatch = useDispatch()
  const [state, setState] = useState<boolean>(true)
  const { list } = useSelector((state: any) => state.profiles)
  useEffect(() => {
    dispatch(fetchAllProfiles(state))
  }, [dispatch, state])

  const handleSwitch = (checked: boolean) => {
    setState(checked)
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
      <Table
        columns={columns}
        dataSource={list && list.rows ? list.rows : []}
        rowKey='name'
        pagination={false}
      />
      {/* <Pagination
        onChange={handlePagination}
        defaultPageSize={limit}
        defaultCurrent={1}
        total={list.count}
      /> */}
    </>)
}

export default Profiles