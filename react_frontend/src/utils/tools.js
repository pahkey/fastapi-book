import axios from 'axios'
import qs from 'qs'


async function fastapi(method, url, param, callback, err_callback) {

    // method: get, post, login
    // content-type: application/json, application/x-www-form-urlencoded

    let _method = method
    if (method === 'login') {
        _method = 'post'
    }

    let content_type = 'application/json'
    if (method === 'login') {
        content_type = 'application/x-www-form-urlencoded'
    }

    let data = param
    if (content_type === 'application/x-www-form-urlencoded') {
        data = qs.stringify(param)
    }

    let headers = {
        'content-type': content_type
    }

    const token = localStorage.getItem('access_token')
    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    }

    let _url = process.env.REACT_APP_SERVER_URL
    _url += url

    let options = {
        method: _method,
        headers: headers,
        url: _url,
    }

    if (_method === 'get') {
        options['params'] = data
    } else {
        options['data'] = data
    }

    await axios(options)
        .then((response) => {
            if (callback) {
                callback(response)
            }
        })
        .catch(error => {
            if (error.response) {
                if (method !== 'login' && error.response.status === 401) {
                    localStorage.removeItem('access_token')
                    alert("로그아웃 되었습니다.")
                    window.location.href = '/'
                } else {
                    console.log(error.response)
                    if (err_callback && error.response.data) {
                        err_callback(error.response.data.detail)
                    } else {
                        alert('unknown error')
                    }
                }
            } else if (error.request) {
                alert(error.request)
            } else {
                alert('Error', error.message)
            }
        })
}


export { fastapi }
