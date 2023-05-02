import { ImportOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

export const Navbar = () => {
  const navigate = useNavigate()
  const menuItems = useMemo(
    () => [
      { key: 'list', label: 'School List', icon: <UnorderedListOutlined /> },
      { key: 'import', label: 'Import CSV File', icon: <ImportOutlined /> }
    ],
    []
  )
  return (
    <Menu onClick={({ key }) => navigate(key)} theme="dark" mode="horizontal" items={menuItems} />
  )
}