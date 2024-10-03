# automapshot-fte

> Automate screenshots of QuakeWorld maps (mapshots) using [FTE](https://fte.triptohell.info/)
> and [Playwright](https://playwright.dev/)

## Setup

```shell
npx playwright install
yarn install
```

1. Rename `config.example.ts` to `config.ts`
2. Rename `config.maps.example.ts` to `config.maps.ts`
3. (optional) edit `config.ts`

## Default config

```ts
export default {
    width: 1280,
    height: 720,
    jpegQuality: 90, // 1-100
    skipExisting: true, // skip if screenshot already exist in /dist
};
```

## Usage

### Screenshot all maps defined in `config.maps.ts`

```shell
npx playwright test
```

### Screenshot single map (exact match)

```shell
npx playwright test --grep "#dm2#"
```

### Screenshot multiple maps (wildcard match)

```shell
npx playwright test --grep "dm2"
```

## Related projects

* [QuakeWorld Mapshots](https://github.com/vikpe/qw-mapshots)
* [FTEQW](https://github.com/fte-team/fteqw)
* [Playwright](https://github.com/microsoft/playwright)
