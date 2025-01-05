Project structure:

```
server/
├── cmd/
│   └── app/                   # Main entry point
│       └── main.go
│
├── common/                    # Shared utilities (DB, logger, config)
│   ├── config.go
│   ├── db.go
│   └── logger.go
│
├── middleware/                # Cross-cutting concerns (logging, rate limiting)
│   ├── logger.go
│   ├── rate_limiter.go
│   └── request_timer.go
│
├── internal/                  # Domain-specific modules
│   ├── user/
│   │   ├── handler/
│   │   │   └── user_handler.go
│   │   ├── repository/
│   │   │   └── user_repository.go
│   │   ├── service/
│   │   │    └── user_service.go
│   │   └── models/            # Core domain models
│   │        └── user.go
│   │
│   └── auth/                  # Another domain module (example)
│
└── docs/                      # OpenAPI (Swagger) docs
    └── api.yaml

```
