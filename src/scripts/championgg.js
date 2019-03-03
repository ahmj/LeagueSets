/*
*	CHAMPION.GG
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
		var title = stripURL($('.champ-img').attr('src')) + " - CHAMPION.GG";
		BLOCKS.title = title;

		$('.build-wrapper').each(function (index) {
			var header = getTitle(index);
			var items = [];
			$(this).children('a').each(function () {
				var item = $('img', this).attr('data-id');
				items.push(item);
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


function stripURL(text) {
	var output;
	text = text.split('#').pop().split('?').pop();
	output = text.substring(text.lastIndexOf('/') + 1).split('.png')[0];
	return output;
}

function getTitle(index) {
	var title;
	switch(index) {
		case 0:
			title = "Most Frequent Core Build";
			break;
		case 1:
			title = "Highest Win % Core Build";
			break;
		case 2:
			title = "Most Frequent Starters";
			break;
		case 3:
			title = "Highest Win % Starters";
			break;
		default:
			title = "Undefined - Contact Developer";
			break;
	}
	return title;
}