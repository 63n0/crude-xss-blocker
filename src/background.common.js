let opt = {
    type:"basic",
    title:"Crude XSS Blocker",
    message:"This page has risk of XSS",
}

chrome.runtime.onMessage.addListener((msg, sender)=>{
    chrome.notifications.create("id",opt);
    setTimeout(()=>{ chrome.notifications.clear("id") }, 5000)
})