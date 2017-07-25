<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>QRCode</title>
  <meta name="viewport" content="width=device-width, user-scalable=no">
</head>
<body style="text-align: center;">
  <img id="qrimage" src="" alt="qrimage"><br>
  <a id="jsbundle" href=""></a>
  <script src="//unpkg.com/jr-qrcode"></script>
  <script>
    var host = '<%= process.env.HOST_IP %>:' + location.port;
    var link = 'http://' + host + '/dist/weex/js/index.js';
    var qrbase64 = jrQrcode.getQrBase64(link);
    var qrimage = document.getElementById('qrimage');
    var jsbundle = document.getElementById('jsbundle');

    qrimage.src = qrbase64;
    jsbundle.textContent = link;
    jsbundle.href = link;
  </script>
</body>
</html>
