# Android build fail solution  

Create new react-native app

```bash{.alert}
NOTE: VERY IMPORTANT! "AppName" must be in "UpperCamelCase"
```

```bash{.copy-clip}
react-native init "MyAwesomeApp"
```


Make sure when you start you test android build. 
```bash{.copy-clip}
cd "MyAwesomeApp"

react-native run-android
```

if it works __back up one level to the parent directory__ and then copy react-client MyAwesomeApp folder to a backup directory
```bash{.copy-clip}
# Backup one level to parent directory
cd ..

# Create backup directory
mkdir android-restore
```

### Use Mac Finder to copy MyAwesomeApp to android-restore (or Windows equivalent)

__Copy__
@import "img/copy-MyAwesomeApp.png"

__Paste__
@import "img/paste-MyAwesomeApp.png"

---

# Restore from backup