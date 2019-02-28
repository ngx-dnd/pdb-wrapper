#!/bin/bash
git add .
read -p "Type commit message: " message
git commit -m "$message"
npm version minor
git tag
git push origin --tags
read -p "Build new version and push to npm? [Y/n]: " buildOption
if [ $buildOption = 'n' ] ; then 
        echo "OK, done"
else
        ng build @ngx-dnd/pdb
        yarn publish /app/dist/ngx-dnd/pdb/
fi

