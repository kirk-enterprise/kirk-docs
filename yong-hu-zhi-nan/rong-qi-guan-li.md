#3.4 容器管理

- [3.4.1 添加容器](#jump1)
- [3.4.2 扩缩容器](#jump2)
- [3.4.3 重新部署](#jump3)
- [3.4.4 远程终端](#jump4)
- [3.4.5 日志 & 监控 (详见3.7)](ri-zhi-jian-kong.md "日志 & 监控[详见3.7]")


##<span id="jump1">3.4.1 添加容器</span>

容器通过镜像生成，在 **添加服务** 中实现，同时可以选择容器实例个数。 [(详见3.3.1)](fu-wu-guan-li.md "详见3.3.1")

***
##<span id="jump2">3.4.2 扩缩容器</span>

容器的扩缩通过 **服务伸缩** 实现。[(详见3.3.4)](fu-wu-guan-li.md "详见3.3.4")

***
##<span id="jump3">3.4.3 重新部署</span>

><span style="color:red">注意：容器重新部署会导致该容器日志和监控重置</span>

![](https://odum9helk.qnssl.com/FiSYQw4SUooUeQvCd3JBDLgKiPDY)

***
##<span id="jump4">3.4.4 远程终端</span>

类似docker exec命令功能，以Terminal形式登入进容器内部。

