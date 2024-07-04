(function (thisObj) {

var config = {
  version: version,
  id: "com.Chat.cep",
  displayName: "Chat",
  symlink: "local",
  port: 3000,
  servePort: 5000,
  startingDebugPort: 8860,
  extensionManifestVersion: 6.0,
  requiredRuntimeVersion: 9.0,
  hosts: [{
    name: "IDSN",
    version: "[0.0,99.9]"
  }, {
    name: "FLPR",
    version: "[0.0,99.9]"
  }, {
    name: "AME",
    version: "[0.0,99.9]"
  }, {
    name: "ILST",
    version: "[0.0,99.9]"
  }, {
    name: "PHXS",
    version: "[0.0,99.9]"
  }, {
    name: "AUDT",
    version: "[0.0,99.9]"
  }, {
    name: "AEFT",
    version: "[0.0,99.9]"
  }, {
    name: "PPRO",
    version: "[0.0,99.9]"
  }],
  type: "Panel",
  iconDarkNormal: "./src/assets/light-icon.png",
  iconNormal: "./src/assets/dark-icon.png",
  iconDarkNormalRollOver: "./src/assets/light-icon.png",
  iconNormalRollOver: "./src/assets/dark-icon.png",
  parameters: ["--v=0", "--enable-nodejs", "--mixed-context"],
  width: 500,
  height: 550,
  panels: [{
    mainPath: "./main/index.html",
    name: "main",
    panelDisplayName: "Chat",
    autoVisible: true,
    width: 600,
    height: 650
  }],
  build: {
    jsxBin: "off",
    sourceMap: true
  },
  zxp: {
    country: "US",
    province: "CA",
    org: "MyCompany",
    password: "mypassword",
    tsa: "http://timestamp.digicert.com/",
    sourceMap: false,
    jsxBin: "off"
  },
  installModules: [],
  copyAssets: [],
  copyZipAssets: []
};

var ns = config.id;

var example$7 = function example() {
  alert("Hello, World!");
};
var importImage = function importImage(imagePath) {
  var file = new File(imagePath);
  if (!file.exists) {
    alert("Image file not found.");
    return;
  }
  app.beginUndoGroup("Import Image");
  var importOptions = new ImportOptions();
  importOptions.file = file;
  var importedItem = app.project.importFile(importOptions);
  var currentComp = app.project.activeItem;
  if (currentComp && importedItem instanceof AVItem) {
    currentComp.layers.add(importedItem);
  } else {
    alert("No active comp or imported item is not an AVItem.");
  }
  app.endUndoGroup();
};
var importImageToComp = function importImageToComp() {
  var imagePath = "E:\\下载\\登出.png";
  // 创建File对象
  var file = new File(imagePath);

  // 检查文件是否存在
  if (!file.exists) {
    alert("图片文件不存在。");
    return;
  }

  // 导入图片
  app.beginUndoGroup("Import Image");
  var importOptions = new ImportOptions();
  importOptions.file = file;
  var importedFootage;
  try {
    importedFootage = app.project.importFile(importOptions);
  } catch (e) {
    app.endUndoGroup();
    alert("导入图片时出错: " + e.toString());
    return;
  }
  app.endUndoGroup();
};

var aeft = /*#__PURE__*/__objectFreeze({
  __proto__: null,
  example: example$7,
  importImage: importImage,
  importImageToComp: importImageToComp
});

var example$6 = function example() {};

var ame = /*#__PURE__*/__objectFreeze({
  __proto__: null,
  example: example$6
});

var example$5 = function example() {};

var anim = /*#__PURE__*/__objectFreeze({
  __proto__: null,
  example: example$5
});

var example$4 = function example() {};

var audt = /*#__PURE__*/__objectFreeze({
  __proto__: null,
  example: example$4
});

var example$3 = function example() {};

var idsn = /*#__PURE__*/__objectFreeze({
  __proto__: null,
  example: example$3
});

var example$2 = function example() {};

var ilst = /*#__PURE__*/__objectFreeze({
  __proto__: null,
  example: example$2
});

var example$1 = function example() {};

var phxs = /*#__PURE__*/__objectFreeze({
  __proto__: null,
  example: example$1
});

var example = function example() {};

var ppro = /*#__PURE__*/__objectFreeze({
  __proto__: null,
  example: example
});

var host = typeof $ !== "undefined" ? $ : window;
switch (BridgeTalk.appName) {
  case "aftereffects":
  case "aftereffectsbeta":
    host[ns] = aeft;
    break;
  case "ame":
  case "amebeta":
    host[ns] = ame;
    break;
  case "audition":
  case "auditionbeta":
    host[ns] = audt;
    break;
  case "illustrator":
  case "illustratorbeta":
    host[ns] = ilst;
    break;
  case "indesign":
  case "indesignbeta":
    host[ns] = idsn;
    break;
  case "photoshop":
  case "photoshopbeta":
    host[ns] = phxs;
    break;
  case "premierepro":
  case "premiereprobeta":
    host[ns] = ppro;
    break;
  default:
    
    if (app.appName === "Adobe Animate") {
      host[ns] = anim;
    }
    break;
}

// https://extendscript.docsforadobe.dev/interapplication-communication/bridgetalk-class.html?highlight=bridgetalk#appname
