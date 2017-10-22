#3.3 服务管理
- [3.3.1 添加服务](#jump1)
    - [基本配置](#jump11)
    - [高级配置](#jump12)
- [3.3.2 删除服务](#jump2)
- [3.3.3 启动/停止服务](#jump3)
- [3.3.4 服务伸缩](#jump4)
- [3.3.5 服务升级](#jump5)
- [3.3.6 服务回滚](#jump6)
- [3.3.7 日志 & 监控 (详见3.7)](ri-zhi-jian-kong.md "日志 & 监控(详见3.7)")

***
##<span id="jump1">3.3.1 添加服务</span>

1）**服务名**
>要求：长度为2-32, 可以是小写字母或数字, 首字符必须是小写字母

2）**服务类型**：分**无状态**和**有状态**两种类型
   
>无状态：只支持数据临时存储的服务，数据会在容器销毁后丢失

>有状态：支持需要持久化存储数据的服务，数据不会因为容器的销毁而丢失。选择有状态类型之后，需要配置存储卷。

3）**镜像地址**：选定镜像后显示
>镜像地址：仓库地址/namespace/镜像名称:tag号

4）**镜像仓库**：点击**选择镜像**后弹出
>**镜像类型**
>>公有镜像：平台用户均可见

>>私有镜像：需要鉴权访问，一个命名空间下的私有镜像对该命名空间下的所有用户可见。

　
>**镜像信息**                     
>>镜像：namespace/镜像名称

>>最新版本：最新更新上传的版本号

>>版本数：创建至今累计上传版本数(不包括删除版本)

>>所选版本：当前服务需要部署的镜像版本号(默认显示最新版本)

>>操作：部署镜像


![](https://github.com/kirk-enterprise/kirk-docs/blob/master/yong-hu-zhi-nan/media/yingyongguanli-gongyoujingxiang.png?raw=true)


#### <span id="jump11">基本配置</span>

5）**容器规格**：提供四种规格                     
>1U1G：单个容器配1个CPU和1G内存资源

>1U2G：单个容器配1个CPU和2G内存资源

>2U2G：单个容器配2个CPU和2G内存资源

>2U4G：单个容器配2个CPU和4G内存资源

6）**容器数量**：当前服务需要配置的容器实例数，可以通过**服务伸缩**[[详见3.3.4]](#jump4) 进行扩缩容。

7）**网络配置**：配置服务在集群内部和外部的访问方法

>**内部访问和外部访问**
>>内部访问：服务之间如果有网络的访问需求，可以通过配置环境变量实现，格式为 **应用名-服务名:端口号** 

>>外部访问：开启 **集群外访问** 开关，平台将自动分配一个随机的外部访问域名

　
>**容器端口**                     
>>metadata自动配置：如果该镜像在metadata中约束了端口号，镜像选定后，平台将自动配置

　
>**协议类型**
>>metadata自动配置：如果该镜像在metadata中约束了协议类型，镜像选定后，平台将自动配置

8）**存储卷配置**：服务类型为有状态时才需要配置
>**存储卷类型**
>>云盘：使用ceph块存储方案，具备高可靠性和可用性的特色。

　
>**读写方式**
>>读写：允许该服务对挂载盘进行读和写两种操作

>>只读：只允许该服务对挂载盘进行读操作

　
>**选择存储卷**：下拉选择 **存储列表** 内的存储卷进行服务挂载
>>新增存储卷：如果下拉列表内没有目标挂载卷，可以立即新增一个
- 名称：存储卷名称(长度为2-32, 可以是小写字母或数字, 首字符必须是小写字母）
- 大小：最小为1G，最大为500G，调整粒度为1G

>><span style="color:red">注意：存储卷一旦创建成功，名称、大小无法修改</span>

![](https://github.com/kirk-enterprise/kirk-docs/blob/master/yong-hu-zhi-nan/media/yingyongguanli-tianjiacunchujuan.jpeg?raw=true)

#### <span id="jump12">高级配置</span>

9）**环境变量**
>**加载方式**
>>手动填写：手动输入变量值

>>配置中心 [[详见3.8]](/yong-hu-zhi-nan/zhu-ji-guan-li.md "[详见3.8]")：通过选择配置中心的配置项快捷定义变量值

10）**运行目录**：镜像内启动程序的路径

11）**执行命令**：容器启动后执行的命令

12）**执行参数**：执行命令的参数，多个参数时用空格隔开

***
##<span id="jump2">3.3.2 删除服务</span>

![](https://github.com/kirk-enterprise/kirk-docs/blob/master/yong-hu-zhi-nan/media/fuwuguanli-shanchufuwu.gif?raw=true)

***
##<span id="jump3">3.3.3 启动/停止服务</span>

![](https://github.com/kirk-enterprise/kirk-docs/blob/master/yong-hu-zhi-nan/media/fuwuguanli-qidonghetingzhi.gif?raw=true)

***
##<span id="jump4">3.3.4 服务伸缩</span>

服务伸缩允许用户能够手动调整无状态服务的容器实例数，例如将wordpress的web服务2个容器实例扩容为4个.
><span style="color:red">注意：有状态服务不支持弹性伸缩。</span>

![](https://github.com/kirk-enterprise/kirk-docs/blob/master/yong-hu-zhi-nan/media/fuwuguanli-fuwushensuo.gif?raw=true)

***
##<span id="jump5">3.3.5 服务升级</span>

允许更新服务配置，生成新的服务版本

>**允许的更新**
>> **镜像版本**

>> **基本配置**，包括容器规格和网络配置

>> **高级配置**，包括环境变量、运行目录、执行命令和执行参数


>><span style="color:red">注意：服务升级会导致日志和监控重置</span>

![](https://github.com/kirk-enterprise/kirk-docs/blob/master/yong-hu-zhi-nan/media/fuwuguanli-fuwushengji.gif?raw=true)

***
##<span id="jump6">3.3.6 服务回滚</span>

允许在所有服务升级的版本之间做切换。

><span style="color:red">注意：服务回滚会导致日志和监控重置</span>

![](https://github.com/kirk-enterprise/kirk-docs/blob/master/yong-hu-zhi-nan/media/fuwuguanli-fuwuhuigun.gif?raw=true)












