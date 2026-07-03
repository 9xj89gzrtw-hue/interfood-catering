#!/usr/bin/env python3
"""Анализ файла catering_inspiration_nilov.html глазами клиента"""
import re
from pathlib import Path

src = Path("/home/z/my-project/download/catering_inspiration_nilov.html").read_text(encoding="utf-8")

print("=" * 80)
print("АНАЛИЗ ФАЙЛА КАК КЛИЕНТ")
print("=" * 80)

# 1. Размер и общий вид
print(f"\nРазмер файла: {len(src)} байт, {src.count(chr(10))} строк")

# 2. Поиск служебных метаданных
print("\n" + "=" * 80)
print("1. СЛУЖЕБНЫЕ МЕТАДАННЫЕ / РАСКРЫТИЕ ПРОЦЕССА")
print("=" * 80)
suspicious_patterns = [
    r"v\d\.\d",
    r"Lovable",
    r"Vercel",
    r"промпт",
    r"добавлено",
    r"заменена",
    r"обновлено",
    r"версия",
    r"v2",
    r"v3",
    r"prompt",
    r"backend",
    r"frontend",
    r"deploy",
]
for pat in suspicious_patterns:
    matches = re.findall(rf".*{pat}.*", src, re.IGNORECASE)
    if matches:
        print(f"\n  Паттерн '{pat}': {len(matches)} совпадений")
        for m in matches[:5]:
            print(f"    {m.strip()[:150]}")

# 3. Поиск премиум-акцентов
print("\n" + "=" * 80)
print("2. ПРЕМИУМ-АКЦЕНТЫ (могут отпугнуть обычных клиентов)")
print("=" * 80)
premium_patterns = [
    r"премиум",
    r"premium",
    r"эксклюзивн",
    r"люкс",
    r"luxury",
    r"VIP",
    r"элитн",
    r"дорого",
    r"высокий чек",
    r"роскош",
    r"мирового уровня",
    r"мирового класс",
]
for pat in premium_patterns:
    matches = re.findall(rf".{{0,80}}{pat}.{{0,80}}", src, re.IGNORECASE)
    if matches:
        print(f"\n  Паттерн '{pat}': {len(matches)} совпадений")
        for m in matches[:8]:
            print(f"    ...{m.strip()[:200]}...")

# 4. Все заголовки h1, h2, h3
print("\n" + "=" * 80)
print("3. СТРУКТУРА ЗАГОЛОВКОВ")
print("=" * 80)
for m in re.finditer(r"<(h[1-3])[^>]*>(.*?)</\1>", src, re.DOTALL):
    text = re.sub(r"<[^>]+>", "", m.group(2)).strip()
    if text:
        print(f"  {m.group(1)}: {text[:120]}")

# 5. Все ссылки
print("\n" + "=" * 80)
print("4. ВСЕ ССЫЛКИ (для проверки)")
print("=" * 80)
urls = re.findall(r'href="(https?://[^"]+)"', src)
unique_urls = list(dict.fromkeys(urls))
print(f"Всего ссылок: {len(urls)}, уникальных: {len(unique_urls)}")
for u in unique_urls:
    print(f"  {u}")
