import React, {useState} from "react"
import Error from "../components/Error"
import { fastapi } from '../utils/tools'
import { useDispatch } from 'react-redux'
import { setKeyword, setPage } from "../redux/pageSlice"
import { useNavigate } from "react-router-dom"


function QuestionForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState([])

    const postQuestion = async (event) => {
        event.preventDefault()

        const url = '/api/question/create'
        const param = {
            subject: event.target.subject.value,
            content: event.target.content.value,
        }
        const callback = () => {
            dispatch(setPage(0))
            dispatch(setKeyword(''))
            navigate('/')
        }
        const err_callback = (err) => {
            setError(err)
        }

        fastapi('post', url, param, callback, err_callback)
    }

    return (
        <div className="container">
            <h5 className="my-3 border-bottom pb-2">질문등록</h5>
            <Error errors={error} />
            <form onSubmit={postQuestion} method="post" className="my-3">
                <div className="mb-3">
                    <label>제목</label>
                    <input type="text" name="subject" className="form-control"/>
                </div>
                <div className="mb-3">
                    <label>내용</label>
                    <textarea name="content" className="form-control" rows="10"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">저장하기</button>
            </form>
        </div>
    )
}

export default QuestionForm
