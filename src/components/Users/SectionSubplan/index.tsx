import { useState } from "react"
import { Form, Select, Table, Input, Radio, Space, InputNumber, Row, Col } from "antd"
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
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Form.Item>
            <Radio.Group
            // onChange={this.onChange} 
            // value={value}
            >
              <Space direction="vertical">
                <Radio value={1}>Valor mensual</Radio>
                <Radio value={2}>Valor trimestral</Radio>
                <Radio value={3}>Valor semestral</Radio>
                <Radio value={4}>Valor anual</Radio>
              </Space>
            </Radio.Group>

          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name={['user', 'amount_months']} label="cantidad de meses">
            <InputNumber placeholder='' />
          </Form.Item>
          <Form.Item name={['user', 'end_date_plan']} label="Termino del plan" rules={[{ required: true }]}>
            <Input type={'date'} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item style={{ width: '100%' }} name={['user', 'registration_value']} label="valor matricula">
            <InputNumber placeholder='' />
          </Form.Item>
          <Form.Item style={{ width: '100%' }} name={['user', 'discount']} label="descuento en $">
            <InputNumber placeholder='' />
          </Form.Item>
          <Form.Item style={{ width: '100%' }} name={['user', 'value_cancel']} label="Valor a cancelar">
            <InputNumber disabled placeholder='' />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item name={['user', 'physical_activity']} label="Actividad fisica" >
            <Input placeholder='' />
          </Form.Item>
          <Form.Item name={['user', 'illnesses_and_injuries']} label="Enfermedades y lesiones" >
            <Input placeholder='' />
          </Form.Item>
          <Form.Item name={['user', 'emergency_contact']} label="Nombre contacto de emergencia" >
            <Input placeholder='' />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={['user', 'desired_goal']} label="Objetivo deseado" >
            <Input placeholder='' />
          </Form.Item>
          <Form.Item name={['user', 'allergies']} label="Alergias" >
            <Input placeholder='' />
          </Form.Item>
          <Form.Item name={['user', 'emergency_phone']} label="Contacto de emergencia" >
            <Input placeholder='' />
          </Form.Item>
        </Col>

      </Row>




    </>)
}
export default SectionSubplan