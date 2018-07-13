# 3.13 原生模式
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

**1. 适用范围：**当前集群。在某个集群下「导出kubeconfig文件」，用户通过kubectl可以操作该集群下所有原生空间资源。

**2. 集群kubernetes版本：**当前集群的kubernetes版本号。

## 3.13.2 如何下载并安装kubectl工具
### 3.13.2.1 下载并kubectl工具
请保证你使用的kubectl版本和集群的kubernetes版本一致，或者高于它。

#### MacOS

**1）通过命令行下载kubectl**

`curl -LO http://oyh1cogl9.bkt.clouddn.com/install/kubectl-release/v1.11.0/darwin/amd64/kubectl`

**2）将其变为可执行文件**

`chmod +x ./kubectl`

**3）将二进制文件移动到环境变量的PATH中**

`sudo mv ./kubectl /usr/local/bin/kubectl`

#### Linux

**1）通过命令行下载kubectl**

`curl -LO http://oyh1cogl9.bkt.clouddn.com/install/kubectl-release/v1.11.0/linux/amd64/kubectl`

**2）将其变为可执行文件**

`chmod +x ./kubectl`

**3）将二进制文件移动到环境变量的PATH中**

`sudo mv ./kubectl /usr/local/bin/kubectl`

#### Windows

**1）通过命令行下载kubectl**

`curl -LO http://oyh1cogl9.bkt.clouddn.com/install/kubectl-release/v1.11.0/windows/amd64/kubectl.exe`

**2）将二进制文件移动到环境变量的PATH中**

### 3.13.2.2 验证kubectl安装成功
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
**1）通过命令行移动kubeconfig文件到`~/.kube/`下**

`mv ./<kubeconfig文件所在路径>/config /User/<.kube文件夹所在路径>/.kube`

#### Linux

**1）通过命令行移动kubeconfig文件到`~/.kube/`下**

`mv ./<kubeconfig文件所在路径>/config /User/<.kube文件夹所在路径>/.kube`

#### Windows
**1）更改kubectl寻找配置文件的位置(配置KUBECONFIG环境变量)**

`$env:KUBECONFIG="<kubeconfig文件所在位置>"`

### 3.13.3.3 验证kubectl安装成功
输入以下命令，如果有URL被返回，则表示kubectl配置被成功。

`kubectl cluster-info`
***

## 3.13.4 其他说明
**kubectl命令行说明：**https://kubernetes.io/docs/reference/kubectl/kubectl/