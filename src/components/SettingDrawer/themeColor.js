import client from 'webpack-theme-color-replacer/client'
import generate from '@ant-design/colors/lib/generate'

export default {
  getAntdSerials (color) {
    // 淡化（即less的tint）
    const lightens = new Array(9).fill().map((t, i) => {
      return client.varyColor.lighten(color, i / 10)
    })
    // colorPalette变换得到颜色值
    const colorPalettes = generate(color)
    return lightens.concat(colorPalettes)
  },
  changeColor (newColor) {
    var options = {
      newColors: this.getAntdSerials(newColor), // new colors array, one-to-one corresponde with `matchColors`
      changeUrl (cssUrl) {
        console.log('动态主题css的url地址:', process.env.VUE_APP_PROJECT_NAME + `/${cssUrl}`)
        // TODO 如果是非根目录发布,且需要动态主题切换的功能, 这里就必须指定项目名, 否则会无法加载到主题css文件, 导致最终出错
        return process.env.VUE_APP_PROJECT_NAME + `/${cssUrl}` // while router is not `hash` mode, it needs absolute path
      }
    }
    return client.changer.changeColor(options, Promise)
  }
}
