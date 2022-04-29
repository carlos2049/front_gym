import { useEffect, useState } from 'react'
import { ActivateAndDeactivatePermission, fetchAllPermissions } from '../../services/endpoints';
import { useDispatch, useSelector } from 'react-redux'
import { Table, Space, Button, Switch, Popconfirm, Tag } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const Permissions = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState<number>(1)
  const [state, setState] = useState<boolean>(true)
  const { listPermissions } = useSelector((state: any) => state.permissions)
  const limit: number = 8
  useEffect(() => {
    dispatch(fetchAllPermissions(state, page, limit))
  }, [dispatch, state, page])

  const handleSwitch = (checked: boolean) => {
    setState(checked)
  }

  const updateTableProfiles = () => {
    dispatch(fetchAllPermissions(state, page, limit))
  }

  const deactivatePermission = (id: number) => {
    dispatch(ActivateAndDeactivatePermission(id, updateTableProfiles))
  }
  const onchange = (page: number, pageSize: number): void => {
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
          <Popconfirm
            title={`¿${state ? 'Desactivar' : 'Activar'} perfil?`}
            onConfirm={() => deactivatePermission(rowKey.id)}
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
        size='small'
        columns={columns}
        dataSource={listPermissions && listPermissions.rows ? listPermissions.rows : []}
        rowKey='name'
        pagination={{
          defaultPageSize: limit,
          defaultCurrent: 1,
          total: listPermissions?.count,
          onChange: onchange
        }}
      />
    </>
  )
}

export default Permissions