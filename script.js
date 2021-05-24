$(function () {

    $('img').draggable({
        containment: '.block',
        revert: 'invalid'
    });

    $('.img').droppable({
        drop: function (ev, ui) {
            let dropped = ui.draggable;
            let droppedOn = $(this)
            $(droppedOn).droppable('disable');
            $(dropped).parent().droppable('enable')
            $(dropped).detach().css({
                top: 0,
                left: 0
            }).appendTo(droppedOn)
        }
    })

    let images = $('.left-block  img');
    let arr = [];
    for (let i = 0; i < images.length; i++) {
        arr.push(i);
        let leftBlock = $('.left-block');
        let divs = leftBlock.children();
        while (divs.length) {
            leftBlock.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
        }

    }
    $('.left-block').one('mousedown', () => {
        timer();
        $('.btn1').prop('disabled', true).css('background', '#e26d6d');
        $('.btn2').prop('disabled', false).css('background', 'red');

    })
    let interval;
    function timer() {
        let sec = 60;
        interval = setInterval(() => {
            $('.min').text('00');
            if (sec == 60) {
                sec = 60;
            }
            sec--;
            if (sec < 10) sec = '0' + sec;
            $('.sec').text(`${sec}`);
            $('h3').text(`You still have time, you sure?  00:${sec}`);

            if (sec == 0) {
                $('.sec').text('00');
                $('.min').text('00');
                $('.modal').show();
                $('h3').text('It`s a pity, but you lost');
                $('.btn2').prop('disabled', 'true').css('background', '#e26d6d')
                $('.check').hide();
                $('.btn2').prop('disabled', true).css('background', '#e26d6d');
                $('.close').click(function () {
                    clearInterval(interval)
                })
                clearInterval(interval)
            }
        }, 1000)

    }

    $('.btn1').click(function () {
        timer();
        $('.btn1').prop('disabled', true).css('background', '#e26d6d')
        $('.left-block').off('mousedown');
        $('.btn2').prop('disabled', false).css('background', 'red');
    })

    $('.btn2').click(function () {
        $('.modal').show();
        $('.btn2').prop('disabled', 'true').css('background', '#e26d6d');
        $('.cc').show()

    })
    $('.close').click(function () {
        $('.modal').slideUp();
        $('.btn2').prop('disabled', false).css('background', 'red');
    })
    let lbock;
    let rbock;
    let check = true;
    $('.check').on('click', function () {
        $('.modal').hide();
        rbock = []
        for (let i = 0; i < $('.right-block  img').length; i++) {
            let a = i;
            rbock.push(a)

            if (rbock[i] == arr[i] && rbock.length == arr.length) {
                $('h3').text(`Woohoo, well done, you did it!`).css('color', 'rgb(59, 5, 5)')
                $('.modal').slideDown(2000);
                clearInterval(interval);
                $('.check').hide();
                setInterval(() => {
                    let r = Math.round(Math.random() * 255);
                    let g = Math.round(Math.random() * 255);
                    let b = Math.round(Math.random() * 255);
                    $('body').css('background', `rgb(${r},${g},${b})`)
                }, 1000);
                $('.y').fadeIn().animate({
                    top: '160px'
                },2000,'easeInOutElastic');
                $('.r').fadeIn().animate({
                    top: '160px'
                },2500,'easeOutBounce');
                $('.a').fadeIn().animate({
                    top: '160px'
                },3000,'easeInOutBounce')
                $('.block').fadeOut(1000,()=>{
                    $('.modal').fadeOut(5000)
                })
            } else {
                $('h3').text(`It's a pity, but you lost`);
                $('.modal').slideDown(1000);
                clearInterval(interval);
                $('.check').hide();
                $('.close').click(function () {
                    $('.btn2').prop('disabled', true).css('background', '#e26d6d');
                })
            }
        }
    })

    $('.btn3').click(() => {
        location.reload()
    })


})
