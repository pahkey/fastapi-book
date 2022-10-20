## FastAPI 서버 실행
* uvicorn main:app --reload

## Database
* alembic init migrations (한번만)
* alembic revision --autogenerate
* alembic upgrade head
* alembic stamp head

## Svelte 서버 실행
* npm run dev