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

			var title = $('.top__title:visible h2').text().trim();
			BLOCKS.title = title;

			$('.view-guide__items:visible').each(function (index) {
				var header = $('.view-guide__items__bar:visible span', this).text().trim();
				var items = [];
				$('.ajax-tooltip:visible', this).each(function (itemIndex) {
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
});

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