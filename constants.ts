
import { Content, ComponentCardData, Language } from './types';

export const CONTENT: Record<Language, Content> = {
  en: {
    nav: {
      home: "Home",
      components: "3D Viewer",
      aiAnalysis: "Nuclear Chat",
      dashboard: "Simulation",
    },
    hero: {
      title: "SMR Nexus: Powering Yangon",
      subtitle: "A 4D Proposal to resolve Yangon's energy crisis using Small Modular Reactors (SMRs). Integrating Spatial Placement (3D) near industrial zones like Hlaing Tharyar & Thilawa, and Temporal Operations (1D) to ensure reliable 24/7 electricity for the city.",
      cta: "Explore the 3D Model",
      badge: "Yangon Energy Solution",
    },
    concept: {
      title: "The 4D Concept: 3D + 1D",
      description: "Optimizing nuclear energy specifically for Yangon's high-density infrastructure and industrial demands.",
      d3: {
        title: "3D Component: Strategic Placement",
        desc: "Positioning SNPPs near Yangon's critical load centers—Industrial Zones and dense townships. This minimizes transmission losses and ensures steady power flow to factories requiring 24/7 operation, bypassing long-distance grid failures.",
      },
      d1: {
        title: "1D Component: Load Management",
        desc: "Managing the temporal load curve to bridge the gap during Yangon's peak hours and load shedding intervals. SMRs provide the baseload stability needed when the national grid fluctuates, ensuring uninterrupted production.",
      },
    },
    details: {
      feasibility: "Feasibility Justification",
      feasibilityDesc: "Analyzing the viability of SMRs for Yangon's specific industrial enterprises.",
      efficiency: "Economic Efficiency",
      efficiencyDesc: "Calculating ROI by reducing generator fuel costs and providing district cooling/heating.",
    },
    viewer: {
      title: "SMR Unit Visualization",
      description: "Interactive 3D view of the Small Modular Reactor unit.",
      rotationInstruction: "Interact with the view above. Below are the key components.",
      componentsTitle: "Key Components Breakdown",
      overlay: {
        browserLabel: "Component Browser",
        items: [
          {
            title: "REACTOR BUILDING",
            description: "Reactor modules are housed in reinforced concrete structures designed to resist various threats, both natural (earthquake) and man-made (aircraft impact) and also internal failure. Part of the building where the modules are located can be below ground level which increases safety."
          },
          {
            title: "REACTOR BUILDING CRANE",
            description: "An overhead crane inside the reactor building can lift reactor modules and move them during installation, refuelling or decommissioning."
          },
          {
             title: "FUEL LOADING MACHINE",
             description: "Fuel handling equipment designed for refuelling operations. An SMR based plant may require refuelling between approx 2 - 7 years. During the process, the module is lifted via an overhead crane and transported to a common refuelling area adjacent to the spent fuel pool following disassembly. While the core is being refuelled by a fuel loading machine, the upper module section is moved to a partial dry-dock facility for inspection and maintenance."
          },
          {
            title: "BIOLOGICAL SHIELD",
            description: "Modules are covered by a biological shield that serves as an additional barrier that reduces potential radiation leakage in case of failure."
          },
          {
            title: "ULTIMATE HEAT SINK",
            description: "A stainless steel-lined, reinforced concrete pool located in the reactor building below plant-grade level. The ultimate heat sink consists of a reactor pool area where reactor modules are submerged, the refuelling pool area, and the spent fuel pool area. It has the capacity to absorb all the decaying heat produced by all modules for more than 30 days."
          },
          {
            title: "CONTAINMENT VESSEL",
            description: "A cylindrical vessel-type containment made from stainless steel houses the reactor pressure vessel and steam supply piping and components."
          },
          {
            title: "VACUUM",
            description: "The space between containment vessel and reactor pressure vessel is kept under vacuum. This prevents heat transfer from the reactor to the pool during normal operation. If the core overheats, valves vent water into the vacuum space and the heat is passed into the pool."
          },
          {
            title: "REACTOR PRESSURE VESSEL",
            description: "A stainless-steel vessel housing the nuclear core, pressurizer and steam generator."
          },
          {
            title: "PRESSURIZER",
            description: "The pressurizer is located in the upper head of the reactor pressure vessel and maintains pressure in the primary circuit. The pressurizer is partially filled with water which is heated to the saturation temperature (boiling point) for the desired pressure by submerged electrical heaters."
          },
          {
            title: "RISER",
            description: "Movement of cooling water in the primary circuit is ensured not by pumps, but only by natural phenomena. Water is heated in the core and then rises through the tube called a riser due to a chimney effect. Two helical coil steam generators are wrapped around the riser and as the heat is passed to the coolant of the secondary circuit and the water cools down, its density increases. Denser water then falls down back to the reactor core."
          },
          {
            title: "STEAM GENERATOR",
            description: "The steam generator helical coils wrapped around the outside of the riser transfers heat from the primary coolant to the water of the secondary circuit producing superheated steam."
          },
          {
            title: "HEAT-EXCHANGE TUBE BUNDLE",
            description: "The steam generator consists of two independent sets of helical tube bundles wrapped around the outside of the riser. After contact with the heat of the primary coolant rising through the riser, the feedwater in the tubes boils producing superheated steam."
          },
           {
            title: "FEEDWATER LINE",
            description: "Feedwater is pumped into the steam generator where it boils to generate superheated steam."
          },
          {
            title: "STEAM LINE",
            description: "Steam generator output, leading superheated steam to a turbogenerator where the electricity is produced. The steam could be also used for industrial purposes."
          },
          {
            title: "CONTROL RODS",
            description: "Control rods (also called regulating rods) made of steel alloyed with boron and containing cadmium or hafnium, are inserted in between the fuel bundles in a nuclear reactor. The absorber concentration is decreased by pulling the rods out of the reactor core, causing the reactor power to increase. Inserting more control rods causes the reaction to be inhibited and the power output decreases."
          },
          {
            title: "NEUTRON REFLECTOR",
            description: "The core is surrounded by a stainless steel heavy neutron reflector that reflects back neutrons that would otherwise escape. Additionally, as an envelope to the core, it directs the coolant flow through it."
          },
          {
            title: "REACTOR CORE",
            description: "The reactor core consists of an array of 37 half-height typical LWR fuel and 16 control rod assemblies. Naturally circulating light water provides cooling and also acts as a moderator slowing down neutrons."
          },
          {
            title: "FUEL ASSEMBLY",
            description: "The fuel assembly of an SMR is similar to the fuel assembly used in a classic nuclear power plant, but usually at half-height with an active fuel length of approximately 2 meters. Fuel assembly consists of a set of fuel rods in a support lattice. Some of the fuel assemblies also contain the control rods."
          }
        ]
      }
    },
    chat: {
      title: "Nuclear Science Assistant",
      subtitle: "AI Nuclear Expert",
      welcome: "Hello! I am your AI Nuclear Assistant. Ask me anything about Small Modular Reactors, nuclear safety, or the physics behind the technology.",
      placeholder: "Ask about SMR efficiency, radiation safety...",
      sendBtn: "Send",
      disclaimer: "I specialize in nuclear science and SMR technology.",
    },
    ai: {
      title: "Feasibility Analysis",
      subtitle: "AI-Powered Feasibility Study for SNPP Implementation",
      inputIndustry: "Enterprise / Industry Type",
      inputLocation: "Location",
      inputDemand: "Energy Demand (MW)",
      analyzeBtn: "Generate Analysis",
      analyzing: "Analyzing...",
      resultTitle: "Feasibility Report"
    },
    dashboard: {
      header: {
        title: "SMR Operations Center",
        subtitle: "Real-time Simulation Dashboard • Yangon Unit 1",
        tabs: {
          overview: "Plant Overview",
          energy: "Energy Mix",
          map: "Grid Map"
        }
      },
      overview: {
        title: "Plant Status Overview",
        subtitle: "Live monitoring of core reactor parameters",
        scramActive: "SCRAM ACTIVE",
        systemNominal: "SYSTEM NOMINAL",
        metrics: {
          coreTemp: "Core Temperature",
          pressure: "Primary Loop Pressure",
          flowRate: "Coolant Flow Rate",
          containment: "Containment Pressure",
          burnup: "Fuel Burnup",
          radiation: "Radiation Level"
        },
        controlRods: {
          title: "Control Rod Matrix",
          subtitle: "Manual Override Active",
          instruction: "Adjust insertion to regulate core reactivity. Higher insertion = Lower Power."
        }
      },
      energy: {
        title: "Energy Mix & Sustainability",
        subtitle: "Optimize grid balance with fossil fuel backup",
        gridDemand: "Grid Demand Set:",
        apply: "Apply",
        charts: {
          genVsDemand: "Generation vs Demand (Live)",
          currentMix: "Current Mix"
        },
        metrics: {
          nuclear: "Nuclear Output",
          fossil: "Fossil Fuel Gen.",
          hydro: "Hydro Generation",
          balance: "Energy Balance",
          co2: "CO₂ Avoided"
        }
      },
      map: {
        popup: {
          smr: "SMR Unit 1 (Thilawa)",
          loadCenter: "Yangon Load Center",
          industrial: "Hlaing Tharyar Industrial"
        },
        legend: {
          title: "Legend",
          smr: "SMR Site (Active)",
          load: "Urban Load Center",
          ind: "Industrial Zone",
          line: "Transmission Line"
        }
      }
    }
  },
  my: {
    nav: {
      home: "ပင်မစာမျက်နှာ",
      components: "3D ကြည့်ရှုရန်",
      aiAnalysis: "နျူကလီးယား စကားဝိုင်း",
      dashboard: "စမ်းသပ်ခန်း",
    },
    hero: {
      title: "SMR Nexus: ရန်ကုန် စွမ်းအင် အဖြေ",
      subtitle: "ရန်ကုန်မြို့၏ လျှပ်စစ်ပြဿနာကို ဖြေရှင်းရန် SMR များ အသုံးပြုမည့် 4D အဆိုပြုချက်။ သီလဝါနှင့် လှိုင်သာယာကဲ့သို့သော စက်မှုဇုန်များအနီး SMR များ တည်ဆောက်ခြင်း (3D) နှင့် မီးပျက်ချိန်များတွင် ၂၄ နာရီ လျှပ်စစ် ရရှိစေရန် အချိန်ကိုက် လည်ပတ်ခြင်း (1D) ကို ပေါင်းစပ်ထားသည်။",
      cta: "3D ပုံစံငယ်ကို လေ့လာရန်",
      badge: "ရန်ကုန် စွမ်းအင် ဖြေရှင်းချက်",
    },
    concept: {
      title: "4D အယူအဆ: 3D + 1D",
      description: "ရန်ကုန်မြို့၏ လူနေထူထပ်မှုနှင့် စက်မှုလိုအပ်ချက်များအတွက် နျူကလီးယားစွမ်းအင်ကို အကောင်းဆုံး စီမံခန့်ခွဲခြင်း။",
      d3: {
        title: "3D အစိတ်အပိုင်း: မဟာဗျူဟာမြောက် တည်နေရာ",
        desc: "SMR များကို ရန်ကုန်၏ အဓိက စက်မှုဇုန်များနှင့် လူနေထူထပ်သော မြို့နယ်များအနီးတွင် ထားရှိခြင်း။ ၎င်းသည် ဓာတ်အား ပို့လွှတ်မှု ဆုံးရှုံးမှုကို လျော့နည်းစေပြီး ဓာတ်အားလိုင်း ချို့ယွင်းချိန်များတွင် စက်ရုံများအတွက် တည်ငြိမ်သော လျှပ်စစ်ကို ပေးစွမ်းသည်။",
      },
      d1: {
        title: "1D အစိတ်အပိုင်း: ဝန်အား စီမံခန့်ခွဲမှု",
        desc: "ရန်ကုန်မြို့၏ အမြင့်ဆုံး လျှပ်စစ်သုံးစွဲချိန်များနှင့် မီးပျက်ချိန်များတွင် SMR များမှ ဓာတ်အား ဖြည့်ဆည်းပေးခြင်း။ ၎င်းသည် နိုင်ငံတော် ဓာတ်အားလိုင်း မလုံလောက်ချိန်တွင် စက်ရုံများ ရပ်နားရန် မလိုဘဲ တည်ငြိမ်သော အခြေခံဝန်အားကို ပေးစွမ်းသည်။",
      },
    },
    details: {
      feasibility: "ဖြစ်နိုင်ချေ ဆန်းစစ်ချက်",
      feasibilityDesc: "ရန်ကုန်ရှိ သီးခြား စက်မှုလုပ်ငန်းများအတွက် SMR အသုံးပြုနိုင်စွမ်းကို လေ့လာဆန်းစစ်ခြင်း။",
      efficiency: "စီးပွားရေး တွက်ခြေကိုက်မှု",
      efficiencyDesc: "မီးစက်ဆီဖိုး ကုန်ကျစရိတ် လျှော့ချခြင်းနှင့် စက်မှု အပူပေးစနစ်များမှ ရရှိမည့် အကျိုးအမြတ်ကို တွက်ချက်ခြင်း။",
    },
    viewer: {
      title: "SMR ယူနစ် ပုံရိပ်",
      description: "အသေးစား ဓာတ်ပေါင်းဖို ယူနစ်၏ 3D ပုံရိပ်။",
      rotationInstruction: "အထက်ပါ ပုံကို ကြည့်ရှုပါ။ အောက်တွင် အဓိက အစိတ်အပိုင်းများကို ဖော်ပြထားသည်။",
      componentsTitle: "အဓိက အစိတ်အပိုင်းများ",
      overlay: {
        browserLabel: "အစိတ်အပိုင်းများ",
        items: [
           {
            title: "ဓာတ်ပေါင်းဖို အဆောက်အဦး",
            description: "ဓာတ်ပေါင်းဖို မော်ဂျူးများကို ငလျင်ကဲ့သို့သော သဘာဝဘေးအန္တရာယ်များနှင့် လေယာဉ်တိုက်ခိုက်မှုကဲ့သို့သော လူသားတို့ကြောင့်ဖြစ်သော ဘေးကင်းမှုကို ပိုမိုမြင့်မားစေသည်။"
          },
          {
            title: "ဓာတ်ပေါင်းဖို အဆောက်အဦး ကရိန်း",
            description: "ဓာတ်ပေါင်းဖို အဆောက်အဦးအတွင်းရှိ ကရိန်းသည် တပ်ဆင်ခြင်း၊ လောင်စာဖြည့်ခြင်း သို့မဟုတ် ဖျက်သိမ်းခြင်း လုပ်ငန်းစဉ်များတွင် ဓာတ်ပေါင်းဖို မော်ဂျူးများကို မခြင်းနှင့် ရွှေ့ပြောင်းခြင်းများ ပြုလုပ်နိုင်သည်။"
          },
           {
             title: "လောင်စာဖြည့် စက်",
             description: "လောင်စာဖြည့်ခြင်း လုပ်ငန်းစဉ်များအတွက် ဒီဇိုင်းထုတ်ထားသော လောင်စာ ကိုင်တွယ်ရေး ကိရိယာ။ SMR အခြေပြု စက်ရုံတစ်ခုသည် ၂ နှစ်မှ ၇ နှစ်ကြားတွင် တစ်ကြိမ် လောင်စာဖြည့်ရန် လိုအပ်နိုင်သည်။ ဤလုပ်ငန်းစဉ်အတွင်း မော်ဂျူးကို ကရိန်းဖြင့် မတင်ပြီး ဖြုတ်တပ်ပြီးနောက် လောင်စာဟောင်းကန်အနီးရှိ ဘုံလောင်စာဖြည့်ရာ နေရာသို့ ပို့ဆောင်သည်။ အူတိုင်ကို လောင်စာဖြည့်စက်ဖြင့် ဖြည့်တင်းနေစဉ်တွင် အပေါ်ပိုင်း မော်ဂျူးအစိတ်အပိုင်းကို စစ်ဆေးခြင်းနှင့် ပြုပြင်ထိန်းသိမ်းခြင်းအတွက် အပိုင်းလိုက် dry-dock စခန်းသို့ ရွှေ့ပြောင်းသည်။"
          },
          {
            title: "ဇီဝဆိုင်ရာ အကာအရံ",
            description: "မော်ဂျူးများကို ဇီဝဆိုင်ရာ အကာအရံများဖြင့် ဖုံးအုပ်ထားပြီး ၎င်းသည် ချို့ယွင်းမှုဖြစ်ပေါ်ပါက ဓာတ်ရောင်ခြည် ယိုစိမ့်မှုကို လျှော့ချပေးသည့် ထပ်ဆောင်း အတားအဆီးတစ်ခုအဖြစ် လုပ်ဆောင်သည်။"
          },
           {
            title: "အဆုံးစွန် အပူစုပ်ယူရာ",
            description: "စက်ရုံမြေပြင်အောက်ရှိ ဓာတ်ပေါင်းဖို အဆောက်အဦးတွင် တည်ရှိသော သံမဏိဖြင့် စီထားသည့် သံကူကွန်ကရစ် ကန်ဖြစ်သည်။ အဆုံးစွန် အပူစုပ်ယူရာတွင် ဓာတ်ပေါင်းဖို မော်ဂျူးများ နှစ်မြှုပ်ထားသည့် ဓာတ်ပေါင်းဖိုကန် ဧရိယာ၊ လောင်စာဖြည့်ကန် ဧရိယာနှင့် လောင်စာဟောင်းကန် ဧရိယာတို့ ပါဝင်သည်။ ၎င်းသည် မော်ဂျူးအားလုံးမှ ထွက်ရှိသော အပူများကို ရက်ပေါင်း ၃၀ ကျော်ကြာ စုပ်ယူနိုင်စွမ်းရှိသည်။"
          },
          {
            title: "ထိန်းချုပ် ကွန်တိန်နာ",
            description: "ဓာတ်ပေါင်းဖို ဖိအားအိုး၊ ရေနွေးငွေ့ ပိုက်လိုင်းများနှင့် အစိတ်အပိုင်းများကို ဖုံးအုပ်ထားသည့် ဆလင်ဒါပုံစံ သံမဏိ ကွန်တိန်နာ ဖြစ်သည်။"
          },
          {
            title: "လေဟာနယ်",
            description: "Containment vessel နှင့် reactor pressure vessel အကြားရှိ နေရာလွတ်ကို လေဟာနယ်အဖြစ် ထားရှိသည်။ ၎င်းသည် ပုံမှန် လည်ပတ်နေချိန်တွင် ဓာတ်ပေါင်းဖိုမှ ရေကန်သို့ အပူကူးပြောင်းမှုကို ကာကွယ်ပေးသည်။ အကယ်၍ အူတိုင် အပူချိန်လွန်ကဲလာပါက၊ အဆို့ရှင်များက လေဟာနယ် နေရာလွတ်ထဲသို့ ရေကို ထုတ်လွှတ်ပေးပြီး အပူကို ရေကန်ထဲသို့ ပို့ဆောင်ပေးသည်။"
          },
           {
            title: "ဓာတ်ပေါင်းဖို ဖိအားအိုး",
            description: "နျူကလီးယား အူတိုင်၊ ဖိအားထိန်းကိရိယာနှင့် ရေနွေးငွေ့ ထုတ်စက်တို့ ပါဝင်သော သံမဏိအိုး ဖြစ်သည်။"
          },
          {
            title: "ဖိအားထိန်းကိရိယာ",
            description: "ဖိအားထိန်းကိရိယာသည် ဓာတ်ပေါင်းဖို ဖိအားအိုး၏ အပေါ်ပိုင်းတွင် တည်ရှိပြီး ပင်မပတ်လမ်းကြောင်းအတွင်း ဖိအားကို ထိန်းသိမ်းပေးသည်။ ဖိအားထိန်းကိရိယာတွင် ရေတစ်စိတ်တစ်ပိုင်း ပါဝင်ပြီး လိုချင်သော ဖိအားရရှိရန် လျှပ်စစ်အပူပေးစက်များဖြင့် ရေဆူမှတ်အထိ အပူပေးထားသည်။"
          },
           {
            title: "မြင့်တက် ပိုက် (Riser)",
            description: "ပင်မပတ်လမ်းကြောင်းအတွင်း အအေးပေးရေ လှုပ်ရှားမှုကို ပန့်များဖြင့် မဟုတ်ဘဲ သဘာဝဖြစ်စဉ်များဖြင့်သာ ဆောင်ရွက်သည်။ ရေသည် အူတိုင်တွင် အပူရရှိပြီးနောက် မီးခိုးခေါင်းတိုင် အာနိသင်ကြောင့် Riser ဟုခေါ်သော ပိုက်မှတစ်ဆင့် မြင့်တက်လာသည်။ Riser တွင် ရစ်ပတ်ထားသော ရေနွေးငွေ့ ထုတ်စက်ကွိုင်နှစ်ခုရှိပြီး အပူကို ဒုတိယပတ်လမ်းကြောင်းမှ အအေးပေးရည်သို့ လွှဲပြောင်းပေးလိုက်သောအခါ ရေသည် အေးသွားပြီး သိပ်သည်းဆ များလာသည်။ သိပ်သည်းဆများသော ရေသည် ဓာတ်ပေါင်းဖို အူတိုင်သို့ ပြန်လည် ကျဆင်းသွားသည်။"
          },
          {
            title: "ရေနွေးငွေ့ ထုတ်စက်",
            description: "Riser ၏ အပြင်ဘက်တွင် ရစ်ပတ်ထားသော ရေနွေးငွေ့ ထုတ်စက် ဟယ်လီကယ်ကွိုင်များသည် ပင်မအအေးပေးရည်မှ အပူကို ဒုတိယပတ်လမ်းကြောင်းမှ ရေသို့ လွှဲပြောင်းပေးပြီး အပူလွန်ကဲ ရေနွေးငွေ့ကို ထုတ်လုပ်သည်။"
          },
          {
            title: "အပူဖလှယ် ပိုက်အစုအဝေး",
            description: "ရေနွေးငွေ့ ထုတ်စက်တွင် Riser ၏ အပြင်ဘက်၌ ရစ်ပတ်ထားသော သီးခြား ဟယ်လီကယ် ပိုက်အစုအဝေး နှစ်ခု ပါဝင်သည်။ Riser မှတဆင့် တက်လာသော ပင်မအအေးပေးရည်၏ အပူနှင့် ထိတွေ့ပြီးနောက် ပိုက်များအတွင်းရှိ ရေသွင်းရေသည် ဆူပွက်လာပြီး အပူလွန်ကဲ ရေနွေးငွေ့ကို ထုတ်လုပ်သည်။"
          },
           {
            title: "ရေသွင်း လိုင်း",
            description: "ရေသွင်းရေကို ရေနွေးငွေ့ ထုတ်စက်ထဲသို့ ပန့်ဖြင့် မဟုတ်ဘဲ မောင်းနှင်ထည့်သွင်းပြီး ထိုနေရာတွင် ဆူပွက်ကာ အပူလွန်ကဲ ရေနွေးငွေ့ကို ထုတ်လုပ်သည်။"
          },
          {
            title: "ရေနွေးငွေ့ လိုင်း",
            description: "ရေနွေးငွေ့ ထုတ်စက်မှ ထွက်ရှိလာသော လိုင်းဖြစ်ပြီး အပူလွန်ကဲ ရေနွေးငွေ့ကို တာဘိုမီးစက် (turbogenerator) သို့ ပို့ဆောင်ကာ လျှပ်စစ်ဓာတ်အား ထုတ်လုပ်သည်။ ရေနွေးငွေ့ကို စက်မှုလုပ်ငန်းများအတွက်လည်း အသုံးပြုနိုင်သည်။"
          },
          {
            title: "ထိန်းချုပ် တံများ",
            description: "ဘိုရွန် ပါဝင်သော သံမဏိသတ္တုစပ်ဖြင့် ပြုလုပ်ထားပြီး ကက်ဒမီယမ် သို့မဟုတ် ဟဖ်နီယမ် ပါဝင်သော ထိန်းချုပ်တံများ (စည်းကမ်းထိန်းသိမ်းရေး တံများဟုလည်း ခေါ်သည်) ကို နျူကလီးယား ဓာတ်ပေါင်းဖိုရှိ လောင်စာအစုအဝေးများ ကြားတွင် ထည့်သွင်းထားသည်။ ဓာတ်ပေါင်းဖို အူတိုင်မှ တံများကို ဆွဲထုတ်လိုက်သောအခါ စုပ်ယူမှု လျော့နည်းသွားပြီး ဓာတ်ပေါင်းဖို စွမ်းအင် မြင့်တက်လာသည်။ ထိန်းချုပ်တံများကို ပိုမိုထည့်သွင်းလိုက်ပါက ဓာတ်ပြုမှုကို ဟန့်တားစေပြီး စွမ်းအင်ထွက်ရှိမှု လျော့ကျသွားသည်။"
          },
          {
            title: "နယူထရွန် ရောင်ပြန်",
            description: "အူတိုင်ကို သံမဏိ နယူထရွန် ရောင်ပြန်ဖြင့် ဝန်းရံထားပြီး ၎င်းသည် လွတ်ထွက်သွားမည့် နယူထရွန်များကို ပြန်လည် ရောင်ပြန်ဟပ်ပေးသည်။ ထို့အပြင် အူတိုင်၏ အဖုံးအဖြစ်လည်း လုပ်ဆောင်ပြီး အအေးပေးရည် စီးဆင်းမှုကို လမ်းကြောင်းသတ်မှတ်ပေးသည်။"
          },
          {
            title: "ဓာတ်ပေါင်းဖို အူတိုင်",
            description: "ဓာတ်ပေါင်းဖို အူတိုင်တွင် ပုံမှန် LWR လောင်စာတိုင် ၃၇ တိုင်နှင့် ထိန်းချုပ်တံ အစုအဝေး ၁၆ ခု ပါဝင်သည်။ သဘာဝအလျောက် လှည့်ပတ်နေသော ရေသည် အအေးပေးစနစ်အဖြစ် လုပ်ဆောင်ပေးပြီး နယူထရွန်များကို အရှိန်လျော့စေသော moderator အဖြစ်လည်း လုပ်ဆောင်သည်။"
          },
          {
            title: "လောင်စာ တပ်ဆင်မှု",
            description: "SMR ၏ လောင်စာ တပ်ဆင်မှုသည် ရိုးရိုး နျူကလီးယား ဓာတ်အားပေးစက်ရုံတွင် သုံးသော လောင်စာ တပ်ဆင်မှုနှင့် ဆင်တူသော်လည်း အမြင့်တစ်ဝက်သာ ရှိပြီး လောင်စာ အလျားမှာ ၂ မီတာခန့် ဖြစ်သည်။ လောင်စာ တပ်ဆင်မှုတွင် ထောက်ကူ ဇယားကွက်၌ လောင်စာတောင့်များ စုစည်းပါဝင်သည်။ အချို့သော လောင်စာ တပ်ဆင်မှုများတွင် ထိန်းချုပ်တံများလည်း ပါဝင်သည်။"
          }
        ]
      }
    },
    chat: {
      title: "နျူကလီးယား စကားဝိုင်း",
      subtitle: "Mistral AI မှ ပံ့ပိုးသည်",
      welcome: "မင်္ဂလာပါ။ ကျွန်ုပ်သည် သင်၏ နျူကလီးယား နည်းပညာဆိုင်ရာ လက်ထောက် ဖြစ်ပါသည်။ SMR နည်းပညာနှင့် နျူကလီးယား သိပ္ပံဆိုင်ရာများကို မေးမြန်းနိုင်ပါသည်။",
      placeholder: "SMR အလုပ်လုပ်ပုံ၊ ဘေးကင်းရေး...",
      sendBtn: "ပို့ပါ",
      disclaimer: "နျူကလီးယား နည်းပညာဆိုင်ရာများကိုသာ အထူးပြု ဖြေကြားပေးပါသည်။",
    },
    ai: {
      title: "ဖြစ်နိုင်ချေ ဆန်းစစ်ခြင်း",
      subtitle: "SNPP အကောင်အထည်ဖော်မှုအတွက် AI နည်းပညာသုံး ဖြစ်နိုင်ချေ လေ့လာမှု",
      inputIndustry: "လုပ်ငန်း / စက်မှုလုပ်ငန်း အမျိုးအစား",
      inputLocation: "တည်နေရာ",
      inputDemand: "စွမ်းအင် လိုအပ်ချက် (MW)",
      analyzeBtn: "ဆန်းစစ်ချက် ထုတ်ယူရန်",
      analyzing: "ဆန်းစစ်နေသည်...",
      resultTitle: "ဖြစ်နိုင်ချေ အစီရင်ခံစာ"
    },
    dashboard: {
      header: {
        title: "SMR လုပ်ငန်းလည်ပတ်မှု စင်တာ",
        subtitle: "အချိန်နှင့်တပြေးညီ စမ်းသပ်မောင်းနှင်မှု • ရန်ကုန် ယူနစ် ၁",
        tabs: {
          overview: "စက်ရုံ အခြေအနေ",
          energy: "စွမ်းအင် ရောနှောမှု",
          map: "ဓာတ်အားလိုင်း မြေပုံ"
        }
      },
      overview: {
        title: "စက်ရုံ အခြေအနေ အကျဉ်းချုပ်",
        subtitle: "ဓာတ်ပေါင်းဖို အူတိုင် ပါရာမီတာများကို တိုက်ရိုက် စောင့်ကြည့်ခြင်း",
        scramActive: "SCRAM အသက်ဝင်နေသည်",
        systemNominal: "စနစ် ပုံမှန်",
        metrics: {
          coreTemp: "အူတိုင် အပူချိန်",
          pressure: "ပင်မ ပတ်လမ်း ဖိအား",
          flowRate: "အအေးပေးရည် စီးဆင်းနှုန်း",
          containment: "ထိန်းချုပ်အိုး ဖိအား",
          burnup: "လောင်စာ လောင်ကျွမ်းမှု",
          radiation: "ဓာတ်ရောင်ခြည် ပမာဏ"
        },
        controlRods: {
          title: "ထိန်းချုပ်တံ မက်ထရစ်",
          subtitle: "လူကိုယ်တိုင် ထိန်းချုပ်မှု အသက်ဝင်နေသည်",
          instruction: "ဓာတ်ပေါင်းဖို စွမ်းအင်ကို ထိန်းညှိရန် အတံများကို ချိန်ညှိပါ။ ပိုမိုထည့်သွင်းခြင်း = စွမ်းအင်လျော့နည်းခြင်း။"
        }
      },
      energy: {
        title: "စွမ်းအင် ရောနှောမှုနှင့် ရေရှည်တည်တံ့မှု",
        subtitle: "ရုပ်ကြွင်းလောင်စာ အရန်စနစ်ဖြင့် ဓာတ်အားလိုင်း ထိန်းညှိခြင်း",
        gridDemand: "လျှပ်စစ် လိုအပ်ချက်:",
        apply: "အိုကေ",
        charts: {
          genVsDemand: "ထုတ်လုပ်မှု နှင့် လိုအပ်ချက်",
          currentMix: "လက်ရှိ စွမ်းအင် ရောနှောမှု"
        },
        metrics: {
          nuclear: "နျူကလီးယား ထုတ်လုပ်မှု",
          fossil: "ရုပ်ကြွင်းလောင်စာ ထုတ်လုပ်မှု",
          hydro: "ရေအား လျှပ်စစ်",
          balance: "စွမ်းအင် မျှတမှု",
          co2: "CO₂ လျှော့ချနိုင်မှု"
        }
      },
      map: {
        popup: {
          smr: "SMR ယူနစ် ၁ (သီလဝါ)",
          loadCenter: "ရန်ကုန် ဝန်အား ဗဟိုချက်",
          industrial: "လှိုင်သာယာ စက်မှုဇုန်"
        },
        legend: {
          title: "အညွှန်း",
          smr: "SMR တည်နေရာ (အသက်ဝင်)",
          load: "မြို့ပြ ဝန်အား ဗဟိုချက်",
          ind: "စက်မှုဇုန်",
          line: "ဓာတ်အားလိုင်း"
        }
      }
    }
  },
};

export const COMPONENTS_DATA: ComponentCardData[] = [
  {
    id: 1,
    title: { en: "Base Load Power", my: "အခြေခံ ဝန်အား" },
    description: {
      en: "Steady, reliable energy output for industrial machinery running 24/7.",
      my: "၂၄ နာရီ လည်ပတ်နေသော စက်ရုံများအတွက် တည်ငြိမ်သော လျှပ်စစ်စွမ်းအင်။"
    },
    icon: "Zap"
  },
  {
    id: 2,
    title: { en: "Grid Stabilization", my: "ဓာတ်အားလိုင်း တည်ငြိမ်မှု" },
    description: {
      en: "Supports the main grid during peak residential consumption hours.",
      my: "လူနေအိမ် သုံးစွဲမှုများသော အချိန်များတွင် ပင်မ ဓာတ်အားလိုင်းကို ပံ့ပိုးပေးသည်။"
    },
    icon: "Activity"
  },
  {
    id: 3,
    title: { en: "Backup System", my: "အရန် စနစ်" },
    description: {
      en: "Automatic switchover ensures no blackouts for critical infrastructure.",
      my: "အလိုအလျောက် စနစ်ဖြင့် အရေးကြီး အဆောက်အအုံများ မီးမပျက်စေရန် ကာကွယ်သည်။"
    },
    icon: "ShieldCheck"
  },
  {
    id: 4,
    title: { en: "District Heating", my: "ဒေသဆိုင်ရာ အပူပေးစနစ်" },
    description: {
      en: "Excess heat is utilized for residential heating or industrial drying.",
      my: "ပိုလျှံသော အပူကို လူနေအိမ်များနှင့် စက်မှုလုပ်ငန်းများတွင် ပြန်လည်အသုံးပြုနိုင်သည်။"
    },
    icon: "Thermometer"
  }
];