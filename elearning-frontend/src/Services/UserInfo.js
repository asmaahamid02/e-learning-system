class UserInfo {
  getLocalAccessToken() {
    const user = JSON.parse(localStorage.getItem('user'))
    return user?.token
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'))
  }

  getRole() {
    return JSON.parse(localStorage.getItem('user')).role
  }

  getName() {
    return JSON.parse(localStorage.getItem('user')).name
  }

  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user))
  }

  removeUser() {
    localStorage.removeItem('user')
  }
}

export default new UserInfo()
