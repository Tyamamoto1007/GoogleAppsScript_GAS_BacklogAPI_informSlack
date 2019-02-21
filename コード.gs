// 編集時に発動
function task_action() {

  // 編集したセルを取得
  var range = SpreadsheetApp.getActiveRange();

  // 編集したセルの値を取得
  var rangeID = range.getValue();

  // 課題情報をセット
  set_task(rangeID,range)
}

// 一定時間に発動
function task_time() {

  // 現在のスプレッドシートを取得
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  // 現在のシートを取得
  var sheet = spreadsheet.getActiveSheet();

  for(var i=1; i<100; i++) {
    // B列を取得
    var range = sheet.getRange(i, 2);

    // B列の値を取得
    var rangeID = range.getValue();

    // 課題情報をセット
    set_task(rangeID,range)
  }
}

// 共通の処理
function set_task(rangeID,range){

  var now =new Date();
  var address = "#webhook_test";
  
  //スクリプトのプロパティに保存したトークンを取得する
  var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');
  //SlackApp インスタンスの取得
  var slackApp = SlackApp.create(token); 
  
  // rangeIDに値が入っている場合
  if(rangeID){

    try { // 通常時の処理
      // Backlogの課題を取得
      var issue = UrlFetchApp.fetch("https://(スペース名).backlog.com/api/v2/issues/"+rangeID+"?apiKey=(APIキー)");

      var issuelist = JSON.parse(issue.getContentText());

      // 課題情報をセット
      range.offset(0, 1).setValue(issuelist["issueType"]["name"]);　　// 種別
      range.offset(0, 2).setValue(issuelist["summary"]);　　　　　　　// 件名
      range.offset(0, 3).setValue(issuelist["assignee"]["name"]);　　 // 担当者
      range.offset(0, 4).setValue(issuelist["status"]["name"]);　　　 // 状態
      range.offset(0, 5).setValue(issuelist["priority"]["name"]);　　 // 優先度
      range.offset(0, 6).setValue(issuelist["created"]);　　　　　　　// 登録日
      range.offset(0, 7).setValue(issuelist["dueDate"]);　　　　　　　// 期限日
      range.offset(0, 8).setValue(issuelist["updated"]);　　　　　　　// 更新日
      range.offset(0, 9).setValue(issuelist["createdUser"]["name"]);　// 登録者
    } catch(e) { // エラー時の処理
      range.offset(0, 1).setValue("エラー");
      return 0;
    }
    
    var check = new Date(issuelist["dueDate"]) < now;
    Browser.msgBox("確認", check , Browser.Buttons.OK);
    
    if(issuelist["status"]["name"] != "完了" && check == true){
      options = {
          channelId: address, //チャンネル名
          userName: "backlog期限切れ通知サービス", //投稿するbotの名前
          message:  "「" + issuelist["summary"]+"」の期限が過ぎています" //投稿するメッセージ
       };
       //slackにメッセージを送信
       slackApp.postMessage(options.channelId, options.message, {username: options.userName});
    }
      
  }
}

// 指定されたプロジェクトの課題情報を一括で取得する
function set_Alltask(){

  var range = SpreadsheetApp.getActiveSheet().getRange(2, 2);
  
  var now =new Date();
  var address = "#webhook_test";
  
  //スクリプトのプロパティに保存したトークンを取得する
  var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');
  //SlackApp インスタンスの取得
  var slackApp = SlackApp.create(token); 
  
  // rangeIDに値が入っている場合
  try { // 通常時の処理
    // Backlogの課題を取得
    var issue = UrlFetchApp.fetch("https://(スペース名).backlog.com/api/v2/issues?apiKey=(APIキー)&projectId[]=(Backlogプロジェクトキー)");
    var issuelist = JSON.parse(issue.getContentText());
    
    // 課題情報をセット
    for(i=0;i<issuelist.length;i++){
      range.offset(0, 0).setValue(issuelist[i]["issueKey"]);　　// 種別
      range.offset(0, 1).setValue(issuelist[i]["issueType"]["name"]);　　// 種別
      range.offset(0, 2).setValue(issuelist[i]["summary"]);　　　　　　　// 件名
      range.offset(0, 3).setValue(issuelist[i]["assignee"]["name"]);　　 // 担当者
      range.offset(0, 4).setValue(issuelist[i]["status"]["name"]);　　　 // 状態
      range.offset(0, 5).setValue(issuelist[i]["priority"]["name"]);　　 // 優先度
      range.offset(0, 6).setValue(issuelist[i]["created"]);　　　　　　　// 登録日
      range.offset(0, 7).setValue(issuelist[i]["dueDate"]);　　　　　　　// 期限日
      range.offset(0, 8).setValue(issuelist[i]["updated"]);　　　　　　　// 更新日
      range.offset(0, 9).setValue(issuelist[i]["createdUser"]["name"]);　// 登録者
      range = SpreadsheetApp.getActiveSheet().getRange(2+i+1, 2);
    }
  } catch(e) { // エラー時の処理
    range.offset(0, 1).setValue("エラー");
    return 0;
  }
    
  for(i=0;i<issuelist.length;i++){  
    var check = false;
    if(issuelist[i]["dueDate"]){
      check = new Date(issuelist[i]["dueDate"]) < now;
    }
    //Browser.msgBox("確認", check, Browser.Buttons.OK);
  
    if(issuelist[i]["status"]["name"] != "完了" && check == true){
      options = {
        channelId: address, //チャンネル名
        userName: "backlog期限切れ通知サービス", //投稿するbotの名前
        message:  "「" + issuelist[i]["summary"]+"」の期限が過ぎています" //投稿するメッセージ
      };
      //slackにメッセージを送信
      slackApp.postMessage(options.channelId, options.message, {username: options.userName});
    }
  }
}