import { useState, useEffect, useRef, useMemo } from "react";

// ── Data ─────────────────────────────────────────────────────────────────────
const ALL_WORDS = [{"e":"10th","r":"tooka","k":"とおか","l":"1-2"},{"e":"14th","r":"juu-yokka","k":"じゅうよっか","l":"1-2"},{"e":"1st","r":"tsuitachi","k":"ついたち","l":"1-2"},{"e":"20th","r":"hatsuka","k":"はつか","l":"1-2"},{"e":"2nd","r":"futsuka","k":"ふつか","l":"1-2"},{"e":"3rd","r":"mikka","k":"みっか","l":"1-2"},{"e":"4th","r":"yokka","k":"よっか","l":"1-2"},{"e":"5th","r":"itsuka","k":"いつか","l":"1-2"},{"e":"6th","r":"muika","k":"むいか","l":"1-2"},{"e":"7th","r":"nanoka","k":"なのか","l":"1-2"},{"e":"8th","r":"yooka","k":"ようか","l":"1-2"},{"e":"9th","r":"kokonoka","k":"ここのか","l":"1-2"},{"e":"January","r":"ichigatsu","k":"いちがつ","l":"1-2"},{"e":"February","r":"nigatsu","k":"にがつ","l":"1-2"},{"e":"March","r":"sangatsu","k":"さんがつ","l":"1-2"},{"e":"April","r":"shigatsu","k":"しがつ","l":"1-2"},{"e":"May","r":"gogatsu","k":"ごがつ","l":"1-2"},{"e":"June","r":"rokugatsu","k":"ろくがつ","l":"1-2"},{"e":"July","r":"shichigatsu","k":"しちがつ","l":"1-2"},{"e":"August","r":"hachigatsu","k":"はちがつ","l":"1-2"},{"e":"September","r":"kugatsu","k":"くがつ","l":"1-2"},{"e":"October","r":"juugatsu","k":"じゅうがつ","l":"1-2"},{"e":"November","r":"juuichigatsu","k":"じゅういちがつ","l":"1-2"},{"e":"December","r":"juunigatsu","k":"じゅうにがつ","l":"1-2"},{"e":"birthday","r":"tanjoubi","k":"たんじょうび","l":"1-2"},{"e":"today","r":"kyoo","k":"きょう","l":"9-10"},{"e":"tomorrow","r":"ashita","k":"あした","l":"9-10"},{"e":"yesterday","r":"kinoo","k":"きのう","l":"9-10"},{"e":"Monday","r":"getsuyoobi","k":"げつようび","l":"9-10"},{"e":"Tuesday","r":"kayoobi","k":"かようび","l":"9-10"},{"e":"Wednesday","r":"suiyoobi","k":"すいようび","l":"9-10"},{"e":"Thursday","r":"mokuyoobi","k":"もくようび","l":"9-10"},{"e":"Friday","r":"kin'yoobi","k":"きんようび","l":"9-10"},{"e":"Saturday","r":"doyoobi","k":"どようび","l":"9-10"},{"e":"Sunday","r":"nichiyoobi","k":"にちようび","l":"9-10"},{"e":"Japan","r":"nihon","k":"にほん","l":"1-2"},{"e":"Japanese (language)","r":"nihongo","k":"にほんご","l":"1-2"},{"e":"person","r":"hito","k":"ひと","l":"1-2"},{"e":"name","r":"namae","k":"なまえ","l":"1-2"},{"e":"I / me","r":"watashi","k":"わたし","l":"1-2"},{"e":"you","r":"anata","k":"あなた","l":"1-2"},{"e":"he / she","r":"kare / kanojo","k":"かれ／かのじょ","l":"1-2"},{"e":"teacher","r":"sensei","k":"せんせい","l":"1-2"},{"e":"student","r":"gakusei","k":"がくせい","l":"1-2"},{"e":"company employee","r":"kaishain","k":"かいしゃいん","l":"1-2"},{"e":"doctor","r":"isha","k":"いしゃ","l":"1-2"},{"e":"nurse","r":"kangoshi","k":"かんごし","l":"1-2"},{"e":"engineer","r":"enjinia","k":"エンジニア","l":"1-2"},{"e":"mother","r":"haha / okaasan","k":"はは／おかあさん","l":"1-2"},{"e":"father","r":"chichi / otousan","k":"ちち／おとうさん","l":"1-2"},{"e":"older sister","r":"ane / oneesan","k":"あね／おねえさん","l":"1-2"},{"e":"older brother","r":"ani / oniisan","k":"あに／おにいさん","l":"1-2"},{"e":"younger sister","r":"imooto","k":"いもうと","l":"1-2"},{"e":"younger brother","r":"otooto","k":"おとうと","l":"1-2"},{"e":"children","r":"kodomo","k":"こども","l":"1-2"},{"e":"family","r":"kazoku","k":"かぞく","l":"1-2"},{"e":"friend","r":"tomodachi","k":"ともだち","l":"1-2"},{"e":"one","r":"ichi","k":"いち","l":"1-2"},{"e":"two","r":"ni","k":"に","l":"1-2"},{"e":"three","r":"san","k":"さん","l":"1-2"},{"e":"four","r":"shi / yon","k":"し／よん","l":"1-2"},{"e":"five","r":"go","k":"ご","l":"1-2"},{"e":"six","r":"roku","k":"ろく","l":"1-2"},{"e":"seven","r":"shichi / nana","k":"しち／なな","l":"1-2"},{"e":"eight","r":"hachi","k":"はち","l":"1-2"},{"e":"nine","r":"ku / kyuu","k":"く／きゅう","l":"1-2"},{"e":"ten","r":"juu","k":"じゅう","l":"1-2"},{"e":"hello","r":"konnichiwa","k":"こんにちは","l":"1-2"},{"e":"good morning","r":"ohayoo gozaimasu","k":"おはようございます","l":"1-2"},{"e":"good evening","r":"konbanwa","k":"こんばんは","l":"1-2"},{"e":"good night","r":"oyasumi nasai","k":"おやすみなさい","l":"1-2"},{"e":"nice to meet you","r":"hajimemashite","k":"はじめまして","l":"1-2"},{"e":"please (to receive favour)","r":"yoroshiku onegaishimasu","k":"よろしくおねがいします","l":"1-2"},{"e":"thank you","r":"arigatoo gozaimasu","k":"ありがとうございます","l":"1-2"},{"e":"excuse me","r":"sumimasen","k":"すみません","l":"9-10"},{"e":"yes","r":"hai","k":"はい","l":"1-2"},{"e":"no","r":"iie","k":"いいえ","l":"1-2"},{"e":"this","r":"kore","k":"これ","l":"3-4"},{"e":"that (near you)","r":"sore","k":"それ","l":"3-4"},{"e":"that (over there)","r":"are","k":"あれ","l":"3-4"},{"e":"what","r":"nani / nan","k":"なに／なん","l":"3-4"},{"e":"where","r":"doko","k":"どこ","l":"9-10"},{"e":"who","r":"dare","k":"だれ","l":"3-4"},{"e":"when","r":"itsu","k":"いつ","l":"9-10"},{"e":"how much","r":"ikura","k":"いくら","l":"9-10"},{"e":"how many (tsu-counter)","r":"ikutsu","k":"いくつ","l":"7-8"},{"e":"what time","r":"nan-ji","k":"なんじ","l":"9-10"},{"e":"with whom","r":"dare to","k":"だれと","l":"9-10"},{"e":"what kind of","r":"donna","k":"どんな","l":"9-10"},{"e":"water","r":"mizu","k":"みず","l":"5-6"},{"e":"coffee","r":"koohii","k":"コーヒー","l":"5-6"},{"e":"sake / Japanese rice wine","r":"osake","k":"おさけ","l":"5-6"},{"e":"miso soup","r":"misoshiru","k":"みそしる","l":"5-6"},{"e":"matcha (green tea powder)","r":"maccha","k":"まっちゃ","l":"5-6"},{"e":"meat","r":"niku","k":"にく","l":"5-6"},{"e":"fish","r":"sakana","k":"さかな","l":"5-6"},{"e":"vegetables","r":"yasai","k":"やさい","l":"5-6"},{"e":"fruit","r":"kudamono","k":"くだもの","l":"5-6"},{"e":"beer","r":"biiru","k":"ビール","l":"5-6"},{"e":"food (general)","r":"tabemono","k":"たべもの","l":"5-6"},{"e":"drinks (general)","r":"nomimono","k":"のみもの","l":"5-6"},{"e":"breakfast","r":"asagohan","k":"あさごはん","l":"5-6"},{"e":"lunch","r":"hirugohan","k":"ひるごはん","l":"5-6"},{"e":"dinner","r":"bangohan","k":"ばんごはん","l":"5-6"},{"e":"rice / meal","r":"gohan","k":"ごはん","l":"5-6"},{"e":"rice porridge","r":"okayu","k":"おかゆ","l":"5-6"},{"e":"ramen","r":"raamen","k":"ラーメン","l":"5-6"},{"e":"sushi","r":"sushi","k":"すし","l":"7-8"},{"e":"okonomiyaki","r":"okonomiyaki","k":"おこのみやき","l":"7-8"},{"e":"sandwich","r":"sandoicchi","k":"サンドイッチ","l":"7-8"},{"e":"hamburger","r":"hanbaagaa","k":"ハンバーガー","l":"9-10"},{"e":"egg","r":"tamago","k":"たまご","l":"5-6"},{"e":"wine","r":"wain","k":"ワイン","l":"5-6"},{"e":"eat","r":"tabemasu","k":"たべます","l":"5-6"},{"e":"drink","r":"nomimasu","k":"のみます","l":"5-6"},{"e":"get up","r":"okimasu","k":"おきます","l":"9-10"},{"e":"sleep / go to bed","r":"nemasu","k":"ねます","l":"9-10"},{"e":"go","r":"ikimasu","k":"いきます","l":"9-10"},{"e":"take a bath","r":"ofuro ni hairimasu","k":"おふろにはいります","l":"9-10"},{"e":"do not eat / do not drink","r":"tabemasen / nomimasen","k":"たべません／のみません","l":"5-6"},{"e":"hot (food/drink)","r":"atatakai","k":"あたたかい","l":"5-6"},{"e":"cold (food/drink)","r":"tsumetai","k":"つめたい","l":"5-6"},{"e":"delicious","r":"oishii","k":"おいしい","l":"3-4"},{"e":"bad taste","r":"mazui","k":"まずい","l":"7-8"},{"e":"expensive","r":"takai","k":"たかい","l":"7-8"},{"e":"like","r":"suki","k":"すき","l":"5-6"},{"e":"love / like very much","r":"daisuki","k":"だいすき","l":"5-6"},{"e":"dislike","r":"kirai","k":"きらい","l":"5-6"},{"e":"often","r":"yoku","k":"よく","l":"5-6"},{"e":"not very often","r":"amari","k":"あまり","l":"5-6"},{"e":"always","r":"itsumo","k":"いつも","l":"5-6"},{"e":"every day","r":"mainichi","k":"まいにち","l":"9-10"},{"e":"cafe / coffee shop","r":"koohii shoppu","k":"コーヒーショップ","l":"5-6"},{"e":"ramen restaurant","r":"raamen-ya","k":"ラーメンや","l":"5-6"},{"e":"restaurant","r":"resutoran","k":"レストラン","l":"5-6"},{"e":"izakaya (Japanese pub)","r":"izakaya","k":"いざかや","l":"5-6"},{"e":"park","r":"kooen","k":"こうえん","l":"9-10"},{"e":"school","r":"gakkoo","k":"がっこう","l":"9-10"},{"e":"company / workplace","r":"kaisha","k":"かいしゃ","l":"9-10"},{"e":"half past (30 min)","r":"han","k":"はん","l":"9-10"},{"e":"please (ordering)","r":"kudasai","k":"ください","l":"9-10"},{"e":"welcome (shop)","r":"irasshaimase","k":"いらっしゃいませ","l":"9-10"},{"e":"and then / after that","r":"sorekara","k":"それから","l":"9-10"},{"e":"alone","r":"hitori de","k":"ひとりで","l":"9-10"},{"e":"next week","r":"raishuu","k":"らいしゅう","l":"9-10"},{"e":"it's OK / no problem","r":"daijyoobu desu","k":"だいじょうぶです","l":"9-10"},{"e":"from ~","r":"kara","k":"から","l":"9-10"},{"e":"until ~","r":"made","k":"まで","l":"9-10"},{"e":"reading books","r":"dokusho","k":"どくしょ","l":"11-12"},{"e":"manga / comics","r":"manga","k":"まんが","l":"11-12"},{"e":"movie","r":"eega","k":"えいが","l":"11-12"},{"e":"sport","r":"supootsu","k":"スポーツ","l":"11-12"},{"e":"music","r":"ongaku","k":"おんがく","l":"11-12"},{"e":"horror (film)","r":"horaa","k":"ホラー","l":"11-12"},{"e":"comedy (film)","r":"komedhi","k":"コメディ","l":"11-12"},{"e":"concert","r":"konsaato","k":"コンサート","l":"11-12"},{"e":"travel","r":"ryokoo","k":"りょこう","l":"11-12"},{"e":"exercise / work out","r":"undoo shimasu","k":"うんどうします","l":"11-12"},{"e":"read (book)","r":"hon o yomimasu","k":"ほんをよみます","l":"11-12"},{"e":"listen to music","r":"ongaku o kikimasu","k":"おんがくをききます","l":"11-12"},{"e":"healthy / energetic","r":"genki","k":"げんき","l":"11-12"},{"e":"live in ~","r":"sunde imasu","k":"すんでいます","l":"3-4"},{"e":"stepmother / mother-in-law","r":"giri no haha","k":"ぎりのはは","l":"3-4"},{"e":"love / like very much","r":"daisuki","k":"だいすき","l":"5-6"},{"e":"I don't like it","r":"suki jyanai desu","k":"すきじゃないです","l":"5-6"}].filter((w,i,a)=>a.findIndex(x=>x.k===w.k)===i);

const GRAMMAR = {"particle":[{"s":"わたし___がくせいです。","blank":"は","options":["は","が","を","で"],"en":"I am a student."},{"s":"コーヒー___のみます。","blank":"を","options":["を","は","が","で"],"en":"I drink coffee."},{"s":"レストラン___たべます。","blank":"で","options":["で","に","を","は"],"en":"I eat at a restaurant."},{"s":"6じ___おきます。","blank":"に","options":["に","で","を","は"],"en":"I get up at 6."},{"s":"おおさか___すんでいます。","blank":"に","options":["に","で","を","が"],"en":"I live in Osaka."},{"s":"さかな___すきです。","blank":"が","options":["が","は","を","で"],"en":"I like fish."},{"s":"まいにち こうえん___いきます。","blank":"に","options":["に","で","を","は"],"en":"I go to the park every day."},{"s":"にく___すきじゃないです。","blank":"は","options":["は","が","を","で"],"en":"I don't like meat. (contrast)"},{"s":"どこ___ひるごはんをたべますか？","blank":"で","options":["で","に","を","が"],"en":"Where do you eat lunch?"},{"s":"9じ___5じ___しごとです。","blank":"から…まで","options":["から…まで","に…で","が…を","は…に"],"en":"Work is from 9 to 5."}],"sentence":[{"words":["わたしは","まいあさ","コーヒーを","のみます"],"extra":["で","たべます","が"],"en":"I drink coffee every morning."},{"words":["レストランで","すしを","たべます"],"extra":["に","が","のみます"],"en":"I eat sushi at a restaurant."},{"words":["わたしは","おおさかに","すんでいます"],"extra":["で","たべます","は"],"en":"I live in Osaka."},{"words":["なにを","のみますか"],"extra":["は","に","たべますか"],"en":"What do you drink?"},{"words":["8じに","おきます"],"extra":["で","たべます","は"],"en":"I get up at 8."},{"words":["にくが","すきです"],"extra":["を","は","のみます"],"en":"I like meat."},{"words":["どこで","ひるごはんを","たべますか"],"extra":["に","が","のみますか"],"en":"Where do you eat lunch?"},{"words":["よく","コーヒーを","のみます"],"extra":["に","たべます","は"],"en":"I often drink coffee."},{"words":["どようびが","いいです"],"extra":["に","は","たべます"],"en":"Saturday is good."},{"words":["9じから","5じまで","しごとです"],"extra":["に","が","たべます"],"en":"Work is from 9 to 5."}],"context":[{"q":"なんじですか？","correct":"9じです。","wrong":["9じにです。","9じをです。","9じがです。"],"en":"What time is it?"},{"q":"どこにすんでいますか？","correct":"とうきょうにすんでいます。","wrong":["とうきょうですんでいます。","とうきょうをすんでいます。","とうきょうがすんでいます。"],"en":"Where do you live?"},{"q":"なにがすきですか？","correct":"さかながすきです。","wrong":["さかなはすきです。","さかなをすきです。","さかなですきです。"],"en":"What do you like?"},{"q":"まいにちあさごはんをたべますか？","correct":"いいえ、たべません。","wrong":["いいえ、たべます。","はい、たべません。","いいえ、のみません。"],"en":"Do you eat breakfast every day?"},{"q":"なにをのみますか？","correct":"コーヒーをのみます。","wrong":["コーヒーがのみます。","コーヒーにのみます。","コーヒーはのみます。"],"en":"What do you drink?"},{"q":"いつがいいですか？","correct":"どようびがいいです。","wrong":["どようびにいいです。","どようびはいいです。","どようびをいいです。"],"en":"When is good?"},{"q":"コーヒーがすきですか？","correct":"はい、すきです。","wrong":["はい、すきじゃないです。","いいえ、すきです。","はい、たべます。"],"en":"Do you like coffee?"},{"q":"どこでひるごはんをたべますか？","correct":"かいしゃでたべます。","wrong":["かいしゃにたべます。","かいしゃをたべます。","かいしゃがたべます。"],"en":"Where do you eat lunch?"}],"error":[{"s":"わたしは コーヒーは のみます。","error":"は","correct":"を","options":["を","が","に","で"],"en":"Object of drinking needs を"},{"s":"レストランに たべます。","error":"に","correct":"で","options":["で","を","は","が"],"en":"Place of action needs で"},{"s":"6じで おきます。","error":"で","correct":"に","options":["に","は","を","が"],"en":"Specific time needs に"},{"s":"にくは すきです。","error":"は","correct":"が","options":["が","を","で","に"],"en":"Subject of suki needs が"},{"s":"おおさかで すんでいます。","error":"で","correct":"に","options":["に","は","を","が"],"en":"Location (sunde) needs に"},{"s":"まいにち こうえんで いきます。","error":"で","correct":"に","options":["に","は","を","が"],"en":"Direction needs に"},{"s":"ラーメンが たべます。","error":"が","correct":"を","options":["を","は","に","で"],"en":"Object of eating needs を"}],"matching":[{"l":"わたしは がくせいです。","r":"Jeg er student."},{"l":"コーヒーを のみます。","r":"Jeg drikker kaffe."},{"l":"レストランで たべます。","r":"Jeg spiser på restaurant."},{"l":"にくが すきです。","r":"Jeg liker kjøtt."},{"l":"6じに おきます。","r":"Jeg står opp klokken 6."},{"l":"どこに すんでいますか？","r":"Hvor bor du?"},{"l":"9じから 5じまでです。","r":"Fra kl. 9 til kl. 5."},{"l":"よく コーヒーを のみます。","r":"Jeg drikker kaffe ofte."}]};

const COUNTER_CATS = {"age":[{"num":1,"kana":"いっさい","romaji":"issai"},{"num":2,"kana":"にさい","romaji":"nisai"},{"num":3,"kana":"さんさい","romaji":"sansai"},{"num":4,"kana":"よんさい","romaji":"yonsai"},{"num":5,"kana":"ごさい","romaji":"gosai"},{"num":6,"kana":"ろくさい","romaji":"rokusai"},{"num":7,"kana":"ななさい","romaji":"nanasai"},{"num":8,"kana":"はっさい","romaji":"hassai"},{"num":9,"kana":"きゅうさい","romaji":"kyuusai"},{"num":10,"kana":"じゅっさい","romaji":"jussai"}],"books":[{"num":1,"kana":"いっさつ","romaji":"issatsu"},{"num":2,"kana":"にさつ","romaji":"nisatsu"},{"num":3,"kana":"さんさつ","romaji":"sansatsu"},{"num":4,"kana":"よんさつ","romaji":"yonsatsu"},{"num":5,"kana":"ごさつ","romaji":"gosatsu"},{"num":6,"kana":"ろくさつ","romaji":"rokusatsu"},{"num":7,"kana":"ななさつ","romaji":"nanasatsu"},{"num":8,"kana":"はっさつ","romaji":"hassatsu"},{"num":9,"kana":"きゅうさつ","romaji":"kyuusatsu"},{"num":10,"kana":"じゅっさつ","romaji":"jussatsu"}],"flat":[{"num":1,"kana":"いちまい","romaji":"ichimai"},{"num":2,"kana":"にまい","romaji":"nimai"},{"num":3,"kana":"さんまい","romaji":"sanmai"},{"num":4,"kana":"よんまい","romaji":"yonmai"},{"num":5,"kana":"ごまい","romaji":"gomai"},{"num":6,"kana":"ろくまい","romaji":"rokumai"},{"num":7,"kana":"ななまい","romaji":"nanamai"},{"num":8,"kana":"はちまい","romaji":"hachimai"},{"num":9,"kana":"きゅうまい","romaji":"kyuumai"},{"num":10,"kana":"じゅうまい","romaji":"juumai"}],"long":[{"num":1,"kana":"いっぽん","romaji":"ippon"},{"num":2,"kana":"にほん","romaji":"nihon"},{"num":3,"kana":"さんぼん","romaji":"sanbon"},{"num":4,"kana":"よんほん","romaji":"yonhon"},{"num":5,"kana":"ごほん","romaji":"gohon"},{"num":6,"kana":"ろっぽん","romaji":"roppon"},{"num":7,"kana":"ななほん","romaji":"nanahon"},{"num":8,"kana":"はっぽん","romaji":"happon"},{"num":9,"kana":"きゅうほん","romaji":"kyuuhon"},{"num":10,"kana":"じゅっぽん","romaji":"juppon"}],"people":[{"num":1,"kana":"ひとり","romaji":"hitori"},{"num":2,"kana":"ふたり","romaji":"futari"},{"num":3,"kana":"さんにん","romaji":"sannin"},{"num":4,"kana":"よにん","romaji":"yonin"},{"num":5,"kana":"ごにん","romaji":"gonin"},{"num":6,"kana":"ろくにん","romaji":"rokunin"},{"num":7,"kana":"ななにん","romaji":"nananin"},{"num":8,"kana":"はちにん","romaji":"hachinin"},{"num":9,"kana":"きゅうにん","romaji":"kyuunin"},{"num":10,"kana":"じゅうにん","romaji":"juunin"}],"small1":[{"num":1,"kana":"ひとつ","romaji":"hitotsu"},{"num":2,"kana":"ふたつ","romaji":"futatsu"},{"num":3,"kana":"みっつ","romaji":"mittsu"},{"num":4,"kana":"よっつ","romaji":"yottsu"},{"num":5,"kana":"いつつ","romaji":"itsutsu"},{"num":6,"kana":"むっつ","romaji":"muttsu"},{"num":7,"kana":"ななつ","romaji":"nanatsu"},{"num":8,"kana":"やっつ","romaji":"yattsu"},{"num":9,"kana":"ここのつ","romaji":"kokonotsu"},{"num":10,"kana":"とお","romaji":"too"}],"small2":[{"num":1,"kana":"いっこ","romaji":"ikko"},{"num":2,"kana":"にこ","romaji":"niko"},{"num":3,"kana":"さんこ","romaji":"sanko"},{"num":4,"kana":"よんこ","romaji":"yonko"},{"num":5,"kana":"ごこ","romaji":"goko"},{"num":6,"kana":"ろっこ","romaji":"rokko"},{"num":7,"kana":"ななこ","romaji":"nanako"},{"num":8,"kana":"はっこ","romaji":"hakko"},{"num":9,"kana":"きゅうこ","romaji":"kyuuko"},{"num":10,"kana":"じゅっこ","romaji":"jukko"}]};

const CAT_NO = {age:"Alder (さい)",books:"Bøker (さつ)",flat:"Flate ting (まい)",long:"Lange ting (ほん)",people:"Personer (にん)",small1:"Små ting 1 (つ)",small2:"Små ting 2 (こ)"};
const CAT_EXAMPLES = {age:["år"],books:["bok","magasin","notatbok"],flat:["frimerke","ark","tallerken"],long:["penn","flaske","paraply"],people:["person","student","venn"],small1:["eple","ball","kopp"],small2:["appelsin","boks","egg"]};

const KANA_FONTS = [
  {id:"serif",label:"明朝",css:"'Noto Serif JP',serif",sample:"あ"},
  {id:"sans",label:"ゴシック",css:"'Noto Sans JP',sans-serif",sample:"あ"},
  {id:"round",label:"丸ゴシ",css:"'M PLUS Rounded 1c',sans-serif",sample:"あ"},
  {id:"hand",label:"手書き",css:"'Yomogi',cursive",sample:"あ"},
  {id:"mincho",label:"装飾",css:"'Shippori Mincho',serif",sample:"あ"},
];
const FONT_URL = "https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700;900&family=Noto+Sans+JP:wght@400;700&family=M+PLUS+Rounded+1c:wght@400;700&family=Yomogi&family=Shippori+Mincho:wght@400;700&display=swap";

const C = {
  bg:"#0a0808",bg2:"#13100d",bg3:"#1a1610",
  gold:"#d4a843",goldLt:"#e8c060",
  teal:"#2dd4bf",green:"#4ade80",
  blue:"#6b9fd4",purple:"#a879d4",
  red:"#f87171",text:"#f5f0e8",
  textMid:"#9a8e7a",textDim:"#5a4e3a",
  border:"#2a2218",border2:"#3a3020",
};

const VOCAB_ACTIVITIES = [
  {id:"multiple",name:"Flervalg",desc:"Kana → norsk",color:C.gold,icon:"◎"},
  {id:"write",name:"Skriv selv",desc:"Norsk → kana",color:C.blue,icon:"✎"},
  {id:"flash",name:"Flashkort",desc:"Gjett og vurder",color:C.purple,icon:"⟳"},
];

const GRAMMAR_ACTIVITIES = [
  {id:"particle",name:"Partikkelvalg",desc:"Fyll inn riktig partikkel",color:C.green,icon:"は"},
  {id:"sentence",name:"Setningsbygging",desc:"Sett ord i riktig rekkefølge",color:C.teal,icon:"語"},
  {id:"context",name:"Kontekstsvar",desc:"Svar riktig på japansk",color:C.blue,icon:"?"},
  {id:"error",name:"Finn feilen",desc:"Finn og rett opp feilen",color:"#fb923c",icon:"✗"},
  {id:"matching",name:"Matching",desc:"Koble japansk og norsk",color:C.purple,icon:"⇌"},
];

function shuffle(a){const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;}

// ── Grammar quiz components ───────────────────────────────────────────────────

function ParticleQuiz({onDone, font}) {
  const items = useMemo(() => shuffle(GRAMMAR.particle), []);
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [score, setScore] = useState(0);

  if (idx >= items.length) {
    return <ResultScreen score={score} total={items.length} onRetry={() => { setIdx(0); setChosen(null); setScore(0); }} onHome={onDone} color={C.green} />;
  }

  const q = items[idx];
  const isCorrect = chosen === q.blank;

  // Render sentence with blank highlighted
  const parts = q.s.split("___");

  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{fontSize:11,color:C.textMid,letterSpacing:"0.2em",textTransform:"uppercase"}}>{idx+1}/{items.length} · Partikkelvalg</div>
      <ProgressBar pct={idx/items.length} color={C.green} />

      <div style={{background:C.bg2,border:`1px solid ${C.green}33`,borderRadius:16,padding:"24px 20px",textAlign:"center"}}>
        <div style={{fontSize:13,color:C.textMid,marginBottom:12}}>{q.en}</div>
        <div style={{fontSize:28,fontFamily:font,lineHeight:1.6,color:C.text}}>
          {parts[0]}
          <span style={{display:"inline-block",minWidth:48,padding:"0 4px",borderBottom:`2px solid ${chosen ? (isCorrect ? C.green : C.red) : C.gold}`,color:chosen ? (isCorrect ? C.green : C.red) : C.gold,fontWeight:700}}>
            {chosen || "＿"}
          </span>
          {parts[1]}
          {parts[2] && <>
            <span style={{display:"inline-block",minWidth:48,padding:"0 4px",borderBottom:`2px solid ${C.gold}`,color:C.gold,fontWeight:700}}>＿</span>
            {parts[2]}
          </>}
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        {q.options.map((opt,i) => {
          let bg = C.bg2, bc = C.border2, col = C.text;
          if (chosen) {
            if (opt === q.blank) { bg="#0a2015"; bc=C.green; col=C.green; }
            else if (opt === chosen) { bg="#200a0a"; bc=C.red; col=C.red; }
          }
          return (
            <button key={i} disabled={!!chosen}
              style={{padding:"16px 8px",borderRadius:10,border:`1.5px solid ${bc}`,background:bg,color:col,fontSize:22,fontFamily:font,cursor:chosen?"default":"pointer",transition:"all 0.15s"}}
              onClick={() => { setChosen(opt); if(opt===q.blank) setScore(s=>s+1); }}>
              {opt}
            </button>
          );
        })}
      </div>

      {chosen && (
        <button style={btnStyle("green")} onClick={() => { setIdx(i=>i+1); setChosen(null); }}>
          {idx+1 < items.length ? "Neste →" : "Se resultat"}
        </button>
      )}
    </div>
  );
}

function SentenceQuiz({onDone, font}) {
  const items = useMemo(() => shuffle(GRAMMAR.sentence), []);
  const [idx, setIdx] = useState(0);
  const [placed, setPlaced] = useState([]);
  const [available, setAvailable] = useState([]);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (idx < items.length) {
      const q = items[idx];
      setAvailable(shuffle([...q.words, ...q.extra]));
      setPlaced([]);
      setChecked(false);
    }
  }, [idx, items]);

  if (idx >= items.length) {
    return <ResultScreen score={score} total={items.length} onRetry={() => { setIdx(0); setScore(0); }} onHome={onDone} color={C.teal} />;
  }

  const q = items[idx];
  const isCorrect = checked && JSON.stringify(placed) === JSON.stringify(q.words);

  function addWord(w, i) {
    if (checked) return;
    setPlaced(p => [...p, w]);
    setAvailable(a => { const n=[...a]; n.splice(i,1); return n; });
  }
  function removeWord(i) {
    if (checked) return;
    const w = placed[i];
    setPlaced(p => { const n=[...p]; n.splice(i,1); return n; });
    setAvailable(a => [...a, w]);
  }
  function check() {
    setChecked(true);
    if (JSON.stringify(placed) === JSON.stringify(q.words)) setScore(s=>s+1);
  }

  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{fontSize:11,color:C.textMid,letterSpacing:"0.2em",textTransform:"uppercase"}}>{idx+1}/{items.length} · Setningsbygging</div>
      <ProgressBar pct={idx/items.length} color={C.teal} />

      <div style={{background:C.bg2,border:`1px solid ${C.teal}33`,borderRadius:16,padding:"20px",textAlign:"center"}}>
        <div style={{fontSize:13,color:C.textMid,marginBottom:8}}>{q.en}</div>
        <div style={{fontSize:13,color:C.textDim}}>Trykk ord i riktig rekkefølge</div>
      </div>

      {/* Answer area */}
      <div style={{minHeight:56,background:C.bg3,border:`1.5px solid ${checked ? (isCorrect ? C.green : C.red) : C.border2}`,borderRadius:12,padding:"10px 12px",display:"flex",flexWrap:"wrap",gap:8,alignItems:"center"}}>
        {placed.length === 0 && <span style={{color:C.textDim,fontSize:13}}>Trykk ord nedenfor...</span>}
        {placed.map((w,i) => (
          <button key={i} onClick={() => removeWord(i)} disabled={checked}
            style={{padding:"8px 12px",borderRadius:8,background:`${C.teal}22`,border:`1px solid ${C.teal}66`,color:C.teal,fontFamily:font,fontSize:16,cursor:checked?"default":"pointer"}}>
            {w}
          </button>
        ))}
      </div>

      {checked && !isCorrect && (
        <div style={{background:"#0a2015",border:`1px solid ${C.green}33`,borderRadius:10,padding:"12px 16px",fontSize:15,fontFamily:font,color:C.green,textAlign:"center"}}>
          ✓ {q.words.join(" ")}
        </div>
      )}

      {/* Word bank */}
      <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
        {available.map((w,i) => (
          <button key={i} onClick={() => addWord(w, i)} disabled={checked}
            style={{padding:"10px 14px",borderRadius:8,background:C.bg2,border:`1px solid ${C.border2}`,color:C.text,fontFamily:font,fontSize:16,cursor:checked?"default":"pointer"}}>
            {w}
          </button>
        ))}
      </div>

      {!checked
        ? <button style={btnStyle("teal")} disabled={placed.length===0} onClick={check}>Sjekk svar</button>
        : <button style={btnStyle("teal")} onClick={() => setIdx(i=>i+1)}>{idx+1<items.length?"Neste →":"Se resultat"}</button>
      }
    </div>
  );
}

function ContextQuiz({onDone, font}) {
  const items = useMemo(() => shuffle(GRAMMAR.context), []);
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [score, setScore] = useState(0);
  const [opts, setOpts] = useState([]);

  useEffect(() => {
    if (idx < items.length) {
      const q = items[idx];
      setOpts(shuffle([q.correct, ...q.wrong]));
      setChosen(null);
    }
  }, [idx, items]);

  if (idx >= items.length) {
    return <ResultScreen score={score} total={items.length} onRetry={() => { setIdx(0); setScore(0); }} onHome={onDone} color={C.blue} />;
  }

  const q = items[idx];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{fontSize:11,color:C.textMid,letterSpacing:"0.2em",textTransform:"uppercase"}}>{idx+1}/{items.length} · Kontekstsvar</div>
      <ProgressBar pct={idx/items.length} color={C.blue} />

      <div style={{background:C.bg2,border:`1px solid ${C.blue}33`,borderRadius:16,padding:"24px 20px",textAlign:"center"}}>
        <div style={{fontSize:13,color:C.textMid,marginBottom:8}}>{q.en}</div>
        <div style={{fontSize:26,fontFamily:font,color:C.text}}>{q.q}</div>
      </div>

      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {opts.map((opt,i) => {
          const correct = opt === q.correct;
          let bg=C.bg2,bc=C.border2,col=C.text;
          if (chosen) {
            if (correct) { bg="#0a2015"; bc=C.green; col=C.green; }
            else if (opt===chosen) { bg="#200a0a"; bc=C.red; col=C.red; }
          }
          return (
            <button key={i} disabled={!!chosen}
              style={{padding:"14px 16px",borderRadius:10,border:`1.5px solid ${bc}`,background:bg,color:col,fontFamily:font,fontSize:16,textAlign:"left",cursor:chosen?"default":"pointer",transition:"all 0.15s"}}
              onClick={() => { setChosen(opt); if(correct) setScore(s=>s+1); }}>
              {opt}
            </button>
          );
        })}
      </div>

      {chosen && (
        <button style={btnStyle("blue")} onClick={() => setIdx(i=>i+1)}>
          {idx+1 < items.length ? "Neste →" : "Se resultat"}
        </button>
      )}
    </div>
  );
}

function ErrorQuiz({onDone, font}) {
  const items = useMemo(() => shuffle(GRAMMAR.error), []);
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [score, setScore] = useState(0);

  if (idx >= items.length) {
    return <ResultScreen score={score} total={items.length} onRetry={() => { setIdx(0); setScore(0); }} onHome={onDone} color="#fb923c" />;
  }

  const q = items[idx];
  // Highlight the error word in the sentence
  const sentParts = q.s.split(q.error);

  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{fontSize:11,color:C.textMid,letterSpacing:"0.2em",textTransform:"uppercase"}}>{idx+1}/{items.length} · Finn feilen</div>
      <ProgressBar pct={idx/items.length} color="#fb923c" />

      <div style={{background:C.bg2,border:"1px solid #fb923c33",borderRadius:16,padding:"24px 20px",textAlign:"center"}}>
        <div style={{fontSize:13,color:C.textMid,marginBottom:12}}>{q.en}</div>
        <div style={{fontSize:24,fontFamily:font,color:C.text,lineHeight:1.6}}>
          {sentParts[0]}
          <span style={{color:C.red,textDecoration:"underline",fontWeight:700}}>{q.error}</span>
          {sentParts.slice(1).join(q.error)}
        </div>
        <div style={{fontSize:12,color:C.textDim,marginTop:8}}>Den understrekede partikkelen er feil — hva skal det være?</div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        {q.options.map((opt,i) => {
          const correct = opt === q.correct;
          let bg=C.bg2,bc=C.border2,col=C.text;
          if (chosen) {
            if (correct) { bg="#0a2015"; bc=C.green; col=C.green; }
            else if (opt===chosen) { bg="#200a0a"; bc=C.red; col=C.red; }
          }
          return (
            <button key={i} disabled={!!chosen}
              style={{padding:"16px 8px",borderRadius:10,border:`1.5px solid ${bc}`,background:bg,color:col,fontSize:22,fontFamily:font,cursor:chosen?"default":"pointer",transition:"all 0.15s"}}
              onClick={() => { setChosen(opt); if(correct) setScore(s=>s+1); }}>
              {opt}
            </button>
          );
        })}
      </div>

      {chosen && (
        <>
          <div style={{background:"#0a2015",border:`1px solid ${C.green}33`,borderRadius:10,padding:"10px 16px",fontSize:15,fontFamily:font,color:C.green,textAlign:"center"}}>
            ✓ {q.s.replace(q.error, q.correct)}
          </div>
          <button style={btnStyle("orange")} onClick={() => { setIdx(i=>i+1); setChosen(null); }}>
            {idx+1 < items.length ? "Neste →" : "Se resultat"}
          </button>
        </>
      )}
    </div>
  );
}

function MatchingQuiz({onDone, font}) {
  const allItems = GRAMMAR.matching;
  const items = useMemo(() => shuffle(allItems).slice(0, 6), []);
  const [leftSel, setLeftSel] = useState(null);
  const [rightSel, setRightSel] = useState(null);
  const [matched, setMatched] = useState({});
  const [wrong, setWrong] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const rights = useMemo(() => shuffle(items.map(x=>x.r)), [items]);

  useEffect(() => {
    if (leftSel && rightSel) {
      const correctRight = items.find(x=>x.l===leftSel)?.r;
      if (rightSel === correctRight) {
        const nm = {...matched, [leftSel]: rightSel};
        setMatched(nm);
        setScore(s=>s+1);
        setLeftSel(null); setRightSel(null);
        if (Object.keys(nm).length === items.length) setDone(true);
      } else {
        setWrong(leftSel);
        setTimeout(() => { setLeftSel(null); setRightSel(null); setWrong(null); }, 800);
      }
    }
  }, [leftSel, rightSel, items, matched]);

  if (done) {
    return <ResultScreen score={score} total={items.length} onRetry={() => { setMatched({}); setScore(0); setDone(false); setLeftSel(null); setRightSel(null); }} onHome={onDone} color={C.purple} />;
  }

  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      <div style={{fontSize:11,color:C.textMid,letterSpacing:"0.2em",textTransform:"uppercase"}}>Matching · {Object.keys(matched).length}/{items.length} par</div>
      <ProgressBar pct={Object.keys(matched).length/items.length} color={C.purple} />

      <div style={{fontSize:13,color:C.textMid,textAlign:"center"}}>Trykk én venstre og én høyre for å pare dem</div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {items.map((item,i) => {
            const isMatched = !!matched[item.l];
            const isSel = leftSel === item.l;
            const isWrong = wrong === item.l;
            return (
              <button key={i} disabled={isMatched}
                style={{padding:"12px 10px",borderRadius:8,border:`1.5px solid ${isMatched?C.green:isWrong?C.red:isSel?C.purple:C.border2}`,background:isMatched?"#0a2015":isWrong?"#200a0a":isSel?`${C.purple}22`:C.bg2,color:isMatched?C.green:isWrong?C.red:isSel?C.purple:C.text,fontFamily:font,fontSize:13,textAlign:"center",cursor:isMatched?"default":"pointer",transition:"all 0.2s",opacity:isMatched?0.5:1}}
                onClick={() => !isMatched && setLeftSel(item.l)}>
                {isMatched ? "✓" : item.l}
              </button>
            );
          })}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {rights.map((r,i) => {
            const isMatched = Object.values(matched).includes(r);
            const isSel = rightSel === r;
            return (
              <button key={i} disabled={isMatched}
                style={{padding:"12px 10px",borderRadius:8,border:`1.5px solid ${isMatched?C.green:isSel?C.purple:C.border2}`,background:isMatched?"#0a2015":isSel?`${C.purple}22`:C.bg2,color:isMatched?C.green:isSel?C.purple:C.text,fontSize:12,textAlign:"center",cursor:isMatched?"default":"pointer",transition:"all 0.2s",opacity:isMatched?0.5:1}}
                onClick={() => !isMatched && setRightSel(r)}>
                {isMatched ? "✓" : r}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Shared UI ─────────────────────────────────────────────────────────────────

function ProgressBar({pct, color}) {
  return (
    <div style={{height:4,background:C.border2,borderRadius:2,overflow:"hidden"}}>
      <div style={{height:"100%",width:`${pct*100}%`,background:color,borderRadius:2,transition:"width 0.3s ease"}} />
    </div>
  );
}

function ResultScreen({score, total, onRetry, onHome, color}) {
  const pct = score/total;
  return (
    <div style={{display:"flex",flexDirection:"column",gap:16,textAlign:"center",padding:"20px 0"}}>
      <div style={{fontSize:52}}>{pct>=0.8?"🎉":pct>=0.5?"👏":"💪"}</div>
      <div style={{fontSize:64,fontWeight:900,color,lineHeight:1}}>{score}/{total}</div>
      <div style={{fontSize:14,color:C.textMid}}>{pct>=0.8?"Utmerket!":pct>=0.5?"Bra jobba!":"Fortsett å øve!"}</div>
      <div style={{display:"flex",flexDirection:"column",gap:8,marginTop:8}}>
        <button style={btnStyle("primary")} onClick={onRetry}>Øv igjen</button>
        <button style={btnStyle("ghost")} onClick={onHome}>Tilbake</button>
      </div>
    </div>
  );
}

function btnStyle(v="primary") {
  const base = {padding:"14px 24px",borderRadius:10,border:"none",fontFamily:"'Noto Serif JP',serif",fontSize:14,fontWeight:600,cursor:"pointer",letterSpacing:"0.05em",transition:"opacity 0.15s",width:"100%"};
  if (v==="primary") return {...base,background:`linear-gradient(135deg,${C.gold},#c08830)`,color:"#0a0808"};
  if (v==="ghost")   return {...base,background:"transparent",color:C.textMid,border:`1px solid ${C.border}`};
  if (v==="teal")    return {...base,background:`linear-gradient(135deg,#0f766e,#0d9488)`,color:"#f0fdf4"};
  if (v==="green")   return {...base,background:`linear-gradient(135deg,#166534,#15803d)`,color:"#f0fdf4"};
  if (v==="blue")    return {...base,background:`linear-gradient(135deg,#1e3a5f,#2563eb)`,color:"#f0fdf4"};
  if (v==="orange")  return {...base,background:`linear-gradient(135deg,#9a3412,#ea580c)`,color:"#fff7ed"};
  return base;
}

// ── Main App ──────────────────────────────────────────────────────────────────

export default function JapaneseApp() {
  const [screen, setScreen]             = useState("home");
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [quizWords, setQuizWords]       = useState([]);
  const [qIdx, setQIdx]                 = useState(0);
  const [score, setScore]               = useState(0);
  const [selected, setSelected]         = useState(null);
  const [showRomaji, setShowRomaji]     = useState(false);
  const [flashFlipped, setFlashFlipped] = useState(false);
  const [writeVal, setWriteVal]         = useState("");
  const [writeResult, setWriteResult]   = useState(null);
  const [streak, setStreak]             = useState(0);
  const [progress, setProgress]         = useState({});
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [kanaFont, setKanaFont]         = useState("serif");
  const [showFontPicker, setShowFontPicker] = useState(false);
  // Counter
  const [counterCat, setCounterCat]     = useState(null);
  const [counterQ, setCounterQ]         = useState(null);
  const [counterVal, setCounterVal]     = useState("");
  const [counterResult, setCounterResult] = useState(null);
  const [counterScore, setCounterScore] = useState(0);
  const [counterQueue, setCounterQueue] = useState([]);
  const [counterQIdx, setCounterQIdx]   = useState(0);

  const lockedOptions = useRef({});

  useEffect(() => {
    async function load() {
      try {
        const r = await window.storage.get("jp-progress"); if(r) setProgress(JSON.parse(r.value));
        const s = await window.storage.get("jp-streak");   if(s) setStreak(parseInt(s.value,10)||0);
        const f = await window.storage.get("jp-font");     if(f) setKanaFont(f.value);
      } catch {}
    }
    load();
  }, []);

  const sp = async p => { try { await window.storage.set("jp-progress", JSON.stringify(p)); } catch {} };
  const ss = async s => { try { await window.storage.set("jp-streak", String(s)); } catch {} };
  const sf = async f => { try { await window.storage.set("jp-font", f); } catch {} };

  const lessons = useMemo(() => {
    const map = {};
    ALL_WORDS.forEach(w => { const l=w.l||"ukjent"; if(!map[l])map[l]=[]; map[l].push(w); });
    return map;
  }, []);

  const lessonKeys = useMemo(() =>
    Object.keys(lessons).filter(l=>l!=="ukjent").sort((a,b)=>{
      const pa=a.split("-").map(Number), pb=b.split("-").map(Number);
      return pa[0]!==pb[0] ? pa[0]-pb[0] : (pa[1]||0)-(pb[1]||0);
    }), [lessons]);

  function getLockedOptions(word, key) {
    if (lockedOptions.current[key]) return lockedOptions.current[key];
    const others = shuffle(ALL_WORDS.filter(w=>w.e!==word.e)).slice(0,3);
    const opts = shuffle([word,...others]);
    lockedOptions.current[key] = opts;
    return opts;
  }

  function startQuiz(lesson, activity) {
    lockedOptions.current = {};
    const pool = shuffle(lesson ? (lessons[lesson]||[]) : ALL_WORDS).slice(0,20);
    setQuizWords(pool); setQIdx(0); setScore(0); setSelected(null);
    setFlashFlipped(false); setWriteVal(""); setWriteResult(null);
    setShowRomaji(false); setSessionCorrect(0);
    setSelectedActivity(activity);
    setScreen("quiz");
  }

  // Counter
  function buildCounterQueue(cat) {
    const items=[];
    const cats = cat ? [cat] : Object.keys(COUNTER_CATS);
    cats.forEach(c => COUNTER_CATS[c].forEach(e => items.push({...e,cat:c})));
    return shuffle(items).slice(0,20);
  }
  function startCounterQuiz(cat) {
    const queue=buildCounterQueue(cat);
    setCounterQueue(queue); setCounterQIdx(0); setCounterScore(0);
    setCounterVal(""); setCounterResult(null); setCounterCat(cat);
    loadCounterQ(queue,0); setScreen("counter");
  }
  function loadCounterQ(queue,idx) {
    if(idx>=queue.length){setScreen("counter-result");return;}
    const e=queue[idx];
    const examples=CAT_EXAMPLES[e.cat]||["ting"];
    const example=examples[(e.num-1)%examples.length]||examples[0];
    setCounterQ({...e,example}); setCounterVal(""); setCounterResult(null);
  }
  function submitCounterAnswer() {
    if(!counterQ)return;
    const val=counterVal.trim();
    const correct=val===counterQ.kana||val.toLowerCase()===counterQ.romaji.toLowerCase()
      ||(counterQ.romaji.includes("/")&&counterQ.romaji.split("/").map(r=>r.trim().toLowerCase()).includes(val.toLowerCase()));
    setCounterResult(correct?"correct":"wrong");
    if(correct)setCounterScore(s=>s+1);
  }
  function advanceCounter() {
    const next=counterQIdx+1; setCounterQIdx(next);
    if(next>=counterQueue.length){const ns=streak+1;setStreak(ns);ss(ns);setScreen("counter-result");}
    else loadCounterQ(counterQueue,next);
  }

  // Vocab quiz
  function handleChoice(word,choice) {
    if(selected)return;
    setSelected(choice);
    if(choice.e===word.e){setScore(s=>s+1);setSessionCorrect(p=>p+1);}
  }
  function handleWriteSubmit() {
    const word=quizWords[qIdx]; if(!word)return;
    const correct=writeVal.trim()===word.k||writeVal.trim().toLowerCase()===word.r?.toLowerCase();
    setWriteResult(correct?"correct":"wrong");
    if(correct){setScore(s=>s+1);setSessionCorrect(p=>p+1);}
  }
  function nextQuestion() {
    if(qIdx+1>=quizWords.length){
      const newP={...progress},key=selectedLesson||"__all";
      if(!newP[key])newP[key]={correct:0,total:0};
      newP[key].correct+=sessionCorrect; newP[key].total+=quizWords.length;
      setProgress(newP); sp(newP);
      const ns=streak+1; setStreak(ns); ss(ns);
      setScreen("result");
    } else {
      setQIdx(q=>q+1); setSelected(null); setFlashFlipped(false);
      setWriteVal(""); setWriteResult(null); setShowRomaji(false);
    }
  }
  function getLessonProgress(lesson) {
    const p=progress[lesson]; if(!p||p.total===0)return 0;
    return Math.min(100,Math.round((p.correct/p.total)*100));
  }

  const currentWord = quizWords[qIdx];
  const optKey = currentWord ? `${qIdx}-${currentWord.k}` : "";
  const options = currentWord ? getLockedOptions(currentWord,optKey) : [];
  const fontCss = KANA_FONTS.find(f=>f.id===kanaFont)?.css || KANA_FONTS[0].css;

  const optStyle = (state) => ({
    padding:"14px 10px",borderRadius:10,
    border:`1.5px solid ${state==="correct"?C.green:state==="wrong"?C.red:C.border2}`,
    background:state==="correct"?"#0a2015":state==="wrong"?"#200a0a":C.bg2,
    color:state==="correct"?C.green:state==="wrong"?C.red:C.text,
    cursor:state?"default":"pointer",fontSize:13,textAlign:"center",
    transition:"all 0.15s",fontFamily:"'Noto Serif JP',serif",lineHeight:1.3,
  });

  return (
    <div style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:"'Noto Serif JP',Georgia,serif",maxWidth:480,margin:"0 auto",position:"relative"}}>
      <link href={FONT_URL} rel="stylesheet" />
      <style>{`
        *{box-sizing:border-box} body{margin:0;background:${C.bg}}
        button:active{opacity:0.72}
        input:focus{border-color:${C.gold}!important;box-shadow:0 0 0 2px ${C.gold}22}
        input::placeholder{color:${C.textDim};font-size:16px}
        @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
        .fade{animation:fadeIn 0.2s ease}
      `}</style>

      {/* Font picker modal */}
      {showFontPicker && (
        <div style={{position:"fixed",inset:0,background:"#000000bb",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:100,padding:16}}
          onClick={()=>setShowFontPicker(false)}>
          <div style={{background:"#13120f",border:`1px solid ${C.border}`,borderRadius:20,padding:24,width:"100%",maxWidth:440,paddingBottom:32}}
            onClick={e=>e.stopPropagation()}>
            <div style={{fontSize:11,color:C.textMid,letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:16}}>Velg kana-font</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8}}>
              {KANA_FONTS.map(f=>(
                <button key={f.id} style={{padding:"8px 6px",borderRadius:10,cursor:"pointer",border:`1.5px solid ${kanaFont===f.id?C.gold:C.border2}`,background:kanaFont===f.id?"#1e1608":C.bg2,color:kanaFont===f.id?C.gold:C.textMid,display:"flex",alignItems:"center",gap:4,flexDirection:"column"}}
                  onClick={()=>{setKanaFont(f.id);sf(f.id);setShowFontPicker(false);}}>
                  <span style={{fontFamily:f.css,fontSize:28}}>{f.sample}</span>
                  <span style={{fontSize:10}}>{f.label}</span>
                </button>
              ))}
            </div>
            <div style={{marginTop:16,padding:"16px",background:C.bg2,borderRadius:12,textAlign:"center",fontFamily:fontCss,fontSize:44,color:C.text}}>あいうえお</div>
            <button style={{...btnStyle("ghost"),marginTop:12}} onClick={()=>setShowFontPicker(false)}>Lukk</button>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{padding:"18px 20px 12px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"space-between",background:"linear-gradient(180deg,#0f0c08 0%,transparent 100%)"}}>
        <div style={{cursor:"pointer"}} onClick={()=>setScreen("home")}>
          <div style={{fontSize:22,fontWeight:700,color:C.gold,letterSpacing:"0.05em"}}>日本語</div>
          <div style={{fontSize:11,color:C.textDim,letterSpacing:"0.15em",textTransform:"uppercase",marginTop:2}}>Marugoto A1 · MottoMotto</div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <button style={{display:"flex",alignItems:"center",gap:5,background:"none",border:`1px solid ${C.border2}`,borderRadius:8,padding:"5px 10px",cursor:"pointer",color:C.textMid}}
            onClick={()=>setShowFontPicker(true)}>
            <span style={{fontFamily:fontCss,fontSize:18,lineHeight:1,color:C.text}}>あ</span>
          </button>
          <div style={{display:"flex",alignItems:"center",gap:4,background:"#1a1408",border:"1px solid #3a2e1a",borderRadius:20,padding:"5px 12px",fontSize:14,fontWeight:700,color:"#f59e0b"}}>
            🔥{streak}
          </div>
        </div>
      </div>

      {/* HOME */}
      {screen==="home" && (
        <div className="fade">
          {/* Grammar section */}
          <div style={{padding:"16px 20px 8px"}}>
            <div style={{fontSize:11,color:C.textMid,letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:10}}>Grammatikkøvelser · A1.1</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {GRAMMAR_ACTIVITIES.map(act=>(
                <div key={act.id} style={{background:C.bg2,border:`1px solid ${act.color}44`,borderRadius:12,padding:"14px 12px",cursor:"pointer",display:"flex",flexDirection:"column",gap:6}}
                  onClick={()=>{setSelectedActivity(act.id);setScreen("grammar");}}>
                  <div style={{width:34,height:34,borderRadius:8,background:`${act.color}22`,border:`1px solid ${act.color}44`,display:"flex",alignItems:"center",justifyContent:"center",color:act.color,fontSize:16,fontFamily:fontCss}}>{act.icon}</div>
                  <div style={{fontSize:12,fontWeight:600,color:C.text}}>{act.name}</div>
                  <div style={{fontSize:10,color:C.textMid}}>{act.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Vocab lessons */}
          <div style={{padding:"12px 20px 8px"}}>
            <div style={{fontSize:11,color:C.textMid,letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:10}}>Gloser · {ALL_WORDS.length} ord</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
              {lessonKeys.map(lesson=>{
                const pct=getLessonProgress(lesson), count=(lessons[lesson]||[]).length;
                return (
                  <div key={lesson} style={{background:C.bg2,border:`1px solid ${C.border2}`,borderRadius:10,padding:"12px 8px",cursor:"pointer",textAlign:"center",position:"relative",overflow:"hidden"}}
                    onClick={()=>{setSelectedLesson(lesson);setScreen("lesson");}}>
                    <div style={{fontSize:18,fontWeight:700,color:C.gold}}>L{lesson}</div>
                    <div style={{fontSize:10,color:C.textDim,marginTop:2}}>{count} ord</div>
                    {pct>0&&<div style={{position:"absolute",bottom:0,left:0,height:3,width:`${pct}%`,background:`linear-gradient(90deg,${C.gold},${C.goldLt})`,borderRadius:"0 2px 2px 0"}} />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tellemåter */}
          <div style={{padding:"8px 20px 12px"}}>
            <div style={{fontSize:11,color:C.textMid,letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:10}}>Tellemåter · 助数詞</div>
            <div style={{background:"linear-gradient(135deg,#0a1a18,#0f2220)",border:`1px solid ${C.teal}44`,borderRadius:12,padding:"14px 16px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between"}}
              onClick={()=>setScreen("counter-pick")}>
              <div>
                <div style={{fontSize:14,fontWeight:600,color:C.teal}}>Øv tellemåter</div>
                <div style={{fontSize:11,color:C.textMid,marginTop:2}}>7 kategorier · 70 former</div>
              </div>
              <div style={{fontFamily:fontCss,fontSize:28,color:C.teal}}>一二三</div>
            </div>
          </div>

          {/* Quick all-words */}
          <div style={{padding:"0 20px 24px"}}>
            <div style={{fontSize:11,color:C.textMid,letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:10}}>Alle gloser – rask øvelse</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
              {VOCAB_ACTIVITIES.map(act=>(
                <div key={act.id} style={{background:C.bg2,border:`1px solid ${act.color}44`,borderRadius:12,padding:"14px 10px",cursor:"pointer",display:"flex",flexDirection:"column",gap:6,alignItems:"center",textAlign:"center"}}
                  onClick={()=>{setSelectedLesson(null);startQuiz(null,act.id);}}>
                  <div style={{fontSize:20,color:act.color}}>{act.icon}</div>
                  <div style={{fontSize:11,fontWeight:600,color:C.text}}>{act.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* GRAMMAR SCREEN */}
      {screen==="grammar" && (
        <div className="fade" style={{padding:"16px 20px",minHeight:"80vh"}}>
          <button style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",color:C.textMid,cursor:"pointer",fontSize:13,padding:"0 0 16px",fontFamily:"'Noto Serif JP',serif"}}
            onClick={()=>setScreen("home")}>
            ← Tilbake
          </button>
          {selectedActivity==="particle"  && <ParticleQuiz  onDone={()=>setScreen("home")} font={fontCss} />}
          {selectedActivity==="sentence"  && <SentenceQuiz  onDone={()=>setScreen("home")} font={fontCss} />}
          {selectedActivity==="context"   && <ContextQuiz   onDone={()=>setScreen("home")} font={fontCss} />}
          {selectedActivity==="error"     && <ErrorQuiz     onDone={()=>setScreen("home")} font={fontCss} />}
          {selectedActivity==="matching"  && <MatchingQuiz  onDone={()=>setScreen("home")} font={fontCss} />}
        </div>
      )}

      {/* LESSON */}
      {screen==="lesson" && selectedLesson && (
        <div className="fade">
          <div style={{padding:"16px 20px"}}>
            <button style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",color:C.textMid,cursor:"pointer",fontSize:13,padding:0,fontFamily:"'Noto Serif JP',serif"}}
              onClick={()=>setScreen("home")}>← Tilbake</button>
            <div style={{marginTop:16,marginBottom:20}}>
              <div style={{fontSize:18,fontWeight:700,color:C.gold}}>Leksjon {selectedLesson}</div>
              <div style={{fontSize:12,color:C.textMid,marginTop:4}}>{(lessons[selectedLesson]||[]).length} ord · {getLessonProgress(selectedLesson)}% fullført</div>
            </div>
            <div style={{fontSize:11,color:C.textMid,letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:12}}>Velg aktivitet</div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {VOCAB_ACTIVITIES.map(act=>(
                <div key={act.id} style={{background:C.bg2,border:`1px solid ${act.color}44`,borderRadius:12,padding:"16px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:14}}
                  onClick={()=>{setSelectedActivity(act.id);startQuiz(selectedLesson,act.id);}}>
                  <div style={{width:40,height:40,borderRadius:8,background:`${act.color}22`,border:`1px solid ${act.color}44`,display:"flex",alignItems:"center",justifyContent:"center",color:act.color,fontSize:18}}>{act.icon}</div>
                  <div>
                    <div style={{fontSize:13,fontWeight:600,color:C.text}}>{act.name}</div>
                    <div style={{fontSize:11,color:C.textMid,marginTop:2}}>{act.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* COUNTER PICK */}
      {screen==="counter-pick" && (
        <div className="fade">
          <div style={{padding:"16px 20px"}}>
            <button style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",color:C.textMid,cursor:"pointer",fontSize:13,padding:0,fontFamily:"'Noto Serif JP',serif"}}
              onClick={()=>setScreen("home")}>← Tilbake</button>
            <div style={{marginTop:16,marginBottom:20}}>
              <div style={{fontSize:18,fontWeight:700,color:C.teal}}>Tellemåter · 助数詞</div>
              <div style={{fontSize:12,color:C.textMid,marginTop:4}}>Velg kategori eller øv på alle</div>
            </div>
            <div style={{background:"linear-gradient(135deg,#0a1a18,#0f2220)",border:`1px solid ${C.teal}66`,borderRadius:12,padding:"16px",cursor:"pointer",marginBottom:10,display:"flex",alignItems:"center",justifyContent:"space-between"}}
              onClick={()=>startCounterQuiz(null)}>
              <div><div style={{fontSize:14,fontWeight:700,color:C.teal}}>Alle kategorier</div><div style={{fontSize:11,color:C.textMid,marginTop:2}}>70 former · blandet</div></div>
              <div style={{fontFamily:fontCss,fontSize:24,color:C.teal}}>一〜十</div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {Object.entries(CAT_NO).map(([cat,label])=>{
                const items=COUNTER_CATS[cat]||[];
                return (
                  <div key={cat} style={{background:C.bg2,border:`1px solid ${C.teal}33`,borderRadius:12,padding:"14px 16px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between"}}
                    onClick={()=>startCounterQuiz(cat)}>
                    <div><div style={{fontSize:13,fontWeight:600,color:C.text}}>{label}</div><div style={{fontSize:11,color:C.textMid,marginTop:2}}>{items.length} former (1–10)</div></div>
                    <div style={{fontFamily:fontCss,fontSize:22,color:C.teal}}>{items[0]?.kana||""}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* COUNTER QUIZ */}
      {screen==="counter" && counterQ && (
        <div className="fade" style={{padding:"20px",minHeight:"80vh",display:"flex",flexDirection:"column",gap:18}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <button style={{background:"none",border:"none",color:C.textMid,cursor:"pointer",padding:0,fontSize:18}} onClick={()=>setScreen("counter-pick")}>←</button>
            <ProgressBar pct={counterQIdx/counterQueue.length} color={C.teal} />
            <div style={{fontSize:12,color:C.textMid,minWidth:40,textAlign:"right"}}>{counterQIdx+1}/{counterQueue.length}</div>
          </div>
          <div style={{textAlign:"center",padding:"28px 20px",background:"linear-gradient(135deg,#0a1a18,#0f2220)",border:`1px solid ${C.teal}44`,borderRadius:16}}>
            <div style={{fontSize:13,color:C.textMid,marginBottom:8}}>Hvordan sier du...</div>
            <div style={{fontSize:56,fontWeight:900,color:C.teal,lineHeight:1}}>{counterQ.num}</div>
            <div style={{fontSize:20,color:C.text,marginTop:8}}>{counterQ.example}</div>
            <div style={{fontSize:11,color:C.textDim,marginTop:6}}>{CAT_NO[counterQ.cat]}</div>
          </div>
          <input style={{width:"100%",background:C.bg2,border:`1.5px solid ${counterResult==="correct"?C.green:counterResult==="wrong"?C.red:C.border2}`,borderRadius:10,padding:"14px 16px",color:C.text,fontSize:28,fontFamily:fontCss,textAlign:"center",outline:"none",letterSpacing:"0.1em",boxSizing:"border-box"}}
            value={counterVal} onChange={e=>setCounterVal(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&!counterResult&&submitCounterAnswer()}
            placeholder="Skriv her..." disabled={!!counterResult} autoFocus />
          {counterResult && (
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:20,color:counterResult==="correct"?C.green:C.red,fontWeight:700}}>{counterResult==="correct"?"✓ 正解！":"✗ 不正解"}</div>
              <div style={{fontFamily:fontCss,color:C.teal,fontSize:40,marginTop:6}}>{counterQ.kana}</div>
              <div style={{color:C.textMid,fontSize:14,marginTop:4}}>{counterQ.romaji}</div>
            </div>
          )}
          {!counterResult
            ? <button style={btnStyle("teal")} onClick={submitCounterAnswer}>Sjekk svar</button>
            : <button style={btnStyle("teal")} onClick={advanceCounter}>{counterQIdx+1<counterQueue.length?"Neste →":"Se resultat"}</button>
          }
        </div>
      )}

      {/* COUNTER RESULT */}
      {screen==="counter-result" && (
        <div className="fade" style={{padding:"20px",minHeight:"80vh",display:"flex",flexDirection:"column",gap:18}}>
          <div style={{textAlign:"center",padding:"40px 20px"}}>
            <div style={{fontSize:52,marginBottom:16}}>{counterScore/counterQueue.length>=0.8?"🎉":counterScore/counterQueue.length>=0.5?"👏":"💪"}</div>
            <div style={{fontSize:64,fontWeight:900,color:C.teal,lineHeight:1}}>{counterScore}/{counterQueue.length}</div>
            <div style={{fontSize:14,color:C.textMid,marginTop:8}}>{counterScore/counterQueue.length>=0.8?"Utmerket!":counterScore/counterQueue.length>=0.5?"Bra jobba!":"Fortsett å øve!"}</div>
            <div style={{marginTop:20,fontSize:14,color:"#f59e0b"}}>🔥 {streak} dager på rad</div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            <button style={btnStyle("teal")} onClick={()=>startCounterQuiz(counterCat)}>Øv igjen</button>
            <button style={btnStyle("ghost")} onClick={()=>setScreen("counter-pick")}>Velg kategori</button>
            <button style={btnStyle("ghost")} onClick={()=>setScreen("home")}>Hjem</button>
          </div>
        </div>
      )}

      {/* VOCAB QUIZ */}
      {screen==="quiz" && currentWord && (
        <div className="fade" style={{padding:"20px",minHeight:"80vh",display:"flex",flexDirection:"column",gap:18}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <button style={{background:"none",border:"none",color:C.textMid,cursor:"pointer",padding:0,fontSize:18}} onClick={()=>setScreen(selectedLesson?"lesson":"home")}>←</button>
            <ProgressBar pct={qIdx/quizWords.length} color={C.gold} />
            <div style={{fontSize:12,color:C.textMid,minWidth:40,textAlign:"right"}}>{qIdx+1}/{quizWords.length}</div>
          </div>

          {selectedActivity==="multiple" && (<>
            <div style={{textAlign:"center",padding:"28px 20px",background:`linear-gradient(135deg,${C.bg2} 0%,#1a1408 100%)`,border:`1px solid ${C.border}`,borderRadius:16,position:"relative"}}>
              <div style={{position:"absolute",top:0,right:0,width:120,height:120,background:"radial-gradient(circle at 80% 20%,#d4a84318 0%,transparent 70%)",pointerEvents:"none"}} />
              <div style={{fontSize:62,lineHeight:1.1,color:C.text,fontFamily:fontCss,letterSpacing:"0.05em"}}>{currentWord.k}</div>
              <div style={{fontSize:15,color:C.textMid,marginTop:8,fontFamily:"monospace",letterSpacing:"0.1em"}}>{showRomaji?currentWord.r:"···"}</div>
              <button style={{background:"none",border:"none",cursor:"pointer",color:C.textMid,fontSize:11,margin:"10px auto 0",display:"block"}}
                onClick={()=>setShowRomaji(r=>!r)}>{showRomaji?"Skjul romaji":"Vis romaji"}</button>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {options.map((opt,i)=>{
                let state=null;
                if(selected){if(opt.e===currentWord.e)state="correct";else if(selected===opt)state="wrong";}
                return <button key={i} style={optStyle(state)} onClick={()=>handleChoice(currentWord,opt)}>{opt.e}</button>;
              })}
            </div>
            {selected && <button style={btnStyle()} onClick={nextQuestion}>{qIdx+1<quizWords.length?"Neste →":"Se resultat"}</button>}
          </>)}

          {selectedActivity==="write" && (<>
            <div style={{textAlign:"center",padding:"28px 20px",background:`linear-gradient(135deg,${C.bg2} 0%,#1a1408 100%)`,border:`1px solid ${C.border}`,borderRadius:16}}>
              <div style={{fontSize:22,color:C.text,marginBottom:8}}>{currentWord.e}</div>
              <div style={{fontSize:12,color:C.textDim}}>Skriv på kana eller romaji</div>
            </div>
            <input style={{width:"100%",background:C.bg2,border:`1.5px solid ${writeResult==="correct"?C.green:writeResult==="wrong"?C.red:C.border2}`,borderRadius:10,padding:"14px 16px",color:C.text,fontSize:28,fontFamily:fontCss,textAlign:"center",outline:"none",letterSpacing:"0.1em",boxSizing:"border-box"}}
              value={writeVal} onChange={e=>setWriteVal(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&!writeResult&&handleWriteSubmit()}
              placeholder="Skriv her..." disabled={!!writeResult} autoFocus />
            {writeResult && (
              <div style={{textAlign:"center"}}>
                <div style={{fontSize:20,color:writeResult==="correct"?C.green:C.red,fontWeight:700}}>{writeResult==="correct"?"✓ 正解！":"✗ 不正解"}</div>
                <div style={{fontFamily:fontCss,color:C.gold,fontSize:32,marginTop:6}}>{currentWord.k}</div>
                {currentWord.r&&<div style={{color:C.textMid,fontSize:13,marginTop:4}}>{currentWord.r}</div>}
              </div>
            )}
            {!writeResult
              ? <button style={btnStyle()} onClick={handleWriteSubmit}>Sjekk svar</button>
              : <button style={btnStyle()} onClick={nextQuestion}>{qIdx+1<quizWords.length?"Neste →":"Se resultat"}</button>}
          </>)}

          {selectedActivity==="flash" && (<>
            <div style={{minHeight:200,borderRadius:16,border:`1px solid ${C.border}`,background:flashFlipped?"linear-gradient(135deg,#0a2015,#0f2a1a)":`linear-gradient(135deg,${C.bg2},#1a1408)`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",padding:28,textAlign:"center",transition:"background 0.3s"}}
              onClick={()=>setFlashFlipped(f=>!f)}>
              {!flashFlipped ? (<>
                <div style={{fontSize:62,lineHeight:1.1,color:C.text,fontFamily:fontCss}}>{currentWord.k}</div>
                {currentWord.r&&<div style={{fontSize:15,color:C.textMid,marginTop:8,fontFamily:"monospace"}}>{currentWord.r}</div>}
                <div style={{color:C.textDim,fontSize:12,marginTop:16}}>Trykk for å avsløre</div>
              </>) : (<>
                <div style={{fontSize:22,color:C.green,fontWeight:700}}>{currentWord.e}</div>
                <div style={{fontSize:44,color:C.gold,fontFamily:fontCss,marginTop:8}}>{currentWord.k}</div>
              </>)}
            </div>
            {flashFlipped && (
              <div style={{display:"flex",gap:8}}>
                <button style={{...btnStyle("ghost"),flex:1,borderColor:C.red,color:C.red}} onClick={()=>nextQuestion()}>✗ Visste ikke</button>
                <button style={{flex:1,padding:"14px 24px",borderRadius:10,border:"none",background:"linear-gradient(135deg,#166534,#14532d)",color:C.green,fontFamily:"'Noto Serif JP',serif",fontSize:14,fontWeight:600,cursor:"pointer"}} onClick={()=>{setScore(s=>s+1);setSessionCorrect(p=>p+1);nextQuestion();}}>✓ Kunne det!</button>
              </div>
            )}
          </>)}
        </div>
      )}

      {/* RESULT */}
      {screen==="result" && (
        <div className="fade" style={{padding:"20px",minHeight:"80vh",display:"flex",flexDirection:"column",gap:18}}>
          <div style={{textAlign:"center",padding:"40px 20px"}}>
            <div style={{fontSize:52,marginBottom:16}}>{score/quizWords.length>=0.8?"🎉":score/quizWords.length>=0.5?"👏":"💪"}</div>
            <div style={{fontSize:64,fontWeight:900,color:C.gold,lineHeight:1}}>{score}/{quizWords.length}</div>
            <div style={{fontSize:14,color:C.textMid,marginTop:8}}>{score/quizWords.length>=0.8?"Utmerket!":score/quizWords.length>=0.5?"Bra jobba!":"Fortsett å øve!"}</div>
            <div style={{marginTop:20,fontSize:14,color:"#f59e0b"}}>🔥 {streak} dager på rad</div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            <button style={btnStyle()} onClick={()=>startQuiz(selectedLesson,selectedActivity)}>Øv igjen</button>
            <button style={btnStyle("ghost")} onClick={()=>setScreen("home")}>Tilbake til hjem</button>
          </div>
        </div>
      )}
    </div>
  );
}
