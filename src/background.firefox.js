const url = chrome.runtime.getURL("./cxb.svg");

chrome.runtime.onMessage.addListener((msg, sender)=>{
    chrome.notifications.create("id" ,{
        type:"basic",
        iconUrl:url,
        title:"Crude XSS Blocker",
        message:"This page has risk of XSS.",
    });
    setTimeout(()=>{ chrome.notifications.clear("id") }, 5000)
})