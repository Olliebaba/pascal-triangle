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
    $s += ('<ul style="animation-delay: .0'+ (i * 2) +'s;" class="row" data-row="' + (i + 1) + '">');
    for (var e = 0; e < t[i].length; e++) {
      $s += ('<li data-int="' + (t[i][e]+1)%2 + '">' + t[i][e] + '</li>');
    }
    $s += ('</ul>');
  }
  $('.pascal-container > div').html($s);
  $('.pascal-container').attr('data-num-rows',t.length);
};

printPascals(pascals(5));

$('#row-num').on('input', function(){
    var myVal = $('#row-num').val();
    scaleTriangleToSize(myVal); 
    printPascals(pascals(myVal));
});
 


//
// This Function will always return the initial font-size of the html element 
var rem = function rem() {
  var html = document.getElementsByTagName('html')[0];
  return function () {
    return parseInt(window.getComputedStyle(html)['fontSize']);
  }
}();

// returns specified row's width
function getRowWidth(r) {
  return ( r * 64);
}

// measures FullWidth to Relative width
// body vs triangle in this case
function widthRatio(fw, rw) {
  return (fw * 100) / rw;
}

function scaleTriangleToSize(nr) {
  var rowWidth = getRowWidth(nr);
  var bodyWidth = $('body').width();
  var wrb = widthRatio(rowWidth,bodyWidth); // relative  to body
  var wrr = widthRatio(bodyWidth,rowWidth); // relative  to the row
  wrr = wrr.toString().split('.')[0];
  console.log (wrr);
  
  if (wrb > 100) {
    $('.pascal-container').width(rowWidth).css('margin-left', '-'+((rowWidth - bodyWidth) / 2)+'px');
    
    $('.pascal-container > div').css({
      '-webkit-transform' : 'scale( .' + wrr + ')',
      '-moz-transform'    : 'scale( .' + wrr + ')',
      '-ms-transform'     : 'scale( .' + wrr + ')',
      '-o-transform'      : 'scale( .' + wrr + ')',
      'transform'         : 'scale( .' + wrr + ')'
    });
  } else {
    $('.pascal-container').removeAttr('style');
    $('.pascal-container > div').removeAttr('style');
  }
}

// set css prefixes
function prefixedCSS(prop,val){
  var s = "",
      p = ['-webkit-','-moz-',"-ms-",'-o-',''],
      r = [];
  for (var i=0; i<p.length; i++) {
    r.push( p[i] + prop + ':' + val );
  }
  return r.join(",");
}

console.log(prefixedCSS('transform','thing'));








