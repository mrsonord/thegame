@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\docpad\bin\docpad-server" %*
) ELSE (
  node  "%~dp0\..\docpad\bin\docpad-server" %*
)