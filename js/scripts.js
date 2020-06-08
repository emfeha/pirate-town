$(document).ready(function () {
    var names = ['Blum', 'Micro', 'Agro', 'Barataria', 'Deadwood'];
    var buildings = ['normal', 'alt'];
    var bonuses = ['b1', 'b2', 'b1 b2', ''];
    var flags = ['UK', 'US'];
    var element = $("#html-content-holder"); // global variable
    var getCanvas; // global variable

    $('#randomize').on('click', function randomize() {
        $('h1').text(names[Math.floor(Math.random() * names.length)]);
        $('.building').each(function (index, element) {

            $(element).removeClass('alt b1 b2').addClass(buildings[Math.floor(Math.random() * buildings.length)]).addClass(bonuses[Math.floor(Math.random() * bonuses.length)]);
        });
        $('i.flag').each(function (index, element) {

            $(element).removeClass('UK US').addClass(flags[Math.floor(Math.random() * flags.length)]);
        });
    })

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
        $('.flag').removeClass('UK US').addClass($(this).data('type'));
    });

    $('input[type=checkbox]').on('click', function () {
        var t = $(this),
            mission = t.data('mission'),
            type = t.data('type');

        $('.' + mission).toggleClass(type);
        calcScore()
    });

    function calcScore() {
        let total = 0,
            rank = "Smuggler";

        $('.checkbox-mission').each(function(){
            if($(this).prop('checked') === true) {
                total += 5;
            } else {
                total  += 3;
            }
        });

        $('.checkbox-bonus').each(function(){
            if($(this).prop('checked') === true) {
                total += 1;
            }
        });

        if(total > 39)
            rank = 'Pirate';

        if (total > 59)
            rank = 'Legend';

        $('.score span').text(total + ' (' + rank + ')');
    }


});
