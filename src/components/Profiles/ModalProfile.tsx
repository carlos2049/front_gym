import { useEffect } from "react"
import { Iprofile } from './interface'
import { Button, Checkbox, Col, Form, Input, Modal, Row } from "antd"
import './styles.less'
import { CheckboxValueType } from "antd/lib/checkbox/Group";

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

  function onChange(checkedValues: CheckboxValueType[]) {
    console.log('checked', checkedValues);
  }

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
            <Checkbox.Group className="check-group" onChange={onChange}>
              <Row className="checkbox-row">
                <Col >
                  <Checkbox value="A">A</Checkbox>
                </Col>
                <Col >
                  <Checkbox value="B">B</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="C">C</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="D">D</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="E">E</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </div>
          <div className='footer-button'>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button
                danger
                onClick={() => handleModalVisible(false)}
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