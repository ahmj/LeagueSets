
var data;
var title;

function setInfo(info) {
	data = createItemSet(info);
	var dataString = JSON.stringify(data, null, 2);
	var json = "text/json;charset=utf-8," + encodeURIComponent(dataString);
	document.getElementById("download").setAttribute("href", "data:" + json);
	document.getElementById("download").setAttribute("download", title + ".json");
	document.getElementById("title").innerHTML = title;
	document.getElementById("LeagueItemSet").value = dataString;
}

document.getElementById("copy").addEventListener("click", function () {
	copy();
})
document.getElementById("bugs").addEventListener("click", function() {
	chrome.tabs.create({url: 'https://github.com/ahmj/LeagueSets/issues'});
});
document.getElementById("ctdrop").addEventListener("change", function() {
	var dropdown = document.getElementById("ctdrop");
	var selected = dropdown.options[dropdown.selectedIndex].value;
	if (selected === "top") {
		if (data.blocks[0].type !== "Trinkets") {
			data.blocks.unshift(createItemsBlock(consumablesBlock()));
			data.blocks.unshift(createItemsBlock(trinketBlock()));
		}
		if (data.blocks[(data.blocks.length - 1)].type === "Trinkets") {
			data.blocks.pop();
			data.blocks.pop();
		}
	} else if (selected === "bot") {
		if (data.blocks[(data.blocks.length - 1)].type !== "Trinkets") {
			data.blocks.push(createItemsBlock(consumablesBlock()));
			data.blocks.push(createItemsBlock(trinketBlock()));
		}
		if (data.blocks[0].type === "Trinkets") {
			data.blocks.shift();
			data.blocks.shift();
		}
	}
	var dataString = JSON.stringify(data, null, 2);
	var json = "text/json;charset=utf-8," + encodeURIComponent(dataString);
	document.getElementById("download").setAttribute("href", "data:" + json);
	document.getElementById("download").setAttribute("download", title + ".json");
	document.getElementById("LeagueItemSet").value = dataString;
});
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