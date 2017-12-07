import Vue from 'vue'
import Router from 'vue-router'
import React from '@/components/React'
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
      path: '/',
      name: 'Home',
      component: React,
      props: true
    },
    {
      path: '/:id',
      name: 'React',
      component: React,
      props: true
    }
  ]
})
