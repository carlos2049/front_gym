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
  rowKey: string,
  handleModalVisible: (visible: boolean) => void,
  handleSearchUsers: (value: string) => void,
  fetchUsuers: () => void
  // handleModalVisible: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void,

}