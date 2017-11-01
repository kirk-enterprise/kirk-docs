# 云硬盘API

云硬盘 **Volume** 提供块设备服务，创建后可以绑定在有状态服务上使用。

## StorageType描述
| 名称           | 类型       | 长度上限 | 描述                               |
| :----------- | :------- | :--- | :------------------------------- |
| storageType  | `string` | 32   | 当前Region、Project下支持的存储类型，全小写字母。       |
| storageTypeDesc | `string` | 32   | 存储类型的描述，比如：普通云盘，SSD高速云盘 |
| iops      | `string` | 32   | 云盘对应的iops描述，有可能是一个数字（1400），也有可能是一个范围（200 ~ 500），所以用字符串来表示                        |


## Volume描述

| 名称           | 类型       | 长度上限 | 描述                               |
| :----------- | :------- | :--- | :------------------------------- |
| volumeName  | `string` | 32   | volume名，Project内唯一，全小写，字母打头，可允许数字。       |
| volumeSize | `int` | 4   | volume大小，单位为GB。 |
| volumeStatus  | `string` | 32   | volume状态，可为：`creating`，`ok`，或 `error`。       |
| fsType      | `string` | 16   | volume的文件系统类型，当前仅支持 "ext4"。                        |
| attachedId              | `string` | 32   | Project内唯一，标识Volume和某个service的绑定关系。               |
| appName              | `string` | 32   | 绑定的应用名。               |
| serviceName  | `string` | 32   | 绑定的有状态服务名。       |
| readOnly      | `bool` | 1   | 是否已只读方式挂载volume，默认为`false`。         |
| creationTime | `string` | 128  | 创建时间，RFC3339格式。                  |
| updateTime   | `string` | 128  | 修改时间，RFC3339格式。                  |

## 列取当前支持的StorageTypes

### 请求

`GET` `/v1/projects/<projectName>/storagetypes`

### 返回

所有的存储类型列表。

```json
[
    {
        "storageType": "ssd",
        "storageTypeDesc": "SSD高速云盘",
        "iops": "1400"
    },
    {
        "storageType": "sata",
        "storageTypeDesc": "普通云盘",
        "iops": "200 ~ 500"
    },
    ...
]
```

## 创建Volume

### 请求

`POST` `/v1/projects/<projectName>/volumes`

```json
{
    "storageType": "ssd",
    "volumeName": "vol1",
    "volumeSize": 10, # unitType: GB
    "fsType": "ext4" # 当前仅支持ext4
}
```

### 返回

创建Volume的状态。

```json
{
    "volumeStatus": "creating"
}
```

## 获取某Volume信息

### 请求

`GET` `/v1/projects/<projectName>/volumes/<volumeName>`


### 返回

指定Volume的信息。

```json
{
    "volumeName": "vol1",
    "volumeSize": 10, # unitType: GB
    "volumeStatus": "ok",
    "storageType": "ssd",
    "fsType": "ext4", # 当前仅支持ext4
    "attachedService": [
        {
            "attachedId": "60f81da96a96",
            "appName": "app1",
            "serviceName": "service1",
            "mountPath": "/var/data/mysql"
        },
        ...
    ],
    "creationTime": "2017-05-01T15:00:00Z",
    "updateTime": "2017-05-01T15:00:00Z"
}
```

## 列取Project下所有Volume

### 请求

`GET` `/v1/projects/<projectName>/volumes`


### 返回

列取Project下所有Volume的信息。

```json
[
    {
        "volumeName": "vol1",
        "volumeSize": 10, # unitType: GB
        "volumeStatus": "creating",
        "storageType": "ssd",
        "fsType": "ext4", # 当前仅支持ext4
        "attachedService": [
            {
                "attachedId": "60f81da96a96",
                "appName": "app1",
                "serviceName": "service1",
                "mountPath": "/var/data/mysql"
            },
            ...
        ],
        "creationTime": "2017-05-01T15:00:00Z",
        "updateTime": "2017-05-01T15:00:00Z"
    },
    ...
]
```

## 绑定Volume到某个有状态服务

### 请求

`POST` `/v1/projects/<projectName>/volumes/<volumeName>/attach`

```json
{
    "appName": "app1",
    "serviceName": "service1",
    "mountPath": "/var/data/mysql"
}
```

### 返回

```json
{
    "attachedId": "60f81da96a96"
}
```

## 解绑Volume对应的有状态服务

### 请求

`DELETE` `/v1/projects/<projectName>/volumes/<volumeName>/attach/<attachedId>`

### 返回

无

## 删除Volume

### 请求

`DELETE` `/v1/projects/<projectName>/volumes/<volumeName>`

### 返回

无
