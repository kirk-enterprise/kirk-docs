# 3.14 原生模式
原生模式提供了一种通过kubernetes的dashboard和kubectl来接管七牛容器集群的方式。通过这种方式，如果你已经习惯于使用kubenetes的原生工具，可以通过原生工具的方式来管理你在七牛容器云上的资源。

!> 如果要使用原生模式，在创建空间时请选择空间类型为「原生模式」。

**kubectl介绍说明：**https://kubernetes.io/docs/reference/kubectl/overview/<br>
**dashboard介绍说明：**https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/
***

## 3.13.1 属性说明
### 3.13.1.1 dashboard的接入
dashboard是kubenetes原生支持的可视化界面。

**1. 适用范围：**当前空间。在某个原生空间下「打开dashboard」，用户通过dashboard只能操作该空间资源。

**2. 集群kubernetes版本：**当前集群的kubernetes版本号。

### 3.13.1.2 kubectl的接入
kubectl是kubenetes原生支持的命令行工具。

**1. 适用范围：**当前集群。在某个集群的某个原生空间下「导出kubeconfig文件」，系统会自动将该原生空间名写入config文件，这意味着操作这个原生空间时，所有的kubectl命令中无须带`-n xxxxx`的空间名信息。而操作同集群下其他原生空间时，就需要在所有的kubectl命令中携带`-n xxxxx`的空间名信息，来指定该命令所要操作的空间。

**2. 集群kubernetes版本：**当前集群的kubernetes版本号。
***

## 3.13.2 如何下载并安装kubectl工具
### 3.13.2.1 下载并kubectl工具

我们提供kubectl工具的内网下载方式，支持的版本为**v1.7.16**、**v1.9.3**、**v1.11.0**。<br>

!> 请保证使用的kubectl工具版本和集群的kubernetes版本一致。

#### MacOS

**1）通过命令行下载kubectl**

`curl -LO http://oyh1cogl9.bkt.clouddn.com/install/kubectl-release/<kubectl工具版本>/darwin/amd64/kubectl`

例如当前集群为v1.7.16，则命令行如下：<br>
`curl -LO http://oyh1cogl9.bkt.clouddn.com/install/kubectl-release/v1.7.16/darwin/amd64/kubectl`

**2）将其变为可执行文件**

`chmod +x ./kubectl`

**3）将二进制文件移动到环境变量的PATH中**

`sudo mv ./kubectl /usr/local/bin/kubectl`

#### Linux

**1）通过命令行下载kubectl**

`curl -LO http://oyh1cogl9.bkt.clouddn.com/install/kubectl-release/<kubectl工具版本>/linux/amd64/kubectl`

例如当前集群为v1.7.16，则命令行如下：<br>
`curl -LO http://oyh1cogl9.bkt.clouddn.com/install/kubectl-release/v1.7.16/linux/amd64/kubectl`

**2）将其变为可执行文件**

`chmod +x ./kubectl`

**3）将二进制文件移动到环境变量的PATH中**

`sudo mv ./kubectl /usr/local/bin/kubectl`

#### Windows

**1）通过浏览器下载kubectl**

在下面的链接中正确补充`<kubectl工具版本>`后，通过浏览器可以直接下载可执行文件。<br>
`http://oyh1cogl9.bkt.clouddn.com/install/kubectl-release/<kubectl工具版本>/windows/amd64/kubectl.exe`

例如当前集群为v1.7.16，则下载地址为：<br>
`http://oyh1cogl9.bkt.clouddn.com/install/kubectl-release/v1.7.16/windows/amd64/kubectl.exe`

**2）将二进制文件移动到环境变量的PATH中**

### 3.13.2.2 验证是否成功安装kubectl
输入以下命令，查看当前安装的kubectl版本

`kubectl version`

例子：如果是MacOS，显示如下

`Client Version: version.Info{Major:"1", Minor:"11", GitVersion:"v1.11.0", GitCommit:"91e7b4fd31fcd3d5f436da26c980becec37ceefe", GitTreeState:"clean", BuildDate:"2018-06-27T20:17:28Z", GoVersion:"go1.10.2", Compiler:"gc", Platform:"darwin/amd64"}
`
***

## 3.13.3 如何配置kubectl接入集群
首先要保证账号下存在原生模式的空间。

### 3.13.3.1 导出集群kubeconfig文件
操作如下：

**1）点击控制台上边栏的「集群」，下拉选择需要对接kubectl的集群**

**2）点击控制台上边栏的「空间」，下拉选择当前集群下的任意一个原生模式空间**

**3）点击控制台左边栏的「原生模式」，切换至原生模式界面**

**4）点击「导出kubeconfig文件」**

!> kubeconfig文件中需要保存你的AK/SK秘钥用于鉴权登入<br>

**5）点击「同意」，导出kubeconfig文件到本地**

### 3.13.3.2 kubeconfig文件在本地的配置
操作如下：

#### MacOS
**1）创建子目录`~/.kube/`**

`mkdir ~/.kube/`

**2）通过命令行移动kubeconfig文件到`~/.kube/`下**

`mv ～/<kubeconfig文件所在路径>/config ~/.kube/`

#### Linux
**1）创建子目录`~/.kube/`**

`mkdir ~/.kube/`

**2）通过命令行移动kubeconfig文件到`~/.kube/`下**

`mv ～/<kubeconfig文件所在路径>/config ~/.kube/`

#### Windows
**1）更改kubectl寻找配置文件的位置(配置KUBECONFIG环境变量)**

`$env:KUBECONFIG="<kubeconfig文件所在位置>"`

### 3.13.3.3 验证是否成功接入集群
输入以下命令，如果有URL被返回，则表示kubectl已经可以接入集群。

`kubectl cluster-info`
***

## 3.13.4 如何使用「TCP 负载均衡」
在原生模式下，可以使用下述的方式来创建简易模式下对应的负载均衡资源。

### 3.13.4.1 TCP 负载均衡

创建下述 YAML 文件：

```yaml
apiVersion: ke.qiniu.com/v1
kind: TLB
metadata:
  name: tlbname
  namespace: ns
spec:
  bandwidthLimit: 100
  chargeMode: bandwidth
  ipType: telecom
  serviceSpec:
    ports:
    - name: port-1935
      port: 1935
      protocol: TCP
      targetPort: 1935
    selector:
      app: appv1
```
其中 `spec` 内的各个参数表示：
- bandwidthLimit: 带宽限制，范围为 0-1000 Mbps
- chargeMode: 计费方式，目前只支持 `bandwidth` 流量计费。
- ipType: 可选 `telecom` 电信、`unicom` 联通、`mobile` 移动、`in-cluster` 内网
- serviceSpec.ports.port: 对应监听的端口
- serviceSpec.ports.protocol: 协议，当前仅支持 TCP
- serviceSpec.ports.targetPort: Pod 监听端口
- serviceSpec.selector: Pod 的 LabelSelector

使用 `kubectl create -f` 命令 创建后，通过下述命令可以获取 TCP 负载均衡资源的详细信息：

```
kubectl -n ns get tlb tlbname -o yaml
```

此时获得的 TLB 资源内，会有 `status` 字段：

```yaml
apiVersion: ke.qiniu.com/v1
kind: TLB
...
status:
  phase: pending
```
phase `pending` 状态表示系统正在为此 TCP 负载均衡分配一个 IP，等分配完成后，status.phase 会变成 `ready`，此时 status 内会添加一个 ip 的字段，表示分配后的 IP 地址


```yaml
apiVersion: ke.qiniu.com/v1
kind: TLB
...
status:
  ip: 115.231.110.9
  phase: ready
```

至此，一个 TCP 负载均衡已经创建完毕并可以对外提供服务。
***

## 3.13.5 快速实践 - 创建一个wordpress应用
wordpress应用包含两类服务，MySQL数据库服务和Wordpress web服务。其中我们通过PersistentVolumeClaim(PVC)存储MySQL数据，通过Secret存储MySQL的root密码。因此，整个应用的创建流程分为以下4个步骤：<br>

- 创建一个Secret用于存储MySQL密码
- 创建一个PVC用于存储MySQL数据
- 部署MySQL服务
- 部署Wordpress服务

### 3.13.5.1 创建一个Secret用于存储MySQL密码
Secret是kubernetes用于存储隐秘性数据的对象，数据格式为key-value。

**1）通过以下命令，创建一个key=“mysql-pass”，value=“root123”的secret对象**

`kubectl create secret generic mysql-pass --from-literal=password=root123`

**2）通过以下命令，验证Secret对象是否被创建成功**

`kubectl get secrets`

能够在列表中找到刚刚创建的Secret对象

```
NAME                      TYPE                                  DATA      AGE                                                                                                                                       
mysql-pass                Opaque                                1         2d                                                                         ```
### 3.13.5.2 创建一个PVC用于存储MySQL数据
PVC是Pod用于挂载并持久化存储数据的对象。

**1）在本地创建一个包含以下内容的YAML文件，命名为"ceph-volumes.yaml"**

```ceph-volumes.yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mysql-pv-claim
  labels:
    app: wordpress
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 20Gi
  storageClassName: ceph
```

**2）通过以下命令，基于"ceph-volumes.yaml"创建一个PVC**

`kubectl create -f <YAML文件所在路径>/ceph-volumes.yaml`

**3）通过以下命令，验证PVC对象是否被创建成功**

`kubectl get pvc`

能够在列表中找到刚刚创建的PVC对象

```
NAME             STATUS    VOLUME                                     CAPACITY   ACCESSMODES   STORAGECLASS   AGE                                    
mysql-pv-claim   Bound     pvc-84adae57-93dd-11e8-9503-6c92bf12a558   20Gi       RWO           ceph           10s 
```

### 3.13.5.3 部署MySQL服务
基于YAML文件部署MySQL服务的deployment对象。YAML文件中也包含了对之前secret和PVC两个对象的配置描述：<br>

- 容器挂载PVC对象mysql-pv-claim到内部路径`/var/lib/mysql`<br>
- 通过环境变量`MYSQL_ROOT_PASSWORD`设置MySQL密码，使用secret对象mysql-pass作为变量的值

**1）在本地创建一个包含以下内容的YAML文件，命名为"mysql-deployment.yaml"**

```mysql-deployment.yaml
apiVersion: v1
kind: Service
metadata:
  name: wordpress-mysql
  labels:
    app: wordpress
spec:
  ports:
    - port: 3306
  selector:
    app: wordpress
    tier: mysql
  clusterIP: None
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: wordpress-mysql
  labels:
    app: wordpress
spec:
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: wordpress
        tier: mysql
    spec:
      containers:
      - image: mysql:5.6
        name: mysql
        env:
        - name: MYSQL_ROOT_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mysql-pass
              key: password
        ports:
        - containerPort: 3306
          name: mysql
        volumeMounts:
        - name: mysql-persistent-storage
          mountPath: /var/lib/mysql
      volumes:
      - name: mysql-persistent-storage
        persistentVolumeClaim:
          claimName: mysql-pv-claim```
          
**2）通过以下命令，基于"mysql-deployment.yaml"创建mysql deployment对象**

`kubectl create -f <YAML文件所在路径>/mysql-deployment.yaml`

**3）通过以下命令，验证MySQL的pod是否已经运行成功**

`kubectl get pods`

能够在列表中找到刚刚创建的MySQL pods

```
NAME                               READY     STATUS    RESTARTS   AGE                                                                                
wordpress-mysql-2917821887-7k7jj   1/1       Running   0          2m       
```

### 3.13.5.4 部署Wordpress服务
同样基于YAML文件部署Wordpress服务的deployment对象。YAML文件中包含了Wordpress服务连接MySQL数据库所需的环境变量描述：<br>

- 通过环境变量`WORDPRSS_DB_HOST`，实现和MySQL的内网服务发现
- 通过环境变量`WORDPRESS_DB_PASSWORD`，获取访问MySQL所需的密码

**1）在本地创建一个包含以下内容的YAML文件，命名为"wordpress-deployment.yaml"**

```wordpress-deployment.yaml
apiVersion: v1
kind: Service
metadata:
  name: wordpress
  labels:
    app: wordpress
spec:
  ports:
    - port: 80
  selector:
    app: wordpress
    tier: frontend
  type: LoadBalancer
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: wordpress
  labels:
    app: wordpress
spec:
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: wordpress
        tier: frontend
    spec:
      containers:
      - image: wordpress:4.8-apache
        name: wordpress
        env:
        - name: WORDPRESS_DB_HOST
          value: wordpress-mysql
        - name: WORDPRESS_DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mysql-pass
              key: password
        ports:
        - containerPort: 80
          name: wordpress
```

**2）通过以下命令，基于"wordpress-deployment.yaml"创建wordpress deployment对象**

`kubectl create -f <YAML文件所在路径>/wordpress-deployment.yaml`

**3）通过以下命令，验证wordpress的service是否已经运行成功**

`kubectl get services wordpress`

能够在列表中找到刚刚创建的wordpress service，以及mysql service

```
NAME              CLUSTER-IP     EXTERNAL-IP      PORT(S)        AGE                                                                                 
wordpress         172.16.75.94   115.231.110.21   80:30625/TCP   1m                                                                                  
wordpress-mysql   None           <none>           3306/TCP       14m  ```

### 3.13.5.5 验证Wordpress应用是否部署成功

复制wordpress service的`EXTERNAL-IP`到浏览器

![](_figures/user-guide/origin-mode-wordpress.jpg)

访问IP，能够显示如下的wordpress页面

![](_figures/user-guide/origin-mode-wordpress-web.jpg)
***

## 3.13.6 kubeconfig文件说明
kubeconfig中描述了用户集群、用户空间、用户账户以及用户认证相关的信息。kubectl根据kubeconfig来选择集群并与集群的API服务器进行通信。
默认情况下，kubectl使用的配置文件是`/.kube`目录下的config文件，用户也可以通过设置环境变量`KUBECONFIG`或者`--kubeconfig`指定其他的配置文件。

### 3.13.6.1 「导出kubeconfig文件」说明
当用户登入c.qiniu.com控制台，并切换到某一个原生模式空间时，就会在左边栏为原生模式的TAB下看到这个控件。
这个控件帮助用户能够导出一个系统自动生成的kubeconfig文件。文件中描述了导出文件所在空间的信息、该空间所在集群的信息、用户的AK/SK信息。
```config
apiVersion: v1
clusters:#集群组，一组集群信息包含集群服务器API地址以及集群名
- cluster:
    server: https://authgate-xq.qiniu.com/v1/kube/
  name: <cluster-name>
contexts:#访问参数组，一组访问参数包含集群名、用户名、空间名
- context:
    cluster: <cluster-name>
    user: <user-name>
    namespace: <namespace>
  name: <context-name>
current-context: <context-name>
kind: Config
preferences: {}
users:#用户的认证信息
- name: <user-name>
  user:
    username: <AK>
    password: <SK>
```

通过这个config文件，用户可以获得以下能力：
- 直接操作导出文件所在空间：如果用户输入的kubectl命令行中不带`-n xxxx`空间信息，那么命令将会直接作用在该config文件所导出的空间。
- 间接操作同一个集群下的其他原生空间：如果用户需要操作同一个集群下的其他原生空间，可以在kubectl命令行中携带`-n xxxx`信息，来指定该命令所要做用的空间。

这些能力的适用范围只能是导出文件所在的集群，其他的集群并不能通过这个config文件进行操作。
当然，如果要操作多个集群的资源，这个同样是可以办到的，请看下一节。

### 3.13.6.2 如何实现在多个集群间进行切换操作
当用户有多个集群的资源，这时候用户通过「导出kubeconfig文件」获得了多个集群的config，这时候该如何处理，能够使用kubectl命令实现集群间的切换呢？这里有两种方法，一种是通过`--kubeconfig`的方式来指定kubectl所引用的config文件，另一种是通过修改`KUBECONFIG`环境变量，使多个config文件能够被kubectl合并引用。

#### 通过`--kubeconfig`的方式来指定kubectl所引用的config文件

**1）先把所有的config文件通过改名，都放到指定目录`~/.kube`下，比如取名为config-xq，config-nb**

**2）通过终端，进入`~/.kube`目录**

**3）通过以下命令，对kubectl引用的config文件进行切换。切换需要同时指定config文件，以及config文件中所描述的某个context名(通常context名是导出config文件所在空间的名字，你也可以通过打开config文件查看)。**

`kubectl config --kubeconfig=<config文件名> use-context <context名>`

如果看到以下反馈，表示已经切换成功

`Switched to context "<context名>".`

通过这种方式，你就可以通过切换不同的config文件，来实现在多个集群之间的切换。

#### 通过修改`KUBECONFIG`环境变量，使多个config文件能够被kubectl合并引用
因为kubectl是根据context名来区分不同的context组，所以需要确保每个config文件中不存在同名的context。如果有同名，需要修改config文件。

**1）修改环境变量`KUBECONFIG`**

##### MacOS

通过以下命令，添加多个config文件路径到环境变量中

`export KUBECONFIG=$KUBECONFIG:<config文件1所在位置>/<config文件1>:<config文件2所在位置>/<config文件2>`

##### Linux

通过以下命令，添加多个config文件路径到环境变量中

`export KUBECONFIG=$KUBECONFIG:<config文件1所在路径>/<config文件1>:<config文件2所在路径>/<config文件2>`

##### Windows

通过以下命令，添加多个config文件路径到环境变量中

`$env:KUBECONFIG="<config文件1所在路径>/<config文件1>;<config文件2所在路径>/<config文件2>`

**2) 通过以下命令，验证kubectl是否对多个config文件做了合并引用**

`kubectl config view`

能够查看到多个config文件内的cluster和context、users信息被整合了。

**3）通过以下命令，对不同的context进行切换。**
`kubectl confg <context名>`

如果看到以下反馈，表示已经切换成功

`Switched to context "<context名>".`

切到某个context，也意味着引用了这个context所在的config文件，那么用户就可以对这个config文件所在的集群进行操作了。
***

## 3.13.7 其他说明
### 3.13.7.1 kubectl命令行
参考kubernetes官网，https://kubernetes.io/docs/reference/kubectl/kubectl/
