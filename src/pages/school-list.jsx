import { Button, Col, Row, Space, Spin, Table } from 'antd'
import Title from 'antd/es/typography/Title'
import { PlusCircleOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSchoolColDef } from '../hooks/useSchoolColDef'
import { AddNewSchoolModal } from '../components/add-new-school-modal'
import {
  useGetCitiesQuery,
  useGetCountiesQuery,
  useGetInstitutionTypesQuery,
  useGetPagedSchoolListQuery
} from '../app/services/accountApi'
import { commitCities, commitCounties, commitInstitutions } from '../app/slices/accountSlice'
import { useDebounce } from '../hooks/useDebounce'

export const SchoolList = () => {
  const [open, setOpen] = useState(false)
  const { columns } = useSchoolColDef()
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Get options from server
  const {
    data: cityData,
    isFetching: isCityDataFetching,
    isSuccess: isCityDataSuccess
  } = useGetCitiesQuery()
  const {
    data: countyData,
    isFetching: isCountyDataFetching,
    isSuccess: isCountyDataSuccess
  } = useGetCountiesQuery()
  const {
    data: instData,
    isFetching: isInstDataFeching,
    isSuccess: isInstDataSuccess
  } = useGetInstitutionTypesQuery()

  const debouncedCityFetching = useDebounce(isCityDataFetching, 1000)
  const debouncedCountyFetching = useDebounce(isCountyDataFetching, 1000)
  const debouncedInstFetching = useDebounce(isInstDataFeching, 1000)

  const { data } = useGetPagedSchoolListQuery(null, {
    skip: !token || !isCityDataSuccess || !isCountyDataSuccess || !isInstDataSuccess
  })

  useEffect(() => {
    if (isCityDataSuccess) {
      dispatch(commitCities(cityData))
    }
  }, [cityData])

  useEffect(() => {
    if (isCountyDataSuccess) {
      dispatch(commitCounties(countyData))
    }
  }, [countyData])

  useEffect(() => {
    if (isInstDataSuccess) {
      dispatch(commitInstitutions(instData))
    }
  }, [instData])

  useEffect(() => {
    if (!token) navigate('/login')
  }, [])

  const renderProgressStatus = () => (
    <>
      {debouncedCityFetching && (
        <div>
          <Spin /> City data is fetching...
        </div>
      )}
      {debouncedCountyFetching && (
        <div>
          <Spin /> County data is fetching...
        </div>
      )}
      {debouncedInstFetching && (
        <div>
          <Spin /> Institution data is fetching...
        </div>
      )}
    </>
  )

  const renderTable = () => (
    <>
      <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={() => setOpen(true)}>
          <PlusCircleOutlined />
          Add New School
        </Button>
      </Space>
      <Table columns={columns} dataSource={data?.rows ?? []} />
    </>
  )

  return (
    <div>
      <Row>
        <Col xs={24}>
          <Title level={3}>School List</Title>
        </Col>
        <Col xs={24}>
          {debouncedCityFetching || debouncedCountyFetching || debouncedInstFetching
            ? renderProgressStatus()
            : renderTable()}
        </Col>
      </Row>
      <AddNewSchoolModal key={crypto.randomUUID()} isOpen={open} onCancel={() => setOpen(false)} />
    </div>
  )
}
