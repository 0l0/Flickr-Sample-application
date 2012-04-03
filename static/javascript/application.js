var FliSearch = {
  Views: {},
  Routers: {},
  Collections: {},
  init: function () {
    var applicationRouter = new FliSearch.Routers.Photos();
    Backbone.history.start();
  },
  Settings: {
    flickrKey: 'add_you_key_here',
    pagesDelta: 5,
    perPage: 20
  }
};