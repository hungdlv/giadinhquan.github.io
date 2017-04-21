    
var Screen = function () { return { width: $(window).width(), height: $(window).height() }; } 
$(document).ready(function(){       
    var videos = document.getElementsByTagName("video");
    for(var i=0; i< videos.length; i++){
        videos[i].setAttribute('height', 90*Screen().height/100);
        videos[i].setAttribute('width', 90*Screen().width/100);
    }

    $('#video1').videoExtend({
        logo: '11042017/v1/assets/logo-150x29.png',
        logoLink: 'http://giadinhquan.com/',
        logoSize: [ 150, 29 ],
        logoPosition: [ 'auto', 10, 50, 'auto' ] // top, right, bottom, left
    });
    $('#video2').videoExtend({
        logo: '11042017/v1/assets/logo-150x29.png',
        logoLink: 'http://giadinhquan.com/',
        logoSize: [ 150, 29 ],
        logoPosition: [ 'auto', 10, 50, 'auto' ] // top, right, bottom, left
    });
});