# 3.14 原生模式
原生模式提供了一种通过kubernetes的dashboard和kubectl来接管七牛容器集群的方式。通过这种方式，如果你已经习惯于使用kubenetes的原生工具，可以通过原生工具的方式来管理你在七牛容器云上的资源。

!> 如果要使用原生模式，在创建空间时请选择空间类型为「原生模式」。

原生模式概览如下：
![](_figures/user-guide/native-mode-overview.jpg)

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

**1. 适用范围：**当前集群。在某个集群下「导出kubeconfig文件」，用户通过kubectl可以操作该集群下所有原生空间资源。

**2. 集群kubernetes版本：**当前集群的kubernetes版本号。

## 3.13.2 如何下载并安装kubectl工具
### 3.13.2.1 下载并kubectl工具

我们提供kubectl工具的内网下载方式，支持的版本为**v1.7.16**、**v1.11.0**。<br>

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

`curl -LO http://oyh1cogl9.bkt.clouddn.com/install/kubectl-release/<kubectl工具版本>0/linux/amd64/kubectl`

例如当前集群为v1.7.16，则命令行如下：<br>
`curl -LO http://oyh1cogl9.bkt.clouddn.com/install/kubectl-release/v1.7.16/linux/amd64/kubectl`

**2）将其变为可执行文件**

`chmod +x ./kubectl`

**3）将二进制文件移动到环境变量的PATH中**

`sudo mv ./kubectl /usr/local/bin/kubectl`

#### Windows

**1）通过命令行下载kubectl**

`curl -LO http://oyh1cogl9.bkt.clouddn.com/install/kubectl-release/<kubectl工具版本>/windows/amd64/kubectl.exe`

例如当前集群为v1.7.16，则命令行如下：<br>
`curl -LO http://oyh1cogl9.bkt.clouddn.com/install/kubectl-release/v1.7.16/windows/amd64/kubectl.exe`

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

!> kubeconfig文件中需要保存你的AK/SK秘钥用于鉴权登入

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

## 3.13.4 其他说明
**kubectl命令行说明：**https://kubernetes.io/docs/reference/kubectl/kubectl/



## 3.13.5 原生模式下使用「HTTP 负载均衡」和 「TCP 负载均衡」
在原生模式下，可以使用下述的方式来创建简易模式下对应的负载均衡资源。

### 3.13.5.1 TCP 负载均衡

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
