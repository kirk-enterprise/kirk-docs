# 3.10 配置中心

## 3.10.1 添加/删除 配置集

**配置集** 能够统一管理相关配置项，例如配置集可以是服务名，配置项为服务相关的环境变量值。

![](_figures/user-guide/configmap-create.gif)

## 3.10.2 添加/删除 配置项</span>

**配置项** 可以在多个服务之间进行复用，非常便于统一设置/修改，也避免了手动输入带来的出错风险。

![](_figures/user-guide/configmap-items.gif)

## 3.10.3 环境变量中的应用

**配置项** 用于便捷设置服务内 **环境变量的变量值**。

**操作如下：**  
1. 添加服务时，选择加载方式为 **配置中心**  
2. 选择对应的配置集，如图 **"wordpress-db"**  
3. 选择对应的配置项，如图 **"db-password"**

![](_figures/user-guide/configmap-add-item.png)

## 3.10.4 配置文件中的应用

配置集不仅可以通过环境变量的方式注入进容器以外，还可以通过以**文件形式挂载**进容器内的指定目录，以满足一些应用通过读取文件的形式来加载配置。

例如，已有配置好名为 `blog-configs` 的配置集，包含了 `my.cnf` 和 `nginx.conf` 两项配置项。

![](_figures/user-guide/configmap-list.png)

若希望将配置集的配置项以文件的形式进行挂载，则 **操作如下：**  
1. 添加服务时，在高级配置中，添加一项 **配置文件**
2. 填写配置集待挂载路径，如图 **"/configs/"**  
3. 选择对应的配置集名，如图 **"blog-configs"**

![](_figures/user-guide/configmap-mount.png)

挂载成功后，将会将配置集下的**所有配置项**，都挂载到指定的挂载路径底下。其中，**配置项名称**会作为挂载后的**文件名称**，**配置项内容**会作为**文件内容**。
通过上图的配置创建服务之后，可以通过 Web Terminal 进入容器观察挂载情况。最后在容器内挂载了 `/configs/my.cnf` 以及 `/configs/nginx.conf` 两个文件。程序则可以通过文件的形式读取并加载配置。

![](_figures/user-guide/configmap-mount-result.png)