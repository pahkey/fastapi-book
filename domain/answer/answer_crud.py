from datetime import datetime

from sqlalchemy.orm import Session

from domain.answer.answer_schema import AnswerCreate
from models import Question, Answer, User


def create_answer(db: Session, question: Question,
                  answer_create: AnswerCreate, user: User):
    db_answer = Answer(question=question,
                       content=answer_create.content,
                       create_date=datetime.now(),
                       user=user)
    db.add(db_answer)
    db.commit()
