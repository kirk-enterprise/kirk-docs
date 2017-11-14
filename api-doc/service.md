# 微服务 API（对外）

微服务 **MicroService** 包含两种类型的服务，一种是有状态型的，可以挂载磁盘，但只能有一个实例；另一种是无状态型的，不能挂载磁盘，可以有多个实例。

## 容器资源规格（待定）

| 资源规格名称           | CPU（核）	       | 内存（MB） | 描述     |
| :----------- | :------- | :--- | :------------------------------- |
| 1U1G  | 1 | 1024   | 简约型       |
| 1U2G  | 1 | 2048   | 通用型       |
| 2U2G  | 2 | 2048   | 通用型       |
| 2U4G  | 2 | 4906   | 通用型       |

## 应用描述

| 名称           | 类型       | 长度上限 | 描述                               |
| :----------- | :------- | :--- | :------------------------------- |
| name  | `string` | 30   | 应用名字，项目内唯一，全小写，字母打头，只允许数字和字母。       |
| microservices  | `array` | N/A   | 该应用拥有的微服务列表。       |
| creationTime | `string` | 128  | 创建时间，RFC3339 格式。                  |

## 服务描述

| 名称           | 类型       | 长度上限 | 描述                               |
| :----------- | :------- | :--- | :------------------------------- |
| name  | `string` | 30   | 服务名字，应用内唯一，全小写，字母打头，可允许数字和符号 `-`。       |
| appName  | `string` | 30   | 服务所属应用名称，在获取服务信息时显示，新增服务等操作时不必填写 `-`。       |
| projectName  | `string` | 30   | 服务所属项目名称，在获取服务信息时显示，新增服务等操作时不必填写 `-`。       |
| type  | `string` | 32   | 服务类型，可为有状态服务：`stateful`，或无状态服务：`stateless`。       |
| serviceStatus  | `string` | 32   | 服务状态，可为启动（或创建）中：`creating`，或正常：`ok`，或出错：`error`。       |
| resourceSpec  | `string` | 16   | 资源规格，具体的规格名称见前面定义。       |
| instanceNumber  | `int` | 4   | 容器实例数量，无状态服务可 > 1，有状态服务仅能为 1。       |
| ports  | `array` | N/A   | `port` 数组，服务暴露的端口及协议列表       |
| port.port  | `int` | 32   | 服务暴露的端口      |
| port.protocol  | `int` | 32   | 服务端口通信协议，可为 TCP 或 UDP      |
| containers  | `array` | N/A   | 服务包含的容器配置列表       |

## 容器描述

| 名称           | 类型       | 长度上限 | 描述                               |
| :----------- | :------- | :--- | :------------------------------- |
| name (选填)      | `string` | 32   | 容器名，Pod 内唯一。                        |
| image  | `string` | 1024   | 容器镜像地址，包含镜像 tag，比如：`reg.qiniu.com/u-1380502626-default/demo-server:1.0`。       |
| workingDir      | `string` | 1024   | 容器运行时的工作目录，默认为空表示使用镜像 Dockerfile 中的设置。         |
| command      | `array` | N/A   | 字符串数组，运行时命令。默认为空表示使用镜像 Dockerfile 中的设置。         |
| args      | `array` | N/A   | 字符串数组，运行时命令参数。默认为空表示使用镜像 Dockerfile 中的设置。         |
| volumeMounts      | `array` | N/A   | `volumeMount` 数组，仅有状态服务才能挂载磁盘。         |
| volumeMount.volumeName      | `string` | 64   | 待挂载的云盘名称         |
| volumeMount.readOnly      | `boolean` | N/A   | 挂载存储到容器的读写方式，默认为只读         |
| volumeMount.mountPath      | `string` | 1024   | 挂载盘到容器的挂载路径        |
| configs      | `array` | N/A   | `config` 数组，容器挂载相关配置文件信息         |
| configs.configMapName      | `string` | 64   | 待挂载的配置 ConfigMap 名称         |
| configs.mountPath      | `string` | 1024   | 容器挂载配置 ConfigMap 的挂载路径        |
| envs      | `array` | N/A   | `env` 数组。容器的环境变量配置        |
| env.type      | `string` | 1024   | 环境变量给入方式，默认不给。目前支持给入 type 为 `configMap` 方式     |
| env.name  | `string` | 1024   | 环境变量名称     |
| env.value  | `string` | 1024   | 环境变量值，若 `type=configMap` 则填入 configMapName.keyName 的方式，给入 ConfigMap 名和 Key 名，中间以 `.` 符号分割     |

## 获取集群可用容器资源规格

### 请求
`GET` `/regions/<regionName>/v1/resourcespecs`
### 返回
```json
[
    {
        "name": "1U1G",
        "cpu": 1,
        "meomory": 1024,
        "desc": "简约型"
    } ... 
]
```

## 创建应用

### 请求
`POST` `/regions/<regionName>/v1/projects/<projectName>/apps`

```json
{
    "name": "appname",
    "microservices": [{
        // 参照创建服务参数
        ...
    }, ...]
}
```
### 返回
```json
{
    "name": "appname",
    "microservices": [ ... ]
}
```

## 获取应用列表

### 请求
`GET` `/regions/<regionName>/v1/projects/<projectName>/apps`

### 返回
```json
{
    "name": "appname",
    "microservices": [ ... ]
}
```

## 获取应用

### 请求
`GET` `/regions/<regionName>/v1/projects/<projectName>/apps/<appName>`

### 返回
```json
{
    "name": "appname",
    "microservices": [ ... ]
}
```

## 删除应用

### 请求
`DELETE` `/regions/<regionName>/v1/projects/<projectName>/apps/<appName>`

### 返回
无

## 创建有状态服务

### 请求

`POST` `/regions/<regionName>/v1/projects/<projectName>/apps/<appName>/microservices`

```json
{
    "name": "service0",
    "type": "stateful",
    "resourceSpec": "1U1G",
    "instanceNumber": 1,
    "ports": [{
        "port": 80,
        "protocol": "TCP"
    }, {
        "port": 8080,
        "protocol": "UDP"
    }],
    "containers": [{
        "name": "container-0",
        "image": "reg.qiniu.com/library/alpine:latest",
        "workingDir": "/workingdir",
        "command": ["/bin/sh"],
        "args": ["-c", "echo test"],
        "volumeMounts": [{
            "volumeName": "ceph-name",
            "readOnly": false,
            "mountPath": "/mnt/test"
        }],
        "configs": [{
            "configMapName": "cm",
            "mountPath": "/mnt/conf"
        }],
        "envs": [{
            "type": "configMap",
            "name": "ENV1",
            "value": "cm.key1"
        }, {
            "name": "ENV2",
            "value": "test"
        }]
    }, ... ]
}
```

### 返回

创建的服务信息。

```json
{
    "name": "service0",
    "appName": "app0",
    "projectName": "project",
    "type": "stateful",
    "resourceSpec": "1U1G",
    "instanceNumber": 1,
    "ports": [{
        "port": 80,
        "protocol": "TCP"
    }, {
        "port": 8080,
        "protocol": "UDP"
    }],
    "containers": [{
        "name": "container-0",
        "image": "reg.qiniu.com/library/alpine:latest",
        "workingDir": "/workingdir",
        "command": ["/bin/sh"],
        "args": ["-c", "echo test"],
        "volumeMounts": [{
            "volumeName": "ceph-name",
            "readOnly": false,
            "mountPath": "/mnt/test"
        }],
        "configs": [{
            "configMapName": "cm",
            "mountPath": "/mnt/conf"
        }],
        "envs": [{
            "type": "configMap",
            "name": "ENV1",
            "value": "cm.key1"
        }, {
            "name": "ENV2",
            "value": "test"
        }]
    }, ... ]
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

`POST` `/regions/<regionName>/v1/projects/<projectName>/apps/<appName>/microservices`

```json
{
    "name": "service0",
    "type": "stateless",
    "resourceSpec": "1U1G",
    "instanceNumber": 1,
    "ports": [{
        "port": 80,
        "protocol": "TCP"
    }, {
        "port": 8080,
        "protocol": "UDP"
    }],
    "containers": [{
        "name": "container-0",
        "image": "reg.qiniu.com/library/alpine:latest",
        "workingDir": "/workingdir",
        "command": ["/bin/sh"],
        "args": ["-c", "echo test"],
        "volumeMounts": [], // 无法挂载存储盘
        "configs": [{
            "configMapName": "cm",
            "mountPath": "/mnt/conf"
        }],
        "envs": [{
            "type": "configMap",
            "name": "ENV1",
            "value": "cm.key1"
        }, {
            "name": "ENV2",
            "value": "test"
        }]
    }, ... ]
}
```

### 返回

创建的服务信息。

```json
{
    "name": "service0",
    "appName": "app0",
    "projectName": "project",
    "type": "stateless",
    "resourceSpec": "1U1G",
    "instanceNumber": 1,
    "ports": [{
        "port": 80,
        "protocol": "TCP"
    }, {
        "port": 8080,
        "protocol": "UDP"
    }],
    "containers": [{
        "name": "container-0",
        "image": "reg.qiniu.com/library/alpine:latest",
        "workingDir": "/workingdir",
        "command": ["/bin/sh"],
        "args": ["-c", "echo test"],
        "volumeMounts": [], // 无法挂载存储盘
        "configs": [{
            "configMapName": "cm",
            "mountPath": "/mnt/conf"
        }],
        "envs": [{
            "type": "configMap",
            "name": "ENV1",
            "value": "cm.key1"
        }, {
            "name": "ENV2",
            "value": "test"
        }]
    }, ... ]
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

`GET` `/regions/<regionName>/v1/projects/<projectName>/apps/<appName>/microservices/<serviceName>`

### 返回

指定服务的信息。

```json
{
    "name": "service0",
    "appName": "app0",
    "projectName": "project",
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

`GET` `/regions/<regionName>/v1/projects/<projectName>/apps/<appName>/microservices`


### 返回

```json
[
    {
        "name": "service0",
        ...
    },
    {
        "name": "service1",
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

此 API 调用后，该服务下所有的容器都会被停掉。

### 请求

`PUT` `/regions/<regionName>/v1/projects/<projectName>/apps/<appName>/microservices/<serviceName>/stop`

### 返回

无

### 返回代码

| http 代码 | 错误码             | 说明        |
| :------ | :-------------- | :-------- |
| 404     | AppNotFound     | 指定的应用不存在。 |
| 404     | ServiceNotFound | 指定的服务不存在。 |

## 启动服务

此 API 调用后，该服务下之前停掉的容器，都会被重新调度并启动。

### 请求

`PUT` `/regions/<regionName>/v1/projects/<projectName>/apps/<appName>/microservices/<serviceName>/start`

### 返回

无

### 返回代码

| http 代码 | 错误码             | 说明        |
| :------ | :-------------- | :-------- |
| 404     | AppNotFound     | 指定的应用不存在。 |
| 404     | ServiceNotFound | 指定的服务不存在。 |

## 伸缩服务

此 API 仅能针对无状态服务使用。调用后，该无状态服务下的容器实例数量，将会被伸缩为指定的副本数。

### 请求

`PUT` `/regions/<regionName>/v1/projects/<projectName>/apps/<appName>/microservices/<serviceName>/instanceNumber/<count>`

### 返回

无

### 返回代码

| http 代码 | 错误码             | 说明        |
| :------ | :-------------- | :-------- |
| 404     | AppNotFound     | 指定的应用不存在。 |
| 404     | ServiceNotFound | 指定的服务不存在。 |

## 升级服务

### 请求

`PUT` `/regions/<regionName>/v1/projects/<projectName>/apps/<appName>/microservices/<serviceName>/upgrade`

```json
{
    // 更新资源规格
    "resourceSpec": "2U4G",
    // 更新容器配置
    "containers": [{
        "name": "container-0",
        "image": "reg.qiniu.com/library/alpine:latest",
        "workingDir": "/workingdir",
        "command": ["/bin/sh"],
        "args": ["-c", "echo test"],
        "volumeMounts": [], 
        "configs": [],
        "envs": [{
            "name": "ENV",
            "value": "test"
        }]
    }, ... ]
}
```

### 返回

更新后的服务信息。

```json
{
    "name": "service0",
    ...
}
```

### 错误代码

| http 代码 | 错误码                | 说明                            |
| :------ | :----------------- | :---------------------------- |
| 403     | OperationForbbiden | 无法在非 kirk 类型的 app 下创建 service |
| 404     | AppNotFound        | 指定的应用不存在。                     |
| 409     | ServiceExists      | 同名服务已经存在。                     |

## 更新服务网络配置

### 请求

`PUT` `/regions/<regionName>/v1/projects/<projectName>/apps/<appName>/microservices/<serviceName>/ports`

```json
{
  "ports": [
    {
      "port": 8080,
      "protocol": "UDP"
    },
    {
      "port": 80,
      "protocol": "TCP"
    }
  ]
}
```

### 返回

更新后的服务信息。

```json
{
    "name": "service0",
    
    ...

    "ports": [
        {
          "port": 8080,
          "protocol": "UDP"
        },
        {
          "port": 80,
          "protocol": "TCP"
        }
    ]
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

列取指定服务下的所有历史版本 revision。

### 请求

`GET` `/regions/<regionName>/v1/projects/<projectName>/apps/<appName>/microservices/<serviceName>/revisions`


### 返回

```json
[
    {
        revision: 1,
        "resourceSpec": "2U4G",
        // 更新容器配置
        "containers": [{
            "name": "container-0",
            "image": "reg.qiniu.com/library/alpine:latest",
            "workingDir": "/workingdir",
            "command": ["/bin/sh"],
            "args": ["-c", "echo test"],
            "volumeMounts": [], 
            "configs": [],
            "envs": [{
                "name": "ENV",
                "value": "test"
            }]
        }, ... ]
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

`PUT` `/regions/<regionName>/v1/projects/<projectName>/apps/<appName>/microservices/<serviceName>/revisions/<revision>/rollback`

### 返回

无

### 返回代码

| http 代码 | 错误码             | 说明        |
| :------ | :-------------- | :-------- |
| 404     | AppNotFound     | 指定的应用不存在。 |
| 404     | ServiceNotFound | 指定的服务不存在。 |

## 删除服务

此 API 调用后，该应用的所有资源，包括服务、容器都将被删除。

### 请求

`DELETE` `/regions/<regionName>/v1/projects/<projectName>/apps/<appName>/microservices/<serviceName>`

### 返回

无

### 返回代码

| http 代码 | 错误码             | 说明        |
| :------ | :-------------- | :-------- |
| 404     | AppNotFound     | 指定的应用不存在。 |
| 404     | ServiceNotFound | 指定的服务不存在。 |
