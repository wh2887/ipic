import React from 'react'
import {observer} from 'mobx-react'
import {useStores} from '../stores'
import {InboxOutlined} from '@ant-design/icons'
import {Upload, message} from 'antd'
import styled from 'styled-components'

const {Dragger} = Upload

const Result = styled.div`
  border: 1px dashed #ccc;
  margin-top: 30px;
  padding: 20px;
`

const H1 = styled.h1`
  margin: 20px 0;
  text-align: center;
`

const Img = styled.img`
  max-width: 300px;
`


const Uploader = observer(() => {
  const {ImageStore, UserStore} = useStores()
  const props = {
    showUploadList: false,
    beforeUpload: file => {
      ImageStore.setFile(file)
      ImageStore.setFilename(file.name)
      if (UserStore.currentUser === null) {
        message.warning('请先登录再上传！')
        return false
      }
      ImageStore.upload()
        .then((serverFile) => {
          console.log('上传成功')
          console.log(serverFile)
        }).catch((error) => {
        console.log('上传失败')
        console.log(error)
      })
      return false
    }
  }

  return (
    <div>
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

      {ImageStore.serverFile ? <>
        <Result>
          <H1>上传结果</H1>
          <dl>
            <dt>线上地址</dt>
            <dd><a href={ImageStore.serverFile.attributes.url.attributes.url}
                   target="_blank">{ImageStore.serverFile.attributes.url.attributes.url}</a></dd>
            <dt>文件名</dt>
            <dd>{ImageStore.filename}</dd>
            <dt>图片预览</dt>
            <dd><Img src={ImageStore.serverFile.attributes.url.attributes.url} alt="图片预览"/></dd>
            <dt>更多尺寸</dt>
            <dd>...</dd>
          </dl>

        </Result>

      </> : null}

    </div>
  )
})


export default Uploader
