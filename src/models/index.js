import AV, {Query, User} from 'leancloud-storage'

AV.init({
  appId: 'ioJScda1xYzD1bouqq2VNspm-gzGzoHsz',
  appKey: '0r0Qy2HEJo26UrFM5Ahxwar7',
  serverURL: 'https://iojscda1.lc-cn-n1-shared.com'
})

const Auth = {
  register(username, password) {
    let user = new User()
    user.setUsername(username)
    user.setPassword(password)
    return new Promise((resolve, reject) => {
      user.signUp().then(loginedUser => resolve(loginedUser), error => reject(error))
    })
  },

  login(username, password) {
    return new Promise((resolve, reject) => {
      User.logIn(username, password).then(loginedUser => resolve(loginedUser), error => reject(error))
    })
  },

  logout() {
    User.logOut()
  },

  getCurrentUser() {
    return User.current()
  }

}

const Uploader = {
  add(file, filename) {
    const item = new AV.Object('Image')
    const avFile = new AV.File(filename, file)
    item.set('filename', filename)
    item.set('owner', AV.User.current())
    item.set('url', avFile)
    return new Promise((resolve, reject) => {
      item.save()
        .then((serverFile) => resolve(serverFile)).catch(error => reject(error))
    })
  }
}


export {
  Auth,
  Uploader
}