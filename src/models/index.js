import AV, {Query, User} from 'leancloud-storage'

AV.init({
  appId: 'ioJScda1xYzD1bouqq2VNspm-gzGzoHsz',
  appKey: '0r0Qy2HEJo26UrFM5Ahxwar7',
  serverURL: 'https://iojscda1.lc-cn-n1-shared.com'
})

console.log('start............')

const Auth = {
  register(username, password) {
    let user = new User()
    user.setUsername(username)
    user.setPassword(password)
    return new Promise((resolve, reject) => {
      user.signUp().then(
        loginedUser => resolve(loginedUser), error => reject(error)
      )
    })
  },

  login(username, password) {
    return new Promise((resolve, reject) => {
      User.logIn(username, password).then(
        loginedUser => resolve(loginedUser),
        error => reject(error)
      )
    })
  },

  logout() {
    User.logout()
  },

  getCurrentUser() {
    return User.current()
  }
}

export {Auth}