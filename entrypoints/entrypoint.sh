### entrypoint.sh
#!/bin/bash

set -e
set -u

function create_user_and_database() {
    local database=$1
    echo "  Creating user and database '$database'"
    psql -v ON_ERROR_STOP=0 --username "$POSTGRES_USER" <<-EOSQL
        DO
         \$do\$
         BEGIN
            IF EXISTS (
               SELECT FROM pg_catalog.pg_roles
               WHERE  rolname = '$database') THEN

               RAISE NOTICE 'Role $database already exists. Skipping.';
            ELSE
               CREATE ROLE $database LOGIN PASSWORD '$database';
            END IF;
         END
         \$do\$;
        CREATE DATABASE $database;
        GRANT ALL PRIVILEGES ON DATABASE $database TO $database;
EOSQL
}

if [ -n "$POSTGRES_MULTIPLE_DATABASES" ]; then
    echo "Multiple database creation requested: $POSTGRES_MULTIPLE_DATABASES"
    for db in $(echo $POSTGRES_MULTIPLE_DATABASES | tr ',' ' '); do
        create_user_and_database $db
    done
    echo "Multiple databases created"
fi