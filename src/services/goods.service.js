import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://localhost:5001/goods/';

class GoodsService {
  async GetAll() {
    let result = await axios.get(API_URL);
    console.log(result);

    return result;
  }

  deleteById(id) {
    return axios.delete(API_URL + id, { headers: authHeader() });
  }

  getById(id){
    return axios.get(API_URL + id);
  }

  update(id, data){
    return axios.put(API_URL + id, data);
  }

  create(data){
    return axios.post(API_URL, data);
  }
}

export default new GoodsService();