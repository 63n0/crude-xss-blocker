const parameter = decodeURI(location.search).toLocaleLowerCase();

if(parameter.includes("<script>") /*&& parameter.includes("</script>")*/){
    chrome.runtime.sendMessage(location.href);
    window.stop();
}