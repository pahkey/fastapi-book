import Error from "../components/Error"
import { fastapi } from '../utils/tools'
import React, { useState } from "react"
import { useDispatch } from 'react-redux'
import { setLogin, setUsername } from "../redux/authSlice"
import { useNavigate } from "react-router-dom"


function LoginForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [error, setError] = useState([])

    const login = async(event) => {
        event.preventDefault()
        const url = '/api/user/login'
        const param = {
            username: event.target.username.value,
            password: event.target.password.value,
        }
        const callback = (response) => {
            localStorage.setItem('access_token', response.data.access_token)
            dispatch(setLogin(true))
            dispatch(setUsername(response.data.username))
            navigate('/')
        }
        const err_callback = (err) => {
            setError(err)
        }
        fastapi('login', url, param, callback, err_callback)
    }

    return (
        <div className="container">
            <h5 className="my-3 border-bottom pb-2">로그인</h5>
            <Error errors={error} />
            <form onSubmit={login} method="post" className="my-3">
                <div className="mb-3">
                    <label>사용자 이름</label>
                    <input type="text" 
                        className="form-control" 
                        name="username" />
                </div>
                <div className="mb-3">
                    <label>비밀번호</label>
                    <input type="password" 
                        className="form-control" 
                        name="password" />
                </div>
                <button type="submit" className="btn btn-primary">로그인</button>
            </form>
        </div>
    )
}

export default LoginForm
