import React, {useRef} from 'react'
import {observer} from 'mobx-react'
import {useStores} from '../stores'


const Component = observer(() => {
    const inputRef = useRef()
    const {AuthStore} = useStores()

    const bindChange = e => {
      console.log('输入的:', inputRef.current.value)
      AuthStore.setUsername(inputRef.current.value)
      console.log('设置后的: ', AuthStore.values.username)
    }

    return (
      <>
        <h1>Login: {AuthStore.values.username}</h1>
        <input ref={inputRef} onChange={bindChange}/>
      </>
    )
  }
)

export default Component
