import { Button, Col, Row, Space, Spin, Switch, Table } from 'antd'
import Title from 'antd/es/typography/Title'
import { PlusCircleOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSchoolColDef } from '../hooks/useSchoolColDef'
import { SchoolFormModal } from '../components/school-form-modal'
import {
  useGetCitiesQuery,
  useGetCountiesQuery,
  useGetInstitutionsQuery,
  useGetInstitutionTypesQuery,
  useGetPagedSchoolListQuery
} from '../app/services/accountApi'
import {
  commitCities,
  commitCounties,
  commitInstitutionTypes,
  commitInstitutions,
  commitOpenModal,
  commitSelectedSchoolRow
} from '../app/slices/accountSlice'
import { useDebounce } from '../hooks/useDebounce'

export const SchoolList = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [allRecords, setAllRecords] = useState(true)
  const [recordStatus, setRecordStatus] = useState(true)
  const openModal = useSelector((state) => state.accountSlice.openModal)
  const { columns } = useSchoolColDef()
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  // Get options from server
  const {
    data: cityData,
    isFetching: isCityDataFetching,
    isSuccess: isCityDataSuccess
  } = useGetCitiesQuery(null, { skip: !token })
  const {
    data: countyData,
    isFetching: isCountyDataFetching,
    isSuccess: isCountyDataSuccess
  } = useGetCountiesQuery(null, { skip: !token })
  const {
    data: instData,
    isFetching: isInstDataFeching,
    isSuccess: isInstDataSuccess
  } = useGetInstitutionsQuery(null, { skip: !token })
  const {
    data: instTypeData,
    isFetching: isInstTypeDataFeching,
    isSuccess: isInstTypeDataSuccess
  } = useGetInstitutionTypesQuery(null, { skip: !token })

  const debouncedCityFetching = useDebounce(isCityDataFetching, 1000)
  const debouncedCountyFetching = useDebounce(isCountyDataFetching, 1000)
  const debouncedInstFetching = useDebounce(isInstDataFeching, 1000)
  const debouncedInstTypeFetching = useDebounce(isInstTypeDataFeching, 1000)

  const { data, refetch, isUninitialized } = useGetPagedSchoolListQuery(
    { pageNumber, pageSize, allRecords, recordStatus },
    {
      skip:
        !token ||
        !isCityDataSuccess ||
        !isCountyDataSuccess ||
        !isInstDataSuccess ||
        !isInstTypeDataSuccess
    }
  )
  const showModal = () => {
    dispatch(commitOpenModal(true))
  }
  const closeModal = () => {
    dispatch(commitOpenModal(false))
  }

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
    if (isInstTypeDataSuccess) {
      dispatch(commitInstitutionTypes(instTypeData))
    }
  }, [instTypeData])

  useEffect(() => {
    if (!isUninitialized) refetch()
  }, [pageNumber, pageSize])

  useEffect(() => {
    setPageNumber(1)
  }, [allRecords, recordStatus])

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
      {debouncedInstTypeFetching && (
        <div>
          <Spin /> Institution type data is fetching...
        </div>
      )}
    </>
  )

  const renderTable = () => (
    <>
      <Space style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6em' }}>
        <Space style={{ display: 'flex', columnGap: '2.5em' }}>
          <div>
            <Switch
              onChange={(status) => {
                setAllRecords(status)
              }}
              defaultChecked
            />{' '}
            All Records
          </div>
          <div>
            <Switch
              onChange={(status) => {
                setRecordStatus(status)
              }}
              defaultChecked
              disabled={allRecords}
            />{' '}
            Active only
          </div>
        </Space>
        <Button
          onClick={() => {
            dispatch(commitSelectedSchoolRow(null))
            showModal()
          }}>
          <PlusCircleOutlined />
          Add New School
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={data?.rows ?? []}
        pagination={{
          total: data?.pagedProperty?.totalCount,
          pageSize: data?.pagedProperty?.pageSize,
          onChange: (_pageNumber, _pageSize) => {
            setPageNumber(_pageNumber)
            setPageSize(_pageSize)
          }
        }}
      />
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
      <SchoolFormModal key={crypto.randomUUID()} isOpen={openModal} onCancel={closeModal} />
    </div>
  )
}
