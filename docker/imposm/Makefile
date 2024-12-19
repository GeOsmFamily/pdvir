init-osm-db:
	docker compose exec imposm imposm import -config "/srv/imposm/config/config.json" -read "/srv/imposm/data/cameroon-latest.osm.pbf" -write -limitto "/srv/imposm/config/clip.geojson" -diff -optimize -overwritecache
	docker compose exec imposm imposm import -config "/srv/imposm/config/config.json" -deployproduction