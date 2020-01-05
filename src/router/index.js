import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

function getRouter () {
  const Router = new VueRouter({ routes })

  //使用钩子函数对路由进行权限跳转
  Router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | ebook-pc`
    const role = sessionStorage.getItem('ms_username')
    if (!role && to.path !== '/login') {
      next('/login')
    } else if (to.meta.permission) {
      // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
      role === 'admin' ? next() : next('/403')
    } else {
      // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
      if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
        Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看',
          '浏览器不兼容通知', {
            confirmButtonText: '确定'
          })
      } else {
        next()
      }
    }
  })

  return Router
}

const route = getRouter()

export default route
