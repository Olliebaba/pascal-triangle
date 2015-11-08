// returns an object literal of css property/value sets with 
// major rendering engine prefixes
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

// returns page's rem as px 
var rem = function rem() {
  var html = document.getElementsByTagName('html')[0];
  return function () {
    return parseInt(window.getComputedStyle(html)['fontSize']);
  }
}();

// returns 2d array of triangle values
// param is num rows on pascal triangle
var pascals = function(n) {
  var prevRow, myTriangle = [];
  for (var i = 0; i < n; i++) {
    var currentRow = [];
    for (var e = 0; e <= i; e++) {
      if (e == 0 || e == i) {
        currentRow.push(1);
        if (e == i) myTriangle.push(currentRow);
      } else {
        currentRow[e] = prevRow[e - 1] + prevRow[e];
      }
    }
    prevRow = currentRow;
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

// generating a default set and scaling if necessary
scaleTriangleToSize($('#row-num').attr('placeholder'))
printPascals(pascals($('#row-num').attr('placeholder')));

// creates and scales new triangle when input value is changed
$('#row-num').on('input', function(){
    var myVal = $('#row-num').val();
    scaleTriangleToSize(myVal); 
    printPascals(pascals(myVal));
});

//calculates height of triangle
function triangleHeight(r) {
  var d = Math.abs(parseInt($('.row:first-child').css('margin-bottom'))),
      h = ($('.row:first-child li').height() - d);
  return (r * h) + d; 
}

// returns specified row's width
function getRowWidth(r) {
  return ( r * 64); // dynamically get width instead?
}

// measures FullWidth to Relative width
// body vs triangle in this case
function getRatio(fw, rw) {
  return (fw * 100) / rw;
}

function scaleTriangleToSize(nr) {
  var bodyWidth = $('body').width(),
      bodyHeight = $('body').height(),
      rowWidth = getRowWidth(nr),
      wrb = getRatio(rowWidth,bodyWidth), // relative to the body
      wrr = getRatio(bodyWidth,rowWidth); // relative to the row
    wrr = wrr.toString().split('.')[0];
  
  (bodyWidth >= bodyHeight) ? scaleByHeight() : scaleByWidth()
  
  function scaleByWidth() {
    
    if (wrb > 100) {
      $('.pascal-container').width(rowWidth).css('margin-left', (-(rowWidth - bodyWidth) / 2)+'px');
      $('.pascal-container > div').css(prefixedCSS('transform','scale( .' + wrr + ')'));
    } else {
      $('.pascal-container').removeAttr('style');
      $('.pascal-container > div').removeAttr('style');
    }
  }
  
  function scaleByHeight() {
    var dh = bodyHeight - $('.heading').height(),
        th = triangleHeight(nr),
        hrb = parseInt(getRatio(th,dh)),
        hrt = parseInt(getRatio(dh,th));
    if (hrb > 100) {
      $('.pascal-container').width(rowWidth).css('margin-left', (-(rowWidth - bodyWidth) / 2)+'px');
      $('.pascal-container > div').css(prefixedCSS('transform','scale( .' + hrt + ')'));
    } else {
      $('.pascal-container').removeAttr('style');
      $('.pascal-container > div').removeAttr('style');
    }
  }
}



