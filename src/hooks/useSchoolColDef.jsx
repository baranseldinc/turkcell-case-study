import { ClearOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'

// a custom hook that returns column definition for using school data table
export const useSchoolColDef = () => {
  const cities = useSelector((state) => state.accountSlice.cities)
  const counties = useSelector((state) => state.accountSlice.counties)
  const institutions = useSelector((state) => state.accountSlice.institutions)
  const columns = useMemo(
    () => [
      {
        title: 'School ID',
        dataIndex: 'key',
        key: 'id'
      },
      {
        title: 'School Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Institution',
        dataIndex: 'institutionId',
        key: 'institutionId',
        render: (text) => {
          const instituion = institutions.find((item) => item.id === text)
          return instituion?.value ?? ''
        }
      },
      {
        title: 'Institution Type',
        dataIndex: 'institutionTypeId',
        key: 'institutionTypeId',
        render: (text) => {
          const instituionType = institutions.find((item) => item.id === text)
          return instituionType?.value ?? ''
        }
      },
      {
        title: 'City',
        dataIndex: 'cityId',
        key: 'cityId',
        render: (text) => {
          const city = cities.find((item) => item.id === text)
          return city?.value ?? ''
        }
      },
      {
        title: 'County',
        dataIndex: 'countyId',
        key: 'countyId'
      },
      {
        title: 'Actions',
        key: 'action',
        render: () => (
          <Space size="middle">
            <Button>
              <EditOutlined />
            </Button>
            <Button>
              <ClearOutlined />
            </Button>
          </Space>
        )
      }
    ],
    []
  )
  return { columns }
}
