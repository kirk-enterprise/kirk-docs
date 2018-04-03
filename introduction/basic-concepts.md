## 空间 {docsify-ignore}
Kubernetes的Namespace概念。空间之间资源隔离，进程相互独立。空间下多个区域之间的资源也隔离。一个用户可以创建多个空间，空间类型包括公开空间和私有空间，公开空间用来管理公开镜像仓库，私有空间用来管理私有镜像仓库。

## 应用 {docsify-ignore}
应用是多个服务的上层抽象，方便用户对关联服务做聚类。

## 服务 {docsify-ignore}
Kubernetes的Service概念。服务分为有状态服务和无状态服务。有状态服务可以持久化存储数据，只能单容器实例。无状态服务不能持久化存储数据，可以多容器实例。

## 容器 {docsify-ignore}
Container，是docker镜像运行时的实例。

## 镜像 {docsify-ignore}
Docker的Image概念。服务打包的标准形式，除了包含服务代码，还包含服务运行所需的库、资源、配置等文件。镜像被集中存储在镜像仓库中。