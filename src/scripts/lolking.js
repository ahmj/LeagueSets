/*
*	LOLKING 
*/
chrome.runtime.sendMessage({
    from:    'content',
    subject: 'showPageAction'
});

chrome.runtime.onMessage.addListener(function(msg, sender, response) {
    if ((msg.from === 'popup') && (msg.subject === 'guide')) {
		var LOLKING_HEADERS = {
			0: "Starting Items",
			1: "Core Items",
			2: "Situational Items"
		};
		var BLOCKS = {
			title: null,
			items: [],
		};
		var title = $('#guide-title').text();
		BLOCKS.title = title;
		$('#items .section-content').children('.item-groups').each(function (index) {
			$(this).children('li').each(function (groupIndex) {
				var text = $("div span", this).text();
				var items = [];
				$('.items', this).children('li').each(function (itemIndex){
					var id = $('a', this).attr('href').replace('/items/', '');
					items.push(id);
				});
				var ITEM_BLOCK = {
					header: LOLKING_HEADERS[index] + ": " +text,
					items: items
				};
				BLOCKS.items.push(ITEM_BLOCK);
			});
		});
        response(BLOCKS);
    }
});