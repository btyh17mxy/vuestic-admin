/**
 * Created by mush on 2018-03-16
 *
 * vue-resouce 的使用, 带有错误提示和未登录情况的处理, 见 src/main.js
 */
import lazyLoading from './lazyLoading'

export default {
  name: 'resource',
  path: '/resource',
  component: lazyLoading('resource/Resource'),
  meta: {
    default: true,
    title: 'menu.resource',
    iconClass: 'vuestic-icon vuestic-icon-dashboard'
  }
}
