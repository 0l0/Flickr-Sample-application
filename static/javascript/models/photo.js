var Photo = Backbone.Model.extend({
  image: function (size) {
    var imageSize = size || 'm';
    return 'http://farm' + this.attributes.farm + '.staticflickr.com/' +
        this.attributes.server + '/' + this.id + '_' +
        this.attributes.secret + '_' + imageSize + '.jpg';
  },
  flickrUrl: function () {
    return 'http://www.flickr.com/photos/' + this.attributes.owner + '/' + this.id;
  }
});