meanLoginApp.filter('capitilize', function () {
  return function (input, format) {
    if (!input)
      return input;

    format = format || 'all';
    if (format == 'first') {
      return input.charAt(0).toUpperCase() + input.slice(1);
    } else if (format == 'all') {
      return input.toUpperCase();
    } else if (format == 'all_first_word') {
      var words   = input.split(' ');
      var result  = [];

      words.forEach(function (word) {
        result.push(word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
      });
      return result.join(' ');
    } else {
      return input;
    }
  }
});
