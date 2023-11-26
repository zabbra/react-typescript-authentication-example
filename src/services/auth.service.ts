import axios from "axios";

const API_URL = "http://localhost:8081/api/auth/";

 const register = (username:string, email:string, password:string) => {
  return axios.put(API_URL + "signup", {
    username,
    email,
    password
  });
}

const login = (email:string, password:string) => {
  return axios.post(API_URL + "signin", {
    email,
    password
  })
    .then((response) => {
      if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data))
    }
     
    return response.data
  })
}

 const logout = () => {
  localStorage.removeItem("user")
}

 const getCurrentUser = () => {
  const userStr = localStorage.getItem("user")
  if(userStr) return JSON.parse(userStr)
  
  return null

}

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser
}

export default  AuthService;
