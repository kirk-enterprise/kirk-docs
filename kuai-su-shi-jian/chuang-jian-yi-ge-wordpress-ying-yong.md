# 创建一个Wordpress应用

Wordpress应用包含两种服务：mysql数据库服务和wordpress web服务。整个应用通过负载均衡的方式暴露到集群外部。

#### 操作如下

**1. 添加应用**

```
操作步骤如下：
1）点击左侧导航栏的"应用"，进入应用界面
2）点击"添加应用"
3）填写应用名"wordpress"
4）添加服务
```

![](/media/wordpress-tianjiayingyong1.png)

![](/media/wordpress-tianjiayingyong2.png)

**2. 添加服务和容器实例**

```
Wordpress应用需要添加两种服务:mysql和wordpress
操作步骤如下：
添加mysql服务
1）填写服务名"db"
2）选择服务类型"有状态"，使服务挂载存储卷
3）点击"选择镜像"，选择镜像"mysql"，点击"部署"
4）点击"添加端口配置"，端口号"3306"，选择协议"TCP"
5）点击"添加存储配置"，存储类型"云盘"，存储名称"vol"，挂载路径"/data"
6）添加环境变量。
变量名"MYSQL_ROOT_PASSWORD"，变量值"root123"，将数据库的root密码设置为root123
7）点击"确认"

说明：如果该镜像在metadata中给出了相应的网络配置，镜像选择之后，将自动读取。
```

![](https://odum9helk.qnssl.com/lvMXQfxroZz8Jw8b7pTQLbsSjZNM =400*400)

```
添加wordpress服务
1）填写服务名"web"
2）选择服务类型“无状态”，因为服务无需挂载存储卷
3）点击“选择镜像”，选择镜像“wordpress”，点击“部署”
4）增加容器数量为"2"，配置两个容器实例
5）点击"添加端口配置"，端口号"80"，选择协议"TCP"，开启"集群外访问"，系统将自动分配访问域名
6）添加环境变量。
变量名“WORDPRESS_DB_HOST”，变量值“wordpress-db:3306”，使服务内联mysql数据库；
变量名"WORDPRESS_DB_PASSWORD"，变量值"root123"
7）点击“确认”
```

![](https://odum9helk.qnssl.com/lj1baXxgg2qMec8i7DAjo_H-Bad9)
**3.完成创建和应用访问**

```
完成服务的创建后，启动应用。
1）点击"创建应用"
2）通过web容器对外访问地址可以直接访问wordpress应用。
```
![](/media/wordpress-duiwaifangwendizhi.png)

