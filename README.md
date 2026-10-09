# سياسة الخصوصية — فاستقم

مشروع موقع مستقل بالعربية والإنجليزية، بهوية فاستقم وأصوله المحلية. يُنشر مجلد `public/` وحده؛ لا يحتاج الموقع إلى حزم npm أو قاعدة بيانات أو خادم تطبيق.

آخر مراجعة للكود الذي تستند إليه السياسة: **٨ أكتوبر ٢٠٢٦**. يصف النص سلوك التطبيق المفحوص وإجابات مالك المشروع؛ لا يمثل شهادة امتثال قانوني. البلاغات والتصحيحات تُحفظ حاليًا دون حذف أو مدة محددة، وسجلات الخدمات الخارجية تخضع لإعدادات مزوّديها. راجع السياسة قبل إضافة حسابات أو مزامنة أو تحليلات أو تغيير طريقة التعامل مع البيانات.

## المعاينة المحلية

من هذا المجلد، باستخدام Node.js حديث:

```powershell
node scripts/build.mjs
node scripts/check.mjs
node scripts/serve.mjs
```

افتح [العربية](http://localhost:8080/) أو [الإنجليزية](http://localhost:8080/en/). أوقف المعاينة باستخدام `Ctrl+C`.

| المسار | وظيفته |
| --- | --- |
| `src/policy-content.mjs` | النص والمعلومات المشتركة للسياسة |
| `scripts/build.mjs` | توليد الصفحتين من مصدر المحتوى |
| `scripts/check.mjs` | التحقق من الملفات والروابط والإعدادات المحلية |
| `scripts/serve.mjs` | المعاينة المحلية على المنفذ ٨٠٨٠ |
| `public/` | الملفات الجاهزة للنشر فقط |
| `public/assets/` | الشعار وأيقونة الموقع والخطوط المحلية وترخيصها |
| `public/styles.css` و`public/app.js` | التنسيق وأدوات المظهر والفهرس والقراءة |
| `DATA-AUDIT.md` | ملاحظات مراجعة البيانات للتطوير؛ لا تُنشر مع الموقع |
| `verification/` | مخرجات التحقق والمعاينة؛ لا تُنشر مع الموقع |

بعد تعديل النص في `src/policy-content.mjs`، شغّل البناء والتحقق مجددًا وراجع اللغتين. روابط الأصول واللغة نسبية لتعمل أيضًا عند نشر المشروع تحت مسار مثل `/<repository>/` في GitHub Pages. لا يوجد ملف `CNAME` أو نطاق مفترض؛ يُختار النطاق عند النشر.

## النشر على Cloudflare Pages

هذا مسار استضافة للموقع على Cloudflare Pages، ويمكن أن يستخدم مستودع GitHub كمصدر الملفات.

1. ارفع المشروع إلى مستودع مستقل بعد المراجعة، مع ملفات `public/` الناتجة عن البناء.
2. في Cloudflare افتح **Workers & Pages → Create application → Pages → Import an existing Git repository**، واختر المستودع.
3. اختر فرع الإنتاج `main` وإعداد الإطار **None**، واترك **Build command** فارغًا، واجعل **Build output directory** هو `public`. اترك **Root directory** فارغًا عندما يكون هذا المشروع في جذر المستودع. [إعدادات البناء الرسمية](https://developers.cloudflare.com/pages/configuration/build-configuration/).
4. انشر، ثم افتح عنوان `pages.dev` الناتج وتحقق من العربية والإنجليزية والأصول.
5. لربط نطاق، افتح **مشروع Pages → Custom domains → Set up a domain** أولًا. للنطاق الرئيسي أضفه كمنطقة في حساب Cloudflare واضبط nameservers؛ وللنطاق الفرعي اتبع إعداد CNAME إلى عنوان مشروعك `pages.dev` المعروض. [دليل النطاقات الرسمي](https://developers.cloudflare.com/pages/configuration/custom-domains/).

هذا الإعداد ينشر النسخة الموجودة في `public/` دون إعادة توليدها على Cloudflare؛ لذلك أعد البناء والتحقق محليًا قبل كل رفع. لا تضبط هذا النطاق على GitHub Pages في الوقت نفسه.

## النشر على GitHub Pages مع Cloudflare DNS

هذا مسار آخر: **GitHub Pages يستضيف الموقع**، وCloudflare يدير DNS للنطاق الاختياري. لا تحتاج إلى إنشاء مشروع Cloudflare Pages لهذا المسار.

1. ضع المشروع في جذر مستودع مستقل على GitHub، بفرع `main`. تحقق من إتاحة GitHub Pages لنوع المستودع وخطة حسابك؛ المستودع العام مدعوم في GitHub Free.
2. افتح **Settings → Pages → Build and deployment → Source** واختر **GitHub Actions**.
3. ملف `.github/workflows/pages.yml` يبني ويفحص المشروع، ثم يرفع `public/` وحده. يعمل عند الرفع إلى `main`، أو يدويًا من **Actions → Publish privacy policy → Run workflow**. [دليل workflows الرسمي](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
4. افتح عنوان الموقع من خطوة النشر؛ العربية في الجذر والإنجليزية في `en/`.
5. عند اختيار نطاق لاحقًا، أضفه في **GitHub Settings → Pages → Custom domain** قبل تعديل DNS. لنطاق فرعي مثل `privacy.example.com`، أنشئ في Cloudflare DNS سجل `CNAME` للاسم `privacy` يشير إلى `<account>.github.io`، دون اسم المستودع أو مساره، واختر **DNS only**. اتبع التحقق الرسمي وأفعِل **Enforce HTTPS** عند إتاحته. لإعداد نطاق رئيسي استخدم سجلات GitHub المنشورة في [دليل النطاقات الرسمي](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

عند استخدام workflow مخصص لا يحتاج GitHub Pages إلى `CNAME` في الملفات. إعداد DNS only هنا يستخدم Cloudflare لإدارة DNS؛ لا يضيف معالجة Cloudflare Pages أو رؤوس `_headers` إلى موقع GitHub Pages.

## إعدادات الخصوصية والأمان عند الاستضافة

كل الخطوط والصور وملفات التنسيق والسكربتات من أصول الموقع نفسه. لا تضف تحليلات أو خطوطًا خارجية أو نماذج استقبال دون مراجعة النص والإعدادات.

`public/_headers` يضع سياسة CSP ورؤوس الأمان لاستجابات الملفات الثابتة على Cloudflare Pages. يمنع الاتصالات البرمجية الخارجية والتضمين، ويعطل الموقع والكاميرا والميكروفون. [صيغة الرؤوس وحدودها الرسمية](https://developers.cloudflare.com/pages/configuration/headers/).

GitHub Pages لا يطبق ملف `_headers`؛ وجوده ضمن الملفات لا يثبت إرسال الرؤوس هناك. راجع رؤوس الاستجابة الفعلية عند اختيار الاستضافة، ولا تعتبر فحص الملفات بديلًا عن فحص الموقع المنشور.

في Cloudflare اترك **Web Analytics** غير مفعّل للمشروع، وعطّل **Rocket Loader** وأي ميزة تضيف JavaScript تلقائيًا للنطاق، مثل **Email Address Obfuscation** أو تكاملات Zaraz. قد يضيف المزود سكربتات بعد رفع الملفات، فتخالف سياسة المصادر المحلية أو يمنعها CSP. إذا قررت تفعيلها، راجع سياسة الخصوصية وCSP ثم اختبر النسخة المنشورة. [Web Analytics على Pages](https://developers.cloudflare.com/pages/how-to/web-analytics/)، [Rocket Loader وCSP](https://developers.cloudflare.com/speed/optimization/content/rocket-loader/).

بعد النشر راجع الصفحتين على الهاتف والحاسوب، الطباعة وروابط التواصل، وتأكد في أدوات المتصفح من تحميل الأصول محليًا وعدم وجود أخطاء CSP أو تحليلات محقونة. يظل مزود الاستضافة قادرًا على معالجة بيانات طلبات الويب وفق إعداداته وسياساته؛ الموقع لا يحدد مدد الاحتفاظ لديه.

لم يُنفَّذ نشر أو إعداد نطاق أو ربط للموقع داخل تطبيق Flutter ضمن تجهيز هذا المشروع.
