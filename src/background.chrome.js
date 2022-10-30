const icon = chrome.runtime.getURL("cxb.png");

chrome.runtime.onMessage.addListener((msg, sender)=>{
    chrome.notifications.create("id" ,{
        type:"basic",
        iconUrl:icon,
        title:"Crude XSS Blocker",
        message:"This page has risk of XSS."
    },
    ()=> {});
    setTimeout(()=>{ chrome.notifications.clear("id") }, 3000)
})