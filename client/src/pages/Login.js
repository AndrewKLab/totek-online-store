import React, { useContext } from "react";
import { Form, Input, Button, Checkbox, Card, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { NavLink } from "react-router-dom";
import { observer } from 'mobx-react-lite'
import { Context } from '..';
import { useNavigate } from "react-router-dom";
import { login } from "../http/userApi";


const Login = observer(() => {
    const { user } = useContext(Context)
    const navigate = useNavigate();

    const onFinish = async (values) => {
        const { email, password } = values
        let data;
        try {
            user.setUserLoading(true)
            data = await login(email, password)
            user.setUserLoading(false)
            user.setUserError(null)
            user.setUser(data)
            user.setIsAuth(true)
            navigate(SHOP_ROUTE);
        } catch (error) {
            user.setUserLoading(false)
            user.setUserError(error.response.data.message)
        }
    };

    return (
        <div id="components-form-demo-normal-login" className="d-flex justify-content-center align-items-center " style={{ height: window.innerHeight - 64 - 50 - 70 - 50 }}>
            <Card title="Войти" headStyle={{ textAlign: 'center' }} style={{ width: 400 }}>
                {user.user_error &&
                    <>
                        <Alert message={user.user_error} type="error" showIcon />
                        <br />
                    </>
                }
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Пожалуйста введите Email!' },
                            {
                                type: 'email',
                                message: 'Введенный адрес электронной почты недействителен!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Пожалуйста введите пароль!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Пароль"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Запомнить меня</Checkbox>
                        </Form.Item>

                        <NavLink className="login-form-forgot" to={REGISTRATION_ROUTE} >Не помню пароль </NavLink>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" loading={user.user_loading}>Войти</Button>
                        Или <NavLink to={REGISTRATION_ROUTE} >зарегестрироваться </NavLink>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
})

export default Login;