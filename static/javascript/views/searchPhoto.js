FliSearch.Views.SearchPhoto = Backbone.View.extend({
  tagName: 'li',
  events: {
    'click img': 'openPhoto',
    'click button.add': 'addToFavorites',
    'click button.remove': 'removeFromFavorites'
  },
  openPhoto: function () {
    this.options.dispatcher.trigger('openPhoto', this.model.id);
  },
  addToFavorites: function () {
    this.options.dispatcher.trigger('saveFavourite',
      this.model);
  },
  removeFromFavorites: function () {
    this.options.dispatcher.trigger('removeFavourite',
      this.model);
  },
  initialize: function () {
    this.render();
    this.delegateEvents();
  },

  render: function () {
    $(this.el).html(this.template({
      'photo': this.model,
      'showAddToFavourites': this.options.showAddToFavourites
    }));
    return this;
  },
  template: _.template($("#search-photo-template").html())
});