/*
*	SOLOMID
*/
var soloMidTable;

loadSoloMidTable(function() {
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
			var title = $('.title h1').text();
			BLOCKS.title = title;

			// Starting Items
			$('#ItemBuild0 .item-block div').children('.the-build').each(function () {
				var header = $('.the-build-heading', this).text();
				var item_array = []
				$('div', this).children('.item').each(function () {
					var id = $('img', this).attr('src');
					id = soloMidTable[stripURL(id)];
					item_array.push(id);
				});
				BLOCKS.items.push(createBlock(header, item_array));
			});

			// Final Items
			var header = $('.final-block-items .the-build-heading').text();
			var item_array = [];
			$('#ItemBuild0 .final-block .final-block-items div').children('.item').each(function () {
				var id = $('img', this).attr('src');
				id = soloMidTable[stripURL(id)];
				item_array.push(id);
			});
			BLOCKS.items.push(createBlock(header, item_array));

			// Build Order
			var header = $('.the-build-final-order .the-build-heading').text();
			var item_array = [];
			$('.final-block-build div').children('img').each(function () {
				var isItem = $(this).attr('class') == null;
				if (isItem) {
					var id = $(this).attr('src');
					id = soloMidTable[stripURL(id)];
					item_array.push(id);
				}
			});
			BLOCKS.items.push(createBlock(header, item_array));

			//Situational Items
			var header = "Situational Items";
			var item_array = [];
			$('#chap6').parent().children('.spell-info').each(function () {
				var id = $('.spell img', this).attr('src');
				id = soloMidTable[stripURL(id)];
				item_array.push(id);
			});
			BLOCKS.items.push(createBlock(header, item_array));

	        response(BLOCKS);
	    }
	});
});

function createBlock(header, items) {
	var block = {
		header: header,
		items: items
	}
	return block;
}
function stripURL(text) {
	var output;
	output = text.substring(text.lastIndexOf('/') + 1);
	output = output.split('.png')[0];
	return output;
}

function loadSoloMidTable(callback) {
	$.getJSON(chrome.extension.getURL('./scripts/tables/solomid.json'), function (data) {
		soloMidTable = data;
		callback();
	});
}