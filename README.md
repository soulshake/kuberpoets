# Kuberpoets

## Running locally

### Frontend

#### Natively

From the `./frontend/` directory, run:

```
npm ci
npm run start
```

Browse to `localhost:3000`.

#### In Docker

From the `./frontend/` directory, run:

```
docker build -t kuberpoets .
docker run -ti -p 3000:80 kuberpoets
```

Browse to `localhost:3000`.
