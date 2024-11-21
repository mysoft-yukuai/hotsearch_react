# 使用 Node.js 作为基础镜像
FROM node:20-alpine AS build

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json yarn.lock ./

# 安装依赖
RUN yarn install --frozen-lockfile

# 复制项目源码
COPY . .

# 构建生产环境的静态文件
RUN npm run build

# 使用 Nginx 作为生产环境的服务器
FROM nginx:alpine

# 复制构建好的静态文件到 Nginx 的默认目录
COPY --from=build /app/dist /usr/share/nginx/html

# 暴露端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]