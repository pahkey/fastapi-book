import React, {useState} from "react"
import Error from "../components/Error"
import { fastapi } from '../utils/tools'
import { useLocation, useNavigate } from "react-router-dom"


function AnswerModifyForm() {

    // 수신받은 값
    const location = useLocation()
    const {question_id, answer_id, content} = location.state

    const navigate = useNavigate()
    const [error, setError] = useState([])
    const [_content, setContent] = useState(content)

    const updateAnswer = async (event) => {
        event.preventDefault()

        const url = '/api/answer/update'
        const param = {
            answer_id: answer_id,
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

    const handleContent = (e) => {
        setContent(e.target.value)
    }

    return (
        <div className="container">
            <h5 className="my-3 border-bottom pb-2">답변 수정</h5>
            <Error errors={error} />
            <form onSubmit={updateAnswer} method="post" className="my-3">
                <div className="mb-3">
                    <label>내용</label>
                    <textarea name="content" className="form-control" rows="10" value={_content} onChange={handleContent}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">수정하기</button>
            </form>
        </div>
    )
}

export default AnswerModifyForm
