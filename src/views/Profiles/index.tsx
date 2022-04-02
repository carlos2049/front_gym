import { useEffect, useState } from 'react'
import { fetchAllProfiles } from '../../store/slices/profiles';
import { useDispatch, useSelector } from 'react-redux'
import { Space, Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import TableDefault from '../../components/TableDefault';


const Profiles = () => {

  const dispatch = useDispatch()
  const [page, setPage] = useState<number>(1)
  const [state, setState] = useState<boolean>(true)
  const { list } = useSelector((state: any) => state.profiles)
  const limit: number = 5
  useEffect(() => {
    dispatch(fetchAllProfiles(limit, page, state))
  }, [dispatch, page, state])

  const handleSwitch = (checked: boolean): void => {
    setState(checked)
  }

  const handlePagination = (page: number, pagesize: number): void => {
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
      <TableDefault
        columns={columns}
        list={list}
        onChange={handleSwitch}
        handlePagination={handlePagination}
        limit={limit}
        rowKey='name'
      />
    </>)
}

export default Profiles