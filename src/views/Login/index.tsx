import { Form, Input, Button, Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../services/endpoints'
import './styles.less'

interface ILogin {
  rut: string,
  password: string
}

const Login = () => {
  const dispatch = useDispatch()

  const onFinish = (values: ILogin) => {
    const { rut, password } = values
    dispatch(login({ rut, password }))
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <div className='content' >
        <div className='form'
        >
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            // initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout='vertical'
          >
            <Form.Item
              label="Rut"
              name="rut"
              rules={[{ required: true, message: 'Ingrese Rut' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Contraseña"
              name="password"
              rules={[{ required: true, message: 'Ingrese contraseña' }]}
            >
              <Input.Password />
            </Form.Item>

            {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Ingresar
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  )
}

export default Login