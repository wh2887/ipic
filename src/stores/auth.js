import {observable, action} from 'mobx'
import {Auth} from '../models'

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
          console.log('登录成功')
          resolve(user)
        }).catch(error => {
        console.log('登录失败')
        reject(error)
      })
    })
  }

  @action register() {
    return new Promise((resolve, reject) => {
      Auth.register(this.values.username, this.values.password)
        .then(user => {
          console.log('注册成功')
          resolve(user)
        }).catch(error => {
        console.log('注册失败')
        reject(error)
      })
    })
  }

  @action logout() {
    Auth.logout()
  }
}

export {AuthStore}