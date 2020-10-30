import React, {useRef} from 'react'
import {observer, useLocalStore} from 'mobx-react'
import {useStores} from '../stores'
import {InboxOutlined} from '@ant-design/icons'
import {Upload, message, InputNumber, Form,Spin} from 'antd'
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

      window.file = file

      if (!/(svg$)|(png$)|(jpg$)|(jpeg$)|(gif$)/ig.test(file.type)) {
        message.error('只能上传 png / jpg / jpeg / gif 格式的图片')
        return false
      }
      if (file.size > 1024 * 1024) {
        message.error('图片最大 1M')
        return false
      }


      ImageStore.upload()
        .then((serverFile) => {
          message.success('上传成功')
        }).catch((error) => {
        message.error('上传失败')
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
      <Spin tip="上传中"  spinning={ImageStore.isUploading}>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined/>
          </p>
          <p className="ant-upload-text">单击或拖动文件到该区域以上传</p>
          <p className="ant-upload-hint">
            仅支持 .png / .jpg / .jpeg / .gif / .svg 格式的图片，图片最大 1M
          </p>
        </Dragger>
      </Spin>

      {ImageStore.serverFile ? <>
        <Result>
          <H1>上传结果</H1>
          <dl>
            <dt>线上地址</dt>
            <dd><a href={ImageStore.serverFile.attributes.url.attributes.url}
                   target="_blank" rel="noopener noreferrer">{ImageStore.serverFile.attributes.url.attributes.url}</a>
            </dd>
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
            <dd><a href={store.fullStr} target="_blank" rel="noopener noreferrer">{store.fullStr}</a></dd>
          </dl>

        </Result>

      </> : null}

    </div>
  )
})

export default Uploader
