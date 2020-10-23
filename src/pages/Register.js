import React from 'react'
import {Form, Input, Button} from 'antd'
import styled from 'styled-components'
import {useStores} from '../stores'

const Wrapper = styled.div`
  max-width: 600px;
  margin: 30px auto;
  box-shadow: 2px 2px 4px 0 rgba(0,0,0,.2);
  border-radius: 4px;
  padding: 20px;
`

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
`


const layout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
}
const tailLayout = {
  wrapperCol: {offset: 4, span: 20},
}

const Component = () => {
  const {AuthStore} = useStores()
  const onFinish = values => {
    AuthStore.setUsername(values.username)
    AuthStore.setPassword(values.password)
    AuthStore.register()
      .then(() => {
        console.log('注册成功，跳转到首页')
      }).catch(() => {
      console.log('注册失败，什么都不做')
    })

  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }


  const validateUsername = (rule, value) => {
    if (/\W/.test(value)) return Promise.reject('只能包含字母、数字、下划线')
    if (value.length < 4 || value.length > 10) return Promise.reject('长度为4~10个字符')
    return Promise.resolve()
  }

  const validateConfirm = ({getFieldValue}) => ({
    validator(rule, value) {
      if (getFieldValue('password') === value) return Promise.resolve()
      return Promise.reject('两次密码不一致')

    }
  })

  return (
    <Wrapper>
      <Title>注册</Title>
      <Form
        {...layout}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            {required: true, message: '输入用户名!'},
            {
              validator: validateUsername
            }
          ]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[
            {required: true, message: '输入密码!'},
            {
              min: 4,
              message: '最少4个字符'
            },
            {
              max: 10,
              message: '最多10个字符'
            }
          ]}
        >
          <Input.Password/>
        </Form.Item>

        <Form.Item
          label="确认密码"
          name="conformPassword"
          rules={[
            {required: true, message: '再次确认密码!'},
            validateConfirm
          ]}
        >
          <Input.Password/>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  )
}

export default Component