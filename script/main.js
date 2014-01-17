(function(Data){
  'use strict';

  var input = document.getElementById('ac');
  var resultsEl = document.getElementById('results');
  var instructionsEl = document.getElementById('instructions');
  var allokEl = document.getElementById('allok');
  var notokEl = document.getElementById('notok');
  var footerEl = document.getElementById('footer');

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
      for (var i = 0, l = Data.length; i < l; i++) {
        var item = Data[i];
        if (item.indexOf(value) > -1) {
          addResult(item);
          match = match || true;
        }
      }

      if (match) {
        notokEl.style.display = 'block';
      } else {
        allokEl.style.display = 'block';
      }
    } else {
      instructionsEl.style.display = 'block';
    }
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

  if (document.documentElement.clientHeight < 600) {
    input.onfocus = function(e) {
      footerEl.style.display = 'none';
    };
    input.onblur = function(e) {
      setTimeout(function() {
        if (input.value === '') {
          footerEl.style.display = 'block';
        }
      }, 300);
    };
  } else {
    input.focus();
  }


})(window.Data);