import React, { useEffect } from 'react';
import { Modal, Button, Form, Input, InputNumber, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux'

import { createSubplan, fetchAllPlans, updateSubplan } from '../../services/endpoints'
import { ISubplan, IState } from '../../interfaces/state'

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

interface ISubpLanComponent {
  visible: boolean,
  handleModalVisible: (checked: boolean) => void,
  fetchSubplans: () => void,
  subplanObj: ISubplan | null

}

const SubplanModal: React.FC<ISubpLanComponent> = ({ visible, handleModalVisible, fetchSubplans, subplanObj }) => {
  const dispatch = useDispatch()
  const [form] = Form.useForm();
  const { listPlans } = useSelector((state: IState) => state.plans)
  useEffect(() => {
    if (visible) {
      dispatch(fetchAllPlans('all', 1, true))
    }
  }, [dispatch, visible])

  useEffect(() => {
    if (subplanObj) {
      form.setFieldsValue({
        planId: subplanObj?.plan,
        name: subplanObj?.name,
        monthly_value: subplanObj?.monthly_value,
        quarterly_value: subplanObj?.quarterly_value,
        semester_value: subplanObj?.semester_value,
        annual_value: subplanObj?.annual_value,
      })
    }
    // eslint-disable-next-line
  }, [subplanObj])

  const handleModal = (visible: boolean) => {
    form.resetFields()
    handleModalVisible(visible)
    fetchSubplans()
  }

  const onFinish = (values: ISubplan) => {
    if (subplanObj) {
      updateSubplan(values, subplanObj.id, handleModal)
    } else {
      dispatch(createSubplan(values, handleModal))
    }
  };

  const validateMessages = {
    // eslint-disable-next-line
    required: '${label} es requerido',
    types: {
      email: 'No es un email valido',
      // eslint-disable-next-line
      number: '${label} ingresado no es un valor numerico',
    },
    number: {
      // eslint-disable-next-line
      range: '${label} must be between ${min} and ${max}',
    },
  };

  return (
    <>
      <Modal
        width={"70%"}
        title="Crear subplan"
        centered
        visible={visible}
        footer={null}
        // onOk={() => handleModalVisible(false)}
        onCancel={() => handleModal(false)}
      >
        <Form
          {...layout}
          form={form}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
          layout='vertical'
        >

          <div>
            <Form.Item
              name={['planId']}
              label="Tipo plan"
              rules={[{ required: true, message: 'Seleccione plan' }]}
            >
              <Select placeholder="Seleccionar plan" >
                {
                  listPlans ? listPlans.rows?.map((x: any) => (
                    <Option key={x.id} value={x.id}>{x.name}</Option>
                  ))
                    : ''
                }
              </Select>
            </Form.Item>
            <Form.Item name={['name']} label="Nombre subplan" rules={[{ required: true }]}>
              <Input placeholder='Ejemplo: subplan 1' />
            </Form.Item>
            <Form.Item name={['monthly_value']} label="Valor mensual" rules={[{ required: true }]}>
              <InputNumber placeholder='Ejemplo: 1000' />
            </Form.Item>
            <Form.Item name={['quarterly_value']} label="Valor trimestral" rules={[{ required: true }]}>
              <InputNumber placeholder='Ejemplo: 1000' />
            </Form.Item>
            <Form.Item name={['semester_value']} label="Valor semestral" rules={[{ required: true }]}>
              <InputNumber placeholder='Ejemplo: 1000' />
            </Form.Item>
            <Form.Item name={['annual_value']} label="Valor anual" rules={[{ required: true }]}>
              <InputNumber placeholder='Ejemplo: 1000' />
            </Form.Item>
          </div>
          <div className='footer-button'>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit"> Crear </Button>
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button danger onClick={() => handleModal(false)} > Cancelar </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>

    </>
  )
}

export default SubplanModal