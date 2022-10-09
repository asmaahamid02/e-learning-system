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
}

export default new UserInfo()
