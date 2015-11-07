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
  $('.pascal-container > div > ul').detach();
  $('.pascal-container').attr('data-num-rows',t.length);
  for (var i = 0; i < t.length; i++) {
    var pascalRow = $('<ul></ul>').addClass('row').attr('data-row', (i + 1) ).css('animation-delay',('.0'+ (i * 2) +'s'));
    for (var e = 0; e < t[i].length; e++) {
      pascalRow.append( $('<li></li>').attr('data-int', (t[i][e]+1)%2).html(t[i][e])); 
    }
    $('.pascal-container > div').append(pascalRow);
  }  
};

printPascals(pascals(10));

$('#row-num').on('input', function(){
    var myVal = $('#row-num').val();
    scaleTriangleToSize(myVal); 
    printPascals(pascals(myVal));
});
 


//
// returns rem font-size for page 
var rem = function rem() {
  var html = document.getElementsByTagName('html')[0];
  return function () {
    return parseInt(window.getComputedStyle(html)['fontSize']);
  }
}();

//calculates height of triangle
function triangleHeight(r) {
  var d = Math.abs(parseInt($('.row:first-child').css('margin-bottom'))),
      h = ($('.row:first-child li').height() - d);
  return (r * h) + d; 
}

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
    
    $('.pascal-container > div').css(prefixedCSS('transform','scale( .' + wrr + ')'));
  } else {
    $('.pascal-container').removeAttr('style');
    $('.pascal-container > div').removeAttr('style');
  }
}



// set css prefixes
function prefixedCSS(prop,val){
  var s='',
      o = {},
      p = ['-webkit-','-moz-',"-ms-",'-o-',''];
  
  for (var i=0; i<p.length; i++) {
    s = p[i] + prop;
    o[s] = val;
  }
  return o;
}