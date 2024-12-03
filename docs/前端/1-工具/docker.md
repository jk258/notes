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


## docker-compose
后台启动
```sh
docker-compose up -d
```
停止并删除镜像
```sh
docker-compose down
```
