var pascals = function(n) {
  var lastRow, myTriangle = [];
  
  // loops as many rows we have
  for (var i = 0; i < n; i++) {
    
    // loops as many indexes are 
    // on this current row
    var currentRow = [];
    for (var e = 0; e <= i; e++) {

      if (e == 0 || e == i) {
        currentRow.push(1);

        if (e == i) {
          myTriangle.push(currentRow);
        }

      } else {
        currentRow[e] = lastRow[e - 1] + lastRow[e];
      }
    }
    lastRow = currentRow;
  }
  return myTriangle;
};

var printPascals = function(t) {
  $s = "";
  
  for (var i = 0; i < t.length; i++) {
    $s += ('<ul class="row" data-row="' + (i + 1) + '">');
    for (var e = 0; e < t[i].length; e++) {
      $s += ('<li>' + t[i][e] + '</li>');
    }
    $s += ('</ul>');
  }
  $('.pascal-container').html($s);
  $('.pascal-container').attr('data-num-rows',t.length);
};

printPascals(pascals(5));

$('#row-num').on('input', function(){
    printPascals(pascals($('#row-num').val()));
});
