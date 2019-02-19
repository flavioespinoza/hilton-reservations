 ## Start Fresh

 ##### Kill All Android Servers
 ```shell
adb kill-server
 ```

 ##### List Android Devices
 ```shell
adb devices
 ```

##### Android Device ID
```shell
192.168.56.101:5555
```

##### Try Resetting
```shell
# Remove Android and ios build folders
sudo rm -r android/
sudo rm -r ios/

# Remove Node modules
sudo rm -r node_modules/

# Remove lock files
sudo rm -r package-lock.json
sudo rm -r yarn.lock
```
> Try with yarn
```shell
# Install Node modules
yarn install
```
> You need the React-Native Client to upgrade React-Native

```shell
# Install client
npm install -g react-native-cli
```
> __Make sure in your package.json file__ that `"react"` and `"react-native"` are under you __dependencies__.  If they are under __devDependencies__ move them.
```json
# In you package.json file under "dependencies"
"dependencies": {
        "react": "16.6.3",
        "react-native": "^0.58.4"
}
```
> Upgrade and run
```bash {.copy-clip}
# Update React-Native
react-native upgrade

`Ignore suggestions and hit enter twice`

> "DO NOTE USE" react-native-git-upgrade

> "You need to use" react-native upgrade 
> "to rebuild the" `android` "and" `ios` "folders".
```
> Run new Android build
```bash {.copy-clip}
# Run Android
react-native run-android
```

---

## Load last successfull Android build

##### Run Android by Device ID
```shell
react-native run-android --deviceId 192.168.56.101:5555
```
