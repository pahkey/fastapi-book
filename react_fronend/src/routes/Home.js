import React, {useEffect, useState} from "react"
import { Link } from 'react-router-dom'
import Moment from 'moment'
import 'moment/locale/ko'
import { fastapi } from '../utils/tools'
import { useSelector, useDispatch } from 'react-redux'
import { setPage, setKeyword } from "../redux/pageSlice"


function Home() {
  const page = useSelector(state => state.page.page)
  const keyword = useSelector(state => state.page.keyword)
  const isLogin = useSelector(state => state.auth.isLogin)
  const dispatch = useDispatch()

  /* state */
  const [res, setRes] = useState({
    question_list:[],
    total:0,
    page:0,
  })
  const [isLoading, setLoading] = useState(false)

  /* variables */
  const size = 10

  useEffect(() => {
    if(!isLoading) {
      getQuestionList(page)
    }
  })

  /* functions */
  const getQuestionList = async (_page) => {
    const url = '/api/question/list'
    const param = {
        page: _page,
        size: size,
        keyword: keyword,
    }
    fastapi('get', url, param, (response) => {
      setLoading(true)
      setRes(response.data)
      /* save page for detail and back page */
      dispatch(setPage(_page))
      // dispatch(setKeyword('hello'))
    })    
  }

  let total_page = Math.ceil(res.total/size)
  let prev_active = 'page-item'
  let next_active = 'page-item'
  if(page === 0) {
    prev_active = 'page-item disabled'
  }
  if(page === total_page-1) {
    next_active = 'page-item disabled'
  }
  let prev_page = 
    <li className={prev_active}>
      <button onClick={() => {getQuestionList(page-1)}} className="page-link">이전</button>
    </li>
  let next_page = 
    <li className={next_active}>
      <button onClick={() => {getQuestionList(page+1)}} className="page-link">다음</button>
    </li>
  
  return (
    <div className="container my-3">
      <div className="row my-3">
          <div className="col-6">
            {
              isLogin 
                ? <Link className="btn btn-primary" to="/question-create">질문 등록하기</Link>
                : <Link className="btn btn-primary" onClick={() => {window.location = '/user-login'}}>질문 등록하기</Link>
            }
          </div>
          <div className="col-6">
              <div className="input-group">
                  <input type="text" className="form-control" 
                    onChange={(event) => {
                      dispatch(setKeyword(event.target.value))
                    }}
                    value={keyword} />
                  <button className="btn btn-outline-secondary" 
                    onClick={() => getQuestionList(0)}>찾기</button>
              </div>
          </div>
      </div>

      <table className="table">
        <thead className="table-dark">
          <tr className="text-center">
            <th>번호</th>
            <th style={{width:'50%'}}>제목</th>
            <th>글쓴이</th>
            <th>작성일시</th>
          </tr>
        </thead>
        <tbody>
          {
            res.question_list.map((q, index) => {
              // 번호 = 전체 게시물 개수 - (현재 페이지 * 페이지당 게시물 개수) - 나열 인덱스
              let no = res.total - (page * size) - index
              let span_answer = ''
              if(q.answers.length > 0) {
                  span_answer = <span className="text-danger small mx-2">{q.answers.length}</span>
              }
              let to='/detail/'+q.id
              return (
                  <tr key={index} className="text-center">
                      <td>{no}</td>
                      <td className="text-start">
                          <Link to={to}>{q.subject}</Link>
                          {span_answer}
                      </td>
                      <td>{q.user && q.user.username}</td>
                      <td>{Moment(q.create_date).format('YYYY년 MM월 DD일 hh:mm a')}</td>
                  </tr>
              )
            })
          }
        </tbody>
      </table>
      <ul className="pagination justify-content-center">
        {prev_page}
        {
          [...Array(total_page)].map((x, i) =>
            {
              let loop_page = i
              if(loop_page >= page-5 && loop_page <= page+5) {
                let active = 'page-item'
                if (loop_page === page) {
                  active = 'page-item active'
                }
                return (
                  <li key={i} className={active}>
                    <button onClick={() => {getQuestionList(loop_page)}} className="page-link">{loop_page+1}</button>
                  </li>
                )
              }else {
                return ''
              }
            }
          )
        }
        {next_page}
      </ul>
    </div>
  )
}

export default Home
