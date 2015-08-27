
var data;

function setInfo(info) {
	data = JSON.stringify(createItemSet(info));
	$("#LeagueItemSet").val(data);
}

$("#copy").click(function() {
	copy();
})

window.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        chrome.tabs.sendMessage(
                tabs[0].id,
                {from: 'popup', subject: 'guide'},
                setInfo);
    });
});

function copy() {
    var text = $('#LeagueItemSet').select();
    document.execCommand('copy');
}

function createItemSet(blocks) {
	var title = blocks[0];
	blocks.splice(0,1);
	var out = {
		"title" : title, 
		"type": "global",
		"map": "any",
		"mode": "any",
		"priority": true,
		"sortrank": 0,
		"blocks":  formatBlocks(blocks)
	};
	return out;
}

function formatBlocks(blocks) {
	var block_array = [];
	for (var i =0; i < blocks.length; i++) {
		var itemblock = createItemsBlock(blocks[i]);
		block_array.push(itemblock);
	}
	return block_array;
}

function createItemsBlock(itemsBlock) {
	var block = {
		"type" : itemsBlock.header, 
		"recMath": false,
        "minSummonerLevel": -1,
        "maxSummonerLevel": -1,
        "showIfSummonerSpell": "",
        "hideIfSummonerSpell": "",
        "items": createItemBlock(itemsBlock.items)
	};
	return block;
}

function createItemBlock(items) {
	var itemsArray = [];
	for (var i =0; i < items.length; i++) {
		var item = {
			"id" : items[i],
			"count": 1
		};
		itemsArray.push(item);
	}
	return itemsArray;
}