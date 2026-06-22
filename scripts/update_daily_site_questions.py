#!/usr/bin/env python3

from __future__ import annotations

import argparse
import json
from datetime import date
from pathlib import Path


TOPICS = [
    ("Mathematical Logic and Basic Set Theory", "数学逻辑与基础集合论"),
    ("Real Numbers", "实数"),
    ("Algebraic Expressions", "代数表达式"),
    ("Equations, Inequalities, and Systems", "方程、不等式与方程组"),
    ("Functions", "函数"),
    ("Sequences", "数列"),
    ("Trigonometry", "三角学"),
    ("Planar Geometry", "平面几何"),
    ("Analytic Geometry on the Cartesian Plane", "平面直角坐标系中的解析几何"),
    ("Solid Geometry", "立体几何"),
    ("Combinatorics and Probability", "组合数学与概率"),
    ("Statistics", "统计"),
]


def item(n, topic, title_en, title_cn, q_en, q_cn, s_en, s_cn, points, diff_en, diff_cn):
    topic_en, topic_cn = topic
    return {
        "n": n,
        "topic_en": topic_en,
        "topic_cn": topic_cn,
        "title_en": title_en,
        "title_cn": title_cn,
        "q_en": q_en,
        "q_cn": q_cn,
        "s_en": s_en,
        "s_cn": s_cn,
        "points": points,
        "diff_en": diff_en,
        "diff_cn": diff_cn,
    }


def fmt_set(values: list[int]) -> str:
    return "{" + ", ".join(str(value) for value in values) + "}"


def fmt_signed(value: int) -> str:
    if value < 0:
        return f" − {abs(value)}"
    return f" + {value}"


def fmt_x_minus(value: int) -> str:
    if value < 0:
        return f"x + {abs(value)}"
    return f"x − {value}"


def fmt_var_minus(var_name: str, value: int) -> str:
    if value < 0:
        return f"{var_name} + {abs(value)}"
    return f"{var_name} − {value}"


def to_sup(num: int) -> str:
    return str(num).translate(str.maketrans("0123456789", "⁰¹²³⁴⁵⁶⁷⁸⁹"))


class DailySelector:
    def __init__(self, run_date: str):
        self.day = date.fromisoformat(run_date).toordinal()
        self.counter = 0

    def choice(self, values):
        if not values:
            raise ValueError("Cannot choose from an empty sequence")
        index = (self.day + self.counter) % len(values)
        self.counter += 1
        return values[index]

    def sample(self, values, count: int):
        if count > len(values):
            raise ValueError("Sample size exceeds population")
        start = (self.day + self.counter) % len(values)
        self.counter += 1
        rotated = list(values)[start:] + list(values)[:start]
        return rotated[:count]


def apply_daily_instructions(questions: list[dict], run_date: str) -> None:
    day = date.fromisoformat(run_date).toordinal()
    instructions = [
        ("Where relevant, state the formula or theorem you use.", "若适用，请写出所用公式或定理。"),
        ("Give the answer in exact form where possible.", "能精确表示时，请给出精确形式。"),
        ("Show the main steps clearly.", "请清楚写出主要步骤。"),
        ("Check any necessary restrictions or conditions.", "请检查必要的限制条件或适用条件。"),
    ]
    for row in questions:
        en, cn = instructions[(day + row["n"]) % len(instructions)]
        row["q_en"] = f"{row['q_en']} {en}"
        row["q_cn"] = f"{row['q_cn']} {cn}"


TYPE_VARIANTS = {
    "Mathematical Logic and Basic Set Theory": [
        ("Give a counterexample if a statement is false.", "若命题为假，请给出反例。"),
        ("Write the final answer using symbolic notation.", "最后用数学符号写出结论。"),
        ("Explain the reason in one complete sentence.", "用一句完整的话说明理由。"),
    ],
    "Real Numbers": [
        ("Keep radicals in simplified exact form.", "根式结果保留最简精确形式。"),
        ("State why the transformations preserve equality or order.", "说明变形为什么保持等式或大小关系。"),
        ("Check the domain or positivity condition before the final step.", "最后一步前检查定义域或正数条件。"),
    ],
    "Algebraic Expressions": [
        ("Show the factorisation or identity used.", "写出所用因式分解或乘法公式。"),
        ("Verify the result by expanding the final expression.", "将最终结果展开验算。"),
        ("Mention any excluded value if a fraction is simplified.", "若化简分式，请说明被排除的取值。"),
    ],
    "Equations, Inequalities, and Systems": [
        ("Give the solution set notation.", "用解集形式写出答案。"),
        ("Check the candidate solutions in the original equation.", "把候选解代回原方程检验。"),
        ("Mark excluded values before solving.", "先标出需要排除的取值。"),
    ],
    "Functions": [
        ("State the feature of the graph used in your reasoning.", "说明你使用了图像的哪个特征。"),
        ("Give both the formula and the requested numerical value.", "同时写出函数表达式和所求数值。"),
        ("Justify where the maximum or minimum is reached.", "说明最大值或最小值在哪里取得。"),
    ],
    "Sequences": [
        ("Identify whether the sequence is arithmetic, geometric, or recursive.", "先判断数列是等差、等比还是递推。"),
        ("Write the term formula or recurrence before substituting numbers.", "先写通项公式或递推式，再代入数值。"),
        ("State clearly which term or sum is being found.", "明确写出要求的是第几项或哪一段和。"),
    ],
    "Trigonometry": [
        ("Use exact trigonometric values, not decimal approximations.", "使用精确三角函数值，不用小数近似。"),
        ("Draw or describe the relevant triangle relation.", "画出或描述相关三角形关系。"),
        ("State the angle range when giving solutions.", "给出解时说明角的范围。"),
    ],
    "Planar Geometry": [
        ("Name the theorem used.", "写出所用定理名称。"),
        ("Show why the relevant triangles are right, similar, or congruent.", "说明相关三角形为什么是直角、相似或全等。"),
        ("Include units in the final answer where appropriate.", "有单位时在最终答案中写明单位。"),
    ],
    "Analytic Geometry on the Cartesian Plane": [
        ("Write the coordinate formula before substituting.", "先写坐标公式，再代入。"),
        ("Give the final line or circle equation in standard form.", "将直线或圆方程写成标准形式。"),
        ("Check the sign change caused by reflection or perpendicularity.", "检查对称或垂直导致的符号变化。"),
    ],
    "Solid Geometry": [
        ("State whether the answer is a length, area, or volume.", "说明答案是长度、面积还是体积。"),
        ("Keep π in the exact answer.", "答案中保留 π 的精确形式。"),
        ("Explain how the scale factor changes volume or area.", "说明相似比如何影响体积或面积。"),
    ],
    "Combinatorics and Probability": [
        ("State whether order matters.", "说明是否考虑顺序。"),
        ("Write the sample-space size and favourable cases.", "写出总情况数和有利情况数。"),
        ("Simplify the final probability or count.", "化简最终概率或计数结果。"),
    ],
    "Statistics": [
        ("Show the total sum and the number of data values.", "写出总和与数据个数。"),
        ("Sort the data before finding the median or mode.", "求中位数或众数前先排序。"),
        ("Write the weighted-mean equation explicitly.", "明确写出加权平均数方程。"),
    ],
}


def apply_type_variants(questions: list[dict], run_date: str) -> None:
    day = date.fromisoformat(run_date).toordinal()
    for row in questions:
        variants = TYPE_VARIANTS.get(row["topic_en"], [])
        if not variants:
            continue
        en, cn = variants[(day + row["n"]) % len(variants)]
        row["title_en"] = f"{row['title_en']} - Variant {((day + row['n']) % len(variants)) + 1}"
        row["title_cn"] = f"{row['title_cn']}（变式 {((day + row['n']) % len(variants)) + 1}）"
        row["q_en"] = f"{row['q_en']} {en}"
        row["q_cn"] = f"{row['q_cn']} {cn}"


def generate(run_date: str) -> list[dict]:
    rng = DailySelector(run_date)
    q = []
    n = 1

    # 1. Logic and sets
    topic = TOPICS[0]
    a, b, false_n = rng.choice([(6, 3, 3), (8, 4, 4), (10, 5, 5), (12, 6, 6)])
    q.append(item(n, topic, "Implication and converse", "蕴含与逆命题",
        f"Let p mean “n is divisible by {a}” and q mean “n is divisible by {b}”. Write p ⇒ q in words and decide whether the converse q ⇒ p is true for all integers n.",
        f"设 p 表示“n 能被 {a} 整除”，q 表示“n 能被 {b} 整除”。用文字写出 p ⇒ q，并判断逆命题 q ⇒ p 是否对所有整数 n 成立。",
        f"p ⇒ q means: if n is divisible by {a}, then n is divisible by {b}. Since {a} is divisible by {b}, this implication is true. The converse is false; n = {false_n} is divisible by {b} but not by {a}.",
        f"p ⇒ q 表示：若 n 能被 {a} 整除，则 n 能被 {b} 整除。因为 {a} 能被 {b} 整除，原命题为真。逆命题为假，例如 n = {false_n} 能被 {b} 整除但不能被 {a} 整除。",
        4, "Basic", "基础")); n += 1
    taut_en, taut_cn, taut_sol_en, taut_sol_cn = rng.choice([
        ("(p ∧ q) ⇒ p", "(p ∧ q) ⇒ p", "If p ∧ q is true, then p is true. If p ∧ q is false, the implication is true.", "若 p ∧ q 为真，则 p 必为真；若 p ∧ q 为假，则蕴含式为真。"),
        ("p ⇒ (p ∨ q)", "p ⇒ (p ∨ q)", "If p is true, then p ∨ q is true. If p is false, the implication is true.", "若 p 为真，则 p ∨ q 为真；若 p 为假，则蕴含式为真。"),
        ("¬(p ∧ q) ⇔ (¬p ∨ ¬q)", "¬(p ∧ q) ⇔ (¬p ∨ ¬q)", "This is De Morgan's law, so the two sides always have the same truth value.", "这是德摩根律，两边真值总是相同。"),
    ])
    q.append(item(n, topic, "Tautology check", "重言式判断",
        f"Use a truth table or logical reasoning to decide whether {taut_en} is a tautology.",
        f"用真值表或逻辑推理判断 {taut_cn} 是否为重言式。",
        f"{taut_sol_en} Hence every row is true, so it is a tautology.",
        f"{taut_sol_cn} 因此每一行都为真，是重言式。",
        4, "Basic", "基础")); n += 1
    upper = rng.choice([10, 12, 15])
    evens = [x for x in range(1, upper + 1) if x % 2 == 0]
    mult3 = [x for x in range(1, upper + 1) if x % 3 == 0]
    inter = sorted(set(evens) & set(mult3))
    union = sorted(set(evens) | set(mult3))
    comp = [x for x in range(1, upper + 1) if x not in evens]
    q.append(item(n, topic, "Set operations", "集合运算",
        f"Let U = {{1,2,...,{upper}}}, A = {{x ∈ U : x is even}}, and B = {{x ∈ U : x is divisible by 3}}. Find A ∩ B, A ∪ B, and U ∖ A. Also decide whether A ∩ B ⊂ A ∪ B.",
        f"设 U = {{1,2,...,{upper}}}，A = {{x ∈ U : x 为偶数}}，B = {{x ∈ U : x 能被 3 整除}}。求 A ∩ B、A ∪ B 和 U ∖ A，并判断 A ∩ B ⊂ A ∪ B 是否成立。",
        f"A = {fmt_set(evens)}, B = {fmt_set(mult3)}. Therefore A ∩ B = {fmt_set(inter)}, A ∪ B = {fmt_set(union)}, and U ∖ A = {fmt_set(comp)}. Since every element of A ∩ B also belongs to A ∪ B, A ∩ B ⊂ A ∪ B.",
        f"A = {fmt_set(evens)}，B = {fmt_set(mult3)}。所以 A ∩ B = {fmt_set(inter)}，A ∪ B = {fmt_set(union)}，U ∖ A = {fmt_set(comp)}。因为 A ∩ B 的每个元素也属于 A ∪ B，所以 A ∩ B ⊂ A ∪ B。",
        6, "Medium", "中等")); n += 1
    roots = rng.sample([1, 2, 3, 4, 5], 2)
    s, p = sum(roots), roots[0] * roots[1]
    q.append(item(n, topic, "Quantified statement", "量词命题",
        f"Let A = {{x ∈ ℝ : x² − {s}x + {p} = 0}}. Write “every element of A is positive” using quantifiers and decide whether it is true.",
        f"设 A = {{x ∈ ℝ : x² − {s}x + {p} = 0}}。用量词写出“A 的每个元素都是正数”，并判断真假。",
        f"A = {{{roots[0]},{roots[1]}}}. The statement is ∀x ∈ A, x > 0. It is true because both roots are positive.",
        f"A = {{{roots[0]},{roots[1]}}}。命题为 ∀x ∈ A，x > 0。两个根均为正数，所以为真。",
        6, "Medium", "中等")); n += 1
    identity = rng.choice(["intersection", "union"])
    if identity == "intersection":
        id_q_en = "For arbitrary sets A, B, C, prove A ∖ (B ∩ C) = (A ∖ B) ∪ (A ∖ C)."
        id_q_cn = "对任意集合 A、B、C，证明 A ∖ (B ∩ C) = (A ∖ B) ∪ (A ∖ C)。"
        id_s_en = "For any x, x ∈ A ∖ (B ∩ C) means x ∈ A and not both x ∈ B and x ∈ C. Thus x ∈ A and (x ∉ B or x ∉ C), so x ∈ A ∖ B or x ∈ A ∖ C. The reverse implication is the same reasoning backward."
        id_s_cn = "任取 x。x ∈ A ∖ (B ∩ C) 表示 x ∈ A，且 x 不同时属于 B 和 C，即 x ∈ A 且（x ∉ B 或 x ∉ C）。所以 x ∈ A ∖ B 或 x ∈ A ∖ C。反向同理。"
    else:
        id_q_en = "For arbitrary sets A, B, C, prove A ∖ (B ∪ C) = (A ∖ B) ∩ (A ∖ C)."
        id_q_cn = "对任意集合 A、B、C，证明 A ∖ (B ∪ C) = (A ∖ B) ∩ (A ∖ C)。"
        id_s_en = "For any x, x ∈ A ∖ (B ∪ C) means x ∈ A, x ∉ B, and x ∉ C. Hence x ∈ A ∖ B and x ∈ A ∖ C. The reverse implication follows in the same way."
        id_s_cn = "任取 x。x ∈ A ∖ (B ∪ C) 表示 x ∈ A，且 x ∉ B、x ∉ C。因此 x ∈ A ∖ B 且 x ∈ A ∖ C。反向同理。"
    q.append(item(n, topic, "Set identity proof", "集合恒等式证明",
        id_q_en, id_q_cn, id_s_en, id_s_cn,
        8, "Stretch", "略高")); n += 1

    # 2. Real numbers
    topic = TOPICS[1]
    rad, simplified = rng.choice([(48, "2"), (75, "5/2"), (108, "3"), (147, "7/2")])
    q.append(item(n, topic, "Radicals and powers", "根式与幂",
        f"Simplify exactly: 2⁻¹ · √{rad} ÷ √3.",
        f"精确化简：2⁻¹ · √{rad} ÷ √3。",
        f"√{rad} ÷ √3 = √{rad//3}. Hence the value is ½√{rad//3} = {simplified}.",
        f"√{rad} ÷ √3 = √{rad//3}，所以结果为 ½√{rad//3} = {simplified}。",
        4, "Basic", "基础")); n += 1
    c, d, pos = rng.choice([(2, 6, 6), (3, 6, 4), (4, 8, 4)])
    q.append(item(n, topic, "Absolute value", "绝对值",
        f"Solve |{c}x − {d}| = {d}.",
        f"解 |{c}x − {d}| = {d}。",
        f"{c}x − {d} = {d} gives x = {pos}. Also {c}x − {d} = −{d} gives x = 0. The solution set is {{0, {pos}}}.",
        f"{c}x − {d} = {d} 得 x = {pos}；{c}x − {d} = −{d} 得 x = 0。解集为 {{0, {pos}}}。",
        4, "Basic", "基础")); n += 1
    base = rng.choice([2, 3])
    ans = rng.choice([2, 3, 4])
    shift = rng.choice([1, 2, 3])
    val = base ** ans + shift
    q.append(item(n, topic, "Logarithm", "对数",
        f"Solve log{to_sub(base)}(x − {shift}) = {ans}. State the domain condition.",
        f"解 log{to_sub(base)}(x − {shift}) = {ans}，并写出定义域条件。",
        f"The domain is x > {shift}. Since x − {shift} = {base}{to_sup(ans)} = {base**ans}, x = {val}.",
        f"定义域为 x > {shift}。由 x − {shift} = {base}{to_sup(ans)} = {base**ans}，得 x = {val}。",
        6, "Medium", "中等")); n += 1
    u, v, w, verdict = rng.choice([(11, 2, 18, ">"), (7, 5, 27, "<"), (13, 3, 32, "<")])
    q.append(item(n, topic, "Exact comparison", "精确比较",
        f"Without decimals, compare √{u} + √{v} and √{w}.",
        f"不用小数，比较 √{u} + √{v} 与 √{w} 的大小。",
        f"Both sides are positive. Squaring gives (√{u}+√{v})² = {u+v} + 2√{u*v}. This is {verdict} {w}, so √{u}+√{v} {verdict} √{w}.",
        f"两边均为正。平方得 (√{u}+√{v})² = {u+v} + 2√{u*v}。它 {verdict} {w}，所以 √{u}+√{v} {verdict} √{w}。",
        6, "Medium", "中等")); n += 1
    m = rng.choice([2, 3, 4])
    q.append(item(n, topic, "Mixed exact simplification", "综合精确化简",
        f"Simplify exactly: ({m}√12 − √27)².",
        f"精确化简：({m}√12 − √27)²。",
        f"√12 = 2√3 and √27 = 3√3. The expression is ({2*m}√3 − 3√3)² = ({2*m-3}√3)² = {(2*m-3)**2*3}.",
        f"√12 = 2√3，√27 = 3√3。原式 = ({2*m}√3 − 3√3)² = ({2*m-3}√3)² = {(2*m-3)**2*3}。",
        8, "Stretch", "略高")); n += 1

    # 3. Algebra
    topic = TOPICS[2]
    a, b = rng.choice([(2, 3), (3, 4), (4, 5)])
    q.append(item(n, topic, "Expansion", "展开",
        f"Expand and simplify ({a}x − {b})² − (x − {b})(x + {b}).",
        f"展开并化简 ({a}x − {b})² − (x − {b})(x + {b})。",
        f"({a}x − {b})² = {a*a}x² − {2*a*b}x + {b*b}; (x − {b})(x + {b}) = x² − {b*b}. The result is {a*a-1}x² − {2*a*b}x + {2*b*b}.",
        f"({a}x − {b})² = {a*a}x² − {2*a*b}x + {b*b}；(x − {b})(x + {b}) = x² − {b*b}。结果为 {a*a-1}x² − {2*a*b}x + {2*b*b}。",
        4, "Basic", "基础")); n += 1
    r1, r2 = rng.choice([(1, 5), (2, 6), (3, 7)])
    q.append(item(n, topic, "Factoring", "因式分解",
        f"Factor completely: x² − {r1+r2}x + {r1*r2}.",
        f"完全因式分解：x² − {r1+r2}x + {r1*r2}。",
        f"The two numbers are {r1} and {r2}, so x² − {r1+r2}x + {r1*r2} = (x − {r1})(x − {r2}).",
        f"两数为 {r1} 和 {r2}，所以 x² − {r1+r2}x + {r1*r2} = (x − {r1})(x − {r2})。",
        4, "Basic", "基础")); n += 1
    k = rng.choice([2, 3, 4])
    q.append(item(n, topic, "Rational expression", "分式化简",
        f"For x ≠ {k}, simplify (x² − {k*k})/(x − {k}) − 2x.",
        f"当 x ≠ {k} 时，化简 (x² − {k*k})/(x − {k}) − 2x。",
        f"x² − {k*k} = (x − {k})(x + {k}). Since x ≠ {k}, the fraction is x + {k}. The result is {k} − x.",
        f"x² − {k*k} = (x − {k})(x + {k})。因 x ≠ {k}，分式为 x + {k}。结果为 {k} − x。",
        6, "Medium", "中等")); n += 1
    div_expr, div_fact_en, div_fact_cn = rng.choice([
        ("n² + n", "n(n + 1)", "n(n + 1)"),
        ("n² − n", "n(n − 1)", "n(n − 1)"),
    ])
    q.append(item(n, topic, "Divisibility", "整除证明",
        f"Prove that {div_expr} is even for every integer n.",
        f"证明对任意整数 n，{div_expr} 为偶数。",
        f"{div_expr} = {div_fact_en}. The factors are consecutive integers, so one of them is even. Therefore the product is even.",
        f"{div_expr} = {div_fact_cn}。两个因子是连续整数，其中必有一个偶数，所以乘积为偶数。",
        6, "Medium", "中等")); n += 1
    rem_expr, rem_mod, rem_sol_en, rem_sol_cn = rng.choice([
        ("n³ − n", 6, "n³ − n = n(n − 1)(n + 1), the product of three consecutive integers. One factor is divisible by 3 and at least one is even.", "n³ − n = n(n − 1)(n + 1)，是三个连续整数的乘积。其中一个能被 3 整除，且至少一个为偶数。"),
        ("n³ + 3n² + 2n", 6, "n³ + 3n² + 2n = n(n + 1)(n + 2), the product of three consecutive integers. One factor is divisible by 3 and at least one is even.", "n³ + 3n² + 2n = n(n + 1)(n + 2)，是三个连续整数的乘积。其中一个能被 3 整除，且至少一个为偶数。"),
    ])
    q.append(item(n, topic, "Remainder proof", "余数证明",
        f"Prove that {rem_expr} is divisible by {rem_mod} for every integer n.",
        f"证明对任意整数 n，{rem_expr} 能被 {rem_mod} 整除。",
        f"{rem_sol_en} Therefore the product is divisible by {rem_mod}.",
        f"{rem_sol_cn} 所以乘积能被 {rem_mod} 整除。",
        8, "Stretch", "略高")); n += 1

    # 4. Equations
    topic = TOPICS[3]
    aa, bb = rng.choice([(3, 7), (4, 9), (5, 11)])
    q.append(item(n, topic, "Linear equation", "一次方程",
        f"Solve {aa}x − {bb} = {aa + bb}.",
        f"解方程 {aa}x − {bb} = {aa + bb}。",
        f"{aa}x = {aa + 2*bb}, so x = {(aa+2*bb)/aa:g}.",
        f"{aa}x = {aa + 2*bb}，所以 x = {(aa+2*bb)/aa:g}。",
        4, "Basic", "基础")); n += 1
    r1, r2 = rng.choice([(2, 5), (3, 6), (4, 7)])
    q.append(item(n, topic, "Quadratic equation", "二次方程",
        f"Solve x² − {r1+r2}x + {r1*r2} = 0.",
        f"解方程 x² − {r1+r2}x + {r1*r2} = 0。",
        f"x² − {r1+r2}x + {r1*r2} = (x − {r1})(x − {r2}), so x = {r1} or x = {r2}.",
        f"x² − {r1+r2}x + {r1*r2} = (x − {r1})(x − {r2})，所以 x = {r1} 或 x = {r2}。",
        4, "Basic", "基础")); n += 1
    p1, p2 = sorted(rng.sample([1, 2, 3, 4, 5], 2))
    q.append(item(n, topic, "Quadratic inequality", "二次不等式",
        f"Solve (x − {p1})(x − {p2}) ≤ 0.",
        f"解不等式 (x − {p1})(x − {p2}) ≤ 0。",
        f"The roots are {p1} and {p2}. Since the parabola opens upward, the expression is non-positive between the roots. The solution is [{p1},{p2}].",
        f"根为 {p1} 和 {p2}。开口向上，所以小于等于 0 的部分在两根之间。解集为 [{p1},{p2}]。",
        6, "Medium", "中等")); n += 1
    sx, sy = rng.choice([(3, 5), (2, 4), (4, 3)])
    c1, c2 = sx + 2 * sy, 3 * sx - sy
    q.append(item(n, topic, "Linear system", "二元一次方程组",
        f"Solve the system x + 2y = {c1} and 3x − y = {c2}.",
        f"解方程组 x + 2y = {c1}，3x − y = {c2}。",
        f"From x = {c1} − 2y. Substitute: 3({c1} − 2y) − y = {c2}, so {3*c1} − 7y = {c2}, y = {sy} and x = {sx}.",
        f"由 x = {c1} − 2y。代入得 3({c1} − 2y) − y = {c2}，即 {3*c1} − 7y = {c2}，所以 y = {sy}，x = {sx}。",
        6, "Medium", "中等")); n += 1
    rat = rng.choice([2, 3])
    q.append(item(n, topic, "Rational equation", "分式方程",
        f"Solve 1/(x − {rat}) + 1/(x + {rat}) = 1.",
        f"解方程 1/(x − {rat}) + 1/(x + {rat}) = 1。",
        f"The excluded values are x ≠ ±{rat}. Combining fractions gives 2x/(x² − {rat*rat}) = 1, so x² − 2x − {rat*rat} = 0. Thus x = 1 ± √{rat*rat+1}, both allowed.",
        f"排除 x ≠ ±{rat}。通分得 2x/(x² − {rat*rat}) = 1，所以 x² − 2x − {rat*rat} = 0。故 x = 1 ± √{rat*rat+1}，均符合限制。",
        8, "Stretch", "略高")); n += 1

    # 5. Functions
    topic = TOPICS[4]
    m = rng.choice([2, 3, -2])
    b0 = rng.choice([1, 4, -3])
    x0 = rng.choice([1, 2])
    y0 = m * x0 + b0
    q.append(item(n, topic, "Linear function", "一次函数",
        f"A linear function has slope {m} and passes through ({x0},{y0}). Find its formula.",
        f"一次函数斜率为 {m}，且经过点 ({x0},{y0})。求解析式。",
        f"Use y = {m}x + b. Substituting ({x0},{y0}) gives {y0} = {m*x0} + b, so b = {b0}. Thus y = {m}x{fmt_signed(b0)}.",
        f"设 y = {m}x + b。代入 ({x0},{y0}) 得 {y0} = {m*x0} + b，所以 b = {b0}。故 y = {m}x{fmt_signed(b0)}。",
        4, "Basic", "基础")); n += 1
    h, kk = rng.choice([(1, 2), (2, -1), (-1, 3)])
    q.append(item(n, topic, "Quadratic vertex", "二次函数顶点",
        f"Find the vertex and minimum value of f(x) = ({fmt_x_minus(h)})²{fmt_signed(kk)}.",
        f"求 f(x) = ({fmt_x_minus(h)})²{fmt_signed(kk)} 的顶点和最小值。",
        f"The vertex form shows the vertex is ({h},{kk}). Since the coefficient of the square is positive, the minimum value is {kk}.",
        f"由顶点式可知顶点为 ({h},{kk})。平方项系数为正，所以最小值为 {kk}。",
        4, "Basic", "基础")); n += 1
    left, mid, right, maxv = rng.choice([(-3, 2, 5, 7), (-4, 1, 6, 9), (-2, 3, 7, 8)])
    q.append(item(n, topic, "Maximum on interval", "区间最大值",
        f"A function is increasing on [{left},{mid}], decreasing on [{mid},{right}], and f({mid})={maxv}. What is its maximum value on [{left},{right}]?",
        f"某函数在 [{left},{mid}] 上递增，在 [{mid},{right}] 上递减，且 f({mid})={maxv}。求它在 [{left},{right}] 上的最大值。",
        f"The function rises until x = {mid} and then falls. Hence the maximum occurs at x = {mid} and equals {maxv}.",
        f"函数先升至 x = {mid}，再下降，所以最大值在 x = {mid} 处取得，最大值为 {maxv}。",
        6, "Medium", "中等")); n += 1
    start, factor, hours = rng.choice([(80, "1.1", 2), (100, "1.2", 2), (50, "1.5", 3)])
    amount = start * (float(factor) ** hours)
    q.append(item(n, topic, "Exponential model", "指数模型",
        f"A quantity is multiplied by {factor} each hour. It starts at {start}. Write a formula for the amount after t hours and find the amount after {hours} hours.",
        f"某数量每小时乘以 {factor}，初始值为 {start}。写出 t 小时后的表达式，并求 {hours} 小时后的值。",
        f"A(t)={start}·{factor}ᵗ. After {hours} hours, A({hours})={start}·{factor}{to_sup(hours)}={amount:g}.",
        f"A(t)={start}·{factor}ᵗ。{hours} 小时后 A({hours})={start}·{factor}{to_sup(hours)}={amount:g}。",
        6, "Medium", "中等")); n += 1
    per = rng.choice([40, 48, 56])
    half = per // 2
    side = per // 4
    q.append(item(n, topic, "Optimization", "最值优化",
        f"A rectangle has perimeter {per}. Find the dimensions giving the maximum area.",
        f"某矩形周长为 {per}，求面积最大时的尺寸。",
        f"Let sides be x and {half} − x. Area A=x({half} − x)=−x²+{half}x. The vertex is at x={side}, so the rectangle is {side} by {side}.",
        f"设两边为 x 和 {half} − x。面积 A=x({half} − x)=−x²+{half}x。顶点在 x={side}，所以矩形为 {side} × {side}。",
        8, "Stretch", "略高")); n += 1

    # 6. Sequences
    topic = TOPICS[5]
    a1, d = rng.choice([(3, 4), (5, 3), (2, 6)])
    q.append(item(n, topic, "Arithmetic term", "等差数列通项",
        f"An arithmetic sequence has a₁ = {a1} and common difference d = {d}. Find a₁₀.",
        f"等差数列满足 a₁ = {a1}，公差 d = {d}。求 a₁₀。",
        f"a₁₀ = {a1} + 9·{d} = {a1+9*d}.",
        f"a₁₀ = {a1} + 9·{d} = {a1+9*d}。",
        4, "Basic", "基础")); n += 1
    a20 = a1 + 19 * d
    q.append(item(n, topic, "Arithmetic sum", "等差数列求和",
        f"An arithmetic sequence has a₁ = {a1} and a₂₀ = {a20}. Find S₂₀.",
        f"等差数列满足 a₁ = {a1}，a₂₀ = {a20}。求 S₂₀。",
        f"S₂₀ = 20({a1}+{a20})/2 = {10*(a1+a20)}.",
        f"S₂₀ = 20({a1}+{a20})/2 = {10*(a1+a20)}。",
        4, "Basic", "基础")); n += 1
    b1, ratio = rng.choice([(2, 3), (3, 2), (4, 2)])
    q.append(item(n, topic, "Geometric sequence", "等比数列",
        f"A geometric sequence has b₁ = {b1} and common ratio q = {ratio}. Find b₅ and the sum of the first five terms.",
        f"等比数列满足 b₁ = {b1}，公比 q = {ratio}。求 b₅ 和前五项和。",
        f"b₅ = {b1}·{ratio}⁴ = {b1*ratio**4}. The sum is {b1}({ratio}⁵−1)/({ratio}−1) = {b1*(ratio**5-1)//(ratio-1)}.",
        f"b₅ = {b1}·{ratio}⁴ = {b1*ratio**4}。前五项和为 {b1}({ratio}⁵−1)/({ratio}−1) = {b1*(ratio**5-1)//(ratio-1)}。",
        6, "Medium", "中等")); n += 1
    rec_a1, rec_mul, rec_add = rng.choice([(1, 3, 1), (2, 2, 3), (1, 4, 2)])
    rec_a2 = rec_mul * rec_a1 + rec_add
    rec_a3 = rec_mul * rec_a2 + rec_add
    rec_a4 = rec_mul * rec_a3 + rec_add
    q.append(item(n, topic, "Recursive sequence", "递推数列",
        f"Let a₁ = {rec_a1} and aₙ₊₁ = {rec_mul}aₙ + {rec_add}. Find a₂, a₃, a₄ and decide whether these terms are increasing.",
        f"设 a₁ = {rec_a1}，aₙ₊₁ = {rec_mul}aₙ + {rec_add}。求 a₂、a₃、a₄，并判断是否递增。",
        f"a₂={rec_a2}, a₃={rec_a3}, a₄={rec_a4}. Since {rec_a1}<{rec_a2}<{rec_a3}<{rec_a4}, the terms are increasing.",
        f"a₂={rec_a2}，a₃={rec_a3}，a₄={rec_a4}。因为 {rec_a1}<{rec_a2}<{rec_a3}<{rec_a4}，所以递增。",
        6, "Medium", "中等")); n += 1
    row1, rowd, rows = rng.choice([(14, 3, 12), (12, 4, 10), (16, 2, 15)])
    last = row1 + (rows - 1) * rowd
    total = rows * (row1 + last) // 2
    q.append(item(n, topic, "Sequence application", "数列应用",
        f"A hall has {row1} seats in the first row, {row1+rowd} in the second, {row1+2*rowd} in the third, and so on. How many seats are in the first {rows} rows?",
        f"某大厅第一排 {row1} 个座位，第二排 {row1+rowd} 个，第三排 {row1+2*rowd} 个，依此类推。前 {rows} 排共有多少座位？",
        f"This is arithmetic with a₁={row1}, d={rowd}, a{to_sub(rows)}={row1}+{rows-1}·{rowd}={last}. S{to_sub(rows)}={rows}({row1}+{last})/2={total}.",
        f"这是等差数列，a₁={row1}，d={rowd}，a{to_sub(rows)}={row1}+{rows-1}·{rowd}={last}。S{to_sub(rows)}={rows}({row1}+{last})/2={total}。",
        8, "Stretch", "略高")); n += 1

    # 7-12 from stable template variants
    n = add_geometry_probability_statistics(q, n, rng)
    assert n == 61
    apply_type_variants(q, run_date)
    apply_daily_instructions(q, run_date)
    return q


def add_geometry_probability_statistics(q: list[dict], n: int, rng: random.Random) -> int:
    # Trigonometry
    topic = TOPICS[6]
    trig_expr = rng.choice([
        ("2sin 30° + cos 60° − tan 45°", "2·½ + ½ − 1 = ½"),
        ("sin 60° · 2 − cos 30°", "2·√3/2 − √3/2 = √3/2"),
        ("tan 45° + cos 60° − sin 30°", "1 + ½ − ½ = 1"),
    ])
    angle, hyp, opp, other = rng.choice([(30, 14, 7, "7√3"), (45, 10, "5√2", "5√2"), (60, 12, "6√3", "6")])
    ca, cb, cc = rng.choice([(8, 5, 60), (7, 9, 60), (6, 10, 90)])
    side_sq = ca * ca + cb * cb - (ca * cb if cc == 60 else 0)
    side = "√" + str(side_sq)
    if side_sq in [49, 64, 100]:
        side = str(int(side_sq ** 0.5))
    area_a, area_b, area_angle, area_value = rng.choice([(12, 4, 45, "12√2"), (10, 6, 30, "15"), (8, 8, 60, "16√3")])
    trig_rhs, trig_solutions = rng.choice([("½", "30° and 150°"), ("√2/2", "45° and 135°"), ("√3/2", "60° and 120°")])
    q.extend([
        item(n, topic, "Special angles", "特殊角", f"Calculate {trig_expr[0]}.", f"计算 {trig_expr[0]}。", f"{trig_expr[1]}.", f"{trig_expr[1]}。", 4, "Basic", "基础"),
        item(n+1, topic, "Right triangle", "直角三角形", f"In a right triangle, an acute angle is {angle}° and the hypotenuse is {hyp}. Find the two legs.", f"在直角三角形中，一个锐角为 {angle}°，斜边为 {hyp}。求两条直角边。", f"The leg opposite {angle}° is {opp}. The other leg is {other}.", f"{angle}° 所对直角边为 {opp}，另一条直角边为 {other}。", 4, "Basic", "基础"),
        item(n+2, topic, "Cosine rule", "余弦定理", f"In triangle ABC, AB = {ca}, AC = {cb}, and ∠A = {cc}°. Find BC.", f"在三角形 ABC 中，AB = {ca}，AC = {cb}，∠A = {cc}°。求 BC。", f"BC² = {ca}² + {cb}² − 2·{ca}·{cb}·cos {cc}° = {side_sq}, so BC = {side}.", f"BC² = {ca}² + {cb}² − 2·{ca}·{cb}·cos {cc}° = {side_sq}，所以 BC = {side}。", 6, "Medium", "中等"),
        item(n+3, topic, "Triangle area", "三角形面积", f"In triangle ABC, AB = {area_a}, AC = {area_b}, and ∠A = {area_angle}°. Find the area.", f"在三角形 ABC 中，AB = {area_a}，AC = {area_b}，∠A = {area_angle}°。求面积。", f"P = ½·{area_a}·{area_b}·sin {area_angle}° = {area_value}.", f"P = ½·{area_a}·{area_b}·sin {area_angle}° = {area_value}。", 6, "Medium", "中等"),
        item(n+4, topic, "Trigonometric equation", "三角方程", f"Solve sin x = {trig_rhs} for 0° ≤ x ≤ 180°.", f"解 sin x = {trig_rhs}，其中 0° ≤ x ≤ 180°。", f"The solutions are x = {trig_solutions}.", f"解为 x = {trig_solutions.replace(' and ', ' 和 ')}。", 8, "Stretch", "略高"),
    ]); n += 5
    # Planar geometry
    topic = TOPICS[7]
    rect_side, rect_diag = rng.choice([(12, 20), (9, 15), (7, 25)])
    rect_other = int((rect_diag * rect_diag - rect_side * rect_side) ** 0.5)
    radius, op = rng.choice([(5, 13), (6, 10), (8, 17)])
    tangent = int((op * op - radius * radius) ** 0.5)
    ad, db, ae = rng.choice([(4, 8, 5), (3, 6, 4), (5, 10, 6)])
    ab = ad + db
    ac = ae * ab // ad
    ec = ac - ae
    central = rng.choice([100, 110, 124])
    proof_target = rng.choice(["opposite sides", "diagonals"])
    if proof_target == "opposite sides":
        proof_q_en = "In a parallelogram ABCD, prove that opposite sides are equal."
        proof_q_cn = "在平行四边形 ABCD 中，证明对边相等。"
        proof_s_en = "Draw diagonal AC. Since AB ∥ CD and BC ∥ AD, alternate interior angles give two equal angle pairs. The triangles are congruent, so AB=CD and BC=AD."
        proof_s_cn = "连接 AC。由 AB ∥ CD、BC ∥ AD 得两组内错角相等，三角形全等，所以 AB=CD，BC=AD。"
    else:
        proof_q_en = "In a parallelogram ABCD, prove that the diagonals bisect each other."
        proof_q_cn = "在平行四边形 ABCD 中，证明两条对角线互相平分。"
        proof_s_en = "Let diagonals meet at O. Parallel sides give equal alternate interior angles, so triangles AOB and COD are congruent. Hence AO=OC and BO=OD."
        proof_s_cn = "设对角线交于 O。由平行边得内错角相等，三角形 AOB 与 COD 全等，所以 AO=OC，BO=OD。"
    q.extend([
        item(n, topic, "Pythagorean theorem", "勾股定理", f"A rectangle has one side {rect_side} cm and diagonal {rect_diag} cm. Find the other side.", f"矩形一边为 {rect_side} cm，对角线为 {rect_diag} cm。求另一边。", f"The other side is √({rect_diag}²−{rect_side}²)={rect_other} cm.", f"另一边为 √({rect_diag}²−{rect_side}²)={rect_other} cm。", 4, "Basic", "基础"),
        item(n+1, topic, "Circle tangent", "圆与切线", f"Point P is {op} cm from the centre O of a circle of radius {radius} cm. PT is tangent to the circle. Find PT.", f"点 P 到圆心 O 的距离为 {op} cm，半径为 {radius} cm。PT 为切线。求 PT。", f"OT ⟂ PT, so PT² = {op}²−{radius}² and PT={tangent} cm.", f"OT ⟂ PT，所以 PT² = {op}²−{radius}²，PT={tangent} cm。", 4, "Basic", "基础"),
        item(n+2, topic, "Similar triangles", "相似三角形", f"In triangle ABC, DE ∥ BC, D ∈ AB, E ∈ AC, AD = {ad}, DB = {db}, and AE = {ae}. Find EC.", f"在三角形 ABC 中，DE ∥ BC，D ∈ AB，E ∈ AC，AD = {ad}，DB = {db}，AE = {ae}。求 EC。", f"AB={ab}, so AD/AB={ad}/{ab}. Hence AE/AC={ad}/{ab}, AC={ac}, and EC={ec}.", f"AB={ab}，所以 AD/AB={ad}/{ab}。故 AE/AC={ad}/{ab}，AC={ac}，EC={ec}。", 6, "Medium", "中等"),
        item(n+3, topic, "Circle angle", "圆中角", f"In a circle, an inscribed angle subtends an arc whose central angle is {central}°. Find the inscribed angle.", f"圆中某圆周角所对弧的圆心角为 {central}°。求该圆周角。", f"An inscribed angle equals half the central angle, so it is {central//2}°.", f"圆周角等于对应圆心角的一半，所以为 {central//2}°。", 6, "Medium", "中等"),
        item(n+4, topic, "Geometric proof", "几何证明", proof_q_en, proof_q_cn, proof_s_en, proof_s_cn, 8, "Stretch", "略高"),
    ]); n += 5
    # Analytic geometry
    topic = TOPICS[8]
    ax, ay, bx, by = rng.choice([(-3, 4, 5, -2), (-2, 3, 4, -5), (1, -4, 7, 4)])
    dist_sq = (bx - ax) ** 2 + (by - ay) ** 2
    dist = str(int(dist_sq ** 0.5)) if int(dist_sq ** 0.5) ** 2 == dist_sq else f"√{dist_sq}"
    x1, y1, x2, y2 = rng.choice([(2, -1, 6, 7), (1, -2, 5, 6), (-1, 3, 3, -5)])
    slope = (y2 - y1) // (x2 - x1)
    intercept = y1 - slope * x1
    px, py, base_slope, base_b, perp_slope = rng.choice([(1, 2, "−½", 3, 2), (2, 1, "−1/3", 4, 3), (-1, 4, "−1", 2, 1)])
    perp_b = py - perp_slope * px
    cx, cy, rr = rng.choice([(2, -3, 4), (-1, 2, 5), (3, 1, 6)])
    refl_axis, points, reflected = rng.choice([
        ("y-axis", [(-2, 1), (4, 3), (1, -5)], [(2, 1), (-4, 3), (-1, -5)]),
        ("x-axis", [(-1, 2), (3, 4), (2, -2)], [(-1, -2), (3, -4), (2, 2)]),
        ("origin", [(2, -1), (-3, 5), (4, 2)], [(-2, 1), (3, -5), (-4, -2)]),
    ])
    q.extend([
        item(n, topic, "Distance", "距离", f"Find the distance between A({ax},{ay}) and B({bx},{by}).", f"求 A({ax},{ay}) 与 B({bx},{by}) 的距离。", f"AB=√(({bx-ax})²+({by-ay})²)={dist}.", f"AB=√(({bx-ax})²+({by-ay})²)={dist}。", 4, "Basic", "基础"),
        item(n+1, topic, "Line equation", "直线方程", f"Find the line through ({x1},{y1}) and ({x2},{y2}).", f"求经过 ({x1},{y1}) 和 ({x2},{y2}) 的直线方程。", f"The slope is {slope}. Thus y{fmt_signed(-y1)}={slope}(x{fmt_signed(-x1)}), so y={slope}x{fmt_signed(intercept)}.", f"斜率为 {slope}。因此 y{fmt_signed(-y1)}={slope}(x{fmt_signed(-x1)})，所以 y={slope}x{fmt_signed(intercept)}。", 4, "Basic", "基础"),
        item(n+2, topic, "Perpendicular line", "垂线方程", f"Find the line through P({px},{py}) perpendicular to y = {base_slope}x + {base_b}.", f"求经过 P({px},{py}) 且垂直于 y = {base_slope}x + {base_b} 的直线。", f"The perpendicular slope is {perp_slope}. Thus y{fmt_signed(-py)}={perp_slope}(x{fmt_signed(-px)}), so y={perp_slope}x{fmt_signed(perp_b)}.", f"垂线斜率为 {perp_slope}。因此 y{fmt_signed(-py)}={perp_slope}(x{fmt_signed(-px)})，所以 y={perp_slope}x{fmt_signed(perp_b)}。", 6, "Medium", "中等"),
        item(n+3, topic, "Circle equation", "圆的方程", f"Find the equation of the circle with centre ({cx},{cy}) and radius {rr}.", f"求圆心为 ({cx},{cy})、半径为 {rr} 的圆方程。", f"The equation is ({fmt_var_minus('x', cx)})²+({fmt_var_minus('y', cy)})²={rr*rr}.", f"圆方程为 ({fmt_var_minus('x', cx)})²+({fmt_var_minus('y', cy)})²={rr*rr}。", 6, "Medium", "中等"),
        item(n+4, topic, "Reflection", "轴对称", f"Reflect triangle A{points[0]}, B{points[1]}, C{points[2]} in the {refl_axis}. Give the new coordinates.", f"将三角形 A{points[0]}、B{points[1]}、C{points[2]} 关于 {refl_axis} 对称。写出新坐标。", f"The reflected coordinates are A′{reflected[0]}, B′{reflected[1]}, C′{reflected[2]}.", f"对称后的坐标为 A′{reflected[0]}，B′{reflected[1]}，C′{reflected[2]}。", 8, "Stretch", "略高"),
    ]); n += 5
    # Solid geometry
    topic = TOPICS[9]
    e1, e2, e3 = rng.choice([(5, 6, 10), (3, 4, 12), (4, 7, 8)])
    diag_sq = e1 * e1 + e2 * e2 + e3 * e3
    diag = str(int(diag_sq ** 0.5)) if int(diag_sq ** 0.5) ** 2 == diag_sq else f"√{diag_sq}"
    cyl_r, cyl_h = rng.choice([(3, 12), (4, 9), (5, 8)])
    cone_r, cone_h = rng.choice([(6, 8), (5, 12), (8, 15)])
    cone_l = int((cone_r * cone_r + cone_h * cone_h) ** 0.5)
    sphere_r = rng.choice([3, 4, 5])
    small_len, large_len, small_vol = rng.choice([(2, 3, 48), (3, 5, 81), (4, 5, 128)])
    large_vol = small_vol * large_len ** 3 // small_len ** 3
    q.extend([
        item(n, topic, "Rectangular prism", "长方体", f"A rectangular prism has edges {e1}, {e2}, and {e3}. Find its volume and space diagonal.", f"长方体棱长为 {e1}、{e2}、{e3}。求体积和空间对角线。", f"Volume={e1}·{e2}·{e3}={e1*e2*e3}. Diagonal=√({e1}²+{e2}²+{e3}²)={diag}.", f"体积={e1}·{e2}·{e3}={e1*e2*e3}。空间对角线=√({e1}²+{e2}²+{e3}²)={diag}。", 4, "Basic", "基础"),
        item(n+1, topic, "Cylinder", "圆柱", f"A cylinder has radius {cyl_r} cm and height {cyl_h} cm. Find its volume.", f"圆柱半径为 {cyl_r} cm，高为 {cyl_h} cm。求体积。", f"V=πr²h=π·{cyl_r*cyl_r}·{cyl_h}={cyl_r*cyl_r*cyl_h}π cm³.", f"V=πr²h=π·{cyl_r*cyl_r}·{cyl_h}={cyl_r*cyl_r*cyl_h}π cm³。", 4, "Basic", "基础"),
        item(n+2, topic, "Cone", "圆锥", f"A cone has radius {cone_r} cm and height {cone_h} cm. Find its slant height and volume.", f"圆锥半径为 {cone_r} cm，高为 {cone_h} cm。求母线长和体积。", f"Slant height=√({cone_r}²+{cone_h}²)={cone_l}. Volume=⅓π·{cone_r*cone_r}·{cone_h}={cone_r*cone_r*cone_h//3}π cm³.", f"母线长=√({cone_r}²+{cone_h}²)={cone_l}。体积=⅓π·{cone_r*cone_r}·{cone_h}={cone_r*cone_r*cone_h//3}π cm³。", 6, "Medium", "中等"),
        item(n+3, topic, "Sphere", "球", f"A sphere has radius {sphere_r} cm. Find its surface area and volume.", f"球半径为 {sphere_r} cm。求表面积和体积。", f"Surface area=4πr²={4*sphere_r*sphere_r}π. Volume=4/3πr³={4*sphere_r**3}π/3.", f"表面积=4πr²={4*sphere_r*sphere_r}π。体积=4/3πr³={4*sphere_r**3}π/3。", 6, "Medium", "中等"),
        item(n+4, topic, "Similar solids", "相似立体", f"Two similar solids have corresponding lengths in ratio {small_len}:{large_len}. The smaller has volume {small_vol}. Find the larger volume.", f"两个相似立体对应长度比为 {small_len}:{large_len}。较小体积为 {small_vol}。求较大体积。", f"Volumes scale by the cube of the length ratio. Larger volume={small_vol}·({large_len}/{small_len})³={large_vol}.", f"体积按长度比的立方变化。较大体积={small_vol}·({large_len}/{small_len})³={large_vol}。", 8, "Stretch", "略高"),
    ]); n += 5
    # Combinatorics and probability
    topic = TOPICS[10]
    letters, digits = rng.choice([(2, 1), (1, 2), (3, 1)])
    codes = 26 ** letters * 10 ** digits
    students, team = rng.choice([(9, 2), (8, 3), (10, 3)])
    comb = 36 if (students, team) == (9, 2) else (56 if (students, team) == (8, 3) else 120)
    red, blue, green = rng.choice([(4, 3, 2), (3, 2, 1), (5, 4, 3)])
    total_balls = red + blue + green
    not_blue = total_balls - blue
    white, black = rng.choice([(5, 4), (4, 5), (6, 3)])
    prob_num = white * (white - 1)
    prob_den = (white + black) * (white + black - 1)
    arr_letters = rng.choice([5, 6, 7])
    block_fact = 1
    for value in range(1, arr_letters):
        block_fact *= value
    adjacent = block_fact * 2
    q.extend([
        item(n, topic, "Product rule", "乘法原理", f"A code has {letters} letters followed by {digits} digit{'s' if digits > 1 else ''}. Repetition is allowed. How many codes are possible?", f"一个代码由 {letters} 个字母后接 {digits} 个数字组成，允许重复。共有多少种？", f"There are 26{to_sup(letters)}·10{to_sup(digits)}={codes} possible codes.", f"共有 26{to_sup(letters)}·10{to_sup(digits)}={codes} 种。", 4, "Basic", "基础"),
        item(n+1, topic, "Combinations", "组合", f"From {students} students, how many {team}-student teams can be chosen?", f"从 {students} 名学生中选 {team} 人组成队伍，共有多少种？", f"The number is C({students},{team})={comb}.", f"共有 C({students},{team})={comb} 种。", 4, "Basic", "基础"),
        item(n+2, topic, "Classical probability", "古典概率", f"A box contains {red} red, {blue} blue, and {green} green balls. One ball is chosen. Find the probability that it is not blue.", f"盒中有 {red} 个红球、{blue} 个蓝球、{green} 个绿球。随机取 1 个球，求不是蓝球的概率。", f"There are {total_balls} balls total and {not_blue} are not blue. Probability={not_blue}/{total_balls}.", f"共有 {total_balls} 个球，其中 {not_blue} 个不是蓝球。概率为 {not_blue}/{total_balls}。", 6, "Medium", "中等"),
        item(n+3, topic, "Without replacement", "不放回概率", f"A bag has {white} white and {black} black balls. Two balls are drawn without replacement. Find the probability that both are white.", f"袋中有 {white} 个白球、{black} 个黑球。不放回抽取两个球。求两个都是白球的概率。", f"Probability=({white}/{white+black})({white-1}/{white+black-1})={prob_num}/{prob_den}.", f"概率=({white}/{white+black})({white-1}/{white+black-1})={prob_num}/{prob_den}。", 6, "Medium", "中等"),
        item(n+4, topic, "Restricted arrangements", "限制排列", f"How many arrangements of the first {arr_letters} letters of the alphabet have A and B adjacent?", f"前 {arr_letters} 个英文字母的排列中，A 和 B 相邻的有多少种？", f"Treat A and B as one block. There are ({arr_letters}-1)! ways to arrange the block and the other letters, and 2 orders inside the block, so ({arr_letters}-1)!·2={adjacent}.", f"把 A 和 B 看作一个整体，与其他字母共 {arr_letters-1} 个对象排列，内部 A/B 有 2 种顺序，所以 ({arr_letters}-1)!·2={adjacent}。", 8, "Stretch", "略高"),
    ]); n += 5
    # Statistics
    topic = TOPICS[11]
    mean_values = rng.choice([[5, 7, 9, 15], [4, 6, 10, 12], [3, 8, 11, 14]])
    mean = sum(mean_values) / len(mean_values)
    median_data, median, mode = rng.choice([
        ([2, 4, 4, 6, 9, 11], 5, 4),
        ([3, 5, 5, 8, 10, 12], 6.5, 5),
        ([1, 2, 7, 7, 9, 13], 7, 7),
    ])
    scores, weights = rng.choice([([60, 80, 100], [1, 2, 2]), ([70, 80, 90], [2, 3, 1]), ([50, 75, 95], [1, 1, 2])])
    weighted_sum = sum(score * weight for score, weight in zip(scores, weights))
    weight_total = sum(weights)
    missing_mean, known = rng.choice([(11, [8, 10, 12, 14]), (9, [6, 8, 10, 12]), (12, [9, 11, 13, 15])])
    missing = 5 * missing_mean - sum(known)
    freq_values, freq_known, freq_mean, kval = rng.choice([
        ([1, 3, 5, 7], [2, 4, 1], 4, 3),
        ([2, 4, 6, 8], [1, 3, 2], 6, 5),
        ([3, 6, 9, 12], [2, 1, 3], 8, 2),
    ])
    q.extend([
        item(n, topic, "Mean", "平均数", f"Find the mean of {', '.join(map(str, mean_values))}.", f"求 {'、'.join(map(str, mean_values))} 的平均数。", f"Mean=({' + '.join(map(str, mean_values))})/{len(mean_values)}={mean:g}.", f"平均数=({' + '.join(map(str, mean_values))})/{len(mean_values)}={mean:g}。", 4, "Basic", "基础"),
        item(n+1, topic, "Median and mode", "中位数与众数", f"Find the median and mode of {', '.join(map(str, median_data))}.", f"求 {'、'.join(map(str, median_data))} 的中位数和众数。", f"Median={median}. Mode={mode}.", f"中位数={median}。众数={mode}。", 4, "Basic", "基础"),
        item(n+2, topic, "Weighted mean", "加权平均数", f"Scores {', '.join(map(str, scores))} have weights {', '.join(map(str, weights))}. Find the weighted mean.", f"分数 {'、'.join(map(str, scores))} 的权重分别为 {'、'.join(map(str, weights))}。求加权平均数。", f"Weighted mean={weighted_sum}/{weight_total}={weighted_sum/weight_total:g}.", f"加权平均数={weighted_sum}/{weight_total}={weighted_sum/weight_total:g}。", 6, "Medium", "中等"),
        item(n+3, topic, "Missing value", "缺失数据", f"Five numbers have mean {missing_mean}. Four of them are {', '.join(map(str, known))}. Find the fifth number.", f"五个数的平均数为 {missing_mean}，其中四个为 {'、'.join(map(str, known))}。求第五个数。", f"The total is 5·{missing_mean}={5*missing_mean}. The known sum is {sum(known)}, so the fifth number is {missing}.", f"总和为 5·{missing_mean}={5*missing_mean}。已知四个数之和为 {sum(known)}，所以第五个数为 {missing}。", 6, "Medium", "中等"),
        item(n+4, topic, "Frequency table", "频数表", f"Values {', '.join(map(str, freq_values))} occur with frequencies {', '.join(map(str, freq_known))}, k. If the mean is {freq_mean}, find k.", f"数值 {'、'.join(map(str, freq_values))} 的频数分别为 {'、'.join(map(str, freq_known))}、k。若平均数为 {freq_mean}，求 k。", f"Substitute the values into the weighted mean equation and solve; this gives k={kval}.", f"代入加权平均数方程并求解，得 k={kval}。", 8, "Stretch", "略高"),
    ]); n += 5
    return n


def to_sub(num: int) -> str:
    return str(num).translate(str.maketrans("0123456789", "₀₁₂₃₄₅₆₇₈₉"))


def validate(questions: list[dict]) -> None:
    if len(questions) != 60:
        raise ValueError(f"Expected 60 questions, got {len(questions)}")
    for i, row in enumerate(questions, start=1):
        if row["n"] != i:
            raise ValueError(f"Question numbering mismatch at {i}")
    for topic_en, _ in TOPICS:
        rows = [row for row in questions if row["topic_en"] == topic_en]
        if len(rows) != 5:
            raise ValueError(f"{topic_en} has {len(rows)} questions")
        if [row["diff_en"] for row in rows].count("Stretch") != 1:
            raise ValueError(f"{topic_en} must have one Stretch question")


def write_questions(path: Path, questions: list[dict], run_date: str) -> None:
    payload = json.dumps(questions, ensure_ascii=False, indent=2)
    path.write_text(
        f"window.WUST_QUESTION_SET_DATE = {json.dumps(run_date)};\n"
        f"window.WUST_QUESTIONS = {payload};\n",
        encoding="utf-8",
    )


def read_archive(path: Path) -> dict:
    if not path.exists():
        return {}
    text = path.read_text(encoding="utf-8").strip()
    prefix = "window.WUST_QUESTION_ARCHIVE = "
    if not text.startswith(prefix):
        raise ValueError(f"Archive file has unexpected format: {path}")
    payload = text[len(prefix):]
    if payload.endswith(";"):
        payload = payload[:-1]
    return json.loads(payload)


def write_archive(path: Path, questions: list[dict], run_date: str) -> None:
    archive = read_archive(path)
    archive[run_date] = questions
    ordered = {key: archive[key] for key in sorted(archive.keys(), reverse=True)}
    payload = json.dumps(ordered, ensure_ascii=False, indent=2)
    path.write_text(f"window.WUST_QUESTION_ARCHIVE = {payload};\n", encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--date", required=True)
    parser.add_argument("--site-questions", default="site/data/questions.js")
    parser.add_argument("--archive", default="site/data/archive.js")
    args = parser.parse_args()
    questions = generate(args.date)
    validate(questions)
    write_questions(Path(args.site_questions), questions, args.date)
    write_archive(Path(args.archive), questions, args.date)
    print(f"Updated {args.site_questions} for {args.date}")


if __name__ == "__main__":
    main()
