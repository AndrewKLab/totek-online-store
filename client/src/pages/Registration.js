import React, { useContext } from 'react';
import {
    Form,
    Input,
    Checkbox,
    Button,
    Card,
    Alert
} from 'antd';
import { NavLink } from 'react-router-dom';
import { REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { registration } from '../http/userApi';
import { observer } from 'mobx-react-lite'
import { Context } from '..';
import { useNavigate } from "react-router-dom";

const Registration = observer(() => {
    const { user } = useContext(Context)
    const [form] = Form.useForm();
    const navigate  = useNavigate();
    const onFinish = async (values) => {
        const { email, password } = values
        let data;
        try {
            user.setUserLoading(true)
            data = await registration(email, password)
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

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };

    return (
        <div id="components-form-demo-normal-login" className="d-flex justify-content-center align-items-center " style={{ height: window.innerHeight - 64 - 50 - 70 - 50 }}>
            <Card title="Регистрация" headStyle={{ textAlign: 'center' }} style={{ width: 600 }}>
                {user.user_error &&
                    <>
                        <Alert message={user.user_error} type="error" showIcon />
                        <br />
                    </>
                }

                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'Введенный адрес электронной почты некорректный!',
                            },
                            {
                                required: true,
                                message: 'Пожалуйста, введите свой E-mail!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Пароль"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, введите свой пароль!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Подтвердите пароль"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, подтвердите свой пароль!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Два введенных вами пароля не совпадают!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) =>
                                    value ? Promise.resolve() : Promise.reject(new Error('Следует принять соглашение')),
                            },
                        ]}
                        {...tailFormItemLayout}
                    >
                        <Checkbox>
                            Я прочитал <NavLink to={REGISTRATION_ROUTE} >соглашение</NavLink>
                        </Checkbox>
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" loading={user.user_loading}>Зарегестрироваться</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
})

export default Registration;