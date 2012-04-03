FliSearch.Views.Error = Backbone.View.extend({
  el: $("#search-placeholder"),
  initialize: function () {
    this.render();
  },

  render: function () {
    $(this.el).html(this.template({
      'errorMessage': this.options.msg
    }));
    return this;
  },
  template: _.template($("#error-template").html())
});