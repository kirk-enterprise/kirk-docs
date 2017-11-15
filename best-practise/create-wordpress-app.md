# 创建一个 Wordpress 应用

Wordpress应用包含两种服务：mysql数据库服务和wordpress web服务。整个应用通过负载均衡的方式暴露到集群外部。

## 1. 添加应用

**操作如下：**
1. 点击左侧导航栏的 **应用**，进入应用界面
2. 点击 **添加应用**，填写应用名为 **"wordpress"**

![](_figures/best-practise/wordpress-create-1.png)

![](_figures/best-practise/wordpress-create-2.png)

***
## 2. 添加服务和容器实例
### 2.1 添加mysql服务
**操作如下：**

1. 点击 **添加服务**，填写服务名为 **"db"**
2. 选择服务类型为 **有状态**，使服务挂载存储卷
3. 点击 **选择镜像**，选择mysql镜像，点击 **部署**
4. 点击 **添加端口配置**，填写端口号为 **"3306"**，选择 **TCP** 协议
5. 点击 **添加存储配**，选择 **云盘** 存储类型，填写存储名称为 **"vol"**，填写挂载路径为 **"/data"**
6. 添加环境变量，设置mysql的root密码为root123。  
填写变量名为 **"MYSQL_ROOT_PASSWORD"**，变量值为 **"root123"**，
7. 点击 **确认**，完成mysql服务创建   

?> **说明：**如果该镜像在metadata中给出了相应的网络配置，镜像选择之后，将自动填写网络配置。

![](_figures/best-practise/wordpress-db.gif)

### 2.2 添加wordpress服务
**操作如下：**

1. 点击 **添加服务**，填写服务名为 **"web"**
2. 选择服务类型为 **无状态**，因为wordpress服务无需挂载存储卷
3. 点击 **选择镜像**，选择wordpress镜像，点击 **部署**
4. 选择容器数量为 **2**，即配置两个容器实例
5. 点击 **添加端口配置**，填写端口号为 **"80"**，选择 **TCP** 协议，开启 **集群外访问**，系统将自动分配访问域名
6. 添加两个环境变量，分别是wordpress服务与mysql服务内联时需要的的网络端口和root密码。  
填写变量名为 **“WORDPRESS_DB_HOST”**，变量值为 **“wordpress-db:3306”**。  
填写变量名为 **"WORDPRESS_DB_PASSWORD"**，变量值为**"root123"**。  
7. 点击 **确认**，完成wordpress服务创建  

![](_figures/best-practise/wordpress-web.gif)

***
## 3.完成创建和应用访问
**操作如下：**

1. 点击 **创建应用**  

至此，一个wordpress应用就创建好了，可以通过web容器对外访问地址访问wordpress应用。

![集群外访问](_figures/best-practise/wordpress-external-addr.png)
