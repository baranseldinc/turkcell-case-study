import { ClearOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Popconfirm, Space, message } from 'antd'
import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { commitOpenModal, commitSelectedSchoolRow } from '../app/slices/accountSlice'
import { useDeleteSchoolMutation } from '../app/services/accountApi'

// a custom hook that returns column definition for using school data table
export const useSchoolColDef = () => {
  const cities = useSelector((state) => state.accountSlice.cities)
  const counties = useSelector((state) => state.accountSlice.counties)
  const institutions = useSelector((state) => state.accountSlice.institutions)
  const institutionTypes = useSelector((state) => state.accountSlice.institutionTypes)
  const dispatch = useDispatch()
  const [deleteSchool] = useDeleteSchoolMutation()

  const handleClickDelete = useCallback(async (id) => {
    try {
      const response = await deleteSchool({ schoolId: id }).unwrap()
      if (response?.success) {
        message.success('The school has been deleted successfuly')
      }
    } catch (error) {
      message.error('Operation failed!')
    }
  }, [])

  const columns = useMemo(
    () => [
      {
        title: 'School ID',
        dataIndex: 'key',
        key: 'id'
      },
      {
        title: 'Active ?',
        dataIndex: 'recordStatus',
        key: 'recordStatus',
        render: (text) => (text === 1 ? <b style={{ color: 'green' }}>Active</b> : 'Passive')
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
          return instituion?.name ?? ''
        }
      },
      {
        title: 'Institution Type',
        dataIndex: 'institutionTypeId',
        key: 'institutionTypeId',
        render: (text) => {
          const instituionType = institutionTypes.find((item) => item.id === text)
          return instituionType?.name ?? ''
        }
      },
      {
        title: 'City',
        dataIndex: 'cityId',
        key: 'cityId',
        render: (text) => {
          const city = cities.find((item) => item.id === text)
          return city?.name ?? ''
        }
      },
      {
        title: 'County',
        dataIndex: 'countyId',
        key: 'countyId',
        render: (text) => {
          const county = counties.find((item) => item.id === text)
          return county?.name ?? ''
        }
      },
      {
        title: 'Actions',
        key: 'action',
        render: (row) => (
          <Space size="middle">
            <Button
              onClick={() => {
                dispatch(commitSelectedSchoolRow(row))
                dispatch(commitOpenModal(true))
              }}>
              <EditOutlined />
            </Button>
            <Popconfirm
              placement="left"
              title="Are you sure to delete?"
              description="The record will be deleted permanently ?"
              onConfirm={() => {
                handleClickDelete(row.id)
              }}
              okText="Yes"
              cancelText="No">
              <Button>
                <ClearOutlined />
              </Button>
            </Popconfirm>
          </Space>
        )
      }
    ],
    [cities, counties, institutions, institutionTypes]
  )
  return { columns }
}
