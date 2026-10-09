export const policy = {
  ar: {
    title: 'سياسة بيانات المستخدمين',
    description: 'بيانات فاستقم، واتصالاته بالخدمات الخارجية، وخياراتك للخصوصية.',
    eyebrow: 'فاستقم · الخصوصية',
    intro: 'عبادتك تجربة شخصية. نوضح هنا ما يحفظه فاستقم، وما يُرسل عند استخدام الميزات المتصلة بالإنترنت.',
    updatedLabel: 'آخر تحديث',
    updatedDate: '٨ أكتوبر ٢٠٢٦',
    versionLabel: 'الإصدار 1.0',
    summaryTitle: 'الخصوصية في لمحة',
    summaryIntro: 'اقرأ التفاصيل وحدود كل ميزة أدناه.',
    summaries: [
      {
        icon: 'device',
        title: 'بيانات عبادتك تُحفظ محليًا',
        text: 'الملاحظات والعلامات وتقدم القراءة والمتابعة والتسبيح محلية، دون مزامنة إلى حساب سحابي.',
      },
      {
        icon: 'location',
        title: 'الموقع بحسب الميزة',
        text: 'المواقيت والقبلة محليتان؛ المساجد والخرائط ومعرفة البلد قد تستخدم خدمات خارجية.',
      },
      {
        icon: 'feedback',
        title: 'إرسال الملاحظات اختياري',
        text: 'نحتفظ بما ترسله من بلاغات وتصحيحات للاطلاع لاحقًا، دون مدة حذف محددة حاليًا.',
      },
    ],
    sections: [
      {
        id: 'overview',
        title: 'من المسؤول عن بياناتك؟',
        kicker: 'النطاق والمسؤول',
        html: `<p>المسؤول <strong>مطور تطبيق فاستقم</strong>؛ راسله عبر <a href="mailto:support.fastaqim@gmail.com">support.fastaqim@gmail.com</a> للاستفسار أو طلب خصوصية. تغطي السياسة التطبيق وميزاته المتصلة وهذا الموقع.</p>
<p>لا يتطلب الإصدار الحالي حسابًا أو تسجيل دخول، ولا يتضمن إعلانات أو تحليلات استخدام أو إرسالًا تلقائيًا لتقارير الأعطال. لا يرسل تلقائيًا تقدم العبادة أو الملاحظات إلى المطور. تتصل ميزات محددة بالخدمات الخارجية المذكورة أدناه.</p>`,
      },
      {
        id: 'local-data',
        title: 'ما الذي يُحفظ في التطبيق؟',
        kicker: 'التخزين على جهازك',
        html: `<p>يستخدم فاستقم قواعد بيانات وتفضيلات محلية لتذكّر اختياراتك واستكمال استخدامك:</p>
<ul><li>المظهر، وحجم الخط، والرواية، وطريقة حساب الصلاة، وإعدادات الصوت والإشعارات.</li><li>علامات القرآن، والتظليل، والملاحظات والتصنيفات، وموضع القراءة، وخطة الختم وتقدمها.</li><li>المتابعة اليومية للصلاة والورد والأذكار، وسلاسل الأيام، وعدّادات التسبيح والأذكار المخصصة وسجلها.</li><li>الموقع المختار أو آخر إحداثيات محفوظة ووقت حفظها، والمدينة أو البلد عند توفرهما.</li><li>المحتوى والصوتيات المنزّلة ومعلومات مهام التنزيل لاستكمالها.</li></ul>
<p>لا توجد مزامنة لهذه البيانات الشخصية إلى حساب سحابي في التطبيق الحالي. قد يدير نظام جهازك نسخًا احتياطية أو نقلًا للبيانات وفق إعداداته. لا تعني عبارة «محليًا» وعدًا بتشفير خاص لكل ملف أو استبعادًا للنسخ التي يديرها النظام.</p>`,
      },
      {
        id: 'location',
        title: 'كيف يُستخدم الموقع؟',
        kicker: 'المواقيت والقبلة والمساجد',
        html: `<p>يطلب التطبيق الموقع التقريبي أو الدقيق، بحسب إذن جهازك، لحساب مواقيت الصلاة واتجاه القبلة. هذه الحسابات تتم في التطبيق. يمكنك اختيار مدينة أو نقطة يدويًا بدل منح إذن الموقع؛ وعند تعذر الحصول على موقع مناسب قد تُستخدم مكة مؤقتًا مع تنبيه داخل التطبيق.</p>
<p>قد يستعين Android بخدمة معرفة البلد من الإحداثيات التابعة للنظام؛ واتصالها بالشبكة يعتمد على مزود الجهاز. عند استخدام قسم المساجد تُرسل إحداثيات مركز البحث ومسافته إلى Overpass، وقد يبدأ البحث عند فتح القسم إذا كان الإذن ممنوحًا. يُرسل نص البحث عن المدينة أو العنوان إلى Nominatim، وتكشف طلبات بلاطات الخريطة منطقة العرض لخدمة OpenStreetMap. فتح الاتجاهات ينقل وجهة المسجد إلى تطبيق الخرائط المختار.</p>`,
      },
      {
        id: 'downloads',
        title: 'تنزيل المحتوى وتشغيل الصوت',
        kicker: 'الاتصالات المطلوبة للميزة',
        html: `<p>يتصل التطبيق بخدمة المحتوى المستضافة على Supabase عند طلب كتب الحديث والتفاسير ومقدمات السور. تُستخدم طلبات التنزيل للحصول على المحتوى المطلوب وحفظه، ولا تتضمن رفع ملاحظاتك أو علاماتك أو سجل عبادتك.</p>
<p>يستخدم فهرس القراء MP3Quran، وتأتي التلاوات الكاملة من خوادم الصوت المرتبطة به. تستخدم التلاوة آيةً آية EveryAyah، وتأتي صوتيات الأذكار من Archive.org وGitHub Raw. عند التشغيل المتصل أو التنزيل يستقبل المزود طلب الملف وبيانات الاتصال المعتادة، مثل عنوان الإنترنت. على Android يمكن أن تستمر التنزيلات المطلوبة في الخلفية مع إشعار تقدم، وتُحفظ حالة المهام محليًا. يمكنك إلغاء التنزيل أو حذف الملفات من إدارة التخزين.</p>`,
      },
      {
        id: 'feedback',
        title: 'البلاغات والاقتراحات والتصحيحات',
        kicker: 'ما تختار إرساله',
        html: `<p>عند إرسال بلاغ فني أو اقتراح، يرسل التطبيق إلى Supabase القسم المختار، والعنوان، والوصف، وإصدار التطبيق، ومعلومات نظام التشغيل، ووقت الإرسال. إذا أدخلت وسيلة تواصل تُرسل أيضًا؛ هذا الحقل اختياري. عند اقتراح تصحيح، يُرسل القسم والنص المراد تصحيحه والنص المقترح، مع الدليل والملاحظات ووسيلة التواصل إذا أضفتها.</p>
<p>تُستخدم هذه المراسلات للاطلاع على المشكلات والاقتراحات ومراجعة التصحيحات، ولا يغيّر إرسال التصحيح المحتوى المنشور مباشرة. لا ترسل كلمات مرور أو معلومات هوية أو تفاصيل شخصية لا يحتاجها البلاغ. تتيح المراسلة بالبريد الاطلاع على عنوان المرسل ومحتوى رسالته عبر خدمة البريد التي تستخدمها.</p>`,
      },
      {
        id: 'permissions',
        title: 'الأذونات وخدمات الجهاز',
        kicker: 'لماذا يطلبها التطبيق؟',
        html: `<ul><li><strong>الموقع:</strong> للمواقيت والقبلة والبحث عن المساجد، مع بدائل يدوية.</li><li><strong>الإشعارات والمنبهات الدقيقة:</strong> للتذكير بالصلاة والأذكار والورد، ويمكن تعطيلها أو تعديل فئاتها.</li><li><strong>التشغيل والتنزيل في الخلفية:</strong> لاستمرار الصوت والتنزيل المطلوب، وعرض أدوات التحكم والتقدم.</li><li><strong>الاهتزاز وإبقاء الجهاز نشطًا واستقبال الإقلاع:</strong> للتفاعل وتشغيل الميزات واستعادة جدولة التذكيرات.</li></ul>
<p>لا يطلب التطبيق الحالي الوصول إلى جهات الاتصال أو الكاميرا أو الميكروفون أو صورك. لا يتضمن إذنًا مستقلًا لتتبع الموقع في الخلفية. قد تختلف أسماء الأذونات وآلية منحها بين أنظمة التشغيل. الإشعارات المحلية قد تظهر على شاشة القفل وفق إعدادات جهازك؛ يمكنك التحكم في ظهور محتواها من إعدادات النظام.</p>`,
      },
      {
        id: 'services',
        title: 'الخدمات الخارجية',
        kicker: 'من يستقبل طلبات الاتصال؟',
        html: `<p>تستقبل الخدمات الخارجية البيانات اللازمة للطلب عند استخدام الميزة المرتبطة بها، وقد تدير سجلات اتصالها وفق سياساتها وإعداداتها. روابط المعلومات المتاحة:</p>
<ul><li><a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer">Supabase</a>: استضافة المحتوى والبلاغات والتصحيحات.</li><li><a href="https://osmfoundation.org/wiki/Privacy_Policy" target="_blank" rel="noopener noreferrer">OpenStreetMap Foundation</a>: معلومات الخصوصية لخدماتها؛ بعض خوادم Overpass تُدار بصورة مستقلة.</li><li><a href="https://www.mp3quran.net/" target="_blank" rel="noopener noreferrer">MP3Quran</a>، <a href="https://everyayah.com/" target="_blank" rel="noopener noreferrer">EveryAyah</a>، <a href="https://archive.org/" target="_blank" rel="noopener noreferrer">Archive.org</a>: فهارس وملفات صوتية.</li><li><a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">GitHub</a>: ملفات صوتية واستضافة الموقع عند استخدامها.</li><li><a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">Cloudflare</a>: خدمات الموقع بحسب إعداد الاستضافة.</li></ul>
<p>قد يعالج مزوّدو الخدمات الطلبات خارج بلدك؛ لا تحدد الصفحة بلد كل خادم أو مدة سجلات المزودين. للخدمات الخارجية ممارساتها، ولا يحل رابط سياسة المزود محل توضيح استخدام فاستقم للبيانات.</p>`,
      },
      {
        id: 'retention',
        title: 'الاحتفاظ بالبيانات وحدود الحذف',
        kicker: 'بيان واضح عن المدة',
        html: `<p>تبقى البيانات المحلية ضمن تخزين التطبيق إلى أن تعدّلها أو تحذفها بالأدوات المتاحة، أو تمسح بيانات التطبيق من النظام. تختلف إزالة البيانات عند إلغاء تثبيت التطبيق وإدارة النسخ الاحتياطية بحسب جهازك وإعداداته.</p>
<p><strong>البلاغات والتصحيحات المرسلة لا تُحذف حاليًا، ويحتفظ بها المطور للاطلاع عليها لاحقًا دون مدة احتفاظ محددة.</strong> لا توجد آلية حذف تلقائي معلنة أو زر داخل التطبيق لحذفها من الخادم. يمكنك مراسلة المطور بشأن بيانات أرسلتها أو طلب متعلق بخصوصيتك. لا تفترض هذه السياسة تنفيذ الحذف تلقائيًا أو خلال مدة لم تُحدد. تخضع سجلات الخدمات الخارجية ونسخها الاحتياطية لإعداداتها، وحذف نسخة محلية لا يسحب رسالة سبق إرسالها.</p>`,
      },
      {
        id: 'choices',
        title: 'خياراتك للتحكم في البيانات',
        kicker: 'خطوات تستطيع اتخاذها',
        html: `<p>يمكنك رفض الموقع أو سحب إذنه من النظام واستخدام البدائل اليدوية، وتعطيل الإشعارات أو فئاتها، وعدم إرسال بلاغ أو تصحيح. تستطيع إزالة علامات القرآن والتظليل والملاحظات من أدواتها، وحذف الأذكار المخصصة، وحذف المحتوى والصوتيات المنزّلة من إدارة التخزين.</p>
<p>إعادة تعيين الإعدادات تعيد التفضيلات الافتراضية؛ ولا تمسح جميع سجلات المستخدم. مسح الذاكرة المؤقتة لا يحذف الملاحظات والتقدم أو الملفات الصوتية. لإزالة جميع بيانات التطبيق المحلية استخدم أدوات نظام جهازك، وراجع نسخ النظام الاحتياطية على حدة. عند مشاركة نص أو محتوى تختار الجهة المستقبلة من واجهة المشاركة؛ وتعامل الخدمة المختارة ما تشاركه وفق ممارساتها. لا حاجة لإنشاء حساب لممارسة هذه الخيارات.</p>`,
      },
      {
        id: 'children',
        title: 'الاستخدام لجميع الفئات العمرية',
        kicker: 'الأطفال وأولياء الأمور',
        html: `<p>فاستقم موجّه لجميع الفئات العمرية، بما فيها الأطفال، ولا يطلب تاريخ ميلاد أو إنشاء حساب. يستطيع الأطفال استخدام القراءة والأذكار دون إدخال اسم أو وسيلة تواصل. ينبغي أن يساعد ولي الأمر الطفل في إعداد الأذونات والميزات المتصلة بالإنترنت واختيار ما يشاركه مع خدمات أخرى.</p>
<p>نرجو تجنّب إرسال الطفل معلومات شخصية في البلاغات أو التصحيحات، والاكتفاء بما يصف المشكلة. يمكن لولي الأمر مراسلة <a href="mailto:support.fastaqim@gmail.com">support.fastaqim@gmail.com</a> بشأن رسالة أرسلها طفل أو سؤال متعلق ببياناته. لا تعني إتاحة التطبيق لكل الأعمار أن الخدمات الخارجية لها الشروط العمرية نفسها؛ قد تكون لها متطلبات مختلفة.</p>`,
      },
      {
        id: 'website',
        title: 'خصوصية هذا الموقع وتحديث السياسة',
        kicker: 'قراءة السياسة دون تسجيل',
        html: `<p>هذا الموقع صفحة ثابتة لعرض السياسة بالعربية والإنجليزية. لا يتضمن نماذج لجمع بيانات الزوار، أو إعلانات، أو أدوات تتبع أو تحليلات مضافة، ولا ينشئ ملفات تعريف ارتباط. بعد اختيار المظهر يُحفظ تفضيل العرض في <span lang="en" dir="ltr">localStorage</span> داخل متصفحك؛ ويمكن إزالته بمسح بيانات الموقع.</p>
<p>عند استضافة الموقع على GitHub Pages أو عبر Cloudflare قد تستقبل جهة الاستضافة عنوان الإنترنت وبيانات الطلب وسجلات تشغيل أو أمان بحسب إعداد الخدمة. زر البريد يفتح برنامج البريد لإرسال ما تختاره. نحدّث النص عند تغيير الممارسات ذات الصلة؛ تاريخ «آخر تحديث» يعبّر عن مراجعة هذه النسخة، ولا يعني أن الموقع نُشر في ذلك التاريخ.</p>`,
      },
    ],
    contact: {
      title: 'لديك استفسار عن بياناتك؟',
      text: 'راسل المطور بشأن السياسة أو بيانات أرسلتها أو طلب خصوصية، بالتفاصيل اللازمة فقط.',
      button: 'راسل المطور',
    },
    footer: 'فاستقم · سياسة بيانات المستخدمين · الإصدار 1.0',
  },
  en: {
    title: 'User data policy',
    description: 'Fastaqim data storage, external connections and your choices.',
    eyebrow: 'Fastaqim · Privacy',
    intro: 'Your worship is personal. Understand what Fastaqim stores and sends through connected features.',
    updatedLabel: 'Last updated',
    updatedDate: '8 October 2026',
    versionLabel: 'Version 1.0',
    summaryTitle: 'Privacy at a glance',
    summaryIntro: 'Read the details and limits below.',
    summaries: [
      {
        icon: 'device',
        title: 'Worship records are stored locally',
        text: 'Notes, bookmarks, reading, tracking and tasbih records have no cloud-account sync.',
      },
      {
        icon: 'location',
        title: 'Location use depends on the feature',
        text: 'Prayer times and Qibla are local. Mosque search, maps and country lookup may contact external services.',
      },
      {
        icon: 'feedback',
        title: 'Sending feedback is optional',
        text: 'Submitted feedback is retained for later review, without a defined deletion period.',
      },
    ],
    sections: [
      {
        id: 'overview',
        title: 'Who is responsible for your data?',
        kicker: 'Scope and contact',
        html: `<p>The <strong>Fastaqim app developer</strong> is responsible. Contact <a href="mailto:support.fastaqim@gmail.com">support.fastaqim@gmail.com</a> with questions or privacy requests. This policy covers the app, connected features and policy website.</p>
<p>The current app requires no account or login and contains no ads, usage analytics or automatic crash-reporting SDK. It does not automatically upload worship progress or personal notes. Particular features contact the external services below.</p>`,
      },
      {
        id: 'local-data',
        title: 'What is stored in the app?',
        kicker: 'Storage on your device',
        html: `<p>Fastaqim uses local databases and preferences to remember:</p>
<ul><li>Appearance, font size, Quran narration, prayer calculation method, audio and notification settings.</li><li>Quran bookmarks, highlights, notes, categories, reading position and khatm plans and progress.</li><li>Daily prayer, Quran and adhkar tracking, streaks, tasbih counters, custom adhkar and their history.</li><li>Your selected location or last saved coordinates, their timestamp, and city or country when available.</li><li>Downloaded content and audio, and information needed to resume downloads.</li></ul>
<p>There is no cloud sync. Your system may manage backups or device transfers. Local storage does not imply special file encryption or exclusion from system backups.</p>`,
      },
      {
        id: 'location',
        title: 'How is location used?',
        kicker: 'Prayer times, Qibla and mosques',
        html: `<p>Approximate or precise location, depending on permission, supports local prayer-time and Qibla calculations. You can choose a city or map point instead. If no suitable location is available, the app may temporarily use Makkah and show a notice.</p>
<p>Android's geocoding service may identify the country from coordinates; network use depends on the device provider. Mosque search sends coordinates and search radius to Overpass and may start when you open that section with permission granted. City or address searches send the entered text to Nominatim. Map-tile requests reveal the viewed area to OpenStreetMap. Opening directions passes the mosque destination to your chosen maps app.</p>`,
      },
      {
        id: 'downloads',
        title: 'Content downloads and audio',
        kicker: 'Connections used by the feature',
        html: `<p>Requests for hadith books, tafsir and surah introductions contact content hosted on Supabase. These download requests retrieve content; they do not upload your notes, bookmarks or worship history.</p>
<p>The reciter catalogue uses MP3Quran, with full recitations from its associated audio servers. Verse-by-verse playback uses EveryAyah. Adhkar audio comes from Archive.org and GitHub Raw. Streaming and downloads send file requests and ordinary connection data, such as your IP address, to the provider. On Android, requested downloads can continue in the background with a progress notification and locally saved task state. You can cancel transfers or delete downloads in storage management.</p>`,
      },
      {
        id: 'feedback',
        title: 'Reports, suggestions and corrections',
        kicker: 'Information you choose to send',
        html: `<p>Submitting a technical report or suggestion sends its category, title, description, app version, operating-system information and submission time to Supabase. Contact details are included only if you enter them. A correction sends the section, original text and proposed replacement, plus evidence, notes or contact details you add.</p>
<p>These messages support review of issues, suggestions and corrections. Submitting a correction does not directly change published content. Avoid passwords, identity documents and unnecessary personal details. If you contact the developer by email, the message and sender address are handled through the email service you use.</p>`,
      },
      {
        id: 'permissions',
        title: 'Permissions and device services',
        kicker: 'Why the app uses them',
        html: `<ul><li><strong>Location:</strong> prayer times, Qibla and mosque search, with manual alternatives.</li><li><strong>Notifications and exact alarms:</strong> prayer, adhkar and Quran reminders, with controls for their categories.</li><li><strong>Background playback and downloads:</strong> continued audio and requested transfers, with controls and progress.</li><li><strong>Vibration, wake services and boot handling:</strong> interaction, feature operation and restoring reminder schedules.</li></ul>
<p>The current app requests no contacts, camera, microphone or photo access, and no separate background-location permission. Permission names and controls vary by operating system. Local notifications may appear on the lock screen according to your device settings; those settings control whether their content is visible.</p>`,
      },
      {
        id: 'services',
        title: 'External services',
        kicker: 'Who receives connection requests?',
        html: `<p>External providers receive data needed for the feature request and may maintain connection logs under their own policies and settings:</p>
<ul><li><a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer">Supabase</a>: content hosting, reports and corrections.</li><li><a href="https://osmfoundation.org/wiki/Privacy_Policy" target="_blank" rel="noopener noreferrer">OpenStreetMap Foundation</a>: privacy information for its services; some Overpass servers have independent operators.</li><li><a href="https://www.mp3quran.net/" target="_blank" rel="noopener noreferrer">MP3Quran</a>, <a href="https://everyayah.com/" target="_blank" rel="noopener noreferrer">EveryAyah</a> and <a href="https://archive.org/" target="_blank" rel="noopener noreferrer">Archive.org</a>: audio catalogues and files.</li><li><a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">GitHub</a>: audio files and website hosting when used.</li><li><a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">Cloudflare</a>: website services according to the hosting configuration.</li></ul>
<p>Providers may process requests outside your country; server locations and log-retention periods are not specified here. Their notices do not replace Fastaqim's explanation of its practices.</p>`,
      },
      {
        id: 'retention',
        title: 'Retention and deletion limits',
        kicker: 'Current retention practice',
        html: `<p>Local data remains until changed, removed through available tools or cleared through device settings. Uninstallation and system backups depend on your device and its configuration.</p>
<p><strong>Submitted reports and corrections are not currently deleted. The developer retains them for later review without a defined retention period.</strong> There is no automatic deletion process or in-app server-deletion control. You can email about submitted data or a privacy request, without an automatic-deletion promise or stated deadline. External logs and backups depend on provider settings. Local deletion does not withdraw a sent message.</p>`,
      },
      {
        id: 'choices',
        title: 'Your controls and choices',
        kicker: 'Actions available to you',
        html: `<p>You can refuse or revoke location permission, use manual alternatives, disable reminders or their categories, and choose not to submit feedback. You can remove Quran bookmarks, highlights and notes, delete custom adhkar, and remove downloaded content and audio through storage management.</p>
<p>Resetting settings restores preferences, without erasing every record. Clearing the image cache leaves notes, progress and audio intact. Use device data-clearing tools for all local app data; review backups separately. Sharing content passes it to your chosen recipient, whose practices apply. No account is needed.</p>`,
      },
      {
        id: 'children',
        title: 'Use by all age groups',
        kicker: 'Children and guardians',
        html: `<p>Fastaqim is for all ages, including children, without birthdays or accounts. Reading and adhkar need no name or contact details. Guardians should help children configure permissions and connected features and decide what to share.</p>
<p>Children should avoid personal information in reports or corrections and describe only the issue. A guardian can contact <a href="mailto:support.fastaqim@gmail.com">support.fastaqim@gmail.com</a> about a child's message or data. Availability to all ages does not mean external services have identical age requirements; their terms may differ.</p>`,
      },
      {
        id: 'website',
        title: 'This website and policy updates',
        kicker: 'Read without signing up',
        html: `<p>This static policy website supports Arabic and English. It contains no data-collection forms, ads, added trackers or analytics, and creates no cookies. After you choose a theme, localStorage remembers that display preference in your browser. Clearing site data removes it.</p>
<p>When hosted on GitHub Pages or through Cloudflare, hosting providers may receive IP addresses, request data and operational or security logs according to the service configuration. The email button opens your email app. We update this text when relevant practices change. “Last updated” identifies this version's review date and does not mean the website was published then.</p>`,
      },
    ],
    contact: {
      title: 'A question about your data?',
      text: 'Email about this policy, submitted data or privacy requests. Include only necessary details.',
      button: 'Contact the developer',
    },
    footer: 'Fastaqim · User data policy · Version 1.0',
  },
};
