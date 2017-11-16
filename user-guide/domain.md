# 3.9 域名管理

## 3.9.1 添加域名

1）点击控制台左边栏的「域名管理」，切换至应用界面。

2）点击「添加域名」

![添加域名](_figures/user-guide/domain-add.jpg)

3）填写需要绑定的「域名」。

4）选择「证书」。若不开启 HTTPS，可以不添加证书。若需要开启 HTTPS，则必须添加证书。

?> 添加或购买证书可前往 [七牛云开发者平台 - SSL证书服务](https://portal.qiniu.com/certificate/ssl#cert)。

!> 注意：证书对应的域名需要与添加的域名一致并且证书需要在有效期内。

5）开启 HTTPS。开启 HTTPS 后对域名的请求将转成 HTTPS 请求

!> 开启 HTTPS 需要先添加该域名的证书。

![添加域名表单](_figures/user-guide/domain-add-form.jpg)

## 3.9.2 配置 CNAME

6）添加域名完成后，会提示需要配置域名 CNAME 到指定的「CNAME 域名」，「CNAME 域名」只能用于配置 CNAME，不能访问，CNAME 生效后方可使用。

![配置 CNAME](_figures/user-guide/domain-cname.jpg)

7）配置 CNAME 需要前往您的域名服务商添加一条 CNAME 记录，并把系统显示的「 CNAME 域名」填写在记录值中。等待一段时间后，域名列表中的域名状态会从「未绑定」变成「已绑定」。

![配置 CNAME](_figures/user-guide/domain-cname-setting.jpg)

?> **添加的域名会有两种状态：**  
**未绑定** - CNAME 地址未绑定到域名。刚结束绑定操作，需要等候约5分钟完成系统验证，请及时刷新列表以更新绑定状态。  
**已绑定** - CNAME 地址成功绑定到域名。

## 3.9.3 编辑域名

8）点击「编辑按钮」，进入编辑域名界面。

![编辑域名](_figures/user-guide/domain-edit.jpg)

9）更新域名的证书，已开启 HTTPS 的域名不能移除证书。

10）开启或关闭 HTTPS

![编辑域名表单](_figures/user-guide/domain-edit-form.jpg)

## 3.9.4 删除域名

11）勾选需要删除的域名，点击上方的删除域名按钮即可删除域名。

!> 已被添加至负载均衡的域名需要先从负载均衡中移除才可删除。

![删除域名](_figures/user-guide/domain-delete.jpg)
