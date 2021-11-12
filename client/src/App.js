import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from 'react-router-dom'
import AppRouter from "./components/AppRouter"
import NavBar from "./components/NavBar"
import { Layout, Spin  } from 'antd';
import { observer } from "mobx-react-lite";
import { Context } from ".";
import { auth } from "./http/userApi";
import { LoadingOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

const App = observer(() => {
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

      auth().then(data => {
        user.setUser(data)
        user.setIsAuth(true)
      })
      .catch((e)=>{
        console.log(e)
      })
      .finally(() => setLoading(false))


  }, [])

  if(loading) return <div className="loading"><Spin  indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /></div>
  return (
    <BrowserRouter>
      <Layout>
        <Header className="site-layout-background">
          <div className="logo" />
          <NavBar />
        </Header>
        <Content style={{ padding: '25px 50px' }}>
          <Layout style={{ padding: '24px 0' }}>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <AppRouter />
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </BrowserRouter>
  );
})

export default App;
