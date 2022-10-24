import React, {useState} from "react"
import { useNavigate } from "react-router-dom"
import Error from "../components/Error"
import { fastapi } from '../utils/tools'


function UserForm() {
    const navigate = useNavigate()
    const [error, setError] = useState([])
    const postUser = async (event) => {
        event.preventDefault()
        const url = '/api/user/create'
        const param = {
            username: event.target.username.value,
            password1: event.target.password1.value,
            password2: event.target.password2.value,
            email: event.target.email.value,
        }

        const callback = () => {
            navigate('/user-login')
        }
        const err_callback = (err) => {
            setError(err)
        }
        fastapi('post', url, param, callback, err_callback)
    }

    return (
        <div className="container">
            <h5 className="my-3 border-bottom pb-2">계정생성</h5>
            <Error errors={error} />
            <form onSubmit={postUser} method="post" className="my-3">
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
                        name="password1" />
                </div>
                <div className="mb-3">
                    <label>비밀번호 확인</label>
                    <input type="password" 
                        className="form-control" 
                        name="password2" />
                </div>
                <div className="mb-3">
                    <label>이메일</label>
                    <input type="email" 
                        className="form-control" 
                        name="email" />
                </div>
                <button type="submit" className="btn btn-primary">생성하기</button>
            </form>
        </div>
    )
}

export default UserForm
