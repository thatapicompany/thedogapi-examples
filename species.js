/**
 * Species switch for the example apps.
 *
 * The same static site is deployed to examples.thedogapi.com and
 * examples.thecatapi.com. Which brand a page shows is decided by the hostname
 * (or `?species=cat` when testing locally), so there is one copy of each
 * example to maintain.
 *
 * Usage in a page:
 *   <script src="../species.js"></script>
 *   ...
 *   const API_URL = SPECIES.apiBase;
 *
 * Any `{{token}}` in the page's text, `alt`, `placeholder` or `title`
 * attributes is replaced on load with the matching SPECIES value, e.g.
 * <h1>{{Animal}} Breed Search</h1>.
 */
(function () {
  var configs = {
    dog: {
      id: 'dog',
      animal: 'dog',
      animals: 'dogs',
      Animal: 'Dog',
      Animals: 'Dogs',
      brand: 'TheDogAPI',
      title: 'The Dog API',
      domain: 'thedogapi.com',
      siteUrl: 'https://thedogapi.com',
      apiBase: 'https://api.thedogapi.com/v1',
      uploadBase: 'https://upload.thedogapi.com/v1',
      cdn: 'https://cdn2.thedogapi.com',
      searchHint: "Search breeds (e.g., 'Golden', 'Terrier')...",
    },
    cat: {
      id: 'cat',
      animal: 'cat',
      animals: 'cats',
      Animal: 'Cat',
      Animals: 'Cats',
      brand: 'TheCatAPI',
      title: 'The Cat API',
      domain: 'thecatapi.com',
      siteUrl: 'https://thecatapi.com',
      apiBase: 'https://api.thecatapi.com/v1',
      uploadBase: 'https://upload.thecatapi.com/v1',
      cdn: 'https://cdn2.thecatapi.com',
      searchHint: "Search breeds (e.g., 'Siamese', 'Rex')...",
    },
  };

  function detect() {
    var fromQuery = new URLSearchParams(window.location.search).get('species');
    if (fromQuery && configs[fromQuery]) return fromQuery;
    if (/thecatapi\.com$/i.test(window.location.hostname)) return 'cat';
    if (/\bcat\b/i.test(window.location.hostname)) return 'cat';
    return 'dog';
  }

  var species = configs[detect()];
  window.SPECIES = species;

  function fill(text) {
    return text.replace(/\{\{(\w+)\}\}/g, function (match, key) {
      return Object.prototype.hasOwnProperty.call(species, key) ? species[key] : match;
    });
  }

  function applyToDom() {
    document.title = fill(document.title);
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    var node;
    var textNodes = [];
    while ((node = walker.nextNode())) {
      if (node.nodeValue.indexOf('{{') !== -1) textNodes.push(node);
    }
    textNodes.forEach(function (n) {
      n.nodeValue = fill(n.nodeValue);
    });
    ['alt', 'placeholder', 'title', 'href'].forEach(function (attr) {
      var selector = '[' + attr + '*="{{"]';
      document.querySelectorAll(selector).forEach(function (el) {
        el.setAttribute(attr, fill(el.getAttribute(attr)));
      });
    });
    document.documentElement.setAttribute('data-species', species.id);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyToDom);
  } else {
    applyToDom();
  }
})();
