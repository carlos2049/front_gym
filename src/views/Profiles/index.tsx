import { useEffect, useState } from 'react'
import { ActivateAndDeactivateProfile, fetchAllProfiles } from '../../store/endpoints';
import { useDispatch, useSelector } from 'react-redux'
import { Table, Space, Button, Switch, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';


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

  const updateTableProfiles = () => {
    dispatch(fetchAllProfiles(state))
  }

  const deactivateProfile = (id: number) => {
    dispatch(ActivateAndDeactivateProfile(id, updateTableProfiles))
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
      render: (state: boolean) => <p>{state ? 'activado' : 'desactivado'}</p>
    },
    {
      title: 'Action',
      key: 'action',
      render: (rowKey: { id: number }) => (
        <Space size="middle">
          <Popconfirm
            title={`¿${state ? 'Desactivar' : 'Activar'} perfil?`}
            onConfirm={() => deactivateProfile(rowKey.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" icon={<DeleteOutlined />} shape="circle" />
          </Popconfirm>
        </Space>
      ),
    },
  ];


  return (
    <>
      <Switch defaultChecked onChange={handleSwitch} />
      <Table
        columns={columns}
        dataSource={list ? list : []}
        rowKey='name'
        pagination={false}
      />
    </>)
}

export default Profiles