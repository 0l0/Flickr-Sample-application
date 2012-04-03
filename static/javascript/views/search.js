FliSearch.Views.Search = Backbone.View.extend({
  el: $("#search-placeholder"),
  initialize: function () {
    var that = this;
    function runSearch(query, page) {
      that.options.dispatcher.trigger('doSearch', query, page);
    }

    this.options.results.bind('reset', function () {
      $(this.el).html(this.templateResults());
      var element = $('ul', this.el);
      if (!this.options.results.size()) {
        this.options.dispatcher.trigger('showError', 'No results found.');
      }
      this.options.results.each(function (photo) {
        photo.photoView = new FliSearch.Views.SearchPhoto({model: photo,
          showAddToFavourites: true,
          dispatcher: that.options.dispatcher
          });
        element.append(photo.photoView.render().el);
      });

      var paginator = new FliSearch.Views.Paginator({
        el: $("#photos-paginator", this.el),
        page: this.options.results.page,
        pages: this.options.results.pages
      });
      paginator.on('paginate', function (page) {
        runSearch(that.searchQuery, page);
      });
    }, this);

    this.options.results.bind('searching', function () {
      $(this.el).html(this.templateSearching);
    }, this);

    this.render();
    this.searchQuery = this.options.query;
    this.options.results.search(this.options.query, this.options.page, FliSearch.Settings.perPage);
  },
  searchQuery: undefined,
  templateResults: _.template($("#photos-template").html()),
  templateSearching: _.template($("#searching-template").html()),
  render: function () {
    return this;
  }
});