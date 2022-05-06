import { useEffect, useState } from "react"
import { Form, Select, Input, Radio, Space, InputNumber, Row, Col, RadioChangeEvent } from "antd"
import { ISubplan } from "../../../interfaces/state"
import { ISectionSubplan } from "./interface"
import './styles.less'
import { valueType } from "antd/lib/statistic/utils"

const { Option } = Select

interface IRES {
  registrationValue: number,
  discount: number,
  selectSub: number,
  total: number,
  months: number,
  disabledInput: boolean
}

const SectionSubplan: React.FC<ISectionSubplan<ISubplan>> = ({ listSubplans, form, subplan }) => {

  const [selectSubplan, setSelectSubplan] = useState<ISubplan>()
  // const [subplan, setSubplan] = useState<number | null>(null)
  const [total, setTotal] = useState<number>(0)

  const [nuevo, setNuevo] = useState<IRES>({
    registrationValue: 0,
    discount: 0,
    selectSub: 0,
    total: 0,
    months: 0,
    disabledInput: true
  })

  useEffect(() => {
    const subplanFinded = listSubplans.find(x => x.id === subplan)
    setSelectSubplan(subplanFinded)
    // eslint-disable-next-line
  }, [subplan])

  useEffect(() => {
    const result = ((nuevo.months * nuevo.selectSub) + nuevo.registrationValue) - nuevo.discount
    setTotal(result)
  }, [nuevo])

  useEffect(() => {
    if (total >= 0 || nuevo.months) {
      form.setFieldsValue({
        user: {
          total_plan: total,
          amount_months: nuevo.months ? nuevo.months : null,
        }
      })
    }
    // eslint-disable-next-line
  }, [total, nuevo.months])



  const handleSelectSubplan = (e: number) => {
    const subplanFinded = listSubplans.find(x => x.id === e)
    setSelectSubplan(subplanFinded)
  }

  const handleRegistrationValue = (value: valueType) => {
    setNuevo({ ...nuevo, registrationValue: Number(value) })
    // const result = value
    // form.setFieldsValue({
    //   user: {
    //     total_plan: 1000,
    //   }
    // })
  }

  const handleDiscount = (value: valueType) => {
    // setDiscount(Number(value))
    setNuevo({ ...nuevo, discount: Number(value) })

  }

  const handleSelectRadio = (value: RadioChangeEvent) => {
    if (selectSubplan) {
      if (value.target.value === 1) {
        setNuevo({ ...nuevo, selectSub: selectSubplan.monthly_value, disabledInput: false })
      }
      if (value.target.value === 2) {
        setNuevo({ ...nuevo, selectSub: selectSubplan.quarterly_value, months: 3, disabledInput: true })
      }
      if (value.target.value === 3) {
        setNuevo({ ...nuevo, selectSub: selectSubplan.semester_value, months: 6, disabledInput: true })
      }
      if (value.target.value === 4) {
        setNuevo({ ...nuevo, selectSub: selectSubplan.annual_value, months: 12, disabledInput: true })

      }
    }
  }

  const handleAmountMonths = (value: valueType) => {
    setNuevo({ ...nuevo, months: Number(value) })
  }

  console.log('kasjdkjsajkd', nuevo)
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
          <Form.Item name={['user', 'select_value_sub_plan']}>
            <Radio.Group
              onChange={handleSelectRadio}
              // value={2}
              disabled={selectSubplan?.id ? false : true}
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
            <InputNumber disabled={nuevo.disabledInput} placeholder='' onChange={handleAmountMonths} />
          </Form.Item>
          <Form.Item name={['user', 'end_date_plan']} label="Termino del plan" rules={[{ required: true }]}>
            <Input type={'date'} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item style={{ width: '100%' }} name={['user', 'registration_value']} label="valor matricula">
            <InputNumber name="registration_value" placeholder='' onChange={handleRegistrationValue} />
          </Form.Item>
          <Form.Item style={{ width: '100%' }} name={['user', 'discount']} label="descuento en $">
            <InputNumber placeholder='' onChange={handleDiscount} />
          </Form.Item>
          <Form.Item style={{ width: '100%' }} name={['user', 'total_plan']} label="Valor a cancelar">
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