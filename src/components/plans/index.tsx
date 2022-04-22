import { Modal, Button, Form, Input } from 'antd';
import React from 'react';


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

interface IPLanComponent {
  visible: boolean,
  handleModalVisible: (checked: boolean) => void,
  // fetchUsuers: () => void,
  // userObj: IUser | null

}

const PlanModal: React.FC<IPLanComponent> = ({ visible, handleModalVisible }) => {

  const handleModal = (visible: boolean) => {
    // form.resetFields()
    handleModalVisible(visible)
    // fetchUsuers()
  }

  return (
    <>
      <Modal
        // width={"70%"}
        // title="Crear Usuario"
        // centered
        visible={visible}
        footer={null}
        // onOk={() => handleModalVisible(false)}
        onCancel={() => handleModal(false)}
      >
        <Form
          {...layout}
        // form={form}
        // name="nest-messages"
        // onFinish={onFinish}
        // validateMessages={validateMessages}
        // layout='vertical'
        >

          <div>
            <Form.Item name={['plan', 'name']} label="Nombre" rules={[{ required: true }]}>
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