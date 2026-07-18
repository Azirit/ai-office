# Clean Architecture (Backend)

## Что это

Архитектурный паттерн для backend-проектов. Делит код на концентрические слои по зависимостям.

## Принципы

1. **Зависимости направлены внутрь.** Внешние слои зависят от внутренних, не наоборот.
2. **Изоляция бизнес-логики.** Domain не зависит от фреймворков и внешних сервисов.
3. **Тестируемость.** Каждый слой можно тестировать изолированно.
4. **Независимость.** Слои можно заменять без влияния на другие.

---

## Слои

### domain/ (Домен)

**Что:** Бизнес-сущности и правила.

**Примеры:**
- Entity (Todo, User, Product)
- Value Object (Email, Money, DateRange)
- Domain Service (复杂 бизнес-логика)
- Repository Interface (интерфейсы доступа к данным)

**Правила:**
- Не зависит ни от одного слоя
- Не содержит фреймворков
- Не содержит внешних зависимостей
- Чистый TypeScript/Python/Go

---

### application/ (Приложение)

**Что:** Use cases, сервисы.

**Примеры:**
- CreateTodoUseCase
- GetTodoListUseCase
- UpdateTodoUseCase
- DeleteTodoUseCase
- TodoService

**Правила:**
- Зависит от `domain`
- Не зависит от `infrastructure`
- Содержит бизнес-логику приложения
- Оркестрирует domain-объекты

---

### infrastructure/ (Инфраструктура)

**Что:** Внешние зависимости.

**Примеры:**
- Database (PostgreSQL, MongoDB, файловая система)
- API Clients (axios, fetch)
- Email Service (SMTP, SendGrid)
- Cache (Redis, Memcached)
- Message Queue (RabbitMQ, Kafka)

**Правила:**
- Зависит от `domain` и `application`
- Реализует интерфейсы из `domain`
- Содержит фреймворки и библиотеки
- Интегрируется с внешним миром

---

### presentation/ (Представление)

**Что:** Контроллеры, роутеры, хендлеры.

**Примеры:**
- TodoController
- UserController
- AuthController
- Router (Express, FastAPI, Gin)

**Правила:**
- Зависит от `application`
- Не зависит от `infrastructure`
- Обрабатывает HTTP-запросы
- Валидирует входные данные
- Возвращает ответы

---

## Зависимости

```
presentation → application → domain
                  ↓
             infrastructure
```

**Правило:** Зависимости направлены внутрь. `domain` не зависит ни от кого.

---

## Примеры

### Node.js (TypeScript)

```
src/
├── domain/
│   ├── entities/
│   │   └── Todo.ts
│   ├── repositories/
│   │   └── ITodoRepository.ts
│   └── services/
│       └── TodoDomainService.ts
├── application/
│   ├── use-cases/
│   │   ├── CreateTodo.ts
│   │   └── GetTodos.ts
│   └── services/
│       └── TodoApplicationService.ts
├── infrastructure/
│   ├── database/
│   │   └── TodoRepository.ts
│   ├── api/
│   │   └── ExternalApiClient.ts
│   └── config/
│       └── database.ts
└── presentation/
    ├── controllers/
    │   └── TodoController.ts
    ├── routes/
    │   └── todoRoutes.ts
    └── middlewares/
        └── auth.ts
```

### Python (FastAPI)

```
src/
├── domain/
│   ├── entities/
│   │   └── todo.py
│   ├── repositories/
│   │   └── todo_repository.py
│   └── services/
│       └── todo_domain_service.py
├── application/
│   ├── use_cases/
│   │   ├── create_todo.py
│   │   └── get_todos.py
│   └── services/
│       └── todo_application_service.py
├── infrastructure/
│   ├── database/
│   │   └── todo_repository_impl.py
│   ├── api/
│   │   └── external_api_client.py
│   └── config/
│       └── database.py
└── presentation/
    ├── routers/
    │   └── todo_router.py
    ├── schemas/
    │   └── todo_schema.py
    └── dependencies/
        └── auth.py
```

### Go

```
src/
├── domain/
│   ├── entities/
│   │   └── todo.go
│   ├── repositories/
│   │   └── todo_repository.go
│   └── services/
│       └── todo_domain_service.go
├── application/
│   ├── usecases/
│   │   ├── create_todo.go
│   │   └── get_todos.go
│   └── services/
│       └── todo_application_service.go
├── infrastructure/
│   ├── database/
│   │   └── todo_repository_impl.go
│   ├── api/
│   │   └── external_api_client.go
│   └── config/
│       └── database.go
└── presentation/
    ├── handlers/
    │   └── todo_handler.go
    ├── routes/
    │   └── todo_routes.go
    └── middlewares/
        └── auth.go
```

---

## Когда использовать

### Да
- Большие backend-проекты
- Микросервисы
- Сложная бизнес-логика
- Долгосрочные проекты
- Проекты с высокими требованиями к тестированию

### Нет
- Простые CRUD-приложения
- Прототипы
- MVP без масштабирования
- Однофайловые скрипты
