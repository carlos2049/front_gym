import React, { useEffect } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux'
import { createPlan, updatePlan } from '../../services/endpoints'
import { IPlan } from '../../interfaces/state'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

interface IPLanComponent {
  visible: boolean,
  handleModalVisible: (checked: boolean) => void,
  fetchPlans: () => void,
  planObj: IPlan | null

}

const PlanModal: React.FC<IPLanComponent> = ({ visible, handleModalVisible, fetchPlans, planObj }) => {
  const dispatch = useDispatch()
  const [form] = Form.useForm();

  useEffect(() => {
    // setUsuario(user)
    if (planObj) {
      form.setFieldsValue({
        name: planObj?.name
      })
    }
    // eslint-disable-next-line
  }, [planObj])

  const handleModal = (visible: boolean) => {
    form.resetFields()
    handleModalVisible(visible)
    fetchPlans()
  }

  const onFinish = (values: IPlan) => {
    const { name } = values
    const planObjSend = {
      name
    }

    if (planObj) {
      updatePlan({ ...planObjSend }, planObj.id, handleModal)
    } else {
      dispatch(createPlan({ ...planObjSend }, handleModal))
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
        title="Crear plan"
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
            <Form.Item name={['name']} label="Nombre" rules={[{ required: true }]}>
              <Input placeholder='Ejemplo: plan 1' />
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

export default PlanModal