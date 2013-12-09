/**
*
* @package Advanced BBCode Box 3.1
* @copyright (c) 2013 Matt Friedman
* @license http://opensource.org/licenses/gpl-2.0.php GNU General Public License v2
*
*/
;(function ($, window, document){

	/**
	* BBvideo function
	*/
	$.fn.bbvideo = function (options) {

		var settings = $.extend({
			width: 560,
			height: 340
		}, options);

		var bbvideos = [
			{
				"site" : "5min.com",
				"type" : "flash",
				"regex": /http:\/\/(?:.*)?5min.com\/Video\/(?:.*)-([0-9]+)/i,
				"embed": ['http://embed.5min.com/$1/']
			},
			{
				"site" : "allocine.fr",
				"regex": /http:\/\/www.allocine.fr\/video\/player_gen_cmedia=(\d+)?([^[]*)?/i,
				"embed": '<iframe src="http://www.allocine.fr/_video/iblogvision.aspx?cmedia=$1" style="width:{WIDTH}px; height:{HEIGHT}px" frameborder="0"></iframe>'
			},
			{
				"site" : "on.aol.com",
				"type" : "ogp",
				"regex": /http:\/\/on.aol.com\/video\/(?:.*)-([0-9]+)/i
			},
			{
				"site" : "blip.tv",
				"type" : 'oembed',
				"regex": /http:\/\/(.*?)blip.tv\/([^[]*)?/i,
				"embed": 'http://blip.tv/oembed/?url=$&&format=json'
			},
			{
				"site" : "break.com",
				"regex": /http:\/\/(.*?)break.com\/([^[]*)?-([0-9]+)?([^[]*)?/i,
				"embed": '<iframe scrolling="no" marginheight="0" marginwidth="0" width="{WIDTH}" height="{HEIGHT}" frameborder="0" src="http://www.break.com/embed/$3" allowfullscreen ></iframe>'
			},
			{
				"site" : "clipfish.de",
				"type" : "flash",
				"regex": /http:\/\/www.clipfish.de\/video\/([0-9]+)([^[]*)?/i,
				"embed": ['http://www.clipfish.de/cfng/flash/clipfish_player_3.swf?as=0&amp;vid=$1']
			},
			{
				"site" : "clipmoon.com",
				"type" : "flash",
				"regex": /http:\/\/www.clipmoon.com\/(.*?)\/(([0-9A-Za-z-_]+)([0-9A-Za-z-_]{2}))\/([^[]*)/i,
				"embed": ['http://www.clipmoon.com/flvplayer.swf?config=http://www.clipmoon.com/flvplayer.php?viewkey=$2&amp;external=yes&amp;vimg=http://www.clipmoon.com/thumb/$3.jpg']
			},
			{
				"site" : "cnbc.com",
				"type" : "flash",
				"regex": /http:\/\/.*\.cnbc.com\/[^?]+\?video=(\d+)?([^[]+)?/i,
				"embed": ['http://plus.cnbc.com/rssvideosearch/action/player/id/$1/code/cnbcplayershare']
			},
			{
				"site" : "cnettv.cnet.com",
				"type" : "flash",
				"regex": /http:\/\/cnettv\.cnet\.com\/[a-z0-9\-]*\/[0-9]{4}-[0-9]_[0-9]{2}-([0-9]{5,9})\.html/i,
				"embed": ['http://www.cnet.com/av/video/embed/player.swf', 'playerType=embedded&amp;type=id&amp;value=$1']
			},
			{
				"site" : "colbertnation.com",
				"regex": /http:\/\/(?:.*?)colbertnation.com\/the-colbert-report-videos\/([0-9]+)\/([^[]*)?/i,
				"embed": '<iframe src="http://media.mtvnservices.com/embed/mgid:cms:video:colbertnation.com:$1" width="{WIDTH}" height="{HEIGHT}" frameborder="0"></iframe>'
			},
			{
				"site" : "collegehumor.com",
				"regex": /http:\/\/www.collegehumor.com\/video\/([0-9]+)\/([^[]*)/i,
				"embed": '<iframe src="http://www.collegehumor.com/e/$1" width="{WIDTH}" height="{HEIGHT}" frameborder="0" webkitAllowFullScreen allowFullScreen></iframe>'
			},
			{
				"site" : "comedycentral.com",
				"type" : "ogp",
				"regex": /http:\/\/(?:.*?)comedycentral.com\/video-clips\/([^[]*)?/i
			},
			{
				"site" : "crackle.com",	
				"type" : "flash",
				"regex": /http:\/\/((.*?)?)crackle.com\/(.*?)\/(.*?)\/(.*?)\/([0-9]+)?([^[]*)?/i,
				"embed": ['http://www.crackle.com/p/$4/$5.swf', 'id=$6&amp;mu=0&amp;ap=0']
			},
			{
				"site" : "dailymotion.com",
				"regex": /http:\/\/(?:.*?)dailymotion.com(?:.*?)\/video\/(([^[_]*)?([^[]*)?)?/i,
				"embed": '<iframe frameborder="0" width="{WIDTH}" height="{HEIGHT}" src="http://www.dailymotion.com/embed/video/$2"></iframe>'
			},
			{
				"site" : "dotsub.com",
				"regex": /http:\/\/dotsub.com\/view\/(.*)/i,
				"embed": '<iframe src="http://dotsub.com/media/$1/embed/" frameborder="0" width="{WIDTH}" height="{HEIGHT}"></iframe>'
			},
			{
				"site" : "ebaumsworld.com",
				"regex": /http:\/\/(.*?)ebaumsworld.com\/video\/watch\/(.*?)\//i,
				"embed": '<iframe src="http://www.ebaumsworld.com/media/embed/$2" width="{WIDTH}" height="{HEIGHT}" frameborder="0"></iframe>'
			},
			{
				"site" : "facebook.com",
				"regex": /https?:\/\/www.facebook.com\/(?:.*)(video|photo).php\?v=([0-9A-Za-z-_]+)?(?:[^[]*)?/i,
				"embed": '<iframe src="https://www.facebook.com/video/embed?video_id=$2" width="{WIDTH}" height="{HEIGHT}" frameborder="0"></iframe>'
			},
			{
				"site" : "flickr.com",
				"type" : 'oembed',
				"regex": /http:\/\/((.*?)?)flickr.com\/(.*?)\/(.*?)\/([0-9]+)([^[]*)?/i,
				"embed": 'http://flickr.com/services/oembed/?url=$&&format=json&jsoncallback=?'
			},
			{
				"site" : "funnyordie.com",
				"regex": /http:\/\/(?:.*?)funnyordie.com\/(.*?)\/(.*?)\/(?:[^[]*)?/i,
				"embed": '<iframe src="http://www.funnyordie.com/embed/$2" width="{WIDTH}" height="{HEIGHT}" frameborder="0"></iframe>'
			},
			{
				"site" : "g4tv.com",
				"type" : "flash",
				"regex": /http:\/\/(?:www\.)?g4tv.com\/(.*?videos)\/([0-9]+)\/([^[]*)?/i,
				"embed": ['http://www.g4tv.com/lv3/$2']
			},
			{
				"site" : "gameprotv.com",
				"type" : "flash",
				"regex": /http:\/\/www.gameprotv.com\/(.*)-video-([0-9]+)?.([^[]*)?/i,
				"embed": ['http://www.gameprotv.com/player-viral.swf', 'file=http%3A%2F%2Fvideos.gameprotv.com%2Fvideos%2F$2.flv&amp;linktarget=_self&amp;image=http%3A%2F%2Fvideos.gameprotv.com%2Fvideos%2F$2.jpg&amp;plugins=adtonomy,viral-1']
			},
			{
				"site" : "gamespot.com",
				"regex": /http:\/\/www.gamespot.com.*?(\d{7}?)([^[]*)?/i,
				"embed": '<iframe width="640" height="360" src="http://www.gamespot.com/videoembed/$1&amp;mapp=false&amp;ads=0&amp;onsite=0" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'
			},
			{
				"site" : "gametrailers.com",
				"type" : "ogp",
				"regex": /http:\/\/www.gametrailers.com\/(?:user\-movie|player|video|videos)\/([\w\-]+)\/([\w\-]+).*/i
			},
			{
				"site" : "gamevideos.1up.com",
				"type" : "flash",
				"regex": /http:\/\/(?:www.)?gamevideos(?:.*?).com\/video\/id\/([^[]*)?/i,
				"embed": ['http://gamevideos.1up.com/swf/gamevideos12.swf?embedded=1&amp;fullscreen=1&amp;autoplay=0&amp;src=http://gamevideos.1up.com/do/videoListXML%3Fid%3D$1%26adPlay%3Dfalse']
			},
			{
				"site" : "godtube.com",
				"regex": /http:\/\/www.godtube.com\/watch\/\?v=([^[]*)?/i,
				"embed": '<iframe width="{WIDTH}" height="{HEIGHT}" frameborder="0" scrolling="no" src="http://www.godtube.com/embed/watch/$1/?w={WIDTH}&h={HEIGHT}&ap=false&sl=true&title=true&dp=true"></iframe>'
			},
			{
				"site" : "howcast.com",
				"type" : "flash",
				"regex": /http:\/\/(.*?)howcast.com\/videos\/([0-9]+)?-([^[]*)?/i,
				"embed": ['http://www.howcast.com/flash/howcast_player.swf?file=$2']
			},
			{
				"site" : "hulu.com",
				"type" : 'oembed',
				"regex": /http:\/\/(.*?)hulu.com\/([^[]*)?/i,
				"embed": 'http://www.hulu.com/api/oembed?url=$&&format=json'
			},
			{
				"site" : "ign.com",
				"regex": /http:\/\/(.*?)ign\.com\/videos\/([0-9]+)\/([0-9]+)\/([0-9]+)\/([^?]*)?([^[]*)?/i,
				"embed": '<iframe src="http://widgets.ign.com/video/embed/content.html?url=$&" width="{WIDTH}" height="{HEIGHT}" scrolling="no" frameborder="0" allowfullscreen></iframe>'
			},
			{
				"site" : "liveleak.com",
				"regex": /http:\/\/www.liveleak.com\/view\?i=([0-9A-Za-z-_]+)?(\&[^\/]+)?/i,
				"embed": '<iframe width="{WIDTH}" height="{HEIGHT}" src="http://www.liveleak.com/ll_embed?f=$1" frameborder="0" allowfullscreen></iframe>'
			},
			{
				"site" : "metacafe.com",
				"regex": /http:\/\/www.metacafe.com\/watch\/([0-9]+)?((\/[^\/]+)\/?)?/i,
				"embed": '<iframe src="http://www.metacafe.com/embed/$1/" width="{WIDTH}" height="{HEIGHT}" allowFullScreen frameborder=0></iframe>'
			},
			{
				"site" : "moddb.com",
				"type" : "ogp",
				"regex": /http:\/\/www.moddb.com\/([^[]*)?/i
			},
			{
				"site" : "mpora.com",
				"regex": /http:\/\/(?:.*?)mpora.com\/(?:.*?)\/([^\/]+)?/i,
				"embed": '<iframe width="{WIDTH}" height="{HEIGHT}" src="http://mpora.com/videos/$1/embed" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'
			},
			{
				"site" : "msnbc.msn.com",
				"type" : "flash",
				"regex": /http:\/\/www.msnbc.msn.com\/id\/(\d+)?\/vp\/(\d+)?\#(\d+)?([^[]*)?/i,
				"embed": ['http://www.msnbc.msn.com/id/32545640', 'launch=$3&amp;width={WIDTH}&amp;height={HEIGHT}']
			},
			{
				"site" : "myspace.com",
				"regex": /http(s)?:\/\/(www.)?myspace.com\/.*\/video\/(.*)\/([0-9]+)?/i,
				"embed": '<iframe width="{WIDTH}" height="{HEIGHT}" src="http$1://myspace.com/play/video/$3-$4-$4" frameborder="0" allowtransparency="true" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
			},
			{
				"site" : "myvideo.de",
				"regex": /http:\/\/(.*?).myvideo.(.*?)\/(.*?)\/([^[]*)?/i,
				"embed": '<iframe src="http://$1.myvideo.$2/embed/$4" style="width:{WIDTH}px;height:{HEIGHT}px;border:0px none;padding:0;margin:0;" width="{WIDTH}" height="{HEIGHT}" frameborder="0" scrolling="no"></iframe>'
			},
			{
				"site" : "nbcnews.com",
				"type" : "flash",
				"regex": /http:\/\/www.nbcnews.com\/video\/.+?\/(\d+)\/#?(\d+)?/i,
				"embed": ['http://www.msnbc.msn.com/id/32545640', 'launch=$1&amp;width={WIDTH}&amp;height={HEIGHT}']
			},
			{
				"site" : "photobucket.com",
				"type" : "flash",
				"regex": /http:\/\/[a-z](.*?).photobucket.com\/(albums\/[^[]*\/([0-9A-Za-z-_ ]*)?)?([^[]*=)+?([^[]*)?/i,
				"embed": ['http://static.photobucket.com/player.swf?file=http://vid$1.photobucket.com/$2$5']
			},
// 			{
// 				"site" : "qik.com",
// 				"type" : "oembed",
// 				"regex": /http:\/\/(qik\.com\/video\/.*|qik\.ly\/.*)/i,
// 				"embed": 'http://qik.com/api/oembed.json?url=$&&format=json'
// 			},
// 			{
// 				"site" : "revision3.com",
// 				"type" : "ogp",
// 				"regex": /http:\/\/(.*revision3\.com\/.*)/i
// 			},
// 			{
// 				"site" : "testtube.com",
// 				"type" : "ogp",
// 				"regex": /http:\/\/(.*testtube\.com\/.*)/i
// 			},
			{
				"site" : "rutube.ru",
				"type" : 'ogp',
				"regex": /http:\/\/rutube.ru\/(.*?)\/([^[]*)?/i
			},
			{
				"site" : "sapo.pt",
				"regex": /http:\/\/(.*?)sapo.pt\/(.*\/)?([^[]*)?/i,
				"embed": '<iframe src="http://videos.sapo.pt/playhtml?file=http://rd3.videos.sapo.pt/$3/mov/1" frameborder="0" scrolling="no" width="{WIDTH}" height="{HEIGHT}"></iframe>'
			},
			{
				"site" : "screenr.com",
				"regex": /http:\/\/(?:.*?)\.screenr.com\/([^[]*)?/i,
				"embed": '<iframe src="http://www.screenr.com/embed/$1" width="{WIDTH}" height="{HEIGHT}" frameborder="0"></iframe>'
			},
			{
				"site" : "scribd.com",
				"regex": /http:\/\/(?:www\.)?scribd\.com\/(mobile\/documents|doc)\/(.*?)\/([^[]*)?/i,
				"embed": '<iframe class="scribd_iframe_embed" src="http://www.scribd.com/embeds/$2/content?start_page=1&view_mode=scroll" data-auto-height="false" data-aspect-ratio="undefined" scrolling="no" width="{WIDTH}" height="{HEIGHT}" frameborder="0"></iframe>'
			},
			{
				"site" : "sevenload.com",
				"regex": /http:\/\/(?:.*?)\.sevenload.com\/(?:.*?)(?:episodes|videos)\/(?:.*)-([^[]*)?/i,
				"embed": '<iframe src="http://embed.sevenload.com/widgets/singlePlayer/$1/?autoplay=false&env=slcom-ext" style="width:{WIDTH}px;height:{HEIGHT}px;overflow:hidden;border:0 solid #000;" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'
			},
			{
				"site" : "slideshare.net",
				"type" : 'oembed',
				"regex": /http:\/\/www.slideshare.net\/(.*?)\/([^[]*)?/i,
				"embed": 'http://www.slideshare.net/api/oembed/2?url=$&&format=json'
			},
			{
				"site" : "snotr.com",
				"regex": /http:\/\/(?:.*?)snotr.com\/video\/([0-9]+)\/.*/i,
				"embed": '<iframe src="http://www.snotr.com/embed/$1" width="{WIDTH}" height="{HEIGHT}" frameborder="0"></iframe>'
			},
			{
				"site" : "spike.com",
				"type" : "ogp",
				"regex": /http:\/\/www.spike.com\/([^[]*)?/i
			},
			{
				"site" : "streetfire.net",
				"type" : "ogp",
				"regex": /http:\/\/(.*?)streetfire.net\/video\/([^[]*)?/i
			},
			{
				"site" : "ted.com",
				"regex": /http:\/\/.*?ted.com\/talks\/([a-zA-Z0-9-_]+).html/i,
				"embed": '<iframe src="http://embed.ted.com/talks/$1.html" width="{WIDTH}" height="{HEIGHT}" frameborder="0" scrolling="no" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'
			},
			{
				"site" : "thedailyshow.com",
				"type" : "ogp",
				"regex": /http:\/\/(?:.*?)thedailyshow.com\/watch\/([^[]*)?/i
			},
			{
				"site" : "theonion.com",
				"regex": /http:\/\/((.*?)?)theonion.com\/([^,]+),([0-9]+)([^[]*)?/i,
				"embed": '<iframe frameborder="no" width="{WIDTH}" height="{HEIGHT}" scrolling="no" src="http://www.theonion.com/video_embed/?id=$4"></iframe>'
			},
// 			{
// 				"site" : "tu.tv",
// 				"type" : 'oembed',
// 				"regex": /http:\/\/((.*?)?)tu.tv\/videos\/([^[]*)?/i,
// 				"embed": 'http://tu.tv/oembed/?url=$&&format=json'
// 			},
// 			{
// 				"site" : "tu.tv",
// 				"type" : 'ogp',
// 				"regex": /http:\/\/((.*?)?)tu.tv\/videos\/([^[]*)?/i,
// 			},
			{
				"site" : "twitch.tv",
				"type" : "flash",
				"regex": /http:\/\/(.*?)twitch.tv\/([^[]*)?/i,
				"embed": ['http://www.twitch.tv/widgets/live_embed_player.swf?channel=$2', 'hostname=www.twitch.tv&amp;channel=$2&amp;auto_play=false&amp;start_volume=25']
			},
			{
				"site" : "twitvid.com",
				"regex": /http:\/\/twitvid.com\/([^[]*)?/i,
				"embed": '<iframe src="http://www.twitvid.com/embed.php?guid=$1&amp;autoplay=0" title="Twitvid video player" type="text/html" width="{WIDTH}" height="{HEIGHT}" frameborder="0"></iframe>'
			},
			{
				"site" : "ustream.tv",
				"regex": /http:\/\/(?:www\.)ustream\.tv\/(?:channel\/([0-9]{1,8}))/i,
				"embed": '<iframe width="{WIDTH}" height="{HEIGHT}" src="http://www.ustream.tv/embed/$1" scrolling="no" frameborder="0" style="border: 0px none transparent;">    </iframe>'
			},
			{
				"site" : "vbox7.com",
				"type" : "flash",
				"regex": /http:\/\/www.vbox7.com\/play:([^[]+)?/i,
				"embed": ['http://i47.vbox7.com/player/ext.swf?vid=$1']
			},
			{
				"site" : "veoh.com",
				"type" : "flash",
				"regex": /http:\/\/(.*?).veoh.com\/([0-9A-Za-z-_\-\/]+)?\/([0-9A-Za-z-_]+)/i,
				"embed": ['http://www.veoh.com/swf/webplayer/WebPlayer.swf?version=AFrontend.5.7.0.1361&amp;permalinkId=$3&amp;player=videodetailsembedded&amp;videoAutoPlay=0&amp;id=anonymous']
			},
			{
				"site" : "viddler.com",
				"regex": /http:\/\/(?:.*?).viddler.com\/v\/([0-9A-Za-z-_]+)([^[]*)?/i,
				"embed": '<iframe id="viddler-$1" src="//www.viddler.com/embed/$1/?f=1&autoplay=0&player=full&loop=false&nologo=false&hd=false" width="{WIDTH}" height="{HEIGHT}" frameborder="0" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>'
			},
			{
				"site" : "videogamer.com",
				"type" : "ogp",
				"regex": /http:\/\/www.videogamer.com\/([^[]*)?/i
			},
			{
				"site" : "videu.de",
				"type" : "flash",
				"regex": /http:\/\/www.videu.de\/video\/([^[]*)?/i,
				"embed": ['http://www.videu.de/flv/player2.swf?iid=$1']
			},
			{
				"site" : "vimeo.com",
				"regex": /https?:\/\/(?:.*?)vimeo.com(?:\/groups\/(?:.*)\/videos\/|\/)([^[]*)?/i,
				"embed": '<iframe src="http://player.vimeo.com/video/$1" width="{WIDTH}" height="{HEIGHT}" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'
			},
			{
				"site" : "vine.co",
				"regex": /https:\/\/vine\.co\/v\/([a-zA-Z0-9]{1,13})/i,
				"embed": '<iframe class="vine-embed" src="https://vine.co/v/$1/embed/simple" width="480" height="480" frameborder="0"></iframe>'
			},
			{
				"site" : "wat.tv",
				"type" : "ogp",
				"regex": /http:\/\/(.*?)wat.tv\/video\/([^[]*)?/i
			},
			{
				"site" : "wegame.com",
				"type" : "flash",
				"regex": /http:\/\/www.wegame.com\/watch\/(.*?)\/([^[]*)?/i,
				"embed": ['http://www.wegame.com/static/flash/player.swf?xmlrequest=http://www.wegame.com/player/video/$1&amp;embedPlayer=true', 'xmlrequest=http://www.wegame.com/player/video/$1&amp;embedPlayer=true']
			},
			{
				"site" : "xfire.com",
				"type" : "flash",
				"regex": /http:\/\/www.xfire.com\/video\/(.*?)\//i,
				"embed": ['http://media.xfire.com/swf/embedplayer.swf', 'videoid=$1']
			},
			{
				"site" : "screen.yahoo.com",
				"regex": /http:\/\/screen.yahoo.com\/((([^-]+)?-)*)([0-9]+).html/i,
				"embed": '<iframe width="{WIDTH}" height="{HEIGHT}" scrolling="no" frameborder="0" src="$&?format=embed&player_autoplay=false"></iframe>'
			},
			{
				"site" : "youku.com",
				"type" : "flash",
				"regex": /http:\/\/v.youku.com\/v_show\/id_(.*)\.html.*/i,
				"embed": ['http://player.youku.com/player.php/sid/$1/v.swf']
			},
			{
				"site" : "youtu.be",
				"regex": /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube\.com\S*[^\w\-\s])([\w\-]{11})(?=[^\w\-]|$)([^[]*)?/i,
				"embed": '<iframe width="{WIDTH}" height="{HEIGHT}" src="http://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>'
			},
			{
				"site" : "youtube.com",
				"regex": /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube\.com\S*[^\w\-\s])([\w\-]{11})(?=[^\w\-]|$)([^[]*)?/i,
				"embed": '<iframe width="{WIDTH}" height="{HEIGHT}" src="http://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>'
			}
		];

		/**
		* Perform an oEmbed request for an embed code
		*/
		function oembedRequest(el, url, dimensions) {
			$.getJSON(url + "&callback=?", function (data) {
				embedWrapper(el, data.html.replace(/width="([0-9]{1,4})"/gi, 'width="' + dimensions.width + '"').replace(/height="([0-9]{1,4})"/gi, 'height="' + dimensions.height + '"'));
			});
		}

		/**
		* Perform an OGP request for an embed code
		*/
		function ogpRequest(el, url, regex, dimensions) {
			if (url.match(regex)) {
				$.ajax({
					url: "http://query.yahooapis.com/v1/public/yql",
					dataType: "jsonp",
					data: {
						q: 'select * from html where url="' + url + '" and xpath="//meta" and compat="html5"',
						format: "json",
						env: "store://datatables.org/alltableswithkeys",
						callback: "?"
					},
					success: function (data) {
						var embedCode = '',
							meta = {};

						if (data.query.results !== null) {
							for (var i = 0, l = data.query.results.meta.length; i < l; i++) {
								var name = data.query.results.meta[i].name || data.query.results.meta[i].property || null;
								if (name === null) {
									continue;
								}
								meta[name] = data.query.results.meta[i].content;
							}

							if (meta["og:video"] || meta["og:video:url"]) {

								embedCode = $('<embed />')
									.attr("src", meta['og:video'] || meta['og:video:url'])
									.attr("type", meta["og:video:type"] || "application/x-shockwave-flash")
									.attr("width", dimensions.width || meta["og:video:width"])
									.attr("height", dimensions.height || meta["og:video:height"])
									.attr("allowfullscreen", "true")
									.attr("autostart", "false");
							}
						}
						embedWrapper(el, embedCode);
					}
				});
			}
		}

		/**
		* Construct and return a flash object embed code
		*/
		function flashCode(url, flashVars, dimensions) {
			return '<object width="' + dimensions.width + '" height="' + dimensions.height + '" type="application/x-shockwave-flash" data="' + url + '">' +
				'<param name="movie" value="' + url + '" />' +
				(flashVars !== undefined ? '<param name="flashvars" value="' + flashVars.replace(/&/g, '&amp;').replace(/{WIDTH}/g, dimensions.width).replace(/{HEIGHT}/g, dimensions.height) + '" />' : '') +
				'<param name="quality" value="high" />' +
				'<param name="allowFullScreen" value="true" />' +
				'<param name="allowScriptAccess" value="always" />' +
				'<param name="pluginspage" value="http://www.macromedia.com/go/getflashplayer" />' +
				'<param name="autoplay" value="false" />' +
				'<param name="autostart" value="false" />' +
				'<param name="wmode" value="transparent" />' +
				'</object>';
		}

		/**
		* Insert embed code, after the URL, wrapped in a div tag
		*/
		function embedWrapper(el, content) {
			el.after(content).wrap("<div />");
		}

		return this.each(function () {
			var el = $(this),
				url = el.attr("href"),
				dimensions = {
					width: settings.width,
					height: settings.height
				};

			if (el.data("bbvideo").length) {
				dimensions.width  = el.data("bbvideo").split(",")[0].trim() || settings.width;
				dimensions.height = el.data("bbvideo").split(",")[1].trim() || settings.height;
			}

			for (var i = 0, l = bbvideos.length; i < l; i++) {
				var regExp = new RegExp(bbvideos[i].site + '/', "i");
				if (regExp.test(url)) {

					switch (bbvideos[i].type) {
						case "flash":
							embedWrapper(el, url.replace(bbvideos[i].regex, flashCode(bbvideos[i].embed[0], bbvideos[i].embed[1], dimensions)));
						break;

						case "ogp":
							ogpRequest(el, url, bbvideos[i].regex, dimensions);
						break;

						case "oembed":
							oembedRequest(el, url.replace(bbvideos[i].regex, bbvideos[i].embed), dimensions);
						break;

						default:
							embedWrapper(el, url.replace(bbvideos[i].regex, bbvideos[i].embed.replace(/{WIDTH}/g, dimensions.width).replace(/{HEIGHT}/g, dimensions.height)));
						break;
					}

					break;
				}
			}
		});
	};

	/**
	* DOM READY
	*/
	$(document).ready(function () {

		/**
		* Attach bbvideo listener
		*/
		$(".bbvideo").bbvideo();

		/**
		* Function Fade-in fade-out text
		*/
		var elem = $(".fadeEffect");
		(function fadeText() {
			elem.fadeIn(1000)
				.delay(1000)
				.fadeOut(1000, fadeText);
		})();

		/**
		* Function spoiler toggle
		*/
		$(".spoilbtn").on("click", function () {
			var trigger = $(this),
				spoiler = trigger.closest("div").next(".spoilcontent");
			spoiler.slideToggle("fast", function () {
				trigger.html(spoiler.is(":visible") ? trigger.data("hide") : trigger.data("show"));
			});
		});

	});

})(jQuery, window, document);