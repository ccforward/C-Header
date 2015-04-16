# Control Your Headers

c-Header 一个修改请求页面HTTP头的chrome扩展 

[chrome市场地址](https://chrome.google.com/webstore/detail/c-header/cpkhilpjaiopicjdglhldbgamilgegnd)

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

* 添加URL规则，可针对单项
* 每项header有多选值: option属性
* 使用chrome.storage存储数据  localStorage太不好用了
* value 使用别名

