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

		for (i = 0; i < 2; i++) {
			var fields = ['.starting-items','.final-items'];
			$(fields[i] + ' .items').each(function () {
				var header = getTitle(i);
				var items = [];

				$(this).children('.image-wrapper').each(function () {
					var item_url = $('img', this).attr('src');
					var item = stripURL(item_url);
					items.push(item);
				});
				var ITEM_BLOCK = {
					header: header,
					items: items
				};
				BLOCKS.items.push(ITEM_BLOCK);
			});
		}

		for (i = 0; i < 3; i++) {
			var fields = ['.item-options-1','.item-options-2','.item-options-3'];
			$(fields[i]).each(function () {
				var header = getTitle(i + 2);
				var items = [];
				$(this).find('img').each(function () {
					var item = stripURL($(this).attr('src'));
					items.push(item);
				});
				var ITEM_BLOCK = {
					header: header,
					items: items
				};
				BLOCKS.items.push(ITEM_BLOCK);
			});
		}

        response(BLOCKS);
    }
});

function stripURL(text) {
	var output;
	output = text.substring(text.lastIndexOf('/') + 1).split('.png')[0];
	return output;
}

function getTitle(index) {
	var title;
	switch(index) {
		case 0:
			title = "Starting Build";
			break;
		case 1:
			title = "Core Build";
			break;
		case 2:
			title = "Fourth Item Options";
			break;
		case 3:
			title = "Fifth Item Options";
			break;
		case 4:
			title = "Sixth Item Options";
			break;
		default:
			title = "Undefined - Contact Developer";
			break;
	}
	return title;
}