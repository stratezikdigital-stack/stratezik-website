/** Industry archetypes + bespoke verticals — ported from GBP Audit prototype. */
// @ts-nocheck

const BESPOKE = {
  pest: {
    aliases:['pest','exterm','rodent','termite','bed bug','wildlife'],
    name:'pest control', defBiz:'ShieldGuard Pest Control', defCity:'Scarborough, ON',
    query:'pest control near me', score:58, grade:'C', verdict:'Claimed, but coasting.',
    rankNum:7, rankWord:'7th', moneyLine:'14 calls a month', youRating:'4.6', youReviews:37,
    gapText:'↓ 4 more results ↓', topCompetitor:'GTA Pest Defenders',
    winners:[
      {rank:'1',rankColor:'#F4D03C',name:'GTA Pest Defenders',rating:'4.9',reviews:312,badge:'Open 24/7 · responds in ~4h'},
      {rank:'2',rankColor:'#CBBFA9',name:'Scarborough Pest Pros',rating:'4.8',reviews:204,badge:'Open now · same-day service'},
      {rank:'3',rankColor:'#C98A4B',name:'ShieldGuard Exterminators',rating:'4.7',reviews:158,badge:'Open now · licensed & insured'},
    ],
    pillars:[
      {name:'Reputation',weight:'25%',score:48,note:'37 reviews vs a 225 pack average. No owner replies in 90 days.'},
      {name:'Engagement',weight:'20%',score:35,note:'No Google posts in 4 months. Messaging is off. No booking link.'},
      {name:'Profile completeness',weight:'10%',score:70,note:'Hours & contact set, but no services listed and a thin description.'},
      {name:'Visual',weight:'15%',score:55,note:'12 photos, mostly a logo. No team, no on-the-job shots.'},
      {name:'Competitive',weight:'15%',score:40,note:'Behind the top 3 on reviews, photos and posting on every axis.'},
      {name:'Local consistency',weight:'15%',score:66,note:'NAP mostly consistent; 2 directories show an old phone number.'},
    ],
    quickWins:[
      {n:'01',tag:'CATEGORY',impactTag:'≈3x more "near me" searches',title:'Your primary category is too narrow to catch the urgent searches',lossLine:'The #1 result is set to "Pest control service" with 3 backup categories. Yours is locked to one — so Google skips you for "exterminator", "wildlife removal" and "rodent" searches people make in a panic.',hasCopy:false,where:'Edit profile → Business category. Set Primary to "Pest control service", then add "Animal control service" and "Fumigation service" as additional categories.'},
      {n:'02',tag:'DESCRIPTION',impactTag:'matches 11pm panic searches',title:'No "24/7 / emergency" signal — the words pest customers type at night',lossLine:'Your competitor leads with "24/7 emergency service." You say nothing about availability, so emergency searches route straight to them. Google also reads your description for context — yours is nearly empty.',hasCopy:true,fixLabel:'Paste as your business description:',fixText:'[Biz] provides fast, licensed pest control across [City] and the GTA — ants, cockroaches, rodents, wasps, and wildlife. Same-day and emergency callouts available. Family- and pet-safe treatments, upfront pricing, and a workmanship guarantee on every visit. Call now for a free quote.',where:'Edit profile → "Description". Then switch ON the "Onsite services" and "Online appointments" attributes.'},
      {n:'03',tag:'REVIEWS',impactTag:'strongest weekend-fixable signal',title:'37 reviews — and not one reply in 90 days',lossLine:'The three shops above you average 225 reviews and reply within hours. Review volume plus a visible response rate is the single biggest thing keeping you out of the pack.',hasCopy:true,fixLabel:'Text this the day after every job:',fixText:'Hi [name] — thanks for trusting [Biz] with your pest problem! If we did right by you, a quick Google review helps your neighbours find us and means a lot to our small team: [your review link]. Thank you! — [your name]',where:'Send after each completed job. Then reply to your last 5 reviews today — even a one-line thanks counts.'},
    ],
    competitorGaps:[
      {metric:'Total reviews',you:'37',them:'312',youN:37,themN:312},
      {metric:'Photos',you:'12',them:'140',youN:12,themN:140},
      {metric:'Posts / month',you:'0',them:'8',youN:0,themN:8},
      {metric:'Avg. reply time',you:'none',them:'~4h',youN:0,themN:10},
    ],
    revenueLine:'Closing the 275-review gap with GTA Pest Defenders is the difference between page-2 invisible and a top-3 pin. At your category\'s search volume in [City], that\'s the ~14 calls/month you\'re leaving on the table.',
    roadmap:[
      {weeks:'Wk 1–2',title:'Fix the foundations',desc:'Categories, emergency description, services list, attributes, and the 2 stale citations — all the items above, locked in.'},
      {weeks:'Wk 3–6',title:'Build the reputation engine',desc:'Automate the review request after every job, reply to 100% of reviews, target +30 fresh reviews to close the gap.'},
      {weeks:'Wk 7–12',title:'Overtake the pack',desc:'Weekly Google posts, 40+ on-the-job photos, seed Q&A, and push for a top-3 pin on "pest control near me".'},
    ],
  },
  hvac: {
    aliases:['hvac','furnace','heating','cooling','air condition','heat pump','ac repair','ac install','ductwork','boiler'],
    name:'HVAC', defBiz:'Reliable Climate HVAC', defCity:'Scarborough, ON',
    query:'furnace repair near me', score:64, grade:'C+', verdict:'Good bones, invisible in season.',
    rankNum:6, rankWord:'6th', moneyLine:'9 service calls a month', youRating:'4.5', youReviews:64,
    gapText:'↓ 3 more results ↓', topCompetitor:'Reliable Climate HVAC',
    winners:[
      {rank:'1',rankColor:'#F4D03C',name:'Reliable Climate HVAC',rating:'4.9',reviews:421,badge:'Open 24/7 · emergency no-heat service'},
      {rank:'2',rankColor:'#CBBFA9',name:'GTA Heating & Cooling',rating:'4.8',reviews:289,badge:'Open now · same-day furnace repair'},
      {rank:'3',rankColor:'#C98A4B',name:'TempPro Mechanical',rating:'4.7',reviews:176,badge:'Open now · financing available'},
    ],
    pillars:[
      {name:'Reputation',weight:'25%',score:58,note:'64 reviews, decent 4.5 — but velocity has stalled the last 6 months.'},
      {name:'Engagement',weight:'20%',score:30,note:'No posts going into peak season. No booking link, no live offer.'},
      {name:'Profile completeness',weight:'10%',score:62,note:'Empty services list — you don\'t surface for "AC install" or "heat pump".'},
      {name:'Visual',weight:'15%',score:60,note:'Truck and logo shots only. No installs, no team, no before/after.'},
      {name:'Competitive',weight:'15%',score:45,note:'Top shops post weekly seasonal offers and answer faster after hours.'},
      {name:'Local consistency',weight:'15%',score:72,note:'NAP solid. Service-area set, but only 3 of 9 neighbourhoods listed.'},
    ],
    quickWins:[
      {n:'01',tag:'SERVICES',impactTag:'each service = a new search surface',title:'Your services list is empty — so you vanish for "AC install" & "heat pump"',lossLine:'Google turns each listed service into its own searchable surface. With nothing listed, you only show for your exact business name — not the jobs people actually search for.',hasCopy:false,where:'Edit profile → Services. Add: Furnace repair, Furnace installation, AC repair, AC installation, Heat pump installation, Duct cleaning, Emergency HVAC repair, Maintenance plans. Set Primary category to "HVAC contractor".'},
      {n:'02',tag:'POSTS',impactTag:'feeds engagement going into peak',title:'Zero posts heading into your busiest season',lossLine:'Your top competitor posts a tune-up offer every week. You haven\'t posted in 5 months. Posts are a live engagement signal Google rewards — and a free offer in front of searchers.',hasCopy:true,fixLabel:'Post today (Add update → Offer):',fixText:'🔧 [City] Furnace Tune-Up — $129 (reg. $189)\nGet ahead of the cold. Our licensed techs run a 21-point inspection, clean and calibrate your system, and catch small problems before they become no-heat emergencies. Limited weekend slots — book online or call us.',where:'Add update → Offer. Repeat weekly through heating and cooling season.'},
      {n:'03',tag:'CALLS',impactTag:'emergency jobs are won on speed',title:'No booking link, and after-hours calls hit a dead voicemail',lossLine:'No-heat emergencies go to whoever answers first. A generic voicemail loses the job to the shop with a 24/7 line. Capture the call instead of leaking it.',hasCopy:true,fixLabel:'Use as your after-hours greeting:',fixText:'You\'ve reached [Biz]\'s 24/7 line. For a no-heat or no-cool emergency, press 1 to reach our on-call tech. For everything else, leave a message or book online and we\'ll confirm first thing in the morning. Thanks for calling [Biz].',where:'Edit profile → add an "Appointment" / booking link and enable Messaging so texts come straight to your phone.'},
    ],
    competitorGaps:[
      {metric:'Total reviews',you:'64',them:'421',youN:64,themN:421},
      {metric:'Services listed',you:'0',them:'11',youN:0,themN:11},
      {metric:'Posts / month',you:'0',them:'6',youN:0,themN:6},
      {metric:'Service areas',you:'3',them:'9',youN:3,themN:9},
    ],
    revenueLine:'Reliable Climate captures the after-hours no-heat calls you\'re missing. Listing your services and answering fast is worth an estimated ~9 service calls/month at your average ticket in [City].',
    roadmap:[
      {weeks:'Wk 1–2',title:'Open every search surface',desc:'Full services list, primary category, all 9 service areas, booking link and messaging — the items above, done.'},
      {weeks:'Wk 3–6',title:'Win the season',desc:'Weekly seasonal offer posts, after-hours line live, and a review push targeting +25 to restart velocity.'},
      {weeks:'Wk 7–12',title:'Take the no-heat call',desc:'Install/before-after photos, Q&A on financing & emergencies, and a top-3 pin push on "furnace repair near me".'},
    ],
  },
  dental: {
    aliases:['dent','dental','orthodont','denture','endodont'],
    name:'a dental clinic', defBiz:'Eglinton Family Dental', defCity:'Scarborough, ON',
    query:'dentist near me', score:61, grade:'C+', verdict:'Trusted in person, hidden online.',
    rankNum:5, rankWord:'5th', moneyLine:'12 new-patient calls a month', youRating:'4.7', youReviews:98,
    gapText:'↓ 2 more results ↓', topCompetitor:'Eglinton Smile Studio',
    winners:[
      {rank:'1',rankColor:'#F4D03C',name:'Eglinton Smile Studio',rating:'4.9',reviews:530,badge:'Accepting new patients · book online'},
      {rank:'2',rankColor:'#CBBFA9',name:'Scarborough Family Dental',rating:'4.9',reviews:388,badge:'Open now · emergency appointments'},
      {rank:'3',rankColor:'#C98A4B',name:'BrightPath Dental',rating:'4.8',reviews:245,badge:'Direct insurance billing · evenings'},
    ],
    pillars:[
      {name:'Reputation',weight:'25%',score:64,note:'Strong 4.7 and 98 reviews — but new reviews have slowed to a trickle.'},
      {name:'Engagement',weight:'20%',score:38,note:'No online booking link. Q&A is empty. Messaging disabled.'},
      {name:'Profile completeness',weight:'10%',score:55,note:'Missing the attributes patients filter by: new patients, accessibility, languages.'},
      {name:'Visual',weight:'15%',score:42,note:'Every photo is the building exterior. No team, no office, no smiles.'},
      {name:'Competitive',weight:'15%',score:48,note:'Top clinics show booking, insurance and 60+ trust-building photos.'},
      {name:'Local consistency',weight:'15%',score:75,note:'NAP and hours consistent. Health-directory listings could be tightened.'},
    ],
    quickWins:[
      {n:'01',tag:'ATTRIBUTES',impactTag:'appear when patients filter',title:'You\'re missing the attributes patients filter by',lossLine:'Patients narrow Maps by "accepts new patients", accessibility and languages. With those blank, Google hides you from the very filters that pre-qualify a new patient.',hasCopy:false,where:'Edit profile → set Primary "Dentist", add "Cosmetic dentist" and "Emergency dental service". Turn ON: Accepts new patients, Wheelchair-accessible entrance, Washroom, Languages spoken, and Appointment required.'},
      {n:'02',tag:'PHOTOS',impactTag:'trust is the whole game',title:'Every photo is the building — none of the team or the chair',lossLine:'The #1 clinic has 60+ photos: reception, treatment rooms, the team, real smiles. Patients choose the office that feels safe and modern before they ever pick up the phone. Photos are the cheapest trust you can add.',hasCopy:false,where:'Add 10–15 photos this week: reception, a treatment room, the full team, and 2–3 before/after smiles (with written patient consent). Refresh monthly.'},
      {n:'03',tag:'BOOKING',impactTag:'bookings + reviews move you up',title:'No online booking, and reviews have stalled',lossLine:'New patients increasingly book without calling. No booking link sends them to a competitor who has one. Meanwhile your review flow has slowed — the trust signal that put you on page one is fading.',hasCopy:true,fixLabel:'Hand this at checkout / text after visits:',fixText:'Thank you for visiting [Biz]! We\'d be so grateful for a quick Google review about your experience today — it helps other [City] families find a dental home they can trust: [review link]. See you at your next checkup!',where:'Edit profile → add a "Book online" link to your scheduler. Reply to every review — especially any clinical concern — calmly and professionally.'},
    ],
    competitorGaps:[
      {metric:'Total reviews',you:'98',them:'530',youN:98,themN:530},
      {metric:'Photos',you:'9',them:'64',youN:9,themN:64},
      {metric:'Online booking',you:'no',them:'yes',youN:0,themN:10},
      {metric:'Q&A answered',you:'0',them:'12',youN:0,themN:12},
    ],
    revenueLine:'Eglinton Smile Studio converts searchers with booking, insurance clarity and trust photos. Matching them is worth an estimated ~12 new-patient calls/month at your average patient value in [City].',
    roadmap:[
      {weeks:'Wk 1–2',title:'Complete the trust profile',desc:'All attributes, primary/secondary categories, booking link, and the first 15 trust photos — every item above.'},
      {weeks:'Wk 3–6',title:'Restart the review flow',desc:'Checkout review cards, post-visit texts, reply to 100% of reviews; target +40 to reclaim momentum.'},
      {weeks:'Wk 7–12',title:'Own the local pack',desc:'Answer Q&A on insurance & emergencies, monthly photo refresh, and a top-3 push on "dentist near me".'},
    ],
  },
};

// ── archetype data ─────────────────────────────────────────────────────────
const ARCH = {
  trade: {
    score:58,grade:'C',verdict:'Claimed, but coasting.',
    rankNum:7,rankWord:'7th',moneyN:'12',moneyUnit:'service calls a month',
    youRating:'4.5',youReviews:41,gapText:'↓ 4 more results ↓',queryWord:'[trade] near me',
    winners:[
      {rank:'1',rankColor:'#F4D03C',name:'[City] [Trade] Pros',rating:'4.9',reviews:286,badge:'Open 24/7 · responds in ~3h'},
      {rank:'2',rankColor:'#CBBFA9',name:'Reliable [Trade] Co.',rating:'4.8',reviews:193,badge:'Open now · same-day service'},
      {rank:'3',rankColor:'#C98A4B',name:'Top [Trade] [City]',rating:'4.7',reviews:147,badge:'Open now · licensed & insured'},
    ],
    pillars:[
      {name:'Reputation',weight:'25%',score:47,note:'41 reviews vs a ~210 pack average. No owner replies in 90 days.'},
      {name:'Engagement',weight:'20%',score:34,note:'No Google posts in months. Messaging off. No booking link.'},
      {name:'Profile completeness',weight:'10%',score:68,note:'Hours set, but no services listed and a thin description.'},
      {name:'Visual',weight:'15%',score:52,note:'A handful of photos, mostly a logo. No team or on-the-job shots.'},
      {name:'Competitive',weight:'15%',score:40,note:'Behind the top 3 on reviews, photos and posting on every axis.'},
      {name:'Local consistency',weight:'15%',score:64,note:'NAP mostly consistent; a couple of directories show stale info.'},
    ],
    quickWins:[
      {n:'01',tag:'CATEGORY',impactTag:'≈3x more "near me" searches',title:'Your primary category is too narrow to catch urgent searches',lossLine:'The #1 result uses a precise primary category plus backups, so Google shows it for far more "[trade] near me" variations. With one narrow category, you\'re skipped for the searches people make in a hurry.',hasCopy:false,where:'Edit profile → Business category. Set the most specific primary category for [trade], then add 2 related categories as backups.'},
      {n:'02',tag:'DESCRIPTION',impactTag:'matches how people search',title:'No same-day / emergency signal in your description',lossLine:'Your competitor leads with availability and exactly what they do. You say almost nothing, so Google has little context and urgent searchers skip you. Your description is one of the few fields you fully control.',hasCopy:true,fixLabel:'Paste as your business description:',fixText:'[Biz] provides fast, reliable [trade] services across [City] and the surrounding area. Same-day and emergency availability, upfront pricing, licensed and insured, and a workmanship guarantee on every job. Call now for a free quote.',where:'Edit profile → "Description". Then switch ON the "Onsite services" / "Online appointments" attributes that apply.'},
      {n:'03',tag:'REVIEWS',impactTag:'strongest weekend-fixable signal',title:'Reviews have stalled — and replies are missing',lossLine:'The shops above you have far more reviews and reply within hours. Review volume plus a visible response rate is the single biggest thing keeping you out of the pack.',hasCopy:true,fixLabel:'Text this the day after every job:',fixText:'Hi [name] — thanks for trusting [Biz]! If we did right by you, a quick Google review helps your neighbours find us and means a lot to our small team: [your review link]. Thank you! — [your name]',where:'Send after each completed job. Then reply to your last 5 reviews today — even a one-line thanks counts.'},
    ],
    competitorGaps:[
      {metric:'Total reviews',you:'41',them:'286',youN:41,themN:286},
      {metric:'Photos',you:'14',them:'120',youN:14,themN:120},
      {metric:'Posts / month',you:'0',them:'7',youN:0,themN:7},
      {metric:'Avg. reply time',you:'none',them:'~3h',youN:0,themN:10},
    ],
    revenueLine:'Closing the review and photo gap with [City] [Trade] Pros is the difference between page-2 invisible and a top-3 pin. At [trade] search volume in [City], that\'s the service calls you\'re leaving on the table each month.',
    roadmap:[
      {weeks:'Wk 1–2',title:'Fix the foundations',desc:'Categories, description, services list, attributes and any stale citations — all the items above, locked in.'},
      {weeks:'Wk 3–6',title:'Build the reputation engine',desc:'Automate the review request after every job, reply to 100% of reviews, target +30 fresh reviews.'},
      {weeks:'Wk 7–12',title:'Overtake the pack',desc:'Weekly Google posts, 40+ on-the-job photos, seed Q&A, and push for a top-3 pin on "[trade] near me".'},
    ],
  },
  health: {
    score:61,grade:'C+',verdict:'Trusted in person, hidden online.',
    rankNum:5,rankWord:'5th',moneyN:'11',moneyUnit:'new-client enquiries a month',
    youRating:'4.7',youReviews:96,gapText:'↓ 2 more results ↓',queryWord:'[trade] near me',
    winners:[
      {rank:'1',rankColor:'#F4D03C',name:'[City] [Trade] Clinic',rating:'4.9',reviews:512,badge:'Accepting new clients · book online'},
      {rank:'2',rankColor:'#CBBFA9',name:'[Trade] Health Centre',rating:'4.9',reviews:347,badge:'Open now · direct insurance billing'},
      {rank:'3',rankColor:'#C98A4B',name:'Premier [Trade] [City]',rating:'4.8',reviews:223,badge:'Evening & weekend appointments'},
    ],
    pillars:[
      {name:'Reputation',weight:'25%',score:64,note:'96 reviews and a strong rating — but new reviews have slowed to a trickle.'},
      {name:'Engagement',weight:'20%',score:38,note:'No online booking link. Q&A empty. Messaging disabled.'},
      {name:'Profile completeness',weight:'10%',score:54,note:'Missing the attributes clients filter by: new clients, accessibility, languages.'},
      {name:'Visual',weight:'15%',score:43,note:'Mostly exterior shots. No team, no rooms, no reassuring detail.'},
      {name:'Competitive',weight:'15%',score:47,note:'Top practices show booking, clear info and 60+ trust photos.'},
      {name:'Local consistency',weight:'15%',score:73,note:'NAP and hours consistent. Health-directory listings could be tightened.'},
    ],
    quickWins:[
      {n:'01',tag:'ATTRIBUTES',impactTag:'appear when clients filter',title:'You\'re missing the attributes clients filter by',lossLine:'People narrow Maps by "accepts new clients", accessibility, languages and insurance. With those blank, Google hides you from the very filters that pre-qualify a new client.',hasCopy:false,where:'Edit profile → set the most specific primary category for [trade], add 1–2 related ones, then turn ON: Accepts new patients/clients, Wheelchair-accessible entrance, Washroom, Languages spoken, Appointment required.'},
      {n:'02',tag:'PHOTOS',impactTag:'trust is the whole game',title:'Your photos are the building — not the people or the space',lossLine:'The top result has 60+ photos: reception, rooms, the team, real results. People choose the place that feels safe and modern before they ever call. Photos are the cheapest trust you can add.',hasCopy:false,where:'Add 10–15 photos this week: reception, a treatment room, the full team, and a few before/after results (with written consent). Refresh monthly.'},
      {n:'03',tag:'REVIEWS',impactTag:'bookings + reviews move you up',title:'No online booking, and reviews have stalled',lossLine:'People increasingly book without calling — no booking link sends them to someone who has one. Meanwhile your review flow has slowed, and that\'s the trust signal that put you on page one.',hasCopy:true,fixLabel:'Hand this at checkout / text after visits:',fixText:'Thank you for visiting [Biz]! We\'d be so grateful for a quick Google review about your experience today — it helps other [City] families find a [trade] they can trust: [review link]. See you next time!',where:'Edit profile → add a "Book online" link to your scheduler. Reply to every review — especially any concern — calmly and professionally.'},
    ],
    competitorGaps:[
      {metric:'Total reviews',you:'96',them:'512',youN:96,themN:512},
      {metric:'Photos',you:'9',them:'64',youN:9,themN:64},
      {metric:'Online booking',you:'no',them:'yes',youN:0,themN:10},
      {metric:'Q&A answered',you:'0',them:'12',youN:0,themN:12},
    ],
    revenueLine:'The [City] [Trade] Clinic converts searchers with booking, clear info and trust photos. Matching them is worth a steady run of new-client enquiries every month at your average client value.',
    roadmap:[
      {weeks:'Wk 1–2',title:'Complete the trust profile',desc:'All attributes, precise categories, a booking link, and the first 15 trust photos — every item above.'},
      {weeks:'Wk 3–6',title:'Restart the review flow',desc:'Checkout review cards, post-visit texts, reply to 100% of reviews; target +40 to reclaim momentum.'},
      {weeks:'Wk 7–12',title:'Own the local pack',desc:'Answer common Q&A, monthly photo refresh, and a top-3 push on "[trade] near me".'},
    ],
  },
  hospitality: {
    score:63,grade:'C+',verdict:'Busy in person, invisible to new faces.',
    rankNum:6,rankWord:'6th',moneyN:'40',moneyUnit:'new customers a month',
    youRating:'4.4',youReviews:128,gapText:'↓ 3 more results ↓',queryWord:'best [trade]',
    winners:[
      {rank:'1',rankColor:'#F4D03C',name:'The [City] [Trade]',rating:'4.8',reviews:642,badge:'Open now · reserve online'},
      {rank:'2',rankColor:'#CBBFA9',name:'[Trade] House',rating:'4.7',reviews:418,badge:'Open now · walk-ins welcome'},
      {rank:'3',rankColor:'#C98A4B',name:'Old Town [Trade]',rating:'4.6',reviews:265,badge:'Popular with locals'},
    ],
    pillars:[
      {name:'Reputation',weight:'25%',score:58,note:'128 reviews but a 4.4 average and slow replies — newer spots are catching up.'},
      {name:'Engagement',weight:'20%',score:33,note:'No posts, no offers, no booking/order link. Nothing fresh for Google.'},
      {name:'Profile completeness',weight:'10%',score:60,note:'No menu/services link and missing attributes (takeout, outdoor seating, etc.).'},
      {name:'Visual',weight:'15%',score:45,note:'A logo and a storefront shot. None of the product, the room or the crowd.'},
      {name:'Competitive',weight:'15%',score:44,note:'Top spots post weekly, show 80+ photos and reply to every review.'},
      {name:'Local consistency',weight:'15%',score:70,note:'Hours mostly right, but holiday hours and one directory are out of date.'},
    ],
    quickWins:[
      {n:'01',tag:'PHOTOS',impactTag:'people pick with their eyes',title:'Your photos don\'t sell the experience',lossLine:'The top spot has 80+ photos of the product, the room and people enjoying it. Yours are a logo and a storefront. On Maps, people choose where to go by scrolling photos — yours give them nothing to crave.',hasCopy:false,where:'Add 15–20 photos this week: your best dishes/products/looks, the space, the team, and happy customers (with consent). Refresh weekly — fresh photos are an engagement signal.'},
      {n:'02',tag:'POSTS',impactTag:'puts your specials in search',title:'You\'re not posting specials where searchers look',lossLine:'Your competitors post weekly specials and events straight to Google. You haven\'t posted, so searchers see a static, stale listing — and Google reads no fresh activity.',hasCopy:true,fixLabel:'Post this today (Add update → Offer):',fixText:'✨ This week at [Biz] — ask us about our [your special here]! Find us in [City]. Tag a friend and come on by. 📍 We\'re on the map · book or order online: [link]',where:'Add update → Offer / What\'s new, weekly. Add a booking or order link, and turn on the attributes that apply (takeout, delivery, outdoor seating, walk-ins, etc.).'},
      {n:'03',tag:'REVIEWS',impactTag:'first thing new customers read',title:'Reviews have gone quiet',lossLine:'Fresh reviews are the first thing a new customer reads — and a steady stream is a top ranking signal. Yours have slowed while busier-looking spots pull ahead.',hasCopy:true,fixLabel:'Put this on a table card / receipt:',fixText:'Loved your visit to [Biz]? A quick Google review helps other [City] locals find us — and makes our day! Just search "[Biz] [City]" on Google. Thank you! 🙏',where:'Print it on receipts and counter cards. Reply to every review — thank the good ones, fix the rest with grace.'},
    ],
    competitorGaps:[
      {metric:'Total reviews',you:'128',them:'642',youN:128,themN:642},
      {metric:'Photos',you:'11',them:'180',youN:11,themN:180},
      {metric:'Posts / month',you:'0',them:'9',youN:0,themN:9},
      {metric:'Avg. reply time',you:'~6d',them:'~5h',youN:2,themN:9},
    ],
    revenueLine:'The [City] [Trade] wins the "best [trade] in [City]" search with fresh photos, posts and reviews. Closing that gap is worth a steady stream of new customers a month at your average spend.',
    roadmap:[
      {weeks:'Wk 1–2',title:'Make it look irresistible',desc:'20 great photos, a menu/order/booking link, and the attributes people filter by — every item above.'},
      {weeks:'Wk 3–6',title:'Stay fresh & responsive',desc:'Weekly offer posts, review cards on every table/counter, reply to 100% of reviews, target +50 fresh ones.'},
      {weeks:'Wk 7–12',title:'Win the "best in [City]"',desc:'Seasonal posts, event photos, seed Q&A, and a top-3 push on "best [trade] in [City]".'},
    ],
  },
  professional: {
    score:60,grade:'C',verdict:'Credible, but not the first name people see.',
    rankNum:6,rankWord:'6th',moneyN:'8',moneyUnit:'qualified enquiries a month',
    youRating:'4.7',youReviews:52,gapText:'↓ 3 more results ↓',queryWord:'[trade] in [City]',
    winners:[
      {rank:'1',rankColor:'#F4D03C',name:'[City] [Trade] Group',rating:'4.9',reviews:204,badge:'Free consultation · responds same day'},
      {rank:'2',rankColor:'#CBBFA9',name:'[Trade] Partners',rating:'4.8',reviews:151,badge:'Open now · 20+ years experience'},
      {rank:'3',rankColor:'#C98A4B',name:'Summit [Trade] [City]',rating:'4.8',reviews:118,badge:'By appointment · evening availability'},
    ],
    pillars:[
      {name:'Reputation',weight:'25%',score:62,note:'A strong 4.7, but only 52 reviews — clients rarely get asked.'},
      {name:'Engagement',weight:'20%',score:36,note:'No posts, no Q&A, no consultation link. Listing feels dormant.'},
      {name:'Profile completeness',weight:'10%',score:58,note:'Services / practice areas not listed, so you miss specific "[trade]" searches.'},
      {name:'Visual',weight:'15%',score:50,note:'A logo only. No team headshots or office — trust cues clients look for.'},
      {name:'Competitive',weight:'15%',score:45,note:'Top firms list every service, show the team and answer client questions.'},
      {name:'Local consistency',weight:'15%',score:74,note:'NAP consistent; a professional directory or two need updating.'},
    ],
    quickWins:[
      {n:'01',tag:'SERVICES',impactTag:'rank for what you actually do',title:'Your services / practice areas aren\'t listed',lossLine:'Google turns each listed service into its own searchable surface. With nothing listed, you only appear for your firm\'s name — not the "[trade]" problems people actually search for.',hasCopy:false,where:'Edit profile → set the most specific primary category for [trade], add related ones, then list every service / practice area you offer.'},
      {n:'02',tag:'DESCRIPTION',impactTag:'earns the click on trust',title:'No description establishing credibility',lossLine:'People choosing a [trade] are buying trust. Competitors lead with experience and outcomes; your description is blank, so Google has no context and searchers have no reason to pick you.',hasCopy:true,fixLabel:'Paste as your business description:',fixText:'[Biz] helps [City] clients with [your core service]. With years of experience, we offer clear advice, honest pricing, and responsive service — most enquiries get a same-day reply. Book a free initial consultation today.',where:'Edit profile → "Description". Add a booking/consultation link and turn on Messaging.'},
      {n:'03',tag:'REVIEWS',impactTag:'few reviews = easy to overtake',title:'Only a handful of reviews, and no Q&A',lossLine:'You have great ratings but too few reviews, and your Q&A is empty. Both are trust signals and ranking factors — and the easiest place to pull ahead of bigger names.',hasCopy:true,fixLabel:'Email this after a closed matter:',fixText:'Hi [name] — it was a pleasure working with you. If you were happy with how things went, a short Google review would mean a great deal and helps other [City] clients find us: [review link]. Thank you! — [Biz]',where:'Send after every completed engagement. Seed 3–5 common questions in Q&A and answer them yourself.'},
    ],
    competitorGaps:[
      {metric:'Total reviews',you:'52',them:'204',youN:52,themN:204},
      {metric:'Services listed',you:'1',them:'9',youN:1,themN:9},
      {metric:'Q&A answered',you:'0',them:'8',youN:0,themN:8},
      {metric:'Team photos',you:'0',them:'6',youN:0,themN:6},
    ],
    revenueLine:'The [City] [Trade] Group earns the click with listed services, reviews and a clear consult offer. Matching them is worth several qualified enquiries a month at your average client value.',
    roadmap:[
      {weeks:'Wk 1–2',title:'Make the listing work',desc:'Precise category, every service/practice area, a credibility description, consult link and team photos.'},
      {weeks:'Wk 3–6',title:'Build proof',desc:'Ask every closed client for a review (target +25), seed and answer Q&A, start light weekly posts.'},
      {weeks:'Wk 7–12',title:'Become the default name',desc:'Case-study posts, ongoing reviews, and a top-3 push on "[trade] in [City]".'},
    ],
  },
  education: {
    score:62,grade:'C+',verdict:'Great results, quiet profile.',
    rankNum:5,rankWord:'5th',moneyN:'10',moneyUnit:'enrolment enquiries a month',
    youRating:'4.8',youReviews:71,gapText:'↓ 2 more results ↓',queryWord:'[trade] near me',
    winners:[
      {rank:'1',rankColor:'#F4D03C',name:'[City] [Trade] Academy',rating:'4.9',reviews:268,badge:'Enrolling now · book a free trial'},
      {rank:'2',rankColor:'#CBBFA9',name:'Premier [Trade] [City]',rating:'4.9',reviews:184,badge:'Open now · flexible schedules'},
      {rank:'3',rankColor:'#C98A4B',name:'[Trade] Learning Centre',rating:'4.8',reviews:139,badge:'Certified instructors'},
    ],
    pillars:[
      {name:'Reputation',weight:'25%',score:66,note:'A lovely 4.8, but 71 reviews — families compare review counts closely.'},
      {name:'Engagement',weight:'20%',score:37,note:'No posts, no trial/enrolment link, Q&A empty — parents\' top questions unanswered.'},
      {name:'Profile completeness',weight:'10%',score:56,note:'Programs/courses not listed as services, so specific searches miss you.'},
      {name:'Visual',weight:'15%',score:48,note:'No photos of the space, the instructors or students at work.'},
      {name:'Competitive',weight:'15%',score:46,note:'Top schools list every program, show the facility and answer parent Q&A.'},
      {name:'Local consistency',weight:'15%',score:72,note:'NAP fine; term dates and hours need a refresh.'},
    ],
    quickWins:[
      {n:'01',tag:'PROGRAMS',impactTag:'rank for every course',title:'Your programs / courses aren\'t listed as services',lossLine:'Each program you list becomes its own searchable surface. With nothing listed, you only show for your name — not "[trade]" or the specific courses parents and students search for.',hasCopy:false,where:'Edit profile → set the most specific primary category for [trade], then list every program/course as a service with a short description.'},
      {n:'02',tag:'POSTS',impactTag:'fills your intake season',title:'Nothing posted heading into enrolment season',lossLine:'Competitors post open-house and trial offers straight to Google. You haven\'t posted, so searchers see no current intake and Google sees no fresh activity.',hasCopy:true,fixLabel:'Post this today (Add update → Offer):',fixText:'🎓 Now enrolling at [Biz] in [City]! Book a free trial this week and see if we\'re the right fit. Small classes, certified instructors, flexible schedules. Reserve your spot: [link]',where:'Add update → Offer, weekly through intake season. Add a "Book a trial" link and turn on Messaging.'},
      {n:'03',tag:'REVIEWS',impactTag:'parents read these first',title:'Strong ratings, but too few reviews and an empty Q&A',lossLine:'Parents and students lean hard on reviews and questions before enrolling. Your rating is great but thin, and your Q&A is blank — both are trust signals you can fix this week.',hasCopy:true,fixLabel:'Text/email this after a great term:',fixText:'Hi [name] — so glad to have you at [Biz]! If you have a moment, a quick Google review helps other [City] families find us: [review link]. Thank you so much! — The [Biz] team',where:'Ask happy families at the end of a term. Seed 4–5 common questions (ages, pricing, schedule) in Q&A and answer them.'},
    ],
    competitorGaps:[
      {metric:'Total reviews',you:'71',them:'268',youN:71,themN:268},
      {metric:'Programs listed',you:'0',them:'8',youN:0,themN:8},
      {metric:'Posts / month',you:'0',them:'6',youN:0,themN:6},
      {metric:'Q&A answered',you:'0',them:'10',youN:0,themN:10},
    ],
    revenueLine:'The [City] [Trade] Academy fills its intake with listed programs, trial offers and reviews. Matching them is worth a steady run of enrolment enquiries each month.',
    roadmap:[
      {weeks:'Wk 1–2',title:'Show what you teach',desc:'Precise category, every program listed, a free-trial link, and photos of the space and instructors.'},
      {weeks:'Wk 3–6',title:'Build trust & intake',desc:'Weekly enrolment posts, ask happy families for reviews (target +35), seed and answer parent Q&A.'},
      {weeks:'Wk 7–12',title:'Own the local search',desc:'Student-result posts, ongoing reviews, and a top-3 push on "[trade] near me".'},
    ],
  },
};


function matchArch(s){
  const has=(arr)=>arr.some(k=>s.includes(k));
  if(has(['ortho','physio','physical therap','chiro','optom','eye','vet','veterin','clinic','medic','doctor','derma','therap','psych','counsel','massage','acupunc','podiat','wellness','rehab','naturopath','dietit','nutrition','fertility','pharma','hearing','audiolog','denture'])) return 'health';
  if(has(['tutor','academy','driving','music','dance','daycare','childcare','learning','coding','language','college','lesson','montessori','preschool','prep','course','school','train'])) return 'education';
  if(has(['law','lawyer','attorney','legal','account','cpa','bookkeep','financ','advisor','insur','real estate','realtor','realty','mortgage','broker','consult','notary','architect','engineer','survey','recruit','immigration','tax','wealth','paralegal'])) return 'professional';
  if(has(['restaurant','cafe','coffee','bakery','bake','bistro','grill','pizza','sushi','diner','eatery','kitchen','catering','food','brewery','deli','pub','bar','salon','hair','barber','nail','beauty','lash','brow','spa','gym','fitness','yoga','pilates','hotel','motel','tattoo','boutique','florist','retail','store','shop'])) return 'hospitality';
  return 'trade';
}

function resolve(raw){
  const s=(raw||'').trim().toLowerCase();
  for(const key of ['pest','hvac','dental']){
    if(BESPOKE[key].aliases.some(a=>s.includes(a))) return {d:BESPOKE[key], display:BESPOKE[key].name};
  }
  const archKey=matchArch(s);
  const a=ARCH[archKey];
  const display=titleCase(raw)||'Local business';
  return {d:{
    name:display, defBiz:'[City] [Trade]', defCity:'Scarborough, ON',
    query:a.queryWord, score:a.score, grade:a.grade, verdict:a.verdict,
    rankNum:a.rankNum, rankWord:a.rankWord, moneyLine:a.moneyN+' '+a.moneyUnit,
    youRating:a.youRating, youReviews:a.youReviews, gapText:a.gapText,
    topCompetitor:a.winners[0].name,
    winners:a.winners, pillars:a.pillars, quickWins:a.quickWins,
    competitorGaps:a.competitorGaps, revenueLine:a.revenueLine, roadmap:a.roadmap,
  }, display};
}



export function titleCase(s: string): string {
  return (s || '').trim().replace(/\s+/g, ' ').split(' ')
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : '')).join(' ');
}

export function sub(t: string, ctx: { biz: string; city: string; trade: string }): string {
  return String(t)
    .split('[Biz]').join(ctx.biz)
    .split('[City]').join(ctx.city)
    .split('[Trade]').join(ctx.trade)
    .split('[trade]').join((ctx.trade || '').toLowerCase());
}

export type IndustryResolved = ReturnType<typeof resolveIndustry>;

export function resolveIndustry(raw: string) {
  const s = (raw || '').trim().toLowerCase();
  for (const key of ['pest', 'hvac', 'dental'] as const) {
    if (BESPOKE[key].aliases.some((a: string) => s.includes(a))) return { d: BESPOKE[key], display: BESPOKE[key].name };
  }
  const archKey = matchArch(s);
  const a = ARCH[archKey];
  const display = titleCase(raw) || 'Local business';
  return {
    d: {
      name: display,
      defBiz: '[City] [Trade]',
      defCity: 'Scarborough, ON',
      query: a.queryWord,
      score: a.score,
      grade: a.grade,
      verdict: a.verdict,
      rankNum: a.rankNum,
      rankWord: a.rankWord,
      moneyLine: a.moneyN + ' ' + a.moneyUnit,
      youRating: a.youRating,
      youReviews: a.youReviews,
      gapText: a.gapText,
      topCompetitor: a.winners[0].name,
      winners: a.winners,
      pillars: a.pillars,
      quickWins: a.quickWins,
      competitorGaps: a.competitorGaps,
      revenueLine: a.revenueLine,
      roadmap: a.roadmap,
    },
    display,
  };
}
