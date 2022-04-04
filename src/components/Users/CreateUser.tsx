import { useState, useEffect } from 'react'
import { Modal, Button, Form, Input, InputNumber, Select, DatePicker, Space } from 'antd';
import { fetchAllProfiles } from '../../store/slices/profiles';
import { useDispatch, useSelector } from 'react-redux'
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

interface IProfiles {
  id: number
  name: string,
  state: boolean
}

const CreateUser = () => {
  const dispatch = useDispatch()
  const state: boolean = true

  const { list } = useSelector((state: any) => state.profiles)
  useEffect(() => {
    dispatch(fetchAllProfiles(state))
  }, [dispatch])
  console.log(list)

  const [modal2Visible, setModal2Visible] = useState<boolean>(true)

  const handleModal2Visible = (modal2Visible: any) => {
    setModal2Visible(modal2Visible);
  }
  const onFinish = (values: any) => {
    console.log(values);
  };

  function onChange(date: any, dateString: string) {
    console.log(date, dateString);
  }

  const validateMessages = {
    required: '${label} es requerido',
    types: {
      email: 'No es un email valido',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };


  return (<>

    <Modal
      width={"70%"}
      title="Crear Usuario"
      centered
      visible={modal2Visible}
      footer={null}
      // onOk={() => handleModal2Visible(false)}
      onCancel={() => handleModal2Visible(false)}

    >
      <Form {...layout}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
        layout='vertical'
        initialValues={{
          user: {
            name: 'carlos'
          }
        }}
      >
        <Form.Item
          name={['user', 'profile']}
          label="Tipo Perfil"
          rules={[{ required: true, message: 'Seleccione Perfil' }]}
        >
          <Select placeholder="Seleccionar Perfil">
            {
              list && list.rows ? list.rows.map((x: IProfiles) => (
                <Option key={x.id} value={x.id}>{x.name}</Option>
              ))
                : ''
            }

          </Select>
        </Form.Item>
        <div>
          <Form.Item name={['user', 'rut']} label="Rut" rules={[{ required: true }]}>
            <Input placeholder='Ejemplo : 14678432-7' />
          </Form.Item>
          <Form.Item name={['user', 'name']} label="Nombres" rules={[{ required: true }]}>
            <Input placeholder='Ejemplo: Juan Carlos' />
          </Form.Item>
          <Form.Item name={['user', 'firstLastname']} label="Apellido Paterno" rules={[{ required: true }]}>
            <Input placeholder='Ejemplo: Rivera' />
          </Form.Item>
          <Form.Item name={['user', 'secondLastname']} label="Apellido Materno" rules={[{ required: true }]}>
            <Input placeholder='Ejemplo: Perez' />
          </Form.Item>
          <Form.Item name={['user', 'sex']} label="Sexo" rules={[{ required: true }]}>
            <Select placeholder="Seleccionar Sexo">
              <Option key={1} value={'man'}>Hombre</Option>
              <Option key={2} value={'woman'}>Mujer</Option>
            </Select>
          </Form.Item>
          <Form.Item name={['user', 'birthdate']} label="Fecha Nacimiento" rules={[{ required: true }]}>
            <DatePicker onChange={onChange} />
          </Form.Item>
          <Form.Item name={['user', 'address']} label="Direccion" rules={[{ required: true }]}>
            <Input placeholder='Ejemplo: eucaliptus n° 32' />
          </Form.Item>
          <Form.Item name={['user', 'phone']} label="Celular" rules={[{ required: true }]}>
            <Input placeholder='Ejemplo: 9 87564352' />
          </Form.Item>
          <Form.Item name={['user', 'email']} label="Email" rules={[{ required: true, type: 'email' }]}>
            <Input placeholder='Ejemplo: alguien@gmail.com' />
          </Form.Item>
          <Form.Item name={['user', 'profession']} label="Cargo" rules={[{ required: true }]}>
            <Input placeholder='Ejemplo: alguien@gmail.com' />
          </Form.Item>
          <Form.Item name={['user', 'user']} label="Usuario" rules={[{ required: true }]}>
            <Input placeholder='Ejemplo: Juan123' />
          </Form.Item>
          <Form.Item name={['user', 'pass']} label="Clave" rules={[{ required: true, }]}>
            <Input.Password />
          </Form.Item>

        </div>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit"> Crear </Button>
        </Form.Item>
      </Form>
    </Modal>
  </>)
}

export default CreateUser