FliSearch.Views.Favourites = Backbone.View.extend({
  el: $("#favourite-placeholder"),
  initialize: function () {
    this.collection.on('change', this.render, this);
    this.collection.on('add', this.render, this);
    this.collection.on('remove', this.render, this);
    this.render();
  },
  searchQuery: undefined,
  templateResults: _.template($("#photos-template").html()),
  render: function () {
    var that = this;
    $(this.el).html(this.templateResults());
    var element = $('ul', this.el);
    this.collection.each(function (photo) {
      photo.photoView = new FliSearch.Views.SearchPhoto({model: photo,
        showAddToFavourites: false,
        dispatcher: that.options.dispatcher});
      element.append(photo.photoView.render().el);
    });
    return this;
  }
});