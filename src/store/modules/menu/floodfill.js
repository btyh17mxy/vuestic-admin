/**
 * Created by mush on 2018-03-16
 *
 * 洪水填充算法的前端实现
 */

import lazyLoading from './lazyLoading'

export default {
  name: 'floodfill',
  path: '/floodfill',
  component: lazyLoading('floodfill/FloodFill'),
  meta: {
    default: true,
    title: 'FloodFill',
    iconClass: 'vuestic-icon vuestic-icon-dashboard'
  }
}
