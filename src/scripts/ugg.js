/*
*	U.GG
*/
chrome.runtime.sendMessage({
    from:    'content',
    subject: 'showPageAction'
});

chrome.runtime.onMessage.addListener(function(msg, sender, response) {
    if ((msg.from === 'popup') && (msg.subject === 'guide')) {

		var BLOCKS = {
			title: null, 
			items: []
		};
		var title = stripURL($('.champion-image').attr('src')) + " - U.GG";
		BLOCKS.title = title;

		for (i = 0; i < 5; i++) {
			var fields = ['div.starting-items','div.final-items','div.item-options-1','div.item-options-2','div.item-options-3'];
			var header = $(fields[i] + ' h2').text();
			var items = [];

			$(fields[i] + ' img').each(function () {
				var item_url = $(this).attr('src');
				var item = stripURL(item_url);
				items.push(item);
			});

			var ITEM_BLOCK = {
				header: header,
				items: items
			};
			BLOCKS.items.push(ITEM_BLOCK);
		}

        response(BLOCKS);
    }
});

function stripURL(text) {
	var output;
	output = text.substring(text.lastIndexOf('/') + 1).split('.png')[0];
	return output;
}