import { useState } from "react"
import { Form, Select, Table, Input } from "antd"
import { ISubplan } from "../../../interfaces/state"
import { ISectionSubplan } from "./interface"
import './styles.less'

const { Option } = Select
const SectionSubplan: React.FC<ISectionSubplan<ISubplan>> = ({ listSubplans }) => {

  const [selectSubplan, setSelectSubplan] = useState<ISubplan>()


  const handleSelectSubplan = (e: number) => {
    const subplanFinded = listSubplans.find(x => x.id === e)
    setSelectSubplan(subplanFinded)
    // console.log('sahdkjsakjd', subplanFinded)
  }

  return (
    <>
      <Form.Item
        name={['user', 'subplan']}
        label="Tipo subplan"
        rules={[{ required: true, message: 'Seleccione subplan' }]}
      >
        <Select placeholder="Seleccionar subplan" onSelect={handleSelectSubplan}>
          {
            listSubplans ? listSubplans.map((x: ISubplan) => (
              <Option key={x.id} value={x.id}>{x.name}</Option>
            ))
              : ''
          }
        </Select>
      </Form.Item>
      <div className="div_father">
        <div className="div_children">
          <div className="text">valor mensual</div>
          <Input disabled value={selectSubplan?.monthly_value} />
        </div>
        <div className="div_children">
          <div className="text">valor trimestral</div>
          <Input disabled value={selectSubplan?.quarterly_value} />
        </div>
        <div className="div_children">
          <div className="text">valor semestral</div>
          <Input disabled value={selectSubplan?.semester_value} />
        </div>
        <div className="div_children">
          <div className="text">valor anual</div>
          <Input disabled value={selectSubplan?.annual_value} />
        </div>
      </div>
    </>)
}
export default SectionSubplan