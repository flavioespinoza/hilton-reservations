## Android Build Errors Solutions

Check out my other joints @ https://flavioespinoza.github.io


##### Kill All Android Servers

<a >copy</a>
```bash {.copy-clip}
adb kill-server
```

##### List Android Devices

```bash {.copy-clip}
adb devices
```

##### Android Device ID

```bash {.copy-clip}
192.168.56.101:5555
```

##### Try Resetting

```bash {.copy-clip}
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

```bash {.copy-clip}
# Install Node modules
yarn install
```

> You need the React-Native Client to upgrade React-Native

```bash {.copy-clip}
# Install client
npm install -g react-native-cli
```

> **Make sure in your package.json file** that `"react"` and `"react-native"` are under you **dependencies**. If they are under **devDependencies** move them.

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

```bash {.copy-clip}
react-native run-android --deviceId 192.168.56.101:5555
```

```bash {.copy-clip}

```
