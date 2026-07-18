# 30. Git Workflow

## Purpose

Этот документ определяет порядок работы с Git в проекте.

---

## Branches

### Master

Основная ветка. Содержит стабильный код.

**Правила:**
- Не коммитить напрямую в master
- Все изменения через ветки
- Master обновляется только через merge

### Feature Branches

Формат:

```
feature/TASK-<номер>_<описание>
```

Пример:

```
feature/TASK-12_add_todo_deletion
```

### Bugfix Branches

Формат:

```
bugfix/TASK-<номер>_<описание>
```

Пример:

```
bugfix/TASK-15_fix_empty_todo
```

### Hotfix Branches

Формат:

```
hotfix/TASK-<номер>_<описание>
```

### Refactor Branches

Формат:

```
refactor/TASK-<номер>_<описание>
```

### Other Branches

```
test/TASK-<номер>_<описание>
chore/TASK-<номер>_<описание>
docs/TASK-<номер>_<описание>
```

---

## Commit Messages

### Format

```
type(scope): description
```

### Types

- `feat` — новая функциональность
- `fix` — исправление бага
- `refactor` — рефакторинг без изменения поведения
- `test` — добавление тестов
- `docs` — документация
- `chore` — сборка, настройки, зависимости
- `style` — форматирование, пробелы
- `perf` — оптимизация производительности

### Examples

```
feat(todo): add todo deletion
fix(todo): prevent empty todo creation
refactor(todo): extract useTodos hook
test(todo): add deletion tests
docs(architecture): add component guidelines
chore(deps): update vitest
```

### Rules

- Описание начинается с глагола в нижнем регистре
- Описание на английском языке
- Длина описания < 72 символов
- Один коммит — одно логическое изменение

---

## Workflow

### Новая задача

1. Создать ветку от master
2. Реализовать задачу
3. Запустить тесты
4. Создать pull request
5. Code Review
6. Merge в master
7. Удалить ветку

### Баг

1. Создать ветку `bugfix/` от master
2. Исправить баг
3. Запустить тесты (включая regression)
4. Создать pull request
5. Code Review
6. Merge в master
7. Удалить ветку

---

## Pull Requests

### Требования

- Ветка содержит номер задачи
- Тесты проходят
- Code Review пройден
- Нет конфликтов с master
- Commit messages соответствуют формату

### Описание

Описание PR должно содержать:
- Что сделано
- Почему
- Как проверить
- Ссылка на задачу

---

## Tags

Формат:

```
v<major>.<minor>.<patch>
```

Пример:

```
v1.0.0
v1.2.3
```

---

## .gitignore

Типичные исключения:

```
node_modules/
dist/
.env
*.log
.DS_Store
```
