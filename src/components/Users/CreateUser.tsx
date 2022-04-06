import { useEffect, useState } from 'react'
import moment from 'moment';
import { Modal, Button, Form, Input, Select, DatePicker, InputNumber, Switch } from 'antd';
import { fetchAllProfiles } from '../../store/slices/profiles';
import { createUser } from '../../store/endpoints'
import { useDispatch, useSelector } from 'react-redux'
import { IUser, IProfiles, IValues } from './interface';
const { Option } = Select;
const { TextArea } = Input

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};


interface ICreateUSer {
  visible: boolean,
  handleModalVisible: (checked: boolean) => void,
  fetchUsuers: () => void

}


const CreateUser: React.FC<ICreateUSer> = ({ visible, handleModalVisible, fetchUsuers }) => {
  const dispatch = useDispatch()
  const [date, setDate] = useState<string>()
  const [form] = Form.useForm();

  // const state: boolean = true

  const { list } = useSelector((state: any) => state.profiles)
  useEffect(() => {
    dispatch(fetchAllProfiles(true))
  }, [dispatch])


  const handleModal = (visible: boolean) => {
    form.resetFields()
    handleModalVisible(visible)
    fetchUsuers()
  }
  const onFinish = (values: IValues) => {

    const { user } = values

    const userObj: IUser = {
      id_perfil: user.perfil,
      // id_sub_plan: values.sub,
      rut: user.rut,
      names: user.name,
      first_last_name: user.firstLastname,
      second_last_name: user.secondLastname,
      sex: user.sex,
      birth_date: user.birthdate,
      address: user.address,
      phone: user.phone,
      email: user.email,
      profession: user.profession,
      image: user.image,
      admission_date: user.admissionDate,
      salary_base: user.salaryBase ? user.salaryBase : null,
      weekly_hours: user.weeklyHours,
      password: user.pass,
      observations: user.observations
      // value_sub_plan: number,
      // amount_months: number,
      // total_plan: number,
    } as IUser

    dispatch(createUser({ ...userObj }, handleModal))

  };

  const onChange = (date: any, dateString: string) => {
    // setDate)
    // const fecha = moment(date).format('YYYY-MM-DD')
    setDate(date)
  }

  const validateMessages = {
    required: '${label} es requerido',
    types: {
      email: 'No es un email valido',
      number: '${label} ingresado no es un valor numerico',
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
      visible={visible}
      footer={null}
      onOk={() => handleModalVisible(false)}
      onCancel={() => handleModal(false)}
    >
      <Form
        {...layout}
        form={form}
        name="nest-messages"
        onFinish={onFinish}
        validateMessages={validateMessages}
        layout='vertical'
        initialValues={{
          user: {
            name: ''
          }
        }}
      >
        <Form.Item
          name={['user', 'perfil']}
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
              <Option key={1} value={false}>Hombre</Option>
              <Option key={2} value={true}>Mujer</Option>
            </Select>
          </Form.Item>
          <Form.Item name={['user', 'birthdate']} label="Fecha Nacimiento" rules={[{ required: true }]}>
            {/* <DatePicker
              format={'YYYY-MM-DD'}
              onPanelChange={(date) => alert(date)}
              onChange={onChange}
              value={moment(date)}
            /> */}
            <Input type={'date'} />
          </Form.Item>
          <Form.Item name={['user', 'address']} label="Direccion" >
            <Input placeholder='Ejemplo: eucaliptus n° 32' />
          </Form.Item>
          <Form.Item name={['user', 'phone']} label="Celular" rules={[{ required: true }]}>
            <Input placeholder='Ejemplo: 9 87564352' />
          </Form.Item>
          <Form.Item name={['user', 'email']} label="Email" rules={[{ required: true, type: 'email' }]} >
            <Input placeholder='Ejemplo: alguien@gmail.com' />
          </Form.Item>
          <Form.Item name={['user', 'profession']} label="Cargo" >
            <Input placeholder='Ejemplo: profesor' />
          </Form.Item>
          <Form.Item name={['user', 'image']} label="imagen">
            <Input placeholder='' />
          </Form.Item>
          <Form.Item name={['user', 'admissionDate']} label="Fecha ingreso" rules={[{ required: true }]}>
            <Input type={'date'} />
          </Form.Item>
          <Form.Item name={['user', 'salaryBase']} label="Sueldo base" rules={[{ required: true }]}>
            <InputNumber placeholder='' />
          </Form.Item>
          <Form.Item name={['user', 'weeklyHours']} label="Horas semanales" rules={[{ required: true }]}>
            <InputNumber placeholder='' />
          </Form.Item>
          {/* <Form.Item name={['user', 'user']} label="Usuario" rules={[{ required: true }]}>
            <Input placeholder='Ejemplo: Juan123' />
          </Form.Item> */}
          <Form.Item name={['user', 'pass']} label="Clave" rules={[{ required: true, }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name={['user', 'observations']} label="Observaciones" rules={[{ type: 'string' }]}>
            <TextArea rows={4} />
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
  </>)
}

export default CreateUser