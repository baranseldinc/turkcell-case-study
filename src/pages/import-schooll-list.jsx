import { InboxOutlined } from '@ant-design/icons'
import { message } from 'antd'
import Title from 'antd/lib/typography/Title'
import Dragger from 'antd/lib/upload/Dragger'

export const ImportCSVFile = () => {
  return (
    <div>
      <Title level={3}>Import Excel File</Title>
      <Dragger
        name="FormFile"
        multiple={false}
        action="http://167.71.77.240:5200/gateway/Account/Schools/uploadSchoolExcel"
        headers={{ Authorization: `Bearer ${localStorage.getItem('token') ?? ''}` }}
        onChange={(info) => {
          const { status } = info.file
          if (status === 'done') {
            message.success(`${info.file.name} file was uploaded successfully.`)
          } else if (status === 'error') {
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
