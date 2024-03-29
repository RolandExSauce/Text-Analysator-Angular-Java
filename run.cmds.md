Compile a java programm in vscode:

javac Main.java
java Main


to compile in a directory:

javac -d ./bin *.java
java -cp bin Main  or with arguments: java -cp bin Main arg1 arg2 arg3


FIXME: WHY PASSING ARGUMENTS IN LAUNCH.JSON IS NOT WORKING ? 


//Für nicht compilierte dateien 
javac -d module --module-source-path . --module com.module.sender  
javac -d module --module-source-path . --module com.module.main 


// Für compilierte Dateien
 java --module-path module --module com.module.main/com.main.Main

