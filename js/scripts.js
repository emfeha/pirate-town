$(document).ready(function () {
    var element = $("#html-content-holder"); // global variable
    var getCanvas; // global variable

    $("#btn-Convert-Html2Image").on('click', function () {
        html2canvas(element, {
            onrendered: function (canvas) {
                $("#previewImage").html(canvas);
                getCanvas = canvas;
            }
        });
        var imgageData = getCanvas.toDataURL("image/png");
        // Now browser starts downloading it instead of just showing it
        var newData = imgageData.replace(/^data:image\/png/, "data:application/octet-stream");
        var name = $('h1').text();
        $("#btn-Convert-Html2Image").attr("download", name + ".png").attr("href", newData);
    });


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


});
