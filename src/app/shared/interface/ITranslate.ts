export interface ITranslate {
  detectedLanguage: IDetectedLanguage;
  translations: ITranslation[];
}

interface IDetectedLanguage {
  language: string;
  score: number;
}

interface ITranslation {
  text: string;
  to: string;
}
