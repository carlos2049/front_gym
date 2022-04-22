import { useEffect, useState } from "react";
import { fetchAllPlans } from '../../store/endpoints';
import { Button, Popconfirm, Space } from "antd"
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import TableDefault from "../../components/TableDefault"
import { } from '../../store/endpoints'
import { useDispatch, useSelector } from 'react-redux'
import { IState } from '../../interfaces/state'


const Plan: React.FC = () => {
  const [page, setPage] = useState<number>(1)
  const [state, setState] = useState<boolean>(true)
  const { listPlans } = useSelector((state: IState) => state.plans)
  const [modalVisible, setModalVisible] = useState<boolean>(false)


  const limit: number = 5
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllPlans(limit, page, state))
  }, [dispatch, page, state])

  const onChange = (checked: boolean) => {
    setState(checked)
  }

  const handlePagination = (page: number, pagesize: number) => {
    setPage(page)
  }

  const handleModalVisible = (visible: boolean) => {
    setModalVisible(visible);
    // dispatch(resetUser())
  }

  const handleSearchUsers = (value: string) => {
    // dispatch(searchUsers(value))
  }

  const fetchUsuers = () => {
    // dispatch(fetchAllUsers(limit, page, state))
  }
  console.log(listPlans)

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Estado',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: 'Action',
      key: 'action',
      render: (rowKey: { id: number }) => (
        <Space size="small">
          <Button type="link"
            // onClick={() => getUserAndActiveModal(rowKey.id)}
            icon={<EditOutlined />}
            shape="circle" />
          <Popconfirm
            title={`¿${state ? 'Desactivar' : 'Activar'} usuario?`}
            // onConfirm={() => deactivateUser(rowKey.id)}
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

  // console.log(list.)

  return (
    <>
      <TableDefault
        columns={columns}
        list={listPlans}
        onChange={onChange}
        handlePagination={handlePagination}
        limit={limit}
        rowKey='name'
        handleModalVisible={handleModalVisible}
        handleSearch={handleSearchUsers}
        updateStoreList={fetchUsuers}
      />
    </>
  )
}

export default Plan