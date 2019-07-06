export default () ->
    tabLinks = {}
    contentDivs = {}
    activeTab = ""

    toggleTab = (selectedId) ->
        for id of contentDivs
                if id is selectedId
                    tabLinks[id].className = 'selected'
                    contentDivs[id].className = 'tabContent show'
                else
                    tabLinks[id].className = ''
                    contentDivs[id].className = 'tabContent'

    showTab = () ->
        selectedId = getHash(@getAttribute('href'))
        window.location.hash = selectedId
        toggleTab(selectedId)
        false

    getFirstChildWithTagName = (element, tagName) ->
        for nodeEl in element.childNodes
            if nodeEl.nodeName is tagName then return nodeEl

    getHash = (url) ->
        hashPos = url.lastIndexOf('#')
        url.substring(hashPos + 1)

    initMenuTabs = (id) ->
        hash = window.location.hash.slice(1)
        activeTab = if tabLinks[hash] then hash else Object.keys(tabLinks)[0]
        if id is activeTab then tabLinks[id].className = 'selected'

        window.addEventListener 'hashchange', (event) -> toggleTab(window.location.hash.slice(1))
        tabLinks[id].onclick = showTab
        tabLinks[id].onfocus = () -> @blur()

    initContentTabs = (id) -> if id == activeTab then contentDivs[id].className = 'tabContent show'

    initTabs = () ->
        tabs = document.getElementById('tabs').childNodes
        for tab in tabs
            if tab.nodeName is "LI"
                tabLink = getFirstChildWithTagName(tab, 'A')
                id = getHash(tabLink.getAttribute('href'))
                tabLinks[id] = tabLink
                contentDivs[id] = document.getElementById(id)

        initMenuTabs id  for id of tabLinks
        initContentTabs id for id of contentDivs

    document.addEventListener 'DOMContentLoaded', () -> initTabs()