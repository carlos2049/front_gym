import React from 'react'
import { Table, Space, Button, Switch, Pagination } from 'antd';
import { ITable } from './interface';

const TableDefault: React.FC<ITable> = ({ columns, list, onChange, handlePagination, limit, rowKey }) => {
  return (
    <>
      <div className='button-active-switch'>
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
      {/* <Pagination
      /> */}
    </>)
}

export default TableDefault