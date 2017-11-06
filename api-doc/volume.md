# 云硬盘 API

云硬盘 **Volume** 提供块设备服务，创建后可以绑定在有状态服务上使用。

## StorageType 描述
| 名称           | 类型       | 长度上限 | 描述                               |
| :----------- | :------- | :--- | :------------------------------- |
| type  | `string` | 32   | 当前 Region、Project 下支持的存储类型。       |
| desc | `string` | 32   | 存储类型的描述，比如：普通云盘，SSD 高速云盘 |
| iops      | `string` | 32   | 云盘对应的 iops 描述，有可能是一个数字（1400），也有可能是一个范围（200 ~ 500），所以用字符串来表示                        |


## Volume 描述

| 名称           | 类型       | 长度上限 | 描述                               |
| :----------- | :------- | :--- | :------------------------------- |
| name  | `string` | 32   | volume 名，Project 内唯一，全小写，字母打头，可允许数字和符号 `-`。       |
| size | `int` | 4   | volume 大小，单位为 GB。 |
| status  | `string` | 32   | volume 状态，可为：`creating`，`ok`，或 `error`。       |
| fsType      | `string` | 16   | volume 的文件系统类型，当前仅支持 "ext4"。                        |

## 列取当前支持的 StorageTypes

### 请求

`GET` `/regions/<regionName>/storagetypes`

### 返回

所有的存储类型列表。

```json
[
    {
        "type": "ceph",
        "desc": "高速云盘",
        "iops": "1400"
    },
    {
        "type": "sata",
        "desc": "普通云盘",
        "iops": "200 ~ 500"
    },
    ...
]
```

## 创建 Volume

### 请求

`POST` `/regions/<regionName>/v1/projects/<projectName>/volumes`

```json
{
    "name": "vol0",
    "type": "ceph",
    "size": 10, # unitType: GB
    "fsType": "ext4" # 当前仅支持 ext4
}
```

### 返回

创建 Volume 的状态。

```json
{
    "name": "vol0",
    "volumeStatus": "creating",
    "type": "ceph",
    "size": 10,
    "fsType": "ext4"
}
```

## 列取 Project 下所有 Volume

### 请求

`GET` `/regions/<regionName>/v1/projects/<projectName>/volumes`


### 返回

列取 Project 下所有 Volume 的信息。

```json
[
    {
        "name": "vol0",
        "volumeStatus": "creating",
        "type": "ceph",
        "size": 10,
        "fsType": "ext4"
    },
    ...
]
```

## 获取某 Volume 信息

### 请求

`GET` `/regions/<regionName>/v1/projects/<projectName>/volumes/<volumeName>`


### 返回

指定 Volume 的信息。

```json
{
    "name": "vol0",
    "volumeStatus": "creating",
    "type": "ceph",
    "size": 10,
    "fsType": "ext4"
    // TODO: creationTime, updateTime
}
```

## 删除 Volume

### 请求

`DELETE` `/regions/<regionName>/v1/projects/<projectName>/volumes/<volumeName>`

### 返回

无