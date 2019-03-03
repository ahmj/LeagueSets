/*
*	PROBUILDS
*/
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
		var temp_items_array = [];

		var title = $('title').text();
		BLOCKS.title = title;

		//Retrieving Buy Order Items
		$('#buy-order .buy-order li	').children('img').each(function (index) {
			var id = $(this).attr('data-id');
			if (id) {
				temp_items_array.push(id);
			} else {
				var block = createBlock(index,temp_items_array)
				temp_items_array = [];
				BLOCKS.items.push(block);
			}
		});
		var block = createBlock(-1, temp_items_array);
		BLOCKS.items.push(block);
		temp_items_array = [];

		//Retrieving Core Item Build
		$('.guide-items .left ul li span').children('img').each(function () {
			var id = $(this).attr('data-id');
			if (id) {
				temp_items_array.push(id);
			} else {
				var block = createBlock(1,temp_items_array)
				temp_items_array = [];
				BLOCKS.items.push(block);
			}
		});
		var block = createBlock(1, temp_items_array);
		BLOCKS.items.push(block);

        response(BLOCKS);
    }
});

function createBlock(index, items) {
	var header;
	if (index == 0) {
		header = "Starting Items";
	} else if (index == -1) {
		header = "Buy Order";
	} else if (index == 1) {
		header = "Core Items";
	}
	var block = {
		header: header,
		items: items
	}
	return block;
}
