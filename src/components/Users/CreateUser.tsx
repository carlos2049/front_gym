import { useEffect, useState } from 'react'
import SectionSubplan from './SectionSubplan';
import { Modal, Button, Form, Input, Select, InputNumber } from 'antd';
// import { fetchAllProfiles } from '../../store/slices/profiles';
import { createUser, updateUser, fetchAllProfiles, fetchAllSubplans } from '../../services/endpoints'
import { useDispatch, useSelector } from 'react-redux'
import { IUser, IProfiles, IValues } from './interface';
import { IState, ISubplan } from '../../interfaces/state';
const { Option } = Select;
const { TextArea } = Input

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

interface ICreateUSer {
  visible: boolean,
  handleModalVisible: (checked: boolean) => void,
  fetchUsuers: () => void,
  userObj: IUser | null

}


const CreateUser: React.FC<ICreateUSer> = ({ visible, handleModalVisible, fetchUsuers, userObj }) => {
  const dispatch = useDispatch()
  const { listSubplans } = useSelector((state: IState) => state.subplans)
  const { list } = useSelector((state: any) => state.profiles)
  const [form] = Form.useForm();
  const [profileSelected, setProfileSelected] = useState<number>(0)

  // const state: boolean = true

  useEffect(() => {
    dispatch(fetchAllProfiles(true))
    dispatch(fetchAllSubplans('all', 1, true))
  }, [dispatch])


  useEffect(() => {
    // setUsuario(user)
    if (userObj) {
      form.setFieldsValue({
        user: {
          name: userObj?.names,
          perfil: userObj?.id_perfil,
          rut: userObj?.rut,
          firstLastname: userObj?.first_last_name,
          secondLastname: userObj?.second_last_name,
          sex: userObj?.sex,
          birthdate: userObj?.birth_date,
          address: userObj?.address,
          phone: userObj?.phone,
          email: userObj?.email,
          profession: userObj?.profession,
          image: userObj?.image,
          admissionDate: userObj?.admission_date,
          salaryBase: userObj?.salary_base,
          weeklyHours: userObj?.weekly_hours,
          pass: userObj?.password,
          observations: userObj.observations
        }
      })
      setProfileSelected(Number(userObj.id_perfil))

    }
    // eslint-disable-next-line
  }, [userObj])

  const handleModal = (visible: boolean) => {
    form.resetFields()
    handleModalVisible(visible)
    fetchUsuers()
  }
  const onFinish = (values: IValues) => {

    const { user } = values
    const userObjSend: IUser = {
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

    if (userObj) {
      dispatch(updateUser({ ...userObjSend }, userObj.id, handleModal))
    } else {
      dispatch(createUser({ ...userObjSend }, handleModal))
    }
  };

  const handleSelectProfile = (e: Event) => {
    setProfileSelected(Number(e))
  }

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

  console.log('listSubplans', listSubplans)
  return (<>
    <Modal
      width={"70%"}
      title="Crear Usuario"
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
        <Form.Item
          name={['user', 'perfil']}
          label="Tipo Perfil"
          rules={[{ required: true, message: 'Seleccione Perfil' }]}
        >
          <Select placeholder="Seleccionar Perfil" onSelect={handleSelectProfile}>
            {
              list ? list.map((x: IProfiles) => (
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
          <Form.Item name={['user', 'salaryBase']} label="Sueldo base" >
            <InputNumber placeholder='' />
          </Form.Item>
          <Form.Item name={['user', 'weeklyHours']} label="Horas semanales" rules={[{ required: true }]}>
            <InputNumber placeholder='' />
          </Form.Item>
          {/* <Form.Item name={['user', 'user']} label="Usuario" rules={[{ required: true }]}>
            <Input placeholder='Ejemplo: Juan123' />
          </Form.Item> */}

          {/* <Form.Item name={['user', 'pass']} label="Clave" rules={[{ required: true, }]}>
            <Input.Password />
          </Form.Item> */}

          {
            profileSelected === 2 ? <SectionSubplan listSubplans={listSubplans.rows} /> : ''
          }

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