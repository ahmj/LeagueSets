
# ![LS-LOGO](https://raw.githubusercontent.com/ahmj/LeagueSets/develop/src/common/icon48.png) LeagueSets 

[**Get it for Chrome.**](https://chrome.google.com/webstore/detail/leaguesets/eoekgdlembbelehimiljbdnofnldepmc)

**LeagueSets** is an easy to use chrome extension that allows users to quickly download in-game item sets from popular guide sites such as [Lolking](https://www.lolking.net), [Mobafire](https://www.mobafire.com), [ProBuilds](https://www.probuilds.net) and [ChampionGG](http://champion.gg)

**LeagueSets** is a submission for the [Riot Games API Challenge 2.0](https://developer.riotgames.com/discussion/announcements/show/2lxEyIcE), Item Sets Category. A Chrome extension allows the benefit of *convenience*, and allows player to use the *vast resources of information* already available on various sites. 


## Installation Instructions

### Chrome


Go to the [Chrome App Store for LeagueSets](https://chrome.google.com/webstore/detail/leaguesets/eoekgdlembbelehimiljbdnofnldepmc) and install normally.


#### Development

1. Clone this repo.
2. In Chrome, open the Extensions settings.
3. On the Extensions settings page, click the "Developer Mode" checkbox.
4. Click "Load unpacked extension…" button. Navigate to the directory where you cloned the repo
5. Enable the LeagueSets Extension

## Usage

Install LeagueSets, then...

1. Navigate to your faviourite League of Legends site such as Mobafire, Lolking, ProBuilds or Champion.GG
2. Select and navigate to the guide page that you wish to follow for your champion
3. After the page loads, click on the LeagueSet icon which has appeared on your address bar
4. Copy and paste your item set into a JSON file or use the download .json link
5. Save the JSON file into your League of Legends directory,  
    (i.e X:\Riot Games\League of Legends\Config\Champions\<Champion_Name>\Recommended\<filename>.json) 
6. Queue up for your next League of Legends game!


## Documentation

### Adding sites
Open up the manifest and add your script with a url to the guides section of the site.

    {
        "matches": ["URL_OF_GUIDES_SECTION"],
        "js": ["./scripts/your_script"],
        "run_at":"document_idle",
        "all_frames": false
    },
    
Your script will follow the same structure as outlined below, where it will return a **BLOCKS** object when called.

    var BLOCKS;
    chrome.runtime.sendMessage({
        from:    'content',
        subject: 'showPageAction'
    });

    chrome.runtime.onMessage.addListener(function(msg, sender, response) {
        if ((msg.from === 'popup') && (msg.subject === 'guide')) {
                //code here
            response(BLOCK);
        }
    });
    
The **BLOCKS**  object must contain a title, and multiple item blocks for your set. The item sets require a title, and a list of item ids.

    var BLOCKS = {
        "title_of_guide",
        {
            header: "title_of_block",
            items: ["2003","2004, ..."]
        }, 
        {
         ..
        }
    };
    
Some sites may use there own custom item id's. In which case you will have to provide a JSON table of values to convert   
(Remeber to include this file in the manifest). There is a template, /scripts/templates/table_template.js that may be helpful. The mobafire script is an example of this.