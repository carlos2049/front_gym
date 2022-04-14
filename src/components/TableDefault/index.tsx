import React from 'react'
import { Table, Space, Button, Switch, Pagination, Input, Select } from 'antd';
import { ITable } from './interface';
import './styles.less'
const { Search } = Input;
const { Option } = Select

const TableDefault: React.FC<ITable> = ({
  columns,
  list,
  onChange,
  handlePagination,
  limit,
  rowKey,
  handleModalVisible
}) => {

  const onSearch = (value: any) => {
    console.log(value)

  }

  return (
    <div className='clase-papa'>
      <Space direction="horizontal">
        <Select defaultValue="Option1">
          <Option value="Option1">Option1</Option>
          <Option value="Option2">Option2</Option>
        </Select>
        <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
      </Space>
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