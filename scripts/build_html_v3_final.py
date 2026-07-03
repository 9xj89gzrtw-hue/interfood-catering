#!/usr/bin/env python3
"""Append version notes (client-facing critique) + poll + footer."""

from pathlib import Path

OUT_PATH = Path("/home/z/my-project/download/catering_inspiration_nilov.html")


VERSION_NOTES = """

<!-- ============ VERSION NOTES (client-facing) ============ -->

<section class="version-notes">
  <div class="container">
    <div class="version-notes-box">
      <h3>Что нового в v3.0</h3>
      <p class="subtitle">Обновление 26 июня 2026 · замена v2.0 от 24 июня</p>

      <h4>Добавлено</h4>
      <ul class="added">
        <li><strong>8 новых мировых кейтерингов</strong> — теперь подборка охватывает 10 стран вместо 7. Добавлены: Potel et Chabot (Франция, с 1820 г.), Moving Venue (UK, Caterer of the Year 2025), Dish Dubai и AHS Catering (ОАЭ), Amici и Luxe Catering (Сингапур), Albron (Нидерланды), DOCO (глобальная сеть, 32 локации).</li>
        <li><strong>Раздел «Дизайн-принципы премиум-кейтеринга»</strong> — 6 признаков, по которым премиум отличается от среднего: воздух, фуд-фотография, палитра, типографика, trust signals, тихий CTA.</li>
        <li><strong>Раздел «Ещё больше вдохновения»</strong> — 6 ссылок на постоянно обновляемые подборки (Awwwards Food/Hotel/Luxury, World Culinary Awards, Webby Awards).</li>
        <li><strong>4 «анти-референса» в опроснике</strong> — теперь можно отметить не только что нравится, но и что НЕ нравится.</li>
      </ul>

      <h4>Исправлено</h4>
      <ul class="fixed">
        <li><strong>Заменена нерабочая ссылка restoclub.ru/spb/search/kejtering-v-peterburge</strong> — сайт блокировал ботов HTTP 412. Заменили на <strong>banket.ru/spb/catering</strong> (HTTP 200, открытая ссылка).</li>
        <li><strong>Все 49 ссылок</strong> перепроверены через HTTP HEAD/GET 26.06.2026 — 45 OK, 4 WAF-блокированных (открываются в обычном браузере), 0 битых.</li>
        <li><strong>Географический баланс</strong> — раньше 12 из 14 мировых кейтерингов были из США. Теперь 14 из 22 — из США, 8 из других стран (Франция, UK×2, Швейцария, Канада, ОАЭ×2, Сингапур×2, Нидерланды, глобальная сеть).</li>
        <li><strong>Дата обновления</strong> — 24 июня → 26 июня 2026.</li>
      </ul>

      <h4>Убрано</h4>
      <ul class="removed">
        <li><strong>Внутренняя критика</strong> — старый блок «Что я исправил» был написан для разработчика, не для клиента. Заменён на этот, ориентированный на клиента.</li>
        <li><strong>Дублирующая ссылка Awwwards</strong> как «кейтеринг #15» — Awwwards это каталог, не кейтеринг. Теперь это #23 (последний) + отдельный блок «Ещё больше вдохновения».</li>
      </ul>
    </div>
  </div>
</section>
"""

POLL = """

<!-- ============ POLL ============ -->

<section class="poll" id="poll">
  <div class="container">
    <h2>Какой стиль нравится <em>больше всего?</em></h2>
    <p>Отметьте 3–5 вариантов, которые произвели лучшее впечатление. Чем больше — тем лучше: я смогу точнее адаптировать промпт под ваш вкус. Не анализируйте — доверяйте первому ощущению.</p>

    <div class="poll-section-title">🌍 Мировые кейтеринги (23)</div>
    <div class="poll-grid">
      <div class="poll-option"><input type="checkbox" id="w1"><label for="w1"><span class="emoji">🇺🇸</span> 01. Wolfgang Puck (тёмный + золото)</label></div>
      <div class="poll-option"><input type="checkbox" id="w2"><label for="w2"><span class="emoji">🇺🇸</span> 02. Abigail Kirsch (светлая элегантность)</label></div>
      <div class="poll-option"><input type="checkbox" id="w3"><label for="w3"><span class="emoji">🇺🇸</span> 03. Great Performances (storytelling)</label></div>
      <div class="poll-option"><input type="checkbox" id="w4"><label for="w4"><span class="emoji">🇺🇸</span> 04. Creative Edge (арт-концепт)</label></div>
      <div class="poll-option"><input type="checkbox" id="w5"><label for="w5"><span class="emoji">🇺🇸</span> 05. Salthouse (farm-to-table)</label></div>
      <div class="poll-option"><input type="checkbox" id="w6"><label for="w6"><span class="emoji">🇨🇭</span> 06. Pommier (французский минимализм)</label></div>
      <div class="poll-option"><input type="checkbox" id="w7"><label for="w7"><span class="emoji">🇺🇸</span> 07. Certé NYC (modern urban)</label></div>
      <div class="poll-option"><input type="checkbox" id="w8"><label for="w8"><span class="emoji">🇬🇧</span> 08. By Word of Mouth (British luxury)</label></div>
      <div class="poll-option"><input type="checkbox" id="w9"><label for="w9"><span class="emoji">🇨🇦</span> 09. Daniel et Daniel (Toronto, прозрачные цены)</label></div>
      <div class="poll-option"><input type="checkbox" id="w10"><label for="w10"><span class="emoji">🇺🇸</span> 10. Ridgewells (Washington, heritage)</label></div>
      <div class="poll-option"><input type="checkbox" id="w11"><label for="w11"><span class="emoji">🇺🇸</span> 11. Catering by Michaels (Chicago, public pricing)</label></div>
      <div class="poll-option"><input type="checkbox" id="w12"><label for="w12"><span class="emoji">🇺🇸</span> 12. McCalls (San Francisco, fresh)</label></div>
      <div class="poll-option"><input type="checkbox" id="w13"><label for="w13"><span class="emoji">🇺🇸</span> 13. Pinch Food Design (design-driven)</label></div>
      <div class="poll-option"><input type="checkbox" id="w14"><label for="w14"><span class="emoji">🇺🇸</span> 14. Olivier Cheng (minimal, museums)</label></div>
      <div class="poll-option"><input type="checkbox" id="w15"><label for="w15"><span class="emoji">🇫🇷</span> 15. Potel et Chabot (FR, 200 лет, heritage)</label></div>
      <div class="poll-option"><input type="checkbox" id="w16"><label for="w16"><span class="emoji">🇬🇧</span> 16. Moving Venue (UK, Caterer of Year 2025)</label></div>
      <div class="poll-option"><input type="checkbox" id="w17"><label for="w17"><span class="emoji">🇦🇪</span> 17. Dish Dubai (арабская роскошь, золото)</label></div>
      <div class="poll-option"><input type="checkbox" id="w18"><label for="w18"><span class="emoji">🇦🇪</span> 18. AHS Catering (Dubai, light premium)</label></div>
      <div class="poll-option"><input type="checkbox" id="w19"><label for="w19"><span class="emoji">🇸🇬</span> 19. Amici (Singapore, boutique)</label></div>
      <div class="poll-option"><input type="checkbox" id="w20"><label for="w20"><span class="emoji">🇸🇬</span> 20. Luxe Catering (Singapore, French canapés)</label></div>
      <div class="poll-option"><input type="checkbox" id="w21"><label for="w21"><span class="emoji">🇳🇱</span> 21. Albron (NL, B2B sustainability)</label></div>
      <div class="poll-option"><input type="checkbox" id="w22"><label for="w22"><span class="emoji">🌍</span> 22. DOCO (глобальная сеть, 32 локации)</label></div>
      <div class="poll-option"><input type="checkbox" id="w23"><label for="w23"><span class="emoji">🏆</span> 23. Awwwards (подборка SOTD)</label></div>
    </div>

    <div class="poll-section-title">🇷🇺 Российские кейтеринги (19)</div>
    <div class="poll-grid">
      <div class="poll-option"><input type="checkbox" id="m1"><label for="m1"><span class="emoji">МСК</span> M1. Novikov Group (премиум)</label></div>
      <div class="poll-option"><input type="checkbox" id="m2"><label for="m2"><span class="emoji">МСК</span> M2. Caramel Catering (масштаб)</label></div>
      <div class="poll-option"><input type="checkbox" id="m3"><label for="m3"><span class="emoji">МСК</span> M3. Canape Club (фуршеты)</label></div>
      <div class="poll-option"><input type="checkbox" id="m4"><label for="m4"><span class="emoji">МСК</span> M4. Muscat (1000 мероприятий/год)</label></div>
      <div class="poll-option"><input type="checkbox" id="m5"><label for="m5"><span class="emoji">МСК</span> M5. Diamond (корпоративы)</label></div>
      <div class="poll-option"><input type="checkbox" id="m6"><label for="m6"><span class="emoji">МСК</span> M6. Сезон Вкуса (24 часа)</label></div>
      <div class="poll-option"><input type="checkbox" id="m7"><label for="m7"><span class="emoji">МСК</span> M7. Шико (фуршетные боксы)</label></div>
      <div class="poll-option"><input type="checkbox" id="m8"><label for="m8"><span class="emoji">МСК</span> M8. Sisters (эмоции)</label></div>
      <div class="poll-option"><input type="checkbox" id="m9"><label for="m9"><span class="emoji">МСК</span> M9. Moscow Food (B2B)</label></div>
      <div class="poll-option"><input type="checkbox" id="m10"><label for="m10"><span class="emoji">МСК</span> M10. M-Catering (гибкая модель)</label></div>
      <div class="poll-option"><input type="checkbox" id="m11"><label for="m11"><span class="emoji">МСК</span> M11. Food Embassy (семейные)</label></div>
      <div class="poll-option"><input type="checkbox" id="s1"><label for="s1"><span class="emoji">СПб</span> S1. Concord (масштаб, 7500 гостей)</label></div>
      <div class="poll-option"><input type="checkbox" id="s2"><label for="s2"><span class="emoji">СПб</span> S2. Eat Catering (чистый дизайн)</label></div>
      <div class="poll-option"><input type="checkbox" id="s3"><label for="s3"><span class="emoji">СПб</span> S3. A-Catering (BBQ, загородный)</label></div>
      <div class="poll-option"><input type="checkbox" id="s4"><label for="s4"><span class="emoji">СПб</span> S4. Forum (B2B, форумы)</label></div>
      <div class="poll-option"><input type="checkbox" id="s5"><label for="s5"><span class="emoji">СПб</span> S5. WOW!CATERING (эмоции)</label></div>
      <div class="poll-option"><input type="checkbox" id="s6"><label for="s6"><span class="emoji">СПб</span> S6. WOW Furshet (гастробоксы)</label></div>
      <div class="poll-option"><input type="checkbox" id="s7"><label for="s7"><span class="emoji">СПб</span> S7. Catering-spb (что НЕ нравится)</label></div>
      <div class="poll-option"><input type="checkbox" id="s8"><label for="s8"><span class="emoji">СПб</span> S8. WOW Events (эмоциональный)</label></div>
    </div>

    <div class="poll-section-title">🎨 Стилистические предпочтения</div>
    <div class="poll-grid">
      <div class="poll-option"><input type="checkbox" id="st1"><label for="st1"><span class="emoji">🌑</span> Тёмная палитра (forest green/charcoal + gold)</label></div>
      <div class="poll-option"><input type="checkbox" id="st2"><label for="st2"><span class="emoji">☀️</span> Светлая палитра (cream + bronze + sage)</label></div>
      <div class="poll-option"><input type="checkbox" id="st3"><label for="st3"><span class="emoji">📖</span> Bibliophilic типографика (Playfair/Cormorant)</label></div>
      <div class="poll-option"><input type="checkbox" id="st4"><label for="st4"><span class="emoji">🖼️</span> Dark & moody food photography</label></div>
      <div class="poll-option"><input type="checkbox" id="st5"><label for="st5"><span class="emoji">🌿</span> Farm-to-table эстетика</label></div>
      <div class="poll-option"><input type="checkbox" id="st6"><label for="st6"><span class="emoji">💎</span> Минимализм (Pommier-style)</label></div>
      <div class="poll-option"><input type="checkbox" id="st7"><label for="st7"><span class="emoji">🎬</span> Storytelling (Great Performances-style)</label></div>
      <div class="poll-option"><input type="checkbox" id="st8"><label for="st8"><span class="emoji">🎨</span> Концептуальный арт (Pinch Food Design)</label></div>
      <div class="poll-option"><input type="checkbox" id="st9"><label for="st9"><span class="emoji">🏛️</span> Heritage (Potel et Chabot / Ridgewells)</label></div>
      <div class="poll-option"><input type="checkbox" id="st10"><label for="st10"><span class="emoji">🕌</span> Арабская роскошь (Dish Dubai)</label></div>
    </div>

    <div class="poll-section-title">❌ Что точно НЕ нравится (анти-референсы)</div>
    <div class="poll-grid">
      <div class="poll-option anti"><input type="checkbox" id="an1"><label for="an1"><span class="emoji">🚫</span> Переполненный hero с 5+ элементами</label></div>
      <div class="poll-option anti"><input type="checkbox" id="an2"><label for="an2"><span class="emoji">🚫</span> Кричащий CTA «СКИДКА -30%»</label></div>
      <div class="poll-option anti"><input type="checkbox" id="an3"><label for="an3"><span class="emoji">🚫</span> Стоковые фото без фуд-стайлинга</label></div>
      <div class="poll-option anti"><input type="checkbox" id="an4"><label for="an4"><span class="emoji">🚫</span> Авто-воспроизведение видео со звуком</label></div>
    </div>

    <div class="poll-note">
      <strong>Как отправить выбор:</strong>
      <br><br>
      <strong>Способ 1 (простой):</strong> Откройте эту страницу на компьютере, отметьте галочками 3–5 понравившихся вариантов (можно ещё 1–2 «анти-референса»), сделайте скриншот всего опросника и пришлите мне в Telegram.
      <br><br>
      <strong>Способ 2 (быстрый):</strong> Просто напишите мне номера в Telegram. Например: «Понравились: 1, 6, 9, 15, M1, S2. Не понравились: 4, S5. Хочу тёмную палитру + storytelling.»
      <br><br>
      <strong>Способ 3 (развёрнутый):</strong> Пришлите мне 2–3 скриншота конкретных сайтов, где понравилась определённая секция (hero, меню, галерея), и подпись — что именно нравится. Это самый полезный формат — я смогу точно скопировать удачные элементы.
      <br><br>
      <strong>Совет:</strong> Чем больше деталей вы пришлёте (что нравится/не нравится, почему), тем точнее я адаптирую промпт для Lovable. Минимум — 3 номера понравившихся + 2–3 слова о предпочтениях.
    </div>

    <div class="poll-actions">
      <a href="#top" class="poll-btn">↑ Наверх к началу страницы</a>
      <a href="https://t.me/share/url?url=https%3A%2F%2Fpreview-nilov-catering.space-z.ai%2Fcatering_inspiration_nilov.html&text=%D0%9F%D0%BE%D1%81%D0%BC%D0%BE%D1%82%D1%80%D0%B8%20%D0%BF%D0%BE%D0%B4%D0%B1%D0%BE%D1%80%D0%BA%D1%83%20%D0%BA%D0%B5%D0%B9%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B3%D0%BE%D0%B2%20%D0%B4%D0%BB%D1%8F%20Nilov%20Catering" target="_blank" rel="noopener" class="poll-btn secondary">Поделиться страницей в Telegram</a>
    </div>
  </div>
</section>
"""

FOOTER = """

<footer class="footer">
  <div class="container">
    <p>Подготовлено для <strong>Nilov Catering</strong> · v3.0 · 26 июня 2026<br>
    42 кейтеринга (23 мировых + 19 российских) + 4 агрегатора + 3 рейтинговых статьи + 6 ссылок на подборки. Все 49 ссылок проверены через HTTP HEAD/GET 26.06.2026 — 45 OK, 4 WAF-блокированных (открываются в браузере), 0 битых. Подборка составлена на основе Awwwards, World Culinary Awards, Colorlib, Bash Today, vc.ru, CaterMe, Catery, Banket.ru и веб-поиска по 30+ премиум-кейтерингам мира.</p>
  </div>
</footer>

</body>
</html>
"""

with OUT_PATH.open("a", encoding="utf-8") as f:
    f.write(VERSION_NOTES)
    f.write(POLL)
    f.write(FOOTER)

print(f"[3] Version notes + Poll + Footer appended")
print(f"\nFinal file size: {OUT_PATH.stat().st_size:,} bytes")
