# 베이스 이미지로 ubuntu:22.04 사용
FROM ubuntu:22.04

# 환경변수 설정 (옵션)
ENV PATH /usr/local/bin:$PATH
ENV LANG C.UTF-8

# 기본 패키지들 설치 및 Python 3 설치
RUN apt update
RUN apt install -y git
RUN apt install -y curl
RUN apt install -y python3-pip

# nodejs 설치
RUN curl -s https://deb.nodesource.com/setup_16.x | bash
RUN apt install -y nodejs

# 여러분의 현재 디렉토리의 모든 파일들을 도커 컨테이너의 /myapi 디렉토리로 복사 (원하는 디렉토리로 설정해도 됨)
ADD . /myapi

# 8000번 포트 개방 (FastAPI 웹 애플리케이션을 8000번 포트에서 띄움)
EXPOSE 8000

# 작업 디렉토리로 이동
WORKDIR /myapi

# 작업 디렉토리에 있는 requirements.txt로 패키지 설치
RUN pip install -r requirements.txt

# npm install
WORKDIR /myapi/frontend
RUN npm install

# 컨테이너에서 실행될 명령어.
CMD [ "/bin/bash" ]
