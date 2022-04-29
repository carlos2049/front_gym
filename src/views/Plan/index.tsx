import { useEffect, useState } from "react";
import { fetchAllPlans, searchPlans, resetPlan, ActivateAndDeactivatePlan, getPlan } from '../../services/endpoints';
import { Button, Popconfirm, Space, Tag } from "antd"
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import TableDefault from "../../components/TableDefault"
import PlanModal from "../../components/plans";
import { useDispatch, useSelector } from 'react-redux'
import { IState } from '../../interfaces/state'


const Plan: React.FC = () => {
  const [page, setPage] = useState<number>(1)
  const [state, setState] = useState<boolean>(true)
  const { listPlans, plan } = useSelector((state: IState) => state.plans)
  const [modalVisible, setModalVisible] = useState<boolean>(false)


  const limit: number = 5
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllPlans(limit, page, state))
  }, [dispatch, page, state])

  useEffect(() => {
    if (plan) {
      setModalVisible(true)
    }
  }, [plan])

  const onChange = (checked: boolean) => {
    setState(checked)
  }

  const handlePagination = (page: number, pagesize: number) => {
    setPage(page)
  }

  const handleModalVisible = (visible: boolean) => {
    setModalVisible(visible);
    dispatch(resetPlan())
  }

  const handleSearchUsers = (value: string) => {
    dispatch(searchPlans(value))
  }

  const fetchPlans = () => {
    dispatch(fetchAllPlans(limit, page, state))
  }

  const deactivateUser = (id: number) => {
    dispatch(ActivateAndDeactivatePlan(id, fetchPlans))
  }

  const getPlanAndActiveModal = (id: number) => {
    dispatch(getPlan(id))
  }

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
      render: (state: boolean) => (
        <Space size={'small'}>
          {
            state ?
              <Tag color="success">activado</Tag> :
              <Tag color="error">desactivado</Tag>
          }
        </Space>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (rowKey: { id: number }) => (
        <Space size="small">
          <Button type="link"
            onClick={() => getPlanAndActiveModal(rowKey.id)}
            icon={<EditOutlined />}
            shape="circle" />
          <Popconfirm
            title={`¿${state ? 'Desactivar' : 'Activar'} plan?`}
            onConfirm={() => deactivateUser(rowKey.id)}
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
      <PlanModal
        visible={modalVisible}
        handleModalVisible={handleModalVisible}
        fetchPlans={fetchPlans}
        planObj={plan}
      />
      <TableDefault
        columns={columns}
        list={listPlans}
        onChange={onChange}
        handlePagination={handlePagination}
        limit={limit}
        rowKey='name'
        handleModalVisible={handleModalVisible}
        handleSearch={handleSearchUsers}
        updateStoreList={fetchPlans}
      />
    </>
  )
}

export default Plan