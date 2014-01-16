(function(Data){
  'use strict';

  var input = document.getElementById('ac');
  var resultsEl = document.getElementById('results');
  var instructionsEl = document.getElementById('instructions');
  var allokEl = document.getElementById('allok');

  allokEl.style.display = 'none';
  instructionsEl.style.display = 'none';

  input.addEventListener('input', function oninput(e) {
    allokEl.style.display = 'none';
    instructionsEl.style.display = 'none';


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
        allokEl.style.display = 'none';
      } else {
        allokEl.style.display = 'block';
      }
    } else {
      instructionsEl.style.display = 'block';
      allokEl.style.display = 'none';
    }
  });

  function clearResults() {
    resultsEl.innerHTML = '';
  }

  function addResult(item) {
    var li = document.createElement('li');

    var icon = document.createElement('span');
    icon.textContent = '⊘';
    icon.className = 'icon';
    li.appendChild(icon);

    var label = document.createElement('span');
    label.textContent = '⊘';
    label.textContent = item;
    li.appendChild(label);

    resultsEl.appendChild(li);
  }

  input.focus();
})(window.Data);