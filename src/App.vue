<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <nav class="navbar navbar-toggleable-md navbar-light col-lg-12 custom-navbar" style="">
          <button class="navbar-toggler navbar-toggler-right custom-navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <span class="navbar-brand" v-on:click="myFilter('clear')" style="">
            <router-link :to="{ path: '/' }" class="title">
              <span class="title-text">
                {{ titleText }}
              </span>
            </router-link>
          </span>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item" v-for="link in links"
                style="font-size: 30px; font-weight: 600; padding-right: 20px;"
                v-on:click="myFilter(link.title);"
                v-bind:key="link.title"
                v-bind:class="{ 'nav-item-active': link.active}"
              >
                <span style="white-space: nowrap;">
                  {{ link.emoji }}
                  <router-link
                    :to="{ path: link.title, params: { bird: 'word' }}"
                    class="header-link"
                    v-bind:class="{ 'header-link-active': link.active }"
                  >
                    <span class="link-title">
                      {{link.title}}
                    </span>
                  </router-link>
                </span>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
    <div class="background" style="">
      <router-view :stories="newsStories" @clicked="myFilter" class="router-view"></router-view>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import firebase from 'firebase'
import axios from 'axios'

export default {
  name: 'app',
  props: ['id'],
  created: function () {
    let self = this
    self.getStories()


  },
  computed: {
  },
  data: () => ({
    addStory: {
      text: '+',
      active: false
    },
    day: '',
    quote: '',
    loadingText: 'loading',
    loading: true,
    links: [
      {
        title: 'mtv',
        emoji: '✍️',
        id: 1,
        link: 'mtv-news',
        active: false
      },
      {
        title: 'theverge',
        emoji: '🎥',
        id: 2,
        link: 'the-verge',
        active: false
      },
      {
        title: 'bbc',
        emoji: '📃',
        id: 3,
        link: 'bbc-news',
        active: false
      },
      {
        title: 'natgeo',
        emoji: '🤺',
        id: 4,
        link: 'national-geographic',
        active: false
      },
      {
        title: 'techcrunch',
        emoji: '👩‍💻',
        id: 5,
        link: 'techcrunch',
        active: false
      }
    ],
    currStory: "mtv",
    titleText: 'helvetica.news',
    allStories: {},
    newsStories: [],
    windowWidth: 0,
    windowHeight: 0,
  }),
  mounted: function () {
    let self = this
    this.$nextTick(function() {
      window.addEventListener('resize', this.getWindowWidth);
      window.addEventListener('resize', this.getWindowHeight);

      //Init
      this.getWindowWidth()
      this.getWindowHeight()
    })

    setInterval(function(){
      self.getStories()
    }, 120000);

    this.getQuote()
    this.getDay()
  },
  methods: {
    getDay: function (){
      let self = this
      let d = new Date();
      self.day = d.getDate().toString()
    },
    getQuote: function () {
      let self = this
      axios.get('https://talaikis.com/api/quotes/random/')
        .then(response => {
            self.quote = response.data.quote
            self.author = ' –' + response.data.author
          }
        )
    },
    getStories: function () {
      let self = this
      let promises = []
      let urlVendors = []
      self.newsStories = []

      urlVendors = ['mtv-news', 'the-verge', 'bbc-news', 'national-geographic']
      promises = self.links.map((link) => {
        let siteURL = 'https://newsapi.org/v1/articles?source=' + link.link + '&sortBy=latest&apiKey=b3e8f523645e4678a2355e4603dfdd42'

        return axios.get(siteURL)
        .then(response => {
          var posts = response.data.articles

          posts.forEach(function(item) {
            item.link = link.title
            Vue.set(self.newsStories, self.newsStories.length, item)
          })
        })
        .catch(e => {
          self.errors.push(e)
        })
      })
    },
    getWindowWidth(event) {
      this.windowWidth = document.documentElement.clientWidth;

      if (this.windowWidth < 440) {
        this.titleText = 'helvetica...'
      } else {
        this.titleText = 'helvetica.news'
      }
    },
    getWindowHeight(event) {
      this.windowHeight = document.documentElement.clientHeight;
    },
    toggleLoading: function () {
      this.loading = false
    },
    myFilter: function (linkTitle) {
      this.links.filter((link)=>{
        if (link.title === linkTitle) {
          link.active = true
        } else {
          link.active = false
        }
      })

      this.currStory = linkTitle
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowWidth);
    window.removeEventListener('resize', this.getWindowHeight);
  }
}
</script>

<style>

@media (min-width: 1200px) {
  .navbar-toggleable-md{
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-flex-wrap: nowrap;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;

    width: 100% !important;
  }
}

#app {
  font-family: "Helvetica Neue", "Helvetica", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  background: linear-gradient(90deg, #4990E2 20%, #333 20%);
  margin-bottom: 2px;
}

body {
  background-color: #EEE;
  width: 100%;
  height: auto;
  background: url('/static/unsplash-clip-5.png') no-repeat center center fixed;
  background-position: left bottom;
  margin: auto;
  background-size: cover;

  /* Preserve aspet ratio */
  min-width: 100%;
  min-height: 100%;
}

a {
  color: #4990E2;
}

.background {
  width: 100%; 
  background: url('/static/unsplash-clip-6.png') no-repeat left top fixed; 
  background-color: #FFF;
}

.router-view {
  background-color: #FFF; 
  padding: 8px 0px 4px 24px;
}

.custom-navbar {
  padding-bottom: 0px; 
  padding-top: 0px; 
  padding-left: 0px;
}

.custom-navbar-toggler {
  background-color: #fff; 
  right: 26px !important; 
  border-radius: 0px;
}

.title-text {
  padding: 0px 4px 2px 4px; 
  background-color: rgba(60,154,214,.6);
  color: #FFF;
}

.navbar-brand {
  border-left: 10px solid #fff;
  border-right: 10px solid #cbf2a2;
  font-size: 30px;font-weight: 600;background-color: #333;letter-spacing: 1px; padding: 6px 20px 6px 18px; margin-right: 10px; margin-left: -10px;
}

.navbar-brand:active {
  border-left: 10px solid #fff;
}

.navbar-brand:hover {
  border-left: 10px solid #fff;
}

.header-link-active, .header-link-active:hover{
  color: lightorange !important;
  text-decoration: none;
}

.header-link {
  color: #EEE;
  text-decoration: none !important;
}

.header-link:hover {
  text-decoration: none !important;
}

.addStory-active {
  display: none;
}

.nav-item {
  padding: 6px;
}

.nav-item:hover {
  background-color: #CCC;
  color: lightorange;
}

.nav-item-active {
  background-color: #FFF;
}

.source-link {
  color: #D0011B;
}

.col-md-3 {
  padding: 16px;
  padding-top: 0px;
}

.title:link, .title:hover, .title:active, .title:visited {
  text-decoration: none;
}

.my-input {
  border: 0px solid;
  width: 100%;
  padding: 0px;
  font-size: 32px;
  font-weight: 400;
  color: #333;
  outline-width: 0;
}

.link-title {
  padding: 0px 4px 2px 4px; 
  background-color: rgba(60,154,214,.4)
}

.slide-fade-enter-active {
  transition: all .3s ease;
}

.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
