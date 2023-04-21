import { useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {AppContext} from '../../Provider';
import {loginData} from '../../controller/control';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import Logo from '../../assets/img/logo.png'
import './style.scss'


function Login(){
  const [state, setState] = useContext(AppContext)
  const navigate = useNavigate()

  const onSubmit = async(value) => {
    const log = await loginData(value, `${process.env.REACT_APP_API_URL}/api/users/login/`)
    if(log.length > 0){
      setState({user: log[0], token: log[1].token})
      if(log[0].pass === 'cfp123'){
        alert('Por favor cambia tu contraseña y actualiza tus datos')
        navigate('/profile')
      }else{
        navigate('/home')
      }
    }else{
      alert('Error de usuario o contraseña')
    }
  }
  return(
    <div className='login-admin'>
      <Row className='divForm'>
        <Col xs={{span:20, offset:2}} md={{span:18, offset:3}} lg={{span:4, offset: 10}}>
          <div style={{marginBottom: '2em'}}>
            <img src={Logo} width="80px" onClick={() => navigate('/loginAdmin')}/>
          </div>
          <div className='form'>
            <Form
              name="basic"
              onFinish={onSubmit}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                name="user"
                rules={[{ required: true, message: 'Por favor llene este espacio!' }]}
                size='large'
              >
                <Input placeholder="Usuario"/>
              </Form.Item>
              <Form.Item
                name="pass"
                rules={[{ required: true, message: 'Por favor llene este espacio!' }]}
                size='large'
              >
                <Input.Password placeholder="Contraseña"/>
              </Form.Item>
              <Form.Item>
                <Button type="primary" className='btnPoolex' htmlType="submit" style={{width: '100%'}}>
                  Ingresar
                </Button>
                <Button type="default" style={{width: '100%', marginTop: '1em'}} onClick={() => navigate('/')}>
                  Cancelar
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Login