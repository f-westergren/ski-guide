import axios from 'axios';

const BASE_URL = process.env.BASE_URL || "http://localhost:3001";

class SkiGuideApi {
  static async request(endpoint, paramsOrData = {}, verb = "get") {
    paramsOrData._token = localStorage.getItem('token');

    try {
      return (await axios({
        method: verb,
        url: `${BASE_URL}/${endpoint}`,
        [verb === "get" ? "params" : "data"]: paramsOrData})).data;
    } catch(err) {
      console.error("API Error:", err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async login(email, password) {
    let res = await this.request('login', { email, password }, 'post');
    return res;
  }
  
  static async getUser(id) {
    let res = await this.request(`users/${id}`);
    return res;
  }

  static async register(data) {
    let res = await this.request('users', data, 'post');
    return res;
  }

  static async update(id, data) {
    let res = await this.request(`users/${id}`, data, 'patch');
    return res;
  }

  static async getGuide(id) {
    let res = await this.request(`guides/${id}`);
    return res.guide;
  }

  static async getGuides(data) {
    let res = await this.request('guides', data);
    return res;
  }

  static async getMessages() {
    let res = await this.request('messages');
    return res;
  }

  static async newMessage(data) {
    let res = await this.request('messages', data, 'post');
    return res;
  }

  static async getReservations() {
    let res = await this.request('reservations');
    return res;
  }

  static async newReservation(data) {
    let res = await this.request('reservations', data, 'post')
    return res;
  }

  static async getWeather(lat, lon) {
    let res = await this.request('weather/today', {lat, lon})
    return res;
  }

}

export default SkiGuideApi;