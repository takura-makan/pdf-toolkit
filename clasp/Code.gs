function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('PDF Toolkit')
    .setFaviconUrl('https://drive.google.com/uc?export=view&id=1Xknx1VcASRKP9zblYqrwOsZ-gMMXubNg&.png')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
}

function sendEventToGA4(eventCategory, params, clientId) {
  const measurement_id = 'G-4282Y2EFZF'; 
  const api_secret = 'km2oEIXERWelURKX6vPW3g'; // ★書き換えてください！

  // HTML側からclientIdが来なかった場合の保険
  if (!clientId) {
    clientId = generateUUID();
  }

  const payload = {
    client_id: clientId, // ★HTML側から送られてきた固定の身分証を使う
    events: [{
      name: eventCategory,
      params: params
    }]
  };

  const url = 'https://www.google-analytics.com/mp/collect?measurement_id=' + measurement_id + '&api_secret=' + api_secret;
  
  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };
  
  UrlFetchApp.fetch(url, options);
}

// 通信に必要な「ユーザーの仮のID」を生成する関数
function generateUUID() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c === 'x' ? r : (r&0x3|0x8)).toString(16);
  });
  return uuid;
}