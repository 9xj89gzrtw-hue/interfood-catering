# 🛡️ Система защиты от потери данных — Интерфуд Кейтеринг

## Что случилось
При смене сессии локальные файлы были перезаписаны старой версией. 
GitHub-репозиторий сохранил последнюю версию, но локально она отсутствовала.

## Что сделано

### 5 уровней защиты

| Уровень | Что делает | Когда работает |
|---------|-----------|----------------|
| **1. Git auto-commit** | Каждое изменение → git commit | При каждом изменении файлов |
| **2. GitHub push** | Коммиты → GitHub remote | При наличии credentials |
| **3. Снапшоты** | Полная копия src/ + configs | При старте сессии, перед опасными операциями |
| **4. File watcher** | Мониторит src/ каждые 30 сек | Работает в фоне |
| **5. Startup recovery** | Сравнивает local vs GitHub, синхронизирует | При запуске сессии |

### Скрипты

| Скрипт | Назначение | Команда |
|--------|-----------|---------|
| `startup.sh` | Запуск сессии: sync + snapshot + watcher | `bash scripts/startup.sh` |
| `autosave.sh` | Auto-commit изменений | Автоматически (watcher) |
| `safe-push.sh` | Push на GitHub с fallback | Автоматически (autosave) |
| `snapshot.sh` | Создать бэкап-снапшот | `bash scripts/snapshot.sh "метка"` |
| `restore.sh` | Восстановить из снапшота/GitHub | `bash scripts/restore.sh github` |
| `emergency.sh` | Полное восстановление (nuclear) | `bash scripts/emergency.sh` |
| `watcher.sh` | Файловый монитор (30с интервал) | Автоматически (startup) |

### Типичные сценарии

#### ✅ Начало новой сессии
```bash
bash scripts/startup.sh
```
Автоматически: синхронизирует с GitHub, создаст снапшот, запустит watcher.

#### ✅ Потерялись данные
```bash
# Вариант 1: восстановить из GitHub
bash scripts/restore.sh github

# Вариант 2: восстановить из последнего снапшота
bash scripts/restore.sh latest

# Вариант 3: полная переустановка
bash scripts/emergency.sh
```

#### ✅ Push не работает (нет credentials)
Скрипт `safe-push.sh` сохранит метку `.pending-push/` — 
при следующей сессии с валидным токеном коммиты будут запушены.

Чтобы добавить GitHub token:
```bash
git remote set-url origin https://<YOUR_TOKEN>@github.com/9xj89gzrtw-hue/interfood-catering.git
```

#### ✅ Перед опасной операцией
```bash
bash scripts/snapshot.sh "before-big-change"
```

### Структура бэкапов

```
backups/
├── snap_20260630_045640_session-start/
│   ├── manifest.json          # метаданные
│   ├── _git_hash.txt          # хеш коммита
│   ├── _git_log.txt           # последние 10 коммитов
│   ├── _public_manifest.txt   # список public файлов
│   ├── src/                   # полная копия src/
│   └── package.json           # конфиги
├── snap_20260630_120000_pre-recovery/
└── ...
```

- Хранятся 7 дней, максимум 20 снапшотов
- Старые удаляются автоматически

### .gitignore
Бэкапы, логи и тяжёлые данные добавлены в .gitignore — 
не засоряют репозиторий, но всегда доступны локально.
