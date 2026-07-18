# AI Office Template — FSD + Clean Architecture

## Быстрый старт

1. Скопируй `.opencode/` в корень своего проекта
2. Скопируй `docs/` в корень своего проекта
3. Определись: frontend (FSD) или backend (Clean Architecture)
4. Настрой архитектуру под свой проект
5. Готово — агенты работают

---

## Что это

Шаблон AI-управляемой разработки с фиксированной архитектурой:

- **Frontend:** Всегда FSD (Feature-Sliced Design)
- **Backend:** Всегда Clean Architecture (Domain → Application → Infrastructure → Presentation)

---

## Как это работает

```
Ты даёшь задачу
    ↓
Orchestrator определяет: frontend или backend
    ↓
Explorer анализирует код (по слоям архитектуры)
    ↓
Builder пишет код (следуя архитектуре)
    ↓
Tester проверяет тестами (для каждого слоя)
    ↓
Reviewer ревьюит (проверяет архитектуру)
    ↓
Release Engineer коммитит
```

---

## Frontend — FSD (Feature-Sliced Design)

### Слои (снизу вверх)

```
shared → entities → features → widgets → pages → app
```

| Слой | Что содержит | Зависит от |
|------|--------------|------------|
| `shared/` | UI-kit, API, утилиты, типы | Ничего |
| `entities/` | Бизнес-сущности (User, Todo) | `shared` |
| `features/` | Действия (addTodo, deleteUser) | `entities`, `shared` |
| `widgets/` | Сложные UI-блоки (Header, TodoList) | `features`, `entities`, `shared` |
| `pages/` | Маршруты (HomePage, TodoPage) | `widgets`, `features`, `entities`, `shared` |
| `app/` | Инициализация (providers, router) | Всё остальное |

### Правила

- Импорты только снизу вверх
- Не смешивай слои
- Каждый модуль — через индексный файл

### Примеры

- Кнопка «Добавить задачу» → `features/add-todo`
- Список задач → `widgets/todo-list`
- Страница задач → `pages/todo-page`

---

## Backend — Clean Architecture

### Слои

```
domain → application → infrastructure → presentation
```

| Слой | Что содержит | Зависит от |
|------|--------------|------------|
| `domain/` | Сущности, правила, интерфейсы | Ничего |
| `application/` | Use cases, сервисы | `domain` |
| `infrastructure/` | БД, API-клиенты, файловая система | `domain`, `application` |
| `presentation/` | Контроллеры, роутеры, хендлеры | `application` |

### Правила

- Зависимости направлены внутрь
- `domain` не зависит от фреймворков
- Внешние зависимости — только в `infrastructure`

### Примеры

- Сущность Todo → `domain/todo.entity.ts`
- Use case создания → `application/create-todo.use-case.ts`
- Репозиторий → `infrastructure/todo.repository.ts`
- Контроллер → `presentation/todo.controller.ts`

---

## Агенты

### Orchestrator (Тимлид)
- Распределяет задачи
- Определяет: frontend или backend
- Координирует агентов
- Эскалирует проблемы

### Builder (Разработчик)
- Пишет код
- Следует архитектуре (FSD или Clean Architecture)
- Не делает commit

### Tester (Тестировщик)
- Пишет тесты для каждого слоя
- Проверяет регрессию
- Не ломает production-код

### Reviewer (Ревьюер)
- Проверяет код
- Проверяет архитектуру (FSD или Clean Architecture)
- Классифицирует проблемы
- Не исправляет код сам

### Release Engineer (Релиз-инженер)
- Следит за Git
- Делает commit и push
- Проверяет тесты и сборку

### Explorer (Аналитик)
- Анализирует код по слоям архитектуры
- Документирует находки
- Ищет баги и противоречия
- Не изменяет production-код

---

## Документы

### Обязательные
| Файл | Для чего |
|------|----------|
| `10-code-conventions.md` | Правила кода |
| `20-review-process.md` | Процесс ревью |
| `30-git-workflow.md` | Ветки, коммиты, merge |
| `40-security-rules.md` | Безопасность |
| `50-agent-responsibilities.md` | Обязанности агентов |

### Архитектура
| Файл | Для чего |
|------|----------|
| `architecture/10-project-structure.md` | Структура папок |
| `architecture/20-fsd-architecture.md` | FSD (frontend) |
| `architecture/20-clean-architecture-backend.md` | Clean Architecture (backend) |
| `architecture/30-decision-log.md` | Журнал решений |

---

## Кастомизация

### Frontend проект

1. Используй `docs/architecture/20-fsd-architecture.md` как основу
2. Дополни слои под свой проект
3. Агенты уже настроены под FSD

### Backend проект

1. Используй `docs/architecture/20-clean-architecture-backend.md` как основу
2. Дополни слои под свой проект
3. Агенты уже настроены под Clean Architecture

### Full-stack проект

1. Используй оба документа архитектуры
2. Определи границы между frontend и backend
3. Агенты определяют тип проекта автоматически

---

## Когда использовать

### Да
- Frontend на React/Vue/Angular → FSD
- Backend на Node.js/Python/Go → Clean Architecture
- Full-stack проекты
- Командная разработка
- Долгосрочные проекты

### Нет
- Простые проекты (один файл)
- Прототипы
- MVP без масштабирования
- Одноразовые скрипты

---

## Ссылки

- [FSD Architecture](docs/architecture/20-fsd-architecture.md)
- [Clean Architecture](docs/architecture/20-clean-architecture-backend.md)
- [Code Conventions](docs/10-code-conventions.md)
- [Review Process](docs/20-review-process.md)
- [Agent Responsibilities](docs/50-agent-responsibilities.md)

---

## Лицензия

MIT
