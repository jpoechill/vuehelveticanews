import Vue from 'vue'
import Router from 'vue-router'
import Stories from '@/components/Stories'
// import Vuejs from '@/components/Vue'
// import Javascript from '@/components/Javascript'
// import Design from '@/components/Design'
// import Jobs from '@/components/Jobs'
// import Temp from '@/components/Temp'
// import AddStory from '@/components/AddStory'


Vue.use(Router)

export default new Router({
  routes: [
    {
      // path: '/',

      path: '/',
      name: 'Stories',
      components: { default: Stories },
      props: { default: true }
    },
    {
      path: '/:id',
      name: 'React',
      components: { default: Stories },
      props: { default: true }
    }
  ]
})
