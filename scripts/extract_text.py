#!/usr/bin/env python3
"""Извлечь весь видимый текст из HTML"""
import re
from pathlib import Path

src = Path("/home/z/my-project/download/catering_inspiration_nilov.html").read_text(encoding="utf-8")

# Извлечь содержимое body
body_match = re.search(r"<body[^>]*>(.*?)</body>", src, re.DOTALL)
body = body_match.group(1) if body_match else src

# Удалить стили и скрипты
body = re.sub(r"<style[^>]*>.*?</style>", "", body, flags=re.DOTALL)
body = re.sub(r"<script[^>]*>.*?</script>", "", body, flags=re.DOTALL)
# Удалить комментарии
body = re.sub(r"<!--.*?-->", "", body, flags=re.DOTALL)

# Заменить теги на маркеры
body = re.sub(r"<br\s*/?>", "\n", body)
body = re.sub(r"</p>", "\n\n", body)
body = re.sub(r"</div>", "\n", body)
body = re.sub(r"</li>", "\n", body)
body = re.sub(r"</h[1-6]>", "\n\n", body)
body = re.sub(r"<[^>]+>", "", body)
body = re.sub(r"&nbsp;", " ", body)
body = re.sub(r"&mdash;", "—", body)
body = re.sub(r"&ndash;", "–", body)
body = re.sub(r"&laquo;", "«", body)
body = re.sub(r"&raquo;", "»", body)
body = re.sub(r"&amp;", "&", body)
body = re.sub(r"&lt;", "<", body)
body = re.sub(r"&gt;", ">", body)

# Удалить пустые строки
body = re.sub(r"\n\s*\n+", "\n\n", body)
body = re.sub(r"^\s+", "", body, flags=re.MULTILINE)

print(body)
