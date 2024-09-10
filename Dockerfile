# 1. Node.js 환경에서 React 앱을 빌드하는 단계
FROM node:18-alpine AS build

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json을 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 소스 코드 복사
COPY . .

# React 애플리케이션을 빌드 (정적 파일로 변환)
RUN npm run build

# 2. NGINX를 통해 빌드된 파일을 서빙하는 단계
FROM nginx:alpine


# 빌드된 React 앱 파일을 NGINX의 기본 웹 루트 디렉토리로 복사
COPY --from=build /app/build /usr/share/nginx/html

# NGINX 포트 80 노출
EXPOSE 80

# NGINX 실행
CMD ["nginx", "-g", "daemon off;"]

