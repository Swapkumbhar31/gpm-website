ng build --prod --build-optimizer
cd dist/GPM
zip -r build.zip * -x "*.DS_Store"
scp build.zip root@gpm:/var/www/

