import { useEffect, useState } from 'react'
import { ActivateAndDeactivateProfile, fetchAllPermissions, fetchAllProfiles, getProfile, resetProfile } from '../../store/endpoints';
import { useDispatch, useSelector } from 'react-redux'
import ModalProfile from '../../components/Profiles/ModalProfile';
import { Table, Space, Button, Switch, Popconfirm, Tag } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { IState } from '../../interfaces/state'


const Profiles = () => {

  const dispatch = useDispatch()
  const [state, setState] = useState<boolean>(true)
  const [visible, setVisible] = useState<boolean>(false)
  const { list, profile } = useSelector((state: IState) => state.profiles)
  const { listPermissions } = useSelector((state: IState) => state.permissions)
  const limit = 'all'
  const page = 0
  useEffect(() => {
    dispatch(fetchAllProfiles(state))
  }, [dispatch, state])

  useEffect(() => {
    if (profile) {
      handleModalVisible(true)
    }
    // eslint-disable-next-line
  }, [profile])
  useEffect(() => {
    dispatch(fetchAllPermissions(state, page, limit))
  }, [dispatch, state])

  const handleSwitch = (checked: boolean) => {
    setState(checked)
  }

  const updateTableProfiles = () => {
    dispatch(fetchAllProfiles(state))
  }
  const handleModalVisible = (visible: boolean) => {
    console.log('handleModalVisible', visible)
    setVisible(visible)
    if (!visible) {
      dispatch(resetProfile())
    }
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

  console.log('listPermissions', profile)

  return (
    <>
      <ModalProfile
        visible={visible}
        handleModalVisible={handleModalVisible}
        profile={profile}
        listPermissions={listPermissions.rows}
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