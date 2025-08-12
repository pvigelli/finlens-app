@ECHO OFF
SETLOCAL

SET DIR=%~dp0
SET APP_BASE_NAME=%~n0
SET APP_HOME=%DIR%

IF EXIST "%APP_HOME%\gradle\wrapper\gradle-wrapper.jar" (
  SET WRAPPER_JAR="%APP_HOME%\gradle\wrapper\gradle-wrapper.jar"
) ELSE (
  ECHO ERROR: gradle-wrapper.jar not found in %APP_HOME%\gradle\wrapper
  EXIT /B 1
)

IF "%JAVA_HOME%"=="" (
  SET JAVA_EXE=java
) ELSE (
  SET JAVA_EXE=%JAVA_HOME%\bin\java.exe
)

%JAVA_EXE% -classpath %WRAPPER_JAR% org.gradle.wrapper.GradleWrapperMain %*
ENDLOCAL