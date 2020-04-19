# Control Your Headers

C-Header 一个修改请求页面HTTP头的chrome扩展 

[chrome市场地址](https://chrome.google.com/webstore/detail/c-header/cpkhilpjaiopicjdglhldbgamilgegnd)


## 版本 0.0.2

* 修改部分UI
* 可以在弹出页面中配置是否功能该某一个请求头，单选多选皆可。

下一步准备添加多选项，一个name对应多个value

## localStorage的存储结构

c-headers 简写 chs

```
chs:{
    cfg: {
        run: true
    },
    h: [
        {
            "name": "auth",
            "value": "auth-test",
            "option": ['test1','test2']
        },
        {
            "name": "user-host",
            "value": "127.0.0.1",
            "option": ['user1','user2']
        }
    ]
}
```


## 之前写chrome扩展没有用到的API

* webRequest
* chrome.runtime.onInstalled
* chrome.storage

## TODO

* 针对每一项做单独请求
* 添加URL规则，可针对单项
* 每项header有多选值: option属性
* 使用chrome.storage存储数据  localStorage太不好用了
* value 使用别名

