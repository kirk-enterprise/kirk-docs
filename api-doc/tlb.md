# TCP 负载均衡 API

## TLB描述
| 名称 | 类型 | 长度上限 | 描述 |
| :--- | :--- | :--- | :--- |
| name | `string` | 64 | TLB的名字，同一区域下的项目内唯一 |
| description | `string` | 256 | TLB描述 |
| projectName | `string` | 32 | 所属的项目名称 |
| status | `string` | 32 | TLB 的状态，分为 `pending` 和 `ready` |
| ip | `string` | 32 | TLB 被分配的 IP, 仅当 status 为 `ready` 时有效 |
| ipType | `string` | 32 | TLB 的 IP 类型，分为 `in-cluster` 和 `telecom` |
| chargeMode | `string` | 32 | 计费方式，分为 `netflow` 和 `bandwidth` |
| bandwidthLimit | `int` | 4 | 带宽限制，单位 Mbps，取值范围 [1,1000] |
| policy | `string` | 32 | 调度策略，目前只支持 `roundrobin` |
| services | `[]object` | - | TLB 的后端服务，可为空数组 |
| rules | `[]object` | - | TLB 的转发规则，至少存在一条规则 |
| created | `string` | 128 | 创建时间，RFC3339格式 |
| updated | `string` | 128 | 修改时间，RFC3339格式 |

## TLB后端服务
| 名称 | 类型 | 长度上限 | 描述 |
| :--- | :--- | :--- | :--- |
| appName | `string` | 32 | 后端服务所属的应用名 |
| serviceName | `string` | 32 | 后端服务所属的服务名 |

## TLB规则
| 名称 | 类型 | 长度上限 | 描述 |
| :--- | :--- | :--- | :--- |
| lbPort | `int` | 4 | TLB监听端口号 |
| servicePort | `int` | 4 | 后端服务端口号 |
| protocol | `string` | 16 | 端口协议，目前只支持 `TCP` |

## 创建 TLB

`POST` `/v1/projects/<projectname>/tlbs`

### 参数

```json
{
	"name": "mytlb",
	"descriptin": "this is my first tlb.",
	"ipType": "telecom",
	"chargeMode": "bandwidth",
	"bandwidthLimit": 10,
	"policy": "roundrobin",
	"services": [
		{
			"appName": "wordpress",
			"serviceName": "portal"
		},
		{
			"appName": "wordpressv2",
			"serviceName": "web"
		}
	],
	"rules": [
		{
			"lbPort": 80,
			"servicePort": 8080,
			"protocol": "TCP"
		},
		{
			"lbPort": 443,
			"servicePort": 443,
			"protocol": "TCP"
		}
	]
}
```

### 返回

```json
{
	"name": "mytlb",
	"descriptin": "this is my first tlb.",
	"projectName": "myprj",
	"status": "ready",
	"ip": "10.10.10.10",
	"ipType": "telecom",
	"chargeMode": "bandwidth",
	"bandwidthLimit": 10,
	"policy": "roundrobin",
	"services": [
		{
			"appName": "wordpress",
			"serviceName": "portal"
		},
		{
			"appName": "wordpressv2",
			"serviceName": "web"
		}
	],
	"rules": [
		{
			"lbPort": 80,
			"servicePort": 8080,
			"protocol": "TCP"
		},
		{
			"lbPort": 443,
			"servicePort": 443,
			"protocol": "TCP"
		}
	],
	"created": "2017-10-16T10:42:51.833674Z",
	"updated": "2017-10-16T10:42:51.833674Z"
}
```
### 返回码

代码 | 描述
---- | ----
200  | 正常返回。
400  | （错误）请求中的参数存在错误。
409  | （错误）项目在区域中已经存在同名资源。


## 更新 TLB

`PATCH` `/v1/projects/<projectname>/tlbs/<tlbname>`

### 参数

```json
{
	"description": "updated description",
	"bandwidthLimit": 100,
	"policy": "roundrobin",
	"services": [],
	"rules": [
		{
			"lbPort": 80,
			"servicePort": 8080,
			"protocol": "TCP"
		}
	]
}
```

### 返回

```json
{
	"name": "mytlb",
	"descriptin": "updated description",
	"projectName": "myprj",
	"status": "ready",
	"ip": "10.10.10.10",
	"ipType": "telecom",
	"chargeMode": "bandwidth",
	"bandwidthLimit": 100,
	"policy": "roundrobin",
	"services": [],
	"rules": [
		{
			"lbPort": 80,
			"servicePort": 8080,
			"protocol": "TCP"
		}
	],
	"created": "2017-10-16T10:42:51.833674Z",
	"updated": "2017-10-16T11:42:51.833674Z"
}
```

### 返回码

代码 | 描述
---- | ----
200  | 正常返回。
400  | （错误）请求中的参数存在错误。
404  | （错误）指定资源不存在。

## 获取 TLB 信息

`GET` `/v1/projects/<projectname>/tlbs/<tlbname>`

### 参数

无

### 返回

```json
{
	"name": "mytlb",
	"descriptin": "this is my first tlb.",
	"projectName": "myprj",
	"status": "ready",
	"ip": "10.10.10.10",
	"ipType": "telecom",
	"chargeMode": "bandwidth",
	"bandwidthLimit": 10,
	"policy": "roundrobin",
	"services": [],
	"rules": [
		{
			"lbPort": 80,
			"servicePort": 8080
		}
	],
	"created": "2017-10-16T10:42:51.833674Z",
	"updated": "2017-10-16T11:42:51.833674Z"
}
```

### 返回码

代码 | 描述
---- | ----
200  | 正常返回。
404  | （错误）指定资源不存在。

## 删除 TLB

`DELETE` `/v1/projects/projectname/tlbs/<tlbname>`

### 参数

无

### 返回

无

### 返回码

代码 | 描述
---- | ----
200  | 正常返回。
404  | （错误）指定资源不存在。

## 列出 TLB

`GET` `/v1/projects/<projectname>/tlbs?app=<appname>&service=<servicename>`

### 参数

通过设定 appname, servicename 过滤出指定 service 作为 TLB 后端的实例

### 返回

```json
[
	{
		"name": "mytlb",
		"descriptin": "this is my first tlb.",
		"projectName": "myprj",
		"status": "ready",
		"ip": "10.10.10.10",
		"ipType": "telecom",
		"chargeMode": "bandwidth",
		"bandwidthLimit": 10,
		"policy": "roundrobin",
		"services": [],
		"rules": [
			{
				"lbPort": 80,
				"servicePort": 8080,
				"protocol": "TCP"
			}
		],
		"created": "2017-10-16T10:42:51.833674Z",
		"updated": "2017-10-16T11:42:51.833674Z"
	}
]
```

### 返回码

代码 | 描述
---- | ----
200  | 正常返回。
400  | （错误）请求中的参数存在错误。