$(document).ready(function () {
    var element = $("#html-content-holder"); // global variable
    var getCanvas; // global variable

    $('input[type=radio]').on('click', function () {
        $('.'+$(this).attr('name')).addClass('d-none');
        $('.'+$(this).attr('id')).removeClass('d-none');
        calcScore()
    });

    function calcScore() {
        let total = 0,
            rank = "Smuggler";

        $('input[type=radio]').each(function(){
            if($(this).prop('checked') === true) {
                console.log($(this).data('score'));
                total += $(this).data('score');
            }
        });

        if(total > 16)
            rank = 'Pirate';

        if (total > 19)
            rank = 'Legend';

        $('.score .value').text(total + ' (' + rank + ')');
    }

    $('#download').on('click', function () {
        html2canvas(document.querySelector("#canvas")).then(canvas => {
            let image = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
            let link = document.createElement('a');
            link.download = "ratuga_bay.png";
            link.href = image;
            link.click();
        });
    });


});
