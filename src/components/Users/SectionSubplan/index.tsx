import { useState } from "react"
import { Form, Select, Table, Input, Radio, Space } from "antd"
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
          <div className="text_title">Valor mensual</div>
          <div className="text_value">{selectSubplan ? selectSubplan.monthly_value : ''} </div>
        </div>
        <div className="div_children">
          <div className="text_title">Valor trimestral</div>
          <div className="text_value" > {selectSubplan?.quarterly_value}</div>
        </div>
        <div className="div_children">
          <div className="text_title">Valor semestral</div>
          <div className="text_value">{selectSubplan?.semester_value} </div>
        </div>
        <div className="div_children">
          <div className="text_title">Valor anual</div>
          <div className="text_value">{selectSubplan?.annual_value} </div>
        </div>
      </div>
      <Form.Item>
        <Radio.Group
        // onChange={this.onChange} 
        // value={value}
        >
          <Space direction="vertical">
            <Radio value={1}>Option A</Radio>
            <Radio value={2}>Option B</Radio>
            <Radio value={3}>Option C</Radio>
          </Space>
        </Radio.Group>

      </Form.Item>
    </>)
}
export default SectionSubplan