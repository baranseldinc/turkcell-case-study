import { Route, Routes } from 'react-router-dom'
import { SchoolTable } from './pages/school-table'

export const App = () => {
  return (
    <Routes>
      <Route index path="/" element={<SchoolTable />} />
      <Route index path="/new-school" element={<SchoolTable />} />
      <Route index path="/import" element={<SchoolTable />} />
    </Routes>
  )
}
