import { useState, useEffect, useRef, useMemo, useCallback } from "react";

// ── Data ─────────────────────────────────────────────────────────────────────
const ALL_WORDS = [{"e":"10th","r":"tooka","k":"とおか","l":"1-2"},{"e":"14th","r":"juu-yokka","k":"じゅうよっか","l":"1-2"},{"e":"1st","r":"tsuitachi","k":"ついたち","l":"1-2"},{"e":"20th","r":"hatsuka","k":"はつか","l":"1-2"},{"e":"2nd","r":"futsuka","k":"ふつか","l":"1-2"},{"e":"3rd","r":"mikka","k":"みっか","l":"1-2"},{"e":"4th","r":"yokka","k":"よっか","l":"1-2"},{"e":"5th","r":"itsuka","k":"いつか","l":"1-2"},{"e":"6th","r":"muika","k":"むいか","l":"1-2"},{"e":"7th","r":"nanoka","k":"なのか","l":"1-2"},{"e":"8th","r":"yooka","k":"ようか","l":"1-2"},{"e":"9th","r":"kokonoka","k":"ここのか","l":"1-2"},{"e":"January","r":"ichigatsu","k":"いちがつ","l":"1-2"},{"e":"February","r":"nigatsu","k":"にがつ","l":"1-2"},{"e":"March","r":"sangatsu","k":"さんがつ","l":"1-2"},{"e":"April","r":"shigatsu","k":"しがつ","l":"1-2"},{"e":"May","r":"gogatsu","k":"ごがつ","l":"1-2"},{"e":"June","r":"rokugatsu","k":"ろくがつ","l":"1-2"},{"e":"July","r":"shichigatsu","k":"しちがつ","l":"1-2"},{"e":"August","r":"hachigatsu","k":"はちがつ","l":"1-2"},{"e":"September","r":"kugatsu","k":"くがつ","l":"1-2"},{"e":"October","r":"juugatsu","k":"じゅうがつ","l":"1-2"},{"e":"November","r":"juuichigatsu","k":"じゅういちがつ","l":"1-2"},{"e":"December","r":"juunigatsu","k":"じゅうにがつ","l":"1-2"},{"e":"birthday","r":"tanjoubi","k":"たんじょうび","l":"1-2"},{"e":"today","r":"kyoo","k":"きょう","l":"9-10"},{"e":"tomorrow","r":"ashita","k":"あした","l":"9-10"},{"e":"yesterday","r":"kinoo","k":"きのう","l":"9-10"},{"e":"Monday","r":"getsuyoobi","k":"げつようび","l":"9-10"},{"e":"Tuesday","r":"kayoobi","k":"かようび","l":"9-10"},{"e":"Wednesday","r":"suiyoobi","k":"すいようび","l":"9-10"},{"e":"Thursday","r":"mokuyoobi","k":"もくようび","l":"9-10"},{"e":"Friday","r":"kin'yoobi","k":"きんようび","l":"9-10"},{"e":"Saturday","r":"doyoobi","k":"どようび","l":"9-10"},{"e":"Sunday","r":"nichiyoobi","k":"にちようび","l":"9-10"},{"e":"Japan","r":"nihon","k":"にほん","l":"1-2"},{"e":"Japanese (language)","r":"nihongo","k":"にほんご","l":"1-2"},{"e":"person","r":"hito","k":"ひと","l":"1-2"},{"e":"name","r":"namae","k":"なまえ","l":"1-2"},{"e":"I / me","r":"watashi","k":"わたし","l":"1-2"},{"e":"you","r":"anata","k":"あなた","l":"1-2"},{"e":"he / she","r":"kare / kanojo","k":"かれ／かのじょ","l":"1-2"},{"e":"teacher","r":"sensei","k":"せんせい","l":"1-2"},{"e":"student","r":"gakusei","k":"がくせい","l":"1-2"},{"e":"company employee","r":"kaishain","k":"かいしゃいん","l":"1-2"},{"e":"doctor","r":"isha","k":"いしゃ","l":"1-2"},{"e":"nurse","r":"kangoshi","k":"かんごし","l":"1-2"},{"e":"engineer","r":"enjinia","k":"エンジニア","l":"1-2"},{"e":"mother","r":"haha / okaasan","k":"はは／おかあさん","l":"1-2"},{"e":"father","r":"chichi / otousan","k":"ちち／おとうさん","l":"1-2"},{"e":"older sister","r":"ane / oneesan","k":"あね／おねえさん","l":"1-2"},{"e":"older brother","r":"ani / oniisan","k":"あに／おにいさん","l":"1-2"},{"e":"younger sister","r":"imooto","k":"いもうと","l":"1-2"},{"e":"younger brother","r":"otooto","k":"おとうと","l":"1-2"},{"e":"children","r":"kodomo","k":"こども","l":"1-2"},{"e":"family","r":"kazoku","k":"かぞく","l":"1-2"},{"e":"friend","r":"tomodachi","k":"ともだち","l":"1-2"},{"e":"one","r":"ichi","k":"いち","l":"1-2"},{"e":"two","r":"ni","k":"に","l":"1-2"},{"e":"three","r":"san","k":"さん","l":"1-2"},{"e":"four","r":"shi / yon","k":"し／よん","l":"1-2"},{"e":"five","r":"go","k":"ご","l":"1-2"},{"e":"six","r":"roku","k":"ろく","l":"1-2"},{"e":"seven","r":"shichi / nana","k":"しち／なな","l":"1-2"},{"e":"eight","r":"hachi","k":"はち","l":"1-2"},{"e":"nine","r":"ku / kyuu","k":"く／きゅう","l":"1-2"},{"e":"ten","r":"juu","k":"じゅう","l":"1-2"},{"e":"hello","r":"konnichiwa","k":"こんにちは","l":"1-2"},{"e":"good morning","r":"ohayoo gozaimasu","k":"おはようございます","l":"1-2"},{"e":"good evening","r":"konbanwa","k":"こんばんは","l":"1-2"},{"e":"good night","r":"oyasumi nasai","k":"おやすみなさい","l":"1-2"},{"e":"nice to meet you","r":"hajimemashite","k":"はじめまして","l":"1-2"},{"e":"please (to receive favour)","r":"yoroshiku onegaishimasu","k":"よろしくおねがいします","l":"1-2"},{"e":"thank you","r":"arigatoo gozaimasu","k":"ありがとうございます","l":"1-2"},{"e":"excuse me","r":"sumimasen","k":"すみません","l":"9-10"},{"e":"yes","r":"hai","k":"はい","l":"1-2"},{"e":"no","r":"iie","k":"いいえ","l":"1-2"},{"e":"this","r":"kore","k":"これ","l":"3-4"},{"e":"that (near you)","r":"sore","k":"それ","l":"3-4"},{"e":"that (over there)","r":"are","k":"あれ","l":"3-4"},{"e":"what","r":"nani / nan","k":"なに／なん","l":"3-4"},{"e":"where","r":"doko","k":"どこ","l":"9-10"},{"e":"who","r":"dare","k":"だれ","l":"3-4"},{"e":"when","r":"itsu","k":"いつ","l":"9-10"},{"e":"how much","r":"ikura","k":"いくら","l":"9-10"},{"e":"how many (tsu-counter)","r":"ikutsu","k":"いくつ","l":"7-8"},{"e":"what time","r":"nan-ji","k":"なんじ","l":"9-10"},{"e":"with whom","r":"dare to","k":"だれと","l":"9-10"},{"e":"what kind of","r":"donna","k":"どんな","l":"9-10"},{"e":"water","r":"mizu","k":"みず","l":"5-6"},{"e":"coffee","r":"koohii","k":"コーヒー","l":"5-6"},{"e":"sake / Japanese rice wine","r":"osake","k":"おさけ","l":"5-6"},{"e":"miso soup","r":"misoshiru","k":"みそしる","l":"5-6"},{"e":"matcha (green tea powder)","r":"maccha","k":"まっちゃ","l":"5-6"},{"e":"meat","r":"niku","k":"にく","l":"5-6"},{"e":"fish","r":"sakana","k":"さかな","l":"5-6"},{"e":"vegetables","r":"yasai","k":"やさい","l":"5-6"},{"e":"fruit","r":"kudamono","k":"くだもの","l":"5-6"},{"e":"beer","r":"biiru","k":"ビール","l":"5-6"},{"e":"food (general)","r":"tabemono","k":"たべもの","l":"5-6"},{"e":"drinks (general)","r":"nomimono","k":"のみもの","l":"5-6"},{"e":"breakfast","r":"asagohan","k":"あさごはん","l":"5-6"},{"e":"lunch","r":"hirugohan","k":"ひるごはん","l":"5-6"},{"e":"dinner","r":"bangohan","k":"ばんごはん","l":"5-6"},{"e":"rice / meal","r":"gohan","k":"ごはん","l":"5-6"},{"e":"rice porridge","r":"okayu","k":"おかゆ","l":"5-6"},{"e":"ramen","r":"raamen","k":"ラーメン","l":"5-6"},{"e":"sushi","r":"sushi","k":"すし","l":"7-8"},{"e":"okonomiyaki","r":"okonomiyaki","k":"おこのみやき","l":"7-8"},{"e":"sandwich","r":"sandoicchi","k":"サンドイッチ","l":"7-8"},{"e":"hamburger","r":"hanbaagaa","k":"ハンバーガー","l":"9-10"},{"e":"egg","r":"tamago","k":"たまご","l":"5-6"},{"e":"wine","r":"wain","k":"ワイン","l":"5-6"},{"e":"eat","r":"tabemasu","k":"たべます","l":"5-6"},{"e":"drink","r":"nomimasu","k":"のみます","l":"5-6"},{"e":"get up","r":"okimasu","k":"おきます","l":"9-10"},{"e":"sleep / go to bed","r":"nemasu","k":"ねます","l":"9-10"},{"e":"go","r":"ikimasu","k":"いきます","l":"9-10"},{"e":"take a bath","r":"ofuro ni hairimasu","k":"おふろにはいります","l":"9-10"},{"e":"do not eat / do not drink","r":"tabemasen / nomimasen","k":"たべません／のみません","l":"5-6"},{"e":"hot (food/drink)","r":"atatakai","k":"あたたかい","l":"5-6"},{"e":"cold (food/drink)","r":"tsumetai","k":"つめたい","l":"5-6"},{"e":"delicious","r":"oishii","k":"おいしい","l":"3-4"},{"e":"bad taste","r":"mazui","k":"まずい","l":"7-8"},{"e":"expensive","r":"takai","k":"たかい","l":"7-8"},{"e":"like","r":"suki","k":"すき","l":"5-6"},{"e":"love / like very much","r":"daisuki","k":"だいすき","l":"5-6"},{"e":"dislike","r":"kirai","k":"きらい","l":"5-6"},{"e":"often","r":"yoku","k":"よく","l":"5-6"},{"e":"not very often","r":"amari","k":"あまり","l":"5-6"},{"e":"always","r":"itsumo","k":"いつも","l":"5-6"},{"e":"every day","r":"mainichi","k":"まいにち","l":"9-10"},{"e":"cafe / coffee shop","r":"koohii shoppu","k":"コーヒーショップ","l":"5-6"},{"e":"ramen restaurant","r":"raamen-ya","k":"ラーメンや","l":"5-6"},{"e":"restaurant","r":"resutoran","k":"レストラン","l":"5-6"},{"e":"izakaya (Japanese pub)","r":"izakaya","k":"いざかや","l":"5-6"},{"e":"park","r":"kooen","k":"こうえん","l":"9-10"},{"e":"school","r":"gakkoo","k":"がっこう","l":"9-10"},{"e":"company / workplace","r":"kaisha","k":"かいしゃ","l":"9-10"},{"e":"half past (30 min)","r":"han","k":"はん","l":"9-10"},{"e":"please (ordering)","r":"kudasai","k":"ください","l":"9-10"},{"e":"welcome (shop)","r":"irasshaimase","k":"いらっしゃいませ","l":"9-10"},{"e":"and then / after that","r":"sorekara","k":"それから","l":"9-10"},{"e":"alone","r":"hitori de","k":"ひとりで","l":"9-10"},{"e":"next week","r":"raishuu","k":"らいしゅう","l":"9-10"},{"e":"it's OK / no problem","r":"daijyoobu desu","k":"だいじょうぶです","l":"9-10"},{"e":"from ~","r":"kara","k":"から","l":"9-10"},{"e":"until ~","r":"made","k":"まで","l":"9-10"},{"e":"reading books","r":"dokusho","k":"どくしょ","l":"11-12"},{"e":"manga / comics","r":"manga","k":"まんが","l":"11-12"},{"e":"movie","r":"eega","k":"えいが","l":"11-12"},{"e":"sport","r":"supootsu","k":"スポーツ","l":"11-12"},{"e":"music","r":"ongaku","k":"おんがく","l":"11-12"},{"e":"horror (film)","r":"horaa","k":"ホラー","l":"11-12"},{"e":"comedy (film)","r":"komedhi","k":"コメディ","l":"11-12"},{"e":"concert","r":"konsaato","k":"コンサート","l":"11-12"},{"e":"travel","r":"ryokoo","k":"りょこう","l":"11-12"},{"e":"exercise / work out","r":"undoo shimasu","k":"うんどうします","l":"11-12"},{"e":"read (book)","r":"hon o yomimasu","k":"ほんをよみます","l":"11-12"},{"e":"listen to music","r":"ongaku o kikimasu","k":"おんがくをききます","l":"11-12"},{"e":"healthy / energetic","r":"genki","k":"げんき","l":"11-12"},{"e":"live in ~","r":"sunde imasu","k":"すんでいます","l":"3-4"},{"e":"stepmother / mother-in-law","r":"giri no haha","k":"ぎりのはは","l":"3-4"},{"e":"I don't like it","r":"suki jyanai desu","k":"すきじゃないです","l":"5-6"}].filter((w,i,a)=>a.findIndex(x=>x.k===w.k)===i);

const GRAMMAR = {"particle":[{"s":"わたし___がくせいです。","blank":"は","options":["は","が","を","で"],"en":"Jeg er student.","no":"わたし は がくせいです。","expl":"は markerer tema/subjekt. わたし (jeg) er tema for setningen."},{"s":"コーヒー___のみます。","blank":"を","options":["を","は","が","で"],"en":"Jeg drikker kaffe.","no":"コーヒー を のみます。","expl":"を markerer direkte objekt — det man gjør noe med. Her er kaffe det man drikker."},{"s":"レストラン___たべます。","blank":"で","options":["で","に","を","は"],"en":"Jeg spiser på restaurant.","no":"レストラン で たべます。","expl":"で markerer stedet der handlingen skjer. Man spiser på restauranten."},{"s":"6じ___おきます。","blank":"に","options":["に","で","を","は"],"en":"Jeg står opp klokken 6.","no":"6じ に おきます。","expl":"に brukes med spesifikke tidspunkter (klokkeslett, datoer). Ikke で — det er for handlingssted."},{"s":"おおさか___すんでいます。","blank":"に","options":["に","で","を","が"],"en":"Jeg bor i Osaka.","no":"おおさか に すんでいます。","expl":"に brukes med すんでいます (bor) for å markere bosted. に her angir tilstand/posisjon."},{"s":"さかな___すきです。","blank":"が","options":["が","は","を","で"],"en":"Jeg liker fisk.","no":"さかな が すきです。","expl":"が brukes med すき (like) og きらい (mislike). Fisk er subjektet for følelsen."},{"s":"まいにち こうえん___いきます。","blank":"に","options":["に","で","を","は"],"en":"Jeg går til parken hver dag.","no":"まいにち こうえん に いきます。","expl":"に markerer retning/mål med bevegelsesverb som いきます (går), きます (kommer), かえります (returnerer)."},{"s":"にく___すきじゃないです。","blank":"は","options":["は","が","を","で"],"en":"Jeg liker ikke kjøtt. (kontrast)","no":"にく は すきじゃないです。","expl":"は brukes i stedet for が når man vil kontrastere. Underforstått: noe annet liker jeg, men kjøtt liker jeg ikke."},{"s":"どこ___ひるごはんをたべますか？","blank":"で","options":["で","に","を","が"],"en":"Hvor spiser du lunsj?","no":"どこ で ひるごはんをたべますか？","expl":"で markerer stedet der handlingen foregår. Man spiser (handling) et sted → で."},{"s":"9じ___5じ___しごとです。","blank":"から…まで","options":["から…まで","に…で","が…を","は…に"],"en":"Jobb er fra kl. 9 til kl. 5.","no":"9じ から 5じ まで しごとです。","expl":"から = fra, まで = til/inntil. Brukes for tidsintervaller og distanser."}],"sentence":[{"words":["わたしは","まいあさ","コーヒーを","のみます"],"extra":["で","たべます","が"],"en":"Jeg drikker kaffe hver morgen.","expl":"Japansk setningsrekkefølge: Subjekt → Tidsadverb → Objekt (を) → Verb til slutt."},{"words":["レストランで","すしを","たべます"],"extra":["に","が","のみます"],"en":"Jeg spiser sushi på restaurant.","expl":"Sted (で) kommer før objekt (を) og verb. Verb kommer alltid sist på japansk."},{"words":["わたしは","おおさかに","すんでいます"],"extra":["で","たべます","は"],"en":"Jeg bor i Osaka.","expl":"すんでいます = tilstandsverb. Bosted markeres med に, ikke で."},{"words":["なにを","のみますか"],"extra":["は","に","たべますか"],"en":"Hva drikker du?","expl":"Spørreord (なに) + partikkel (を) + verb + か. か på slutten gjør setningen til spørsmål."},{"words":["8じに","おきます"],"extra":["で","たべます","は"],"en":"Jeg står opp klokken 8.","expl":"Klokkeslett + に + verb. に er obligatorisk ved spesifikke tidspunkt."},{"words":["にくが","すきです"],"extra":["を","は","のみます"],"en":"Jeg liker kjøtt.","expl":"すき (like) bruker が for det man liker. Merk: ikke を!"},{"words":["どこで","ひるごはんを","たべますか"],"extra":["に","が","のみますか"],"en":"Hvor spiser du lunsj?","expl":"どこで = hvor (sted for handling). ひるごはんを = lunsj (objekt). たべますか = spørsmål."},{"words":["よく","コーヒーを","のみます"],"extra":["に","たべます","は"],"en":"Jeg drikker kaffe ofte.","expl":"Frekvensord (よく) kommer tidlig i setningen, gjerne etter subjekt."},{"words":["どようびが","いいです"],"extra":["に","は","たべます"],"en":"Lørdag er bra.","expl":"が markerer subjektet for et adjektiv som いい (bra/god)."},{"words":["9じから","5じまで","しごとです"],"extra":["に","が","たべます"],"en":"Jobb er fra kl. 9 til kl. 5.","expl":"から…まで = fra…til. Brukes for tidsrom og geografiske distanser."}],"context":[{"q":"なんじですか？","correct":"9じです。","wrong":["9じにです。","9じをです。","9じがです。"],"en":"Hva er klokken?","expl":"Svar på なんじですか bruker bare klokkeslett + です. Ingen ekstra partikkel."},{"q":"どこにすんでいますか？","correct":"とうきょうにすんでいます。","wrong":["とうきょうですんでいます。","とうきょうをすんでいます。","とうきょうがすんでいます。"],"en":"Hvor bor du?","expl":"すんでいます (bor) krever に for bosted. でbety handling, nie tilstand."},{"q":"なにがすきですか？","correct":"さかながすきです。","wrong":["さかなはすきです。","さかなをすきです。","さかなですきです。"],"en":"Hva liker du?","expl":"すき bruker が for det man liker. Spørsmålet bruker が, svaret bruker も が."},{"q":"まいにちあさごはんをたべますか？","correct":"いいえ、たべません。","wrong":["いいえ、たべます。","はい、たべません。","いいえ、のみません。"],"en":"Spiser du frokost hver dag?","expl":"いいえ (nei) → たべません (spiser ikke). はい (ja) → たべます (spiser)."},{"q":"なにをのみますか？","correct":"コーヒーをのみます。","wrong":["コーヒーがのみます。","コーヒーにのみます。","コーヒーはのみます。"],"en":"Hva drikker du?","expl":"のみます (drikker) bruker を for det man drikker. Svar speiler spørsmålsstrukturen."},{"q":"いつがいいですか？","correct":"どようびがいいです。","wrong":["どようびにいいです。","どようびはいいです。","どようびをいいです。"],"en":"Når passer det?","expl":"いい (bra) bruker が for subjektet. Lørdag er subjektet for 'bra'."},{"q":"コーヒーがすきですか？","correct":"はい、すきです。","wrong":["はい、すきじゃないです。","いいえ、すきです。","はい、たべます。"],"en":"Liker du kaffe?","expl":"はい (ja) → すきです. いいえ (nei) → すきじゃないです. Svar matcher spørsmål."},{"q":"どこでひるごはんをたべますか？","correct":"かいしゃでたべます。","wrong":["かいしゃにたべます。","かいしゃをたべます。","かいしゃがたべます。"],"en":"Hvor spiser du lunsj?","expl":"で angir handlingssted. Man spiser (handling) på kontoret → で."}],"error":[{"s":"わたしは コーヒーは のみます。","error":"は","correct":"を","options":["を","が","に","で"],"en":"Objekt for 'å drikke' trenger を","expl":"のみます (drikker) er et handlingsverb. Det man drikker er direkte objekt → を."},{"s":"レストランに たべます。","error":"に","correct":"で","options":["で","を","は","が"],"en":"Sted for handling trenger で","expl":"たべます (spiser) er handling. Sted for handling → で. に brukes for retning og bosted."},{"s":"6じで おきます。","error":"で","correct":"に","options":["に","は","を","が"],"en":"Spesifikt tidspunkt trenger に","expl":"Klokkeslett og datoer bruker に. で er for steder, ikke tidspunkt."},{"s":"にくは すきです。","error":"は","correct":"が","options":["が","を","で","に"],"en":"Subjekt for すき trenger が","expl":"すき og きらい bruker が for det man liker/misliker. は kan brukes for kontrast, men her er が naturlig."},{"s":"おおさかで すんでいます。","error":"で","correct":"に","options":["に","は","を","が"],"en":"Bosted (すんでいます) trenger に","expl":"すんでいます (bor) er tilstandsverb. Tilstand krever に, ikke で."},{"s":"まいにち こうえんで いきます。","error":"で","correct":"に","options":["に","は","を","が"],"en":"Retning trenger に","expl":"いきます (går) er bevegelsesverb. Retning/mål → に. で er for handlingssted."},{"s":"ラーメンが たべます。","error":"が","correct":"を","options":["を","は","に","で"],"en":"Objekt for 'å spise' trenger を","expl":"たべます (spiser) er handlingsverb. Det man spiser er direkte objekt → を. が brukes for subjekt."}],"matching":[{"l":"わたしは がくせいです。","r":"Jeg er student."},{"l":"コーヒーを のみます。","r":"Jeg drikker kaffe."},{"l":"レストランで たべます。","r":"Jeg spiser på restaurant."},{"l":"にくが すきです。","r":"Jeg liker kjøtt."},{"l":"6じに おきます。","r":"Jeg står opp klokken 6."},{"l":"どこに すんでいますか？","r":"Hvor bor du?"},{"l":"9じから 5じまでです。","r":"Fra kl. 9 til kl. 5."},{"l":"よく コーヒーを のみます。","r":"Jeg drikker kaffe ofte."}]};

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
const FONT_URL = "https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700;900&family=Noto+Sans+JP:wght@400;700&family=M+PLUS+Rounded+1c:wght@400;700&family=Yomogi&family=Shippori+Mincho:wght@400;700&family=IBM+Plex+Mono:wght@400;600&display=swap";
const ROMAJI_FONT = "'IBM Plex Mono', 'Courier New', monospace";

// ── Theme ─────────────────────────────────────────────────────────────────────
function makeColors(dark) {
  return dark ? {
    bg:"#0a0808",bg2:"#13100d",bg3:"#1a1610",
    gold:"#d4a843",goldLt:"#e8c060",
    teal:"#2dd4bf",green:"#4ade80",
    blue:"#6b9fd4",purple:"#a879d4",
    red:"#f87171",orange:"#fb923c",
    text:"#f5f0e8",textMid:"#9a8e7a",textDim:"#5a4e3a",
    border:"#2a2218",border2:"#3a3020",
    hint1:"#1a2a10",hint2:"#1a1a10",hint3:"#1a1020",
    cardBg:"linear-gradient(135deg,#13100d 0%,#1a1408 100%)",
    isDark:true,
  } : {
    bg:"#f7f4ee",bg2:"#ffffff",bg3:"#ede9e0",
    gold:"#b8860b",goldLt:"#d4a843",
    teal:"#0d9488",green:"#16a34a",
    blue:"#2563eb",purple:"#7c3aed",
    red:"#dc2626",orange:"#ea580c",
    text:"#1a1208",textMid:"#6b5a40",textDim:"#b8a88a",
    border:"#d8d0c0",border2:"#e8e0d0",
    hint1:"#f0fdf4",hint2:"#fefce8",hint3:"#faf5ff",
    cardBg:"linear-gradient(135deg,#ffffff 0%,#f7f4ee 100%)",
    isDark:false,
  };
}

const VOCAB_ACTIVITIES = [
  {id:"multiple",name:"Flervalg",desc:"Kana → norsk",color:"gold",icon:"◎"},
  {id:"write",name:"Skriv selv",desc:"Norsk → kana",color:"blue",icon:"✎"},
  {id:"flash",name:"Flashkort",desc:"Gjett og vurder",color:"purple",icon:"⟳"},
];

const GRAMMAR_ACTIVITIES = [
  {id:"particle",name:"Partikkelvalg",desc:"Fyll inn riktig partikkel",color:"green",icon:"は"},
  {id:"sentence",name:"Setningsbygging",desc:"Sett ord i riktig rekkefølge",color:"teal",icon:"語"},
  {id:"context",name:"Kontekstsvar",desc:"Svar riktig på japansk",color:"blue",icon:"?"},
  {id:"error",name:"Finn feilen",desc:"Finn og rett opp feilen",color:"orange",icon:"✗"},
  {id:"matching",name:"Matching",desc:"Koble japansk og norsk",color:"purple",icon:"⇌"},
];

function shuffle(a){const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;}

// ── Shared UI ─────────────────────────────────────────────────────────────────
function ProgressBar({pct, color, C}) {
  return (
    <div style={{height:4,background:C.border2,borderRadius:2,overflow:"hidden"}}>
      <div style={{height:"100%",width:`${pct*100}%`,background:C[color]||color,borderRadius:2,transition:"width 0.3s ease"}} />
    </div>
  );
}

function ResultScreen({score, total, onRetry, onHome, color, C, fontSize, hints}) {
  const pct = score/total;
  const fs = fontSize === "large";
  return (
    <div style={{display:"flex",flexDirection:"column",gap:16,textAlign:"center",padding:"20px 0"}}>
      <div style={{fontSize:52}}>{pct>=0.8?"🎉":pct>=0.5?"👏":"💪"}</div>
      <div style={{fontSize:fs?72:64,fontWeight:900,color:C[color]||color,lineHeight:1}}>{score}/{total}</div>
      <div style={{fontSize:fs?16:14,color:C.textMid}}>{pct>=0.8?"Utmerket! 素晴らしい！":pct>=0.5?"Bra jobba! よくできました！":"Fortsett å øve! がんばって！"}</div>
      {hints && (hints.h1>0||hints.h2>0||hints.h3>0) && (
        <div style={{background:C.bg2,border:`1px solid ${C.border2}`,borderRadius:12,padding:"12px 16px",display:"flex",justifyContent:"center",gap:24}}>
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:fs?18:16,fontWeight:700,color:C.gold}}>{hints.h1}</div>
            <div style={{fontSize:10,color:C.textMid}}>Hint 1</div>
          </div>
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:fs?18:16,fontWeight:700,color:C.teal}}>{hints.h2}</div>
            <div style={{fontSize:10,color:C.textMid}}>Hint 2</div>
          </div>
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:fs?18:16,fontWeight:700,color:C.purple}}>{hints.h3}</div>
            <div style={{fontSize:10,color:C.textMid}}>Hint 3</div>
          </div>
        </div>
      )}
      <div style={{display:"flex",flexDirection:"column",gap:8,marginTop:8}}>
        <button style={btnStyle("primary",C,fs)} onClick={onRetry}>Øv igjen</button>
        <button style={btnStyle("ghost",C,fs)} onClick={onHome}>Tilbake</button>
      </div>
    </div>
  );
}

function btnStyle(v="primary", C, large=false) {
  const base = {
    padding:large?"18px 24px":"14px 24px",
    borderRadius:10,border:"none",
    fontFamily:"'Noto Serif JP',serif",
    fontSize:large?16:14,fontWeight:600,cursor:"pointer",
    letterSpacing:"0.05em",transition:"opacity 0.15s",width:"100%"
  };
  if (v==="primary") return {...base,background:`linear-gradient(135deg,${C.gold},${C.goldLt})`,color:C.isDark?"#0a0808":"#fff"};
  if (v==="ghost")   return {...base,background:"transparent",color:C.textMid,border:`1px solid ${C.border}`};
  if (v==="teal")    return {...base,background:`linear-gradient(135deg,${C.isDark?"#0f766e":"#0d9488"},#0d9488)`,color:"#f0fdf4"};
  if (v==="green")   return {...base,background:`linear-gradient(135deg,${C.isDark?"#166534":"#15803d"},#15803d)`,color:"#f0fdf4"};
  if (v==="blue")    return {...base,background:`linear-gradient(135deg,${C.isDark?"#1e3a5f":"#1d4ed8"},#2563eb)`,color:"#eff6ff"};
  if (v==="orange")  return {...base,background:`linear-gradient(135deg,${C.isDark?"#9a3412":"#c2410c"},#ea580c)`,color:"#fff7ed"};
  if (v==="purple")  return {...base,background:`linear-gradient(135deg,${C.isDark?"#4c1d95":"#6d28d9"},#7c3aed)`,color:"#faf5ff"};
  return base;
}

// ── Hint system ───────────────────────────────────────────────────────────────
function HintBar({item, hintLevel, onHint, answered, C, font, large}) {
  const fs = large;
  return (
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      {!answered && (
        <div style={{display:"flex",gap:6}}>
          <button
            onClick={()=>onHint(1)}
            style={{flex:1,padding:"8px",borderRadius:8,border:`1px solid ${hintLevel>=1?C.gold:C.border2}`,background:hintLevel>=1?`${C.gold}18`:C.bg2,color:hintLevel>=1?C.gold:C.textMid,fontSize:fs?13:11,cursor:"pointer",fontFamily:"'Noto Serif JP',serif"}}>
            💡 Hint 1
          </button>
          <button
            onClick={()=>onHint(2)}
            style={{flex:1,padding:"8px",borderRadius:8,border:`1px solid ${hintLevel>=2?C.teal:C.border2}`,background:hintLevel>=2?`${C.teal}18`:C.bg2,color:hintLevel>=2?C.teal:C.textMid,fontSize:fs?13:11,cursor:"pointer",fontFamily:"'Noto Serif JP',serif"}}>
            💡💡 Hint 2
          </button>
          <button
            onClick={()=>onHint(3)}
            style={{flex:1,padding:"8px",borderRadius:8,border:`1px solid ${hintLevel>=3?C.purple:C.border2}`,background:hintLevel>=3?`${C.purple}18`:C.bg2,color:hintLevel>=3?C.purple:C.textMid,fontSize:fs?13:11,cursor:"pointer",fontFamily:"'Noto Serif JP',serif"}}>
            💡💡💡 Hint 3
          </button>
        </div>
      )}
      {hintLevel>=1 && (
        <div style={{background:C.hint1,border:`1px solid ${C.green}33`,borderRadius:10,padding:"10px 14px",fontSize:fs?14:12,color:C.green}}>
          <span style={{fontWeight:700}}>Hint 1 · Norsk: </span>{item.en||item.no}
        </div>
      )}
      {hintLevel>=2 && item.expl && (
        <div style={{background:C.hint2,border:`1px solid ${C.gold}33`,borderRadius:10,padding:"10px 14px",fontSize:fs?14:12,color:C.gold}}>
          <span style={{fontWeight:700}}>Hint 2 · Grammatikk: </span>{item.expl}
        </div>
      )}
      {hintLevel>=3 && (
        <div style={{background:C.hint3,border:`1px solid ${C.purple}33`,borderRadius:10,padding:"10px 14px",fontSize:fs?14:12,color:C.purple}}>
          <span style={{fontWeight:700}}>Hint 3: </span>Eliminerer gale svar — se fremhevede alternativ
        </div>
      )}
    </div>
  );
}

function ExplPanel({item, C, large}) {
  const fs = large;
  if (!item?.expl) return null;
  return (
    <div style={{background:C.isDark?"#0d1a2a":"#eff6ff",border:`1px solid ${C.blue}44`,borderRadius:10,padding:"10px 14px",fontSize:fs?14:12,color:C.blue}}>
      <span style={{fontWeight:700}}>Forklaring: </span>{item.expl}
    </div>
  );
}

// ── Grammar quiz components ───────────────────────────────────────────────────

function ParticleQuiz({onDone, font, C, large, onHints}) {
  const items = useMemo(() => shuffle(GRAMMAR.particle), []);
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [score, setScore] = useState(0);
  const [hintLevel, setHintLevel] = useState(0);
  const [showExpl, setShowExpl] = useState(false);
  const [hintCounts, setHintCounts] = useState({h1:0,h2:0,h3:0});
  const fs = large;

  function handleHint(level) {
    if (level > hintLevel) {
      setHintLevel(level);
      setHintCounts(h => ({...h, [`h${level}`]: h[`h${level}`]+1}));
    }
  }

  if (idx >= items.length) {
    onHints && onHints(hintCounts);
    return <ResultScreen score={score} total={items.length} hints={hintCounts} onRetry={()=>{setIdx(0);setChosen(null);setScore(0);setHintLevel(0);setShowExpl(false);setHintCounts({h1:0,h2:0,h3:0});}} onHome={onDone} color="green" C={C} fontSize={large?"large":"normal"} />;
  }

  const q = items[idx];
  const isCorrect = chosen === q.blank;
  const parts = q.s.split("___");

  return (
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      <div style={{fontSize:11,color:C.textMid,letterSpacing:"0.2em",textTransform:"uppercase"}}>{idx+1}/{items.length} · Partikkelvalg</div>
      <ProgressBar pct={idx/items.length} color="green" C={C} />

      <div style={{background:C.bg2,border:`1px solid ${C.green}33`,borderRadius:16,padding:"24px 20px",textAlign:"center"}}>
        <div style={{fontSize:fs?15:13,color:C.textMid,marginBottom:12}}>Velg riktig partikkel</div>
        <div style={{fontSize:fs?32:28,fontFamily:font,lineHeight:1.6,color:C.text}}>
          {parts[0]}
          <span style={{display:"inline-block",minWidth:48,padding:"0 4px",borderBottom:`2px solid ${chosen?(isCorrect?C.green:C.red):C.gold}`,color:chosen?(isCorrect?C.green:C.red):C.gold,fontWeight:700}}>
            {chosen || "＿"}
          </span>
          {parts[1]}
        </div>
        {chosen && (
          <div style={{marginTop:10,fontSize:fs?16:13,fontFamily:font,color:C.teal}}>{q.no}</div>
        )}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        {q.options.map((opt,i) => {
          let bg=C.bg2, bc=C.border2, col=C.text;
          const isElim = hintLevel>=3 && opt!==q.blank;
          if (chosen) {
            if (opt===q.blank){bg=C.isDark?"#0a2015":"#f0fdf4";bc=C.green;col=C.green;}
            else if (opt===chosen){bg=C.isDark?"#200a0a":"#fff0f0";bc=C.red;col=C.red;}
          } else if (isElim) {
            bg=C.bg3; col=C.textDim; bc=C.border;
          }
          return (
            <button key={i} disabled={!!chosen}
              style={{padding:fs?"20px 8px":"16px 8px",borderRadius:10,border:`1.5px solid ${bc}`,background:bg,color:col,fontSize:fs?26:22,fontFamily:font,cursor:chosen?"default":"pointer",transition:"all 0.15s",opacity:isElim?0.35:1}}
              onClick={()=>{setChosen(opt);if(opt===q.blank)setScore(s=>s+1);}}>
              {opt}
            </button>
          );
        })}
      </div>

      {!chosen && <HintBar item={q} hintLevel={hintLevel} onHint={handleHint} answered={false} C={C} font={font} large={large} />}

      {chosen && (
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          <button style={{...btnStyle("ghost",C,fs),color:C.blue,borderColor:`${C.blue}44`,padding:fs?"10px":"8px",fontSize:fs?13:11}} onClick={()=>setShowExpl(e=>!e)}>
            {showExpl?"Skjul forklaring":"Vis forklaring"}
          </button>
          {showExpl && <ExplPanel item={q} C={C} large={large} />}
          <button style={btnStyle("green",C,fs)} onClick={()=>{setIdx(i=>i+1);setChosen(null);setHintLevel(0);setShowExpl(false);}}>
            {idx+1<items.length?"Neste →":"Se resultat"}
          </button>
        </div>
      )}
    </div>
  );
}

function SentenceQuiz({onDone, font, C, large, onHints}) {
  const items = useMemo(()=>shuffle(GRAMMAR.sentence),[]);
  const [idx, setIdx] = useState(0);
  const [placed, setPlaced] = useState([]);
  const [available, setAvailable] = useState([]);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [hintLevel, setHintLevel] = useState(0);
  const [showExpl, setShowExpl] = useState(false);
  const [hintCounts, setHintCounts] = useState({h1:0,h2:0,h3:0});
  const fs = large;

  useEffect(()=>{
    if(idx<items.length){const q=items[idx];setAvailable(shuffle([...q.words,...q.extra]));setPlaced([]);setChecked(false);setHintLevel(0);setShowExpl(false);}
  },[idx,items]);

  if(idx>=items.length){
    onHints&&onHints(hintCounts);
    return <ResultScreen score={score} total={items.length} hints={hintCounts} onRetry={()=>{setIdx(0);setScore(0);setHintCounts({h1:0,h2:0,h3:0});}} onHome={onDone} color="teal" C={C} fontSize={large?"large":"normal"} />;
  }

  const q=items[idx];
  const isCorrect=checked&&JSON.stringify(placed)===JSON.stringify(q.words);

  function handleHint(level){
    if(level>hintLevel){setHintLevel(level);setHintCounts(h=>({...h,[`h${level}`]:h[`h${level}`]+1}));}
  }
  function addWord(w,i){if(checked)return;setPlaced(p=>[...p,w]);setAvailable(a=>{const n=[...a];n.splice(i,1);return n;});}
  function removeWord(i){if(checked)return;const w=placed[i];setPlaced(p=>{const n=[...p];n.splice(i,1);return n;});setAvailable(a=>[...a,w]);}
  function check(){setChecked(true);if(JSON.stringify(placed)===JSON.stringify(q.words))setScore(s=>s+1);}

  return (
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      <div style={{fontSize:11,color:C.textMid,letterSpacing:"0.2em",textTransform:"uppercase"}}>{idx+1}/{items.length} · Setningsbygging</div>
      <ProgressBar pct={idx/items.length} color="teal" C={C} />

      <div style={{background:C.bg2,border:`1px solid ${C.teal}33`,borderRadius:16,padding:"20px",textAlign:"center"}}>
        <div style={{fontSize:fs?15:13,color:C.textMid,marginBottom:6}}>Sett ord i riktig rekkefølge</div>
        <div style={{fontSize:fs?13:11,color:C.textDim}}>Trykk ord i riktig rekkefølge</div>
      </div>

      <div style={{minHeight:56,background:C.bg3,border:`1.5px solid ${checked?(isCorrect?C.green:C.red):C.border2}`,borderRadius:12,padding:"10px 12px",display:"flex",flexWrap:"wrap",gap:8,alignItems:"center"}}>
        {placed.length===0&&<span style={{color:C.textDim,fontSize:fs?14:13}}>Trykk ord nedenfor...</span>}
        {placed.map((w,i)=>(
          <button key={i} onClick={()=>removeWord(i)} disabled={checked}
            style={{padding:fs?"10px 14px":"8px 12px",borderRadius:8,background:`${C.teal}22`,border:`1px solid ${C.teal}66`,color:C.teal,fontFamily:font,fontSize:fs?18:16,cursor:checked?"default":"pointer"}}>
            {w}
          </button>
        ))}
      </div>

      {checked&&!isCorrect&&(
        <div style={{background:C.isDark?"#0a2015":"#f0fdf4",border:`1px solid ${C.green}33`,borderRadius:10,padding:"12px 16px",fontSize:fs?17:15,fontFamily:font,color:C.green,textAlign:"center"}}>
          ✓ {q.words.join(" ")}
        </div>
      )}

      <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
        {available.map((w,i)=>{
          const isExtra = q.extra?.includes(w);
          const dim = hintLevel>=3 && isExtra;
          return (
            <button key={i} onClick={()=>addWord(w,i)} disabled={checked}
              style={{padding:fs?"12px 16px":"10px 14px",borderRadius:8,background:C.bg2,border:`1px solid ${C.border2}`,color:dim?C.textDim:C.text,fontFamily:font,fontSize:fs?18:16,cursor:checked?"default":"pointer",opacity:dim?0.3:1}}>
              {w}
            </button>
          );
        })}
      </div>

      {!checked && <HintBar item={q} hintLevel={hintLevel} onHint={handleHint} answered={false} C={C} font={font} large={large} />}

      {!checked
        ?<button style={btnStyle("teal",C,fs)} disabled={placed.length===0} onClick={check}>Sjekk svar</button>
        :<div style={{display:"flex",flexDirection:"column",gap:8}}>
          <button style={{...btnStyle("ghost",C,fs),color:C.blue,borderColor:`${C.blue}44`,padding:fs?"10px":"8px",fontSize:fs?13:11}} onClick={()=>setShowExpl(e=>!e)}>
            {showExpl?"Skjul forklaring":"Vis forklaring"}
          </button>
          {showExpl&&<ExplPanel item={q} C={C} large={large} />}
          <button style={btnStyle("teal",C,fs)} onClick={()=>setIdx(i=>i+1)}>{idx+1<items.length?"Neste →":"Se resultat"}</button>
        </div>
      }
    </div>
  );
}

function ContextQuiz({onDone, font, C, large, onHints}) {
  const items = useMemo(()=>shuffle(GRAMMAR.context),[]);
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [score, setScore] = useState(0);
  const [opts, setOpts] = useState([]);
  const [hintLevel, setHintLevel] = useState(0);
  const [showExpl, setShowExpl] = useState(false);
  const [hintCounts, setHintCounts] = useState({h1:0,h2:0,h3:0});
  const fs = large;

  useEffect(()=>{
    if(idx<items.length){const q=items[idx];setOpts(shuffle([q.correct,...q.wrong]));setChosen(null);setHintLevel(0);setShowExpl(false);}
  },[idx,items]);

  if(idx>=items.length){
    onHints&&onHints(hintCounts);
    return <ResultScreen score={score} total={items.length} hints={hintCounts} onRetry={()=>{setIdx(0);setScore(0);setHintCounts({h1:0,h2:0,h3:0});}} onHome={onDone} color="blue" C={C} fontSize={large?"large":"normal"} />;
  }

  const q=items[idx];
  function handleHint(level){if(level>hintLevel){setHintLevel(level);setHintCounts(h=>({...h,[`h${level}`]:h[`h${level}`]+1}));}}

  return (
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      <div style={{fontSize:11,color:C.textMid,letterSpacing:"0.2em",textTransform:"uppercase"}}>{idx+1}/{items.length} · Kontekstsvar</div>
      <ProgressBar pct={idx/items.length} color="blue" C={C} />

      <div style={{background:C.bg2,border:`1px solid ${C.blue}33`,borderRadius:16,padding:"24px 20px",textAlign:"center"}}>
        <div style={{fontSize:fs?15:13,color:C.textMid,marginBottom:8}}>Svar på japansk</div>
        <div style={{fontSize:fs?30:26,fontFamily:font,color:C.text}}>{q.q}</div>
      </div>

      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {opts.map((opt,i)=>{
          const correct=opt===q.correct;
          const isElim=hintLevel>=3&&!correct;
          let bg=C.bg2,bc=C.border2,col=C.text;
          if(chosen){
            if(correct){bg=C.isDark?"#0a2015":"#f0fdf4";bc=C.green;col=C.green;}
            else if(opt===chosen){bg=C.isDark?"#200a0a":"#fff0f0";bc=C.red;col=C.red;}
          }
          return (
            <button key={i} disabled={!!chosen}
              style={{padding:fs?"16px 16px":"14px 16px",borderRadius:10,border:`1.5px solid ${bc}`,background:bg,color:col,fontFamily:font,fontSize:fs?17:15,textAlign:"left",cursor:chosen?"default":"pointer",transition:"all 0.15s",opacity:isElim&&!chosen?0.35:1}}
              onClick={()=>{setChosen(opt);if(correct)setScore(s=>s+1);}}>
              {opt}
            </button>
          );
        })}
      </div>

      {!chosen && <HintBar item={q} hintLevel={hintLevel} onHint={handleHint} answered={false} C={C} font={font} large={large} />}

      {chosen && (
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          <button style={{...btnStyle("ghost",C,fs),color:C.blue,borderColor:`${C.blue}44`,padding:fs?"10px":"8px",fontSize:fs?13:11}} onClick={()=>setShowExpl(e=>!e)}>
            {showExpl?"Skjul forklaring":"Vis forklaring"}
          </button>
          {showExpl&&<ExplPanel item={q} C={C} large={large} />}
          <button style={btnStyle("blue",C,fs)} onClick={()=>setIdx(i=>i+1)}>{idx+1<items.length?"Neste →":"Se resultat"}</button>
        </div>
      )}
    </div>
  );
}

function ErrorQuiz({onDone, font, C, large, onHints}) {
  const items = useMemo(()=>shuffle(GRAMMAR.error),[]);
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [score, setScore] = useState(0);
  const [hintLevel, setHintLevel] = useState(0);
  const [showExpl, setShowExpl] = useState(false);
  const [hintCounts, setHintCounts] = useState({h1:0,h2:0,h3:0});
  const fs = large;

  if(idx>=items.length){
    onHints&&onHints(hintCounts);
    return <ResultScreen score={score} total={items.length} hints={hintCounts} onRetry={()=>{setIdx(0);setScore(0);setHintLevel(0);setShowExpl(false);setHintCounts({h1:0,h2:0,h3:0});}} onHome={onDone} color="orange" C={C} fontSize={large?"large":"normal"} />;
  }

  const q=items[idx];
  const sentParts=q.s.split(q.error);
  function handleHint(level){if(level>hintLevel){setHintLevel(level);setHintCounts(h=>({...h,[`h${level}`]:h[`h${level}`]+1}));}}

  return (
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      <div style={{fontSize:11,color:C.textMid,letterSpacing:"0.2em",textTransform:"uppercase"}}>{idx+1}/{items.length} · Finn feilen</div>
      <ProgressBar pct={idx/items.length} color="orange" C={C} />

      <div style={{background:C.bg2,border:`1px solid ${C.orange}33`,borderRadius:16,padding:"24px 20px",textAlign:"center"}}>
        <div style={{fontSize:fs?15:13,color:C.textMid,marginBottom:12}}>
          Hvilken partikkel skal det være?
        </div>
        <div style={{fontSize:fs?27:24,fontFamily:font,color:C.text,lineHeight:1.6}}>
          {sentParts[0]}
          {chosen ? (
            <span style={{color:C.red,textDecoration:"underline wavy",fontWeight:700}}>{q.error}</span>
          ) : (
            <span style={{display:"inline-block",minWidth:36,borderBottom:`2.5px solid ${C.orange}`,color:C.orange,fontWeight:700,textAlign:"center"}}>?</span>
          )}
          {sentParts.slice(1).join(q.error)}
        </div>
        <div style={{fontSize:fs?13:12,color:C.textDim,marginTop:8}}>
          {chosen ? "Feilpartikkelen er understreket — riktig svar er markert grønt" : "Velg riktig partikkel for hullet"}
        </div>
        {chosen && (
          <div style={{marginTop:10,fontSize:fs?16:14,fontFamily:font,color:C.green}}>
            ✓ {q.s.replace(q.error, q.correct)}
          </div>
        )}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        {q.options.map((opt,i)=>{
          const correct=opt===q.correct;
          const isElim=hintLevel>=3&&!correct;
          let bg=C.bg2,bc=C.border2,col=C.text;
          if(chosen){
            if(correct){bg=C.isDark?"#0a2015":"#f0fdf4";bc=C.green;col=C.green;}
            else if(opt===chosen){bg=C.isDark?"#200a0a":"#fff0f0";bc=C.red;col=C.red;}
          }
          return (
            <button key={i} disabled={!!chosen}
              style={{padding:fs?"20px 8px":"16px 8px",borderRadius:10,border:`1.5px solid ${bc}`,background:bg,color:col,fontSize:fs?26:22,fontFamily:font,cursor:chosen?"default":"pointer",transition:"all 0.15s",opacity:isElim&&!chosen?0.35:1}}
              onClick={()=>{setChosen(opt);if(correct)setScore(s=>s+1);}}>
              {opt}
            </button>
          );
        })}
      </div>

      {!chosen && <HintBar item={q} hintLevel={hintLevel} onHint={handleHint} answered={false} C={C} font={font} large={large} />}

      {chosen && (
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          <button style={{...btnStyle("ghost",C,fs),color:C.blue,borderColor:`${C.blue}44`,padding:fs?"10px":"8px",fontSize:fs?13:11}} onClick={()=>setShowExpl(e=>!e)}>
            {showExpl?"Skjul forklaring":"Vis forklaring"}
          </button>
          {showExpl&&<ExplPanel item={q} C={C} large={large} />}
          <button style={btnStyle("orange",C,fs)} onClick={()=>{setIdx(i=>i+1);setChosen(null);setHintLevel(0);setShowExpl(false);}}>
            {idx+1<items.length?"Neste →":"Se resultat"}
          </button>
        </div>
      )}
    </div>
  );
}

function MatchingQuiz({onDone, font, C, large}) {
  const allItems=GRAMMAR.matching;
  const items=useMemo(()=>shuffle(allItems).slice(0,6),[]);
  const [leftSel, setLeftSel]=useState(null);
  const [rightSel, setRightSel]=useState(null);
  const [matched, setMatched]=useState({});
  const [wrong, setWrong]=useState(null);
  const [score, setScore]=useState(0);
  const [done, setDone]=useState(false);
  const rights=useMemo(()=>shuffle(items.map(x=>x.r)),[items]);
  const fs=large;

  useEffect(()=>{
    if(leftSel&&rightSel){
      const correctRight=items.find(x=>x.l===leftSel)?.r;
      if(rightSel===correctRight){
        const nm={...matched,[leftSel]:rightSel};
        setMatched(nm);setScore(s=>s+1);setLeftSel(null);setRightSel(null);
        if(Object.keys(nm).length===items.length)setDone(true);
      }else{
        setWrong(leftSel);
        setTimeout(()=>{setLeftSel(null);setRightSel(null);setWrong(null);},800);
      }
    }
  },[leftSel,rightSel,items,matched]);

  if(done){
    return <ResultScreen score={score} total={items.length} onRetry={()=>{setMatched({});setScore(0);setDone(false);setLeftSel(null);setRightSel(null);}} onHome={onDone} color="purple" C={C} fontSize={large?"large":"normal"} />;
  }

  return (
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      <div style={{fontSize:11,color:C.textMid,letterSpacing:"0.2em",textTransform:"uppercase"}}>Matching · {Object.keys(matched).length}/{items.length} par</div>
      <ProgressBar pct={Object.keys(matched).length/items.length} color="purple" C={C} />
      <div style={{fontSize:fs?14:13,color:C.textMid,textAlign:"center"}}>Trykk én venstre og én høyre for å pare dem</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {items.map((item,i)=>{
            const isMatched=!!matched[item.l];const isSel=leftSel===item.l;const isWrong=wrong===item.l;
            return (
              <button key={i} disabled={isMatched}
                style={{padding:fs?"14px 10px":"12px 10px",borderRadius:8,border:`1.5px solid ${isMatched?C.green:isWrong?C.red:isSel?C.purple:C.border2}`,background:isMatched?(C.isDark?"#0a2015":"#f0fdf4"):isWrong?(C.isDark?"#200a0a":"#fff0f0"):isSel?`${C.purple}22`:C.bg2,color:isMatched?C.green:isWrong?C.red:isSel?C.purple:C.text,fontFamily:font,fontSize:fs?14:13,textAlign:"center",cursor:isMatched?"default":"pointer",transition:"all 0.2s",opacity:isMatched?0.5:1}}
                onClick={()=>!isMatched&&setLeftSel(item.l)}>
                {isMatched?"✓":item.l}
              </button>
            );
          })}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {rights.map((r,i)=>{
            const isMatched=Object.values(matched).includes(r);const isSel=rightSel===r;
            return (
              <button key={i} disabled={isMatched}
                style={{padding:fs?"14px 10px":"12px 10px",borderRadius:8,border:`1.5px solid ${isMatched?C.green:isSel?C.purple:C.border2}`,background:isMatched?(C.isDark?"#0a2015":"#f0fdf4"):isSel?`${C.purple}22`:C.bg2,color:isMatched?C.green:isSel?C.purple:C.text,fontSize:fs?13:12,textAlign:"center",cursor:isMatched?"default":"pointer",transition:"all 0.2s",opacity:isMatched?0.5:1}}
                onClick={()=>!isMatched&&setRightSel(r)}>
                {isMatched?"✓":r}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Settings Modal ─────────────────────────────────────────────────────────────
function SettingsModal({onClose, darkMode, setDarkMode, fontSize, setFontSize, kanaFont, setKanaFont, sf, C, fontCss}) {
  return (
    <div style={{position:"fixed",inset:0,background:"#000000bb",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:100,padding:16}}
      onClick={onClose}>
      <div style={{background:C.bg2,border:`1px solid ${C.border}`,borderRadius:20,padding:24,width:"100%",maxWidth:440,paddingBottom:32}}
        onClick={e=>e.stopPropagation()}>

        <div style={{fontSize:11,color:C.textMid,letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:20}}>Innstillinger · 設定</div>

        {/* Dark / Light */}
        <div style={{marginBottom:20}}>
          <div style={{fontSize:12,color:C.textMid,marginBottom:10}}>Tema</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            {[{id:true,label:"🌙 Mørkt"},{id:false,label:"☀️ Lyst"}].map(t=>(
              <button key={String(t.id)}
                style={{padding:"12px",borderRadius:10,border:`1.5px solid ${darkMode===t.id?C.gold:C.border2}`,background:darkMode===t.id?`${C.gold}18`:C.bg3,color:darkMode===t.id?C.gold:C.textMid,fontSize:13,cursor:"pointer",fontFamily:"'Noto Serif JP',serif"}}
                onClick={()=>setDarkMode(t.id)}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Font size */}
        <div style={{marginBottom:20}}>
          <div style={{fontSize:12,color:C.textMid,marginBottom:10}}>Tekststørrelse</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            {[{id:"normal",label:"Normal あ"},{id:"large",label:"Stor　あ"}].map(s=>(
              <button key={s.id}
                style={{padding:"12px",borderRadius:10,border:`1.5px solid ${fontSize===s.id?C.teal:C.border2}`,background:fontSize===s.id?`${C.teal}18`:C.bg3,color:fontSize===s.id?C.teal:C.textMid,fontSize:s.id==="large"?17:13,cursor:"pointer",fontFamily:"'Noto Serif JP',serif"}}
                onClick={()=>setFontSize(s.id)}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Kana font */}
        <div style={{marginBottom:20}}>
          <div style={{fontSize:12,color:C.textMid,marginBottom:10}}>Kana-font</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8}}>
            {KANA_FONTS.map(f=>(
              <button key={f.id}
                style={{padding:"8px 6px",borderRadius:10,cursor:"pointer",border:`1.5px solid ${kanaFont===f.id?C.gold:C.border2}`,background:kanaFont===f.id?`${C.gold}18`:C.bg3,color:kanaFont===f.id?C.gold:C.textMid,display:"flex",alignItems:"center",gap:4,flexDirection:"column"}}
                onClick={()=>{setKanaFont(f.id);sf(f.id);}}>
                <span style={{fontFamily:f.css,fontSize:28}}>{f.sample}</span>
                <span style={{fontSize:10}}>{f.label}</span>
              </button>
            ))}
          </div>
          <div style={{marginTop:12,padding:"14px",background:C.bg3,borderRadius:12,textAlign:"center",fontFamily:fontCss,fontSize:40,color:C.text}}>あいうえお</div>
        </div>

        <button style={btnStyle("ghost",C)} onClick={onClose}>Lukk</button>
      </div>
    </div>
  );
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
  const [kanaFont, setKanaFont]         = useState("sans");
  const [showSettings, setShowSettings] = useState(false);
  const [darkMode, setDarkMode]         = useState(false);
  const [fontSize, setFontSize]         = useState("large");
  const [navTab, setNavTab]             = useState("home"); // "home"|"motto"|"marugoto"
  const [studyLesson, setStudyLesson]   = useState(null);  // lesson key for study mode
  // Counter
  const [counterCat, setCounterCat]     = useState(null);
  const [counterQ, setCounterQ]         = useState(null);
  const [counterVal, setCounterVal]     = useState("");
  const [counterResult, setCounterResult] = useState(null);
  const [counterScore, setCounterScore] = useState(0);
  const [counterQueue, setCounterQueue] = useState([]);
  const [counterQIdx, setCounterQIdx]   = useState(0);
  // Spaced repetition
  const [srQueue, setSrQueue]           = useState([]);    // current shuffled deck with SR weights
  const [srMissed, setSrMissed]         = useState({});   // kana → consecutive miss count
  const [srStreak, setSrStreak]         = useState({});   // kana → consecutive correct count
  // Grammar hints tracking
  const [lastHints, setLastHints]       = useState(null);

  const C = useMemo(() => makeColors(darkMode), [darkMode]);
  const lockedOptions = useRef({});
  const fs = fontSize === "large";

  useEffect(()=>{
    async function load(){
      try{
        const r=await window.storage.get("jp-progress"); if(r)setProgress(JSON.parse(r.value));
        const s=await window.storage.get("jp-streak");   if(s)setStreak(parseInt(s.value,10)||0);
        const f=await window.storage.get("jp-font");     if(f)setKanaFont(f.value); else setKanaFont("sans");
        const d=await window.storage.get("jp-dark");     if(d)setDarkMode(d.value==="true"); else setDarkMode(false);
        const sz=await window.storage.get("jp-fontsize");if(sz)setFontSize(sz.value); else setFontSize("large");
        const sr=await window.storage.get("jp-sr-streak"); if(sr)setSrStreak(JSON.parse(sr.value));
        const sm=await window.storage.get("jp-sr-missed"); if(sm)setSrMissed(JSON.parse(sm.value));
      }catch{}
    }
    load();
  },[]);

  const sp = async p=>{try{await window.storage.set("jp-progress",JSON.stringify(p));}catch{}};
  const ss = async s=>{try{await window.storage.set("jp-streak",String(s));}catch{}};
  const sf = async f=>{try{await window.storage.set("jp-font",f);}catch{}};
  const saveDark = async d=>{try{await window.storage.set("jp-dark",String(d));}catch{}};
  const saveFontSize = async s=>{try{await window.storage.set("jp-fontsize",s);}catch{}};
  const saveSrStreak = async s=>{try{await window.storage.set("jp-sr-streak",JSON.stringify(s));}catch{}};
  const saveSrMissed = async s=>{try{await window.storage.set("jp-sr-missed",JSON.stringify(s));}catch{}};

  function handleSetDark(v){setDarkMode(v);saveDark(v);}
  function handleSetFontSize(v){setFontSize(v);saveFontSize(v);}

  const lessons = useMemo(()=>{
    const map={};
    ALL_WORDS.forEach(w=>{const l=w.l||"ukjent";if(!map[l])map[l]=[];map[l].push(w);});
    return map;
  },[]);

  const lessonKeys = useMemo(()=>
    Object.keys(lessons).filter(l=>l!=="ukjent").sort((a,b)=>{
      const pa=a.split("-").map(Number),pb=b.split("-").map(Number);
      return pa[0]!==pb[0]?pa[0]-pb[0]:(pa[1]||0)-(pb[1]||0);
    }),[lessons]);

  function getLockedOptions(word, key) {
    if(lockedOptions.current[key])return lockedOptions.current[key];
    const others=shuffle(ALL_WORDS.filter(w=>w.e!==word.e)).slice(0,3);
    const opts=shuffle([word,...others]);
    lockedOptions.current[key]=opts;
    return opts;
  }

  // Build SR-weighted pool: missed words appear more often
  function buildSRPool(basePool) {
    const weighted = [];
    basePool.forEach(w => {
      const missCount = srMissed[w.k] || 0;
      const times = 1 + Math.min(missCount, 3); // max 4x weight
      for (let i = 0; i < times; i++) weighted.push(w);
    });
    return shuffle(weighted).slice(0, 20);
  }

  function startQuiz(lesson, activity) {
    lockedOptions.current={};
    const base = shuffle(lesson?(lessons[lesson]||[]):ALL_WORDS);
    const pool = buildSRPool(base);
    setQuizWords(pool);setQIdx(0);setScore(0);setSelected(null);
    setFlashFlipped(false);setWriteVal("");setWriteResult(null);
    setShowRomaji(false);setSessionCorrect(0);
    setSelectedActivity(activity);
    setSrQueue(pool);
    setScreen("quiz");
  }

  function buildCounterQueue(cat){
    const items=[];
    const cats=cat?[cat]:Object.keys(COUNTER_CATS);
    cats.forEach(c=>COUNTER_CATS[c].forEach(e=>items.push({...e,cat:c})));
    return shuffle(items).slice(0,20);
  }
  function startCounterQuiz(cat){
    const queue=buildCounterQueue(cat);
    setCounterQueue(queue);setCounterQIdx(0);setCounterScore(0);
    setCounterVal("");setCounterResult(null);setCounterCat(cat);
    loadCounterQ(queue,0);setScreen("counter");
  }
  function loadCounterQ(queue,idx){
    if(idx>=queue.length){setScreen("counter-result");return;}
    const e=queue[idx];
    const examples=CAT_EXAMPLES[e.cat]||["ting"];
    const example=examples[(e.num-1)%examples.length]||examples[0];
    setCounterQ({...e,example});setCounterVal("");setCounterResult(null);
  }
  function submitCounterAnswer(){
    if(!counterQ)return;
    const val=counterVal.trim();
    const correct=val===counterQ.kana||val.toLowerCase()===counterQ.romaji.toLowerCase()
      ||(counterQ.romaji.includes("/")&&counterQ.romaji.split("/").map(r=>r.trim().toLowerCase()).includes(val.toLowerCase()));
    setCounterResult(correct?"correct":"wrong");
    if(correct)setCounterScore(s=>s+1);
  }
  function advanceCounter(){
    const next=counterQIdx+1;setCounterQIdx(next);
    if(next>=counterQueue.length){const ns=streak+1;setStreak(ns);ss(ns);setScreen("counter-result");}
    else loadCounterQ(counterQueue,next);
  }

  function handleChoice(word, choice) {
    if(selected)return;
    setSelected(choice);
    const correct = choice.e===word.e;
    if(correct){
      setScore(s=>s+1);setSessionCorrect(p=>p+1);
      // SR: increment streak, clear miss
      const ns={...srStreak,[word.k]:(srStreak[word.k]||0)+1};
      const nm={...srMissed};
      if(ns[word.k]>=2) delete nm[word.k]; // graduated after 2 correct in a row
      setSrStreak(ns);setSrMissed(nm);saveSrStreak(ns);saveSrMissed(nm);
    } else {
      // SR: increment miss, reset streak
      const nm={...srMissed,[word.k]:(srMissed[word.k]||0)+1};
      const ns={...srStreak,[word.k]:0};
      setSrMissed(nm);setSrStreak(ns);saveSrMissed(nm);saveSrStreak(ns);
    }
  }
  function handleWriteSubmit(){
    const word=quizWords[qIdx];if(!word)return;
    const correct=writeVal.trim()===word.k||writeVal.trim().toLowerCase()===word.r?.toLowerCase();
    setWriteResult(correct?"correct":"wrong");
    if(correct){
      setScore(s=>s+1);setSessionCorrect(p=>p+1);
      const ns={...srStreak,[word.k]:(srStreak[word.k]||0)+1};
      const nm={...srMissed};if(ns[word.k]>=2)delete nm[word.k];
      setSrStreak(ns);setSrMissed(nm);saveSrStreak(ns);saveSrMissed(nm);
    } else {
      const nm={...srMissed,[word.k]:(srMissed[word.k]||0)+1};
      const ns={...srStreak,[word.k]:0};
      setSrMissed(nm);setSrStreak(ns);saveSrMissed(nm);saveSrStreak(ns);
    }
  }
  function nextQuestion(){
    if(qIdx+1>=quizWords.length){
      const newP={...progress},key=selectedLesson||"__all";
      if(!newP[key])newP[key]={correct:0,total:0};
      newP[key].correct+=sessionCorrect;newP[key].total+=quizWords.length;
      setProgress(newP);sp(newP);
      const ns=streak+1;setStreak(ns);ss(ns);
      setScreen("result");
    }else{
      setQIdx(q=>q+1);setSelected(null);setFlashFlipped(false);
      setWriteVal("");setWriteResult(null);setShowRomaji(false);
    }
  }
  function getLessonProgress(lesson){
    const p=progress[lesson];if(!p||p.total===0)return 0;
    return Math.min(100,Math.round((p.correct/p.total)*100));
  }

  const currentWord=quizWords[qIdx];
  const optKey=currentWord?`${qIdx}-${currentWord.k}`:"";
  const options=currentWord?getLockedOptions(currentWord,optKey):[];
  const fontCss=KANA_FONTS.find(f=>f.id===kanaFont)?.css||KANA_FONTS[0].css;

  const optStyle=(state)=>({
    padding:fs?"18px 10px":"14px 10px",borderRadius:10,
    border:`1.5px solid ${state==="correct"?C.green:state==="wrong"?C.red:C.border2}`,
    background:state==="correct"?(C.isDark?"#0a2015":"#f0fdf4"):state==="wrong"?(C.isDark?"#200a0a":"#fff0f0"):C.bg2,
    color:state==="correct"?C.green:state==="wrong"?C.red:C.text,
    cursor:state?"default":"pointer",fontSize:fs?15:13,textAlign:"center",
    transition:"all 0.15s",fontFamily:"'Noto Serif JP',serif",lineHeight:1.3,
  });

  // SR badge: show if word has been missed
  const missedCount = Object.keys(srMissed).length;

  return (
    <div style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:"'Noto Serif JP',Georgia,serif",maxWidth:480,margin:"0 auto",position:"relative"}}>
      <link href={FONT_URL} rel="stylesheet" />
      <style>{`
        *{box-sizing:border-box} body{margin:0;background:${C.bg}}
        button:active{opacity:0.72}
        input:focus{border-color:${C.gold}!important;box-shadow:0 0 0 2px ${C.gold}22}
        input::placeholder{color:${C.textDim};font-size:${fs?18:16}px}
        @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
        .fade{animation:fadeIn 0.2s ease}
      `}</style>

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal
          onClose={()=>setShowSettings(false)}
          darkMode={darkMode} setDarkMode={handleSetDark}
          fontSize={fontSize} setFontSize={handleSetFontSize}
          kanaFont={kanaFont} setKanaFont={setKanaFont}
          sf={sf} C={C} fontCss={fontCss}
        />
      )}

      {/* Header */}
      <div style={{padding:"18px 20px 12px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"space-between",background:C.isDark?"linear-gradient(180deg,#0f0c08 0%,transparent 100%)":"linear-gradient(180deg,#f0ece4 0%,transparent 100%)"}}>
        <div style={{cursor:"pointer"}} onClick={()=>setScreen("home")}>
          <div style={{fontSize:fs?26:22,fontWeight:700,color:C.gold,letterSpacing:"0.05em"}}>日本語</div>
          <div style={{fontSize:fs?12:11,color:C.textDim,letterSpacing:"0.15em",textTransform:"uppercase",marginTop:2}}>Marugoto A1 · MottoMotto</div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          {missedCount>0&&(
            <div style={{display:"flex",alignItems:"center",gap:3,background:C.isDark?"#1a0a1a":"#faf5ff",border:`1px solid ${C.purple}44`,borderRadius:20,padding:"5px 10px",fontSize:fs?14:12,color:C.purple}}>
              🔁{missedCount}
            </div>
          )}
          <button
            style={{display:"flex",alignItems:"center",gap:5,background:"none",border:`1px solid ${C.border2}`,borderRadius:8,padding:"5px 10px",cursor:"pointer",color:C.textMid}}
            onClick={()=>setShowSettings(true)}>
            <span style={{fontFamily:fontCss,fontSize:fs?20:18,lineHeight:1,color:C.text}}>あ</span>
            <span style={{fontSize:12,color:C.textMid}}>⚙</span>
          </button>
          <div style={{display:"flex",alignItems:"center",gap:4,background:C.isDark?"#1a1408":"#fffbf0",border:`1px solid ${C.isDark?"#3a2e1a":"#e8d89a"}`,borderRadius:20,padding:"5px 12px",fontSize:fs?16:14,fontWeight:700,color:"#f59e0b"}}>
            🔥{streak}
          </div>
        </div>
      </div>

      {/* HOME */}
      {screen==="home"&&(
        <div className="fade">
          {/* Tab bar */}
          <div style={{display:"flex",borderBottom:`2px solid ${C.border}`,background:C.bg2}}>
            {[{id:"home",label:"Hjem",icon:"⊕"},{id:"motto",label:"MottoMotto",icon:"🏫"},{id:"marugoto",label:"Marugoto",icon:"📖"}].map(tab=>(
              <button key={tab.id}
                style={{flex:1,padding:fs?"14px 4px":"11px 4px",border:"none",background:"none",color:navTab===tab.id?C.gold:C.textMid,fontFamily:"'Noto Serif JP',serif",fontSize:fs?12:10,fontWeight:navTab===tab.id?700:400,cursor:"pointer",borderBottom:`2.5px solid ${navTab===tab.id?C.gold:"transparent"}`,marginBottom:-2,letterSpacing:"0.02em"}}
                onClick={()=>setNavTab(tab.id)}>
                <div style={{fontSize:fs?18:15}}>{tab.icon}</div>
                {tab.label}
              </button>
            ))}
          </div>

          {/* ── Hjem tab ── */}
          {navTab==="home"&&(<>
            {/* Grammar section */}
            <div style={{padding:"16px 20px 8px"}}>
              <div style={{fontSize:11,color:C.textMid,letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:10}}>Grammatikkøvelser · A1.1</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                {GRAMMAR_ACTIVITIES.map(act=>(
                  <div key={act.id} style={{background:C.bg2,border:`1px solid ${C[act.color]}44`,borderRadius:12,padding:"14px 12px",cursor:"pointer",display:"flex",flexDirection:"column",gap:6}}
                    onClick={()=>{setSelectedActivity(act.id);setScreen("grammar");}}>
                    <div style={{width:34,height:34,borderRadius:8,background:`${C[act.color]}22`,border:`1px solid ${C[act.color]}44`,display:"flex",alignItems:"center",justifyContent:"center",color:C[act.color],fontSize:16,fontFamily:fontCss}}>{act.icon}</div>
                    <div style={{fontSize:fs?14:12,fontWeight:600,color:C.text}}>{act.name}</div>
                    <div style={{fontSize:fs?12:10,color:C.textMid}}>{act.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* SR info */}
            {missedCount>0&&(
              <div style={{margin:"0 20px 8px",background:C.isDark?"#1a0a1a":"#faf5ff",border:`1px solid ${C.purple}44`,borderRadius:10,padding:"10px 14px",display:"flex",alignItems:"center",gap:10}}>
                <div style={{fontSize:20}}>🔁</div>
                <div>
                  <div style={{fontSize:fs?14:12,color:C.purple,fontWeight:600}}>Spaced repetition aktiv</div>
                  <div style={{fontSize:fs?12:10,color:C.textMid,marginTop:2}}>{missedCount} ord du har bommet på øves ekstra</div>
                </div>
              </div>
            )}

            {/* Alle gloser */}
            <div style={{padding:"0 20px 8px"}}>
              <div style={{fontSize:11,color:C.textMid,letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:10}}>Alle gloser – rask øvelse</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                {VOCAB_ACTIVITIES.map(act=>(
                  <div key={act.id} style={{background:C.bg2,border:`1px solid ${C[act.color]}44`,borderRadius:12,padding:"14px 10px",cursor:"pointer",display:"flex",flexDirection:"column",gap:6,alignItems:"center",textAlign:"center"}}
                    onClick={()=>{setSelectedLesson(null);startQuiz(null,act.id);}}>
                    <div style={{fontSize:20,color:C[act.color]}}>{act.icon}</div>
                    <div style={{fontSize:fs?13:11,fontWeight:600,color:C.text}}>{act.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tellemåter */}
            <div style={{padding:"8px 20px 24px"}}>
              <div style={{fontSize:11,color:C.textMid,letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:10}}>Tellemåter · 助数詞</div>
              <div style={{background:C.isDark?"linear-gradient(135deg,#0a1a18,#0f2220)":C.bg2,border:`1px solid ${C.teal}44`,borderRadius:12,padding:"14px 16px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between"}}
                onClick={()=>setScreen("counter-pick")}>
                <div>
                  <div style={{fontSize:fs?16:14,fontWeight:600,color:C.teal}}>Øv tellemåter</div>
                  <div style={{fontSize:fs?13:11,color:C.textMid,marginTop:2}}>7 kategorier · 70 former</div>
                </div>
                <div style={{fontFamily:fontCss,fontSize:fs?32:28,color:C.teal}}>一二三</div>
              </div>
            </div>
          </>)}

          {/* ── MottoMotto tab ── */}
          {navTab==="motto"&&(
            <div style={{padding:"16px 20px 24px"}}>
              <div style={{fontSize:fs?15:13,color:C.textMid,marginBottom:16}}>Øv etter Urara-timene i kronologisk rekkefølge.</div>
              {/* A1 */}
              <div style={{marginBottom:20}}>
                <div style={{fontSize:11,color:C.textMid,letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:10}}>A1 · Starter</div>
                {/* A1.1 */}
                <div style={{marginBottom:12}}>
                  <div style={{fontSize:fs?15:13,fontWeight:700,color:C.gold,marginBottom:8}}>A1.1</div>
                  <div style={{display:"flex",flexDirection:"column",gap:6}}>
                    {[
                      {id:"A1.1-T1",label:"Time 1–2",leksjoner:[1,2]},
                      {id:"A1.1-T2",label:"Time 3–4",leksjoner:[3,4]},
                      {id:"A1.1-T3",label:"Time 5–6",leksjoner:[5,6]},
                      {id:"A1.1-T4",label:"Time 7–8",leksjoner:[7,8]},
                      {id:"A1.1-T5",label:"Time 9–10",leksjoner:[9,10]},
                      {id:"A1.1-T6",label:"Time 11–12",leksjoner:[11,12]},
                    ].map(tp=>{
                      const lkeys=tp.leksjoner.map(n=>lessonKeys.find(k=>k===`${n}-${n+1}`||k===`${n-1}-${n}`||lessonKeys.find(k2=>k2===String(n)))).filter(Boolean);
                      const allWords=tp.leksjoner.flatMap(n=>{
                        const key=lessonKeys.find(k=>{const p=k.split("-").map(Number);return p[0]===n||p[1]===n;});
                        return key?(lessons[key]||[]):[];
                      });
                      const uniqueWords=[...new Map(allWords.map(w=>[w.k,w])).values()];
                      const hasWords=uniqueWords.length>0;
                      const pct=(() => {
                        const ps=tp.leksjoner.map(n=>{
                          const key=lessonKeys.find(k=>{const p=k.split("-").map(Number);return p[0]===n||p[1]===n;});
                          return key?getLessonProgress(key):0;
                        });
                        return ps.length?Math.round(ps.reduce((a,b)=>a+b,0)/ps.length):0;
                      })();
                      return (
                        <div key={tp.id} style={{background:C.bg2,border:`1px solid ${hasWords?C.gold+"44":C.border2}`,borderRadius:10,padding:"12px 14px",opacity:hasWords?1:0.45}}>
                          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                            <div>
                              <div style={{fontSize:fs?15:13,fontWeight:600,color:hasWords?C.text:C.textMid}}>{tp.label}</div>
                              <div style={{fontSize:10,color:C.textDim,marginTop:2}}>
                                {hasWords?`${uniqueWords.length} ord · L${tp.leksjoner.join(", ")}`:"-"}
                              </div>
                            </div>
                            {hasWords&&pct>0&&<div style={{fontSize:11,color:C.gold}}>{pct}%</div>}
                          </div>
                          {hasWords&&(
                            <div style={{display:"flex",gap:6,marginTop:10}}>
                              <button style={{flex:1,padding:fs?"10px":"8px",borderRadius:8,border:`1px solid ${C.gold}55`,background:`${C.gold}11`,color:C.gold,fontSize:fs?13:11,cursor:"pointer",fontFamily:"'Noto Serif JP',serif"}}
                                onClick={()=>{setStudyLesson(uniqueWords);setSelectedLesson(tp.id);setScreen("study");}}>
                                📚 Les
                              </button>
                              {VOCAB_ACTIVITIES.map(act=>(
                                <button key={act.id} style={{flex:1,padding:fs?"10px":"8px",borderRadius:8,border:`1px solid ${C[act.color]}55`,background:`${C[act.color]}11`,color:C[act.color],fontSize:fs?13:11,cursor:"pointer",fontFamily:"'Noto Serif JP',serif"}}
                                  onClick={()=>{setSelectedLesson(tp.id);lockedOptions.current={};const pool=buildSRPool([...uniqueWords]);setQuizWords(pool);setQIdx(0);setScore(0);setSelected(null);setFlashFlipped(false);setWriteVal("");setWriteResult(null);setShowRomaji(false);setSessionCorrect(0);setSelectedActivity(act.id);setScreen("quiz");}}>
                                  {act.icon}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                {/* A1.2 placeholder */}
                <div style={{background:C.bg2,border:`1px solid ${C.border2}`,borderRadius:10,padding:"12px 14px",opacity:0.4}}>
                  <div style={{fontSize:fs?14:12,color:C.textMid}}>A1.2 — data mangler</div>
                </div>
              </div>
              <div style={{background:C.bg2,border:`1px solid ${C.border2}`,borderRadius:10,padding:"12px 14px",opacity:0.4,marginBottom:8}}>
                <div style={{fontSize:fs?14:12,color:C.textMid}}>A2.1 / A2.2 / A2.3 — data mangler</div>
              </div>
            </div>
          )}

          {/* ── Marugoto tab ── */}
          {navTab==="marugoto"&&(
            <div style={{padding:"16px 20px 24px"}}>
              <div style={{fontSize:fs?15:13,color:C.textMid,marginBottom:16}}>Øv etter Marugoto-boken, topic for topic.</div>
              {/* Starter A1 */}
              <div style={{marginBottom:20}}>
                <div style={{fontSize:11,color:C.textMid,letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:10}}>Starter A1</div>
                <div style={{display:"flex",flexDirection:"column",gap:6}}>
                  {[
                    {id:1,navn:"にほんご",navn_no:"Japansk",leksjoner:[1,2]},
                    {id:2,navn:"わたし",navn_no:"Meg selv",leksjoner:[3,4]},
                    {id:3,navn:"たべもの",navn_no:"Mat",leksjoner:[5,6]},
                    {id:4,navn:"いえ",navn_no:"Hjem",leksjoner:[7,8]},
                    {id:5,navn:"せいかつ",navn_no:"Hverdagsliv",leksjoner:[9,10]},
                    {id:6,navn:"やすみのひ",navn_no:"Fridager",leksjoner:[11,12]},
                  ].map(topic=>{
                    const allWords=topic.leksjoner.flatMap(n=>{
                      const key=lessonKeys.find(k=>{const p=k.split("-").map(Number);return p[0]===n||p[1]===n;});
                      return key?(lessons[key]||[]):[];
                    });
                    const uniqueWords=[...new Map(allWords.map(w=>[w.k,w])).values()];
                    const hasWords=uniqueWords.length>0;
                    const pct=(() => {
                      const ps=topic.leksjoner.map(n=>{
                        const key=lessonKeys.find(k=>{const p=k.split("-").map(Number);return p[0]===n||p[1]===n;});
                        return key?getLessonProgress(key):0;
                      });
                      return ps.length?Math.round(ps.reduce((a,b)=>a+b,0)/ps.length):0;
                    })();
                    return (
                      <div key={topic.id} style={{background:C.bg2,border:`1px solid ${hasWords?C.teal+"44":C.border2}`,borderRadius:10,padding:"12px 14px",opacity:hasWords?1:0.5}}>
                        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:hasWords?10:0}}>
                          <div>
                            <div style={{display:"flex",alignItems:"center",gap:8}}>
                              <span style={{fontFamily:fontCss,fontSize:fs?20:17,color:C.teal}}>{topic.navn}</span>
                              <span style={{fontSize:fs?13:11,color:C.textMid}}>Topic {topic.id} · {topic.navn_no}</span>
                            </div>
                            <div style={{fontSize:10,color:C.textDim,marginTop:2}}>
                              {hasWords?`L${topic.leksjoner.join("+")} · ${uniqueWords.length} ord`:"Ingen data"}
                            </div>
                          </div>
                          {hasWords&&pct>0&&<div style={{fontSize:11,color:C.teal}}>{pct}%</div>}
                        </div>
                        {hasWords&&(
                          <div style={{display:"flex",gap:6}}>
                            <button style={{flex:1,padding:fs?"10px":"8px",borderRadius:8,border:`1px solid ${C.teal}55`,background:`${C.teal}11`,color:C.teal,fontSize:fs?13:11,cursor:"pointer",fontFamily:"'Noto Serif JP',serif"}}
                              onClick={()=>{setStudyLesson(uniqueWords);setSelectedLesson(`topic-${topic.id}`);setScreen("study");}}>
                              📚 Les
                            </button>
                            {VOCAB_ACTIVITIES.map(act=>(
                              <button key={act.id} style={{flex:1,padding:fs?"10px":"8px",borderRadius:8,border:`1px solid ${C[act.color]}55`,background:`${C[act.color]}11`,color:C[act.color],fontSize:fs?13:11,cursor:"pointer",fontFamily:"'Noto Serif JP',serif"}}
                                onClick={()=>{setSelectedLesson(`topic-${topic.id}`);lockedOptions.current={};const pool=buildSRPool([...uniqueWords]);setQuizWords(pool);setQIdx(0);setScore(0);setSelected(null);setFlashFlipped(false);setWriteVal("");setWriteResult(null);setShowRomaji(false);setSessionCorrect(0);setSelectedActivity(act.id);setScreen("quiz");}}>
                                {act.icon}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div style={{marginBottom:8}}>
                <div style={{fontSize:11,color:C.textMid,letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:8}}>Starter A2</div>
                {[
                  {id:7,navn:"まち",navn_no:"Byen",leksjoner:[13,14]},
                  {id:8,navn:"かいもの",navn_no:"Shopping",leksjoner:[15,16]},
                  {id:9,navn:"？",navn_no:"Ukjent",leksjoner:[17,18]},
                ].map(topic=>(
                  <div key={topic.id} style={{background:C.bg2,border:`1px solid ${C.border2}`,borderRadius:10,padding:"12px 14px",opacity:0.4,marginBottom:6}}>
                    <div style={{fontFamily:fontCss,fontSize:fs?18:15,color:C.teal,display:"inline"}}>{topic.navn}</div>
                    <span style={{fontSize:fs?13:11,color:C.textMid,marginLeft:8}}>Topic {topic.id} · {topic.navn_no} — data mangler</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* STUDY MODE */}
      {screen==="study"&&studyLesson&&(
        <div className="fade">
          <div style={{padding:"16px 20px"}}>
            <button style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",color:C.textMid,cursor:"pointer",fontSize:fs?15:13,padding:0,fontFamily:"'Noto Serif JP',serif",marginBottom:16}}
              onClick={()=>setScreen("home")}>← Tilbake</button>
            <div style={{fontSize:fs?18:15,fontWeight:700,color:C.gold,marginBottom:4}}>
              {selectedLesson?.startsWith("topic-") ? `Topic ${selectedLesson.replace("topic-","")}` : selectedLesson}
            </div>
            <div style={{fontSize:fs?13:11,color:C.textMid,marginBottom:16}}>{studyLesson.length} ord · Les og memorer</div>

            <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:20}}>
              {studyLesson.map((w,i)=>(
                <div key={i} style={{background:C.bg2,border:`1px solid ${C.border2}`,borderRadius:10,padding:"12px 14px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
                  <div style={{display:"flex",flexDirection:"column",gap:4,flex:1}}>
                    <span style={{fontFamily:fontCss,fontSize:fs?26:22,color:C.text,lineHeight:1.2}}>{w.k}</span>
                    <span style={{fontFamily:ROMAJI_FONT,fontSize:fs?13:11,color:C.textMid,fontWeight:600}}>{w.r}</span>
                  </div>
                  <div style={{fontSize:fs?14:12,color:C.textMid,textAlign:"right",maxWidth:140}}>{w.e}</div>
                  {srMissed[w.k]>0&&<span style={{fontSize:9,color:C.purple}}>🔁</span>}
                </div>
              ))}
            </div>

            <div style={{fontSize:11,color:C.textMid,letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:12}}>Klar til å teste deg?</div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {VOCAB_ACTIVITIES.map(act=>(
                <button key={act.id} style={{...btnStyle(act.color==="gold"?"primary":act.color,C,fs),display:"flex",alignItems:"center",gap:12,justifyContent:"flex-start",padding:fs?"16px 18px":"13px 16px"}}
                  onClick={()=>{lockedOptions.current={};const pool=buildSRPool([...studyLesson]);setQuizWords(pool);setQIdx(0);setScore(0);setSelected(null);setFlashFlipped(false);setWriteVal("");setWriteResult(null);setShowRomaji(false);setSessionCorrect(0);setSelectedActivity(act.id);setScreen("quiz");}}>
                  <span style={{fontSize:18}}>{act.icon}</span>
                  <div style={{textAlign:"left"}}>
                    <div style={{fontWeight:700}}>{act.name}</div>
                    <div style={{fontSize:fs?12:10,opacity:0.8,marginTop:1}}>{act.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* GRAMMAR SCREEN */}
      {screen==="grammar"&&(
        <div className="fade" style={{padding:"16px 20px",minHeight:"80vh"}}>
          <button style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",color:C.textMid,cursor:"pointer",fontSize:fs?15:13,padding:"0 0 16px",fontFamily:"'Noto Serif JP',serif"}}
            onClick={()=>setScreen("home")}>
            ← Tilbake
          </button>
          {selectedActivity==="particle" &&<ParticleQuiz onDone={()=>setScreen("home")} font={fontCss} C={C} large={fs} onHints={setLastHints} />}
          {selectedActivity==="sentence" &&<SentenceQuiz onDone={()=>setScreen("home")} font={fontCss} C={C} large={fs} onHints={setLastHints} />}
          {selectedActivity==="context"  &&<ContextQuiz  onDone={()=>setScreen("home")} font={fontCss} C={C} large={fs} onHints={setLastHints} />}
          {selectedActivity==="error"    &&<ErrorQuiz    onDone={()=>setScreen("home")} font={fontCss} C={C} large={fs} onHints={setLastHints} />}
          {selectedActivity==="matching" &&<MatchingQuiz onDone={()=>setScreen("home")} font={fontCss} C={C} large={fs} />}
        </div>
      )}

      {/* LESSON */}
      {screen==="lesson"&&selectedLesson&&(
        <div className="fade">
          <div style={{padding:"16px 20px"}}>
            <button style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",color:C.textMid,cursor:"pointer",fontSize:fs?15:13,padding:0,fontFamily:"'Noto Serif JP',serif"}}
              onClick={()=>setScreen("home")}>← Tilbake</button>
            <div style={{marginTop:16,marginBottom:20}}>
              <div style={{fontSize:fs?22:18,fontWeight:700,color:C.gold}}>Leksjon {selectedLesson}</div>
              <div style={{fontSize:fs?14:12,color:C.textMid,marginTop:4}}>{(lessons[selectedLesson]||[]).length} ord · {getLessonProgress(selectedLesson)}% fullført</div>
            </div>

            {/* Word list preview */}
            <div style={{background:C.bg2,border:`1px solid ${C.border2}`,borderRadius:12,padding:"12px 14px",marginBottom:16}}>
              <div style={{fontSize:11,color:C.textMid,letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:10}}>Ordliste</div>
              <div style={{display:"flex",flexDirection:"column",gap:6,maxHeight:200,overflowY:"auto"}}>
                {(lessons[selectedLesson]||[]).map((w,i)=>{
                  const missed=srMissed[w.k]>0;
                  const wds=lessons[selectedLesson]||[];
                  return (
                    <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:i<wds.length-1?`1px solid ${C.border}`:undefined}}>
                      <div style={{flex:1}}>
                        <div style={{fontFamily:fontCss,fontSize:fs?22:18,color:missed?C.red:C.text,lineHeight:1.2}}>{w.k}</div>
                        <div style={{fontFamily:ROMAJI_FONT,fontSize:fs?13:11,color:C.textMid,fontWeight:600,marginTop:2}}>{w.r}</div>
                      </div>
                      <span style={{fontSize:fs?13:11,color:C.textMid,textAlign:"right",maxWidth:130}}>{w.e}</span>
                      {missed&&<span style={{fontSize:9,color:C.purple}}>🔁</span>}
                    </div>
                  );
                })}
              </div>
            </div>

            <button style={{...btnStyle("ghost",C,fs),marginBottom:8,display:"flex",alignItems:"center",gap:10,justifyContent:"flex-start",padding:fs?"14px 16px":"11px 16px"}}
              onClick={()=>{setStudyLesson(lessons[selectedLesson]||[]);setScreen("study");}}>
              <span style={{fontSize:18}}>📚</span>
              <div style={{textAlign:"left"}}>
                <div style={{fontWeight:700,color:C.text}}>Les og memorer</div>
                <div style={{fontSize:fs?12:10,color:C.textMid,marginTop:1}}>Gå gjennom alle ordene rolig</div>
              </div>
            </button>

            <div style={{fontSize:11,color:C.textMid,letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:12}}>Velg aktivitet</div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {VOCAB_ACTIVITIES.map(act=>(
                <div key={act.id} style={{background:C.bg2,border:`1px solid ${C[act.color]}44`,borderRadius:12,padding:"16px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:14}}
                  onClick={()=>{setSelectedActivity(act.id);startQuiz(selectedLesson,act.id);}}>
                  <div style={{width:40,height:40,borderRadius:8,background:`${C[act.color]}22`,border:`1px solid ${C[act.color]}44`,display:"flex",alignItems:"center",justifyContent:"center",color:C[act.color],fontSize:18}}>{act.icon}</div>
                  <div>
                    <div style={{fontSize:fs?15:13,fontWeight:600,color:C.text}}>{act.name}</div>
                    <div style={{fontSize:fs?13:11,color:C.textMid,marginTop:2}}>{act.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* COUNTER PICK */}
      {screen==="counter-pick"&&(
        <div className="fade">
          <div style={{padding:"16px 20px"}}>
            <button style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",color:C.textMid,cursor:"pointer",fontSize:fs?15:13,padding:0,fontFamily:"'Noto Serif JP',serif"}}
              onClick={()=>setScreen("home")}>← Tilbake</button>
            <div style={{marginTop:16,marginBottom:20}}>
              <div style={{fontSize:fs?22:18,fontWeight:700,color:C.teal}}>Tellemåter · 助数詞</div>
              <div style={{fontSize:fs?14:12,color:C.textMid,marginTop:4}}>Velg kategori eller øv på alle</div>
            </div>
            <div style={{background:C.isDark?"linear-gradient(135deg,#0a1a18,#0f2220)":C.bg2,border:`1px solid ${C.teal}66`,borderRadius:12,padding:"16px",cursor:"pointer",marginBottom:10,display:"flex",alignItems:"center",justifyContent:"space-between"}}
              onClick={()=>startCounterQuiz(null)}>
              <div><div style={{fontSize:fs?16:14,fontWeight:700,color:C.teal}}>Alle kategorier</div><div style={{fontSize:fs?13:11,color:C.textMid,marginTop:2}}>70 former · blandet</div></div>
              <div style={{fontFamily:fontCss,fontSize:fs?28:24,color:C.teal}}>一〜十</div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {Object.entries(CAT_NO).map(([cat,label])=>{
                const items=COUNTER_CATS[cat]||[];
                return (
                  <div key={cat} style={{background:C.bg2,border:`1px solid ${C.teal}33`,borderRadius:12,padding:"14px 16px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between"}}
                    onClick={()=>startCounterQuiz(cat)}>
                    <div><div style={{fontSize:fs?15:13,fontWeight:600,color:C.text}}>{label}</div><div style={{fontSize:fs?13:11,color:C.textMid,marginTop:2}}>{items.length} former (1–10)</div></div>
                    <div style={{fontFamily:fontCss,fontSize:fs?26:22,color:C.teal}}>{items[0]?.kana||""}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* COUNTER QUIZ */}
      {screen==="counter"&&counterQ&&(
        <div className="fade" style={{padding:"20px",minHeight:"80vh",display:"flex",flexDirection:"column",gap:18}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <button style={{background:"none",border:"none",color:C.textMid,cursor:"pointer",padding:0,fontSize:18}} onClick={()=>setScreen("counter-pick")}>←</button>
            <ProgressBar pct={counterQIdx/counterQueue.length} color="teal" C={C} />
            <div style={{fontSize:12,color:C.textMid,minWidth:40,textAlign:"right"}}>{counterQIdx+1}/{counterQueue.length}</div>
          </div>
          <div style={{textAlign:"center",padding:"28px 20px",background:C.isDark?"linear-gradient(135deg,#0a1a18,#0f2220)":C.bg2,border:`1px solid ${C.teal}44`,borderRadius:16}}>
            <div style={{fontSize:fs?15:13,color:C.textMid,marginBottom:8}}>Hvordan sier du...</div>
            <div style={{fontSize:fs?64:56,fontWeight:900,color:C.teal,lineHeight:1}}>{counterQ.num}</div>
            <div style={{fontSize:fs?24:20,color:C.text,marginTop:8}}>{counterQ.example}</div>
            <div style={{fontSize:fs?13:11,color:C.textDim,marginTop:6}}>{CAT_NO[counterQ.cat]}</div>
          </div>
          <input style={{width:"100%",background:C.bg2,border:`1.5px solid ${counterResult==="correct"?C.green:counterResult==="wrong"?C.red:C.border2}`,borderRadius:10,padding:fs?"18px 16px":"14px 16px",color:C.text,fontSize:fs?32:28,fontFamily:fontCss,textAlign:"center",outline:"none",letterSpacing:"0.1em",boxSizing:"border-box"}}
            value={counterVal} onChange={e=>setCounterVal(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&!counterResult&&submitCounterAnswer()}
            placeholder="Skriv her..." disabled={!!counterResult} autoFocus />
          {counterResult&&(
            <div style={{textAlign:"center"}}>
              <div style={{fontSize:fs?24:20,color:counterResult==="correct"?C.green:C.red,fontWeight:700}}>{counterResult==="correct"?"✓ 正解！":"✗ 不正解"}</div>
              <div style={{fontFamily:fontCss,color:C.teal,fontSize:fs?46:40,marginTop:6}}>{counterQ.kana}</div>
              <div style={{color:C.textMid,fontSize:fs?16:14,marginTop:4}}>{counterQ.romaji}</div>
            </div>
          )}
          {!counterResult
            ?<button style={btnStyle("teal",C,fs)} onClick={submitCounterAnswer}>Sjekk svar</button>
            :<button style={btnStyle("teal",C,fs)} onClick={advanceCounter}>{counterQIdx+1<counterQueue.length?"Neste →":"Se resultat"}</button>
          }
        </div>
      )}

      {/* COUNTER RESULT */}
      {screen==="counter-result"&&(
        <div className="fade" style={{padding:"20px",minHeight:"80vh",display:"flex",flexDirection:"column",gap:18}}>
          <div style={{textAlign:"center",padding:"40px 20px"}}>
            <div style={{fontSize:52,marginBottom:16}}>{counterScore/counterQueue.length>=0.8?"🎉":counterScore/counterQueue.length>=0.5?"👏":"💪"}</div>
            <div style={{fontSize:fs?72:64,fontWeight:900,color:C.teal,lineHeight:1}}>{counterScore}/{counterQueue.length}</div>
            <div style={{fontSize:fs?16:14,color:C.textMid,marginTop:8}}>{counterScore/counterQueue.length>=0.8?"Utmerket!":counterScore/counterQueue.length>=0.5?"Bra jobba!":"Fortsett å øve!"}</div>
            <div style={{marginTop:20,fontSize:fs?16:14,color:"#f59e0b"}}>🔥 {streak} dager på rad</div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            <button style={btnStyle("teal",C,fs)} onClick={()=>startCounterQuiz(counterCat)}>Øv igjen</button>
            <button style={btnStyle("ghost",C,fs)} onClick={()=>setScreen("counter-pick")}>Velg kategori</button>
            <button style={btnStyle("ghost",C,fs)} onClick={()=>setScreen("home")}>Hjem</button>
          </div>
        </div>
      )}

      {/* VOCAB QUIZ */}
      {screen==="quiz"&&currentWord&&(
        <div className="fade" style={{padding:"20px",minHeight:"80vh",display:"flex",flexDirection:"column",gap:18}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <button style={{background:"none",border:"none",color:C.textMid,cursor:"pointer",padding:0,fontSize:18}} onClick={()=>setScreen(selectedLesson?"lesson":"home")}>←</button>
            <ProgressBar pct={qIdx/quizWords.length} color="gold" C={C} />
            <div style={{fontSize:12,color:C.textMid,minWidth:40,textAlign:"right"}}>{qIdx+1}/{quizWords.length}</div>
          </div>

          {selectedActivity==="multiple"&&(<>
            <div style={{textAlign:"center",padding:"28px 20px",background:C.cardBg,border:`1px solid ${C.border}`,borderRadius:16,position:"relative"}}>
              <div style={{position:"absolute",top:0,right:0,width:120,height:120,background:`radial-gradient(circle at 80% 20%,${C.gold}18 0%,transparent 70%)`,pointerEvents:"none"}} />
              <div style={{fontSize:fs?72:62,lineHeight:1.1,color:C.text,fontFamily:fontCss,letterSpacing:"0.05em"}}>{currentWord.k}</div>
              <div style={{fontSize:fs?17:15,color:C.textMid,marginTop:8,fontFamily:ROMAJI_FONT,letterSpacing:"0.05em",fontWeight:600}}>{showRomaji?currentWord.r:"···"}</div>
              <button style={{background:"none",border:"none",cursor:"pointer",color:C.textMid,fontSize:fs?13:11,margin:"10px auto 0",display:"block"}}
                onClick={()=>setShowRomaji(r=>!r)}>{showRomaji?"Skjul romaji":"Vis romaji"}</button>
              {srMissed[currentWord.k]>0&&<div style={{position:"absolute",top:10,left:14,fontSize:10,color:C.purple}}>🔁 Øves ekstra</div>}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {options.map((opt,i)=>{
                let state=null;
                if(selected){if(opt.e===currentWord.e)state="correct";else if(selected===opt)state="wrong";}
                return <button key={i} style={optStyle(state)} onClick={()=>handleChoice(currentWord,opt)}>{opt.e}</button>;
              })}
            </div>
            {selected&&<button style={btnStyle("primary",C,fs)} onClick={nextQuestion}>{qIdx+1<quizWords.length?"Neste →":"Se resultat"}</button>}
          </>)}

          {selectedActivity==="write"&&(<>
            <div style={{textAlign:"center",padding:"28px 20px",background:C.cardBg,border:`1px solid ${C.border}`,borderRadius:16}}>
              <div style={{fontSize:fs?26:22,color:C.text,marginBottom:8}}>{currentWord.e}</div>
              <div style={{fontSize:fs?14:12,color:C.textDim}}>Skriv på kana eller romaji</div>
              {srMissed[currentWord.k]>0&&<div style={{fontSize:10,color:C.purple,marginTop:6}}>🔁 Øves ekstra</div>}
            </div>
            <input style={{width:"100%",background:C.bg2,border:`1.5px solid ${writeResult==="correct"?C.green:writeResult==="wrong"?C.red:C.border2}`,borderRadius:10,padding:fs?"18px 16px":"14px 16px",color:C.text,fontSize:fs?32:28,fontFamily:fontCss,textAlign:"center",outline:"none",letterSpacing:"0.1em",boxSizing:"border-box"}}
              value={writeVal} onChange={e=>setWriteVal(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&!writeResult&&handleWriteSubmit()}
              placeholder="Skriv her..." disabled={!!writeResult} autoFocus />
            {writeResult&&(
              <div style={{textAlign:"center"}}>
                <div style={{fontSize:fs?24:20,color:writeResult==="correct"?C.green:C.red,fontWeight:700}}>{writeResult==="correct"?"✓ 正解！":"✗ 不正解"}</div>
                <div style={{fontFamily:fontCss,color:C.gold,fontSize:fs?38:32,marginTop:6}}>{currentWord.k}</div>
                {currentWord.r&&<div style={{color:C.textMid,fontSize:fs?16:14,marginTop:4,fontFamily:ROMAJI_FONT,fontWeight:600}}>{currentWord.r}</div>}
              </div>
            )}
            {!writeResult
              ?<button style={btnStyle("primary",C,fs)} onClick={handleWriteSubmit}>Sjekk svar</button>
              :<button style={btnStyle("primary",C,fs)} onClick={nextQuestion}>{qIdx+1<quizWords.length?"Neste →":"Se resultat"}</button>}
          </>)}

          {selectedActivity==="flash"&&(<>
            <div style={{minHeight:fs?240:200,borderRadius:16,border:`1px solid ${C.border}`,background:flashFlipped?(C.isDark?"linear-gradient(135deg,#0a2015,#0f2a1a)":"linear-gradient(135deg,#f0fdf4,#dcfce7)"):(C.cardBg),display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",padding:28,textAlign:"center",transition:"background 0.3s"}}
              onClick={()=>setFlashFlipped(f=>!f)}>
              {!flashFlipped?(<>
                <div style={{fontSize:fs?72:62,lineHeight:1.1,color:C.text,fontFamily:fontCss}}>{currentWord.k}</div>
                {currentWord.r&&<div style={{fontSize:fs?17:15,color:C.textMid,marginTop:8,fontFamily:ROMAJI_FONT,fontWeight:600}}>{currentWord.r}</div>}
                <div style={{color:C.textDim,fontSize:fs?14:12,marginTop:16}}>Trykk for å avsløre</div>
              </>):(<>
                <div style={{fontSize:fs?26:22,color:C.green,fontWeight:700}}>{currentWord.e}</div>
                <div style={{fontSize:fs?50:44,color:C.gold,fontFamily:fontCss,marginTop:8}}>{currentWord.k}</div>
              </>)}
            </div>
            {flashFlipped&&(
              <div style={{display:"flex",gap:8}}>
                <button style={{...btnStyle("ghost",C,fs),flex:1,borderColor:C.red,color:C.red}} onClick={()=>nextQuestion()}>✗ Visste ikke</button>
                <button style={{flex:1,padding:fs?"18px 24px":"14px 24px",borderRadius:10,border:"none",background:`linear-gradient(135deg,${C.isDark?"#166534":"#15803d"},#14532d)`,color:C.green,fontFamily:"'Noto Serif JP',serif",fontSize:fs?16:14,fontWeight:600,cursor:"pointer"}} onClick={()=>{setScore(s=>s+1);setSessionCorrect(p=>p+1);nextQuestion();}}>✓ Kunne det!</button>
              </div>
            )}
          </>)}
        </div>
      )}

      {/* RESULT */}
      {screen==="result"&&(
        <div className="fade" style={{padding:"20px",minHeight:"80vh",display:"flex",flexDirection:"column",gap:18}}>
          <div style={{textAlign:"center",padding:"40px 20px"}}>
            <div style={{fontSize:52,marginBottom:16}}>{score/quizWords.length>=0.8?"🎉":score/quizWords.length>=0.5?"👏":"💪"}</div>
            <div style={{fontSize:fs?72:64,fontWeight:900,color:C.gold,lineHeight:1}}>{score}/{quizWords.length}</div>
            <div style={{fontSize:fs?16:14,color:C.textMid,marginTop:8}}>{score/quizWords.length>=0.8?"Utmerket! 素晴らしい！":score/quizWords.length>=0.5?"Bra jobba! よくできました！":"Fortsett å øve! がんばって！"}</div>
            <div style={{marginTop:20,fontSize:fs?16:14,color:"#f59e0b"}}>🔥 {streak} dager på rad</div>
            {missedCount>0&&(
              <div style={{marginTop:10,fontSize:fs?13:11,color:C.purple}}>🔁 {missedCount} ord vil bli øvd ekstra neste gang</div>
            )}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            <button style={btnStyle("primary",C,fs)} onClick={()=>startQuiz(selectedLesson,selectedActivity)}>Øv igjen</button>
            <button style={btnStyle("ghost",C,fs)} onClick={()=>setScreen("home")}>Tilbake til hjem</button>
          </div>
        </div>
      )}
    </div>
  );
}
