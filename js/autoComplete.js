var $ = require('jquery');

// todo

// searching for items
$(document).on('keyup.searchDrop', '.js-stock-transfer-search', function(event) {
  event.preventDefault();
  var keyCode = event.which;
  var term = $(this).val();
  clearTimeout(timeoutId);
  timeoutId = setTimeout(function() {
    $.ajax({
      url: url.generate('ajax.search.item'),
      type: 'get',
      dataType: 'json',
      data: {
        term:  term
      },
      success: function(items) {
        $('.js-search-results').html(mustache.render($('#mst-search-item').html(), items));
        searchResults = items;
      },
      error: function(result) {
        console.log(result);
        feedbackQueue.createMessage({
          'message': 'Network error.',
          'type': 'negative'
        });
      }
    });
  }, 200);
});

// search
// hitting escape
// clicking away
$(document).on('keyup.searchDrop', function(event) {
  if (event.which == keycode.esc) {
    $('.js-search-results').html('');
  };
}).on('mouseup', function(event) {
  if (!$(event.target).closest('.js-item').length) {
    $('.js-search-results').html('');
  };
});;

// search
// click one
$(document).on('click.searchDrop', '.js-item', function() {
  for (var index = searchResults.length - 1; index >= 0; index--) {
    if (searchResults[index].id == $(this).data('id')) {
      $('.js-stock-transfer-item-id').val(searchResults[index].id);
      $('.js-stock-transfer-name').val(searchResults[index].name);
      $('.js-search-results').html('');
    };
  };
});
