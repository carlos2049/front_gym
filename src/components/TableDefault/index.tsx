import React from 'react'
import { Table, Space, Button, Switch, Pagination } from 'antd';
import { ITable } from './interface';
import './styles.less'

const TableDefault: React.FC<ITable> = ({
  columns,
  list,
  onChange,
  handlePagination,
  limit,
  rowKey,
  handleModalVisible
}) => {
  return (
    <div className='clase-papa'>
      <div className='button-active-switch'>
        <Button type="primary" onClick={() => handleModalVisible(true)}>Crear Usuario</Button>
        <Switch defaultChecked onChange={onChange} />
      </div>
      <Table columns={columns}
        rowKey={rowKey}
        dataSource={list?.rows || []}
        pagination={{
          onChange: handlePagination,
          defaultPageSize: limit,
          defaultCurrent: 1,
          total: list?.count

        }}

      />
    </div>)
}

export default TableDefault