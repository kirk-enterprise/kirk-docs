# 基于镜像创建一个Wordpress应用

[1. 添加应用](#jump1)    
[2. 添加服务](#jump2) 
   
- [添加mysql服务](#jump21)    
- [添加wordpress web服务](#jump22)

[2. 完成创建和访问应用](#jump3)

Wordpress应用包含两类服务：mysql数据库服务和wordpress web服务。wordpress web服务需要配置公网，暴露到集群外部。
## <span id="jump1">1. 添加应用</span>

**操作如下：**    

1）点击控制台左边栏的「应用」，切换至应用页面    

2）点击「添加应用」

![](_figures/quick-start/create-app-1.png)

3）选择应用的创建方式，选择「基于镜像创建」

![](_figures/quick-start/create-app-3.png)

4）填写「应用名」为 **"wordpress"**

!> **应用名：** 2-30位的小写字母、数字，开头为字母

5）点击「添加服务」

![](_figures/quick-start/create-app-4.png)  

***
## <span id="jump2">2. 添加服务</span>

![](_figures/quick-start/create-app-5.png)

### <span id="jump21">2.1 添加mysql服务</span>

**操作如下：**

1）填写「服务名」为 **"db"**

2）选择「服务类型」为 **有状态**

3）点击「选择镜像」，选择 **mysql:5.6**，点击 **部署**

4）选择「容器规格」为 **"1U1G"**

5）「容器数量」默认为 **"1"** 不能修改，有状态服务只能为单副本

6）点击「添加存储配置」，为mysql服务挂载存储卷。    
下拉选择一个存储卷(新建存储卷参考下面)，选择「读写方式」为 **"读写"**，填写「挂载路径」为 **"//var/lib/mysql"** 

?> **如何新建一个存储卷到服务？**<br>
1.点击「添加icon」<br>
2.填写「名称」为 **"vol"**，「大小」为 **"10G"** <br>
3.点击「确定」 <br>

7）点击「添加端口配置」，填写「容器端口」为 **"3306"**，选择「协议」为 **TCP**,卡上

8）点击「添加环境变量」，设置mysql服务的root密码为root123。  
填写「变量名」为 **"MYSQL_ROOT_PASSWORD"**，选择「加载方式」为 **"手动填写"**，填写「变量值」为 **"root123"**

9）点击「确认」，完成mysql服务创建   

### <span id="jump22">2.2 添加wordpress web服务</span>

点击「添加服务」，添加第二个服务 wordpress web服务。

![](_figures/best-practise/wordpress-create-mysql.png)

**操作如下：**

1）填写「服务名」为 **"web"**

2）选择「服务类型」为 **无状态**

3）点击「选择镜像」，选择 **4.8-apache**，点击 **部署**

4）选择「容器规格」为 **"1U1G"**

5）设置「容器数量」为 **2**，即配置两个容器副本

6）点击「添加端口配置」，填写「容器端口」为 **"80"**，选择「协议」为 **TCP**，开启「负载均衡」,下拉选择一个负载均衡(新建负载均衡参考下面)，填写「路径」为 **/**。

?> **如何新建一个负载均衡？**<br>
1.点击「添加icon」<br>
2.填写「名称」为 **"wordpress"** <br>
3.点击 「创建」 <br>

7）点击「添加环境变量」。    
填写「变量名」为 **"WORDPRESS_DB_HOST"**，选择「加载方式」为 **"手动填写"**，填写「变量值」为 **"wordpress-db:3306"**；    
填写「变量名」为 **"WORDPRESS_DB_PASSWORD"**，选择「加载方式」为 **"手动填写"**，填写「变量值」为 **"root123"**；

8）填写「运行目录」为 **"/var/www/html"**

9）点击「确认」，完成wordpress web服务创建  

***
## <span id="jump3">3.完成创建和访问应用</span>
**操作如下：**

1. 点击「创建应用」    

至此，一个wordpress应用就创建好了，可以通过wordpress web服务对外暴露的访问地址访问wordpress应用。

![](_figures/best-practise/wordpress-create-view.png)
