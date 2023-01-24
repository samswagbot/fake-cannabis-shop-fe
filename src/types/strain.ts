export interface StrainType {
  name: string;
  _id: string;
  type: string;
  description: string;
  img_url: string;
  effects: Effects;
  most_common_terpene: string;
  thc_level: string;
}

export interface Effects {
  anxiety: string;
  anxious: string;
  creative: string;
  depression: string;
  dizzy: string;
  dry_eyes: string;
  dry_mouth: string;
  euphoric: string;
  happy: string;
  insomnia: string;
  pain: string;
  paranoid: string;
  relaxed: string;
  stress: string;
  uplifted: string;
}
