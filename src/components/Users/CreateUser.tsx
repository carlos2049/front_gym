import { useState } from 'react'
import { Modal, Button } from 'antd';


const CreateUser = () => {

  const [modal2Visible, setModal2Visible] = useState<boolean>(false)

  const handleModal2Visible = (modal2Visible: any) => {
    setModal2Visible(modal2Visible);
  }


  return (<>

    <Button type="primary" onClick={() => handleModal2Visible(true)}>
      Vertically
    </Button>
    <Modal
      title="Vertically centered modal dialog"
      centered
      visible={modal2Visible}
      onOk={() => handleModal2Visible(false)}
      onCancel={() => handleModal2Visible(false)}
    >
      <p>some contents...</p>
      <p>some contents...</p>
      <p>some contents...</p>
    </Modal>
  </>)
}

export default CreateUser