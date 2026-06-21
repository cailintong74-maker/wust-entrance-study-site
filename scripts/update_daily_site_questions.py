#!/usr/bin/env python3

from __future__ import annotations

import argparse
import json
import random
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


def to_sup(num: int) -> str:
    return str(num).translate(str.maketrans("0123456789", "⁰¹²³⁴⁵⁶⁷⁸⁹"))


def generate(run_date: str) -> list[dict]:
    rng = random.Random(run_date)
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
    q.append(item(n, topic, "Tautology check", "重言式判断",
        "Use a truth table or logical reasoning to decide whether (p ∧ q) ⇒ p is a tautology.",
        "用真值表或逻辑推理判断 (p ∧ q) ⇒ p 是否为重言式。",
        "If p ∧ q is true, then p is true. If p ∧ q is false, the implication is true. Hence every row is true, so it is a tautology.",
        "若 p ∧ q 为真，则 p 必为真；若 p ∧ q 为假，则蕴含式为真。因此每一行都为真，是重言式。",
        4, "Basic", "基础")); n += 1
    upper = rng.choice([10, 12, 15])
    evens = [x for x in range(1, upper + 1) if x % 2 == 0]
    mult3 = [x for x in range(1, upper + 1) if x % 3 == 0]
    inter = sorted(set(evens) & set(mult3))
    union = sorted(set(evens) | set(mult3))
    comp = [x for x in range(1, upper + 1) if x not in evens]
    q.append(item(n, topic, "Set operations", "集合运算",
        f"Let U = {{1,2,...,{upper}}}, A = {{x ∈ U : x is even}}, and B = {{x ∈ U : x is divisible by 3}}. Find A ∩ B, A ∪ B, and U ∖ A.",
        f"设 U = {{1,2,...,{upper}}}，A = {{x ∈ U : x 为偶数}}，B = {{x ∈ U : x 能被 3 整除}}。求 A ∩ B、A ∪ B 和 U ∖ A。",
        f"A = {fmt_set(evens)}, B = {fmt_set(mult3)}. Therefore A ∩ B = {fmt_set(inter)}, A ∪ B = {fmt_set(union)}, and U ∖ A = {fmt_set(comp)}.",
        f"A = {fmt_set(evens)}，B = {fmt_set(mult3)}。所以 A ∩ B = {fmt_set(inter)}，A ∪ B = {fmt_set(union)}，U ∖ A = {fmt_set(comp)}。",
        6, "Medium", "中等")); n += 1
    roots = rng.sample([1, 2, 3, 4, 5], 2)
    s, p = sum(roots), roots[0] * roots[1]
    q.append(item(n, topic, "Quantified statement", "量词命题",
        f"Let A = {{x ∈ ℝ : x² − {s}x + {p} = 0}}. Write “every element of A is positive” using quantifiers and decide whether it is true.",
        f"设 A = {{x ∈ ℝ : x² − {s}x + {p} = 0}}。用量词写出“A 的每个元素都是正数”，并判断真假。",
        f"A = {{{roots[0]},{roots[1]}}}. The statement is ∀x ∈ A, x > 0. It is true because both roots are positive.",
        f"A = {{{roots[0]},{roots[1]}}}。命题为 ∀x ∈ A，x > 0。两个根均为正数，所以为真。",
        6, "Medium", "中等")); n += 1
    q.append(item(n, topic, "Set identity proof", "集合恒等式证明",
        "For arbitrary sets A, B, C, prove A ∖ (B ∩ C) = (A ∖ B) ∪ (A ∖ C).",
        "对任意集合 A、B、C，证明 A ∖ (B ∩ C) = (A ∖ B) ∪ (A ∖ C)。",
        "For any x, x ∈ A ∖ (B ∩ C) means x ∈ A and not both x ∈ B and x ∈ C. Thus x ∈ A and (x ∉ B or x ∉ C), so x ∈ A ∖ B or x ∈ A ∖ C. The reverse implication is the same reasoning backward.",
        "任取 x。x ∈ A ∖ (B ∩ C) 表示 x ∈ A，且 x 不同时属于 B 和 C，即 x ∈ A 且（x ∉ B 或 x ∉ C）。所以 x ∈ A ∖ B 或 x ∈ A ∖ C。反向同理。",
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
    q.append(item(n, topic, "Divisibility", "整除证明",
        "Prove that n² + n is even for every integer n.",
        "证明对任意整数 n，n² + n 为偶数。",
        "n² + n = n(n + 1). The factors are consecutive integers, so one of them is even. Therefore the product is even.",
        "n² + n = n(n + 1)。两个因子是连续整数，其中必有一个偶数，所以乘积为偶数。",
        6, "Medium", "中等")); n += 1
    q.append(item(n, topic, "Remainder proof", "余数证明",
        "Prove that n³ − n is divisible by 6 for every integer n.",
        "证明对任意整数 n，n³ − n 能被 6 整除。",
        "n³ − n = n(n − 1)(n + 1), the product of three consecutive integers. One factor is divisible by 3 and at least one is even, so the product is divisible by 6.",
        "n³ − n = n(n − 1)(n + 1)，是三个连续整数的乘积。其中一个能被 3 整除，且至少一个为偶数，所以乘积能被 6 整除。",
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
    q.append(item(n, topic, "Linear system", "二元一次方程组",
        "Solve the system x + 2y = 13 and 3x − y = 4.",
        "解方程组 x + 2y = 13，3x − y = 4。",
        "From x = 13 − 2y. Substitute: 3(13 − 2y) − y = 4, so 39 − 7y = 4, y = 5 and x = 3.",
        "由 x = 13 − 2y。代入得 3(13 − 2y) − y = 4，即 39 − 7y = 4，所以 y = 5，x = 3。",
        6, "Medium", "中等")); n += 1
    q.append(item(n, topic, "Rational equation", "分式方程",
        "Solve 1/(x − 2) + 1/(x + 2) = 1.",
        "解方程 1/(x − 2) + 1/(x + 2) = 1。",
        "The excluded values are x ≠ ±2. Combining fractions gives 2x/(x² − 4) = 1, so x² − 2x − 4 = 0. Thus x = 1 ± √5, both allowed.",
        "排除 x ≠ ±2。通分得 2x/(x² − 4) = 1，所以 x² − 2x − 4 = 0。故 x = 1 ± √5，均符合限制。",
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
    q.append(item(n, topic, "Maximum on interval", "区间最大值",
        "A function is increasing on [−3,2], decreasing on [2,5], and f(2)=7. What is its maximum value on [−3,5]?",
        "某函数在 [−3,2] 上递增，在 [2,5] 上递减，且 f(2)=7。求它在 [−3,5] 上的最大值。",
        "The function rises until x = 2 and then falls. Hence the maximum occurs at x = 2 and equals 7.",
        "函数先升至 x = 2，再下降，所以最大值在 x = 2 处取得，最大值为 7。",
        6, "Medium", "中等")); n += 1
    q.append(item(n, topic, "Exponential model", "指数模型",
        "A quantity is multiplied by 1.1 each hour. It starts at 80. Write a formula for the amount after t hours and find the amount after 2 hours.",
        "某数量每小时乘以 1.1，初始值为 80。写出 t 小时后的表达式，并求 2 小时后的值。",
        "A(t)=80·1.1ᵗ. After 2 hours, A(2)=80·1.1²=96.8.",
        "A(t)=80·1.1ᵗ。2 小时后 A(2)=80·1.1²=96.8。",
        6, "Medium", "中等")); n += 1
    q.append(item(n, topic, "Optimization", "最值优化",
        "A rectangle has perimeter 48. Find the dimensions giving the maximum area.",
        "某矩形周长为 48，求面积最大时的尺寸。",
        "Let sides be x and 24 − x. Area A=x(24 − x)=−x²+24x. The vertex is at x=12, so the rectangle is 12 by 12.",
        "设两边为 x 和 24 − x。面积 A=x(24 − x)=−x²+24x。顶点在 x=12，所以矩形为 12 × 12。",
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
    q.append(item(n, topic, "Recursive sequence", "递推数列",
        "Let a₁ = 1 and aₙ₊₁ = 3aₙ + 1. Find a₂, a₃, a₄ and decide whether these terms are increasing.",
        "设 a₁ = 1，aₙ₊₁ = 3aₙ + 1。求 a₂、a₃、a₄，并判断是否递增。",
        "a₂=4, a₃=13, a₄=40. Since 1<4<13<40, the terms are increasing.",
        "a₂=4，a₃=13，a₄=40。因为 1<4<13<40，所以递增。",
        6, "Medium", "中等")); n += 1
    q.append(item(n, topic, "Sequence application", "数列应用",
        "A hall has 14 seats in the first row, 17 in the second, 20 in the third, and so on. How many seats are in the first 12 rows?",
        "某大厅第一排 14 个座位，第二排 17 个，第三排 20 个，依此类推。前 12 排共有多少座位？",
        "This is arithmetic with a₁=14, d=3, a₁₂=14+11·3=47. S₁₂=12(14+47)/2=366.",
        "这是等差数列，a₁=14，d=3，a₁₂=14+11·3=47。S₁₂=12(14+47)/2=366。",
        8, "Stretch", "略高")); n += 1

    # 7-12 from stable template variants
    n = add_geometry_probability_statistics(q, n, rng)
    assert n == 61
    return q


def add_geometry_probability_statistics(q: list[dict], n: int, rng: random.Random) -> int:
    # Trigonometry
    topic = TOPICS[6]
    q.extend([
        item(n, topic, "Special angles", "特殊角", "Calculate 2sin 30° + cos 60° − tan 45°.", "计算 2sin 30° + cos 60° − tan 45°。", "2·½ + ½ − 1 = ½.", "2·½ + ½ − 1 = ½。", 4, "Basic", "基础"),
        item(n+1, topic, "Right triangle", "直角三角形", "In a right triangle, an acute angle is 30° and the hypotenuse is 14. Find the two legs.", "在直角三角形中，一个锐角为 30°，斜边为 14。求两条直角边。", "The leg opposite 30° is 7. The other leg is 7√3.", "30° 所对直角边为 7，另一条直角边为 7√3。", 4, "Basic", "基础"),
        item(n+2, topic, "Cosine rule", "余弦定理", "In triangle ABC, AB = 8, AC = 5, and ∠A = 60°. Find BC.", "在三角形 ABC 中，AB = 8，AC = 5，∠A = 60°。求 BC。", "BC² = 8² + 5² − 2·8·5·cos 60° = 49, so BC = 7.", "BC² = 8² + 5² − 2·8·5·cos 60° = 49，所以 BC = 7。", 6, "Medium", "中等"),
        item(n+3, topic, "Triangle area", "三角形面积", "In triangle ABC, AB = 12, AC = 4, and ∠A = 45°. Find the area.", "在三角形 ABC 中，AB = 12，AC = 4，∠A = 45°。求面积。", "P = ½·12·4·sin 45° = 24·√2/2 = 12√2.", "P = ½·12·4·sin 45° = 24·√2/2 = 12√2。", 6, "Medium", "中等"),
        item(n+4, topic, "Trigonometric equation", "三角方程", "Solve sin x = ½ for 0° ≤ x ≤ 180°.", "解 sin x = ½，其中 0° ≤ x ≤ 180°。", "The solutions are x = 30° and x = 150°.", "解为 x = 30° 和 x = 150°。", 8, "Stretch", "略高"),
    ]); n += 5
    # Planar geometry
    topic = TOPICS[7]
    q.extend([
        item(n, topic, "Pythagorean theorem", "勾股定理", "A rectangle has one side 12 cm and diagonal 20 cm. Find the other side.", "矩形一边为 12 cm，对角线为 20 cm。求另一边。", "The other side is √(20²−12²)=√256=16 cm.", "另一边为 √(20²−12²)=√256=16 cm。", 4, "Basic", "基础"),
        item(n+1, topic, "Circle tangent", "圆与切线", "Point P is 13 cm from the centre O of a circle of radius 5 cm. PT is tangent to the circle. Find PT.", "点 P 到圆心 O 的距离为 13 cm，半径为 5 cm。PT 为切线。求 PT。", "OT ⟂ PT, so PT² = 13²−5²=144 and PT=12 cm.", "OT ⟂ PT，所以 PT² = 13²−5²=144，PT=12 cm。", 4, "Basic", "基础"),
        item(n+2, topic, "Similar triangles", "相似三角形", "In triangle ABC, DE ∥ BC, D ∈ AB, E ∈ AC, AD = 4, DB = 8, and AE = 5. Find EC.", "在三角形 ABC 中，DE ∥ BC，D ∈ AB，E ∈ AC，AD = 4，DB = 8，AE = 5。求 EC。", "AB=12, so AD/AB=1/3. Hence AE/AC=1/3, AC=15, and EC=10.", "AB=12，所以 AD/AB=1/3。故 AE/AC=1/3，AC=15，EC=10。", 6, "Medium", "中等"),
        item(n+3, topic, "Circle angle", "圆中角", "In a circle, an inscribed angle subtends an arc whose central angle is 124°. Find the inscribed angle.", "圆中某圆周角所对弧的圆心角为 124°。求该圆周角。", "An inscribed angle equals half the central angle, so it is 62°.", "圆周角等于对应圆心角的一半，所以为 62°。", 6, "Medium", "中等"),
        item(n+4, topic, "Geometric proof", "几何证明", "In a parallelogram ABCD, prove that opposite sides are equal.", "在平行四边形 ABCD 中，证明对边相等。", "Draw diagonal AC. Since AB ∥ CD and BC ∥ AD, alternate interior angles give two equal angle pairs. The triangles are congruent, so AB=CD and BC=AD.", "连接 AC。由 AB ∥ CD、BC ∥ AD 得两组内错角相等，三角形全等，所以 AB=CD，BC=AD。", 8, "Stretch", "略高"),
    ]); n += 5
    # Analytic geometry
    topic = TOPICS[8]
    q.extend([
        item(n, topic, "Distance", "距离", "Find the distance between A(−3,4) and B(5,−2).", "求 A(−3,4) 与 B(5,−2) 的距离。", "AB=√(8²+(-6)²)=√100=10.", "AB=√(8²+(-6)²)=√100=10。", 4, "Basic", "基础"),
        item(n+1, topic, "Line equation", "直线方程", "Find the line through (2,−1) and (6,7).", "求经过 (2,−1) 和 (6,7) 的直线方程。", "The slope is 8/4=2. Thus y+1=2(x−2), so y=2x−5.", "斜率为 8/4=2。因此 y+1=2(x−2)，所以 y=2x−5。", 4, "Basic", "基础"),
        item(n+2, topic, "Perpendicular line", "垂线方程", "Find the line through P(1,2) perpendicular to y = −½x + 3.", "求经过 P(1,2) 且垂直于 y = −½x + 3 的直线。", "The perpendicular slope is 2. Thus y−2=2(x−1), so y=2x.", "垂线斜率为 2。因此 y−2=2(x−1)，所以 y=2x。", 6, "Medium", "中等"),
        item(n+3, topic, "Circle equation", "圆的方程", "Find the equation of the circle with centre (2,−3) and radius 4.", "求圆心为 (2,−3)、半径为 4 的圆方程。", "The equation is (x−2)²+(y+3)²=16.", "圆方程为 (x−2)²+(y+3)²=16。", 6, "Medium", "中等"),
        item(n+4, topic, "Reflection", "轴对称", "Reflect triangle A(−2,1), B(4,3), C(1,−5) in the y-axis. Give the new coordinates.", "将三角形 A(−2,1)、B(4,3)、C(1,−5) 关于 y 轴对称。写出新坐标。", "Reflection in the y-axis sends (x,y) to (−x,y). Thus A′(2,1), B′(−4,3), C′(−1,−5).", "关于 y 轴对称时 (x,y) 变为 (−x,y)。所以 A′(2,1)，B′(−4,3)，C′(−1,−5)。", 8, "Stretch", "略高"),
    ]); n += 5
    # Solid geometry
    topic = TOPICS[9]
    q.extend([
        item(n, topic, "Rectangular prism", "长方体", "A rectangular prism has edges 5, 6, and 10. Find its volume and space diagonal.", "长方体棱长为 5、6、10。求体积和空间对角线。", "Volume=5·6·10=300. Diagonal=√(5²+6²+10²)=√161.", "体积=5·6·10=300。空间对角线=√(5²+6²+10²)=√161。", 4, "Basic", "基础"),
        item(n+1, topic, "Cylinder", "圆柱", "A cylinder has radius 3 cm and height 12 cm. Find its volume.", "圆柱半径为 3 cm，高为 12 cm。求体积。", "V=πr²h=π·9·12=108π cm³.", "V=πr²h=π·9·12=108π cm³。", 4, "Basic", "基础"),
        item(n+2, topic, "Cone", "圆锥", "A cone has radius 6 cm and height 8 cm. Find its slant height and volume.", "圆锥半径为 6 cm，高为 8 cm。求母线长和体积。", "Slant height=√(6²+8²)=10. Volume=⅓π·36·8=96π cm³.", "母线长=√(6²+8²)=10。体积=⅓π·36·8=96π cm³。", 6, "Medium", "中等"),
        item(n+3, topic, "Sphere", "球", "A sphere has radius 4 cm. Find its surface area and volume.", "球半径为 4 cm。求表面积和体积。", "Surface area=4πr²=64π. Volume=4/3πr³=256π/3.", "表面积=4πr²=64π。体积=4/3πr³=256π/3。", 6, "Medium", "中等"),
        item(n+4, topic, "Similar solids", "相似立体", "Two similar solids have corresponding lengths in ratio 2:3. The smaller has volume 48. Find the larger volume.", "两个相似立体对应长度比为 2:3。较小体积为 48。求较大体积。", "Volumes scale by the cube of the length ratio. Larger volume=48·(3/2)³=162.", "体积按长度比的立方变化。较大体积=48·(3/2)³=162。", 8, "Stretch", "略高"),
    ]); n += 5
    # Combinatorics and probability
    topic = TOPICS[10]
    q.extend([
        item(n, topic, "Product rule", "乘法原理", "A code has two letters followed by one digit. Repetition is allowed. How many codes are possible?", "一个代码由两个字母后接一个数字组成，允许重复。共有多少种？", "There are 26·26·10=6760 possible codes.", "共有 26·26·10=6760 种。", 4, "Basic", "基础"),
        item(n+1, topic, "Combinations", "组合", "From 9 students, how many 2-student teams can be chosen?", "从 9 名学生中选 2 人组成队伍，共有多少种？", "The number is C(9,2)=9·8/(2·1)=36.", "共有 C(9,2)=9·8/(2·1)=36 种。", 4, "Basic", "基础"),
        item(n+2, topic, "Classical probability", "古典概率", "A box contains 4 red, 3 blue, and 2 green balls. One ball is chosen. Find the probability that it is not blue.", "盒中有 4 个红球、3 个蓝球、2 个绿球。随机取 1 个球，求不是蓝球的概率。", "There are 9 balls total and 6 are not blue. Probability=6/9=2/3.", "共有 9 个球，其中 6 个不是蓝球。概率为 6/9=2/3。", 6, "Medium", "中等"),
        item(n+3, topic, "Without replacement", "不放回概率", "A bag has 5 white and 4 black balls. Two balls are drawn without replacement. Find the probability that both are white.", "袋中有 5 个白球、4 个黑球。不放回抽取两个球。求两个都是白球的概率。", "Probability=(5/9)(4/8)=5/18.", "概率=(5/9)(4/8)=5/18。", 6, "Medium", "中等"),
        item(n+4, topic, "Restricted arrangements", "限制排列", "How many arrangements of A, B, C, D, E, F have A and B adjacent?", "字母 A、B、C、D、E、F 的排列中，A 和 B 相邻的有多少种？", "Treat A and B as one block. There are 5! ways to arrange the block with C,D,E,F and 2 orders inside the block, so 5!·2=240.", "把 A 和 B 看作一个整体，与 C,D,E,F 共 5 个对象排列，内部 A/B 有 2 种顺序，所以 5!·2=240。", 8, "Stretch", "略高"),
    ]); n += 5
    # Statistics
    topic = TOPICS[11]
    q.extend([
        item(n, topic, "Mean", "平均数", "Find the mean of 5, 7, 9, 15.", "求 5、7、9、15 的平均数。", "Mean=(5+7+9+15)/4=9.", "平均数=(5+7+9+15)/4=9。", 4, "Basic", "基础"),
        item(n+1, topic, "Median and mode", "中位数与众数", "Find the median and mode of 2, 4, 4, 6, 9, 11.", "求 2、4、4、6、9、11 的中位数和众数。", "Median=(4+6)/2=5. Mode=4.", "中位数=(4+6)/2=5。众数=4。", 4, "Basic", "基础"),
        item(n+2, topic, "Weighted mean", "加权平均数", "Scores 60, 80, 100 have weights 1, 2, 2. Find the weighted mean.", "分数 60、80、100 的权重分别为 1、2、2。求加权平均数。", "Weighted mean=(60·1+80·2+100·2)/(1+2+2)=420/5=84.", "加权平均数=(60·1+80·2+100·2)/(1+2+2)=420/5=84。", 6, "Medium", "中等"),
        item(n+3, topic, "Missing value", "缺失数据", "Five numbers have mean 11. Four of them are 8, 10, 12, and 14. Find the fifth number.", "五个数的平均数为 11，其中四个为 8、10、12、14。求第五个数。", "The total is 5·11=55. The known sum is 44, so the fifth number is 11.", "总和为 5·11=55。已知四个数之和为 44，所以第五个数为 11。", 6, "Medium", "中等"),
        item(n+4, topic, "Frequency table", "频数表", "Values 1, 3, 5, 7 occur with frequencies 2, 4, 1, k. If the mean is 4, find k.", "数值 1、3、5、7 的频数分别为 2、4、1、k。若平均数为 4，求 k。", "Weighted sum=1·2+3·4+5·1+7k=19+7k. Total frequency=7+k. (19+7k)/(7+k)=4 gives 19+7k=28+4k, so k=3.", "加权总和=1·2+3·4+5·1+7k=19+7k，总频数=7+k。由 (19+7k)/(7+k)=4，得 19+7k=28+4k，所以 k=3。", 8, "Stretch", "略高"),
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


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--date", required=True)
    parser.add_argument("--site-questions", default="site/data/questions.js")
    args = parser.parse_args()
    questions = generate(args.date)
    validate(questions)
    write_questions(Path(args.site_questions), questions, args.date)
    print(f"Updated {args.site_questions} for {args.date}")


if __name__ == "__main__":
    main()
