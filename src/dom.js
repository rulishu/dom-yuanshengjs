window.dom = {
  create(string) {
    //创建节点
    const container = document.createElement("template");
    //容器里面是div，div里面不能放td，template可以放任意元素不出错
    container.innerHTML = string.trim();
    return container.content.firstChild;
    //template不能直接通过children拿到，要用content拿到
  },
  after(node, node2) {
    //新增弟弟
    node.parentNode.insertBefore(node2, node.nextSibling);
  },
  before(node, node2) {
    //新增哥哥
    node.parentNode.insertBefore(node2, node);
  },
  append(parent, node) {
    //新增儿子
    parent.appendChild(node);
  },
  wrap(node, parent) {
    //新增爸爸
    dom.before(node, parent);
    dom.append(parent, node);
  },
  remove(node) {
    //删除节点
    node.parentNode.removeChild(node);
  },
  empty(node) {
    //删除后代
    const array = [];
    let x = node.firstChild;
    while (x) {
      array.push(dom.remove(node.firstChild));
      x = node.firstChild;
    }
    return array;
  },
  attr(node, name, value) {
    //重载
    //读写属性
    if (arguments.length === 3) {
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      return node.getAttribute(name);
    }
  },
  text(node, string) {
    //适配
    //读写文本
    if (arguments.length === 2) {
      if ("innerText" in node) {
        node.innerText = string;
        //ie
      } else {
        node.textContent = string;
        //firefox, chrome
      }
    } else if (arguments.length === 1) {
      if ("innerText" in node) {
        return node.innerText;
      } else {
        return node.textContent;
      }
    }
  },
  html(node, string) {
    //读写HTML
    if (arguments.length === 2) {
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  },
  style(node, name, value) {
    //读写style
    if (arguments.length === 3) {
      //dom.style(div,'color','red')
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === "string") {
        //dom.style(div,'color')
        return node.style[name];
      } else if (name instanceof Object) {
        //dom.style(div,{color:'red'})
        const object = name;
        for (let key in object) {
          node.style[key] = object[key];
        }
      }
    }
  },
  class: {
    //添加class,删除class
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, className) {
      node.classList.remove(className);
    },
    has(node, className) {
      return node.classList.contains(className);
    },
  },
  //添加事件监听，移除事件监听
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },
  find(selector, scope) {
    //获取标签
    return (scope || document).querySelectorAll(selector);
  },
  parent(node) {
    //获取父元素
    return node.parentNode;
  },
  children(node) {
    //获取子元素
    return node.children;
  },
  siblings(node) {
    //获取兄弟姐妹
    return Array.from(node.parentNode.children).filter((n) => n != node);
  },
  next(node) {
    //获取弟弟
    let x = node.nextSibling;
    while (x && x.nodeType === 3) {
      x = x.nextSibling;
    }
    return x;
  },
  previous(node) {
    //获取哥哥
    let x = node.previousSibling;
    while (x && x.nodeType === 3) {
      x = x.previousSibling;
    }
    return x;
  },
  each(nodeList,fn){
    //遍历所有节点
    for(let i=0;i<nodeList.length;i++){
      fn.call(null,nodeList[i])
    }
  },
  index(node){
    //获取排行老几
    const list = dom.children(node.parentNode)
    let i
    for(i=0;i<list.length;i++){
      if(list[i]===node){
        break
      }
    }
    return i
  }
};
