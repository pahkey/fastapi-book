from passlib.context import CryptContext
from sqlalchemy import select
from sqlalchemy.orm import Session
from domain.user.user_schema import UserCreate
from models import User

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


async def create_user(db: Session, user_create: UserCreate):
    db_user = User(username=user_create.username,
                   password=pwd_context.hash(user_create.password1),
                   email=user_create.email)
    db.add(db_user)
    await db.commit()


async def get_existing_user(db: Session, user_create: UserCreate):
    result = await db.execute(
        select(User).filter(
            (User.username == user_create.username) |
            (User.email == user_create.email)
        )
    )
    return result.scalars().all()


async def get_user(db: Session, username: str):
    result = await db.execute(select(User).filter(User.username == username))
    return result.scalar_one()
