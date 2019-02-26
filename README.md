# Usage

Install dependencies:

```
npm install
```

## Development

```
npm start
```

## Release

### 1. Build for production:

```
npm run build
```

### 2. Copy assets:

```
cp -r dist/ docs/
```

### 3. Push to master

```
git add docs
git commit -m 'MESSAGE'
git push
```