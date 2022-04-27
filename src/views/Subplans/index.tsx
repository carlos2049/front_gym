import { useState, useEffect } from 'react'
import TableDefault from "../../components/TableDefault"
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllSubplans, searchsubplans } from '../../store/endpoints';

import { Button, Popconfirm, Space } from "antd"
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { IState } from '../../interfaces/state'


const Subplans: React.FC = () => {

  const [page, setPage] = useState<number>(1)
  const [state, setState] = useState<boolean>(true)
  const { listSubplans } = useSelector((state: IState) => state.subplans)
  const dispatch = useDispatch()

  const limit: number = 9
  useEffect(() => {
    dispatch(fetchAllSubplans(limit, page, state))
  }, [dispatch, page, state])

  const onChange = (checked: boolean) => {
    setState(checked)
  }

  const handlePagination = (page: number, pagesize: number) => {
    setPage(page)
  }

  const handleModalVisible = (visible: boolean) => {
    // setModalVisible(visible);
    // dispatch(resetPlan())
  }

  const handleSearchSubplans = (value: string) => {
    dispatch(searchsubplans(value))
  }

  const fetchSubplans = () => {
    dispatch(fetchAllSubplans(limit, page, state))
  }

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
      <TableDefault
        columns={columns}
        list={listSubplans}
        onChange={onChange}
        handlePagination={handlePagination}
        limit={limit}
        rowKey='name'
        handleModalVisible={handleModalVisible}
        handleSearch={handleSearchSubplans}
        updateStoreList={fetchSubplans}
      />
    </>
  )
}

export default Subplans