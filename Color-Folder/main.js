const { Plugin } = require('siyuan');

// --- globals ---

let observer = null;
let color_config = null;

class ColorFolderPlugin extends Plugin {
  constructor() {
    super();
  }

  onload() {
    observer = onFileTreeUpdate()
  }

  onunload() {
    if (observer) {
      observer.disconnect()
    }
  }
}

module.exports = ColorFolderPlugin;

function render(mutations) {
  console.log("Added", mutations[0].addedNodes)
  if (!mutations[0].addedNodes) {
    return
  }

  let config = loadConfig()

  mutations[0].addedNodes.forEach(element => {
    const nodes = element.getElementsByTagName("li")

    Array.from(nodes).forEach(li => {
      const li_id = li.getAttribute("data-node-id")

      if (li_id in config) {
        console.log("Add", li_id, config)
        li.getElementsByClassName("b3-list-item__text")[0].style.setProperty('color', config[li_id], 'important');
      }
    })
  });
}

function onFileTreeUpdate() {
  var target = document.getElementsByClassName('file-tree')[0];
  var observe = new MutationObserver(function (mutations, observe) {
    render(mutations)
  });
  observe.observe(target, { subtree: true, childList: true });
  return observe
}

function MenuSeparator(className = 'b3-menu__separator') {
  let node = document.createElement('button');
  node.className = className;
  return node;
}

setTimeout(() => ClickMonitor(), 1000)

function ClickMonitor() {
  window.addEventListener('mouseup', MenuShow)
}

function MenuShow() {
  setTimeout(() => {
    let node = document.querySelectorAll('.b3-list-item--focus')[0];
    if (node.getAttribute("data-type") === "navigation-file") {
      addFileTreeButton()
    }
  }, 0);
}

function addFileTreeButton() {
  let button = document.createElement("button")
  button.id = "color-select"
  button.className = "b3-menu__item"
  button.innerHTML = '<svg class="b3-menu__icon" style="null"><use xlink:href="#iconGlobalGraph"></use></svg><span class="b3-menu__label" style="">修改颜色</span></button>'
  button.appendChild(SubMenu(selectid, selecttype))

  let commonMenu = document.getElementById("commonMenu")
  let readonly = commonMenu.querySelector(".b3-menu__item--readonly")
  let colorselectel = commonMenu.querySelector('[id="color-select"]')
  if (!readonly && !colorselectel) {
    commonMenu.insertBefore("beforeend", MenuSeparator())
    commonMenu.insertBefore("beforeend", button)
  }
}


// config: {id: color}

function saveConfig(config) {
  color_config = config
  localStorage.setItem('color-folder-config', JSON.stringify(config))
}

function loadConfig() {
  if (color_config) {
    return color_config
  }

  const localConfig = localStorage.getItem('color-folder-config')
  if (localConfig) {
    return JSON.parse(localConfig)
  } else {
    saveConfig({})
    return {}
  }
}