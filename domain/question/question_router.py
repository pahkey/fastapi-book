from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette import status

from database import get_async_db
from domain.question import question_schema, question_crud
from domain.user.user_router import get_current_user
from models import User

router = APIRouter(
    prefix="/api/question",
)


@router.get("/list", response_model=question_schema.QuestionList)
async def question_list(db: Session = Depends(get_async_db),
                        page: int = 0, size: int = 10, keyword: str = ''):
    total, _question_list = await question_crud.get_question_list(
        db, skip=page * size, limit=size, keyword=keyword)
    return {
        'total': total,
        'question_list': _question_list
    }


@router.get("/detail/{question_id}", response_model=question_schema.Question)
async def question_detail(question_id: int, db: Session = Depends(get_async_db)):
    question = await question_crud.get_question(db, question_id=question_id)
    return question


@router.post("/create", status_code=status.HTTP_204_NO_CONTENT)
async def question_create(_question_create: question_schema.QuestionCreate,
                          db: Session = Depends(get_async_db),
                          current_user: User = Depends(get_current_user)):
    await question_crud.create_question(db=db, question_create=_question_create,
                                        user=current_user)


@router.put("/update", status_code=status.HTTP_204_NO_CONTENT)
async def question_update(_question_update: question_schema.QuestionUpdate,
                          db: Session = Depends(get_async_db),
                          current_user: User = Depends(get_current_user)):
    db_question = await question_crud.get_question(db, question_id=_question_update.question_id)
    if not db_question:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="데이터를 찾을수 없습니다.")
    if current_user.id != db_question.user.id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="수정 권한이 없습니다.")
    await question_crud.update_question(db=db, db_question=db_question,
                                        question_update=_question_update)


@router.delete("/delete", status_code=status.HTTP_204_NO_CONTENT)
async def question_delete(_question_delete: question_schema.QuestionDelete,
                          db: Session = Depends(get_async_db),
                          current_user: User = Depends(get_current_user)):
    db_question = await question_crud.get_question(db, question_id=_question_delete.question_id)
    if not db_question:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="데이터를 찾을수 없습니다.")
    if current_user.id != db_question.user.id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="삭제 권한이 없습니다.")
    await question_crud.delete_question(db=db, db_question=db_question)


@router.post("/vote", status_code=status.HTTP_204_NO_CONTENT)
async def question_vote(_question_vote: question_schema.QuestionVote,
                        db: Session = Depends(get_async_db),
                        current_user: User = Depends(get_current_user)):
    db_question = await question_crud.get_question(db, question_id=_question_vote.question_id)
    if not db_question:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="데이터를 찾을수 없습니다.")
    await question_crud.vote_question(db, db_question=db_question, db_user=current_user)
