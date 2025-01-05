# Essential Administrator Technical Architecture

## Overview

This document outlines the architectural design of the Essential Administrator,
a template for creating custom administrative panels using modern web
technologies. The template employs BeyondJS, a meta-framework that enhances
TypeScript-based development, offering a structured and flexible foundation for
building scalable web applications.

## Structure

The application is divided into two main sections:

1. **Client**
2. **Server**

### Client

The client side of the Essential Administrator is developed using React, SASS,
and employs a custom architecture based on "ReactiveModel". Below is a detailed
breakdown of the client's structure:

#### Modules (`client/modules`)

-   **Components** (`client/modules/components`)

    -   Contains React components specific to the project.

-   **Helpers** (`client/modules/helpers`)

    -   Stores foundational functionalities of the administrator.

    -   **API** (`client/modules/helpers/api`)

        -   `api.helper.ts`: Manages HTTP requests, handles session expirations,
            and token validations using a custom API handler instead of direct
            fetch calls.

    -   **Providers** (`client/modules/helpers/providers`)
        -   `collection.provider.ts`: Manages base API interactions for data
            collections. It handles generic 'list' calls to retrieve data sets.
        -   `item.provider.ts`: Manages base API interactions for individual
            data items, facilitating CRUD operations through a standardized API
            interface.

-   **Hooks** (`client/modules/hooks`)

    -   `get-permissions`: Provides a map of permissions associated with the
        session user.
    -   `use-check-permissions`: Used by the layout manager to redirect users
        who attempt to access routes without the necessary permissions.

-   **Init** (`client/modules/init`)

    -   `registry.init`: Configures IndexedDB necessary for the collections of
        the ReactiveModel.
    -   `server-start.ts`: Sets up the server to restart automatically on file
        changes during development, enhancing the development experience.

-   **Models** (`client/modules/models`)

    -   Contains the definitions and operational logic for items and collections
        based on the ReactiveModel.

    -   **Entities** (`client/modules/models/entities`)

        -   Each entity like modules, notifications, profiles, etc., has a
            corresponding `collection` and `item` implementation.

        -   **[entityname]** (`client/modules/models/entities/[entityname]`)
            -   `[entityname].collection.ts`: Implements the collection class
                for managing entity sets.
            -   `[entityname].item.ts`: Implements the item class for managing
                individual entity objects.

    -   **Providers** (`client/modules/models/providers`)
        -   `[entityname].item.provider.ts`: Contains the provider class
            extending from the base provider in helpers, handling specific API
            calls for an entity.
        -   `[entityname].collection.provider.ts`: Manages API interactions for
            collections of the specific entity, typically handling calls like
            listing entity sets.
