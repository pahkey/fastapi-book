from sqlalchemy import create_engine, MetaData
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from starlette.config import Config

config = Config('.env')
SQLALCHEMY_DATABASE_URL = config('SQLALCHEMY_DATABASE_URL')

if SQLALCHEMY_DATABASE_URL.startswith("sqlite"):
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
    )
else:
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
naming_convention = {
    "ix": 'ix_%(column_0_label)s',
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(column_0_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}
Base.metadata = MetaData(naming_convention=naming_convention)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Async database
SQLALCHEMY_DATABASE_URL_ASYNC = config('SQLALCHEMY_DATABASE_URL_ASYNC')
async_engine = create_async_engine(SQLALCHEMY_DATABASE_URL_ASYNC)


async def get_async_db():
    db = AsyncSession(bind=async_engine)
    try:
        yield db
    finally:
        await db.close()
