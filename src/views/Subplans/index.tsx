import { useState, useEffect } from 'react'
import TableDefault from "../../components/TableDefault"
import SubplanModal from '../../components/subplans'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchAllSubplans,
  searchsubplans,
  ActivateAndDeactivateSubplan,
  getSubplan,
  resetSubplan
} from '../../services/endpoints';

import { Button, Popconfirm, Space, Tag } from "antd"
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { IState } from '../../interfaces/state'
import { limit } from '../../config';


const Subplans: React.FC = () => {

  const [page, setPage] = useState<number>(1)
  const [state, setState] = useState<boolean>(true)
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const { listSubplans, subplan } = useSelector((state: IState) => state.subplans)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(fetchAllSubplans(limit, page, state))
  }, [dispatch, page, state])

  useEffect(() => {
    if (subplan) {
      setModalVisible(true)
    }
  }, [subplan])

  const onChange = (checked: boolean) => {
    setState(checked)
  }

  const handlePagination = (page: number, pagesize: number) => {
    setPage(page)
  }

  const handleModalVisible = (visible: boolean) => {
    setModalVisible(visible);
    dispatch(resetSubplan())
  }

  const handleSearchSubplans = (value: string) => {
    dispatch(searchsubplans(value))
  }

  const fetchSubplans = () => {
    dispatch(fetchAllSubplans(limit, page, state))
  }

  const deactivateSubplan = (id: number) => {
    dispatch(ActivateAndDeactivateSubplan(id, fetchSubplans))
  }

  const getSubplanAndActiveModal = (id: number) => {
    dispatch(getSubplan(id))
  }

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      width: '30%'
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
      width: '15%',
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
      width: '15%',
      render: (rowKey: { id: number }) => (
        <Space size="small">
          <Button type="link"
            onClick={() => getSubplanAndActiveModal(rowKey.id)}
            icon={<EditOutlined />}
            shape="circle" />
          <Popconfirm
            title={`¿${state ? 'Desactivar' : 'Activar'} subplan?`}
            onConfirm={() => deactivateSubplan(rowKey.id)}
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
      <SubplanModal
        visible={modalVisible}
        handleModalVisible={handleModalVisible}
        fetchSubplans={fetchSubplans}
        subplanObj={subplan}
      />
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