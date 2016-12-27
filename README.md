# easyzip

```var easyzip=require('easyzip');```

### zip a dir,can use

```dirzip(dirpath,zippath,callback)```

### zippath can be null , if null the zip file will create on tem dir

```callback(err,zip_path)```

### zip a dir and async

```dirzipAsync(dirpath,zippath).then(path).catch(err)```


# update

- 2016.12.26 | v1.0.1 | mac系统上使用压缩
- 2015.12.27 | v1.0.2 | win系统上使用压缩