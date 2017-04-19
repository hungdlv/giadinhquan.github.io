function checkValidate() {

    return true;
}

$(document).ready(function(){
    $('#form-body').css('height', Screen().height-130);
    $("#form-body").niceScroll();
    $('#btnBookTable').bind('click', function(){
        if (checkValidate()) {
                $.ajax({
                    url: "https://docs.google.com/forms/d/e/1FAIpQLSeG-73fcYNbxJKxGzmQSiqiS3yAz-GHU9nzx59Sqn6Z7uFoug/formResponse",
                    data: {
                        "entry.2118159519": $('#hoten').val(),
                        "entry.2007441357": $('#email').val(),
                        "entry.556224909": $('#dienthoai').val(),
                        "entry.184947972": '',
                        "entry.590184505": $('#ngayden').val(),
                        "entry.943314257": $('#soluong').val(),
                        "entry.198310774": $('#ghichu').val()
                    },
                    type: "POST",
                    dataType: "xml",
                    statusCode: {
                        0: function () {                    
                            alert('Thông tin đặt bàn đã được ghi nhận. Cảm ơn!!');
                            document.getElementById("frmBookTable").reset();
                        },
                        200: function () { 
                            alert('Thông tin đặt bàn đã được ghi nhận. Cảm ơn!!');
                            document.getElementById("frmBookTable").reset();
                        }
                    }
                });
            }
    });
});