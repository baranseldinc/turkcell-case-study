import { Route, Routes, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { SchoolList } from './pages/school-list'
import { ImportCSVFile } from './pages/import-schooll-list'
import { Login } from './pages/login'

export const App = () => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/')
    }
  }, [token])
  return (
    <Routes>
      <Route index path="/" element={<Login />} />
      <Route index path="/login" element={<Login />} />
      <Route index path="/list" element={<SchoolList />} />
      <Route index path="/import" element={<ImportCSVFile />} />
    </Routes>
  )
}
