importScripts(
  'https://cdnjs.cloudflare.com/ajax/libs/sw-toolbox/3.6.1/sw-toolbox.js'
);

// Cache our own files
toolbox.router.get('/(.*)', toolbox.networkFirst);

// Cache external files
toolbox.router.get(
  'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css',
  toolbox.networkFirst
);
toolbox.router.get(
  'https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css',
  toolbox.networkFirst
);
toolbox.router.get(
  'https://cdnjs.cloudflare.com/ajax/libs/sw-toolbox/3.6.1/sw-toolbox.js',
  toolbox.networkFirst
);
toolbox.router.get(
  'https://www.gstatic.com/firebasejs/4.11.0/firebase.js',
  toolbox.networkFirst
);
