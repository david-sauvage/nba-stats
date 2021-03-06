import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'

Vue.use(Vuetify)
Vue.use(Chartkick.use(Chart))

const opts = {
  icons: {
    iconfont: 'md'
  },
  theme: {
    themes: {
      light: {
        primary: '#1d428a',
        secondary: '#1c76b9',
        accent: '#1d87f9',
        error: '#f44336',
        warning: '#ff5722',
        info: '#3f51b5',
        success: '#4caf50'
      }
    }
  }
}

export default new Vuetify(opts)
