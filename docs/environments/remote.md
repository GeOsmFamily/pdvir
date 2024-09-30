# Remote environments

There is currently **2 different environnements** :

| Env | Url                         | Owner   | Database  | IP             |
|-----|-----------------------------|---------|-----------|----------------|
|`DEV`| https://dev.puc.cartong.org | CartONG | In docker | `54.36.176.77` |
|`UAT`| https://uat.puc.cartong.org | CartONG | In docker | `54.36.176.77` |

## `DEV` and `UAT` environments

These 2 environements are hosted on the same server. Using a `Caddy` reverse proxy.

This reverse proxy issues the certificates for the HTTPS, using default Caddy [`auto_https`](https://caddyserver.com/docs/automatic-https) for the main domain.

And [`on_demand_tls`](https://caddyserver.com/docs/automatic-https#on-demand-tls) for the subdomains (`qgis.<domain.com>`,`docs.<domain.com>`,...)

