import axios from 'axios'

class Auth {
    async verifysignup(para, callback) {
        const res = await axios.post('http://localhost:5000/api/verifysignup', para)
        callback(res.data)
    }

    async verifylogin(para, callback) {
        const res = await axios.post('http://localhost:5000/api/verifyloginextension', para)
        callback(res.data)
    }

    async signup(para, callback) {
        const res = await axios.post('http://localhost:5000/api/signup', para)
        callback(res.data)
    }

    async login(para, callback) {
        const res = await axios.post('http://localhost:5000/api/login', para)
        callback(res.data)
    }

    async checkauth(callback) {
        const res = await axios.get('http://localhost:5000/api/checkauth')
        callback(res.data)
    }
}

export default new Auth();