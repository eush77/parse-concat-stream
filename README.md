# parse-concat-stream [![Build Status][travis-badge]][travis] [![Dependency Status][david-badge]][david] [![DevDependency Status][david-dev-badge]][david-dev]

[![npm](https://nodei.co/npm/parse-concat-stream.png)](https://nodei.co/npm/parse-concat-stream/)

[travis-badge]: https://travis-ci.org/eush77/parse-concat-stream.svg
[travis]: https://travis-ci.org/eush77/parse-concat-stream
[david-badge]: https://david-dm.org/eush77/parse-concat-stream.png
[david]: https://david-dm.org/eush77/parse-concat-stream
[david-dev-badge]: https://david-dm.org/eush77/parse-concat-stream/dev-status.png
[david-dev]: https://david-dm.org/eush77/parse-concat-stream#info=devDependencies

The simplest possible combination of [concat-stream](https://www.npmjs.org/package/concat-stream) and native `JSON.parse`. It provides callback interface just like [concat-stream](https://www.npmjs.org/package/concat-stream) does and accepts custom parser functions.

## Example

```js
> stread('{ "foo": 1, "bar": [2, 3] }')
    .pipe(parseConcat(function (err, data) {
      if (err) throw err;
      console.log(JSON.stringify(data, null, 1));
    }));
{
 "foo": 1,
 "bar": [
  2,
  3
 ]
}
```

Custom parser:

```js
> var caps = function (string) {
    return (string.match(/[A-Z]/g) || []).join('').toLowerCase();
  };
> stread('   {\nMEdiS]]\n} SorAs    \tGEt')
    .pipe(parseConcat({ parse: caps }, function (err, data) {
      if (err) throw err;
      console.log(JSON.stringify(data));
    }));
"message"
```

## API

### parseConcat([opts], cb(err, data))

Return a writable stream, run `cb` once it closes.

`data` is `JSON.parse`d by default, unless custom `opts.parse` is provided.

| Option | Type             | Required? | Default      |
| :------| :--------------- | :-------: | :----------- |
| parse  | function(string) | No        | `JSON.parse` |

## Install

```shell
npm install parse-concat-stream
```

## License

MIT