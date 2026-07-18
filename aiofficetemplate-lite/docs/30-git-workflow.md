# Git Workflow

## Ветки

```
feature/TASK-<номер>_<описание>    # Фича
bugfix/TASK-<номер>_<описание>     # Баг
refactor/TASK-<номер>_<описание>   # Рефакторинг
```

---

## Коммиты

### Формат

```
type(scope): description
```

### Типы

- `feat` — фича
- `fix` — баг
- `refactor` — рефакторинг
- `docs` — документация
- `chore` — настройки

### Примеры

```
feat(todo): add deletion
fix(todo): prevent empty
refactor(todo): split component
```

---

## Правила

1. Не коммити в master напрямую.
2. Один коммит — одно изменение.
3. Коммит после ревью.
