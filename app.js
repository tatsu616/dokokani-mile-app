// 東京（羽田）発 JAL「どこかにマイル」対象 全6エリア・35空港データ
// セイバー運賃（早期割引実勢目安）・フレックス（普通/直前運賃目安）・通常特典航空券（基本マイル）基準

const AREA_META = {
  "北海道": {
    color: "#0284c7",
    bgLight: "#e0f2fe",
    aircraft: "A350-900 / B787 / B767 / B737",
    desc: "新千歳・函館から道東（女満別・釧路・帯広）・旭川まで全6空港。女満別・釧路は往復5万円超の超大当たり枠！"
  },
  "東北": {
    color: "#0d9488",
    bgLight: "#ccfbf1",
    aircraft: "B737-800 / E190（J-AIR）",
    desc: "新幹線と競合する青森・三沢・秋田・山形の4空港。フライト約1時間で東北の秘湯・絶景・グルメへ直行！"
  },
  "中部・北陸・近畿": {
    color: "#4f46e5",
    bgLight: "#e0e7ff",
    aircraft: "B787 / B767 / B737",
    desc: "小松・名古屋（中部）・伊丹・関西・南紀白浜の5空港。パンダと温泉の南紀白浜は隠れた人気リゾート枠！"
  },
  "中国・四国": {
    color: "#d97706",
    bgLight: "#fef3c7",
    aircraft: "B767 / B737-800",
    desc: "出雲・広島・岡山・山口宇部と四国4県（高松・徳島・松山・高知）の全8空港。瀬戸内グルメや出雲大社参拝に最適！"
  },
  "九州・奄美": {
    color: "#e11d48",
    bgLight: "#ffe4e6",
    aircraft: "A350-900 / B787 / B767 / B737",
    desc: "福岡・長崎・熊本・大分・宮崎・鹿児島・北九州に加え、世界自然遺産の「奄美大島」直行便も対象の大人気エリア！"
  },
  "沖縄・先島": {
    color: "#9333ea",
    bgLight: "#f3e8ff",
    aircraft: "A350-900 / B787 / B767 / B737",
    desc: "那覇・久米島（夏期）・宮古・石垣の4空港。通常往復19,000〜21,000マイル必要な南国リゾートが7,000マイルになるSSRゾーン！"
  }
};

const AIRPORTS = [
  // ① 北海道エリア（6空港）
  {
    id: "mmb", code: "MMB", area: "北海道", order: 1, name: "女満別", pref: "北海道（道東）",
    distMiles: 609, mins: 105, flights: "1日3往復",
    saverOneWay: 25800, flexOneWay: 47800, stdAwardRound: 17000,
    tags: ["知床世界遺産", "網走監獄", "流氷・オホーツク", "超大当たり"],
    tip: "知床・網走・屈斜路湖への玄関口！通常運賃が非常に高く、当たれば1マイル＝7円超のSSR枠"
  },
  {
    id: "kuh", code: "KUH", area: "北海道", order: 2, name: "釧路", pref: "北海道（道東）",
    distMiles: 555, mins: 100, flights: "1日3往復",
    saverOneWay: 24900, flexOneWay: 46500, stdAwardRound: 17000,
    tags: ["釧路湿原", "阿寒湖温泉", "和商市場（勝手丼）", "超大当たり"],
    tip: "たんちょう釧路空港。釧路湿原ノロッコ号や阿寒湖温泉、炉端焼き・海鮮グルメが絶品"
  },
  {
    id: "akj", code: "AKJ", area: "北海道", order: 3, name: "旭川", pref: "北海道（道北）",
    distMiles: 576, mins: 100, flights: "1日4往復",
    saverOneWay: 23500, flexOneWay: 45200, stdAwardRound: 17000,
    tags: ["旭山動物園", "富良野・美瑛", "旭川ラーメン", "大当たり"],
    tip: "就航率99%を誇る雪に強い空港！美瑛の青い池・富良野・層雲峡温泉へのドライブ拠点に最高"
  },
  {
    id: "obo", code: "OBO", area: "北海道", order: 4, name: "帯広", pref: "北海道（十勝）",
    distMiles: 526, mins: 95, flights: "1日4往復",
    saverOneWay: 23200, flexOneWay: 44600, stdAwardRound: 17000,
    tags: ["十勝豚丼", "六花亭・スイーツ", "モール温泉", "大当たり"],
    tip: "十勝川温泉（植物性モール温泉）や豚丼・六花亭本店などグルメ満足度が北海道屈指"
  },
  {
    id: "cts", code: "CTS", area: "北海道", order: 5, name: "札幌（新千歳）", pref: "北海道（道央）",
    distMiles: 510, mins: 95, flights: "1日16往復",
    saverOneWay: 18800, flexOneWay: 41500, stdAwardRound: 17000,
    tags: ["A350主力路線", "札幌・小樽・登別", "空港グルメ＆温泉"],
    tip: "最新鋭A350-900が多く投入される幹線！空港内のグルメ・温泉だけでも1日遊べる人気枠"
  },
  {
    id: "hkd", code: "HKD", area: "北海道", order: 6, name: "函館", pref: "北海道（道南）",
    distMiles: 424, mins: 80, flights: "1日3往復",
    saverOneWay: 19400, flexOneWay: 38600, stdAwardRound: 15000,
    tags: ["函館山夜景", "五稜郭", "湯の川温泉", "朝市海鮮"],
    tip: "空港から湯の川温泉まで車で約10分・函館駅まで約20分とアクセス抜群！車なし旅にも最適"
  },

  // ② 東北エリア（4空港）
  {
    id: "aoj", code: "AOJ", area: "東北", order: 1, name: "青森", pref: "青森県",
    distMiles: 358, mins: 75, flights: "1日6往復",
    saverOneWay: 16200, flexOneWay: 34200, stdAwardRound: 15000,
    tags: ["ねぶたの家", "弘前城", "酸ヶ湯温泉", "青森魚菜センター"],
    tip: "新幹線で3時間かかる青森へわずか75分！ねぶた・弘前・八甲田山への周遊に便利"
  },
  {
    id: "msj", code: "MSJ", area: "東北", order: 2, name: "三沢", pref: "青森県",
    distMiles: 355, mins: 75, flights: "1日4往復",
    saverOneWay: 16500, flexOneWay: 34800, stdAwardRound: 15000,
    tags: ["奥入瀬渓流", "十和田湖", "星野リゾート青森屋", "三沢航空科学館"],
    tip: "大人気の「星野リゾート 青森屋」や奥入瀬渓流・八戸エリアへの拠点として実は超優秀！"
  },
  {
    id: "axt", code: "AXT", area: "東北", order: 3, name: "秋田", pref: "秋田県",
    distMiles: 279, mins: 65, flights: "1日4往復",
    saverOneWay: 15400, flexOneWay: 31800, stdAwardRound: 15000,
    tags: ["角館・田沢湖", "乳頭温泉郷", "男鹿なまはげ", "きりたんぽ"],
    tip: "秋田新幹線だと約3時間50分かかるところ飛行機なら65分！時間短縮効果が非常に大きい路線"
  },
  {
    id: "gaj", code: "GAJ", area: "東北", order: 4, name: "山形", pref: "山形県",
    distMiles: 190, mins: 60, flights: "1日2往復",
    saverOneWay: 13200, flexOneWay: 25600, stdAwardRound: 13000,
    tags: ["銀山温泉", "蔵王温泉", "山寺", "さくらんぼ東根"],
    tip: "おいしい山形空港。空港から銀山温泉・蔵王・山寺へのアクセスが良くレンタカー旅に最適"
  },

  // ③ 中部・北陸・近畿エリア（5空港）
  {
    id: "kmq", code: "KMQ", area: "中部・北陸・近畿", order: 1, name: "小松", pref: "石川県",
    distMiles: 211, mins: 60, flights: "1日4往復",
    saverOneWay: 12800, flexOneWay: 26800, stdAwardRound: 13000,
    tags: ["金沢・兼六園", "加賀温泉郷", "近江町市場", "永平寺・恐竜博物館"],
    tip: "金沢市内へリムジンバスで約40分、山代・山中・片山津の加賀温泉郷へもすぐの好立地"
  },
  {
    id: "ngo", code: "NGO", area: "中部・北陸・近畿", order: 2, name: "名古屋（中部）", pref: "愛知県",
    distMiles: 193, mins: 60, flights: "1日2往復",
    saverOneWay: 11200, flexOneWay: 23400, stdAwardRound: 11000,
    tags: ["セントレア空港体験", "伊勢神宮アクセス", "名古屋めし", "近距離注意"],
    tip: "全35空港で最も近い空港。フライト・オブ・ドリームズ見学や高速船で津・伊勢志摩へ抜けるのも◎"
  },
  {
    id: "itm", code: "ITM", area: "中部・北陸・近畿", order: 3, name: "大阪（伊丹）", pref: "大阪府・兵庫県",
    distMiles: 280, mins: 65, flights: "1日15往復",
    saverOneWay: 12600, flexOneWay: 27600, stdAwardRound: 13000,
    tags: ["大阪・京都・神戸", "USJ", "A350運航便あり", "市街地至近"],
    tip: "梅田・なんば・京都へリムジンバス直結！便数が多くスケジュール自由度が抜群の幹線"
  },
  {
    id: "kix", code: "KIX", area: "中部・北陸・近畿", order: 4, name: "大阪（関西）", pref: "大阪府",
    distMiles: 280, mins: 75, flights: "1日3往復",
    saverOneWay: 12600, flexOneWay: 27600, stdAwardRound: 13000,
    tags: ["和歌山・高野山", "堺・泉州", "りんくうアウトレット", "なんば特急ラピート"],
    tip: "難波へラピートで34分！和歌山・高野山・淡路島方面へのドライブ拠点としても便利"
  },
  {
    id: "shm", code: "SHM", area: "中部・北陸・近畿", order: 5, name: "南紀白浜", pref: "和歌山県",
    distMiles: 303, mins: 70, flights: "1日3往復",
    saverOneWay: 16800, flexOneWay: 33800, stdAwardRound: 13000,
    tags: ["白良浜ビーチ", "アドベンチャーワールド", "白浜温泉", "熊野古道"],
    tip: "どこかにマイルの隠れた大人気リゾート！空港から白浜温泉・海・テーマパークまで車で5〜10分"
  },

  // ④ 中国・四国エリア（8空港）
  {
    id: "okj", code: "OKJ", area: "中国・四国", order: 1, name: "岡山", pref: "岡山県",
    distMiles: 356, mins: 75, flights: "1日5往復",
    saverOneWay: 15800, flexOneWay: 34600, stdAwardRound: 15000,
    tags: ["倉敷美観地区", "後楽園・岡山城", "直島・瀬戸内アート", "フルーツ王国"],
    tip: "岡山桃太郎空港。倉敷美観地区や直島（宇野港）、さらには四国・香川方面へも出やすい万能拠点"
  },
  {
    id: "izo", code: "IZO", area: "中国・四国", order: 2, name: "出雲", pref: "島根県",
    distMiles: 405, mins: 85, flights: "1日5往復",
    saverOneWay: 18600, flexOneWay: 37800, stdAwardRound: 15000,
    tags: ["出雲大社", "玉造温泉", "松江城・宍道湖", "出雲そば", "大当たり"],
    tip: "出雲縁結び空港！寝台特急サンライズ出雲でも人気の聖地へ85分。玉造温泉と出雲大社巡りに最高"
  },
  {
    id: "hij", code: "HIJ", area: "中国・四国", order: 3, name: "広島", pref: "広島県",
    distMiles: 414, mins: 85, flights: "1日8往復",
    saverOneWay: 16400, flexOneWay: 35800, stdAwardRound: 15000,
    tags: ["厳島神社（宮島）", "尾道・しまなみ海道", "お好み焼き・牡蠣", "竹原"],
    tip: "広島市内・宮島はもちろん、空港から尾道・しまなみ海道や竹原（安芸の小京都）へも好アクセス"
  },
  {
    id: "ubj", code: "UBJ", area: "中国・四国", order: 4, name: "山口宇部", pref: "山口県",
    distMiles: 510, mins: 95, flights: "1日4往復",
    saverOneWay: 18200, flexOneWay: 38800, stdAwardRound: 15000,
    tags: ["角島大橋", "元乃隅神社", "秋吉台・萩", "下関ふぐ・瓦そば"],
    tip: "絶景の角島大橋・元乃隅神社や長門湯本温泉（星野リゾート界 長門）、下関・門司港レトロへも回れる"
  },
  {
    id: "tks", code: "TKS", area: "中国・四国", order: 5, name: "徳島", pref: "徳島県",
    distMiles: 329, mins: 75, flights: "1日7往復",
    saverOneWay: 16200, flexOneWay: 34400, stdAwardRound: 15000,
    tags: ["大塚国際美術館", "鳴門の渦潮", "徳島ラーメン", "淡路島アクセス"],
    tip: "徳島阿波おどり空港。世界の名画が揃う「大塚国際美術館」や鳴門の渦潮、淡路島ドライブに大人気"
  },
  {
    id: "tak", code: "TAK", area: "中国・四国", order: 6, name: "高松", pref: "香川県",
    distMiles: 354, mins: 80, flights: "1日7往復",
    saverOneWay: 16200, flexOneWay: 34800, stdAwardRound: 15000,
    tags: ["讃岐うどん巡り", "金刀比羅宮", "栗林公園", "小豆島・直島"],
    tip: "うどん県への直行便！こんぴらさん参拝＆琴平温泉、フェリーで小豆島・直島へ渡る島旅にも最適"
  },
  {
    id: "kcz", code: "KCZ", area: "中国・四国", order: 7, name: "高知", pref: "高知県",
    distMiles: 393, mins: 80, flights: "1日5往復",
    saverOneWay: 18400, flexOneWay: 37400, stdAwardRound: 15000,
    tags: ["ひろめ市場・カツオ藁焼き", "桂浜", "仁淀ブルー", "四万十川"],
    tip: "高知龍馬空港。夜の「ひろめ市場」で食べる塩タタキと地酒は感動もの！鉄道だと遠いため飛行機が圧倒的お得"
  },
  {
    id: "myj", code: "MYJ", area: "中国・四国", order: 8, name: "松山", pref: "愛媛県",
    distMiles: 438, mins: 85, flights: "1日6往復",
    saverOneWay: 17800, flexOneWay: 37200, stdAwardRound: 15000,
    tags: ["道後温泉本館", "松山城", "下灘駅", "宇和島鯛めし"],
    tip: "日本最古の名湯・道後温泉へバス直結！夕日の絶景駅「下灘駅」や鯛めし・みかんジュース蛇口も楽しい"
  },

  // ⑤ 九州・奄美エリア（8空港）
  {
    id: "fuk", code: "FUK", area: "九州・奄美", order: 1, name: "福岡", pref: "福岡県",
    distMiles: 567, mins: 110, flights: "1日17往復",
    saverOneWay: 19200, flexOneWay: 42800, stdAwardRound: 17000,
    tags: ["博多駅まで地下鉄5分", "もつ鍋・屋台・とんこつ", "太宰府天満宮", "A350幹線"],
    tip: "空港から博多駅まで地下鉄5分・天神まで11分の日本一便利な空港！グルメ旅なら大当たり枠"
  },
  {
    id: "kkj", code: "KKJ", area: "九州・奄美", order: 2, name: "北九州", pref: "福岡県",
    distMiles: 534, mins: 105, flights: "1日5往復",
    saverOneWay: 17600, flexOneWay: 39800, stdAwardRound: 15000,
    tags: ["門司港レトロ", "小倉グルメ・旦過市場", "皿倉山夜景", "下関・唐戸市場"],
    tip: "海上空港で夜遅い便も充実。門司港レトロの焼きカレーや連絡船で5分の下関・唐戸市場寿司が最高"
  },
  {
    id: "oit", code: "OIT", area: "九州・奄美", order: 3, name: "大分", pref: "大分県",
    distMiles: 499, mins: 100, flights: "1日6往復",
    saverOneWay: 18600, flexOneWay: 39600, stdAwardRound: 15000,
    tags: ["別府温泉郷", "由布院温泉", "関アジ・関サバ・とり天", "地獄めぐり"],
    tip: "おんせん県おおいた！空港から別府・湯布院へ直通バスあり。温泉好きにはたまらない当たり枠"
  },
  {
    id: "ngs", code: "NGS", area: "九州・奄美", order: 4, name: "長崎", pref: "長崎県",
    distMiles: 610, mins: 115, flights: "1日6往復",
    saverOneWay: 21400, flexOneWay: 44800, stdAwardRound: 17000,
    tags: ["稲佐山夜景", "ハウステンボス", "雲仙温泉", "ちゃんぽん・佐世保", "大当たり"],
    tip: "世界新三大夜景の長崎市内やハウステンボス（空港から高速船・バス直結）、雲仙温泉まで見どころ満載"
  },
  {
    id: "kmj", code: "KMJ", area: "九州・奄美", order: 5, name: "熊本", pref: "熊本県",
    distMiles: 568, mins: 110, flights: "1日8往復",
    saverOneWay: 20400, flexOneWay: 43600, stdAwardRound: 17000,
    tags: ["阿蘇カルデラ・草千里", "黒川温泉", "熊本城", "馬刺し・あか牛丼", "大当たり"],
    tip: "新しくなった阿蘇くまもと空港！阿蘇ドライブ・黒川温泉・天草イルカウォッチングの拠点に抜群"
  },
  {
    id: "kmi", code: "KMI", area: "九州・奄美", order: 6, name: "宮崎", pref: "宮崎県",
    distMiles: 561, mins: 105, flights: "1日6往復",
    saverOneWay: 20200, flexOneWay: 43200, stdAwardRound: 17000,
    tags: ["高千穂峡", "青島神社・日南海岸", "チキン南蛮・宮崎牛・地鶏", "大当たり"],
    tip: "宮崎ブーゲンビリア空港。JR宮崎駅まで電車で10分！日南海岸ドライブや高千穂峡、絶品グルメが充実"
  },
  {
    id: "koj", code: "KOJ", area: "九州・奄美", order: 7, name: "鹿児島", pref: "鹿児島県",
    distMiles: 601, mins: 115, flights: "1日8往復",
    saverOneWay: 20800, flexOneWay: 44200, stdAwardRound: 17000,
    tags: ["桜島", "指宿砂むし温泉", "霧島温泉・霧島神宮", "黒豚・しろくま", "大当たり"],
    tip: "霧島温泉郷へ車で約30分！桜島フェリーや指宿の砂むし温泉、黒豚しゃぶしゃぶ・芋焼酎を堪能"
  },
  {
    id: "asj", code: "ASJ", area: "九州・奄美", order: 8, name: "奄美大島", pref: "鹿児島県（奄美）",
    distMiles: 789, mins: 145, flights: "1日1往復",
    saverOneWay: 27400, flexOneWay: 51200, stdAwardRound: 19000,
    tags: ["世界自然遺産", "マングローブカヌー", "アマミブルーの海", "鶏飯", "超大当たり"],
    tip: "羽田から1日1往復の超プレミアム直行便！通常特典19,000マイル・有償往復5.4万円超のSSR離島枠"
  },

  // ⑥ 沖縄・先島エリア（4空港）
  {
    id: "oka", code: "OKA", area: "沖縄・先島", order: 1, name: "沖縄（那覇）", pref: "沖縄県（本島）",
    distMiles: 984, mins: 165, flights: "1日12往復",
    saverOneWay: 22800, flexOneWay: 48600, stdAwardRound: 19000,
    tags: ["美ら海水族館", "国際通り・首里城", "慶良間ブルー", "A350主力", "大当たり"],
    tip: "通常特典航空券なら往復19,000マイル〜必要な那覇路線が7,000マイル！便数も多く冬でも暖かい王道枠"
  },
  {
    id: "ueo", code: "UEO", area: "沖縄・先島", order: 2, name: "久米島", pref: "沖縄県（離島）",
    distMiles: 1020, mins: 170, flights: "夏期直行便（7〜8月）", seasonal: "夏期限定",
    saverOneWay: 27200, flexOneWay: 52400, stdAwardRound: 19000,
    tags: ["はての浜", "ウミガメ館", "海洋深層水スパ", "車エビ", "超大当たり"],
    tip: "夏季（7〜8月頃）のみ羽田直行便が運航されるレア離島！360度エメラルドグリーンの「はての浜」は一生モノの絶景"
  },
  {
    id: "mmy", code: "MMY", area: "沖縄・先島", order: 3, name: "宮古", pref: "沖縄県（宮古島）",
    distMiles: 1158, mins: 185, flights: "1日1往復",
    saverOneWay: 29400, flexOneWay: 56800, stdAwardRound: 21000,
    tags: ["宮古ブルー・与那覇前浜", "伊良部大橋", "ウミガメシュノーケル", "全空港2位SSR"],
    tip: "全35空港お得度No.2！通常特典なら往復21,000マイル（3倍）必要な東洋一美しい海へ直行3時間"
  },
  {
    id: "isg", code: "ISG", area: "沖縄・先島", order: 4, name: "石垣", pref: "沖縄県（八重山）",
    distMiles: 1224, mins: 195, flights: "1日2往復",
    saverOneWay: 30800, flexOneWay: 59400, stdAwardRound: 21000,
    tags: ["川平湾・マンタ", "竹富島・西表島", "石垣牛", "全35空港1位SSR"],
    tip: "堂々の全35空港お得度No.1（羽田から1,224マイル）！通常特典21,000マイルが7,000マイルになる最強SSR枠"
  }
];

// 状態管理
const state = {
  plan: "saver",      // "saver" (7000m), "flex" (7000m), "southern" (6000m)
  view: "by-area",    // "by-area", "ranking", "map"
  areaFilter: "all",
  searchQuery: "",
  sortBy: "area",     // "area", "fare-desc", "fare-asc", "miles-desc", "dist-desc", "time-asc"
  selectedIds: [],    // 最大4空港
  winnerId: null,     // 4空港から1空港抽選された決定空港ID
  showAllMapLabels: false,
  // 地図の拡大縮小・パン状態（基準座標系: 640 x 780）
  mapZoom: 1.0,
  mapCenterX: 320,
  mapCenterY: 390
};

// ドラッグ操作とクリック操作の判別フラグ
let mapDragState = {
  isDown: false,
  hasDragged: false,
  startX: 0,
  startY: 0,
  startCenterX: 320,
  startCenterY: 390,
  activeSvg: null
};

const PLAN_CONFIG = {
  saver: {
    name: "セイバー運賃比較（7,000マイル）",
    miles: 7000,
    fareLabel: "セイバー（早期割引）",
    useFlex: false
  },
  flex: {
    name: "直前・フレックス運賃比較（7,000マイル）",
    miles: 7000,
    fareLabel: "フレックス（普通/直前）",
    useFlex: true
  },
  southern: {
    name: "キャンペーン・6,000マイル換算",
    miles: 6000,
    fareLabel: "セイバー（6,000マイル時）",
    useFlex: false
  }
};

// 空港ごとの計算値を取得
function computeAirportMetrics(ap, planKey = state.plan) {
  const plan = PLAN_CONFIG[planKey];
  const oneWay = plan.useFlex ? ap.flexOneWay : ap.saverOneWay;
  const roundTrip = oneWay * 2;
  const mileValue = roundTrip / plan.miles; // 1マイルあたりの価値（円/マイル）
  const savedMiles = ap.stdAwardRound - plan.miles; // 節約できたマイル数
  const mileSaveRate = (savedMiles / ap.stdAwardRound) * 100; // マイル削減率(%)
  // 1マイル=1円換算時のお得額（円換算メリット）
  const cashSavings = roundTrip - plan.miles;
  const cashDiscountRate = (cashSavings / roundTrip) * 100;

  // お得度ランク判定（セイバー往復運賃＆距離ベース）
  const baseSaverRound = ap.saverOneWay * 2;
  let rank = "B";
  let rankLabel = "B 安定お得";
  if (baseSaverRound >= 48000) {
    rank = "SS";
    rankLabel = "SS 超大当たり";
  } else if (baseSaverRound >= 40000) {
    rank = "S";
    rankLabel = "S 大当たり";
  } else if (baseSaverRound >= 32000) {
    rank = "A";
    rankLabel = "A 当たり";
  } else if (baseSaverRound >= 26000) {
    rank = "B";
    rankLabel = "B 中距離";
  } else {
    rank = "C";
    rankLabel = "C 近距離";
  }

  return {
    ...ap,
    activeOneWay: oneWay,
    activeRoundTrip: roundTrip,
    mileValue,
    savedMiles,
    mileSaveRate,
    cashSavings,
    cashDiscountRate,
    rank,
    rankLabel
  };
}

// 数値フォーマット
function fmtYen(n) {
  return n.toLocaleString("ja-JP") + "円";
}

function fmtMiles(n) {
  return n.toLocaleString("ja-JP") + "マイル";
}

function fmtMins(mins) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h > 0 ? `約${h}時間${m > 0 ? m + "分" : ""}` : `約${m}分`;
}

// 現在のズーム・中心座標からSVGのviewBox文字列を計算
function getMapViewBox() {
  const z = Math.max(1.0, Math.min(4.0, state.mapZoom));
  const vw = 640 / z;
  const vh = 780 / z;
  const minCx = vw / 2;
  const maxCx = 640 - vw / 2;
  const minCy = vh / 2;
  const maxCy = 780 - vh / 2;

  state.mapCenterX = Math.max(minCx, Math.min(maxCx, state.mapCenterX));
  state.mapCenterY = Math.max(minCy, Math.min(maxCy, state.mapCenterY));

  const vx = (state.mapCenterX - vw / 2).toFixed(1);
  const vy = (state.mapCenterY - vh / 2).toFixed(1);
  return `${vx} ${vy} ${vw.toFixed(1)} ${vh.toFixed(1)}`;
}

// 画面内の全SVGマップのviewBoxとズーム表示を即時同期
function syncMapViewportDom() {
  const vb = getMapViewBox();
  const zPct = Math.round(state.mapZoom * 100) + "%";
  const isZoomed = state.mapZoom > 1.01;

  document.querySelectorAll(".geo-svg").forEach(svg => {
    svg.setAttribute("viewBox", vb);
    svg.classList.toggle("is-zoomed", isZoomed);
  });
  document.querySelectorAll(".map-zoom-level").forEach(el => {
    el.textContent = zPct;
  });
  document.querySelectorAll(".map-zoom-in-btn").forEach(btn => {
    btn.disabled = state.mapZoom >= 4.0;
  });
  document.querySelectorAll(".map-zoom-out-btn").forEach(btn => {
    btn.disabled = state.mapZoom <= 1.0;
  });
  document.querySelectorAll(".map-pan-hint").forEach(el => {
    el.classList.toggle("visible", isZoomed);
  });
}

// ＋ / ー ボタンによる拡大縮小
function changeMapZoom(delta) {
  const next = Math.round((state.mapZoom + delta) * 10) / 10;
  state.mapZoom = Math.max(1.0, Math.min(4.0, next));
  if (state.mapZoom <= 1.0) {
    state.mapCenterX = 320;
    state.mapCenterY = 390;
  }
  syncMapViewportDom();
}

// ズーム・位置リセット
function resetMapZoom() {
  state.mapZoom = 1.0;
  state.mapCenterX = 320;
  state.mapCenterY = 390;
  syncMapViewportDom();
}

// 地図上の空港クリック（ドラッグ直後の誤クリックを防止）
function handleMapAirportClick(event, apId) {
  if (mapDragState.hasDragged) {
    event.stopPropagation();
    return;
  }
  hideAirportTooltip();
  toggleSelectAirport(apId);
}

// 空港ホバーポップアップ（ツールチップ）要素の取得・生成
function getTooltipEl() {
  let el = document.getElementById("map-station-tooltip");
  if (!el) {
    el = document.createElement("div");
    el.id = "map-station-tooltip";
    el.className = "map-station-tooltip";
    document.body.appendChild(el);
  }
  return el;
}

// 空港にマウスカーソルが乗った時のポップアップ表示
function showAirportTooltip(event, apId) {
  if (mapDragState.isDown) return;
  const el = getTooltipEl();

  if (apId === "hnd") {
    el.innerHTML = `
      <div class="tooltip-header">
        <span class="tooltip-st-name">✈️ 東京（羽田空港 HND）</span>
        <span class="tooltip-line-badge" style="background:#c8102e;">出発空港</span>
      </div>
      <div style="font-size:0.74rem; color:#cbd5e1;">JAL「どこかにマイル」（往復7,000マイル）の拠点空港。全国35空港へ直行便が就航！</div>
    `;
    el.classList.add("visible");
    moveAirportTooltip(event);
    return;
  }

  const rawAp = AIRPORTS.find(a => a.id === apId);
  if (!rawAp) return;
  const ap = computeAirportMetrics(rawAp, state.plan);
  const areaColor = AREA_META[ap.area].color;
  const selIdx = state.selectedIds.indexOf(ap.id);

  el.innerHTML = `
    <div class="tooltip-header">
      <span class="tooltip-st-name">
        ${selIdx >= 0 ? `【候補${selIdx + 1}】` : ""}${ap.name}空港 (${ap.code})
      </span>
      <span class="tooltip-line-badge" style="background:${areaColor};">${ap.area}</span>
    </div>
    <div class="tooltip-price-row">
      <span style="color:#e2e8f0; font-size:0.73rem;">往復運賃目安</span>
      <span style="font-weight:900; font-size:0.92rem; color:#fff;">
        ${fmtYen(ap.activeRoundTrip)}
        <span style="color:#fbbf24; font-size:0.78rem; margin-left:4px;">(1m=${ap.mileValue.toFixed(1)}円)</span>
      </span>
    </div>
    <div style="font-size:0.72rem; color:#86efac; margin-bottom:3px;">
      🎫 通常特典: 往復${ap.stdAwardRound.toLocaleString()}m → <strong>${ap.savedMiles.toLocaleString()}m節約 (${ap.mileSaveRate.toFixed(0)}%OFF)</strong>
    </div>
    <div class="tooltip-meta">
      <span>📍 ${ap.pref}（${ap.distMiles}マイル）</span>
      <span>⏱ ${fmtMins(ap.mins)}</span>
    </div>
  `;
  el.classList.add("visible");
  moveAirportTooltip(event);
}

// マウス移動に伴うポップアップ位置の追従
function moveAirportTooltip(event) {
  const el = document.getElementById("map-station-tooltip");
  if (!el || !el.classList.contains("visible")) return;
  const x = Math.max(110, Math.min(window.innerWidth - 110, event.clientX));
  const y = Math.max(90, event.clientY);
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
}

// ポップアップ非表示
function hideAirportTooltip() {
  const el = document.getElementById("map-station-tooltip");
  if (el) el.classList.remove("visible");
}

// 羽田空港から各空港への美しい弧（二次ベジェ曲線）のSVGパスを生成
function getFlightArcPath(targetId) {
  const hnd = AIRPORT_GEO["hnd"];
  const dest = AIRPORT_GEO[targetId];
  if (!hnd || !dest) return "";

  const mx = (hnd.x + dest.x) / 2;
  const my = (hnd.y + dest.y) / 2;
  const dx = dest.x - hnd.x;
  const dy = dest.y - hnd.y;
  const dist = Math.hypot(dx, dy) || 1;

  // 北行きと西・南行きで自然なカーブ方向を設定
  const curveAmt = Math.min(55, dist * 0.16);
  const nx = -dy / dist;
  const ny = dx / dist;
  const sign = dest.x < hnd.x ? -1 : 1;
  const cx = (mx + nx * curveAmt * sign).toFixed(1);
  const cy = (my + ny * curveAmt * sign).toFixed(1);

  return `M${hnd.x},${hnd.y} Q${cx},${cy} ${dest.x},${dest.y}`;
}

// フィルタ＆ソート済み空港リスト取得
function getFilteredAirports() {
  let list = AIRPORTS.map(a => computeAirportMetrics(a, state.plan));

  if (state.areaFilter !== "all") {
    list = list.filter(a => a.area === state.areaFilter);
  }

  if (state.searchQuery.trim() !== "") {
    const q = state.searchQuery.trim().toLowerCase();
    list = list.filter(a =>
      a.name.toLowerCase().includes(q) ||
      a.code.toLowerCase().includes(q) ||
      a.pref.toLowerCase().includes(q) ||
      a.area.toLowerCase().includes(q) ||
      a.tags.some(t => t.toLowerCase().includes(q)) ||
      a.tip.toLowerCase().includes(q)
    );
  }

  // ソート
  list.sort((a, b) => {
    switch (state.sortBy) {
      case "fare-desc":
        return b.activeRoundTrip - a.activeRoundTrip || b.distMiles - a.distMiles;
      case "fare-asc":
        return a.activeRoundTrip - b.activeRoundTrip || a.distMiles - b.distMiles;
      case "miles-desc":
        return b.stdAwardRound - a.stdAwardRound || b.activeRoundTrip - a.activeRoundTrip;
      case "dist-desc":
        return b.distMiles - a.distMiles;
      case "time-asc":
        return a.mins - b.mins;
      case "area":
      default:
        const areaOrder = ["北海道", "東北", "中部・北陸・近畿", "中国・四国", "九州・奄美", "沖縄・先島"];
        const aa = areaOrder.indexOf(a.area);
        const ab = areaOrder.indexOf(b.area);
        if (aa !== ab) return aa - ab;
        return a.order - b.order;
    }
  });

  return list;
}

// 全35空港中の料金順位マップを計算
function getFareRankMap() {
  const sorted = [...AIRPORTS]
    .map(a => computeAirportMetrics(a, state.plan))
    .sort((a, b) => b.activeRoundTrip - a.activeRoundTrip);
  const rankMap = {};
  let currentRank = 1;
  sorted.forEach((a, idx) => {
    if (idx > 0 && a.activeRoundTrip < sorted[idx - 1].activeRoundTrip) {
      currentRank = idx + 1;
    }
    rankMap[a.id] = currentRank;
  });
  return rankMap;
}

// 4空港シミュレーターへの追加/解除
function toggleSelectAirport(id) {
  const idx = state.selectedIds.indexOf(id);
  if (idx >= 0) {
    state.selectedIds.splice(idx, 1);
  } else {
    if (state.selectedIds.length >= 4) {
      state.selectedIds.shift();
    }
    state.selectedIds.push(id);
  }
  state.winnerId = null;
  renderAll();
}

// ランダム4空港ガチャを引く
function drawRandomGacha() {
  const pool = [...AIRPORTS];
  const picked = [];
  while (picked.length < 4 && pool.length > 0) {
    const r = Math.floor(Math.random() * pool.length);
    picked.push(pool.splice(r, 1)[0].id);
  }
  state.selectedIds = picked;
  state.winnerId = null;
  renderAll();
}

// 4空港から1空港を最終抽選する
function drawFinalWinner() {
  if (state.selectedIds.length === 0) return;
  const r = Math.floor(Math.random() * state.selectedIds.length);
  state.winnerId = state.selectedIds[r];
  renderAll();
}

// 4空港クリア
function clearSimulator() {
  state.selectedIds = [];
  state.winnerId = null;
  renderAll();
}

// JAL公式 どこかにマイル・時刻表URL
const JAL_DOKOKANI_URL = "https://www.jal.co.jp/jp/ja/jmb/dokokani/";
const JAL_TIMETABLE_URL = "https://www.jal.co.jp/jp/ja/dom/route/time/";

function getAirportGuideUrl(airportCode) {
  return `https://www.jal.co.jp/jp/ja/dom/airport/${airportCode.toLowerCase()}/`;
}

// 日本全国SVG地理マップ＋色分けフライト航路図＋拡大縮小UIを生成
function buildGeoMapSvg({ isLarge = false, showAllNames = false } = {}) {
  const selectedAirports = state.selectedIds
    .map(id => AIRPORTS.find(a => a.id === id))
    .filter(Boolean)
    .map(a => computeAirportMetrics(a, state.plan));

  const activeAreas = new Set(selectedAirports.map(a => a.area));
  const hasSelection = selectedAirports.length > 0;

  // 1. 地域ポリゴン＆地域ラベル
  const regionPolys = JAPAN_MAP_REGIONS.map(r => {
    const isSelectedArea = activeAreas.has(r.area);
    const cls = [
      "pref-land",
      r.isTarget ? "target-pref" : "",
      isSelectedArea ? "active-pref" : ""
    ].filter(Boolean).join(" ");
    return `<path d="${r.d}" class="${cls}" />`;
  }).join("");

  const regionLabels = JAPAN_MAP_REGIONS.map(r => {
    return `<text x="${r.lx}" y="${r.ly}" class="pref-label ${r.isTarget ? "target-label" : ""}">${r.name}</text>`;
  }).join("");

  // 南西諸島エリアの区切り破線（鹿児島〜奄美・沖縄・先島）
  const insetDivider = `
    <path d="M24,615 L335,615 L365,645 L365,768" fill="none" stroke="#94a3b8" stroke-width="1.3" stroke-dasharray="5 4" opacity="0.7" />
    <text x="34" y="632" font-size="10.5" font-weight="800" fill="#64748b">🌺 奄美・沖縄・先島諸島エリア</text>
  `;

  // 2. 全35空港へのベースフライトアーク
  const baseFlightArcs = AIRPORTS.map(ap => {
    const pathD = getFlightArcPath(ap.id);
    const color = AREA_META[ap.area].color;
    const isSel = state.selectedIds.includes(ap.id);
    const dimClass = hasSelection && !isSel ? "dimmed" : "";
    return `<path d="${pathD}" class="flight-route-arc ${dimClass}" stroke="${color}" />`;
  }).join("");

  // 3. 選択された4空港へのハイライトフライトアーク（アニメーション破線）
  const activeFlightArcs = selectedAirports.map(ap => {
    const pathD = getFlightArcPath(ap.id);
    const color = state.winnerId === ap.id ? "#f59e0b" : AREA_META[ap.area].color;
    return `<path d="${pathD}" class="flight-route-highlight" stroke="${color}" />`;
  }).join("");

  // 4. 全35空港のドット＆ホバーポップアップ対応
  const majorLandmarks = new Set(["mmb", "cts", "hkd", "aoj", "kmq", "itm", "shm", "izo", "hij", "tak", "fuk", "koj", "asj", "oka", "mmy", "isg"]);
  const allMetrics = AIRPORTS.map(a => computeAirportMetrics(a, state.plan));

  const airportDots = allMetrics.map(ap => {
    const geo = AIRPORT_GEO[ap.id];
    if (!geo) return "";
    const color = AREA_META[ap.area].color;
    const isSel = state.selectedIds.includes(ap.id);
    const r = isSel ? 6.5 : 4.5;
    const showName = showAllNames || (!hasSelection && majorLandmarks.has(ap.id));

    let dx = 7, dy = 3, anchor = "start";
    if (["cts", "hkd", "axt", "kmq", "izo", "fuk", "ngs", "koj", "isg"].includes(ap.id)) {
      dx = -7;
      anchor = "end";
    }

    return `
      <g onclick="handleMapAirportClick(event, '${ap.id}')"
         onmouseenter="showAirportTooltip(event, '${ap.id}')"
         onmousemove="moveAirportTooltip(event)"
         onmouseleave="hideAirportTooltip()"
         style="cursor:pointer;">
        <circle cx="${geo.x}" cy="${geo.y}" r="10" fill="transparent" />
        <circle cx="${geo.x}" cy="${geo.y}" r="${r}" fill="#ffffff" stroke="${color}" stroke-width="${isSel ? 3 : 2.2}" class="map-st-dot" />
        ${showName && !isSel ? `
          <text x="${geo.x + dx}" y="${geo.y + dy}" text-anchor="${anchor}" font-size="10" font-weight="800" fill="#1e293b" stroke="#ffffff" stroke-width="3" paint-order="stroke" style="pointer-events:none;">${ap.name}</text>
        ` : ""}
      </g>
    `;
  }).join("");

  // 5. 出発地：東京（羽田空港 HND）マーカー
  const hndGeo = AIRPORT_GEO["hnd"];
  const originMarker = `
    <g onmouseenter="showAirportTooltip(event, 'hnd')" onmousemove="moveAirportTooltip(event)" onmouseleave="hideAirportTooltip()" style="cursor:pointer;">
      <circle cx="${hndGeo.x}" cy="${hndGeo.y}" r="9.5" fill="#c8102e" stroke="#ffffff" stroke-width="2.5" />
      <circle cx="${hndGeo.x}" cy="${hndGeo.y}" r="3.5" fill="#ffffff" />
      <rect x="${hndGeo.x + 12}" y="${hndGeo.y - 10}" width="78" height="20" rx="5" fill="#182232" />
      <text x="${hndGeo.x + 51}" y="${hndGeo.y + 4}" text-anchor="middle" font-size="10.2" font-weight="800" fill="#ffffff">✈️ 羽田発(HND)</text>
    </g>
  `;

  // 6. 選択された候補空港（最大4空港）の強調ピン＆スマート吹き出しラベル（重なり防止付き）
  const calloutBoxes = [];
  const selectedOverlays = selectedAirports.map((ap, idx) => {
    const geo = AIRPORT_GEO[ap.id];
    if (!geo) return "";
    const color = AREA_META[ap.area].color;
    const isWinner = state.winnerId === ap.id;
    const badgeColor = isWinner ? "#d97706" : color;
    const numStr = idx + 1;

    const placeLeft = geo.x < 300;
    const boxW = isWinner ? 168 : 156;
    const boxH = 40;
    let bx = placeLeft ? Math.max(8, geo.x - boxW - 16) : Math.min(640 - boxW - 8, geo.x + 16);
    if (geo.x < 170) {
      bx = geo.x + 16;
    }
    let by = Math.max(12, Math.min(780 - boxH - 12, geo.y - boxH / 2));

    for (let iter = 0; iter < 8; iter++) {
      let collided = false;
      for (const prev of calloutBoxes) {
        const horizOverlap = Math.abs(bx - prev.bx) < boxW - 8;
        const vertOverlap = Math.abs(by - prev.by) < boxH + 6;
        if (horizOverlap && vertOverlap) {
          by = by >= prev.by ? prev.by + boxH + 7 : prev.by - boxH - 7;
          by = Math.max(10, Math.min(780 - boxH - 10, by));
          collided = true;
        }
      }
      if (!collided) break;
    }
    calloutBoxes.push({ bx, by });

    const anchorX = bx < geo.x ? bx + boxW : bx;
    const anchorY = by + boxH / 2;

    return `
      <g onclick="handleMapAirportClick(event, '${ap.id}')"
         onmouseenter="showAirportTooltip(event, '${ap.id}')"
         onmousemove="moveAirportTooltip(event)"
         onmouseleave="hideAirportTooltip()"
         style="cursor:pointer;">
        <!-- パルスリング -->
        <circle cx="${geo.x}" cy="${geo.y}" r="${isWinner ? 15 : 12}" stroke="${badgeColor}" class="pulse-ring" />
        <!-- 引き出し線 -->
        <line x1="${geo.x}" y1="${geo.y}" x2="${anchorX}" y2="${anchorY}" stroke="${badgeColor}" stroke-width="2" stroke-dasharray="3 2" />
        <!-- 空港上の番号ピン -->
        <circle cx="${geo.x}" cy="${geo.y}" r="${isWinner ? 11 : 9.5}" fill="${badgeColor}" stroke="#ffffff" stroke-width="2.2" />
        <text x="${geo.x}" y="${geo.y + 3.8}" text-anchor="middle" font-size="11" font-weight="900" fill="#ffffff">${isWinner ? "★" : numStr}</text>

        <!-- 吹き出しカード -->
        <g transform="translate(${bx}, ${by})">
          <rect x="0" y="0" width="${boxW}" height="${boxH}" rx="7" fill="${isWinner ? "#fffbeb" : "#ffffff"}" stroke="${badgeColor}" stroke-width="${isWinner ? 2.8 : 2}" filter="drop-shadow(0 3px 6px rgba(15,23,42,0.16))" />
          <rect x="0" y="0" width="22" height="${boxH}" rx="6" fill="${badgeColor}" />
          <text x="11" y="${boxH / 2 + 4}" text-anchor="middle" font-size="11.5" font-weight="900" fill="#ffffff">${isWinner ? "当" : numStr}</text>
          <text x="28" y="15" font-size="11.5" font-weight="900" fill="#182232">${ap.name} (${ap.code})${isWinner ? " 🏆" : ""}</text>
          <text x="28" y="31" font-size="10" font-weight="700" fill="#c8102e">往復${fmtYen(ap.activeRoundTrip)} (1m=${ap.mileValue.toFixed(1)}円)</text>
        </g>
      </g>
    `;
  }).join("");

  const vb = getMapViewBox();
  const zPct = Math.round(state.mapZoom * 100) + "%";
  const isZoomed = state.mapZoom > 1.01;

  return `
    <div class="map-zoom-controls" aria-label="地図の拡大縮小コントロール">
      <button type="button" class="map-zoom-btn map-zoom-in-btn" onclick="changeMapZoom(0.5)" title="地図を拡大（＋）" ${state.mapZoom >= 4.0 ? "disabled" : ""}>＋</button>
      <div class="map-zoom-level">${zPct}</div>
      <button type="button" class="map-zoom-btn map-zoom-out-btn" onclick="changeMapZoom(-0.5)" title="地図を縮小（ー）" ${state.mapZoom <= 1.0 ? "disabled" : ""}>ー</button>
      <button type="button" class="map-zoom-btn map-zoom-reset" onclick="resetMapZoom()" title="標準サイズ（100%）に戻す">100%</button>
    </div>
    <div class="map-pan-hint ${isZoomed ? "visible" : ""}">✋ ドラッグで地図を移動できます</div>
    <svg viewBox="${vb}" class="geo-svg ${isLarge ? "large-map" : ""} ${isZoomed ? "is-zoomed" : ""}" role="img" aria-label="日本全国 JALどこかにマイル就航路線図と行き先候補マップ">
      <!-- 海域ラベル -->
      <text x="210" y="260" font-size="13" font-weight="800" fill="#93c5fd" letter-spacing="0.2em">日本海</text>
      <text x="485" y="545" font-size="13" font-weight="800" fill="#93c5fd" letter-spacing="0.2em">太平洋</text>

      <!-- 南西諸島エリア枠 -->
      ${insetDivider}

      <!-- 地域ポリゴン -->
      <g>${regionPolys}</g>
      <!-- 地域ラベル -->
      <g>${regionLabels}</g>

      <!-- 全35空港フライトアーク -->
      <g>${baseFlightArcs}</g>

      <!-- 選択中の空港へのアクティブ航路 -->
      <g>${activeFlightArcs}</g>

      <!-- 全35空港ドット -->
      <g>${airportDots}</g>

      <!-- 羽田空港（出発地） -->
      ${originMarker}

      <!-- 選択された4空港の強調ピン＆吹き出し -->
      <g>${selectedOverlays}</g>
    </svg>
  `;
}

// ヘッダー統計の更新
function renderHeaderStats() {
  const allMetrics = AIRPORTS.map(a => computeAirportMetrics(a, state.plan));
  const maxAp = allMetrics.reduce((m, a) => a.activeRoundTrip > m.activeRoundTrip ? a : m, allMetrics[0]);
  const minAp = allMetrics.reduce((m, a) => a.activeRoundTrip < m.activeRoundTrip ? a : m, allMetrics[0]);
  const avgRound = Math.round(allMetrics.reduce((acc, a) => acc + a.activeRoundTrip, 0) / allMetrics.length);
  const avgMileVal = (avgRound / PLAN_CONFIG[state.plan].miles).toFixed(2);
  const plan = PLAN_CONFIG[state.plan];

  const el = document.getElementById("header-stats");
  el.innerHTML = `
    <div class="stat-pill">
      <span class="stat-pill-label">必要マイル（往復）</span>
      <span class="stat-pill-value">${plan.miles.toLocaleString()} マイル</span>
    </div>
    <div class="stat-pill">
      <span class="stat-pill-label">全35空港 平均往復（1m価値）</span>
      <span class="stat-pill-value">${fmtYen(avgRound)} <small style="font-size:0.75rem;">(${avgMileVal}円/m)</small></span>
    </div>
    <div class="stat-pill">
      <span class="stat-pill-label">最高額（${maxAp.name} ${maxAp.code}）</span>
      <span class="stat-pill-value">${fmtYen(maxAp.activeRoundTrip)} <small style="font-size:0.75rem;">(${maxAp.mileValue.toFixed(1)}円/m)</small></span>
    </div>
    <div class="stat-pill">
      <span class="stat-pill-label">最安額（${minAp.name} ${minAp.code}）</span>
      <span class="stat-pill-value">${fmtYen(minAp.activeRoundTrip)} <small style="font-size:0.75rem;">(${minAp.mileValue.toFixed(1)}円/m)</small></span>
    </div>
  `;
}

// 4空港ガチャ期待値シミュレーター＋日本地図の描画
function renderSimulator() {
  const simSec = document.getElementById("simulator-section");
  const slotsContainer = document.getElementById("sim-slots");
  const winnerContainer = document.getElementById("sim-winner-area");
  const resultContainer = document.getElementById("sim-result-area");
  const countBadge = document.getElementById("sim-count-badge");
  const finalDrawBtn = document.getElementById("btn-final-draw");
  const mapContainer = document.getElementById("sim-geo-map-container");

  const selectedAirports = state.selectedIds
    .map(id => AIRPORTS.find(a => a.id === id))
    .filter(Boolean)
    .map(a => computeAirportMetrics(a, state.plan));

  simSec.classList.toggle("has-selection", selectedAirports.length > 0);
  countBadge.textContent = `${selectedAirports.length} / 4 空港選択中`;
  finalDrawBtn.style.display = selectedAirports.length >= 2 ? "inline-flex" : "none";

  // 日本全国フライトマップのSVG描画
  mapContainer.innerHTML = buildGeoMapSvg({ isLarge: false, showAllNames: false });

  // 4つのスロット描画
  let slotsHtml = "";
  for (let i = 0; i < 4; i++) {
    const ap = selectedAirports[i];
    if (ap) {
      const areaColor = AREA_META[ap.area].color;
      const isWinner = state.winnerId === ap.id;
      const guideUrl = getAirportGuideUrl(ap.code);
      slotsHtml += `
        <div class="sim-slot filled ${isWinner ? "winner-slot" : ""}" style="border-color: ${isWinner ? "#d97706" : areaColor};">
          <button class="sim-slot-remove" onclick="toggleSelectAirport('${ap.id}')" title="候補から外す">✕</button>
          <div style="font-size: 0.72rem; font-weight: 700; color: ${areaColor}; display:flex; align-items:center;">
            <span class="slot-num-badge" style="background:${isWinner ? "#d97706" : areaColor};">${i + 1}</span>
            ${ap.area}（${ap.pref}）
          </div>
          <div style="font-size: 1.05rem; font-weight: 800; margin: 3px 0 2px; display:flex; align-items:center; gap:5px;">
            <span>${ap.name}空港</span>
            <span class="iata-badge">${ap.code}</span>
            ${isWinner ? "🏆" : ""}
          </div>
          <div style="font-size: 0.82rem; font-weight: 700; color: var(--text-sub);">
            往復 ${fmtYen(ap.activeRoundTrip)}
            <span style="color: #c8102e; margin-left: 4px;">(1m=${ap.mileValue.toFixed(1)}円)</span>
          </div>
          <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 2px;">
            ✈️ 通常特典 ${ap.stdAwardRound.toLocaleString()}m / ${fmtMins(ap.mins)}
          </div>
          <a href="${guideUrl}" target="_blank" rel="noopener noreferrer" class="slot-timetable-link" title="${ap.name}空港のJAL空港案内を別タブで開く">
            🛫 ${ap.name}空港 JAL案内 ↗
          </a>
        </div>
      `;
    } else {
      slotsHtml += `
        <div class="sim-slot">
          <div class="sim-slot-empty">
            候補空港 ${i + 1}<br>
            <span style="font-size: 0.72rem; font-weight: 400;">地図またはカードをクリック</span>
          </div>
        </div>
      `;
    }
  }
  slotsContainer.innerHTML = slotsHtml;

  // 1空港抽選結果バナー描画
  if (state.winnerId) {
    const winAp = selectedAirports.find(a => a.id === state.winnerId);
    if (winAp) {
      winnerContainer.innerHTML = `
        <div class="winner-banner">
          <div>
            🎉 <strong>行き先決定シミュレーション結果：「${winAp.name}空港（${winAp.code}）」（${winAp.area}・${winAp.pref}）</strong> に決まりました！
            <div style="font-size: 0.78rem; font-weight: 500; opacity: 0.95; margin-top: 2px;">
              往復運賃目安 ${fmtYen(winAp.activeRoundTrip)}（<strong>1マイル＝${winAp.mileValue.toFixed(2)}円相当</strong> ／ 通常特典より<strong>${winAp.savedMiles.toLocaleString()}マイル節約</strong>）<br>
              💡 ${winAp.tip}
            </div>
          </div>
          <div style="display:flex; gap:6px; align-items:center;">
            <a href="${JAL_TIMETABLE_URL}" target="_blank" rel="noopener noreferrer" class="btn-action" style="background:#fff; color:#990a22; padding:5px 10px; font-size:0.76rem; text-decoration:none;">🕒 JAL時刻表 ↗</a>
            <button type="button" class="btn-action" style="background:rgba(255,255,255,0.22); color:#fff; padding:5px 10px; font-size:0.76rem;" onclick="drawFinalWinner()">🔄 もう1回抽選</button>
          </div>
        </div>
      `;
    } else {
      winnerContainer.innerHTML = "";
    }
  } else {
    winnerContainer.innerHTML = "";
  }

  if (selectedAirports.length === 0) {
    resultContainer.innerHTML = `
      <div style="background: var(--bg-subtle); border-radius: 12px; padding: 16px; color: var(--text-sub); font-size: 0.86rem; line-height: 1.6;">
        💡 <strong>使い方：</strong><br>
        1. 右上の「<strong>🎲 ランダムに4空港ガチャを引く</strong>」ボタンを押すか、<strong>右の日本地図の空港ドット</strong>・下の空港カードをクリックして4空港を選びます。<br>
        2. 選ばれた4空港が<strong>日本全国フライトマップ</strong>上に番号付きでピン留めされ、期待運賃・1マイル価値・節約マイル数が自動計算されます！
      </div>
    `;
    return;
  }

  // 期待値計算
  const plan = PLAN_CONFIG[state.plan];
  const avgRound = Math.round(selectedAirports.reduce((a, s) => a + s.activeRoundTrip, 0) / selectedAirports.length);
  const avgMileVal = (avgRound / plan.miles).toFixed(2);
  const avgStdAward = Math.round(selectedAirports.reduce((a, s) => a + s.stdAwardRound, 0) / selectedAirports.length);
  const avgSavedMiles = avgStdAward - plan.miles;
  const avgSaveRate = ((avgSavedMiles / avgStdAward) * 100).toFixed(1);

  const minAp = selectedAirports.reduce((m, s) => s.activeRoundTrip < m.activeRoundTrip ? s : m, selectedAirports[0]);
  const maxAp = selectedAirports.reduce((m, s) => s.activeRoundTrip > m.activeRoundTrip ? s : m, selectedAirports[0]);

  // 総合判定（セイバー運賃ベース）
  const avgBaseSaverRound = selectedAirports.reduce((a, s) => a + s.saverOneWay * 2, 0) / selectedAirports.length;
  let verdictTitle = "Aランク：好条件フライトセット";
  let verdictSub = "十分高コスパ！行きたい都市があれば申し込み推奨";
  let verdictBg = "var(--rank-a)";

  if (avgBaseSaverRound >= 43000) {
    verdictTitle = "SSR：神引き確定セット！";
    verdictSub = "離島・北海道・沖縄級の超高単価！即申し込み推奨レベル";
    verdictBg = "var(--rank-ss)";
  } else if (avgBaseSaverRound >= 37500) {
    verdictTitle = "Sランク：大当たりセット！";
    verdictSub = "全国平均を大きく上回る1マイル5円超の優秀な4択";
    verdictBg = "var(--rank-s)";
  } else if (avgBaseSaverRound < 31000) {
    verdictTitle = "Cランク：近距離多め（再検索検討）";
    verdictSub = "フライトは短め。長距離・高単価狙いなら時間帯変更で再検索も◎";
    verdictBg = "var(--rank-c)";
  }

  // 近距離空港チェック（名古屋・小松・伊丹・関西・山形）
  const closeAirports = selectedAirports.filter(a => ["ngo", "kmq", "itm", "kix", "gaj"].includes(a.id));
  const ssrAirports = selectedAirports.filter(a => ["isg", "mmy", "ueo", "oka", "asj", "mmb", "kuh"].includes(a.id));
  let adviceText = "";
  if (closeAirports.length > 0) {
    const names = closeAirports.map(a => `<strong>${a.name}（${a.code}）</strong>`).join("・");
    adviceText = `⚠️ 候補に近距離路線の ${names} が含まれています。「せっかく7,000マイル使うなら遠くへ飛びたい」場合は、出発時間帯を変えて再検索するのがおすすめです。`;
  } else if (ssrAirports.length >= 2) {
    const names = ssrAirports.map(a => `<strong>${a.name}（${a.code}）</strong>`).join("・");
    adviceText = `🔥 超大当たり枠の ${names} が複数入った激アツ組み合わせです！最低でも<strong>${minAp.name}空港（往復${fmtYen(minAp.activeRoundTrip)} / 1マイル=${minAp.mileValue.toFixed(1)}円）</strong>が確定します。`;
  } else {
    adviceText = `✅ 近距離5空港（中部・小松・伊丹・関西・山形）が含まれていない安心の中・長距離セットです！最低でも<strong>${minAp.name}空港（往復${fmtYen(minAp.activeRoundTrip)} / 1マイル=${minAp.mileValue.toFixed(1)}円）</strong>が確定します。`;
  }

  resultContainer.innerHTML = `
    <div class="sim-result-panel">
      <div class="sim-verdict" style="background: ${verdictBg};">
        <div style="font-size: 0.75rem; opacity: 0.9;">候補${selectedAirports.length}空港の総合期待値判定</div>
        <div style="font-size: 1.05rem; margin-top: 2px;">${verdictTitle}</div>
        <div style="font-size: 0.72rem; font-weight: 500; opacity: 0.92; margin-top: 3px;">${verdictSub}</div>
      </div>
      <div class="sim-metric">
        <div class="sim-metric-label">期待値（平均往復運賃）</div>
        <div class="sim-metric-val">${fmtYen(avgRound)}</div>
        <div class="sim-metric-sub">最小 ${fmtYen(minAp.activeRoundTrip)} 〜 最大 ${fmtYen(maxAp.activeRoundTrip)}</div>
      </div>
      <div class="sim-metric">
        <div class="sim-metric-label">1マイルあたりの期待価値</div>
        <div class="sim-metric-val" style="color: #c8102e;">${avgMileVal} 円/マイル</div>
        <div class="sim-metric-sub">${plan.miles.toLocaleString()}マイル利用時（${plan.fareLabel}）</div>
      </div>
      <div class="sim-metric">
        <div class="sim-metric-label">通常特典航空券との比較</div>
        <div class="sim-metric-val" style="color: #059669;">-${avgSavedMiles.toLocaleString()} マイル</div>
        <div class="sim-metric-sub">通常平均 ${avgStdAward.toLocaleString()}m → <strong>${avgSaveRate}%節約</strong></div>
      </div>
    </div>
    <div class="sim-advice">${adviceText}</div>
  `;
}

// 単一空港カードのHTML生成
function renderAirportCardHtml(ap, rankMap) {
  const areaMeta = AREA_META[ap.area];
  const selIdx = state.selectedIds.indexOf(ap.id);
  const isSelected = selIdx >= 0;
  const fareRank = rankMap[ap.id];
  const plan = PLAN_CONFIG[state.plan];
  const guideUrl = getAirportGuideUrl(ap.code);

  return `
    <div class="station-card ${isSelected ? "selected-in-sim" : ""}" onclick="toggleSelectAirport('${ap.id}')">
      <div>
        <div class="card-top">
          <div class="station-name-group">
            <div class="station-pref-line">
              <span class="line-dot" style="background:${areaMeta.color};"></span>
              <span>${ap.area}</span>
              <span>・${ap.pref}</span>
              <span>（お得度 ${fareRank}位/35空港）</span>
            </div>
            <div class="station-name">
              ${isSelected ? `<span class="slot-num-badge" style="background:${areaMeta.color};">${selIdx + 1}</span>` : ""}
              ${ap.name}空港
              <span class="iata-badge">${ap.code}</span>
              ${ap.seasonal ? `<span class="seasonal-badge">${ap.seasonal}</span>` : ""}
            </div>
          </div>
          <span class="rank-badge rank-${ap.rank}">${ap.rankLabel}</span>
        </div>

        <div class="price-box">
          <div class="price-row-main">
            <span class="price-label">羽田発 往復（${plan.fareLabel}）</span>
            <span class="price-value">${fmtYen(ap.activeRoundTrip)}</span>
          </div>
          <div class="price-row-sub">
            <span>片道目安: <strong>${fmtYen(ap.activeOneWay)}</strong></span>
            <span>通常特典: <strong>往復 ${ap.stdAwardRound.toLocaleString()}m</strong></span>
          </div>
        </div>

        <div class="savings-highlight">
          <span>💎 <strong>1マイル = ${ap.mileValue.toFixed(2)}円</strong> 相当</span>
          <span><strong>-${ap.savedMiles.toLocaleString()}m節約</strong> (${ap.mileSaveRate.toFixed(0)}%OFF)</span>
        </div>

        <div class="discount-bar-wrap" title="マイル価値 ${ap.mileValue.toFixed(2)}円/マイル">
          <div class="discount-bar-fill" style="width: ${Math.min(100, (ap.mileValue / 9.0) * 100)}%; background: ${areaMeta.color};"></div>
        </div>

        <div class="station-meta">
          <span>✈️ 区間 ${ap.distMiles} マイル（${ap.flights}）</span>
          <span>⏱ ${fmtMins(ap.mins)}</span>
        </div>

        <div class="station-tags">
          ${ap.tags.map(t => `<span class="tag-chip">${t}</span>`).join("")}
        </div>

        <div style="font-size: 0.74rem; color: var(--text-sub); margin-bottom: 12px; line-height: 1.4;">
          💡 ${ap.tip}
        </div>
      </div>

      <div class="card-actions-row">
        <button type="button" class="card-select-btn" onclick="event.stopPropagation(); toggleSelectAirport('${ap.id}')">
          ${isSelected ? `✓ 候補空港 ${selIdx + 1}（解除）` : "＋ 4空港候補に選ぶ"}
        </button>
        <a href="${guideUrl}" target="_blank" rel="noopener noreferrer" class="timetable-btn" onclick="event.stopPropagation();" title="JAL「${ap.name}空港」の公式案内を開く">
          🛫 空港案内 ↗
        </a>
      </div>
    </div>
  `;
}

// ① エリア別ビューの描画
function renderByAreaView(airports, rankMap) {
  const container = document.getElementById("main-view-content");
  const areasOrder = ["北海道", "東北", "中部・北陸・近畿", "中国・四国", "九州・奄美", "沖縄・先島"];

  let html = "";
  areasOrder.forEach(areaName => {
    const areaAirports = airports.filter(a => a.area === areaName);
    if (areaAirports.length === 0) return;

    const meta = AREA_META[areaName];
    const avgRound = Math.round(areaAirports.reduce((acc, a) => acc + a.activeRoundTrip, 0) / areaAirports.length);
    const maxAp = areaAirports.reduce((m, a) => a.activeRoundTrip > m.activeRoundTrip ? a : m, areaAirports[0]);
    const minAp = areaAirports.reduce((m, a) => a.activeRoundTrip < m.activeRoundTrip ? a : m, areaAirports[0]);

    html += `
      <section class="line-section">
        <div class="line-header" style="background: ${meta.color};">
          <div>
            <div class="line-header-left">
              <h2 class="line-title">${areaName}エリア（${areaAirports.length}空港）</h2>
              <span class="line-train-tag">主な機材：${meta.aircraft}</span>
              <a href="${JAL_TIMETABLE_URL}" target="_blank" rel="noopener noreferrer" class="line-tokyo-timetable-btn" title="JAL国内線公式時刻表を開く">
                🕒 羽田発 JAL公式時刻表 ↗
              </a>
            </div>
            <div style="font-size: 0.82rem; opacity: 0.92; margin-top: 6px;">${meta.desc}</div>
          </div>
          <div class="line-summary-stats">
            <span>エリア平均往復：<strong>${fmtYen(avgRound)}</strong></span>
            <span>最高：${maxAp.name}（${fmtYen(maxAp.activeRoundTrip)}）</span>
            <span>最安：${minAp.name}（${fmtYen(minAp.activeRoundTrip)}）</span>
          </div>
        </div>
        <div class="stations-grid">
          ${areaAirports.map(ap => renderAirportCardHtml(ap, rankMap)).join("")}
        </div>
      </section>
    `;
  });

  if (!html) {
    html = `<div style="background:#fff; padding:40px; text-align:center; border-radius:16px; color:var(--text-sub);">該当する空港が見つかりませんでした。検索条件を変更してください。</div>`;
  }

  container.innerHTML = html;
}

// ② ランキング・一覧テーブルビューの描画
function renderRankingTableView(airports, rankMap) {
  const container = document.getElementById("main-view-content");
  const plan = PLAN_CONFIG[state.plan];

  const rowsHtml = airports.map(ap => {
    const meta = AREA_META[ap.area];
    const selIdx = state.selectedIds.indexOf(ap.id);
    const isSelected = selIdx >= 0;
    const rankNum = rankMap[ap.id];
    const guideUrl = getAirportGuideUrl(ap.code);

    return `
      <tr class="${isSelected ? "selected-row" : ""}" onclick="toggleSelectAirport('${ap.id}')" style="cursor:pointer;">
        <td style="font-weight:800; color:var(--text-sub);">${rankNum}位</td>
        <td><span class="rank-badge rank-${ap.rank}">${ap.rank}</span></td>
        <td>
          <div style="font-weight:800; font-size:0.96rem; display:flex; align-items:center; gap:5px;">
            ${isSelected ? `<span class="slot-num-badge" style="background:${meta.color};">${selIdx + 1}</span>` : ""}
            <span>${ap.name}空港</span>
            <span class="iata-badge">${ap.code}</span>
            ${ap.seasonal ? `<span class="seasonal-badge">${ap.seasonal}</span>` : ""}
          </div>
          <div style="font-size:0.73rem; color:var(--text-muted);">${ap.pref}（${ap.flights}）</div>
        </td>
        <td>
          <span class="line-badge-sm" style="background:${meta.color};">${ap.area}</span>
        </td>
        <td style="font-weight:700;">${fmtYen(ap.activeOneWay)}</td>
        <td style="font-weight:800; font-size:1rem;">${fmtYen(ap.activeRoundTrip)}</td>
        <td>
          <span style="font-weight:800; color:#c8102e; font-size:0.95rem;">1m = ${ap.mileValue.toFixed(2)}円</span>
          <div style="font-size:0.72rem; color:var(--text-muted);">実質 +${fmtYen(ap.cashSavings)} 相当</div>
        </td>
        <td>
          <span style="font-weight:800; color:#059669;">-${ap.savedMiles.toLocaleString()}m (${ap.mileSaveRate.toFixed(0)}%OFF)</span>
          <div style="font-size:0.72rem; color:var(--text-muted);">通常往復 ${ap.stdAwardRound.toLocaleString()} マイル</div>
        </td>
        <td style="font-size:0.8rem; color:var(--text-sub);">
          ${ap.distMiles} マイル<br>
          <span style="color:var(--text-muted);">フライト ${fmtMins(ap.mins)}</span>
        </td>
        <td>
          <div style="display:flex; gap:6px; align-items:center;">
            <button type="button" class="card-select-btn" style="padding:5px 8px; font-size:0.74rem;" onclick="event.stopPropagation(); toggleSelectAirport('${ap.id}')">
              ${isSelected ? `✓ 候補${selIdx + 1}` : "＋ 候補選択"}
            </button>
            <a href="${guideUrl}" target="_blank" rel="noopener noreferrer" class="timetable-btn" style="padding:5px 8px; font-size:0.74rem;" onclick="event.stopPropagation();" title="${ap.name}空港のJAL案内">
              🛫 案内 ↗
            </a>
          </div>
        </td>
      </tr>
    `;
  }).join("");

  container.innerHTML = `
    <div class="ranking-table-wrap">
      <div style="padding: 12px 16px; background: var(--bg-subtle); border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <span style="font-size: 0.84rem; font-weight: 700; color: var(--text-sub);">🏆 羽田発・全35空港 お得度・マイル単価比較一覧</span>
        <div style="display:flex; gap:8px; flex-wrap:wrap;">
          <a href="${JAL_DOKOKANI_URL}" target="_blank" rel="noopener noreferrer" class="line-tokyo-timetable-btn" style="font-size: 0.78rem; padding: 5px 12px;">
            ✈️ JAL「どこかにマイル」公式ページ ↗
          </a>
          <a href="${JAL_TIMETABLE_URL}" target="_blank" rel="noopener noreferrer" class="line-tokyo-timetable-btn" style="font-size: 0.78rem; padding: 5px 12px;">
            🕒 JAL国内線 時刻表検索 ↗
          </a>
        </div>
      </div>
      <table class="ranking-table">
        <thead>
          <tr>
            <th>お得順位</th>
            <th>判定</th>
            <th>空港名（3レター・便数）</th>
            <th>就航エリア</th>
            <th>片道（${plan.fareLabel}）</th>
            <th>往復運賃目安</th>
            <th>1マイル価値</th>
            <th>通常特典マイル比較</th>
            <th>区間マイル / 時間</th>
            <th>操作・案内</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    </div>
  `;
}

// ③ 全国フライト路線図ビューの描画（大型日本地図＋6エリア別ダイアグラム）
function renderRouteMapView(airports, rankMap) {
  const container = document.getElementById("main-view-content");
  const areasOrder = ["北海道", "東北", "中部・北陸・近畿", "中国・四国", "九州・奄美", "沖縄・先島"];

  const colsHtml = areasOrder.map(areaName => {
    const meta = AREA_META[areaName];
    const areaAirports = AIRPORTS
      .filter(a => a.area === areaName)
      .map(a => computeAirportMetrics(a, state.plan))
      .sort((a, b) => b.activeRoundTrip - a.activeRoundTrip);

    const nodesHtml = areaAirports.map(ap => {
      const selIdx = state.selectedIds.indexOf(ap.id);
      const isSelected = selIdx >= 0;
      const isFilteredOut = !airports.some(fa => fa.id === ap.id);
      const guideUrl = getAirportGuideUrl(ap.code);
      return `
        <div class="map-node ${isSelected ? "selected-in-sim" : ""}"
             style="--track-color: ${meta.color}; ${isFilteredOut ? "opacity: 0.35;" : ""}"
             onclick="toggleSelectAirport('${ap.id}')">
          <div class="map-node-top">
            <span>${isSelected ? `<span class="slot-num-badge" style="background:${meta.color};">${selIdx + 1}</span>` : ""}${ap.name} <small style="color:var(--text-muted); font-family:monospace;">(${ap.code})</small></span>
            <span class="rank-badge rank-${ap.rank}" style="font-size:0.65rem; padding:2px 6px;">${ap.rank}</span>
          </div>
          <div class="map-node-bottom">
            <span>往復 <strong>${fmtYen(ap.activeRoundTrip)}</strong></span>
            <span style="color:#c8102e; font-weight:700;">1m=${ap.mileValue.toFixed(1)}円</span>
          </div>
          <div style="font-size:0.68rem; color:var(--text-muted); margin-top:3px; display:flex; justify-content:space-between; align-items:center;">
            <span>通常 ${ap.stdAwardRound.toLocaleString()}m (${fmtMins(ap.mins)})</span>
            <a href="${guideUrl}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation();" style="color:var(--jal-red-dark); font-weight:700; text-decoration:none;">🛫案内↗</a>
          </div>
        </div>
      `;
    }).join("");

    return `
      <div class="map-line-col">
        <div class="map-col-header" style="background: ${meta.color};">
          ${areaName}（${areaAirports.length}）
          <div style="font-size:0.7rem; font-weight:500; opacity:0.9; margin-top:2px;">⬆ 高単価・遠距離順</div>
        </div>
        <div class="map-track" style="--track-color: ${meta.color};">
          ${nodesHtml}
        </div>
      </div>
    `;
  }).join("");

  container.innerHTML = `
    <div class="map-view-container">
      <div class="map-legend">
        <div>
          <strong>🗾 日本全国 JALどこかにマイル就航マップ ＆ 6エリア別お得度リスト</strong>
          <div style="font-size:0.78rem; color:var(--text-muted); margin-top:2px;">
            地図上の空港ドットまたは下のエリア別リストをクリックすると、4空港ガチャ候補として選択・比較できます。
          </div>
        </div>
        <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
          <label style="font-size:0.8rem; font-weight:700; cursor:pointer; display:inline-flex; align-items:center; gap:5px;">
            <input type="checkbox" ${state.showAllMapLabels ? "checked" : ""} onchange="state.showAllMapLabels = this.checked; renderAll();" />
            地図上に全35空港名を表示
          </label>
        </div>
      </div>

      <div style="max-width: 680px; margin: 0 auto 28px; border: 1.5px solid var(--border-color); border-radius: 16px; overflow: hidden;">
        <div class="geo-svg-wrap">
          ${buildGeoMapSvg({ isLarge: true, showAllNames: state.showAllMapLabels })}
        </div>
      </div>

      <div class="map-columns">
        ${colsHtml}
      </div>
      <div class="map-origin-banner" style="display:flex; justify-content:center; align-items:center; gap:14px; flex-wrap:wrap;">
        <span>✈️ 出発地：東京国際空港（羽田空港 HND）第1ターミナル</span>
        <a href="${JAL_DOKOKANI_URL}" target="_blank" rel="noopener noreferrer" class="line-tokyo-timetable-btn" style="font-size:0.8rem; padding:5px 12px;">
          ✈️ JAL「どこかにマイル」公式ページを開く ↗
        </a>
      </div>
    </div>
  `;
}

// 全体再描画
function renderAll() {
  renderHeaderStats();
  renderSimulator();

  const filtered = getFilteredAirports();
  const rankMap = getFareRankMap();

  document.getElementById("result-count-label").textContent = `表示中：${filtered.length} 空港 / 全35空港`;

  if (state.view === "by-area") {
    renderByAreaView(filtered, rankMap);
  } else if (state.view === "ranking") {
    renderRankingTableView(filtered, rankMap);
  } else if (state.view === "map") {
    renderRouteMapView(filtered, rankMap);
  }
}

// イベントリスナー初期化
document.addEventListener("DOMContentLoaded", () => {
  // プラン切替ボタン
  document.querySelectorAll("[data-plan]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-plan]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.plan = btn.getAttribute("data-plan");
      renderAll();
    });
  });

  // 表示ビュー切替ボタン
  document.querySelectorAll("[data-view]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-view]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.view = btn.getAttribute("data-view");
      if (state.view === "ranking" && state.sortBy === "area") {
        state.sortBy = "fare-desc";
        document.getElementById("sort-select").value = "fare-desc";
      }
      renderAll();
    });
  });

  // エリアフィルタピル
  document.querySelectorAll("[data-area]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-area]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.areaFilter = btn.getAttribute("data-area");
      renderAll();
    });
  });

  // 検索ボックス
  document.getElementById("search-input").addEventListener("input", (e) => {
    state.searchQuery = e.target.value;
    renderAll();
  });

  // ソートセレクト
  document.getElementById("sort-select").addEventListener("change", (e) => {
    state.sortBy = e.target.value;
    renderAll();
  });

  // ガチャボタン・1空港抽選ボタン・クリアボタン
  document.getElementById("btn-random-gacha").addEventListener("click", drawRandomGacha);
  document.getElementById("btn-final-draw").addEventListener("click", drawFinalWinner);
  document.getElementById("btn-clear-sim").addEventListener("click", clearSimulator);

  // 地図拡大時のドラッグ移動（パン操作）
  document.addEventListener("mousedown", (e) => {
    const svg = e.target.closest(".geo-svg");
    if (!svg || state.mapZoom <= 1.01) return;
    mapDragState.isDown = true;
    mapDragState.hasDragged = false;
    mapDragState.startX = e.clientX;
    mapDragState.startY = e.clientY;
    mapDragState.startCenterX = state.mapCenterX;
    mapDragState.startCenterY = state.mapCenterY;
    mapDragState.activeSvg = svg;
    svg.classList.add("is-panning");
  });

  document.addEventListener("mousemove", (e) => {
    if (!mapDragState.isDown || !mapDragState.activeSvg) return;
    const dx = e.clientX - mapDragState.startX;
    const dy = e.clientY - mapDragState.startY;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      mapDragState.hasDragged = true;
      hideAirportTooltip();
    }
    const rect = mapDragState.activeSvg.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      const vw = 640 / state.mapZoom;
      const vh = 780 / state.mapZoom;
      state.mapCenterX = mapDragState.startCenterX - dx * (vw / rect.width);
      state.mapCenterY = mapDragState.startCenterY - dy * (vh / rect.height);
      syncMapViewportDom();
    }
  });

  document.addEventListener("mouseup", () => {
    if (!mapDragState.isDown) return;
    mapDragState.isDown = false;
    if (mapDragState.activeSvg) {
      mapDragState.activeSvg.classList.remove("is-panning");
      mapDragState.activeSvg = null;
    }
    setTimeout(() => {
      mapDragState.hasDragged = false;
    }, 30);
  });

  // 初回表示時にランダム4空港ガチャを1回引いた状態で表示
  drawRandomGacha();
});
