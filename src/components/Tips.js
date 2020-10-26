import React from 'react'
import {useStores} from '../stores'
import {observer} from 'mobx-react'
import {Alert} from 'antd'
import styled from 'styled-components'


const AlertWrapper = styled.div`
  margin: 30px 0;
`

const Component = observer(({children}) => {
  const {UserStore} = useStores()
  return (
    <>
      {
        UserStore.currentUser ? null : <AlertWrapper><Alert message="警告" description={children} type="warning" showIcon/></AlertWrapper>
      }
    </>
  )
})

export default Component
