"점프 투 FastAPI"는 "파이보"라는 이름의 파이썬 게시판(Python Board) 서비스를 만들어가는 과정을 설명한 FastAPI 입문서이다. 파이썬 설치부터 시작하여 서비스 운영까지 웹 프로그래밍의 처음부터 끝까지 모든 것을 알 수 있도록 구성하였다.

이 책을 따라하다 보면 다음과 같은 웹 사이트가 만들어진다. (최종 결과물)

* [http://fastapi.pybo.kr](http://fastapi.pybo.kr)


책을 따라하다 생기는 질문은 위키독스의 댓글 또는 파이보의 완성형인 아래사이트를 활용하자.

* 파이보 (파이썬 질문과 답변 게시판) - [https://pybo.kr](https://pybo.kr)

----

## FastAPI 서버 실행
* uvicorn main:app --reload

## Svelte 서버 실행
* npm run dev

## alembic
* alembic init migrations
* alembic revision --autogenerate
* alembic upgrade head

## docker
docker build -t myapi . 
docker run --name myapi-container -dit -p 8000:8000 -v $(pwd) myapi
docker ps -a
docker attach CONTAINER_NAME
docker exec -it CONTAINER_NAME /bin/bash
uvicorn main:app --reload  --host 0.0.0.0
