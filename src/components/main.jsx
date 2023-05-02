import { Layout } from 'antd'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import { Navbar } from './navbar'
import './main.css'

export const Main = (props) => {
  const { children } = props
  return (
    <Layout>
      <Header>
        <Navbar />
      </Header>
      <Content className="content">{children}</Content>
      <Footer className="footer">&copy; All rights reserved - 2023</Footer>
    </Layout>
  )
}
