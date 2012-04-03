FliSearch.Views.Photo = Backbone.View.extend({
  events: {
    'click button': 'addToFavorites'
  },
  el: $("#search-placeholder"),
  initialize: function () {
    this.render();
  },

  render: function () {
    $(this.el).html(this.template({
      'photo': this.model
    }));
    return this;
  },
  addToFavorites: function () {
    this.options.dispatcher.trigger('saveFavourite',
      this.model);
  },
  template: _.template($("#photo-template").html())
});