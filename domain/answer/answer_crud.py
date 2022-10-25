from datetime import datetime

from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from domain.answer.answer_schema import AnswerCreate, AnswerUpdate
from models import Question, Answer, User


async def create_answer(db: Session, question: Question,
                        answer_create: AnswerCreate, user: User):
    db_answer = Answer(question=question,
                       content=answer_create.content,
                       create_date=datetime.now(),
                       user=user)
    db.add(db_answer)
    await db.commit()


async def get_answer(db: Session, answer_id: int):
    answer = await db.execute(select(Answer).filter(Answer.id == answer_id)
                                .options(selectinload(Answer.user))
                                .options(selectinload(Answer.voter))
                                )
    return answer.scalar_one()


async def update_answer(db: Session, db_answer: Answer,
                        answer_update: AnswerUpdate):
    db_answer.content = answer_update.content
    db_answer.modify_date = datetime.now()
    db.add(db_answer)
    await db.commit()


async def delete_answer(db: Session, db_answer: Answer):
    await db.delete(db_answer)
    await db.commit()


async def vote_answer(db: Session, db_answer: Answer, db_user: User):
    db_answer.voter.append(db_user)
    await db.commit()
