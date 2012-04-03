FliSearch.Views.SearchBox = Backbone.View.extend({
  initialize: function () {
    var that = this;
    function initiateSearch() {
      that.options.dispatcher.trigger('doSearch', $("#search-input").val(), 1);
    }
    $("#search-button").click(initiateSearch);
    $("#search-input").keypress(function (event) {
      if (event.which === 13) {
        initiateSearch();
      }
    });
  },

  render: function () {
    return this;
  }
});