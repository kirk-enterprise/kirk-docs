# 微服务API(对外）

微服务 **MicroService** 包含两种类型的服务，一种是有状态型的，可以挂载磁盘，但只能有一个实例；另一种是无状态型的，不能挂载磁盘，可以有多个实例。

## 容器资源规格

| 资源规格名称           | CPU（核）	       | 内存（GB） | 描述     |
| :----------- | :------- | :--- | :------------------------------- |
| 1U1G  | 1 | 1   | 简约型       |
| 1U2G  | 1 | 2   | 通用型       |
| 2U2G  | 2 | 2   | 通用型       |
| 2U4G  | 2 | 4   | 通用型       |

## 服务描述

| 名称           | 类型       | 长度上限 | 描述                               |
| :----------- | :------- | :--- | :------------------------------- |
| serviceName  | `string` | 32   | 服务名字，应用内唯一，全小写，字母打头，可允许数字。       |
| serviceType  | `string` | 32   | 服务类型，可为有状态服务：`stateless`，或无状态服务：`stateful`。       |
| serviceStatus  | `string` | 32   | 服务状态，可为启动（或创建）中：`creating`，或正常：`ok`，或出错：`error`。       |
| resourceSpec  | `string` | 16   | 资源规格，具体的规格名称见前面定义。       |
| instanceNumber  | `int` | 4   | 容器实例数量，无状态服务可>1，有状态服务仅能为1。       |
| containerName      | `string` | 32   | 容器名，Pod内唯一。                        |
| image  | `string` | 1024   | 容器镜像地址，包含镜像tag，比如：`reg.qiniu.com/u-1380502626-default/demo-server:1.0`。       |
| workDir      | `string` | 1024   | 容器运行时的工作目录，默认为空表示使用镜像Dockerfile中的设置。         |
| command      | `array` | N/A   | 字符串数组，运行时命令。默认为空表示使用镜像Dockerfile中的设置。         |
| args      | `array` | N/A   | 字符串数组，运行时命令参数。默认为空表示使用镜像Dockerfile中的设置。         |
| volumeMounts      | `array` | N/A   | `volumeMount`数组，仅有状态服务才能挂载磁盘。         |
| volumeName      | `string` | 32   | volume名，创建Volume时指定。         |
| mountPath      | `string` | 1024   | 容器内的挂载路径。         |
| readOnly      | `bool` | 1   | 是否已只读方式挂载volume，默认为`false`。         |
| envs      | `array` | N/A   | `env`数组。         |
| envType      | `string` | 16   | 环境变量类型，可为手动填写：`manual`，或使用配置集：`configset`。         |
| key      | `string` | 32   | 配置项的名字。         |
| value      | `string` | 32   | 配置项的值，若envType为`configset`，则value格式为`<configSet>.<configItem>`。         |
| internalAddress | `string` | 1024   | 集群内访问的域名。 |
| albs | `array` | N/A   | 字符串数组，绑定的七层负载均衡的名字，当前只支持绑定一个。 |
| serviceLabel | `string` | 36   | 由服务端生成，是一个全局唯一的UUID，用于在K8S内标识服务。 |
| appName      | `string` | 32   | 服务所属的应用名。                        |
| projectName  | `string` | 32   | 服务所属的项目名。                        |
| creationTime | `string` | 128  | 创建时间，RFC3339格式。                  |
| updateTime   | `string` | 128  | 修改时间，RFC3339格式。                  |

## 创建有状态服务

### 请求

`POST` `/v1/projects/<projectName>/apps/<appName>/microservices`

```json
{
    "serviceName": "service1",
    "serviceType": "stateful",
    "resourceSpec": "1U1G",
    "instanceNumber": 1,
    "containers": [
        {
            "containerName": "c1",
            "image": "reg.qiniu.com/u-1380502626-default/mysql:5.6",
            "workDir": "/root",
            "command": ["/bin/bash"],
            "args": ["-c", "sleep 60"],
            "volumeMounts": [
                {
                    "volumeName": "vol1",
                    "readOnly": false,
                    "mountPath": "/var/lib/mysql"
                },
                ...
            ],
            "envs": [
                {
                    "envType": "manual",
                    "key": "key1",
                    "value": "value2"
                },
                {
                    "envType": "configmap",
                    "key": "key2",
                    "value": "configset1.configvar1"
                },
                ...
            ]
        },
        ...
    ],
    "ports": [
        {
            "port": 80,
            "protocol": "tcp",
            "albs": ["alb1", ...]
        },
        {
            "port": 80,
            "protocol": "udp"
        },
        ...
    ]
}
```

### 返回

创建的服务信息。

```json
{
    "projectName": "myproj",
    "appName": "myapp",
    "serviceName": "sev1",
    "serviceLabel": "sev1-5",
    "serviceType": "stateful",
    "serviceStatus": "creating",
    "resourceSpec": "1U1G",
    "instanceNumber": 1,
    "containers": [
        {
            "containerName": "c1",
            "image": "reg.qiniu.com/u-1380502626-default/mysql:5.6",
            "workDir": "/root",
            "command": ["/bin/bash"],
            "args": ["-c", "sleep 60"],
            "volumeMounts": [
                {
                    "volumeName": "vol1",
                    "readOnly": false,
                    "mountPath": "/var/lib/mysql"
                },
                ...
            ],
            "envs": [
                {
                    "envType": "manual",
                    "key": "key1",
                    "value": "value2"
                },
                {
                    "envType": "configmap",
                    "key": "key2",
                    "value": "configset1.configvar1"
                },
                ...
            ]
        },
        ...
    ],
    "internalAddress": "app1-service1.project1.svc.cluster.local",
    "ports": [
        {
            "port": 80,
            "protocol": "tcp",
            "albs": ["alb1", ...]
        },
        {
            "port": 80,
            "protocol": "udp"
        },
        ...
    ]
    "creationTime": "2017-07-23T15:59:21.814798Z",
    "updateTime": "2017-07-23T15:59:21.814798Z"
}
```

### 错误代码

| http 代码 | 错误码                | 说明                            |
| :------ | :----------------- | :---------------------------- |
| 403     | OperationForbbiden | 无法在非 kirk 类型的 app 下创建 service |
| 404     | AppNotFound        | 指定的应用不存在。                     |
| 409     | ServiceExists      | 同名服务已经存在。                     |

## 创建无状态服务

### 请求

`POST` `/v1/projects/<projectName>/apps/<appName>/microservices`

```json
{
    "serviceName": "service1",
    "serviceType": "stateless",
    "resourceSpec": "1U1G",
    "instanceNumber": 3,
    "containers": [
        {
            "containerName": "c1",
            "image": "reg.qiniu.com/u-1380502626-default/mysql:5.6",
            "workDir": "/root",
            "command": ["/bin/bash"],
            "args": ["-c", "sleep 60"],
            "envs": [
                {
                    "envType": "manual",
                    "key": "key1",
                    "value": "value2"
                },
                {
                    "envType": "configmap",
                    "key": "key2",
                    "value": "configset1.configvar1"
                },
                ...
            ]
        },
        ...
    ],
    "ports": [
        {
            "port": 80,
            "protocol": "tcp",
            "albs": ["alb1", ...]
        },
        {
            "port": 80,
            "protocol": "udp"
        },
        ...
    ]
}
```

### 返回

创建的服务信息。

```json
{
    "projectName": "myproj",
    "appName": "myapp",
    "serviceName": "sev1",
    "serviceLabel": "sev1-5",
    "serviceType": "stateful",
    "serviceStatus": "creating",
    "resourceSpec": "1U1G",
    "instanceNumber": 1,
    "containers": [
        {
            "containerName": "c1",
            "image": "reg.qiniu.com/u-1380502626-default/mysql:5.6",
            "workDir": "/root",
            "command": ["/bin/bash"],
            "args": ["-c", "sleep 60"],
            "envs": [
                {
                    "envType": "manual",
                    "key": "key1",
                    "value": "value2"
                },
                {
                    "envType": "configmap",
                    "key": "key2",
                    "value": "configset1.configvar1"
                },
                ...
            ]
        },
        ...
    ],
    "internalAddress": "app1-service1.project1.svc.cluster.local",
    "ports": [
        {
            "port": 80,
            "protocol": "tcp",
            "albs": ["alb1", ...]
        },
        {
            "port": 80,
            "protocol": "udp"
        },
        ...
    ]
    "creationTime": "2017-07-23T15:59:21.814798Z",
    "updateTime": "2017-07-23T15:59:21.814798Z"
}
```

### 错误代码

| http 代码 | 错误码                | 说明                            |
| :------ | :----------------- | :---------------------------- |
| 403     | OperationForbbiden | 无法在非 kirk 类型的 app 下创建 service |
| 404     | AppNotFound        | 指定的应用不存在。                     |
| 409     | ServiceExists      | 同名服务已经存在。                     |

## 获取服务信息

### 请求

`GET` `/v1/projects/<projectName>/apps/<appName>/microservices/<serviceName>`

### 返回

指定服务的信息。

```json
{
    "serviceName": "sev1",
    ...
}
```

### 错误代码

| http 代码 | 错误码             | 说明        |
| :------ | :-------------- | :-------- |
| 404     | AppNotFound     | 指定的应用不存在。 |
| 404     | ServiceNotFound | 指定的服务不存在。 |

## 列取所有服务

列取指定服务下的所有服务。

### 请求

`GET` `/v1/projects/<projectName>/apps/<appName>/microservices`


### 返回

```json
[
    {
        "serviceName": "sev1",
        ...
    },
    ...
]
```

### 错误代码

| http 代码 | 错误码           | 说明        |
| :------ | :------------ | :-------- |
| 404     | SpaceNotFound | 指定的空间不存在。 |
| 404     | AppNotFound   | 指定的应用不存在。 |

## 停止服务

此API调用后，该服务下所有的容器都会被停掉。

### 请求

`PUT` `/v1/projects/<projectName>/apps/<appName>/microservices/<serviceName>/stop`

### 返回

无

### 返回代码

| http 代码 | 错误码             | 说明        |
| :------ | :-------------- | :-------- |
| 404     | AppNotFound     | 指定的应用不存在。 |
| 404     | ServiceNotFound | 指定的服务不存在。 |

## 启动服务

此API调用后，该服务下之前停掉的容器，都会被重新调度并启动。

### 请求

`PUT` `/v1/projects/<projectName>/apps/<appName>/microservices/<serviceName>/start`

### 返回

无

### 返回代码

| http 代码 | 错误码             | 说明        |
| :------ | :-------------- | :-------- |
| 404     | AppNotFound     | 指定的应用不存在。 |
| 404     | ServiceNotFound | 指定的服务不存在。 |

## 伸缩服务

此API仅能针对无状态服务使用。调用后，该无状态服务下的容器实例数量，将会被伸缩为指定的副本数。

### 请求

`PUT` `/v1/projects/<projectName>/apps/<appName>/microservices/<serviceName>/instanceNumber/<count>`

### 返回

无

### 返回代码

| http 代码 | 错误码             | 说明        |
| :------ | :-------------- | :-------- |
| 404     | AppNotFound     | 指定的应用不存在。 |
| 404     | ServiceNotFound | 指定的服务不存在。 |

## 更新有状态服务

### 请求

`PUT` `/v1/projects/<projectName>/apps/<appName>/microservices/<serviceName>`

```json
{
    "resourceSpec": "1U1G",
    "containers": [
        {
            "containerName": "c1",
            "image": "reg.qiniu.com/u-1380502626-default/mysql:5.6",
            "workDir": "/root",
            "command": ["/bin/bash"],
            "args": ["-c", "sleep 60"],
            "volumeMounts": [
                {
                    "volumeName": "vol1",
                    "readOnly": false,
                    "mountPath": "/var/lib/mysql"
                },
                ...
            ],
            "envs": [
                {
                    "envType": "manual",
                    "key": "key1",
                    "value": "value2"
                },
                {
                    "envType": "configmap",
                    "key": "key2",
                    "value": "configset1.configvar1"
                },
                ...
            ]
        },
        ...
    ],
    "ports": [
        {
            "port": 80,
            "protocol": "tcp",
            "albs": ["alb1", ...]
        },
        {
            "port": 80,
            "protocol": "udp"
        },
        ...
    ]
}
```

### 返回

更新后的服务信息。

```json
{
    "serviceName": "sev1",
    ...
}
```

### 错误代码

| http 代码 | 错误码                | 说明                            |
| :------ | :----------------- | :---------------------------- |
| 403     | OperationForbbiden | 无法在非 kirk 类型的 app 下创建 service |
| 404     | AppNotFound        | 指定的应用不存在。                     |
| 409     | ServiceExists      | 同名服务已经存在。                     |

## 更新无状态服务

### 请求

`PUT` `/v1/projects/<projectName>/apps/<appName>/microservices/<serviceName>`

```json
{
    "resourceSpec": "1U1G",
    "containers": [
        {
            "containerName": "c1",
            "image": "reg.qiniu.com/u-1380502626-default/mysql:5.6",
            "workDir": "/root",
            "command": ["/bin/bash"],
            "args": ["-c", "sleep 60"],
            "envs": [
                {
                    "envType": "manual",
                    "key": "key1",
                    "value": "value2"
                },
                {
                    "envType": "configmap",
                    "key": "key2",
                    "value": "configset1.configvar1"
                },
                ...
            ]
        },
        ...
    ],
    "ports": [
        {
            "port": 80,
            "protocol": "tcp",
            "albs": ["alb1", ...]
        },
        {
            "port": 80,
            "protocol": "udp"
        },
        ...
    ]
}
```

### 返回

更新后的服务信息。

```json
{
    "serviceName": "sev1",
    ...
}
```

### 错误代码

| http 代码 | 错误码                | 说明                            |
| :------ | :----------------- | :---------------------------- |
| 403     | OperationForbbiden | 无法在非 kirk 类型的 app 下创建 service |
| 404     | AppNotFound        | 指定的应用不存在。                     |
| 409     | ServiceExists      | 同名服务已经存在。                     |

## 列取服务的所有历史版本

列取指定服务下的所有历史版本revision。

### 请求

`GET` `/v1/projects/<projectName>/apps/<appName>/microservices/<serviceName>/revisions`


### 返回

```json
[
    {
        "revision": 1,
        "resourceSpec": "1U1G",
        "containers": [
            {
                "containerName": "c1",
                "image": "reg.qiniu.com/u-1380502626-default/mysql:5.6",
                "workDir": "/root",
                "command": ["/bin/bash"],
                "args": ["-c", "sleep 60"],
                "envs": [
                    {
                        "envType": "manual",
                        "key": "key1",
                        "value": "value2"
                    },
                    {
                        "envType": "configmap",
                        "key": "key2",
                        "value": "configset1.configvar1"
                    },
                    ...
                ]
            },
            ...
        ],
    },
    ...
]
```

### 错误代码

| http 代码 | 错误码           | 说明        |
| :------ | :------------ | :-------- |
| 404     | SpaceNotFound | 指定的空间不存在。 |
| 404     | AppNotFound   | 指定的应用不存在。 |

## 回滚当前服务到某个历史版本

### 请求

`PUT` `/v1/projects/<projectName>/apps/<appName>/microservices/<serviceName>/revisions/<revision>/rollback`

### 返回

无

### 返回代码

| http 代码 | 错误码             | 说明        |
| :------ | :-------------- | :-------- |
| 404     | AppNotFound     | 指定的应用不存在。 |
| 404     | ServiceNotFound | 指定的服务不存在。 |

## 删除服务

此API调用后，该应用的所有资源，包括服务、容器都将被删除。

### 请求

`DELETE` `/v1/projects/<projectName>/apps/<appName>/microservices/<serviceName>`

### 返回

无

### 返回代码

| http 代码 | 错误码             | 说明        |
| :------ | :-------------- | :-------- |
| 404     | AppNotFound     | 指定的应用不存在。 |
| 404     | ServiceNotFound | 指定的服务不存在。 |
