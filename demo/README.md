# demo

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

项目中出现的问题

<el-from> 页面没有加载获取不到 ref  使用 this.$nextTick(()=>{}) 加深印象！！多使用

el-cascader  级联选择器 制作地址 格式是数组 

将

<el-input class="filter-item" v-model="form.phone" @keyup.enter="searchPhone"/>
替换为

<el-input class="filter-item" v-model="form.phone" @keyup.enter.native="searchPhone"/>
 

注意：v-model数据层一定要在@keyup.enter 事件之前。

ps: 在 Vue 2.0 中，为自定义组件绑定原生事件必须使用 .native 修饰符，只有Button 组件可以监听 click 事件。

调用 resetFields 方法需要 form-item 组件中配置 prop 属性。
