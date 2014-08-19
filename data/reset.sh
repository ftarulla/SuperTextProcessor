#!/bin/bash

mysql -u root -proot textProcessor < dbschema.sql
mysql -u root -proot textProcessor < samples.sql


