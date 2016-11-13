## ID3 Helper (Machine learning)

#### Technologies used:
    - [Apache Cordova](https://cordova.apache.org/)
        - Which uses [Node.js](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/)
        - to install, you need to first install Node.js then run `npm install -g cordova` in a terminal.
    - [Visual Studio Code](http://code.visualstudio.com/) with:
        - `jsconfig.json` is used to configure details for VSC (eg. ES6 code style for Intellisense)
        - **typings** (`npm install typings -g`)
            - typings is used by VSC for Intellisense for Javascript and different npm packages
            - [Repository](https://github.com/DefinitelyTyped/DefinitelyTyped) for typings
            - to install a typings from dt: `typings install --save dt~name`

        - **grunt** (if `npm install` does not install it for you, run `npm install grunt-cli -g`)
            - grunt is used in combination with _browserify_ (for allowing _require()_ on client side)
            - grunt is also used with _babelify_ (and es2015 presets) for _ES6_ code style

#### Preinstall requirements
    - Switch to 'www' folder and open terminal there
        - As you may notice, this is where the actual application resides.
        - The parent folder is the cordova project folder. We'll need that only for cordova-based commands.
        - Install all dependencies: (`npm install`)

#### Run / build
    - Before each run / build, you have to run `grunt browserify` to prepare packages for production.
        - Obs: in the 'www' folder
    - Cordova is platform-based. To build or run the application on a platform, we need to add them.
        - One must first install platform components first, before adding them to project. Check the heading below for that.
        - Use `cordova platform ls` to list all the available platforms
        - Use `cordova platform add name` (where name is one of the names from the prev. commands - platform name)
            - Use `cordova requirements` to check the if the requirements for the installed platforms are fullfilled
        - Use `cordova run name` (where name is a platform name)
            - You can also use `cordova build name` if you eg. build apk for android

### Platforms
#### Browser
    - To add, run `cordova platform add browser`
    - No aditional components required
    - Requirements might fail for this component, but no worry, it still works.
#### Android
    - Follow the instructions here: [Cordova official instructions](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html)
    - Shortly:
        - Install latest [Java SDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html)
            - Need then to add Java to the PATH System variable (usually it's done automatically)
            - Need then to create a new System Variable named JAVA_HOME, with value = the folder where you installed java sdk
            - On Linux-based:
                - Download the archive and extract it to `/opt/`
                - Run the instructions from [here](https://www.blackmoreops.com/2013/10/26/how-to-install-java-jdk-in-kali-linux/) to add it to path (replace sdk version with your own version)
        - Install [Android SDK](https://developer.android.com/studio/index.html)
            - Need to add the following entries to the PATH variables:
                - {android-install-folder}/platform-tools
                - {android-install-folder}/tools
            - Need to add a new System Variable, called ANDROID_HOME, with the following value:
                - {android-install-folder}
            - Replace {android-install-folder} with the folder where you installed Android SDK and the '/' with an '\' if you're running on Windows
        - Hint for Windows:
            - Type in search `edit system variables` to access the variables.
        - Hint for Linux:
	    - Android studio may not install API v24. You need to install it. Open Android/tools/android and install the v24 api tools.
            - To edit the PATH or add new System Variables, open the file /etc/profile (or ~/.bash_profile)
            - To add a new variable, simply add a line `export NAME=value`
            - To append to PATH, replace `export PATH` with `export PATH=${PATH}:value`
                - Obs: For multiple values, the separator for them is `:` (in Windows it's `;`)
            
