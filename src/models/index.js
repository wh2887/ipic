import AV, {User} from 'leancloud-storage'

AV.init({
  appId: 'h7TiaKhbF3g6tRaSbTVWhqm4-gzGzoHsz',
  appKey: 'ip5sCnCAMtFMbtnIk7F9WEPe',
  serverURL: 'https://h7tiakhb.lc-cn-n1-shared.com'
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
    const todo = new AV.Object('Image')
    const avFile = new AV.File(filename, file)
    todo.set('filename', filename)
    todo.set('owner', AV.User.current())
    todo.set('url', avFile)
    return new Promise((resolve, reject) => {
      todo.save()
        .then((serverFile) => resolve(serverFile)).catch(error => {
          reject(error)
        }
      )
    })
  }
}


export {
  Auth,
  Uploader
}