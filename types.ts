
export type Language = 'en' | 'my';

export interface NavItem {
  label: string;
  path: string;
}

export interface DashboardContent {
  header: {
    title: string;
    subtitle: string;
    tabs: {
      overview: string;
      energy: string;
      map: string;
    }
  };
  overview: {
    title: string;
    subtitle: string;
    scramActive: string;
    systemNominal: string;
    metrics: {
      coreTemp: string;
      pressure: string;
      flowRate: string;
      containment: string;
      burnup: string;
      radiation: string;
    };
    controlRods: {
      title: string;
      subtitle: string;
      instruction: string;
    };
  };
  energy: {
    title: string;
    subtitle: string;
    gridDemand: string;
    apply: string;
    charts: {
      genVsDemand: string;
      currentMix: string;
    };
    metrics: {
      nuclear: string;
      fossil: string;
      hydro: string;
      balance: string;
      co2: string;
    };
  };
  map: {
    popup: {
      smr: string;
      loadCenter: string;
      industrial: string;
    };
    legend: {
      title: string;
      smr: string;
      load: string;
      ind: string;
      line: string;
    };
  };
}

export interface Content {
  nav: {
    home: string;
    components: string;
    aiAnalysis: string;
    dashboard: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    badge: string;
  };
  concept: {
    title: string;
    description: string;
    d3: {
      title: string;
      desc: string;
    };
    d1: {
      title: string;
      desc: string;
    };
  };
  details: {
    feasibility: string;
    feasibilityDesc: string;
    efficiency: string;
    efficiencyDesc: string;
  };
  viewer: {
    title: string;
    description: string;
    rotationInstruction: string;
    componentsTitle: string;
    overlay: {
      browserLabel: string;
      items: {
        title: string;
        description: string;
      }[];
    };
  };
  chat: {
    title: string;
    subtitle: string;
    welcome: string;
    placeholder: string;
    sendBtn: string;
    disclaimer: string;
  };
  ai: {
    title: string;
    subtitle: string;
    inputIndustry: string;
    inputLocation: string;
    inputDemand: string;
    analyzeBtn: string;
    analyzing: string;
    resultTitle: string;
  };
  dashboard: DashboardContent;
}

export interface ComponentCardData {
  id: number;
  title: Record<Language, string>;
  description: Record<Language, string>;
  icon: string;
}