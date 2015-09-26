
var data;
var title;

function setInfo(info) {
	data = JSON.stringify(createItemSet(info), null, 2);
	var json = "text/json;charset=utf-8," + encodeURIComponent(data);
	document.getElementById("download").setAttribute("href", "data:" + json);
	document.getElementById("download").setAttribute("download", title + ".json");
	document.getElementById("title").innerHTML = title;
	document.getElementById("LeagueItemSet").value = data;
}

document.getElementById("copy").addEventListener("click", function () {
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
   	document.getElementById("LeagueItemSet").select();
    document.execCommand('copy');
}

function createItemSet(blocks) {
	title = blocks.title;

	blocks.items.unshift(consumablesBlock());
	blocks.items.unshift(trinketBlock());

	var out = {
		"title" : title, 
		"type": "global",
		"map": "any",
		"mode": "any",
		"priority": true,
		"sortrank": 0,
		"blocks":  formatBlocks(blocks.items)
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

function consumablesBlock() {
	var header = 'Consumables';
	var items = ["2003", "2004", "2041", "2043", "2044", "2137", "2138", "2139","2140"];

	var ITEM_BLOCK = {
		header: header,
		items: items
	};
	return ITEM_BLOCK;
}

function trinketBlock() {
	var header = 'Trinkets';
	var items = ["3340","3361","3362", "3341", "3364", "3342","3363"];
	var ITEM_BLOCK = {
		header: header,
		items: items
	};
	return ITEM_BLOCK;
}