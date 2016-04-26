/*
*	Mobafire
*/
var mobafireTable;

loadMobafiretable(function () {       
	chrome.runtime.sendMessage({
	    from:    'content',
	    subject: 'showPageAction'
	});

	chrome.runtime.onMessage.addListener(function(msg, sender, response) {
	    if ((msg.from === 'popup') && (msg.subject === 'guide')) {
			var BLOCKS = {
				title: null,
				items: [],
			};

			var title = $('.build-box:visible .build-title h2').text();
			BLOCKS.title = title;

			$('.build-box:visible .item-wrap').each(function (index) {
				var header = $('h2', this).text().trim();
				var items = [];
				$('.main-items', this).each(function (itemIndex) {
					var id = $('a', this).attr('href');
					id = mobafireTable[stripURL(id)];
					if (id) {
						items.push(id);
					}
				});
				var ITEM_BLOCK = {
					header: header,
					items: items
				};
				BLOCKS.items.push(ITEM_BLOCK);
			});
	        response(BLOCKS);
	    }
	});
})


function loadMobafiretable(callback) {
	$.getJSON(chrome.extension.getURL('./scripts/tables/mobafire.json'), function (data) {
		mobafireTable = data;
		callback();
	});
}
function stripURL(text) {
	var output;
	output = text.substring(text.lastIndexOf('/') + 1);
	output = output.substring(output.lastIndexOf('-') + 1);
	return output;
}