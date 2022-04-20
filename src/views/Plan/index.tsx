import { useEffect, useState } from "react";
import { Button, Popconfirm, Space } from "antd"
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import TableDefault from "../../components/TableDefault"
import { } from '../../store/endpoints'
import { useDispatch, useSelector } from 'react-redux'
import { IState } from '../../interfaces/state'


const Plan: React.FC = () => {
  const [page, setPage] = useState<number>(1)
  const [state, setState] = useState<boolean>(true)
  const { list } = useSelector((state: IState) => state.plans)

  const dispatch = useDispatch()
  useEffect(() => {
    // dispatch(fetchAllUsers(limit, page, state))
  }, [dispatch, page, state])


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


  return (
    <>
      {/* <TableDefault
        columns={columns}
        list={list}
        onChange={onChange}
        handlePagination={handlePagination}
        limit={limit}
        rowKey='email'
        handleModalVisible={handleModalVisible}
        handleSearchUsers={handleSearchUsers}
        fetchUsuers={fetchUsuers}
      /> */}
    </>
  )
}

export default Plan