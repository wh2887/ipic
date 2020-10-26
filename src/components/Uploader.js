import React, {useRef} from 'react'
import {observer} from 'mobx-react'
import {useStores} from '../stores'


const Uploader = observer(() => {
  const ref = useRef()
  const {ImageStore} = useStores()

  const bindChange = () => {
    console.log(ref.current)
    window.file = ref.current
    if (ref.current.files.length > 0) {

      ImageStore.setFilename(ref.current.files[0].name)
      ImageStore.setFile(ref.current.files[0])
      ImageStore.upload()
        .then((serverFile) => {
          console.log('上传成功')
          console.log(serverFile)
        })
        .catch((error) => {
          console.log('上传失败')
          console.log(error)
        })
    }
  }


  return (
    <div>
      <h1>文件上传</h1>
      <input type="file" ref={ref} onChange={bindChange}/>
    </div>
  )
})


export default Uploader
