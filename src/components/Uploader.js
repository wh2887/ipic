import React, {useRef} from 'react'
import {observer, useLocalStore} from 'mobx-react'
import {useStores} from '../stores'
import {InboxOutlined} from '@ant-design/icons'
import {Upload, message, InputNumber, Form} from 'antd'
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
  const ref1 = useRef()
  const ref2 = useRef()

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
  const store = useLocalStore(() => ({
    width: null,
    setWidth(value) {
      store.width = value
    },
    get widthStr() {
      return store.width ? `/w/${store.width}` : ''
    },

    height: null,
    setHeight(value) {
      store.height = value
    },
    get heightStr() {
      return store.height ? `/h/${store.height}` : ''
    },

    get fullStr() {
      return ImageStore.serverFile.attributes.url.attributes.url + '?imageView2/0' + store.widthStr + store.heightStr
    }

  }))

  const bindWidthChange = (value) => {
    store.setWidth(value)
  }

  const bindHeightChange = (value) => {
    store.setHeight(value)
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
            <Form>
              <Form.Item label="最大宽度（可选）">
                <InputNumber defaultValue={0} onChange={bindWidthChange} ref={ref1}/>
              </Form.Item>
              <Form.Item label="最大高度（可选）">
                <InputNumber defaultValue={0} onChange={bindHeightChange} ref={ref2}/>
              </Form.Item>
            </Form>
            <dd><a href={store.fullStr} target="_blank">{store.fullStr}</a></dd>
          </dl>

        </Result>

      </> : null}

    </div>
  )
})

export default Uploader
