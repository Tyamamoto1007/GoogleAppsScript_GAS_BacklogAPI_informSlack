# GoogleAppsScript_GAS_BacklogAPI_informSlack
BacklogのAPIを利用して、指定したプロジェクトの課題の中で、未完了の期限切れ課題をSlackのチャネルに通知する


0.事前準備-Slack APIの取得(参考URL：https://qiita.com/ykhirao/items/3b19ee6a1458cfb4ba21)

0-1.以下のURLにアクセスしてください。 https://api.slack.com/apps

0-2.Slackに右上に表示される「Go to Slack」から通知したいワークプレイスにログインしてください。(ログイン済みの場合不要)

0-3.「Create New App」をクリック。「App Name」に任意のアプリ名を入力し、「Development Slack Workspace」で通知先の「ワークスペース」を選択して、「Create App」をクリックしてください。

0-4.「Install your app to your workspace」を開き、「permission scope 」をクリックします。

0-5.「Scopes＞Select Permission Scopes」のプルダウンメニューから「Send messages as test」を選択し、「Save Changes」を選択します。

0-6.「OAuth Tokens & Redirect URLs」で「Install App to Workspace」をクリックします。確認画面が表示されるの「許可する」をクリックします。

0-7.「OAuth & Permissions」の「OAuth Access Token」がAPIキーになるため、保存します。 　　※APIキーが奪われると第三者がメッセージを送れるようになるので、厳重に管理してください。

【設定手順】

1.以下のURLからスプレッドシートにアクセスし、空白のスプレッドシートを開きます。 　https://docs.google.com/spreadsheets/u/0/

2.メニューバー「ツール＞スクリプトエディタ」をクリックして、スクリプトエディタを開きます。

3.エディタのメニュー「リソース＞ライブラリ」をクリックします(プロジェクト名を聞かれた場合は、任意のプロジェクト名を入力して、OKを選択してください。)

4.「ライブラリを追加」に「M3W5Ut3Q39AaIwLquryEPMwV62A3znfOO」を入力し、追加ボタンをクリックしてください。

5.「バージョン」を最新の数字に設定し、「保存」をクリックします。 　※これでSlackを簡単に送信するライブラリが利用できます。

6.このリポジトリにある「コード.gs」のソースをすべてコピーして、スクリプトエディタに張り付け、「Ctrl+s」で保存します。

【使い方】
