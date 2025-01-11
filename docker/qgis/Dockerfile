ARG QGIS_SERVER_VERSION
ARG POSTGRES_HOST
ARG POSTGRES_PORT
ARG POSTGRES_DB
ARG POSTGRES_GEODATA_USER
ARG POSTGRES_GEODATA_PASSWORD

# Dockerfile for QGIS Server
FROM qgis/qgis-server:${QGIS_SERVER_VERSION}

# Create template file
COPY pg_service.conf.template /etc/postgresql-common/

# Install envsubst
RUN apt-get update && apt-get install -y gettext && apt-get clean

# Generate the final pg_service.conf from template
RUN chmod 644 /etc/postgresql-common/pg_service.conf.template && \
    export POSTGRES_HOST=${POSTGRES_HOST} \
    POSTGRES_PORT=${POSTGRES_POR} \
    POSTGRES_DB=${POSTGRES_DB} \
    POSTGRES_GEODATA_USER=${POSTGRES_GEODATA_USER} \
    POSTGRES_GEODATA_PASSWORD=${POSTGRES_GEODATA_PASSWORD} && \
    envsubst < /etc/postgresql-common/pg_service.conf.template > /etc/postgresql-common/pg_service.conf && \
    rm /etc/postgresql-common/pg_service.conf.template