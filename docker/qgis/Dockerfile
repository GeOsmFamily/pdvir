ARG QGIS_SERVER_VERSION
ARG POSTGRES_HOST
ARG POSTGRES_PORT
ARG POSTGRES_DB
ARG POSTGRES_USER
ARG POSTGRES_PASSWORD

# Dockerfile for QGIS Server
FROM qgis/qgis-server:${QGIS_SERVER_VERSION}

# Create template file
COPY pg_service.conf.template /etc/postgresql-common/

# Install envsubst
RUN apt-get update && apt-get install -y gettext && apt-get clean

# Generate the final pg_service.conf from template
RUN chmod 644 /etc/postgresql-common/pg_service.conf.template && \
    export POSTGRES_HOST=${POSTGRES_HOST:-postgres} \
    POSTGRES_PORT=${POSTGRES_PORT:-5432} \
    POSTGRES_DB=${POSTGRES_DB:-puc} \
    POSTGRES_USER=${POSTGRES_USER:-app} \
    POSTGRES_PASSWORD=${POSTGRES_PASSWORD:-!ChangeMe!} && \
    envsubst < /etc/postgresql-common/pg_service.conf.template > /etc/postgresql-common/pg_service.conf && \
    rm /etc/postgresql-common/pg_service.conf.template