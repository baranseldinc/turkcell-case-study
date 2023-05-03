import { Layout } from 'antd'
import { Content, Footer, Header } from 'antd/lib/layout/layout'
import { Navbar } from './navbar'
import './main.scss'

export const Main = (props) => {
  const { children } = props
  return (
    <Layout className="layout">
      <Header className="header">
        <Navbar />
      </Header>
      <Content className="content">{children}</Content>
      <Footer className="footer">&copy; All rights reserved - 2023</Footer>
    </Layout>
  )
}
