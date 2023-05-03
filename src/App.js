import { Route, Routes } from 'react-router-dom'
import { useCallback, useEffect } from 'react'
import { message } from 'antd'
import { SchoolList } from './pages/school-list'
import { ImportCSVFile } from './pages/import-schooll-list'

export const App = () => {
  const fetchNewToken = useCallback(async () => {
    localStorage.removeItem('token')
    try {
      const response = await fetch(
        'http://167.71.77.240:5200/gateway/IdentityServer/connect/token',
        {
          method: 'POST',
          body: new URLSearchParams({
            grant_type: 'password',
            client_id: 'DijitalDershaneWebUI',
            username: '12345678952',
            password: 'Yy123456*'
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            csrftoken: 'dd4534fgfgffgfg5dddddd53434534dfgfgfgfgfgfddd'
          }
        }
      )
      const data = await response.json()
      if (data?.access_token) {
        localStorage.setItem('token', data.access_token)
        window.dispatchEvent(new Event('storage'))
      }
    } catch (err) {
      message.error('Error while getting token, please refresh the page')
    }
  }, [])

  useEffect(() => {
    fetchNewToken()
  }, [])

  return (
    <Routes>
      <Route index path="/" element={<SchoolList />} />
      <Route index path="/import" element={<ImportCSVFile />} />
    </Routes>
  )
}
