import { useEffect, useState } from 'react'
import { ActivateAndDeactivateProfile, fetchAllProfiles, getProfile } from '../../store/endpoints';
import { useDispatch, useSelector } from 'react-redux'
import ModalProfile from '../../components/Profiles/ModalProfile';
import { Table, Space, Button, Switch, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';


const Profiles = () => {

  const dispatch = useDispatch()
  const [state, setState] = useState<boolean>(true)
  const [visible, setVisible] = useState<boolean>(false)
  const { list, profile } = useSelector((state: any) => state.profiles)

  useEffect(() => {
    dispatch(fetchAllProfiles(state))
  }, [dispatch, state])

  useEffect(() => {
    if (profile) {
      handleModalVisible(true)
    }
  }, [profile])

  const handleSwitch = (checked: boolean) => {
    setState(checked)
  }

  const updateTableProfiles = () => {
    dispatch(fetchAllProfiles(state))
  }
  const handleModalVisible = (visible: boolean) => {
    setVisible(visible)
  }

  const deactivateProfile = (id: number) => {
    dispatch(ActivateAndDeactivateProfile(id, updateTableProfiles))
  }
  const getProfileAndActiveModal = (id: number) => {
    dispatch(getProfile(id))
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
          <Button type="link"
            onClick={() => getProfileAndActiveModal(rowKey.id)}
            icon={<EditOutlined />}
            shape="circle" />
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
      <ModalProfile
        visible={visible}
        handleModalVisible={handleModalVisible}
        profile={null}
      />
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