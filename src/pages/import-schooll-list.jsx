import { InboxOutlined } from '@ant-design/icons'
import { message } from 'antd'
import Title from 'antd/es/typography/Title'
import Dragger from 'antd/es/upload/Dragger'
import { useUpdateSchoolMutation } from '../app/services/accountApi'

export const ImportCSVFile = () => {
  const [updateSchoolWithCsvFile] = useUpdateSchoolMutation()
  return (
    <div>
      <Title level={3}>Import CSV File</Title>
      <Dragger
        name="file"
        multiple={false}
        onChange={(info) => {
          const { status } = info.file
          if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`)
            updateSchoolWithCsvFile()
          } else if (status === 'error') {
            updateSchoolWithCsvFile()
            message.error(`${info.file.name} file upload failed.`)
          }
        }}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag csv file to this area to upload school data</p>
        <p className="ant-upload-hint">Please click or drag school csv file to upload data</p>
      </Dragger>
    </div>
  )
}
