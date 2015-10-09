#!/bin/sh

vmDatabase=$(cat /srv/shared/provision/config.yml | grep dbname: | head -n 1 | sed -e 's/.*dbname: \(.*\)/\1/')

echo "+ flush db script"
echo "DROP SCHEMA IF EXISTS \`${vmDatabase}\`;" > /tmp/flush-db.sql
echo "CREATE SCHEMA IF NOT EXISTS \`${vmDatabase}\` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;" >> /tmp/flush-db.sql

echo "+ flushing"
mysql -u root < /tmp/flush-db.sql
rm -f /tmp/flush-db.sql

echo "+ load db"
if [ -f "/srv/shared/provision/database/structure.sql" ]; then
  mysql -u root --database="${vmDatabase}" < /srv/shared/provision/database/structure.sql
fi

if [ -f "/srv/shared/provision/database/migrations.sql" ]; then
  echo "+ load migrations"
  mysql -u root --database="${vmDatabase}" < /srv/shared/provision/database/migrations.sql
fi

if [ -f "/srv/shared/provision/database/fixtures.sql" ]; then
  echo "+ load fixtures"
  mysql -u root --database="${vmDatabase}" < /srv/shared/provision/database/fixtures.sql
fi