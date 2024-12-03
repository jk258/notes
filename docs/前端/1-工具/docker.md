# docker

## docker镜像
查看镜像
```sh
docker images
```
## docker容器
查看容器
```sh
docker ps
docker ps -a
```
进入容器
```sh
docker exec -it [容器id] /bin/bash ||
docker exec -it [容器id] /bin/sh
```
停止容器
```sh
docker stop container_name_or_id
docker stop container1 container2 container3 #停止多个容器
```
删除容器
```sh
docker rm container_name_or_id
docker rm container1 container2 container3 #删除多个容器
```
`none`镜像操作
```sh
docker images -f "dangling=true" #查看none镜像
docker rmi $(docker images -f "dangling=true" -q) #删除none镜像
docker system prune #清理磁盘空间
```

## docker-compose
后台启动
```sh
docker-compose up -d
```
停止并删除镜像
```sh
docker-compose down
```

# 将本地镜像部署到服务器
保存镜像为tar文件
```sh
docker save -o your-image-name.tar your-image-name:latest
```
传输tar文件到服务器
```sh
scp your-image-name.tar user@server_ip:/path/to/destination
```
加载tar文件为docker镜像
```sh
docker load -i /path/to/destination/your-image-name.tar
```
停止并删除旧容器，并以镜像启动新容器
```sh
docker stop your-container-name
docker rm your-container-name
docker run -d --name your-new-container-name your-image-name:latest
```
