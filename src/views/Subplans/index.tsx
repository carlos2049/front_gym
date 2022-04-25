import { useState } from 'react'
import TableDefault from "../../components/TableDefault"
import { useDispatch, useSelector } from 'react-redux'

import { Button, Popconfirm, Space } from "antd"
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { IState } from '../../interfaces/state'


const Subplans: React.FC = () => {

  const [state, setState] = useState<boolean>(true)
  // const { listPlans, plan } = useSelector((state: IState) => state.plans)


  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Valor mensual',
      dataIndex: 'monthly_value',
      key: 'monthly_value',
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
            // onClick={() => getPlanAndActiveModal(rowKey.id)}
            icon={<EditOutlined />}
            shape="circle" />
          <Popconfirm
            title={`¿${state ? 'Desactivar' : 'Activar'} plan?`}
            // onConfirm={() => deactivateUser(rowKey.id)}
            // onCancel={() => console.log('hola')}
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
        list={listPlans}
        onChange={onChange}
        handlePagination={handlePagination}
        limit={limit}
        rowKey='name'
        handleModalVisible={handleModalVisible}
        handleSearch={handleSearchUsers}
        updateStoreList={fetchPlans}
      /> */}
    </>
  )
}

export default Subplans