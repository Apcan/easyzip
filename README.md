# easyzip

``var easyzip=require('easyzip');``

zip a dir,can use

``dirzip(dirpath,zippath,callback)``

zippath can be null , if null the zip file will create on tem dir

``callback(err,zip_path)``

zip a dir and async

``dirzipAsync(dirpath,zippath).then(path).catch(err)``
