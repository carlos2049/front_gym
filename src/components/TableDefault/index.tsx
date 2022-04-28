import React, { ChangeEvent } from 'react'
import { Table, Space, Button, Switch, Input } from 'antd';
import { ITable } from './interface';
import './styles.less'
const { Search } = Input;

const TableDefault: React.FC<ITable> = ({
  columns,
  list,
  onChange,
  handlePagination,
  limit,
  rowKey,
  handleModalVisible,
  handleSearch,
  updateStoreList
}) => {

  const onSearch = (value: string) => {
    if (value) {
      handleSearch(value)
    }
  }

  const handleVoidString = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      updateStoreList()
    }
  }
  console.log('listaasa', list)
  return (
    <div className='clase-papa'>
      <div className='button-active-switch'>
        <Button type="primary" onClick={() => handleModalVisible(true)}>Nuevo</Button>
        <Space direction="horizontal">
          <Search placeholder="" onChange={handleVoidString} onSearch={onSearch} style={{ width: 200 }} />
        </Space>
        <Switch defaultChecked onChange={onChange} />
      </div>
      <Table columns={columns}
        size="small"
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