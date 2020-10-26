import React from 'react'
import {observer} from 'mobx-react'
import {useStores} from '../stores'
import {InboxOutlined} from '@ant-design/icons'
import {Upload} from 'antd'

const {Dragger} = Upload


const Uploader = observer(() => {
  const {ImageStore} = useStores()

  const props = {
    showUploadList: false,
    beforeUpload: file => {
      console.log(file)
      ImageStore.setFilename(file.name)
      ImageStore.setFile(file)
      ImageStore.upload()
        .then((serverFile) => {
          console.log('上传成功')
          console.log(serverFile)
        })
        .catch((error) => {
          console.log('上传失败')
          console.log(error)
        })
      return false
    }

  }


  return (
    <>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined/>
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading company data or other
          band files
        </p>
      </Dragger>,
      <div>
        <h1>上传结果</h1>
        {ImageStore.serverFile ? <div>图片地址：{ImageStore.serverFile.attributes.url.attributes.url}</div> : null}
      </div>
    </>
  )
})


export default Uploader
