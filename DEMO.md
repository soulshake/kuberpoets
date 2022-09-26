# Tilt demo

## Setup

Install Tilt as described [here](https://docs.tilt.dev/install.html).

Install k9s as described [here](https://k9scli.io/topics/install/).

## Run demo

Run:

```
git clone git@github.com:soulshake/kuberpoets.git
cd kuberpoets
git fetch
git checkout tilt-demo
tilt up
```

In a browser, navigate to http://localhost:3000/ where you should see the app UI (it may
take a moment for the images to build).

### Automatic rebuilds

Have a look at `frontend/Dockerfile`. It's a multi-stage build, with stages called
`development` and `production`.

Run:

```
curl -I localhost:3000
```

In the response, you should see: `Server: nginx/1.22.0`.

This is a production-like environment -- there is no hot-reloading in nginx. If you want
to change the website, you have to update the deployment to use a different image tag.

To do so, change some text in `frontend/src/App.tsx` and save the file. Tilt notices
that the file changed, so it rebuilds the Docker image and redeploys it on your local
cluster. Watch the list of pods (in k9s or with `kubectl get pods`) to see the
`frontend` pod being replaced.

After the new pod is up and running, you should be able to refresh your browser window
to see your change.

Try editing `frontend/README.md`. Saving the file should _not_ trigger a rolling update.
(Why?)

### Live reloading

We can switch to a more development-friendly workflow by editing the Tiltfile and
changing `node_env = 'production'` to `node_env = 'development'`. Save the file, and
wait for the new pod to be up and running.

Run `curl -I localhost:3000` again. In the response, you should now see:
`X-Powered-By: Express`

Make a change to `frontend/src/App.tsx`. Now, the text should auto-update in the
browser.

Check out the Tilt logs to see details about what's happening.

### ConfigMap changes

Run:

```
curl localhost:3000/env.js
```

The output should look like this:

```
window.env = {
    VERSION: "local",
    API_URL: "http://localhost:5000",
    NODE_ENV: "development",
}
```

Edit the `frontend` configMap on the cluster and change `VERSION` to a different string.

There are two ways to do this:

- `kubectl -n default edit configmap frontend`, or
- Run `k9s`. Type `:configmap` and press enter to see the list of configMaps. Select the
  `frontend` one using the up/down arrows and press `e` to edit it.

Make sure the change was accepted by running `kubectl get configmap frontend -o yaml`.

Now, if you run `curl localhost:3000/env.js` again, you should NOT see your new value.
This is because ConfigMaps are only read into a pod's environment once, when it starts.
(The same applies to Secrets.)

This means if you change a ConfigMap or secret without replacing the pod (i.e. with
`kubectl delete POD_NAME`, which will cause it to be automatically replaced by the
deployment), then the pod environment will be out of date.

It would be nice if pods were automatically replaced anytime the ConfigMaps or Secrets
change. To accomplish this, we use a simple tool called
[`stakater/Reloader`](https://github.com/stakater/Reloader) by installing its Helm
chart, which Tilt is already doing for us, thanks to the block at the end of our
`Tiltfile`.

To enable reloader, edit `frontend/service.yaml` and change the following line:

```
reloader.stakater.com/auto: 'false'  # <-- change to 'true'
```

Save and quit. Now, any changes to ConfigMaps or Secrets referenced in `envFrom` should
trigger rolling updates to pods in any deployment referencing them.
