import React, {useState } from "react"
import Error from "../components/Error"
import { fastapi } from '../utils/tools'
import { useLocation, useNavigate } from "react-router-dom"


function QuestionModifyForm() {

    // 수신받은 값
    const location = useLocation()
    const {question_id, subject, content} = location.state

    const navigate = useNavigate()
    const [error, setError] = useState([])
    const [_subject, setSubject] = useState(subject)
    const [_content, setContent] = useState(content)

    const updateQuestion = async (event) => {
        event.preventDefault()

        const url = '/api/question/update'
        const param = {
            question_id: question_id,
            subject: _subject,
            content: _content,
        }
        const callback = () => {
            navigate('/detail/'+question_id)
        }
        const err_callback = (err) => {
            setError(err)
        }
        fastapi('put', url, param, callback, err_callback)
    }

    const handleSubject = (e) => {
        setSubject(e.target.value)
    }

    const handleContent = (e) => {
        setContent(e.target.value)
    }

    return (
        <div className="container">
            <h5 className="my-3 border-bottom pb-2">질문 수정</h5>
            <Error errors={error} />
            <form onSubmit={updateQuestion} method="post" className="my-3">
                <div className="mb-3">
                    <label>제목</label>
                    <input type="text" name="subject" className="form-control" value={_subject} onChange={handleSubject}/>
                </div>
                <div className="mb-3">
                    <label>내용</label>
                    <textarea name="content" className="form-control" rows="10" value={_content} onChange={handleContent}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">수정하기</button>
            </form>
        </div>
    )
}

export default QuestionModifyForm
