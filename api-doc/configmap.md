# 配置 API

配置 **ConfigMap** 提供块配置服务，可以通过盘的形式挂载到容器或者以环境变量的形式注入。一个 ConfigMap 可以包含多项配置。

## ConfigMap
| 名称           | 类型       | 长度上限 | 描述                               |
| :----------- | :------- | :--- | :------------------------------- |
| name  | `string` | 32   | configmap 名称，Project 内唯一，全小写，字母打头，可允许数字和符号 `-`。   |
| data | `map` | N/A   | 配置文件每个配置项的键值对，键名为 `string`, 只能包含字母数字以及符号`.` `-` `_`，值为 `string` 可以为任意字符。 |

## ConfigMap 

## 创建 ConfigMap
### 请求
`POST` `/regions/<regionName>/v1/projects/<projectName>/configmaps`

```json
{
    "name": "configmap-0",
    "data": {
    	"key1": "value1",
    	"key2": "value2"
    }
}
```

### 返回
创建完成的 ConfigMap 对象

```json
{
    "name": "configmap-0",
    "data": {
    	"key1": "value1",
    	"key2": "value2"
    }
}
```

## 列取 Project 下所有 ConfigMap

### 请求
`GET` `/regions/<regionName>/v1/projects/<projectName>/configmaps`


### 返回
列取 Project 下所有 ConfigMap 的信息。

```json
[
	{
	    "name": "configmap-0",
	    "data": {
	    	"key1": "value1",
	    	"key2": "value2"
	    }
	},
    ...
]
```

## 获取某 configmap 信息

### 请求
`GET` `/regions/<regionName>/v1/projects/<projectName>/configmaps/<configmapName>`

### 返回
指定 ConfigMap 的信息。

```json
{
    "name": "configmap-0",
    "data": {
    	"key1": "value1",
    	"key2": "value2"
    }
}
```

## 删除 ConfigMap

### 请求
`DELETE` `/regions/<regionName>/v1/projects/<projectName>/configmaps/<configmapName>`

### 返回
无
