// 東京（羽田）発 JAL「どこかにマイル」対象 全6エリア・35空港データ
// セイバー運賃（早期割引実勢目安）・フレックス（普通/直前運賃目安）・通常特典航空券（基本マイル）
// ＋ 往路（羽田出発時間）・復路（羽田到着時間）の5枠運航スケジュールデータ

const TIME_SLOTS_ORDER = ["t1", "t2", "t3", "t4", "t5"];

const TIME_SLOT_META = {
  all: { id: "all", label: "時間指定なし", short: "指定なし", sub: "全時間帯" },
  t1:  { id: "t1",  label: "05:00～08:59", short: "05-08", sub: "早朝" },
  t2:  { id: "t2",  label: "09:00～11:59", short: "09-11", sub: "午前" },
  t3:  { id: "t3",  label: "12:00～15:59", short: "12-15", sub: "午後" },
  t4:  { id: "t4",  label: "16:00～18:59", short: "16-18", sub: "夕方" },
  t5:  { id: "t5",  label: "19:00～23:59", short: "19-23", sub: "夜間" }
};

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
    desc: "小松・名古屋（中部）・伊丹・関西・南紀白浜の5空港。時間帯を絞ることで中部・関西・山形などの近距離を外すことも可能！"
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
    desc: "福岡・長崎・熊本・大分・宮崎・鹿児島・北九州に加え、世界自然遺産の「奄美大島（1日1往復）」直行便も対象！"
  },
  "沖縄・先島": {
    color: "#9333ea",
    bgLight: "#f3e8ff",
    aircraft: "A350-900 / B787 / B767 / B737",
    desc: "那覇・久米島（夏期）・宮古・石垣の4空港。宮古・石垣・久米島は運航時間帯が決まっているため時間帯指定が攻略のカギ！"
  }
};

// outSlots: 往路（羽田出発時刻）が存在する時間帯枠
// inSlots:  復路（羽田到着時刻）が存在する時間帯枠
const AIRPORTS = [
  // ① 北海道エリア（6空港）
  {
    id: "mmb", code: "MMB", area: "北海道", order: 1, name: "女満別", pref: "北海道（道東）",
    distMiles: 609, mins: 105, flights: "1日3往復",
    outSlots: ["t1", "t2", "t4"], outTimes: "07:05 / 11:15 / 17:05発",
    inSlots:  ["t2", "t3", "t5"], inTimes:  "11:30 / 15:50 / 21:40着",
    saverOneWay: 25800, flexOneWay: 47800, stdAwardRound: 17000,
    tags: ["知床世界遺産", "網走監獄", "流氷・オホーツク", "超大当たり"],
    tip: "知床・網走・屈斜路湖への玄関口！往路は朝・午前・夕方、復路は午前・午後・夜着の3往復"
  },
  {
    id: "kuh", code: "KUH", area: "北海道", order: 2, name: "釧路", pref: "北海道（道東）",
    distMiles: 555, mins: 100, flights: "1日3往復",
    outSlots: ["t1", "t3", "t4"], outTimes: "07:40 / 12:25 / 17:15発",
    inSlots:  ["t2", "t4", "t5"], inTimes:  "11:55 / 16:50 / 21:35着",
    saverOneWay: 24900, flexOneWay: 46500, stdAwardRound: 17000,
    tags: ["釧路湿原", "阿寒湖温泉", "和商市場（勝手丼）", "超大当たり"],
    tip: "たんちょう釧路空港。09-11発には便がなく、早朝・午後・夕方発の3往復で運航"
  },
  {
    id: "akj", code: "AKJ", area: "北海道", order: 3, name: "旭川", pref: "北海道（道北）",
    distMiles: 576, mins: 100, flights: "1日4往復",
    outSlots: ["t1", "t2", "t4"], outTimes: "06:30 / 07:55 / 11:15 / 17:45発",
    inSlots:  ["t2", "t3", "t5"], inTimes:  "10:55 / 12:20 / 15:45 / 22:15着",
    saverOneWay: 23500, flexOneWay: 45200, stdAwardRound: 17000,
    tags: ["旭山動物園", "富良野・美瑛", "旭川ラーメン", "大当たり"],
    tip: "就航率99%を誇る雪に強い空港！早朝2便・午前1便・夕方1便の計4往復"
  },
  {
    id: "obo", code: "OBO", area: "北海道", order: 4, name: "帯広", pref: "北海道（十勝）",
    distMiles: 526, mins: 95, flights: "1日4往復",
    outSlots: ["t1", "t2", "t3", "t4"], outTimes: "07:35 / 11:35 / 14:35 / 18:10発",
    inSlots:  ["t2", "t3", "t4", "t5"], inTimes:  "11:40 / 15:45 / 18:50 / 22:15着",
    saverOneWay: 23200, flexOneWay: 44600, stdAwardRound: 17000,
    tags: ["十勝豚丼", "六花亭・スイーツ", "モール温泉", "大当たり"],
    tip: "十勝川温泉や豚丼・六花亭本店などグルメ満足度抜群！バランス良く4枠で運航"
  },
  {
    id: "cts", code: "CTS", area: "北海道", order: 5, name: "札幌（新千歳）", pref: "北海道（道央）",
    distMiles: 510, mins: 95, flights: "1日16往復",
    outSlots: ["t1", "t2", "t3", "t4", "t5"], outTimes: "06:25〜20:35発（全時間帯）",
    inSlots:  ["t2", "t3", "t4", "t5"],       inTimes:  "09:30〜23:00着（09時以降全枠）",
    saverOneWay: 18800, flexOneWay: 41500, stdAwardRound: 17000,
    tags: ["A350主力路線", "札幌・小樽・登別", "空港グルメ＆温泉"],
    tip: "最新鋭A350-900が投入される大幹線！ほぼ全ての時間帯枠で候補に入りやすい王道枠"
  },
  {
    id: "hkd", code: "HKD", area: "北海道", order: 6, name: "函館", pref: "北海道（道南）",
    distMiles: 424, mins: 80, flights: "1日3往復",
    outSlots: ["t1", "t3", "t4"], outTimes: "07:45 / 12:35 / 17:35発",
    inSlots:  ["t2", "t4", "t5"], inTimes:  "11:20 / 16:15 / 21:10着",
    saverOneWay: 19400, flexOneWay: 38600, stdAwardRound: 15000,
    tags: ["函館山夜景", "五稜郭", "湯の川温泉", "朝市海鮮"],
    tip: "空港から湯の川温泉まで車で約10分・函館駅まで約20分とアクセス抜群！早朝・午後・夕方発の3往復"
  },

  // ② 東北エリア（4空港）
  {
    id: "aoj", code: "AOJ", area: "東北", order: 1, name: "青森", pref: "青森県",
    distMiles: 358, mins: 75, flights: "1日6往復",
    outSlots: ["t1", "t2", "t3", "t4", "t5"], outTimes: "07:15 / 09:40 / 12:40 / 15:15 / 17:45 / 19:50発",
    inSlots:  ["t2", "t3", "t4", "t5"],       inTimes:  "10:35 / 13:05 / 16:10 / 18:45 / 21:10 / 22:45着",
    saverOneWay: 16200, flexOneWay: 34200, stdAwardRound: 15000,
    tags: ["ねぶたの家", "弘前城", "酸ヶ湯温泉", "青森魚菜センター"],
    tip: "新幹線で3時間かかる青森へわずか75分！1日6往復あり往路は全5枠をカバー"
  },
  {
    id: "msj", code: "MSJ", area: "東北", order: 2, name: "三沢", pref: "青森県",
    distMiles: 355, mins: 75, flights: "1日4往復",
    outSlots: ["t1", "t2", "t3", "t4"], outTimes: "07:10 / 10:40 / 15:35 / 18:55発",
    inSlots:  ["t2", "t3", "t4", "t5"], inTimes:  "10:30 / 14:00 / 18:55 / 22:10着",
    saverOneWay: 16500, flexOneWay: 34800, stdAwardRound: 15000,
    tags: ["奥入瀬渓流", "十和田湖", "星野リゾート青森屋", "三沢航空科学館"],
    tip: "大人気の「星野リゾート 青森屋」や奥入瀬渓流・八戸エリアへの拠点として実は超優秀！"
  },
  {
    id: "axt", code: "AXT", area: "東北", order: 3, name: "秋田", pref: "秋田県",
    distMiles: 279, mins: 65, flights: "1日4往復",
    outSlots: ["t1", "t2", "t3", "t5"], outTimes: "07:35 / 11:10 / 15:10 / 19:10発",
    inSlots:  ["t2", "t3", "t4", "t5"], inTimes:  "10:35 / 14:05 / 18:05 / 21:55着",
    saverOneWay: 15400, flexOneWay: 31800, stdAwardRound: 15000,
    tags: ["角館・田沢湖", "乳頭温泉郷", "男鹿なまはげ", "きりたんぽ"],
    tip: "秋田新幹線だと約3時間50分かかるところ飛行機なら65分！往路16-18枠のみ便なし"
  },
  {
    id: "gaj", code: "GAJ", area: "東北", order: 4, name: "山形", pref: "山形県",
    distMiles: 190, mins: 60, flights: "1日2往復",
    outSlots: ["t1", "t4"], outTimes: "07:15 / 16:20発",
    inSlots:  ["t2", "t5"], inTimes:  "09:50 / 19:05着",
    saverOneWay: 13200, flexOneWay: 25600, stdAwardRound: 13000,
    tags: ["銀山温泉", "蔵王温泉", "山寺", "さくらんぼ東根"],
    tip: "朝夕の1日2往復のみ。往路09-15または復路12-18を選ぶと山形は候補から外れます"
  },

  // ③ 中部・北陸・近畿エリア（5空港）
  {
    id: "kmq", code: "KMQ", area: "中部・北陸・近畿", order: 1, name: "小松", pref: "石川県",
    distMiles: 211, mins: 60, flights: "1日4往復",
    outSlots: ["t1", "t2", "t3", "t5"], outTimes: "07:45 / 09:50 / 15:05 / 19:45発",
    inSlots:  ["t2", "t3", "t4"],       inTimes:  "09:00 / 10:35 / 13:05 / 18:05着",
    saverOneWay: 12800, flexOneWay: 26800, stdAwardRound: 13000,
    tags: ["金沢・兼六園", "加賀温泉郷", "近江町市場", "永平寺・恐竜博物館"],
    tip: "金沢・加賀温泉郷へ好アクセス。復路の羽田19時以降着（t5）には便がないのが特徴"
  },
  {
    id: "ngo", code: "NGO", area: "中部・北陸・近畿", order: 2, name: "名古屋（中部）", pref: "愛知県",
    distMiles: 193, mins: 60, flights: "1日2往復",
    outSlots: ["t1", "t4"], outTimes: "08:05 / 18:55発",
    inSlots:  ["t1", "t5"], inTimes:  "08:50 / 21:55着",
    saverOneWay: 11200, flexOneWay: 23400, stdAwardRound: 11000,
    tags: ["セントレア空港体験", "伊勢神宮アクセス", "名古屋めし", "近距離注意"],
    tip: "全35空港で最も近い路線。往路09-15または復路09-18を指定すれば完全に候補から除外可能！"
  },
  {
    id: "itm", code: "ITM", area: "中部・北陸・近畿", order: 3, name: "大阪（伊丹）", pref: "大阪府・兵庫県",
    distMiles: 280, mins: 65, flights: "1日15往復",
    outSlots: ["t1", "t2", "t3", "t4", "t5"], outTimes: "06:30〜19:30発（全時間帯）",
    inSlots:  ["t1", "t2", "t3", "t4", "t5"], inTimes:  "08:15〜21:30着（全時間帯）",
    saverOneWay: 12600, flexOneWay: 27600, stdAwardRound: 13000,
    tags: ["大阪・京都・神戸", "USJ", "A350運航便あり", "市街地至近"],
    tip: "1日15往復の大幹線のため、早朝から夜まで全5枠すべてに便が存在します"
  },
  {
    id: "kix", code: "KIX", area: "中部・北陸・近畿", order: 4, name: "大阪（関西）", pref: "大阪府",
    distMiles: 280, mins: 75, flights: "1日3往復",
    outSlots: ["t1", "t3", "t5"], outTimes: "07:10 / 14:35 / 20:25発",
    inSlots:  ["t1", "t2", "t5"], inTimes:  "07:50 / 10:35 / 22:30着",
    saverOneWay: 12600, flexOneWay: 27600, stdAwardRound: 13000,
    tags: ["和歌山・高野山", "堺・泉州", "りんくうアウトレット", "なんば特急ラピート"],
    tip: "往路09-11・16-18や復路12-18には便がないため、時間帯指定で除外しやすい路線"
  },
  {
    id: "shm", code: "SHM", area: "中部・北陸・近畿", order: 5, name: "南紀白浜", pref: "和歌山県",
    distMiles: 303, mins: 70, flights: "1日3往復",
    outSlots: ["t1", "t2", "t4"], outTimes: "07:40 / 11:45 / 16:35発",
    inSlots:  ["t2", "t3", "t5"], inTimes:  "10:40 / 14:50 / 19:45着",
    saverOneWay: 16800, flexOneWay: 33800, stdAwardRound: 13000,
    tags: ["白良浜ビーチ", "アドベンチャーワールド", "白浜温泉", "熊野古道"],
    tip: "どこかにマイルの隠れた大人気リゾート！空港から白浜温泉・海・テーマパークまで車で5〜10分"
  },

  // ④ 中国・四国エリア（8空港）
  {
    id: "okj", code: "OKJ", area: "中国・四国", order: 1, name: "岡山", pref: "岡山県",
    distMiles: 356, mins: 75, flights: "1日5往復",
    outSlots: ["t1", "t2", "t3", "t4", "t5"], outTimes: "07:05 / 09:35 / 13:30 / 17:45 / 19:55発",
    inSlots:  ["t1", "t2", "t3", "t4", "t5"], inTimes:  "08:25 / 10:40 / 13:05 / 17:05 / 21:15着",
    saverOneWay: 15800, flexOneWay: 34600, stdAwardRound: 15000,
    tags: ["倉敷美観地区", "後楽園・岡山城", "直島・瀬戸内アート", "フルーツ王国"],
    tip: "1日5往復が5つの時間帯に1便ずつ綺麗に分散しており、どの時間帯でも候補に入りやすい空港"
  },
  {
    id: "izo", code: "IZO", area: "中国・四国", order: 2, name: "出雲", pref: "島根県",
    distMiles: 405, mins: 85, flights: "1日5往復",
    outSlots: ["t1", "t2", "t3", "t4"],       outTimes: "07:10 / 09:40 / 13:15 / 16:35 / 18:55発",
    inSlots:  ["t1", "t2", "t3", "t4", "t5"], inTimes:  "08:50 / 11:00 / 13:25 / 17:00 / 20:25着",
    saverOneWay: 18600, flexOneWay: 37800, stdAwardRound: 15000,
    tags: ["出雲大社", "玉造温泉", "松江城・宍道湖", "出雲そば", "大当たり"],
    tip: "出雲縁結び空港！玉造温泉と出雲大社巡りに最高（往路19時以降発のみ便なし）"
  },
  {
    id: "hij", code: "HIJ", area: "中国・四国", order: 3, name: "広島", pref: "広島県",
    distMiles: 414, mins: 85, flights: "1日8往復",
    outSlots: ["t1", "t2", "t3", "t4", "t5"], outTimes: "06:55〜19:55発（全時間帯）",
    inSlots:  ["t1", "t2", "t3", "t4", "t5"], inTimes:  "08:50〜21:50着（全時間帯）",
    saverOneWay: 16400, flexOneWay: 35800, stdAwardRound: 15000,
    tags: ["厳島神社（宮島）", "尾道・しまなみ海道", "お好み焼き・牡蠣", "竹原"],
    tip: "1日8往復で全5枠を完全カバー。広島市内・宮島・尾道しまなみ海道への拠点に"
  },
  {
    id: "ubj", code: "UBJ", area: "中国・四国", order: 4, name: "山口宇部", pref: "山口県",
    distMiles: 510, mins: 95, flights: "1日4往復",
    outSlots: ["t1", "t3", "t4"], outTimes: "07:20 / 12:00 / 14:35 / 18:50発",
    inSlots:  ["t2", "t4", "t5"], inTimes:  "11:25 / 16:00 / 18:45 / 21:20着",
    saverOneWay: 18200, flexOneWay: 38800, stdAwardRound: 15000,
    tags: ["角島大橋", "元乃隅神社", "秋吉台・萩", "下関ふぐ・瓦そば"],
    tip: "絶景の角島大橋・元乃隅神社や長門湯本温泉へ。往路09-11と復路12-15には便がありません"
  },
  {
    id: "tks", code: "TKS", area: "中国・四国", order: 5, name: "徳島", pref: "徳島県",
    distMiles: 329, mins: 75, flights: "1日7往復",
    outSlots: ["t1", "t2", "t3", "t4", "t5"], outTimes: "07:45〜19:55発（全時間帯）",
    inSlots:  ["t1", "t2", "t3", "t4", "t5"], inTimes:  "08:35〜21:55着（全時間帯）",
    saverOneWay: 16200, flexOneWay: 34400, stdAwardRound: 15000,
    tags: ["大塚国際美術館", "鳴門の渦潮", "徳島ラーメン", "淡路島アクセス"],
    tip: "1日7往復で全時間帯を網羅！大塚国際美術館や鳴門の渦潮、淡路島ドライブに大人気"
  },
  {
    id: "tak", code: "TAK", area: "中国・四国", order: 6, name: "高松", pref: "香川県",
    distMiles: 354, mins: 80, flights: "1日7往復",
    outSlots: ["t1", "t2", "t3", "t4", "t5"], outTimes: "07:35〜20:00発（全時間帯）",
    inSlots:  ["t1", "t2", "t3", "t4", "t5"], inTimes:  "08:40〜21:55着（全時間帯）",
    saverOneWay: 16200, flexOneWay: 34800, stdAwardRound: 15000,
    tags: ["讃岐うどん巡り", "金刀比羅宮", "栗林公園", "小豆島・直島"],
    tip: "うどん県への直行便！1日7往復で全時間帯に対応し、小豆島・直島フェリー旅にも最適"
  },
  {
    id: "kcz", code: "KCZ", area: "中国・四国", order: 7, name: "高知", pref: "高知県",
    distMiles: 393, mins: 80, flights: "1日5往復",
    outSlots: ["t1", "t2", "t3", "t4"],       outTimes: "07:35 / 09:40 / 12:25 / 16:10 / 18:55発",
    inSlots:  ["t1", "t2", "t3", "t4", "t5"], inTimes:  "08:40 / 11:25 / 13:30 / 16:15 / 19:55着",
    saverOneWay: 18400, flexOneWay: 37400, stdAwardRound: 15000,
    tags: ["ひろめ市場・カツオ藁焼き", "桂浜", "仁淀ブルー", "四万十川"],
    tip: "夜の「ひろめ市場」で食べる塩タタキは感動もの！往路19時以降発（t5）のみ便なし"
  },
  {
    id: "myj", code: "MYJ", area: "中国・四国", order: 8, name: "松山", pref: "愛媛県",
    distMiles: 438, mins: 85, flights: "1日6往復",
    outSlots: ["t1", "t2", "t3", "t4", "t5"], outTimes: "07:15〜19:40発（全時間帯）",
    inSlots:  ["t1", "t2", "t3", "t4", "t5"], inTimes:  "08:50〜21:45着（全時間帯）",
    saverOneWay: 17800, flexOneWay: 37200, stdAwardRound: 15000,
    tags: ["道後温泉本館", "松山城", "下灘駅", "宇和島鯛めし"],
    tip: "日本最古の名湯・道後温泉へバス直結！1日6往復で往路・復路ともに全5枠をカバー"
  },

  // ⑤ 九州・奄美エリア（8空港）
  {
    id: "fuk", code: "FUK", area: "九州・奄美", order: 1, name: "福岡", pref: "福岡県",
    distMiles: 567, mins: 110, flights: "1日17往復",
    outSlots: ["t1", "t2", "t3", "t4", "t5"], outTimes: "06:20〜20:00発（全時間帯）",
    inSlots:  ["t1", "t2", "t3", "t4", "t5"], inTimes:  "08:45〜22:45着（全時間帯）",
    saverOneWay: 19200, flexOneWay: 42800, stdAwardRound: 17000,
    tags: ["博多駅まで地下鉄5分", "もつ鍋・屋台・とんこつ", "太宰府天満宮", "A350幹線"],
    tip: "空港から博多駅まで地下鉄5分の日本一便利な空港！全5枠でいつでも狙える九州の大幹線"
  },
  {
    id: "kkj", code: "KKJ", area: "九州・奄美", order: 2, name: "北九州", pref: "福岡県",
    distMiles: 534, mins: 105, flights: "1日5往復",
    outSlots: ["t1", "t2", "t3", "t4", "t5"], outTimes: "07:20 / 09:50 / 13:25 / 18:25 / 20:15発",
    inSlots:  ["t1", "t2", "t3", "t4", "t5"], inTimes:  "08:30 / 11:35 / 14:00 / 17:35 / 22:40着",
    saverOneWay: 17600, flexOneWay: 39800, stdAwardRound: 15000,
    tags: ["門司港レトロ", "小倉グルメ・旦過市場", "皿倉山夜景", "下関・唐戸市場"],
    tip: "海上空港で早朝〜深夜便まで全5枠に1便ずつ配置。門司港レトロや下関・唐戸市場へ好アクセス"
  },
  {
    id: "oit", code: "OIT", area: "九州・奄美", order: 3, name: "大分", pref: "大分県",
    distMiles: 499, mins: 100, flights: "1日6往復",
    outSlots: ["t1", "t2", "t3", "t4", "t5"], outTimes: "07:55〜19:45発（全時間帯）",
    inSlots:  ["t2", "t3", "t4", "t5"],       inTimes:  "09:30〜21:30着（09時以降全枠）",
    saverOneWay: 18600, flexOneWay: 39600, stdAwardRound: 15000,
    tags: ["別府温泉郷", "由布院温泉", "関アジ・関サバ・とり天", "地獄めぐり"],
    tip: "おんせん県おおいた！空港から別府・湯布院へ直通バスあり。温泉好きにはたまらない当たり枠"
  },
  {
    id: "ngs", code: "NGS", area: "九州・奄美", order: 4, name: "長崎", pref: "長崎県",
    distMiles: 610, mins: 115, flights: "1日6往復",
    outSlots: ["t1", "t2", "t3", "t4", "t5"], outTimes: "07:25〜19:50発（全時間帯）",
    inSlots:  ["t2", "t3", "t4", "t5"],       inTimes:  "09:35〜22:05着（09時以降全枠）",
    saverOneWay: 21400, flexOneWay: 44800, stdAwardRound: 17000,
    tags: ["稲佐山夜景", "ハウステンボス", "雲仙温泉", "ちゃんぽん・佐世保", "大当たり"],
    tip: "世界新三大夜景の長崎市内やハウステンボス、雲仙温泉まで見どころ満載の長距離路線"
  },
  {
    id: "kmj", code: "KMJ", area: "九州・奄美", order: 5, name: "熊本", pref: "熊本県",
    distMiles: 568, mins: 110, flights: "1日8往復",
    outSlots: ["t1", "t2", "t3", "t4", "t5"], outTimes: "06:25〜19:50発（全時間帯）",
    inSlots:  ["t2", "t3", "t4", "t5"],       inTimes:  "09:20〜22:15着（09時以降全枠）",
    saverOneWay: 20400, flexOneWay: 43600, stdAwardRound: 17000,
    tags: ["阿蘇カルデラ・草千里", "黒川温泉", "熊本城", "馬刺し・あか牛丼", "大当たり"],
    tip: "新しくなった阿蘇くまもと空港！阿蘇ドライブ・黒川温泉・天草イルカウォッチングの拠点に抜群"
  },
  {
    id: "kmi", code: "KMI", area: "九州・奄美", order: 6, name: "宮崎", pref: "宮崎県",
    distMiles: 561, mins: 105, flights: "1日6往復",
    outSlots: ["t1", "t2", "t3", "t4", "t5"], outTimes: "06:50〜19:45発（全時間帯）",
    inSlots:  ["t2", "t3", "t4", "t5"],       inTimes:  "09:20〜22:15着（09時以降全枠）",
    saverOneWay: 20200, flexOneWay: 43200, stdAwardRound: 17000,
    tags: ["高千穂峡", "青島神社・日南海岸", "チキン南蛮・宮崎牛・地鶏", "大当たり"],
    tip: "宮崎ブーゲンビリア空港。JR宮崎駅まで電車で10分！日南海岸ドライブや高千穂峡、絶品グルメが充実"
  },
  {
    id: "koj", code: "KOJ", area: "九州・奄美", order: 7, name: "鹿児島", pref: "鹿児島県",
    distMiles: 601, mins: 115, flights: "1日8往復",
    outSlots: ["t1", "t2", "t3", "t4", "t5"], outTimes: "06:25〜19:45発（全時間帯）",
    inSlots:  ["t2", "t3", "t4", "t5"],       inTimes:  "09:20〜22:20着（09時以降全枠）",
    saverOneWay: 20800, flexOneWay: 44200, stdAwardRound: 17000,
    tags: ["桜島", "指宿砂むし温泉", "霧島温泉・霧島神宮", "黒豚・しろくま", "大当たり"],
    tip: "霧島温泉郷へ車で約30分！桜島フェリーや指宿の砂むし温泉、黒豚しゃぶしゃぶ・芋焼酎を堪能"
  },
  {
    id: "asj", code: "ASJ", area: "九州・奄美", order: 8, name: "奄美大島", pref: "鹿児島県（奄美）",
    distMiles: 789, mins: 145, flights: "1日1往復",
    outSlots: ["t2"], outTimes: "11:25発のみ（09-11枠限定）",
    inSlots:  ["t4"], inTimes:  "16:40着のみ（16-18枠限定）",
    saverOneWay: 27400, flexOneWay: 51200, stdAwardRound: 19000,
    tags: ["世界自然遺産", "マングローブカヌー", "アマミブルーの海", "鶏飯", "超大当たり"],
    tip: "1日1往復限定！奄美を狙うなら往路「09:00～11:59」・復路「16:00～18:59」（または指定なし）が必須条件"
  },

  // ⑥ 沖縄・先島エリア（4空港）
  {
    id: "oka", code: "OKA", area: "沖縄・先島", order: 1, name: "沖縄（那覇）", pref: "沖縄県（本島）",
    distMiles: 984, mins: 165, flights: "1日12往復",
    outSlots: ["t1", "t2", "t3", "t4", "t5"], outTimes: "06:25〜19:55発（全時間帯）",
    inSlots:  ["t2", "t3", "t4", "t5"],       inTimes:  "10:05〜23:00着（09時以降全枠）",
    saverOneWay: 22800, flexOneWay: 48600, stdAwardRound: 19000,
    tags: ["美ら海水族館", "国際通り・首里城", "慶良間ブルー", "A350主力", "大当たり"],
    tip: "通常特典なら往復19,000マイル〜必要な那覇路線が7,000マイル！1日12往復あり幅広い時間帯で出現"
  },
  {
    id: "ueo", code: "UEO", area: "沖縄・先島", order: 2, name: "久米島", pref: "沖縄県（離島）",
    distMiles: 1020, mins: 170, flights: "夏期1往復", seasonal: "夏期限定",
    outSlots: ["t2"], outTimes: "11:05発のみ（09-11枠限定）",
    inSlots:  ["t4"], inTimes:  "18:10着のみ（16-18枠限定）",
    saverOneWay: 27200, flexOneWay: 52400, stdAwardRound: 19000,
    tags: ["はての浜", "ウミガメ館", "海洋深層水スパ", "車エビ", "超大当たり"],
    tip: "夏季（7〜8月）のみ運航される羽田直行便！奄美と同じく往路「09:00～11:59」・復路「16:00～18:59」限定"
  },
  {
    id: "mmy", code: "MMY", area: "沖縄・先島", order: 3, name: "宮古", pref: "沖縄県（宮古島）",
    distMiles: 1158, mins: 185, flights: "1日1往復",
    outSlots: ["t1"], outTimes: "06:55発のみ（05-08枠限定）",
    inSlots:  ["t5"], inTimes:  "22:35着のみ（19-23枠限定）",
    saverOneWay: 29400, flexOneWay: 56800, stdAwardRound: 21000,
    tags: ["宮古ブルー・与那覇前浜", "伊良部大橋", "ウミガメシュノーケル", "全空港2位SSR"],
    tip: "1日1往復（JTA021/022）！宮古を狙うなら往路「05:00～08:59」・復路「19:00～23:59」（または指定なし）が必須"
  },
  {
    id: "isg", code: "ISG", area: "沖縄・先島", order: 4, name: "石垣", pref: "沖縄県（八重山）",
    distMiles: 1224, mins: 195, flights: "1日2往復",
    outSlots: ["t1", "t3"], outTimes: "06:25 / 14:35発（05-08・12-15枠）",
    inSlots:  ["t3", "t5"], inTimes:  "13:45 / 22:00着（12-15・19-23枠）",
    saverOneWay: 30800, flexOneWay: 59400, stdAwardRound: 21000,
    tags: ["川平湾・マンタ", "竹富島・西表島", "石垣牛", "全35空港1位SSR"],
    tip: "全35空港お得度No.1！往路は「05:00～08:59」か「12:00～15:59」、復路は「12:00～15:59」か「19:00～23:59」のみ運航"
  }
];

// 状態管理
const state = {
  plan: "saver",        // "saver" (7000m), "flex" (7000m), "southern" (6000m)
  view: "by-area",      // "by-area", "ranking", "map"
  outTimeSlot: "all",   // 往路出発時間帯: "all", "t1", "t2", "t3", "t4", "t5"
  inTimeSlot: "all",    // 復路到着時間帯: "all", "t1", "t2", "t3", "t4", "t5"
  areaFilter: "all",
  searchQuery: "",
  sortBy: "area",       // "area", "fare-desc", "fare-asc", "miles-desc", "dist-desc", "time-asc"
  selectedIds: [],      // 最大4空港
  winnerId: null,       // 4空港から1空港抽選された決定空港ID
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

// 指定された往路出発時間帯・復路到着時間帯に羽田便が運航しているか判定
function checkAirportTimeOperation(ap, outSlot = state.outTimeSlot, inSlot = state.inTimeSlot) {
  const outOk = outSlot === "all" || ap.outSlots.includes(outSlot);
  const inOk = inSlot === "all" || ap.inSlots.includes(inSlot);
  let reason = "";
  if (!outOk && !inOk) {
    reason = "往復とも便なし";
  } else if (!outOk) {
    reason = "往路便なし";
  } else if (!inOk) {
    reason = "復路便なし";
  }
  return {
    isOperating: outOk && inOk,
    outOk,
    inOk,
    reason
  };
}

// 空港ごとの計算値を取得
function computeAirportMetrics(ap, planKey = state.plan) {
  const plan = PLAN_CONFIG[planKey];
  const oneWay = plan.useFlex ? ap.flexOneWay : ap.saverOneWay;
  const roundTrip = oneWay * 2;
  const mileValue = roundTrip / plan.miles;
  const savedMiles = ap.stdAwardRound - plan.miles;
  const mileSaveRate = (savedMiles / ap.stdAwardRound) * 100;
  const cashSavings = roundTrip - plan.miles;
  const cashDiscountRate = (cashSavings / roundTrip) * 100;
  const timeOp = checkAirportTimeOperation(ap);

  // お得度ランク判定（セイバー往復運賃ベース）
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
    rankLabel,
    isOperating: timeOp.isOperating,
    outOk: timeOp.outOk,
    inOk: timeOp.inOk,
    excludeReason: timeOp.reason
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

// 時間帯プリセット一発適用
function applyTimePreset(outSlot, inSlot) {
  state.outTimeSlot = outSlot;
  state.inTimeSlot = inSlot;

  document.querySelectorAll("[data-out-slot]").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-out-slot") === outSlot);
  });
  document.querySelectorAll("[data-in-slot]").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-in-slot") === inSlot);
  });

  pruneExcludedSelectedAirports();
  renderAll();
}

// 時間帯変更時に、運航対象外となった空港を選択中スロットから自動除外する
function pruneExcludedSelectedAirports() {
  const validSelected = state.selectedIds.filter(id => {
    const ap = AIRPORTS.find(a => a.id === id);
    return ap && checkAirportTimeOperation(ap).isOperating;
  });
  if (validSelected.length !== state.selectedIds.length) {
    state.selectedIds = validSelected;
    if (state.winnerId && !state.selectedIds.includes(state.winnerId)) {
      state.winnerId = null;
    }
  }
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

// 地図上の空港クリック（時間帯対象外の空港は選択不可）
function handleMapAirportClick(event, apId) {
  if (mapDragState.hasDragged) {
    event.stopPropagation();
    return;
  }
  const rawAp = AIRPORTS.find(a => a.id === apId);
  if (rawAp && !checkAirportTimeOperation(rawAp).isOperating) {
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

  const statusHtml = ap.isOperating
    ? `<div style="font-size:0.7rem; color:#86efac; margin-bottom:3px;">✅ 選択中の時間帯で運航あり（往路: ${ap.outTimes} / 復路: ${ap.inTimes}）</div>`
    : `<div style="font-size:0.72rem; color:#fca5a5; font-weight:800; margin-bottom:3px;">🚫 時間帯対象外（${ap.excludeReason}）— 往路: ${ap.outTimes} / 復路: ${ap.inTimes}</div>`;

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
    ${statusHtml}
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

  const curveAmt = Math.min(55, dist * 0.16);
  const nx = -dy / dist;
  const ny = dx / dist;
  const sign = dest.x < hnd.x ? -1 : 1;
  const cx = (mx + nx * curveAmt * sign).toFixed(1);
  const cy = (my + ny * curveAmt * sign).toFixed(1);

  return `M${hnd.x},${hnd.y} Q${cx},${cy} ${dest.x},${dest.y}`;
}

// 現在の時間帯条件で運航している空港一覧を取得
function getTimeOperatingAirports() {
  return AIRPORTS
    .map(a => computeAirportMetrics(a, state.plan))
    .filter(a => a.isOperating);
}

// フィルタ＆ソート済み空港リスト取得（時間帯で運航していない路線は検索対象から除外）
function getFilteredAirports() {
  // 1. まず指定された往路・復路時間帯に羽田便が飛んでいる路線のみに絞り込む
  let list = getTimeOperatingAirports();

  // 2. エリアフィルタ
  if (state.areaFilter !== "all") {
    list = list.filter(a => a.area === state.areaFilter);
  }

  // 3. キーワード検索
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

  // 4. ソート
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

// 4空港シミュレーターへの追加/解除（運航対象外の空港は追加不可）
function toggleSelectAirport(id) {
  const rawAp = AIRPORTS.find(a => a.id === id);
  if (rawAp && !checkAirportTimeOperation(rawAp).isOperating) {
    return;
  }
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

// ランダム4空港ガチャを引く（現在選択中の往路・復路時間帯に運航している空港プールからのみ抽選！）
function drawRandomGacha() {
  const pool = getTimeOperatingAirports();
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

// 時間帯フィルターのステータスバー（運航対象数・除外された路線一覧）を描画
function renderTimeFilterStatus() {
  const container = document.getElementById("time-filter-status");
  if (!container) return;

  const allMetrics = AIRPORTS.map(a => computeAirportMetrics(a, state.plan));
  const operatingList = allMetrics.filter(a => a.isOperating);
  const excludedList = allMetrics.filter(a => !a.isOperating);

  const outMeta = TIME_SLOT_META[state.outTimeSlot];
  const inMeta = TIME_SLOT_META[state.inTimeSlot];
  const plan = PLAN_CONFIG[state.plan];

  const avgRound = operatingList.length > 0
    ? Math.round(operatingList.reduce((acc, a) => acc + a.activeRoundTrip, 0) / operatingList.length)
    : 0;
  const avgMileVal = (avgRound / plan.miles).toFixed(2);

  // エリアピルの件数バッジも現在の時間帯対象数に同期更新
  const areaBtns = document.querySelectorAll("[data-area]");
  areaBtns.forEach(btn => {
    const areaKey = btn.getAttribute("data-area");
    if (areaKey === "all") {
      btn.innerHTML = `すべて（${operatingList.length}空港）`;
    } else {
      const cnt = operatingList.filter(a => a.area === areaKey).length;
      const color = AREA_META[areaKey].color;
      btn.innerHTML = `<span class="line-dot" style="background: ${color};"></span>${areaKey}（${cnt}）`;
    }
  });

  if (excludedList.length === 0) {
    container.innerHTML = `
      <div class="time-status-top">
        <div>
          ✅ <strong>現在の時間帯条件：</strong>往路 <code>${outMeta.label}</code> ／ 復路 <code>${inMeta.label}</code>
          — <strong>全35空港すべてが検索・ガチャ対象です</strong>
        </div>
        <div style="font-weight:700; color:var(--jal-red-dark);">
          プール平均往復：${fmtYen(avgRound)}（1マイル＝${avgMileVal}円）
        </div>
      </div>
    `;
    return;
  }

  const excludedChipsHtml = excludedList.map(ap => `
    <span class="excluded-chip" title="往路: ${ap.outTimes} / 復路: ${ap.inTimes}">
      <span>🚫 ${ap.name}(${ap.code})</span>
      <span class="reason-tag">[${ap.excludeReason}]</span>
    </span>
  `).join("");

  container.innerHTML = `
    <div class="time-status-top">
      <div>
        🎯 <strong>現在の時間帯条件：</strong>往路 <code style="color:#c8102e; font-weight:800;">${outMeta.label}</code> × 復路 <code style="color:#0284c7; font-weight:800;">${inMeta.label}</code>
        → <strong>運航対象：<span style="color:#16a34a; font-size:0.95rem;">${operatingList.length}空港</span> / 全35空港</strong>
        <span style="color:#dc2626; font-weight:700; margin-left:6px;">（${excludedList.length}空港を検索対象から除外中）</span>
      </div>
      <div style="font-weight:800; color:var(--jal-red-dark);">
        対象${operatingList.length}空港の平均往復：${fmtYen(avgRound)}（1マイル＝${avgMileVal}円）
      </div>
    </div>
    <div class="excluded-airports-wrap">
      <span style="font-size:0.72rem; font-weight:800; color:#dc2626;">運航便なしのため除外された路線：</span>
      ${excludedChipsHtml}
    </div>
  `;
}

// 日本全国SVG地理マップ＋色分けフライト航路図＋拡大縮小UIを生成
function buildGeoMapSvg({ isLarge = false, showAllNames = false } = {}) {
  const selectedAirports = state.selectedIds
    .map(id => AIRPORTS.find(a => a.id === id))
    .filter(Boolean)
    .map(a => computeAirportMetrics(a, state.plan));

  const activeAreas = new Set(selectedAirports.map(a => a.area));
  const hasSelection = selectedAirports.length > 0;
  const allMetrics = AIRPORTS.map(a => computeAirportMetrics(a, state.plan));

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

  const insetDivider = `
    <path d="M24,615 L335,615 L365,645 L365,768" fill="none" stroke="#94a3b8" stroke-width="1.3" stroke-dasharray="5 4" opacity="0.7" />
    <text x="34" y="632" font-size="10.5" font-weight="800" fill="#64748b">🌺 奄美・沖縄・先島諸島エリア</text>
  `;

  // 2. 全35空港へのベースフライトアーク（時間帯対象外の路線は極薄点線に）
  const baseFlightArcs = allMetrics.map(ap => {
    const pathD = getFlightArcPath(ap.id);
    if (!ap.isOperating) {
      return `<path d="${pathD}" fill="none" stroke="#cbd5e1" stroke-width="1" stroke-dasharray="3 3" opacity="0.22" />`;
    }
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

  const airportDots = allMetrics.map(ap => {
    const geo = AIRPORT_GEO[ap.id];
    if (!geo) return "";
    const color = ap.isOperating ? AREA_META[ap.area].color : "#cbd5e1";
    const isSel = state.selectedIds.includes(ap.id);
    const r = isSel ? 6.5 : (ap.isOperating ? 4.5 : 3.2);
    const showName = ap.isOperating && (showAllNames || (!hasSelection && majorLandmarks.has(ap.id)));

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
         style="cursor:${ap.isOperating ? "pointer" : "not-allowed"}; opacity:${ap.isOperating ? 1 : 0.45};">
        <circle cx="${geo.x}" cy="${geo.y}" r="10" fill="transparent" />
        <circle cx="${geo.x}" cy="${geo.y}" r="${r}" fill="${ap.isOperating ? "#ffffff" : "#e2e8f0"}" stroke="${color}" stroke-width="${isSel ? 3 : 2.2}" class="map-st-dot" />
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
        <circle cx="${geo.x}" cy="${geo.y}" r="${isWinner ? 15 : 12}" stroke="${badgeColor}" class="pulse-ring" />
        <line x1="${geo.x}" y1="${geo.y}" x2="${anchorX}" y2="${anchorY}" stroke="${badgeColor}" stroke-width="2" stroke-dasharray="3 2" />
        <circle cx="${geo.x}" cy="${geo.y}" r="${isWinner ? 11 : 9.5}" fill="${badgeColor}" stroke="#ffffff" stroke-width="2.2" />
        <text x="${geo.x}" y="${geo.y + 3.8}" text-anchor="middle" font-size="11" font-weight="900" fill="#ffffff">${isWinner ? "★" : numStr}</text>

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
      <text x="210" y="260" font-size="13" font-weight="800" fill="#93c5fd" letter-spacing="0.2em">日本海</text>
      <text x="485" y="545" font-size="13" font-weight="800" fill="#93c5fd" letter-spacing="0.2em">太平洋</text>

      ${insetDivider}
      <g>${regionPolys}</g>
      <g>${regionLabels}</g>
      <g>${baseFlightArcs}</g>
      <g>${activeFlightArcs}</g>
      <g>${airportDots}</g>
      ${originMarker}
      <g>${selectedOverlays}</g>
    </svg>
  `;
}

// ヘッダー統計の更新（現在の時間帯対象プールに連動）
function renderHeaderStats() {
  const opMetrics = getTimeOperatingAirports();
  const baseList = opMetrics.length > 0 ? opMetrics : AIRPORTS.map(a => computeAirportMetrics(a, state.plan));
  const maxAp = baseList.reduce((m, a) => a.activeRoundTrip > m.activeRoundTrip ? a : m, baseList[0]);
  const minAp = baseList.reduce((m, a) => a.activeRoundTrip < m.activeRoundTrip ? a : m, baseList[0]);
  const avgRound = Math.round(baseList.reduce((acc, a) => acc + a.activeRoundTrip, 0) / baseList.length);
  const avgMileVal = (avgRound / PLAN_CONFIG[state.plan].miles).toFixed(2);
  const plan = PLAN_CONFIG[state.plan];

  const el = document.getElementById("header-stats");
  el.innerHTML = `
    <div class="stat-pill">
      <span class="stat-pill-label">必要マイル（運航対象空港）</span>
      <span class="stat-pill-value">${plan.miles.toLocaleString()}m <small style="font-size:0.75rem;">(${opMetrics.length}/35空港)</small></span>
    </div>
    <div class="stat-pill">
      <span class="stat-pill-label">対象${opMetrics.length}空港 平均往復</span>
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
          <div style="font-size: 0.68rem; color: var(--text-muted); margin-top: 2px;">
            🛫 ${ap.outTimes}<br>🛬 ${ap.inTimes}
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
              🕒 往路（羽田発）: ${winAp.outTimes} ／ 復路（羽田着）: ${winAp.inTimes}
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
        1. 上のパネルで<strong>往路出発時間帯・復路到着時間帯（5枠＋指定なし）</strong>を選ぶと、その時間帯に運航していない路線が自動的に候補から除外されます。<br>
        2. 「<strong>🎲 条件に合う空港から4空港ガチャを引く</strong>」ボタンを押すか、地図・空港カードをクリックして4空港を選ぶと、期待値と1マイル単価が自動計算されます！
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

  const closeAirports = selectedAirports.filter(a => ["ngo", "kmq", "itm", "kix", "gaj"].includes(a.id));
  const ssrAirports = selectedAirports.filter(a => ["isg", "mmy", "ueo", "oka", "asj", "mmb", "kuh"].includes(a.id));
  let adviceText = "";
  if (closeAirports.length > 0) {
    const names = closeAirports.map(a => `<strong>${a.name}（${a.code}）</strong>`).join("・");
    adviceText = `⚠️ 候補に近距離路線の ${names} が含まれています。「往路：09:00～11:59 × 復路：12:00～15:59」などに時間帯を変更すると、中部・山形・関西は運航がないため候補から完全に外せます。`;
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

// 5枠のミニ時間帯バッジHTML生成（空港カード用）
function renderScheduleMatrixHtml(ap) {
  const outPills = TIME_SLOTS_ORDER.map(slotKey => {
    const hasFlight = ap.outSlots.includes(slotKey);
    const isMatched = state.outTimeSlot === slotKey && hasFlight;
    const cls = [
      "slot-pill-mini",
      hasFlight ? "has-flight-out" : "",
      isMatched ? "matched-active" : ""
    ].filter(Boolean).join(" ");
    return `<span class="${cls}" title="往路（羽田発）${TIME_SLOT_META[slotKey].label}: ${hasFlight ? "運航あり" : "運航なし"}">${TIME_SLOT_META[slotKey].short}</span>`;
  }).join("");

  const inPills = TIME_SLOTS_ORDER.map(slotKey => {
    const hasFlight = ap.inSlots.includes(slotKey);
    const isMatched = state.inTimeSlot === slotKey && hasFlight;
    const cls = [
      "slot-pill-mini",
      hasFlight ? "has-flight-in" : "",
      isMatched ? "matched-active" : ""
    ].filter(Boolean).join(" ");
    return `<span class="${cls}" title="復路（羽田着）${TIME_SLOT_META[slotKey].label}: ${hasFlight ? "運航あり" : "運航なし"}">${TIME_SLOT_META[slotKey].short}</span>`;
  }).join("");

  return `
    <div class="schedule-matrix">
      <div class="schedule-row">
        <span class="schedule-row-label" title="${ap.outTimes}">🛫 往路羽田発</span>
        <div class="slot-pills-mini">${outPills}</div>
      </div>
      <div class="schedule-row">
        <span class="schedule-row-label" title="${ap.inTimes}">🛬 復路羽田着</span>
        <div class="slot-pills-mini">${inPills}</div>
      </div>
    </div>
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

        ${renderScheduleMatrixHtml(ap)}

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
              <h2 class="line-title">${areaName}エリア（運航対象 ${areaAirports.length}空港）</h2>
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
    html = `<div style="background:#fff; padding:40px; text-align:center; border-radius:16px; color:var(--text-sub);">指定された時間帯・検索条件に該当する運航路線がありません。時間帯または検索条件を変更してください。</div>`;
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
          <div style="font-size:0.72rem; color:#059669; font-weight:700;">通常比 -${ap.savedMiles.toLocaleString()}m (${ap.mileSaveRate.toFixed(0)}%OFF)</div>
        </td>
        <td style="font-size:0.72rem; color:var(--text-sub);">
          <div>🛫 <strong>往路:</strong> ${ap.outTimes}</div>
          <div style="margin-top:2px;">🛬 <strong>復路:</strong> ${ap.inTimes}</div>
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
        <span style="font-size: 0.84rem; font-weight: 700; color: var(--text-sub);">🏆 羽田発・運航対象 ${airports.length}空港 お得度・発着時間帯比較一覧</span>
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
            <th>1マイル価値 / 節約マイル</th>
            <th>羽田発着の運航時刻目安</th>
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
      return `
        <div class="map-node ${isSelected ? "selected-in-sim" : ""}"
             style="--track-color: ${meta.color}; ${isFilteredOut ? "opacity: 0.32; cursor: not-allowed;" : ""}"
             onclick="toggleSelectAirport('${ap.id}')">
          <div class="map-node-top">
            <span>${isSelected ? `<span class="slot-num-badge" style="background:${meta.color};">${selIdx + 1}</span>` : ""}${ap.name} <small style="color:var(--text-muted); font-family:monospace;">(${ap.code})</small></span>
            <span class="rank-badge rank-${ap.rank}" style="font-size:0.65rem; padding:2px 6px;">${ap.rank}</span>
          </div>
          <div class="map-node-bottom">
            <span>往復 <strong>${fmtYen(ap.activeRoundTrip)}</strong></span>
            <span style="color:#c8102e; font-weight:700;">1m=${ap.mileValue.toFixed(1)}円</span>
          </div>
          <div style="font-size:0.66rem; color:${ap.isOperating ? "var(--text-muted)" : "#dc2626"}; margin-top:3px;">
            ${ap.isOperating ? `🛫${ap.outTimes}` : `🚫 時間帯対象外（${ap.excludeReason}）`}
          </div>
        </div>
      `;
    }).join("");

    const opCount = areaAirports.filter(a => a.isOperating).length;

    return `
      <div class="map-line-col">
        <div class="map-col-header" style="background: ${meta.color};">
          ${areaName}（${opCount}/${areaAirports.length}）
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
            選択した時間帯に運航している空港のみハイライト表示されます（運航なしの路線はグレーアウト）。
          </div>
        </div>
        <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
          <label style="font-size:0.8rem; font-weight:700; cursor:pointer; display:inline-flex; align-items:center; gap:5px;">
            <input type="checkbox" ${state.showAllMapLabels ? "checked" : ""} onchange="state.showAllMapLabels = this.checked; renderAll();" />
            地図上に運航対象の全空港名を表示
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
  renderTimeFilterStatus();
  renderHeaderStats();
  renderSimulator();

  const filtered = getFilteredAirports();
  const opCount = getTimeOperatingAirports().length;
  const rankMap = getFareRankMap();

  document.getElementById("result-count-label").textContent = `表示中：${filtered.length} 空港（時間帯対象 ${opCount} / 全35空港）`;

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

  // 往路出発時間帯ボタン（5枠＋時間指定なし）
  document.querySelectorAll("[data-out-slot]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-out-slot]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.outTimeSlot = btn.getAttribute("data-out-slot");
      pruneExcludedSelectedAirports();
      renderAll();
    });
  });

  // 復路到着時間帯ボタン（5枠＋時間指定なし）
  document.querySelectorAll("[data-in-slot]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-in-slot]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.inTimeSlot = btn.getAttribute("data-in-slot");
      pruneExcludedSelectedAirports();
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
