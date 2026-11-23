Add-Type -AssemblyName System.Drawing
$repoRoot = Split-Path -Parent $PSScriptRoot
$canvas = New-Object System.Drawing.Bitmap 1200,630
$graphics = [System.Drawing.Graphics]::FromImage($canvas)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$graphics.Clear([System.Drawing.ColorTranslator]::FromHtml('#F0ECFD'))
$ink = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#1C1C1C'))
$purple = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#514A96'))
$font = New-Object System.Drawing.Font 'Malgun Gothic',46,([System.Drawing.FontStyle]::Bold)
$small = New-Object System.Drawing.Font 'Malgun Gothic',17
$wordmark = New-Object System.Drawing.Font 'Arial',30,([System.Drawing.FontStyle]::Bold)
$graphics.DrawString('사진 한 장에서 시작되는 공유 다이어리',$small,$purple,70,96)
$graphics.DrawString("같은 하루를,`n함께 꾸며요.",$font,$ink,65,175)
$graphics.DrawString('나의 낙서와 너의 한마디가 모이는 곳.',$small,$ink,70,400)
$graphics.DrawString('DIO.',$wordmark,$purple,70,485)
$mascot = [System.Drawing.Image]::FromFile((Join-Path $repoRoot 'assets/logo.png'))
$graphics.DrawImage($mascot,760,150,340,340)
$canvas.Save((Join-Path $repoRoot 'assets/social-card.png'),[System.Drawing.Imaging.ImageFormat]::Png)
$mascot.Dispose()
$font.Dispose()
$small.Dispose()
$wordmark.Dispose()
$ink.Dispose()
$purple.Dispose()
$graphics.Dispose()
$canvas.Dispose()
Write-Output 'Generated assets/social-card.png (1200 x 630)'
