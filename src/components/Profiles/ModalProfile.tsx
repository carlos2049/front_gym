import { useEffect } from "react"
import { Iprofile } from './interface'
import { Button, Form, Input, Modal } from "antd"
import './styles.less'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

interface IModalProfile {
  visible: boolean,
  handleModalVisible: (visible: boolean) => void,
  profile: Iprofile | null
}

const ModalProfile: React.FC<IModalProfile> = ({ visible, handleModalVisible, profile }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (profile) {
      form.setFieldsValue({

      })
    }
  }, [])

  return (
    <>
      <Modal
        width={"70%"}
        title="Actualizar Perfil"
        centered
        visible={visible}
        footer={null}
        // onOk={() => handleModalVisible(false)}
        onCancel={() => handleModalVisible(false)}
      >
        <Form
          {...layout}
          form={form}
          name="nest-messages"
          // onFinish={onFinish}
          // validateMessages={validateMessages}
          layout='vertical'
        >

          <div>
            <Form.Item name={['profile', 'name']} label="Nombre" rules={[{ required: true }]}>
              <Input placeholder='' />
            </Form.Item>
            <Form.Item name={['profile', 'state']} label="Estado" rules={[{ required: true }]}>
              <Input placeholder='' />
            </Form.Item>
          </div>
          <div className='footer-button'>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button
                danger
              // onClick={() => handleModal(false)}
              >
                Cancelar
              </Button>
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit"> Crear </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  )
}

export default ModalProfile