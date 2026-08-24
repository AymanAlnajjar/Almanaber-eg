<?php

namespace Database\Seeders;

use App\Models\Blog;
use Illuminate\Database\Seeder;

class BlogSeeder extends Seeder
{
    public function run(): void
    {
        $blogs = [
            [
                'title_en' => 'Top 5 Mistakes to Avoid in Architectural Design',
                'title_ar' => 'أبرز 5 أخطاء يجب تجنبها في التصميم المعماري',
                'description_en' => 'Common pitfalls that delay projects and inflate budgets — and how to avoid them from day one.',
                'description_ar' => 'الأخطاء الشائعة التي تؤخر المشاريع وترفع التكاليف — وكيف تتجنبها منذ البداية.',
                'content_en' => '<p>Architectural design is both an art and a science. Whether you are developing a commercial complex, a residential compound, or an industrial facility, the early design decisions can make or break the entire project.</p><p>Here are the five most common mistakes we see — and exactly how to avoid them.</p><h2>1. Skipping Detailed Site Analysis</h2><p>Understanding the soil type, sun orientation, wind patterns, and neighboring structures is essential before a single line is drawn. Skipping this step often leads to costly redesigns later.</p><h2>2. Ignoring Building Permits Early</h2><p>Every municipality has specific zoning rules, setbacks, and height limits. Designing without confirming these first leads to rejected permits and wasted design fees.</p><h2>3. Underestimating MEP Coordination</h2><p>Mechanical, Electrical, and Plumbing systems must be coordinated with the architectural layout from the start — not added as an afterthought.</p><h2>4. Overlooking Future Expansion</h2><p>Great buildings are designed with flexibility in mind. A facility that cannot accommodate future growth becomes obsolete quickly.</p><h2>5. Poor Communication with the Client</h2><p>Regular design reviews and clear documentation prevent misunderstandings that lead to expensive change orders during construction.</p>',
                'content_ar' => '<p>التصميم المعماري فن وعلم في آنٍ واحد. سواء كنت تطور مجمعًا تجاريًا أو مجمع سكني أو منشأة صناعية، فإن قرارات التصميم المبكرة يمكن أن تحدد مصير المشروع بأكمله.</p><p>إليك أبرز خمسة أخطاء شائعة نرصدها — وكيف تتجنبها تحديدًا.</p><h2>١. تجاهل تحليل الموقع المفصّل</h2><p>فهم طبيعة التربة وتوجيه الشمس وأنماط الرياح والمباني المجاورة أمر ضروري قبل رسم أي خط. تجاوز هذه الخطوة يؤدي في الغالب إلى إعادة تصميم مكلفة لاحقًا.</p><h2>٢. إغفال رخص البناء في المراحل المبكرة</h2><p>لكل بلدية قواعد محددة للتخطيط العمراني والارتدادات وحدود الارتفاع. التصميم دون التحقق منها أولًا يؤدي إلى رفض الرخص وإهدار رسوم التصميم.</p><h2>٣. الاستهانة بتنسيق أنظمة MEP</h2><p>يجب تنسيق أنظمة الميكانيكا والكهرباء والسباكة مع المخطط المعماري منذ البداية — لا إضافتها كفكرة ثانوية.</p><h2>٤. إغفال التوسعات المستقبلية</h2><p>المباني الجيدة تُصمَّم بمرونة. المنشأة التي لا تستوعب النمو المستقبلي تصبح متقادمة بسرعة.</p><h2>٥. ضعف التواصل مع العميل</h2><p>مراجعات التصميم المنتظمة والتوثيق الواضح يمنعان سوء الفهم الذي يؤدي إلى أوامر تغيير مكلفة خلال الإنشاء.</p>',
                'category' => 'tips_and_guides',
                'author' => 'AlMnabr Team',
                'read_time' => 5,
                'publish_date' => now()->subDays(7)->toDateString(),
                'is_published' => true,
                'show_on_homepage' => true,
                'sort_order' => 30,
            ],
            [
                'title_en' => 'How Fire & Life Safety Design Protects Your Investment',
                'title_ar' => 'كيف يحمي تصميم السلامة من الحريق استثمارك',
                'description_en' => 'Fire safety is not just a regulatory requirement — it is a core part of responsible building design that protects lives and assets.',
                'description_ar' => 'السلامة من الحريق ليست مجرد متطلب تنظيمي — بل هي جزء أساسي من التصميم المسؤول الذي يحمي الأرواح والأصول.',
                'content_en' => '<p>When people think about building design, fire and life safety often comes as an afterthought. In reality, it should be integrated from the very first design stage.</p><h2>Why Early Integration Matters</h2><p>Retrofitting fire suppression systems, exit corridors, or smoke control mechanisms after the building is designed is significantly more expensive than planning for them from the start. Early integration also ensures that safety features blend seamlessly into the architecture rather than appearing bolted on.</p><h2>Key Systems to Plan For</h2><ul><li>Automatic sprinkler systems</li><li>Fire alarm and detection networks</li><li>Emergency lighting and exit signage</li><li>Smoke exhaust and pressurization systems</li><li>Fire-rated compartmentalization</li></ul><h2>Regulatory Compliance in Saudi Arabia</h2><p>Saudi Civil Defense regulations set minimum standards for all building types. Non-compliance can result in permit refusals, forced modifications, or — in the worst case — liability in the event of an incident.</p><p>At AlMnabr, our fire and life safety engineers work alongside our architects from day one to ensure every project is compliant, safe, and cost-efficient.</p>',
                'content_ar' => '<p>عندما يفكر الناس في تصميم المباني، غالبًا ما تأتي السلامة من الحريق والحياة كفكرة لاحقة. في الواقع، يجب دمجها منذ مرحلة التصميم الأولى.</p><h2>لماذا يهم الدمج المبكر</h2><p>تجهيز أنظمة إخماد الحرائق وممرات الخروج أو آليات التحكم في الدخان بعد تصميم المبنى أكثر تكلفةً بكثير من التخطيط لها منذ البداية. كما يضمن الدمج المبكر أن تندمج عناصر السلامة بسلاسة في التصميم المعماري.</p><h2>الأنظمة الرئيسية التي يجب التخطيط لها</h2><ul><li>أنظمة الرش التلقائي</li><li>شبكات إنذار الحريق والكشف عنه</li><li>إضاءة الطوارئ ولافتات مخارج الطوارئ</li><li>أنظمة سحب الدخان والضغط</li><li>التجزئة المقاومة للحريق</li></ul><h2>الامتثال التنظيمي في المملكة العربية السعودية</h2><p>تضع لوائح الدفاع المدني السعودي معايير دنيا لجميع أنواع المباني. عدم الامتثال قد يؤدي إلى رفض التصاريح أو التعديلات القسرية أو المسؤولية القانونية في حالة وقوع حادث.</p><p>في المنابر، يعمل مهندسو السلامة من الحريق جنبًا إلى جنب مع مهندسينا المعماريين منذ اليوم الأول لضمان امتثال كل مشروع وسلامته وكفاءته من حيث التكلفة.</p>',
                'category' => 'tips_and_guides',
                'author' => 'AlMnabr Team',
                'read_time' => 4,
                'publish_date' => now()->subDays(14)->toDateString(),
                'is_published' => true,
                'show_on_homepage' => true,
                'sort_order' => 20,
            ],
            [
                'title_en' => 'AlMnabr Achieves Key Milestone on Dammam Industrial Project',
                'title_ar' => 'المنابر تحقق معلمًا رئيسيًا في مشروع الدمام الصناعي',
                'description_en' => 'Our project management team completed the structural supervision phase ahead of schedule, setting a new standard for delivery timelines.',
                'description_ar' => 'أتم فريق إدارة المشاريع لدينا مرحلة الإشراف الإنشائي قبل الموعد المحدد، مما يضع معيارًا جديدًا لجداول التسليم.',
                'content_en' => '<p>We are pleased to announce a significant milestone on our ongoing Dammam Industrial Facility project. The structural supervision phase has been completed two weeks ahead of the original project schedule.</p><h2>What This Means</h2><p>Completing this phase early provides the construction team with additional flexibility to address any unforeseen challenges in the MEP installation phase without impacting the overall delivery date.</p><h2>How We Achieved It</h2><p>Our on-site supervision team implemented a daily coordination protocol with the contractor, catching potential conflicts before they became problems. We also introduced a digital punch-list system that reduced inspection-to-correction cycle times by 40%.</p><h2>Looking Ahead</h2><p>The next phase — MEP systems installation and commissioning — begins next month. We expect to maintain the current momentum and deliver the project to our client on time and within budget.</p>',
                'content_ar' => '<p>يسعدنا الإعلان عن معلم مهم في مشروع المنشأة الصناعية في الدمام الجاري تنفيذه. اكتملت مرحلة الإشراف الإنشائي قبل أسبوعين من الجدول الزمني الأصلي للمشروع.</p><h2>ما الذي يعنيه ذلك</h2><p>الانتهاء من هذه المرحلة مبكرًا يمنح فريق البناء مرونة إضافية للتعامل مع أي تحديات غير متوقعة في مرحلة تركيب أنظمة MEP دون التأثير على موعد التسليم الإجمالي.</p><h2>كيف حققنا ذلك</h2><p>نفّذ فريق الإشراف الميداني لدينا بروتوكول تنسيق يومي مع المقاول، مما أتاح رصد التعارضات المحتملة قبل أن تتحول إلى مشاكل. كما أدخلنا نظامًا رقميًا لقوائم الفحص أدى إلى تقليص دورات الفحص والتصحيح بنسبة 40%.</p><h2>المرحلة القادمة</h2><p>تبدأ المرحلة التالية — تركيب أنظمة MEP وتشغيلها — الشهر المقبل. نتوقع الحفاظ على الزخم الحالي وتسليم المشروع لعميلنا في الوقت المحدد وضمن الميزانية.</p>',
                'category' => 'company_news',
                'author' => 'AlMnabr Team',
                'read_time' => 3,
                'publish_date' => now()->subDays(3)->toDateString(),
                'is_published' => true,
                'show_on_homepage' => true,
                'sort_order' => 10,
            ],
        ];

        foreach ($blogs as $blog) {
            Blog::firstOrCreate(
                ['title_en' => $blog['title_en']],
                $blog
            );
        }
    }
}
