# 3.4 容器管理

## 3.4.1 添加容器

容器通过镜像生成，在 **添加服务** 中实现，同时可以选择服务下的容器实例个数。[详见3.3.1](user-guide/service.md)

***
## 3.4.2 扩缩容器数

容器实例数的扩缩通过 **服务伸缩** 实现。[详见3.3.4](user-guide/service.md)

***
## 3.4.3 重新部署

!> **注意：容器重新部署会导致该容器日志和监控重置**

![重新部署](_figures/user-guide/container-redeploy.gif)

***
## 3.4.4 远程终端

类似docker exec命令功能，以Terminal形式登入进容器内部。

***
## 3.4.5 日志 & 监控

七牛容器云提供容器级别的日志和监控。[详见3.7](user-guide/log-and-monitor.md)

