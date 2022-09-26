#!/bin/sh
# Write some environment to ${DIST_DIR}/env.js at runtime.
# The resulting file should be referenced in index.html.
set -eux

log() {
    echo >&2 "[INFO] $*"
}

main() {
    dist_dir="${DIST_DIR:-/usr/share/nginx/html}"
    log "Generating ${dist_dir}/env.js..."

    tee "${dist_dir}/env.js" >&2 << EOF
window.env = {
    VERSION: "${VERSION:-unknown}",
    API_URL: "${API_URL:-http://localhost:5000}",
    NODE_ENV: "${NODE_ENV:-notset}",
}
console.log(window.env)
EOF
    log "Wrote to ${dist_dir}/env.js."

    if [ -n "${*}" ]; then
        log "Running provided command: $*"
        exec "$@"
    else
        log "No command provided; assuming 'npm run start'"
        exec npm run start
    fi
}

main "$@"
