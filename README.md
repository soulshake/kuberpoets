# Kuberpoets

## Running locally

In all cases below, the site will be available at: http://localhost:3000

#### In Tilt

We assume you have a local Kubernetes cluster set up with a corresponding active Kube context.

From the repo root, run:

```
tilt up
```

#### In Tilt

From the repo root, run:

```
docker-compose up
```

Note that live-reloading is better supported in Tilt than Compose.

### Frontend

#### Natively

From the `./frontend/` directory, run:

```
npm ci
npm run start
```

Browse to http://localhost:3000.

#### In Docker

From the `./frontend/` directory, run:

```
docker build -t kuberpoets .
docker run -ti -p 3000:80 kuberpoets
```
