<template>
  <div class="container">
    <div class="row" style="font-size: 30px; margin-bottom: 0px; margin-top: 0px;">
      <div class="col-md-12" style="line-height: 35px;">
        <div style="padding: 0px 2px 4px 2px; ;">
          <div style="background-color: lightblue">
            <span v-for="(story, index) in sortedItems">
              <span style="color: #333; font-weight: bolder; margin-right: 2px;">article:</span>
              <a :href="story.url" style="font-weight: bold; padding: 0px 4px 0px 4px; background-color: #333; color: #fff; font-size: 30px;">{{ story.title }}</a>
              <span style="font-weight: bolder; padding: 0px 4px 2px 4px; background-color: crimson;">source:</span>
              <a :href="story.url" class="source-link" style="font-weight: bold; ">
                {{ getSourceURL(story.url) }}</a>
              <span v-if="story.author" style="font-weight: 700;">author:</span>
              <span style="padding: 0px 4px 2px 4px; background-color: #bbb; color: #fff; font-style: italic; font-weight: 600;">{{ story.author }}</span>
              <span v-if="story.tags" style="font-weight: bolder">tags: </span>
                <span>
                  {{ story.tags }}
                </span>
              <span style="font-weight: bolder">added: </span>
              {{ returnDate(story.publishedAt) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'React',
  props: ['stories', 'id'],
  created: function () {
    // console.log('Created')
    // console.log(this.stories)
   this.$emit('clicked', this.id)
    // console.log('ID: ' + this.id)
  },
  computed: {
    filterStories: function (id) {
      return self.stories
    },
    sortedItems: function () {
      this.stories.sort((a, b) => {
        return moment(b.publishedAt).valueOf() - moment(a.publishedAt).valueOf()
      })
      return this.stories.filter((story) => {
        return (this.id === undefined) ? story.link : story.link === this.id
      })
    }
  },
  methods: {
    getSourceURL: function (url) {
      if (url) {
        var url = url.replace(/^((\w+:)?\/\/[^\/]+\/?).*$/,'$1');
        url = url.replace(/\/$/, '');
        url = url.replace(/.*?:\/\//g, "");
        url = url.replace("www.","")

        return (url === 'news.nationalgeographic.com' || url === 'nationalgeographic.com') ?
          'natgeo.com' : url
      }
    },
    returnDate: function (data) {
      var now = moment(data).format('MMM Do, YYYY')
      return now
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input::-webkit-input-placeholder {
  color: #aaa !important;
}

input:-moz-placeholder { /* Firefox 18- */
  color: #aaa !important;
}

input::-moz-placeholder {  /* Firefox 19+ */
  color: #aaa !important;
}

input:-ms-input-placeholder {
  color: #aaa !important;
}

.my-input {
  border: 0px solid;
  width: 100%;
  padding: 0px;
  font-size: 24px;
  font-weight: 400;
  color: #333;
  outline-width: 0;
}
</style>
