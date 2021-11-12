import React, { useContext, useState } from "react";
import { Context } from "..";
import { Menu } from 'antd';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite'
import { useNavigate } from "react-router-dom";

const { SubMenu } = Menu;


const NavBar = observer(() => {
    const { user } = useContext(Context)
    const [current, setCurrent] = useState('shop')
    const navigate = useNavigate()
    const handleClick = (e) => {
        setCurrent(e.key)
        navigate(`/${e.key}`);
    }

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="shop">
                Главная
            </Menu.Item>
            <Menu.Item key="products">
                Товары
            </Menu.Item>
            <Menu.Item key="top-products">
                Хиты продаж
            </Menu.Item>
            <Menu.Item key="sales">
                Акции
            </Menu.Item>
            <Menu.Item key="cart" className="ml-auto"><ShoppingCartOutlined /></Menu.Item>
            {user.isAuth ?
                <SubMenu key="user" icon={<UserOutlined />} title={`${user.user.email}`}>
                    <Menu.Item key="setting:1">Выйти</Menu.Item>
                </SubMenu>
                :
                <>
                    <Menu.Item key="login"
                    // onClick={() => user.setIsAuth(true)}
                    >Войти</Menu.Item>
                    <Menu.Item key="registration">Регистрация</Menu.Item>
                </>
            }


        </Menu>


    );
})

export default NavBar;