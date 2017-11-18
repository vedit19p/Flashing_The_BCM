var task1 = function () {
    $('body').on('mousedown', '.positive-lead, .negative-lead', function () {
        $(this).addClass('open');
        var elem = $(this).attr('class');
        if (/positive-lead/i.test(elem)) {
            drawWire($('.positive-wire path'), {elem: $(this), posX: 65, posY: 15}, {elem: $('.battery-lead-connector'), posX: -6, posY: 10});
        }
        else if(/negative-lead/i.test(elem)) {
            drawWire($('.negative-wire path'), {elem: $(this), posX: 75, posY: 5}, {elem: $('.battery-lead-connector'), posX: -6, posY: 10});
        }
    });
    $('body').on('mouseup', '.positive-lead, .negative-lead', function () {
        $(this).removeClass('open');
        var elem = $(this).attr('class');
        if (/positive-lead/i.test(elem)) {
            drawWire($('.positive-wire path'), {elem: $(this), posX: 50, posY: 10}, {elem: $('.battery-lead-connector'), posX: -6, posY: 10});
        }
        else if(/negative-lead/i.test(elem)) {
            drawWire($('.negative-wire path'), {elem: $(this), posX: 50, posY: 10}, {elem: $('.battery-lead-connector'), posX: -6, posY: 10});
        }
    });

    $('.positive-lead, .negative-lead').draggable({
        drag: function(event, ui) {
            var elem = $(ui.helper).attr('class');
            if (/positive-lead/i.test(elem)) {
                drawWire($('.positive-wire path'), {elem: $(ui.helper), posX: 65, posY: 10}, {elem: $('.battery-lead-connector'), posX: -6, posY: 10});
            if(activity.hinting){
                $('.positive-lead .hint').removeClass('highlight');
                $('.positive-pin').addClass('highlight');
            }
            }
            else if(/negative-lead/i.test(elem)) {
                drawWire($('.negative-wire path'), {elem: $(ui.helper), posX: 75, posY: 0}, {elem: $('.battery-lead-connector'), posX: -6, posY: 10});
            if(activity.hinting){
                $('.positive-lead .hint').addClass('highlight');
                $('.positive-pin').removeClass('highlight');
            }
            }
        },
        revert: function(valid) {
            if(!valid) {
                task1Incorrect();
            }
        },
        cursorAt: {top: 20, left: 15},
        containment: 'parent'
    });

    $('.car-battery .positive-pin, .car-battery .negative-pin').droppable({
        //accept: '.positive-lead',
        tolerance: 'pointer',
        drop: function(event, ui) {
            var elem = $(ui.draggable).attr('class');
            var dropElem = $(this).attr('class');
            $(ui.draggable).addClass('open');
            if (/positive-lead/i.test(elem) && /positive-pin/i.test(dropElem)){
                drawWire($('.positive-wire path'), {elem: $(ui.draggable), posX: 75, posY: 0}, {elem: $('.battery-lead-connector'), posX: -6, posY: 20});
                task1Correct();
                $('.positive-lead').draggable('disable');
                task2();
            } else {
                task1Incorrect();
            }
        }
    });
};

var task2 = function () {

    $('.negative-lead').draggable({
        drag: function(event, ui) {
            var elem = $(ui.helper).attr('class');
            var dropElem = $(this).attr('class');
            if(/negative-lead/i.test(elem)) {
                drawWire($('.negative-wire path'), {elem: $(ui.helper), posX: 50, posY: 10}, {elem: $('.battery-lead-connector'), posX: -6, posY: 10});
            }
        },
        revert: function(valid) {
            if(!valid) {
                task2Incorrect();
            }
        },
        containment: 'parent'
    });

    $('.car-battery .negative-pin').droppable({
        accept: '.negative-lead',
        tolerance: 'pointer',
        drop: function(event, ui) {
            var elem = $(ui.draggable).attr('class');
            var dropElem = $(this).attr('class');
            $(ui.draggable).addClass('open');
            if(/negative-lead/i.test(elem) && /negative-pin/i.test(dropElem)) {
                drawWire($('.negative-wire path'), {elem: $(ui.draggable), posX: 60, posY: 10}, {elem: $('.battery-lead-connector'), posX: -6, posY: 20});
                $('.negative-lead').draggable('disable');
                task2Correct();
            } else {
                task2Incorrect();
            }
        }
    });
};

var task1Correct = function () {

    $('.positive-pin').removeClass('highlight');
    $('.positive-lead .hint').removeClass('highlight');
    activity.correctAnswer();
};
var task1Incorrect = function () {
    activity.incorrectAnswer();
    if (activity.hinting){
        $('.positive-pin').addClass('highlight');
    }
};

var task2Correct = function () {
    $('.negative-pin').removeClass('highlight');
    activity.correctAnswer();
};
var task2Incorrect = function () {
    activity.incorrectAnswer();
	if(activity.hinting){
        $('.negative-pin').addClass('highlight');
        //$('.negative-lead .hint').addClass('highlight');
    }
};

function drawWire(path, anchorA, anchorB, zoomRatio) {
    var endX = null;
    var endY = null;
    /** Redraw wire connection while scanner pin is being dragged **/
    zoomRatio = (zoomRatio || 1);
    var coords = path.attr('d');
    var coordsArr = coords.split(' ');

    var mainLeft = (path.parents('svg').offset().left || 0);
    var mainTop = (path.parents('svg').offset().top || 0);

    var startX = (anchorA.elem.offset().left - mainLeft) / zoomRatio;
    startX = startX + anchorA.elem.width() / 2;
    startX = startX + (anchorA.posX || 0);

    var startY = (anchorA.elem.offset().top - mainTop) / zoomRatio;
    startY = startY + anchorA.elem.height() - 2;
    startY = startY + (anchorA.posY || 0);

    if(anchorB) {
        endX = (anchorB.elem.offset().left - mainLeft) / zoomRatio;
        endX = endX + anchorB.elem.width() / 2;
        endX = endX + (anchorB.posX || 0);

        endY = (anchorB.elem.offset().top - mainLeft) / zoomRatio;
        endY = endY + anchorB.elem.width() / 2;
        endY = endY + (anchorB.posY || 0);
    } else {
        endX = parseInt(coordsArr[2].toString().split(',')[0]);
        endY = parseInt(coordsArr[2].toString().split(',')[1]);
    }

    path.attr("d", "M" + startX + "," + startY + " " + coordsArr[1] + " " + endX + "," + 162);
}

// var drawPath = function (path, anchorElem, offsetTop, offsetLeft) {
//     var coords = path.attr('d');
//     var coordsArr = coords.split(' ');
//     var posX = anchorElem.offset().left + (offsetLeft || 0);
//     var posY = anchorElem.offset().top + (offsetTop || 0);
//     var newCoords = 'M' + posX + '.5,' + posY + ' ' + coordsArr[1] + ' ' + coordsArr[2];
//     path.attr({d: newCoords});
// };

(function () {

    task1();

})($);
