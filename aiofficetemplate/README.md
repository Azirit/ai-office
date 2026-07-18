# AI Office Template

## Быстрый старт

1. Скопируй `.opencode/` в корень своего проекта
2. Скопируй `docs/` в корень своего проекта
3. Настрой агентов под свой проект (если нужно)
4. Готово — агенты работают

---

## Что это

Универсальный шаблон AI-управляемой разработки. Один шаблон — любой проект:

- React / Vue / Angular (frontend)
- Node.js / Python / Go (backend)
- React Native / Flutter (mobile)
- Full-stack

---

## Как это работает

```
Ты даёшь задачу
    ↓
Orchestrator создаёт ветку
    ↓
Explorer анализирует код
    ↓
Builder пишет код
    ↓
Tester проверяет тестами
    ↓
Reviewer ревьюит
    ↓
Release Engineer коммитит
```

Каждый агент — отдельный специалист. Не путай роли.

---

## Агенты

### Orchestrator (Тимлид)
- Распределяет задачи
- Координирует агентов
- Принимает архитектурные решения
- Эскалирует проблемы тебе

### Builder (Разработчик)
- Пишет код
- Реализует требования
- Следует архитектуре и конвенциям
- Не делает commit (это Release Engineer)

### Tester (Тестировщик)
- Пишет тесты
- Запускает тесты
- Проверяет регрессию
- Не ломает production-код

### Reviewer (Ревьюер)
- Проверяет код
- Ищет проблемы
- Классифицирует (Blocker/Major/Minor)
- Не исправляет код сам

### Release Engineer (Релиз-инженер)
- Следит за Git
- Делает commit и push
- Проверяет тесты и сборку
- Не допускает мусор в master

### Explorer (Аналитик)
- Анализирует код
- Документирует находки
- Ищет баги и противоречия
- Не изменяет production-код

---

## Документы

### Обязательные
| Файл | Для чего |
|------|----------|
| `10-code-conventions.md` | Правила кода — что можно, что нельзя |
| `20-review-process.md` | Как проходит ревью —流程 и критерии |
| `30-git-workflow.md` | Ветки, коммиты, merge |
| `40-security-rules.md` | Безопасность — секреты, ввод, CORS |
| `50-agent-responsibilities.md` | Кто за что отвечает |

### Архитектура
| Файл | Для чего |
|------|----------|
| `architecture/10-project-structure.md` | Структура папок и файлов |
| `architecture/20-component-architecture.md` | Компоненты, хуки, потоки данных |
| `architecture/20-clean-architecture.md` | Принципы зависимостей |
| `architecture/30-decision-log.md` | Журнал архитектурных решений |

---

## Формат веток

```
feature/TASK-<номер>_<описание>    # Новая фича
bugfix/TASK-<номер>_<описание>     # Исправление бага
refactor/TASK-<номер>_<описание>   # Рефакторинг
test/TASK-<номер>_<описание>       # Тесты
docs/TASK-<номер>_<описание>       # Документация
chore/TASK-<номер>_<описание>      # Зависимости, настройки
```

---

## Формат коммитов

```
type(scope): description
```

Примеры:
```
feat(todo): add todo deletion
fix(todo): prevent empty todo creation
refactor(todo): extract useTodos hook
test(todo): add deletion tests
docs(architecture): add component guidelines
```

---

## Кастомизация

### Frontend (React/Vue/Angular)

1. Обнови `docs/10-code-conventions.md` — добавь правила фреймворка
2. Обнови `docs/architecture/20-component-architecture.md` — опиши компоненты
3. При необходимости добавь агентов в `.opencode/agents/`

### Backend (Node.js/Python/Go)

1. Обнови `docs/10-code-conventions.md` — добавь правила языка
2. Обнови `docs/architecture/10-project-structure.md` — опиши структуру
3. При необходимости добавь агентов в `.opencode/agents/`

### Mobile (React Native/Flutter)

1. Обнови `docs/10-code-conventions.md` — добавь правила мобильной разработки
2. Обнови `docs/architecture/20-component-architecture.md` — опиши навигацию
3. При необходимости добавь агентов в `.opencode/agents/`

---

## Когда использовать

### Да
- Любой проект с AI-управлением
- Когда нужен процесс (баг-фикс, фича, рефакторинг)
- Когда нужен Code Review
- Когда нужен контроль Git

### Нет
- Когда пишешь код один без AI
- Когда проект слишком простой (один файл)
- Когда не нужен процесс

---

## Частые вопросы

### Q: Могу ли я изменить агентов?
Да. Каждый агент — это markdown-файл. Меняй под свой проект.

### Q: Могу ли я добавить своего агента?
Да. Создай `.opencode/agents/my-agent.md` и опиши его.

### Q: Обязательно ли использовать все документы?
Нет. Берёз только то, что нужно.

### Q: Что если агент сломал код?
Tester должен был это поймать. Если не поймал — проблема в тестах.

### Q: Как эскалировать проблему?
Orchestrator передаст тебе. Или ты сам заметишь и вмешаешься.

---

## Ссылки

- [Code Conventions](docs/10-code-conventions.md)
- [Review Process](docs/20-review-process.md)
- [Git Workflow](docs/30-git-workflow.md)
- [Security Rules](docs/40-security-rules.md)
- [Agent Responsibilities](docs/50-agent-responsibilities.md)
- [Architecture](docs/architecture/)

---

## Лицензия

MIT
