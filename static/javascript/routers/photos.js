FliSearch.Routers.Photos = Backbone.Router.extend({
  routes: {
    '':                        'search',
    'search/*query/p:page':    'search',
    'photo/:id':               'view'
  },
  activeMainView: undefined,
  view: function (id) {
    window.scrollTo(0, 0);
    var photo = this.searchResults.get(id);
    if (!photo) { // In case we clicked from Favourites
      photo = this.favourites.get(id);
    }
    if (photo) {
      this.changeActiveView(new FliSearch.Views.Photo({model: photo,
                                 dispatcher: this.dispatcher}));
    } else {
      this.changeActiveView(new FliSearch.Views.Error({
        msg: 'Wrong Photo ID provided or you reloaded browser page. Please try searching photo first.'
      }));
    }
  },
  search: function (query, page) {
    if (query === undefined) {
      return;
    }
    window.scrollTo(0, 0);
    page = page || 1;
    this.changeActiveView(new FliSearch.Views.Search({results: this.searchResults,
                                 dispatcher: this.dispatcher,
                                 query: query,
                                 page: page}));
  },
  initialize: function (options) {
    var that = this;
    this.dispatcher.on('saveFavourite', function (photo) {
      if (!that.favourites.get(photo.id)) {
        that.favourites.add(photo);
      }
    });

    this.dispatcher.on('removeFavourite', function (photo) {
      if (that.favourites.get(photo.id)) {
        that.favourites.remove(photo);
      }
    });
    new FliSearch.Views.Favourites({collection: this.favourites,
                                     dispatcher: this.dispatcher});
    new FliSearch.Views.SearchBox({dispatcher: this.dispatcher});


    this.dispatcher.on('doSearch', function (query, page) {
      if (query === undefined || query === '') {
        return;
      }
      var url = '/search/' + query;
      if (page) {
        url += '/p' + page;
      }
      that.navigate(url, {trigger: true});
    });

    this.dispatcher.on('openPhoto', function (id) {
      var url = '/photo/' + id;
      that.navigate(url, {trigger: true});
    });

    this.dispatcher.on('showError', function (msg) {
      this.changeActiveView(new FliSearch.Views.Error({msg: msg}));
    });
  },
  searchResults: new FliSearch.Collections.SearchResults(),
  favourites: new FliSearch.Collections.Favourites(),
  dispatcher: _.clone(Backbone.Events),
  changeActiveView: function (view) {
    if (this.activeMainView !== undefined) {
      this.activeMainView.undelegateEvents();
    }
    this.activeMainView = view;
  }
});
