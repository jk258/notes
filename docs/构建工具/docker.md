# docker

## docker镜像
查看镜像
```
docker images
```
## docker容器
查看容器
```
docker ps
docker ps -a
```
进入容器
```
docker exec -it [容器id] /bin/bash ||
docker exec -it [容器id] /bin/sh
```


## docker-compose
后台启动
```
docker-compose up -d
```
停止并删除镜像
```
docker-compose down
```
