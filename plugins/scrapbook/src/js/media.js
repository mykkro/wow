// TODO rozeznavani 'media' podle pripony

var _audioPlayerIndex = 1;
var makeAudioPlayer = function(parent, media) {
    var id = _audioPlayerIndex++;
    var playerId = 'jquery_cplayer_'+id;
    var containerId = 'cp_container_'+id;
    var html = $.render.circlePlayer({playerId: playerId, containerId: containerId});
    var div = $("<div>").html(html);
    parent.append(div);
    // ensure that player div is at the root of body
    $("#"+playerId).appendTo($("body"));

	var myCirclePlayer = new CirclePlayer("#"+playerId, media, {
		cssSelectorAncestor: "#"+containerId
	});
    return div;
};

var _videoPlayerIndex = 1;
var makeVideoPlayer = function(parent, media) {
    var id = _videoPlayerIndex++;
    var playerId = 'jquery_jplayer_'+id;
    var containerId = 'jp_container_'+id;
    var html = $.render.videoPlayer({playerId: playerId, containerId: containerId});
    var div = $("<div>").html(html).appendTo(parent);
    $("#"+playerId).jPlayer({
        ready: function () {
          $(this).jPlayer("setMedia", media);
        },
        swfPath: "/js",
        supplied: "m4v, ogv",
        cssSelectorAncestor: "#"+containerId
    });    
    return div;
};
