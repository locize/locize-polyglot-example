# locize-polyglot-example

Example how to use [polyglot](https://github.com/airbnb/polyglot.js) and [locize.com](http://www.locize.com) using a node.js server.

## starting the sample

```
npm i
npm start
```

open [localhost:8080](http://localhost:8080) in your browser

## What we do:

1. We use the [locize API](http://locize.com/api.html) Fetch Route to load the translations
2. We add the translations to the returned html like described on the [polyglot page](https://github.com/airbnb/polyglot.js#translation)
3. From there use the polyglot function like used

Alternatively you could also load the resources via xhr and append that to polyglot via `polyglot.extend`
