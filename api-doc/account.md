# 账户管理 API

## 获取用户token
### 请求
`POST /v1/usertoken`

### 参数说明
| 名称      |  类型   |  位置    | 必选 |  描述|
|:--------- |:------ |:------ |:---- |:----  |
|name|`string`|请求体|是| 用户名| 
|password|`string`|请求体|是| 用户密码| 

### 返回码
代码 | 描述
---- | ----
200  | 正常返回。
400  | （错误）请求中的参数存在错误。
404  | （错误）不正确的访问路径，请参考开放 API 文档。

### 返回体
名称 | 描述
---- | ----
token.issued_at  | 用户登陆时间。
token.expires_at | 用户失效时间。
token.tokenid | 用户token。
user.id  | 用户id。
user.name  | 用户名。

### 示例
```
$ curl -X POST "https://keapi.qiniu.com/v1/usertoken" -d '{"name":"1508722467@fake.qiniu.io","password":"aslanteam"}'
{
    "token" : {
        "expires_at": "2017-10-26T12:44:23.000000Z",
        "issued_at": "2017-10-23T12:44:23.000000Z",
        "id": "gAAAAABZ7eQnQG8iRcri2F55l4nXQvCCKeqQ9Jzf2gIsPiJeoMeJL5aRUj93Z2tjvfmZaR3RGS4ELVMDZ5qSP804BRqLdjbVPQ6VNZO1JLcO4D-F-i_3De-GCql2fOWet4Sy2jHVRRA56OQhsch0_YEGF5278Bstvw"
    },
    "user" : {
        "id": "b8bbdaeb00a648e280366b752e3cd593",
        "name": "1810615771"
    }
}
```

## 获取项目token
### 请求
`GET /v1/projects/<project-name>/token`

### 参数说明
| 名称      |  类型   |  位置    | 必选 |  描述|
|:--------- |:------ |:------ |:---- |:----  |
|project-name|`string`|路径|是| 项目名| 
|X-Auth-Token|`string`|请求头|是| 用户token| 

### 返回码
代码 | 描述
---- | ----
200  | 正常返回。
400  | （错误）请求中的参数存在错误。
401  | （错误）请求未授权。
404  | （错误）不正确的访问路径，请参考开放 API 文档。

### 返回体
名称 | 描述
---- | ----
token.issued_at  | 用户登陆时间。
token.expires_at | 用户失效时间。
token.tokenid | 项目 token。
user.id  | 用户id。
user.name  | 用户名。
project | 项目名
role | 权限名

### 示例
```
$ curl "https://keapi.qiniu.com/v1/projects/1508809392/token" -H "X-Auth-Token: gAAAAABZ7prUV2dfhZ-V0ttF1Ro6nIzkdAx2AwLPHW3JaephqjAAVOMUBEIbb-SVnQswIKj1mG2VMkejzp1DmA5yoOO-M1R34S0OXfKUta3diuWcqZhehHyju3jyLlUUcnuihtRic0GCP2931gyIZebtURksdoIbjg"
{
    "project": "1508809392",
    "roles": ["admin"],
    "token": {
        "expires_at": "2017-10-27T01:43:48.000000Z",
        "issued_at": "2017-10-24T03:47:53.000000Z",
        "id": "gAAAAABZ7rfpauAwodMuUaO7yRU8lx0cKjKA5almPBpZMU9UW9YrBxaWzNTENceM4p9exyw0JnOUcLIXLobQTij15pY6JLeZAckQ6y3pVC6SGYti1PGPBQtIm2ab25MYHxtVp1AN67ZVVgO5mZtAZ6XTyAm9ooFcTFGMq7_jEWXZCuA2BfEEqG0n22YGtg3H5hMOTZm0_U5i"
    }
    "user": {
        "id": "bdbf8159106a42dc9ee34e7ca2bf4c34",
        "name": "1810615782"
    }
}
```

## 获取用户信息
### 请求
`GET /users/<userid>`

### 参数说明
| 名称      |  类型   |  位置    | 必选 |  描述|
|:--------- |:------ |:------ |:---- |:----  |
|userid|`string`|路径|是| 用户id|
|X-Auth-Token|`string`|请求头|是| 用户token|

### 返回码
代码 | 描述
---- | ----
200  | 正常返回。
400  | （错误）请求中的参数存在错误。
401  | （错误）访问失败，请使用正确的鉴权方式或密钥。
403  | （错误）访问失败，访问违反policy。
404  | （错误）不正确的访问路径，请参考开放 API 文档。

### 返回体
名称 | 描述
---- | ----
email  | 用户邮箱。
id  | 用户id。
name  | 用户名。

### 示例
```
$ curl -X GET "https://keapi.qiniu.com/v1/userinfo/bdbf8159106a42dc9ee34e7ca2bf4c34" -H "X-Auth-Token: gAAAAABZ7prUV2dfhZ-V0ttF1Ro6nIzkdAx2AwLPHW3JaephqjAAVOMUBEIbb-SVnQswIKj1mG2VMkejzp1DmA5yoOO-M1R34S0OXfKUta3diuWcqZhehHyju3jyLlUUcnuihtRic0GCP2931gyIZebtURksdoIbjg"
{
    "email": "1508809392@fake.qiniu.io",
    "id": "bdbf8159106a42dc9ee34e7ca2bf4c34",
    "name": "1810615782"
}
```

## 获取用户的所有项目信息
### 请求
`GET /v1/users/<userid>/projects`

### 参数说明
| 名称      |  类型   |  位置    | 必选 |  描述|
|:--------- |:------ |:------ |:---- |:----  |
|userid|`string`|路径|是| 用户id|
|X-Auth-Token|`string`|请求头|是| 用户token|
|includeType|`string`|查询参数|否|是否包含项目类型|

### 返回码
代码 | 描述
---- | ----
200  | 正常返回。
400  | （错误）请求中的参数存在错误。
401  | （错误）访问失败，请使用正确的鉴权方式或密钥。
403  | （错误）访问失败，访问违反policy。
404  | （错误）不正确的访问路径，请参考开放 API 文档。

### 返回体
名称 | 描述
---- | ----
[i].name  | 第i个项目的名字
[i].description | 第i个项目的描述
[i].type | 第i个项目的类型

### 示例
```
$ curl -X GET "https://keapi.qiniu.com/v1/users/bdbf8159106a42dc9ee34e7ca2bf4c34/projects?includeType=true" -H "X-Auth-Token: gAAAAABZ7prUV2dfhZ-V0ttF1Ro6nIzkdAx2AwLPHW3JaephqjAAVOMUBEIbb-SVnQswIKj1mG2VMkejzp1DmA5yoOO-M1R34S0OXfKUta3diuWcqZhehHyju3jyLlUUcnuihtRic0GCP2931gyIZebtURksdoIbjg"
[
    {
        "description": "for test",
        "name": "1810615782",
        "type" : "personal"
    }
]
```

## 获取用户在项目上的角色
### 请求
`GET /v1/projects/<project-name>/users/<userid>/roles`

### 参数说明
| 名称      |  类型   |  位置    | 必选 |  描述|
|:--------- |:------ |:------ |:---- |:----  |
|project-name|`string`|路径|是| 项目名|
|userid|`string`|路径|是| 用户id|
|X-Auth-Token|`string`|请求头|是| 项目管理员token|

### 返回码
代码 | 描述
---- | ----
200  | 正常返回。
400  | （错误）请求中的参数存在错误。
401  | （错误）访问失败，请使用正确的token。
403  | （错误）访问失败，访问违反policy。
404  | （错误）不正确的访问路径，请参考开放 API 文档。

### 返回体
名称 | 描述
---- | ----
[i]  | 第i个角色名

### 示例
```
$ curl -X GET "https://keapi.qiniu.com/v1/projects/u-1810-default/users/bdbf8159106a42dc9ee34e7ca2bf4c34/roles" -H "X-Auth-Token: gAAAAABZ7prUV2dfhZ-V0ttF1Ro6nIzkdAx2AwLPHW3JaephqjAAVOMUBEIbb-SVnQswIKj1mG2VMkejzp1DmA5yoOO-M1R34S0OXfKUta3diuWcqZhehHyju3jyLlUUcnuihtRic0GCP2931gyIZebtURksdoIbjg"
[
    "admin"
]
```

## 为用户分配项目上的权限
### 请求
`PUT /v1/projects/<project-name>/users/<userid>/roles/<rolename>`

### 参数说明
| 名称      |  类型   |  位置    | 必选 |  描述|
|:--------- |:------ |:------ |:---- |:----  |
|project-name|`string`|路径|是| 项目名|
|userid|`string`|路径|是| 用户id|
|rolename|`string`|路径|是| 角色名|
|X-Auth-Token|`string`|请求头|是| 项目管理员token|

### 返回码
代码 | 描述
---- | ----
204  | 正常返回。
400  | （错误）请求中的参数存在错误。
401  | （错误）访问失败，请使用正确的token。
403  | （错误）访问失败，访问违反policy。
404  | （错误）不正确的访问路径，请参考开放 API 文档。

### 示例
```
$ curl -X PUT "https://keapi.qiniu.com/v1/projects/u-1810-default/users/bdbf8159106a42dc9ee34e7ca2bf4c34/roles/admin" -H "X-Auth-Token: gAAAAABZ7prUV2dfhZ-V0ttF1Ro6nIzkdAx2AwLPHW3JaephqjAAVOMUBEIbb-SVnQswIKj1mG2VMkejzp1DmA5yoOO-M1R34S0OXfKUta3diuWcqZhehHyju3jyLlUUcnuihtRic0GCP2931gyIZebtURksdoIbjg"
```

## 查询用户在一个项目上是否拥有特定角色
### 请求
`HEAD /v1/projects/<project-name>/users/<userid>/roles/<rolename>`

### 参数说明
| 名称      |  类型   |  位置    | 必选 |  描述|
|:--------- |:------ |:------ |:---- |:----  |
|project-name|`string`|路径|是| 项目名|
|userid|`string`|路径|是| 用户id|
|rolename|`string`|路径|是| 角色名|
|X-Auth-Token|`string`|请求头|是| 项目管理员token|

### 返回码
代码 | 描述
---- | ----
204  | 正常返回。
400  | （错误）请求中的参数存在错误。
401  | （错误）访问失败，请使用正确的token。
403  | （错误）访问失败，访问违反policy。
404  | （错误）不正确的访问路径，请参考开放 API 文档。

### 示例
```
curl -X HEAD "https://keapi.qiniu.com/v1/projects/u-1810-default/users/bdbf8159106a42dc9ee34e7ca2bf4c34/roles/admin" -H "X-Auth-Token:gAAAAABZ7s8YtIMojTGj4s07NKaZF4CoQqfLcOsb70LL3b3kiTh3tRi4Cy7T9BVzUxVTeEGPrawFDcxio5OUnfphP2PvLrUAziXJFPRGL2lz2ydBulvAnoknRVe53zfuYTdzpqQ1wDgN47oXuXl9Y_bF8XT6Uf2_l7EC8-FNJzN7qcS8YBxJ7Px-S7XEgc9baFxOfPd1f-4S"
```

## 删除用户在一个项目上的角色
### 请求
`DELETE /v1/projects/<project-name>/users/<userid>/roles/<rolename>`

### 参数说明
| 名称      |  类型   |  位置    | 必选 |  描述|
|:--------- |:------ |:------ |:---- |:----  |
|project-name|`string`|路径|是| 项目名|
|userid|`string`|路径|是| 用户id|
|rolename|`string`|路径|是| 角色名|
|X-Auth-Token|`string`|请求头|是| 项目管理员token|

### 返回码
代码 | 描述
---- | ----
204  | 正常返回。
400  | （错误）请求中的参数存在错误。
401  | （错误）访问失败，请使用正确的token。
403  | （错误）访问失败，访问违反policy。
404  | （错误）不正确的访问路径，请参考开放 API 文档。

### 示例
```
curl -X DELETE "https://keapi.qiniu.com/v1/projects/u-1810-default/users/bdbf8159106a42dc9ee34e7ca2bf4c34/roles/admin" -H "X-Auth-Token:gAAAAABZ7s8YtIMojTGj4s07NKaZF4CoQqfLcOsb70LL3b3kiTh3tRi4Cy7T9BVzUxVTeEGPrawFDcxio5OUnfphP2PvLrUAziXJFPRGL2lz2ydBulvAnoknRVe53zfuYTdzpqQ1wDgN47oXuXl9Y_bF8XT6Uf2_l7EC8-FNJzN7qcS8YBxJ7Px-S7XEgc9baFxOfPd1f-4S"
```

## 获取一个项目下的所有用户
### 请求
`GET /v1/projects/<project-name>/users`

### 参数说明
| 名称      |  类型   |  位置    | 必选 |  描述|
|:--------- |:------ |:------ |:---- |:----  |
|project-name|`string`|路径|是| 项目名|
|X-Auth-Token|`string`|请求头|是| 项目管理员token|
|detailed|`string`|查询参数|否|是否显示用户详细信息|

### 返回码
代码 | 描述
---- | ----
200  | 正常返回。
401  | （错误）访问失败，请使用正确的token。
403  | （错误）访问失败，访问违反policy。
404  | （错误）不正确的访问路径，请参考开放 API 文档。

### 返回体
名称 | 描述
---- | ----
[i].user.name  | 第i个用户的名字
[i].user.id | 第i个用户的id
[i].user.email|第i个用户的邮箱
[i].role|第i个用户在项目中的角色

### 示例
```
curl -X GET "https://keapi.qiniu.com/v1/projects/u-1810-default/users?detailed=true" -H "X-Auth-Token:gAAAAABZ7s8YtIMojTGj4s07NKaZF4CoQqfLcOsb70LL3b3kiTh3tRi4Cy7T9BVzUxVTeEGPrawFDcxio5OUnfphP2PvLrUAziXJFPRGL2lz2ydBulvAnoknRVe53zfuYTdzpqQ1wDgN47oXuXl9Y_bF8XT6Uf2_l7EC8-FNJzN7qcS8YBxJ7Px-S7XEgc9baFxOfPd1f-4S"
[
    {
        "role": "member",
        "user": {
            "email": "g57g@163.com",
            "id": "1494d0702d4e46079ee03c98c50337bb",
            "name": "1380536766"
        }
    },
    {
        "role": "admin",
        "user": {
            "email": "intest@qiniu.com",
            "id": "231d842bdb11414fa1c86a8e7249ab06",
            "name": "admin"
        }
    }
]
```

## 获取项目的信息
### 请求
`GET /v1/projects/<project-name>`

### 参数说明
| 名称      |  类型   |  位置    | 必选 |  描述|
|:--------- |:------ |:------ |:---- |:----  |
|project-name|`string`|路径|是| 项目名|
|X-Auth-Token|`string`|请求头|是| 项目管理员token|

### 返回码
代码 | 描述
---- | ----
200  | 正常返回。
401  | （错误）访问失败，请使用正确的token。
403  | （错误）访问失败，访问违反policy。
404  | （错误）不正确的访问路径，请参考开放 API 文档。

### 返回体
名称 | 描述
---- | ----
name  | 项目名字
description | 项目描述
type | 项目类型

### 示例
```
curl -X GET "https://keapi.qiniu.com/v1/projects/u-1810-default" -H "X-Auth-Token:gAAAAABZ7s8YtIMojTGj4s07NKaZF4CoQqfLcOsb70LL3b3kiTh3tRi4Cy7T9BVzUxVTeEGPrawFDcxio5OUnfphP2PvLrUAziXJFPRGL2lz2ydBulvAnoknRVe53zfuYTdzpqQ1wDgN47oXuXl9Y_bF8XT6Uf2_l7EC8-FNJzN7qcS8YBxJ7Px-S7XEgc9baFxOfPd1f-4S"
{
    "description" : "for test",
    "name" : "u-1810-default",
    "type" : "personal"
}
```

## 更新项目的信息
### 请求
`PATCH /v1/projects/<project-name>`

### 参数说明
| 名称      |  类型   |  位置    | 必选 |  描述|
|:--------- |:------ |:------ |:---- |:----  |
|project-name|`string`|路径|是| 项目名|
|X-Auth-Token|`string`|请求头|是| 项目管理员token|
|description| `string`|请求体|否|项目描述|

### 返回码
代码 | 描述
---- | ----
200  | 正常返回。
401  | （错误）访问失败，请使用正确的token。
403  | （错误）访问失败，访问违反policy。
404  | （错误）不正确的访问路径，请参考开放 API 文档。

### 返回体
名称 | 描述
---- | ----
name  | 项目名字
description | 项目描述

### 示例
```
curl -X PATCH "https://keapi.qiniu.com/v1/projects/u-1810-default" -H "X-Auth-Token:gAAAAABZ7s8YtIMojTGj4s07NKaZF4CoQqfLcOsb70LL3b3kiTh3tRi4Cy7T9BVzUxVTeEGPrawFDcxio5OUnfphP2PvLrUAziXJFPRGL2lz2ydBulvAnoknRVe53zfuYTdzpqQ1wDgN47oXuXl9Y_bF8XT6Uf2_l7EC8-FNJzN7qcS8YBxJ7Px-S7XEgc9baFxOfPd1f-4S" -d '{"description":"new info"}'
{
    "description" : "new info",
    "name" : "u-1810-default"
}
```

## 列举所有region
### 请求
`GET /v1/regions`

### 参数说明
| 名称      |  类型   |  位置    | 必选 |  描述|
|:--------- |:------ |:------ |:---- |:----  |
|X-Auth-Token|`string`|请求头|是| 项目管理员token|

### 返回码
代码 | 描述
---- | ----
200  | 正常返回。
401  | （错误）访问失败，请使用正确的token。
403  | （错误）访问失败，访问违反policy。
404  | （错误）不正确的访问路径，请参考开放 API 文档。

### 返回体
名称 | 描述
---- | ----
[i].id  | 第i个region的id
[i].description | 第i个region的描述

### 示例
```
curl -X GET "https://keapi.qiniu.com/v1/regions" -H "X-Auth-Token:gAAAAABZ7s8YtIMojTGj4s07NKaZF4CoQqfLcOsb70LL3b3kiTh3tRi4Cy7T9BVzUxVTeEGPrawFDcxio5OUnfphP2PvLrUAziXJFPRGL2lz2ydBulvAnoknRVe53zfuYTdzpqQ1wDgN47oXuXl9Y_bF8XT6Uf2_l7EC8-FNJzN7qcS8YBxJ7Px-S7XEgc9baFxOfPd1f-4S"
[
    {
        "description": "",
        "id": "dev1"
    },
    {
        "description": "",
        "id": "RegionDefault"
    },
    {
        "description": "",
        "id": "dev2"
    }
]
```
