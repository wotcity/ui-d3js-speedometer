# .CITY Starter Kit

Help makers making Internet of Personal Things.

1. [Install](#install)
2. [Discussion](#discussion)
3. [How To Report Bugs](#how-to-report-bugs)
4. [Core Style Guide](#core-style-guide)
5. [Authors](#authors)

## Install

1. [Download CSK](https://github.com/wotcity/dotcity-starter-kit/releases) and uncompress the package.
2. Run `$ cd dotcity-starter-kit` to change the directory.
3. Run `$ npm install --global gulp` to install Gulp.
4. Run `$ npm install --global bower` to install Bower.
5. Run `$ npm install` to install the dependencies if you don't already have them.
6. Run `$ bower install` to install the dependencies if your don't already have them.
7. Run `$ gulp build` to build the application scripts.
8. Open `index.html` with your faroviate browser. The web app page is empty now.
9. Append the device name in the URL as an frontend routing parameter. For example `index.html#5547870f4dd3e08d63000007`

### Prerequisites

1. [Node.js](https://nodejs.org). Note: Node should be with a version above 0.10.x.
2. [Gulp](http://gulpjs.com). Note: Run `$ npm install --global gulp` to install the latest version.
3. [Bower](http://bower.io). Note: Run `$ npm install --global bower` to install the latest versin.
4. Note: `git` command line interface is needed for Bower.

### Getting the device name

1. Please visit [WoT.City Platform](http://wotcity.com).
2. Signup to create your account.
3. Login to your account.
4. Click *Device Manager* at the left side menu.
5. Click *Launch New Device* button to create a new device instance.
6. Copy your device name at *Device Name (Physical Object)* column.

## Discussion

There are various ways to get involved with .CITY Starter Kit. We're looking for help identifying bugs, writing documentation and contributing codes.

Most of the .CITY Starter Kit developers, users and contributors are at WeChat group or IRC channel. You can find us in the [#wotcity](http://webchat.freenode.net/?channels=wotcity) IRC channel on irc.freenode.net. You can get information of how to join WeChat group at [#wotcity](http://webchat.freenode.net/?channels=wotcity).

## How to Report Bugs

Bugs are reported via [https://github.com/wotcity/dotcity-starter-kit](https://github.com/wotcity/dotcity-starter-kit).

## Core Style Guide

.CITY Starter Kit project follows [jQuery's Style Guides](http://contribute.jquery.org/style-guide/) except that:

* `forin` must be used in .CITY Starter Kit project.
* `quotmark` must be `single`. Strings must use singlequote.

.CITY Starter Kit project uses JSHint to validate code styles. The JSHint options are stored in the `.jshintrc` file. Run `$ gulp jshint` to detect errors.

## License

Apache License
