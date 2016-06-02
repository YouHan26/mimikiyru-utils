/**
 * Created by YouHan on 2016/6/2.
 */
(function () {
    var array = $('.carousel img');
    var len = array.length;
    var index = 0;
    var flag = false;

    $(array[0]).addClass('fadeIn');
    $(array[0]).addClass('move-bottom');

    setInterval(function () {
        var current = array[index++ % len];
        var next = array[index % len];

        $(current).removeClass('fadeIn');
        $(current).addClass('fadeOUt');
        setTimeout(function () {
            $(current).removeClass('move-bottom');
            $(current).removeClass('move-left');
        }, 1000);

        $(next).removeClass('fadeOUt');
        $(next).addClass('fadeIn');
        if (flag) {
            $(next).addClass('move-bottom');
        } else {
            $(next).addClass('move-left');
        }
        flag = !flag;
    }, 2500);
}());