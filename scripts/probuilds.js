
/*
BLOCKS = [
"TITLE",

{
	header: "test",
	items: [
	114,251
	]
},
...
]

*/
chrome.runtime.sendMessage({
    from:    'content',
    subject: 'showPageAction'
});

chrome.runtime.onMessage.addListener(function(msg, sender, response) {
    if ((msg.from === 'popup') && (msg.subject === 'guide')) {
		var BLOCKS = [];
		var temp_items_array = [];
		var title = $('a.green').text();
		BLOCKS.push(title);
		$('#buy-order .buy-order').children('li').each(function (index) {
			var id = $(this).attr("data-item");
			if (id) {
				temp_items_array.push(id);
			} else {
				var block = createBlock(index,temp_items_array)
				temp_items_array = [];
				BLOCKS.push(block);
			}
		});
		var block = createBlock(-1, temp_items_array);
		BLOCKS.push(block);

        response(BLOCKS);
    }
});

function createBlock(index, items) {
	var header;
	if (index == 0) {
		header = "Starting Items";
	} else if (index == -1) {
		header = "Final Block";
	} else {
		header = "Core - " + index;
	}
	var block = {
		header: header,
		items: items
	}
	return block;
}
