---
title: localStorage实现缓存方案
date: 2019-07-02 00:31:31
tags: [api,js]
categories: [tool]
---
# localStorage实现缓存方案

## 源码
```
const lsc = {
  /**
   * 缓存数据
   */
  set: function(key, value, durationTime) {
    // 没有key
    if (!key) return;

    // 没有value，删除
    if (key && !value) this.del(key);

    // 设置过期时间
    const dataObj = {
      data: value,
      endTime: getTime() + durationTime || 60 * 60 * 24 * 1000,
    }

    // 写入
    localStorage.setItem(key, JSON.stringify(dataObj))
  },

  /**
   * 删除
   */
  del: function(key) {
    localStorage.removeItem(key);
  },

  /**
   * 读取
   */

  get: function (key) {
    const res = JSON.parse(localStorage.getItem(key));
    if (!res) return false;
    
    // 检查是否过期
    if (res.endTime < getTime()) {
      this.del(key);
      return false;
    }

    return res.data;
  },

  /**
   * 定时清除本地，避免爆炸
   */
  gc: function() {
    const timeNow = getTime();
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (true) {
        const res = JSON.parse(localStorage.getItem(key));
        if (res.endTime < timeNow) {
          this.del(key);
        }
      }
    }
  },

  /**
   * 不能管理所有的localstorage；可以管理所有通过此方案set的key
   */
  allKeys: function() {
    // todo
  },

  /**
   * 如果满了，按照时间顺序删除
   */
  delByTime: function() {
    // todo
  },
  init: function () {
    let self = this;
    // 3s中检查一次
    setInterval(function() {
      self.gc();
    }, 3000);
  }
};

const getTime = () => {
  return Math.floor(Date.now());
}

export {
  lsc,
};

```