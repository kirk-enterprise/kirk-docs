# 七层负载均衡（ALB） API

Application Load Balancer，简称 **ALB** ，是七层的HTTP负载均衡服务。


## Domain描述（自定义域名）
| 名称                   | 类型       | 长度上限 | 描述                                       |
| :------------------- | :------- | :--- | :--------------------------------------- |
| name          |`string`| 256    | 域名，全局唯一               |
| region          |`string`| 256   | 所属的可用区               |
| cnameStatus              |`string`| 32   | cname状态 "success" 或 "pending"|
| tlsenable              |`bool`| 1   | 是否打开HTTPS支持|
| certid              |`string`| 64   | cert id |


## HttpPath描述
| 名称                   | 类型       | 长度上限 | 描述                                       |
| :------------------- | :------- | :--- | :--------------------------------------- |
| path              | `string` | 256   |rule 路径        |
| serviceName      | `string` | 32   | 服务名      |
| servicePort      | `uint`   | 4   | 端口号     |


## BackendRule描述
| 名称                   | 类型       | 长度上限 | 描述                                       |
| :------------------- | :------- | :--- | :--------------------------------------- |
| id              | `int` | 32   | backend rule Id，空间内唯一。               |
| albName         | `string` | 64   | 所属的alb名，字母或者数字       |
| projectName     | `string` | 32   | 所属的空间名       |
| httpPath           | `object`| - |  HttpPath对象|
| created         | `string` | 128  | 创建时间，RFC3339格式。                          |
| updated           | `string` | 128  | 修改时间，RFC3339格式。                          |


## ALB描述

| 名称                   | 类型       | 长度上限 | 描述                                       |
| :------------------- | :------- | :--- | :--------------------------------------- |
| name          | `string` | 64   | ALB的名字，空间内唯一，字母数字。               |
| description          |`string`| 256   | alb描述              |
| region          |`string`| 256   | 所属的可用区               |
| projectName     | `string` | 32   | 所属的空间名       |
| chargeMode       | `string` | 32   | 计费方式，支持netflow（流量）/bandwidth（带宽），默认按流量计费         |
| bandwidthLimit   | `int` | 4   | 带宽限制，单位 Mbps，取值范围 [1,1024]，默认为最大值 1024 Mbps         |
| testDomain              | `string` | 1024   | 系统生成的testDomainId，Region内唯一，字母数字。testDomain为为：`<testDomainId>.<ke-region>-test.cloudappl.com`|
| userDomain            | `string`| 256 | 用户绑定的域名，可一次绑定多个，逗号分割|
| rules         | `array` |   | BackendRule数组                         |
| created         | `string` | 128  | 创建时间，RFC3339格式。                        |
| updated           | `string` | 128  | 修改时间，RFC3339格式。                          |

## 创建域名

在指定空间下创建一个域名。

### 请求

`POST` `/v1/projects/<projectname>/domains`

```json
{
    "domainName": "x.a.com",
    "region" : "dev"
}
```

### 参数

| 名称                   | 类型       | 长度上限 | 必选|描述                                       |
| :------------------- | :------- | :--- | :---| :--------------------------------------- |
| name          |`string`| 256    | 是|域名，全局唯一               |
| region          |`string`| 256   | 是|所属的可用区               |
| tlsenable              |`bool`| 1   |否| 是否打开HTTPS支持|
| certid              |`string`| 1   |否| cert id,当 tlsenable为true时必选 |


### 返回

创建域名的信息

```json
{
    "name": "wewfewf.com",
    "region": "dev",
    "projectName": "testspace",
    "cnameStatus": "pending",
    "tlsenable": false,
    "certid": ""
}
```

## 获取域名

获取指定空间下的域名

### 请求

`GET` `/v1/projects/<projectname>/domains`


### 参数

| 名称                   | 类型       | 长度上限 |必选| 描述                                       |
| :------------------- | :------- | :--- | :---| :--------------------------------------- |
| name          |`string` query参数| 256    | 否|域名               |
| region          |`string` query参数| 256   | 否|所属的可用区               |


### 返回

Domain列表

```json
[
  {
    "name": "aaa.com",
    "region": "dev",
    "projectName": "testspace",
    "cnameStatus": "pending",
    "tlsenable": true,
    "certid": "456"
  },
  {
    "name": "wewfewf.com",
    "region": "dev",
    "projectName": "testspace",
    "cnameStatus": "pending",
    "tlsenable": false,
    "certid": ""
  }
]
```

## 修改域名

修改域名参数

### 请求

`PATCH` `/v1/projects/<projectname>/domains`

```json
{
  "name": "aaa.com",
  "region": "dev",
  "certid": "456",
  "tlsenable": true
}
```

### 参数
| 名称                   | 类型       | 长度上限 | 必选|描述                                       |
| :------------------- | :------- | :--- | :---| :--------------------------------------- |
| name          |`string`| 256    | 是|域名，全局唯一               |
| region          |`string`| 256   | 否|所属的可用区               |
| tlsenable              |`bool`| 1   |是| 是否打开HTTPS支持|
| certid              |`string`| 64   |是| cert id,当 tlsenable为true时必选 |

### 返回

Domain信息

```json

{
  "name": "aaa.com",
  "region": "dev",
  "projectName": "testspace",
  "cnameStatus": "pending",
  "tlsenable": true,
  "certid": "456"
}

```

## 删除域名

### 请求

`DELETE` `/v1/projects/<projectName>/domains`


### 参数
| 名称                   | 类型       | 长度上限 |必选| 描述                                       |
| :------------------- | :------- | :--- | :---| :--------------------------------------- |
| name          |`string` query参数| 256    | 是|域名，全局唯一               |
| region          |`string` query参数| 256   | 否|所属的可用区               |


### 返回

无

## 创建ALB

在指定空间下创建一个七层负载均衡。

### 请求

`POST` `/v1/projects/<projectname>/albs`

```json
{
  "name": "testalb",
  "region": "dev1",
  "projectName": "123",
  "description": "345",
  "chargeMode": "netflow",
  "userDomain" : "test.com",
  "bandwidthLimit": 3,
  "rules": [
    {
      "httpPath": {
          "path": "/",
          "serviceName": "www",
          "servicePort": 34444
        },
    }
  ]
}
```

### 参数

| 名称                   | 类型       | 长度上限 |必选| 描述                                       |
| :------------------- | :------- | :--- | :---| :--------------------------------------- |
| name          | `string` | 64   |是| ALB的名字，空间内唯一，字母数字。               |
| description          |`string`| 256   |否| alb描述              |
| region          |`string`| 256   |是| 所属的可用区               |
| userDomains          |`string`| 256   |否| 用户绑定域名              |
| chargeMode       | `string` | 32   |是| 计费方式，支持netflow（流量）/bandwidth（带宽），默认按流量计费         |
| bandwidthLimit   | `int` | 4   |是| 带宽限制，单位 Mbps，取值范围 [1,1024]，默认为最大值 1024 Mbps         |
| rules         | `array` |  - |否| BackendRule数组                         |

### 返回

创建的alb信息

```json
{
  "name": "testalb",
  "region": "dev",
  "projectName": "testnamespace",
  "description": "345",
  "testDomain": "bgcq9kg20cf2.dev.cloudappl.com",
  "userDomains": "test.com",
  "chargeMode": "netflow",
  "bandwidthLimit": 3,
  "albOption": null,
  "created": "0001-01-01T00:00:00Z",
  "updated": "0001-01-01T00:00:00Z",
  "rules": [
    {
      "id": 0,
      "albname": "",
      "projectName": "",
      "domain": "aaa.com",
      "httpPath": 
        {
          "path": "/",
          "serviceName": "www",
          "servicePort": 34444
        },
      "created": "0001-01-01T00:00:00Z",
      "updated": "0001-01-01T00:00:00Z"
    }
  ]
}
```



## 获取ALB

获取七层负载均衡

### 请求

`GET` `/v1/projects/<projectname>/albs`

### 参数
| 名称                   | 类型       | 长度上限|必选| 描述                                       |
| :------------------- | :------- | :--- | :---| :--------------------------------------- |
| name          |`string` query参数| 256    | 域名               |
| region          |`string` query参数| 256   | 否|所属的可用区               |
| domain          |`string` query参数| 256   | 否|根据alb绑定的user_domain筛选             |
| withRules          |`bool` query参数| 1   | 否|同时返回rules              |


### 返回
alb信息列表

```json
[
  {
    "name": "testalb",
    "region": "dev",
    "projectName": "testnamespace",
    "description": "345",
    "testDomain": "bgcq9kg20cf2.dev.cloudappl.com",
    "userDomains": "test.com",
    "chargeMode": "netflow",
    "bandwidthLimit": 3,
    "albOption": null,
    "created": "0001-01-01T00:00:00Z",
    "updated": "0001-01-01T00:00:00Z",
    "rules": [
      {
        "id": 0,
        "albname": "",
        "projectName": "",
        "domain": "aaa.com",
        "httpPath": 
          {
            "path": "/",
            "serviceName": "www",
            "servicePort": 34444
          },
        "created": "0001-01-01T00:00:00Z",
        "updated": "0001-01-01T00:00:00Z"
      }
    ]
  }
]
```

> 注: GET /v1/admin/albs 为管理员api，支持跨project的查询操作

## 修改ALB

修改ALB

### 请求

`PATCH` `/v1/projects/<projectname>/albs`

```json
{
  "projectName": "testnamespace",
  "name": "testalb",
  "description": "11222",
}
```


### 参数
| 名称                   | 类型       | 长度上限 |必选| 描述                                       |
| :------------------- | :------- | :--- | :---| :--------------------------------------- |
| name          |`string`| 256    | 是|域名，全局唯一               |
| description          |`string`| 256   | 否|所属的可用区               |
| userDomains          |`string`| 256   |否| 用户绑定域名              |
| chargeMode       | `string` | 32   |否| 计费方式，支持netflow（流量）/bandwidth（带宽），默认按流量计费         |
| bandwidthLimit   | `int` | 4   |否| 带宽限制，单位 Mbps，取值范围 [1,1024]，默认为最大值 1024 Mbps         |
| rules         | `array` |   |否| BackendRule数组                         |                   |

### 返回

ALB信息

```json

{
  "name": "testalb",
  "region": "dev",
  "projectName": "testnamespace",
  "description": "11222",
  "testDomain":  "bgcq9kg20cf2.dev.cloudappl.com",
  "userDomains": "test.com",
  "chargeMode": "netflow",
  "bandwidthLimit": 3,
  "albOptions": null,
  "created": "2017-10-10T10:06:00.147847Z",
  "updated": "2017-10-11T09:44:32.874381Z",
  "rules": [
    {
      "id": 8,
      "albname": "testalb",
      "projectName": "testnamespace",
      "domain": "aaa.com",
      "httpPath": 
        {
          "path": "/",
          "serviceName": "www",
          "servicePort": 34444
        },
      "created": "2017-10-10T10:06:00.154739Z",
      "updated": "2017-10-10T10:06:00.154739Z"
    }
  ]
}

```

## 删除ALB


### 请求

`DELETE` `/v1/projects/<projectName>/albs`

### 参数
| 名称                   | 类型       | 长度上限 | 必选|描述                                       |
| :------------------- | :------- | :--- | :---| :--------------------------------------- |
| name          |`string` query参数| 256    | 是|alb name               |
| region          |`string` query参数| 256   | 是|所属的可用区               |

### 返回

无


## 创建BackendRule

创建BackendRule

### 请求

`POST` `/v1/projects/<projectName>/albrules`

```json
{
  "albName":"testalb",
  "httpPath":
  {
    "serviceName":"aaa",
    "servicePort":22
  }
}
```


### 参数
| 名称                   | 类型       | 长度上限 |必选| 描述                                       |
| :------------------- | :------- | :--- | :---| :--------------------------------------- |
| albName          |`string` | 256    | 是|alb名称              |
| httpPath          |`object` | -   | 是|HttpPath对象,其中Path可选          |

### 返回
BackendRule对象

```json
{
  "id": 4,
  "albname": "testalb",
  "projectName": "u-test-default",
  "httpPath": {
    "path": "",
    "serviceName": "aaa",
    "servicePort": 22
  },
  "created": "0001-01-01T00:00:00Z",
  "updated": "0001-01-01T00:00:00Z"
}
```


## 获取BackendRule

获取BackendRule

### 请求

`GET` `/v1/projects/<projectName>/albrules`

### 参数
| 名称                   | 类型       | 长度上限 |必选| 描述                                       |
| :------------------- | :------- | :--- | :---| :--------------------------------------- |
| name          |`string` query参数| 256    | 否|所属alb name              |
| region          |`string` query参数| 256   | 否|所属的可用区               |
| serviceName          |`string` query参数| 256   | 否|所绑定service name              |

### 返回

```json
[
  {
    "id": 6,
    "albname": "testalb",
    "projectName": "u-1380937530-default",
    "httpPath": {
      "path": "/e12e",
      "serviceName": "vvv",
      "servicePort": 999
    },
    "created": "2017-10-16T10:42:51.833674Z",
    "updated": "2017-10-16T10:45:17.125556Z"
  }
]
```

## 修改BackendRule

修改BackendRule

### 请求

`PATCH` `/v1/projects/<projectName>/albrules`

```json
{
  "id":6,
  "httpPath":
  {
    "path":"/e12e",
    "serviceName":"vvv",
    "servicePort":999
  }
}
```

### 参数
| 名称                   | 类型       | 长度上限 |必选| 描述                                       |
| :------------------- | :------- | :--- | :---| :--------------------------------------- |
| id          |`int` | 256    | 是|rule id             |
| httppath          |`object` | 256   | 否|HttpPath对象,其中Path可选                 |


### 返回

```json
[
  {
    "id": 6,
    "albname": "testalb",
    "projectName": "u-1380937530-default",
    "httpPath": {
      "path": "/e12e",
      "serviceName": "vvv",
      "servicePort": 999
    },
    "created": "2017-10-16T10:42:51.833674Z",
    "updated": "2017-10-16T10:45:17.125556Z"
  }
]
```

## 删除BackendRule

删除BackendRule

### 请求

`DELETE` `/v1/projects/<projectName>/albrules`


### 参数
| 名称                   | 类型       | 长度上限 |必选| 描述                                       |
| :------------------- | :------- | :--- | :---| :--------------------------------------- |
| id          |`int`query参数 | 32    | 是|rule id             |


### 返回

无