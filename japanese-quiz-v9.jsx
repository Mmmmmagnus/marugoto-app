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
const LESSONS_DATA = {"1-2":[{"e":"10th","r":"tooka","k":"とおか","l":"1-2"},{"e":"14th","r":"juu-yokka","k":"じゅうよっか","l":"1-2"},{"e":"1st","r":"tsuitachi","k":"ついたち","l":"1-2"},{"e":"20th","r":"hatsuka","k":"はつか","l":"1-2"},{"e":"24th","r":"nijuu-yokka","k":"にじゅうよっか","l":"1-2"},{"e":"2nd","r":"futsuka","k":"ふつか","l":"1-2"},{"e":"3rd","r":"mikka","k":"みっか","l":"1-2"},{"e":"4th","r":"yokka","k":"よっか","l":"1-2"},{"e":"5th","r":"itsuka","k":"いつか","l":"1-2"},{"e":"6th","r":"muika","k":"むいか","l":"1-2"},{"e":"7th","r":"nanoka","k":"なのか","l":"1-2"},{"e":"8th","r":"yooka","k":"ようか","l":"1-2"},{"e":"9th","r":"kokonoka","k":"ここのか","l":"1-2"},{"e":"beautiful","r":"kiree","k":"きれい","l":"1-2"},{"e":"big","r":"ookii","k":"おおきい","l":"1-2"},{"e":"big/spacious","r":"hiroi","k":"ひろい","l":"1-2"},{"e":"bright","r":"akarui","k":"あかるい","l":"1-2"},{"e":"cold","r":"tsumetai","k":"つめたい","l":"1-2"},{"e":"day","r":"hi","k":"ひ","l":"1-2"},{"e":"delicious /tasty","r":"oishii","k":"おいしい","l":"1-2"},{"e":"every day","r":"mainichi","k":"まいにち","l":"1-2"},{"e":"expensive","r":"takai","k":"たかい","l":"1-2"},{"e":"hot","r":"atsui","k":"あつい","l":"1-2"},{"e":"hot/spicy/salty","r":"karai","k":"からい","l":"1-2"},{"e":"inexpensive/cheap","r":"yasui","k":"やすい","l":"1-2"},{"e":"dark","r":"kurai","k":"くらい","l":"1-2"},{"e":"new","r":"atarashii","k":"あたらしい","l":"1-2"},{"e":"nice/good","r":"ii","k":"いい","l":"1-2"},{"e":"old","r":"furui","k":"ふるい","l":"1-2"},{"e":"quick","r":"hayai","k":"はやい","l":"1-2"},{"e":"salty","r":"shoppai","k":"しょっぱい","l":"1-2"},{"e":"slow","r":"osoi","k":"おそい","l":"1-2"},{"e":"small","r":"chiisai","k":"ちいさい","l":"1-2"},{"e":"small/cramped","r":"semai","k":"せまい","l":"1-2"},{"e":"sour","r":"suppai","k":"すっぱい","l":"1-2"},{"e":"sweet","r":"amai","k":"あまい","l":"1-2"},{"e":"the day after tomorrow","r":"asatte","k":"あさって","l":"1-2"},{"e":"the day before yesterday","r":"ototoi","k":"おととい","l":"1-2"},{"e":"today","r":"kyoo","k":"きょう","l":"1-2"},{"e":"tomorrow","r":"ashita","k":"あした","l":"1-2"},{"e":"unappetizing","r":"mazui","k":"まずい","l":"1-2"},{"e":"untidy/dirty","r":"kitanai","k":"きたない","l":"1-2"},{"e":"warm","r":"atatakai","k":"あたたかい","l":"1-2"},{"e":"yesterday","r":"kinoo","k":"きのう","l":"1-2"},{"e":"11th","r":"juu-ichi-nichi","k":"じゅういちにち","l":"1-2"},{"e":"12th","r":"juu-ni-nichi","k":"じゅうににち","l":"1-2"},{"e":"13th","r":"juu-san-nichi","k":"じゅうさんにち","l":"1-2"},{"e":"15th","r":"juu-go-nichi","k":"じゅうごにち","l":"1-2"},{"e":"16th","r":"juu-roku-nichi","k":"じゅうろくにち","l":"1-2"},{"e":"17th","r":"juu-shichi-nichi","k":"じゅうしちにち","l":"1-2"},{"e":"18th","r":"juu-hachi-nichi","k":"じゅうはちにち","l":"1-2"},{"e":"19th","r":"juu-ku-nichi","k":"じゅうくにち","l":"1-2"},{"e":"21st","r":"nijuu-ichi-nichi","k":"にじゅういちにち","l":"1-2"},{"e":"22nd","r":"nijuu-ni-nichi","k":"にじゅうににち","l":"1-2"},{"e":"25th","r":"nijuu-go-nichi","k":"にじゅうごにち","l":"1-2"},{"e":"26th","r":"nijuu-roku-nichi","k":"にじゅうろくにち","l":"1-2"},{"e":"27th","r":"nijuu-shichi-nichi","k":"にじゅうしちにち","l":"1-2"},{"e":"28th","r":"nijuu-hachi-nichi","k":"にじゅうはちにち","l":"1-2"},{"e":"29th","r":"nijuu-ku-nichi","k":"にじゅうくにち","l":"1-2"},{"e":"30th","r":"sanjuu-nichi","k":"さんじゅうにち","l":"1-2"},{"e":"31st","r":"sanjuu-ichi-nichi","k":"さんじゅういちにち","l":"1-2"},{"e":"april","r":"shi-gatsu","k":"しがつ","l":"1-2"},{"e":"august","r":"hachi-gatsu","k":"はちがつ","l":"1-2"},{"e":"december","r":"juu-ni-gatsu","k":"じゅうにがつ","l":"1-2"},{"e":"february","r":"ni-gatsu","k":"にがつ","l":"1-2"},{"e":"january","r":"ichi-gatsu","k":"いちがつ","l":"1-2"},{"e":"july","r":"shichi-gatsu","k":"しちがつ","l":"1-2"},{"e":"june","r":"roku-gatsu","k":"ろくがつ","l":"1-2"},{"e":"march","r":"san-gatsu","k":"さんがつ","l":"1-2"},{"e":"may","r":"go-gatsu","k":"ごがつ","l":"1-2"},{"e":"november","r":"juu-ichi-gatsu","k":"じゅういちがつ","l":"1-2"},{"e":"october","r":"juu-gatsu","k":"じゅうがつ","l":"1-2"},{"e":"september","r":"ku-gatsu","k":"くがつ","l":"1-2"},{"e":"Golden Week holidays","r":"gooruden-uiiku","k":"ゴールデンウィーク","l":"1-2"},{"e":"New Year's holiday","r":"oshoogatsu","k":"おしょうがつ","l":"1-2"},{"e":"New Year's visit to a shrine or a temple","r":"hatsu-moode","k":"はつもうで","l":"1-2"},{"e":"brochure / pamphlet","r":"panfuretto","k":"パンフレット","l":"1-2"},{"e":"calendar","r":"karendaa","k":"カレンダー","l":"1-2"},{"e":"cherry-blossom viewing","r":"hanami","k":"はなみ","l":"1-2"},{"e":"concert","r":"konsaato","k":"コンサート","l":"1-2"},{"e":"contest","r":"kontesuto","k":"コンテスト","l":"1-2"},{"e":"event","r":"ibento","k":"イベント","l":"1-2"},{"e":"festival / celebration","r":"matsuri","k":"まつり","l":"1-2"},{"e":"fireworks","r":"hanabi","k":"はなび","l":"1-2"},{"e":"fireworks display","r":"hanabi-taikai","k":"はなびたいかい","l":"1-2"},{"e":"kabuki","r":"kabuki","k":"かぶき","l":"1-2"},{"e":"kimono","r":"kimono","k":"きもの","l":"1-2"},{"e":"leaflet/flyer","r":"chirashi","k":"チラシ","l":"1-2"},{"e":"party","r":"paathii","k":"パーティー","l":"1-2"},{"e":"poster","r":"posutaa","k":"ポスター","l":"1-2"},{"e":"show","r":"shoo","k":"ショー","l":"1-2"},{"e":"snow festival","r":"yuki-matsuri","k":"ゆきまつり","l":"1-2"},{"e":"summer holidays","r":"natsu-yasumi","k":"なつやすみ","l":"1-2"},{"e":"sumo wrestling","r":"sumoo","k":"すもう","l":"1-2"},{"e":"swimming in the sea","r":"kaisuiyoku","k":"かいすいよく","l":"1-2"},{"e":"taiko drumming","r":"taiko","k":"たいこ","l":"1-2"},{"e":"ticket","r":"chiketto","k":"チケット","l":"1-2"},{"e":"to go out","r":"dekakemasu","k":"でかけます","l":"1-2"},{"e":"to meet a friend","r":"tomodachi ni aimasu","k":"ともだちにあいます","l":"1-2"},{"e":"winter holidays","r":"fuyu-yasumi","k":"ふゆやすみ","l":"1-2"}],"3-4":[{"e":"convenient","r":"benri","k":"べんり","l":"3-4"},{"e":"easy","r":"raku","k":"らく","l":"3-4"},{"e":"far","r":"tooi","k":"とおい","l":"3-4"},{"e":"inconvenient","r":"fuben","k":"ふべん","l":"3-4"},{"e":"near","r":"chikai","k":"ちかい","l":"3-4"},{"e":"tiring","r":"tsukaremasu","k":"つかれます","l":"3-4"},{"e":"airport","r":"kuukoo","k":"くうこう","l":"3-4"},{"e":"ambulance","r":"kyuukyuusha","k":"きゅうきゅうしゃ","l":"3-4"},{"e":"baggage","r":"nimotsu","k":"にもつ","l":"3-4"},{"e":"bicycle","r":"jitensha","k":"じてんしゃ","l":"3-4"},{"e":"bullet train","r":"shinkansen","k":"しんかんせん","l":"3-4"},{"e":"bus","r":"Basu","k":"バス","l":"3-4"},{"e":"bus stop","r":"basu-tee","k":"バスてい","l":"3-4"},{"e":"by foot","r":"aruite","k":"あるいて","l":"3-4"},{"e":"car","r":"kuruma","k":"くるま","l":"3-4"},{"e":"driver","r":"untenshu","k":"うんてんしゅ","l":"3-4"},{"e":"east exit","r":"higashiguchi","k":"ひがしぐち","l":"3-4"},{"e":"entrance","r":"iriguchi","k":"いりぐち","l":"3-4"},{"e":"exit","r":"deguchi","k":"でぐち","l":"3-4"},{"e":"free taxi","r":"kuusha","k":"くうしゃ","l":"3-4"},{"e":"left","r":"hidari","k":"ひだり","l":"3-4"},{"e":"map","r":"chizu","k":"ちず","l":"3-4"},{"e":"metro/subway/underground","r":"chikatetsu","k":"ちかてつ","l":"3-4"},{"e":"monorail","r":"monoreeru","k":"モノレール","l":"3-4"},{"e":"motorbike","r":"baiku","k":"バイク","l":"3-4"},{"e":"north exit","r":"kitaguchi","k":"きたぐち","l":"3-4"},{"e":"parking space","r":"chuushajoo","k":"ちゅうしゃじょう","l":"3-4"},{"e":"plane","r":"hikooki","k":"ひこうき","l":"3-4"},{"e":"police car","r":"patokaa","k":"パトカー","l":"3-4"},{"e":"police officer","r":"keesatsukan","k":"けいさつかん","l":"3-4"},{"e":"right","r":"migi","k":"みぎ","l":"3-4"},{"e":"road","r":"michi","k":"みち","l":"3-4"},{"e":"ship","r":"fune","k":"ふね","l":"3-4"},{"e":"south exit","r":"minamiguchi","k":"みなみぐち","l":"3-4"},{"e":"stand / place for boarding vehicles","r":"noriba","k":"のりば","l":"3-4"},{"e":"station","r":"eki","k":"えき","l":"3-4"},{"e":"station staff","r":"eki'in","k":"えきいん","l":"3-4"},{"e":"straight","r":"massugu","k":"まっすぐ","l":"3-4"},{"e":"street","r":"toori","k":"とおり","l":"3-4"},{"e":"taxi","r":"takushii","k":"タクシー","l":"3-4"},{"e":"ticket","r":"kippu","k":"きっぷ","l":"3-4"},{"e":"to get off ___","r":"___ o orimasu","k":"おります","l":"3-4"},{"e":"to get on ___","r":"___ ni norimasu","k":"のります","l":"3-4"},{"e":"to go by ___","r":"___ de ikimasu","k":"いきます","l":"3-4"},{"e":"to stop","r":"tomarimasu","k":"とまります","l":"3-4"},{"e":"to turn","r":"magarimasu","k":"まがります","l":"3-4"},{"e":"to walk","r":"arukimasu","k":"あるきます","l":"3-4"},{"e":"traffic","r":"kootsuu","k":"こうつう","l":"3-4"},{"e":"traffic light","r":"shingoo","k":"しんごう","l":"3-4"},{"e":"train","r":"densha","k":"でんしゃ","l":"3-4"},{"e":"vehicle","r":"norimono","k":"のりもの","l":"3-4"},{"e":"west exit","r":"nishiguchi","k":"にしぐち","l":"3-4"}],"5-6":[{"e":"adjective","r":"keeyooshi","k":"けいようし","l":"5-6"},{"e":"back/behind","r":"ushiro","k":"うしろ","l":"5-6"},{"e":"beside","r":"yoko","k":"よこ","l":"5-6"},{"e":"front","r":"mae","k":"まえ","l":"5-6"},{"e":"in/inside","r":"naka","k":"なか","l":"5-6"},{"e":"near/close","r":"chikaku","k":"ちかく","l":"5-6"},{"e":"next to","r":"tonari","k":"となり","l":"5-6"},{"e":"on/above","r":"ue","k":"うえ","l":"5-6"},{"e":"out/outside","r":"soto","k":"そと","l":"5-6"},{"e":"position / location","r":"ichi","k":"いち","l":"5-6"},{"e":"under/below","r":"shita","k":"した","l":"5-6"},{"e":"air condioner","r":"eakon","k":"エアコン","l":"5-6"},{"e":"balcony","r":"beranda","k":"ベランダ","l":"5-6"},{"e":"bathroom/bath","r":"ofuro","k":"おふろ","l":"5-6"},{"e":"bed","r":"beddo","k":"ベッド","l":"5-6"},{"e":"bedroom","r":"beddo-ruumo","k":"ベッドルーム","l":"5-6"},{"e":"book","r":"hon","k":"ほん","l":"5-6"},{"e":"bookshelf","r":"hon-dana","k":"ほんだな","l":"5-6"},{"e":"box","r":"hako","k":"はこ","l":"5-6"},{"e":"chair","r":"isu","k":"いす","l":"5-6"},{"e":"clock","r":"tokee","k":"とけい","l":"5-6"},{"e":"condominium","r":"manshon","k":"マンション","l":"5-6"},{"e":"corridor","r":"rooka","k":"ろうか","l":"5-6"},{"e":"cup","r":"kappu","k":"カップ","l":"5-6"},{"e":"curtain","r":"kaaten","k":"カーテン","l":"5-6"},{"e":"desk","r":"tsukue","k":"つくえ","l":"5-6"},{"e":"doll","r":"ningyoo","k":"にんぎょう","l":"5-6"},{"e":"door","r":"doa","k":"ドア","l":"5-6"},{"e":"electric fan","r":"senpuuki","k":"せんぷうき","l":"5-6"},{"e":"electrical appliance","r":"denki-seehin","k":"でんきせいひん","l":"5-6"},{"e":"entrance (room)","r":"genkan","k":"げんかん","l":"5-6"},{"e":"flat/apartment","r":"apaato","k":"アパート","l":"5-6"},{"e":"furniture","r":"kagu","k":"かぐ","l":"5-6"},{"e":"garden","r":"niwa","k":"にわ","l":"5-6"},{"e":"heater","r":"danboo","k":"だんぼう","l":"5-6"},{"e":"home","r":"ie","k":"いえ","l":"5-6"},{"e":"house/detached house","r":"ikkodate","k":"いっこだて","l":"5-6"},{"e":"iron","r":"airon","k":"アイロン","l":"5-6"},{"e":"kitchen","r":"daidokoro","k":"だいどころ","l":"5-6"},{"e":"light (by lamp)","r":"denki","k":"でんき","l":"5-6"},{"e":"living room","r":"ima","k":"いま","l":"5-6"},{"e":"living room 2","r":"ribingu","k":"リビング","l":"5-6"},{"e":"microwave oven","r":"denshi-renji","k":"でんしレンジ","l":"5-6"},{"e":"photograph","r":"shashin","k":"しゃしん","l":"5-6"},{"e":"picture","r":"e","k":"え","l":"5-6"},{"e":"radio","r":"rajio","k":"ラジオ","l":"5-6"},{"e":"refridgerator","r":"reezooko","k":"れいぞうこ","l":"5-6"},{"e":"room","r":"heya","k":"へや","l":"5-6"},{"e":"shelf","r":"tana","k":"たな","l":"5-6"},{"e":"sofa","r":"sofa","k":"ソファ","l":"5-6"},{"e":"staircase","r":"kaidan","k":"かいだん","l":"5-6"},{"e":"table","r":"teeburu","k":"テーブル","l":"5-6"},{"e":"telephone","r":"denwa","k":"でんわ","l":"5-6"},{"e":"television","r":"terebi","k":"テレビ","l":"5-6"},{"e":"things (found at home)","r":"mono","k":"もの","l":"5-6"},{"e":"toilet","r":"toire","k":"トイレ","l":"5-6"},{"e":"vacuum cleaner","r":"soojiki","k":"そうじき","l":"5-6"},{"e":"wall","r":"kabe","k":"かべ","l":"5-6"},{"e":"washing machine (2 different)","r":"sentakuki / sentakki","k":"せんたくき","l":"5-6"},{"e":"window","r":"mado","k":"まど","l":"5-6"},{"e":"Japanese food","r":"nihon-ryoori","k":"にほんりょうり","l":"5-6"},{"e":"___ cuisine","r":"___ ryoori","k":"～りょうり","l":"5-6"},{"e":"___ shop/restaurant","r":"___ ya (san)","k":"～や（さん）","l":"5-6"},{"e":"alcaholic drinks/Japanese sake","r":"osake","k":"おさけ","l":"5-6"},{"e":"apple","r":"ringo","k":"りんご","l":"5-6"},{"e":"banana","r":"banana","k":"バナナ","l":"5-6"},{"e":"bean curd/tofu","r":"toofu","k":"とうふ","l":"5-6"},{"e":"beef 1","r":"gyuuniku","k":"ぎゅうにく","l":"5-6"},{"e":"beef 2","r":"biifu","k":"ビーフ","l":"5-6"},{"e":"beer","r":"biiru","k":"ビール","l":"5-6"},{"e":"bread","r":"pan","k":"パン","l":"5-6"},{"e":"breakfast","r":"asa-gohan","k":"あさごはん","l":"5-6"},{"e":"butter","r":"bataa","k":"バター","l":"5-6"},{"e":"cabbage","r":"kyabetsu","k":"キャベツ","l":"5-6"},{"e":"cake","r":"keeki","k":"ケーキ","l":"5-6"},{"e":"carrot","r":"ninjin","k":"にんじん","l":"5-6"},{"e":"cereal","r":"shiriaru","k":"シリアル","l":"5-6"},{"e":"cheese","r":"chiizu","k":"チーズ","l":"5-6"},{"e":"cheese burger","r":"chiizu-baagaa","k":"チーズバーガー","l":"5-6"},{"e":"chicken","r":"toriniku","k":"とりにく","l":"5-6"},{"e":"chicken 2","r":"chikin","k":"チキン","l":"5-6"},{"e":"chocolate","r":"chokoreeto","k":"チョコレート","l":"5-6"},{"e":"class/cup","r":"koppu","k":"コップ","l":"5-6"},{"e":"cofee shop 2","r":"koohii-shoppu","k":"コーヒーショップ","l":"5-6"},{"e":"coffee","r":"koohii","k":"コーヒー","l":"5-6"},{"e":"coffee shop","r":"kissaten","k":"きっさてん","l":"5-6"},{"e":"cola","r":"koora","k":"コーラ","l":"5-6"},{"e":"cooked rice","r":"gohan","k":"ごはん","l":"5-6"},{"e":"cookie","r":"kukkii","k":"クッキー","l":"5-6"},{"e":"crab","r":"kani","k":"かに","l":"5-6"},{"e":"curry","r":"karee","k":"カレー","l":"5-6"},{"e":"dish/plate","r":"sara","k":"さら","l":"5-6"},{"e":"egg","r":"tamago","k":"たまご","l":"5-6"},{"e":"english tea","r":"koocha","k":"こうちゃ","l":"5-6"},{"e":"evening meal","r":"ban-gohan","k":"ばんごはん","l":"5-6"},{"e":"fast food restaurant","r":"faasuto-fuudo-ten","k":"ファーストフードてん","l":"5-6"},{"e":"fish","r":"sakana","k":"さかな","l":"5-6"},{"e":"food","r":"tabemono","k":"たべもの","l":"5-6"},{"e":"fork","r":"fooku","k":"フォーク","l":"5-6"},{"e":"fried noodles","r":"yakisoba","k":"やきそば","l":"5-6"},{"e":"fried potatoes/french fries/chips","r":"furaido-poteto","k":"フライドポテト","l":"5-6"},{"e":"fruit","r":"kudamono","k":"くだもの","l":"5-6"},{"e":"glass","r":"gurasu","k":"グラス","l":"5-6"},{"e":"green tea","r":"ocha","k":"おちゃ","l":"5-6"},{"e":"hamburger","r":"hanbaagaa","k":"ハンバーガー","l":"5-6"},{"e":"hot (coffee/tea)","r":"hotto","k":"ホット","l":"5-6"},{"e":"hot dog","r":"hottodoggu","k":"ホットドッグ","l":"5-6"},{"e":"hot water","r":"oyu","k":"おゆ","l":"5-6"},{"e":"ice cream","r":"aisu-kuriimu","k":"アイスクリーム","l":"5-6"},{"e":"iced (coffee/tea)","r":"aisu","k":"アイス","l":"5-6"},{"e":"jam","r":"jamu","k":"ジャム","l":"5-6"},{"e":"juice","r":"juusu","k":"ジュース","l":"5-6"},{"e":"knife","r":"naifu","k":"ナイフ","l":"5-6"},{"e":"lemon","r":"remon","k":"レモン","l":"5-6"},{"e":"lettuce","r":"retasu","k":"レタス","l":"5-6"},{"e":"lunch","r":"hiru-gohan","k":"ひるごはん","l":"5-6"},{"e":"meat","r":"niku","k":"にく","l":"5-6"},{"e":"menu","r":"menyuu","k":"メニュー","l":"5-6"},{"e":"milk 1","r":"gyuunyuu","k":"ぎゅうにゅう","l":"5-6"},{"e":"milk 2","r":"miruku","k":"ミルク","l":"5-6"},{"e":"miso soup","r":"misoshiro","k":"みそしる","l":"5-6"},{"e":"natto (fermented soy beans)","r":"natoo","k":"なっとう","l":"5-6"},{"e":"onion","r":"tamanegi","k":"たまねぎ","l":"5-6"},{"e":"orange juice","r":"orenji-juusu","k":"オレンジジュース","l":"5-6"},{"e":"packed lunch/lunch box","r":"bentoo","k":"べんとう","l":"5-6"},{"e":"pizza","r":"piza","k":"ピザ","l":"5-6"},{"e":"pork 1","r":"butaniku","k":"ぶたにく","l":"5-6"},{"e":"pork 2","r":"pooku","k":"ポーク","l":"5-6"},{"e":"potato","r":"jagaimo","k":"じゃがいも","l":"5-6"},{"e":"ramen noodles","r":"raamen","k":"ラーメン","l":"5-6"},{"e":"raw fish dish","r":"sashimi","k":"さしみ","l":"5-6"},{"e":"restaurant","r":"resutoran","k":"レストラン","l":"5-6"},{"e":"rice (uncooked)","r":"kome","k":"こめ","l":"5-6"},{"e":"rice ball","r":"onigiri (omusubi)","k":"おにぎり（おむすび）","l":"5-6"},{"e":"rice bowl","r":"chawan","k":"ちゃわん","l":"5-6"},{"e":"salad","r":"sarada","k":"サラダ","l":"5-6"},{"e":"salt","r":"shio","k":"しお","l":"5-6"},{"e":"sandwich","r":"sandoicchi","k":"サンドイッチ","l":"5-6"},{"e":"seaweed","r":"nori","k":"のり","l":"5-6"},{"e":"soba noodles","r":"soba","k":"そば","l":"5-6"},{"e":"soup","r":"suupu","k":"スープ","l":"5-6"},{"e":"soy sauce","r":"shooyu","k":"しょうゆ","l":"5-6"},{"e":"spaghetti/pasta","r":"supagethi/pasuta","k":"スパゲティ／パスタ","l":"5-6"},{"e":"spoon","r":"supuun","k":"スプーン","l":"5-6"},{"e":"steak","r":"suteeki","k":"ステーキ","l":"5-6"},{"e":"strawberry","r":"ichigo","k":"いちご","l":"5-6"},{"e":"sugar","r":"satoo","k":"さとう","l":"5-6"},{"e":"sushi","r":"osushi/sushi","k":"おすし／すし","l":"5-6"},{"e":"tableware","r":"shokki","k":"しょっき","l":"5-6"},{"e":"tomato","r":"tomato","k":"トマト","l":"5-6"},{"e":"udon noodles","r":"udon","k":"うどん","l":"5-6"},{"e":"wasabi","r":"wasabi","k":"わさび","l":"5-6"},{"e":"water","r":"mizu","k":"みず","l":"5-6"},{"e":"watermelon","r":"suika","k":"すいか","l":"5-6"},{"e":"whisky","r":"uisukii","k":"ウイスキー","l":"5-6"},{"e":"wine","r":"wain","k":"ワイン","l":"5-6"},{"e":"yogurt","r":"yooguruto","k":"ヨーグルト","l":"5-6"}],"7-8":[{"e":"crowded","r":"konde imasu","k":"こんでいます","l":"7-8"},{"e":"danger","r":"abunai","k":"あぶない","l":"7-8"},{"e":"danger 2","r":"kiken","k":"きけん","l":"7-8"},{"e":"famous","r":"yuumee","k":"ゆうめい","l":"7-8"},{"e":"lively/busy","r":"nigiyaka","k":"にぎやか","l":"7-8"},{"e":"low /short","r":"hikui","k":"ひくい","l":"7-8"},{"e":"quiet","r":"shizuka","k":"しずか","l":"7-8"},{"e":"safe","r":"anzen","k":"あんぜん","l":"7-8"},{"e":"art museum","r":"bijutsukan","k":"びじゅつかん","l":"7-8"},{"e":"bank","r":"ginkoo","k":"ぎんこう","l":"7-8"},{"e":"building","r":"biru","k":"ビル","l":"7-8"},{"e":"church","r":"kyookai","k":"きょうかい","l":"7-8"},{"e":"cinema","r":"eegakan","k":"えいがかん","l":"7-8"},{"e":"company/workplace","r":"kaisha","k":"かいしゃ","l":"7-8"},{"e":"convenience store","r":"konbini","k":"コンビニ","l":"7-8"},{"e":"department store","r":"depaato","k":"デパート","l":"7-8"},{"e":"embassy","r":"taishikan","k":"たいしかん","l":"7-8"},{"e":"factory","r":"koojoo","k":"こうじょう","l":"7-8"},{"e":"hospital","r":"byooin","k":"びょういん","l":"7-8"},{"e":"hotel","r":"hoteru","k":"ホテル","l":"7-8"},{"e":"library","r":"toshokan","k":"としょかん","l":"7-8"},{"e":"mosque","r":"mosuku","k":"モスク","l":"7-8"},{"e":"museum","r":"hakubutsukan","k":"はくぶつかん","l":"7-8"},{"e":"park","r":"kooen","k":"こうえん","l":"7-8"},{"e":"police booth","r":"kooban","k":"こうばん","l":"7-8"},{"e":"police station","r":"keesatsu","k":"けいさつ","l":"7-8"},{"e":"post office","r":"yuubinkyoku","k":"ゆうびんきょく","l":"7-8"},{"e":"school","r":"gakkoo","k":"がっこう","l":"7-8"},{"e":"shopping center","r":"shoppingu-sentaa","k":"ショッピングセンター","l":"7-8"},{"e":"shopping street","r":"shootengai","k":"しょうてんがい","l":"7-8"},{"e":"shrine","r":"jinja","k":"じんじゃ","l":"7-8"},{"e":"store","r":"mise","k":"みせ","l":"7-8"},{"e":"temple","r":"otera","k":"おてら","l":"7-8"},{"e":"town","r":"machi","k":"まち","l":"7-8"},{"e":"zoo","r":"doobutsuen","k":"どうぶつえん","l":"7-8"},{"e":"Japanese house","r":"nihon no ie","k":"にほんのいえ","l":"7-8"},{"e":"Sliding-door closet","r":"oshi'ire","k":"おしいれ","l":"7-8"},{"e":"alcove","r":"tokonoma","k":"とこのま","l":"7-8"},{"e":"bedding","r":"futon","k":"ふとん","l":"7-8"},{"e":"floor cushion","r":"zabuton","k":"ざぶとん","l":"7-8"},{"e":"japanese-style room","r":"washitsu","k":"わしつ","l":"7-8"},{"e":"sliding door","r":"fusuma","k":"ふすま","l":"7-8"},{"e":"sliding screen","r":"shooji","k":"しょうじ","l":"7-8"},{"e":"slippers","r":"surippa","k":"スリッパ","l":"7-8"},{"e":"tatami mat","r":"tatami","k":"たたみ","l":"7-8"},{"e":"western-style room","r":"yooshitsu","k":"ようしつ","l":"7-8"}],"9-10":[{"e":"Japanese (adjective)","r":"nihon-teki","k":"にほんてき","l":"9-10"},{"e":"Unusual","r":"mezurashii","k":"めずらしい","l":"9-10"},{"e":"alright / not bad","r":"maamaa","k":"まあまあ","l":"9-10"},{"e":"baggy (jeans)","r":"futoi","k":"ふとい","l":"9-10"},{"e":"cool","r":"kakkoii","k":"かっこいい","l":"9-10"},{"e":"cute","r":"kawaii","k":"かわいい","l":"9-10"},{"e":"fashionable","r":"oshare","k":"おしゃれ","l":"9-10"},{"e":"great","r":"sugoi","k":"すごい","l":"9-10"},{"e":"heavy","r":"omoi","k":"おもい","l":"9-10"},{"e":"interesting","r":"omoshiroi","k":"おもしろい","l":"9-10"},{"e":"light (weight)","r":"karui","k":"かるい","l":"9-10"},{"e":"long (sleeve)","r":"nagai","k":"ながい","l":"9-10"},{"e":"loose (skirt)","r":"yurui","k":"ゆるい","l":"9-10"},{"e":"lovely","r":"suteki","k":"すてき","l":"9-10"},{"e":"short (sleeve)","r":"mijikai","k":"みじかい","l":"9-10"},{"e":"skinny (jeans)","r":"hosoi","k":"ほそい","l":"9-10"},{"e":"tight (skirt)","r":"kitsui","k":"きつい","l":"9-10"},{"e":"1 (age)","r":"issai","k":"いっさい","l":"9-10"},{"e":"1 (books)","r":"issatsu","k":"いっさつ","l":"9-10"},{"e":"1 (flat, thin objects - stamp)","r":"ichi-mai","k":"いちまい","l":"9-10"},{"e":"1 (long objects)","r":"ippon","k":"いっぽん","l":"9-10"},{"e":"1 (people and smart animals)","r":"hitori","k":"ひとり","l":"9-10"},{"e":"1 (small objects 1)","r":"hitotsu","k":"ひとつ","l":"9-10"},{"e":"1(small objects 2)","r":"ikko","k":"いっこ","l":"9-10"},{"e":"10(age)","r":"jussai","k":"じゅっさい","l":"9-10"},{"e":"10(books)","r":"jussatsu","k":"じゅっさつ","l":"9-10"},{"e":"10(flat, thin objects - stamp)","r":"juu-mai","k":"じゅうまい","l":"9-10"},{"e":"10(long objects)","r":"juppon","k":"じゅっぽん","l":"9-10"},{"e":"10(people and smart animals)","r":"juu-nin","k":"じゅうにん","l":"9-10"},{"e":"10(small objects 1)","r":"too","k":"とお","l":"9-10"},{"e":"10(small objects 2)","r":"jukko","k":"じゅっこ","l":"9-10"},{"e":"2 (people and smart animals)","r":"futari","k":"ふたり","l":"9-10"},{"e":"2(age)","r":"ni-sai","k":"にさい","l":"9-10"},{"e":"2(books)","r":"ni-satsu","k":"にさつ","l":"9-10"},{"e":"2(flat, thin objects - stamp)","r":"ni-mai","k":"にまい","l":"9-10"},{"e":"2(long objects)","r":"ni-hon","k":"にほん","l":"9-10"},{"e":"2(small objects 1)","r":"futatsu","k":"ふたつ","l":"9-10"},{"e":"2(small objects 2)","r":"ni-ko","k":"にこ","l":"9-10"},{"e":"3(age)","r":"san-sai","k":"さんさい","l":"9-10"},{"e":"3(books)","r":"san-satsu","k":"さんさつ","l":"9-10"},{"e":"3(flat, thin objects - stamp)","r":"san-mai","k":"さんまい","l":"9-10"},{"e":"3(long objects)","r":"san-bon","k":"さんぼん","l":"9-10"},{"e":"3(people and smart animals)","r":"san-nin","k":"さんにん","l":"9-10"},{"e":"3(small objects 1)","r":"mittsu","k":"みっつ","l":"9-10"},{"e":"3(small objects 2)","r":"san-ko","k":"さんこ","l":"9-10"},{"e":"4 (flat, thin objects - stamp)","r":"yon-mai","k":"よんまい","l":"9-10"},{"e":"4(age)","r":"yon-sai","k":"よんさい","l":"9-10"},{"e":"4(books)","r":"yon-satsu","k":"よんさつ","l":"9-10"},{"e":"4(long objects)","r":"yon-hon","k":"よんほん","l":"9-10"},{"e":"4(people and smart animals)","r":"yo-nin","k":"よにん","l":"9-10"},{"e":"4(small objects 1)","r":"yottsu","k":"よっつ","l":"9-10"},{"e":"4(small objects 2)","r":"yon-ko","k":"よんこ","l":"9-10"},{"e":"5 (small objects 1)","r":"itsutsu","k":"いつつ","l":"9-10"},{"e":"5(age)","r":"go-sai","k":"ごさい","l":"9-10"},{"e":"5(books)","r":"go-satsu","k":"ごさつ","l":"9-10"},{"e":"5(flat, thin objects - stamp)","r":"go-mai","k":"ごまい","l":"9-10"},{"e":"5(long objects)","r":"go-hon","k":"ごほん","l":"9-10"},{"e":"5(people and smart animals)","r":"go-nin","k":"ごにん","l":"9-10"},{"e":"5(small objects 2)","r":"go-ko","k":"ごこ","l":"9-10"},{"e":"6(age)","r":"roku-sai","k":"ろくさい","l":"9-10"},{"e":"6(books)","r":"roku-satsu","k":"ろくさつ","l":"9-10"},{"e":"6(flat, thin objects - stamp)","r":"roku-mai","k":"ろくまい","l":"9-10"},{"e":"6(long objects)","r":"roppon","k":"ろっぽん","l":"9-10"},{"e":"6(people and smart animals)","r":"roku-nin","k":"ろくにん","l":"9-10"},{"e":"6(small objects 1)","r":"muttsu","k":"むっつ","l":"9-10"},{"e":"6(small objects 2)","r":"rokko","k":"ろっこ","l":"9-10"},{"e":"7(age)","r":"nana-sai","k":"ななさい","l":"9-10"},{"e":"7(books)","r":"nana-satsu","k":"ななさつ","l":"9-10"},{"e":"7(flat, thin objects - stamp)","r":"nana-mai","k":"ななまい","l":"9-10"},{"e":"7(long objects)","r":"nana-hon","k":"ななほん","l":"9-10"},{"e":"7(people and smart animals)","r":"shichi-nin / nana-nin","k":"しちにん／ななにん","l":"9-10"},{"e":"7(small objects 1)","r":"nanatsu","k":"ななつ","l":"9-10"},{"e":"7(small objects 2)","r":"nana-ko","k":"ななこ","l":"9-10"},{"e":"8(age)","r":"hassai","k":"はっさい","l":"9-10"},{"e":"8(books)","r":"hassatsu","k":"はっさつ","l":"9-10"},{"e":"8(flat, thin objects - stamp)","r":"hachi-mai","k":"はちまい","l":"9-10"},{"e":"8(long objects)","r":"happon","k":"はっぽん","l":"9-10"},{"e":"8(people and smart animals)","r":"hachi-nin","k":"はちにん","l":"9-10"},{"e":"8(small objects 1)","r":"yattsu","k":"やっつ","l":"9-10"},{"e":"8(small objects 2)","r":"hachi-ko / hakko","k":"はちこ／はっこ","l":"9-10"},{"e":"9 (people and smart animals)","r":"kyuu-nin","k":"きゅうにん","l":"9-10"},{"e":"9(age)","r":"kyuu-sai","k":"きゅうさい","l":"9-10"},{"e":"9(books)","r":"kyuu-satsu","k":"きゅうさつ","l":"9-10"},{"e":"9(flat, thin objects - stamp)","r":"kyuu-mai","k":"きゅうまい","l":"9-10"},{"e":"9(long objects)","r":"kyuu-hon","k":"きゅうほん","l":"9-10"},{"e":"9(small objects 1)","r":"kokonotsu","k":"ここのつ","l":"9-10"},{"e":"9(small objects 2)","r":"kyuu-ko","k":"きゅうこ","l":"9-10"},{"e":"Blue","r":"ao","k":"あお","l":"9-10"},{"e":"black","r":"kuro (i)","k":"くろ（い）","l":"9-10"},{"e":"brown","r":"chairo (i)","k":"ちゃいろ（い）","l":"9-10"},{"e":"gold","r":"kin'iro (no)","k":"きんいろ（の）","l":"9-10"},{"e":"green","r":"midori (no)","k":"みどり（の）","l":"9-10"},{"e":"grey","r":"guree (no)","k":"グレー（の）","l":"9-10"},{"e":"light blue","r":"mizuiro (no)","k":"みずいろ（の）","l":"9-10"},{"e":"orange","r":"orenji (no)","k":"オレンジ（の）","l":"9-10"},{"e":"pink","r":"pinku (no)","k":"ピンク（の）","l":"9-10"},{"e":"red","r":"akai","k":"あかい","l":"9-10"},{"e":"silver","r":"gin'iro (no)","k":"ぎんいろ（の）","l":"9-10"},{"e":"white","r":"shiro (i)","k":"しろ（い）","l":"9-10"},{"e":"yellow","r":"kiiro (i)","k":"きいろ（い）","l":"9-10"},{"e":"CD","r":"shiidhii","k":"シーディー","l":"9-10"},{"e":"DVD","r":"dhiibuidhii","k":"ディービーディー","l":"9-10"},{"e":"camera","r":"kamera","k":"カメラ","l":"9-10"},{"e":"chopstick holder","r":"hashi'oki","k":"はしおき","l":"9-10"},{"e":"chopsticks","r":"hashi","k":"はし","l":"9-10"},{"e":"earpick","r":"mimikaki","k":"みみかき","l":"9-10"},{"e":"electronic dictionary","r":"denshi-jisho","k":"でんしじしょ","l":"9-10"},{"e":"flower","r":"hana","k":"はな","l":"9-10"},{"e":"handkerchief","r":"hankachi","k":"ハンカチ","l":"9-10"},{"e":"magazine","r":"zasshi","k":"ざっし","l":"9-10"},{"e":"ninja star / throwing star","r":"shuriken","k":"しゅりけん","l":"9-10"},{"e":"pen","r":"pen","k":"ペン","l":"9-10"},{"e":"postcard 2","r":"ehagaki / posuto-kaado","k":"えはがき／ポストカード","l":"9-10"},{"e":"present","r":"purezento","k":"プレゼント","l":"9-10"},{"e":"souvenir","r":"omiyage","k":"おみやげ","l":"9-10"},{"e":"stamp","r":"kitte","k":"きって","l":"9-10"},{"e":"stuffed toy","r":"nuigurumi","k":"ぬいぐるみ","l":"9-10"},{"e":"teacup","r":"thiikappu","k":"ティーカップ","l":"9-10"},{"e":"to give ___","r":"___ o agemasu","k":"あげます","l":"9-10"},{"e":"to recieve ___","r":"___ o moraimasu","k":"～をもらいます","l":"9-10"},{"e":"toy","r":"omocha","k":"おもちゃ","l":"9-10"},{"e":"umbrella","r":"kasa","k":"かさ","l":"9-10"},{"e":"video camera","r":"bideo-kamera","k":"ビデオカメラ","l":"9-10"},{"e":"video game","r":"geemu","k":"ゲーム","l":"9-10"},{"e":"wallet / purse","r":"saifu","k":"さいふ","l":"9-10"},{"e":"fra ~ (starttidspunkt)","r":"kara","k":"から","l":"9-10"},{"e":"til ~ (sluttidspunkt)","r":"made","k":"まで","l":"9-10"},{"e":"gå til jobben","r":"kaisha ni ikimasu","k":"かいしゃにいきます","l":"9-10"},{"e":"~ passer best / er fint","r":"ga ii desu","k":"がいいです","l":"9-10"},{"e":"la oss bestemme oss for ~","r":"ni shimasyoo","k":"にしましょう","l":"9-10"},{"e":"~ er litt vanskelig (høflig avslag)","r":"wa chotto","k":"はちょっと","l":"9-10"},{"e":"det er greit / ingen problem","r":"daijyoobu desu","k":"だいじょうぶです","l":"9-10"}],"11-12":[{"e":"I'd like ___","r":"___ ga hoshii desu","k":"～がほしいです","l":"11-12"},{"e":"L-size","r":"eru","k":"エル","l":"11-12"},{"e":"M-size","r":"emu","k":"エム","l":"11-12"},{"e":"S-size","r":"esu","k":"エス","l":"11-12"},{"e":"accessories","r":"akusesarii","k":"アクセサリー","l":"11-12"},{"e":"bag","r":"baggu","k":"バッグ","l":"11-12"},{"e":"bag (bigger)","r":"kaban","k":"かばん","l":"11-12"},{"e":"belt","r":"beruto","k":"ベルト","l":"11-12"},{"e":"black","r":"kuro (no)","k":"くろ（の）","l":"11-12"},{"e":"change","r":"otsuri","k":"おつり","l":"11-12"},{"e":"clothes","r":"fuku","k":"ふく","l":"11-12"},{"e":"clothes/western clothes","r":"yoofuku","k":"ようふく","l":"11-12"},{"e":"coat","r":"kooto","k":"コート","l":"11-12"},{"e":"cotten summer kimono","r":"yukata","k":"ゆかた","l":"11-12"},{"e":"could I have ___ ?","r":"___ o kudasai","k":"～をください","l":"11-12"},{"e":"credit card","r":"kaado","k":"カード","l":"11-12"},{"e":"customer","r":"okyaku-san / kyaku","k":"おきゃくさん／きゃく","l":"11-12"},{"e":"dress (one piece)","r":"wanpiisu","k":"ワンピース","l":"11-12"},{"e":"free of charge","r":"muryoo","k":"むりょう","l":"11-12"},{"e":"free of charge 2","r":"tada","k":"ただ","l":"11-12"},{"e":"glasses","r":"megane","k":"めがね","l":"11-12"},{"e":"gloves","r":"tebukuro","k":"てぶくろ","l":"11-12"},{"e":"hat/cap","r":"booshi","k":"ぼうし","l":"11-12"},{"e":"how much is it?","r":"ikura desu ka?","k":"いくらですか","l":"11-12"},{"e":"jacket","r":"jaketto","k":"ジャケット","l":"11-12"},{"e":"jeans","r":"jiinzu","k":"ジーンズ","l":"11-12"},{"e":"money","r":"okane","k":"おかね","l":"11-12"},{"e":"muffler/scarf","r":"mafuraa","k":"マフラー","l":"11-12"},{"e":"necklace","r":"nekkuresu","k":"ネックレス","l":"11-12"},{"e":"necktie/tie","r":"nekutai","k":"ネクタイ","l":"11-12"},{"e":"pajamas","r":"pajama","k":"パジャマ","l":"11-12"},{"e":"pants/trousers","r":"pantsu","k":"パンツ","l":"11-12"},{"e":"pierced earrings","r":"piasu","k":"ピアス","l":"11-12"},{"e":"receipt","r":"reshiito","k":"レシート","l":"11-12"},{"e":"ribbon","r":"ribon","k":"リボン","l":"11-12"},{"e":"ring","r":"yubiwa","k":"ゆびわ","l":"11-12"},{"e":"sales floor / department","r":"uriba","k":"うりば","l":"11-12"},{"e":"scarf","r":"sukaafu","k":"スカーフ","l":"11-12"},{"e":"shirt","r":"shatsu","k":"シャツ","l":"11-12"},{"e":"shoes","r":"kutsu","k":"くつ","l":"11-12"},{"e":"shop assistant","r":"ten'in","k":"てんいん","l":"11-12"},{"e":"shopping","r":"kaimono","k":"かいもの","l":"11-12"},{"e":"signature (sign your name)","r":"sain (o shimasu)","k":"サイン（をします）","l":"11-12"},{"e":"skirt","r":"sukaato","k":"スカート","l":"11-12"},{"e":"socks","r":"kutsushita","k":"くつした","l":"11-12"},{"e":"suit","r":"suutsu","k":"スーツ","l":"11-12"},{"e":"sweater","r":"seetaa","k":"セーター","l":"11-12"},{"e":"t-shirt","r":"t-shatsu","k":"Tシャツ","l":"11-12"},{"e":"to buy ___","r":"___ o kaimasu","k":"かいます","l":"11-12"},{"e":"to do some shopping","r":"kaimono (o) shimasu","k":"かいものをします","l":"11-12"},{"e":"to pay","r":"haraimasu","k":"はらいます","l":"11-12"},{"e":"to put on / wear ___","r":"___ o kimasu","k":"きます","l":"11-12"},{"e":"to put on / wear ___ (shoes)","r":"___ o hakimasu","k":"～をはきます","l":"11-12"},{"e":"to put on / wear a hat / cap","r":"booshi i kaburimasu","k":"ぼうしをかぶります","l":"11-12"},{"e":"to put on / wear glasses","r":"megane o kakemasu","k":"めがねをかけます","l":"11-12"},{"e":"to take off ___ (coat)","r":"___ o nugimasu","k":"～をぬぎます","l":"11-12"},{"e":"underwear","r":"shitagi","k":"したぎ","l":"11-12"},{"e":"watch","r":"ude-dokee","k":"うでどけい","l":"11-12"},{"e":"yen","r":"en","k":"えん","l":"11-12"},{"e":"Could you say that again, please?","r":"moo ichido itte kudasai?","k":"もういちどいってください","l":"11-12"},{"e":"Could you show me ___, please?","r":"___ o misete kudasai?","k":"～をみせてください","l":"11-12"},{"e":"Could you speak more slowly, please?","r":"moo sukoshi yukkuri itte kudasai0-","k":"もうすこしゆっくりいってください","l":"11-12"},{"e":"Could you tell me ___ please?","r":"___ oshiete kudasai?","k":"～をおしえてください","l":"11-12"},{"e":"I don't understand","r":"wakarimasen","k":"わかりません","l":"11-12"},{"e":"I forgot ___","r":"___ o wasuremashita","k":"～をわすれました","l":"11-12"},{"e":"I see","r":"wakarimashita","k":"わかりました","l":"11-12"},{"e":"May I borrow ___, please ?","r":"___ o kashite kudasai","k":"～をかしてください","l":"11-12"},{"e":"What does ___ mean?","r":"___ tte doo yuu imi desu ka?","k":"～ってどういういみですか","l":"11-12"},{"e":"action film","r":"akushon","k":"アクション","l":"11-12"},{"e":"always","r":"itsumo","k":"いつも","l":"11-12"},{"e":"amazing/wonderful","r":"subarashii","k":"すばらしい","l":"11-12"},{"e":"anime","r":"anime","k":"アニメ","l":"11-12"},{"e":"barbecue","r":"baabekyuu","k":"バーベキュー","l":"11-12"},{"e":"baseball","r":"yakyuu","k":"やきゅう","l":"11-12"},{"e":"basketball","r":"basuketto-booru","k":"バスケットボール","l":"11-12"},{"e":"boring","r":"tsumaranai","k":"つまらない","l":"11-12"},{"e":"camping","r":"kyanpu o shimasu","k":"キャンプをします","l":"11-12"},{"e":"classical dance","r":"odori","k":"おどり","l":"11-12"},{"e":"cold","r":"samui","k":"さむい","l":"11-12"},{"e":"comedy","r":"komedhi","k":"コメディ","l":"11-12"},{"e":"copy","r":"kopii o shimasu","k":"コピーをします","l":"11-12"},{"e":"dance","r":"dansu","k":"ダンス","l":"11-12"},{"e":"easy","r":"yasashii","k":"やさしい","l":"11-12"},{"e":"examination (exams)","r":"shiken","k":"しけん","l":"11-12"},{"e":"fantasy","r":"fantajii","k":"ファンタジー","l":"11-12"},{"e":"fishing","r":"tsuri o shimasu","k":"つりをします","l":"11-12"},{"e":"foreign language","r":"gaikokugo","k":"がいこくご","l":"11-12"},{"e":"frequency","r":"hindo","k":"ひんど","l":"11-12"},{"e":"golf","r":"gorufu","k":"ゴルフ","l":"11-12"},{"e":"guitar","r":"gitaa","k":"ギター","l":"11-12"},{"e":"hobby","r":"shumi","k":"しゅみ","l":"11-12"},{"e":"horror","r":"horaa","k":"ホラー","l":"11-12"},{"e":"j-pop","r":"j-poppu","k":"Jポップ","l":"11-12"},{"e":"jazz","r":"jazu","k":"ジャズ","l":"11-12"},{"e":"jogging","r":"jogingu","k":"ジョギング","l":"11-12"},{"e":"judo","r":"juudoo","k":"じゅうどう","l":"11-12"},{"e":"karaoke","r":"karaoke","k":"カラオケ","l":"11-12"},{"e":"like","r":"suki","k":"すき","l":"11-12"},{"e":"litterature","r":"bungaku","k":"ぶんがく","l":"11-12"},{"e":"lots of (people)","r":"(hito ga) ooi","k":"（ひとが）おおい","l":"11-12"},{"e":"manga/comic book","r":"manga","k":"マンガ","l":"11-12"},{"e":"mountain climbing","r":"yamanobori o shimasu","k":"やまのぼりをします","l":"11-12"},{"e":"movie","r":"eega","k":"えいが","l":"11-12"},{"e":"music","r":"ongaku","k":"おんがく","l":"11-12"},{"e":"mystery","r":"misuterii","k":"ミステリー","l":"11-12"},{"e":"not often","r":"amari","k":"あまり","l":"11-12"},{"e":"not yet","r":"mada desu","k":"まだです","l":"11-12"},{"e":"novel","r":"shoosetsu","k":"しょうせつ","l":"11-12"},{"e":"piano","r":"piano","k":"ピアノ","l":"11-12"},{"e":"pop music","r":"poppusu","k":"ポップス","l":"11-12"},{"e":"preparation (for lesson)","r":"yoshuu","k":"よしゅう","l":"11-12"},{"e":"review","r":"fukushuu","k":"ふくしゅう","l":"11-12"},{"e":"rock","r":"rokku","k":"ロック","l":"11-12"},{"e":"romance/love story","r":"ren'ai","k":"れんあい","l":"11-12"},{"e":"sad","r":"kanashii","k":"かなしい","l":"11-12"},{"e":"scary","r":"kowai","k":"こわい","l":"11-12"},{"e":"science fiction","r":"esu-efu","k":"エスエフ","l":"11-12"},{"e":"skating","r":"sukeeto","k":"スケート","l":"11-12"},{"e":"soccer","r":"sakkaa","k":"サッカー","l":"11-12"},{"e":"sometimes","r":"tokidoki","k":"ときどき","l":"11-12"},{"e":"sport","r":"supootsu","k":"スポーツ","l":"11-12"},{"e":"swimming","r":"suiee","k":"すいえい","l":"11-12"},{"e":"table tennis (2)","r":"takkyuu / pinpon","k":"たっきゅう／ピンポン","l":"11-12"},{"e":"tennis","r":"tennisu","k":"テニス","l":"11-12"},{"e":"terrible","r":"taihen","k":"たいへん","l":"11-12"},{"e":"test","r":"tesuto","k":"テスト","l":"11-12"},{"e":"to ask a question","r":"shitsumon o shimasu","k":"しつもんをします","l":"11-12"},{"e":"to be absent/take a day off/to take a rest","r":"yasumimasu","k":"やすみます","l":"11-12"},{"e":"to be late/to be delayed","r":"okuremasu","k":"おくれます","l":"11-12"},{"e":"to check","r":"chekku o shimasu","k":"チェックをします","l":"11-12"},{"e":"to consult/discuss","r":"soodan o shimasu","k":"そうだんをします","l":"11-12"},{"e":"to draw a picture","r":"e o kakimasu","k":"えをかきます","l":"11-12"},{"e":"to explain","r":"setsumee o shimasu","k":"せつめいをします","l":"11-12"},{"e":"to play the guitar OR piano","r":"hikimasu","k":"ひきます","l":"11-12"},{"e":"to practise","r":"renshuu o shimasu","k":"れんしゅうをします","l":"11-12"},{"e":"to study","r":"benkyoo o shimasu","k":"べんきょうをします","l":"11-12"},{"e":"to take photograph","r":"shashin o torimasu","k":"しゃしんをとります","l":"11-12"},{"e":"trene / mosjonere","r":"undoo shimasu","k":"うんどうします","l":"11-12"},{"e":"lese (bok)","r":"hon o yomimasu","k":"ほんをよみます","l":"11-12"},{"e":"reise","r":"ryokoo","k":"りょこう","l":"11-12"},{"e":"frisk / energisk","r":"genki","k":"げんき","l":"11-12"}],"a2.1-3-4":[{"e":"Candy","r":"おかし(okashi)","k":"おかし","l":"a2.1-3-4"},{"e":"Japanese chess","r":"いご ・しょうぎ(igo / shoogi)","k":"いご","l":"a2.1-3-4"},{"e":"To do","r":"します（３）(shi-masu)","k":"します","l":"a2.1-3-4"},{"e":"To study","r":"べんきょうします（3）(benkyooshi-masu)","k":"べんきょうします","l":"a2.1-3-4"},{"e":"To work","r":"はたらきます（１）(hataraki-masu)","k":"はたらきます","l":"a2.1-3-4"},{"e":"a lot/much","r":"たくさん(takusan)","k":"たくさん","l":"a2.1-3-4"},{"e":"aunt","r":"おば(oba)","k":"おば","l":"a2.1-3-4"},{"e":"book","r":"どくしょ(dokusyo)","k":"どくしょ","l":"a2.1-3-4"},{"e":"busy/hectic","r":"いそがしい(isogashii)","k":"いそがしい","l":"a2.1-3-4"},{"e":"cooking","r":"りょうり(ryoori)","k":"りょうり","l":"a2.1-3-4"},{"e":"country","r":"くに(kuni)","k":"くに","l":"a2.1-3-4"},{"e":"daughter","r":"むすめ（さん）(musume-san)","k":"むすめ","l":"a2.1-3-4"},{"e":"especially","r":"とくに(tokuni)","k":"とくに","l":"a2.1-3-4"},{"e":"every week","r":"まいしゅう(maisyuu)","k":"まいしゅう","l":"a2.1-3-4"},{"e":"exercise","r":"うんどう(undoo)","k":"うんどう","l":"a2.1-3-4"},{"e":"favorite/skillful","r":"とくいな(tokui-na)","k":"とくいな","l":"a2.1-3-4"},{"e":"foreign country","r":"がいこく(gaikoku)","k":"がいこく","l":"a2.1-3-4"},{"e":"fun","r":"たのしい(tanoshii)","k":"たのしい","l":"a2.1-3-4"},{"e":"game/match","r":"しあい(shiai)","k":"しあい","l":"a2.1-3-4"},{"e":"generally/mostly","r":"だいたい(daitai)","k":"だいたい","l":"a2.1-3-4"},{"e":"grandchild","r":"まご(mago)","k":"まご","l":"a2.1-3-4"},{"e":"grandfather","r":"そふ(sofu)","k":"そふ","l":"a2.1-3-4"},{"e":"grandmother","r":"そぼ(sobo)","k":"そぼ","l":"a2.1-3-4"},{"e":"happy","r":"うれしい(ureshii)","k":"うれしい","l":"a2.1-3-4"},{"e":"have fun/hang out","r":"あそびます（asobi-masu)","k":"あそびます","l":"a2.1-3-4"},{"e":"how","r":"どう(doo)","k":"どう","l":"a2.1-3-4"},{"e":"how (long)","r":"どうやって(dooyatte)","k":"どうやって","l":"a2.1-3-4"},{"e":"how much/long /far","r":"どのぐらい(donogurai)","k":"どのぐらい","l":"a2.1-3-4"},{"e":"internet","r":"インターネット(inntaanetto)","k":"インターネット","l":"a2.1-3-4"},{"e":"introduce/meet for first time","r":"しょうかいします(3)(shookai-shimasu)","k":"しょうかいします","l":"a2.1-3-4"},{"e":"knitting (noun)","r":"あみもの(amimono)","k":"あみもの","l":"a2.1-3-4"},{"e":"leisure","r":"ひまな(hima-na)","k":"ひまな","l":"a2.1-3-4"},{"e":"liked/loved/favorite","r":"すきな(suki-na)","k":"すきな","l":"a2.1-3-4"},{"e":"meat dish","r":"ぎゅうどん(gyuudon)","k":"ぎゅうどん","l":"a2.1-3-4"},{"e":"next week","r":"らいしゅう(raisyuu)","k":"らいしゅう","l":"a2.1-3-4"},{"e":"number one/first","r":"いちばん(ichiban)","k":"いちばん","l":"a2.1-3-4"},{"e":"other","r":"ほか (hoka)","k":"ほか","l":"a2.1-3-4"},{"e":"parents","r":"りょうしん(ryooshin)","k":"りょうしん","l":"a2.1-3-4"},{"e":"relative","r":"しんせき(shinseki)","k":"しんせき","l":"a2.1-3-4"},{"e":"siblings","r":"きょうだい(kyoodai)","k":"きょうだい","l":"a2.1-3-4"},{"e":"son","r":"むすこ（さん）(musuko-san)","k":"むすこ","l":"a2.1-3-4"},{"e":"song","r":"うた(uta)","k":"うた","l":"a2.1-3-4"},{"e":"take a trip","r":"りょこうします（ryokou-shimasu）","k":"りょこうします","l":"a2.1-3-4"},{"e":"theatre","r":"えんげき(engeki)","k":"えんげき","l":"a2.1-3-4"},{"e":"time","r":"じかん(jikan)","k":"じかん","l":"a2.1-3-4"},{"e":"to be able to do","r":"できます（deki-masu）","k":"できます","l":"a2.1-3-4"},{"e":"to be/go/come","r":"います（２）（i-masu)","k":"います","l":"a2.1-3-4"},{"e":"to collect","r":"あつめます（atsume-masu）","k":"あつめます","l":"a2.1-3-4"},{"e":"to dance","r":"おどります(odori-masu)","k":"おどります","l":"a2.1-3-4"},{"e":"to drink","r":"のみます（nomi-masu）","k":"のみます","l":"a2.1-3-4"},{"e":"to eat","r":"たべます（tabe-masu）","k":"たべます","l":"a2.1-3-4"},{"e":"to finish","r":"すみます（１）(sumi-masu)","k":"すみます","l":"a2.1-3-4"},{"e":"to listen","r":"ききます(kiki-masu)","k":"ききます","l":"a2.1-3-4"},{"e":"to make/prepare food/brew","r":"つくります(tsukuri-masu)","k":"つくります","l":"a2.1-3-4"},{"e":"to push/press","r":"おしえます（２）(oshie-masu)","k":"おしえます","l":"a2.1-3-4"},{"e":"to read","r":"よみます（yomi-masu)","k":"よみます","l":"a2.1-3-4"},{"e":"to relax","r":"ゆっくりします（yukkuri-shimasu)","k":"ゆっくりします","l":"a2.1-3-4"},{"e":"to return","r":"かえります（kaeri-masu)","k":"かえります","l":"a2.1-3-4"},{"e":"to see","r":"みます（mi-masu)","k":"みます","l":"a2.1-3-4"},{"e":"to sing","r":"うたいます（utai-masu)","k":"うたいます","l":"a2.1-3-4"},{"e":"to sleep","r":"ねます（ne-masu)","k":"ねます","l":"a2.1-3-4"},{"e":"to take a walk","r":"さんぽします（sanpo-shimasu）","k":"さんぽします","l":"a2.1-3-4"},{"e":"to take/grab","r":"とります(tori-masu)","k":"とります","l":"a2.1-3-4"},{"e":"to talk/tell/discuss","r":"はなします（１）(hanashi-masu)","k":"はなします","l":"a2.1-3-4"},{"e":"to write/draw","r":"かきます(kaki-masu)","k":"かきます","l":"a2.1-3-4"},{"e":"together","r":"いっしょに(isshoni)","k":"いっしょに","l":"a2.1-3-4"},{"e":"uncle","r":"おじ(oji)","k":"おじ","l":"a2.1-3-4"},{"e":"various","r":"いろいろな(iroiro-na)","k":"いろいろな","l":"a2.1-3-4"},{"e":"very","r":"たいへんな(taihen-na)","k":"たいへんな","l":"a2.1-3-4"},{"e":"wake up","r":"おきます(oki-masu)","k":"おきます","l":"a2.1-3-4"},{"e":"we","r":"わたし（たち）(watashi-tachi)","k":"わたし","l":"a2.1-3-4"},{"e":"what kind of","r":"どんな(donna)","k":"どんな","l":"a2.1-3-4"},{"e":"which","r":"どの(dono)","k":"どの","l":"a2.1-3-4"},{"e":"who","r":"だれ(dare)","k":"だれ","l":"a2.1-3-4"},{"e":"young","r":"わかい(wakai)","k":"わかい","l":"a2.1-3-4"}],"a2.1-5-6":[{"e":"Autumn","r":"あき(aki)","k":"あき","l":"a2.1-5-6"},{"e":"Beach/sea","r":"うみ(umi)","k":"うみ","l":"a2.1-5-6"},{"e":"Fishing","r":"さかなつり(sakanatsuri)","k":"さかなつり","l":"a2.1-5-6"},{"e":"Fun","r":"たのしみ(tanoshimi)","k":"たのしみ","l":"a2.1-5-6"},{"e":"Ginger","r":"しょうがつ(shoogatsu)","k":"しょうがつ","l":"a2.1-5-6"},{"e":"Moon viewing (party)","r":"つきみ(tsukimi)","k":"つきみ","l":"a2.1-5-6"},{"e":"Next month","r":"らいげつ(raigetsu)","k":"らいげつ","l":"a2.1-5-6"},{"e":"Noon/daytime","r":"ひる(hiru)","k":"ひる","l":"a2.1-5-6"},{"e":"Play/hang out","r":"さきます(saki-masu","k":"さきます","l":"a2.1-5-6"},{"e":"Season","r":"きせつ(kisetsu)","k":"きせつ","l":"a2.1-5-6"},{"e":"Summer","r":"なつ(natsu","k":"なつ","l":"a2.1-5-6"},{"e":"There is/are/exists","r":"あります（ari-masu）","k":"あります","l":"a2.1-5-6"},{"e":"To become","r":"なります(narii-masu","k":"なります","l":"a2.1-5-6"},{"e":"To meet","r":"あいます（ai-masu)","k":"あいます","l":"a2.1-5-6"},{"e":"Very","r":"とても(totemo)","k":"とても","l":"a2.1-5-6"},{"e":"Why?","r":"どうして(doushite)","k":"どうして","l":"a2.1-5-6"},{"e":"Winter","r":"ふゆ(fuyu)","k":"ふゆ","l":"a2.1-5-6"},{"e":"a little","r":"ちょっと(chotto)","k":"ちょっと","l":"a2.1-5-6"},{"e":"about when/how soon","r":"いつごろ(itsugoro)","k":"いつごろ","l":"a2.1-5-6"},{"e":"all day","r":"いちにちじゅう(ichinichijyuu)","k":"いちにちじゅう","l":"a2.1-5-6"},{"e":"all year round","r":"いちねんじゅう(ichinen jyuu)","k":"いちねんじゅう","l":"a2.1-5-6"},{"e":"autumn leaf viewing","r":"もみじ(momiji)","k":"もみじ","l":"a2.1-5-6"},{"e":"become cloudy","r":"くもります(kumori-masu）","k":"くもります","l":"a2.1-5-6"},{"e":"bitter (taste)","r":"にがてな(nigate-na)","k":"にがてな","l":"a2.1-5-6"},{"e":"blow (wind)","r":"ふきます(fuki-masu)","k":"ふきます","l":"a2.1-5-6"},{"e":"blue","r":"あおい(ao-i)","k":"あおい","l":"a2.1-5-6"},{"e":"busy/lively","r":"にぎやかな(nigiyaka-na)","k":"にぎやかな","l":"a2.1-5-6"},{"e":"clear weather","r":"はれ(hare)","k":"はれ","l":"a2.1-5-6"},{"e":"cloud","r":"くも(kumo)","k":"くも","l":"a2.1-5-6"},{"e":"cloudy weather","r":"くもり(kumori)","k":"くもり","l":"a2.1-5-6"},{"e":"cool/refreshing","r":"すずしい(suzushi-i)","k":"すずしい","l":"a2.1-5-6"},{"e":"dog","r":"いぬ(inu)","k":"いぬ","l":"a2.1-5-6"},{"e":"good/healthy","r":"げんきな(genki-na)","k":"げんきな","l":"a2.1-5-6"},{"e":"gradually","r":"だんだん(dandan)","k":"だんだん","l":"a2.1-5-6"},{"e":"last year","r":"きょねん(kyonen）","k":"きょねん","l":"a2.1-5-6"},{"e":"leave","r":"でます(de-masu)","k":"でます","l":"a2.1-5-6"},{"e":"letter (written)","r":"てがみ(tegami)","k":"てがみ","l":"a2.1-5-6"},{"e":"mandarin (orange)","r":"みかん(mikan)","k":"みかん","l":"a2.1-5-6"},{"e":"many/numerous","r":"おおい(oo-i)","k":"おおい","l":"a2.1-5-6"},{"e":"martial arts/grape","r":"ぶどう(budoo)","k":"ぶどう","l":"a2.1-5-6"},{"e":"moon","r":"つき(tsuki)","k":"つき","l":"a2.1-5-6"},{"e":"morning","r":"ごぜんちゅう(gozenchuu)","k":"ごぜんちゅう","l":"a2.1-5-6"},{"e":"mountain","r":"やま(yama)","k":"やま","l":"a2.1-5-6"},{"e":"night/evening","r":"よる(yoru)","k":"よる","l":"a2.1-5-6"},{"e":"not at all","r":"ぜんぜん(zenzen)","k":"ぜんぜん","l":"a2.1-5-6"},{"e":"often","r":"よく(yoku)","k":"よく","l":"a2.1-5-6"},{"e":"outdoor temperature","r":"きおん(kion)","k":"きおん","l":"a2.1-5-6"},{"e":"perhaps/probably","r":"たぶん(tabun)","k":"たぶん","l":"a2.1-5-6"},{"e":"plan","r":"つもります(tsumori-masu）","k":"つもります","l":"a2.1-5-6"},{"e":"pretty/clean/tidy","r":"きれいな(kirei-na)","k":"きれいな","l":"a2.1-5-6"},{"e":"quiet/peaceful","r":"しずかな(shizuka-na)","k":"しずかな","l":"a2.1-5-6"},{"e":"rain","r":"あめ(ame)","k":"あめ","l":"a2.1-5-6"},{"e":"river","r":"かわ(kawa)","k":"かわ","l":"a2.1-5-6"},{"e":"safe/OK","r":"だいじょうぶな(daijyoobu-na)","k":"だいじょうぶな","l":"a2.1-5-6"},{"e":"school entrance ceremony","r":"にゅうがくしき(nyuugakushiki)","k":"にゅうがくしき","l":"a2.1-5-6"},{"e":"sky","r":"そら(sora)","k":"そら","l":"a2.1-5-6"},{"e":"slowly","r":"ゆっくり(yukkuri)","k":"ゆっくり","l":"a2.1-5-6"},{"e":"snow","r":"ゆき(yuki)","k":"ゆき","l":"a2.1-5-6"},{"e":"snowman","r":"ゆきだるま(yukidaruma)","k":"ゆきだるま","l":"a2.1-5-6"},{"e":"spring/sunshine","r":"はる(haru)","k":"はる","l":"a2.1-5-6"},{"e":"star","r":"ほし(hoshi)","k":"ほし","l":"a2.1-5-6"},{"e":"strong","r":"つよい(tsuyo-i)","k":"つよい","l":"a2.1-5-6"},{"e":"sunflower","r":"ひまわり(himawari)","k":"ひまわり","l":"a2.1-5-6"},{"e":"the kids","r":"こどもたち(kodomo tachi)","k":"こどもたち","l":"a2.1-5-6"},{"e":"this week","r":"こんしゅう(konsyuu)","k":"こんしゅう","l":"a2.1-5-6"},{"e":"to clear up (weather)","r":"はれます(hare-masu)","k":"はれます","l":"a2.1-5-6"},{"e":"to rain/to fall","r":"ふります(fhuri-masu)","k":"ふります","l":"a2.1-5-6"},{"e":"to take a day off","r":"やみます(yasumi-masu)","k":"やみます","l":"a2.1-5-6"},{"e":"typhoon","r":"たいふう(taifhuu)","k":"たいふう","l":"a2.1-5-6"},{"e":"weather","r":"てんき(tenki)","k":"てんき","l":"a2.1-5-6"},{"e":"wind","r":"かぜ(kaze)","k":"かぜ","l":"a2.1-5-6"}],"a2.1-7-8":[{"e":"Adult","r":"おとなotona","k":"おとな","l":"a2.1-7-8"},{"e":"Popular","r":"にんきninki","k":"にんき","l":"a2.1-7-8"},{"e":"Street walking","r":"まちあるきMachi aruki","k":"まちあるき","l":"a2.1-7-8"},{"e":"Thank you","r":"ぜひzehi","k":"ぜひ","l":"a2.1-7-8"},{"e":"To understand","r":"わかりますWakarimasu","k":"わかります","l":"a2.1-7-8"},{"e":"amusement park","r":"ゆうえんちyuu en chi","k":"ゆうえんち","l":"a2.1-7-8"},{"e":"everyone","r":"みんなminna","k":"みんな","l":"a2.1-7-8"},{"e":"famous","r":"ゆうめいなyuumei na","k":"ゆうめいな","l":"a2.1-7-8"},{"e":"inconvenient","r":"ふべんなfuben na","k":"ふべんな","l":"a2.1-7-8"},{"e":"inexpensive","r":"すくないsukunai","k":"すくない","l":"a2.1-7-8"},{"e":"it feels good","r":"きもちがいいkimochi ga ii","k":"きもちがいい","l":"a2.1-7-8"},{"e":"meal","r":"しょくじshokuji","k":"しょくじ","l":"a2.1-7-8"},{"e":"place","r":"あたりatari","k":"あたり","l":"a2.1-7-8"},{"e":"to know","r":"しりますShirimasu","k":"しります","l":"a2.1-7-8"},{"e":"west","r":"にしnishi","k":"にし","l":"a2.1-7-8"},{"e":"yakitori","r":"やきとりyakitori","k":"やきとり","l":"a2.1-7-8"}],"a2.1-9-10":[{"e":"The first","r":"ひとつめhitotsu me","k":"ひとつめ","l":"a2.1-9-10"},{"e":"black","r":"くろいkuroi","k":"くろい","l":"a2.1-9-10"},{"e":"building","r":"たてものtatemono","k":"たてもの","l":"a2.1-9-10"},{"e":"corner","r":"かどkado","k":"かど","l":"a2.1-9-10"},{"e":"cross over","r":"わたりますwatarimasu","k":"わたります","l":"a2.1-9-10"},{"e":"crossing/intersection","r":"こうさてんkoosaten","k":"こうさてん","l":"a2.1-9-10"},{"e":"immediately","r":"すぐsugu","k":"すぐ","l":"a2.1-9-10"},{"e":"japanese style","r":"ほんてきなnihonteki na","k":"ほんてきな","l":"a2.1-9-10"},{"e":"long and narrow","r":"ほそながいhosonagai","k":"ほそながい","l":"a2.1-9-10"},{"e":"lovely","r":"すてきなsuteki na","k":"すてきな","l":"a2.1-9-10"},{"e":"name","r":"なまえnamae","k":"なまえ","l":"a2.1-9-10"},{"e":"round","r":"まるいmarui","k":"まるい","l":"a2.1-9-10"},{"e":"splendid/elegant","r":"りっぱなrippa na","k":"りっぱな","l":"a2.1-9-10"},{"e":"straight","r":"まっすぐなmassugu na","k":"まっすぐな","l":"a2.1-9-10"},{"e":"to look/ be visible","r":"みえますmiemasu","k":"みえます","l":"a2.1-9-10"},{"e":"white","r":"しろいshiroi","k":"しろい","l":"a2.1-9-10"}],"a2.2-1-2":[{"e":"Again","r":"Mou","k":"もう","l":"a2.2-1-2"},{"e":"Animal","r":"Doubutsu","k":"どうぶつ","l":"a2.2-1-2"},{"e":"Aquarium","r":"Suizokukan","k":"すいぞくかん","l":"a2.2-1-2"},{"e":"Celebration","r":"Shuu matsu","k":"しゅうまつ","l":"a2.2-1-2"},{"e":"Food stall","r":"Yatai","k":"やたい","l":"a2.2-1-2"},{"e":"History","r":"Rekishi","k":"れきし","l":"a2.2-1-2"},{"e":"Hokkaido","r":"Hokkaidou","k":"ほっかいどう","l":"a2.2-1-2"},{"e":"Japanese bar","r":"Izakaya","k":"いざかや","l":"a2.2-1-2"},{"e":"Japanese boat","r":"Yakatabune","k":"やかたぶね","l":"a2.2-1-2"},{"e":"Light up","r":"Raito appu","k":"ライトアップ","l":"a2.2-1-2"},{"e":"Money exchange","r":"Ryougae shimasu","k":"りょうがえします","l":"a2.2-1-2"},{"e":"Night view","r":"Yakei","k":"やけい","l":"a2.2-1-2"},{"e":"Not yet","r":"Mada","k":"まだ","l":"a2.2-1-2"},{"e":"Nr 1 in the world","r":"Sekai ichi","k":"せかいいち","l":"a2.2-1-2"},{"e":"Of course","r":"Mochiron","k":"もちろん","l":"a2.2-1-2"},{"e":"Plan/schedule","r":"Yotei","k":"よてい","l":"a2.2-1-2"},{"e":"Please (formal)","r":"Onegai shimasu","k":"おねがいします","l":"a2.2-1-2"},{"e":"Recommended","r":"Osusume","k":"おすすめ","l":"a2.2-1-2"},{"e":"Sightseeing","r":"Kankou","k":"かんこう","l":"a2.2-1-2"},{"e":"Tempura","r":"Tenpura","k":"てんぷら","l":"a2.2-1-2"},{"e":"To eat a meal","r":"Shokuji shimasu","k":"しょくじします","l":"a2.2-1-2"}],"a2.2-3-4":[{"e":"Check it out","r":"Chekku shimasu","k":"チェックします","l":"a2.2-3-4"},{"e":"Easy","r":"Kantan","k":"かんたん","l":"a2.2-3-4"},{"e":"Elementary school","r":"Shougakkou","k":"しょうがっこう","l":"a2.2-3-4"},{"e":"Explain","r":"Setsumei shimasu","k":"せつめいします","l":"a2.2-3-4"},{"e":"Grammar","r":"Bunpoo","k":"ぶんぽう","l":"a2.2-3-4"},{"e":"Hard","r":"Muzukashii","k":"むずかしい","l":"a2.2-3-4"},{"e":"Junior high school","r":"Chuugakkou","k":"ちゅうがっこう","l":"a2.2-3-4"},{"e":"Meaning","r":"Imi","k":"いみ","l":"a2.2-3-4"},{"e":"Once","r":"Ichido","k":"いちど","l":"a2.2-3-4"},{"e":"Practice","r":"Renshuu shimasu","k":"れんしゅうします","l":"a2.2-3-4"},{"e":"Pronnounciation","r":"Hatsuon","k":"はつおん","l":"a2.2-3-4"},{"e":"Remember/memorize","r":"Oboemasu","k":"おぼえます","l":"a2.2-3-4"},{"e":"Resemble","r":"Nimasu","k":"にます","l":"a2.2-3-4"},{"e":"To be wrong","r":"Chigaimasu","k":"ちがいます","l":"a2.2-3-4"},{"e":"To help","r":"Tetsubaimasu","k":"てつだいます","l":"a2.2-3-4"},{"e":"To lend","r":"Kashimasu","k":"かします","l":"a2.2-3-4"},{"e":"To use","r":"Tsukaimasu","k":"つかいます","l":"a2.2-3-4"}],"a2.2-5-6":[{"e":"Activity","r":"Katsudou","k":"かつどう","l":"a2.2-5-6"},{"e":"Cosplay","r":"Kosupure","k":"コスプレ","l":"a2.2-5-6"},{"e":"Do your best","r":"Ganbarimasu","k":"がんばります","l":"a2.2-5-6"},{"e":"Go on business trip","r":"Shuuchou shimasu","k":"しゅっちょうします","l":"a2.2-5-6"},{"e":"Haunted house","r":"Obakeyashiki","k":"おばけやしき","l":"a2.2-5-6"},{"e":"Insert","r":"Iremasu","k":"いれます","l":"a2.2-5-6"},{"e":"Interest","r":"Kyoumi","k":"きょうみ","l":"a2.2-5-6"},{"e":"Study abroad","r":"Ryuugaku shimasu","k":"りゅうがくします","l":"a2.2-5-6"},{"e":"Teacher","r":"Kyoushi","k":"きょうし","l":"a2.2-5-6"},{"e":"Tourist","r":"Kankoukyaku","k":"かんこうきゃく","l":"a2.2-5-6"},{"e":"Translate","r":"Honyaku shimasu","k":"ほんやくします","l":"a2.2-5-6"}],"a2.2-7-8":[{"e":"Fried chicken","r":"からあげkara age","k":"からあげ","l":"a2.2-7-8"},{"e":"Go fetch/get it (come)","r":"もってきます（持って来ます）motte kimasu","k":"もってきます","l":"a2.2-7-8"},{"e":"How many","r":"いくつikutsu","k":"いくつ","l":"a2.2-7-8"},{"e":"Picnic","r":"ピクニックpikunikku","k":"ピクニック","l":"a2.2-7-8"},{"e":"Potato chips","r":"ポテトチップスpoteto chippusu","k":"ポテトチップス","l":"a2.2-7-8"},{"e":"To become hungry","r":"(おなかが)すきますonaka ga sukimasu","k":"おなかが","l":"a2.2-7-8"},{"e":"To hold","r":"もちます（持ちますMochimasu","k":"もちます","l":"a2.2-7-8"},{"e":"To take (go)","r":"もっていきます （持って⾏きます）Motte ikimasu","k":"もっていきます","l":"a2.2-7-8"},{"e":"a drink/beverage","r":"のみもの（飲み物）nomimono","k":"のみもの","l":"a2.2-7-8"},{"e":"a reply","r":"へんじ （返事）henji","k":"へんじ","l":"a2.2-7-8"},{"e":"chopsticks","r":"(お)はしo hashi","k":"お","l":"a2.2-7-8"},{"e":"day of the week","r":"ようび （曜⽇）youbi","k":"ようび","l":"a2.2-7-8"},{"e":"discuss/consult","r":"soudan shimasuそうだんします（相談します）","k":"そうだんします","l":"a2.2-7-8"},{"e":"east","r":"ひがし（東）higashi","k":"ひがし","l":"a2.2-7-8"},{"e":"everyone","r":"みなさんminasan","k":"みなさん","l":"a2.2-7-8"},{"e":"garbage bag","r":"ごみぶくろgomi bu kuro","k":"ごみぶくろ","l":"a2.2-7-8"},{"e":"omelette/egg dish","r":"たまごやき（卵焼き）tamagoyaki","k":"たまごやき","l":"a2.2-7-8"},{"e":"please","r":"どうぞdouzo","k":"どうぞ","l":"a2.2-7-8"},{"e":"red","r":"akaあか","k":"あか","l":"a2.2-7-8"},{"e":"rice ball","r":"おにぎりonigiri","k":"おにぎり","l":"a2.2-7-8"},{"e":"sake","r":"にほんしゅ（⽇本酒）nihonshu","k":"にほんしゅ","l":"a2.2-7-8"},{"e":"stomach","r":"おなかonaka","k":"おなか","l":"a2.2-7-8"},{"e":"time/oneself?","r":"じぶん （⾃分）jibun","k":"じぶん","l":"a2.2-7-8"},{"e":"which (casual)","r":"どっちdotchi","k":"どっち","l":"a2.2-7-8"},{"e":"which (polite)","r":"どちら","k":"どちら","l":"a2.2-7-8"},{"e":"white","r":"しろ（⽩）shiro","k":"しろ","l":"a2.2-7-8"}],"a2.2-9-10":[{"e":"Colour","r":"いろ","k":"いろ","l":"a2.2-9-10"},{"e":"Flavor/taste","r":"あじ","k":"あじ","l":"a2.2-9-10"},{"e":"Fresh","r":"しんせん な","k":"しんせん","l":"a2.2-9-10"},{"e":"Hateful","r":"きらい な","k":"きらい","l":"a2.2-9-10"},{"e":"Hometown","r":"きゅうり","k":"きゅうり","l":"a2.2-9-10"},{"e":"If you like","r":"よかったら","k":"よかったら","l":"a2.2-9-10"},{"e":"Japanese pickled vegetables","r":"つけもの","k":"つけもの","l":"a2.2-9-10"},{"e":"Man","r":"おとこのひと","k":"おとこのひと","l":"a2.2-9-10"},{"e":"Misfortune","r":"ふうん","k":"ふうん","l":"a2.2-9-10"},{"e":"Pickled plum","r":"うめぼし","k":"うめぼし","l":"a2.2-9-10"},{"e":"Really","r":"ほんとうに","k":"ほんとうに","l":"a2.2-9-10"},{"e":"Salmon","r":"しゃけ","k":"しゃけ","l":"a2.2-9-10"},{"e":"Salmon roe","r":"イクラ","k":"イクラ","l":"a2.2-9-10"},{"e":"Seaweed","r":"こんぶ","k":"こんぶ","l":"a2.2-9-10"},{"e":"Shrimp","r":"えび","k":"えび","l":"a2.2-9-10"},{"e":"Splendid","r":"けっこう","k":"けっこう","l":"a2.2-9-10"},{"e":"Steamed yeast num with filling","r":"まんじゅう","k":"まんじゅう","l":"a2.2-9-10"},{"e":"Thank you for this meal","r":"いただきます","k":"いただきます","l":"a2.2-9-10"},{"e":"The world","r":"せかい","k":"せかい","l":"a2.2-9-10"},{"e":"To enter","r":"はいります","k":"はいります","l":"a2.2-9-10"},{"e":"Unfortunate","r":"ざんねん な","k":"ざんねん","l":"a2.2-9-10"},{"e":"Vegetable","r":"やさい","k":"やさい","l":"a2.2-9-10"},{"e":"Wow","r":"わあ","k":"わあ","l":"a2.2-9-10"}],"a2.2-priv":[{"e":"A little","r":"すこし","k":"すこし","l":"a2.2-priv"},{"e":"Answer","r":"こたえ","k":"こたえ","l":"a2.2-priv"},{"e":"Character / letter","r":"もじ","k":"もじ","l":"a2.2-priv"},{"e":"Culture","r":"ぶんか","k":"ぶんか","l":"a2.2-priv"},{"e":"Dictionary","r":"じしょ","k":"じしょ","l":"a2.2-priv"},{"e":"Good / well","r":"よろしく","k":"よろしく","l":"a2.2-priv"},{"e":"Grad school / University master","r":"だいがくいん","k":"だいがくいん","l":"a2.2-priv"},{"e":"High school","r":"こうこう","k":"こうこう","l":"a2.2-priv"},{"e":"Homework","r":"しゅくだい","k":"しゅくだい","l":"a2.2-priv"},{"e":"Question","r":"しつもん","k":"しつもん","l":"a2.2-priv"},{"e":"Really","r":"ほんとう (に)","k":"ほんとう","l":"a2.2-priv"},{"e":"So far","r":"いままで (に)","k":"いままで","l":"a2.2-priv"},{"e":"University","r":"だいがく","k":"だいがく","l":"a2.2-priv"},{"e":"Word / vocabulary","r":"たんご","k":"たんご","l":"a2.2-priv"}],"a2.3-1-2":[{"e":"Foreigner","r":"がいこくじん","k":"がいこくじん","l":"a2.3-1-2"},{"e":"Nope","r":"びん","k":"びん","l":"a2.3-1-2"},{"e":"Office","r":"オフィス","k":"オフィス","l":"a2.3-1-2"},{"e":"Pleasant/agreeable","r":"かいてき","k":"かいてき","l":"a2.3-1-2"},{"e":"Sleepy","r":"ねむい","k":"ねむい","l":"a2.3-1-2"},{"e":"To like","r":"すきます","k":"すきます","l":"a2.3-1-2"},{"e":"To meet","r":"（ひと）に あいます （会います）","k":"ひと","l":"a2.3-1-2"}],"a2.3-5-6":[{"e":"Back","r":"せなか","k":"せなか","l":"a2.3-5-6"},{"e":"Hand","r":"て","k":"て","l":"a2.3-5-6"},{"e":"Painful","r":"いたい","k":"いたい","l":"a2.3-5-6"},{"e":"Shoulder","r":"かた","k":"かた","l":"a2.3-5-6"},{"e":"To run","r":"はしります","k":"はしります","l":"a2.3-5-6"},{"e":"To take","r":"とれます","k":"とれます","l":"a2.3-5-6"},{"e":"To work too hard","r":"むりします","k":"むりします","l":"a2.3-5-6"},{"e":"Useless","r":"だめな","k":"だめな","l":"a2.3-5-6"}],"misc-numbers":[{"e":"1 000 000","r":"hyakuman","k":"ひゃくまん","l":"misc-numbers"},{"e":"10","r":"juu","k":"じゅう","l":"misc-numbers"},{"e":"10 000","r":"ichiman","k":"いちまん","l":"misc-numbers"},{"e":"100","r":"hyaku","k":"ひゃく","l":"misc-numbers"},{"e":"100 000","r":"juuman","k":"じゅうまん","l":"misc-numbers"},{"e":"1000","r":"sen","k":"せん","l":"misc-numbers"},{"e":"200","r":"nihyaku","k":"にひゃく","l":"misc-numbers"},{"e":"300","r":"sanbyaku","k":"さんびゃく","l":"misc-numbers"},{"e":"3000","r":"sanzen","k":"さんぜん","l":"misc-numbers"},{"e":"400","r":"yonhyaku","k":"よんひゃく","l":"misc-numbers"},{"e":"50 000","r":"goman","k":"ごまん","l":"misc-numbers"},{"e":"500","r":"gohyaku","k":"ごひゃく","l":"misc-numbers"},{"e":"5000","r":"gosen","k":"ごせん","l":"misc-numbers"},{"e":"600","r":"roppyaku","k":"ろっぴゃく","l":"misc-numbers"},{"e":"700","r":"nanahyaku","k":"ななひゃく","l":"misc-numbers"},{"e":"800","r":"happyaku","k":"はっぴゃく","l":"misc-numbers"},{"e":"8000","r":"hassen","k":"はっせん","l":"misc-numbers"},{"e":"900","r":"kyuuhyaku","k":"きゅうひゃく","l":"misc-numbers"},{"e":"number","r":"kazu","k":"かず","l":"misc-numbers"},{"e":"Four","r":"Shi","k":"し","l":"misc-numbers"},{"e":"Seven","r":"Shichi","k":"しち","l":"misc-numbers"}],"misc-calendar":[{"e":"day","r":"___ nichi","k":"～にち","l":"misc-calendar"},{"e":"every month","r":"maitsuki","k":"まいつき","l":"misc-calendar"},{"e":"every year","r":"maitoshi","k":"まいとし","l":"misc-calendar"},{"e":"friday","r":"kin'yoobi","k":"きんようび","l":"misc-calendar"},{"e":"last month","r":"sengetsu","k":"せんげつ","l":"misc-calendar"},{"e":"last week","r":"senshuu","k":"せんしゅう","l":"misc-calendar"},{"e":"monday","r":"getsuyoobi","k":"げつようび","l":"misc-calendar"},{"e":"month","r":"___ gatsu","k":"～がつ","l":"misc-calendar"},{"e":"next year","r":"rainen","k":"らいねん","l":"misc-calendar"},{"e":"saturday","r":"doyoobi","k":"どようび","l":"misc-calendar"},{"e":"sunday","r":"nichiyoobi","k":"にちようび","l":"misc-calendar"},{"e":"this month","r":"kongetsu","k":"こんげつ","l":"misc-calendar"},{"e":"this year","r":"kotoshi","k":"ことし","l":"misc-calendar"},{"e":"thursday","r":"mokuyoobi","k":"もくようび","l":"misc-calendar"},{"e":"tuesday","r":"kayoobi","k":"かようび","l":"misc-calendar"},{"e":"wednesday","r":"suiyoobi","k":"すいようび","l":"misc-calendar"},{"e":"week","r":"shuu","k":"しゅう","l":"misc-calendar"},{"e":"year","r":"___ nen","k":"～ねん","l":"misc-calendar"},{"e":"year","r":"toshi","k":"とし","l":"misc-calendar"}],"misc-daily":[{"e":"To pray","r":"oinori o shimasu","k":"おいのりをします","l":"misc-daily"},{"e":"a friend comes to visit","r":"tomodachi ga kimasu","k":"ともだちがきます","l":"misc-daily"},{"e":"to brush one's teeth","r":"ha o migakimasu","k":"はをみがきます","l":"misc-daily"},{"e":"to chat with ___","r":"___ to oshaberi o shimasu","k":"～とおしゃべりします","l":"misc-daily"},{"e":"to clean","r":"sooji o shimasu","k":"そうじをします","l":"misc-daily"},{"e":"to cook","r":"ryoori o shimasu","k":"りょうりをします","l":"misc-daily"},{"e":"to do a part-time job","r":"arubaito/baito o shimasu","k":"アルバイト／バイトをします","l":"misc-daily"},{"e":"to do exercise","r":"undoo o shimasu","k":"うんどうをします","l":"misc-daily"},{"e":"to do housework","r":"kaji o shimasu","k":"かじをします","l":"misc-daily"},{"e":"to do yoga","r":"yoga o shimasu","k":"ヨガをします","l":"misc-daily"},{"e":"to eat dinner","r":"ban-gohan o tabemasu","k":"ばんごはんをたべます","l":"misc-daily"},{"e":"to go home","r":"uchi ni kaerimasu","k":"うちにかえります","l":"misc-daily"},{"e":"to have a meal","r":"shokuji o shimasu","k":"しょくじをします","l":"misc-daily"},{"e":"to have breakfast","r":"asa-gohan otabemasu","k":"あさごはんをたべます","l":"misc-daily"},{"e":"to have lunch","r":"hiru-gohan o tabemasu","k":"ひるごはんをたべます","l":"misc-daily"},{"e":"to keep a diary","r":"nikki o kakimasu","k":"にっきをかきます","l":"misc-daily"},{"e":"to listen to music","r":"ongaku o kikimasu","k":"おんがくをききます","l":"misc-daily"},{"e":"to make a phone call","r":"denwa o shimasu / kakemasu","k":"でんわをします／かけます","l":"misc-daily"},{"e":"to play a game","r":"geemu o shimasu","k":"ゲームをします","l":"misc-daily"},{"e":"to put on makeup","r":"okeshoo o shimasu","k":"おけしょうをします","l":"misc-daily"},{"e":"to put on your clothes","r":"fuku o kimasu","k":"ふくをきます","l":"misc-daily"},{"e":"to read a newspaper","r":"shinbun o yomimasu","k":"しんぶんをよみます","l":"misc-daily"},{"e":"to shave","r":"hige o sorimasu","k":"ひげをそります","l":"misc-daily"},{"e":"to smoke","r":"tabako o suimasu","k":"たばこをすいます","l":"misc-daily"},{"e":"to take a bath","r":"ofuro ni hairimasu","k":"おふろにはいります","l":"misc-daily"},{"e":"to take a shower","r":"shawaa o abimasu","k":"シャワーをあびます","l":"misc-daily"},{"e":"to take a walk","r":"sanpo o shimasu","k":"さんぽをします","l":"misc-daily"},{"e":"to take care of ___","r":"___ no sewa o shimasu","k":"～のせわをします","l":"misc-daily"},{"e":"to take off your clothes","r":"fuku o nugimasu","k":"ふくをぬぎます","l":"misc-daily"},{"e":"to tidy up","r":"katazukemasu","k":"かたづけます","l":"misc-daily"},{"e":"to use the internet","r":"intaanetto o shimasu","k":"インターネットをします","l":"misc-daily"},{"e":"to wash clothes","r":"sentaku o shimasu","k":"せんたくをします","l":"misc-daily"},{"e":"to wash one's face","r":"kao o araimasu","k":"かおをあらいます","l":"misc-daily"},{"e":"to watch TV","r":"terebi o mimasu","k":"テレビをみます","l":"misc-daily"},{"e":"to work / do one's job","r":"shigoto o shimasu","k":"しごとをします","l":"misc-daily"},{"e":"to work overtime","r":"zangyoo o shimasu","k":"ざんぎょうをします","l":"misc-daily"},{"e":"to write an email","r":"e-meeru o shimasu","k":"Eメールをします","l":"misc-daily"}],"ukjent":[{"e":"Test","r":"Backtest","k":"(テスト)","l":"ukjent"},{"e":"Hva klokka?","r":"nan-ji","k":"なんじ","l":"ukjent"},{"e":"hva?","r":"nani/nan","k":"なに／なん","l":"ukjent"},{"e":"hvor?","r":"doko","k":"どこ","l":"ukjent"},{"e":"men hvem?","r":"dare to","k":"だれと","l":"ukjent"},{"e":"chi","r":"Chitte","k":"って","l":"ukjent"},{"e":"i","r":"itte","k":"いって","l":"ukjent"},{"e":"shi...","r":"shite","k":"して","l":"ukjent"},{"e":"Bimasu","r":"Binde","k":"んで","l":"ukjent"},{"e":"Gimasu","r":"Giide","k":"いで","l":"ukjent"},{"e":"Kimasu","r":"Kiite","k":"きいて","l":"ukjent"},{"e":"Aimasu - dic","r":"Au","k":"あう","l":"ukjent"},{"e":"Aimasu - te","r":"Atte","k":"あって","l":"ukjent"},{"e":"Kaimasu - dic","r":"Kau","k":"かう","l":"ukjent"},{"e":"Kaimasu - te","r":"Katte","k":"かって","l":"ukjent"}],"misc-lekser2":[{"e":"5","r":"go","k":"ご","l":"misc-lekser2"},{"e":"Arabiclanguage","r":"arabiago","k":"アラビアご","l":"misc-lekser2"},{"e":"Chineselanguage","r":"Chuugokugo","k":"ちゅうごくご","l":"misc-lekser2"},{"e":"Eight","r":"hachi","k":"はち","l":"misc-lekser2"},{"e":"Englishlanguage","r":"Eego","k":"えいご","l":"misc-lekser2"},{"e":"Frenchlanguage","r":"furansugo","k":"フランスご","l":"misc-lekser2"},{"e":"Germanlanguage","r":"Doitsugo","k":"ドイツご","l":"misc-lekser2"},{"e":"Korean language","r":"Kankokugo","k":"かんこくご","l":"misc-lekser2"},{"e":"Nine","r":"kyuu / ku","k":"きゅう／く","l":"misc-lekser2"},{"e":"Spanishlanguage","r":"Supeingo","k":"スペインご","l":"misc-lekser2"},{"e":"To have an ___ (animal)","r":"___ o katte imasu","k":"～をかっています","l":"misc-lekser2"},{"e":"a father","r":"otoosan","k":"おとうさん","l":"misc-lekser2"},{"e":"a grandfather","r":"ojisan","k":"おじいさん","l":"misc-lekser2"},{"e":"a grandmother","r":"obaasan","k":"おばあさん","l":"misc-lekser2"},{"e":"a husband","r":"goshujin","k":"ごしゅじん","l":"misc-lekser2"},{"e":"a mother","r":"okaasan","k":"おかあさん","l":"misc-lekser2"},{"e":"a wife","r":"okusan","k":"おくさん","l":"misc-lekser2"},{"e":"a younger brother","r":"otootosan","k":"おとうとさん","l":"misc-lekser2"},{"e":"a younger sister","r":"imootosan","k":"いもうとさん","l":"misc-lekser2"},{"e":"an elder brother","r":"oniisan","k":"おにいさん","l":"misc-lekser2"},{"e":"an older sister","r":"oneesan","k":"おねえさん","l":"misc-lekser2"},{"e":"child","r":"kodomo","k":"こども","l":"misc-lekser2"},{"e":"class/lesson","r":"kurasu","k":"クラス","l":"misc-lekser2"},{"e":"class/school lessons","r":"jugyoo","k":"じゅぎょう","l":"misc-lekser2"},{"e":"classroom","r":"kyooshitsu","k":"きょうしつ","l":"misc-lekser2"},{"e":"four","r":"yon / shi","k":"よん／し","l":"misc-lekser2"},{"e":"friend","r":"tomodachi","k":"ともだち","l":"misc-lekser2"},{"e":"goldfish","r":"kingyo","k":"きんぎょ","l":"misc-lekser2"},{"e":"japanese language","r":"nihongo","k":"にほんご","l":"misc-lekser2"},{"e":"japanese person","r":"nihonjin","k":"にほんじん","l":"misc-lekser2"},{"e":"language","r":"kotoba","k":"ことば","l":"misc-lekser2"},{"e":"mamma","r":"haha","k":"はは","l":"misc-lekser2"},{"e":"my elder brother","r":"ani","k":"あに","l":"misc-lekser2"},{"e":"my elder sister","r":"ane","k":"あね","l":"misc-lekser2"},{"e":"my husband","r":"otto","k":"おっと","l":"misc-lekser2"},{"e":"my wife","r":"tsuma","k":"つま","l":"misc-lekser2"},{"e":"my younger brother","r":"otooto","k":"おとうと","l":"misc-lekser2"},{"e":"my younger sister","r":"imooto","k":"いもうと","l":"misc-lekser2"},{"e":"cat","r":"neko","k":"ねこ","l":"misc-lekser2"},{"e":"office room","r":"jimushitsu","k":"じむしつ","l":"misc-lekser2"},{"e":"pappa","r":"chichi","k":"ちち","l":"misc-lekser2"},{"e":"participant","r":"jukoosha","k":"じゅこうしゃ","l":"misc-lekser2"},{"e":"pet","r":"petto","k":"ペット","l":"misc-lekser2"},{"e":"rabbit","r":"usagi","k":"うさぎ","l":"misc-lekser2"},{"e":"seven","r":"nana / shichi","k":"なな／しち","l":"misc-lekser2"},{"e":"six","r":"roku","k":"ろく","l":"misc-lekser2"},{"e":"someone else's child","r":"okosan","k":"おこさん","l":"misc-lekser2"},{"e":"student","r":"gakusee","k":"がくせい","l":"misc-lekser2"},{"e":"student studying abroad","r":"ryuugakusee","k":"りゅうがくせい","l":"misc-lekser2"},{"e":"teacher","r":"sensee","k":"せんせい","l":"misc-lekser2"},{"e":"the person next to you","r":"tonari no hito","k":"となりのひと","l":"misc-lekser2"},{"e":"three","r":"san","k":"さん","l":"misc-lekser2"},{"e":"bird","r":"tori","k":"とり","l":"misc-lekser2"},{"e":"two","r":"ni","k":"に","l":"misc-lekser2"}],"misc-nihonjin":[{"e":"Africa","r":"Afurika","k":"アフリカ","l":"misc-nihonjin"},{"e":"America/USA","r":"Amerika","k":"アメリカ","l":"misc-nihonjin"},{"e":"Asia","r":"Ajia","k":"アジア","l":"misc-nihonjin"},{"e":"Australia","r":"Oosutiraria","k":"オーストラリア","l":"misc-nihonjin"},{"e":"Brazil","r":"Burajiru","k":"ブラジル","l":"misc-nihonjin"},{"e":"Canada","r":"Kanada","k":"カナダ","l":"misc-nihonjin"},{"e":"China","r":"Chuugoku","k":"ちゅうごく","l":"misc-nihonjin"},{"e":"Egypt","r":"Ejiputo","k":"エジプト","l":"misc-nihonjin"},{"e":"Europe","r":"Yooroppa","k":"ヨーロッパ","l":"misc-nihonjin"},{"e":"France","r":"Furansu","k":"フランス","l":"misc-nihonjin"},{"e":"Germany","r":"Doitsu","k":"ドイツ","l":"misc-nihonjin"},{"e":"Hungary","r":"Hangarii","k":"ハンガリー","l":"misc-nihonjin"},{"e":"India","r":"Indo","k":"インド","l":"misc-nihonjin"},{"e":"Indonesia","r":"Indoneshia","k":"インドネシア","l":"misc-nihonjin"},{"e":"Italy","r":"Itaria","k":"イタリア","l":"misc-nihonjin"},{"e":"Japan","r":"Nihon/Nippon","k":"にほん／にっぽん","l":"misc-nihonjin"},{"e":"Malaysia","r":"Mareeshia","k":"マレーシア","l":"misc-nihonjin"},{"e":"Mexico","r":"Mekishiko","k":"メキシコ","l":"misc-nihonjin"},{"e":"New Zealand","r":"Nyuujirando","k":"ニュージーランド","l":"misc-nihonjin"},{"e":"Please call me ___","r":"___ to yonde kudasai","k":"～とよんでください","l":"misc-nihonjin"},{"e":"Russia","r":"Roshia","k":"ロシア","l":"misc-nihonjin"},{"e":"Self-introduction (to introuce oneself)","r":"jiko-shookai (shimasu)","k":"じこしょうかい（します）","l":"misc-nihonjin"},{"e":"South Korea","r":"Kankoku","k":"かんこく","l":"misc-nihonjin"},{"e":"Spain","r":"Supein","k":"スペイン","l":"misc-nihonjin"},{"e":"Sri Lanka","r":"Suriranka","k":"スリランカ","l":"misc-nihonjin"},{"e":"Thailand","r":"Tai","k":"タイ","l":"misc-nihonjin"},{"e":"The Philippines","r":"Firipin","k":"フィリピン","l":"misc-nihonjin"},{"e":"To work at/in/for ___","r":"___ de hataraite imasu","k":"～ではたらいています","l":"misc-nihonjin"},{"e":"UK/Britain","r":"Igirisu","k":"イギリス","l":"misc-nihonjin"},{"e":"Vietnam","r":"Betonamu","k":"ベトナム","l":"misc-nihonjin"},{"e":"baby","r":"akachan","k":"あかちゃん","l":"misc-nihonjin"},{"e":"boy","r":"otoko-no-ko","k":"おとこのこ","l":"misc-nihonjin"},{"e":"business card","r":"meeshi","k":"めいし","l":"misc-nihonjin"},{"e":"care worker","r":"kaigoshi","k":"かいごし","l":"misc-nihonjin"},{"e":"circle (true)","r":"maru","k":"まる","l":"misc-nihonjin"},{"e":"civil servant","r":"koomuin","k":"こうむいん","l":"misc-nihonjin"},{"e":"company employee","r":"kaishain","k":"かいしゃいん","l":"misc-nihonjin"},{"e":"computer","r":"konpyuutaa","k":"コンピューター","l":"misc-nihonjin"},{"e":"cross (false)","r":"batsu","k":"ばつ","l":"misc-nihonjin"},{"e":"elderly person","r":"otoshiyori","k":"おとしより","l":"misc-nihonjin"},{"e":"engineer","r":"enjinia","k":"エンジニア","l":"misc-nihonjin"},{"e":"eraser","r":"keshigomu","k":"けしごむ","l":"misc-nihonjin"},{"e":"example","r":"ree","k":"れい","l":"misc-nihonjin"},{"e":"family","r":"kazoko","k":"かぞく","l":"misc-nihonjin"},{"e":"farmer","r":"nooka","k":"のうか","l":"misc-nihonjin"},{"e":"girl","r":"onna-no-ko","k":"おんなのこ","l":"misc-nihonjin"},{"e":"greetings","r":"aisatsu","k":"あいさつ","l":"misc-nihonjin"},{"e":"he","r":"kare","k":"かれ","l":"misc-nihonjin"},{"e":"housewife/homemaker","r":"shufu","k":"しゅふ","l":"misc-nihonjin"},{"e":"man","r":"otoko","k":"おとこ","l":"misc-nihonjin"},{"e":"medical doctor","r":"isha","k":"いしゃ","l":"misc-nihonjin"},{"e":"mobile phone","r":"keetai-denwa","k":"けいたいでんわ","l":"misc-nihonjin"},{"e":"notebook","r":"nooto","k":"ノート","l":"misc-nihonjin"},{"e":"number","r":"bangoo","k":"ばんごう","l":"misc-nihonjin"},{"e":"page","r":"peeji","k":"ページ","l":"misc-nihonjin"},{"e":"part time job","r":"arubaito (baito)","k":"アルバイト（バイト）","l":"misc-nihonjin"},{"e":"part time job 2","r":"paatotaimu (paato)","k":"パートタイム（パート）","l":"misc-nihonjin"},{"e":"pencil","r":"enpitsu","k":"えんぴつ","l":"misc-nihonjin"},{"e":"question/problem","r":"mondai","k":"もんだい","l":"misc-nihonjin"},{"e":"self employed","r":"jieegyoo","k":"じえいぎょう","l":"misc-nihonjin"},{"e":"she","r":"kanojo","k":"かのじょ","l":"misc-nihonjin"},{"e":"textbook","r":"kyookasho","k":"きょうかしょ","l":"misc-nihonjin"},{"e":"to have a conversation","r":"kaiwa (o) shimasu","k":"かいわをします","l":"misc-nihonjin"},{"e":"to live on a pension","r":"nenkin de seekatsu-shite imasu","k":"ねんきんでせいかつしています","l":"misc-nihonjin"},{"e":"to say/to tell","r":"iimasu","k":"いいます","l":"misc-nihonjin"},{"e":"we","r":"watashitachi","k":"わたしたち","l":"misc-nihonjin"},{"e":"whiteboard","r":"howaito-boodo","k":"ホワイトボード","l":"misc-nihonjin"},{"e":"woman 2","r":"onna-no-hito","k":"おんなのひと","l":"misc-nihonjin"},{"e":"woman/female","r":"onna","k":"おんな","l":"misc-nihonjin"},{"e":"you","r":"anata","k":"あなた","l":"misc-nihonjin"},{"e":"youth","r":"wakamono","k":"わかもの","l":"misc-nihonjin"}],"misc-tall":[{"e":"7 family","r":"nana-nin/shichi-nin","k":"ななにん／しちにん","l":"misc-tall"},{"e":"four","r":"yan","k":"よん","l":"misc-tall"},{"e":"nine","r":"kyuu","k":"きゅう","l":"misc-tall"},{"e":"syv","r":"nana /shushi","k":"なな","l":"misc-tall"}],"misc-time":[{"e":"AM/morning","r":"gozen","k":"ごぜん","l":"misc-time"},{"e":"PM/afternoon","r":"gogo","k":"ごご","l":"misc-time"},{"e":"___ o clock","r":"___ ji","k":"～じ","l":"misc-time"},{"e":"about","r":"___ goro","k":"～ごろ","l":"misc-time"},{"e":"half past","r":"___ han","k":"～はん","l":"misc-time"},{"e":"minute","r":"___ fun/pun","k":"～ふん／ぷん","l":"misc-time"},{"e":"morning","r":"asa","k":"あさ","l":"misc-time"},{"e":"when","r":"itsu","k":"いつ","l":"misc-time"}],"misc-freq":[{"e":"quantity","r":"ryoo","k":"りょう","l":"misc-freq"}]};

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
  if (!item?.expl && !item?.no && !item?.en) return null;
  return (
    <div style={{display:"flex",flexDirection:"column",gap:6}}>
      {(item.no || item.en) && (
        <div style={{background:C.isDark?"#0a1a10":"#f0fdf4",border:`1px solid ${C.green}44`,borderRadius:10,padding:"10px 14px",fontSize:fs?15:13,color:C.green,fontFamily:"'Noto Serif JP',serif",textAlign:"center"}}>
          {item.no || item.en}
        </div>
      )}
      {item.expl && (
        <div style={{background:C.isDark?"#0d1a2a":"#eff6ff",border:`1px solid ${C.blue}44`,borderRadius:10,padding:"10px 14px",fontSize:fs?14:12,color:C.blue}}>
          <span style={{fontWeight:700}}>Forklaring: </span>{item.expl}
        </div>
      )}
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
        <div style={{fontSize:fs?15:13,color:C.textMid,marginBottom:8}}>Sett ord i riktig rekkefølge</div>
        <div style={{fontSize:fs?22:18,fontWeight:600,color:C.text,lineHeight:1.4}}>{q.en}</div>
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
  const [lastStreakDate, setLastStreakDate] = useState("");
  const sLastDate=useCallback(async(v)=>{try{await window.storage.set("lastStreakDate",v);}catch{}},[]);
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

  const lessons = useMemo(()=>LESSONS_DATA,[]);

  const lessonKeys = useMemo(()=>
    Object.keys(lessons).filter(l=>l!=="ukjent").sort((a,b)=>{
      // Put misc- and a2.x keys after core lessons
      const order = l => {
        if(l.startsWith("misc-")) return 9000;
        if(l.startsWith("a2.")) return 1000;
        const p = l.split("-").map(Number);
        return p[0]*100 + (p[1]||0);
      };
      return order(a) - order(b);
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
    if(next>=counterQueue.length){const today=new Date().toDateString();if(lastStreakDate!==today){const ns=streak+1;setStreak(ns);ss(ns);setLastStreakDate(today);sLastDate(today);}setScreen("counter-result");}
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
      const today=new Date().toDateString();
      if(lastStreakDate!==today){const ns=streak+1;setStreak(ns);ss(ns);setLastStreakDate(today);sLastDate(today);}
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
                {/* A1.2 */}
                <div style={{marginTop:12}}>
                  <div style={{fontSize:fs?15:13,fontWeight:700,color:C.gold,marginBottom:8}}>A1.2</div>
                  <div style={{display:"flex",flexDirection:"column",gap:6}}>
                    {[
                      {id:"A1.2-T1",label:"Time 1–2",leksjoner:["1-2"]},
                      {id:"A1.2-T2",label:"Time 3–4",leksjoner:["3-4"]},
                      {id:"A1.2-T3",label:"Time 5–6",leksjoner:["5-6"]},
                      {id:"A1.2-T4",label:"Time 7–8",leksjoner:["7-8"]},
                      {id:"A1.2-T5",label:"Time 9–10",leksjoner:["9-10"]},
                      {id:"A1.2-T6",label:"Time 11–12",leksjoner:["11-12"]},
                    ].map(tp=>{
                      const allWords=tp.leksjoner.flatMap(lk=>lessons[lk]||[]);
                      const uniqueWords=[...new Map(allWords.map(w=>[w.k,w])).values()];
                      const hasWords=uniqueWords.length>0;
                      const pct=tp.leksjoner.reduce((acc,lk)=>acc+getLessonProgress(lk),0)/tp.leksjoner.length;
                      return (
                        <div key={tp.id} style={{background:C.bg2,border:`1px solid ${hasWords?C.gold+"44":C.border2}`,borderRadius:10,padding:"12px 14px",opacity:hasWords?1:0.45}}>
                          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                            <div>
                              <div style={{fontSize:fs?15:13,fontWeight:600,color:hasWords?C.text:C.textMid}}>{tp.label}</div>
                              <div style={{fontSize:10,color:C.textDim,marginTop:2}}>
                                {hasWords?`${uniqueWords.length} ord · L${tp.leksjoner.join(", ")}`:"-"}
                              </div>
                            </div>
                            {hasWords&&pct>0&&<div style={{fontSize:11,color:C.gold}}>{Math.round(pct)}%</div>}
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
              </div>
              {[
                {id:"A2.1",label:"A2.1",pairs:[
                  {id:"A2.1-T2",label:"Time 3–4",lk:"a2.1-3-4"},
                  {id:"A2.1-T3",label:"Time 5–6",lk:"a2.1-5-6"},
                  {id:"A2.1-T4",label:"Time 7–8",lk:"a2.1-7-8"},
                  {id:"A2.1-T5",label:"Time 9–10",lk:"a2.1-9-10"},
                ]},
                {id:"A2.2",label:"A2.2",pairs:[
                  {id:"A2.2-T1",label:"Time 1–2",lk:"a2.2-1-2"},
                  {id:"A2.2-T2",label:"Time 3–4",lk:"a2.2-3-4"},
                  {id:"A2.2-T3",label:"Time 5–6",lk:"a2.2-5-6"},
                  {id:"A2.2-T4",label:"Time 7–8",lk:"a2.2-7-8"},
                  {id:"A2.2-T5",label:"Time 9–10",lk:"a2.2-9-10"},
                ]},
                {id:"A2.3",label:"A2.3",pairs:[
                  {id:"A2.3-T1",label:"Time 1–2",lk:"a2.3-1-2"},
                  {id:"A2.3-T3",label:"Time 5–6",lk:"a2.3-5-6"},
                ]},
              ].map(modul=>(
                <div key={modul.id} style={{marginTop:12}}>
                  <div style={{fontSize:fs?15:13,fontWeight:700,color:C.gold,marginBottom:8}}>{modul.label}</div>
                  <div style={{display:"flex",flexDirection:"column",gap:6}}>
                    {modul.pairs.map(tp=>{
                      const words=[...new Map((lessons[tp.lk]||[]).map(w=>[w.k,w])).values()];
                      const hasWords=words.length>0;
                      const pct=getLessonProgress(tp.lk);
                      return (
                        <div key={tp.id} style={{background:C.bg2,border:`1px solid ${hasWords?C.gold+"44":C.border2}`,borderRadius:10,padding:"12px 14px",opacity:hasWords?1:0.45}}>
                          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                            <div>
                              <div style={{fontSize:fs?15:13,fontWeight:600,color:hasWords?C.text:C.textMid}}>{tp.label}</div>
                              <div style={{fontSize:10,color:C.textDim,marginTop:2}}>{hasWords?`${words.length} ord`:"-"}</div>
                            </div>
                            {hasWords&&pct>0&&<div style={{fontSize:11,color:C.gold}}>{pct}%</div>}
                          </div>
                          {hasWords&&(
                            <div style={{display:"flex",gap:6,marginTop:10}}>
                              <button style={{flex:1,padding:fs?"10px":"8px",borderRadius:8,border:`1px solid ${C.gold}55`,background:`${C.gold}11`,color:C.gold,fontSize:fs?13:11,cursor:"pointer",fontFamily:"'Noto Serif JP',serif"}}
                                onClick={()=>{setStudyLesson(words);setSelectedLesson(tp.id);setScreen("study");}}>
                                📚 Les
                              </button>
                              {VOCAB_ACTIVITIES.map(act=>(
                                <button key={act.id} style={{flex:1,padding:fs?"10px":"8px",borderRadius:8,border:`1px solid ${C[act.color]}55`,background:`${C[act.color]}11`,color:C[act.color],fontSize:fs?13:11,cursor:"pointer",fontFamily:"'Noto Serif JP',serif"}}
                                  onClick={()=>{setSelectedLesson(tp.id);lockedOptions.current={};const pool=buildSRPool([...words]);setQuizWords(pool);setQIdx(0);setScore(0);setSelected(null);setFlashFlipped(false);setWriteVal("");setWriteResult(null);setShowRomaji(false);setSessionCorrect(0);setSelectedActivity(act.id);setScreen("quiz");}}>
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
              ))}
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
                    <span style={{fontFamily:ROMAJI_FONT,fontSize:fs?15:13,color:C.textMid,fontWeight:600}}>{w.r}</span>
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
