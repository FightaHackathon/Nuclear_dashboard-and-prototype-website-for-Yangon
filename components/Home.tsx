import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Link } from 'react-router-dom';
import * as L from 'leaflet';
import { Layers, Map as MapIcon, ArrowRight, Zap, ShieldCheck, Activity, Box } from 'lucide-react';
import { Language } from '../types';

// Fix Leaflet icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom Pulsing Red Dot Icon
const pulsingIcon = L.divIcon({
  className: 'css-icon',
  html: `
    <div class="relative flex items-center justify-center w-6 h-6">
      <div class="absolute w-full h-full bg-red-500 rounded-full animate-ping opacity-75"></div>
      <div class="relative w-3 h-3 bg-red-600 rounded-full border-2 border-white shadow-lg"></div>
    </div>
  `,
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

// Map Resize Fixer
const FixMapResize = () => {
  const map = useMap();
  useEffect(() => {
    // Only proceed if map and container are available
    if (!map || !map.getContainer()) return;

    const timer = setTimeout(() => {
      try {
        // Double check existence inside timeout before execution and ensure it is connected to DOM
        if (map && map.getContainer() && map.getContainer().isConnected) {
             map.invalidateSize();
        }
      } catch (err) {
        // Silent catch to prevent production crashes for resize race conditions
        console.warn('Map resize error suppressed:', err);
      }
    }, 200); 

    return () => clearTimeout(timer);
  }, [map]);
  return null;
};

interface HomeProps {
  lang: Language;
}

const Home: React.FC<HomeProps> = ({ lang }) => {
  const targetLocation: [number, number] = [17.426344680058794, 96.92981600709426];

  const content = {
    en: {
      badge: "Yangon Energy Solution",
      title: "SMR Nexus Powering Yangon",
      subtitle: "A 4D Proposal to resolve Yangon's energy crisis using Small Modular Reactors.",
      liveProject: "Live Project",
      techFocus: "Technology Focus",
      smrTitle: "Small Modular Reactor",
      smrDesc: "SMRs are compact nuclear reactors that can supply reliable electricity to Myanmar’s remote and developing areas. By integrating spatial placement, electricity can be contributed to industrial zones like Hlaing Tharyar and business cities like Yangon, minimizing transmission losses and ensuring 24/7 uptime.",
      output: "Output Capacity",
      carbon: "Carbon Emissions",
      whyTitle: "Why we chose",
      locationName: "Mayanchaung",
      whySubtitle: "Strategic location analysis for maximum safety and efficiency.",
      cards: {
        safety: {
          title: "Infrastructure Safety",
          desc: "Located 82 miles from Hlawcar Power Station, ensuring safe distance from major power infrastructure while maintaining grid connectivity."
        },
        water: {
          title: "Water Resources",
          desc: "Situated 5 miles from the Sittaung River, providing critical proximity to a natural water source for cooling systems."
        },
        logistics: {
          title: "Logistics Access",
          desc: "Just 5 miles from the Sittaung Bridge, offering convenient access to major transportation routes for construction and maintenance."
        },
        flood: {
          title: "Flood Mitigation",
          desc: "Site elevation of 10 meters above sea level drastically reduces risks from seasonal flooding events."
        },
        coastal: {
          title: "Coastal Safety",
          desc: "Located 18 miles from the Bay, balancing environmental safety with coastal accessibility for heavy equipment."
        }
      },
      prototype: {
        title: "Prototype Model for SMR Hall",
        desc: "Explore the internal structure and components.",
        button: "View 3D Model"
      },
      map: {
        location: "Site Location",
        title: "Interactive Map",
        desc: "Visualizing the Mayanchaung SMR Site",
        status: "Planned",
        popupTitle: "SMR Unit 1"
      }
    },
    my: {
      badge: "ရန်ကုန် စွမ်းအင် ဖြေရှင်းချက်",
      title: "SMR Nexus: ရန်ကုန် စွမ်းအင် အဖြေ",
      subtitle: "ရန်ကုန်မြို့၏ လျှပ်စစ်ပြဿနာကို ဖြေရှင်းရန် အသေးစား မော်ဂျူး ဓာတ်ပေါင်းဖိုများ အသုံးပြုမည့် 4D အဆိုပြုချက်။",
      liveProject: "လက်ရှိ စီမံကိန်း",
      techFocus: "နည်းပညာ ဦးစားပေး",
      smrTitle: "အသေးစား မော်ဂျူး ဓာတ်ပေါင်းဖို (SMR)",
      smrDesc: "SMR များသည် မြန်မာနိုင်ငံ၏ ဝေးလံခေါင်သီပြီး ဖွံ့ဖြိုးဆဲဒေသများသို့ စိတ်ချရသော လျှပ်စစ်ဓာတ်အား ပေးစွမ်းနိုင်သည့် ကျစ်လစ်သော နျူကလီးယား ဓာတ်ပေါင်းဖိုများဖြစ်သည်။ လှိုင်သာယာကဲ့သို့သော စက်မှုဇုန်များနှင့် ရန်ကုန်ကဲ့သို့သော စီးပွားရေးမြို့တော်များသို့ လျှပ်စစ်ဓာတ်အား ဖြန့်ဖြူးပေးနိုင်ရန် မဟာဗျူဟာကျကျ တည်ဆောက်ခြင်းဖြင့် ဓာတ်အားဆုံးရှုံးမှုကို လျှော့ချပြီး ၂၄ နာရီ လည်ပတ်မှုကို အာမခံသည်။",
      output: "ထုတ်လုပ်မှု ပမာဏ",
      carbon: "ကာဗွန် ထုတ်လွှတ်မှု",
      whyTitle: "အဘယ်ကြောင့်",
      locationName: "မရမ်းချောင်",
      whySubtitle: "ကို ရွေးချယ်သနည်း - ဘေးကင်းလုံခြုံမှုနှင့် စွမ်းဆောင်ရည်အတွက် မဟာဗျူဟာမြောက် တည်နေရာ ဆန်းစစ်ချက်။",
      cards: {
        safety: {
          title: "အခြေခံအဆောက်အအုံ ဘေးကင်းရေး",
          desc: "လှော်ကား ဓာတ်အားပေးစက်ရုံမှ ၈၂ မိုင် ကွာဝေးသောကြောင့် အဓိက ဓာတ်အား အဆောက်အအုံများနှင့် ဘေးကင်းသော အကွာအဝေးရှိပြီး ဓာတ်အားလိုင်း ချိတ်ဆက်မှုကိုလည်း ထိန်းသိမ်းထားသည်။"
        },
        water: {
          title: "ရေအရင်းအမြစ်",
          desc: "စစ်တောင်းမြစ်မှ ၅ မိုင်သာ ကွာဝေးသဖြင့် အအေးပေးစနစ်များအတွက် လိုအပ်သော သဘာဝ ရေအရင်းအမြစ်နှင့် နီးကပ်စွာ တည်ရှိသည်။"
        },
        logistics: {
          title: "သယ်ယူပို့ဆောင်ရေး လမ်းကြောင်း",
          desc: "စစ်တောင်းတံတားမှ ၅ မိုင်သာ ဝေးသဖြင့် တည်ဆောက်ရေးနှင့် ပြုပြင်ထိန်းသိမ်းရေး လုပ်ငန်းများအတွက် အဓိက လမ်းကြောင်းများကို အလွယ်တကူ အသုံးပြုနိုင်သည်။"
        },
        flood: {
          title: "ရေဘေး ကာကွယ်ရေး",
          desc: "ပင်လယ်ရေမျက်နှာပြင်အထက် ၁၀ မီတာ အမြင့်တွင် ရှိသဖြင့် ရာသီအလိုက် ရေကြီးမှု အန္တရာယ်များကို သိသိသာသာ လျှော့ချပေးသည်။"
        },
        coastal: {
          title: "ကမ်းရိုးတန်း ဘေးကင်းရေး",
          desc: "ပင်လယ်ကွေ့မှ ၁၈ မိုင် ကွာဝေးသဖြင့် သဘာဝပတ်ဝန်းကျင် ဘေးကင်းရေးနှင့် စက်ယန္တရားကြီးများ သယ်ယူပို့ဆောင်ရေးအတွက် မျှတသော တည်နေရာဖြစ်သည်။"
        }
      },
      prototype: {
        title: "SMR ခန်းမ ပုံစံငယ်",
        desc: "အတွင်းပိုင်း ဖွဲ့စည်းပုံနှင့် အစိတ်အပိုင်းများကို လေ့လာပါ။",
        button: "3D ပုံစံငယ်ကို ကြည့်ရန်"
      },
      map: {
        location: "တည်နေရာ",
        title: "အပြန်အလှန်တုံ့ပြန်မှု မြေပုံ",
        desc: "မရမ်းချောင် SMR တည်နေရာ ပုံရိပ်",
        status: "လျာထားချက်",
        popupTitle: "SMR ယူနစ် ၁"
      }
    }
  };

  const t = content[lang];

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Main container */}
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Enhanced Header */}
        <header className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-atom-500/10 border border-atom-500/20 text-atom-400 text-sm font-bold tracking-wider uppercase mb-4 animate-fade-in-up">
            <Layers className="h-4 w-4" />
            {t.badge}
          </div>
          <div className="relative inline-block">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-tech font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-atom-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] leading-normal pb-3">
              {t.title}
            </h1>
          </div>
          <p className="text-slate-400 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </header>

        {/* Row 1: Image with glass overlay text beside it */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left - Enhanced Main Image Container */}
          <div className="relative group">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] xl:h-[500px] transition-all duration-500 group-hover:scale-[1.01] border border-white/10">
              <img 
                src="https://platform.vox.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/24749017/Screen_Shot_2023_06_23_at_4.22.12_PM.png?quality=90&strip=all&crop=8.7932454695222%2C0%2C82.413509060956%2C100&w=2400"
                alt="Main project showcase"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              
              {/* Floating badge */}
              <div className="absolute top-6 left-6 bg-slate-900/80 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 flex items-center gap-2">
                 <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                 <span className="text-xs font-bold text-white uppercase tracking-wider">{t.liveProject}</span>
              </div>
            </div>
          </div>
          
          {/* Right - Enhanced Glass Overlay Text */}
          <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-white/10 shadow-2xl relative overflow-hidden group hover:bg-slate-800/50 transition-colors">
            {/* Animated background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/20 transition-all"></div>
            
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <Zap className="h-6 w-6 text-atom-400" />
                <span className="text-sm text-atom-400 font-bold uppercase tracking-wider">{t.techFocus}</span>
              </div>
              <h3 className="text-3xl lg:text-4xl font-tech font-bold text-white">
                {t.smrTitle}
              </h3>
              <p className="text-slate-300 text-lg leading-relaxed">
                {t.smrDesc}
              </p>
              
              <div className="pt-4">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                        <div className="text-2xl font-tech font-bold text-white">300 MW</div>
                        <div className="text-xs text-gray-400 uppercase">{t.output}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                        <div className="text-2xl font-tech font-bold text-white">0%</div>
                        <div className="text-xs text-gray-400 uppercase">{t.carbon}</div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Enhanced Project Description */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-900/50 border border-white/10 p-8 lg:p-12">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-950 to-slate-950"></div>
          
          <div className="relative z-10">
            <div className="max-w-3xl mb-10">
              <h2 className="text-3xl lg:text-4xl font-tech font-bold text-white mb-4">
                {t.whyTitle} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">{t.locationName}</span>
              </h2>
              <p className="text-slate-400 text-lg">{t.whySubtitle}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {/* Card 1 */}
               <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-atom-500/30 transition-all group">
                  <ShieldCheck className="h-8 w-8 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-bold text-white mb-2">{t.cards.safety.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {t.cards.safety.desc}
                  </p>
               </div>

               {/* Card 2 */}
               <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-atom-500/30 transition-all group">
                  <Activity className="h-8 w-8 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-bold text-white mb-2">{t.cards.water.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {t.cards.water.desc}
                  </p>
               </div>

               {/* Card 3 */}
               <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-atom-500/30 transition-all group">
                  <MapIcon className="h-8 w-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-bold text-white mb-2">{t.cards.logistics.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {t.cards.logistics.desc}
                  </p>
               </div>
               
               {/* Card 4 */}
               <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-atom-500/30 transition-all group">
                  <ArrowRight className="h-8 w-8 text-green-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-bold text-white mb-2">{t.cards.flood.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {t.cards.flood.desc}
                  </p>
               </div>

               {/* Card 5 */}
               <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-atom-500/30 transition-all group">
                  <Layers className="h-8 w-8 text-orange-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-bold text-white mb-2">{t.cards.coastal.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {t.cards.coastal.desc}
                  </p>
               </div>
            </div>
          </div>
        </div>

        {/* Row 3: Enhanced Image and Map Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left - Enhanced Additional Image */}
          <div className="group relative h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <img 
              src="https://3d.energyencyclopedia.com/webdata_v49/scenes/smr_hall.jpg" 
              alt="SMR Hall Prototype"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-center gap-3 mb-4">
                 <Box className="h-8 w-8 text-atom-400" />
                 <h3 className="text-2xl font-tech font-bold text-white">{t.prototype.title}</h3>
              </div>
              <p className="text-slate-300 text-sm mb-6 max-w-md">{t.prototype.desc}</p>
              
              <Link 
                to="/components" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-atom-600 hover:bg-atom-500 text-white font-bold rounded-xl transition-all hover:scale-105 shadow-[0_0_20px_rgba(20,184,166,0.4)]"
              >
                {t.prototype.button}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          
          {/* Right - Interactive Map */}
          <div className="group relative h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900">
            <MapContainer
                center={targetLocation}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
                zoomControl={false}
                attributionControl={false}
                dragging={false} // Keep it static-like for the preview but interactive on zoom
                scrollWheelZoom={false}
            >
                <FixMapResize />
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                <Marker position={targetLocation} icon={pulsingIcon}>
                    <Popup className="font-sans text-slate-900">
                        <div className="p-1">
                            <h3 className="font-bold text-red-600">{t.map.popupTitle}</h3>
                            <p className="text-xs">Location: Mayanchaung</p>
                            <p className="text-xs">Status: {t.map.status}</p>
                        </div>
                    </Popup>
                </Marker>
            </MapContainer>
            
            {/* Map Overlay Elements */}
            <div className="absolute top-6 right-6 z-[400] bg-slate-900/90 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-lg">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                  <p className="text-xs font-bold text-white uppercase tracking-wider">{t.map.location}</p>
                </div>
                <p className="text-xs text-gray-400 font-mono">17.4263° N, 96.9298° E</p>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-900 to-transparent z-[400] pointer-events-none">
                <div className="flex items-center gap-3">
                   <MapIcon className="h-6 w-6 text-atom-400" />
                   <div>
                       <h3 className="text-xl font-tech font-bold text-white">{t.map.title}</h3>
                       <p className="text-slate-300 text-sm">{t.map.desc}</p>
                   </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;