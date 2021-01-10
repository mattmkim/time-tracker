import axios from 'axios'

class Study {
    async fetchCategories(para, callback) {
        const res = await axios.post('http://localhost:5000/api/fetchcategories', para)
        callback(res.data)
    }

    async createStudySession(para, callback) {
        const res = await axios.post('http://localhost:5000/api/createstudysession', para)
        callback(res.data)
    }

    async fetchCurrentDay(para, callback) {
        const res = await axios.post('http://localhost:5000/api/fetchcurrentday', para)
        callback(res.data)
    }

    async initCurrentDay(para, callback) {
        const res = await axios.post('http://localhost:5000/api/initcurrentday', para)
        callback(res.data)
    }
}

export default new Study();