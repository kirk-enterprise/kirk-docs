# 常见问题

**Q1. 服务间如何实现网络访问？**

?> 服务间通过配置环境变量进行访问，端口号定义遵循 **应用名-服务名:端口号** 的格式 

**参考最佳实践：**[创建Wordpress应用](best-practise/create-wordpress-app.md)

**Q2. 如何从本地拷贝文件到存储卷？**

可以将存储卷挂载到一个sshd服务，通过四层负载均衡暴露服务端口到公网，本地文件走公网上传到存储卷。

**1）启动一个sshd容器服务，并挂载存储卷**<br>
sshd服务dockerfile下载链接：http://oyh1cogl9.bkt.clouddn.com/sshd.yaml <br>
1.1 通过本地`docker build`或者七牛镜像中心的持续构建功能([如何实现镜像的持续构建](https://kirk-enterprise.github.io/hub-docs/#/user-guide/repository?id=_322-%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E9%95%9C%E5%83%8F%E7%9A%84%E6%8C%81%E7%BB%AD%E6%9E%84%E5%BB%BA))，实现基于dockerfile打包镜像。<br>
1.2 如果镜像是在本地打包的，推送本地镜像到七牛镜像仓库([上传本地镜像到仓库](https://kirk-enterprise.github.io/hub-docs/#/quick-start/push-image))<br>
1.3 基于该镜像创建服务，并挂载存储卷到服务，参见 [创建有状态服务](https://kirk-enterprise.github.io/kirk-docs/#/quick-start/create-app?id=jump32)

**2）创建四层负载均衡，并绑定到服务**<br>
参见 [如何创建负载均衡，并绑定到服务](https://kirk-enterprise.github.io/kirk-docs/#/user-guide/loadbalance_4?id=_362-%E5%A6%82%E4%BD%95%E5%88%9B%E5%BB%BA%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1%EF%BC%8C%E5%B9%B6%E7%BB%91%E5%AE%9A%E5%88%B0%E6%9C%8D%E5%8A%A1)

**3）拷贝本地文件到存储卷**<br>
通过`scp <本地文件> root@<四层负载均衡IP地址>:<存储卷挂载到容器内部路径>`命令，拷贝本地文件到存储卷



