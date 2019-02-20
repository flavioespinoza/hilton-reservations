## Useful react-native terminal commands

Run on device by ID
```bash{.copy-clip}
adb devices

> `List of devices attached`
> `192.168.56.101:5555	device`

react-native run-android --deviceId 192.168.56.101:5555
```

Kill all node and react-native app device servers
```bash{.copy-clip}
killall node

adb kill-server

adb devices
```