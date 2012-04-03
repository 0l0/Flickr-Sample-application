FliSearch.Collections.SearchResults = Backbone.Collection.extend({
  model: Photo,
  url: '/photos',
  search: function (query, page, per_page) {
    if (!page) {
      page = 1;
    }
    this.url = 'http://api.flickr.com/services/rest/?method=flickr.photos.search' +
        '&api_key=' + FliSearch.Settings.flickrKey +
        '&text=' + query + '&extras=description&format=json&nojsoncallback=1' +
        '&page=' + page + "&per_page=" + per_page;
    this.trigger('searching');
    this.fetch();
  },
  parse: function (response) {
    this.page = response.photos.page;
    this.pages = response.photos.pages;
    return response.photos.photo;
  }
});