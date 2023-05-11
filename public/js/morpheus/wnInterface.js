/*! WNInterface for MCore 2.1.6.7 */
var WN_INTERFACE_VERSION = "2.1.6.7";
var DT_PC = 0;
var DT_IPOD = 1;
var DT_IPHONE = 2;
var DT_IPAD = 3;
var DT_IOS = 4;
var DT_ANDROID = 5;
var DT_VIRTUAL = 9;
var DT_WINDOWS = DT_VIRTUAL;
var wnIf = new (function (a) {
  this.init = function () {
    var c = navigator.userAgent.toLowerCase();
    var b = navigator.platform.toLowerCase();
    if (window.Web !== a) {
      console.log("parent.Web");
      this.device = DT_VIRTUAL;
      window.VirtualInterface =
        Web.instance.virtualInterfaceWithContext(window);
    } else {
      if (parent !== a && parent.Emulator !== a) {
        console.log("parent.Emulatore");
        this.device = DT_VIRTUAL;
        window.VirtualInterface = parent.Emulator.sharedInstance()
          .currentProject()
          .virtualInterfaceWithContext(window);
      } else {
        if (c.match(/emulator/i)) {
          console.log("virtual-interface");
          this.device = DT_VIRTUAL;
          window.VirtualInterface = (function () {
            return {
              get: function () {
                return M.execute.apply(M, arguments);
              },
              execute: function () {
                return M.execute.apply(M, arguments);
              },
            };
          })();
        } else {
          if (c.match(/iphone|ipad|ipod|macintosh/i)) {
            this.device = DT_IOS;
          } else {
            if (c.match(/android/i)) {
              this.device = DT_ANDROID;
            } else {
              this.device = DT_PC;
            }
          }
        }
      }
    }
    this._device = this.device;
    if (window.MCore !== a) {
      MCore.fn.version.wnInterface = WN_INTERFACE_VERSION;
    }
  };
  this.isLoading = function () {
    return "true";
  };
  this.callInitPage = false;
  return this;
})();
wnIf.init();
function addScriptOnLoad(a) {
  if (WNCheckFunc(a)) {
    if (typeof window.attachEvent === "function") {
      window.attachEvent("onload", a);
    } else {
      window.addEventListener("load", a, false);
    }
  }
}
String.prototype.cutByte = function (a) {
  var d = this;
  var b = 0;
  for (var c = 0; c < d.length; c++) {
    b += d.charCodeAt(c) > 128 ? 2 : 1;
    if (b > a) {
      return d.substring(0, c);
    }
  }
  return d;
};
String.prototype.byteLen = function () {
  var c = this;
  var a = 0;
  for (var b = 0; b < c.length; b++) {
    a += c.charCodeAt(b) > 128 ? 2 : 1;
  }
  return a;
};
String.prototype.trim = function () {
  return this.replace(/^\s+|\s+$/g, "");
};
String.prototype.ltrim = function () {
  return this.replace(/^\s+/, "");
};
String.prototype.rtrim = function () {
  return this.replace(/\s+$/, "");
};
function StringBuffer() {
  this.buffer = [];
}
StringBuffer.prototype.append = function append(a) {
  this.buffer.push(a);
  return this;
};
StringBuffer.prototype.toString = function toString() {
  return this.buffer.join("");
};
function getRequestDataObject(b, d, a) {
  var c = [];
  c[0] = b;
  c[1] = d;
  c[2] = a;
  return c;
}
DataSendingHandler.TYPE_STRING = 0;
DataSendingHandler.TYPE_INT = 1;
DataSendingHandler.TYPE_SHORT = 2;
DataSendingHandler.TYPE_BYTE = 3;
function DataSendingHandler() {
  this.data = {};
  this.data.headArray = [];
  this.data.dataArray = [];
  this.data.extraArray = [];
  this.data.length = 0;
  this.ptr = 0;
  this.putExtraInfo = function (b, a) {
    var c = {};
    c[b] = a;
    this.data.extraArray.push(c);
  };
  this.putHeadInfo = function (b, a) {
    var c = {};
    c[b] = a;
    this.data.headArray.push(c);
  };
  this.putString = function (b, a) {
    if (a > 0) {
      this.data.dataArray[this.ptr++] = getRequestDataObject(
        DataSendingHandler.TYPE_STRING,
        b.cutByte(a),
        a
      );
      this.data.length += a;
    }
  };
  this.putInt = function (a) {
    this.data.dataArray[this.ptr++] = getRequestDataObject(
      DataSendingHandler.TYPE_INT,
      a,
      4
    );
    this.data.length += 4;
  };
  this.putShort = function (a) {
    this.data.dataArray[this.ptr++] = getRequestDataObject(
      DataSendingHandler.TYPE_SHORT,
      a,
      2
    );
    this.data.length += 2;
  };
  this.putByte = function (a) {
    this.data.dataArray[this.ptr++] = getRequestDataObject(
      DataSendingHandler.TYPE_BYTE,
      a,
      1
    );
    this.data.length += 1;
  };
  this.toString = function () {
    return JSON.stringify(this.data);
  };
}
DataReceivingHandler.TYPE_STRING = 0;
DataReceivingHandler.TYPE_INT = 1;
DataReceivingHandler.TYPE_SHORT = 2;
DataReceivingHandler.TYPE_BYTE = 3;
DataReceivingHandler.TYPE_REPEAT_COUNT = 4;
DataReceivingHandler.TYPE_REPEAT_START = 5;
DataReceivingHandler.TYPE_REPEAT_END = 6;
DataReceivingHandler.TYPE_STRING_AFTER_ALL = 7;
function DataReceivingHandler() {
  this.data = {};
  this.data.vo = [];
  this.data.length = 0;
  this.ptr = 0;
  this.getString = function (c, a) {
    if (a > 0) {
      var b = [];
      b[0] = DataReceivingHandler.TYPE_STRING;
      b[1] = c;
      b[2] = a;
      this.data.vo[this.ptr++] = b;
      this.data.length += a;
    }
  };
  this.getStringAfterAll = function (b) {
    var a = [];
    a[0] = DataReceivingHandler.TYPE_STRING_AFTER_ALL;
    a[1] = b;
    a[2] = 0;
    this.data.vo[this.ptr++] = a;
  };
  this.getInt = function (b) {
    var a = [];
    a[0] = DataReceivingHandler.TYPE_INT;
    a[1] = b;
    a[2] = 4;
    this.data.vo[this.ptr++] = a;
    this.data.length += 4;
  };
  this.getShort = function (b) {
    var a = [];
    a[0] = DataReceivingHandler.TYPE_SHORT;
    a[1] = b;
    a[2] = 2;
    this.data.vo[this.ptr++] = a;
    this.data.length += 2;
  };
  this.getByte = function (b) {
    var a = [];
    a[0] = DataReceivingHandler.TYPE_BYTE;
    a[1] = b;
    a[2] = 1;
    this.data.vo[this.ptr++] = a;
    this.data.length += 1;
  };
  this.getRepeatCount = function (c, a) {
    if (a > 0) {
      var b = [];
      b[0] = DataReceivingHandler.TYPE_REPEAT_COUNT;
      b[1] = c;
      b[2] = a;
      this.data.vo[this.ptr++] = b;
      this.data.length += a;
    }
  };
  this.setStartRepeat = function (c, a) {
    var b = [];
    b[0] = DataReceivingHandler.TYPE_REPEAT_START;
    b[1] = c;
    b[2] = a;
    this.data.vo[this.ptr++] = b;
  };
  this.setEndRepeat = function () {
    var a = [];
    a[0] = DataReceivingHandler.TYPE_REPEAT_END;
    this.data.vo[this.ptr++] = a;
  };
  this.toString = function () {
    return JSON.stringify(this.data);
  };
}
function ParameterMap() {
  this.array = [];
}
ParameterMap.prototype.put = function (b, c) {
  var a = this.getIndex(b);
  if (a > -1) {
    this.array[a] = { key: b, value: c };
  } else {
    this.array.push({ key: b, value: c });
  }
};
ParameterMap.prototype.get = function (b) {
  var a = this.getIndex(b);
  if (a > -1) {
    return this.array[a].value;
  } else {
    return "";
  }
};
ParameterMap.prototype.getAtIndex = function (a) {
  return this.array[a].value;
};
ParameterMap.prototype.remove = function (b) {
  var a = this.getIndexOfValue(b);
  this.removeByIndex(a);
};
ParameterMap.prototype.removeByKey = function (b) {
  var a = this.getIndex(b);
  this.removeByIndex(a);
};
ParameterMap.prototype.removeByIndex = function (a) {
  this.array.splice(a, 1);
};
ParameterMap.prototype.clear = function () {
  this.array = new Array(0);
};
ParameterMap.prototype.all = function () {
  return this.array;
};
ParameterMap.prototype.getIndex = function (c) {
  var a = -1;
  for (var b = 0; b < this.array.length; b++) {
    var d = this.array[b];
    if (d.key === c) {
      a = b;
    }
  }
  return a;
};
ParameterMap.prototype.getIndexOfValue = function (d) {
  var a = -1;
  for (var b = 0; b < this.array.length; b++) {
    var c = this.array[b];
    if (c.value === d) {
      a = b;
    }
  }
  return a;
};
ParameterMap.prototype.getKeyOfValue = function (d) {
  var b = "";
  for (var a = 0; a < this.array.length; a++) {
    var c = this.array[a];
    if (c.value === d) {
      b = c.key;
    }
  }
  return b;
};
ParameterMap.prototype.contains = function (b) {
  var a = this.getIndexOfValue(b);
  return a > -1;
};
ParameterMap.prototype.containsKey = function (b) {
  var a = this.getIndex(b);
  return a > -1;
};
ParameterMap.prototype.size = function () {
  return this.array.length;
};
function Parameter() {
  this.parameters = new ParameterMap();
  this.initParameters = function (c) {
    if (c === "null") {
      return;
    }
    if (wnIf.device === DT_IOS) {
      c = decodeURIComponent(c);
    }
    if (c.trim() !== "") {
      var e = c.split("&");
      for (var b = 0; b < e.length; b++) {
        var a = e[b].split("=")[0];
        var d = e[b].split("=")[1];
        this.parameters.put(a, d);
      }
    }
  };
  this.initParametersFromHref = function (d) {
    if (d === "null") {
      return;
    }
    var g = "";
    if (d.trim() !== "") {
      var a = d;
      var f = a.slice(a.indexOf("?") + 1, a.length).split("&");
      for (var c = 0; c < f.length; c++) {
        var b = f[c].split("=")[0];
        var e = f[c].split("=")[1];
        this.parameters.put(b, e);
      }
    }
  };
  this.putParameter = function (a, b) {
    this.parameters.put(a, encodeURIComponent(b));
  };
  this.setParameter = function (a, b) {
    this.parameters.put(a, encodeURIComponent(b));
  };
  this.getParameter = function (a) {
    return decodeURIComponent(this.parameters.get(a));
  };
  this.removeParameter = function (a) {
    this.parameters.removeByKey(a);
  };
  this.removeAll = function () {
    this.parameters.clear();
  };
  this.toParamString = function () {
    var c = this.parameters.all();
    var d = "";
    for (var b = 0; b < this.parameters.size(); b++) {
      var a = c[b];
      d += a.key + "=" + a.value;
      if (b < this.parameters.size() - 1) {
        d += "&";
      }
    }
    return d;
  };
}
function WNImportJavascript(b) {
  var a = document.createElement("script");
  a.type = "text/javascript";
  a.src = b;
  document.body.appendChild(a);
}
function WNGetParameter(a) {
  if (wnIf.device === DT_IOS) {
    return IOSNative.callSynchronous("WNGetParameter", a);
  } else {
    if (wnIf.device === DT_ANDROID) {
      return decodeURIComponent(Native.wnGetParameter(a));
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        return VirtualInterface.get("wnGetParameter", a);
      }
    }
  }
}
function WNSetParameter(a, b) {
  if (typeof b === "undefined") {
    b = "";
  }
  if (typeof b !== "string") {
    if (b.toString && typeof b.toString === "function") {
      b = b.toString();
    } else {
      b = b + "";
    }
  }
  if (wnIf.device === DT_IOS) {
    IOSNative.callSynchronous("WNSetParameter", a, b);
  } else {
    if (wnIf.device === DT_ANDROID) {
      Native.wnSetParameter(a, encodeURIComponent(b));
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute("wnSetParameter", a, b);
      }
    }
  }
}
function WNPutParameter(a, b) {
  WNSetParameter(a, b);
}
function WNListAllParameters() {
  if (wnIf.device === DT_IOS) {
    return JSON.parse(IOSNative.callSynchronous("WNListAllParameters"));
  } else {
    if (wnIf.device === DT_ANDROID) {
      return JSON.parse(Native.wnListAllParameters());
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        return JSON.parse(VirtualInterface.execute("wnListAllParameters"));
      }
    }
  }
}
function WNRemoveParameter(a) {
  if (wnIf.device === DT_IOS) {
    IOSNative.callSynchronous("WNRemoveParameter", a);
  } else {
    if (wnIf.device === DT_ANDROID) {
      Native.wnRemoveParameter(a);
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute("wnRemoveParameter", a);
      }
    }
  }
}
function WNRemoveAllParameter() {
  if (wnIf.device === DT_IOS) {
    IOSNative.callSynchronous("WNRemoveAllParameter");
  } else {
    if (wnIf.device === DT_ANDROID) {
      Native.wnRemoveAllParameter();
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute("wnRemoveAllParameter");
      }
    }
  }
}
var Request = function () {
  this.getParameters = function () {
    return decodeURIComponent(paramString);
  };
  this.getParameter = function (a) {
    return WNGetParameter(a);
  };
};
var request = new Request();
function WNCheckFunc(funcName) {
  try {
    if (eval("typeof " + funcName + " === 'function'")) {
      return true;
    }
  } catch (e) {
    WNLog("WNInterface JS Error", "" + e);
  }
  return false;
}
function getUrlInfo(b) {
  var a = b;
  var c = b;
  var d = "";
  if (a.indexOf("?") > -1) {
    c = a.slice(0, a.indexOf("?"));
    d = a.slice(a.indexOf("?") + 1, a.length);
  }
  return { fileName: c, parameters: d };
}
var IOSNative = (function () {
  this.callAsynchronous = function () {
    var a = arguments;
    if (a.length === 0) {
      WNLog("common", "no arguemnts..");
      return;
    }
    setTimeout(function () {
      alert(IOSNative.createJsCall(a));
    }, 0);
  };
  this.callSynchronous = function () {
    var a = arguments;
    if (a.length === 0) {
      WNLog("common", "no arguemnts..");
      return "";
    }
    return prompt(this.createJsCall(a));
  };
  this.createJsCall = function (c) {
    var g = c.length;
    var b = new StringBuffer();
    b.append("jscall://?method=" + c[0]);
    for (var d = 1; d < g; d++) {
      var a = c[d];
      if (typeof a === "undefined") {
        a = "";
      }
      if (typeof a !== "string") {
        try {
          a = a.toString();
        } catch (f) {
          a = "";
        }
      }
      b.append("&param" + d + "=" + encodeURIComponent(a));
    }
    return b.toString();
  };
  return this;
})();
function checkCallBackParam(a) {
  var b = new StringBuffer();
  if (typeof a === "undefined") {
    a = "";
  }
  if (typeof a !== "string") {
    try {
      a = a.toString();
    } catch (c) {
      a = "";
    }
  }
  b.append(a);
  return b.toString();
}
function WNLog(a, b, c) {
  if (c === undefined) {
    c = "v";
  }
  if (wnIf.device === DT_IOS) {
    IOSNative.callSynchronous("WNLog", a, b, c);
  } else {
    if (wnIf.device === DT_ANDROID) {
      Native.wnLog(a, b, c);
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute("wnLog", a, b, c);
      }
    }
  }
}
function WNSetVariable(a, b) {
  if (typeof b === "undefined") {
    b = "";
  }
  if (typeof b !== "string") {
    if (b.toString && typeof b.toString === "function") {
      b = b.toString();
    } else {
      b = b + "";
    }
  }
  if (wnIf.device === DT_IOS) {
    IOSNative.callSynchronous("WNSetVariable", a, b);
  } else {
    if (wnIf.device === DT_ANDROID) {
      Native.wnSetVariable(a, b);
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute("wnSetVariable", a, b);
      }
    }
  }
}
function WNGetVariable(a) {
  if (wnIf.device === DT_IOS) {
    return IOSNative.callSynchronous("WNGetVariable", a);
  } else {
    if (wnIf.device === DT_ANDROID) {
      return Native.wnGetVariable(a) + "";
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        return VirtualInterface.get("wnGetVariable", a);
      }
    }
  }
}
function WNSetVariableToStorage(a, b) {
  if (typeof b === "undefined") {
    b = "";
  }
  if (typeof b !== "string") {
    if (b.toString && typeof b.toString === "function") {
      b = b.toString();
    } else {
      b = b + "";
    }
  }
  if (wnIf.device === DT_IOS) {
    IOSNative.callSynchronous("WNSetVariableToStorage", a, b);
  } else {
    if (wnIf.device === DT_ANDROID) {
      Native.wnSetVariableToStorage(a, b);
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute("wnSetVariableToStorage", a, b);
      }
    }
  }
}
function WNGetVariableFromStorage(a) {
  if (wnIf.device === DT_IOS) {
    return IOSNative.callSynchronous("WNGetVariableFromStorage", a);
  } else {
    if (wnIf.device === DT_ANDROID) {
      return Native.wnGetVariableFromStorage(a);
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        return VirtualInterface.get("wnGetVariableFromStorage", a);
      }
    }
  }
}
function WNListAllStorageVariables() {
  if (wnIf.device === DT_IOS) {
    return JSON.parse(IOSNative.callSynchronous("WNListAllStorageVariables"));
  } else {
    if (wnIf.device === DT_ANDROID) {
      return JSON.parse(Native.wnListAllStorageVariables());
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        return VirtualInterface.execute("wnListAllStorageVariables");
      }
    }
  }
}
function WNResetAllStorageVariables() {
  if (wnIf.device === DT_IOS) {
    return JSON.parse(IOSNative.callSynchronous("WNResetAllStorageVariables"));
  } else {
    if (wnIf.device === DT_ANDROID) {
      return JSON.parse(Native.wnResetAllStorageVariables());
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        return JSON.parse(
          VirtualInterface.execute("wnResetAllStorageVariables")
        );
      }
    }
  }
}
function WNGetDeviceInfo() {
  if (wnIf.device === DT_IOS) {
    return JSON.parse(IOSNative.callSynchronous("WNGetDeviceInfo"));
  } else {
    if (wnIf.device === DT_ANDROID) {
      return JSON.parse(Native.wnGetDeviceInfoByJson());
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        return JSON.parse(VirtualInterface.execute("wnGetDeviceInfo"));
      }
    }
  }
}
function WNInitializeHttpNetwork(a, b, d, c) {
  Native.wnInitializeHttpNetwork(a, b, d, c);
}
function WNRequestHttpDataToServer(c, b, a, f, d, e) {
  return WNRequestJsonDataToServer(c, b, a, f, d, e);
}
function WNHttpSendData(c, b, a, f, d, e) {
  return WNRequestJsonDataToServer(c, b, a, f, d, e);
}
function WNRequestJsonDataToServer(f, c, j, i, p, g) {
  var l = "N";
  var n = "Y";
  var o = "";
  var e = "N";
  var m = "";
  var b = "Y";
  var k = -1;
  var a = null;
  var d = "POST";
  if (p !== null) {
    l = p.encrypt ? "Y" : "N";
    n = p.indicator ? "Y" : "N";
    if (p.indicatorMsg !== undefined) {
      o = p.indicatorMsg;
    }
    e = p.dummy ? "Y" : "N";
    if (p.retargetUrl !== undefined) {
      m = p.retargetUrl;
    }
    if (p.cancelable === undefined) {
      b = "Y";
    } else {
      b = p.cancelable ? "Y" : "N";
    }
    if (p.timeOut === undefined) {
      k = -1;
    } else {
      k = p.timeOut;
    }
    if (p.userData === undefined || p.userData === null) {
      a = {};
    } else {
      a = p.userData;
    }
    if (p.method === undefined || p.method === null) {
      d = "POST";
    } else {
      var h = p.method.toUpperCase();
      if (h === "GET" || h === "POST" || h === "PUT" || h === "DELETE") {
        d = h;
      } else {
        d = "POST";
      }
    }
  }
  g = g === undefined ? "" : g;
  if (wnIf.device === DT_IOS) {
    IOSNative.callAsynchronous(
      "WNRequestJsonDataToServer",
      f,
      c,
      j,
      JSON.stringify(i),
      l,
      n,
      o,
      e,
      m,
      b,
      g,
      k,
      JSON.stringify(a),
      d
    );
  } else {
    if (wnIf.device === DT_ANDROID) {
      WN2CommonAsync(
        "wnRequestJsonDataToServer",
        f,
        c,
        checkCallBackParam(j),
        JSON.stringify(i),
        l,
        n,
        o,
        e,
        m,
        b,
        g,
        k,
        JSON.stringify(a),
        d,
        document.location.href
      );
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute(
          "wnRequestJsonDataToServer",
          f,
          c,
          j,
          JSON.stringify(i),
          l,
          n,
          o,
          e,
          m,
          b,
          g,
          k,
          JSON.stringify(a),
          d
        );
      }
    }
  }
}
function WNRequestSocketDataToServer(e, c, h, n, g, m, f) {
  var i = "N";
  var k = "Y";
  var l = "";
  var d = "N";
  var j = "";
  var b = "Y";
  var a = null;
  if (m !== null) {
    i = m.encrypt ? "Y" : "N";
    k = m.indicator ? "Y" : "N";
    l = m.indicatorMsg;
    d = m.dummy ? "Y" : "N";
    j = m.retargetUrl;
    if (m.cancelable === undefined) {
      b = "Y";
    } else {
      b = m.cancelable ? "Y" : "N";
    }
    if (m.userData === undefined || m.userData === null) {
      a = {};
    } else {
      a = m.userData;
    }
  }
  f = f === undefined ? "" : f;
  if (wnIf.device === DT_IOS) {
    IOSNative.callAsynchronous(
      "WNRequestSocketDataToServer",
      e,
      c,
      h,
      JSON.stringify(n),
      JSON.stringify(g),
      i,
      k,
      l,
      b,
      f,
      JSON.stringify(a)
    );
  } else {
    if (wnIf.device === DT_ANDROID) {
      WN2CommonAsync(
        "wnRequestSocketDataToServer",
        e,
        c,
        checkCallBackParam(h),
        JSON.stringify(n),
        JSON.stringify(g),
        i,
        k,
        l,
        d,
        j,
        b,
        f,
        JSON.stringify(a)
      );
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execure(
          "wnRequestSocketDataToServer",
          e,
          c,
          h,
          JSON.stringify(n),
          JSON.stringify(g),
          i,
          k,
          l,
          b,
          f,
          JSON.stringify(a)
        );
      }
    }
  }
}
function WNSocketSendData(d, b, a, e, c, f, g) {
  WNRequestSocketDataToServer(d, b, a, e, c, f, g);
}
function WNResponseJsonDataFromServer(
  trCode,
  callBackFuncName,
  recvData,
  tagId,
  userData
) {
  var callback;
  try {
    callback = eval(callBackFuncName);
  } catch (e) {
    console.error(
      "WNResponseJsonDataFromServer",
      "callback 함수를 찾을 수 없습니다.",
      callBackFuncName
    );
    return;
  }
  if (typeof recvData == "string") {
    var trimRecvData = recvData
      .replace(/\↵/, "\\n")
      .replace(/\n/g, "\\n")
      .replace(/\\n/g, "\\n")
      .replace(/\\'/g, "\\'")
      .replace(/\\"/g, '\\"')
      .replace(/\\&/g, "\\&")
      .replace(/\\r/g, "\\r")
      .replace(/\\t/g, "\\t")
      .replace(/\\b/g, "\\b")
      .replace(/\\f/g, "\\f");
    callback(trCode, JSON.parse(trimRecvData), tagId, JSON.parse(userData));
  } else {
    callback(trCode, recvData, tagId, JSON.parse(userData));
  }
}
function WNResponseSocketDataFromServer(
  trCode,
  callBackFuncName,
  recvData,
  tagId,
  userData
) {
  try {
    if (wnIf.device === DT_IOS) {
      eval(callBackFuncName)(
        trCode,
        JSON.parse(recvData),
        tagId,
        JSON.parse(userData)
      );
    } else {
      if (wnIf.device === DT_ANDROID) {
        eval(callBackFuncName)(
          trCode,
          JSON.parse(recvData),
          tagId,
          JSON.parse(userData)
        );
      } else {
        if (wnIf.device === DT_VIRTUAL) {
          eval(callBackFuncName)(
            trCode,
            JSON.parse(recvData),
            tagId,
            JSON.parse(userData)
          );
        }
      }
    }
  } catch (e) {
    WNLog("WNInterface JS Error", "" + e);
  }
}
function WNRequestAppUpdating(a, c, b) {
  if (wnIf.device === DT_IOS) {
    IOSNative.callAsynchronous("WNRequestAppUpdating", a, c, b);
  } else {
    if (wnIf.device === DT_ANDROID) {
      WN2CommonAsync("wnRequestAppUpdating", a, c, b);
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute("wnRequestAppUpdating", a, c, b);
      }
    }
  }
}
function WNVibration(a) {
  if (wnIf.device === DT_IOS) {
    IOSNative.callAsynchronous("WNVibration", a);
  } else {
    if (wnIf.device === DT_ANDROID) {
      Native.wnVibration(a);
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute("wnVibration", a);
      }
    }
  }
}
function WNMakeVibration(a) {
  return WNVibration(a);
}
function WNExitProgram() {
  if (wnIf.device === DT_IOS) {
    IOSNative.callAsynchronous("WNExitProgram");
  } else {
    if (wnIf.device === DT_ANDROID) {
      Native.wnExitProgram();
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute("wnExitProgram");
      }
    }
  }
}
function WNReplaceHtmlPage(b, d) {
  var a = false;
  var c = "";
  if (d === null || d === undefined || d === "") {
    a = true;
  }
  if (wnIf.device === DT_IOS) {
    if (a) {
      c = b + "?NAVIKEYUPDATE=YES";
    } else {
      c = b + "?" + d + "&NAVIKEYUPDATE=YES";
    }
    document.location.replace(c);
  } else {
    if (wnIf.device === DT_ANDROID) {
      if (a) {
        c = b;
      } else {
        c = b + "?" + d;
      }
      Native.wnRequestMoveToWeb(c, "false");
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute("wnReplaceHtmlPage", b, d);
      }
    }
  }
}
function WNMoveToWeb(b, a) {
  var d = "";
  if (b.indexOf("?") !== -1) {
    var c = b.split("?");
    b = c[0];
    d = c[1];
  }
  return WNReplaceHtmlPage(b, d);
}
function WNMoveToWebOnNewAct(d, c, e, b) {
  if (WNCheckFunc("onHidePage")) {
    onHidePage();
  }
  var a = getUrlInfo(d);
  if (wnIf.device === DT_IOS) {
    IOSNative.callAsynchronous(
      "WNMoveToWebOnNewAct",
      a.fileName,
      a.parameters,
      c,
      e,
      b
    );
  } else {
    if (wnIf.device === DT_ANDROID) {
      Native.wnRequestMoveToWebOnActivity(
        a.fileName,
        encodeURIComponent(a.parameters),
        c,
        e,
        b
      );
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute(
          "wnMoveToWebOnNewAct",
          a.fileName,
          a.parameters,
          c,
          e,
          b
        );
      }
    }
  }
}
function WNMoveToHtmlPage(c, f, b, d, a) {
  if (WNCheckFunc("onHidePage")) {
    onHidePage();
  }
  if (arguments.length === 4 && c.indexOf("?") !== -1) {
    var e = c.split("?");
    a = d;
    d = b;
    b = f;
    c = e[0];
    f = e[1];
  }
  if (wnIf.device === DT_IOS) {
    IOSNative.callAsynchronous("WNMoveToWebOnNewAct", c, f, b, d, a);
  } else {
    if (wnIf.device === DT_ANDROID) {
      Native.wnRequestMoveToWebOnActivity(c, encodeURIComponent(f), b, d, a);
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute("wnMoveToWebOnNewAct", c, f, b, d, a);
      }
    }
  }
}
function WNMoveToNativeAct(c, e, b, d, a) {
  if (!e) {
    e = "";
  }
  if (WNCheckFunc("onHidePage")) {
    onHidePage();
  }
  if (wnIf.device === DT_IOS) {
    IOSNative.callAsynchronous("WNMoveToNativeAct", c, e, b, d, a);
  } else {
    if (wnIf.device === DT_ANDROID) {
      Native.wnRequestMoveToNativeActivity(c, e, b, d, a);
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute("wnMoveToNativeAct", c, e, b, d, a);
      }
    }
  }
}
function WNMoveToNativePage(c, e, b, d, a) {
  return WNMoveToNativeAct(c, e, b, d, a);
}
function WNHistoryBack(b, a) {
  if (WNCheckFunc("onHidePage")) {
    onHidePage();
  }
  if (wnIf.device === DT_IOS) {
    IOSNative.callAsynchronous("WNHistoryBack", b, a);
  } else {
    if (wnIf.device === DT_ANDROID) {
      Native.wnActionHistoryBack(b, a);
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute("wnHistoryBack", b, a);
      }
    }
  }
}
function WNBackPage(b, a) {
  return WNHistoryBack(b, a);
}
function WNDirectCall(a) {
  if (wnIf.device === DT_IOS) {
    IOSNative.callAsynchronous("WNDirectCall", a);
  } else {
    if (wnIf.device === DT_ANDROID) {
      Native.wnDirectTel(a);
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute("wnDirectCall", a);
      }
    }
  }
}
function WNMakeCall(a) {
  return WNDirectCall(a);
}
function WNRequestDatePicker(c, f, d, e, g, a) {
  var b = "";
  var i = "";
  if (f === "HM12") {
    if (d.length !== 6) {
      WNLog("WNInterface JS Error", "init date format Error");
      return;
    } else {
      if (d.substring(4, 6) !== "AM" && d.substring(4, 6) !== "PM") {
        WNLog("WNInterface JS Error", "init date format Error");
        return;
      }
    }
  } else {
    if (f === "HM24") {
      if (d.length !== 4) {
        WNLog("WNInterface JS Error", "init date format Error");
        return;
      }
    } else {
      if (
        f === "YMD" ||
        f === "DMY" ||
        f === "YM" ||
        f === "MMYYYY" ||
        f === "YYYY" ||
        f === "MM" ||
        f === "DD"
      ) {
        var h = 4;
        if (f === "YMD" || f === "DMY") {
          h = 8;
        } else {
          if (f === "MMYYYY" || f === "YM") {
            h = 6;
          } else {
            if (f === "MM" || f === "DD") {
              h = 2;
            }
          }
        }
        if (d.length !== h) {
          WNLog("WNInterface JS Error", "init date format Error");
          return;
        }
        if (e !== undefined) {
          if (e.length !== 0 && e.length !== h) {
            WNLog("WNInterface JS Error", "init date format Error");
            return;
          }
          b = e;
        }
        if (g !== undefined) {
          if (g.length !== 0 && g.length !== h) {
            WNLog("WNInterface JS Error", "max date format Error");
            return;
          }
          i = g;
        }
      } else {
        WNLog("WNInterface JS Error", "type constant Error");
        return;
      }
    }
  }
  if (wnIf.device === DT_IOS) {
    IOSNative.callAsynchronous("WNRequestDatePicker", c, f, d, b, i, a);
  } else {
    if (wnIf.device === DT_ANDROID) {
      WN2CommonAsync(
        "wnRequestDatePicker",
        checkCallBackParam(c),
        f,
        d,
        b,
        i,
        a
      );
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute("wnRequestDatePicker", c, f, d, b, i, a);
      }
    }
  }
}
function WNPopupDatePicker(a, e, f, c, b, d) {
  return WNRequestDatePicker(a, e, f, c, b, d);
}
function WNResponseDatePicker(callBackFuncName, value) {
  try {
    if (wnIf.device === DT_IOS) {
      eval(callBackFuncName)(JSON.parse(value));
    } else {
      if (wnIf.device === DT_ANDROID) {
        eval(callBackFuncName)(JSON.parse(value));
      } else {
        if (wnIf.device === DT_ANDROID) {
          eval(callBackFuncName)(JSON.parse(value));
        }
      }
    }
  } catch (e) {
    WNLog("WNInterface JS Error", "" + e);
  }
}
function WNTakePhoto(f, c, a, b) {
  var d = a === undefined || a === null ? "" : a;
  var e = b === true ? "YES" : "NO";
  if (wnIf.device === DT_IOS) {
    IOSNative.callAsynchronous("WNTakePhoto", f, c, d, e);
  } else {
    if (wnIf.device === DT_ANDROID) {
      WN2CommonAsync("wnTakePhoto", f, checkCallBackParam(c), d, e);
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute("wnTakePhoto", f, c, d, e);
      }
    }
  }
}
function WNMoveToTakePhoto(d, c, a, b) {
  return WNTakePhoto(d, c, a, b);
}
function WNResponseTakePhoto(callBackFunc, resultCode, resultValue) {
  if (wnIf.device === DT_IOS) {
    eval(callBackFunc)(resultCode, JSON.parse(resultValue));
  } else {
    if (wnIf.device === DT_ANDROID) {
      eval(callBackFunc)(resultCode, JSON.parse(resultValue));
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        eval(callBackFunc)(resultCode, JSON.parse(resultValue));
      }
    }
  }
}
function WNTakeMovie(f, c, a, b) {
  var d = a === undefined || a === null ? "" : a;
  var e = b === true ? "YES" : "NO";
  if (wnIf.device === DT_IOS) {
    IOSNative.callAsynchronous("WNTakeMovie", f, c, d, e);
  } else {
    if (wnIf.device === DT_ANDROID) {
      WN2CommonAsync("wnTakeMovie", f, checkCallBackParam(c), d, e);
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute("wnTakeMovie", f, c, d, e);
      }
    }
  }
}
function WNMoveToTakeMovie(d, c, a, b) {
  return WNTakeMovie(d, c, a, b);
}
function WNResponseTakeMovie(callBackFunc, resultCode, resultValue) {
  if (wnIf.device === DT_IOS) {
    eval(callBackFunc)(resultCode, JSON.parse(resultValue));
  } else {
    if (wnIf.device === DT_ANDROID) {
      eval(callBackFunc)(resultCode, JSON.parse(resultValue));
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        eval(callBackFunc)(resultCode, JSON.parse(resultValue));
      }
    }
  }
}
function WNGetCommonMediaFiles(b, a, c) {
  if (wnIf.device === DT_IOS) {
    IOSNative.callAsynchronous("WNGetCommonMediaFiles", b, a, c);
  } else {
    if (wnIf.device === DT_ANDROID) {
      WN2CommonAsync("wnGetCommonMediaFiles", b, a, checkCallBackParam(c));
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute("wnGetCommonMediaFiles", b, a, c);
      }
    }
  }
}
function WNResponseGetCommonMediaFiles(callBackFunc, resultCode, resultValue) {
  if (wnIf.device === DT_IOS) {
    eval(callBackFunc)(resultCode, JSON.parse(resultValue));
  } else {
    if (wnIf.device === DT_ANDROID) {
      eval(callBackFunc)(resultCode, JSON.parse(resultValue));
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        eval(callBackFunc)(resultCode, JSON.parse(resultValue));
      }
    }
  }
}
function WNShowVideo(a, b) {
  if (wnIf.device === DT_IOS) {
    IOSNative.callAsynchronous("WNShowVideo", a, b);
  } else {
    if (wnIf.device === DT_ANDROID) {
      WN2CommonAsync("wnShowVideo", a, b);
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute("wnShowVideo", a, b);
      }
    }
  }
}
function WNMoveToShowVideo(a, b) {
  return WNShowVideo(a, b);
}
function WNTakeVoice(d, b, a) {
  var c;
  if (a === undefined || a === null) {
    c = "";
  } else {
    c = a;
  }
  if (wnIf.device === DT_IOS) {
    IOSNative.callAsynchronous("WNTakeVoice", d, b, c);
  } else {
    if (wnIf.device === DT_ANDROID) {
      WN2CommonAsync("wnTakeVoice", d, b, c);
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute("wnTakeVoice", d, b, c);
      }
    }
  }
}
function WNMoveToTakeVoice(c, b, a) {
  return WNTakeVoice(c, b, a);
}
function WNRequestInitProgram(a) {
  if (wnIf.device === DT_IOS) {
    IOSNative.callAsynchronous("WNRequestInitProgram", a);
  } else {
    if (wnIf.device === DT_ANDROID) {
      Native.wnRequestInitProgram(a);
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute("wnRequestInitProgram", a);
      }
    }
  }
}
function WNHttpFileUpload(b, i, d, g, c, h, a) {
  var j;
  var f = "UTF-8";
  if (a === undefined || a === null) {
    f = "UTF-8";
  } else {
    var e = a.toUpperCase();
    if (e !== "UTF-8" && e !== "EUC-KR") {
      f = "UTF-8";
    } else {
      f = e;
    }
  }
  if (h === undefined || h === null) {
    j = "";
  } else {
    j = h;
  }
  if (wnIf.device === DT_IOS) {
    IOSNative.callAsynchronous(
      "WNRequestHttpFileTrans",
      b,
      i,
      JSON.stringify(d),
      g ? "TRUE" : "FALSE",
      c ? "TRUE" : "FALSE",
      j,
      f
    );
  } else {
    if (wnIf.device === DT_ANDROID) {
      WN2CommonAsync(
        "wnRequestHttpFileTrans",
        b,
        j,
        i,
        JSON.stringify(d),
        g ? "TRUE" : "FALSE",
        c ? "TRUE" : "FALSE",
        f
      );
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute(
          "wnRequestHttpFileTrans",
          b,
          i,
          JSON.stringify(d),
          g ? "TRUE" : "FALSE",
          c ? "TRUE" : "FALSE",
          j,
          f
        );
      }
    }
  }
}
function WNFtpFileUpload(a, b, c) {
  if (wnIf.device === DT_IOS) {
    IOSNative.callAsynchronous(
      "WNFtpFileUpload",
      JSON.stringify(a),
      JSON.stringify(b),
      c ? "TRUE" : "FALSE"
    );
  } else {
    if (wnIf.device === DT_ANDROID) {
      WN2CommonAsync(
        "wnRequestFtpFileTrans",
        JSON.stringify(a),
        JSON.stringify(b),
        c ? "TRUE" : "FALSE"
      );
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute(
          "wnFtpFileUpload",
          JSON.stringify(a),
          JSON.stringify(b),
          c ? "TRUE" : "FALSE"
        );
      }
    }
  }
}
function WNShowInstanceMessage(b, a) {
  if (wnIf.device === DT_IOS) {
    IOSNative.callAsynchronous("WNShowInstanceMessage", b, a);
  } else {
    if (wnIf.device === DT_ANDROID) {
      WN2CommonAsync("wnShowInstanceMessage", b, a);
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute("wnShowInstanceMessage", b, a);
      }
    }
  }
}
function WNInternalWebBrowserCall(a, b) {
  if (wnIf.device === DT_IOS) {
    if (b === undefined || b === null) {
      IOSNative.callAsynchronous("WNInternalWebBrowserCall", a, "UTF-8");
    } else {
      IOSNative.callAsynchronous("WNInternalWebBrowserCall", a, b);
    }
  } else {
    if (wnIf.device === DT_ANDROID) {
      if (b === undefined || b === null) {
        WN2CommonAsync("wnInternalWebBrowserCall", a, "UTF-8");
      } else {
        WN2CommonAsync("wnInternalWebBrowserCall", a, b);
      }
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute("wnInternalWebBrowserCall", a, b || "UTF-8");
      }
    }
  }
}
function WNOpenWebBrowser(a, b) {
  return WNInternalWebBrowserCall(a, b);
}
function WNConfirmPopup(h, d, g, a) {
  try {
    for (var b = 0; b < g.buttonInfo.length; b++) {
      if (typeof g.buttonInfo[b].cbFuncName === "function") {
        g.buttonInfo[b].cbFuncName = g.buttonInfo[b].cbFuncName.toString();
      }
    }
  } catch (f) {}
  var c = a === true ? "Y" : "N";
  if (wnIf.device === DT_IOS) {
    IOSNative.callAsynchronous("WNConfirmPopup", h, d, JSON.stringify(g), c);
  } else {
    if (wnIf.device === DT_ANDROID) {
      WN2CommonAsync("wnConfirmPopup", h, d, JSON.stringify(g), c);
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute("wnConfirmPopup", h, d, JSON.stringify(g), c);
      }
    }
  }
}
function WNPopupConfirm(d, b, c, a) {
  return WNConfirmPopup(d, b, c, a);
}
function WNNormalChoiceListPopup(e, d, a, b) {
  var c = b === true ? "Y" : "N";
  if (wnIf.device === DT_IOS) {
    IOSNative.callAsynchronous(
      "WNNormalChoiceListPopup",
      e,
      JSON.stringify(d),
      a,
      c
    );
  } else {
    if (wnIf.device === DT_ANDROID) {
      WN2CommonAsync(
        "wnNormalListPopup",
        e,
        JSON.stringify(d),
        checkCallBackParam(a),
        c
      );
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute(
          "wnNormalChoiceListPopup",
          e,
          JSON.stringify(d),
          a,
          c
        );
      }
    }
  }
}
function WNPopupNormalChoice(d, c, a, b) {
  return WNNormalChoiceListPopup(d, c, a, b);
}
function WNCBNormalChoiceListPopup(jsonSelectedListInfo, callBackFuncName) {
  try {
    if (wnIf.device === DT_IOS) {
      eval(callBackFuncName)(JSON.parse(jsonSelectedListInfo));
    } else {
      if (wnIf.device === DT_ANDROID) {
        eval(callBackFuncName)(JSON.parse(jsonSelectedListInfo));
      } else {
        if (wnIf.device === DT_VIRTUAL) {
          eval(callBackFuncName)(JSON.parse(jsonSelectedListInfo));
        }
      }
    }
  } catch (e) {
    WNLog("WNInterface JS Error", "" + e);
  }
}
function WNSingleChoicePopup(h, g, d, a) {
  try {
    for (var b = 0; b < d.buttonInfo.length; b++) {
      if (typeof d.buttonInfo[b].cbFuncName === "function") {
        d.buttonInfo[b].cbFuncName = d.buttonInfo[b].cbFuncName.toString();
      }
    }
  } catch (f) {}
  var c = a === true ? "Y" : "N";
  if (wnIf.device === DT_IOS) {
    IOSNative.callAsynchronous(
      "WNSingleChoicePopup",
      h,
      JSON.stringify(g),
      JSON.stringify(d),
      c
    );
  } else {
    if (wnIf.device === DT_ANDROID) {
      WN2CommonAsync(
        "wnSingleChoiceListPopup",
        h,
        JSON.stringify(g),
        JSON.stringify(d),
        c
      );
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute(
          "wnSingleChoiceListPopup",
          h,
          JSON.stringify(g),
          JSON.stringify(d),
          c
        );
      }
    }
  }
}
function WNPopupSingleChoice(d, c, b, a) {
  return WNSingleChoicePopup(d, c, b, a);
}
function WNCBSingleChoicePopup(jsonSelectedListInfo, callBackFuncName) {
  try {
    if (wnIf.device === DT_IOS) {
      eval(callBackFuncName)(JSON.parse(jsonSelectedListInfo));
    } else {
      if (wnIf.device === DT_ANDROID) {
        eval(callBackFuncName)(JSON.parse(jsonSelectedListInfo));
      } else {
        if (wnIf.device === DT_VIRTUAL) {
          eval(callBackFuncName)(JSON.parse(jsonSelectedListInfo));
        }
      }
    }
  } catch (e) {
    WNLog("WNInterface JS Error", "" + e);
  }
}
function WNMultiChoicePopup(h, g, d, a) {
  try {
    for (var b = 0; b < d.buttonInfo.length; b++) {
      if (typeof d.buttonInfo[b].cbFuncName === "function") {
        d.buttonInfo[b].cbFuncName = d.buttonInfo[b].cbFuncName.toString();
      }
    }
  } catch (f) {}
  var c = a === true ? "Y" : "N";
  if (wnIf.device === DT_IOS) {
    IOSNative.callAsynchronous(
      "WNMultiChoicePopup",
      h,
      JSON.stringify(g),
      JSON.stringify(d),
      c
    );
  } else {
    if (wnIf.device === DT_ANDROID) {
      WN2CommonAsync(
        "wnMultiChoiceListPopup",
        h,
        JSON.stringify(g),
        JSON.stringify(d),
        c
      );
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute(
          "wnMultiChoiceListPopup",
          h,
          JSON.stringify(g),
          JSON.stringify(d),
          c
        );
      }
    }
  }
}
function WNPopupMultiChoice(d, c, b, a) {
  return WNMultiChoicePopup(d, c, b, a);
}
function WNCBMultiChoicePopup(jsonSelectedListInfo, callBackFuncName) {
  try {
    if (wnIf.device === DT_IOS) {
      eval(callBackFuncName)(JSON.parse(jsonSelectedListInfo));
    } else {
      if (wnIf.device === DT_ANDROID) {
        eval(callBackFuncName)(JSON.parse(jsonSelectedListInfo));
      } else {
        if (wnIf.device === DT_VIRTUAL) {
          eval(callBackFuncName)(JSON.parse(jsonSelectedListInfo));
        }
      }
    }
  } catch (e) {
    WNLog("WNInterface JS Error", "" + e);
  }
}
function WNGetMediaFilesInfo(b, c, e, a) {
  var d = a === true ? "YES" : "NO";
  if (wnIf.device === DT_IOS) {
    IOSNative.callAsynchronous("WNGetMediaFilesInfo", b, c, e);
  } else {
    if (wnIf.device === DT_ANDROID) {
      WN2CommonAsync("wnGetMediaFilesInfo", b, c, checkCallBackParam(e), d);
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute("wnGetMediaFilesInfo", b, c, e, d);
      }
    }
  }
}
function WNCBGetMediaFilesInfo(callFunction, resultCode, resultValue) {
  try {
    if (wnIf.device === DT_IOS) {
      eval(callFunction)(resultCode, JSON.parse(resultValue));
    } else {
      if (wnIf.device === DT_ANDROID) {
        eval(callFunction)(resultCode, JSON.parse(resultValue));
      } else {
        if (wnIf.device === DT_VIRTUAL) {
          eval(callFunction)(resultCode, JSON.parse(resultValue));
        }
      }
    }
  } catch (e) {
    WNLog("WNInterface JS Error", "" + e);
  }
}
function WNGetMediaFolderInfo(b, c, e, a) {
  var d = a === true ? "YES" : "NO";
  if (wnIf.device === DT_IOS) {
    IOSNative.callAsynchronous("WNGetMediaFolderInfo", b, c, e);
  } else {
    if (wnIf.device === DT_ANDROID) {
      WN2CommonAsync("wnGetMediaFolderInfo", b, c, checkCallBackParam(e), d);
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute("wnGetMediaFolderInfo", b, c, e, d);
      }
    }
  }
}
function WNCBGetMediaFolderInfo(callFunction, resultValue) {
  try {
    if (wnIf.device === DT_IOS) {
      eval(callFunction)(JSON.parse(resultValue));
    } else {
      if (wnIf.device === DT_ANDROID) {
        eval(callFunction)(JSON.parse(resultValue));
      } else {
        if (wnIf.device === DT_VIRTUAL) {
          eval(callFunction)(resultCode, JSON.parse(resultValue));
        }
      }
    }
  } catch (e) {
    WNLog("WNInterface JS Error", "" + e);
  }
}
function WNRemoveMediaFiles(b, c, e, a) {
  var d = a === true ? "YES" : "NO";
  if (wnIf.device === DT_IOS) {
    IOSNative.callAsynchronous("WNRemoveMediaFiles", JSON.stringify(b), c, e);
  } else {
    if (wnIf.device === DT_ANDROID) {
      WN2CommonAsync(
        "wnRemoveMediaFilesInfo",
        JSON.stringify(b),
        c,
        checkCallBackParam(e),
        d
      );
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute(
          "wnRemoveMediaFilesInfo",
          JSON.stringify(b),
          c,
          e,
          d
        );
      }
    }
  }
}
function WNCBRemoveMediaFiles(callFunction, resultCode) {
  try {
    if (wnIf.device === DT_IOS) {
      eval(callFunction)(resultCode);
    } else {
      if (wnIf.device === DT_ANDROID) {
        eval(callFunction)(resultCode);
      } else {
        if (wnIf.device === DT_VIRTUAL) {
          eval(callFunction)(resultCode);
        }
      }
    }
  } catch (e) {
    WNLog("WNInterface JS Error", "" + e);
  }
}
function WNMailTo(a, b, c) {
  if (wnIf.device === DT_IOS) {
    IOSNative.callAsynchronous("WNMailTo", JSON.stringify(a), b, c);
  } else {
    if (wnIf.device === DT_ANDROID) {
      Native.wnMailTo(JSON.stringify(a), b, c);
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute("wnMailTo", JSON.stringify(a), b, c);
      }
    }
  }
}
function WNSendMail(a, b, c) {
  return WNMailTo(a, b, c);
}
function WNMoveToSendMail(a, b, c) {
  return WNMailTo(a, b, c);
}
function WNConnetToMap(a) {
  if (wnIf.device === DT_IOS) {
    IOSNative.callAsynchronous("WNConnetToMap", a);
  } else {
    if (wnIf.device === DT_ANDROID) {
      Native.wnConnetToMap(a);
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute("wnConnetToMap", a);
      }
    }
  }
}
function WNSendSms(a, b) {
  if (wnIf.device === DT_IOS) {
    IOSNative.callAsynchronous("WNSendSms", JSON.stringify(a), b);
  } else {
    if (wnIf.device === DT_ANDROID) {
      Native.wnSendSms(JSON.stringify(a), b);
    } else {
      VirtualInterface.execute("wnSendSms", JSON.stringify(a), b);
    }
  }
}
function WNMoveToSendSms(a, b) {
  return WNSendSms(a, b);
}
function WNConnetToAppStore(a) {
  if (wnIf.device === DT_IOS) {
    IOSNative.callAsynchronous("WNConnetToAppStore", a);
  } else {
    if (wnIf.device === DT_ANDROID) {
      Native.wnConnetToAppStore(a);
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute("wnConnetToAppStore", a);
      }
    }
  }
}
function WNOpenAppStore(a) {
  return WNConnetToAppStore(a);
}
function WNMoveToOpenAppStore(a) {
  return WNConnetToAppStore(a);
}
function WNExcuteOtherApp(a, b) {
  if (b === undefined || b === null) {
    b = "";
  }
  if (wnIf.device === DT_IOS) {
    return Boolean(IOSNative.callSynchronous("WNExcuteOtherApp", a, b));
  } else {
    if (wnIf.device === DT_ANDROID) {
      return Boolean(Native.wnExcuteOtherApp(a, b));
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        return Boolean(VirtualInterface.execute("wnExcuteOtherApp", a, b));
      }
    }
  }
}
function WNOpenOtherApp(a, b) {
  return WNExcuteOtherApp(a, b);
}
function WNMoveToOpenOtherApp(a, b) {
  return WNExcuteOtherApp(a, b);
}
function WNRegisterPushNotification(a) {
  if (wnIf.device === DT_IOS) {
    IOSNative.callAsynchronous("WNRegisterPushNotification");
  } else {
    if (wnIf.device === DT_ANDROID) {
      Native.wnSetPushService(true, a);
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute("wnRegisterPushNotification");
      }
    }
  }
}
function WNUnRegisterPushNotification() {
  if (wnIf.device === DT_IOS) {
    IOSNative.callAsynchronous("WNUnRegisterPushNotification");
  } else {
    if (wnIf.device === DT_ANDROID) {
      Native.wnSetPushService(false);
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute("wnUnRegisterPushNotification");
      }
    }
  }
}
function WNShowKeyboard() {
  if (wnIf.device === DT_IOS) {
    return true;
  } else {
    if (wnIf.device === DT_ANDROID) {
      return Native.wnShowKeyboard() === "Y" ? true : false;
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        return true;
      }
    }
  }
}
function WNAddressBookList(a) {
  if (wnIf.device === DT_IOS) {
    return IOSNative.callSynchronous("WNAddressBookList", a);
  }
}
function WNAddressBookEdit(a, b) {
  if (wnIf.device === DT_IOS) {
    return IOSNative.callSynchronous("WNAddressBookEdit", a, JSON.stringify(b));
  }
}
function WNAddressBookDelete(a) {
  if (wnIf.device === DT_IOS) {
    return IOSNative.callSynchronous("WNAddressBookDelete", a);
  }
}
function WNCheckHacking() {
  if (wnIf.device === DT_IOS) {
    return Boolean(IOSNative.callSynchronous("WNCheckHacking"));
  } else {
    if (wnIf.device === DT_ANDROID) {
      return Boolean(Native.wnRootingCheck("N"));
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        return Boolean(VirtualInterface.execute("wnCheckHacking"));
      }
    }
  }
}
function WNFileIoCreate(a) {
  if (a.name === undefined || a.option === undefined) {
    var b = {};
    b.status = "FILEIO INPUT PARAM ERROR";
    return b;
  }
  if (wnIf.device === DT_IOS) {
    return JSON.parse(
      IOSNative.callSynchronous("WNFileIoCreate", JSON.stringify(a))
    );
  } else {
    if (wnIf.device === DT_ANDROID) {
      return JSON.parse(WN2Common("wnFileIoCreate", JSON.stringify(a)));
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        return JSON.parse(
          VirtualInterface.execute("wnFileIoCreate", JSON.stringify(a))
        );
      }
    }
  }
}
function WNFileIoDelete(a) {
  if (a.name === undefined || a.option === undefined) {
    var b = {};
    b.status = "FILEIO INPUT PARAM ERROR";
    return b;
  }
  if (wnIf.device === DT_IOS) {
    return JSON.parse(
      IOSNative.callSynchronous("WNFileIoDelete", JSON.stringify(a))
    );
  } else {
    if (wnIf.device === DT_ANDROID) {
      return JSON.parse(WN2Common("wnFileIoDelete", JSON.stringify(a)));
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        return JSON.parse(
          VirtualInterface.execute("wnFileIoDelete", JSON.stringify(a))
        );
      }
    }
  }
}
function WNFileIoRead(a) {
  if (a.name === undefined || a.cb_func === undefined) {
    var b = {};
    b.status = "FILEIO INPUT PARAM ERROR";
    return b;
  }
  if (typeof a.cb_func === "function") {
    a.cb_func = a.cb_func.toString();
  }
  if (wnIf.device === DT_IOS) {
    IOSNative.callAsynchronous("WNFileIoReadFile", JSON.stringify(a));
  } else {
    if (wnIf.device === DT_ANDROID) {
      WN2CommonAsync("wnFileIoReadFile", JSON.stringify(a));
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute("wnFileIoReadFile", JSON.stringify(a));
      }
    }
  }
}
function WNFileIoWrite(a) {
  if (a.name === undefined || a.encode === undefined || a.data === undefined) {
    var b = {};
    b.status = "FILEIO INPUT PARAM ERROR";
    return b;
  }
  if (wnIf.device === DT_IOS) {
    return JSON.parse(
      IOSNative.callSynchronous("WNFileIoWriteFile", JSON.stringify(a))
    );
  } else {
    if (wnIf.device === DT_ANDROID) {
      return JSON.parse(WN2Common("wnFileIoWriteFile", JSON.stringify(a)));
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        return JSON.parse(
          VirtualInterface.execute("wnFileIoWriteFile", JSON.stringify(a))
        );
      }
    }
  }
}
function WNFileIoCopy(a) {
  if (
    a.source === undefined ||
    a.destination === undefined ||
    a.overwrite === undefined ||
    a.option === undefined
  ) {
    var b = {};
    b.status = "FILEIO INPUT PARAM ERROR";
    return b;
  }
  if (wnIf.device === DT_IOS) {
    return JSON.parse(
      IOSNative.callSynchronous("WNFileIoCopy", JSON.stringify(a))
    );
  } else {
    if (wnIf.device === DT_ANDROID) {
      return JSON.parse(WN2Common("wnFileIoCopy", JSON.stringify(a)));
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        return JSON.parse(
          VirtualInterface.execute("wnFileIoCopy", JSON.stringify(a))
        );
      }
    }
  }
}
function WNFileIoMove(a) {
  if (
    a.source === undefined ||
    a.destination === undefined ||
    a.overwrite === undefined ||
    a.option === undefined
  ) {
    var b = {};
    b.status = "FILEIO INPUT PARAM ERROR";
    return b;
  }
  if (wnIf.device === DT_IOS) {
    return JSON.parse(
      IOSNative.callSynchronous("WNFileIoMove", JSON.stringify(a))
    );
  } else {
    if (wnIf.device === DT_ANDROID) {
      return JSON.parse(WN2Common("wnFileIoMove", JSON.stringify(a)));
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        return JSON.parse(
          VirtualInterface.execute("wnFileIoMove", JSON.stringify(a))
        );
      }
    }
  }
}
function WNFileIoInfo(a) {
  if (a.name === undefined || a.option === undefined) {
    var b = {};
    b.status = "FILEIO INPUT PARAM ERROR";
    return b;
  }
  if (wnIf.device === DT_IOS) {
    return JSON.parse(
      IOSNative.callSynchronous("WNFileIoInfo", JSON.stringify(a))
    );
  } else {
    if (wnIf.device === DT_ANDROID) {
      return JSON.parse(WN2Common("wnFileIoInfo", JSON.stringify(a)));
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        return JSON.parse(
          VirtualInterface.execute("wnFileIoInfo", JSON.stringify(a))
        );
      }
    }
  }
}
function WNFileIoList(a) {
  if (a.name === undefined || a.option === undefined) {
    var b = {};
    b.status = "FILEIO INPUT PARAM ERROR";
    return b;
  }
  if (wnIf.device === DT_IOS) {
    return JSON.parse(
      IOSNative.callSynchronous("WNFileIoList", JSON.stringify(a))
    );
  } else {
    if (wnIf.device === DT_ANDROID) {
      return JSON.parse(WN2Common("wnFileIoList", JSON.stringify(a)));
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        return JSON.parse(
          VirtualInterface.execute("wnFileIoList", JSON.stringify(a))
        );
      }
    }
  }
}
function WNCBFileIo(callFunction, jsonObj, resultString) {
  try {
    if (wnIf.device === DT_IOS) {
      eval(callFunction)(JSON.parse(jsonObj));
    } else {
      if (wnIf.device === DT_ANDROID) {
        var inJson = JSON.parse(jsonObj);
        var outJson = {};
        outJson.status = inJson.status;
        outJson.length = inJson.length;
        outJson.name = inJson.name;
        outJson.encode = inJson.encode;
        outJson.data = resultString;
        eval(callFunction)(outJson);
      } else {
        if (wnIf.device === DT_VIRTUAL) {
          eval(callFunction)(JSON.parse(jsonObj));
        }
      }
    }
  } catch (e) {
    WNLog("WNInterface JS Error", "" + e);
  }
}
function WNLocalDbCreate(db_name, cb_func) {
  var return_value;
  if (wnIf.device === DT_IOS) {
    return_value = JSON.parse(
      IOSNative.callSynchronous("WNLocalDbCreate", db_name)
    );
  } else {
    if (wnIf.device === DT_ANDROID) {
      return_value = JSON.parse(WN2Common("wnLocalDbCreate", db_name));
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        return_value = JSON.parse(
          VirtualInterface.execute("wnLocalDbCreate", db_name)
        );
      }
    }
  }
  return_value.db_name = db_name;
  if (cb_func === undefined || cb_func === null) {
    return return_value;
  } else {
    eval(cb_func)(return_value);
  }
}
function WNLocalDbDelete(db_name, cb_func) {
  var return_value;
  if (wnIf.device === DT_IOS) {
    return_value = JSON.parse(
      IOSNative.callSynchronous("WNLocalDbDelete", db_name)
    );
  } else {
    if (wnIf.device === DT_ANDROID) {
      return_value = JSON.parse(WN2Common("wnLocalDbDelete", db_name));
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        return_value = JSON.parse(
          VirtualInterface.execute("wnLocalDbDelete", db_name)
        );
      }
    }
  }
  return_value.db_name = db_name;
  if (cb_func === undefined || cb_func === null) {
    return return_value;
  } else {
    eval(cb_func)(return_value);
  }
}
function WNLocalDbOpen(db_name, cb_func) {
  var return_value;
  if (wnIf.device === DT_IOS) {
    return_value = JSON.parse(
      IOSNative.callSynchronous("WNLocalDbOpen", db_name)
    );
  } else {
    if (wnIf.device === DT_ANDROID) {
      return_value = JSON.parse(WN2Common("wnLocalDbOpen", db_name));
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        return_value = JSON.parse(
          VirtualInterface.execute("wnLocalDbOpen", db_name)
        );
      }
    }
  }
  return_value.db_name = db_name;
  if (cb_func === undefined || cb_func === null) {
    return return_value;
  } else {
    eval(cb_func)(return_value);
  }
}
function WNLocalDbClose(db_name, cb_func) {
  var return_value;
  if (wnIf.device === DT_IOS) {
    return_value = JSON.parse(
      IOSNative.callSynchronous("WNLocalDbClose", db_name)
    );
  } else {
    if (wnIf.device === DT_ANDROID) {
      return_value = JSON.parse(WN2Common("wnLocalDbClose", db_name));
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        return_value = JSON.parse(
          VirtualInterface.execute("wnLocalDbClose", db_name)
        );
      }
    }
  }
  return_value.db_name = db_name;
  if (cb_func === undefined || cb_func === null) {
    return return_value;
  } else {
    eval(cb_func)(return_value);
  }
}
function WNLocalDbExecuteSql(input_data, cb_func) {
  var return_value;
  if (input_data.db_name === undefined || input_data.sql === undefined) {
    var return_obj = {};
    return_obj.db_name = input_data.db_name;
    return_obj.status = "LOCAL DB INPUT PARAM ERROR";
    if (cb_func === undefined || cb_func === null) {
      return return_obj;
    } else {
      eval(cb_func)(return_obj);
      return;
    }
  }
  if (wnIf.device === DT_IOS) {
    return_value = JSON.parse(
      IOSNative.callSynchronous(
        "WNLocalDbExecuteSql",
        JSON.stringify(input_data)
      )
    );
  } else {
    if (wnIf.device === DT_ANDROID) {
      return_value = JSON.parse(
        WN2Common("wnLocalDbExecuteSql", JSON.stringify(input_data))
      );
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        return_value = JSON.parse(
          VirtualInterface.execute(
            "wnLocalDbExecuteSql",
            JSON.stringify(input_data)
          )
        );
      }
    }
  }
  return_value.db_name = input_data.db_name;
  if (cb_func === undefined || cb_func === null) {
    return return_value;
  } else {
    eval(cb_func)(return_value);
  }
}
function WNUpdateResourceFiles(c, e, d) {
  var b = "NO";
  if (d === undefined || d === null) {
    b = "NO";
  } else {
    var a = d.toUpperCase();
    if (a === "YES" || a === "TRUE" || d === true) {
      b = "YES";
    } else {
      b = "NO";
    }
  }
  if (wnIf.device === DT_IOS) {
    IOSNative.callAsynchronous("WNUpdateResourceFiles", c, e, b);
  } else {
    if (wnIf.device === DT_ANDROID) {
      WN2CommonAsync("wnRequestAppUpdating", c, e);
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute("wnUpdateResourceFiles", c, e, b);
      }
    }
  }
}
function WNHttpUpdateResources(a, c, b) {
  return WNUpdateResourceFiles(a, c, b);
}
var mpRecursiveJsImportMap = {};
function mpRecursiveJsGet(a) {
  return mpRecursiveJsImportMap[a];
}
function mpRecursiveJsPut(b, a) {
  mpRecursiveJsImportMap[b] = a;
}
function WNImportEncryptedJS(b) {
  var a = mpRecursiveJsGet(b);
  if (a === undefined || a === null) {
    mpRecursiveJsPut(b, "Y");
    if (wnIf.device === DT_IOS) {
      script_str = IOSNative.callSynchronous("WNImportEncryptedJS", b);
    } else {
      if (wnIf.device === DT_ANDROID) {
        script_str = Native.wnImportEncryptedJS(b);
      } else {
        if (wnIf.device === DT_VIRTUAL) {
          script_str = VirtualInterface.execute("wnImportEncryptedJS", b);
        }
      }
    }
    if (script_str.length <= 0) {
      return false;
    }
    document.write("<script defer type=text/javascript>");
    document.write(script_str);
    document.write("</script>");
  }
  return true;
}
function WNGetEncryptedFileString(a) {
  if (wnIf.device === DT_IOS) {
    return IOSNative.callSynchronous("WNGetEncryptedFileString", a);
  } else {
    if (wnIf.device === DT_ANDROID) {
      return Native.wnGetEncryptedFileString(a);
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        return VirtualInterface.execute("wnGetEncryptedFileString", a);
      }
    }
  }
}
function WNGetEncryptedFile(a) {
  return WNGetEncryptedFileString(a);
}
function WNFtpFileDownload(a, b, c) {
  if (wnIf.device === DT_IOS) {
    IOSNative.callAsynchronous(
      "WNFtpFileDownload",
      JSON.stringify(a),
      JSON.stringify(b),
      c ? "TRUE" : "FALSE"
    );
  } else {
    if (wnIf.device === DT_ANDROID) {
      WN2CommonAsync(
        "wnRequestFtpFileDownload",
        JSON.stringify(a),
        JSON.stringify(b),
        c ? "TRUE" : "FALSE"
      );
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute(
          "wnFtpFileDownload",
          JSON.stringify(a),
          JSON.stringify(b),
          c ? "TRUE" : "FALSE"
        );
      }
    }
  }
}
function WNFtpListDownload(a, b, c) {
  if (wnIf.device === DT_IOS) {
    IOSNative.callAsynchronous(
      "WNFtpListDownload",
      JSON.stringify(a),
      JSON.stringify(b),
      c ? "TRUE" : "FALSE"
    );
  } else {
    if (wnIf.device === DT_ANDROID) {
      WN2CommonAsync(
        "wnRequestFtpFileDownloadListinfo",
        JSON.stringify(a),
        JSON.stringify(b),
        c ? "TRUE" : "FALSE"
      );
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute(
          "wnFtpListDownload",
          JSON.stringify(a),
          JSON.stringify(b),
          c ? "TRUE" : "FALSE"
        );
      }
    }
  }
}
function WNMemoryInfo() {
  if (wnIf.device === DT_IOS) {
    return JSON.parse(IOSNative.callSynchronous("WNMemoryInfo"));
  } else {
    if (wnIf.device === DT_ANDROID) {
      return JSON.parse(Native.wnMemoryInfo());
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        return JSON.parse(VirtualInterface.execute("wnMemoryInfo"));
      }
    }
  }
}
function WNGetMemoryInfo() {
  return WNMemoryInfo();
}
function WNMorpheusInfo() {
  if (wnIf.device === DT_IOS) {
    return JSON.parse(IOSNative.callSynchronous("WNMorpheusInfo"));
  } else {
    if (wnIf.device === DT_ANDROID) {
      return JSON.parse(Native.wnMorpheusInfo());
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        return JSON.parse(VirtualInterface.execute("wnMorpheusInfo"));
      }
    }
  }
}
function WNGetMorpheusInfo() {
  return WNMorpheusInfo();
}
function WNGetAppInfo() {
  return WNMorpheusInfo();
}
function WNgetNativeparameter() {
  if (wnIf.device === DT_IOS) {
    return "";
  } else {
    if (wnIf.device === DT_ANDROID) {
      return Native.wnGetNativeparameter();
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        return VirtualInterface.execute("wnGetNativeparameter");
      }
    }
  }
}
function WNGetFlashState() {
  if (wnIf.device === DT_IOS) {
    return IOSNative.callSynchronous("WNGetFlashState");
  } else {
    if (wnIf.device === DT_ANDROID) {
      return Native.wnGetFlashState();
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        return VirtualInterface.execute("wnGetFlashState");
      }
    }
  }
}
function WNControlFlash(a) {
  if (wnIf.device === DT_IOS) {
    return IOSNative.callSynchronous("WNControlFlash", a);
  } else {
    if (wnIf.device === DT_ANDROID) {
      return Native.wnControlFlash(a);
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        return VirtualInterface.execute("wnControlFlash");
      }
    }
  }
}
function WNTakeQRCode(b, c) {
  var a = {};
  if (c === undefined) {
    a.cancel = "이전";
    a.custom = "";
    a.customHtml = "";
    a.flashOn = "Flash ON";
    a.flashOff = "Flash OFF";
    a.menuAnimation = "OFF";
  } else {
    a = c;
  }
  if (wnIf.device === DT_IOS) {
    return IOSNative.callSynchronous("ExWNTakeQRCode", b, JSON.stringify(a));
  } else {
    if (wnIf.device === DT_ANDROID) {
      return WN2Common(
        "wnTakeQRCode",
        checkCallBackParam(b),
        JSON.stringify(a)
      );
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        return VirtualInterface.execute(
          "wnTakeQRCode",
          checkCallBackParam(b),
          JSON.stringify(a)
        );
      }
    }
  }
}
function WNMoveToTakeQRCode(a, b) {
  return WNTakeQRCode(a, b);
}
function WNCBTakeQRCode(callFunction, resultValue) {
  try {
    if (wnIf.device === DT_IOS) {
      eval(callFunction)(JSON.parse(resultValue));
    } else {
      if (wnIf.device === DT_ANDROID) {
        eval(callFunction)(JSON.parse(resultValue));
      } else {
        if (wnIf.device === DT_VIRTUAL) {
          eval(callFunction)(JSON.parse(resultValue));
        }
      }
    }
  } catch (e) {
    WNLog("WNInterface JS Error", "" + e);
  }
}
function WNZip(b, d, c, h) {
  var f = "default";
  var e = "";
  var a = "true";
  var g = "";
  if (h === null) {
    h = {};
  }
  h.compLevel = h.compLevel ? h.compLevel : f;
  h.password = h.password ? h.password : e;
  h.indicator = h.indicator ? h.indicator : a;
  h.indicatorMsg = h.indicatorMsg ? h.indicatorMsg : g;
  if (wnIf.device === DT_IOS) {
    IOSNative.callAsynchronous(
      "WNZip",
      b,
      JSON.stringify(d),
      c,
      JSON.stringify(h)
    );
    return;
  } else {
    if (wnIf.device === DT_ANDROID) {
      WN2CommonAsync("wnZip", b, JSON.stringify(d), c, JSON.stringify(h));
      return;
    }
  }
}
function WNUnzip(c, a, d, g) {
  var e = "false";
  var f = "";
  var b = "true";
  var h = "";
  if (g === null) {
    g = {};
  }
  g.overwrite = g.overwrite ? g.overwrite : e;
  g.password = g.password ? g.password : f;
  g.indicator = g.indicator ? g.indicator : b;
  g.indicatorMsg = g.indicatorMsg ? g.indicatorMsg : h;
  if (wnIf.device === DT_IOS) {
    IOSNative.callAsynchronous("WNUnzip", c, a, d, JSON.stringify(g));
    return;
  } else {
    if (wnIf.device === DT_ANDROID) {
      WN2CommonAsync("wnUnZip", c, a, d, JSON.stringify(g));
      return;
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute("wnUnZip", c, a, d, JSON.stringify(g));
      }
    }
  }
}
function WNCBZipArchive(cbfunc, result) {
  try {
    if (wnIf.device === DT_IOS) {
      eval(cbfunc)(JSON.parse(result));
    } else {
      if (wnIf.device === DT_ANDROID) {
        eval(cbfunc)(JSON.parse(result));
      } else {
        if (wnIf.device === DT_VIRTUAL) {
          eval(cbfunc)(JSON.parse(result));
        }
      }
    }
  } catch (e) {
    WNLog("WNInterface JS Error", "" + e);
  }
}
function WNGetPageInPStack(a) {
  if (a === undefined || a === null) {
    a = "";
  }
  if (wnIf.device === DT_IOS) {
    return JSON.parse(IOSNative.callSynchronous("WNGetPageInPStack", a));
  } else {
    if (wnIf.device === DT_ANDROID) {
      return JSON.parse(Native.wnGetPageInPStack(a));
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        return JSON.parse(VirtualInterface.execute("wnGetPageInPStack", a));
      }
    }
  }
}
function WNGetPageInTabPStack(a) {
  if (a === undefined || a === null) {
    a = "";
  }
  if (wnIf.device === DT_IOS) {
    return JSON.parse(IOSNative.callSynchronous("WNGetPageInTabPStack", a));
  } else {
    if (wnIf.device === DT_ANDROID) {
      return { status: "NS" };
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        return JSON.parse(VirtualInterface.execute("wnGetPageInTabPStack", a));
      }
    }
  }
}
function WNRemovePageInPStack(a) {
  if (a === undefined || a === null) {
    WNLog("WNInterface JS Error", "type constant Error");
    return;
  }
  if (wnIf.device === DT_IOS) {
    return JSON.parse(IOSNative.callSynchronous("WNRemovePageInPStack", a));
  } else {
    if (wnIf.device === DT_ANDROID) {
      return JSON.parse(Native.wnRemovePageInPStack(a));
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        return JSON.parse(VirtualInterface.execute("wnRemovePageInPStack", a));
      }
    }
  }
}
function WNGetResourcePath(a) {
  if (wnIf.device === DT_IOS) {
    return JSON.parse(IOSNative.callSynchronous("WNGetResourcePath", a));
  } else {
    if (wnIf.device === DT_ANDROID) {
      return JSON.parse(Native.wnGetResourcePath(a));
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        return JSON.parse(VirtualInterface.execute("wnGetResourcePath", a));
      }
    }
  }
}
function WNCheckAppInstalled(a) {
  if (wnIf.device === DT_IOS) {
    return IOSNative.callSynchronous("WNCheckAppInstalled", a);
  } else {
    if (wnIf.device === DT_ANDROID) {
      return Native.wnCheckAppInstalled(a);
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        return VirtualInterface.execute("wnCheckAppInstalled", a);
      }
    }
  }
}
function WNTabMoveToHtmlPage(d, c, b, a) {
  if (WNCheckFunc("onHidePage")) {
    onHidePage();
  }
  if (wnIf.device === DT_IOS) {
    IOSNative.callSynchronous("WNTabMoveToHtmlPage", d, c, b, a);
  } else {
    if (wnIf.device === DT_ANDROID) {
      Native.wnTabMoveToHtmlPage(d, encodeURIComponent(c), b);
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute("wnTabMoveToHtmlPage", d, c, b, a);
      }
    }
  }
}
function WNTabBackPage(b, a) {
  if (WNCheckFunc("onHidePage")) {
    onHidePage();
  }
  if (wnIf.device === DT_IOS) {
    IOSNative.callSynchronous("WNTabBackPage", b, a);
  } else {
    if (wnIf.device === DT_ANDROID) {
      Native.wnTabBackPage(b, a);
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute("wnTabBackPage", b, a);
      }
    }
  }
}
function WNTabCount() {
  if (wnIf.device === DT_IOS) {
    return IOSNative.callSynchronous("WNTabCount");
  } else {
    if (wnIf.device === DT_ANDROID) {
      return Native.wnGetTabPageCount();
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        return VirtualInterface.execute("wnTabCount");
      }
    }
  }
}
function WNTabRemovePage(a) {
  if (wnIf.device === DT_IOS) {
    IOSNative.callSynchronous("WNTabRemovePage", a);
  } else {
    if (wnIf.device === DT_ANDROID) {
      Native.wnTabRemovePage(a);
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute("wnTabRemovePage", a);
      }
    }
  }
}
function WNListAllVariables() {
  if (wnIf.device === DT_IOS) {
    return JSON.parse(IOSNative.callSynchronous("WNListAllVariables"));
  } else {
    if (wnIf.device === DT_ANDROID) {
      return JSON.parse(Native.wnListAllVariables());
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        return JSON.parse(VirtualInterface.execute("wnListAllVariables"));
      }
    }
  }
}
function WNResetAllVariables() {
  if (wnIf.device === DT_IOS) {
    return JSON.parse(IOSNative.callSynchronous("WNResetAllVariables"));
  } else {
    if (wnIf.device === DT_ANDROID) {
      return JSON.parse(Native.wnResetAllVariables());
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        return VirtualInterface.execute("wnResetAllVariables");
      }
    }
  }
}
function WNGetLang(b) {
  var a = mLocaleInfo[b];
  if (a === undefined) {
    a = "";
  }
  return a;
}
function WNSetLocale(a) {
  if (wnIf.device === DT_IOS) {
    return IOSNative.callSynchronous("WNSetLocale", a);
  } else {
    if (wnIf.device === DT_ANDROID) {
      return Native.wnSetLocale(a);
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        return VirtualInterface.execute("wnSetLocale");
      }
    }
  }
}
function WNGetLocale() {
  if (wnIf.device === DT_IOS) {
    return IOSNative.callSynchronous("WNGetLocale");
  } else {
    if (wnIf.device === DT_ANDROID) {
      return Native.wnGetLocale();
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        return VirtualInterface.get("wnGetLocale");
      }
    }
  }
  return "";
}
function dynamicLoadScript(b, c) {
  var a = document.createElement("script");
  a.type = "text/javascript";
  if (a.readyState) {
    a.onreadystatechange = function () {
      if (a.readyState === "loaded" || a.readyState === "complete") {
        a.onreadystatechange = null;
        c();
      }
    };
  } else {
    a.onload = function () {
      c();
    };
  }
  a.src = b;
  document.getElementsByTagName("head")[0].appendChild(a);
}
function WNLoadLocale(a) {
  if (wnIf.device === DT_IOS) {
    dynamicLoadScript(WNSetLocale(WNGetLocale()), a);
  } else {
    if (wnIf.device === DT_ANDROID) {
      dynamicLoadScript(WNSetLocale(WNGetLocale()), a);
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        dynamicLoadScript(WNSetLocale(WNGetLocale()), a);
      }
    }
  }
}
function WNEncryptString(a) {
  if (wnIf.device === DT_IOS) {
    return IOSNative.callSynchronous("wnEncryptString", a);
  } else {
    if (wnIf.device === DT_ANDROID) {
      return Native.wnEncryptString(a);
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        return VirtualInterface.execute("wnEncryptString", a);
      }
    }
  }
}
function WNDecryptString(a) {
  if (wnIf.device === DT_IOS) {
    return IOSNative.callSynchronous("wnDecryptString", a);
  } else {
    if (wnIf.device === DT_ANDROID) {
      return Native.wnDecryptString(a);
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        return VirtualInterface.execute("wnDecryptString", a);
      }
    }
  }
}
function WNCopyResourceFiles(c, d, a) {
  var b = -1;
  if (a !== undefined && a !== null) {
    b = a;
  }
  if (wnIf.device === DT_IOS) {
    IOSNative.callAsynchronous("WNCopyResourceFiles", c, d, "" + b);
  } else {
    if (wnIf.device === DT_ANDROID) {
      Native.wnCopyResourceFiles(c, d, "" + b);
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        return VirtualInterface.execute("wnCopyResourceFiles", c, d, "" + b);
      }
    }
  }
}
function WN2CommonAsync() {
  var a = [].slice.call(arguments);
  if (wnIf.device === DT_IOS) {
    IOSNative.callAsynchronous.apply(IOSNative, [].slice.call(arguments));
  } else {
    if (wnIf.device === DT_ANDROID) {
      setTimeout(function () {
        WN2Common.apply(WN2Common, a);
      }, 0);
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        setTimeout(function () {
          VirtualInterface.execute.apply(VirtualInterface, a);
        }, 0);
      }
    }
  }
}
function WN2Common() {
  if (wnIf.device === DT_IOS) {
    return IOSNative.callSynchronous.apply(IOSNative, arguments);
  } else {
    if (wnIf.device === DT_ANDROID) {
      var a = [].slice.call(arguments);
      if (a.length === 0) {
        return undefined;
      }
      var b = a.shift();
      if (a.length === 0) {
        return Native.wnCommonInterface(b);
      } else {
        return Native.wnCommonInterface(b, JSON.stringify(a));
      }
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        return VirtualInterface.execute.apply(VirtualInterface, arguments);
      }
    }
  }
  return "{}";
}
function WNUsingHttpCookie(a) {
  if (a === undefined || a === null) {
    a = true;
  }
  if (wnIf.device === DT_IOS) {
  } else {
    if (wnIf.device === DT_ANDROID) {
      Native.wnUsingHttpCookie(a);
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute("wnUsingHttpCookie", a);
      }
    }
  }
}
function WN2InfoEvent() {
  var a = WN2Common("wn2InfoEvent");
  return typeof a === "string" && a !== "" ? JSON.parse(a) : a;
}
function WN2InfoDevice() {
  var a = WN2Common("wn2InfoDevice");
  return typeof a === "string" && a !== "" ? JSON.parse(a) : a;
}
function WN2InfoStack() {
  var a = WN2Common("wn2InfoStack");
  return typeof a === "string" && a !== "" ? JSON.parse(a) : a;
}
function WN2InfoApp() {
  var a = WN2Common("wn2InfoApp");
  return typeof a === "string" && a !== "" ? JSON.parse(a) : a;
}
function WN2DataRemoveGlobal(a) {
  WN2Common("wn2DataRemoveGlobal", a);
}
function WN2DataRemoveStorage(a) {
  WN2Common("wn2DataRemoveStorage", a);
}
function WN2AppsInfo() {
  var a = [].slice.call(arguments);
  a.unshift("wn2AppsInfo");
  return JSON.parse(WN2Common.apply(WN2Common, a));
}
function WN2NetResUpdate() {
  WN2CommonAsync("wn2NetResUpdate");
}
function WNHttpLoginUpdateResources(a, b) {
  if (b === undefined || b === null) {
    alert("loginData Error");
    return;
  }
  if (wnIf.device === DT_IOS) {
    IOSNative.callAsynchronous(
      "WNLoginUpdateResourceFiles",
      a,
      JSON.stringify(b)
    );
  } else {
    if (wnIf.device === DT_ANDROID) {
      WN2CommonAsync("wnLoginUpdateResources", a, JSON.stringify(b));
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute(
          "wnLoginUpdateResources",
          a,
          JSON.stringify(b)
        );
      }
    }
  }
}
function WNResetResourceVersion() {
  if (wnIf.device === DT_IOS) {
    IOSNative.callAsynchronous("wnResetResourceVersion");
  } else {
    if (wnIf.device === DT_ANDROID) {
      WN2CommonAsync("wnResetResourceVersion");
    } else {
      if (wnIf.device === DT_VIRTUAL) {
        VirtualInterface.execute("wnResetResourceVersion");
      }
    }
  }
}
function WN2FileInfo(a) {
  return M.file.info(a);
}
function WN2FileCreate(a) {
  return M.file.create(a);
}
function WN2FileRemove(a) {
  return M.file.remove(a);
}
function WN2FileList(a) {
  return M.file.list(a);
}
function WN2FileRead(a, b) {
  M.file.read(a, b);
}
function WN2FileWrite(a, b) {
  M.file.write(a, b);
}
function WN2FileCopy(b, a, c) {
  M.file.copy(b, c, a);
}
function WN2FileMove(b, a, c) {
  M.file.move(b, c, a);
}
function WN2AppsInstall(b, a) {
  WN2CommonAsync("wn2AppsInstall", b, a);
}
function WN2AppsDelete(a) {
  WN2CommonAsync("wn2AppsDelete", a);
}
function WNUnZipInitialResource(a) {
  var b;
  if (a === undefined || a === null || a === "") {
    b = {};
    b.event = "ERROR";
    CBUnZipInitialResource("FAIL", b);
    return;
  }
  if (wnIf.device === DT_IOS) {
    IOSNative.callAsynchronous("WNUnZipInitialResource", a);
    return;
  } else {
    if (wnIf.device === DT_ANDROID) {
      WN2CommonAsync("wnUnZipInitialResource", a);
      return;
    } else {
      b = {};
      b.event = "ERROR";
      CBUnZipInitialResource("NS", b);
    }
  }
}
