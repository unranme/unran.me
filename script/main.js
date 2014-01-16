(function(Data){
  'use strict';

  var input = document.getElementById('ac');
  var resultsEl = document.getElementById('results');
  var instructionsEl = document.getElementById('instructions');

  input.addEventListener('input', function oninput(e) {
    var value =  e.target.value;
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
        instructionsEl.style.display = 'none';
      }
    } else {
      instructionsEl.style.display = 'block';
    }
  });

  function clearResults() {
    resultsEl.innerHTML = '';
  }

  function addResult(item) {
    var li = document.createElement('li');
    li.textContent = item;
    resultsEl.appendChild(li);
  }

  input.focus();
})(window.Data);