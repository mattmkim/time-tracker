function updateCategories() {
    chrome.storage.local.get(null, async (items) => {
        if (items.hasOwnProperty("categories")) {
            var categories = items["categories"]
            categories.forEach((category, index) => {
                var categoryState = category + "State"
                if (items[categoryState]) {
                    // chrome.storage.local.remove(category, () => {
                    //     if (chrome.runtime.lastError) {
                    //         // TODO: handle error
                    //     } else {
                    //         var newTime = {}
                    //         newTime[category] = {startTime: items[category]["startTime"], totalTime: items[category]["totalTime"], currTime: parseInt(items[category]["currTime"] + 1)}
                    //         chrome.storage.local.set(newTime)
                    //     }
                    // })
                    var newTime = {}
                    newTime[category] = {startTime: items[category]["startTime"], totalTime: items[category]["totalTime"], currTime: parseInt(items[category]["currTime"] + 1)}
                    chrome.storage.local.set(newTime)
            
                }
            })
        }
    })
}

setInterval(updateCategories, 1000)

