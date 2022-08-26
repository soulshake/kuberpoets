frontend_name = "frontend"
frontend_publish_port = 3000
api_name = "api"
api_port = 5000
api_publish_port = 5000

node_env = 'development'
flask_debug = "0"

os.putenv('NODE_ENV', node_env)
os.putenv('FLASK_DEBUG', flask_debug)
os.putenv('VERSION', 'local')
os.putenv('DOMAIN', 'localhost')

if node_env == 'development':
    os.putenv('DIST_DIR', '/app/public')
    frontend_port = 3000
    live_update=[
      sync('frontend', '/app'),
      run('npm ci', trigger=['frontend/package.json']),
      run('npm run copyenv', trigger='frontend/entrypoint.sh'), # update env.js on the fly
    ]
else:
    os.environ.pop('DIST_DIR', None)
    frontend_port = 80
    live_update=[
      sync('frontend/nginx', '/etc/nginx/'),
      run('nginx -s reload', trigger='frontend/nginx/nginx.conf'),
      run('npm ci', trigger=['frontend/package.json']),
      run('npm run copyenv', trigger='frontend/entrypoint.sh'), # update env.js on the fly
    ]

# Build the frontend image.
docker_build(
  frontend_name,
  'frontend',
  target = node_env,
  build_args={
    "NODE_ENV": node_env,
  },
  live_update=live_update,
  ignore = [
    "./Tiltfile",
  ],
)

# Build the api image.
docker_build(
  api_name,
  'api',
  target = node_env,
  build_args={
    "FLASK_DEBUG": flask_debug,
  },
  ignore = [
    "./Tiltfile",
  ],
)

def expand_service_yaml(name):
  watch_file(name)
  return local('envsubst < {}'.format(name))

# Create the k8s resources
k8s_yaml([
  expand_service_yaml("frontend/service.yaml"),
])
k8s_yaml([
  expand_service_yaml("api/service.yaml"),
])

# Set up port-forwarding and live reloading
k8s_resource(
  api_name,
  port_forwards=["{}:{}".format(api_publish_port, api_port)],
)
k8s_resource(
  frontend_name,
  port_forwards=["{}:{}".format(frontend_publish_port, frontend_port)],
)
