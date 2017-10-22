#3.5 存储管理

- [3.5.1 添加存储卷](#jump1)
- [3.5.2 删除存储卷](#jump2)
- [3.5.3 挂载服务/服务移除](#jump3)

***
##<span id="jump1">3.5.1 添加存储卷</span>

创建有状态服务时需要挂载存储卷，可以选择在 **存储** 列表中添加存储卷，或者在创建服务时新增存储卷[(详见3.3.1)](fu-wu-guan-li.md "详见3.3.1")。

><span style="color:red">注意：存储卷一旦创建成功，名称、大小无法修改</span>

1）**存储卷名称**
>要求：长度为2-32, 可以是小写字母或数字, 首字符必须是小写字母

2）**存储卷大小**

>范围：最小为1G，最大为500G，调整粒度为1G

![](https://github.com/kirk-enterprise/kirk-docs/blob/master/yong-hu-zhi-nan/media/yingyongguanli-tianjiacunchujuan.jpeg?raw=true)

***
##<span id="jump2">3.5.2 删除存储卷</span>

![](https://github.com/kirk-enterprise/kirk-docs/blob/master/yong-hu-zhi-nan/media/cunchuguanli-shanchucunchujuan.gif?raw=true)

***
##<span id="jump3">3.5.3 挂载服务/服务移除</span>

允许存储卷 **挂载到有状态服务** 或 **与有状态服务解绑**。

>挂载存储卷
>>名称：选择需要挂载存储卷的服务名称

>>读写方式：只读/读写
>> - 只读：该服务对存储卷只能进行读操作
>> - 读写：该服务对存储卷可以进行读和写操作

>>挂载路径：存储卷挂载到服务的内部路径，服务通过该路径读取或写入存储卷

![](https://github.com/kirk-enterprise/kirk-docs/blob/master/yong-hu-zhi-nan/media/cunchuguanli-guazaicunchujuan.gif?raw=true)