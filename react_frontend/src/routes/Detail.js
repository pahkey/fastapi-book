import Error from '../components/Error'
import { useParams, Link, useNavigate } from "react-router-dom"
import React, {useEffect, useState} from "react"
import Moment from 'moment'
import 'moment/locale/ko'
import { fastapi } from '../utils/tools'
import { useSelector } from 'react-redux'
import ReactMarkdown from 'react-markdown'


function Detail() {
    const navigate = useNavigate()
    const params = useParams()
    const username = useSelector(state => state.auth.username)
    const isLogin = useSelector(state => state.auth.isLogin)
    const question_id = params.question_id
    
    // state
    const [isLoading, setLoading] = useState(false)
    const [res, setRes] = useState({
        answers:[],
        voter:[],
    })
    const [error, setError] = useState([])

    useEffect(() => {
        if(!isLoading) {
            getQuestion(question_id)
        }
    })

    /* functions */
    const getQuestion = async (_id) => {
        const url = '/api/question/detail/'+_id
        const err_callback = (err) => {
            alert(err);
        }
        fastapi('get', url, {}, (response) => {
            setLoading(true)
            setRes(response.data)
        }, err_callback)
    }

    const postAnswer = async (event) => {
        event.preventDefault()
        const url = '/api/answer/create/'+question_id
        const param = {
            content: event.target.answerContent.value,
        }
        const callback = (response) => {
            setError([])
            event.target.reset()
            getQuestion(question_id)
        }
        const err_callback = (err) => {
            setError(err)
        }

        fastapi('post', url, param, callback, err_callback)
    }

    const deleteQuestion = async (_question_id) => {
        if(window.confirm('정말로 삭제하시겠습니까?')) {
            const url = '/api/question/delete'
            const param = {
                question_id: _question_id
            }
            const callback = (response) => {
                navigate('/')
            }
            const err_callback = (err) => {
                console.log(err)
                alert('error')
            }

            fastapi('delete', url, param, callback, err_callback)
        }
    }

    const voteQuestion = async (_question_id) => {
        if(window.confirm('정말로 추천하시겠습니까?')) {
            const url = '/api/question/vote'
            const param = {
                question_id: _question_id
            }
            const callback = (response) => {
                getQuestion(question_id)
            }
            const err_callback = (err) => {
                console.log(err)
                alert('error')
            }

            fastapi('post', url, param, callback, err_callback)
        }
    }

    const deleteAnswer = async (answer_id) => {
        if(window.confirm('정말로 삭제하시겠습니까?')) {
            const url = '/api/answer/delete'
            const param = {
                answer_id: answer_id
            }
            const callback = (response) => {
                getQuestion(question_id)
            }
            const err_callback = (err) => {
                console.log(err)
                alert('error')
            }

            fastapi('delete', url, param, callback, err_callback)
        }
    }

    const voteAnswer = async (answer_id) => {
        if(window.confirm('정말로 추천하시겠습니까?')) {
            const url = '/api/answer/vote'
            const param = {
                answer_id: answer_id
            }
            const callback = (response) => {
                getQuestion(question_id)
            }
            const err_callback = (err) => {
                console.log(err)
                alert('error')
            }

            fastapi('post', url, param, callback, err_callback)
        }
    }
    
    return (
        <div className="container my-3">
            <h2 className="border-bottom py-2">{res.subject}</h2>
            <div className="card my-3">
                <div className="card-body">
                    <div className="card-text">
                        <ReactMarkdown children={ res.content } />
                    </div>
                    <div className="d-flex justify-content-end">
                        {
                            res.modify_date &&
                            <div className="badge bg-light text-dark p-2 text-start mx-3">
                                <div className="mb-2">modified at</div>
                                <div>{Moment(res.modify_date).format('YYYY년 MM월 DD일 hh:mm a')}</div>
                            </div>
                        }
                        <div className="badge bg-light text-dark p-2 text-start">
                            <div className="mb-2">{ res.user && res.user.username }</div>
                            <div>{Moment(res.create_date).format('YYYY년 MM월 DD일 hh:mm a')}</div>
                        </div>
                    </div>
                    <div className="my-3">
                        <button
                            onClick={() => voteQuestion(question_id)}
                            className="recommend btn btn-sm btn-outline-secondary">추천
                            <span className="ms-1 badge rounded-pill bg-success">{res.voter.length}</span>
                        </button>
                        {
                            res.user && username === res.user.username &&
                            <>
                                <Link 
                                    to='/question-modify'
                                    state={{ question_id:question_id, subject:res.subject, content:res.content }}
                                    className="ms-1 btn btn-sm btn-outline-secondary">
                                    수정
                                </Link>
                                <button 
                                    onClick={() => deleteQuestion(question_id)}
                                    className="ms-1 btn btn-sm btn-outline-secondary">
                                    삭제
                                </button>
                            </>
                        }
                    </div>
                </div>
            </div>
            
            <button className="btn btn-secondary" onClick={() => {
                navigate('/')
            }}>목록으로</button>

            <h5 className="border-bottom my-3 py-2">{res.answers.length}개의 답변이 있습니다.</h5>
            {
                res.answers.map((answer, index) => {
                    return (
                        <div key={index} className="card my-3">
                            <div className="card-body">
                                <div className="card-text">
                                    <ReactMarkdown children={ answer.content } />
                                </div>
                                <div className="d-flex justify-content-end">
                                    {
                                        answer.modify_date &&
                                        <div className="badge bg-light text-dark p-2 text-start mx-3">
                                            <div className="mb-2">modified at</div>
                                            <div>{Moment(answer.modify_date).format('YYYY년 MM월 DD일 hh:mm a')}</div>
                                        </div>
                                    }
                                    <div className="badge bg-light text-dark p-2 text-start">
                                        <div className="mb-2">{ answer.user && answer.user.username }</div>
                                        <div>{Moment(answer.create_date).format('YYYY년 MM월 DD일 hh:mm a')}</div>
                                    </div>
                                </div>

                                <div className="my-3">
                                    <button
                                        onClick={() => voteAnswer(answer.id)}
                                        className="recommend btn btn-sm btn-outline-secondary">추천
                                        <span className="ms-1 badge rounded-pill bg-success">{answer.voter.length}</span>
                                    </button>
                                    {
                                        answer.user && username === answer.user.username &&
                                        <>
                                            <Link 
                                                to='/answer-modify'
                                                state={{ question_id:question_id, answer_id:answer.id, content:answer.content }}
                                                className="ms-1 btn btn-sm btn-outline-secondary">
                                                수정
                                            </Link>
                                            <button 
                                                onClick={() => deleteAnswer(answer.id)}
                                                className="ms-1 btn btn-sm btn-outline-secondary">
                                                삭제
                                            </button>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            <Error errors={error} />
            <form onSubmit={postAnswer} className="my-3">
                <div className="mb-3">
                    <textarea name="answerContent" disabled={isLogin ? "" : "disabled"}
                        className="form-control" rows="10"></textarea>
                </div>
                <input 
                    className="btn btn-primary"
                    disabled={isLogin ? "" : "disabled"}
                    type="submit" value="답변등록" />
            </form>
        </div>
    )
}

export default Detail
