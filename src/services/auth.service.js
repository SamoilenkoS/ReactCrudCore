import axios from "axios";

const API_URL = "https://localhost:5001/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "login", {
        Login: username,
        Password: password
      })
      .then(response => {
        console.log(response.data);
        if (response.data) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();