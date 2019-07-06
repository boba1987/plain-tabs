export default function() {
  var activeTab, contentDivs, getFirstChildWithTagName, getHash, initContentTabs, initMenuTabs, initTabs, showTab, tabLinks, toggleTab;
  tabLinks = {};
  contentDivs = {};
  activeTab = "";
  toggleTab = function(selectedId) {
    var id, results;
    if (!selectedId) {
      selectedId = Object.keys(tabLinks)[0];
    }
    results = [];
    for (id in contentDivs) {
      if (id === selectedId) {
        tabLinks[id].className = 'selected';
        results.push(contentDivs[id].className = 'tabContent show');
      } else {
        tabLinks[id].className = '';
        results.push(contentDivs[id].className = 'tabContent');
      }
    }
    return results;
  };
  showTab = function() {
    var selectedId;
    selectedId = getHash(this.getAttribute('href'));
    window.location.hash = selectedId;
    toggleTab(selectedId);
    return false;
  };
  getFirstChildWithTagName = function(element, tagName) {
    var i, len, nodeEl, ref;
    ref = element.childNodes;
    for (i = 0, len = ref.length; i < len; i++) {
      nodeEl = ref[i];
      if (nodeEl.nodeName === tagName) {
        return nodeEl;
      }
    }
  };
  getHash = function(url) {
    var hashPos;
    hashPos = url.lastIndexOf('#');
    return url.substring(hashPos + 1);
  };
  initMenuTabs = function(id) {
    var hash;
    hash = window.location.hash.slice(1);
    activeTab = tabLinks[hash] ? hash : Object.keys(tabLinks)[0];
    if (id === activeTab) {
      tabLinks[id].className = 'selected';
    }
    window.addEventListener('hashchange', function(event) {
      return toggleTab(window.location.hash.slice(1));
    });
    tabLinks[id].onclick = showTab;
    return tabLinks[id].onfocus = function() {
      return this.blur();
    };
  };
  initContentTabs = function(id) {
    if (id === activeTab) {
      return contentDivs[id].className = 'tabContent show';
    }
  };
  initTabs = function() {
    var i, id, len, results, tab, tabLink, tabs;
    tabs = document.getElementById('tabs').childNodes;
    for (i = 0, len = tabs.length; i < len; i++) {
      tab = tabs[i];
      if (tab.nodeName === "LI") {
        tabLink = getFirstChildWithTagName(tab, 'A');
        id = getHash(tabLink.getAttribute('href'));
        tabLinks[id] = tabLink;
        contentDivs[id] = document.getElementById(id);
      }
    }
    for (id in tabLinks) {
      initMenuTabs(id);
    }
    results = [];
    for (id in contentDivs) {
      results.push(initContentTabs(id));
    }
    return results;
  };
  return document.addEventListener('DOMContentLoaded', function() {
    return initTabs();
  });
};
