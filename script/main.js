(function(Data){
  'use strict';

  Array.prototype.map = Array.prototype.map || function(f) {
    var r = [];
    for (var i = 0; i < this.length; i++) r.push(f(this[i]));
    return r
  };
  Array.prototype.forEach = Array.prototype.forEach || function(f) {
    for (var i = 0; i < this.length; i++) f(this[i]);
  };

  var input = document.getElementById('ac');
  var resultsEl = document.getElementById('results');
  var instructionsEl = document.getElementById('instructions');
  var allokEl = document.getElementById('allok');
  var notokEl = document.getElementById('notok');
  var footerEl = document.getElementById('footer');

  var REPORT_DELAY = 600;
  var REPORT_MIN_LENGTH = 2;
  var reportTimeout = null;

  if (input.addEventListener) {
    input.addEventListener('keyup', oninput);
  } else {
    // IE < 9
    input.attachEvent('onpropertychange', oninput);
  }

  function oninput() {
    allokEl.style.display = 'none';
    notokEl.style.display = 'none';
    instructionsEl.style.display = 'none';

    var value = input.value;
    var match = false;
    clearResults();

    if (value) {
      var results = search(value);

      if (results.length) {
        results.forEach(addResult);
        notokEl.style.display = 'block';
      } else {
        allokEl.style.display = 'block';
      }
    } else {
      instructionsEl.style.display = 'block';
    }

    reportQuery(value);
  }

  function search(query, quant) {
    var resultRankPairs = [];

    for (var i = 0, l = Data.length; i < l; i++) {
      var item = Data[i];
      var index = item.indexOf(query);
      if (index > -1) {
        resultRankPairs.push([item, index]);
      }
    }

    var results = resultRankPairs.sort(cmp).map(function(result) {
      return result[0];
    }).slice(0, quant || resultRankPairs.length);

    return results;
  }

  // order results: smaller index => higher ranking
  function cmp(result1, result2) {
    return result1[1] - result2[1];
  }

  function clearResults() {
    resultsEl.innerHTML = '';
  }

  function addResult(item) {
    var li = document.createElement('li');

    var icon = document.createElement('span');
    icon.innerHTML = '&times;';
    icon.className = 'icon';
    li.appendChild(icon);

    var label = document.createElement('span');
    label.innerHTML = item;
    li.appendChild(label);

    resultsEl.appendChild(li);
  }

  function reportQuery(query) {
    clearTimeout(reportTimeout);

    if (query.length >= REPORT_MIN_LENGTH) {
      reportTimeout = setTimeout(function() {
        ga('send', 'event', 'search', 'type', query);
      }, REPORT_DELAY);
    }
  }

  input.focus();

})(window.Data);