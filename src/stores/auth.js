import {observable, action} from 'mobx'
import {Auth} from '../models'
import UserStore from './user'
import {User} from 'leancloud-storage'

class AuthStore {
  // 状态
  @observable values = {
    username: '',
    password: ''
  }

  // 行为

  @action setUsername(username) {
    this.values.username = username
  }

  @action setPassword(password) {
    this.values.password = password
  }

  @action login() {
    return new Promise((resolve, reject) => {
      Auth.login(this.values.username, this.values.password)
        .then(user => {
          UserStore.pullUser()
          resolve(user)
        }).catch(error => {
        UserStore.resetUser()
        reject(error)
      })
    })
  }

  @action register() {
    return new Promise((resolve, reject) => {
      Auth.register(this.values.username, this.values.password)
        .then(user => {
          UserStore.pullUser()
          resolve(user)
        }).catch(error => {
        UserStore.resetUser()
        reject(error)
      })
    })
  }

  @action logout() {
    Auth.logout()
    UserStore.resetUser()
  }
}

export default new AuthStore()