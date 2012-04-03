To run simply navigate to index.html you local browser.

This demo is leaking documentation and unit tests because during development I was short in time.

This demo also uses simple loading of all JS files as HTML <script> tag. For real project some namespace manager would be used, to provide namespaces, load dependent files and finally build minified version of JS to include. (ex. Google Closure).

The design is minimalistic, main approach was put in functionality and features as JS code implementation.

Development was done on MacOS and no testing done on Windows. That's why only Firefox, Safari and Chrome were confirmed to work ok. As for IEs I didn't have access to test on them, that's why I have concerns that because of security settings and cross domain nature of Flickr API calls there might be some problems.

I was also using event-based navigation for pagination and images opening to achieve loose coupling of the views. There was ability to navigate by adding href="#URL", but that would make system component to know too much about each other.

Code convention from http://javascript.crockford.com/code.html was used. Code was verified using http://jslint.com/ for basic errors.