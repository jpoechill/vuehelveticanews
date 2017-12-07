var MyPlugin = {
  install: function (Vue, options) {
    Vue.mixin({
      methods: {
        showLoading: function (text) {
          var updateText;
          switch (text) {
            case "loading":
              updateText = "loading."
              break;
            case "loading.":
              updateText = "loading.."
              break;
            case "loading..":
              updateText = "loading..."
              break;
            case "loading...":
              updateText = "loading"
              break;
          }
          this.loadingText = updateText;
        }
      }
    })
  }
}

export default MyPlugin;
