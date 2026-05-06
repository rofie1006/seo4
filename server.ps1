$port = 8000
$root = "c:\Users\88696\Downloads\seo\web4"

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()

Write-Host "Listening on http://localhost:$port/"

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $localPath = $request.Url.LocalPath
        if ($localPath -eq "/") {
            $localPath = "/index.html"
        }

        # Basic mime types
        $mime = "text/plain"
        if ($localPath.EndsWith(".html")) { $mime = "text/html" }
        elseif ($localPath.EndsWith(".css")) { $mime = "text/css" }
        elseif ($localPath.EndsWith(".js")) { $mime = "application/javascript" }
        elseif ($localPath.EndsWith(".png")) { $mime = "image/png" }

        $filePath = Join-Path $root $localPath.Replace('/', '\')

        if (Test-Path $filePath -PathType Leaf) {
            $response.ContentType = $mime
            $buffer = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
        } else {
            $response.StatusCode = 404
            $err = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.OutputStream.Write($err, 0, $err.Length)
        }
        $response.Close()
    }
} finally {
    $listener.Stop()
}
