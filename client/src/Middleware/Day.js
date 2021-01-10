import axios from 'axios'

class Day {
    async fetchCurrentDay(para, callback) {
        const res = await axios.post('/api/fetchcurrentday', para)
        callback(res.data)
    }

    async initCurrentDay(para, callback) {
        const res = await axios.post('/api/initcurrentday', para)
        callback(res.data)
    }
}

export default new Day();