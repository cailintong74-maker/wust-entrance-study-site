window.WUST_KNOWLEDGE = [
  {
    topic_en: "Mathematical Logic and Basic Set Theory",
    topic_cn: "数学逻辑与基础集合论",
    exam_focus: [
      "Understand propositions, negation, conjunction, disjunction, implication, converse, and tautology.",
      "Use quantifiers ∀ and ∃ in simple mathematical statements.",
      "Work with finite sets and real-number sets using ∪, ∩, ∖, complement, subset, and element notation.",
      "Prove set identities by taking an arbitrary element and proving both inclusions."
    ],
    key_terms: [
      ["proposition", "命题"],
      ["tautology", "重言式"],
      ["converse", "逆命题"],
      ["quantifier", "量词"],
      ["subset", "子集"]
    ],
    methods: [
      "For implication P ⇒ Q, it is false only when P is true and Q is false.",
      "For set proofs, translate membership into plain conditions, simplify the conditions, then translate back.",
      "For quantified statements, identify the universe first, then decide whether the statement is universal or existential."
    ],
    mistakes: [
      "Confusing P ⇒ Q with Q ⇒ P.",
      "Forgetting the universe when finding complements.",
      "Treating ∈ and ⊂ as the same symbol."
    ]
  },
  {
    topic_en: "Real Numbers",
    topic_cn: "实数",
    exam_focus: [
      "Simplify powers, roots, absolute values, and logarithms exactly.",
      "State domain restrictions for roots and logarithms.",
      "Compare radicals without decimal approximation.",
      "Use exponent and logarithm laws in simple equations."
    ],
    key_terms: [
      ["radical", "根式"],
      ["absolute value", "绝对值"],
      ["domain", "定义域"],
      ["logarithm", "对数"],
      ["exact value", "精确值"]
    ],
    methods: [
      "For √a ÷ √b, combine only when both expressions are defined.",
      "For logarithms, write the domain before solving.",
      "For radical comparison, square both sides only when both sides are non-negative."
    ],
    mistakes: [
      "Ignoring x > 0 or x ≥ 0 domain conditions.",
      "Using decimal approximations when exact comparison is expected.",
      "Losing a solution or adding an extraneous one after squaring."
    ]
  },
  {
    topic_en: "Algebraic Expressions",
    topic_cn: "代数表达式",
    exam_focus: [
      "Expand and factor expressions using standard identities.",
      "Simplify rational expressions with stated exclusions.",
      "Prove divisibility and remainder statements for integers.",
      "Use identities such as (a+b)², (a-b)², and a²-b²."
    ],
    key_terms: [
      ["expand", "展开"],
      ["factor", "因式分解"],
      ["identity", "恒等式"],
      ["divisibility", "整除性"],
      ["remainder", "余数"]
    ],
    methods: [
      "Before simplifying a rational expression, factor numerator and denominator and record excluded values.",
      "For divisibility, factor into consecutive integers or use residues modulo the divisor.",
      "Check expansion by multiplying factors back."
    ],
    mistakes: [
      "Cancelling terms that are not common factors.",
      "Forgetting excluded values after simplifying fractions.",
      "Writing examples instead of a proof for all integers."
    ]
  },
  {
    topic_en: "Equations, Inequalities, and Systems",
    topic_cn: "方程、不等式与方程组",
    exam_focus: [
      "Solve linear, quadratic, rational, and absolute value equations.",
      "Solve linear systems and apply them to word problems.",
      "Solve inequalities using intervals and sign reasoning.",
      "State excluded values for rational equations."
    ],
    key_terms: [
      ["equation", "方程"],
      ["inequality", "不等式"],
      ["system", "方程组"],
      ["excluded value", "被排除的取值"],
      ["solution set", "解集"]
    ],
    methods: [
      "For rational equations, find excluded values before multiplying.",
      "For quadratic inequalities, find roots and use the direction of the parabola.",
      "For word problems, define variables clearly before writing equations."
    ],
    mistakes: [
      "Multiplying by a variable expression without checking where it is zero.",
      "Giving roots of an inequality but not the full interval.",
      "Not checking whether solutions satisfy original domain restrictions."
    ]
  },
  {
    topic_en: "Functions",
    topic_cn: "函数",
    exam_focus: [
      "Find linear and quadratic formulas from given information.",
      "Use graph descriptions to identify increasing, decreasing, maximum, and minimum behavior.",
      "Model simple situations with linear, quadratic, reciprocal, exponential, or logarithmic functions.",
      "Solve quadratic optimization problems."
    ],
    key_terms: [
      ["function", "函数"],
      ["slope", "斜率"],
      ["vertex", "顶点"],
      ["maximum", "最大值"],
      ["minimum", "最小值"]
    ],
    methods: [
      "Use y = mx + b for linear functions and vertex form a(x-h)²+k for quadratic functions.",
      "For optimization, write the quantity to optimize as a function of one variable.",
      "For interval extrema, check the vertex and endpoints."
    ],
    mistakes: [
      "Confusing x-intercepts with y-intercepts.",
      "Finding a vertex but forgetting to check whether it lies in the interval.",
      "Ignoring domain restrictions in function equations."
    ]
  },
  {
    topic_en: "Sequences",
    topic_cn: "数列",
    exam_focus: [
      "Compute terms from explicit and recursive formulas.",
      "Recognize arithmetic and geometric sequences.",
      "Use arithmetic and geometric sum formulas.",
      "Apply sequences to simple counting or growth situations."
    ],
    key_terms: [
      ["sequence", "数列"],
      ["arithmetic sequence", "等差数列"],
      ["geometric sequence", "等比数列"],
      ["common difference", "公差"],
      ["common ratio", "公比"]
    ],
    methods: [
      "Arithmetic: aₙ = a₁ + (n-1)d.",
      "Geometric: bₙ = b₁qⁿ⁻¹.",
      "For recursive sequences, calculate terms carefully one by one before guessing a pattern."
    ],
    mistakes: [
      "Using n instead of n-1 in term formulas.",
      "Mixing up common difference and common ratio.",
      "Applying a sum formula to the wrong number of terms."
    ]
  },
  {
    topic_en: "Trigonometry",
    topic_cn: "三角学",
    exam_focus: [
      "Know exact values for 30°, 45°, and 60°.",
      "Use sine, cosine, and tangent in right triangles.",
      "Apply sin²α + cos²α = 1, the cosine rule, and triangle area formula.",
      "Solve simple trigonometric equations on 0° to 180°."
    ],
    key_terms: [
      ["sine", "正弦"],
      ["cosine", "余弦"],
      ["tangent", "正切"],
      ["hypotenuse", "斜边"],
      ["cosine rule", "余弦定理"]
    ],
    methods: [
      "Draw a triangle before using trigonometric ratios.",
      "Use area P = ½ab sin γ when two sides and the included angle are known.",
      "On 0° to 180°, remember sine is positive in quadrants I and II."
    ],
    mistakes: [
      "Using degrees and radians inconsistently.",
      "Choosing the wrong side for opposite or adjacent.",
      "Forgetting the second solution of a sine equation on 0° to 180°."
    ]
  },
  {
    topic_en: "Planar Geometry",
    topic_cn: "平面几何",
    exam_focus: [
      "Use Pythagorean theorem, similarity, congruence, and Thales' theorem.",
      "Work with circles, tangents, chords, central angles, and inscribed angles.",
      "Use properties of rectangles, parallelograms, rhombuses, trapezoids, and regular polygons.",
      "Write short geometric proofs."
    ],
    key_terms: [
      ["tangent", "切线"],
      ["chord", "弦"],
      ["similar triangles", "相似三角形"],
      ["congruent", "全等"],
      ["inscribed angle", "圆周角"]
    ],
    methods: [
      "For tangents, use radius perpendicular to tangent at the point of contact.",
      "For similar triangles, set ratios in the same order.",
      "For proofs, state the geometric property used at each step."
    ],
    mistakes: [
      "Using diameter where radius is required.",
      "Squaring or scaling areas by the linear ratio instead of its square.",
      "Assuming a diagram is to scale."
    ]
  },
  {
    topic_en: "Analytic Geometry on the Cartesian Plane",
    topic_cn: "平面直角坐标系中的解析几何",
    exam_focus: [
      "Calculate distance and midpoint between points.",
      "Find line equations in slope-intercept and standard forms.",
      "Recognize parallel and perpendicular lines.",
      "Use circle equations and coordinate symmetries."
    ],
    key_terms: [
      ["coordinate plane", "坐标平面"],
      ["slope-intercept form", "斜截式"],
      ["standard form", "一般式"],
      ["midpoint", "中点"],
      ["reflection", "对称"]
    ],
    methods: [
      "Distance: √((x₂-x₁)² + (y₂-y₁)²).",
      "Circle: (x-a)² + (y-b)² = r².",
      "Reflection in the x-axis changes y to -y; reflection in the y-axis changes x to -x."
    ],
    mistakes: [
      "Sign errors when subtracting coordinates.",
      "Using reciprocal slope instead of negative reciprocal for perpendicular lines.",
      "Forgetting to square the radius in a circle equation."
    ]
  },
  {
    topic_en: "Solid Geometry",
    topic_cn: "立体几何",
    exam_focus: [
      "Compute volume and surface area of prisms, pyramids, cylinders, cones, and spheres.",
      "Find slant height using Pythagorean theorem.",
      "Understand angles between lines, planes, and faces in common solids.",
      "Use similarity scaling for surface area and volume."
    ],
    key_terms: [
      ["volume", "体积"],
      ["surface area", "表面积"],
      ["slant height", "母线长"],
      ["prism", "棱柱"],
      ["pyramid", "棱锥"]
    ],
    methods: [
      "Write units: square units for area, cubic units for volume.",
      "Surface area scales by k²; volume scales by k³.",
      "In cones and pyramids, draw the right triangle involving height, radius or half-base, and slant height."
    ],
    mistakes: [
      "Confusing height with slant height.",
      "Using diameter instead of radius.",
      "Scaling volume by k² instead of k³."
    ]
  },
  {
    topic_en: "Combinatorics and Probability",
    topic_cn: "组合数学与概率",
    exam_focus: [
      "Use sum rule and product rule in simple counting.",
      "Count arrangements and selections with restrictions.",
      "Compute classical probability by favorable outcomes over total outcomes.",
      "Handle simple drawing without replacement."
    ],
    key_terms: [
      ["product rule", "乘法原理"],
      ["combination", "组合"],
      ["arrangement", "排列"],
      ["probability", "概率"],
      ["without replacement", "不放回"]
    ],
    methods: [
      "Decide whether order matters before choosing permutation or combination.",
      "For “at least one”, often count the complement.",
      "For restrictions, count all cases then subtract forbidden cases."
    ],
    mistakes: [
      "Counting ordered arrangements when the problem asks for groups.",
      "Forgetting that probabilities without replacement change after the first draw.",
      "Double-counting restricted cases."
    ]
  },
  {
    topic_en: "Statistics",
    topic_cn: "统计",
    exam_focus: [
      "Compute arithmetic mean, weighted mean, median, and mode.",
      "Use frequency tables to compute averages.",
      "Find missing values from mean or weighted mean conditions.",
      "Interpret data samples carefully."
    ],
    key_terms: [
      ["mean", "平均数"],
      ["weighted mean", "加权平均数"],
      ["median", "中位数"],
      ["mode", "众数"],
      ["frequency", "频数"]
    ],
    methods: [
      "Mean = total sum divided by number of values.",
      "For median, sort the data first.",
      "Weighted mean = weighted sum divided by total weight."
    ],
    mistakes: [
      "Finding the median before sorting.",
      "Forgetting to multiply values by frequencies.",
      "Treating mode as the largest value instead of the most frequent value."
    ]
  }
];

const WUST_KNOWLEDGE_DETAILS = {
  "Mathematical Logic and Basic Set Theory": {
    overview_cn: "本章训练你把英文数学条件准确翻译成逻辑关系。WUST 入学测试中的逻辑题通常不会很长，但要求你能判断命题真假、写出量词表达，并用集合符号证明等式。核心能力是：看懂条件、分清“推出”和“反过来推出”、用元素法证明集合关系。",
    must_know: ["会判断 P ⇒ Q 与 Q ⇒ P 的区别", "会使用 ∀、∃、∈、⊂、∪、∩、∖", "会写简单集合的补集、交集、并集", "会用“任取 x”证明集合恒等式"],
    exam_patterns: ["判断命题是否为重言式 tautology", "把文字条件改写成量词形式 quantified statement", "计算有限集合的交并补", "证明集合恒等式 set identity"],
    lessons: [
      {
        title_cn: "命题与蕴含",
        terms: [["proposition", "命题"], ["implication", "蕴含"], ["converse", "逆命题"], ["tautology", "重言式"]],
        explanation_cn: "命题是可以判断真假的陈述。P ⇒ Q 表示“如果 P 成立，那么 Q 成立”。它只有一种假情形：P 真但 Q 假。逆命题是 Q ⇒ P，通常不一定与原命题等价。",
        formulas: ["P ⇒ Q 只在 P 真、Q 假时为假", "P ⇔ Q 表示 P 与 Q 互相推出"],
        steps: ["先明确 P 和 Q 分别是什么", "判断 P 成立时 Q 是否必然成立", "判断逆命题时要单独找反例"],
        example_cn: "若 P：n 能被 6 整除，Q：n 能被 3 整除，则 P ⇒ Q 为真；逆命题 Q ⇒ P 为假，反例 n = 3。",
        solution_cn: "因为 6 的倍数一定是 3 的倍数，所以原命题真；但 3 是 3 的倍数，不是 6 的倍数，所以逆命题假。"
      },
      {
        title_cn: "集合运算与元素法证明",
        terms: [["union", "并集"], ["intersection", "交集"], ["complement", "补集"], ["subset", "子集"]],
        explanation_cn: "集合题的关键是把符号翻译成“元素属于/不属于”的条件。证明两个集合相等时，最稳的方法是证明左右两边互相包含。",
        formulas: ["x ∈ A ∩ B ⇔ x ∈ A 且 x ∈ B", "x ∈ A ∪ B ⇔ x ∈ A 或 x ∈ B", "x ∈ A ∖ B ⇔ x ∈ A 且 x ∉ B"],
        steps: ["任取 x 属于左边", "把集合符号翻译成条件", "整理条件并推出 x 属于右边", "再证明右边推出左边"],
        example_cn: "证明 A ∖ (B ∪ C) = (A ∖ B) ∩ (A ∖ C)。",
        solution_cn: "x 属于左边等价于 x ∈ A 且 x ∉ B、x ∉ C；这正好等价于 x 同时属于 A ∖ B 与 A ∖ C。"
      }
    ]
  },
  "Real Numbers": {
    overview_cn: "实数部分主要考精确计算，不鼓励小数近似。你需要熟练处理幂、根式、绝对值和对数，并在解题一开始写出定义域限制。",
    must_know: ["根号内非负", "对数真数必须大于 0", "绝对值方程要分情况", "比较根式可在两边非负时平方"],
    exam_patterns: ["化简 radicals and powers", "解绝对值方程 absolute value equation", "解对数方程 logarithmic equation", "不用小数比较大小 exact comparison"],
    lessons: [
      {
        title_cn: "根式与幂的精确化简",
        terms: [["radical", "根式"], ["power", "幂"], ["exact value", "精确值"]],
        explanation_cn: "根式化简的目标是把被开方数分解出完全平方因子。幂运算要注意负指数表示倒数。",
        formulas: ["√(ab)=√a·√b（在实数范围需注意非负）", "a⁻ⁿ = 1/aⁿ", "√a / √b = √(a/b)，b > 0"],
        steps: ["先处理幂", "把根式内数字分解", "约分或合并根式", "保留精确形式"],
        example_cn: "化简 2⁻² · √80 ÷ √5。",
        solution_cn: "√80 ÷ √5 = √16 = 4，2⁻² = 1/4，所以结果为 1。"
      },
      {
        title_cn: "定义域先行",
        terms: [["domain", "定义域"], ["logarithm", "对数"], ["absolute value", "绝对值"]],
        explanation_cn: "涉及根式、分式、对数时，先写定义域是得分点。很多错题不是计算错，而是忘记排除不合法的 x。",
        formulas: ["√f(x) 要求 f(x) ≥ 0", "logₐ f(x) 要求 f(x) > 0 且 a > 0, a ≠ 1", "分母 ≠ 0"],
        steps: ["列出所有限制", "在限制内解方程", "把候选解代回限制检查"],
        example_cn: "解 log₂(x − 1)=3。",
        solution_cn: "先写 x − 1 > 0，即 x > 1。再得 x − 1 = 8，所以 x = 9。"
      }
    ]
  },
  "Algebraic Expressions": {
    overview_cn: "代数表达式考查基础运算的准确性。WUST 题目常要求展开、因式分解、分式化简，以及证明整数表达式的整除性。",
    must_know: ["平方差公式", "完全平方公式", "分式化简前先写限制", "整除证明要覆盖所有整数"],
    exam_patterns: ["展开并化简 expand and simplify", "完全因式分解 factor completely", "分式表达式化简 rational expression", "证明整除 divisibility proof"],
    lessons: [
      {
        title_cn: "恒等式与因式分解",
        terms: [["identity", "恒等式"], ["factor", "因式分解"], ["expand", "展开"]],
        explanation_cn: "恒等式是代数化简的工具。展开用于去括号，因式分解用于解方程、约分和证明。",
        formulas: ["(a+b)²=a²+2ab+b²", "(a-b)²=a²-2ab+b²", "a²-b²=(a-b)(a+b)"],
        steps: ["识别结构", "套用公式", "合并同类项", "必要时反向检查"],
        example_cn: "展开 (2x−5)² − (x−3)(x+3)。",
        solution_cn: "先得 4x²−20x+25，再减去 x²−9，结果为 3x²−20x+34。"
      },
      {
        title_cn: "整除证明",
        terms: [["divisibility", "整除性"], ["integer", "整数"], ["remainder", "余数"]],
        explanation_cn: "整除证明不能只举例。常见方法是因式分解成连续整数，或按模数讨论余数。",
        formulas: ["n³−n=n(n−1)(n+1)", "连续两个整数中必有一个偶数", "连续三个整数中必有一个能被 3 整除"],
        steps: ["把表达式因式分解", "寻找必含的因子", "说明覆盖所有整数", "写出结论"],
        example_cn: "证明 n³−n 能被 6 整除。",
        solution_cn: "n³−n=n(n−1)(n+1)，三个连续整数中有一个被 3 整除，且至少一个为偶数，所以乘积被 6 整除。"
      }
    ]
  },
  "Equations, Inequalities, and Systems": {
    overview_cn: "方程与不等式是入学测试的核心计算部分。你需要会解一次、二次、分式、绝对值方程，并能把实际问题列成方程组。",
    must_know: ["二次方程因式分解或公式法", "二次不等式要写区间", "分式方程先排除分母为 0", "实际问题先设未知数"],
    exam_patterns: ["solve an equation 解方程", "solve an inequality 解不等式", "solve a system 解方程组", "word problem 应用题"],
    lessons: [
      {
        title_cn: "二次方程与二次不等式",
        terms: [["quadratic equation", "二次方程"], ["inequality", "不等式"], ["solution set", "解集"]],
        explanation_cn: "二次方程求点，二次不等式求区间。开口方向决定取两根之间还是两根之外。",
        formulas: ["ax²+bx+c=0", "x = (-b±√(b²-4ac))/(2a)", "a>0 时抛物线开口向上"],
        steps: ["先求根", "判断开口方向", "画数轴或符号表", "写成区间"],
        example_cn: "解 x²−x−6≤0。",
        solution_cn: "分解为 (x−3)(x+2)≤0，开口向上，因此解为 −2≤x≤3。"
      },
      {
        title_cn: "分式方程",
        terms: [["rational equation", "分式方程"], ["excluded value", "被排除的取值"]],
        explanation_cn: "分式方程最重要的是先写分母不能为 0。通分或交叉相乘后得到的解必须回到原方程检查。",
        formulas: ["分母 ≠ 0", "a/b = c/d ⇒ ad = bc（b,d≠0）"],
        steps: ["列排除值", "通分或交叉相乘", "解普通方程", "检查是否被排除"],
        example_cn: "解 1/(x−1)+1/(x+1)=1。",
        solution_cn: "先排除 x=±1。通分得 2x/(x²−1)=1，得到 x²−2x−1=0，所以 x=1±√2。"
      }
    ]
  },
  "Functions": {
    overview_cn: "函数题考查从条件建立表达式，并用图像或解析式判断变化、零点和最值。考试中常见一次函数、二次函数和简单指数模型。",
    must_know: ["一次函数斜率", "二次函数顶点式", "区间最值要检查端点", "函数定义域限制"],
    exam_patterns: ["find a formula 求解析式", "maximum/minimum 最值", "domain and zero 定义域与零点", "optimization 优化"],
    lessons: [
      {
        title_cn: "一次函数与斜率",
        terms: [["linear function", "一次函数"], ["slope", "斜率"], ["intercept", "截距"]],
        explanation_cn: "一次函数描述恒定变化率。平行直线斜率相同，垂直直线斜率乘积为 −1。",
        formulas: ["y=mx+b", "m=(y₂−y₁)/(x₂−x₁)", "点斜式：y−y₁=m(x−x₁)"],
        steps: ["求斜率", "代入一个点", "解出截距", "写出方程"],
        example_cn: "求过 (1,4) 且平行于 y=2x+1 的直线。",
        solution_cn: "斜率仍为 2。y−4=2(x−1)，所以 y=2x+2。"
      },
      {
        title_cn: "二次函数与优化",
        terms: [["quadratic function", "二次函数"], ["vertex", "顶点"], ["optimization", "优化"]],
        explanation_cn: "二次函数最值在顶点处取得，但若限制在闭区间上，还必须比较端点。",
        formulas: ["f(x)=a(x−h)²+k", "顶点为 (h,k)", "若 a<0，有最大值；若 a>0，有最小值"],
        steps: ["把条件转为函数", "写成顶点式或求顶点", "检查区间端点", "比较函数值"],
        example_cn: "周长为 40 的矩形面积最大时尺寸是多少？",
        solution_cn: "设一边 x，另一边 20−x，面积 A=x(20−x)。顶点在 x=10，所以最大面积时为 10×10。"
      }
    ]
  },
  "Sequences": {
    overview_cn: "数列题主要考规律表达。你需要判断等差还是等比，计算指定项和前 n 项和，并能处理简单递推。",
    must_know: ["等差通项", "等差求和", "等比通项", "递推逐项计算"],
    exam_patterns: ["find a term 求某项", "sum of sequence 求和", "recursive sequence 递推数列", "application problem 应用题"],
    lessons: [
      {
        title_cn: "等差数列",
        terms: [["arithmetic sequence", "等差数列"], ["common difference", "公差"]],
        explanation_cn: "等差数列每相邻两项差相同。题目常给首项和公差，要求通项或求和。",
        formulas: ["aₙ=a₁+(n−1)d", "Sₙ=n(a₁+aₙ)/2"],
        steps: ["识别首项 a₁ 和公差 d", "代入通项公式", "求和时先求末项", "检查项数 n"],
        example_cn: "a₁=3，a₂₀=41，求 S₂₀。",
        solution_cn: "S₂₀=20(3+41)/2=440。"
      },
      {
        title_cn: "等比与递推",
        terms: [["geometric sequence", "等比数列"], ["common ratio", "公比"], ["recursive", "递推的"]],
        explanation_cn: "等比数列每项乘同一个公比。递推数列则用前一项计算后一项，先稳稳算出前几项。",
        formulas: ["bₙ=b₁qⁿ⁻¹", "等比和：Sₙ=b₁(qⁿ−1)/(q−1), q≠1"],
        steps: ["判断是加固定数还是乘固定数", "写出对应公式", "递推题逐项代入", "必要时验证猜想"],
        example_cn: "b₁=2，q=3，求 b₅。",
        solution_cn: "b₅=2·3⁴=162。"
      }
    ]
  },
  "Trigonometry": {
    overview_cn: "三角学部分通常围绕特殊角、直角三角形、余弦定理和三角形面积公式。你需要熟悉 30°、45°、60° 的精确值。",
    must_know: ["sin 30° = ½", "cos 60° = ½", "tan 45° = 1", "余弦定理", "面积公式 P = ½ab sin γ"],
    exam_patterns: ["special angles 特殊角", "right triangle 直角三角形", "cosine rule 余弦定理", "area of triangle 面积"],
    lessons: [
      {
        title_cn: "特殊角与直角三角形",
        terms: [["sine", "正弦"], ["cosine", "余弦"], ["tangent", "正切"], ["hypotenuse", "斜边"]],
        explanation_cn: "sin、cos、tan 都来自直角三角形的边长比。考试常直接考特殊角精确值。",
        formulas: ["sin=对边/斜边", "cos=邻边/斜边", "tan=对边/邻边"],
        steps: ["画出直角三角形", "标出已知角和边", "选择正确比值", "保留精确根式"],
        example_cn: "斜边 12，锐角 30°，求两直角边。",
        solution_cn: "30° 对边为 12·½ = 6，另一边为 12·√3/2 = 6√3。"
      },
      {
        title_cn: "余弦定理与面积",
        terms: [["cosine rule", "余弦定理"], ["included angle", "夹角"], ["area", "面积"]],
        explanation_cn: "当已知两边及夹角时，既可以求第三边，也可以求面积。",
        formulas: ["c² = a² + b² − 2ab cos γ", "P = ½ab sin γ"],
        steps: ["确认已知的是夹角", "求边用余弦定理", "求面积用 ½ab sin γ", "代入特殊角值"],
        example_cn: "AB=7，AC=5，∠A=60°，求 BC。",
        solution_cn: "BC² = 7² + 5² − 2·7·5·cos 60° = 39，所以 BC = √39。"
      }
    ]
  },
  "Planar Geometry": {
    overview_cn: "平面几何考查图形性质和短证明。重点是圆、切线、相似三角形、四边形性质和角度关系。",
    must_know: ["勾股定理", "切线垂直半径", "相似比与面积比", "圆周角等于对应圆心角一半"],
    exam_patterns: ["length in figures 求线段", "similar triangles 相似", "circle and tangent 圆与切线", "geometry proof 几何证明"],
    lessons: [
      {
        title_cn: "圆与切线",
        terms: [["tangent", "切线"], ["radius", "半径"], ["chord", "弦"]],
        explanation_cn: "从圆外一点作切线时，切点处半径垂直切线，因此常形成直角三角形。",
        formulas: ["OT ⟂ PT", "PT²=OP²−OT²"],
        steps: ["连接圆心和切点", "标出直角", "使用勾股定理", "求切线长"],
        example_cn: "OP=10，半径 OT=6，求切线 PT。",
        solution_cn: "PT²=10²−6²=64，所以 PT=8。"
      },
      {
        title_cn: "相似三角形",
        terms: [["similar triangles", "相似三角形"], ["ratio", "比例"], ["area ratio", "面积比"]],
        explanation_cn: "平行线常产生相似三角形。线段按相似比变化，面积按相似比平方变化。",
        formulas: ["对应边比相等", "面积比 = 相似比²"],
        steps: ["证明两个三角形相似", "写对应边比例", "求未知边", "面积题平方相似比"],
        example_cn: "DE∥BC，AD/AB=1/3，AE=4，求 AC。",
        solution_cn: "AE/AC=1/3，所以 AC=12。"
      }
    ]
  },
  "Analytic Geometry on the Cartesian Plane": {
    overview_cn: "解析几何把图形问题转化为坐标计算。你需要熟练掌握距离、中点、直线、圆和对称变换。",
    must_know: ["距离公式", "中点公式", "直线斜率", "圆的标准方程", "坐标轴对称"],
    exam_patterns: ["line equation 直线方程", "circle equation 圆方程", "distance and midpoint 距离与中点", "reflection 对称"],
    lessons: [
      {
        title_cn: "直线与斜率",
        terms: [["slope", "斜率"], ["slope-intercept form", "斜截式"], ["perpendicular", "垂直"]],
        explanation_cn: "斜率描述直线倾斜程度。平行直线斜率相同，垂直直线斜率互为负倒数。",
        formulas: ["m=(y₂−y₁)/(x₂−x₁)", "y=mx+b", "垂直：m₁m₂=-1"],
        steps: ["用两点求斜率", "代入点斜式", "整理成所需形式", "垂直题先求负倒数"],
        example_cn: "求过 (1,-2)、(5,6) 的直线。",
        solution_cn: "m=8/4=2，y+2=2(x−1)，所以 y=2x−4。"
      },
      {
        title_cn: "圆与对称",
        terms: [["circle equation", "圆方程"], ["reflection", "对称"], ["midpoint", "中点"]],
        explanation_cn: "圆的标准方程来自点到圆心距离等于半径。坐标轴对称只改变某个坐标的符号。",
        formulas: ["(x−a)²+(y−b)²=r²", "关于 x 轴：(x,y)→(x,−y)", "关于 y 轴：(x,y)→(−x,y)"],
        steps: ["找圆心和半径", "代入标准方程", "对称时只改对应坐标符号", "距离和周长保持不变"],
        example_cn: "圆心 (−1,2)，半径 5，求圆方程。",
        solution_cn: "(x+1)²+(y−2)²=25。"
      }
    ]
  },
  "Solid Geometry": {
    overview_cn: "立体几何重在公式和空间关系。考试通常要求体积、表面积、母线长以及相似立体的面积体积比例。",
    must_know: ["柱体体积", "锥体体积", "球体公式", "母线长", "相似体面积体积比例"],
    exam_patterns: ["volume 体积", "surface area 表面积", "slant height 母线长", "similar solids 相似立体"],
    lessons: [
      {
        title_cn: "常见立体公式",
        terms: [["volume", "体积"], ["surface area", "表面积"], ["slant height", "母线长"]],
        explanation_cn: "立体几何先识别图形，再选择公式。圆锥和棱锥常需要先用勾股定理求斜高或母线。",
        formulas: ["圆柱 V=πr²h", "圆锥 V=1/3πr²h", "球 S=4πr², V=4/3πr³"],
        steps: ["确认半径、高、母线", "注意单位", "体积用立方单位", "表面积用平方单位"],
        example_cn: "圆锥 r=5，h=12，求母线和体积。",
        solution_cn: "母线 √(5²+12²)=13，体积 1/3·π·25·12=100π。"
      },
      {
        title_cn: "相似立体",
        terms: [["similar solids", "相似立体"], ["scale factor", "比例系数"]],
        explanation_cn: "相似立体的线性尺寸按 k 变，表面积按 k² 变，体积按 k³ 变。",
        formulas: ["面积比 = k²", "体积比 = k³"],
        steps: ["先确定线性比例 k", "表面积乘 k²", "体积乘 k³", "确认从小到大还是从大到小"],
        example_cn: "对应长度比 3:5，小体积 81，求大体积。",
        solution_cn: "大体积 = 81·(5/3)³ = 375。"
      }
    ]
  },
  "Combinatorics and Probability": {
    overview_cn: "组合与概率题考查分类、分步和古典概率。你需要先判断是否考虑顺序，再决定用乘法原理、组合数还是补集法。",
    must_know: ["乘法原理", "加法原理", "排列与组合区别", "古典概率", "不放回抽取"],
    exam_patterns: ["counting 计数", "committee 组合", "at least one 至少一个", "without replacement 不放回"],
    lessons: [
      {
        title_cn: "计数原则",
        terms: [["product rule", "乘法原理"], ["combination", "组合"], ["arrangement", "排列"]],
        explanation_cn: "分步完成用乘法原理；分类讨论用加法原理。若顺序不重要，用组合；顺序重要，用排列。",
        formulas: ["组合数：C(n,k)=n!/(k!(n-k)!)", "分步：m·n", "分类：m+n"],
        steps: ["判断是否分步", "判断顺序是否重要", "处理限制条件", "避免重复计数"],
        example_cn: "从 8 人中选 3 人组队。",
        solution_cn: "顺序不重要，用 C(8,3)=56。"
      },
      {
        title_cn: "古典概率",
        terms: [["probability", "概率"], ["favorable outcomes", "有利结果"], ["without replacement", "不放回"]],
        explanation_cn: "古典概率等于有利情况数除以总情况数。不放回时，第二次抽取的总数和有利数会变化。",
        formulas: ["P(A)=有利情况数/总情况数", "P(A ∩ B)=P(A)·P(B | A)"],
        steps: ["数总情况", "数有利情况", "必要时用补集", "约分概率"],
        example_cn: "4 白 5 黑，不放回抽两个白球概率。",
        solution_cn: "P=(4/9)(3/8)=1/6。"
      }
    ]
  },
  "Statistics": {
    overview_cn: "统计题重在读懂数据和频数。常见任务是求平均数、中位数、众数、加权平均数，或根据平均数反求缺失量。",
    must_know: ["平均数公式", "中位数先排序", "众数是出现最多的值", "加权平均数", "频数表"],
    exam_patterns: ["mean 平均数", "median 中位数", "mode 众数", "weighted mean 加权平均数", "missing value 缺失值"],
    lessons: [
      {
        title_cn: "平均数、中位数、众数",
        terms: [["mean", "平均数"], ["median", "中位数"], ["mode", "众数"]],
        explanation_cn: "平均数反映总体水平，中位数是排序后中间位置，众数是出现次数最多的值。",
        formulas: ["mean = 总和/个数", "偶数个数据的中位数 = 中间两个数的平均"],
        steps: ["先排序", "求总和与个数", "找中间位置", "统计出现次数"],
        example_cn: "3,5,5,8,10,12 的中位数和众数。",
        solution_cn: "中位数为 (5+8)/2=6.5，众数为 5。"
      },
      {
        title_cn: "加权平均与频数表",
        terms: [["weighted mean", "加权平均数"], ["frequency", "频数"], ["sample", "样本"]],
        explanation_cn: "频数表中，每个值要乘以出现次数。加权平均就是加权总和除以总权重。",
        formulas: ["weighted mean = Σ(value·frequency)/Σfrequency"],
        steps: ["每个值乘频数", "求加权总和", "求总频数", "相除或列方程反求未知频数"],
        example_cn: "70,80,90 的权重为 2,3,1，求加权平均。",
        solution_cn: "(70·2+80·3+90·1)/(2+3+1)=235/3。"
      }
    ]
  }
};

const WUST_SYMBOL_DIFFERENCES = {
  "Mathematical Logic and Basic Set Theory": [
    { eu: "A \\ B 或 A ∖ B", cn: "A−B / A\\B / A 的差集", note: "WUST 题面常用 set difference。看见 \\ 或 ∖，读作“属于 A 且不属于 B”。" },
    { eu: "⊂ 有时表示 subset，不一定强调真子集", cn: "⊆ 子集，⊂ 真子集", note: "如果题目没有说明 proper subset，不要过度纠结是否相等；按题意判断。" },
    { eu: "P ⇒ Q, P ⇔ Q", cn: "若 P 则 Q，P 当且仅当 Q", note: "英文卷面喜欢直接用箭头。⇒ 只表示推出，不表示等价。" }
  ],
  "Real Numbers": [
    { eu: "logₐx", cn: "logₐ x", note: "含义相同。注意底数 a 的限制：a > 0 且 a ≠ 1。" },
    { eu: "√a, a ∈ R", cn: "二次根式在实数范围内有意义", note: "欧洲题面常直接写 domain，要主动写出根号内 ≥ 0。" },
    { eu: "x ∈ R", cn: "x 为实数", note: "R 表示实数集，波兰材料中也常写 ℝ。" }
  ],
  "Algebraic Expressions": [
    { eu: "a · b 或 ab", cn: "a×b / ab", note: "代数式中通常不用 ×，而用省略乘号或 ·。" },
    { eu: "a:b", cn: "a÷b 或 a/b", note: "欧洲教材中冒号可表示除法或比。结合上下文判断是 quotient 还是 ratio。" },
    { eu: "n ∈ Z", cn: "n 为整数", note: "Z 或 ℤ 表示整数集，证明整除时经常出现。" }
  ],
  "Equations, Inequalities, and Systems": [
    { eu: "x ∈ (−2,3⟩ / x ∈ ⟨−2,3⟩", cn: "x ∈ (−2,3] / x ∈ [−2,3]", note: "部分波兰教材用尖括号表示闭端点；英文测试通常也接受 [ ] 写法。" },
    { eu: "x ∈ R \\ {2}", cn: "x ∈ R, x ≠ 2", note: "这是定义域排除点的集合写法。" },
    { eu: "Δ = b² − 4ac", cn: "判别式 Δ", note: "符号相同。解二次方程时可以直接写 Δ。" }
  ],
  "Functions": [
    { eu: "f: X → Y", cn: "函数 f 从 X 到 Y", note: "欧洲教材常写映射箭头，表示定义域到值域/陪域。" },
    { eu: "argument funkcji / argument", cn: "自变量 x", note: "英文题多说 input 或 variable，波兰教材可能称 argument。" },
    { eu: "m 或 a 表示直线斜率", cn: "k 常表示一次函数斜率", note: "中国常写 y=kx+b；英文/欧洲材料常写 y=mx+b 或 y=ax+b。" }
  ],
  "Sequences": [
    { eu: "等比公比 q", cn: "等比公比 q 或 r", note: "波兰教材中 q 很常见；本网站已统一用 q。" },
    { eu: "aₙ = a₁qⁿ⁻¹", cn: "aₙ = a₁qⁿ⁻¹ / aₙ = a₁rⁿ⁻¹", note: "看到 q 不要当成未知常数，它就是 common ratio 公比。" },
    { eu: "Sₙ", cn: "Sₙ", note: "前 n 项和符号基本一致。" }
  ],
  "Trigonometry": [
    { eu: "P = ½ab sin γ", cn: "S = ½ab sin C", note: "波兰教材常用 P 表示面积 pole；中国高中常用 S。考试中看见 P 可能是面积。" },
    { eu: "sin 30°", cn: "sin30°", note: "欧洲排版常在函数名和角度之间留空，含义相同。" },
    { eu: "cosine rule", cn: "余弦定理", note: "公式相同，只要确认夹角和对边对应。" }
  ],
  "Planar Geometry": [
    { eu: "|AB|", cn: "AB 的长度", note: "欧洲教材常用竖线表示线段长度，不是绝对值题时不要误解。" },
    { eu: "P 表示面积或周长，依上下文", cn: "S 面积，C 或 l 周长", note: "波兰语 pole 面积常写 P；perimeter 有时也用 P，必须看题目文字。" },
    { eu: "∠ABC", cn: "∠ABC", note: "角符号基本一致。" }
  ],
  "Analytic Geometry on the Cartesian Plane": [
    { eu: "A = (x,y)", cn: "A(x,y)", note: "欧洲教材可能用等号表示点坐标；含义相同。" },
    { eu: "prosta k, prosta l", cn: "直线 l / 直线 AB", note: "波兰教材常用小写字母命名直线。" },
    { eu: "y = ax + b", cn: "y = kx + b", note: "一次函数斜率在欧洲常写 a 或 m，中国常写 k。" }
  ],
  "Solid Geometry": [
    { eu: "V 体积, P 或 S 表面积", cn: "V 体积, S 表面积", note: "波兰材料里 pole powierzchni 可写 P，也可能写 S；看题目文字 surface area。" },
    { eu: "r 半径, h 高, l 母线", cn: "r 半径, h 高, l 母线", note: "这些符号基本一致。" },
    { eu: "k 相似比", cn: "相似比 k", note: "面积按 k²，体积按 k³，与中国教材一致。" }
  ],
  "Combinatorics and Probability": [
    { eu: "二项式符号 “n over k”", cn: "Cₙᵏ / C(n,k)", note: "波兰教材常用上下结构的组合数。本网站会把 C(n,k) 显示成上下结构。" },
    { eu: "Vₙᵏ", cn: "Aₙᵏ", note: "不重复排列/选排在波兰教材常写 V，在中国高中常写 A。" },
    { eu: "P(A)", cn: "P(A)", note: "概率符号一致；P 在概率中不是面积，要看所在章节。" }
  ],
  "Statistics": [
    { eu: "średnia / mean", cn: "平均数", note: "英文测试用 mean，波兰教材用 średnia。" },
    { eu: "mediana, dominanta", cn: "中位数、众数", note: "若遇到波兰词，mediana 是中位数，dominanta 是众数。" },
    { eu: "frequency table", cn: "频数表", note: "符号差异不大，关键是 value × frequency。" }
  ]
};

const WUST_TEXTBOOK_CHAPTERS = {
  "Mathematical Logic and Basic Set Theory": {
    chapter_goal: "像学习国内高中“集合与常用逻辑用语”一样，先会读符号，再会判断真假，最后会写简单证明。",
    core_concepts: [
      "命题 proposition 是能判断真假的陈述句，例如“若 n 是偶数，则 n² 是偶数”。疑问句、祈使句和含糊描述不是数学命题。复合命题由“且 and”“或 or”“非 not”“若则 implies”等连接词组成。",
      "集合 set 是研究对象的全体。元素 element 写作 x ∈ A，子集 subset 写作 A ⊂ B 或 A ⊆ B。并集 union、交集 intersection、差集 difference 和补集 complement 都必须在同一个全集 universe 中讨论。",
      "量词 quantifier 包括全称量词 ∀ 和存在量词 ∃。遇到英文 every, all, for any 通常对应 ∀；some, at least one, there exists 通常对应 ∃。"
    ],
    symbol_notes: [
      "P ⇒ Q 读作 P implies Q，中文是“P 推出 Q”。不要把它看成“P 等于 Q”。",
      "P ⇔ Q 读作 if and only if，中文是“当且仅当”，表示两边互相推出。",
      "A ∖ B 表示属于 A 但不属于 B 的元素；Aᶜ 表示在全集中不属于 A 的元素。",
      "否定含量词的命题时，∀ 会变成 ∃，∃ 会变成 ∀，同时否定后面的性质。"
    ],
    formula_notes: [
      "P ⇒ Q 只有在 P 真且 Q 假时为假，这是判断蕴含题的核心真值规则。",
      "德摩根律 De Morgan laws：¬(A ∧ B) ⇔ (¬A) ∨ (¬B)；¬(A ∨ B) ⇔ (¬A) ∧ (¬B)。",
      "集合恒等式可用元素法证明：证明 A = B，通常分别证明 A ⊆ B 和 B ⊆ A。"
    ],
    standard_methods: [
      "读题时先圈出 if, only if, every, some, and, or, not 等逻辑词。",
      "把文字命题拆成 P、Q 或集合条件，再写成符号形式。",
      "判断命题真假时优先找反例；若找不到反例，再按定义证明。",
      "集合证明采用“任取 x”开头：设 x ∈ 左边，逐步推出 x ∈ 右边。"
    ],
    worked_examples: [
      {
        question: "例 1：判断命题“若 n 能被 6 整除，则 n 能被 3 整除”的逆命题是否成立。",
        solution: "原命题为真，因为 6 的倍数一定是 3 的倍数。逆命题是“若 n 能被 3 整除，则 n 能被 6 整除”。取 n = 3，能被 3 整除但不能被 6 整除，所以逆命题为假。"
      },
      {
        question: "例 2：证明 A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)。",
        solution: "任取 x ∈ A ∩ (B ∪ C)，则 x ∈ A 且 x ∈ B 或 x ∈ C，所以 x ∈ A ∩ B 或 x ∈ A ∩ C。反向同理，因此两集合相等。"
      }
    ],
    misconception_analysis: [
      "“或 or”在数学中通常是 inclusive or，允许两者同时成立。",
      "补集一定依赖全集；不写全集时，补集答案可能不唯一。",
      "举一个例子不能证明全称命题，只能说明存在某种情况；证明“所有”必须用一般元素或一般变量。"
    ],
    practice_route: "先练 Q1-Q5：从真值判断入手，再练集合运算，最后写 2 行以内的集合证明。英文题中重点熟悉 implies, converse, subset, complement。"
  },
  "Real Numbers": {
    chapter_goal: "按国内“实数、根式、指数与对数”顺序复习，目标是做到精确化简，并且每一步都满足定义域。",
    core_concepts: [
      "实数 real numbers 包括有理数和无理数。考试中通常不要求讨论数系理论，而是要求你准确处理绝对值 absolute value、根式 radical、幂 power 和对数 logarithm。",
      "绝对值 |x| 表示数轴上 x 到 0 的距离，因此 |x| 永远非负。解含绝对值的题时，要根据内部表达式的正负分段。",
      "根式和对数都带有定义域限制。偶次根号内必须大于等于 0；logₐx 中底数 a > 0 且 a ≠ 1，真数 x > 0。"
    ],
    symbol_notes: [
      "exact value 精确值，表示不要用小数近似替代 √2、π、log₂3 这类表达式。",
      "non-negative 表示大于等于 0；positive 表示严格大于 0。",
      "domain 定义域，是表达式有意义的 x 的取值范围。"
    ],
    formula_notes: [
      "aᵐ · aⁿ = aᵐ⁺ⁿ，aᵐ ÷ aⁿ = aᵐ⁻ⁿ，但 a 不能为 0 时才能作除法。",
      "√(ab)=√a√b 在实数范围内要求 a ≥ 0 且 b ≥ 0；不要随意拆负数根式。",
      "logₐ(xy)=logₐx + logₐy，logₐ(x/y)=logₐx − logₐy，使用前必须保证 x > 0，y > 0。"
    ],
    standard_methods: [
      "含根式或对数的题，第一行先写定义域。",
      "化简幂和根式时先把数字分解成平方因子或同底幂。",
      "比较根式大小时，若两边非负，可以平方比较，最后写回原式大小关系。",
      "解方程后把答案代回定义域，删除增根。"
    ],
    worked_examples: [
      {
        question: "例 1：求 log₂(x − 1) + log₂(x + 3) 的定义域。",
        solution: "两个真数都要大于 0，所以 x − 1 > 0 且 x + 3 > 0，得到 x > 1。因此定义域为 (1,+∞)。"
      },
      {
        question: "例 2：比较 √18 与 4。",
        solution: "两边均为非负数，可以平方。18 与 16 比较，18>16，所以 √18>4。也可化为 √18=3√2>4。"
      }
    ],
    misconception_analysis: [
      "√(x²) = |x|，不是 x。只有 x ≥ 0 时才等于 x。",
      "log(x+y) 不能拆成 log x + log y。",
      "平方两边可能产生增根，特别是含根式方程必须验根。"
    ],
    practice_route: "先练定义域，再练精确化简，最后做含根式或对数的方程。Q6-Q10 中重点训练“先写限制、后运算”。"
  },
  "Algebraic Expressions": {
    chapter_goal: "像国内代数运算章节一样，掌握展开、因式分解、分式化简和整除证明，核心是把“项”与“因式”分清。",
    core_concepts: [
      "代数式 algebraic expression 是由数、字母和运算符号组成的式子。展开 expand 是把乘积化为和差；因式分解 factor 是把和差化为乘积。",
      "恒等式 identity 是对允许范围内所有变量都成立的等式。常用公式不是记忆结果，而是用于识别结构。",
      "分式化简 rational expression simplification 必须先因式分解，再约去相同因式，同时保留原分母不为 0 的限制。"
    ],
    symbol_notes: [
      "coefficient 系数，是字母项前的数字因子。",
      "term 项，是加减号分开的部分；factor 因式，是乘法结构中的部分。",
      "divisible by 表示“能被……整除”，remainder 表示余数。"
    ],
    formula_notes: [
      "(a+b)²=a²+2ab+b²，(a-b)²=a²-2ab+b²。",
      "a²-b²=(a-b)(a+b)，a³-b³=(a-b)(a²+ab+b²)。",
      "若整数表达式含连续整数，可利用 n(n+1) 必为偶数等性质证明整除。"
    ],
    standard_methods: [
      "先观察是否有公因式，再判断是否是平方差、完全平方或立方差。",
      "分式题先写 excluded values，再进行约分。",
      "证明整除时，把表达式改写成 divisor × integer 的形式。",
      "余数题可用 n = divisor·k + r 或模运算 residues 处理。"
    ],
    worked_examples: [
      {
        question: "例 1：化简 (x²-9)/(x²-3x)，并写出限制。",
        solution: "分解得 (x-3)(x+3)/[x(x-3)]。原分母要求 x≠0 且 x≠3。约去 x-3 后为 (x+3)/x，但限制仍是 x≠0,3。"
      },
      {
        question: "例 2：证明 n²+n 对任意整数 n 都能被 2 整除。",
        solution: "n²+n=n(n+1)。n 与 n+1 是连续整数，其中必有一个偶数，因此乘积能被 2 整除。"
      }
    ],
    misconception_analysis: [
      "只能约去共同因式，不能约去共同项。例如 (x+1)/(x+2) 不能约 x。",
      "化简后的式子与原式在被排除的点不等价，所以限制必须保留。",
      "整除证明不能只代几个数，要证明对所有整数成立。"
    ],
    practice_route: "Q11-Q15 按“公式识别、分式限制、整除证明”顺序做。每题写出第一步因式分解，避免直接心算跳步。"
  },
  "Equations, Inequalities, and Systems": {
    chapter_goal: "建立国内教材中的“解集意识”：方程求点，不等式求区间，分式与根式先管定义域。",
    core_concepts: [
      "方程 equation 的解是使等式成立的数；不等式 inequality 的解通常是一段或几段区间。方程组 system 是多个条件同时成立。",
      "二次方程可用因式分解、配方法或求根公式。二次不等式要结合抛物线开口和根的位置来确定区间。",
      "分式方程和含根式方程的变形可能扩大定义域，因此必须先写限制，最后验根。"
    ],
    symbol_notes: [
      "solution set 解集，是所有解组成的集合。",
      "excluded value 被排除的取值，通常来自分母不能为 0 或根号/对数限制。",
      "interval 区间，英文题中 open interval 表示开区间，closed interval 表示闭区间。"
    ],
    formula_notes: [
      "二次方程 ax²+bx+c=0 的判别式 Δ=b²-4ac。",
      "若 Δ>0 有两个实根，Δ=0 有一个重根，Δ<0 无实根。",
      "求根公式 x=(-b±√Δ)/(2a)，要求 a≠0。"
    ],
    standard_methods: [
      "分式方程第一步写分母不为 0 的条件。",
      "二次不等式先求对应方程的根，再画数轴或判断抛物线开口。",
      "方程组应用题先设未知数并写单位，再列等量关系。",
      "得到答案后检查是否满足原方程和题意。"
    ],
    worked_examples: [
      {
        question: "例 1：解 (x+1)/(x-2)=3。",
        solution: "先写 x≠2。两边乘 x-2 得 x+1=3x-6，所以 2x=7，x=7/2。它不等于 2，因此是原方程解。"
      },
      {
        question: "例 2：解 x²-5x+6≤0。",
        solution: "因式分解 (x-2)(x-3)≤0，根为 2 和 3。抛物线开口向上，小于等于 0 在两根之间，所以解集为 [2,3]。"
      }
    ],
    misconception_analysis: [
      "不等式乘以负数时方向必须改变。",
      "解二次不等式不能只写两个根，要写完整区间。",
      "应用题答案若不符合实际意义，例如人数为负数，应舍去。"
    ],
    practice_route: "Q16-Q20 重点练“限制、变形、验根、区间表达”。把每题答案写成集合或区间形式。"
  },
  "Functions": {
    chapter_goal: "把函数看成变量之间的对应关系，像国内函数章节一样，从定义域、解析式、图像、单调性和最值五个方面复习。",
    core_concepts: [
      "函数 function 是每个输入 x 对应唯一输出 y 的规则。研究函数时，定义域 domain 决定 x 能取什么，值域 range 决定 y 可能得到什么。",
      "一次函数 linear function 图像是直线，斜率 slope 表示 y 随 x 增加的变化速度。二次函数 quadratic function 图像是抛物线，顶点 vertex 决定最大值或最小值。",
      "最值 optimization 题通常不是直接给函数，而是需要先根据题意把目标量写成一个变量的函数。"
    ],
    symbol_notes: [
      "f(x) 读作 f of x，表示输入 x 后的函数值。",
      "intercept 截距：x-intercept 是与 x 轴交点，y-intercept 是与 y 轴交点。",
      "increasing/decreasing 表示函数递增/递减；maximum/minimum 表示最大/最小值。"
    ],
    formula_notes: [
      "一次函数 y=mx+b，m 为斜率，b 为 y 轴截距。",
      "二次函数 y=ax²+bx+c 的对称轴 x=-b/(2a)。",
      "顶点式 y=a(x-h)²+k 中顶点为 (h,k)，a>0 有最小值，a<0 有最大值。"
    ],
    standard_methods: [
      "先写定义域，尤其是实际问题中的长度、时间、人数不能随意取负。",
      "直线题用两点求斜率，再代入一点求截距。",
      "二次函数最值题先化为顶点式或用对称轴。",
      "若题目限定区间，要同时检查顶点和区间端点。"
    ],
    worked_examples: [
      {
        question: "例 1：过点 (1,3) 和 (5,11) 的直线方程。",
        solution: "斜率 m=(11-3)/(5-1)=2。设 y=2x+b，代入 (1,3) 得 b=1，所以 y=2x+1。"
      },
      {
        question: "例 2：求 y=x²-4x+7 的最小值。",
        solution: "配方 y=(x-2)²+3。因为平方项 ≥0，所以最小值为 3，在 x=2 时取得。"
      }
    ],
    misconception_analysis: [
      "函数值 f(a) 是一个 y 值，不是点；点应写成 (a,f(a))。",
      "有顶点不代表一定是所给区间上的最值，还要看顶点是否在区间内。",
      "斜率为 0 是水平线；竖直线不是 y 关于 x 的函数。"
    ],
    practice_route: "Q21-Q25 先做直线和二次函数，再做最值建模。读英文题时重点找 rate, vertex, maximum, minimum。"
  },
  "Sequences": {
    chapter_goal: "按国内“等差、等比、递推”三层复习，目标是识别规律并准确使用第 n 项与前 n 项和。",
    core_concepts: [
      "数列 sequence 是按顺序排列的一列数。a₁ 是首项，aₙ 是第 n 项，n 是正整数。",
      "等差数列 arithmetic sequence 的相邻两项差相同，这个差叫公差 common difference。等比数列 geometric sequence 的相邻两项比相同，这个比叫公比 common ratio。",
      "递推 recursive formula 是用前面的项定义后面的项。做递推题时不要急于套公式，先逐项算出几项观察。"
    ],
    symbol_notes: [
      "term 项，表示数列中的某一个数。",
      "sum 部分和，Sₙ 表示前 n 项和。",
      "recursive 递推的；explicit 显式的，表示直接由 n 求 aₙ。"
    ],
    formula_notes: [
      "等差数列 aₙ = a₁ + (n − 1)d，Sₙ = n(a₁ + aₙ)/2。",
      "等比数列 aₙ = a₁qⁿ⁻¹，q ≠ 1 时 Sₙ = a₁(1 − qⁿ)/(1 − q)。",
      "等比求和公式使用前必须确认公比 q 和项数 n。"
    ],
    standard_methods: [
      "先判断相邻差是否恒定；不恒定再看相邻比是否恒定。",
      "使用第 n 项公式时注意是 n-1，不是 n。",
      "求和前确认一共有多少项，尤其是从 a_k 到 a_m 的项数为 m-k+1。",
      "递推题按定义逐项代入，避免把 aₙ 和 n 混淆。"
    ],
    worked_examples: [
      {
        question: "例 1：等差数列 a₁=5，d=3，求 a₁₀。",
        solution: "a₁₀=5+(10-1)·3=32。这里乘的是 9，因为从第 1 项到第 10 项增加了 9 次。"
      },
      {
        question: "例 2：等比数列 2,6,18,... 求前 4 项和。",
        solution: "首项 2，公比 3，前 4 项为 2,6,18,54，和为 80。也可用公式 2(1-3⁴)/(1-3)=80。"
      }
    ],
    misconception_analysis: [
      "等差看差，等比看比；不要只凭前两项判断。",
      "第 n 项公式里的 n 是项号，不是最后一项的数值。",
      "公比为负数时，数列正负交替，求和仍按公式但要小心符号。"
    ],
    practice_route: "Q26-Q30 先识别类型，再写 aₙ 和 Sₙ。每题在草稿上标出 a₁、d 或 q、n。"
  },
  "Trigonometry": {
    chapter_goal: "按国内三角函数入门复习：先会直角三角形比值，再掌握特殊角和余弦定理、面积公式。",
    core_concepts: [
      "在直角三角形中，sin 正弦、cos 余弦、tan 正切都是边长比。它们不是边长本身，而是由角决定的比值。",
      "特殊角 30°、45°、60° 的三角函数值必须熟记，因为考试通常要求精确值而不是小数。",
      "非直角三角形中，余弦定理 cosine rule 用于已知两边及夹角求第三边，或已知三边求角；面积公式 P = ½ab sin C 用于两边夹角。"
    ],
    symbol_notes: [
      "opposite 对边，adjacent 邻边，hypotenuse 斜边。",
      "included angle 夹角，指两条已知边之间的角。",
      "degrees 度数；radians 弧度。该考试常用度数，但要看题目单位。"
    ],
    formula_notes: [
      "sin θ=opposite/hypotenuse，cos θ=adjacent/hypotenuse，tan θ=opposite/adjacent。",
      "sin²θ+cos²θ=1，是最常用的基本恒等式。",
      "余弦定理 c² = a² + b² − 2ab cos C；面积 P = ½ab sin C。"
    ],
    standard_methods: [
      "先画图并标出角、对边、邻边和斜边。",
      "判断是否直角三角形；直角用三角比，非直角用余弦定理或面积公式。",
      "特殊角尽量写精确值，如 √3/2、√2/2。",
      "解三角方程时注意给定区间内是否有第二个角。"
    ],
    worked_examples: [
      {
        question: "例 1：直角三角形中 θ=30°，斜边为 10，求 θ 的对边。",
        solution: "sin 30° = 对边/10 = ½，所以对边 = 5。"
      },
      {
        question: "例 2：a=5,b=7,C=60°，求第三边 c。",
        solution: "c² = 5² + 7² − 2·5·7·cos 60° = 25 + 49 − 35 = 39，所以 c = √39。"
      }
    ],
    misconception_analysis: [
      "sin 30° = ½ 不是说角等于 ½，而是边长比等于 ½。",
      "tan θ 不能在 θ=90° 时使用，因为邻边为 0。",
      "余弦定理中的 C 必须是 a、b 两边的夹角。"
    ],
    practice_route: "Q31-Q35 先背特殊角表，再练右三角形和非直角三角形。每题必须画辅助图。"
  },
  "Planar Geometry": {
    chapter_goal: "按国内平面几何复习，重点不是背很多定理，而是会把角、边、相似、圆的性质组织成短证明。",
    core_concepts: [
      "平面几何 planar geometry 研究点、线、角、三角形、四边形和圆。考试题通常图形不复杂，但要求你说明使用了哪个性质。",
      "相似 triangles similar 表示对应角相等、对应边成比例；全等 congruent 表示形状和大小都相同。面积比是相似比的平方。",
      "圆中常用性质包括半径垂直切线、同弧所对圆周角相等、直径所对圆周角为 90°。"
    ],
    symbol_notes: [
      "parallel 平行，perpendicular 垂直。",
      "tangent 切线，radius 半径，chord 弦，diameter 直径。",
      "regular polygon 正多边形，所有边和角都相等。"
    ],
    formula_notes: [
      "勾股定理 a²+b²=c² 只适用于直角三角形。",
      "相似三角形对应边比相等，面积比等于边长比的平方。",
      "圆周角等于同弧圆心角的一半。"
    ],
    standard_methods: [
      "先在图上标出已知相等角、平行线和直角。",
      "寻找相似三角形：角角相等是最常用判定。",
      "圆题先连接圆心和切点、圆心和弦端点，制造半径或等腰三角形。",
      "证明题每一步写“因为……所以……”，不要只写结论。"
    ],
    worked_examples: [
      {
        question: "例 1：圆 O 中，AB 是切线，OA 为半径，说明 OA ⟂ AB。",
        solution: "根据切线性质：圆的半径垂直于过切点的切线。因此 OA ⟂ AB。"
      },
      {
        question: "例 2：两个相似三角形对应边比为 2:3，小三角形面积为 20，求大三角形面积。",
        solution: "面积比为边长比平方，即 4:9。大面积=20·9/4=45。"
      }
    ],
    misconception_analysis: [
      "图看起来相等不能作为证明依据，必须由条件或定理推出。",
      "相似边长按 k 放大，面积按 k² 放大。",
      "切线垂直的是过切点的半径，不是任意半径。"
    ],
    practice_route: "Q36-Q40 先练角度和相似，再练圆。每道几何题写出至少一个使用的定理名称。"
  },
  "Analytic Geometry on the Cartesian Plane": {
    chapter_goal: "把几何图形放到坐标系中，用代数计算解决距离、直线、圆和对称问题。",
    core_concepts: [
      "解析几何 analytic geometry 的思想是“以数代形”：点用坐标表示，线用方程表示，距离和角度用公式计算。",
      "直线的斜率 slope 表示倾斜程度。两条非竖直直线平行时斜率相等，垂直时斜率乘积为 -1。",
      "圆的标准方程 (x-a)²+(y-b)²=r² 直接给出圆心和半径。"
    ],
    symbol_notes: [
      "coordinate plane 坐标平面，x-axis 横轴，y-axis 纵轴。",
      "midpoint 中点，distance 距离。",
      "slope-intercept form 斜截式 y=mx+b；standard form 一般式 Ax+By+C=0。"
    ],
    formula_notes: [
      "两点距离 d=√[(x₂-x₁)²+(y₂-y₁)²]。",
      "中点 M=((x₁+x₂)/2,(y₁+y₂)/2)。",
      "斜率 m=(y₂-y₁)/(x₂-x₁)，当 x₂=x₁ 时直线竖直，斜率不存在。"
    ],
    standard_methods: [
      "点坐标题先写清楚 x₁,y₁,x₂,y₂，避免代错。",
      "求直线方程先求斜率，再代入一点求截距。",
      "圆题先化成标准形式，读出圆心和半径。",
      "对称题记忆规则：关于 x 轴变 y 号，关于 y 轴变 x 号，关于原点 x、y 都变号。"
    ],
    worked_examples: [
      {
        question: "例 1：求 A(1,2), B(5,6) 的距离和中点。",
        solution: "距离 d=√[(5-1)²+(6-2)²]=√32=4√2。中点为 ((1+5)/2,(2+6)/2)=(3,4)。"
      },
      {
        question: "例 2：圆心 (2,-1)，半径 3，写圆方程。",
        solution: "代入标准式得 (x-2)²+(y+1)²=9。注意半径平方是 9。"
      }
    ],
    misconception_analysis: [
      "距离公式中坐标差要平方，所以顺序不影响距离，但中点公式要分别平均 x 和 y。",
      "垂直斜率是负倒数，不只是倒数。",
      "圆方程右边是 r²，不是 r。"
    ],
    practice_route: "Q41-Q45 按距离中点、直线、圆、对称顺序做。每题先写公式再代数值。"
  },
  "Solid Geometry": {
    chapter_goal: "按国内立体几何计算题复习，重点是识别底面、高、母线和相似比。",
    core_concepts: [
      "立体几何 solid geometry 研究空间图形的体积 volume 和表面积 surface area。柱体和锥体的核心都是“底面积 × 高”，区别在于锥体多一个 1/3。",
      "圆锥和棱锥中常出现 slant height 母线或斜高，它不是垂直高度 height，通常需要在截面直角三角形中用勾股定理求出。",
      "相似立体 similar solids 的线性尺寸按 k 变化，面积按 k² 变化，体积按 k³ 变化。"
    ],
    symbol_notes: [
      "base area 底面积，height 高，lateral area 侧面积。",
      "radius 半径，diameter 直径，sphere 球，cone 圆锥，cylinder 圆柱。",
      "net 展开图，常用于表面积计算。"
    ],
    formula_notes: [
      "柱体 V=Sh，其中 S 为底面积，h 为高。",
      "锥体 V=1/3 Sh；圆柱 V=πr²h；圆锥 V=1/3πr²h。",
      "球表面积 S=4πr²，球体积 V=4/3πr³。"
    ],
    standard_methods: [
      "先判断是哪类立体，再标出底面和垂直高度。",
      "表面积题分清底面积、侧面积和是否包含上下底。",
      "圆锥侧面积或母线题先画轴截面直角三角形。",
      "相似题先确定线性比，再决定平方还是立方。"
    ],
    worked_examples: [
      {
        question: "例 1：圆柱 r=3,h=10，求体积。",
        solution: "V=πr²h=π·9·10=90π。单位若是 cm，则体积单位为 cm³。"
      },
      {
        question: "例 2：圆锥 r=5,h=12，求母线。",
        solution: "轴截面中半径、高、母线构成直角三角形，l=√(5²+12²)=13。"
      }
    ],
    misconception_analysis: [
      "体积单位是立方单位，表面积单位是平方单位。",
      "圆锥体积比圆柱多乘 1/3，不能漏掉。",
      "直径给出时要先除以 2 得半径。"
    ],
    practice_route: "Q46-Q50 重点练体积、表面积、母线和相似比。做题时先在草稿上写出所有已知量单位。"
  },
  "Combinatorics and Probability": {
    chapter_goal: "按国内计数原理和古典概型复习，核心是先判断“分类还是分步、是否考虑顺序”。",
    core_concepts: [
      "加法原理 sum rule 用于分类：完成一件事有互不重叠的几类方法，总数相加。乘法原理 product rule 用于分步：完成一件事需要连续几个步骤，总数相乘。",
      "排列 arrangement 考虑顺序，组合 combination 不考虑顺序。组队、选委员会通常是组合；排座位、排号码通常是排列。",
      "古典概率 classical probability 要求所有基本结果等可能，概率 = 有利结果数 / 总结果数。"
    ],
    symbol_notes: [
      "at least one 至少一个，常用补集法：1 - none。",
      "without replacement 不放回，抽完一次后总数会减少。",
      "favorable outcomes 有利结果，total outcomes 总结果。"
    ],
    formula_notes: [
      "组合数：C(n,k)=n!/[k!(n-k)!]，波兰教材中通常写作“n nad k”的二项式符号。",
      "不重复排列/选排：Vₙᵏ=n!/(n-k)!。",
      "P(A)=有利结果数/总结果数；若连续发生，P(A ∩ B)=P(A)·P(B | A)。"
    ],
    standard_methods: [
      "先用中文改写题意，判断任务是分类还是分步。",
      "问“选出一组”通常不考虑顺序；问“排成一列”通常考虑顺序。",
      "有“至少一个”时优先考虑反面事件。",
      "概率题先数总数，再数有利数，最后约分。"
    ],
    worked_examples: [
      {
        question: "例 1：从 8 人中选 3 人组成小组，有多少种？",
        solution: "小组不分顺序，用组合 C(8,3)=8·7·6/(3·2·1)=56。"
      },
      {
        question: "例 2：袋中 4 白 5 黑，不放回抽两球均为白球的概率。",
        solution: "第一次白球概率 4/9；第二次在已抽出白球后为 3/8。概率为 (4/9)(3/8)=1/6。"
      }
    ],
    misconception_analysis: [
      "组合题若误用排列，会多乘顺序数，答案偏大。",
      "不放回抽取每一步的分母会变，不能一直用原总数。",
      "互斥事件才能直接相加；不互斥时要减去重复部分。"
    ],
    practice_route: "Q51-Q55 每题先写“是否有顺序”。概率题画树状图或列分步概率，避免口算漏条件。"
  },
  "Statistics": {
    chapter_goal: "按国内统计初步复习，目标是会读数据、整理频数、计算平均数/中位数/众数/加权平均。",
    core_concepts: [
      "统计 statistics 研究数据的收集、整理和描述。入学测试通常不会考复杂推断，重点是准确计算和解释基本统计量。",
      "平均数 mean 反映总体水平，容易受极端值影响；中位数 median 是排序后的中间数，受极端值影响较小；众数 mode 是出现次数最多的数据。",
      "加权平均 weighted mean 用于不同数据有不同权重或频数的情形。频数 frequency 表示某个值出现多少次。"
    ],
    symbol_notes: [
      "data set 数据集，sample 样本。",
      "frequency table 频数表，value 数据值。",
      "missing value 缺失值，常通过平均数列方程求出。"
    ],
    formula_notes: [
      "平均数 mean = 数据总和 / 数据个数。",
      "加权平均 weighted mean = Σ(value × frequency) / Σfrequency。",
      "偶数个数据的中位数为中间两个数的平均。"
    ],
    standard_methods: [
      "求中位数前必须先排序。",
      "频数表中先计算 value × frequency，再求总和。",
      "已知平均数求未知数时，用“总和 = 平均数 × 个数”列方程。",
      "计算后判断答案是否符合数据背景，例如分数应在合理范围内。"
    ],
    worked_examples: [
      {
        question: "例 1：数据 3,5,5,8,10,12 的中位数和众数。",
        solution: "数据已排序，共 6 个，中位数为第 3 和第 4 个数平均：(5+8)/2=6.5。出现最多的是 5，所以众数为 5。"
      },
      {
        question: "例 2：70,80,90 的频数分别为 2,3,1，求加权平均。",
        solution: "加权总和为 70·2+80·3+90·1=470，总频数为 6，平均数为 470/6=235/3。"
      }
    ],
    misconception_analysis: [
      "中位数必须排序后再找，不能按原题给出的顺序找。",
      "众数不是最大数，而是出现次数最多的数；可能没有众数或有多个众数。",
      "频数表求平均时不能只把不同数值相加，要乘以频数。"
    ],
    practice_route: "Q56-Q60 先练基础统计量，再练频数表和缺失值。每题写出总和、个数或总频数。"
  }
};

window.WUST_KNOWLEDGE.forEach((item) => {
  Object.assign(item, WUST_KNOWLEDGE_DETAILS[item.topic_en] || {});
  if (WUST_TEXTBOOK_CHAPTERS[item.topic_en]) {
    WUST_TEXTBOOK_CHAPTERS[item.topic_en].symbol_differences = WUST_SYMBOL_DIFFERENCES[item.topic_en] || [];
  }
  Object.assign(item, { textbook_cn: WUST_TEXTBOOK_CHAPTERS[item.topic_en] });
});
