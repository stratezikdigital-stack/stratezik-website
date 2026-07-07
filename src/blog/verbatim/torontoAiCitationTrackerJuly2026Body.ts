/** Verbatim body from approved toronto-ai-citation-tracker-2026-07.md — do not edit by hand. Regenerate: npm run sync:verbatim-blog */
export const TORONTO_AI_CITATION_TRACKER_JULY_2026_VERBATIM_BODY = `**The short version:**

- We asked ChatGPT, Perplexity, Google AI Mode, and Claude the same 50 high-intent Toronto buying questions, across 10 local-service categories. Across all 200 answers, an AI assistant named a specific local business 89% of the time. AI search recommends real Toronto businesses far more than most owners assume.
- The four engines are not equal. Google AI Mode named a local business 98% of the time, Claude 94%, ChatGPT 90%, and Perplexity only 74%. Which assistant your customer opens changes whether you exist in the answer.
- Perplexity has a Scarborough problem. On several Scarborough queries it resolved the name to Scarborough in the United Kingdom and recommended businesses there. The other three engines kept Scarborough in Toronto every time.
- Claude behaves differently from the other three because it is the one engine people use while signed in. On a few queries it read the founder's own account context into the answer instead of acting as a neutral consumer tool. We flag this because it changes how you should read Claude's numbers, and because it is a preview of a problem every logged-in AI assistant will eventually have.
- ChatGPT is the only engine running ads, and the market is thin but real. Ads show up for everyone, signed in or not, but they cluster on commercial buying questions and rotate session to session, so any single scan under-counts. A June study of 90 buyer questions across 18 industries found 48% carried an ad. Finding 3 maps competition, relevance, and the open lanes. Short version: the empty lanes are fitness, pest control, and electrical, and even the crowded-looking categories like education and legal are wide open to anyone actually in them.
- This is edition one, our baseline. From August we report month-over-month movement: who gained AI visibility, who lost it, and which categories shifted.

## Why we run this

Nobody publishes a Toronto-specific measure of who the AI assistants actually recommend. The global reports quote a single citation percentage. Nobody tracks the real Toronto picture, category by category, month after month. So we built it.

Each month we ask the same 50 questions, frozen so the numbers stay comparable, to the assistants people actually use: ChatGPT, Perplexity, Google AI Mode, and now Claude. We record whether the answer names a local business, which businesses it names, and where they land in the answer. Over a year this becomes a dataset nobody else has. This is the first full reading.

## How we measured it

We ran 50 fixed questions across 10 categories (dental, personal injury law, accounting, pest control, plumbing, general contracting, restaurants, wellness clinics, medical clinics, and home services), five questions each. Every question went to all four assistants in a clean session on July 3, 2026, giving 200 data points. For each answer we recorded whether any Toronto or GTA business was named, the names, and the position of the first local mention.

One methodology note worth stating plainly: ChatGPT, Perplexity, and Google AI Mode were run logged out, in fresh sessions with no history. Claude does not offer a comparable logged-out mode for this kind of query, so we ran it signed in to a Stratezik account. That difference matters, and Finding 4 below is about exactly what it produces. Where an engine refused a query or errored, we marked it and left it out of the percentages rather than guessing. The full frozen question set and the dataset are available on request.

## Finding 1: AI recommends Toronto businesses most of the time, but the engine matters

Across all 200 answers, an assistant named a specific Toronto or GTA business 89% of the time. That is the reassuring headline for local owners: this channel is built to recommend real businesses, and it does.

The gap between engines is the real story.

| Engine | Named a local business |
|---|---|
| Google AI Mode | 98% (49 of 50) |
| Claude | 94% (47 of 50) |
| ChatGPT | 90% (45 of 50) |
| Perplexity | 74% (37 of 50) |

Google AI Mode almost never fails to name a local option, and Claude is close behind it. ChatGPT trails slightly. Perplexity trails by 20 points or more, either giving generic advice with no businesses attached or, in one case, resolving a place name to the wrong country. If a customer asks Perplexity and gets a how-to article instead of a shortlist, every business in that category is invisible for that search, no matter how good it is.

## Finding 2: Perplexity keeps sending Scarborough to the United Kingdom

This is the result that should concern any business in Scarborough. On several Scarborough queries, Perplexity resolved the name to Scarborough in North Yorkshire, England, and recommended businesses there. It offered UK massage clinics for a registered massage therapist search, and on a related query it resolved "near Eglinton" to Eglinton, a village near Londonderry in Northern Ireland, returning UK dental clinics for a Toronto emergency dentist search.

The other three engines kept Scarborough and Eglinton in Toronto on every one of those same queries, naming real Toronto and Scarborough, Ontario businesses. So this is not a hard problem for AI in general. It is one engine mishandling ambiguous place names, and the cost lands entirely on the businesses that get erased from an answer their customer asked for.

The practical defence is to make your location unmistakable everywhere the assistant reads you: Scarborough, Ontario, or the specific Toronto neighbourhood, with the intersection, in plain text on your site and listings, so the machine cannot confuse you with a town across the ocean.

## Finding 3: The ChatGPT ad map, which Toronto industries are competitive and where the open lanes are

ChatGPT is the only one of the four engines running ads. Across all 150 Google AI Mode, Perplexity, and Claude answers this month, not one carried an advertisement. ChatGPT ads are real, and they show up for everyone, signed in or not. What they are not is dense or stable: they land mostly on commercial buying questions, they rotate from one session to the next, and they sit in a card below the answer where a quick scan skips them. On the 50 hyper-local frozen questions above, checked logged out, we caught a labelled ad on just 2, both mismatched: an Ottawa injury firm on a Toronto lawyer search, and a windows company on a bathroom-renovation search. Treat that as a floor, local service questions draw the fewest advertisers of any category.

That low count is a floor, not the whole market: hyper-local questions draw the fewest advertisers, and a single pass misses ads that rotate in and out. To map where advertisers actually are, we ran a broader study across 90 commercial buyer questions in 18 industries on June 19, 2026. In that study, 48% of questions carried an ad. Here is the map.

<div class="saai"><h2 style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)">Toronto ChatGPT Ads Index: an expandable month-over-month table of ad presence, relevance, and competitiveness across 18 Toronto industries. Defaults to the two latest months; use the earlier control to reveal prior months.</h2>
<style>
.saai *{box-sizing:border-box}
.saai{--ink:#2C2C2A;--mute:#5F5E5A;--teal:#0F6E56;--card:#FCFAF4;--line:#E4DECF;--row:#ECE6D9;--now:#FBF6EA;--track:#E7E2D6;font-family:Georgia,'Times New Roman',serif;color:var(--ink);margin:26px 0}
.saai-card{border:1px solid var(--line);border-radius:14px;background:var(--card);overflow:hidden}
.saai-head{display:flex;justify-content:space-between;align-items:flex-end;gap:16px;flex-wrap:wrap;padding:18px 20px 14px}
.saai-over{font-family:Arial,Helvetica,sans-serif;font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--teal);font-weight:700}
.saai-title{font-size:20px;font-weight:700;letter-spacing:-.01em;margin-top:5px}
.saai-sub0{font-family:Arial,Helvetica,sans-serif;font-size:11.5px;color:var(--mute);margin-top:6px;max-width:560px;line-height:1.5}
.saai-ctrl{display:flex;align-items:center;gap:8px;font-family:Arial,Helvetica,sans-serif}
.saai-btn{cursor:pointer;border:1px solid var(--line);background:#fff;color:var(--ink);font-family:inherit;font-size:11px;font-weight:700;padding:6px 12px;border-radius:20px;letter-spacing:.02em}
.saai-btn:hover:not(:disabled){background:var(--teal);color:#fff;border-color:var(--teal)}
.saai-btn:disabled{opacity:.32;cursor:default}
.saai-win{font-size:11px;font-weight:700;color:var(--mute);min-width:104px;text-align:center;letter-spacing:.03em}
.saai-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch}
.saai-t{border-collapse:collapse;width:100%;min-width:720px;font-size:13.5px}
.saai-t th,.saai-t td{padding:10px 13px;text-align:left;vertical-align:middle}
.saai-grp{font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#7A7768;font-weight:700;text-align:center;border-bottom:1px solid var(--line)}
.saai-sub{font-family:Arial,Helvetica,sans-serif;font-size:9.5px;letter-spacing:.05em;text-transform:uppercase;color:#9A9787;font-weight:700}
.saai-h{font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:.09em;text-transform:uppercase;color:#7A7768;font-weight:700;vertical-align:bottom}
.saai-r2{border-bottom:2px solid var(--ink)}
.saai-t tbody tr{border-bottom:1px solid var(--row)}
.saai-t tbody tr:hover{background:#FBF7EC}
.saai-t th:first-child,.saai-t td:first-child{position:sticky;left:0;background:var(--card);z-index:2}
.saai-t td:first-child{font-weight:700;white-space:nowrap}
.saai-t tbody tr:hover td:first-child{background:#FBF7EC}
.saai-now{background:var(--now)}
.saai-chip{display:inline-block;padding:2px 9px;border-radius:20px;font-family:Arial,Helvetica,sans-serif;font-size:10px;font-weight:700;letter-spacing:.02em;white-space:nowrap}
.saai-tag{display:inline-block;margin:1px 3px 1px 0;padding:2px 7px;border-radius:6px;font-family:Arial,Helvetica,sans-serif;font-size:10.5px;font-weight:600}
.saai-na{color:#A7A499;font-family:Arial,Helvetica,sans-serif;font-size:10.5px;font-style:italic}
.saai-bar{display:flex;align-items:center;gap:6px}
.saai-track{position:relative;width:38px;height:7px;background:var(--track);border-radius:5px;overflow:hidden}
.saai-fill{position:absolute;left:0;top:0;bottom:0;background:var(--teal)}
.saai-frac{font-family:Arial,Helvetica,sans-serif;font-size:10.5px;color:var(--mute)}
.saai-foot{padding:13px 20px;border-top:1px solid var(--line);font-family:Arial,Helvetica,sans-serif;font-size:11px;color:var(--mute);line-height:1.55}
</style>
<div class="saai-card">
 <div class="saai-head">
  <div><div class="saai-over">Toronto ChatGPT Ads Index &nbsp;/&nbsp; month over month</div><div class="saai-title">Every metric, month by month</div><div class="saai-sub0">Defaults to the two latest months. Use <b>&lsaquo; earlier</b> to pull in prior months and read the full run.</div></div>
  <div class="saai-ctrl"><button class="saai-btn" id="saaiE" title="Reveal an earlier month">&lsaquo; earlier</button><span class="saai-win" id="saaiW"></span><button class="saai-btn" id="saaiC" title="Collapse to the latest two months">latest &rsaquo;</button></div>
 </div>
 <div class="saai-scroll"><table class="saai-t"><thead id="saaiTh"></thead><tbody id="saaiTb"></tbody></table></div>
 <div class="saai-foot"><b style="color:#C0451F">None in sample</b> means an industry drew an ad in an earlier month but none in the latest two-question sample, a floor, not a collapse, presence rotates week to week. Competitiveness is the tier implied by the ad rate; % of ads is the raw share (June ran five questions per industry, later months two). Tags are green for on-target, amber for loose or off-target, coral for mismatched. CPC and CPM are third-party estimates; OpenAI publishes no rates.</div>
</div>
<script>
(function(){
var M=["Jun 2026","Jul 2026"],S=["Jun","Jul"];
var TC={Saturated:['#F6EAE4','#C0451F'],High:['#F4EDDC','#8A6D1F'],Medium:['#EDEFDF','#6B7A2F'],Low:['#E2EFE9','#0F6E56'],None:['#EDEAE1','#8A887F']};
var RC={Relevant:['#E2EFE9','#0F6E56'],Mixed:['#F4EDDC','#8A6D1F'],Loose:['#F4EDDC','#8A6D1F'],Mismatched:['#F6EAE4','#C0451F'],'Non-endemic':['#F6EAE4','#C0451F']};
var PC={'Own it':['#E2EFE9','#0F6E56'],Compete:['#F4EDDC','#8A6D1F'],Defend:['#F6EAE4','#C0451F']};
var TR={none:['None in sample','#F6EAE4','#C0451F'],hold:['Holding','#E2EFE9','#0F6E56'],rise:['Rising ▲','#0F6E56','#FFFFFF'],empty:['Empty','#EDEAE1','#8A887F']};
var D=[
["B2B SaaS",["Saturated","None"],["Relevant","n/a"],[[5,5],[0,2]],"none","Defend","$8-18 / $25-60",[]],
["Finance & insurance",["Saturated","High"],["Relevant","Mixed"],[[5,5],[2,2]],"hold","Defend","$8-18 / $25-60",[["Smarter Loans","rel"],["Jotform","off"]]],
["Travel & hospitality",["Saturated","High"],["Relevant","Relevant"],[[5,5],[2,2]],"hold","Defend","$3-5 / $25-60",[["Booking.com","rel"],["trivago","rel"]]],
["Online education",["High","None"],["Non-endemic","n/a"],[[4,5],[0,2]],"none","Own it","$3-5 / $25-60",[]],
["Real estate agents",["High","None"],["Loose","n/a"],[[4,5],[0,2]],"none","Compete","$3-5 / $25-60",[]],
["E-commerce / DTC",["High","High"],["Mixed","Mixed"],[[3,5],[2,2]],"rise","Compete","$2.50-5 / $25-60",[["Accents@Home","rel"],["Etihad","off"]]],
["Professional / legal",["High","Medium"],["Non-endemic","Mismatched"],[[3,5],[1,2]],"hold","Own it","$3-5 / $25-60",[["Ignite Digital","off"]]],
["Local / home services",["High","None"],["Loose","n/a"],[[3,5],[0,2]],"none","Compete","$3-5 / $25-60",[]],
["HVAC",["High","Medium"],["Relevant","Mismatched"],[[3,5],[1,2]],"hold","Compete","$3-5 / $25-60",[["Ignite Digital","off"]]],
["Beauty & personal care",["Medium","Medium"],["Loose","Mismatched"],[[2,5],[1,2]],"rise","Own it","$3-5 / $25-60",[["Unfiltered YYC","off"]]],
["Veterinary",["Medium","None"],["Loose","n/a"],[[2,5],[0,2]],"none","Own it","$3-5 / $25-60",[]],
["Dental",["Low","None"],["Relevant","n/a"],[[1,5],[0,2]],"none","Own it","$3-5 / $25-60",[]],
["Optometry",["Low","None"],["Mismatched","n/a"],[[1,5],[0,2]],"none","Own it","$3-5 / $25-60",[]],
["Auto repair",["Low","None"],["Loose","n/a"],[[1,5],[0,2]],"none","Own it","$3-5 / $25-60",[]],
["Moving",["Low","None"],["Mismatched","n/a"],[[1,5],[0,2]],"none","Own it","$3-5 / $25-60",[]],
["Fitness & wellness",["None","None"],["n/a","n/a"],[[0,5],[0,2]],"empty","Own it","No bids yet (~$3 floor)",[]],
["Pest control",["None","None"],["n/a","n/a"],[[0,5],[0,2]],"empty","Own it","No bids yet (~$3 floor)",[]],
["Electrical",["None","None"],["n/a","n/a"],[[0,5],[0,2]],"empty","Own it","No bids yet (~$3 floor)",[]]
];
function esc(s){return String(s).replace(/&/g,'&amp;');}
function C(t,c){return '<span class="saai-chip" style="background:'+c[0]+';color:'+c[1]+'">'+t+'</span>';}
function tierC(v){return C(v,TC[v]);}
function relC(v){return v==='n/a'?'<span class="saai-na">n/a</span>':C(v,RC[v]);}
function bar(p){var w=p[1]?Math.round(p[0]/p[1]*100):0;return '<div class="saai-bar"><div class="saai-track"><div class="saai-fill" style="width:'+w+'%'+(w===0?';background:transparent':'')+'"></div></div><span class="saai-frac">'+p[0]+'/'+p[1]+'</span></div>';}
function trendC(k){var t=TR[k];return '<span class="saai-chip" style="background:'+t[1]+';color:'+t[2]+'">'+t[0]+'</span>';}
function advC(a){if(!a.length)return '<span class="saai-na">none in sample</span>';return a.map(function(x){var c=x[1]==='rel'?['#E2EFE9','#0F6E56']:['#F4EDDC','#8A6D1F'];return '<span class="saai-tag" style="background:'+c[0]+';color:'+c[1]+'">'+esc(x[0])+'</span>';}).join('');}
var n=2;
function render(){
 var T=M.length;if(n>T)n=T;if(n<2)n=Math.min(2,T);
 var start=T-n,vis=[],i;for(i=start;i<T;i++)vis.push(i);var last=T-1;
 var groups=['Competitiveness','Ads relevance','% of ads in queries'];
 var h1='<tr><th class="saai-h" rowspan="2">Industry</th>';
 groups.forEach(function(g){h1+='<th class="saai-grp" colspan="'+n+'">'+g+'</th>';});
 h1+='<th class="saai-h" rowspan="2">Trend</th><th class="saai-h" rowspan="2">Play</th><th class="saai-h" rowspan="2">CPC / CPM</th><th class="saai-h" rowspan="2">Advertisers</th></tr>';
 var h2='<tr class="saai-r2">',gi;for(gi=0;gi<3;gi++){vis.forEach(function(idx){h2+='<th class="saai-sub'+(idx===last?' saai-now':'')+'">'+S[idx]+'</th>';});}h2+='</tr>';
 document.getElementById('saaiTh').innerHTML=h1+h2;
 var body='';
 D.forEach(function(r){
  body+='<tr><td>'+esc(r[0])+'</td>';
  vis.forEach(function(idx){body+='<td'+(idx===last?' class="saai-now"':'')+'>'+tierC(r[1][idx])+'</td>';});
  vis.forEach(function(idx){body+='<td'+(idx===last?' class="saai-now"':'')+'>'+relC(r[2][idx])+'</td>';});
  vis.forEach(function(idx){body+='<td'+(idx===last?' class="saai-now"':'')+'>'+bar(r[3][idx])+'</td>';});
  body+='<td>'+trendC(r[4])+'</td><td>'+C(r[5],PC[r[5]])+'</td><td class="saai-frac" style="white-space:nowrap">'+r[6]+'</td><td>'+advC(r[7])+'</td></tr>';
 });
 document.getElementById('saaiTb').innerHTML=body;
 document.getElementById('saaiW').innerHTML = n===2 ? (S[vis[0]]+' &middot; '+S[vis[n-1]]+' 2026') : (S[vis[0]]+' &hellip; '+S[vis[n-1]]+' 2026');
 document.getElementById('saaiE').disabled=(n>=T);
 document.getElementById('saaiC').disabled=(n<=2);
}
document.getElementById('saaiE').onclick=function(){if(n<M.length){n++;render();}};
document.getElementById('saaiC').onclick=function(){if(n>2){n--;render();}};
render();
})();
</script>
</div>


CPC and CPM are third-party market estimates; OpenAI does not publish rates, so treat them as directional. Tiers are from the Stratezik logged-in ChatGPT ad study, 90 buyer questions across 18 industries, June 19, 2026.

Read it this way. Competition is the share of an industry's questions that drew an ad, our proxy for how many advertisers are bidding. Relevance is whether the advertiser's core business matched the question. Opportunity is highest where buying-intent questions draw no ad, or only a mismatched one, because no relevant competitor is there yet. Three patterns matter more than the tiers.

A high ad rate is not the same as high competition. Online education and professional services both show ads on most questions, but almost none of those advertisers are in the category: a data-pipeline tool and a design app run against "bootcamp" and "UX school" questions, and a forms app and an HR system run against "best small business lawyer" and "startup accountant." The category looks crowded and is wide open to anyone actually in it.

The ads that do appear in local-service categories are mostly not local businesses. Lyft alone advertised against Botox, eye-exam, and moving questions. A pet-products brand advertised against vet visits. These are broad-reach advertisers buying cheap, uncontested local intent because no dentist, optometrist, or mover is bidding against them. A local provider would win relevance instantly.

The empty lanes are specific. Fitness and gyms, pest control, and electrical drew zero ads on every question. Dental, optometry, auto repair, and moving drew just one ad each, and where it appeared the advertiser was often off-target, a rideshare company running against both an eye-exam and a moving search. In those categories the field is not just open, almost nobody relevant is even in it, and the self-serve platform that opened on May 5, 2026 with no minimum spend makes now the cheapest time to claim the lane.

One honest limit: this now carries July beside the June baseline, our first month-over-month read off a light two-question July sample, and ad presence is volatile, a sedation-dentistry ad we saw on July 3 was gone by July 5, and the same question can serve different advertisers from one session to the next. From August this map updates every edition, sampling each question several times, so a category heating up or cooling shows as a trend rather than a snapshot. The full standing version of this map, with the advertiser behind each ad, current CPC ranges, and a straight read on whether your industry is worth advertising in yet, lives in our Toronto ChatGPT Ads Index at stratezik.com/blog/toronto-chatgpt-ads-index, which we update every month.

## Finding 4: The logged-in engine reads its own account into the answer

This is new to this edition because Claude is new to this edition, and it earns its own section rather than a footnote.

On several queries, Claude answered from the Stratezik account it was signed into rather than as a neutral consumer. Asked about small business incorporation, it asked whether the entity was Stratezik's own related venture. Asked about pest control, it referenced two client relationships by name and offered competitive positioning against them instead of a plain list. On "commercial pest control Toronto restaurant," it skipped the consumer answer entirely and opened with a menu asking whether we wanted landing page copy, ad copy, or competitor research, the exact menu it shows a marketing client, not a shopper. We had to clarify plainly that we were a restaurant owner looking for a company to call before it produced a normal shortlist.

We disclose this because it is a real limitation of comparing a logged-in assistant to three logged-out ones, and because it points past this tracker. As AI assistants carry more memory about who is asking, the neutral "what a stranger sees" answer gets harder to isolate from the personalized one. The assistant your own team uses signed in daily may not resemble the assistant your customer meets cold.

Once we asked plainly, Claude's underlying local-recommendation behaviour was strong, hence the 94% in Finding 1. The exceptions above are the more interesting data point for anyone building an AI visibility strategy.

## Finding 5: Some categories are fully covered, others leave gaps

Local presence was not even across categories. Two categories returned a named local business on every single answer across all four engines. Others left real gaps where at least one engine gave generic advice instead of names.

Highest local presence:

| Category | Answers naming a local business |
|---|---|
| Restaurants | 100% |
| Medical clinics | 100% |
| Plumbing | 95% |

Lowest local presence:

| Category | Answers naming a local business |
|---|---|
| General contracting | 75% |
| Accounting | 80% |
| Home services | 85% |
| Pest control | 85% |

The pattern underneath the numbers is intent. Urgent, clearly commercial questions (a plumber, a walk-in clinic, a restaurant with a patio) almost always produced named businesses. Questions that read as research rather than a purchase (a bathroom renovation budget, how corporate tax filing works) were where the engines defaulted to a generic explainer with no business attached. On the bathroom-renovation-budget question, all four engines gave a cost breakdown and named nobody. But the effect is not absolute. On an AC-installation-quote question, another clearly cost-framed query, the engines split: Google AI Mode and Claude still named specific installers, while ChatGPT and Perplexity returned only a price range. So a cost-shaped question lowers the odds of being named rather than removing them, and by how much depends on which engine the customer opened. Those moments read less like lost opportunities and more like a signal that the question itself is not yet a firm buying moment.

## Finding 6: When the engines agree, it is the established name

Across the 200 answers, most of the businesses named were different from one engine to the next. But a handful surfaced repeatedly, and when multiple engines reached for the same name, it was almost always the category's established leader.

Neinstein Personal Injury Lawyers was named 6 times across our 20 injury-law answers, more than any other firm, appearing in every engine we tested. AvantDerm, a dermatology and skin clinic, was named by all four engines on the same dermatologist query, alongside FCP Dermatology and HealthOne Harbourfront Skin Clinic across three of the four. Laneway Home Builders led the general-contracting category, and Expert GTA Electric led home services. These are businesses that have built deep, consistent review histories and cross-platform presence, and the assistants reward that consistency by converging on them regardless of which one you ask.

## What this means for Toronto business owners

Five things follow from edition one.

First, do not assume AI search skips small local businesses. It named them in 89% of answers, and the businesses it named were mostly independents, not national chains.

Second, do not rely on a single engine. Perplexity missed roughly a quarter of the time and mishandled Scarborough and Eglinton. Being recommended by one assistant tells you little about the others, so the goal is to be recommendable everywhere: strong reviews, presence in the local roundups these engines read, plain-language location, and a website the assistant can actually parse.

Third, if you use Claude signed into a business account to check your own visibility, be careful. What it shows you may be shaped by what it already knows about your account, not what a stranger asking the same question would see. Check from a fresh, logged-out angle where you can, or ask a specific, plainly-worded consumer question the way we did.

Fourth, watch this space. The number that matters is not this month's 89%. It is whether your category and your business move up or down as we run this every month. That comparison starts in August.

Fifth, if you are weighing paid placement inside ChatGPT, use the ad map in Finding 3. If you are in a white-space category like fitness, pest control, electrical, or the near-empty dental, optometry, auto, and moving, you can own the lane cheaply before a competitor does. If you are in a saturated one like SaaS, finance, or travel, it is already table stakes. And in the categories that look crowded but where none of the advertisers are actually in your business, education and professional services, the relevance gap is the opening. Self-serve buying opened in May with no minimum spend, so the cost of testing is the lowest it will be.

## Methodology and limitations

We tested 50 frozen questions across 10 GTA categories, five per category, chosen to reflect real purchase-stage searches. The same questions run every month so the numbers stay comparable. Collection date: July 3, 2026. ChatGPT, Perplexity, and Google AI Mode were run logged out in fresh sessions per query. Claude was run signed into a Stratezik account, the only practical way to query it for this kind of task, and its answers on a handful of queries reflected that account context rather than a neutral consumer view (see Finding 4).

The ChatGPT ad map (Finding 3) is a separate companion dataset, not part of the frozen local-business scoring. Two runs feed it. A spot-check of all 50 frozen local questions on July 3 and July 5, which returned very few ads, local service questions draw the fewest advertisers, and a single pass misses ads that rotate in and out, so we treat that count as a floor. And a broader study of 90 commercial buyer questions across 18 industries on June 19, which is where the competitiveness map comes from. Ad presence is the share of questions showing a labelled "Ad" placement. Relevance is whether the advertiser's core business matched the question, a Stratezik classification. CPC and CPM figures are third-party market estimates, since OpenAI does not publish rates, and are directional. From August the ad check re-runs every month, sampling each question several times to average out the session-to-session volatility, so the map becomes a month-over-month trend.

This is a snapshot. AI answers vary between runs, by user, and over time, so any single month is a reading rather than a verdict. This is edition one, so there is no prior month to compare against yet. The point of the exercise is the trend line we start building here. The full question set and dataset are available on request.

<svg viewBox="0 0 720 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Share of Toronto buying questions naming a local business, by AI engine: Google AI Mode 98 percent, Claude 94 percent, ChatGPT 90 percent, Perplexity 74 percent.">
<rect x="0" y="0" width="720" height="280" rx="10" fill="#FBFAF7"/>
<text x="24" y="34" font-size="17" font-weight="600" fill="#2C2C2A" font-family="Georgia,serif">Which AI engine names a local Toronto business?</text>
<text x="24" y="56" font-size="13" fill="#5F5E5A" font-family="Georgia,serif">Share of 50 buying questions that returned a named local business, July 2026</text>
<g transform="translate(0,74)">
<line x1="210" y1="0" x2="210" y2="160" stroke="#E7E4DC" stroke-width="1"/>
<text x="198" y="27" text-anchor="end" font-size="15" fill="#2C2C2A" font-family="Georgia,serif">Google AI Mode</text>
<rect x="210" y="6" width="431.2" height="24" rx="3" fill="#0F6E56"/>
<text x="649.2" y="27" font-size="14" font-weight="600" fill="#2C2C2A" font-family="Georgia,serif">98%</text>
<text x="198" y="67" text-anchor="end" font-size="15" fill="#2C2C2A" font-family="Georgia,serif">Claude</text>
<rect x="210" y="46" width="413.6" height="24" rx="3" fill="#0F6E56"/>
<text x="631.6" y="67" font-size="14" font-weight="600" fill="#2C2C2A" font-family="Georgia,serif">94%</text>
<text x="198" y="107" text-anchor="end" font-size="15" fill="#2C2C2A" font-family="Georgia,serif">ChatGPT</text>
<rect x="210" y="86" width="396.0" height="24" rx="3" fill="#0F6E56"/>
<text x="614.0" y="107" font-size="14" font-weight="600" fill="#2C2C2A" font-family="Georgia,serif">90%</text>
<text x="198" y="147" text-anchor="end" font-size="15" fill="#2C2C2A" font-family="Georgia,serif">Perplexity</text>
<rect x="210" y="126" width="325.6" height="24" rx="3" fill="#C0451F"/>
<text x="543.6" y="147" font-size="14" font-weight="600" fill="#2C2C2A" font-family="Georgia,serif">74%</text>
</g>
<text x="24" y="268" font-size="11.5" fill="#5F5E5A" font-family="Georgia,serif">Source: Stratezik Toronto AI Citation Tracker, 50 frozen queries per engine, collected July 3, 2026.</text>
</svg>

<svg viewBox="0 0 720 520" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Share of answers naming a local business by category, all four engines combined, July 2026. Restaurants and medical clinics 100 percent; general contracting lowest at 75 percent.">
<rect x="0" y="0" width="720" height="520" rx="10" fill="#FBFAF7"/>
<text x="24" y="34" font-size="17" font-weight="600" fill="#2C2C2A" font-family="Georgia,serif">Which categories get named, and which get generic advice?</text>
<text x="24" y="56" font-size="13" fill="#5F5E5A" font-family="Georgia,serif">Share of answers naming a local business, all four engines combined, July 2026</text>
<g transform="translate(0,74)">
<line x1="210" y1="0" x2="210" y2="400" stroke="#E7E4DC" stroke-width="1"/>
<text x="198" y="27" text-anchor="end" font-size="15" fill="#2C2C2A" font-family="Georgia,serif">Restaurants</text>
<rect x="210" y="6" width="440.0" height="24" rx="3" fill="#0F6E56"/>
<text x="658.0" y="27" font-size="14" font-weight="600" fill="#2C2C2A" font-family="Georgia,serif">100%</text>
<text x="198" y="67" text-anchor="end" font-size="15" fill="#2C2C2A" font-family="Georgia,serif">Medical clinics</text>
<rect x="210" y="46" width="440.0" height="24" rx="3" fill="#0F6E56"/>
<text x="658.0" y="67" font-size="14" font-weight="600" fill="#2C2C2A" font-family="Georgia,serif">100%</text>
<text x="198" y="107" text-anchor="end" font-size="15" fill="#2C2C2A" font-family="Georgia,serif">Plumbing</text>
<rect x="210" y="86" width="418.0" height="24" rx="3" fill="#0F6E56"/>
<text x="636.0" y="107" font-size="14" font-weight="600" fill="#2C2C2A" font-family="Georgia,serif">95%</text>
<text x="198" y="147" text-anchor="end" font-size="15" fill="#2C2C2A" font-family="Georgia,serif">Dental</text>
<rect x="210" y="126" width="396.0" height="24" rx="3" fill="#0F6E56"/>
<text x="614.0" y="147" font-size="14" font-weight="600" fill="#2C2C2A" font-family="Georgia,serif">90%</text>
<text x="198" y="187" text-anchor="end" font-size="15" fill="#2C2C2A" font-family="Georgia,serif">Injury law</text>
<rect x="210" y="166" width="396.0" height="24" rx="3" fill="#0F6E56"/>
<text x="614.0" y="187" font-size="14" font-weight="600" fill="#2C2C2A" font-family="Georgia,serif">90%</text>
<text x="198" y="227" text-anchor="end" font-size="15" fill="#2C2C2A" font-family="Georgia,serif">Wellness</text>
<rect x="210" y="206" width="396.0" height="24" rx="3" fill="#0F6E56"/>
<text x="614.0" y="227" font-size="14" font-weight="600" fill="#2C2C2A" font-family="Georgia,serif">90%</text>
<text x="198" y="267" text-anchor="end" font-size="15" fill="#2C2C2A" font-family="Georgia,serif">Home services</text>
<rect x="210" y="246" width="374.0" height="24" rx="3" fill="#0F6E56"/>
<text x="592.0" y="267" font-size="14" font-weight="600" fill="#2C2C2A" font-family="Georgia,serif">85%</text>
<text x="198" y="307" text-anchor="end" font-size="15" fill="#2C2C2A" font-family="Georgia,serif">Pest control</text>
<rect x="210" y="286" width="374.0" height="24" rx="3" fill="#0F6E56"/>
<text x="592.0" y="307" font-size="14" font-weight="600" fill="#2C2C2A" font-family="Georgia,serif">85%</text>
<text x="198" y="347" text-anchor="end" font-size="15" fill="#2C2C2A" font-family="Georgia,serif">Accounting</text>
<rect x="210" y="326" width="352.0" height="24" rx="3" fill="#0F6E56"/>
<text x="570.0" y="347" font-size="14" font-weight="600" fill="#2C2C2A" font-family="Georgia,serif">80%</text>
<text x="198" y="387" text-anchor="end" font-size="15" fill="#2C2C2A" font-family="Georgia,serif">General contracting</text>
<rect x="210" y="366" width="330.0" height="24" rx="3" fill="#0F6E56"/>
<text x="548.0" y="387" font-size="14" font-weight="600" fill="#2C2C2A" font-family="Georgia,serif">75%</text>
</g>
<text x="24" y="508" font-size="11.5" fill="#5F5E5A" font-family="Georgia,serif">Source: Stratezik Toronto AI Citation Tracker, 200 data points across 4 engines, collected July 3, 2026.</text>
</svg>

## About Stratezik

Stratezik is a Toronto marketing agency that runs on its own AI agent system. We help local businesses and startups get found and cited by AI search. Want your category or your business tracked, or a custom query run? Email dave@stratezik.com.

### Sources

1. Stratezik Toronto AI Citation Tracker, July 2026: 50 frozen high-intent GTA buyer questions across 10 categories, run through ChatGPT, Perplexity, Google AI Mode, and Claude on July 3, 2026. Dataset available on request.
2. Stratezik ChatGPT Ad-Presence Dataset, July 2026: the same 50 questions checked logged out for a labelled ChatGPT ad placement on July 3 and July 5, 2026. Dataset available on request.
3. Stratezik ChatGPT Ad Competitiveness Study, June 2026: 90 buyer questions across 18 industries, run in logged-in ChatGPT (Free tier, web search on) on June 19, 2026, and scored for ad presence, advertiser, and relevance. Dataset available on request.
4. ChatGPT ad pricing (CPC, CPM, self-serve access, tier and geography targeting), third-party market reporting, 2026: OpenAI Help Center (help.openai.com/en/articles/20001207), WebFX (webfx.com/blog/ai/chatgpt-ads-cost), eSEOspace (eseospace.com/blog/chatgpt-ads-pricing), The Next Web (thenextweb.com/news/openai-chatgpt-cpc-ads-launch). OpenAI does not publish official ad rates; figures are directional.
5. Stratezik AEO Readiness Checker and 20-point methodology: stratezik.com/aeo-checker.`
