# <img src="/public/logo.png" width="30"> Puzzfinder

Discover hidden gems in Lichess' multi-million puzzle database with fast, filter-based searches

The project consists of three components:

- [Client-side web interface](https://github.com/dragunovartem99/puzzfinder)
- [Application programming interface](https://github.com/dragunovartem99/puzzfinder-api)
- [DuckDB database with chess puzzles](https://github.com/dragunovartem99/puzzfinder-db)

Any server-side advice/help will be very welcomed! This is my first full-stack project.

## Development

```sh
npm ci
npm run dev
```

Pull requests run `format:check`, `types:check`, `lint:check` and `test`, and so does the pre-commit
hook

## Deployment

Merging to `main` runs the same checks, then builds the site and publishes it to GitHub Pages through
[pipes](https://github.com/dragunovartem99/pipes)
