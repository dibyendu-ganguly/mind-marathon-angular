export const TextButtonClassList = (btnType:string) => `bg-${btnType} text-on-${btnType} rounded-full bg-gradient-to-tr py-2 px-4 border-transparent text-center text-sm transition-all shadow-md hover:shadow-xl focus:bg-${btnType} focus:text-on-${btnType} focus:shadow-none active:bg-secondary hover:bg-tertiary hover:text-on-tertiary active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`;
export const IconButtonClassList = "bg-primary text-on-primary rounded-sm bg-gradient-to-tr from-slate-800 to-slate-700 py-2 px-4 border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-xl focus:bg-primary focus:text-on-primary focus:shadow-none focus:ring-4 active:bg-secondary hover:bg-tertiary hover:text-on-tertiary active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none";
export const LinkClassList = "text-primary hover:text-tertiary pointer cursor-pointer transition-colors duration-300";

export const EXTERNAL_LINKS = {
  facebook: 'https://www.facebook.com/p/Mind-Marathon-100079927641799/',
  instagram: 'https://www.instagram.com/mind__marathon',
  github: 'https://github.com/dibyendu-ganguly/mind-marathon-angular'
} as const;

export const RESOURCES = [
  {
    name: 'Britannica',
    url: 'https://www.britannica.com/'
  },
  {
    name: 'Sporcle',
    url: 'https://www.sporcle.com/'
  },
  {
    name: 'MyGov Quiz',
    url: 'https://quiz.mygov.in/'
  }
] as const;

export const AUTH_CONSTANTS = {
  googleBtnId: 'google-btn',
} as const;
