#!/bin/bash
git add .
read -p "Type commit message: " message
git commit -m "$message"
npm version patch
git tag
git push origin --tags
read -p "Build new version and push to npm? [Y/n]: " buildOption
if [[ $buildOption = n ]]; then echo "OK"
else
        ng build
        yarn publish /app/dist/ngx-dnd/pdb/package.json
fi
