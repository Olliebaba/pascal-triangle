// returns an object literal of css property/value sets with 
// major rendering engine prefixes
function prefixedCSS(prop, val) {
    var s = '',
        o = {},
        p = ['-webkit-', '-moz-', "-ms-", '-o-', ''];
    for (var i = 0; i < p.length; i++) {
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
function pascals(n) {
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
}

function printPascals(t) {
    $('.pascal-container > div > ul').detach();
    $('.pascal-container').attr('data-num-rows',t.length);
    for (var i = 0; i < t.length; i++) {
        var pascalRow = $('<ul></ul>').addClass('row').attr('data-row', (i + 1) ).css('animation-delay',('.0'+ (i * 2) +'s'));
        for (var e = 0; e < t[i].length; e++) {
            pascalRow.append( $('<li></li>').attr('data-int', (t[i][e]+1)%2).attr('data-index', (e + 1)).html(t[i][e])); 
        }
        $('.pascal-container > div').append(pascalRow);
    }  
    bindMouse();
}

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
    return ( r * 64); // reconfigure ? dynamically get width instead
}

// measures FullWidth to Relative width
// body vs triangle in this case
function getRatio(fw, rw) {
    var n = (fw * 100) / rw
    return n.toFixed(5);
}

function scaleTriangleToSize(nr) {
    var bodyWidth = $('body').width(),
        bodyHeight = $('body').height(),
        rowWidth = getRowWidth(nr),
        wrb = getRatio(rowWidth,bodyWidth), // relative to the body
        wrr = getRatio(bodyWidth,rowWidth); // relative to the row

    (bodyWidth >= bodyHeight) ? scaleByHeight() : scaleByWidth()

    function scaleByWidth() {
        
        for (var i = 1; wrr > 1; i++) { // reconfigure ? better way to achieve
            wrr = wrr / 10;
        }
        
        if (wrb > 100) {
            $('.pascal-container').width(rowWidth).css('margin-left', (-(rowWidth - bodyWidth) / 2)+'px');
            $('.pascal-container > div').css(prefixedCSS('transform','scale(' + wrr + ')'));
        } else {
            $('.pascal-container').removeAttr('style');
            $('.pascal-container > div').removeAttr('style');
        }
    }

    function scaleByHeight() {
        var dh = bodyHeight - $('.heading').height(),
            th = triangleHeight(nr),
            hrb = getRatio(th,dh),
            hrt = getRatio(dh,th);
        
        for (var i = 1; hrt > 1; i++) { // reconfigure ? better way to achieve
            hrt = hrt / 10;
        }
        
        if (hrb > 100) {
            if (wrb > 100) {
                $('.pascal-container').width(rowWidth).css('margin-left', (-(rowWidth - bodyWidth) / 2)+'px');
            }
        $('.pascal-container > div').css(prefixedCSS('transform','scale(' + hrt + ')'));
        } else {
            $('.pascal-container').removeAttr('style');
            $('.pascal-container > div').removeAttr('style');
        }
    }
}



function bindMouse(){
    $('.row li').on('mouseover',function(e){
        $('#info-panel').show();

        $('.row li').mousemove(function(){
            mouseX = e.pageX + 32; 
            mouseY = e.pageY - 32;
            $me = $(this);
            $('#info-panel .cell-value').html($me.html());
            $('#info-panel .cell-row').html($me.parent().attr('data-row'));
            $('#info-panel .cell-index').html($me.attr('data-index'));
            $('#info-panel').css('top',mouseY).css('left',mouseX);
        });

        }).on('mouseleave',function(e){
        $('#info-panel').hide();

        $('#info-panel').removeAttr('style');
    }); 
}

// generating a default set and scaling if necessary
scaleTriangleToSize($('#row-num').attr('placeholder'))
printPascals(pascals($('#row-num').attr('placeholder')));
bindMouse();