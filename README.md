# Videos Express API

A simple REST API for managing videos.

## Stack

- Node.js
- TypeScript
- Express
- Jest

## Running the Project

1. Install dependencies:

```bash
npm install
```

2. Start TypeScript compilation in watch mode:

```bash
npm run watch
```

3. In a second terminal, start the server:

```bash
npm run dev
```

The server starts on the `PORT` environment variable value, or `3001` by default.

## Base API URL

`/hometask_01/api`

## Video Model

```json
{
  "id": 1,
  "title": "string",
  "author": "string",
  "canBeDownloaded": false,
  "minAgeRestriction": null,
  "createdAt": "2026-02-06T16:48:53.332Z",
  "publicationDate": "2026-02-06T16:48:53.332Z",
  "availableResolutions": ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]
}
```

## API Endpoints

### Testing

#### `DELETE /hometask_01/api/testing/all-data`

Clears the database (deletes all data).

- `204 No Content` - all data deleted.

### Videos

#### `GET /hometask_01/api/videos`

Returns all videos.

- `200 OK` - array of `Video` objects.

#### `POST /hometask_01/api/videos`

Creates a new video.

Request body:

```json
{
  "title": "string",
  "author": "string",
  "availableResolutions": ["P144"]
}
```

Responses:

- `201 Created` - returns the created `Video` object.
- `400 Bad Request` - validation errors:

```json
{
  "errorsMessages": [
    {
      "message": "string",
      "field": "string"
    }
  ]
}
```

#### `GET /hometask_01/api/videos/{id}`

Returns a video by `id`.

- `200 OK` - `Video` object.
- `404 Not Found` - video with this `id` was not found.

#### `PUT /hometask_01/api/videos/{id}`

Updates an existing video by `id`.

Request body:

```json
{
  "title": "string",
  "author": "string",
  "availableResolutions": ["P144"],
  "canBeDownloaded": true,
  "minAgeRestriction": 18,
  "publicationDate": "2026-02-06T16:48:53.339Z"
}
```

Responses:

- `204 No Content` - successfully updated.
- `400 Bad Request` - validation errors.
- `404 Not Found` - video with this `id` was not found.

#### `DELETE /hometask_01/api/videos/{id}`

Deletes a video by `id`.

- `204 No Content` - successfully deleted.
- `404 Not Found` - video with this `id` was not found.

## Validation Error Format

Error response format:

```json
{
  "errorsMessages": [
    {
      "message": "string",
      "field": "string"
    }
  ]
}
```
