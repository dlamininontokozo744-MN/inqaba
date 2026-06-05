
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import hlane from './images/hlane.jpg';
import mantenga from './images/mantenga.jpg';
import lobamba from './images/lobamba.jpg';
import swazi from './images/swazi.jpg';
import malolotja from './images/malolotja.jpg';
import sibebe from './images/sibebe.jpg';

const T = {
  en: {
    explore:'Explore Eswatini ✦', tagline:"Unlocking Eswatini's Hidden Treasures",
    sub:'The Smart Digital Tourism Ecosystem 🇸🇿', offline:'siSwati · English · Offline Ready',

    welcome:"Welcome to Africa's Hidden Fortress 💎",
    welcomeSub:'Discover breathtaking landscapes, vibrant culture, and unforgettable experiences.',
    attractions:'Attractions', restaurants:'Restaurants', hotels:'Hotels',
    topAttractions:'Top Attractions', hiddenGem:'Hidden Gem 💎',
    aiTitle:'Incaba AI Guide', aiSub:'Ask anything about Eswatini',
    navigate:'Navigate', home:'Home', ai:'AI Guide', dash:'Dashboard', business:'Business',
    sos:'SOS Emergency Mode', sosSub:'Tap to share location with emergency services',
    weather:'Weather Today', currency:'Currency Converter',
    reviews:'Tourist Reviews', writeReview:'Write a Review',
    submit:'Submit Review', cancel:'Cancel',

    getDir:'🗺️ Get Directions', savePlace:'❤️ Save Place',
    about:'About', location:'📍 Location', hours:'🕐 Opening Hours',
    price:'💰 Entry Fee', tips:'💡 Travel Tips',
  },
  ss: {
    explore:'Hlola Eswatini ✦', tagline:'Sivula Tigugu Letifihlekile Tase-Eswatini',
    sub:'Inhlelo Lehlakaniphile Yekuvakasha 🇸🇿', offline:'siSwati · English · Isebenta Ungaxhunyiwe',
    welcome:'Siyakemukela e-Africa Incaba Lefihlekile 💎',
    welcomeSub:'Tola tindzawo letimangalisako, inhlalo-mphilo, netilwimi letingakhohlwakali.',
    attractions:'Tindzawo', restaurants:'Emadlelo', hotels:'Emahhotela',
    topAttractions:'Tindzawo Letiphambili', hiddenGem:'Sigugu Lesikhulu 💎',
    aiTitle:'Umcondzi we-Incaba AI', aiSub:'Butseka noma yini nge-Eswatini',
    navigate:'Hamba', home:'Ekhaya', ai:'Umcondzi', dash:'Ibalabala', business:'Ibhizinisi',
    sos:'Isimo Sehhatsi', sosSub:'Cindzetela wabelane ndzawo yakho nebaphephisi',
    weather:'Isimo Selizulu Lamuhla', currency:'Shintsha Imali',
    reviews:'Tibuka Tetivakashi', writeReview:'Bhala Tibuka',
    submit:'Thumela', cancel:'Yekela',
    getDir:'🗺️ Tsatsa Indlela', savePlace:'❤️ Gcina Indawo',
    about:'Mayelana', location:'📍 Ndzawo', hours:'🕐 Sikhati Sekuvulwa',
    price:'💰 Inkokhelo', tips:'💡 Imilayeto Yekuvakasha',
  }
};


const RATES = { USD:0.054, ZAR:1.0, EUR:0.050, GBP:0.043, BWP:0.73 };

const places = [
  { name:'Hlane Royal Reserve', region:'Lubombo Region', desc:"Lions, elephants & white rhinos in Eswatini's largest park", fullDesc:"Hlane Royal National Park is Eswatini's largest protected area covering 22,000 hectares. Home to lions, elephants, white rhinos, giraffes, zebras and over 300 bird species. Named by King Sobhuza II — Hlane means wilderness in siSwati.", rating:'4.9', category:'Wildlife', img:hlane, gallery:[hlane,hlane,hlane], location:'Lubombo Region, 67km from Manzini', hours:'Open daily 6am – 6pm', price:'E 150 per person', tips:['Book guided game drives in advance','Best time is early morning','Bring binoculars for bird watching'] },
  { name:'Mantenga Falls', region:'Hhohho Region', desc:'Breathtaking 95m waterfall in the Ezulwini Valley', fullDesc:"Mantenga Falls drops 95 metres into a pristine pool surrounded by lush indigenous forest. Perfect for swimming, hiking and photography. One of Eswatini's most spectacular natural wonders.", rating:'4.8', category:'Nature', img:mantenga, gallery:[mantenga,mantenga,mantenga], location:'Ezulwini Valley, Hhohho Region', hours:'Open daily 7am – 5pm', price:'E 80 per person', tips:['Wear waterproof shoes','Best after rainy season','Swimming allowed below the falls'] },
  { name:'Lobamba Royal Village', region:'Manzini Region', desc:'Heart of Swazi culture — home of the King', fullDesc:"Lobamba is the royal and legislative capital of Eswatini. Home of the Queen Mother and where the Incwala and Umhlanga ceremonies take place. Contains the National Museum and Parliament buildings.", rating:'4.7', category:'Culture', img:lobamba, gallery:[lobamba,lobamba,lobamba], location:'Ezulwini Valley, Manzini Region', hours:'Open daily 8am – 4pm', price:'E 50 per person', tips:['Dress respectfully','Visit during Umhlanga in August','Photography may require permission'] },
  { name:'Swazi Candles Market', region:'Malkerns Valley', desc:'World-famous handmade candles and craft market', fullDesc:"Artisans hand-craft beautiful animal-shaped candles using traditional techniques. The market features local crafts, textiles, jewelry and fresh produce. Perfect for authentic Swazi souvenirs.", rating:'4.6', category:'Culture', img:swazi, gallery:[swazi,swazi,swazi], location:'Malkerns Valley, Manzini Region', hours:'Open daily 8am – 5pm', price:'Free entry', tips:['Bargaining is acceptable','Buy candles as unique gifts','Try the local food stalls'] },
  { name:'Malolotja Reserve', region:'Hhohho Region', desc:'Ancient mountains, rare orchids and cable car rides', fullDesc:"Contains some of the oldest geological formations on earth with rare indigenous flora and rare bird species. The cable car offers stunning mountain views. Less than 2% of tourists ever visit.", rating:'4.8', category:'Nature', img:malolotja, gallery:[malolotja,malolotja,malolotja], location:'Northwestern Eswatini, Hhohho Region', hours:'Open daily 6am – 6pm', price:'E 120 per person', tips:['Cable car is a must-do','Bring warm clothing','Great for serious hikers'] },

  { name:'Sibebe Rock', region:'Hhohho Region', desc:"World's second largest rock near Mbabane", fullDesc:"The world's second largest exposed granite rock. Just 10km from capital Mbabane, offering challenging hiking trails and panoramic views across the entire country. A true hidden gem.", rating:'4.5', category:'Adventure', img:sibebe, gallery:[sibebe,sibebe,sibebe], location:'10km from Mbabane, Hhohho Region', hours:'Open daily 6am – 6pm', price:'E 60 per person', tips:['Wear proper hiking shoes','Go early to avoid heat','Bring plenty of water'] },
];

const restaurants = [
  { name:"Malandela's Restaurant", region:'Malkerns', desc:'Traditional Swazi cuisine in a beautiful garden setting', 

rating:'4.8', icon:'🍴', price:'E 80–200 per person', hours:'Mon–Sun 11am–9pm' },
  { name:'Tum\'s George Hotel', region:'Mbabane', desc:'Fine dining with panoramic views of the Ezulwini Valley', rating:'4.6', icon:'🍽️', price:'E 120–300 per person', hours:'Daily 7am–10pm' },
  { name:'Gables Shopping Centre Food Court', region:'Ezulwini', desc:'Local and international food options for every budget', rating:'4.2', icon:'🛍️', price:'E 40–120 per person', hours:'Daily 9am–8pm' },
  { name:'Foresters Arms Hotel', region:'Malkerns', desc:'Classic pub meals in a cozy countryside atmosphere', rating:'4.4', icon:'🏡', price:'E 60–150 per person', hours:'Daily 11am–10pm' },
];

const hotels = [
  { name:'Royal Swazi Spa & Hotel', 

region:'Ezulwini Valley', desc:'Luxury 5-star hotel with spa, casino and golf course', rating:'4.9', icon:'🏨', price:'E 1,800–4,500 per night', stars:'★★★★★' },
  { name:'Mantengha Cultural Village', region:'Ezulwini', desc:'Authentic cultural experience in traditional Swazi huts', rating:'4.7', icon:'🛖', price:'E 600–1,200 per night', stars:'★★★★☆' },
  { name:'Foresters Arms', region:'Malkerns', desc:'Charming country hotel surrounded by forest and gardens', rating:'4.5', icon:'🌲', price:'E 800–1,800 per night', stars:'★★★★☆' },
  { name:'Lidwala Backpacker Lodge', region:'Mbabane', desc:'Budget-friendly lodge with stunning rock formations', rating:'4.3', icon:'⛺', price:'E 150–400 per night', stars:'★★★☆☆' },
];

function App() {
  const [screen, setScreen] = useState('splash');
  const [tab, setTab] = useState('home');
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [lang, setLang] = useState('en');
  const t = T[lang];

  if (screen === 'splash') {
    return (
      <div style={styles.splash}>
        <div style={styles.splashGlow} />
        <div style={{fontSize:72,marginBottom:16}}>💎</div>
        <h1 style={styles.splashTitle}>Inc<span style={styles.gold}>aba</span></h1>
        <div style={{fontSize:15,color:'#c9a227',fontWeight:600,marginBottom:8}}>{t.tagline}</div>
        <p style={{color:'#8fa3c4',fontSize:13,margin:'0 0 20px',lineHeight:1.6}}>{t.sub}</p>
        <div style={{display:'flex',gap:8,justifyContent:'center',marginBottom:28}}>
          {['#3E5EB9','#FFD700','#B22234','#2E7D32'].map(c=>(
            <div key={c} style={{width:12,height:12,borderRadius:'50%',background:c}}/>
          ))}
        </div>
        <button style={styles.btnPrimary} onClick={()=>setScreen('main')}>{t.explore}</button>

        <p style={{color:'#5f7a9a',fontSize:11,marginTop:16}}>{t.offline}</p>
      </div>
    );
  }

  if (selectedPlace) return <DetailScreen place={selectedPlace} onBack={()=>setSelectedPlace(null)} t={t} />;
  if (selectedRestaurant) return <RestaurantDetail item={selectedRestaurant} onBack={()=>setSelectedRestaurant(null)} t={t} />;
  if (selectedHotel) return <HotelDetail item={selectedHotel} onBack={()=>setSelectedHotel(null)} t={t} />;

  return (
    <div style={styles.app}>
      <div style={styles.topbar}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <div style={{fontSize:20,width:32,height:32,borderRadius:8,background:'linear-gradient(135deg,#c9a227,#e8b93a)',display:'flex',alignItems:'center',justifyContent:'center'}}>💎</div>
          <span style={{fontSize:18,fontWeight:700,color:'#f0f4ff'}}>Inq<span style={styles.gold}>aba</span></span>
        </div>
        
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <span style={{...styles.langBtn,...(lang==='en'?styles.langBtnActive:{})}} onClick={()=>setLang('en')}>EN</span>
          <span style={{...styles.langBtn,...(lang==='ss'?styles.langBtnActive:{})}} onClick={()=>setLang('ss')}>SS</span>
          <span style={{fontSize:22}}>🇸🇿</span>
        </div>
      </div>
      <div style={styles.content}>
        {tab==='home'     && <HomeTab setTab={setTab} onSelect={setSelectedPlace} onSelectRestaurant={setSelectedRestaurant} onSelectHotel={setSelectedHotel} t={t}/>}
        {tab==='map'      && <MapTab t={t}/>}
        {tab==='ai'       && <AITab t={t}/>}
        {tab==='dash'     && <DashTab t={t}/>}
        {tab==='business' && <BusinessTab t={t}/>}
      </div>

      <div style={styles.bottomNav}>
        {[
          {id:'home',icon:'🏠',label:t.home},
          {id:'map', icon:'🗺️', label:t.navigate},
          {id:'ai',  icon:'🤖',label:t.ai},
          {id:'dash',icon:'📊',label:t.dash},
          {id:'business',icon:'🏨',label:t.business},
        ].map(item=>(
          <div key={item.id} style={tab===item.id?styles.navActive:styles.navItem} onClick={()=>setTab(item.id)}>
            <span style={{fontSize:20}}>{item.icon}</span>
            <span style={{fontSize:10,color:tab===item.id?'#c9a227':'#8fa3c4',fontWeight:500}}>{item.label}</span>
          </div>
        ))}

      </div>
    </div>
  );
}

// ── WEATHER ──────────────────────────────────────────────
function WeatherWidget({t}) {
  const [selected, setSelected] = useState(null);
  const cities = [
    {name:'Mbabane', temp:22, icon:'⛅', desc:'Partly Cloudy', humidity:'65%', wind:'12 km/h', uv:'Moderate'},
    {name:'Manzini', temp:26, icon:'☀️', desc:'Sunny',         humidity:'45%', wind:'8 km/h',  uv:'High'},
    {name:'Lubombo', temp:29, icon:'🌤️', desc:'Clear',          humidity:'38%', wind:'15 km/h', uv:'Very High'},
  ];
  return (
    <div style={{marginBottom:16}}>
      <div style={styles.sectionTitle}>{t.weather}</div>
      <div style={{display:'flex',gap:10,marginBottom: selected?12:0}}>
        {cities.map(c=>(
          <div key={c.name} onClick={()=>setSelected(selected?.name===c.name?null:c)} style={{flex:1,background:selected?.name===c.name?'rgba(24,95,165,0.25)':'rgba(24,95,165,0.12)',border:`0.5px solid ${selected?.name===c.name?'rgba(24,95,165,0.6)':'rgba(24,95,165,0.3)'}`,borderRadius:12,padding:'12px 8px',textAlign:'center',cursor:'pointer',transition:'all 0.2s'}}>

            <div style={{fontSize:24}}>{c.icon}</div>
            <div style={{fontSize:18,fontWeight:700,color:'#f0f4ff',marginTop:4}}>{c.temp}°C</div>
            <div style={{fontSize:11,color:'#c9a227',fontWeight:600,marginTop:2}}>{c.name}</div>
            <div style={{fontSize:10,color:'#8fa3c4',marginTop:2}}>{c.desc}</div>
          </div>
        ))}
      </div>
      {selected && (
        <div style={{background:'rgba(24,95,165,0.12)',border:'0.5px solid rgba(24,95,165,0.3)',borderRadius:12,padding:14,marginTop:8}}>
          <div style={{fontSize:14,fontWeight:600,color:'#f0f4ff',marginBottom:10}}>{selected.icon} {selected.name} — Detailed Forecast</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8}}>
            {[['💧 Humidity',selected.humidity],['💨 Wind',selected.wind],['☀️ UV Index',selected.uv]].map(([l,v])=>(
              <div key={l} style={{background:'rgba(255,255,255,0.05)',borderRadius:8,padding:'10px 8px',textAlign:'center'}}>
                <div style={{fontSize:11,color:'#8fa3c4',marginBottom:4}}>{l}</div>
                <div style={{fontSize:14,fontWeight:600,color:'#c9a227'}}>{v}</div>
              </div>
            ))}

          </div>
          <div style={{marginTop:10,fontSize:12,color:'#5dcaa5'}}>✅ Great day to visit {selected.name} attractions!</div>
        </div>
      )}
    </div>
  );
}

// ── CURRENCY ─────────────────────────────────────────────
function CurrencyConverter({t}) {
  const [amount,setAmount] = useState('100');
  const [to,setTo]         = useState('USD');
  const result = amount?(parseFloat(amount)*RATES[to]).toFixed(2):'0.00';
  return (
    <div style={{background:'rgba(201,162,39,0.06)',border:'0.5px solid rgba(201,162,39,0.25)',borderRadius:14,padding:14,marginBottom:16}}>
      <div style={styles.sectionTitle}>{t.currency}</div>
      <div style={{fontSize:12,color:'#8fa3c4',marginBottom:10}}>Eswatini Lilangeni (SZL) →</div>
      <div style={{display:'flex',gap:10,alignItems:'center',marginBottom:12}}>
        <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} style={{flex:1,background:'rgba(255,255,255,0.06)',border:'0.5px solid rgba(201,162,39,0.3)',borderRadius:10,padding:'10px 14px',color:'#f0f4ff',fontSize:16,fontWeight:700,outline:'none'}} placeholder="Amount in SZL"/>
        <select value={to} onChange={e=>setTo(e.target.value)} style={{background:'#0f2040',border:'0.5px solid rgba(201,162,39,0.3)',borderRadius:10,padding:'10px 12px',color:'#c9a227',fontSize:14,fontWeight:600,outline:'none',cursor:'pointer'}}>
          {Object.keys(RATES).map(k=><option key={k} value={k}>{k}</option>)}
        </select>
      </div>
      <div style={{background:'rgba(201,162,39,0.1)',borderRadius:10,padding:'12px 14px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <span style={{fontSize:13,color:'#8fa3c4'}}>E {amount||'0'} SZL =</span>
        <span style={{fontSize:22,fontWeight:700,color:'#c9a227'}}>{result} {to}</span>
      </div>
    </div>
  );
}

// ── REVIEWS ──────────────────────────────────────────────
function ReviewsSection({placeName,t}) {
  const [reviews,setReviews] = useState([
    {name:'Sarah M.',flag:'🇬🇧',stars:5,text:"Absolutely breathtaking! One of the best experiences of my life.",date:'2 days ago'},
    {name:'João P.', flag:'🇧🇷',stars:5,text:'Incredible wildlife and friendly people. Will definitely come back!',date:'1 week ago'},
    {name:'Thandi D.',flag:'🇿🇦',stars:4,text:'Beautiful place, well maintained. The guided tour was very informative.',date:'2 weeks ago'},
  ]);
  const [showForm,setShowForm] = useState(false);
  const [newName,setNewName]   = useState('');
  const [newText,setNewText]   = useState('');
  const [newStars,setNewStars] = useState(5);
  const submit = ()=>{
    if(!newName.trim()||!newText.trim()) return;
    setReviews(prev=>[{name:newName,flag:'🌍',stars:newStars,text:newText,date:'Just now'},...prev]);
    setNewName(''); setNewText(''); setShowForm(false);
  };
  return (
    <div style={{marginBottom:16}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <div style={styles.sectionTitle}>{t.reviews}</div>
        <button style={{fontSize:12,color:'#c9a227',background:'rgba(201,162,39,0.1)',border:'0.5px solid rgba(201,162,39,0.3)',borderRadius:20,padding:'5px 12px',cursor:'pointer'}} onClick={()=>setShowForm(!showForm)}>+ {t.writeReview}</button>

      </div>
      {showForm&&(
        <div style={{background:'rgba(255,255,255,0.04)',border:'0.5px solid rgba(201,162,39,0.25)',borderRadius:12,padding:14,marginBottom:12}}>
          <div style={{display:'flex',gap:6,marginBottom:10}}>
            {[1,2,3,4,5].map(s=>(
              <span key={s} onClick={()=>setNewStars(s)} style={{fontSize:24,cursor:'pointer',opacity:s<=newStars?1:0.3}}>⭐</span>
            ))}
          </div>
          <input value={newName} onChange={e=>setNewName(e.target.value)} placeholder="Your name" style={{width:'100%',background:'rgba(255,255,255,0.06)',border:'0.5px solid rgba(201,162,39,0.25)',borderRadius:8,padding:'10px 12px',color:'#f0f4ff',fontSize:13,outline:'none',marginBottom:8,boxSizing:'border-box'}}/>
          <textarea value={newText} onChange={e=>setNewText(e.target.value)} placeholder="Share your experience..." rows={3} style={{width:'100%',background:'rgba(255,255,255,0.06)',border:'0.5px solid rgba(201,162,39,0.25)',borderRadius:8,padding:'10px 12px',color:'#f0f4ff',fontSize:13,outline:'none',resize:'none',fontFamily:'inherit',boxSizing:'border-box'}}/>
          <div style={{display:'flex',gap:8,marginTop:8}}>
            <button style={{...styles.btnPrimary,flex:1,padding:'10px',fontSize:13}} onClick={submit}>{t.submit}</button>
            <button style={{flex:1,padding:'10px',fontSize:13,borderRadius:50,border:'0.5px solid rgba(201,162,39,0.3)',background:'transparent',color:'#8fa3c4',cursor:'pointer'}} onClick={()=>setShowForm(false)}>{t.cancel}</button>
          </div>
        </div>
      )}
      {reviews.map((r,i)=>(
        <div key={i} style={{background:'rgba(255,255,255,0.04)',border:'0.5px solid rgba(201,162,39,0.15)',borderRadius:12,padding:14,marginBottom:8}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <span style={{fontSize:20}}>{r.flag}</span>
              <span style={{fontSize:13,fontWeight:600,color:'#f0f4ff'}}>{r.name}</span>
            </div>
            <span style={{fontSize:11,color:'#8fa3c4'}}>{r.date}</span>
          </div>
          <div style={{marginBottom:6}}>{'⭐'.repeat(r.stars)}</div>
          <div style={{fontSize:13,color:'#b0c4de',lineHeight:1.6}}>{r.text}</div>
        </div>
      ))}

    </div>
  );
}

// ── DETAIL SCREEN ─────────────────────────────────────────
function DetailScreen({place,onBack,t}) {
  const [activePhoto,setActivePhoto] = useState(0);
  const [saved,setSaved] = useState(false);
  return (
    <div style={styles.app}>
      <div style={{position:'relative',height:280,overflow:'hidden',flexShrink:0}}>
        <img src={place.gallery[activePhoto]} alt={place.name} style={{width:'100%',height:'100%',objectFit:'cover'}}/>

        <div style={{position:'absolute',top:0,left:0,right:0,bottom:0,background:'linear-gradient(to bottom,rgba(0,0,0,0.3) 0%,transparent 40%,rgba(10,22,40,0.85) 100%)'}}/>
        <button onClick={onBack} style={{position:'absolute',top:16,left:16,background:'rgba(10,22,40,0.7)',border:'0.5px solid rgba(255,255,255,0.2)',borderRadius:50,padding:'8px 14px',color:'#f0f4ff',fontSize:13,cursor:'pointer'}}>← Back</button>
        <div style={{position:'absolute',top:16,right:16,background:'rgba(201,162,39,0.9)',borderRadius:20,padding:'4px 10px',fontSize:11,fontWeight:700,color:'#0a1628'}}>{place.category}</div>
        <div style={{position:'absolute',bottom:16,left:16}}>
          <div style={{fontSize:22,fontWeight:700,color:'#f0f4ff',marginBottom:4}}>{place.name}</div>
          <div style={{fontSize:13,color:'rgba(255,255,255,0.8)'}}>📍 {place.region}</div>
        </div>
      </div>
      <div style={{display:'flex',gap:8,padding:'12px 16px',background:'rgba(10,22,40,0.95)',flexShrink:0}}>
        {place.gallery.map((img,i)=>(
          <div key={i} onClick={()=>setActivePhoto(i)} style={{width:64,height:48,borderRadius:8,overflow:'hidden',border:activePhoto===i?'2px solid #c9a227':'2px solid transparent',cursor:'pointer',flexShrink:0}}>

            <img src={img} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
          </div>
        ))}
      </div>
      <div style={{flex:1,overflowY:'auto',padding:16}}>
        <div style={{display:'flex',gap:8,marginBottom:16,flexWrap:'wrap'}}>
          <div style={styles.infoBadge}>⭐ {place.rating}</div>
          <div style={styles.infoBadge}>{place.hours}</div>
          <div style={{...styles.infoBadge,color:'#5dcaa5',borderColor:'rgba(29,158,117,0.3)',background:'rgba(29,158,117,0.1)'}}>{place.price}</div>

        </div>
        <div style={{fontSize:14,color:'#c9a227',fontWeight:600,marginBottom:8}}>{t.about}</div>
        <div style={{fontSize:13,color:'#b0c4de',lineHeight:1.8,marginBottom:16}}>{place.fullDesc}</div>
        <div style={{background:'rgba(255,255,255,0.05)',border:'0.5px solid rgba(201,162,39,0.2)',borderRadius:12,padding:14,marginBottom:14}}>
          <div style={{fontSize:14,color:'#c9a227',fontWeight:600,marginBottom:6}}>{t.location}</div>
          <div style={{fontSize:13,color:'#8fa3c4'}}>{place.location}</div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:14}}>
          <div style={{background:'rgba(255,255,255,0.05)',border:'0.5px solid rgba(201,162,39,0.2)',borderRadius:12,padding:14}}>
            <div style={{fontSize:12,color:'#c9a227',fontWeight:600,marginBottom:4}}>{t.hours}</div>
            <div style={{fontSize:12,color:'#8fa3c4'}}>{place.hours}</div>
          </div>
          <div style={{background:'rgba(255,255,255,0.05)',border:'0.5px solid rgba(201,162,39,0.2)',borderRadius:12,padding:14}}>
            <div style={{fontSize:12,color:'#c9a227',fontWeight:600,marginBottom:4}}>{t.price}</div>
            <div style={{fontSize:12,color:'#8fa3c4'}}>{place.price}</div>
          </div>
        </div>
        <div style={{fontSize:14,color:'#c9a227',fontWeight:600,marginBottom:10}}>{t.tips}</div>
        {place.tips.map((tip,i)=>(
          <div key={i} style={{display:'flex',gap:10,alignItems:'flex-start',marginBottom:8}}>
            <div style={{width:6,height:6,borderRadius:'50%',background:'#c9a227',flexShrink:0,marginTop:5}}/>
            <div style={{fontSize:13,color:'#8fa3c4',lineHeight:1.6}}>{tip}</div>

          </div>
        ))}
        <ReviewsSection placeName={place.name} t={t}/>
        <div style={{display:'flex',gap:10,marginTop:8,marginBottom:8}}>
          <button style={{...styles.btnPrimary,flex:1,padding:'12px',fontSize:14}} onClick={()=>window.open(`https://www.google.com/maps/search/${encodeURIComponent(place.name)}+Eswatini`,'_blank')}>{t.getDir}</button>
          <button style={{flex:1,padding:'12px',fontSize:14,borderRadius:50,border:`0.5px solid ${saved?'rgba(29,158,117,0.6)':'rgba(201,162,39,0.4)'}`,background:saved?'rgba(29,158,117,0.15)':'transparent',color:saved?'#5dcaa5':'#c9a227',cursor:'pointer',fontWeight:600}} onClick={()=>{setSaved(true);alert('✅ '+place.name+' saved to your places!')}}>{saved?'✅ Saved':t.savePlace}</button>
        </div>
        <button style={{width:'100%',padding:'12px',fontSize:14,borderRadius:50,border:'1px solid rgba(226,75,74,0.4)',background:'rgba(226,75,74,0.1)',color:'#e24b4a',cursor:'pointer',fontWeight:600,marginBottom:20}} onClick={()=>{if(window.confirm('🆘 Call Eswatini Emergency Services (999)?'))window.location.href='tel:999';}}>🆘 {t.sos}</button>
      </div>
    </div>
  );
}

// ── RESTAURANT DETAIL ─────────────────────────────────────
function RestaurantDetail({item,onBack,t}) {
  return (
    <div style={styles.app}>
      <div style={{background:'linear-gradient(135deg,#1a3a1a,#2d5a2d)',height:200,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,position:'relative'}}>
        <div style={{fontSize:64}}>{item.icon}</div>
        <button onClick={onBack} style={{position:'absolute',top:16,left:16,background:'rgba(10,22,40,0.7)',border:'0.5px solid rgba(255,255,255,0.2)',borderRadius:50,padding:'8px 14px',color:'#f0f4ff',fontSize:13,cursor:'pointer'}}>← Back</button>

      </div>
      <div style={{flex:1,overflowY:'auto',padding:16}}>
        <h2 style={{fontSize:22,fontWeight:700,color:'#f0f4ff',marginBottom:4}}>{item.name}</h2>
        <div style={{fontSize:13,color:'#8fa3c4',marginBottom:14}}>📍 {item.region}</div>
        <div style={{display:'flex',gap:8,marginBottom:16,flexWrap:'wrap'}}>
          <div style={styles.infoBadge}>⭐ {item.rating}</div>
          <div style={styles.infoBadge}>🕐 {item.hours}</div>
          <div style={{...styles.infoBadge,color:'#5dcaa5',borderColor:'rgba(29,158,117,0.3)',background:'rgba(29,158,117,0.1)'}}>{item.price}</div>
        </div>
        <div style={{fontSize:13,color:'#b0c4de',lineHeight:1.8,marginBottom:16}}>{item.desc}</div>
        <ReviewsSection placeName={item.name} t={t}/>
        <button style={{...styles.btnPrimary,marginBottom:20}} onClick={()=>window.open(`https://www.google.com/maps/search/${encodeURIComponent(item.name)}+Eswatini`,'_blank')}>🗺️ Get Directions</button>
      </div>
    </div>
  );
}

// ── HOTEL DETAIL ──────────────────────────────────────────
function HotelDetail({item,onBack,t}) {
  const [showBooking,setShowBooking] = useState(false);
  const [checkIn,setCheckIn]   = useState('');
  const [checkOut,setCheckOut] = useState('');
  const [guests,setGuests]     = useState('2');
  return (
    <div style={styles.app}>
      <div style={{background:'linear-gradient(135deg,#1a2a3a,#2d3d5a)',height:200,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,position:'relative'}}>
        <div style={{fontSize:64}}>{item.icon}</div>
        <button onClick={onBack} style={{position:'absolute',top:16,left:16,background:'rgba(10,22,40,0.7)',border:'0.5px solid rgba(255,255,255,0.2)',borderRadius:50,padding:'8px 14px',color:'#f0f4ff',fontSize:13,cursor:'pointer'}}>← Back</button>
        <div style={{position:'absolute',top:16,right:16,fontSize:14,color:'#c9a227'}}>{item.stars}</div>
      </div>
      <div style={{flex:1,overflowY:'auto',padding:16}}>
        <h2 style={{fontSize:22,fontWeight:700,color:'#f0f4ff',marginBottom:4}}>{item.name}</h2>
        <div style={{fontSize:13,color:'#8fa3c4',marginBottom:14}}>📍 {item.region}</div>
        <div style={{display:'flex',gap:8,marginBottom:16,flexWrap:'wrap'}}>
          <div style={styles.infoBadge}>⭐ {item.rating}</div>
          <div style={{...styles.infoBadge,color:'#5dcaa5',borderColor:'rgba(29,158,117,0.3)',background:'rgba(29,158,117,0.1)'}}>{item.price}</div>
        </div>
        <div style={{fontSize:13,color:'#b0c4de',lineHeight:1.8,marginBottom:16}}>{item.desc}</div>
        {!showBooking?(
          <button style={{...styles.btnPrimary,marginBottom:12}} onClick={()=>setShowBooking(true)}>🛏️ Book Now</button>
        ):(
          <div style={{background:'rgba(201,162,39,0.06)',border:'0.5px solid rgba(201,162,39,0.25)',borderRadius:14,padding:16,marginBottom:16}}>
            <div style={{fontSize:15,fontWeight:600,color:'#c9a227',marginBottom:14}}>📅 Book Your Stay</div>
            {[['Check-in Date',checkIn,setCheckIn,'date'],['Check-out Date',checkOut,setCheckOut,'date'],['Number of Guests',guests,setGuests,'number']].map(([label,val,setter,type])=>(
              <div key={label} style={{marginBottom:12}}>
                <div style={{fontSize:12,color:'#8fa3c4',marginBottom:6}}>{label}</div>
                <input type={type} value={val} onChange={e=>setter(e.target.value)} style={{width:'100%',background:'rgba(255,255,255,0.06)',border:'0.5px solid rgba(201,162,39,0.3)',borderRadius:10,padding:'10px 14px',color:'#f0f4ff',fontSize:14,outline:'none',boxSizing:'border-box'}}/>
              </div>
            ))}
            <button style={{...styles.btnPrimary,marginBottom:8}} onClick={()=>{if(checkIn&&checkOut)alert(`✅ Booking confirmed!\n\n🏨 ${item.name}\n📅 ${checkIn} → ${checkOut}\n👥 ${guests} guests\n\nWe will contact you to confirm!`);else alert('Please fill in all dates');}}>Confirm Booking</button>
            <button style={{width:'100%',padding:'11px',borderRadius:50,border:'0.5px solid rgba(201,162,39,0.3)',background:'transparent',color:'#8fa3c4',cursor:'pointer',fontSize:14}} onClick={()=>setShowBooking(false)}>Cancel</button>
          </div>
        )}
        <ReviewsSection placeName={item.name} t={t}/>
      </div>
    </div>
  );
}

// ── HOME TAB ──────────────────────────────────────────────
function HomeTab({setTab,onSelect,onSelectRestaurant,onSelectHotel,t}) {
  const [activeSection,setActiveSection] = useState('attractions');

  const handleSOS = ()=>{
    if(window.confirm('🆘 Call Eswatini Emergency Services?\n\nPolice: 999\nAmbulance: 977\nFire: 933'))
      window.location.href='tel:999';
  };
  return (
    <div>
      <div style={styles.sosBtn} onClick={handleSOS}>
        <span style={{fontSize:20}}>🆘</span>
        <div>
          <div style={{fontSize:13,fontWeight:600,color:'#e24b4a'}}>{t.sos}</div>
          <div style={{fontSize:11,color:'#8fa3c4'}}>{t.sosSub}</div>
        </div>
        <span style={{color:'#8fa3c4',marginLeft:'auto'}}>›</span>
      </div>
      <WeatherWidget t={t}/>
      <div style={styles.heroBanner}>
        <div style={styles.heroBadge}>✦ Kingdom of Eswatini</div>
        <h2 style={{fontSize:22,fontWeight:700,color:'#f0f4ff',marginBottom:8}}>{t.welcome}</h2>
        <p style={{fontSize:13,color:'#8fa3c4',lineHeight:1.5,marginBottom:14}}>{t.welcomeSub}</p>
        <div style={{display:'flex',gap:10}}>
          {[['120+',t.attractions,'attractions'],['48',t.restaurants,'restaurants'],['35',t.hotels,'hotels']].map(([n,l,sec])=>(
            <div key={l} style={{...styles.hstat,cursor:'pointer',border:activeSection===sec?'1px solid #c9a227':'0.5px solid rgba(201,162,39,0.2)'}} onClick={()=>setActiveSection(sec)}>
              <div style={{fontSize:18,fontWeight:700,color:'#c9a227'}}>{n}</div>
              <div style={{fontSize:10,color: activeSection===sec?'#c9a227':'#8fa3c4',marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <CurrencyConverter t={t}/>
      <div style={styles.aiCard} onClick={()=>setTab('ai')}>
        <div style={{width:48,height:48,borderRadius:12,background:'rgba(83,74,183,0.25)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,flexShrink:0}}>🤖</div>
        <div style={{flex:1}}>

          <div style={{fontSize:14,fontWeight:600,color:'#f0f4ff',marginBottom:3}}>{t.aiTitle}</div>
          <div style={{fontSize:12,color:'#8fa3c4',lineHeight:1.4}}>{t.aiSub}</div>
        </div>
        <span style={{color:'#c9a227',fontSize:20}}>›</span>
      </div>

      {activeSection==='attractions' && (
        <>
          <div style={styles.sectionTitle}>{t.topAttractions}</div>
          <div style={styles.placesGrid}>
            {places.map(p=>(
              <div key={p.name} style={styles.placeCard} onClick={()=>onSelect(p)}>

                <div style={styles.placeImgBox}>
                  <img src={p.img} alt={p.name} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                  <div style={styles.placeCategory}>{p.category}</div>
                </div>
                <div style={{padding:'10px 12px'}}>
                  <div style={{fontSize:13,fontWeight:600,color:'#f0f4ff',marginBottom:3}}>{p.name}</div>
                  <div style={{fontSize:11,color:'#8fa3c4',marginBottom:4}}>📍 {p.region}</div>
                  <div style={{fontSize:10,color:'#6a85a8',lineHeight:1.4,marginBottom:5}}>{p.desc}</div>
                  <div style={{fontSize:11,color:'#c9a227'}}>⭐ {p.rating}</div>
                </div>

              </div>
            ))}
          </div>
        </>
      )}

      {activeSection==='restaurants' && (
        <>
          <div style={styles.sectionTitle}>{t.restaurants}</div>
          {restaurants.map(r=>(
            <div key={r.name} style={{...styles.bizCard,cursor:'pointer'}} onClick={()=>onSelectRestaurant(r)}>
              <div style={{width:50,height:50,borderRadius:12,background:'rgba(29,158,117,0.12)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:26,flexShrink:0}}>{r.icon}</div>
              <div style={{flex:1}}>

                <div style={{fontSize:14,fontWeight:600,color:'#f0f4ff'}}>{r.name}</div>
                <div style={{fontSize:12,color:'#8fa3c4',marginTop:2}}>📍 {r.region}</div>
                <div style={{fontSize:11,color:'#6a85a8',marginTop:3,lineHeight:1.4}}>{r.desc}</div>
              </div>
              <div style={{textAlign:'right',flexShrink:0}}>
                <div style={{fontSize:13,fontWeight:600,color:'#c9a227'}}>⭐ {r.rating}</div>
                <div style={{fontSize:10,color:'#8fa3c4',marginTop:4}}>{r.price}</div>
              </div>
            </div>
          ))}

        </>
      )}

      {activeSection==='hotels' && (
        <>
          <div style={styles.sectionTitle}>{t.hotels}</div>
          {hotels.map(h=>(
            <div key={h.name} style={{...styles.bizCard,cursor:'pointer'}} onClick={()=>onSelectHotel(h)}>
              <div style={{width:50,height:50,borderRadius:12,background:'rgba(201,162,39,0.12)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:26,flexShrink:0}}>{h.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:600,color:'#f0f4ff'}}>{h.name}</div>

                <div style={{fontSize:12,color:'#8fa3c4',marginTop:2}}>📍 {h.region}</div>
                <div style={{fontSize:11,color:'#c9a227',marginTop:3}}>{h.stars}</div>
              </div>
              <div style={{textAlign:'right',flexShrink:0}}>
                <div style={{fontSize:11,color:'#5dcaa5'}}>{h.price}</div>
                <div style={{fontSize:10,color:'#8fa3c4',marginTop:4}}>Tap to book</div>
              </div>
            </div>
          ))}
        </>
      )}

      <div style={styles.sectionTitle}>{t.hiddenGem}</div>
      <div style={{background:'rgba(255,255,255,0.04)',border:'0.5px solid rgba(201,162,39,0.2)',borderRadius:14,overflow:'hidden',marginBottom:16}}>
        <div style={{height:120,background:'linear-gradient(135deg,#1a3a2a,#2d6a4f,#52b788)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:48}}>🌄</div>
        <div style={{padding:14}}>
          <div style={{fontSize:15,fontWeight:700,color:'#f0f4ff',marginBottom:6}}>Malolotja Nature Reserve</div>
          <div style={{fontSize:12,color:'#8fa3c4',lineHeight:1.6,marginBottom:10}}>One of Eswatini's best-kept secrets — ancient mountains, rare orchids, and cable car rides.</div>
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            {['🌿 Nature','📍 Hhohho','🆓 Uncrowded'].map(t2=>(
              <span key={t2} style={styles.tag}>{t2}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── MAP TAB ───────────────────────────────────────────────

function MapTab({t}) {
  const [location,setLocation]   = useState(null);
  const [tracking,setTracking]   = useState(false);
  const [activeRoute,setActiveRoute] = useState(null);
  const [error,setError]         = useState('');

  const startTracking = ()=>{
    if(!navigator.geolocation){setError('GPS not supported on this device.');return;}
    setTracking(true); setError('');
    navigator.geolocation.getCurrentPosition(
      pos=>setLocation({lat:pos.coords.latitude,lng:pos.coords.longitude,acc:Math.round(pos.coords.accuracy)}),
      ()=>setError('Could not get location. Please allow location access.'),

      {enableHighAccuracy:true}
    );
    navigator.geolocation.watchPosition(
      pos=>setLocation({lat:pos.coords.latitude,lng:pos.coords.longitude,acc:Math.round(pos.coords.accuracy)}),
      ()=>{},
      {enableHighAccuracy:true,maximumAge:5000}
    );
  };

  const routes = [
    {name:'🌿 Scenic Route', time:'2h 15m',dist:'87 km',   type:'Recommended',color:'#5dcaa5',desc:'Pass through Ezulwini Valley, Mantenga Falls, and Lobamba. Most beautiful route in Eswatini.',stops:['Mantenga Falls','Lobamba Village','Swazi Candles']},
    {name:'⚡ Fastest Route', time:'1h 20m',dist:'62 km',   type:'Quick',       color:'#c9a227',desc:'Direct highway route. Best for time-sensitive travellers.',stops:['Manzini Highway','Mbabane Bypass']},
    {name:'💰 Budget Route',  time:'2h 45m',dist:'E45 total',type:'Affordable', color:'#534ab7',desc:'Uses public transport (kombi taxis). Cheapest way to explore Eswatini.',stops:['Manzini Bus Rank','Mbabane Market']},
  ];

  return (
    <div>
      <div style={styles.sectionTitle}>{t.navigate}</div>
      {location&&(
        <div style={{background:'rgba(29,158,117,0.12)',border:'0.5px solid rgba(29,158,117,0.3)',borderRadius:12,padding:14,marginBottom:14}}>
          <div style={{fontSize:13,fontWeight:600,color:'#5dcaa5',marginBottom:4}}>📍 Your Live Location</div>
          <div style={{fontSize:12,color:'#8fa3c4'}}>Latitude: {location.lat.toFixed(5)}</div>
          <div style={{fontSize:12,color:'#8fa3c4'}}>Longitude: {location.lng.toFixed(5)}</div>
          <div style={{fontSize:12,color:'#8fa3c4',marginTop:2}}>Accuracy: ±{location.acc}m</div>
          <div style={{fontSize:12,color:'#5dcaa5',marginTop:6}}>🟢 Location updating live</div>
        </div>
      )}

      {error&&<div style={{background:'rgba(226,75,74,0.1)',border:'0.5px solid rgba(226,75,74,0.3)',borderRadius:10,padding:12,marginBottom:12,fontSize:13,color:'#e24b4a'}}>{error}</div>}
      {!tracking&&(
        <button style={{...styles.btnPrimary,marginBottom:14}} onClick={startTracking}>📍 Show My Live Location</button>
      )}
      <div style={{background:'#0d2540',border:'0.5px solid rgba(201,162,39,0.2)',borderRadius:16,height:220,overflow:'hidden',marginBottom:16,position:'relative'}}>
        <svg width="100%" height="100%" viewBox="0 0 340 220" xmlns="http://www.w3.org/2000/svg">

          <rect width="340" height="220" fill="#0d2540"/>
          <rect x="10" y="10" width="320" height="200" rx="10" fill="#0f2a4a" stroke="rgba(201,162,39,0.2)" strokeWidth="0.5"/>
          <line x1="10" y1="73" x2="330" y2="73" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>
          <line x1="10" y1="136" x2="330" y2="136" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>
          <line x1="113" y1="10" x2="113" y2="210" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>
          <line x1="226" y1="10" x2="226" y2="210" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>
          <path d="M40 190 Q100 140 170 110 Q230 85 290 50" stroke="rgba(255,255,255,0.12)" strokeWidth="2" fill="none"/>
          <path d="M60 185 Q120 150 170 110 Q220 75 275 55" stroke="#c9a227" strokeWidth="3" fill="none" strokeDasharray="6,4" opacity="0.9"/>
          <circle cx="60" cy="185" r="7" fill="#e24b4a"/>
          <text x="60" y="189" textAnchor="middle" fill="white" fontSize="8" fontWeight="700">A</text>
          <circle cx="170" cy="110" r="9" fill="#c9a227"/>
          <text x="170" y="114" textAnchor="middle" fill="#0a1628" fontSize="10" fontWeight="700">★</text>
          <circle cx="275" cy="55" r="7" fill="#5dcaa5"/>
          <text x="275" y="59" textAnchor="middle" fill="white" fontSize="8" fontWeight="700">B</text>
          <rect x="110" y="95" width="70" height="16" rx="4" fill="rgba(201,162,39,0.25)" stroke="rgba(201,162,39,0.5)" strokeWidth="0.5"/>
          <text x="145" y="107" textAnchor="middle" fill="#c9a227" fontSize="8">Mantenga Falls</text>
          <rect x="240" y="42" width="58" height="16" rx="4" fill="rgba(93,202,165,0.2)" stroke="rgba(93,202,165,0.4)" strokeWidth="0.5"/>
          <text x="269" y="54" textAnchor="middle" fill="#5dcaa5" fontSize="8">Hlane Reserve</text>
          <rect x="20" y="173" width="56" height="14" rx="4" fill="rgba(226,75,74,0.2)" stroke="rgba(226,75,74,0.4)" strokeWidth="0.5"/>
          <text x="48" y="183" textAnchor="middle" fill="#e24b4a" fontSize="8">{location?'📍 You':'You are here'}</text>
        </svg>
        {location&&(
          <div style={{position:'absolute',bottom:8,right:8,background:'rgba(29,158,117,0.8)',borderRadius:8,padding:'4px 8px',fontSize:10,color:'white'}}>🟢 Live</div>
        )}
      </div>
      <div style={styles.sectionTitle}>Smart Routes</div>
      {routes.map(r=>(
        <div key={r.name}>
          <div style={{background:'rgba(255,255,255,0.05)',border:`0.5px solid ${activeRoute===r.name?r.color:'rgba(201,162,39,0.2)'}`,borderRadius:12,padding:'12px 14px',marginBottom:activeRoute===r.name?0:10,cursor:'pointer',transition:'all 0.2s'}} onClick={()=>setActiveRoute(activeRoute===r.name?null:r.name)}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <div>
                <div style={{fontSize:14,fontWeight:600,color:'#f0f4ff'}}>{r.name}</div>
                <div style={{fontSize:12,color:'#8fa3c4',marginTop:3}}>{r.time} · {r.dist}</div>
              </div>
              <span style={{fontSize:11,padding:'3px 10px',borderRadius:20,border:`0.5px solid ${r.color}`,color:r.color}}>{r.type}</span>

            </div>
          </div>
          {activeRoute===r.name&&(
            <div style={{background:`rgba(255,255,255,0.03)`,border:`0.5px solid ${r.color}`,borderTop:'none',borderRadius:'0 0 12px 12px',padding:14,marginBottom:10}}>
              <div style={{fontSize:13,color:'#b0c4de',lineHeight:1.6,marginBottom:10}}>{r.desc}</div>
              <div style={{fontSize:12,color:'#c9a227',fontWeight:600,marginBottom:6}}>Stops along the way:</div>
              {r.stops.map((s,i)=>(
                <div key={i} style={{display:'flex',gap:8,alignItems:'center',marginBottom:6}}>
                  <div style={{width:6,height:6,borderRadius:'50%',background:r.color,flexShrink:0}}/>
                  <div style={{fontSize:12,color:'#8fa3c4'}}>{s}</div>
                </div>
              ))}
              <button style={{...styles.btnPrimary,marginTop:10}} onClick={()=>window.open(`https://www.google.com/maps/dir/Mbabane+Eswatini/${encodeURIComponent(r.stops[r.stops.length-1])}+Eswatini`,'_blank')}>🗺️ Open in Google Maps</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}


// ── AI TAB ────────────────────────────────────────────────
function AITab({t}) {
  const [messages,setMessages] = useState([
    {role:'ai',text:"Sawubona! 👋 I'm Vaka, your Incaba AI Guide for Eswatini.\n\nI can help you with:\n• 🗓 Trip planning\n• 🦁 Wildlife & nature\n• 🍽 Food & restaurants\n• 🎭 Culture & festivals\n• 💱 Currency & weather\n• 🆘 Emergency help\n\nWhat would you like to know?"}
  ]);
  const [input,setInput]   = useState('');
  const [typing,setTyping] = useState(false);
  const chatRef = useRef(null);

  useEffect(()=>{

    if(chatRef.current) chatRef.current.scrollTop=chatRef.current.scrollHeight;
  },[messages,typing]);

  const getReply = msg=>{
    const m=msg.toLowerCase();
    if(m.includes('hello')||m.includes('hi')||m.includes('hey')) return "Hello there! 👋 Great to hear from you! How can I help you explore the beautiful Kingdom of Eswatini today? 🇸🇿";
    if(m.includes('thank')||m.includes('thanks')||m.includes('ngiyabonga')) return "You are very welcome! 😊 It is my pleasure to help you discover the beauty of Eswatini. Is there anything else you would like to know? 🇸🇿💎";
    if(m.includes('goodbye')||m.includes('bye')) return "Goodbye! 👋 Sala kahle — stay well in siSwati! I hope you have an amazing time exploring the Kingdom of Eswatini. Come back anytime! 💎🇸🇿";
    if(m.includes('how are you')) return "I am doing wonderfully, thank you for asking! 😊 I am always happy when I get to talk about the beautiful Kingdom of Eswatini. How can I help you today?";
    if(m.includes('who are you')||m.includes('what are you')) return "I am Vaka — your AI-powered travel guide built specifically for Eswatini! 🤖\n\nI was created to help tourists discover:\n• Hidden gems across all 4 regions\n• Best places to eat and stay\n• Cultural traditions and festivals\n• Emergency support and safety\n\nI am part of the Incaba Smart Tourism Platform. 💎";
    if(m.includes('trip')||m.includes('plan')||m.includes('itinerary')) return "Here is your perfect 2-day Eswatini adventure! 🗓\n\nDay 1 — Wildlife & Nature\n• 6am: Sunrise at Sibebe Rock\n• 9am: Hlane Royal Reserve (lions, elephants, rhinos!)\n• 1pm: Lunch at Malandela's Restaurant\n• 3pm: Mantenga Falls (95m waterfall)\n• 6pm: Sunset at Lobamba Village\n\nDay 2 — Culture & Craft\n• 8am: Lobamba National Museum\n• 11am: Swazi Candles Market\n• 2pm: Malolotja Nature Reserve\n• 5pm: Traditional Swazi dinner\n\n💰 Estimated cost: E350–500 total\n🏨 Recommended stay: Mantengha Cultural Village";
    if(m.includes('waterfall')||m.includes('falls')) return "🌊 Best waterfalls in Eswatini:\n\n1. Mantenga Falls — 95m drop, most accessible, Ezulwini Valley\n2. Phophonyane Falls — pristine wilderness, great for hiking\n3. Maguga Dam area — scenic waterfall views\n4. Mlilwane Wildlife Falls — inside the sanctuary\n\nBest time to visit: After the rainy season (Nov–Mar) for maximum flow!\n\nTap Navigate to get directions to any of these. 🗺️";
    if(m.includes('food')||m.includes('eat')||m.includes('restaurant')) return "🍽 Must-try Swazi foods:\n\n• Sishwala — thick maize porridge (national staple)\n• Umncweba — dried Swazi meat, like biltong\n• Emasi — soured milk served with rice\n• Tjwala — traditional fermented Swazi beer\n• Sidvudvu — pumpkin porridge\n\n🏆 Top restaurants:\n1. Malandela's — traditional cuisine in Malkerns\n2. Tum's George Hotel — fine dining in Mbabane\n3. Foresters Arms — country pub in Malkerns\n\nTap Restaurants on the home screen to book! 🍴";
    if(m.includes('culture')||m.includes('festival')||m.includes('ceremony')) return "🎭 Swazi Culture & Festivals:\n\n🌿 Incwala Ceremony (Dec–Jan)\nThe most sacred Swazi ritual. Celebrates the king, first fruits, and national unity. Tourists can observe from designated areas.\n\n🌾 Umhlanga Reed Dance (Aug–Sep)\nThousands of maidens dance for the Queen Mother. One of Africa's most spectacular cultural events!\n\n🍺 Marula Festival (Feb)\nCelebrate the marula fruit harvest with traditional music, dance and Swazi beer.\n\n🇸🇿 siSwati phrases:\n• Hello: Sawubona\n• Thank you: Ngiyabonga\n• How are you: Unjani?\n• Stay well: Sala kahle";
    if(m.includes('emergency')||m.includes('sos')||m.includes('help')||m.includes('danger')) return "🆘 EMERGENCY CONTACTS ESWATINI:\n\n• Police: 999\n• Ambulance: 977\n• Fire Brigade: 933\n• Tourist Emergency: +268 2404 2531\n• Mbabane Hospital: +268 2404 2111\n\nTap the red SOS button at the top of the home screen to call emergency services immediately and share your location.\n\nStay calm — help is available 24/7. 🙏";
    if(m.includes('currency')||m.includes('money')||m.includes('lilangeni')||m.includes('szl')) return "💱 Currency Exchange Rates:\n\n• E 1 SZL = $0.054 USD\n• E 1 SZL = R 1.00 ZAR\n• E 1 SZL = €0.050 EUR\n• E 1 SZL = £0.043 GBP\n• E 1 SZL = P 0.73 BWP\n\nThe Lilangeni (SZL) is equal in value to the South African Rand.\n\nUse the Currency Converter on the home screen for instant calculations! 💰";
    if(m.includes('weather')) return "🌤️ Today's Weather in Eswatini:\n\n• Mbabane (capital): 22°C — Partly Cloudy ⛅\n  Humidity: 65% | Wind: 12 km/h\n\n• Manzini (city): 26°C — Sunny ☀️\n  Humidity: 45% | Wind: 8 km/h\n\n• Lubombo (east): 29°C — Clear 🌤️\n  Humidity: 38% | Wind: 15 km/h\n\nGreat day to visit attractions! Tap the weather cards on the home screen for more details.";
    if(m.includes('hotel')||m.includes('stay')||m.includes('accommodation')) return "🏨 Top Hotels in Eswatini:\n\n1. Royal Swazi Spa & Hotel ★★★★★\n   Ezulwini Valley | From E 1,800/night\n   Luxury spa, casino and golf course\n\n2. Mantengha Cultural Village ★★★★\n   Ezulwini | From E 600/night\n   Authentic Swazi cultural experience\n\n3. Foresters Arms ★★★★\n   Malkerns | From E 800/night\n   Charming countryside hotel\n\n4. Lidwala Backpacker ★★★\n   Mbabane | From E 150/night\n   Budget-friendly with stunning views\n\nTap Hotels on the home screen to book! 🛏️";
    if(m.includes('wildlife')||m.includes('animal')||m.includes('safari')) return "🦁 Wildlife in Eswatini:\n\nHlane Royal Reserve:\n• Lions, elephants, white rhinos\n• Giraffes, zebras, hippos\n• 300+ bird species\n\nMlilwane Wildlife Sanctuary:\n• Hippos, warthogs, zebras\n• Great for cycling safaris\n• No dangerous game — family friendly\n\nMkhaya Game Reserve:\n• Black & white rhinos\n• Elephants, buffalos, leopards\n• Exclusive walking safaris\n\n🎯 Best for first-timers: Hlane Royal Reserve\n💰 Most affordable: Mlilwane Sanctuary";
    if(m.includes('transport')||m.includes('taxi')||m.includes('bus')||m.includes('travel')) return "🚌 Getting Around Eswatini:\n\nKombi Taxis (most popular):\n• Cheapest option: E 8–25 per trip\n• Connect all major towns\n• Available from early morning\n\nPrivate Taxis:\n• More comfortable: E 50–200\n• Available in Mbabane and Manzini\n\nCar Rental:\n• From E 350/day\n• Best for exploring remote areas\n• Available at King Mswati III Airport\n\nRoad Conditions:\n• Main roads are excellent\n• Some rural roads require 4x4";
    return `That is a great question! 🇸🇿\n\nI am still learning more about "${msg}" in Eswatini. Here is what I can help you with right now:\n\n• 🗓 "Plan me a 2-day trip"\n• 🦁 "Tell me about wildlife"\n• 🍽 "What food should I try?"\n• 🎭 "Tell me about Swazi culture"\n• 🌤️ "What is the weather today?"\n• 💱 "Currency rates"\n• 🏨 "Best hotels"\n• 🆘 "Emergency help"\n\nJust ask and I will guide you! 💎`;
  };


  const send = ()=>{
    if(!input.trim()) return;
    const userMsg = input;
    setMessages(prev=>[...prev,{role:'user',text:userMsg}]);
    setInput('');
    setTyping(true);
    setTimeout(()=>{
      setTyping(false);
      setMessages(prev=>[...prev,{role:'ai',text:getReply(userMsg)}]);
    },800);
  };

  return (
    <div style={{display:'flex',flexDirection:'column',height:'75vh'}}>
      <div style={{textAlign:'center',padding:'12px 0 8px'}}>
        <div style={{fontSize:40}}>🤖</div>
        <div style={{fontSize:17,fontWeight:700,color:'#f0f4ff'}}>{t.aiTitle}</div>
        <div style={{fontSize:11,color:'#8fa3c4'}}>{t.aiSub}</div>
      </div>
      <div ref={chatRef} style={{flex:1,overflowY:'auto',paddingBottom:12}}>
        {messages.map((m,i)=>(
          <div key={i} style={m.role==='ai'?styles.bubbleAI:styles.bubbleUser}>{m.text}</div>
        ))}
        {typing&&(
          <div style={{...styles.bubbleAI,display:'flex',gap:4,alignItems:'center',padding:'14px 16px'}}>

            <div style={{width:6,height:6,borderRadius:'50%',background:'#8fa3c4',animation:'pulse 1s infinite'}}/>
            <div style={{width:6,height:6,borderRadius:'50%',background:'#8fa3c4',animation:'pulse 1s infinite 0.2s'}}/>
            <div style={{width:6,height:6,borderRadius:'50%',background:'#8fa3c4',animation:'pulse 1s infinite 0.4s'}}/>
          </div>
        )}
      </div>
      <div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:10}}>
        {['Plan my trip','Wildlife','Local food','Culture','Weather','Currency','Hotels','Emergency'].map(s=>(

          <button key={s} style={styles.pill} onClick={()=>{setMessages(prev=>[...prev,{role:'user',text:s}]);setTyping(true);setTimeout(()=>{setTyping(false);setMessages(prev=>[...prev,{role:'ai',text:getReply(s)}]);},800);}}>{s}</button>
        ))}
      </div>
      <div style={{display:'flex',gap:8,paddingTop:6}}>
        <input style={styles.chatInput} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Ask anything about Eswatini..."/>
        <button style={styles.sendBtn} onClick={send}>➤</button>
      </div>
    </div>

  );
}

// ── DASHBOARD TAB ─────────────────────────────────────────
function DashTab({t}) {
  const bars=[45,62,55,78,100,88,70];
  const days=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  return (
    <div>
      <div style={styles.sectionTitle}>Admin Dashboard</div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:12}}>
        {[
          {val:'12,847',label:'Active Tourists',  delta:'↑ 23% this month'},

          {val:'E 4.2M', label:'Revenue Generated',delta:'↑ 18% this month'},
          {val:'89',     label:'Businesses Listed',delta:'↑ 12 new this week'},
          {val:'4.8★',   label:'App Rating',       delta:'↑ 0.2 points'},
        ].map(m=>(
          <div key={m.label} style={{background:'rgba(255,255,255,0.05)',border:'0.5px solid rgba(201,162,39,0.2)',borderRadius:12,padding:14}}>
            <div style={{fontSize:22,fontWeight:700,color:'#c9a227'}}>{m.val}</div>
            <div style={{fontSize:11,color:'#8fa3c4',marginTop:2}}>{m.label}</div>
            <div style={{fontSize:11,color:'#5dcaa5',marginTop:4}}>{m.delta}</div>

          </div>
        ))}
      </div>
      <div style={{background:'rgba(255,255,255,0.05)',border:'0.5px solid rgba(201,162,39,0.2)',borderRadius:14,padding:14,marginBottom:12}}>
        <div style={{fontSize:14,fontWeight:600,color:'#f0f4ff',marginBottom:4}}>Visitor Traffic — This Week</div>
        <div style={{fontSize:11,color:'#8fa3c4',marginBottom:12}}>Daily unique app sessions</div>
        <div style={{display:'flex',alignItems:'flex-end',gap:8,height:90}}>
          {bars.map((h,i)=>(
            <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
              <div style={{width:'100%',borderRadius:'4px 4px 0 0',height:`${h}%`,background:h===100?'linear-gradient(0deg,#c9a227,#e8b93a)':'rgba(201,162,39,0.25)'}}/>
              <span style={{fontSize:9,color:'#8fa3c4'}}>{days[i]}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{background:'rgba(255,255,255,0.05)',border:'0.5px solid rgba(201,162,39,0.2)',borderRadius:14,padding:14}}>
        <div style={{fontSize:14,fontWeight:600,color:'#f0f4ff',marginBottom:10}}>Recent Activity</div>
        {[
          {color:'#5dcaa5',text:'New business registered: Royal Swazi Hotel',time:'5 min ago'},
          {color:'#c9a227',text:'Tourist reviewed Hlane Reserve — 5 stars',time:'12 min ago'},
          {color:'#534ab7',text:'New attraction added: Phophonyane Falls',time:'1 hour ago'},
          {color:'#e24b4a',text:'SOS resolved — tourist assisted in Lubombo',time:'2 hours ago'},
        ].map((a,i,arr)=>(
          <div key={i} style={{display:'flex',gap:10,padding:'10px 0',borderBottom:i<arr.length-1?'0.5px solid rgba(255,255,255,0.05)':'none'}}>
            <div style={{width:8,height:8,borderRadius:'50%',background:a.color,flexShrink:0,marginTop:4}}/>
            <div>
              <div style={{fontSize:13,color:'#f0f4ff'}}>{a.text}</div>
              <div style={{fontSize:11,color:'#8fa3c4',marginTop:2}}>{a.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── BUSINESS TAB ──────────────────────────────────────────

function BusinessTab({t}) {
  const [showForm,setShowForm] = useState(false);
  const [submitted,setSubmitted] = useState(false);
  const [form,setForm] = useState({name:'',type:'Hotel',region:'',phone:'',email:'',desc:''});
  const [businesses,setBusinesses] = useState([
    {name:'Royal Swazi Hotel',      type:'Hotel',   region:'Ezulwini Valley', icon:'🏨', views:'1,240', verified:true},
    {name:"Malandela's Restaurant", type:'Food',    region:'Malkerns',        icon:'🍴', views:'876',   verified:true},
    {name:'Swazi Candles Market',   type:'Craft',   region:'Malkerns',        icon:'🎨', views:'654',   verified:true},
  ]);
  const [selectedBiz,setSelectedBiz] = useState(null);

  const submit = ()=>{
    if(!form.name||!form.phone||!form.email) return alert('Please fill in all required fields');
    setBusinesses(prev=>[...prev,{name:form.name,type:form.type,region:form.region,icon:'🏢',views:'0',verified:false}]);
    setSubmitted(true); setShowForm(false);
    setForm({name:'',type:'Hotel',region:'',phone:'',email:'',desc:''});
  };

  if(selectedBiz) return (
    <div style={styles.app}>
      <div style={{background:'rgba(201,162,39,0.1)',height:160,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,position:'relative',borderBottom:'0.5px solid rgba(201,162,39,0.25)'}}>
        <div style={{fontSize:64}}>{selectedBiz.icon}</div>
        <button onClick={()=>setSelectedBiz(null)} style={{position:'absolute',top:16,left:16,background:'rgba(10,22,40,0.7)',border:'0.5px solid rgba(255,255,255,0.2)',borderRadius:50,padding:'8px 14px',color:'#f0f4ff',fontSize:13,cursor:'pointer'}}>← Back</button>
      </div>
      <div style={{flex:1,overflowY:'auto',padding:16}}>
        <h2 style={{fontSize:22,fontWeight:700,color:'#f0f4ff',marginBottom:4}}>{selectedBiz.name}</h2>
        <div style={{fontSize:13,color:'#8fa3c4',marginBottom:6}}>📍 {selectedBiz.region}</div>
        <div style={{display:'flex',gap:8,marginBottom:14}}>
          <span style={styles.tag}>{selectedBiz.type}</span>
          {selectedBiz.verified&&<span style={{...styles.tag,color:'#5dcaa5',borderColor:'rgba(29,158,117,0.3)'}}>✓ Verified</span>}
        </div>
        <div style={{background:'rgba(255,255,255,0.05)',border:'0.5px solid rgba(201,162,39,0.2)',borderRadius:12,padding:14,marginBottom:14}}>
          <div style={{fontSize:13,fontWeight:600,color:'#c9a227',marginBottom:8}}>Business Stats</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
            <div style={{textAlign:'center'}}>
              <div style={{fontSize:22,fontWeight:700,color:'#c9a227'}}>{selectedBiz.views}</div>
              <div style={{fontSize:11,color:'#8fa3c4'}}>Views this week</div>
            </div>
            <div style={{textAlign:'center'}}>
              <div style={{fontSize:22,fontWeight:700,color:'#5dcaa5'}}>4.7★</div>
              <div style={{fontSize:11,color:'#8fa3c4'}}>Average rating</div>
            </div>

          </div>
        </div>
        <ReviewsSection placeName={selectedBiz.name} t={t}/>
        <button style={{...styles.btnPrimary,marginBottom:12}} onClick={()=>window.open(`https://www.google.com/maps/search/${encodeURIComponent(selectedBiz.name)}+Eswatini`,'_blank')}>🗺️ Get Directions</button>
      </div>
    </div>
  );

  return (
    <div>
      {submitted&&(
        <div style={{background:'rgba(29,158,117,0.12)',border:'0.5px solid rgba(29,158,117,0.3)',borderRadius:12,padding:14,marginBottom:14}}>
          <div style={{fontSize:14,fontWeight:600,color:'#5dcaa5',marginBottom:4}}>✅ Application Submitted!</div>
          <div style={{fontSize:12,color:'#8fa3c4'}}>Your business has been submitted for review. We will contact you within 24 hours to verify and activate your listing.</div>
        </div>
      )}
      <div style={{background:'rgba(29,158,117,0.1)',border:'0.5px solid rgba(29,158,117,0.3)',borderRadius:16,padding:20,marginBottom:14}}>
        <div style={{fontSize:11,color:'#5dcaa5',fontWeight:600,letterSpacing:1,marginBottom:6}}>BUSINESS PORTAL</div>
        <div style={{fontSize:20,fontWeight:700,color:'#f0f4ff',marginBottom:6}}>Grow With Tourism 🌱</div>
        <div style={{fontSize:13,color:'#8fa3c4',lineHeight:1.6}}>List your business, reach thousands of tourists, and track your impact.</div>
        <button style={{...styles.btnPrimary,marginTop:14,padding:'11px 24px',fontSize:14}} onClick={()=>setShowForm(!showForm)}>
          {showForm?'✕ Cancel':'+ Register Your Business'}
        </button>
      </div>

      {showForm&&(
        <div style={{background:'rgba(255,255,255,0.04)',border:'0.5px solid rgba(201,162,39,0.25)',borderRadius:14,padding:16,marginBottom:14}}>
          <div style={{fontSize:15,fontWeight:600,color:'#c9a227',marginBottom:14}}>📝 Business Registration</div>
          {[
            {label:'Business Name *',key:'name',    type:'text',  ph:'e.g. My Eswatini Lodge'},
            {label:'Phone Number *', key:'phone',   type:'tel',   ph:'e.g. +268 2XXX XXXX'},
            {label:'Email Address *',key:'email',   type:'email', ph:'e.g. info@mybusiness.com'},
            {label:'Region / Area',  key:'region',  type:'text',  ph:'e.g. Ezulwini Valley'},
            {label:'Description',    key:'desc',    type:'text',  ph:'Tell tourists about your business'},

          ].map(f=>(
            <div key={f.key} style={{marginBottom:12}}>
              <div style={{fontSize:12,color:'#8fa3c4',marginBottom:6}}>{f.label}</div>
              <input type={f.type} value={form[f.key]} onChange={e=>setForm(prev=>({...prev,[f.key]:e.target.value}))} placeholder={f.ph} style={{width:'100%',background:'rgba(255,255,255,0.06)',border:'0.5px solid rgba(201,162,39,0.3)',borderRadius:10,padding:'10px 14px',color:'#f0f4ff',fontSize:13,outline:'none',boxSizing:'border-box'}}/>
            </div>
          ))}
          <div style={{marginBottom:12}}>
            <div style={{fontSize:12,color:'#8fa3c4',marginBottom:6}}>Business Type</div>
            <select value={form.type} onChange={e=>setForm(prev=>({...prev,type:e.target.value}))} style={{width:'100%',background:'#0f2040',border:'0.5px solid rgba(201,162,39,0.3)',borderRadius:10,padding:'10px 14px',color:'#c9a227',fontSize:13,outline:'none',cursor:'pointer'}}>
              {['Hotel','Restaurant','Craft Market','Tour Operator','Activity','Transport','Other'].map(o=><option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <button style={{...styles.btnPrimary}} onClick={submit}>Submit Registration</button>
        </div>
      )}


      <div style={styles.sectionTitle}>Active Businesses</div>
      {businesses.map(b=>(
        <div key={b.name} style={{...styles.bizCard,cursor:'pointer'}} onClick={()=>setSelectedBiz(b)}>
          <div style={{width:46,height:46,borderRadius:12,background:'rgba(201,162,39,0.12)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,flexShrink:0}}>{b.icon}</div>
          <div style={{flex:1}}>
            <div style={{fontSize:14,fontWeight:600,color:'#f0f4ff'}}>{b.name}</div>
            <div style={{fontSize:12,color:'#8fa3c4',marginTop:2}}>{b.type} · {b.region}</div>
            {b.verified&&<span style={{fontSize:10,padding:'2px 8px',borderRadius:6,background:'rgba(29,158,117,0.15)',color:'#5dcaa5',border:'0.5px solid rgba(29,158,117,0.3)',marginTop:4,display:'inline-block'}}>✓ Verified</span>}
          </div>
          <div style={{textAlign:'right',flexShrink:0}}>
            <div style={{fontSize:13,fontWeight:600,color:'#c9a227'}}>{b.views}</div>
            <div style={{fontSize:10,color:'#8fa3c4'}}>views/week</div>
            <div style={{fontSize:10,color:'#c9a227',marginTop:4}}>Tap to view →</div>
          </div>
        </div>
      ))}

    </div>
  );
}

const styles = {
  splash:{minHeight:'100vh',background:'linear-gradient(160deg,#0a1628 0%,#0d1f3c 40%,#0a1628 100%)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:'2rem',position:'relative',overflow:'hidden'},
  splashGlow:{position:'absolute',top:'20%',left:'50%',transform:'translateX(-50%)',width:300,height:300,background:'radial-gradient(circle,rgba(201,162,39,0.1) 0%,transparent 70%)',borderRadius:'50%',pointerEvents:'none'},

  splashTitle:{fontSize:48,fontWeight:700,color:'#f0f4ff',margin:'0 0 6px',letterSpacing:-1},
  gold:{color:'#c9a227'},
  btnPrimary:{background:'linear-gradient(135deg,#c9a227,#e8b93a)',color:'#0a1628',border:'none',padding:'14px 40px',borderRadius:50,fontSize:16,fontWeight:700,cursor:'pointer',width:'100%',maxWidth:480},
  app:{minHeight:'100vh',background:'#0a1628',display:'flex',flexDirection:'column',maxWidth:480,margin:'0 auto'},
  topbar:{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 20px',borderBottom:'0.5px solid rgba(201,162,39,0.25)',background:'rgba(10,22,40,0.98)',position:'sticky',top:0,zIndex:100},

  langBtn:{fontSize:11,padding:'3px 8px',borderRadius:6,border:'0.5px solid rgba(201,162,39,0.3)',color:'#8fa3c4',cursor:'pointer',background:'transparent'},
  langBtnActive:{color:'#c9a227',background:'rgba(201,162,39,0.15)'},
  content:{flex:1,overflowY:'auto',padding:16},
  bottomNav:{display:'flex',justifyContent:'space-around',padding:'10px 0 16px',borderTop:'0.5px solid rgba(201,162,39,0.25)',background:'rgba(10,22,40,0.98)',position:'sticky',bottom:0},
  navItem:{display:'flex',flexDirection:'column',alignItems:'center',gap:3,cursor:'pointer',padding:'4px 8px',borderRadius:12},
  navActive:{display:'flex',flexDirection:'column',alignItems:'center',gap:3,cursor:'pointer',padding:'4px 8px',borderRadius:12,background:'rgba(201,162,39,0.1)'},
  sosBtn:{display:'flex',alignItems:'center',gap:10,background:'rgba(226,75,74,0.1)',border:'1px solid rgba(226,75,74,0.3)',borderRadius:12,padding:'12px 14px',marginBottom:14,cursor:'pointer'},
  heroBanner:{background:'linear-gradient(135deg,#1a3a5c,#0d2540)',border:'0.5px solid rgba(201,162,39,0.25)',borderRadius:16,padding:20,marginBottom:14},
  heroBadge:{fontSize:11,color:'#f5d87a',background:'rgba(201,162,39,0.15)',border:'0.5px solid rgba(201,162,39,0.4)',padding:'4px 10px',borderRadius:20,display:'inline-block',marginBottom:10,fontWeight:600},
  hstat:{flex:1,background:'rgba(201,162,39,0.08)',border:'0.5px solid rgba(201,162,39,0.2)',borderRadius:10,padding:10,textAlign:'center'},
  aiCard:{background:'rgba(83,74,183,0.15)',border:'0.5px solid rgba(131,122,221,0.35)',borderRadius:14,padding:'14px 16px',marginBottom:16,display:'flex',alignItems:'center',gap:12,cursor:'pointer'},
  sectionTitle:{fontSize:16,fontWeight:600,color:'#f0f4ff',marginBottom:12,marginTop:4},
  placesGrid:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:16},
  placeCard:{background:'rgba(255,255,255,0.05)',border:'0.5px solid rgba(201,162,39,0.2)',borderRadius:14,overflow:'hidden',cursor:'pointer'},
  placeImgBox:{height:110,overflow:'hidden',position:'relative'},
  placeCategory:{position:'absolute',top:8,right:8,fontSize:9,fontWeight:700,background:'rgba(201,162,39,0.9)',color:'#0a1628',padding:'2px 7px',borderRadius:6},
  tag:{fontSize:11,padding:'3px 8px',borderRadius:20,border:'0.5px solid rgba(201,162,39,0.3)',color:'#c9a227',background:'rgba(201,162,39,0.08)'},
  infoBadge:{fontSize:11,padding:'5px 10px',borderRadius:20,border:'0.5px solid rgba(201,162,39,0.3)',color:'#c9a227',background:'rgba(201,162,39,0.08)'},
  bizCard:{background:'rgba(255,255,255,0.05)',border:'0.5px solid rgba(201,162,39,0.2)',borderRadius:14,padding:'12px 14px',marginBottom:10,display:'flex',alignItems:'center',gap:12},
  bubbleAI:{background:'rgba(83,74,183,0.15)',border:'0.5px solid rgba(131,122,221,0.25)',borderRadius:14,padding:'12px 14px',marginBottom:10,fontSize:13,color:'#f0f4ff',lineHeight:1.7,whiteSpace:'pre-line',maxWidth:'85%'},
  bubbleUser:{background:'rgba(201,162,39,0.12)',border:'0.5px solid rgba(201,162,39,0.3)',borderRadius:14,padding:'12px 14px',marginBottom:10,fontSize:13,color:'#f0f4ff',lineHeight:1.7,whiteSpace:'pre-line',maxWidth:'85%',marginLeft:'auto'},

  chatInput:{flex:1,background:'rgba(255,255,255,0.06)',border:'0.5px solid rgba(201,162,39,0.25)',borderRadius:24,padding:'11px 16px',color:'#f0f4ff',fontSize:14,outline:'none',fontFamily:'inherit'},
  sendBtn:{width:44,height:44,borderRadius:'50%',background:'linear-gradient(135deg,#c9a227,#e8b93a)',border:'none',cursor:'pointer',fontSize:16,color:'#0a1628',fontWeight:700,flexShrink:0},
  pill:{padding:'6px 12px',borderRadius:50,border:'0.5px solid rgba(201,162,39,0.25)',fontSize:11,cursor:'pointer',background:'rgba(255,255,255,0.04)',color:'#f0f4ff',fontFamily:'inherit'},
};

export default App;
