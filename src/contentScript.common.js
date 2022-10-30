const parameter = decodeURI(location.search).toLocaleLowerCase();

if(parameter.includes("<script>") /*&& parameter.includes("</script>")*/){
    window.stop();
    chrome.runtime.sendMessage(location.href);
}