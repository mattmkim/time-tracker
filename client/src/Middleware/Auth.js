import axios from 'axios'

class Auth {
    async verifysignup(para, callback) {
        const res = await axios.post('/api/verifysignup', para)
        callback(res.data)
    }

    async verifylogin(para, callback) {
        const res = await axios.post('/api/verifylogin', para)
        callback(res.data)
    }

    async signup(para, callback) {
        const res = await axios.post('/api/signup', para)
        callback(res.data)
    }

    async login(para, callback) {
        const res = await axios.post('/api/login', para)
        callback(res.data)
    }

    async checkauth(callback) {
        const res = await axios.get('/api/checkauth')
        callback(res.data)
    }
}

export default new Auth();