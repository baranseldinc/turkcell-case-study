import { Form, Input, Modal, Select, Switch, message } from 'antd'
import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAddSchoolMutation, useUpdateSchoolMutation } from '../app/services/accountApi'

export const SchoolFormModal = ({ isOpen = false, onCancel }) => {
  const { Option } = Select
  const cities = useSelector((state) => state.accountSlice.cities)
  const counties = useSelector((state) => state.accountSlice.counties)
  const institutions = useSelector((state) => state.accountSlice.institutions)
  const institutionTypes = useSelector((state) => state.accountSlice.institutionTypes)
  const selectedSchoolRow = useSelector((state) => state.accountSlice.selectedSchoolRow)
  const [isUpdateMode] = useState(Object.keys(selectedSchoolRow ?? {})?.length > 0)
  const [isActive, setIsActive] = useState(selectedSchoolRow?.recordStatus === 1)
  const [form] = Form.useForm()
  const selectedCityId = Form.useWatch('cityId', form)
  const [addSchool] = useAddSchoolMutation()
  const [updateSchool] = useUpdateSchoolMutation()

  const handleAddSchool = useCallback(async () => {
    try {
      const response = await addSchool({ ...form.getFieldsValue(), recordStatus: 1 }).unwrap()
      if (response?.success) {
        message.success('The school has been added successfuly')
      }
    } catch (error) {
      message.error('Operation failed!')
    } finally {
      onCancel()
    }
  }, [isActive])

  const handleUpdateSchool = useCallback(async () => {
    try {
      const response = await updateSchool({
        id: selectedSchoolRow.id,
        ...form.getFieldsValue(),
        recordStatus: isActive ? 1 : 0
      }).unwrap()
      if (response?.success) {
        message.success('The school has been updated successfuly')
      }
    } catch (error) {
      message.error('Operation failed!')
    } finally {
      onCancel()
    }
  }, [isActive])

  return (
    <Modal
      title={isUpdateMode ? 'Update School' : 'Add New School'}
      open={isOpen}
      onOk={() => {
        if (isUpdateMode) handleUpdateSchool()
        else handleAddSchool()
      }}
      okText={isUpdateMode ? 'Update' : 'Save'}
      onCancel={onCancel}>
      <Form
        form={form}
        initialValues={{ ...selectedSchoolRow, isActive: true }}
        name="basic"
        labelCol={{
          span: 8
        }}
        wrapperCol={{
          span: 16
        }}
        style={{
          maxWidth: 600
        }}
        autoComplete="off">
        <Form.Item label="Active ?" rules={[{ required: true }]}>
          <Switch
            defaultChecked={!isUpdateMode || selectedSchoolRow?.recordStatus === 1}
            disabled={!isUpdateMode}
            onChange={(e) => setIsActive(e)}
          />
        </Form.Item>

        <Form.Item
          label="School Name"
          name="name"
          rules={[{ required: true, message: 'Please input school name!' }]}>
          <Input />
        </Form.Item>

        <Form.Item name="institutionId" label="Institution" rules={[{ required: true }]}>
          <Select placeholder="Select Institution" allowClear>
            {institutions.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="institutionTypeId" label="InstitutionType" rules={[{ required: true }]}>
          <Select placeholder="Select Institution Type" allowClear>
            {institutionTypes.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="cityId" label="City" rules={[{ required: true }]}>
          <Select
            placeholder="Select City"
            allowClear
            onChange={() => {
              form.setFieldValue('countyId', '')
            }}>
            {cities.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="countyId" label="County" rules={[{ required: true }]}>
          <Select placeholder="Select County" allowClear>
            {counties
              .filter((item) => item.cityId === selectedCityId)
              .map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}
