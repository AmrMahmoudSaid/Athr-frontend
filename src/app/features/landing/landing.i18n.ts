export type Lang = 'ar' | 'en';

export interface LandingDict {
  navCta: string;
  eyebrow: string;
  onCall: string;
  callQuality: string;
  heroTitle: string;
  heroSub: string;
  heroCta: string;
  heroSecondary: string;
  whoKicker: string; whoTitle: string; whoBody: string;
  howKicker: string; howTitle: string;
  s1t: string; s1b: string; s2t: string; s2b: string; s3t: string; s3b: string;
  whyKicker: string; whyTitle: string;
  v1t: string; v1b: string; v2t: string; v2b: string; v3t: string; v3b: string; v4t: string; v4b: string;
  finalKicker: string; finalTitle: string; finalSub: string; finalCta: string;
  footer: string;
}

export const LANDING_I18N: Record<Lang, LandingDict> = {
  ar: {
    navCta: 'سجّل الآن',
    eyebrow: 'توظيف خدمة العملاء · ATHR',
    onCall: 'مكالمة جارية',
    callQuality: 'صوت واضح · إنجليزي سليم',
    heroTitle: 'إنجليزيك كويس؟<br/>ده <b>شغل وراتب</b> مستنيك.',
    heroSub: 'أثر بتلاقي أصحاب الإنجليزي الكويس وبتحطهم في قلب أكبر شركات خدمة العملاء. إنت بس سجّل، واحنا اللي بندوّر، نقيّم، ونوصّلك بالفرصة — من غير ما تدفع مليم.',
    heroCta: 'سجّل الآن',
    heroSecondary: 'إزاي بنشتغل؟',
    whoKicker: 'مين احنا',
    whoTitle: 'احنا الوصلة بينك وبين الكول سنتر المناسب.',
    whoBody: 'في أثر بنعرف الشركات بتدوّر على مين، وبنعرف إنت تستاهل إيه. شغلنا الوحيد إننا نلمّ أحسن الناس في الإنجليزي ونقدّمهم لأفضل شركات خدمة العملاء — بدل ما تضيّع وقتك في إنترفيوهات مالهاش لازمة، احنا بنوصّلك على طول بالشغل اللي على مقاسك.',
    howKicker: 'إزاي بنشتغل',
    howTitle: 'من التسجيل لأول يوم شغل… ٣ خطوات.',
    s1t: 'سجّل في دقيقة', s1b: 'املأ الفورم وقولنا مستواك في الإنجليزي ومعلوماتك الأساسية.',
    s2t: 'بنسمعك ونقيّمك', s2b: 'بنتأكد من مستواك ونحدد الدور اللي يناسب مهاراتك ولهجتك.',
    s3t: 'بنوصّلك بالشركة', s3b: 'بنرشّحك لأفضل شركة على قدّك، وتبدأ شغلك بثقة.',
    whyKicker: 'ليه أثر',
    whyTitle: 'إحنا في صفّك من أول رنّة لحد ما تمضي العقد.',
    v1t: 'فرص في كبرى الشركات', v1b: 'بنوصّلك بأكبر وأحسن شركات خدمة العملاء في السوق.',
    v2t: 'مجاني ١٠٠٪', v2b: 'مفيش أي رسوم عليك — لا تسجيل ولا ترشيح ولا أي حاجة.',
    v3t: 'تركيز على لغتك', v3b: 'بنقيّم إنجليزيك ومهارة كلامك صح، ونطابقك بدقة.',
    v4t: 'معاك خطوة بخطوة', v4b: 'بنفضل جنبك في كل مرحلة لحد ما تستلم شغلك.',
    finalKicker: 'جاهز تمسك السماعة؟',
    finalTitle: 'سجّل دلوقتي، وسيب علينا نلاقيلك الكول سنتر اللي يستاهلك.',
    finalSub: 'دقيقة واحدة بس، وفريقنا يبدأ يدوّرلك على فرصتك الجاية.',
    finalCta: 'سجّل الآن',
    footer: '© أثر (ATHR) — جميع الحقوق محفوظة.',
  },
  en: {
    navCta: 'Register now',
    eyebrow: 'Customer-Service Hiring · ATHR',
    onCall: 'On a call',
    callQuality: 'Clear voice · Solid English',
    heroTitle: 'Speak good English?<br/>There’s <b>a job and a salary</b> waiting.',
    heroSub: 'ATHR finds strong English speakers and places them at the biggest customer-service companies. You just register — we search, assess, and connect you to the opportunity. No fees, ever.',
    heroCta: 'Register now',
    heroSecondary: 'How it works',
    whoKicker: 'Who we are',
    whoTitle: 'We’re the link between you and the right call center.',
    whoBody: 'At ATHR we know what companies are looking for, and we know what you deserve. Our one job is to gather the best English speakers and present them to top customer-service companies — so instead of wasting time on pointless interviews, we connect you straight to the role that fits you.',
    howKicker: 'How it works',
    howTitle: 'From sign-up to day one… three steps.',
    s1t: 'Register in a minute', s1b: 'Fill the form and tell us your English level and basic info.',
    s2t: 'We assess your English', s2b: 'We confirm your level and pick the role that fits your skills and accent.',
    s3t: 'We connect you', s3b: 'We recommend you to the best-fit company, and you start with confidence.',
    whyKicker: 'Why ATHR',
    whyTitle: 'On your side from the first ring to signing the contract.',
    v1t: 'Top-company openings', v1b: 'We connect you with the biggest, best customer-service companies.',
    v2t: '100% free', v2b: 'No fees at all — not for registering, matching, or anything else.',
    v3t: 'Focused on your English', v3b: 'We assess your English and speaking skills properly and match you precisely.',
    v4t: 'With you all the way', v4b: 'We stay by your side at every stage until you start the job.',
    finalKicker: 'Ready to pick up the headset?',
    finalTitle: 'Register now and let us find the call center you deserve.',
    finalSub: 'It takes one minute, and our team starts hunting for your next opportunity.',
    finalCta: 'Register now',
    footer: '© ATHR — All rights reserved.',
  },
};
