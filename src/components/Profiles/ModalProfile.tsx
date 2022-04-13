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
  profile: Iprofile | null,
  listPermissions: {
    id: number,
    state: boolean,
    name: string
  }[]
}

const ModalProfile: React.FC<IModalProfile> = ({ visible, handleModalVisible, profile, listPermissions }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (profile) {
      form.setFieldsValue({

      })
    }
  }, [])



  const onFinish = (e: Event) => {
    console.log(e)
  }
  console.log('listPermiss', profile)


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
          onFinish={onFinish}
          // validateMessages={validateMessages}
          layout='vertical'
        >

          <div>
            {/* <Form.Item name={['profile', 'name']} label="Nombre" rules={[{ required: true }]}>
              <Input placeholder='' />
            </Form.Item> */}
            <Form.Item name="permissions">
              <Checkbox.Group className="check-group">
                <Row className="checkbox-row">
                  {
                    listPermissions && listPermissions.length > 0 ?
                      listPermissions.map(x => (
                        <Col key={x.id}>
                          <Checkbox value={x.id}>{x.name}</Checkbox>
                        </Col>
                      ))
                      : ''
                  }
                </Row>
              </Checkbox.Group>
            </Form.Item>
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
              <Button type="primary" htmlType="submit"> guardar </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  )
}

export default ModalProfile