import React from "react"
import Home from "./routes/Home"
import Detail from "./routes/Detail"
import Navigation from "./components/Navigation"
import QuestionForm from "./routes/QuestionForm"
import UserForm from "./routes/UserForm"
import LoginForm from "./routes/LoginForm"
import QuestionModifyForm from "./routes/QuestionModifyForm"
import AnswerModifyForm from "./routes/AnswerModifyForm"
import { HashRouter, Routes, Route } from 'react-router-dom'


function App() {
  return (
    <HashRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:question_id" element={<Detail />} />
        <Route path="/question-create" element={<QuestionForm />} />
        <Route path="/question-modify" element={<QuestionModifyForm />} />
        <Route path="/answer-modify" element={<AnswerModifyForm />} />
        <Route path="/user-create" element={<UserForm />} />
        <Route path="/user-login" element={<LoginForm />} />
      </Routes>
    </HashRouter>
  )
}

export default App
