FliSearch.Views.Paginator = Backbone.View.extend({
  initialize: function () {
    var that = this;
    function paginate() {
      //Have to use getAttribute instead of 'dataset' for compatibility
      that.trigger('paginate', this.getAttribute('data-page'));
      return false;
    }

    this.el = this.options.el;
    var options = {currentPage: this.options.page};
    var pageDelta = (FliSearch.Settings.pagesDelta - 1) / 2;
    var deltaBegin = this.options.page - pageDelta;
    var page;
    if (deltaBegin < 1) {
      deltaBegin = 1;
    }
    var deltaEnd = this.options.page + pageDelta;
    if (deltaEnd > this.options.pages) {
      deltaEnd = this.options.pages;
    }
    if (this.options.page < this.options.pages) {
      options.next = this.options.page + 1;
    } else {
      options.next = false;
    }
    if (this.options.page > 1) {
      options.prev = this.options.page - 1;
    } else {
      options.prev = false;
    }
    if (deltaBegin > 1) {
      options.first = 1;
    } else {
      options.first = false;
    }
    if (deltaEnd < this.options.pages) {
      options.last = this.options.pages;
    } else {
      options.last = false;
    }
    options.pages = [];
    for (page = deltaBegin; page <= deltaEnd; page += 1) {
      options.pages.push(page);
    }

    this.render(options);
    /* We have to use jQuery handler for onClick, because 'events' map doesn't
     * provide 'this' context of HTML element triggered. And because we don't
     * want to introduce view for page number element we have to bind page
     * number to elements HTML data attribute. And with jQuery handler we can
     * access HTML element through 'this' and read it's attribute.
     */
    $("a", this.el).click(paginate);
  },
  template: _.template($("#paginator-template").html()),
  render: function (options) {
    this.el.html(this.template(options));
    return this;
  }
});