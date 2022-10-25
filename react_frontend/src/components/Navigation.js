import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setLogin, setUsername } from '../redux/authSlice'
import { setKeyword, setPage } from '../redux/pageSlice'


function Navigation() {
    const isLogin = useSelector(state => state.auth.isLogin)
    const username = useSelector(state => state.auth.username)
    const dispatch = useDispatch()

    // 타임아웃으로 로그아웃 될 경우 access_token이 사라진다. tools.js에서
    if (!localStorage.getItem('access_token')) {
        dispatch(setLogin(false))
        dispatch(setUsername(''))
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            <div className="container-fluid">
                <Link className="navbar-brand" onClick={() => {
                    dispatch(setPage(0))
                    dispatch(setKeyword(''))
                    window.location = '/'
                }}>Pybo</Link>
                <button className="navbar-toggler" type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {
                        isLogin 
                        ?
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" onClick={() => {
                                        dispatch(setLogin(false))
                                        dispatch(setUsername(''))
                                        localStorage.removeItem('access_token')
                                        window.location = '/'
                                    }}>로그아웃 ({username})
                                </Link>
                            </li>
                        </ul>
                        :
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to='/user-create'>계정생성</Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link" to='/user-login'>로그인</Link>
                            </li>
                        </ul>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navigation
