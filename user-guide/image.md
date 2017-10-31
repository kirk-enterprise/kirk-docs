#3.6 镜像中心

- [3.6.1 镜像信息](#jump1)
- [3.6.2 上传镜像](#jump2)
- [3.6.3 删除镜像](#jump3)
- [3.6.4 删除镜像版本](#jump4)
- [3.6.5 部署镜像](#jump5)

##<span id="jump1">3.6.1 镜像信息</span>

1）**镜像类型**
>公有镜像：平台用户均可见
>
>私有镜像：需要鉴权访问，一个命名空间下的私有镜像对该命名空间下的所有用户可见。

　

2）**镜像信息**                     

>镜像：namespace/镜像名称

>最新版本：最新更新上传的版本号

>版本数：创建至今累计上传版本数(不包括删除版本)

>所选版本：当前服务需要部署的镜像版本号(默认显示最新版本)

>操作：部署镜像

***
##<span id="jump2">3.6.2 上传镜像</span>

通过Docker客户端登陆镜像仓库进行镜像上传。

>注意：只有具备管理员权限的账户才能上传镜像到公有镜像仓库，普通用户可以上传到私有镜像仓库

![](https://github.com/kirk-enterprise/kirk-docs/blob/master/yong-hu-zhi-nan/media/jingxiangzhongxin-shangchuanjingxiang.png?raw=true)

***
##<span id="jump3">3.6.3 删除镜像</span>

删除镜像后，该镜像下所有版本将被删除。

![](https://github.com/kirk-enterprise/kirk-docs/blob/master/yong-hu-zhi-nan/media/jingxiangzhongxin-shanchujingxiang.gif?raw=true)

***
##<span id="jump4">3.6.4 删除镜像版本</span>

支持删除镜像下的某个版本。

![](https://github.com/kirk-enterprise/kirk-docs/blob/master/yong-hu-zhi-nan/media/jingxianghzongxin-shanchujingxiangbanben.gif?raw=true)

***
##<span id="jump5">3.6.5 部署镜像</span>

点击镜像的 **部署** 操作，创建基于该镜像的一个服务。