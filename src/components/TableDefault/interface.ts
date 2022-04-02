import { ColumnsType } from 'antd/lib/table';
export interface ITable {
  columns: ColumnsType<any>,
  list: {
    rows: Object[],
    count: number
  },
  onChange: (checked: boolean) => void,
  handlePagination: (page: number, pagesize: number) => void,
  limit: number,
  rowKey: string
}