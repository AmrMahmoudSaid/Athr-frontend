export type Lang = 'ar' | 'en';

export interface Dict {
  brandTitle: string;
  brandSub: string;
  heading: string;
  sub: string;
  lblName: string; phName: string; errName: string;
  lblPhone: string; phPhone: string; errPhone: string;
  lblAge: string; phAge: string; errAge: string;
  lblLocation: string; phLocation: string; errLocation: string;
  lblLevel: string; errLevel: string;
  lvlA1: string; lvlA2: string; lvlB1: string; lvlB2: string; lvlC1: string; lvlC2: string;
  lblAvail: string; availFull: string; availPart: string; errAvail: string;
  lblWork: string; phWork: string;
  lblReferrals: string; optional: string; phReferrals: string;
  lblVoice: string; voiceHint: string;
  vStart: string; vStop: string; vDelete: string; vMax: string;
  vRecording: string; vReady: string; vMaxReached: string; vNoMic: string;
  submit: string; submitting: string;
  errGeneric: string; errDup: string; errNet: string;
  doneTitle: string; doneBody: string; again: string;
}

export const I18N: Record<Lang, Dict> = {
  ar: {
    brandTitle: 'اكتشف <b>موهبتك</b><br/>واصنع <b>أثرك</b>.',
    brandSub: 'سجّل بياناتك دلوقتي وكن جزء من المجتمع. خطوة واحدة بس وهنتواصل معاك في أقرب وقت.',
    heading: 'سجّل معانا',
    sub: 'املأ بياناتك بالظبط عشان نقدر نتواصل معاك صح.',
    lblName: 'الاسم بالكامل', phName: 'مثال: أحمد محمد علي', errName: 'اكتب اسمك بالكامل من فضلك.',
    lblPhone: 'رقم الموبايل', phPhone: '01xxxxxxxxx', errPhone: 'اكتب رقم موبايل صحيح (11 رقم).',
    lblAge: 'السن', phAge: 'مثال: 19', errAge: 'السن لازم يكون بين 10 و 100.',
    lblLocation: 'المحافظة / المكان', phLocation: 'مثال: الجيزة', errLocation: 'اكتب مكانك من فضلك.',
    lblLevel: 'مستوى الإنجليزي', errLevel: 'اختار مستوى الإنجليزي بتاعك.',
    lvlA1: 'مبتدئ', lvlA2: 'أساسي', lvlB1: 'متوسط', lvlB2: 'فوق المتوسط', lvlC1: 'متقدّم', lvlC2: 'إتقان',
    lblAvail: 'نوع الدوام', availFull: 'دوام كامل', availPart: 'دوام جزئي', errAvail: 'اختار نوع الدوام.',
    lblWork: 'الخبرة العملية', phWork: 'اكتب خبراتك في خدمة العملاء أو الكول سنتر (لو موجودة)',
    lblReferrals: 'عايز ترشّح حد؟', optional: '(اختياري)', phReferrals: 'اكتب اسمه ورقم موبايله',
    lblVoice: 'رسالة صوتية', voiceHint: 'اختياري، لكن يُفضَّل — تسجيل رسالة صوتية قصيرة بيساعدنا نراجع طلبك أسرع.',
    vStart: 'ابدأ التسجيل', vStop: 'إيقاف التسجيل', vDelete: 'حذف التسجيل', vMax: '(الحد الأقصى ٣ دقائق)',
    vRecording: 'جاري التسجيل...', vReady: 'تم التسجيل — تقدر تسمعه قبل الإرسال.', vMaxReached: 'وصلت للحد الأقصى (٣ دقائق).',
    vNoMic: 'مش قادرين نوصل للميكروفون. اتأكد إنك سمحت بالإذن.',
    submit: 'سجّل دلوقتي', submitting: 'بنسجّل...',
    errGeneric: 'حصل خطأ، حاول تاني.', errDup: 'رقم الموبايل ده متسجّل قبل كده.', errNet: 'مفيش اتصال بالسيرفر دلوقتي.',
    doneTitle: 'تم تسجيلك بنجاح 🎉', doneBody: 'استلمنا بياناتك وهنتواصل معاك قريب. شكرًا إنك بقيت جزء من ATHR.', again: 'تسجيل شخص تاني',
  },
  en: {
    brandTitle: 'Discover your <b>talent</b><br/>and create your <b>impact</b>.',
    brandSub: 'Register now and become part of the community. One step and we will reach out to you soon.',
    heading: 'Register with us',
    sub: 'Fill in your details so we can reach you correctly.',
    lblName: 'Full name', phName: 'e.g. Ahmed Mohamed Ali', errName: 'Please enter your full name.',
    lblPhone: 'Phone number', phPhone: '01xxxxxxxxx', errPhone: 'Enter a valid 11-digit number.',
    lblAge: 'Age', phAge: 'e.g. 19', errAge: 'Age must be between 10 and 100.',
    lblLocation: 'Location', phLocation: 'e.g. Giza', errLocation: 'Please enter your location.',
    lblLevel: 'English level', errLevel: 'Please pick your English level.',
    lvlA1: 'Beginner', lvlA2: 'Elementary', lvlB1: 'Intermediate', lvlB2: 'Upper-int.', lvlC1: 'Advanced', lvlC2: 'Proficient',
    lblAvail: 'Availability', availFull: 'Full-time', availPart: 'Part-time', errAvail: 'Please choose your availability.',
    lblWork: 'Work experience', phWork: 'Tell us about your customer-service or call-center experience (if any)',
    lblReferrals: 'Want to refer someone?', optional: '(optional)', phReferrals: 'Their name and phone number',
    lblVoice: 'Voice note', voiceHint: 'Optional, but recommended — recording a short voice note can help speed up your application review.',
    vStart: 'Start recording', vStop: 'Stop recording', vDelete: 'Delete recording', vMax: '(max 3 minutes)',
    vRecording: 'Recording...', vReady: 'Recorded — you can listen before submitting.', vMaxReached: 'Maximum length reached (3 minutes).',
    vNoMic: "Couldn't access the microphone. Make sure you allowed permission.",
    submit: 'Register now', submitting: 'Submitting...',
    errGeneric: 'Something went wrong, please try again.', errDup: 'This phone number is already registered.', errNet: 'No connection to the server right now.',
    doneTitle: "You're registered! 🎉", doneBody: "We got your details and we'll be in touch soon. Welcome to ATHR.", again: 'Register another',
  },
};
