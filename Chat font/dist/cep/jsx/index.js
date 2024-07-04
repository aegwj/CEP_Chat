(function (thisObj) {// ----- EXTENDSCRIPT INCLUDES ------ //"object"!=typeof JSON&&(JSON={}),function(){"use strict";var rx_one=/^[\],:{}\s]*$/,rx_two=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rx_three=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rx_four=/(?:^|:|,)(?:\s*\[)+/g,rx_escapable=/[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,rx_dangerous=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta,rep;function f(t){return t<10?"0"+t:t}function this_value(){return this.valueOf()}function quote(t){return rx_escapable.lastIndex=0,rx_escapable.test(t)?'"'+t.replace(rx_escapable,function(t){var e=meta[t];return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+t+'"'}function str(t,e){var r,n,o,u,f,a=gap,i=e[t];switch(i&&"object"==typeof i&&"function"==typeof i.toJSON&&(i=i.toJSON(t)),"function"==typeof rep&&(i=rep.call(e,t,i)),typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";if(gap+=indent,f=[],"[object Array]"===Object.prototype.toString.apply(i)){for(u=i.length,r=0;r<u;r+=1)f[r]=str(r,i)||"null";return o=0===f.length?"[]":gap?"[\n"+gap+f.join(",\n"+gap)+"\n"+a+"]":"["+f.join(",")+"]",gap=a,o}if(rep&&"object"==typeof rep)for(u=rep.length,r=0;r<u;r+=1)"string"==typeof rep[r]&&(o=str(n=rep[r],i))&&f.push(quote(n)+(gap?": ":":")+o);else for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(o=str(n,i))&&f.push(quote(n)+(gap?": ":":")+o);return o=0===f.length?"{}":gap?"{\n"+gap+f.join(",\n"+gap)+"\n"+a+"}":"{"+f.join(",")+"}",gap=a,o}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},Boolean.prototype.toJSON=this_value,Number.prototype.toJSON=this_value,String.prototype.toJSON=this_value),"function"!=typeof JSON.stringify&&(meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(t,e,r){var n;if(gap="",indent="","number"==typeof r)for(n=0;n<r;n+=1)indent+=" ";else"string"==typeof r&&(indent=r);if(rep=e,e&&"function"!=typeof e&&("object"!=typeof e||"number"!=typeof e.length))throw new Error("JSON.stringify");return str("",{"":t})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){var j;function walk(t,e){var r,n,o=t[e];if(o&&"object"==typeof o)for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(void 0!==(n=walk(o,r))?o[r]=n:delete o[r]);return reviver.call(t,e,o)}if(text=String(text),rx_dangerous.lastIndex=0,rx_dangerous.test(text)&&(text=text.replace(rx_dangerous,function(t){return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})),rx_one.test(text.replace(rx_two,"@").replace(rx_three,"]").replace(rx_four,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();// ---------------------------------- //// ----- EXTENDSCRIPT PONYFILLS -----function __objectFreeze(obj) { return obj; }// ---------------------------------- //var version = "0.0.1";

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
})(this);//# sourceMappingURL=index.js.map
