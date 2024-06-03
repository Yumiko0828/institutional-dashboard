<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Description

This is the API of an Assistance System, created with [Nest](https://nestjs.com), [TypeScript](https://www.typescriptlang.org/), [Prisma (PostgreSQL)](https://prisma.io) and [JWT](https://jwt.io).

## Table of Content

- [Installation](#installation)
- [Configuration](#configuration)
- [Start](#running-the-app)
- [Endpoints](#endpoints)
  - [Auth](#auth-v1auth)
  - [Users](#users-v1users)
  - [Academic Levels](#academic-level-v1al)
  - [Grades](#grades-v1grades)
  - [Schedules](#schedules-v1schedules)
  - [Assistance](#assistance-v1assistance)
- [License](#license)

## Installation

```bash
$ pnpm install
```

## Configuration

Add the following env variables:

```toml
DATABASE_URL="postgresql://..."
JWT_ACCESS_SECRET="..."
JWT_REFRESH_SECRET="..."
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Endpoints

### Auth {`/v1/auth`}

- (**POST**) `/login`: Sign In.

  Body:

  ```json
  {
    "email": "user@email.com",
    "password": "*****"
  }
  ```

  Response:

  ```json
  {
    "accessToken": "...",
    "refreshToken": "...",
    "accessExp": 1717457048,
    "refreshExp": 1717457048
  }
  ```

- (**POST**) `/refresh`: Refresh a session.

  Body:

  ```jsonc
  {
    "token": "...", // <-- Refresh token here
  }
  ```

  Response:

  ```json
  {
    "accessToken": "...",
    "refreshToken": "...",
    "accessExp": 1717457048,
    "refreshExp": 1717457048
  }
  ```

### Users {`/v1/users`}

- (**GET**) `/`: Get all users.

  Response:

  ```jsonc
  [
    {
      "id": "...",
      "firstName": "...",
      "lastName": "...",
      "email": "...",
      "permissionsLevel": 0, // also 1 or 2
    },
    ...
  ]
  ```

- (**GET**) `/whoami`: Get session profile.

  Response:

  ```jsonc
  {
    "id": "...",
    "firstName": "...",
    "lastName": "...",
    "email": "...",
    "permissionsLevel": 0,
  }
  ```

- (**POST**) `/`: Create an user.

  > [!NOTE]
  > Permissions Level is a range between 0-2:
  > 0 is a **Guest**, 1 is a **Teacher** and 2 is an **Admin**.

  Body:

  ```jsonc
  {
    "id": "...",
    "firstName": "...",
    "lastName": "...",
    "email": "...",
    "permissionsLevel": 0,
  }
  ```

  Response:

  ```json
  {
    "id": "...",
    "firstName": "...",
    "lastName": "...",
    "email": "...",
    "permissionsLevel": 0
  }
  ```

- (**DELETE**) `/:id`: Delete an user by id.

  Response:

  ```json
  {
    "id": "..."
  }
  ```

### Academic Level {`/v1/al`}

- (**GET**) `/`: Get all academic levels.

  Response:

  ```jsonc
  [
    {
      "id": "...",
      "name": "...",
    },
    ...
  ]
  ```

- (**POST**) `/:id`: Create an academic level.

  Body:

  ```jsonc
  {
    "name": "...",
  }
  ```

  Response:

  ```json
  {
    "id": "...",
    "name": "..."
  }
  ```

- (**DELETE**) `/:id`: Delete an academic level by id.

  Response:

  ```json
  {
    "id": "..."
  }
  ```

### Grades {`/v1/grades`}

- (**GET**) `/`: Get all grades.

  Response:

  ```json
  [
    {
      "id": "...",
      "label": 3,
      "section": "...",
      "academicLevel": {
        "id": "...",
        "name": "..."
      }
    },
    ...
  ]
  ```

- (**GET**) `/:id`: Get a grade by id.

  Response:

  ```json
  {
    "id": "...",
    "label": 3,
    "section": "...",
    "academicLevel": {
      "id": "...",
      "name": "..."
    }
  }
  ```

- (**POST**) `/`: Create a grade.

  body:

  ```json
  {
    "label": 3,
    "section": "...",
    "academicLevelId": "..."
  }
  ```

  Response:

  ```json
  {
    "id": "...",
    "label": 3,
    "section": "...",
    "academicLevel": {
      "id": "...",
      "name": "..."
    }
  }
  ```

- (**PATCH**) `/:id`: Update a grade.

  body:

  ```jsonc
  {
    "label": 3, // Optional
    "section": "...", // Optional
    "academicLevelId": "...", // Optional
  }
  ```

  Response:

  ```json
  {
    "id": "...",
    "label": 3,
    "section": "...",
    "academicLevel": {
      "id": "...",
      "name": "..."
    }
  }
  ```

- (**DELETE**) `/:id`: Delete a grade.

  Response:

  ```json
  {
    "id": "..."
  }
  ```

### Schedules {`/v1/schedules`}

> [!NOTE] "LEA" is **Learning Experiences Assessment**.

- (**GET**) `/`:

  Response:

  ```json
  [
    {
      "id": "...",
      "gradeId": "...",
      "lea": 1,
    },
    ...
  ]
  ```

- (**POST**) `/`:

  Body:

  ```json
  {
    "gradeId": "...",
    "lea": 1
  }
  ```

  Response:

  ```json
  {
    "id": "...",
    "gradeId": "...",
    "lea": 1
  }
  ```

- (**DELETE**) `/:id`:

  Response:

  ```json
  {
    "id": "..."
  }
  ```

### Assistance {`/v1/assistance`}

- (**GET**) `/:scheduleId`: Get all assistances.

  Response:

  ```jsonc
  [
    {
      "id": "...",
      "date": "...", // <- In ISO date format.
      "scheduleId": "..."
    },
    ...
  ]
  ```

- (**POST**) `/`: Register a assistance.

  > [!NOTE] "presents", "lates" and "absences" are an array of user IDs.

  Body:

  ```json
  {
    "scheduleId": "...",
    "presents": ["...", "..."],
    "lates": ["...", "..."],
    "absences": ["...", "..."]
  }
  ```

  Response:

  ```jsonc
  {
    "id": "...",
    "date": "...", // <- In ISO date format.
    "scheduleId": "...",
  }
  ```

## License

This project is under the [GPL-3.0 license](LICENSE).
