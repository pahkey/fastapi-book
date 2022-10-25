from datetime import datetime

from sqlalchemy import select, func

from domain.question.question_schema import QuestionCreate, QuestionUpdate
from models import Question, User, Answer
from sqlalchemy.orm import Session, selectinload


async def get_question_list(db: Session, skip: int = 0, limit: int = 10, keyword: str = ''):
    query = select(Question)
    if keyword:
        search = '%%{}%%'.format(keyword)
        sub_query = select(Answer.question_id, Answer.content, User.username) \
            .outerjoin(User, Answer.user_id == User.id).subquery()
        query = query \
            .outerjoin(User) \
            .outerjoin(sub_query, sub_query.c.question_id == Question.id) \
            .filter(Question.subject.ilike(search) |        # 질문제목
                    Question.content.ilike(search) |        # 질문내용
                    User.username.ilike(search) |           # 질문작성자
                    sub_query.c.content.ilike(search) |     # 답변내용
                    sub_query.c.username.ilike(search)      # 답변작성자
                    )
    total = await db.execute(select(func.count()).select_from(query))
    question_list = await db.execute(query.offset(skip).limit(limit)
                                     .order_by(Question.create_date.desc())
                                     .distinct()
                                     .options(selectinload(Question.answers).selectinload(Answer.voter))
                                     .options(selectinload(Question.answers).selectinload(Answer.user))
                                     .options(selectinload(Question.user))
                                     .options(selectinload(Question.voter))
                                     )
    return total.scalar_one(), question_list.scalars().fetchall()  # (전체 건수, 페이징 적용된 질문 목록)


async def get_question(db: Session, question_id: int):
    qeustion = await db.execute(select(Question).filter(Question.id == question_id)
                                .options(selectinload("answers").selectinload(Answer.voter))
                                .options(selectinload("answers").selectinload(Answer.user))
                                .options(selectinload(Question.user))
                                .options(selectinload(Question.voter))
                                )
    return qeustion.scalar_one()


async def create_question(db: Session, question_create: QuestionCreate, user: User):
    db_question = Question(subject=question_create.subject,
                           content=question_create.content,
                           create_date=datetime.now(),
                           user=user)
    db.add(db_question)
    await db.commit()


async def update_question(db: Session, db_question: Question,
                          question_update: QuestionUpdate):
    db_question.subject = question_update.subject
    db_question.content = question_update.content
    db_question.modify_date = datetime.now()
    db.add(db_question)
    await db.commit()


async def delete_question(db: Session, db_question: Question):
    await db.delete(db_question)
    await db.commit()


async def vote_question(db: Session, db_question: Question, db_user: User):
    db_question.voter.append(db_user)
    await db.commit()
