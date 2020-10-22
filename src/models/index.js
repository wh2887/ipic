import AV, {Query, User} from 'leancloud-storage'

AV.init({
  appId: 'ioJScda1xYzD1bouqq2VNspm-gzGzoHsz',
  appKey: '0r0Qy2HEJo26UrFM5Ahxwar7',
  serverURL: 'https://iojscda1.lc-cn-n1-shared.com'
})

console.log('start............')

let user = new User()
user.setUsername('McCallWang')
user.setPassword('123456')
user.signUp().then((loginedUser) => {
    console.log('注册成功')
    console.log('登录的用户信息：', loginedUser)
  }, (error) => {
    console.log('注册失败')
    console.log(error)
  }
)

export default {}