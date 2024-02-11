var audio;

try {
    var key, Module = void 0 !== Module ? Module : {},
        moduleOverrides = {};
    for (key in Module) Module.hasOwnProperty(key) && (moduleOverrides[key] = Module[key]);
    var arguments_ = [],
        thisProgram = "./this.program",
        quit_ = function(e, t) {
            throw t
        },
        ENVIRONMENT_IS_WEB = !1,
        ENVIRONMENT_IS_WORKER = !1,
        ENVIRONMENT_IS_NODE = !1,
        ENVIRONMENT_IS_SHELL = !1;
    if (ENVIRONMENT_IS_WEB = "object" == typeof window, ENVIRONMENT_IS_WORKER = "function" == typeof importScripts, ENVIRONMENT_IS_NODE = "object" == typeof process && "object" == typeof process.versions && "string" == typeof process.versions.node, ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER, Module.ENVIRONMENT) throw new Error("Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -s ENVIRONMENT=web or -s ENVIRONMENT=node)");
    var read_, readAsync, readBinary, setWindowTitle, nodeFS, nodePath, scriptDirectory = "";

    function locateFile(e) {
        return Module.locateFile ? Module.locateFile(e, scriptDirectory) : scriptDirectory + e
    }
    if (ENVIRONMENT_IS_NODE) scriptDirectory = ENVIRONMENT_IS_WORKER ? require("path").dirname(scriptDirectory) + "/" : __dirname + "/", read_ = function(e, t) {
        return nodeFS || (nodeFS = require("fs")), nodePath || (nodePath = require("path")), e = nodePath.normalize(e), nodeFS.readFileSync(e, t ? null : "utf8")
    }, readBinary = function(e) {
        var t = read_(e, !0);
        return t.buffer || (t = new Uint8Array(t)), assert(t.buffer), t
    }, process.argv.length > 1 && (thisProgram = process.argv[1].replace(/\\/g, "/")), arguments_ = process.argv.slice(2), "undefined" != typeof module && (module.exports = Module), process.on("uncaughtException", (function(e) {
        if (!(e instanceof ExitStatus)) throw e
    })), process.on("unhandledRejection", abort), quit_ = function(e) {
        process.exit(e)
    }, Module.inspect = function() {
        return "[Emscripten Module object]"
    };
    else if (ENVIRONMENT_IS_SHELL) "undefined" != typeof read && (read_ = function(e) {
        return read(e)
    }), readBinary = function(e) {
        var t;
        return "function" == typeof readbuffer ? new Uint8Array(readbuffer(e)) : (assert("object" == typeof(t = read(e, "binary"))), t)
    }, "undefined" != typeof scriptArgs ? arguments_ = scriptArgs : "undefined" != typeof arguments && (arguments_ = arguments), "function" == typeof quit && (quit_ = function(e) {
        quit(e)
    }), "undefined" != typeof print && ("undefined" == typeof console && (console = {}), console.log = print, console.warn = console.error = "undefined" != typeof printErr ? printErr : print);
    else {
        if (!ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_WORKER) throw new Error("environment detection error");
        ENVIRONMENT_IS_WORKER ? scriptDirectory = self.location.href : document.currentScript && (scriptDirectory = document.currentScript.src), scriptDirectory = 0 !== scriptDirectory.indexOf("blob:") ? scriptDirectory.substr(0, scriptDirectory.lastIndexOf("/") + 1) : "", read_ = function(e) {
            var t = new XMLHttpRequest;
            return t.open("GET", e, !1), t.send(null), t.responseText
        }, ENVIRONMENT_IS_WORKER && (readBinary = function(e) {
            var t = new XMLHttpRequest;
            return t.open("GET", e, !1), t.responseType = "arraybuffer", t.send(null), new Uint8Array(t.response)
        }), readAsync = function(e, t, r) {
            var n = new XMLHttpRequest;
            n.open("GET", e, !0), n.responseType = "arraybuffer", n.onload = function() {
                200 == n.status || 0 == n.status && n.response ? t(n.response) : r()
            }, n.onerror = r, n.send(null)
        }, setWindowTitle = function(e) {
            document.title = e
        }
    }
    var out = Module.print || console.log.bind(console),
        err = Module.printErr || console.warn.bind(console);
    for (key in moduleOverrides) moduleOverrides.hasOwnProperty(key) && (Module[key] = moduleOverrides[key]);
    moduleOverrides = null, Module.arguments && (arguments_ = Module.arguments), Object.getOwnPropertyDescriptor(Module, "arguments") || Object.defineProperty(Module, "arguments", {
        configurable: !0,
        get: function() {
            abort("Module.arguments has been replaced with plain arguments_ (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)")
        }
    }), Module.thisProgram && (thisProgram = Module.thisProgram), Object.getOwnPropertyDescriptor(Module, "thisProgram") || Object.defineProperty(Module, "thisProgram", {
        configurable: !0,
        get: function() {
            abort("Module.thisProgram has been replaced with plain thisProgram (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)")
        }
    }), Module.quit && (quit_ = Module.quit), Object.getOwnPropertyDescriptor(Module, "quit") || Object.defineProperty(Module, "quit", {
        configurable: !0,
        get: function() {
            abort("Module.quit has been replaced with plain quit_ (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)")
        }
    }), assert(void 0 === Module.memoryInitializerPrefixURL, "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead"), assert(void 0 === Module.pthreadMainPrefixURL, "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead"), assert(void 0 === Module.cdInitializerPrefixURL, "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead"), assert(void 0 === Module.filePackagePrefixURL, "Module.filePackagePrefixURL option was removed, use Module.locateFile instead"), assert(void 0 === Module.read, "Module.read option was removed (modify read_ in JS)"), assert(void 0 === Module.readAsync, "Module.readAsync option was removed (modify readAsync in JS)"), assert(void 0 === Module.readBinary, "Module.readBinary option was removed (modify readBinary in JS)"), assert(void 0 === Module.setWindowTitle, "Module.setWindowTitle option was removed (modify setWindowTitle in JS)"), assert(void 0 === Module.TOTAL_MEMORY, "Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY"), Object.getOwnPropertyDescriptor(Module, "read") || Object.defineProperty(Module, "read", {
        configurable: !0,
        get: function() {
            abort("Module.read has been replaced with plain read_ (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)")
        }
    }), Object.getOwnPropertyDescriptor(Module, "readAsync") || Object.defineProperty(Module, "readAsync", {
        configurable: !0,
        get: function() {
            abort("Module.readAsync has been replaced with plain readAsync (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)")
        }
    }), Object.getOwnPropertyDescriptor(Module, "readBinary") || Object.defineProperty(Module, "readBinary", {
        configurable: !0,
        get: function() {
            abort("Module.readBinary has been replaced with plain readBinary (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)")
        }
    }), Object.getOwnPropertyDescriptor(Module, "setWindowTitle") || Object.defineProperty(Module, "setWindowTitle", {
        configurable: !0,
        get: function() {
            abort("Module.setWindowTitle has been replaced with plain setWindowTitle (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)")
        }
    });
    var IDBFS = "IDBFS is no longer included by default; build with -lidbfs.js",
        PROXYFS = "PROXYFS is no longer included by default; build with -lproxyfs.js",
        WORKERFS = "WORKERFS is no longer included by default; build with -lworkerfs.js",
        NODEFS = "NODEFS is no longer included by default; build with -lnodefs.js",
        STACK_ALIGN = 16;

    function dynamicAlloc(e) {
        assert(DYNAMICTOP_PTR);
        var t = HEAP32[DYNAMICTOP_PTR >> 2],
            r = t + e + 15 & -16;
        return assert(r <= HEAP8.length, "failure to dynamicAlloc - memory growth etc. is not supported there, call malloc/sbrk directly"), HEAP32[DYNAMICTOP_PTR >> 2] = r, t
    }

    function alignMemory(e, t) {
        return t || (t = STACK_ALIGN), Math.ceil(e / t) * t
    }

    function getNativeTypeSize(e) {
        switch (e) {
            case "i1":
            case "i8":
                return 1;
            case "i16":
                return 2;
            case "i32":
            case "float":
                return 4;
            case "i64":
            case "double":
                return 8;
            default:
                if ("*" === e[e.length - 1]) return 4;
                if ("i" === e[0]) {
                    var t = Number(e.substr(1));
                    return assert(t % 8 == 0, "getNativeTypeSize invalid bits " + t + ", type " + e), t / 8
                }
                return 0
        }
    }

    function warnOnce(e) {
        warnOnce.shown || (warnOnce.shown = {}), warnOnce.shown[e] || (warnOnce.shown[e] = 1, err(e))
    }

    function convertJsFunctionToWasm(e, t) {
        if ("function" == typeof WebAssembly.Function) {
            for (var r = {
                    i: "i32",
                    j: "i64",
                    f: "f32",
                    d: "f64"
                }, n = {
                    parameters: [],
                    results: "v" == t[0] ? [] : [r[t[0]]]
                }, o = 1; o < t.length; ++o) n.parameters.push(r[t[o]]);
            return new WebAssembly.Function(n, e)
        }
        var i = [1, 0, 1, 96],
            a = t.slice(0, 1),
            s = t.slice(1),
            c = {
                i: 127,
                j: 126,
                f: 125,
                d: 124
            };
        i.push(s.length);
        for (o = 0; o < s.length; ++o) i.push(c[s[o]]);
        "v" == a ? i.push(0) : i = i.concat([1, c[a]]), i[1] = i.length - 2;
        var l = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0].concat(i, [2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0])),
            u = new WebAssembly.Module(l);
        return new WebAssembly.Instance(u, {
            e: {
                f: e
            }
        }).exports.f
    }
    var functionsInTableMap, freeTableIndexes = [];

    function addFunctionWasm(e, t) {
        var r, n = wasmTable;
        if (!functionsInTableMap) {
            functionsInTableMap = new WeakMap;
            for (var o = 0; o < n.length; o++) {
                var i = n.get(o);
                i && functionsInTableMap.set(i, o)
            }
        }
        if (functionsInTableMap.has(e)) return functionsInTableMap.get(e);
        if (freeTableIndexes.length) r = freeTableIndexes.pop();
        else {
            r = n.length;
            try {
                n.grow(1)
            } catch (e) {
                if (!(e instanceof RangeError)) throw e;
                throw "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH."
            }
        }
        try {
            n.set(r, e)
        } catch (o) {
            if (!(o instanceof TypeError)) throw o;
            assert(void 0 !== t, "Missing signature argument to addFunction");
            var a = convertJsFunctionToWasm(e, t);
            n.set(r, a)
        }
        return functionsInTableMap.set(e, r), r
    }

    function removeFunctionWasm(e) {
        functionsInTableMap.delete(wasmTable.get(e)), freeTableIndexes.push(e)
    }

    function addFunction(e, t) {
        return assert(void 0 !== e), addFunctionWasm(e, t)
    }

    function removeFunction(e) {
        removeFunctionWasm(e)
    }
    var funcWrappers = {};

    function getFuncWrapper(e, t) {
        if (e) {
            assert(t), funcWrappers[t] || (funcWrappers[t] = {});
            var r = funcWrappers[t];
            return r[e] || (1 === t.length ? r[e] = function() {
                return dynCall(t, e)
            } : 2 === t.length ? r[e] = function(r) {
                return dynCall(t, e, [r])
            } : r[e] = function() {
                return dynCall(t, e, Array.prototype.slice.call(arguments))
            }), r[e]
        }
    }

    function makeBigInt(e, t, r) {
        return r ? +(e >>> 0) + 4294967296 * +(t >>> 0) : +(e >>> 0) + 4294967296 * +(0 | t)
    }

    function dynCall(e, t, r) {
        return r && r.length ? (assert(r.length === e.substring(1).replace(/j/g, "--").length), assert("dynCall_" + e in Module, "bad function pointer type - no table for sig '" + e + "'"), Module["dynCall_" + e].apply(null, [t].concat(r))) : (assert(1 == e.length), assert("dynCall_" + e in Module, "bad function pointer type - no table for sig '" + e + "'"), Module["dynCall_" + e].call(null, t))
    }
    var tempRet0 = 0,
        setTempRet0 = function(e) {
            tempRet0 = e
        },
        getTempRet0 = function() {
            return tempRet0
        };

    function getCompilerSetting(e) {
        throw "You must build with -s RETAIN_COMPILER_SETTINGS=1 for getCompilerSetting or emscripten_get_compiler_setting to work"
    }
    var wasmBinary, noExitRuntime, wasmMemory, GLOBAL_BASE = 1024;

    function setValue(e, t, r, n) {
        switch ("*" === (r = r || "i8").charAt(r.length - 1) && (r = "i32"), r) {
            case "i1":
            case "i8":
                HEAP8[e >> 0] = t;
                break;
            case "i16":
                HEAP16[e >> 1] = t;
                break;
            case "i32":
                HEAP32[e >> 2] = t;
                break;
            case "i64":
                tempI64 = [t >>> 0, (tempDouble = t, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (0 | Math_min(+Math_floor(tempDouble / 4294967296), 4294967295)) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[e >> 2] = tempI64[0], HEAP32[e + 4 >> 2] = tempI64[1];
                break;
            case "float":
                HEAPF32[e >> 2] = t;
                break;
            case "double":
                HEAPF64[e >> 3] = t;
                break;
            default:
                abort("invalid type for setValue: " + r)
        }
    }

    function getValue(e, t, r) {
        switch ("*" === (t = t || "i8").charAt(t.length - 1) && (t = "i32"), t) {
            case "i1":
            case "i8":
                return HEAP8[e >> 0];
            case "i16":
                return HEAP16[e >> 1];
            case "i32":
            case "i64":
                return HEAP32[e >> 2];
            case "float":
                return HEAPF32[e >> 2];
            case "double":
                return HEAPF64[e >> 3];
            default:
                abort("invalid type for getValue: " + t)
        }
        return null
    }
    Module.wasmBinary && (wasmBinary = Module.wasmBinary), Object.getOwnPropertyDescriptor(Module, "wasmBinary") || Object.defineProperty(Module, "wasmBinary", {
        configurable: !0,
        get: function() {
            abort("Module.wasmBinary has been replaced with plain wasmBinary (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)")
        }
    }), Module.noExitRuntime && (noExitRuntime = Module.noExitRuntime), Object.getOwnPropertyDescriptor(Module, "noExitRuntime") || Object.defineProperty(Module, "noExitRuntime", {
        configurable: !0,
        get: function() {
            abort("Module.noExitRuntime has been replaced with plain noExitRuntime (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)")
        }
    }), "object" != typeof WebAssembly && abort("No WebAssembly support found. Build with -s WASM=0 to target JavaScript instead.");
    var wasmTable = new WebAssembly.Table({
            initial: 1875,
            maximum: 1875,
            element: "anyfunc"
        }),
        ABORT = !1,
        EXITSTATUS = 0;

    function assert(e, t) {
        e || abort("Assertion failed: " + t)
    }

    function getCFunc(e) {
        var t = Module["_" + e];
        return assert(t, "Cannot call unknown function " + e + ", make sure it is exported"), t
    }

    function ccall(e, t, r, n, o) {
        var i = {
            string: function(e) {
                var t = 0;
                if (null != e && 0 !== e) {
                    var r = 1 + (e.length << 2);
                    stringToUTF8(e, t = stackAlloc(r), r)
                }
                return t
            },
            array: function(e) {
                var t = stackAlloc(e.length);
                return writeArrayToMemory(e, t), t
            }
        };
        var a = getCFunc(e),
            s = [],
            c = 0;
        if (assert("array" !== t, 'Return type should not be "array".'), n)
            for (var l = 0; l < n.length; l++) {
                var u = i[r[l]];
                u ? (0 === c && (c = stackSave()), s[l] = u(n[l])) : s[l] = n[l]
            }
        var d = a.apply(null, s);
        return d = function(e) {
            return "string" === t ? UTF8ToString(e) : "boolean" === t ? Boolean(e) : e
        }(d), 0 !== c && stackRestore(c), d
    }

    function cwrap(e, t, r, n) {
        return function() {
            return ccall(e, t, r, arguments, n)
        }
    }
    var ALLOC_NORMAL = 0,
        ALLOC_STACK = 1,
        ALLOC_DYNAMIC = 2,
        ALLOC_NONE = 3;

    function allocate(e, t, r, n) {
        var o, i;
        "number" == typeof e ? (o = !0, i = e) : (o = !1, i = e.length);
        var a, s = "string" == typeof t ? t : null;
        if (a = r == ALLOC_NONE ? n : [_malloc, stackAlloc, dynamicAlloc][r](Math.max(i, s ? 1 : t.length)), o) {
            var c;
            for (n = a, assert(0 == (3 & a)), c = a + (-4 & i); n < c; n += 4) HEAP32[n >> 2] = 0;
            for (c = a + i; n < c;) HEAP8[n++ >> 0] = 0;
            return a
        }
        if ("i8" === s) return e.subarray || e.slice ? HEAPU8.set(e, a) : HEAPU8.set(new Uint8Array(e), a), a;
        for (var l, u, d, _ = 0; _ < i;) {
            var f = e[_];
            0 !== (l = s || t[_]) ? (assert(l, "Must know what type to store in allocate!"), "i64" == l && (l = "i32"), setValue(a + _, f, l), d !== l && (u = getNativeTypeSize(l), d = l), _ += u) : _++
        }
        return a
    }

    function getMemory(e) {
        return runtimeInitialized ? _malloc(e) : dynamicAlloc(e)
    }
    var UTF8Decoder = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0;

    function UTF8ArrayToString(e, t, r) {
        for (var n = t + r, o = t; e[o] && !(o >= n);) ++o;
        if (o - t > 16 && e.subarray && UTF8Decoder) return UTF8Decoder.decode(e.subarray(t, o));
        for (var i = ""; t < o;) {
            var a = e[t++];
            if (128 & a) {
                var s = 63 & e[t++];
                if (192 != (224 & a)) {
                    var c = 63 & e[t++];
                    if (224 == (240 & a) ? a = (15 & a) << 12 | s << 6 | c : (240 != (248 & a) && warnOnce("Invalid UTF-8 leading byte 0x" + a.toString(16) + " encountered when deserializing a UTF-8 string on the asm.js/wasm heap to a JS string!"), a = (7 & a) << 18 | s << 12 | c << 6 | 63 & e[t++]), a < 65536) i += String.fromCharCode(a);
                    else {
                        var l = a - 65536;
                        i += String.fromCharCode(55296 | l >> 10, 56320 | 1023 & l)
                    }
                } else i += String.fromCharCode((31 & a) << 6 | s)
            } else i += String.fromCharCode(a)
        }
        return i
    }

    function UTF8ToString(e, t) {
        return e ? UTF8ArrayToString(HEAPU8, e, t) : ""
    }

    function stringToUTF8Array(e, t, r, n) {
        if (!(n > 0)) return 0;
        for (var o = r, i = r + n - 1, a = 0; a < e.length; ++a) {
            var s = e.charCodeAt(a);
            if (s >= 55296 && s <= 57343) s = 65536 + ((1023 & s) << 10) | 1023 & e.charCodeAt(++a);
            if (s <= 127) {
                if (r >= i) break;
                t[r++] = s
            } else if (s <= 2047) {
                if (r + 1 >= i) break;
                t[r++] = 192 | s >> 6, t[r++] = 128 | 63 & s
            } else if (s <= 65535) {
                if (r + 2 >= i) break;
                t[r++] = 224 | s >> 12, t[r++] = 128 | s >> 6 & 63, t[r++] = 128 | 63 & s
            } else {
                if (r + 3 >= i) break;
                s >= 2097152 && warnOnce("Invalid Unicode code point 0x" + s.toString(16) + " encountered when serializing a JS string to an UTF-8 string on the asm.js/wasm heap! (Valid unicode code points should be in range 0-0x1FFFFF)."), t[r++] = 240 | s >> 18, t[r++] = 128 | s >> 12 & 63, t[r++] = 128 | s >> 6 & 63, t[r++] = 128 | 63 & s
            }
        }
        return t[r] = 0, r - o
    }

    function stringToUTF8(e, t, r) {
        return assert("number" == typeof r, "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!"), stringToUTF8Array(e, HEAPU8, t, r)
    }

    function lengthBytesUTF8(e) {
        for (var t = 0, r = 0; r < e.length; ++r) {
            var n = e.charCodeAt(r);
            n >= 55296 && n <= 57343 && (n = 65536 + ((1023 & n) << 10) | 1023 & e.charCodeAt(++r)), n <= 127 ? ++t : t += n <= 2047 ? 2 : n <= 65535 ? 3 : 4
        }
        return t
    }

    function AsciiToString(e) {
        for (var t = "";;) {
            var r = HEAPU8[e++ >> 0];
            if (!r) return t;
            t += String.fromCharCode(r)
        }
    }

    function stringToAscii(e, t) {
        return writeAsciiToMemory(e, t, !1)
    }
    var UTF16Decoder = "undefined" != typeof TextDecoder ? new TextDecoder("utf-16le") : void 0;

    function UTF16ToString(e, t) {
        assert(e % 2 == 0, "Pointer passed to UTF16ToString must be aligned to two bytes!");
        for (var r = e, n = r >> 1, o = n + t / 2; !(n >= o) && HEAPU16[n];) ++n;
        if ((r = n << 1) - e > 32 && UTF16Decoder) return UTF16Decoder.decode(HEAPU8.subarray(e, r));
        for (var i = 0, a = "";;) {
            var s = HEAP16[e + 2 * i >> 1];
            if (0 == s || i == t / 2) return a;
            ++i, a += String.fromCharCode(s)
        }
    }

    function stringToUTF16(e, t, r) {
        if (assert(t % 2 == 0, "Pointer passed to stringToUTF16 must be aligned to two bytes!"), assert("number" == typeof r, "stringToUTF16(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!"), void 0 === r && (r = 2147483647), r < 2) return 0;
        for (var n = t, o = (r -= 2) < 2 * e.length ? r / 2 : e.length, i = 0; i < o; ++i) {
            var a = e.charCodeAt(i);
            HEAP16[t >> 1] = a, t += 2
        }
        return HEAP16[t >> 1] = 0, t - n
    }

    function lengthBytesUTF16(e) {
        return 2 * e.length
    }

    function UTF32ToString(e, t) {
        assert(e % 4 == 0, "Pointer passed to UTF32ToString must be aligned to four bytes!");
        for (var r = 0, n = ""; !(r >= t / 4);) {
            var o = HEAP32[e + 4 * r >> 2];
            if (0 == o) break;
            if (++r, o >= 65536) {
                var i = o - 65536;
                n += String.fromCharCode(55296 | i >> 10, 56320 | 1023 & i)
            } else n += String.fromCharCode(o)
        }
        return n
    }

    function stringToUTF32(e, t, r) {
        if (assert(t % 4 == 0, "Pointer passed to stringToUTF32 must be aligned to four bytes!"), assert("number" == typeof r, "stringToUTF32(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!"), void 0 === r && (r = 2147483647), r < 4) return 0;
        for (var n = t, o = n + r - 4, i = 0; i < e.length; ++i) {
            var a = e.charCodeAt(i);
            if (a >= 55296 && a <= 57343) a = 65536 + ((1023 & a) << 10) | 1023 & e.charCodeAt(++i);
            if (HEAP32[t >> 2] = a, (t += 4) + 4 > o) break
        }
        return HEAP32[t >> 2] = 0, t - n
    }

    function lengthBytesUTF32(e) {
        for (var t = 0, r = 0; r < e.length; ++r) {
            var n = e.charCodeAt(r);
            n >= 55296 && n <= 57343 && ++r, t += 4
        }
        return t
    }

    function allocateUTF8(e) {
        var t = lengthBytesUTF8(e) + 1,
            r = _malloc(t);
        return r && stringToUTF8Array(e, HEAP8, r, t), r
    }

    function allocateUTF8OnStack(e) {
        var t = lengthBytesUTF8(e) + 1,
            r = stackAlloc(t);
        return stringToUTF8Array(e, HEAP8, r, t), r
    }

    function writeStringToMemory(e, t, r) {
        var n, o;
        warnOnce("writeStringToMemory is deprecated and should not be called! Use stringToUTF8() instead!"), r && (o = t + lengthBytesUTF8(e), n = HEAP8[o]), stringToUTF8(e, t, 1 / 0), r && (HEAP8[o] = n)
    }

    function writeArrayToMemory(e, t) {
        assert(e.length >= 0, "writeArrayToMemory array must have a length (should be an array or typed array)"), HEAP8.set(e, t)
    }

    function writeAsciiToMemory(e, t, r) {
        for (var n = 0; n < e.length; ++n) assert(e.charCodeAt(n) == e.charCodeAt(n) & 255), HEAP8[t++ >> 0] = e.charCodeAt(n);
        r || (HEAP8[t >> 0] = 0)
    }
    var HEAP, buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64, PAGE_SIZE = 16384,
        WASM_PAGE_SIZE = 65536,
        ASMJS_PAGE_SIZE = 16777216;

    function alignUp(e, t) {
        return e % t > 0 && (e += t - e % t), e
    }

    function updateGlobalBufferAndViews(e) {
        buffer = e, Module.HEAP8 = HEAP8 = new Int8Array(e), Module.HEAP16 = HEAP16 = new Int16Array(e), Module.HEAP32 = HEAP32 = new Int32Array(e), Module.HEAPU8 = HEAPU8 = new Uint8Array(e), Module.HEAPU16 = HEAPU16 = new Uint16Array(e), Module.HEAPU32 = HEAPU32 = new Uint32Array(e), Module.HEAPF32 = HEAPF32 = new Float32Array(e), Module.HEAPF64 = HEAPF64 = new Float64Array(e)
    }
    var STATIC_BASE = 1024,
        STACK_BASE = 20079808,
        STACKTOP = STACK_BASE,
        STACK_MAX = 14836928,
        DYNAMIC_BASE = 20079808,
        DYNAMICTOP_PTR = 14836768;
    assert(STACK_BASE % 16 == 0, "stack must start aligned"), assert(DYNAMIC_BASE % 16 == 0, "heap must start aligned");
    var TOTAL_STACK = 5242880;
    Module.TOTAL_STACK && assert(TOTAL_STACK === Module.TOTAL_STACK, "the stack size can no longer be determined at runtime");
    var INITIAL_INITIAL_MEMORY = Module.INITIAL_MEMORY || 20971520;

    function writeStackCookie() {
        assert(0 == (3 & STACK_MAX)), HEAPU32[1 + (STACK_MAX >> 2)] = 34821223, HEAPU32[2 + (STACK_MAX >> 2)] = 2310721022, HEAP32[0] = 1668509029
    }

    function checkStackCookie() {
        var e = HEAPU32[1 + (STACK_MAX >> 2)],
            t = HEAPU32[2 + (STACK_MAX >> 2)];
        34821223 == e && 2310721022 == t || abort("Stack overflow! Stack cookie has been overwritten, expected hex dwords 0x89BACDFE and 0x2135467, but received 0x" + t.toString(16) + " " + e.toString(16)), 1668509029 !== HEAP32[0] && abort("Runtime error: The application has corrupted its heap memory area (address zero)!")
    }

    function abortFnPtrError(e, t) {
        abort("Invalid function pointer " + e + " called with signature '" + t + "'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this). Build with ASSERTIONS=2 for more info.")
    }

    function callRuntimeCallbacks(e) {
        for (; e.length > 0;) {
            var t = e.shift();
            if ("function" != typeof t) {
                var r = t.func;
                "number" == typeof r ? void 0 === t.arg ? Module.dynCall_v(r) : Module.dynCall_vi(r, t.arg) : r(void 0 === t.arg ? null : t.arg)
            } else t(Module)
        }
    }
    Object.getOwnPropertyDescriptor(Module, "INITIAL_MEMORY") || Object.defineProperty(Module, "INITIAL_MEMORY", {
            configurable: !0,
            get: function() {
                abort("Module.INITIAL_MEMORY has been replaced with plain INITIAL_INITIAL_MEMORY (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)")
            }
        }), assert(INITIAL_INITIAL_MEMORY >= TOTAL_STACK, "INITIAL_MEMORY should be larger than TOTAL_STACK, was " + INITIAL_INITIAL_MEMORY + "! (TOTAL_STACK=" + TOTAL_STACK + ")"), assert("undefined" != typeof Int32Array && "undefined" != typeof Float64Array && void 0 !== Int32Array.prototype.subarray && void 0 !== Int32Array.prototype.set, "JS engine does not provide full typed array support"), (wasmMemory = Module.wasmMemory ? Module.wasmMemory : new WebAssembly.Memory({
            initial: INITIAL_INITIAL_MEMORY / WASM_PAGE_SIZE,
            maximum: INITIAL_INITIAL_MEMORY / WASM_PAGE_SIZE
        })) && (buffer = wasmMemory.buffer), assert((INITIAL_INITIAL_MEMORY = buffer.byteLength) % WASM_PAGE_SIZE == 0), updateGlobalBufferAndViews(buffer), HEAP32[DYNAMICTOP_PTR >> 2] = DYNAMIC_BASE,
        function() {
            var e = new Int16Array(1),
                t = new Int8Array(e.buffer);
            if (e[0] = 25459, 115 !== t[0] || 99 !== t[1]) throw "Runtime error: expected the system to be little-endian!"
        }();
    var __ATPRERUN__ = [],
        __ATINIT__ = [],
        __ATMAIN__ = [],
        __ATEXIT__ = [],
        __ATPOSTRUN__ = [],
        runtimeInitialized = !1,
        runtimeExited = !1;

    function preRun() {
        if (Module.preRun)
            for ("function" == typeof Module.preRun && (Module.preRun = [Module.preRun]); Module.preRun.length;) addOnPreRun(Module.preRun.shift());
        callRuntimeCallbacks(__ATPRERUN__)
    }

    function initRuntime() {
        checkStackCookie(), assert(!runtimeInitialized), runtimeInitialized = !0, Module.noFSInit || FS.init.initialized || FS.init(), TTY.init(), callRuntimeCallbacks(__ATINIT__)
    }

    function preMain() {
        checkStackCookie(), FS.ignorePermissions = !1, callRuntimeCallbacks(__ATMAIN__)
    }

    function exitRuntime() {
        checkStackCookie(), runtimeExited = !0
    }

    function postRun() {
        if (checkStackCookie(), Module.postRun)
            for ("function" == typeof Module.postRun && (Module.postRun = [Module.postRun]); Module.postRun.length;) addOnPostRun(Module.postRun.shift());
        callRuntimeCallbacks(__ATPOSTRUN__)
    }

    function addOnPreRun(e) {
        __ATPRERUN__.unshift(e)
    }

    function addOnInit(e) {
        __ATINIT__.unshift(e)
    }

    function addOnPreMain(e) {
        __ATMAIN__.unshift(e)
    }

    function addOnExit(e) {}

    function addOnPostRun(e) {
        __ATPOSTRUN__.unshift(e)
    }

    function unSign(e, t, r) {
        return e >= 0 ? e : t <= 32 ? 2 * Math.abs(1 << t - 1) + e : Math.pow(2, t) + e
    }

    function reSign(e, t, r) {
        if (e <= 0) return e;
        var n = t <= 32 ? Math.abs(1 << t - 1) : Math.pow(2, t - 1);
        return e >= n && (t <= 32 || e > n) && (e = -2 * n + e), e
    }
    assert(Math.imul, "This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill"), assert(Math.fround, "This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill"), assert(Math.clz32, "This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill"), assert(Math.trunc, "This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
    var Math_abs = Math.abs,
        Math_cos = Math.cos,
        Math_sin = Math.sin,
        Math_tan = Math.tan,
        Math_acos = Math.acos,
        Math_asin = Math.asin,
        Math_atan = Math.atan,
        Math_atan2 = Math.atan2,
        Math_exp = Math.exp,
        Math_log = Math.log,
        Math_sqrt = Math.sqrt,
        Math_ceil = Math.ceil,
        Math_floor = Math.floor,
        Math_pow = Math.pow,
        Math_imul = Math.imul,
        Math_fround = Math.fround,
        Math_round = Math.round,
        Math_min = Math.min,
        Math_max = Math.max,
        Math_clz32 = Math.clz32,
        Math_trunc = Math.trunc,
        runDependencies = 0,
        runDependencyWatcher = null,
        dependenciesFulfilled = null,
        runDependencyTracking = {};

    function getUniqueRunDependency(e) {
        for (var t = e;;) {
            if (!runDependencyTracking[e]) return e;
            e = t + Math.random()
        }
    }

    function addRunDependency(e) {
        runDependencies++, Module.monitorRunDependencies && Module.monitorRunDependencies(runDependencies), e ? (assert(!runDependencyTracking[e]), runDependencyTracking[e] = 1, null === runDependencyWatcher && "undefined" != typeof setInterval && (runDependencyWatcher = setInterval((function() {
            if (ABORT) return clearInterval(runDependencyWatcher), void(runDependencyWatcher = null);
            var e = !1;
            for (var t in runDependencyTracking) e || (e = !0, err("still waiting on run dependencies:")), err("dependency: " + t);
            e && err("(end of list)")
        }), 1e4))) : err("warning: run dependency added without ID")
    }

    function removeRunDependency(e) {
        if (runDependencies--, Module.monitorRunDependencies && Module.monitorRunDependencies(runDependencies), e ? (assert(runDependencyTracking[e]), delete runDependencyTracking[e]) : err("warning: run dependency removed without ID"), 0 == runDependencies && (null !== runDependencyWatcher && (clearInterval(runDependencyWatcher), runDependencyWatcher = null), dependenciesFulfilled)) {
            var t = dependenciesFulfilled;
            dependenciesFulfilled = null, t()
        }
    }

    function abort(e) {
        throw Module.onAbort && Module.onAbort(e), out(e += ""), err(e), ABORT = !0, EXITSTATUS = 1, e = "abort(" + e + ") at " + stackTrace(), new WebAssembly.RuntimeError(e)
    }
    Module.preloadedImages = {}, Module.preloadedAudios = {};
    var memoryInitializer = null;

    function hasPrefix(e, t) {
        return String.prototype.startsWith ? e.startsWith(t) : 0 === e.indexOf(t)
    }
    var dataURIPrefix = "data:application/octet-stream;base64,";

    function isDataURI(e) {
        return hasPrefix(e, dataURIPrefix)
    }
    var fileURIPrefix = "file://";

    function isFileURI(e) {
        return hasPrefix(e, fileURIPrefix)
    }

    function createExportWrapper(e, t) {
        return function() {
            var r = e,
                n = t;
            return t || (n = Module.asm), assert(runtimeInitialized, "native function `" + r + "` called before runtime initialization"), assert(!runtimeExited, "native function `" + r + "` called after runtime exit (use NO_EXIT_RUNTIME to keep it alive after main() exits)"), n[e] || assert(n[e], "exported native function `" + r + "` not found"), n[e].apply(null, arguments)
        }
    }
    var tempDouble, tempI64, wasmBinaryFile = "sm64.us.f3dex2e.wasm";

    function getBinary() {
        try {
            if (wasmBinary) return new Uint8Array(wasmBinary);
            if (readBinary) return readBinary(wasmBinaryFile);
            throw "both async and sync fetching of the wasm failed"
        } catch (e) {
            abort(e)
        }
    }

    function getBinaryPromise() {
        return wasmBinary || !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_WORKER || "function" != typeof fetch || isFileURI(wasmBinaryFile) ? new Promise((function(e, t) {
            e(getBinary())
        })) : fetch(wasmBinaryFile, {
            credentials: "same-origin"
        }).then((function(e) {
            if (!e.ok) throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
            return e.arrayBuffer()
        })).catch((function() {
            return getBinary()
        }))
    }

    function createWasm() {
        var e = {
            env: asmLibraryArg,
            wasi_snapshot_preview1: asmLibraryArg
        };

        function t(e, t) {
            var r = e.exports;
            Module.asm = r, removeRunDependency("wasm-instantiate")
        }
        addRunDependency("wasm-instantiate");
        var r = Module;

        function n(e) {
            assert(Module === r, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?"), r = null, t(e.instance)
        }

        function o(t) {
            return getBinaryPromise().then((function(t) {
                return WebAssembly.instantiate(t, e)
            })).then(t, (function(e) {
                err("failed to asynchronously prepare wasm: " + e), abort(e)
            }))
        }
        if (Module.instantiateWasm) try {
            return Module.instantiateWasm(e, t)
        } catch (e) {
            return err("Module.instantiateWasm callback failed with error: " + e), !1
        }
        return function() {
            if (wasmBinary || "function" != typeof WebAssembly.instantiateStreaming || isDataURI(wasmBinaryFile) || isFileURI(wasmBinaryFile) || "function" != typeof fetch) return o(n);
            fetch(wasmBinaryFile, {
                credentials: "same-origin"
            }).then((function(t) {
                return WebAssembly.instantiateStreaming(t, e).then(n, (function(e) {
                    return err("wasm streaming compile failed: " + e), err("falling back to ArrayBuffer instantiation"), o(n)
                }))
            }))
        }(), {}
    }
    isDataURI(wasmBinaryFile) || (wasmBinaryFile = locateFile(wasmBinaryFile));
  hello = Module.SDL2;
    var ASM_CONSTS = {
        3072494: function(e) {
            var t = localStorage.sm64_save_file;
            if (t && 684 === t.length) try {
                var r = atob(t);
                if (512 === r.length) {
                    for (var n = 0; n < 512; n++) HEAPU8[e + n] = r.charCodeAt(n);
                    return 1
                }
            } catch (e) {}
            return 0
        },
        3072734: function(e) {
            for (var t = "", r = 0; r < 512; r++) t += String.fromCharCode(HEAPU8[e + r]);
            localStorage.sm64_save_file = btoa(t)
        },
        3072976: function(e) {
            requestAnimationFrame((function(t) {
                dynCall("vd", e, [t])
            }))
        },
        8748234: function(e) {
            var t = UTF8ToString(e) + "\n\nAbort/Retry/Ignore/AlwaysIgnore? [ariA] :",
                r = window.prompt(t, "i");
            return null === r && (r = "i"), allocate(intArrayFromString(r), "i8", ALLOC_NORMAL)
        },
        8783693: function(e, t) {
            alert(UTF8ToString(e) + "\n\n" + UTF8ToString(t))
        },
        8785852: function(e, t, r) {
            var n = e,
                o = t,
                i = r;
            Module.SDL2 || (Module.SDL2 = {});
            var a = Module.SDL2;
            a.ctxCanvas !== Module.canvas && (a.ctx = Module.createContext(Module.canvas, !1, !0), a.ctxCanvas = Module.canvas), a.w === n && a.h === o && a.imageCtx === a.ctx || (a.image = a.ctx.createImageData(n, o), a.w = n, a.h = o, a.imageCtx = a.ctx);
            var s, c = a.image.data,
                l = i >> 2,
                u = 0;
            if ("undefined" != typeof CanvasPixelArray && c instanceof CanvasPixelArray)
                for (s = c.length; u < s;) {
                    var d = HEAP32[l];
                    c[u] = 255 & d, c[u + 1] = d >> 8 & 255, c[u + 2] = d >> 16 & 255, c[u + 3] = 255, l++, u += 4
                } else {
                    a.data32Data !== c && (a.data32 = new Int32Array(c.buffer), a.data8 = new Uint8Array(c.buffer));
                    var _ = a.data32;
                    s = _.length, _.set(HEAP32.subarray(l, l + s));
                    var f = a.data8,
                        p = 3,
                        m = p + 4 * s;
                    if (s % 8 == 0)
                        for (; p < m;) f[p] = 255, f[p = p + 4 | 0] = 255, f[p = p + 4 | 0] = 255, f[p = p + 4 | 0] = 255, f[p = p + 4 | 0] = 255, f[p = p + 4 | 0] = 255, f[p = p + 4 | 0] = 255, f[p = p + 4 | 0] = 255, p = p + 4 | 0;
                    else
                        for (; p < m;) f[p] = 255, p = p + 4 | 0
                }
            return a.ctx.putImageData(a.image, 0, 0), 0
        },
        8787331: function(e, t, r, n, o) {
            var i = e,
                a = t,
                s = r,
                c = n,
                l = o,
                u = document.createElement("canvas");
            u.width = i, u.height = a;
            var d, _ = u.getContext("2d"),
                f = _.createImageData(i, a),
                p = f.data,
                m = l >> 2,
                E = 0;
            if ("undefined" != typeof CanvasPixelArray && p instanceof CanvasPixelArray)
                for (d = p.length; E < d;) {
                    var g = HEAP32[m];
                    p[E] = 255 & g, p[E + 1] = g >> 8 & 255, p[E + 2] = g >> 16 & 255, p[E + 3] = g >> 24 & 255, m++, E += 4
                } else {
                    var h = new Int32Array(p.buffer);
                    d = h.length, h.set(HEAP32.subarray(m, m + d))
                }
            _.putImageData(f, 0, 0);
            var v = 0 === s && 0 === c ? "url(" + u.toDataURL() + "), auto" : "url(" + u.toDataURL() + ") " + s + " " + c + ", auto",
                S = _malloc(v.length + 1);
            return stringToUTF8(v, S, v.length + 1), S
        },
        8788320: function(e) {
            return Module.canvas && (Module.canvas.style.cursor = UTF8ToString(e)), 0
        },
        8788413: function() {
            Module.canvas && (Module.canvas.style.cursor = "none")
        },
        8789638: function() {
            return screen.width
        },
        8789665: function() {
            return screen.height
        },
        8789693: function() {
            return window.innerWidth
        },
        8789725: function() {
            return window.innerHeight
        },
        8789803: function(e) {
            return void 0 !== setWindowTitle && setWindowTitle(UTF8ToString(e)), 0
        },
        8789937: function() {
            return "undefined" != typeof AudioContext || "undefined" != typeof webkitAudioContext ? 1 : 0
        },
        8790103: function() {
            return void 0 !== navigator.mediaDevices && void 0 !== navigator.mediaDevices.getUserMedia || void 0 !== navigator.webkitGetUserMedia ? 1 : 0
        },
        8790329: function(e) {
            void 0 === Module.SDL2 && (Module.SDL2 = {});
            var t = Module.SDL2;
            return e ? t.capture = {} : t.audio = {}, t.audioContext || ("undefined" != typeof AudioContext ? t.audioContext = new AudioContext : "undefined" != typeof webkitAudioContext && (t.audioContext = new webkitAudioContext)), void 0 === t.audioContext ? -1 : 0
        },
        8790812: function() {
            return Module.SDL2.audioContext.sampleRate
        },
        8790882: function(e, t, r, n) {
            var o = Module.SDL2,
                i = function(i) {
                    void 0 !== o.capture.silenceTimer && (clearTimeout(o.capture.silenceTimer), o.capture.silenceTimer = void 0), o.capture.mediaStreamNode = o.audioContext.createMediaStreamSource(i), o.capture.scriptProcessorNode = o.audioContext.createScriptProcessor(t, e, 1), o.capture.scriptProcessorNode.onaudioprocess = function(e) {
                        void 0 !== o && void 0 !== o.capture && (e.outputBuffer.getChannelData(0).fill(0), o.capture.currentCaptureBuffer = e.inputBuffer, dynCall("vi", r, [n]))
                    }, o.capture.mediaStreamNode.connect(o.capture.scriptProcessorNode), o.capture.scriptProcessorNode.connect(o.audioContext.destination), o.capture.stream = i
                },
                a = function(e) {};
            o.capture.silenceBuffer = o.audioContext.createBuffer(e, t, o.audioContext.sampleRate), o.capture.silenceBuffer.getChannelData(0).fill(0);
            o.capture.silenceTimer = setTimeout((function() {
                o.capture.currentCaptureBuffer = o.capture.silenceBuffer, dynCall("vi", r, [n])
            }), t / o.audioContext.sampleRate * 1e3), void 0 !== navigator.mediaDevices && void 0 !== navigator.mediaDevices.getUserMedia ? navigator.mediaDevices.getUserMedia({
                audio: !0,
                video: !1
            }).then(i).catch(a) : void 0 !== navigator.webkitGetUserMedia && navigator.webkitGetUserMedia({
                audio: !0,
                video: !1
            }, i, a)
        },
        8792534: function(e, t, r, n) {
            var o = Module.SDL2;
            o.audio.scriptProcessorNode = o.audioContext.createScriptProcessor(t, 0, e), o.audio.scriptProcessorNode.onaudioprocess = function(e) {
                void 0 !== o && void 0 !== o.audio && (o.audio.currentOutputBuffer = e.outputBuffer, dynCall("vi", r, [n]))
            }, o.audio.scriptProcessorNode.connect(o.audioContext.destination)
        },
        8792944: function(e, t) {
            for (var r = Module.SDL2, n = r.capture.currentCaptureBuffer.numberOfChannels, o = 0; o < n; ++o) {
                var i = r.capture.currentCaptureBuffer.getChannelData(o);
                if (i.length != t) throw "Web Audio capture buffer length mismatch! Destination size: " + i.length + " samples vs expected " + t + " samples!";
                if (1 == n)
                    for (var a = 0; a < t; ++a) setValue(e + 4 * a, i[a], "float");
                else
                    for (a = 0; a < t; ++a) setValue(e + 4 * (a * n + o), i[a], "float")
            }
        },
        8793549: function(e, t) {
            for (var r = Module.SDL2, n = r.audio.currentOutputBuffer.numberOfChannels, o = 0; o < n; ++o) {
                var i = r.audio.currentOutputBuffer.getChannelData(o);
                if (i.length != t) throw "Web Audio output buffer length mismatch! Destination size: " + i.length + " samples vs expected " + t + " samples!";
                for (var a = 0; a < t; ++a) i[a] = HEAPF32[e + (a * n + o << 2) >> 2]
            }
        },
        8794029: function(e) {
            var t = Module.SDL2;
            if (e) {
                if (void 0 !== t.capture.silenceTimer && clearTimeout(t.capture.silenceTimer), void 0 !== t.capture.stream) {
                    for (var r = t.capture.stream.getAudioTracks(), n = 0; n < r.length; n++) t.capture.stream.removeTrack(r[n]);
                    t.capture.stream = void 0
                }
                void 0 !== t.capture.scriptProcessorNode && (t.capture.scriptProcessorNode.onaudioprocess = function(e) {}, t.capture.scriptProcessorNode.disconnect(), t.capture.scriptProcessorNode = void 0), void 0 !== t.capture.mediaStreamNode && (t.capture.mediaStreamNode.disconnect(), t.capture.mediaStreamNode = void 0), void 0 !== t.capture.silenceBuffer && (t.capture.silenceBuffer = void 0), t.capture = void 0
            } else null != t.audio.scriptProcessorNode && (t.audio.scriptProcessorNode.disconnect(), t.audio.scriptProcessorNode = void 0), t.audio = void 0;
            void 0 !== t.audioContext && void 0 === t.audio && void 0 === t.capture && (t.audioContext.close(), t.audioContext = void 0)
        }
    };

    function _emscripten_asm_const_iii(e, t, r) {
        var n = readAsmConstArgs(t, r);
        return ASM_CONSTS[e].apply(null, n)
    }

    function abortStackOverflow(e) {
        abort("Stack overflow! Attempted to allocate " + e + " bytes on the stack, but stack has only " + (STACK_MAX - stackSave() + e) + " bytes available!")
    }

    function demangle(e) {
        return warnOnce("warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling"), e
    }

    function demangleAll(e) {
        return e.replace(/\b_Z[\w\d_]+/g, (function(e) {
            var t = demangle(e);
            return e === t ? e : t + " [" + e + "]"
        }))
    }

    function jsStackTrace() {
        var e = new Error;
        if (!e.stack) {
            try {
                throw new Error
            } catch (t) {
                e = t
            }
            if (!e.stack) return "(no stack trace available)"
        }
        return e.stack.toString()
    }

    function stackTrace() {
        var e = jsStackTrace();
        return Module.extraStackTrace && (e += "\n" + Module.extraStackTrace()), demangleAll(e)
    }

    function ___assert_fail(e, t, r, n) {
        abort("Assertion failed: " + UTF8ToString(e) + ", at: " + [t ? UTF8ToString(t) : "unknown filename", r, n ? UTF8ToString(n) : "unknown function"])
    }

    function ___handle_stack_overflow() {
        abort("stack overflow")
    }

    function setErrNo(e) {
        return HEAP32[___errno_location() >> 2] = e, e
    }
    __ATINIT__.push({
        func: function() {
            ___wasm_call_ctors()
        }
    });
    var _emscripten_get_now, PATH = {
            splitPath: function(e) {
                return /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(e).slice(1)
            },
            normalizeArray: function(e, t) {
                for (var r = 0, n = e.length - 1; n >= 0; n--) {
                    var o = e[n];
                    "." === o ? e.splice(n, 1) : ".." === o ? (e.splice(n, 1), r++) : r && (e.splice(n, 1), r--)
                }
                if (t)
                    for (; r; r--) e.unshift("..");
                return e
            },
            normalize: function(e) {
                var t = "/" === e.charAt(0),
                    r = "/" === e.substr(-1);
                return (e = PATH.normalizeArray(e.split("/").filter((function(e) {
                    return !!e
                })), !t).join("/")) || t || (e = "."), e && r && (e += "/"), (t ? "/" : "") + e
            },
            dirname: function(e) {
                var t = PATH.splitPath(e),
                    r = t[0],
                    n = t[1];
                return r || n ? (n && (n = n.substr(0, n.length - 1)), r + n) : "."
            },
            basename: function(e) {
                if ("/" === e) return "/";
                var t = e.lastIndexOf("/");
                return -1 === t ? e : e.substr(t + 1)
            },
            extname: function(e) {
                return PATH.splitPath(e)[3]
            },
            join: function() {
                var e = Array.prototype.slice.call(arguments, 0);
                return PATH.normalize(e.join("/"))
            },
            join2: function(e, t) {
                return PATH.normalize(e + "/" + t)
            }
        },
        PATH_FS = {
            resolve: function() {
                for (var e = "", t = !1, r = arguments.length - 1; r >= -1 && !t; r--) {
                    var n = r >= 0 ? arguments[r] : FS.cwd();
                    if ("string" != typeof n) throw new TypeError("Arguments to path.resolve must be strings");
                    if (!n) return "";
                    e = n + "/" + e, t = "/" === n.charAt(0)
                }
                return (t ? "/" : "") + (e = PATH.normalizeArray(e.split("/").filter((function(e) {
                    return !!e
                })), !t).join("/")) || "."
            },
            relative: function(e, t) {
                function r(e) {
                    for (var t = 0; t < e.length && "" === e[t]; t++);
                    for (var r = e.length - 1; r >= 0 && "" === e[r]; r--);
                    return t > r ? [] : e.slice(t, r - t + 1)
                }
                e = PATH_FS.resolve(e).substr(1), t = PATH_FS.resolve(t).substr(1);
                for (var n = r(e.split("/")), o = r(t.split("/")), i = Math.min(n.length, o.length), a = i, s = 0; s < i; s++)
                    if (n[s] !== o[s]) {
                        a = s;
                        break
                    } var c = [];
                for (s = a; s < n.length; s++) c.push("..");
                return (c = c.concat(o.slice(a))).join("/")
            }
        },
        TTY = {
            ttys: [],
            init: function() {},
            shutdown: function() {},
            register: function(e, t) {
                TTY.ttys[e] = {
                    input: [],
                    output: [],
                    ops: t
                }, FS.registerDevice(e, TTY.stream_ops)
            },
            stream_ops: {
                open: function(e) {
                    var t = TTY.ttys[e.node.rdev];
                    if (!t) throw new FS.ErrnoError(43);
                    e.tty = t, e.seekable = !1
                },
                close: function(e) {
                    e.tty.ops.flush(e.tty)
                },
                flush: function(e) {
                    e.tty.ops.flush(e.tty)
                },
                read: function(e, t, r, n, o) {
                    if (!e.tty || !e.tty.ops.get_char) throw new FS.ErrnoError(60);
                    for (var i = 0, a = 0; a < n; a++) {
                        var s;
                        try {
                            s = e.tty.ops.get_char(e.tty)
                        } catch (e) {
                            throw new FS.ErrnoError(29)
                        }
                        if (void 0 === s && 0 === i) throw new FS.ErrnoError(6);
                        if (null == s) break;
                        i++, t[r + a] = s
                    }
                    return i && (e.node.timestamp = Date.now()), i
                },
                write: function(e, t, r, n, o) {
                    if (!e.tty || !e.tty.ops.put_char) throw new FS.ErrnoError(60);
                    try {
                        for (var i = 0; i < n; i++) e.tty.ops.put_char(e.tty, t[r + i])
                    } catch (e) {
                        throw new FS.ErrnoError(29)
                    }
                    return n && (e.node.timestamp = Date.now()), i
                }
            },
            default_tty_ops: {
                get_char: function(e) {
                    if (!e.input.length) {
                        var t = null;
                        if (ENVIRONMENT_IS_NODE) {
                            var r = Buffer.alloc ? Buffer.alloc(256) : new Buffer(256),
                                n = 0;
                            try {
                                n = nodeFS.readSync(process.stdin.fd, r, 0, 256, null)
                            } catch (e) {
                                if (-1 == e.toString().indexOf("EOF")) throw e;
                                n = 0
                            }
                            t = n > 0 ? r.slice(0, n).toString("utf-8") : null
                        } else "undefined" != typeof window && "function" == typeof window.prompt ? null !== (t = window.prompt("Input: ")) && (t += "\n") : "function" == typeof readline && null !== (t = readline()) && (t += "\n");
                        if (!t) return null;
                        e.input = intArrayFromString(t, !0)
                    }
                    return e.input.shift()
                },
                put_char: function(e, t) {
                    null === t || 10 === t ? (out(UTF8ArrayToString(e.output, 0)), e.output = []) : 0 != t && e.output.push(t)
                },
                flush: function(e) {
                    e.output && e.output.length > 0 && (out(UTF8ArrayToString(e.output, 0)), e.output = [])
                }
            },
            default_tty1_ops: {
                put_char: function(e, t) {
                    null === t || 10 === t ? (err(UTF8ArrayToString(e.output, 0)), e.output = []) : 0 != t && e.output.push(t)
                },
                flush: function(e) {
                    e.output && e.output.length > 0 && (err(UTF8ArrayToString(e.output, 0)), e.output = [])
                }
            }
        },
        MEMFS = {
            ops_table: null,
            mount: function(e) {
                return MEMFS.createNode(null, "/", 16895, 0)
            },
            createNode: function(e, t, r, n) {
                if (FS.isBlkdev(r) || FS.isFIFO(r)) throw new FS.ErrnoError(63);
                MEMFS.ops_table || (MEMFS.ops_table = {
                    dir: {
                        node: {
                            getattr: MEMFS.node_ops.getattr,
                            setattr: MEMFS.node_ops.setattr,
                            lookup: MEMFS.node_ops.lookup,
                            mknod: MEMFS.node_ops.mknod,
                            rename: MEMFS.node_ops.rename,
                            unlink: MEMFS.node_ops.unlink,
                            rmdir: MEMFS.node_ops.rmdir,
                            readdir: MEMFS.node_ops.readdir,
                            symlink: MEMFS.node_ops.symlink
                        },
                        stream: {
                            llseek: MEMFS.stream_ops.llseek
                        }
                    },
                    file: {
                        node: {
                            getattr: MEMFS.node_ops.getattr,
                            setattr: MEMFS.node_ops.setattr
                        },
                        stream: {
                            llseek: MEMFS.stream_ops.llseek,
                            read: MEMFS.stream_ops.read,
                            write: MEMFS.stream_ops.write,
                            allocate: MEMFS.stream_ops.allocate,
                            mmap: MEMFS.stream_ops.mmap,
                            msync: MEMFS.stream_ops.msync
                        }
                    },
                    link: {
                        node: {
                            getattr: MEMFS.node_ops.getattr,
                            setattr: MEMFS.node_ops.setattr,
                            readlink: MEMFS.node_ops.readlink
                        },
                        stream: {}
                    },
                    chrdev: {
                        node: {
                            getattr: MEMFS.node_ops.getattr,
                            setattr: MEMFS.node_ops.setattr
                        },
                        stream: FS.chrdev_stream_ops
                    }
                });
                var o = FS.createNode(e, t, r, n);
                return FS.isDir(o.mode) ? (o.node_ops = MEMFS.ops_table.dir.node, o.stream_ops = MEMFS.ops_table.dir.stream, o.contents = {}) : FS.isFile(o.mode) ? (o.node_ops = MEMFS.ops_table.file.node, o.stream_ops = MEMFS.ops_table.file.stream, o.usedBytes = 0, o.contents = null) : FS.isLink(o.mode) ? (o.node_ops = MEMFS.ops_table.link.node, o.stream_ops = MEMFS.ops_table.link.stream) : FS.isChrdev(o.mode) && (o.node_ops = MEMFS.ops_table.chrdev.node, o.stream_ops = MEMFS.ops_table.chrdev.stream), o.timestamp = Date.now(), e && (e.contents[t] = o), o
            },
            getFileDataAsRegularArray: function(e) {
                if (e.contents && e.contents.subarray) {
                    for (var t = [], r = 0; r < e.usedBytes; ++r) t.push(e.contents[r]);
                    return t
                }
                return e.contents
            },
            getFileDataAsTypedArray: function(e) {
                return e.contents ? e.contents.subarray ? e.contents.subarray(0, e.usedBytes) : new Uint8Array(e.contents) : new Uint8Array(0)
            },
            expandFileStorage: function(e, t) {
                var r = e.contents ? e.contents.length : 0;
                if (!(r >= t)) {
                    t = Math.max(t, r * (r < 1048576 ? 2 : 1.125) >>> 0), 0 != r && (t = Math.max(t, 256));
                    var n = e.contents;
                    e.contents = new Uint8Array(t), e.usedBytes > 0 && e.contents.set(n.subarray(0, e.usedBytes), 0)
                }
            },
            resizeFileStorage: function(e, t) {
                if (e.usedBytes != t) {
                    if (0 == t) return e.contents = null, void(e.usedBytes = 0);
                    if (!e.contents || e.contents.subarray) {
                        var r = e.contents;
                        return e.contents = new Uint8Array(t), r && e.contents.set(r.subarray(0, Math.min(t, e.usedBytes))), void(e.usedBytes = t)
                    }
                    if (e.contents || (e.contents = []), e.contents.length > t) e.contents.length = t;
                    else
                        for (; e.contents.length < t;) e.contents.push(0);
                    e.usedBytes = t
                }
            },
            node_ops: {
                getattr: function(e) {
                    var t = {};
                    return t.dev = FS.isChrdev(e.mode) ? e.id : 1, t.ino = e.id, t.mode = e.mode, t.nlink = 1, t.uid = 0, t.gid = 0, t.rdev = e.rdev, FS.isDir(e.mode) ? t.size = 4096 : FS.isFile(e.mode) ? t.size = e.usedBytes : FS.isLink(e.mode) ? t.size = e.link.length : t.size = 0, t.atime = new Date(e.timestamp), t.mtime = new Date(e.timestamp), t.ctime = new Date(e.timestamp), t.blksize = 4096, t.blocks = Math.ceil(t.size / t.blksize), t
                },
                setattr: function(e, t) {
                    void 0 !== t.mode && (e.mode = t.mode), void 0 !== t.timestamp && (e.timestamp = t.timestamp), void 0 !== t.size && MEMFS.resizeFileStorage(e, t.size)
                },
                lookup: function(e, t) {
                    throw FS.genericErrors[44]
                },
                mknod: function(e, t, r, n) {
                    return MEMFS.createNode(e, t, r, n)
                },
                rename: function(e, t, r) {
                    if (FS.isDir(e.mode)) {
                        var n;
                        try {
                            n = FS.lookupNode(t, r)
                        } catch (e) {}
                        if (n)
                            for (var o in n.contents) throw new FS.ErrnoError(55)
                    }
                    delete e.parent.contents[e.name], e.name = r, t.contents[r] = e, e.parent = t
                },
                unlink: function(e, t) {
                    delete e.contents[t]
                },
                rmdir: function(e, t) {
                    var r = FS.lookupNode(e, t);
                    for (var n in r.contents) throw new FS.ErrnoError(55);
                    delete e.contents[t]
                },
                readdir: function(e) {
                    var t = [".", ".."];
                    for (var r in e.contents) e.contents.hasOwnProperty(r) && t.push(r);
                    return t
                },
                symlink: function(e, t, r) {
                    var n = MEMFS.createNode(e, t, 41471, 0);
                    return n.link = r, n
                },
                readlink: function(e) {
                    if (!FS.isLink(e.mode)) throw new FS.ErrnoError(28);
                    return e.link
                }
            },
            stream_ops: {
                read: function(e, t, r, n, o) {
                    var i = e.node.contents;
                    if (o >= e.node.usedBytes) return 0;
                    var a = Math.min(e.node.usedBytes - o, n);
                    if (assert(a >= 0), a > 8 && i.subarray) t.set(i.subarray(o, o + a), r);
                    else
                        for (var s = 0; s < a; s++) t[r + s] = i[o + s];
                    return a
                },
                write: function(e, t, r, n, o, i) {
                    if (assert(!(t instanceof ArrayBuffer)), !n) return 0;
                    var a = e.node;
                    if (a.timestamp = Date.now(), t.subarray && (!a.contents || a.contents.subarray)) {
                        if (i) return assert(0 === o, "canOwn must imply no weird position inside the file"), a.contents = t.subarray(r, r + n), a.usedBytes = n, n;
                        if (0 === a.usedBytes && 0 === o) return a.contents = t.slice(r, r + n), a.usedBytes = n, n;
                        if (o + n <= a.usedBytes) return a.contents.set(t.subarray(r, r + n), o), n
                    }
                    if (MEMFS.expandFileStorage(a, o + n), a.contents.subarray && t.subarray) a.contents.set(t.subarray(r, r + n), o);
                    else
                        for (var s = 0; s < n; s++) a.contents[o + s] = t[r + s];
                    return a.usedBytes = Math.max(a.usedBytes, o + n), n
                },
                llseek: function(e, t, r) {
                    var n = t;
                    if (1 === r ? n += e.position : 2 === r && FS.isFile(e.node.mode) && (n += e.node.usedBytes), n < 0) throw new FS.ErrnoError(28);
                    return n
                },
                allocate: function(e, t, r) {
                    MEMFS.expandFileStorage(e.node, t + r), e.node.usedBytes = Math.max(e.node.usedBytes, t + r)
                },
                mmap: function(e, t, r, n, o, i) {
                    if (assert(0 === t), !FS.isFile(e.node.mode)) throw new FS.ErrnoError(43);
                    var a, s, c = e.node.contents;
                    if (2 & i || c.buffer !== buffer) {
                        if ((n > 0 || n + r < c.length) && (c = c.subarray ? c.subarray(n, n + r) : Array.prototype.slice.call(c, n, n + r)), s = !0, !(a = _malloc(r))) throw new FS.ErrnoError(48);
                        HEAP8.set(c, a)
                    } else s = !1, a = c.byteOffset;
                    return {
                        ptr: a,
                        allocated: s
                    }
                },
                msync: function(e, t, r, n, o) {
                    if (!FS.isFile(e.node.mode)) throw new FS.ErrnoError(43);
                    if (2 & o) return 0;
                    MEMFS.stream_ops.write(e, t, 0, n, r, !1);
                    return 0
                }
            }
        },
        ERRNO_MESSAGES = {
            0: "Success",
            1: "Arg list too long",
            2: "Permission denied",
            3: "Address already in use",
            4: "Address not available",
            5: "Address family not supported by protocol family",
            6: "No more processes",
            7: "Socket already connected",
            8: "Bad file number",
            9: "Trying to read unreadable message",
            10: "Mount device busy",
            11: "Operation canceled",
            12: "No children",
            13: "Connection aborted",
            14: "Connection refused",
            15: "Connection reset by peer",
            16: "File locking deadlock error",
            17: "Destination address required",
            18: "Math arg out of domain of func",
            19: "Quota exceeded",
            20: "File exists",
            21: "Bad address",
            22: "File too large",
            23: "Host is unreachable",
            24: "Identifier removed",
            25: "Illegal byte sequence",
            26: "Connection already in progress",
            27: "Interrupted system call",
            28: "Invalid argument",
            29: "I/O error",
            30: "Socket is already connected",
            31: "Is a directory",
            32: "Too many symbolic links",
            33: "Too many open files",
            34: "Too many links",
            35: "Message too long",
            36: "Multihop attempted",
            37: "File or path name too long",
            38: "Network interface is not configured",
            39: "Connection reset by network",
            40: "Network is unreachable",
            41: "Too many open files in system",
            42: "No buffer space available",
            43: "No such device",
            44: "No such file or directory",
            45: "Exec format error",
            46: "No record locks available",
            47: "The link has been severed",
            48: "Not enough core",
            49: "No message of desired type",
            50: "Protocol not available",
            51: "No space left on device",
            52: "Function not implemented",
            53: "Socket is not connected",
            54: "Not a directory",
            55: "Directory not empty",
            56: "State not recoverable",
            57: "Socket operation on non-socket",
            59: "Not a typewriter",
            60: "No such device or address",
            61: "Value too large for defined data type",
            62: "Previous owner died",
            63: "Not super-user",
            64: "Broken pipe",
            65: "Protocol error",
            66: "Unknown protocol",
            67: "Protocol wrong type for socket",
            68: "Math result not representable",
            69: "Read only file system",
            70: "Illegal seek",
            71: "No such process",
            72: "Stale file handle",
            73: "Connection timed out",
            74: "Text file busy",
            75: "Cross-device link",
            100: "Device not a stream",
            101: "Bad font file fmt",
            102: "Invalid slot",
            103: "Invalid request code",
            104: "No anode",
            105: "Block device required",
            106: "Channel number out of range",
            107: "Level 3 halted",
            108: "Level 3 reset",
            109: "Link number out of range",
            110: "Protocol driver not attached",
            111: "No CSI structure available",
            112: "Level 2 halted",
            113: "Invalid exchange",
            114: "Invalid request descriptor",
            115: "Exchange full",
            116: "No data (for no delay io)",
            117: "Timer expired",
            118: "Out of streams resources",
            119: "Machine is not on the network",
            120: "Package not installed",
            121: "The object is remote",
            122: "Advertise error",
            123: "Srmount error",
            124: "Communication error on send",
            125: "Cross mount point (not really error)",
            126: "Given log. name not unique",
            127: "f.d. invalid for this operation",
            128: "Remote address changed",
            129: "Can   access a needed shared lib",
            130: "Accessing a corrupted shared lib",
            131: ".lib section in a.out corrupted",
            132: "Attempting to link in too many libs",
            133: "Attempting to exec a shared library",
            135: "Streams pipe error",
            136: "Too many users",
            137: "Socket type not supported",
            138: "Not supported",
            139: "Protocol family not supported",
            140: "Can't send after socket shutdown",
            141: "Too many references",
            142: "Host is down",
            148: "No medium (in tape drive)",
            156: "Level 2 not synchronized"
        },
        ERRNO_CODES = {
            EPERM: 63,
            ENOENT: 44,
            ESRCH: 71,
            EINTR: 27,
            EIO: 29,
            ENXIO: 60,
            E2BIG: 1,
            ENOEXEC: 45,
            EBADF: 8,
            ECHILD: 12,
            EAGAIN: 6,
            EWOULDBLOCK: 6,
            ENOMEM: 48,
            EACCES: 2,
            EFAULT: 21,
            ENOTBLK: 105,
            EBUSY: 10,
            EEXIST: 20,
            EXDEV: 75,
            ENODEV: 43,
            ENOTDIR: 54,
            EISDIR: 31,
            EINVAL: 28,
            ENFILE: 41,
            EMFILE: 33,
            ENOTTY: 59,
            ETXTBSY: 74,
            EFBIG: 22,
            ENOSPC: 51,
            ESPIPE: 70,
            EROFS: 69,
            EMLINK: 34,
            EPIPE: 64,
            EDOM: 18,
            ERANGE: 68,
            ENOMSG: 49,
            EIDRM: 24,
            ECHRNG: 106,
            EL2NSYNC: 156,
            EL3HLT: 107,
            EL3RST: 108,
            ELNRNG: 109,
            EUNATCH: 110,
            ENOCSI: 111,
            EL2HLT: 112,
            EDEADLK: 16,
            ENOLCK: 46,
            EBADE: 113,
            EBADR: 114,
            EXFULL: 115,
            ENOANO: 104,
            EBADRQC: 103,
            EBADSLT: 102,
            EDEADLOCK: 16,
            EBFONT: 101,
            ENOSTR: 100,
            ENODATA: 116,
            ETIME: 117,
            ENOSR: 118,
            ENONET: 119,
            ENOPKG: 120,
            EREMOTE: 121,
            ENOLINK: 47,
            EADV: 122,
            ESRMNT: 123,
            ECOMM: 124,
            EPROTO: 65,
            EMULTIHOP: 36,
            EDOTDOT: 125,
            EBADMSG: 9,
            ENOTUNIQ: 126,
            EBADFD: 127,
            EREMCHG: 128,
            ELIBACC: 129,
            ELIBBAD: 130,
            ELIBSCN: 131,
            ELIBMAX: 132,
            ELIBEXEC: 133,
            ENOSYS: 52,
            ENOTEMPTY: 55,
            ENAMETOOLONG: 37,
            ELOOP: 32,
            EOPNOTSUPP: 138,
            EPFNOSUPPORT: 139,
            ECONNRESET: 15,
            ENOBUFS: 42,
            EAFNOSUPPORT: 5,
            EPROTOTYPE: 67,
            ENOTSOCK: 57,
            ENOPROTOOPT: 50,
            ESHUTDOWN: 140,
            ECONNREFUSED: 14,
            EADDRINUSE: 3,
            ECONNABORTED: 13,
            ENETUNREACH: 40,
            ENETDOWN: 38,
            ETIMEDOUT: 73,
            EHOSTDOWN: 142,
            EHOSTUNREACH: 23,
            EINPROGRESS: 26,
            EALREADY: 7,
            EDESTADDRREQ: 17,
            EMSGSIZE: 35,
            EPROTONOSUPPORT: 66,
            ESOCKTNOSUPPORT: 137,
            EADDRNOTAVAIL: 4,
            ENETRESET: 39,
            EISCONN: 30,
            ENOTCONN: 53,
            ETOOMANYREFS: 141,
            EUSERS: 136,
            EDQUOT: 19,
            ESTALE: 72,
            ENOTSUP: 138,
            ENOMEDIUM: 148,
            EILSEQ: 25,
            EOVERFLOW: 61,
            ECANCELED: 11,
            ENOTRECOVERABLE: 56,
            EOWNERDEAD: 62,
            ESTRPIPE: 135
        },
        FS = {
            root: null,
            mounts: [],
            devices: {},
            streams: [],
            nextInode: 1,
            nameTable: null,
            currentPath: "/",
            initialized: !1,
            ignorePermissions: !0,
            trackingDelegate: {},
            tracking: {
                openFlags: {
                    READ: 1,
                    WRITE: 2
                }
            },
            ErrnoError: null,
            genericErrors: {},
            filesystems: null,
            syncFSRequests: 0,
            handleFSError: function(e) {
                if (!(e instanceof FS.ErrnoError)) throw e + " : " + stackTrace();
                return setErrNo(e.errno)
            },
            lookupPath: function(e, t) {
                if (t = t || {}, !(e = PATH_FS.resolve(FS.cwd(), e))) return {
                    path: "",
                    node: null
                };
                var r = {
                    follow_mount: !0,
                    recurse_count: 0
                };
                for (var n in r) void 0 === t[n] && (t[n] = r[n]);
                if (t.recurse_count > 8) throw new FS.ErrnoError(32);
                for (var o = PATH.normalizeArray(e.split("/").filter((function(e) {
                        return !!e
                    })), !1), i = FS.root, a = "/", s = 0; s < o.length; s++) {
                    var c = s === o.length - 1;
                    if (c && t.parent) break;
                    if (i = FS.lookupNode(i, o[s]), a = PATH.join2(a, o[s]), FS.isMountpoint(i) && (!c || c && t.follow_mount) && (i = i.mounted.root), !c || t.follow)
                        for (var l = 0; FS.isLink(i.mode);) {
                            var u = FS.readlink(a);
                            if (a = PATH_FS.resolve(PATH.dirname(a), u), i = FS.lookupPath(a, {
                                    recurse_count: t.recurse_count
                                }).node, l++ > 40) throw new FS.ErrnoError(32)
                        }
                }
                return {
                    path: a,
                    node: i
                }
            },
            getPath: function(e) {
                for (var t;;) {
                    if (FS.isRoot(e)) {
                        var r = e.mount.mountpoint;
                        return t ? "/" !== r[r.length - 1] ? r + "/" + t : r + t : r
                    }
                    t = t ? e.name + "/" + t : e.name, e = e.parent
                }
            },
            hashName: function(e, t) {
                for (var r = 0, n = 0; n < t.length; n++) r = (r << 5) - r + t.charCodeAt(n) | 0;
                return (e + r >>> 0) % FS.nameTable.length
            },
            hashAddNode: function(e) {
                var t = FS.hashName(e.parent.id, e.name);
                e.name_next = FS.nameTable[t], FS.nameTable[t] = e
            },
            hashRemoveNode: function(e) {
                var t = FS.hashName(e.parent.id, e.name);
                if (FS.nameTable[t] === e) FS.nameTable[t] = e.name_next;
                else
                    for (var r = FS.nameTable[t]; r;) {
                        if (r.name_next === e) {
                            r.name_next = e.name_next;
                            break
                        }
                        r = r.name_next
                    }
            },
            lookupNode: function(e, t) {
                var r = FS.mayLookup(e);
                if (r) throw new FS.ErrnoError(r, e);
                for (var n = FS.hashName(e.id, t), o = FS.nameTable[n]; o; o = o.name_next) {
                    var i = o.name;
                    if (o.parent.id === e.id && i === t) return o
                }
                return FS.lookup(e, t)
            },
            createNode: function(e, t, r, n) {
                var o = new FS.FSNode(e, t, r, n);
                return FS.hashAddNode(o), o
            },
            destroyNode: function(e) {
                FS.hashRemoveNode(e)
            },
            isRoot: function(e) {
                return e === e.parent
            },
            isMountpoint: function(e) {
                return !!e.mounted
            },
            isFile: function(e) {
                return 32768 == (61440 & e)
            },
            isDir: function(e) {
                return 16384 == (61440 & e)
            },
            isLink: function(e) {
                return 40960 == (61440 & e)
            },
            isChrdev: function(e) {
                return 8192 == (61440 & e)
            },
            isBlkdev: function(e) {
                return 24576 == (61440 & e)
            },
            isFIFO: function(e) {
                return 4096 == (61440 & e)
            },
            isSocket: function(e) {
                return 49152 == (49152 & e)
            },
            flagModes: {
                r: 0,
                rs: 1052672,
                "r+": 2,
                w: 577,
                wx: 705,
                xw: 705,
                "w+": 578,
                "wx+": 706,
                "xw+": 706,
                a: 1089,
                ax: 1217,
                xa: 1217,
                "a+": 1090,
                "ax+": 1218,
                "xa+": 1218
            },
            modeStringToFlags: function(e) {
                var t = FS.flagModes[e];
                if (void 0 === t) throw new Error("Unknown file open mode: " + e);
                return t
            },
            flagsToPermissionString: function(e) {
                var t = ["r", "w", "rw"][3 & e];
                return 512 & e && (t += "w"), t
            },
            nodePermissions: function(e, t) {
                return FS.ignorePermissions || (-1 === t.indexOf("r") || 292 & e.mode) && (-1 === t.indexOf("w") || 146 & e.mode) && (-1 === t.indexOf("x") || 73 & e.mode) ? 0 : 2
            },
            mayLookup: function(e) {
                var t = FS.nodePermissions(e, "x");
                return t || (e.node_ops.lookup ? 0 : 2)
            },
            mayCreate: function(e, t) {
                try {
                    FS.lookupNode(e, t);
                    return 20
                } catch (e) {}
                return FS.nodePermissions(e, "wx")
            },
            mayDelete: function(e, t, r) {
                var n;
                try {
                    n = FS.lookupNode(e, t)
                } catch (e) {
                    return e.errno
                }
                var o = FS.nodePermissions(e, "wx");
                if (o) return o;
                if (r) {
                    if (!FS.isDir(n.mode)) return 54;
                    if (FS.isRoot(n) || FS.getPath(n) === FS.cwd()) return 10
                } else if (FS.isDir(n.mode)) return 31;
                return 0
            },
            mayOpen: function(e, t) {
                return e ? FS.isLink(e.mode) ? 32 : FS.isDir(e.mode) && ("r" !== FS.flagsToPermissionString(t) || 512 & t) ? 31 : FS.nodePermissions(e, FS.flagsToPermissionString(t)) : 44
            },
            MAX_OPEN_FDS: 4096,
            nextfd: function(e, t) {
                e = e || 0, t = t || FS.MAX_OPEN_FDS;
                for (var r = e; r <= t; r++)
                    if (!FS.streams[r]) return r;
                throw new FS.ErrnoError(33)
            },
            getStream: function(e) {
                return FS.streams[e]
            },
            createStream: function(e, t, r) {
                FS.FSStream || (FS.FSStream = function() {}, FS.FSStream.prototype = {
                    object: {
                        get: function() {
                            return this.node
                        },
                        set: function(e) {
                            this.node = e
                        }
                    },
                    isRead: {
                        get: function() {
                            return 1 != (2097155 & this.flags)
                        }
                    },
                    isWrite: {
                        get: function() {
                            return 0 != (2097155 & this.flags)
                        }
                    },
                    isAppend: {
                        get: function() {
                            return 1024 & this.flags
                        }
                    }
                });
                var n = new FS.FSStream;
                for (var o in e) n[o] = e[o];
                e = n;
                var i = FS.nextfd(t, r);
                return e.fd = i, FS.streams[i] = e, e
            },
            closeStream: function(e) {
                FS.streams[e] = null
            },
            chrdev_stream_ops: {
                open: function(e) {
                    var t = FS.getDevice(e.node.rdev);
                    e.stream_ops = t.stream_ops, e.stream_ops.open && e.stream_ops.open(e)
                },
                llseek: function() {
                    throw new FS.ErrnoError(70)
                }
            },
            major: function(e) {
                return e >> 8
            },
            minor: function(e) {
                return 255 & e
            },
            makedev: function(e, t) {
                return e << 8 | t
            },
            registerDevice: function(e, t) {
                FS.devices[e] = {
                    stream_ops: t
                }
            },
            getDevice: function(e) {
                return FS.devices[e]
            },
            getMounts: function(e) {
                for (var t = [], r = [e]; r.length;) {
                    var n = r.pop();
                    t.push(n), r.push.apply(r, n.mounts)
                }
                return t
            },
            syncfs: function(e, t) {
                "function" == typeof e && (t = e, e = !1), FS.syncFSRequests++, FS.syncFSRequests > 1 && err("warning: " + FS.syncFSRequests + " FS.syncfs operations in flight at once, probably just doing extra work");
                var r = FS.getMounts(FS.root.mount),
                    n = 0;

                function o(e) {
                    return assert(FS.syncFSRequests > 0), FS.syncFSRequests--, t(e)
                }

                function i(e) {
                    if (e) return i.errored ? void 0 : (i.errored = !0, o(e));
                    ++n >= r.length && o(null)
                }
                r.forEach((function(t) {
                    if (!t.type.syncfs) return i(null);
                    t.type.syncfs(t, e, i)
                }))
            },
            mount: function(e, t, r) {
                if ("string" == typeof e) throw e;
                var n, o = "/" === r,
                    i = !r;
                if (o && FS.root) throw new FS.ErrnoError(10);
                if (!o && !i) {
                    var a = FS.lookupPath(r, {
                        follow_mount: !1
                    });
                    if (r = a.path, n = a.node, FS.isMountpoint(n)) throw new FS.ErrnoError(10);
                    if (!FS.isDir(n.mode)) throw new FS.ErrnoError(54)
                }
                var s = {
                        type: e,
                        opts: t,
                        mountpoint: r,
                        mounts: []
                    },
                    c = e.mount(s);
                return c.mount = s, s.root = c, o ? FS.root = c : n && (n.mounted = s, n.mount && n.mount.mounts.push(s)), c
            },
            unmount: function(e) {
                var t = FS.lookupPath(e, {
                    follow_mount: !1
                });
                if (!FS.isMountpoint(t.node)) throw new FS.ErrnoError(28);
                var r = t.node,
                    n = r.mounted,
                    o = FS.getMounts(n);
                Object.keys(FS.nameTable).forEach((function(e) {
                    for (var t = FS.nameTable[e]; t;) {
                        var r = t.name_next; - 1 !== o.indexOf(t.mount) && FS.destroyNode(t), t = r
                    }
                })), r.mounted = null;
                var i = r.mount.mounts.indexOf(n);
                assert(-1 !== i), r.mount.mounts.splice(i, 1)
            },
            lookup: function(e, t) {
                return e.node_ops.lookup(e, t)
            },
            mknod: function(e, t, r) {
                var n = FS.lookupPath(e, {
                        parent: !0
                    }).node,
                    o = PATH.basename(e);
                if (!o || "." === o || ".." === o) throw new FS.ErrnoError(28);
                var i = FS.mayCreate(n, o);
                if (i) throw new FS.ErrnoError(i);
                if (!n.node_ops.mknod) throw new FS.ErrnoError(63);
                return n.node_ops.mknod(n, o, t, r)
            },
            create: function(e, t) {
                return t = void 0 !== t ? t : 438, t &= 4095, t |= 32768, FS.mknod(e, t, 0)
            },
            mkdir: function(e, t) {
                return t = void 0 !== t ? t : 511, t &= 1023, t |= 16384, FS.mknod(e, t, 0)
            },
            mkdirTree: function(e, t) {
                for (var r = e.split("/"), n = "", o = 0; o < r.length; ++o)
                    if (r[o]) {
                        n += "/" + r[o];
                        try {
                            FS.mkdir(n, t)
                        } catch (e) {
                            if (20 != e.errno) throw e
                        }
                    }
            },
            mkdev: function(e, t, r) {
                return void 0 === r && (r = t, t = 438), t |= 8192, FS.mknod(e, t, r)
            },
            symlink: function(e, t) {
                if (!PATH_FS.resolve(e)) throw new FS.ErrnoError(44);
                var r = FS.lookupPath(t, {
                    parent: !0
                }).node;
                if (!r) throw new FS.ErrnoError(44);
                var n = PATH.basename(t),
                    o = FS.mayCreate(r, n);
                if (o) throw new FS.ErrnoError(o);
                if (!r.node_ops.symlink) throw new FS.ErrnoError(63);
                return r.node_ops.symlink(r, n, e)
            },
            rename: function(e, t) {
                var r, n, o = PATH.dirname(e),
                    i = PATH.dirname(t),
                    a = PATH.basename(e),
                    s = PATH.basename(t);
                try {
                    r = FS.lookupPath(e, {
                        parent: !0
                    }).node, n = FS.lookupPath(t, {
                        parent: !0
                    }).node
                } catch (e) {
                    throw new FS.ErrnoError(10)
                }
                if (!r || !n) throw new FS.ErrnoError(44);
                if (r.mount !== n.mount) throw new FS.ErrnoError(75);
                var c, l = FS.lookupNode(r, a),
                    u = PATH_FS.relative(e, i);
                if ("." !== u.charAt(0)) throw new FS.ErrnoError(28);
                if ("." !== (u = PATH_FS.relative(t, o)).charAt(0)) throw new FS.ErrnoError(55);
                try {
                    c = FS.lookupNode(n, s)
                } catch (e) {}
                if (l !== c) {
                    var d = FS.isDir(l.mode),
                        _ = FS.mayDelete(r, a, d);
                    if (_) throw new FS.ErrnoError(_);
                    if (_ = c ? FS.mayDelete(n, s, d) : FS.mayCreate(n, s)) throw new FS.ErrnoError(_);
                    if (!r.node_ops.rename) throw new FS.ErrnoError(63);
                    if (FS.isMountpoint(l) || c && FS.isMountpoint(c)) throw new FS.ErrnoError(10);
                    if (n !== r && (_ = FS.nodePermissions(r, "w"))) throw new FS.ErrnoError(_);
                    try {
                        FS.trackingDelegate.willMovePath && FS.trackingDelegate.willMovePath(e, t)
                    } catch (r) {
                        err("FS.trackingDelegate['willMovePath']('" + e + "', '" + t + "') threw an exception: " + r.message)
                    }
                    FS.hashRemoveNode(l);
                    try {
                        r.node_ops.rename(l, n, s)
                    } catch (e) {
                        throw e
                    } finally {
                        FS.hashAddNode(l)
                    }
                    try {
                        FS.trackingDelegate.onMovePath && FS.trackingDelegate.onMovePath(e, t)
                    } catch (r) {
                        err("FS.trackingDelegate['onMovePath']('" + e + "', '" + t + "') threw an exception: " + r.message)
                    }
                }
            },
            rmdir: function(e) {
                var t = FS.lookupPath(e, {
                        parent: !0
                    }).node,
                    r = PATH.basename(e),
                    n = FS.lookupNode(t, r),
                    o = FS.mayDelete(t, r, !0);
                if (o) throw new FS.ErrnoError(o);
                if (!t.node_ops.rmdir) throw new FS.ErrnoError(63);
                if (FS.isMountpoint(n)) throw new FS.ErrnoError(10);
                try {
                    FS.trackingDelegate.willDeletePath && FS.trackingDelegate.willDeletePath(e)
                } catch (t) {
                    err("FS.trackingDelegate['willDeletePath']('" + e + "') threw an exception: " + t.message)
                }
                t.node_ops.rmdir(t, r), FS.destroyNode(n);
                try {
                    FS.trackingDelegate.onDeletePath && FS.trackingDelegate.onDeletePath(e)
                } catch (t) {
                    err("FS.trackingDelegate['onDeletePath']('" + e + "') threw an exception: " + t.message)
                }
            },
            readdir: function(e) {
                var t = FS.lookupPath(e, {
                    follow: !0
                }).node;
                if (!t.node_ops.readdir) throw new FS.ErrnoError(54);
                return t.node_ops.readdir(t)
            },
            unlink: function(e) {
                var t = FS.lookupPath(e, {
                        parent: !0
                    }).node,
                    r = PATH.basename(e),
                    n = FS.lookupNode(t, r),
                    o = FS.mayDelete(t, r, !1);
                if (o) throw new FS.ErrnoError(o);
                if (!t.node_ops.unlink) throw new FS.ErrnoError(63);
                if (FS.isMountpoint(n)) throw new FS.ErrnoError(10);
                try {
                    FS.trackingDelegate.willDeletePath && FS.trackingDelegate.willDeletePath(e)
                } catch (t) {
                    err("FS.trackingDelegate['willDeletePath']('" + e + "') threw an exception: " + t.message)
                }
                t.node_ops.unlink(t, r), FS.destroyNode(n);
                try {
                    FS.trackingDelegate.onDeletePath && FS.trackingDelegate.onDeletePath(e)
                } catch (t) {
                    err("FS.trackingDelegate['onDeletePath']('" + e + "') threw an exception: " + t.message)
                }
            },
            readlink: function(e) {
                var t = FS.lookupPath(e).node;
                if (!t) throw new FS.ErrnoError(44);
                if (!t.node_ops.readlink) throw new FS.ErrnoError(28);
                return PATH_FS.resolve(FS.getPath(t.parent), t.node_ops.readlink(t))
            },
            stat: function(e, t) {
                var r = FS.lookupPath(e, {
                    follow: !t
                }).node;
                if (!r) throw new FS.ErrnoError(44);
                if (!r.node_ops.getattr) throw new FS.ErrnoError(63);
                return r.node_ops.getattr(r)
            },
            lstat: function(e) {
                return FS.stat(e, !0)
            },
            chmod: function(e, t, r) {
                var n;
                "string" == typeof e ? n = FS.lookupPath(e, {
                    follow: !r
                }).node : n = e;
                if (!n.node_ops.setattr) throw new FS.ErrnoError(63);
                n.node_ops.setattr(n, {
                    mode: 4095 & t | -4096 & n.mode,
                    timestamp: Date.now()
                })
            },
            lchmod: function(e, t) {
                FS.chmod(e, t, !0)
            },
            fchmod: function(e, t) {
                var r = FS.getStream(e);
                if (!r) throw new FS.ErrnoError(8);
                FS.chmod(r.node, t)
            },
            chown: function(e, t, r, n) {
                var o;
                "string" == typeof e ? o = FS.lookupPath(e, {
                    follow: !n
                }).node : o = e;
                if (!o.node_ops.setattr) throw new FS.ErrnoError(63);
                o.node_ops.setattr(o, {
                    timestamp: Date.now()
                })
            },
            lchown: function(e, t, r) {
                FS.chown(e, t, r, !0)
            },
            fchown: function(e, t, r) {
                var n = FS.getStream(e);
                if (!n) throw new FS.ErrnoError(8);
                FS.chown(n.node, t, r)
            },
            truncate: function(e, t) {
                if (t < 0) throw new FS.ErrnoError(28);
                var r;
                "string" == typeof e ? r = FS.lookupPath(e, {
                    follow: !0
                }).node : r = e;
                if (!r.node_ops.setattr) throw new FS.ErrnoError(63);
                if (FS.isDir(r.mode)) throw new FS.ErrnoError(31);
                if (!FS.isFile(r.mode)) throw new FS.ErrnoError(28);
                var n = FS.nodePermissions(r, "w");
                if (n) throw new FS.ErrnoError(n);
                r.node_ops.setattr(r, {
                    size: t,
                    timestamp: Date.now()
                })
            },
            ftruncate: function(e, t) {
                var r = FS.getStream(e);
                if (!r) throw new FS.ErrnoError(8);
                if (0 == (2097155 & r.flags)) throw new FS.ErrnoError(28);
                FS.truncate(r.node, t)
            },
            utime: function(e, t, r) {
                var n = FS.lookupPath(e, {
                    follow: !0
                }).node;
                n.node_ops.setattr(n, {
                    timestamp: Math.max(t, r)
                })
            },
            open: function(e, t, r, n, o) {
                if ("" === e) throw new FS.ErrnoError(44);
                var i;
                if (r = void 0 === r ? 438 : r, r = 64 & (t = "string" == typeof t ? FS.modeStringToFlags(t) : t) ? 4095 & r | 32768 : 0, "object" == typeof e) i = e;
                else {
                    e = PATH.normalize(e);
                    try {
                        i = FS.lookupPath(e, {
                            follow: !(131072 & t)
                        }).node
                    } catch (e) {}
                }
                var a = !1;
                if (64 & t)
                    if (i) {
                        if (128 & t) throw new FS.ErrnoError(20)
                    } else i = FS.mknod(e, r, 0), a = !0;
                if (!i) throw new FS.ErrnoError(44);
                if (FS.isChrdev(i.mode) && (t &= -513), 65536 & t && !FS.isDir(i.mode)) throw new FS.ErrnoError(54);
                if (!a) {
                    var s = FS.mayOpen(i, t);
                    if (s) throw new FS.ErrnoError(s)
                }
                512 & t && FS.truncate(i, 0), t &= -131713;
                var c = FS.createStream({
                    node: i,
                    path: FS.getPath(i),
                    flags: t,
                    seekable: !0,
                    position: 0,
                    stream_ops: i.stream_ops,
                    ungotten: [],
                    error: !1
                }, n, o);
                c.stream_ops.open && c.stream_ops.open(c), !Module.logReadFiles || 1 & t || (FS.readFiles || (FS.readFiles = {}), e in FS.readFiles || (FS.readFiles[e] = 1, err("FS.trackingDelegate error on read file: " + e)));
                try {
                    if (FS.trackingDelegate.onOpenFile) {
                        var l = 0;
                        1 != (2097155 & t) && (l |= FS.tracking.openFlags.READ), 0 != (2097155 & t) && (l |= FS.tracking.openFlags.WRITE), FS.trackingDelegate.onOpenFile(e, l)
                    }
                } catch (t) {
                    err("FS.trackingDelegate['onOpenFile']('" + e + "', flags) threw an exception: " + t.message)
                }
                return c
            },
            close: function(e) {
                if (FS.isClosed(e)) throw new FS.ErrnoError(8);
                e.getdents && (e.getdents = null);
                try {
                    e.stream_ops.close && e.stream_ops.close(e)
                } catch (e) {
                    throw e
                } finally {
                    FS.closeStream(e.fd)
                }
                e.fd = null
            },
            isClosed: function(e) {
                return null === e.fd
            },
            llseek: function(e, t, r) {
                if (FS.isClosed(e)) throw new FS.ErrnoError(8);
                if (!e.seekable || !e.stream_ops.llseek) throw new FS.ErrnoError(70);
                if (0 != r && 1 != r && 2 != r) throw new FS.ErrnoError(28);
                return e.position = e.stream_ops.llseek(e, t, r), e.ungotten = [], e.position
            },
            read: function(e, t, r, n, o) {
                if (n < 0 || o < 0) throw new FS.ErrnoError(28);
                if (FS.isClosed(e)) throw new FS.ErrnoError(8);
                if (1 == (2097155 & e.flags)) throw new FS.ErrnoError(8);
                if (FS.isDir(e.node.mode)) throw new FS.ErrnoError(31);
                if (!e.stream_ops.read) throw new FS.ErrnoError(28);
                var i = void 0 !== o;
                if (i) {
                    if (!e.seekable) throw new FS.ErrnoError(70)
                } else o = e.position;
                var a = e.stream_ops.read(e, t, r, n, o);
                return i || (e.position += a), a
            },
            write: function(e, t, r, n, o, i) {
                if (n < 0 || o < 0) throw new FS.ErrnoError(28);
                if (FS.isClosed(e)) throw new FS.ErrnoError(8);
                if (0 == (2097155 & e.flags)) throw new FS.ErrnoError(8);
                if (FS.isDir(e.node.mode)) throw new FS.ErrnoError(31);
                if (!e.stream_ops.write) throw new FS.ErrnoError(28);
                e.seekable && 1024 & e.flags && FS.llseek(e, 0, 2);
                var a = void 0 !== o;
                if (a) {
                    if (!e.seekable) throw new FS.ErrnoError(70)
                } else o = e.position;
                var s = e.stream_ops.write(e, t, r, n, o, i);
                a || (e.position += s);
                try {
                    e.path && FS.trackingDelegate.onWriteToFile && FS.trackingDelegate.onWriteToFile(e.path)
                } catch (t) {
                    err("FS.trackingDelegate['onWriteToFile']('" + e.path + "') threw an exception: " + t.message)
                }
                return s
            },
            allocate: function(e, t, r) {
                if (FS.isClosed(e)) throw new FS.ErrnoError(8);
                if (t < 0 || r <= 0) throw new FS.ErrnoError(28);
                if (0 == (2097155 & e.flags)) throw new FS.ErrnoError(8);
                if (!FS.isFile(e.node.mode) && !FS.isDir(e.node.mode)) throw new FS.ErrnoError(43);
                if (!e.stream_ops.allocate) throw new FS.ErrnoError(138);
                e.stream_ops.allocate(e, t, r)
            },
            mmap: function(e, t, r, n, o, i) {
                if (0 != (2 & o) && 0 == (2 & i) && 2 != (2097155 & e.flags)) throw new FS.ErrnoError(2);
                if (1 == (2097155 & e.flags)) throw new FS.ErrnoError(2);
                if (!e.stream_ops.mmap) throw new FS.ErrnoError(43);
                return e.stream_ops.mmap(e, t, r, n, o, i)
            },
            msync: function(e, t, r, n, o) {
                return e && e.stream_ops.msync ? e.stream_ops.msync(e, t, r, n, o) : 0
            },
            munmap: function(e) {
                return 0
            },
            ioctl: function(e, t, r) {
                if (!e.stream_ops.ioctl) throw new FS.ErrnoError(59);
                return e.stream_ops.ioctl(e, t, r)
            },
            readFile: function(e, t) {
                if ((t = t || {}).flags = t.flags || "r", t.encoding = t.encoding || "binary", "utf8" !== t.encoding && "binary" !== t.encoding) throw new Error('Invalid encoding type "' + t.encoding + '"');
                var r, n = FS.open(e, t.flags),
                    o = FS.stat(e).size,
                    i = new Uint8Array(o);
                return FS.read(n, i, 0, o, 0), "utf8" === t.encoding ? r = UTF8ArrayToString(i, 0) : "binary" === t.encoding && (r = i), FS.close(n), r
            },
            writeFile: function(e, t, r) {
                (r = r || {}).flags = r.flags || "w";
                var n = FS.open(e, r.flags, r.mode);
                if ("string" == typeof t) {
                    var o = new Uint8Array(lengthBytesUTF8(t) + 1),
                        i = stringToUTF8Array(t, o, 0, o.length);
                    FS.write(n, o, 0, i, void 0, r.canOwn)
                } else {
                    if (!ArrayBuffer.isView(t)) throw new Error("Unsupported data type");
                    FS.write(n, t, 0, t.byteLength, void 0, r.canOwn)
                }
                FS.close(n)
            },
            cwd: function() {
                return FS.currentPath
            },
            chdir: function(e) {
                var t = FS.lookupPath(e, {
                    follow: !0
                });
                if (null === t.node) throw new FS.ErrnoError(44);
                if (!FS.isDir(t.node.mode)) throw new FS.ErrnoError(54);
                var r = FS.nodePermissions(t.node, "x");
                if (r) throw new FS.ErrnoError(r);
                FS.currentPath = t.path
            },
            createDefaultDirectories: function() {
                FS.mkdir("/tmp"), FS.mkdir("/home"), FS.mkdir("/home/web_user")
            },
            createDefaultDevices: function() {
                var e;
                if (FS.mkdir("/dev"), FS.registerDevice(FS.makedev(1, 3), {
                        read: function() {
                            return 0
                        },
                        write: function(e, t, r, n, o) {
                            return n
                        }
                    }), FS.mkdev("/dev/null", FS.makedev(1, 3)), TTY.register(FS.makedev(5, 0), TTY.default_tty_ops), TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops), FS.mkdev("/dev/tty", FS.makedev(5, 0)), FS.mkdev("/dev/tty1", FS.makedev(6, 0)), "object" == typeof crypto && "function" == typeof crypto.getRandomValues) {
                    var t = new Uint8Array(1);
                    e = function() {
                        return crypto.getRandomValues(t), t[0]
                    }
                } else if (ENVIRONMENT_IS_NODE) try {
                    var r = require("crypto");
                    e = function() {
                        return r.randomBytes(1)[0]
                    }
                } catch (e) {}
                e || (e = function() {
                    abort("no cryptographic support found for random_device. consider polyfilling it if you want to use something insecure like Math.random(), e.g. put this in a --pre-js: var crypto = { getRandomValues: function(array) { for (var i = 0; i < array.length; i++) array[i] = (Math.random()*256)|0 } };")
                }), FS.createDevice("/dev", "random", e), FS.createDevice("/dev", "urandom", e), FS.mkdir("/dev/shm"), FS.mkdir("/dev/shm/tmp")
            },
            createSpecialDirectories: function() {
                FS.mkdir("/proc"), FS.mkdir("/proc/self"), FS.mkdir("/proc/self/fd"), FS.mount({
                    mount: function() {
                        var e = FS.createNode("/proc/self", "fd", 16895, 73);
                        return e.node_ops = {
                            lookup: function(e, t) {
                                var r = +t,
                                    n = FS.getStream(r);
                                if (!n) throw new FS.ErrnoError(8);
                                var o = {
                                    parent: null,
                                    mount: {
                                        mountpoint: "fake"
                                    },
                                    node_ops: {
                                        readlink: function() {
                                            return n.path
                                        }
                                    }
                                };
                                return o.parent = o, o
                            }
                        }, e
                    }
                }, {}, "/proc/self/fd")
            },
            createStandardStreams: function() {
                Module.stdin ? FS.createDevice("/dev", "stdin", Module.stdin) : FS.symlink("/dev/tty", "/dev/stdin"), Module.stdout ? FS.createDevice("/dev", "stdout", null, Module.stdout) : FS.symlink("/dev/tty", "/dev/stdout"), Module.stderr ? FS.createDevice("/dev", "stderr", null, Module.stderr) : FS.symlink("/dev/tty1", "/dev/stderr");
                var e = FS.open("/dev/stdin", "r"),
                    t = FS.open("/dev/stdout", "w"),
                    r = FS.open("/dev/stderr", "w");
                assert(0 === e.fd, "invalid handle for stdin (" + e.fd + ")"), assert(1 === t.fd, "invalid handle for stdout (" + t.fd + ")"), assert(2 === r.fd, "invalid handle for stderr (" + r.fd + ")")
            },
            ensureErrnoError: function() {
                FS.ErrnoError || (FS.ErrnoError = function(e, t) {
                    this.node = t, this.setErrno = function(e) {
                        for (var t in this.errno = e, ERRNO_CODES)
                            if (ERRNO_CODES[t] === e) {
                                this.code = t;
                                break
                            }
                    }, this.setErrno(e), this.message = ERRNO_MESSAGES[e], this.stack && (Object.defineProperty(this, "stack", {
                        value: (new Error).stack,
                        writable: !0
                    }), this.stack = demangleAll(this.stack))
                }, FS.ErrnoError.prototype = new Error, FS.ErrnoError.prototype.constructor = FS.ErrnoError, [44].forEach((function(e) {
                    FS.genericErrors[e] = new FS.ErrnoError(e), FS.genericErrors[e].stack = "<generic error, no stack>"
                })))
            },
            staticInit: function() {
                FS.ensureErrnoError(), FS.nameTable = new Array(4096), FS.mount(MEMFS, {}, "/"), FS.createDefaultDirectories(), FS.createDefaultDevices(), FS.createSpecialDirectories(), FS.filesystems = {
                    MEMFS: MEMFS
                }
            },
            init: function(e, t, r) {
                assert(!FS.init.initialized, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)"), FS.init.initialized = !0, FS.ensureErrnoError(), Module.stdin = e || Module.stdin, Module.stdout = t || Module.stdout, Module.stderr = r || Module.stderr, FS.createStandardStreams()
            },
            quit: function() {
                FS.init.initialized = !1;
                var e = Module._fflush;
                e && e(0);
                for (var t = 0; t < FS.streams.length; t++) {
                    var r = FS.streams[t];
                    r && FS.close(r)
                }
            },
            getMode: function(e, t) {
                var r = 0;
                return e && (r |= 365), t && (r |= 146), r
            },
            joinPath: function(e, t) {
                var r = PATH.join.apply(null, e);
                return t && "/" == r[0] && (r = r.substr(1)), r
            },
            absolutePath: function(e, t) {
                return PATH_FS.resolve(t, e)
            },
            standardizePath: function(e) {
                return PATH.normalize(e)
            },
            findObject: function(e, t) {
                var r = FS.analyzePath(e, t);
                return r.exists ? r.object : (setErrNo(r.error), null)
            },
            analyzePath: function(e, t) {
                try {
                    e = (n = FS.lookupPath(e, {
                        follow: !t
                    })).path
                } catch (e) {}
                var r = {
                    isRoot: !1,
                    exists: !1,
                    error: 0,
                    name: null,
                    path: null,
                    object: null,
                    parentExists: !1,
                    parentPath: null,
                    parentObject: null
                };
                try {
                    var n = FS.lookupPath(e, {
                        parent: !0
                    });
                    r.parentExists = !0, r.parentPath = n.path, r.parentObject = n.node, r.name = PATH.basename(e), n = FS.lookupPath(e, {
                        follow: !t
                    }), r.exists = !0, r.path = n.path, r.object = n.node, r.name = n.node.name, r.isRoot = "/" === n.path
                } catch (e) {
                    r.error = e.errno
                }
                return r
            },
            createFolder: function(e, t, r, n) {
                var o = PATH.join2("string" == typeof e ? e : FS.getPath(e), t),
                    i = FS.getMode(r, n);
                return FS.mkdir(o, i)
            },
            createPath: function(e, t, r, n) {
                e = "string" == typeof e ? e : FS.getPath(e);
                for (var o = t.split("/").reverse(); o.length;) {
                    var i = o.pop();
                    if (i) {
                        var a = PATH.join2(e, i);
                        try {
                            FS.mkdir(a)
                        } catch (e) {}
                        e = a
                    }
                }
                return a
            },
            createFile: function(e, t, r, n, o) {
                var i = PATH.join2("string" == typeof e ? e : FS.getPath(e), t),
                    a = FS.getMode(n, o);
                return FS.create(i, a)
            },
            createDataFile: function(e, t, r, n, o, i) {
                var a = t ? PATH.join2("string" == typeof e ? e : FS.getPath(e), t) : e,
                    s = FS.getMode(n, o),
                    c = FS.create(a, s);
                if (r) {
                    if ("string" == typeof r) {
                        for (var l = new Array(r.length), u = 0, d = r.length; u < d; ++u) l[u] = r.charCodeAt(u);
                        r = l
                    }
                    FS.chmod(c, 146 | s);
                    var _ = FS.open(c, "w");
                    FS.write(_, r, 0, r.length, 0, i), FS.close(_), FS.chmod(c, s)
                }
                return c
            },
            createDevice: function(e, t, r, n) {
                var o = PATH.join2("string" == typeof e ? e : FS.getPath(e), t),
                    i = FS.getMode(!!r, !!n);
                FS.createDevice.major || (FS.createDevice.major = 64);
                var a = FS.makedev(FS.createDevice.major++, 0);
                return FS.registerDevice(a, {
                    open: function(e) {
                        e.seekable = !1
                    },
                    close: function(e) {
                        n && n.buffer && n.buffer.length && n(10)
                    },
                    read: function(e, t, n, o, i) {
                        for (var a = 0, s = 0; s < o; s++) {
                            var c;
                            try {
                                c = r()
                            } catch (e) {
                                throw new FS.ErrnoError(29)
                            }
                            if (void 0 === c && 0 === a) throw new FS.ErrnoError(6);
                            if (null == c) break;
                            a++, t[n + s] = c
                        }
                        return a && (e.node.timestamp = Date.now()), a
                    },
                    write: function(e, t, r, o, i) {
                        for (var a = 0; a < o; a++) try {
                            n(t[r + a])
                        } catch (e) {
                            throw new FS.ErrnoError(29)
                        }
                        return o && (e.node.timestamp = Date.now()), a
                    }
                }), FS.mkdev(o, i, a)
            },
            createLink: function(e, t, r, n, o) {
                var i = PATH.join2("string" == typeof e ? e : FS.getPath(e), t);
                return FS.symlink(r, i)
            },
            forceLoadFile: function(e) {
                if (e.isDevice || e.isFolder || e.link || e.contents) return !0;
                var t = !0;
                if ("undefined" != typeof XMLHttpRequest) throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
                if (!read_) throw new Error("Cannot load without read() or XMLHttpRequest.");
                try {
                    e.contents = intArrayFromString(read_(e.url), !0), e.usedBytes = e.contents.length
                } catch (e) {
                    t = !1
                }
                return t || setErrNo(29), t
            },
            createLazyFile: function(e, t, r, n, o) {
                function i() {
                    this.lengthKnown = !1, this.chunks = []
                }
                if (i.prototype.get = function(e) {
                        if (!(e > this.length - 1 || e < 0)) {
                            var t = e % this.chunkSize,
                                r = e / this.chunkSize | 0;
                            return this.getter(r)[t]
                        }
                    }, i.prototype.setDataGetter = function(e) {
                        this.getter = e
                    }, i.prototype.cacheLength = function() {
                        var e = new XMLHttpRequest;
                        if (e.open("HEAD", r, !1), e.send(null), !(e.status >= 200 && e.status < 300 || 304 === e.status)) throw new Error("Couldn't load " + r + ". Status: " + e.status);
                        var t, n = Number(e.getResponseHeader("Content-length")),
                            o = (t = e.getResponseHeader("Accept-Ranges")) && "bytes" === t,
                            i = (t = e.getResponseHeader("Content-Encoding")) && "gzip" === t,
                            a = 1048576;
                        o || (a = n);
                        var s = this;
                        s.setDataGetter((function(e) {
                            var t = e * a,
                                o = (e + 1) * a - 1;
                            if (o = Math.min(o, n - 1), void 0 === s.chunks[e] && (s.chunks[e] = function(e, t) {
                                    if (e > t) throw new Error("invalid range (" + e + ", " + t + ") or no bytes requested!");
                                    if (t > n - 1) throw new Error("only " + n + " bytes available! programmer error!");
                                    var o = new XMLHttpRequest;
                                    if (o.open("GET", r, !1), n !== a && o.setRequestHeader("Range", "bytes=" + e + "-" + t), "undefined" != typeof Uint8Array && (o.responseType = "arraybuffer"), o.overrideMimeType && o.overrideMimeType("text/plain; charset=x-user-defined"), o.send(null), !(o.status >= 200 && o.status < 300 || 304 === o.status)) throw new Error("Couldn't load " + r + ". Status: " + o.status);
                                    return void 0 !== o.response ? new Uint8Array(o.response || []) : intArrayFromString(o.responseText || "", !0)
                                }(t, o)), void 0 === s.chunks[e]) throw new Error("doXHR failed!");
                            return s.chunks[e]
                        })), !i && n || (a = n = 1, n = this.getter(0).length, a = n, out("LazyFiles on gzip forces download of the whole file when length is accessed")), this._length = n, this._chunkSize = a, this.lengthKnown = !0
                    }, "undefined" != typeof XMLHttpRequest) {
                    if (!ENVIRONMENT_IS_WORKER) throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
                    var a = new i;
                    Object.defineProperties(a, {
                        length: {
                            get: function() {
                                return this.lengthKnown || this.cacheLength(), this._length
                            }
                        },
                        chunkSize: {
                            get: function() {
                                return this.lengthKnown || this.cacheLength(), this._chunkSize
                            }
                        }
                    });
                    var s = {
                        isDevice: !1,
                        contents: a
                    }
                } else s = {
                    isDevice: !1,
                    url: r
                };
                var c = FS.createFile(e, t, s, n, o);
                s.contents ? c.contents = s.contents : s.url && (c.contents = null, c.url = s.url), Object.defineProperties(c, {
                    usedBytes: {
                        get: function() {
                            return this.contents.length
                        }
                    }
                });
                var l = {};
                return Object.keys(c.stream_ops).forEach((function(e) {
                    var t = c.stream_ops[e];
                    l[e] = function() {
                        if (!FS.forceLoadFile(c)) throw new FS.ErrnoError(29);
                        return t.apply(null, arguments)
                    }
                })), l.read = function(e, t, r, n, o) {
                    if (!FS.forceLoadFile(c)) throw new FS.ErrnoError(29);
                    var i = e.node.contents;
                    if (o >= i.length) return 0;
                    var a = Math.min(i.length - o, n);
                    if (assert(a >= 0), i.slice)
                        for (var s = 0; s < a; s++) t[r + s] = i[o + s];
                    else
                        for (s = 0; s < a; s++) t[r + s] = i.get(o + s);
                    return a
                }, c.stream_ops = l, c
            },
            createPreloadedFile: function(e, t, r, n, o, i, a, s, c, l) {
                Browser.init();
                var u = t ? PATH_FS.resolve(PATH.join2(e, t)) : e,
                    d = getUniqueRunDependency("cp " + u);

                function _(r) {
                    function _(r) {
                        l && l(), s || FS.createDataFile(e, t, r, n, o, c), i && i(), removeRunDependency(d)
                    }
                    var f = !1;
                    Module.preloadPlugins.forEach((function(e) {
                        f || e.canHandle(u) && (e.handle(r, u, _, (function() {
                            a && a(), removeRunDependency(d)
                        })), f = !0)
                    })), f || _(r)
                }
                addRunDependency(d), "string" == typeof r ? Browser.asyncLoad(r, (function(e) {
                    _(e)
                }), a) : _(r)
            },
            indexedDB: function() {
                return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
            },
            DB_NAME: function() {
                return "EM_FS_" + window.location.pathname
            },
            DB_VERSION: 20,
            DB_STORE_NAME: "FILE_DATA",
            saveFilesToDB: function(e, t, r) {
                t = t || function() {}, r = r || function() {};
                var n = FS.indexedDB();
                try {
                    var o = n.open(FS.DB_NAME(), FS.DB_VERSION)
                } catch (e) {
                    return r(e)
                }
                o.onupgradeneeded = function() {
                    out("creating db"), o.result.createObjectStore(FS.DB_STORE_NAME)
                }, o.onsuccess = function() {
                    var n = o.result.transaction([FS.DB_STORE_NAME], "readwrite"),
                        i = n.objectStore(FS.DB_STORE_NAME),
                        a = 0,
                        s = 0,
                        c = e.length;

                    function l() {
                        0 == s ? t() : r()
                    }
                    e.forEach((function(e) {
                        var t = i.put(FS.analyzePath(e).object.contents, e);
                        t.onsuccess = function() {
                            ++a + s == c && l()
                        }, t.onerror = function() {
                            s++, a + s == c && l()
                        }
                    })), n.onerror = r
                }, o.onerror = r
            },
            loadFilesFromDB: function(e, t, r) {
                t = t || function() {}, r = r || function() {};
                var n = FS.indexedDB();
                try {
                    var o = n.open(FS.DB_NAME(), FS.DB_VERSION)
                } catch (e) {
                    return r(e)
                }
                o.onupgradeneeded = r, o.onsuccess = function() {
                    var n = o.result;
                    try {
                        var i = n.transaction([FS.DB_STORE_NAME], "readonly")
                    } catch (e) {
                        return void r(e)
                    }
                    var a = i.objectStore(FS.DB_STORE_NAME),
                        s = 0,
                        c = 0,
                        l = e.length;

                    function u() {
                        0 == c ? t() : r()
                    }
                    e.forEach((function(e) {
                        var t = a.get(e);
                        t.onsuccess = function() {
                            FS.analyzePath(e).exists && FS.unlink(e), FS.createDataFile(PATH.dirname(e), PATH.basename(e), t.result, !0, !0, !0), ++s + c == l && u()
                        }, t.onerror = function() {
                            c++, s + c == l && u()
                        }
                    })), i.onerror = r
                }, o.onerror = r
            }
        },
        SYSCALLS = {
            mappings: {},
            DEFAULT_POLLMASK: 5,
            umask: 511,
            calculateAt: function(e, t) {
                if ("/" !== t[0]) {
                    var r;
                    if (-100 === e) r = FS.cwd();
                    else {
                        var n = FS.getStream(e);
                        if (!n) throw new FS.ErrnoError(8);
                        r = n.path
                    }
                    t = PATH.join2(r, t)
                }
                return t
            },
            doStat: function(e, t, r) {
                try {
                    var n = e(t)
                } catch (e) {
                    if (e && e.node && PATH.normalize(t) !== PATH.normalize(FS.getPath(e.node))) return -54;
                    throw e
                }
                return HEAP32[r >> 2] = n.dev, HEAP32[r + 4 >> 2] = 0, HEAP32[r + 8 >> 2] = n.ino, HEAP32[r + 12 >> 2] = n.mode, HEAP32[r + 16 >> 2] = n.nlink, HEAP32[r + 20 >> 2] = n.uid, HEAP32[r + 24 >> 2] = n.gid, HEAP32[r + 28 >> 2] = n.rdev, HEAP32[r + 32 >> 2] = 0, tempI64 = [n.size >>> 0, (tempDouble = n.size, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (0 | Math_min(+Math_floor(tempDouble / 4294967296), 4294967295)) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[r + 40 >> 2] = tempI64[0], HEAP32[r + 44 >> 2] = tempI64[1], HEAP32[r + 48 >> 2] = 4096, HEAP32[r + 52 >> 2] = n.blocks, HEAP32[r + 56 >> 2] = n.atime.getTime() / 1e3 | 0, HEAP32[r + 60 >> 2] = 0, HEAP32[r + 64 >> 2] = n.mtime.getTime() / 1e3 | 0, HEAP32[r + 68 >> 2] = 0, HEAP32[r + 72 >> 2] = n.ctime.getTime() / 1e3 | 0, HEAP32[r + 76 >> 2] = 0, tempI64 = [n.ino >>> 0, (tempDouble = n.ino, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (0 | Math_min(+Math_floor(tempDouble / 4294967296), 4294967295)) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[r + 80 >> 2] = tempI64[0], HEAP32[r + 84 >> 2] = tempI64[1], 0
            },
            doMsync: function(e, t, r, n, o) {
                var i = HEAPU8.slice(e, e + r);
                FS.msync(t, i, o, r, n)
            },
            doMkdir: function(e, t) {
                return "/" === (e = PATH.normalize(e))[e.length - 1] && (e = e.substr(0, e.length - 1)), FS.mkdir(e, t, 0), 0
            },
            doMknod: function(e, t, r) {
                switch (61440 & t) {
                    case 32768:
                    case 8192:
                    case 24576:
                    case 4096:
                    case 49152:
                        break;
                    default:
                        return -28
                }
                return FS.mknod(e, t, r), 0
            },
            doReadlink: function(e, t, r) {
                if (r <= 0) return -28;
                var n = FS.readlink(e),
                    o = Math.min(r, lengthBytesUTF8(n)),
                    i = HEAP8[t + o];
                return stringToUTF8(n, t, r + 1), HEAP8[t + o] = i, o
            },
            doAccess: function(e, t) {
                if (-8 & t) return -28;
                var r;
                if (!(r = FS.lookupPath(e, {
                        follow: !0
                    }).node)) return -44;
                var n = "";
                return 4 & t && (n += "r"), 2 & t && (n += "w"), 1 & t && (n += "x"), n && FS.nodePermissions(r, n) ? -2 : 0
            },
            doDup: function(e, t, r) {
                var n = FS.getStream(r);
                return n && FS.close(n), FS.open(e, t, 0, r, r).fd
            },
            doReadv: function(e, t, r, n) {
                for (var o = 0, i = 0; i < r; i++) {
                    var a = HEAP32[t + 8 * i >> 2],
                        s = HEAP32[t + (8 * i + 4) >> 2],
                        c = FS.read(e, HEAP8, a, s, n);
                    if (c < 0) return -1;
                    if (o += c, c < s) break
                }
                return o
            },
            doWritev: function(e, t, r, n) {
                for (var o = 0, i = 0; i < r; i++) {
                    var a = HEAP32[t + 8 * i >> 2],
                        s = HEAP32[t + (8 * i + 4) >> 2],
                        c = FS.write(e, HEAP8, a, s, n);
                    if (c < 0) return -1;
                    o += c
                }
                return o
            },
            varargs: void 0,
            get: function() {
                return assert(null != SYSCALLS.varargs), SYSCALLS.varargs += 4, HEAP32[SYSCALLS.varargs - 4 >> 2]
            },
            getStr: function(e) {
                return UTF8ToString(e)
            },
            getStreamFromFD: function(e) {
                var t = FS.getStream(e);
                if (!t) throw new FS.ErrnoError(8);
                return t
            },
            get64: function(e, t) {
                return assert(e >= 0 ? 0 === t : -1 === t), e
            }
        };

    function ___sys_fcntl64(e, t, r) {
        SYSCALLS.varargs = r;
        try {
            var n = SYSCALLS.getStreamFromFD(e);
            switch (t) {
                case 0:
                    return (o = SYSCALLS.get()) < 0 ? -28 : FS.open(n.path, n.flags, 0, o).fd;
                case 1:
                case 2:
                case 13:
                case 14:
                    return 0;
                case 3:
                    return n.flags;
                case 4:
                    var o = SYSCALLS.get();
                    return n.flags |= o, 0;
                case 12:
                    o = SYSCALLS.get();
                    return HEAP16[o + 0 >> 1] = 2, 0;
                case 16:
                case 8:
                default:
                    return -28;
                case 9:
                    return setErrNo(28), -1
            }
        } catch (e) {
            return void 0 !== FS && e instanceof FS.ErrnoError || abort(e), -e.errno
        }
    }

    function ___sys_getdents64(e, t, r) {
        try {
            var n = SYSCALLS.getStreamFromFD(e);
            n.getdents || (n.getdents = FS.readdir(n.path));
            for (var o = 280, i = 0, a = FS.llseek(n, 0, 1), s = Math.floor(a / o); s < n.getdents.length && i + o <= r;) {
                var c, l, u = n.getdents[s];
                if ("." === u[0]) c = 1, l = 4;
                else {
                    var d = FS.lookupNode(n.node, u);
                    c = d.id, l = FS.isChrdev(d.mode) ? 2 : FS.isDir(d.mode) ? 4 : FS.isLink(d.mode) ? 10 : 8
                }
                tempI64 = [c >>> 0, (tempDouble = c, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (0 | Math_min(+Math_floor(tempDouble / 4294967296), 4294967295)) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[t + i >> 2] = tempI64[0], HEAP32[t + i + 4 >> 2] = tempI64[1], tempI64 = [(s + 1) * o >>> 0, (tempDouble = (s + 1) * o, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (0 | Math_min(+Math_floor(tempDouble / 4294967296), 4294967295)) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[t + i + 8 >> 2] = tempI64[0], HEAP32[t + i + 12 >> 2] = tempI64[1], HEAP16[t + i + 16 >> 1] = 280, HEAP8[t + i + 18 >> 0] = l, stringToUTF8(u, t + i + 19, 256), i += o, s += 1
            }
            return FS.llseek(n, s * o, 0), i
        } catch (e) {
            return void 0 !== FS && e instanceof FS.ErrnoError || abort(e), -e.errno
        }
    }

    function ___sys_ioctl(e, t, r) {
        SYSCALLS.varargs = r;
        try {
            var n = SYSCALLS.getStreamFromFD(e);
            switch (t) {
                case 21509:
                case 21505:
                case 21510:
                case 21511:
                case 21512:
                case 21506:
                case 21507:
                case 21508:
                case 21523:
                case 21524:
                    return n.tty ? 0 : -59;
                case 21519:
                    if (!n.tty) return -59;
                    var o = SYSCALLS.get();
                    return HEAP32[o >> 2] = 0, 0;
                case 21520:
                    return n.tty ? -28 : -59;
                case 21531:
                    o = SYSCALLS.get();
                    return FS.ioctl(n, t, o);
                default:
                    abort("bad ioctl syscall " + t)
            }
        } catch (e) {
            return void 0 !== FS && e instanceof FS.ErrnoError || abort(e), -e.errno
        }
    }

    function ___sys_mkdir(e, t) {
        try {
            return e = SYSCALLS.getStr(e), SYSCALLS.doMkdir(e, t)
        } catch (e) {
            return void 0 !== FS && e instanceof FS.ErrnoError || abort(e), -e.errno
        }
    }

    function ___sys_open(e, t, r) {
        SYSCALLS.varargs = r;
        try {
            var n = SYSCALLS.getStr(e),
                o = SYSCALLS.get();
            return FS.open(n, t, o).fd
        } catch (e) {
            return void 0 !== FS && e instanceof FS.ErrnoError || abort(e), -e.errno
        }
    }

    function ___sys_stat64(e, t) {
        try {
            return e = SYSCALLS.getStr(e), SYSCALLS.doStat(FS.stat, e, t)
        } catch (e) {
            return void 0 !== FS && e instanceof FS.ErrnoError || abort(e), -e.errno
        }
    }
    _emscripten_get_now = ENVIRONMENT_IS_NODE ? function() {
        var e = process.hrtime();
        return 1e3 * e[0] + e[1] / 1e6
    } : "undefined" != typeof dateNow ? dateNow : function() {
        return performance.now()
    };
    var _emscripten_get_now_is_monotonic = !0;

    function _clock_gettime(e, t) {
        var r;
        if (0 === e) r = Date.now();
        else {
            if (1 !== e && 4 !== e || !_emscripten_get_now_is_monotonic) return setErrNo(28), -1;
            r = _emscripten_get_now()
        }
        return HEAP32[t >> 2] = r / 1e3 | 0, HEAP32[t + 4 >> 2] = r % 1e3 * 1e3 * 1e3 | 0, 0
    }

    function _dlclose(e) {
        abort("To use dlopen, you need to use Emscripten's linking support, see https://github.com/emscripten-core/emscripten/wiki/Linking")
    }

    function _emscripten_set_main_loop_timing(e, t) {
        if (Browser.mainLoop.timingMode = e, Browser.mainLoop.timingValue = t, !Browser.mainLoop.func) return console.error("emscripten_set_main_loop_timing: Cannot set timing mode for main loop since a main loop does not exist! Call emscripten_set_main_loop first to set one up."), 1;
        if (0 == e) Browser.mainLoop.scheduler = function() {
            var e = 0 | Math.max(0, Browser.mainLoop.tickStartTime + t - _emscripten_get_now());
            setTimeout(Browser.mainLoop.runner, e)
        }, Browser.mainLoop.method = "timeout";
        else if (1 == e) Browser.mainLoop.scheduler = function() {
            Browser.requestAnimationFrame(Browser.mainLoop.runner)
        }, Browser.mainLoop.method = "rAF";
        else if (2 == e) {
            if ("undefined" == typeof setImmediate) {
                var r = [],
                    n = "setimmediate";
                addEventListener("message", (function(e) {
                    e.data !== n && e.data.target !== n || (e.stopPropagation(), r.shift()())
                }), !0), setImmediate = function(e) {
                    r.push(e), ENVIRONMENT_IS_WORKER ? (void 0 === Module.setImmediates && (Module.setImmediates = []), Module.setImmediates.push(e), postMessage({
                        target: n
                    })) : postMessage(n, "*")
                }
            }
            Browser.mainLoop.scheduler = function() {
                setImmediate(Browser.mainLoop.runner)
            }, Browser.mainLoop.method = "immediate"
        }
        return 0
    }

    function _emscripten_set_main_loop(e, t, r, n, o) {
        var i;
        noExitRuntime = !0, assert(!Browser.mainLoop.func, "emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters."), Browser.mainLoop.func = e, Browser.mainLoop.arg = n, i = void 0 !== n ? function() {
            Module.dynCall_vi(e, n)
        } : function() {
            Module.dynCall_v(e)
        };
        var a = Browser.mainLoop.currentlyRunningMainloop;
        if (Browser.mainLoop.runner = function() {
                if (!ABORT)
                    if (Browser.mainLoop.queue.length > 0) {
                        var e = Date.now(),
                            t = Browser.mainLoop.queue.shift();
                        if (t.func(t.arg), Browser.mainLoop.remainingBlockers) {
                            var r = Browser.mainLoop.remainingBlockers,
                                n = r % 1 == 0 ? r - 1 : Math.floor(r);
                            t.counted ? Browser.mainLoop.remainingBlockers = n : (n += .5, Browser.mainLoop.remainingBlockers = (8 * r + n) / 9)
                        }
                        if (console.log('main loop blocker "' + t.name + '" took ' + (Date.now() - e) + " ms"), Browser.mainLoop.updateStatus(), a < Browser.mainLoop.currentlyRunningMainloop) return;
                        setTimeout(Browser.mainLoop.runner, 0)
                    } else a < Browser.mainLoop.currentlyRunningMainloop || (Browser.mainLoop.currentFrameNumber = Browser.mainLoop.currentFrameNumber + 1 | 0, 1 == Browser.mainLoop.timingMode && Browser.mainLoop.timingValue > 1 && Browser.mainLoop.currentFrameNumber % Browser.mainLoop.timingValue != 0 ? Browser.mainLoop.scheduler() : (0 == Browser.mainLoop.timingMode && (Browser.mainLoop.tickStartTime = _emscripten_get_now()), "timeout" === Browser.mainLoop.method && Module.ctx && (warnOnce("Looks like you are rendering without using requestAnimationFrame for the main loop. You should use 0 for the frame rate in emscripten_set_main_loop in order to use requestAnimationFrame, as that can greatly improve your frame rates!"), Browser.mainLoop.method = ""), Browser.mainLoop.runIter(i), checkStackCookie(), a < Browser.mainLoop.currentlyRunningMainloop || ("object" == typeof SDL && SDL.audio && SDL.audio.queueNewAudioData && SDL.audio.queueNewAudioData(), Browser.mainLoop.scheduler())))
            }, o || (t && t > 0 ? _emscripten_set_main_loop_timing(0, 1e3 / t) : _emscripten_set_main_loop_timing(1, 1), Browser.mainLoop.scheduler()), r) throw "unwind"
    }
    var Browser = {
            mainLoop: {
                scheduler: null,
                method: "",
                currentlyRunningMainloop: 0,
                func: null,
                arg: 0,
                timingMode: 0,
                timingValue: 0,
                currentFrameNumber: 0,
                queue: [],
                pause: function() {
                    Browser.mainLoop.scheduler = null, Browser.mainLoop.currentlyRunningMainloop++
                },
                resume: function() {
                    Browser.mainLoop.currentlyRunningMainloop++;
                    var e = Browser.mainLoop.timingMode,
                        t = Browser.mainLoop.timingValue,
                        r = Browser.mainLoop.func;
                    Browser.mainLoop.func = null, _emscripten_set_main_loop(r, 0, !1, Browser.mainLoop.arg, !0), _emscripten_set_main_loop_timing(e, t), Browser.mainLoop.scheduler()
                },
                updateStatus: function() {
                    if (Module.setStatus) {
                        var e = Module.statusMessage || "Please wait...",
                            t = Browser.mainLoop.remainingBlockers,
                            r = Browser.mainLoop.expectedBlockers;
                        t ? t < r ? Module.setStatus(e + " (" + (r - t) + "/" + r + ")") : Module.setStatus(e) : Module.setStatus("")
                    }
                },
                runIter: function(e) {
                    if (!ABORT) {
                        if (Module.preMainLoop)
                            if (!1 === Module.preMainLoop()) return;
                        try {
                            e()
                        } catch (e) {
                            if (e instanceof ExitStatus) return;
                            throw e && "object" == typeof e && e.stack && err("exception thrown: " + [e, e.stack]), e
                        }
                        Module.postMainLoop && Module.postMainLoop()
                    }
                }
            },
            isFullscreen: !1,
            pointerLock: !1,
            moduleContextCreatedCallbacks: [],
            workers: [],
            init: function() {
                if (Module.preloadPlugins || (Module.preloadPlugins = []), !Browser.initted) {
                    Browser.initted = !0;
                    try {
                        new Blob, Browser.hasBlobConstructor = !0
                    } catch (e) {
                        Browser.hasBlobConstructor = !1, console.log("warning: no blob constructor, cannot create blobs with mimetypes")
                    }
                    Browser.BlobBuilder = "undefined" != typeof MozBlobBuilder ? MozBlobBuilder : "undefined" != typeof WebKitBlobBuilder ? WebKitBlobBuilder : Browser.hasBlobConstructor ? null : console.log("warning: no BlobBuilder"), Browser.URLObject = "undefined" != typeof window ? window.URL ? window.URL : window.webkitURL : void 0, Module.noImageDecoding || void 0 !== Browser.URLObject || (console.log("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available."), Module.noImageDecoding = !0);
                    var e = {
                        canHandle: function(e) {
                            return !Module.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(e)
                        },
                        handle: function(e, t, r, n) {
                            var o = null;
                            if (Browser.hasBlobConstructor) try {
                                (o = new Blob([e], {
                                    type: Browser.getMimetype(t)
                                })).size !== e.length && (o = new Blob([new Uint8Array(e).buffer], {
                                    type: Browser.getMimetype(t)
                                }))
                            } catch (e) {
                                warnOnce("Blob constructor present but fails: " + e + "; falling back to blob builder")
                            }
                            if (!o) {
                                var i = new Browser.BlobBuilder;
                                i.append(new Uint8Array(e).buffer), o = i.getBlob()
                            }
                            var a = Browser.URLObject.createObjectURL(o);
                            assert("string" == typeof a, "createObjectURL must return a url as a string");
                            var s = new Image;
                            s.onload = function() {
                                assert(s.complete, "Image " + t + " could not be decoded");
                                var n = document.createElement("canvas");
                                n.width = s.width, n.height = s.height, n.getContext("2d").drawImage(s, 0, 0), Module.preloadedImages[t] = n, Browser.URLObject.revokeObjectURL(a), r && r(e)
                            }, s.onerror = function(e) {
                                console.log("Image " + a + " could not be decoded"), n && n()
                            }, s.src = a
                        }
                    };
                    Module.preloadPlugins.push(e);
                    var t = {
                        canHandle: function(e) {
                            return !Module.noAudioDecoding && e.substr(-4) in {
                                ".ogg": 1,
                                ".wav": 1,
                                ".mp3": 1
                            }
                        },
                        handle: function(e, t, r, n) {
                            var o = !1;

                            function i(n) {
                                o || (o = !0, Module.preloadedAudios[t] = n, r && r(e))
                            }

                            function a() {
                                o || (o = !0, Module.preloadedAudios[t] = new Audio, n && n())
                            }
                            if (!Browser.hasBlobConstructor) return a();
                            try {
                                var s = new Blob([e], {
                                    type: Browser.getMimetype(t)
                                })
                            } catch (e) {
                                return a()
                            }
                            var c = Browser.URLObject.createObjectURL(s);
                            assert("string" == typeof c, "createObjectURL must return a url as a string");
                            var l = new Audio;
                            l.addEventListener("canplaythrough", (function() {
                                i(l)
                            }), !1), l.onerror = function(r) {
                                o || (console.log("warning: browser could not fully decode audio " + t + ", trying slower base64 approach"), l.src = "data:audio/x-" + t.substr(-3) + ";base64," + function(e) {
                                    for (var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", r = "", n = 0, o = 0, i = 0; i < e.length; i++)
                                        for (n = n << 8 | e[i], o += 8; o >= 6;) {
                                            var a = n >> o - 6 & 63;
                                            o -= 6, r += t[a]
                                        }
                                    return 2 == o ? (r += t[(3 & n) << 4], r += "==") : 4 == o && (r += t[(15 & n) << 2], r += "="), r
                                }(e), i(l))
                            }, l.src = c, Browser.safeSetTimeout((function() {
                                i(l)
                            }), 1e4)
                        }
                    };
                    Module.preloadPlugins.push(t);
                    var r = Module.canvas;
                    r && (r.requestPointerLock = r.requestPointerLock || r.mozRequestPointerLock || r.webkitRequestPointerLock || r.msRequestPointerLock || function() {}, r.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock || document.msExitPointerLock || function() {}, r.exitPointerLock = r.exitPointerLock.bind(document), document.addEventListener("pointerlockchange", n, !1), document.addEventListener("mozpointerlockchange", n, !1), document.addEventListener("webkitpointerlockchange", n, !1), document.addEventListener("mspointerlockchange", n, !1), Module.elementPointerLock && r.addEventListener("click", (function(e) {
                        !Browser.pointerLock && Module.canvas.requestPointerLock && (Module.canvas.requestPointerLock(), e.preventDefault())
                    }), !1))
                }

                function n() {
                    Browser.pointerLock = document.pointerLockElement === Module.canvas || document.mozPointerLockElement === Module.canvas || document.webkitPointerLockElement === Module.canvas || document.msPointerLockElement === Module.canvas
                }
            },
            createContext: function(e, t, r, n) {
                if (t && Module.ctx && e == Module.canvas) return Module.ctx;
                var o, i;
                if (t) {
                    var a = {
                        antialias: !1,
                        alpha: !1,
                        majorVersion: 1
                    };
                    if (n)
                        for (var s in n) a[s] = n[s];
                    void 0 !== GL && (i = GL.createContext(e, a)) && (o = GL.getContext(i).GLctx)
                } else o = e.getContext("2d");
                return o ? (r && (t || assert(void 0 === GLctx, "cannot set in module if GLctx is used, but we are a non-GL context that would replace it"), Module.ctx = o, t && GL.makeContextCurrent(i), Module.useWebGL = t, Browser.moduleContextCreatedCallbacks.forEach((function(e) {
                    e()
                })), Browser.init()), o) : null
            },
            destroyContext: function(e, t, r) {},
            fullscreenHandlersInstalled: !1,
            lockPointer: void 0,
            resizeCanvas: void 0,
            requestFullscreen: function(e, t) {
                Browser.lockPointer = e, Browser.resizeCanvas = t, void 0 === Browser.lockPointer && (Browser.lockPointer = !0), void 0 === Browser.resizeCanvas && (Browser.resizeCanvas = !1);
                var r = Module.canvas;

                function n() {
                    Browser.isFullscreen = !1;
                    var e = r.parentNode;
                    (document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement || document.webkitCurrentFullScreenElement) === e ? (r.exitFullscreen = Browser.exitFullscreen, Browser.lockPointer && r.requestPointerLock(), Browser.isFullscreen = !0, Browser.resizeCanvas ? Browser.setFullscreenCanvasSize() : Browser.updateCanvasDimensions(r)) : (e.parentNode.insertBefore(r, e), e.parentNode.removeChild(e), Browser.resizeCanvas ? Browser.setWindowedCanvasSize() : Browser.updateCanvasDimensions(r)), Module.onFullScreen && Module.onFullScreen(Browser.isFullscreen), Module.onFullscreen && Module.onFullscreen(Browser.isFullscreen)
                }
                Browser.fullscreenHandlersInstalled || (Browser.fullscreenHandlersInstalled = !0, document.addEventListener("fullscreenchange", n, !1), document.addEventListener("mozfullscreenchange", n, !1), document.addEventListener("webkitfullscreenchange", n, !1), document.addEventListener("MSFullscreenChange", n, !1));
                var o = document.createElement("div");
                r.parentNode.insertBefore(o, r), o.appendChild(r), o.requestFullscreen = o.requestFullscreen || o.mozRequestFullScreen || o.msRequestFullscreen || (o.webkitRequestFullscreen ? function() {
                    o.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
                } : null) || (o.webkitRequestFullScreen ? function() {
                    o.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
                } : null), o.requestFullscreen()
            },
            requestFullScreen: function() {
                abort("Module.requestFullScreen has been replaced by Module.requestFullscreen (without a capital S)")
            },
            exitFullscreen: function() {
                return !!Browser.isFullscreen && ((document.exitFullscreen || document.cancelFullScreen || document.mozCancelFullScreen || document.msExitFullscreen || document.webkitCancelFullScreen || function() {}).apply(document, []), !0)
            },
            nextRAF: 0,
            fakeRequestAnimationFrame: function(e) {
                var t = Date.now();
                if (0 === Browser.nextRAF) Browser.nextRAF = t + 1e3 / 60;
                else
                    for (; t + 2 >= Browser.nextRAF;) Browser.nextRAF += 1e3 / 60;
                var r = Math.max(Browser.nextRAF - t, 0);
                setTimeout(e, r)
            },
            requestAnimationFrame: function(e) {
                "function" != typeof requestAnimationFrame ? (0, Browser.fakeRequestAnimationFrame)(e) : requestAnimationFrame(e)
            },
            safeCallback: function(e) {
                return function() {
                    if (!ABORT) return e.apply(null, arguments)
                }
            },
            allowAsyncCallbacks: !0,
            queuedAsyncCallbacks: [],
            pauseAsyncCallbacks: function() {
                Browser.allowAsyncCallbacks = !1
            },
            resumeAsyncCallbacks: function() {
                if (Browser.allowAsyncCallbacks = !0, Browser.queuedAsyncCallbacks.length > 0) {
                    var e = Browser.queuedAsyncCallbacks;
                    Browser.queuedAsyncCallbacks = [], e.forEach((function(e) {
                        e()
                    }))
                }
            },
            safeRequestAnimationFrame: function(e) {
                return Browser.requestAnimationFrame((function() {
                    ABORT || (Browser.allowAsyncCallbacks ? e() : Browser.queuedAsyncCallbacks.push(e))
                }))
            },
            safeSetTimeout: function(e, t) {
                return noExitRuntime = !0, setTimeout((function() {
                    ABORT || (Browser.allowAsyncCallbacks ? e() : Browser.queuedAsyncCallbacks.push(e))
                }), t)
            },
            safeSetInterval: function(e, t) {
                return noExitRuntime = !0, setInterval((function() {
                    ABORT || Browser.allowAsyncCallbacks && e()
                }), t)
            },
            getMimetype: function(e) {
                return {
                    jpg: "image/jpeg",
                    jpeg: "image/jpeg",
                    png: "image/png",
                    bmp: "image/bmp",
                    ogg: "audio/ogg",
                    wav: "audio/wav",
                    mp3: "audio/mpeg"
                } [e.substr(e.lastIndexOf(".") + 1)]
            },
            getUserMedia: function(e) {
                window.getUserMedia || (window.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia), window.getUserMedia(e)
            },
            getMovementX: function(e) {
                return e.movementX || e.mozMovementX || e.webkitMovementX || 0
            },
            getMovementY: function(e) {
                return e.movementY || e.mozMovementY || e.webkitMovementY || 0
            },
            getMouseWheelDelta: function(e) {
                var t = 0;
                switch (e.type) {
                    case "DOMMouseScroll":
                        t = e.detail / 3;
                        break;
                    case "mousewheel":
                        t = e.wheelDelta / 120;
                        break;
                    case "wheel":
                        switch (t = e.deltaY, e.deltaMode) {
                            case 0:
                                t /= 100;
                                break;
                            case 1:
                                t /= 3;
                                break;
                            case 2:
                                t *= 80;
                                break;
                            default:
                                throw "unrecognized mouse wheel delta mode: " + e.deltaMode
                        }
                        break;
                    default:
                        throw "unrecognized mouse wheel event: " + e.type
                }
                return t
            },
            mouseX: 0,
            mouseY: 0,
            mouseMovementX: 0,
            mouseMovementY: 0,
            touches: {},
            lastTouches: {},
            calculateMouseEvent: function(e) {
                if (Browser.pointerLock) "mousemove" != e.type && "mozMovementX" in e ? Browser.mouseMovementX = Browser.mouseMovementY = 0 : (Browser.mouseMovementX = Browser.getMovementX(e), Browser.mouseMovementY = Browser.getMovementY(e)), "undefined" != typeof SDL ? (Browser.mouseX = SDL.mouseX + Browser.mouseMovementX, Browser.mouseY = SDL.mouseY + Browser.mouseMovementY) : (Browser.mouseX += Browser.mouseMovementX, Browser.mouseY += Browser.mouseMovementY);
                else {
                    var t = Module.canvas.getBoundingClientRect(),
                        r = Module.canvas.width,
                        n = Module.canvas.height,
                        o = void 0 !== window.scrollX ? window.scrollX : window.pageXOffset,
                        i = void 0 !== window.scrollY ? window.scrollY : window.pageYOffset;
                    if (assert(void 0 !== o && void 0 !== i, "Unable to retrieve scroll position, mouse positions likely broken."), "touchstart" === e.type || "touchend" === e.type || "touchmove" === e.type) {
                        var a = e.touch;
                        if (void 0 === a) return;
                        var s = a.pageX - (o + t.left),
                            c = a.pageY - (i + t.top),
                            l = {
                                x: s *= r / t.width,
                                y: c *= n / t.height
                            };
                        if ("touchstart" === e.type) Browser.lastTouches[a.identifier] = l, Browser.touches[a.identifier] = l;
                        else if ("touchend" === e.type || "touchmove" === e.type) {
                            var u = Browser.touches[a.identifier];
                            u || (u = l), Browser.lastTouches[a.identifier] = u, Browser.touches[a.identifier] = l
                        }
                        return
                    }
                    var d = e.pageX - (o + t.left),
                        _ = e.pageY - (i + t.top);
                    d *= r / t.width, _ *= n / t.height, Browser.mouseMovementX = d - Browser.mouseX, Browser.mouseMovementY = _ - Browser.mouseY, Browser.mouseX = d, Browser.mouseY = _
                }
            },
            asyncLoad: function(e, t, r, n) {
                var o = n ? "" : getUniqueRunDependency("al " + e);
                readAsync(e, (function(r) {
                    assert(r, 'Loading data file "' + e + '" failed (no arrayBuffer).'), t(new Uint8Array(r)), o && removeRunDependency(o)
                }), (function(t) {
                    if (!r) throw 'Loading data file "' + e + '" failed.';
                    r()
                })), o && addRunDependency(o)
            },
            resizeListeners: [],
            updateResizeListeners: function() {
                var e = Module.canvas;
                Browser.resizeListeners.forEach((function(t) {
                    t(e.width, e.height)
                }))
            },
            setCanvasSize: function(e, t, r) {
                var n = Module.canvas;
                Browser.updateCanvasDimensions(n, e, t), r || Browser.updateResizeListeners()
            },
            windowedWidth: 0,
            windowedHeight: 0,
            setFullscreenCanvasSize: function() {
                if ("undefined" != typeof SDL) {
                    var e = HEAPU32[SDL.screen >> 2];
                    e |= 8388608, HEAP32[SDL.screen >> 2] = e
                }
                Browser.updateCanvasDimensions(Module.canvas), Browser.updateResizeListeners()
            },
            setWindowedCanvasSize: function() {
                if ("undefined" != typeof SDL) {
                    var e = HEAPU32[SDL.screen >> 2];
                    e &= -8388609, HEAP32[SDL.screen >> 2] = e
                }
                Browser.updateCanvasDimensions(Module.canvas), Browser.updateResizeListeners()
            },
            updateCanvasDimensions: function(e, t, r) {
                t && r ? (e.widthNative = t, e.heightNative = r) : (t = e.widthNative, r = e.heightNative);
                var n = t,
                    o = r;
                if (Module.forcedAspectRatio && Module.forcedAspectRatio > 0 && (n / o < Module.forcedAspectRatio ? n = Math.round(o * Module.forcedAspectRatio) : o = Math.round(n / Module.forcedAspectRatio)), (document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement || document.webkitCurrentFullScreenElement) === e.parentNode && "undefined" != typeof screen) {
                    var i = Math.min(screen.width / n, screen.height / o);
                    n = Math.round(n * i), o = Math.round(o * i)
                }
                Browser.resizeCanvas ? (e.width != n && (e.width = n), e.height != o && (e.height = o), void 0 !== e.style && (e.style.removeProperty("width"), e.style.removeProperty("height"))) : (e.width != t && (e.width = t), e.height != r && (e.height = r), void 0 !== e.style && (n != t || o != r ? (e.style.setProperty("width", n + "px", "important"), e.style.setProperty("height", o + "px", "important")) : (e.style.removeProperty("width"), e.style.removeProperty("height"))))
            },
            wgetRequests: {},
            nextWgetRequestHandle: 0,
            getNextWgetRequestHandle: function() {
                var e = Browser.nextWgetRequestHandle;
                return Browser.nextWgetRequestHandle++, e
            }
        },
        EGL = {
            errorCode: 12288,
            defaultDisplayInitialized: !1,
            currentContext: 0,
            currentReadSurface: 0,
            currentDrawSurface: 0,
            contextAttributes: {
                alpha: !1,
                depth: !1,
                stencil: !1,
                antialias: !1
            },
            stringCache: {},
            setErrorCode: function(e) {
                EGL.errorCode = e
            },
            chooseConfig: function(e, t, r, n, o) {
                if (62e3 != e) return EGL.setErrorCode(12296), 0;
                if (t)
                    for (;;) {
                        var i = HEAP32[t >> 2];
                        if (12321 == i) {
                            var a = HEAP32[t + 4 >> 2];
                            EGL.contextAttributes.alpha = a > 0
                        } else if (12325 == i) {
                            var s = HEAP32[t + 4 >> 2];
                            EGL.contextAttributes.depth = s > 0
                        } else if (12326 == i) {
                            var c = HEAP32[t + 4 >> 2];
                            EGL.contextAttributes.stencil = c > 0
                        } else if (12337 == i) {
                            var l = HEAP32[t + 4 >> 2];
                            EGL.contextAttributes.antialias = l > 0
                        } else if (12338 == i) {
                            l = HEAP32[t + 4 >> 2];
                            EGL.contextAttributes.antialias = 1 == l
                        } else if (12544 == i) {
                            var u = HEAP32[t + 4 >> 2];
                            EGL.contextAttributes.lowLatency = 12547 != u
                        } else if (12344 == i) break;
                        t += 8
                    }
                return r && n || o ? (o && (HEAP32[o >> 2] = 1), r && n > 0 && (HEAP32[r >> 2] = 62002), EGL.setErrorCode(12288), 1) : (EGL.setErrorCode(12300), 0)
            }
        };

    function _eglBindAPI(e) {
        return 12448 == e ? (EGL.setErrorCode(12288), 1) : (EGL.setErrorCode(12300), 0)
    }

    function _eglChooseConfig(e, t, r, n, o) {
        return EGL.chooseConfig(e, t, r, n, o)
    }

    function __webgl_enable_ANGLE_instanced_arrays(e) {
        var t = e.getExtension("ANGLE_instanced_arrays");
        if (t) return e.vertexAttribDivisor = function(e, r) {
            t.vertexAttribDivisorANGLE(e, r)
        }, e.drawArraysInstanced = function(e, r, n, o) {
            t.drawArraysInstancedANGLE(e, r, n, o)
        }, e.drawElementsInstanced = function(e, r, n, o, i) {
            t.drawElementsInstancedANGLE(e, r, n, o, i)
        }, 1
    }

    function __webgl_enable_OES_vertex_array_object(e) {
        var t = e.getExtension("OES_vertex_array_object");
        if (t) return e.createVertexArray = function() {
            return t.createVertexArrayOES()
        }, e.deleteVertexArray = function(e) {
            t.deleteVertexArrayOES(e)
        }, e.bindVertexArray = function(e) {
            t.bindVertexArrayOES(e)
        }, e.isVertexArray = function(e) {
            return t.isVertexArrayOES(e)
        }, 1
    }

    function __webgl_enable_WEBGL_draw_buffers(e) {
        var t = e.getExtension("WEBGL_draw_buffers");
        if (t) return e.drawBuffers = function(e, r) {
            t.drawBuffersWEBGL(e, r)
        }, 1
    }
    var GL = {
        counter: 1,
        buffers: [],
        programs: [],
        framebuffers: [],
        renderbuffers: [],
        textures: [],
        uniforms: [],
        shaders: [],
        vaos: [],
        contexts: [],
        offscreenCanvases: {},
        timerQueriesEXT: [],
        programInfos: {},
        stringCache: {},
        unpackAlignment: 4,
        recordError: function(e) {
            GL.lastError || (GL.lastError = e)
        },
        getNewId: function(e) {
            for (var t = GL.counter++, r = e.length; r < t; r++) e[r] = null;
            return t
        },
        getSource: function(e, t, r, n) {
            for (var o = "", i = 0; i < t; ++i) {
                var a = n ? HEAP32[n + 4 * i >> 2] : -1;
                o += UTF8ToString(HEAP32[r + 4 * i >> 2], a < 0 ? void 0 : a)
            }
            return o
        },
        createContext: function(e, t) {
            var r = e.getContext("webgl", t);
            return r ? GL.registerContext(r, t) : 0
        },
        registerContext: function(e, t) {
            var r = GL.getNewId(GL.contexts),
                n = {
                    handle: r,
                    attributes: t,
                    version: t.majorVersion,
                    GLctx: e
                };
            return e.canvas && (e.canvas.GLctxObject = n), GL.contexts[r] = n, (void 0 === t.enableExtensionsByDefault || t.enableExtensionsByDefault) && GL.initExtensions(n), r
        },
        makeContextCurrent: function(e) {
            return GL.currentContext = GL.contexts[e], Module.ctx = GLctx = GL.currentContext && GL.currentContext.GLctx, !(e && !GLctx)
        },
        getContext: function(e) {
            return GL.contexts[e]
        },
        deleteContext: function(e) {
            GL.currentContext === GL.contexts[e] && (GL.currentContext = null), "object" == typeof JSEvents && JSEvents.removeAllHandlersOnTarget(GL.contexts[e].GLctx.canvas), GL.contexts[e] && GL.contexts[e].GLctx.canvas && (GL.contexts[e].GLctx.canvas.GLctxObject = void 0), GL.contexts[e] = null
        },
        initExtensions: function(e) {
            if (e || (e = GL.currentContext), !e.initExtensionsDone) {
                e.initExtensionsDone = !0;
                var t = e.GLctx;
                __webgl_enable_ANGLE_instanced_arrays(t), __webgl_enable_OES_vertex_array_object(t), __webgl_enable_WEBGL_draw_buffers(t), t.disjointTimerQueryExt = t.getExtension("EXT_disjoint_timer_query");
                var r = ["OES_texture_float", "OES_texture_half_float", "OES_standard_derivatives", "OES_vertex_array_object", "WEBGL_compressed_texture_s3tc", "WEBGL_depth_texture", "OES_element_index_uint", "EXT_texture_filter_anisotropic", "EXT_frag_depth", "WEBGL_draw_buffers", "ANGLE_instanced_arrays", "OES_texture_float_linear", "OES_texture_half_float_linear", "EXT_blend_minmax", "EXT_shader_texture_lod", "EXT_texture_norm16", "WEBGL_compressed_texture_pvrtc", "EXT_color_buffer_half_float", "WEBGL_color_buffer_float", "EXT_sRGB", "WEBGL_compressed_texture_etc1", "EXT_disjoint_timer_query", "WEBGL_compressed_texture_etc", "WEBGL_compressed_texture_astc", "EXT_color_buffer_float", "WEBGL_compressed_texture_s3tc_srgb", "EXT_disjoint_timer_query_webgl2", "WEBKIT_WEBGL_compressed_texture_pvrtc"];
                (t.getSupportedExtensions() || []).forEach((function(e) {
                    -1 != r.indexOf(e) && t.getExtension(e)
                }))
            }
        },
        populateUniformTable: function(e) {
            for (var t = GL.programs[e], r = GL.programInfos[e] = {
                    uniforms: {},
                    maxUniformLength: 0,
                    maxAttributeLength: -1,
                    maxUniformBlockNameLength: -1
                }, n = r.uniforms, o = GLctx.getProgramParameter(t, 35718), i = 0; i < o; ++i) {
                var a = GLctx.getActiveUniform(t, i),
                    s = a.name;
                r.maxUniformLength = Math.max(r.maxUniformLength, s.length + 1), "]" == s.slice(-1) && (s = s.slice(0, s.lastIndexOf("[")));
                var c = GLctx.getUniformLocation(t, s);
                if (c) {
                    var l = GL.getNewId(GL.uniforms);
                    n[s] = [a.size, l], GL.uniforms[l] = c;
                    for (var u = 1; u < a.size; ++u) {
                        var d = s + "[" + u + "]";
                        c = GLctx.getUniformLocation(t, d), l = GL.getNewId(GL.uniforms), GL.uniforms[l] = c
                    }
                }
            }
        }
    };

    function _eglCreateContext(e, t, r, n) {
        if (62e3 != e) return EGL.setErrorCode(12296), 0;
        for (var o = 1;;) {
            var i = HEAP32[n >> 2];
            if (12440 != i) {
                if (12344 == i) break;
                return EGL.setErrorCode(12292), 0
            }
            o = HEAP32[n + 4 >> 2], n += 8
        }
        return 2 != o ? (EGL.setErrorCode(12293), 0) : (EGL.contextAttributes.majorVersion = o - 1, EGL.contextAttributes.minorVersion = 0, EGL.context = GL.createContext(Module.canvas, EGL.contextAttributes), 0 != EGL.context ? (EGL.setErrorCode(12288), GL.makeContextCurrent(EGL.context), Module.useWebGL = !0, Browser.moduleContextCreatedCallbacks.forEach((function(e) {
            e()
        })), GL.makeContextCurrent(null), 62004) : (EGL.setErrorCode(12297), 0))
    }

    function _eglCreateWindowSurface(e, t, r, n) {
        return 62e3 != e ? (EGL.setErrorCode(12296), 0) : 62002 != t ? (EGL.setErrorCode(12293), 0) : (EGL.setErrorCode(12288), 62006)
    }

    function _eglDestroyContext(e, t) {
        return 62e3 != e ? (EGL.setErrorCode(12296), 0) : 62004 != t ? (EGL.setErrorCode(12294), 0) : (GL.deleteContext(EGL.context), EGL.setErrorCode(12288), EGL.currentContext == t && (EGL.currentContext = 0), 1)
    }

    function _eglDestroySurface(e, t) {
        return 62e3 != e ? (EGL.setErrorCode(12296), 0) : 62006 != t ? (EGL.setErrorCode(12301), 1) : (EGL.currentReadSurface == t && (EGL.currentReadSurface = 0), EGL.currentDrawSurface == t && (EGL.currentDrawSurface = 0), EGL.setErrorCode(12288), 1)
    }

    function _eglGetConfigAttrib(e, t, r, n) {
        if (62e3 != e) return EGL.setErrorCode(12296), 0;
        if (62002 != t) return EGL.setErrorCode(12293), 0;
        if (!n) return EGL.setErrorCode(12300), 0;
        switch (EGL.setErrorCode(12288), r) {
            case 12320:
                return HEAP32[n >> 2] = EGL.contextAttributes.alpha ? 32 : 24, 1;
            case 12321:
                return HEAP32[n >> 2] = EGL.contextAttributes.alpha ? 8 : 0, 1;
            case 12322:
            case 12323:
            case 12324:
                return HEAP32[n >> 2] = 8, 1;
            case 12325:
                return HEAP32[n >> 2] = EGL.contextAttributes.depth ? 24 : 0, 1;
            case 12326:
                return HEAP32[n >> 2] = EGL.contextAttributes.stencil ? 8 : 0, 1;
            case 12327:
            case 12335:
            case 12340:
                return HEAP32[n >> 2] = 12344, 1;
            case 12328:
                return HEAP32[n >> 2] = 62002, 1;
            case 12329:
            case 12333:
            case 12334:
            case 12345:
            case 12346:
            case 12347:
            case 12349:
            case 12350:
            case 12354:
                return HEAP32[n >> 2] = 0, 1;
            case 12330:
            case 12332:
                return HEAP32[n >> 2] = 4096, 1;
            case 12331:
                return HEAP32[n >> 2] = 16777216, 1;
            case 12337:
                return HEAP32[n >> 2] = EGL.contextAttributes.antialias ? 4 : 0, 1;
            case 12338:
                return HEAP32[n >> 2] = EGL.contextAttributes.antialias ? 1 : 0, 1;
            case 12339:
            case 12352:
                return HEAP32[n >> 2] = 4, 1;
            case 12341:
            case 12342:
            case 12343:
                return HEAP32[n >> 2] = -1, 1;
            case 12348:
                return HEAP32[n >> 2] = 1, 1;
            case 12351:
                return HEAP32[n >> 2] = 12430, 1;
            default:
                return EGL.setErrorCode(12292), 0
        }
    }

    function _eglGetDisplay(e) {
        return EGL.setErrorCode(12288), 62e3
    }

    function _eglGetError() {
        return EGL.errorCode
    }

    function _eglGetProcAddress(e) {
        return _emscripten_GetProcAddress(e)
    }

    function _eglInitialize(e, t, r) {
        return 62e3 == e ? (t && (HEAP32[t >> 2] = 1), r && (HEAP32[r >> 2] = 4), EGL.defaultDisplayInitialized = !0, EGL.setErrorCode(12288), 1) : (EGL.setErrorCode(12296), 0)
    }

    function _eglMakeCurrent(e, t, r, n) {
        return 62e3 != e ? (EGL.setErrorCode(12296), 0) : 0 != n && 62004 != n ? (EGL.setErrorCode(12294), 0) : 0 != r && 62006 != r || 0 != t && 62006 != t ? (EGL.setErrorCode(12301), 0) : (GL.makeContextCurrent(n ? EGL.context : null), EGL.currentContext = n, EGL.currentDrawSurface = t, EGL.currentReadSurface = r, EGL.setErrorCode(12288), 1)
    }

    function _eglQueryString(e, t) {
        if (62e3 != e) return EGL.setErrorCode(12296), 0;
        if (EGL.setErrorCode(12288), EGL.stringCache[t]) return EGL.stringCache[t];
        var r;
        switch (t) {
            case 12371:
                r = allocateUTF8("Emscripten");
                break;
            case 12372:
                r = allocateUTF8("1.4 Emscripten EGL");
                break;
            case 12373:
                r = allocateUTF8("");
                break;
            case 12429:
                r = allocateUTF8("OpenGL_ES");
                break;
            default:
                return EGL.setErrorCode(12300), 0
        }
        return EGL.stringCache[t] = r, r
    }

    function _eglSwapBuffers() {
        if (EGL.defaultDisplayInitialized)
            if (Module.ctx) {
                if (!Module.ctx.isContextLost()) return EGL.setErrorCode(12288), 1;
                EGL.setErrorCode(12302)
            } else EGL.setErrorCode(12290);
        else EGL.setErrorCode(12289);
        return 0
    }

    function _eglSwapInterval(e, t) {
        return 62e3 != e ? (EGL.setErrorCode(12296), 0) : (0 == t ? _emscripten_set_main_loop_timing(0, 0) : _emscripten_set_main_loop_timing(1, t), EGL.setErrorCode(12288), 1)
    }

    function _eglTerminate(e) {
        return 62e3 != e ? (EGL.setErrorCode(12296), 0) : (EGL.currentContext = 0, EGL.currentReadSurface = 0, EGL.currentDrawSurface = 0, EGL.defaultDisplayInitialized = !1, EGL.setErrorCode(12288), 1)
    }

    function _eglWaitClient() {
        return EGL.setErrorCode(12288), 1
    }

    function _eglWaitGL() {
        return _eglWaitClient()
    }

    function _eglWaitNative(e) {
        return EGL.setErrorCode(12288), 1
    }
    var JSEvents = {
            removeAllEventListeners: function() {
                for (var e = JSEvents.eventHandlers.length - 1; e >= 0; --e) JSEvents._removeHandler(e);
                JSEvents.eventHandlers = [], JSEvents.deferredCalls = []
            },
            registerRemoveEventListeners: function() {
                JSEvents.removeEventListenersRegistered || (__ATEXIT__.push(JSEvents.removeAllEventListeners), JSEvents.removeEventListenersRegistered = !0)
            },
            deferredCalls: [],
            deferCall: function(e, t, r) {
                function n(e, t) {
                    if (e.length != t.length) return !1;
                    for (var r in e)
                        if (e[r] != t[r]) return !1;
                    return !0
                }
                for (var o in JSEvents.deferredCalls) {
                    var i = JSEvents.deferredCalls[o];
                    if (i.targetFunction == e && n(i.argsList, r)) return
                }
                JSEvents.deferredCalls.push({
                    targetFunction: e,
                    precedence: t,
                    argsList: r
                }), JSEvents.deferredCalls.sort((function(e, t) {
                    return e.precedence < t.precedence
                }))
            },
            removeDeferredCalls: function(e) {
                for (var t = 0; t < JSEvents.deferredCalls.length; ++t) JSEvents.deferredCalls[t].targetFunction == e && (JSEvents.deferredCalls.splice(t, 1), --t)
            },
            canPerformEventHandlerRequests: function() {
                return JSEvents.inEventHandler && JSEvents.currentEventHandler.allowsDeferredCalls
            },
            runDeferredCalls: function() {
                if (JSEvents.canPerformEventHandlerRequests())
                    for (var e = 0; e < JSEvents.deferredCalls.length; ++e) {
                        var t = JSEvents.deferredCalls[e];
                        JSEvents.deferredCalls.splice(e, 1), --e, t.targetFunction.apply(null, t.argsList)
                    }
            },
            eventHandlers: [],
            removeAllHandlersOnTarget: function(e, t) {
                for (var r = 0; r < JSEvents.eventHandlers.length; ++r) JSEvents.eventHandlers[r].target != e || t && t != JSEvents.eventHandlers[r].eventTypeString || JSEvents._removeHandler(r--)
            },
            _removeHandler: function(e) {
                var t = JSEvents.eventHandlers[e];
                t.target.removeEventListener(t.eventTypeString, t.eventListenerFunc, t.useCapture), JSEvents.eventHandlers.splice(e, 1)
            },
            registerOrRemoveHandler: function(e) {
                var t = function(t) {
                    ++JSEvents.inEventHandler, JSEvents.currentEventHandler = e, JSEvents.runDeferredCalls(), e.handlerFunc(t), JSEvents.runDeferredCalls(), --JSEvents.inEventHandler
                };
                if (e.callbackfunc) e.eventListenerFunc = t, e.target.addEventListener(e.eventTypeString, t, e.useCapture), JSEvents.eventHandlers.push(e), JSEvents.registerRemoveEventListeners();
                else
                    for (var r = 0; r < JSEvents.eventHandlers.length; ++r) JSEvents.eventHandlers[r].target == e.target && JSEvents.eventHandlers[r].eventTypeString == e.eventTypeString && JSEvents._removeHandler(r--)
            },
            getNodeNameForTarget: function(e) {
                return e ? e == window ? "#window" : e == screen ? "#screen" : e && e.nodeName ? e.nodeName : "" : ""
            },
            fullscreenEnabled: function() {
                return document.fullscreenEnabled || document.webkitFullscreenEnabled
            }
        },
        __currentFullscreenStrategy = {};

    function __maybeCStringToJsString(e) {
        return e > 2 ? UTF8ToString(e) : e
    }
    var specialHTMLTargets = [0, "undefined" != typeof document ? document : 0, "undefined" != typeof window ? window : 0];

    function __findEventTarget(e) {
        return e = __maybeCStringToJsString(e), specialHTMLTargets[e] || ("undefined" != typeof document ? document.querySelector(e) : void 0)
    }

    function __findCanvasEventTarget(e) {
        return __findEventTarget(e)
    }

    function _emscripten_get_canvas_element_size(e, t, r) {
        var n = __findCanvasEventTarget(e);
        if (!n) return -4;
        HEAP32[t >> 2] = n.width, HEAP32[r >> 2] = n.height
    }

    function __get_canvas_element_size(e) {
        var t = stackSave(),
            r = stackAlloc(8),
            n = r + 4,
            o = stackAlloc(e.id.length + 1);
        stringToUTF8(e.id, o, e.id.length + 1);
        _emscripten_get_canvas_element_size(o, r, n);
        var i = [HEAP32[r >> 2], HEAP32[n >> 2]];
        return stackRestore(t), i
    }

    function _emscripten_set_canvas_element_size(e, t, r) {
        var n = __findCanvasEventTarget(e);
        return n ? (n.width = t, n.height = r, 0) : -4
    }

    function __set_canvas_element_size(e, t, r) {
        if (e.controlTransferredOffscreen) {
            var n = stackSave(),
                o = stackAlloc(e.id.length + 1);
            stringToUTF8(e.id, o, e.id.length + 1), _emscripten_set_canvas_element_size(o, t, r), stackRestore(n)
        } else e.width = t, e.height = r
    }

    function __registerRestoreOldStyle(e) {
        var t = __get_canvas_element_size(e),
            r = t[0],
            n = t[1],
            o = e.style.width,
            i = e.style.height,
            a = e.style.backgroundColor,
            s = document.body.style.backgroundColor,
            c = e.style.paddingLeft,
            l = e.style.paddingRight,
            u = e.style.paddingTop,
            d = e.style.paddingBottom,
            _ = e.style.marginLeft,
            f = e.style.marginRight,
            p = e.style.marginTop,
            m = e.style.marginBottom,
            E = document.body.style.margin,
            g = document.documentElement.style.overflow,
            h = document.body.scroll,
            v = e.style.imageRendering;

        function S() {
            document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement || (document.removeEventListener("fullscreenchange", S), document.removeEventListener("webkitfullscreenchange", S), __set_canvas_element_size(e, r, n), e.style.width = o, e.style.height = i, e.style.backgroundColor = a, s || (document.body.style.backgroundColor = "white"), document.body.style.backgroundColor = s, e.style.paddingLeft = c, e.style.paddingRight = l, e.style.paddingTop = u, e.style.paddingBottom = d, e.style.marginLeft = _, e.style.marginRight = f, e.style.marginTop = p, e.style.marginBottom = m, document.body.style.margin = E, document.documentElement.style.overflow = g, document.body.scroll = h, e.style.imageRendering = v, e.GLctxObject && e.GLctxObject.GLctx.viewport(0, 0, r, n), __currentFullscreenStrategy.canvasResizedCallback && dynCall_iiii(__currentFullscreenStrategy.canvasResizedCallback, 37, 0, __currentFullscreenStrategy.canvasResizedCallbackUserData))
        }
        return document.addEventListener("fullscreenchange", S), document.addEventListener("webkitfullscreenchange", S), S
    }

    function __setLetterbox(e, t, r) {
        e.style.paddingLeft = e.style.paddingRight = r + "px", e.style.paddingTop = e.style.paddingBottom = t + "px"
    }

    function __getBoundingClientRect(e) {
        return specialHTMLTargets.indexOf(e) < 0 ? e.getBoundingClientRect() : {
            left: 0,
            top: 0
        }
    }

    function _JSEvents_resizeCanvasForFullscreen(e, t) {
        var r = __registerRestoreOldStyle(e),
            n = t.softFullscreen ? innerWidth : screen.width,
            o = t.softFullscreen ? innerHeight : screen.height,
            i = __getBoundingClientRect(e),
            a = i.width,
            s = i.height,
            c = __get_canvas_element_size(e),
            l = c[0],
            u = c[1];
        if (3 == t.scaleMode) __setLetterbox(e, (o - s) / 2, (n - a) / 2), n = a, o = s;
        else if (2 == t.scaleMode)
            if (n * u < l * o) {
                var d = u * n / l;
                __setLetterbox(e, (o - d) / 2, 0), o = d
            } else {
                var _ = l * o / u;
                __setLetterbox(e, 0, (n - _) / 2), n = _
            } e.style.backgroundColor || (e.style.backgroundColor = "black"), document.body.style.backgroundColor || (document.body.style.backgroundColor = "black"), e.style.width = n + "px", e.style.height = o + "px", 1 == t.filteringMode && (e.style.imageRendering = "optimizeSpeed", e.style.imageRendering = "-moz-crisp-edges", e.style.imageRendering = "-o-crisp-edges", e.style.imageRendering = "-webkit-optimize-contrast", e.style.imageRendering = "optimize-contrast", e.style.imageRendering = "crisp-edges", e.style.imageRendering = "pixelated");
        var f = 2 == t.canvasResolutionScaleMode ? devicePixelRatio : 1;
        if (0 != t.canvasResolutionScaleMode) {
            var p = n * f | 0,
                m = o * f | 0;
            __set_canvas_element_size(e, p, m), e.GLctxObject && e.GLctxObject.GLctx.viewport(0, 0, p, m)
        }
        return r
    }

    function _JSEvents_requestFullscreen(e, t) {
        if (0 == t.scaleMode && 0 == t.canvasResolutionScaleMode || _JSEvents_resizeCanvasForFullscreen(e, t), e.requestFullscreen) e.requestFullscreen();
        else {
            if (!e.webkitRequestFullscreen) return JSEvents.fullscreenEnabled() ? -3 : -1;
            e.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
        }
        return __currentFullscreenStrategy = t, t.canvasResizedCallback && dynCall_iiii(t.canvasResizedCallback, 37, 0, t.canvasResizedCallbackUserData), 0
    }

    function _emscripten_exit_fullscreen() {
        if (!JSEvents.fullscreenEnabled()) return -1;
        JSEvents.removeDeferredCalls(_JSEvents_requestFullscreen);
        var e = specialHTMLTargets[1];
        if (e.exitFullscreen) e.fullscreenElement && e.exitFullscreen();
        else {
            if (!e.webkitExitFullscreen) return -1;
            e.webkitFullscreenElement && e.webkitExitFullscreen()
        }
        return 0
    }

    function __requestPointerLock(e) {
        if (e.requestPointerLock) e.requestPointerLock();
        else {
            if (!e.msRequestPointerLock) return document.body.requestPointerLock || document.body.msRequestPointerLock ? -3 : -1;
            e.msRequestPointerLock()
        }
        return 0
    }

    function _emscripten_exit_pointerlock() {
        if (JSEvents.removeDeferredCalls(__requestPointerLock), document.exitPointerLock) document.exitPointerLock();
        else {
            if (!document.msExitPointerLock) return -1;
            document.msExitPointerLock()
        }
        return 0
    }

    function _emscripten_get_device_pixel_ratio() {
        return "number" == typeof devicePixelRatio && devicePixelRatio || 1
    }

    function _emscripten_get_element_css_size(e, t, r) {
        if (!(e = __findEventTarget(e))) return -4;
        var n = __getBoundingClientRect(e);
        return HEAPF64[t >> 3] = n.width, HEAPF64[r >> 3] = n.height, 0
    }

    function __fillGamepadEventData(e, t) {
        HEAPF64[e >> 3] = t.timestamp;
        for (var r = 0; r < t.axes.length; ++r) HEAPF64[e + 8 * r + 16 >> 3] = t.axes[r];
        for (r = 0; r < t.buttons.length; ++r) "object" == typeof t.buttons[r] ? HEAPF64[e + 8 * r + 528 >> 3] = t.buttons[r].value : HEAPF64[e + 8 * r + 528 >> 3] = t.buttons[r];
        for (r = 0; r < t.buttons.length; ++r) "object" == typeof t.buttons[r] ? HEAP32[e + 4 * r + 1040 >> 2] = t.buttons[r].pressed : HEAP32[e + 4 * r + 1040 >> 2] = 1 == t.buttons[r];
        HEAP32[e + 1296 >> 2] = t.connected, HEAP32[e + 1300 >> 2] = t.index, HEAP32[e + 8 >> 2] = t.axes.length, HEAP32[e + 12 >> 2] = t.buttons.length, stringToUTF8(t.id, e + 1304, 64), stringToUTF8(t.mapping, e + 1368, 64)
    }

    function _emscripten_get_gamepad_status(e, t) {
        if (!JSEvents.lastGamepadState) throw "emscripten_get_gamepad_status() can only be called after having first called emscripten_sample_gamepad_data() and that function has returned EMSCRIPTEN_RESULT_SUCCESS!";
        return e < 0 || e >= JSEvents.lastGamepadState.length ? -5 : JSEvents.lastGamepadState[e] ? (__fillGamepadEventData(t, JSEvents.lastGamepadState[e]), 0) : -7
    }

    function _emscripten_get_num_gamepads() {
        if (!JSEvents.lastGamepadState) throw "emscripten_get_num_gamepads() can only be called after having first called emscripten_sample_gamepad_data() and that function has returned EMSCRIPTEN_RESULT_SUCCESS!";
        return JSEvents.lastGamepadState.length
    }

    function _emscripten_get_sbrk_ptr() {
        return 14836768
    }

    function _emscripten_glActiveTexture(e) {
        GLctx.activeTexture(e)
    }

    function _emscripten_glAttachShader(e, t) {
        GLctx.attachShader(GL.programs[e], GL.shaders[t])
    }

    function _emscripten_glBeginQueryEXT(e, t) {
        GLctx.disjointTimerQueryExt.beginQueryEXT(e, GL.timerQueriesEXT[t])
    }

    function _emscripten_glBindAttribLocation(e, t, r) {
        GLctx.bindAttribLocation(GL.programs[e], t, UTF8ToString(r))
    }

    function _emscripten_glBindBuffer(e, t) {
        GLctx.bindBuffer(e, GL.buffers[t])
    }

    function _emscripten_glBindFramebuffer(e, t) {
        GLctx.bindFramebuffer(e, GL.framebuffers[t])
    }

    function _emscripten_glBindRenderbuffer(e, t) {
        GLctx.bindRenderbuffer(e, GL.renderbuffers[t])
    }

    function _emscripten_glBindTexture(e, t) {
        GLctx.bindTexture(e, GL.textures[t])
    }

    function _emscripten_glBindVertexArrayOES(e) {
        GLctx.bindVertexArray(GL.vaos[e])
    }

    function _emscripten_glBlendColor(e, t, r, n) {
        GLctx.blendColor(e, t, r, n)
    }

    function _emscripten_glBlendEquation(e) {
        GLctx.blendEquation(e)
    }

    function _emscripten_glBlendEquationSeparate(e, t) {
        GLctx.blendEquationSeparate(e, t)
    }

    function _emscripten_glBlendFunc(e, t) {
        GLctx.blendFunc(e, t)
    }

    function _emscripten_glBlendFuncSeparate(e, t, r, n) {
        GLctx.blendFuncSeparate(e, t, r, n)
    }

    function _emscripten_glBufferData(e, t, r, n) {
        GLctx.bufferData(e, r ? HEAPU8.subarray(r, r + t) : t, n)
    }

    function _emscripten_glBufferSubData(e, t, r, n) {
        GLctx.bufferSubData(e, t, HEAPU8.subarray(n, n + r))
    }

    function _emscripten_glCheckFramebufferStatus(e) {
        return GLctx.checkFramebufferStatus(e)
    }

    function _emscripten_glClear(e) {
        GLctx.clear(e)
    }

    function _emscripten_glClearColor(e, t, r, n) {
        GLctx.clearColor(e, t, r, n)
    }

    function _emscripten_glClearDepthf(e) {
        GLctx.clearDepth(e)
    }

    function _emscripten_glClearStencil(e) {
        GLctx.clearStencil(e)
    }

    function _emscripten_glColorMask(e, t, r, n) {
        GLctx.colorMask(!!e, !!t, !!r, !!n)
    }

    function _emscripten_glCompileShader(e) {
        GLctx.compileShader(GL.shaders[e])
    }

    function _emscripten_glCompressedTexImage2D(e, t, r, n, o, i, a, s) {
        GLctx.compressedTexImage2D(e, t, r, n, o, i, s ? HEAPU8.subarray(s, s + a) : null)
    }

    function _emscripten_glCompressedTexSubImage2D(e, t, r, n, o, i, a, s, c) {
        GLctx.compressedTexSubImage2D(e, t, r, n, o, i, a, c ? HEAPU8.subarray(c, c + s) : null)
    }

    function _emscripten_glCopyTexImage2D(e, t, r, n, o, i, a, s) {
        GLctx.copyTexImage2D(e, t, r, n, o, i, a, s)
    }

    function _emscripten_glCopyTexSubImage2D(e, t, r, n, o, i, a, s) {
        GLctx.copyTexSubImage2D(e, t, r, n, o, i, a, s)
    }

    function _emscripten_glCreateProgram() {
        var e = GL.getNewId(GL.programs),
            t = GLctx.createProgram();
        return t.name = e, GL.programs[e] = t, e
    }

    function _emscripten_glCreateShader(e) {
        var t = GL.getNewId(GL.shaders);
        return GL.shaders[t] = GLctx.createShader(e), t
    }

    function _emscripten_glCullFace(e) {
        GLctx.cullFace(e)
    }

    function _emscripten_glDeleteBuffers(e, t) {
        for (var r = 0; r < e; r++) {
            var n = HEAP32[t + 4 * r >> 2],
                o = GL.buffers[n];
            o && (GLctx.deleteBuffer(o), o.name = 0, GL.buffers[n] = null)
        }
    }

    function _emscripten_glDeleteFramebuffers(e, t) {
        for (var r = 0; r < e; ++r) {
            var n = HEAP32[t + 4 * r >> 2],
                o = GL.framebuffers[n];
            o && (GLctx.deleteFramebuffer(o), o.name = 0, GL.framebuffers[n] = null)
        }
    }

    function _emscripten_glDeleteProgram(e) {
        if (e) {
            var t = GL.programs[e];
            t ? (GLctx.deleteProgram(t), t.name = 0, GL.programs[e] = null, GL.programInfos[e] = null) : GL.recordError(1281)
        }
    }

    function _emscripten_glDeleteQueriesEXT(e, t) {
        for (var r = 0; r < e; r++) {
            var n = HEAP32[t + 4 * r >> 2],
                o = GL.timerQueriesEXT[n];
            o && (GLctx.disjointTimerQueryExt.deleteQueryEXT(o), GL.timerQueriesEXT[n] = null)
        }
    }

    function _emscripten_glDeleteRenderbuffers(e, t) {
        for (var r = 0; r < e; r++) {
            var n = HEAP32[t + 4 * r >> 2],
                o = GL.renderbuffers[n];
            o && (GLctx.deleteRenderbuffer(o), o.name = 0, GL.renderbuffers[n] = null)
        }
    }

    function _emscripten_glDeleteShader(e) {
        if (e) {
            var t = GL.shaders[e];
            t ? (GLctx.deleteShader(t), GL.shaders[e] = null) : GL.recordError(1281)
        }
    }

    function _emscripten_glDeleteTextures(e, t) {
        for (var r = 0; r < e; r++) {
            var n = HEAP32[t + 4 * r >> 2],
                o = GL.textures[n];
            o && (GLctx.deleteTexture(o), o.name = 0, GL.textures[n] = null)
        }
    }

    function _emscripten_glDeleteVertexArraysOES(e, t) {
        for (var r = 0; r < e; r++) {
            var n = HEAP32[t + 4 * r >> 2];
            GLctx.deleteVertexArray(GL.vaos[n]), GL.vaos[n] = null
        }
    }

    function _emscripten_glDepthFunc(e) {
        GLctx.depthFunc(e)
    }

    function _emscripten_glDepthMask(e) {
        GLctx.depthMask(!!e)
    }

    function _emscripten_glDepthRangef(e, t) {
        GLctx.depthRange(e, t)
    }

    function _emscripten_glDetachShader(e, t) {
        GLctx.detachShader(GL.programs[e], GL.shaders[t])
    }

    function _emscripten_glDisable(e) {
        GLctx.disable(e)
    }

    function _emscripten_glDisableVertexAttribArray(e) {
        GLctx.disableVertexAttribArray(e)
    }

    function _emscripten_glDrawArrays(e, t, r) {
        GLctx.drawArrays(e, t, r)
    }

    function _emscripten_glDrawArraysInstancedANGLE(e, t, r, n) {
        GLctx.drawArraysInstanced(e, t, r, n)
    }
    var __tempFixedLengthArray = [];

    function _emscripten_glDrawBuffersWEBGL(e, t) {
        for (var r = __tempFixedLengthArray[e], n = 0; n < e; n++) r[n] = HEAP32[t + 4 * n >> 2];
        GLctx.drawBuffers(r)
    }

    function _emscripten_glDrawElements(e, t, r, n) {
        GLctx.drawElements(e, t, r, n)
    }

    function _emscripten_glDrawElementsInstancedANGLE(e, t, r, n, o) {
        GLctx.drawElementsInstanced(e, t, r, n, o)
    }

    function _emscripten_glEnable(e) {
        GLctx.enable(e)
    }

    function _emscripten_glEnableVertexAttribArray(e) {
        GLctx.enableVertexAttribArray(e)
    }

    function _emscripten_glEndQueryEXT(e) {
        GLctx.disjointTimerQueryExt.endQueryEXT(e)
    }

    function _emscripten_glFinish() {
        GLctx.finish()
    }

    function _emscripten_glFlush() {
        GLctx.flush()
    }

    function _emscripten_glFramebufferRenderbuffer(e, t, r, n) {
        GLctx.framebufferRenderbuffer(e, t, r, GL.renderbuffers[n])
    }

    function _emscripten_glFramebufferTexture2D(e, t, r, n, o) {
        GLctx.framebufferTexture2D(e, t, r, GL.textures[n], o)
    }

    function _emscripten_glFrontFace(e) {
        GLctx.frontFace(e)
    }

    function __glGenObject(e, t, r, n) {
        for (var o = 0; o < e; o++) {
            var i = GLctx[r](),
                a = i && GL.getNewId(n);
            i ? (i.name = a, n[a] = i) : GL.recordError(1282), HEAP32[t + 4 * o >> 2] = a
        }
    }

    function _emscripten_glGenBuffers(e, t) {
        __glGenObject(e, t, "createBuffer", GL.buffers)
    }

    function _emscripten_glGenFramebuffers(e, t) {
        __glGenObject(e, t, "createFramebuffer", GL.framebuffers)
    }

    function _emscripten_glGenQueriesEXT(e, t) {
        for (var r = 0; r < e; r++) {
            var n = GLctx.disjointTimerQueryExt.createQueryEXT();
            if (!n) {
                for (GL.recordError(1282); r < e;) HEAP32[t + 4 * r++ >> 2] = 0;
                return
            }
            var o = GL.getNewId(GL.timerQueriesEXT);
            n.name = o, GL.timerQueriesEXT[o] = n, HEAP32[t + 4 * r >> 2] = o
        }
    }

    function _emscripten_glGenRenderbuffers(e, t) {
        __glGenObject(e, t, "createRenderbuffer", GL.renderbuffers)
    }

    function _emscripten_glGenTextures(e, t) {
        __glGenObject(e, t, "createTexture", GL.textures)
    }

    function _emscripten_glGenVertexArraysOES(e, t) {
        __glGenObject(e, t, "createVertexArray", GL.vaos)
    }

    function _emscripten_glGenerateMipmap(e) {
        GLctx.generateMipmap(e)
    }

    function __glGetActiveAttribOrUniform(e, t, r, n, o, i, a, s) {
        t = GL.programs[t];
        var c = GLctx[e](t, r);
        if (c) {
            var l = s && stringToUTF8(c.name, s, n);
            o && (HEAP32[o >> 2] = l), i && (HEAP32[i >> 2] = c.size), a && (HEAP32[a >> 2] = c.type)
        }
    }

    function _emscripten_glGetActiveAttrib(e, t, r, n, o, i, a) {
        __glGetActiveAttribOrUniform("getActiveAttrib", e, t, r, n, o, i, a)
    }

    function _emscripten_glGetActiveUniform(e, t, r, n, o, i, a) {
        __glGetActiveAttribOrUniform("getActiveUniform", e, t, r, n, o, i, a)
    }

    function _emscripten_glGetAttachedShaders(e, t, r, n) {
        var o = GLctx.getAttachedShaders(GL.programs[e]),
            i = o.length;
        i > t && (i = t), HEAP32[r >> 2] = i;
        for (var a = 0; a < i; ++a) {
            var s = GL.shaders.indexOf(o[a]);
            HEAP32[n + 4 * a >> 2] = s
        }
    }

    function _emscripten_glGetAttribLocation(e, t) {
        return GLctx.getAttribLocation(GL.programs[e], UTF8ToString(t))
    }

    function readI53FromI64(e) {
        return HEAPU32[e >> 2] + 4294967296 * HEAP32[e + 4 >> 2]
    }

    function readI53FromU64(e) {
        return HEAPU32[e >> 2] + 4294967296 * HEAPU32[e + 4 >> 2]
    }

    function writeI53ToI64(e, t) {
        HEAPU32[e >> 2] = t, HEAPU32[e + 4 >> 2] = (t - HEAPU32[e >> 2]) / 4294967296;
        var r = t >= 0 ? readI53FromU64(e) : readI53FromI64(e);
        r != t && warnOnce("writeI53ToI64() out of range: serialized JS Number " + t + " to Wasm heap as bytes lo=0x" + HEAPU32[e >> 2].toString(16) + ", hi=0x" + HEAPU32[e + 4 >> 2].toString(16) + ", which deserializes back to " + r + " instead!")
    }

    function emscriptenWebGLGet(e, t, r) {
        if (t) {
            var n = void 0;
            switch (e) {
                case 36346:
                    n = 1;
                    break;
                case 36344:
                    return void(0 != r && 1 != r && GL.recordError(1280));
                case 36345:
                    n = 0;
                    break;
                case 34466:
                    var o = GLctx.getParameter(34467);
                    n = o ? o.length : 0
            }
            if (void 0 === n) {
                var i = GLctx.getParameter(e);
                switch (typeof i) {
                    case "number":
                        n = i;
                        break;
                    case "boolean":
                        n = i ? 1 : 0;
                        break;
                    case "string":
                        return void GL.recordError(1280);
                    case "object":
                        if (null === i) switch (e) {
                            case 34964:
                            case 35725:
                            case 34965:
                            case 36006:
                            case 36007:
                            case 32873:
                            case 34229:
                            case 34068:
                                n = 0;
                                break;
                            default:
                                return void GL.recordError(1280)
                        } else {
                            if (i instanceof Float32Array || i instanceof Uint32Array || i instanceof Int32Array || i instanceof Array) {
                                for (var a = 0; a < i.length; ++a) switch (r) {
                                    case 0:
                                        HEAP32[t + 4 * a >> 2] = i[a];
                                        break;
                                    case 2:
                                        HEAPF32[t + 4 * a >> 2] = i[a];
                                        break;
                                    case 4:
                                        HEAP8[t + a >> 0] = i[a] ? 1 : 0
                                }
                                return
                            }
                            try {
                                n = 0 | i.name
                            } catch (t) {
                                return GL.recordError(1280), void err("GL_INVALID_ENUM in glGet" + r + "v: Unknown object returned from WebGL getParameter(" + e + ")! (error: " + t + ")")
                            }
                        }
                        break;
                    default:
                        return GL.recordError(1280), void err("GL_INVALID_ENUM in glGet" + r + "v: Native code calling glGet" + r + "v(" + e + ") and it returns " + i + " of type " + typeof i + "!")
                }
            }
            switch (r) {
                case 1:
                    writeI53ToI64(t, n);
                    break;
                case 0:
                    HEAP32[t >> 2] = n;
                    break;
                case 2:
                    HEAPF32[t >> 2] = n;
                    break;
                case 4:
                    HEAP8[t >> 0] = n ? 1 : 0
            }
        } else GL.recordError(1281)
    }

    function _emscripten_glGetBooleanv(e, t) {
        emscriptenWebGLGet(e, t, 4)
    }

    function _emscripten_glGetBufferParameteriv(e, t, r) {
        r ? HEAP32[r >> 2] = GLctx.getBufferParameter(e, t) : GL.recordError(1281)
    }

    function _emscripten_glGetError() {
        var e = GLctx.getError() || GL.lastError;
        return GL.lastError = 0, e
    }

    function _emscripten_glGetFloatv(e, t) {
        emscriptenWebGLGet(e, t, 2)
    }

    function _emscripten_glGetFramebufferAttachmentParameteriv(e, t, r, n) {
        var o = GLctx.getFramebufferAttachmentParameter(e, t, r);
        (o instanceof WebGLRenderbuffer || o instanceof WebGLTexture) && (o = 0 | o.name), HEAP32[n >> 2] = o
    }

    function _emscripten_glGetIntegerv(e, t) {
        emscriptenWebGLGet(e, t, 0)
    }

    function _emscripten_glGetProgramInfoLog(e, t, r, n) {
        var o = GLctx.getProgramInfoLog(GL.programs[e]);
        null === o && (o = "(unknown error)");
        var i = t > 0 && n ? stringToUTF8(o, n, t) : 0;
        r && (HEAP32[r >> 2] = i)
    }

    function _emscripten_glGetProgramiv(e, t, r) {
        if (r)
            if (e >= GL.counter) GL.recordError(1281);
            else {
                var n = GL.programInfos[e];
                if (n)
                    if (35716 == t) {
                        var o = GLctx.getProgramInfoLog(GL.programs[e]);
                        null === o && (o = "(unknown error)"), HEAP32[r >> 2] = o.length + 1
                    } else if (35719 == t) HEAP32[r >> 2] = n.maxUniformLength;
                else if (35722 == t) {
                    if (-1 == n.maxAttributeLength) {
                        e = GL.programs[e];
                        var i = GLctx.getProgramParameter(e, 35721);
                        n.maxAttributeLength = 0;
                        for (var a = 0; a < i; ++a) {
                            var s = GLctx.getActiveAttrib(e, a);
                            n.maxAttributeLength = Math.max(n.maxAttributeLength, s.name.length + 1)
                        }
                    }
                    HEAP32[r >> 2] = n.maxAttributeLength
                } else if (35381 == t) {
                    if (-1 == n.maxUniformBlockNameLength) {
                        e = GL.programs[e];
                        var c = GLctx.getProgramParameter(e, 35382);
                        n.maxUniformBlockNameLength = 0;
                        for (a = 0; a < c; ++a) {
                            var l = GLctx.getActiveUniformBlockName(e, a);
                            n.maxUniformBlockNameLength = Math.max(n.maxUniformBlockNameLength, l.length + 1)
                        }
                    }
                    HEAP32[r >> 2] = n.maxUniformBlockNameLength
                } else HEAP32[r >> 2] = GLctx.getProgramParameter(GL.programs[e], t);
                else GL.recordError(1282)
            }
        else GL.recordError(1281)
    }

    function _emscripten_glGetQueryObjecti64vEXT(e, t, r) {
        if (r) {
            var n = GL.timerQueriesEXT[e],
                o = GLctx.disjointTimerQueryExt.getQueryObjectEXT(n, t);
            writeI53ToI64(r, "boolean" == typeof o ? o ? 1 : 0 : o)
        } else GL.recordError(1281)
    }

    function _emscripten_glGetQueryObjectivEXT(e, t, r) {
        if (r) {
            var n, o = GL.timerQueriesEXT[e],
                i = GLctx.disjointTimerQueryExt.getQueryObjectEXT(o, t);
            n = "boolean" == typeof i ? i ? 1 : 0 : i, HEAP32[r >> 2] = n
        } else GL.recordError(1281)
    }

    function _emscripten_glGetQueryObjectui64vEXT(e, t, r) {
        if (r) {
            var n = GL.timerQueriesEXT[e],
                o = GLctx.disjointTimerQueryExt.getQueryObjectEXT(n, t);
            writeI53ToI64(r, "boolean" == typeof o ? o ? 1 : 0 : o)
        } else GL.recordError(1281)
    }

    function _emscripten_glGetQueryObjectuivEXT(e, t, r) {
        if (r) {
            var n, o = GL.timerQueriesEXT[e],
                i = GLctx.disjointTimerQueryExt.getQueryObjectEXT(o, t);
            n = "boolean" == typeof i ? i ? 1 : 0 : i, HEAP32[r >> 2] = n
        } else GL.recordError(1281)
    }

    function _emscripten_glGetQueryivEXT(e, t, r) {
        r ? HEAP32[r >> 2] = GLctx.disjointTimerQueryExt.getQueryEXT(e, t) : GL.recordError(1281)
    }

    function _emscripten_glGetRenderbufferParameteriv(e, t, r) {
        r ? HEAP32[r >> 2] = GLctx.getRenderbufferParameter(e, t) : GL.recordError(1281)
    }

    function _emscripten_glGetShaderInfoLog(e, t, r, n) {
        var o = GLctx.getShaderInfoLog(GL.shaders[e]);
        null === o && (o = "(unknown error)");
        var i = t > 0 && n ? stringToUTF8(o, n, t) : 0;
        r && (HEAP32[r >> 2] = i)
    }

    function _emscripten_glGetShaderPrecisionFormat(e, t, r, n) {
        var o = GLctx.getShaderPrecisionFormat(e, t);
        HEAP32[r >> 2] = o.rangeMin, HEAP32[r + 4 >> 2] = o.rangeMax, HEAP32[n >> 2] = o.precision
    }

    function _emscripten_glGetShaderSource(e, t, r, n) {
        var o = GLctx.getShaderSource(GL.shaders[e]);
        if (o) {
            var i = t > 0 && n ? stringToUTF8(o, n, t) : 0;
            r && (HEAP32[r >> 2] = i)
        }
    }

    function _emscripten_glGetShaderiv(e, t, r) {
        if (r)
            if (35716 == t) {
                var n = GLctx.getShaderInfoLog(GL.shaders[e]);
                null === n && (n = "(unknown error)"), HEAP32[r >> 2] = n.length + 1
            } else if (35720 == t) {
            var o = GLctx.getShaderSource(GL.shaders[e]),
                i = null === o || 0 == o.length ? 0 : o.length + 1;
            HEAP32[r >> 2] = i
        } else HEAP32[r >> 2] = GLctx.getShaderParameter(GL.shaders[e], t);
        else GL.recordError(1281)
    }

    function stringToNewUTF8(e) {
        var t = lengthBytesUTF8(e) + 1,
            r = _malloc(t);
        return stringToUTF8(e, r, t), r
    }

    function _emscripten_glGetString(e) {
        if (GL.stringCache[e]) return GL.stringCache[e];
        var t;
        switch (e) {
            case 7939:
                var r = GLctx.getSupportedExtensions() || [];
                t = stringToNewUTF8((r = r.concat(r.map((function(e) {
                    return "GL_" + e
                })))).join(" "));
                break;
            case 7936:
            case 7937:
            case 37445:
            case 37446:
                var n = GLctx.getParameter(e);
                n || GL.recordError(1280), t = stringToNewUTF8(n);
                break;
            case 7938:
                var o = GLctx.getParameter(7938);
                t = stringToNewUTF8(o = "OpenGL ES 2.0 (" + o + ")");
                break;
            case 35724:
                var i = GLctx.getParameter(35724),
                    a = i.match(/^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/);
                null !== a && (3 == a[1].length && (a[1] = a[1] + "0"), i = "OpenGL ES GLSL ES " + a[1] + " (" + i + ")"), t = stringToNewUTF8(i);
                break;
            default:
                return GL.recordError(1280), 0
        }
        return GL.stringCache[e] = t, t
    }

    function _emscripten_glGetTexParameterfv(e, t, r) {
        r ? HEAPF32[r >> 2] = GLctx.getTexParameter(e, t) : GL.recordError(1281)
    }

    function _emscripten_glGetTexParameteriv(e, t, r) {
        r ? HEAP32[r >> 2] = GLctx.getTexParameter(e, t) : GL.recordError(1281)
    }

    function jstoi_q(e) {
        return parseInt(e)
    }

    function _emscripten_glGetUniformLocation(e, t) {
        var r = 0;
        if ("]" == (t = UTF8ToString(t))[t.length - 1]) {
            var n = t.lastIndexOf("[");
            r = "]" != t[n + 1] ? jstoi_q(t.slice(n + 1)) : 0, t = t.slice(0, n)
        }
        var o = GL.programInfos[e] && GL.programInfos[e].uniforms[t];
        return o && r >= 0 && r < o[0] ? o[1] + r : -1
    }

    function emscriptenWebGLGetUniform(e, t, r, n) {
        if (r) {
            var o = GLctx.getUniform(GL.programs[e], GL.uniforms[t]);
            if ("number" == typeof o || "boolean" == typeof o) switch (n) {
                case 0:
                    HEAP32[r >> 2] = o;
                    break;
                case 2:
                    HEAPF32[r >> 2] = o;
                    break;
                default:
                    throw "internal emscriptenWebGLGetUniform() error, bad type: " + n
            } else
                for (var i = 0; i < o.length; i++) switch (n) {
                    case 0:
                        HEAP32[r + 4 * i >> 2] = o[i];
                        break;
                    case 2:
                        HEAPF32[r + 4 * i >> 2] = o[i];
                        break;
                    default:
                        throw "internal emscriptenWebGLGetUniform() error, bad type: " + n
                }
        } else GL.recordError(1281)
    }

    function _emscripten_glGetUniformfv(e, t, r) {
        emscriptenWebGLGetUniform(e, t, r, 2)
    }

    function _emscripten_glGetUniformiv(e, t, r) {
        emscriptenWebGLGetUniform(e, t, r, 0)
    }

    function _emscripten_glGetVertexAttribPointerv(e, t, r) {
        r ? HEAP32[r >> 2] = GLctx.getVertexAttribOffset(e, t) : GL.recordError(1281)
    }

    function emscriptenWebGLGetVertexAttrib(e, t, r, n) {
        if (r) {
            var o = GLctx.getVertexAttrib(e, t);
            if (34975 == t) HEAP32[r >> 2] = o && o.name;
            else if ("number" == typeof o || "boolean" == typeof o) switch (n) {
                case 0:
                    HEAP32[r >> 2] = o;
                    break;
                case 2:
                    HEAPF32[r >> 2] = o;
                    break;
                case 5:
                    HEAP32[r >> 2] = Math.fround(o);
                    break;
                default:
                    throw "internal emscriptenWebGLGetVertexAttrib() error, bad type: " + n
            } else
                for (var i = 0; i < o.length; i++) switch (n) {
                    case 0:
                        HEAP32[r + 4 * i >> 2] = o[i];
                        break;
                    case 2:
                        HEAPF32[r + 4 * i >> 2] = o[i];
                        break;
                    case 5:
                        HEAP32[r + 4 * i >> 2] = Math.fround(o[i]);
                        break;
                    default:
                        throw "internal emscriptenWebGLGetVertexAttrib() error, bad type: " + n
                }
        } else GL.recordError(1281)
    }

    function _emscripten_glGetVertexAttribfv(e, t, r) {
        emscriptenWebGLGetVertexAttrib(e, t, r, 2)
    }

    function _emscripten_glGetVertexAttribiv(e, t, r) {
        emscriptenWebGLGetVertexAttrib(e, t, r, 5)
    }

    function _emscripten_glHint(e, t) {
        GLctx.hint(e, t)
    }

    function _emscripten_glIsBuffer(e) {
        var t = GL.buffers[e];
        return t ? GLctx.isBuffer(t) : 0
    }

    function _emscripten_glIsEnabled(e) {
        return GLctx.isEnabled(e)
    }

    function _emscripten_glIsFramebuffer(e) {
        var t = GL.framebuffers[e];
        return t ? GLctx.isFramebuffer(t) : 0
    }

    function _emscripten_glIsProgram(e) {
        return (e = GL.programs[e]) ? GLctx.isProgram(e) : 0
    }

    function _emscripten_glIsQueryEXT(e) {
        var t = GL.timerQueriesEXT[e];
        return t ? GLctx.disjointTimerQueryExt.isQueryEXT(t) : 0
    }

    function _emscripten_glIsRenderbuffer(e) {
        var t = GL.renderbuffers[e];
        return t ? GLctx.isRenderbuffer(t) : 0
    }

    function _emscripten_glIsShader(e) {
        var t = GL.shaders[e];
        return t ? GLctx.isShader(t) : 0
    }

    function _emscripten_glIsTexture(e) {
        var t = GL.textures[e];
        return t ? GLctx.isTexture(t) : 0
    }

    function _emscripten_glIsVertexArrayOES(e) {
        var t = GL.vaos[e];
        return t ? GLctx.isVertexArray(t) : 0
    }

    function _emscripten_glLineWidth(e) {
        GLctx.lineWidth(e)
    }

    function _emscripten_glLinkProgram(e) {
        GLctx.linkProgram(GL.programs[e]), GL.populateUniformTable(e)
    }

    function _emscripten_glPixelStorei(e, t) {
        3317 == e && (GL.unpackAlignment = t), GLctx.pixelStorei(e, t)
    }

    function _emscripten_glPolygonOffset(e, t) {
        GLctx.polygonOffset(e, t)
    }

    function _emscripten_glQueryCounterEXT(e, t) {
        GLctx.disjointTimerQueryExt.queryCounterEXT(GL.timerQueriesEXT[e], t)
    }

    function __computeUnpackAlignedImageSize(e, t, r, n) {
        var o;
        return t * (e * r + (o = n) - 1 & -o)
    }

    function __colorChannelsInGlTextureFormat(e) {
        return {
            5: 3,
            6: 4,
            8: 2,
            29502: 3,
            29504: 4
        } [e - 6402] || 1
    }

    function __heapObjectForWebGLType(e) {
        return 1 == (e -= 5120) ? HEAPU8 : 4 == e ? HEAP32 : 6 == e ? HEAPF32 : 5 == e || 28922 == e ? HEAPU32 : HEAPU16
    }

    function __heapAccessShiftForWebGLHeap(e) {
        return 31 - Math.clz32(e.BYTES_PER_ELEMENT)
    }

    function emscriptenWebGLGetTexPixelData(e, t, r, n, o, i) {
        var a = __heapObjectForWebGLType(e),
            s = __heapAccessShiftForWebGLHeap(a),
            c = 1 << s,
            l = __computeUnpackAlignedImageSize(r, n, __colorChannelsInGlTextureFormat(t) * c, GL.unpackAlignment);
        return a.subarray(o >> s, o + l >> s)
    }

    function _emscripten_glReadPixels(e, t, r, n, o, i, a) {
        var s = emscriptenWebGLGetTexPixelData(i, o, r, n, a, o);
        s ? GLctx.readPixels(e, t, r, n, o, i, s) : GL.recordError(1280)
    }

    function _emscripten_glReleaseShaderCompiler() {}

    function _emscripten_glRenderbufferStorage(e, t, r, n) {
        GLctx.renderbufferStorage(e, t, r, n)
    }

    function _emscripten_glSampleCoverage(e, t) {
        GLctx.sampleCoverage(e, !!t)
    }

    function _emscripten_glScissor(e, t, r, n) {
        GLctx.scissor(e, t, r, n)
    }

    function _emscripten_glShaderBinary() {
        GL.recordError(1280)
    }

    function _emscripten_glShaderSource(e, t, r, n) {
        var o = GL.getSource(e, t, r, n);
        GLctx.shaderSource(GL.shaders[e], o)
    }

    function _emscripten_glStencilFunc(e, t, r) {
        GLctx.stencilFunc(e, t, r)
    }

    function _emscripten_glStencilFuncSeparate(e, t, r, n) {
        GLctx.stencilFuncSeparate(e, t, r, n)
    }

    function _emscripten_glStencilMask(e) {
        GLctx.stencilMask(e)
    }

    function _emscripten_glStencilMaskSeparate(e, t) {
        GLctx.stencilMaskSeparate(e, t)
    }

    function _emscripten_glStencilOp(e, t, r) {
        GLctx.stencilOp(e, t, r)
    }

    function _emscripten_glStencilOpSeparate(e, t, r, n) {
        GLctx.stencilOpSeparate(e, t, r, n)
    }

    function _emscripten_glTexImage2D(e, t, r, n, o, i, a, s, c) {
        GLctx.texImage2D(e, t, r, n, o, i, a, s, c ? emscriptenWebGLGetTexPixelData(s, a, n, o, c, r) : null)
    }

    function _emscripten_glTexParameterf(e, t, r) {
        GLctx.texParameterf(e, t, r)
    }

    function _emscripten_glTexParameterfv(e, t, r) {
        var n = HEAPF32[r >> 2];
        GLctx.texParameterf(e, t, n)
    }

    function _emscripten_glTexParameteri(e, t, r) {
        GLctx.texParameteri(e, t, r)
    }

    function _emscripten_glTexParameteriv(e, t, r) {
        var n = HEAP32[r >> 2];
        GLctx.texParameteri(e, t, n)
    }

    function _emscripten_glTexSubImage2D(e, t, r, n, o, i, a, s, c) {
        var l = null;
        c && (l = emscriptenWebGLGetTexPixelData(s, a, o, i, c, 0)), GLctx.texSubImage2D(e, t, r, n, o, i, a, s, l)
    }

    function _emscripten_glUniform1f(e, t) {
        GLctx.uniform1f(GL.uniforms[e], t)
    }
    var __miniTempWebGLFloatBuffers = [];

    function _emscripten_glUniform1fv(e, t, r) {
        if (t <= 288)
            for (var n = __miniTempWebGLFloatBuffers[t - 1], o = 0; o < t; ++o) n[o] = HEAPF32[r + 4 * o >> 2];
        else n = HEAPF32.subarray(r >> 2, r + 4 * t >> 2);
        GLctx.uniform1fv(GL.uniforms[e], n)
    }

    function _emscripten_glUniform1i(e, t) {
        GLctx.uniform1i(GL.uniforms[e], t)
    }
    var __miniTempWebGLIntBuffers = [];

    function _emscripten_glUniform1iv(e, t, r) {
        if (t <= 288)
            for (var n = __miniTempWebGLIntBuffers[t - 1], o = 0; o < t; ++o) n[o] = HEAP32[r + 4 * o >> 2];
        else n = HEAP32.subarray(r >> 2, r + 4 * t >> 2);
        GLctx.uniform1iv(GL.uniforms[e], n)
    }

    function _emscripten_glUniform2f(e, t, r) {
        GLctx.uniform2f(GL.uniforms[e], t, r)
    }

    function _emscripten_glUniform2fv(e, t, r) {
        if (t <= 144)
            for (var n = __miniTempWebGLFloatBuffers[2 * t - 1], o = 0; o < 2 * t; o += 2) n[o] = HEAPF32[r + 4 * o >> 2], n[o + 1] = HEAPF32[r + (4 * o + 4) >> 2];
        else n = HEAPF32.subarray(r >> 2, r + 8 * t >> 2);
        GLctx.uniform2fv(GL.uniforms[e], n)
    }

    function _emscripten_glUniform2i(e, t, r) {
        GLctx.uniform2i(GL.uniforms[e], t, r)
    }

    function _emscripten_glUniform2iv(e, t, r) {
        if (t <= 144)
            for (var n = __miniTempWebGLIntBuffers[2 * t - 1], o = 0; o < 2 * t; o += 2) n[o] = HEAP32[r + 4 * o >> 2], n[o + 1] = HEAP32[r + (4 * o + 4) >> 2];
        else n = HEAP32.subarray(r >> 2, r + 8 * t >> 2);
        GLctx.uniform2iv(GL.uniforms[e], n)
    }

    function _emscripten_glUniform3f(e, t, r, n) {
        GLctx.uniform3f(GL.uniforms[e], t, r, n)
    }

    function _emscripten_glUniform3fv(e, t, r) {
        if (t <= 96)
            for (var n = __miniTempWebGLFloatBuffers[3 * t - 1], o = 0; o < 3 * t; o += 3) n[o] = HEAPF32[r + 4 * o >> 2], n[o + 1] = HEAPF32[r + (4 * o + 4) >> 2], n[o + 2] = HEAPF32[r + (4 * o + 8) >> 2];
        else n = HEAPF32.subarray(r >> 2, r + 12 * t >> 2);
        GLctx.uniform3fv(GL.uniforms[e], n)
    }

    function _emscripten_glUniform3i(e, t, r, n) {
        GLctx.uniform3i(GL.uniforms[e], t, r, n)
    }

    function _emscripten_glUniform3iv(e, t, r) {
        if (t <= 96)
            for (var n = __miniTempWebGLIntBuffers[3 * t - 1], o = 0; o < 3 * t; o += 3) n[o] = HEAP32[r + 4 * o >> 2], n[o + 1] = HEAP32[r + (4 * o + 4) >> 2], n[o + 2] = HEAP32[r + (4 * o + 8) >> 2];
        else n = HEAP32.subarray(r >> 2, r + 12 * t >> 2);
        GLctx.uniform3iv(GL.uniforms[e], n)
    }

    function _emscripten_glUniform4f(e, t, r, n, o) {
        GLctx.uniform4f(GL.uniforms[e], t, r, n, o)
    }

    function _emscripten_glUniform4fv(e, t, r) {
        if (t <= 72) {
            var n = __miniTempWebGLFloatBuffers[4 * t - 1],
                o = HEAPF32;
            r >>= 2;
            for (var i = 0; i < 4 * t; i += 4) {
                var a = r + i;
                n[i] = o[a], n[i + 1] = o[a + 1], n[i + 2] = o[a + 2], n[i + 3] = o[a + 3]
            }
        } else n = HEAPF32.subarray(r >> 2, r + 16 * t >> 2);
        GLctx.uniform4fv(GL.uniforms[e], n)
    }

    function _emscripten_glUniform4i(e, t, r, n, o) {
        GLctx.uniform4i(GL.uniforms[e], t, r, n, o)
    }

    function _emscripten_glUniform4iv(e, t, r) {
        if (t <= 72)
            for (var n = __miniTempWebGLIntBuffers[4 * t - 1], o = 0; o < 4 * t; o += 4) n[o] = HEAP32[r + 4 * o >> 2], n[o + 1] = HEAP32[r + (4 * o + 4) >> 2], n[o + 2] = HEAP32[r + (4 * o + 8) >> 2], n[o + 3] = HEAP32[r + (4 * o + 12) >> 2];
        else n = HEAP32.subarray(r >> 2, r + 16 * t >> 2);
        GLctx.uniform4iv(GL.uniforms[e], n)
    }

    function _emscripten_glUniformMatrix2fv(e, t, r, n) {
        if (t <= 72)
            for (var o = __miniTempWebGLFloatBuffers[4 * t - 1], i = 0; i < 4 * t; i += 4) o[i] = HEAPF32[n + 4 * i >> 2], o[i + 1] = HEAPF32[n + (4 * i + 4) >> 2], o[i + 2] = HEAPF32[n + (4 * i + 8) >> 2], o[i + 3] = HEAPF32[n + (4 * i + 12) >> 2];
        else o = HEAPF32.subarray(n >> 2, n + 16 * t >> 2);
        GLctx.uniformMatrix2fv(GL.uniforms[e], !!r, o)
    }

    function _emscripten_glUniformMatrix3fv(e, t, r, n) {
        if (t <= 32)
            for (var o = __miniTempWebGLFloatBuffers[9 * t - 1], i = 0; i < 9 * t; i += 9) o[i] = HEAPF32[n + 4 * i >> 2], o[i + 1] = HEAPF32[n + (4 * i + 4) >> 2], o[i + 2] = HEAPF32[n + (4 * i + 8) >> 2], o[i + 3] = HEAPF32[n + (4 * i + 12) >> 2], o[i + 4] = HEAPF32[n + (4 * i + 16) >> 2], o[i + 5] = HEAPF32[n + (4 * i + 20) >> 2], o[i + 6] = HEAPF32[n + (4 * i + 24) >> 2], o[i + 7] = HEAPF32[n + (4 * i + 28) >> 2], o[i + 8] = HEAPF32[n + (4 * i + 32) >> 2];
        else o = HEAPF32.subarray(n >> 2, n + 36 * t >> 2);
        GLctx.uniformMatrix3fv(GL.uniforms[e], !!r, o)
    }

    function _emscripten_glUniformMatrix4fv(e, t, r, n) {
        if (t <= 18) {
            var o = __miniTempWebGLFloatBuffers[16 * t - 1],
                i = HEAPF32;
            n >>= 2;
            for (var a = 0; a < 16 * t; a += 16) {
                var s = n + a;
                o[a] = i[s], o[a + 1] = i[s + 1], o[a + 2] = i[s + 2], o[a + 3] = i[s + 3], o[a + 4] = i[s + 4], o[a + 5] = i[s + 5], o[a + 6] = i[s + 6], o[a + 7] = i[s + 7], o[a + 8] = i[s + 8], o[a + 9] = i[s + 9], o[a + 10] = i[s + 10], o[a + 11] = i[s + 11], o[a + 12] = i[s + 12], o[a + 13] = i[s + 13], o[a + 14] = i[s + 14], o[a + 15] = i[s + 15]
            }
        } else o = HEAPF32.subarray(n >> 2, n + 64 * t >> 2);
        GLctx.uniformMatrix4fv(GL.uniforms[e], !!r, o)
    }

    function _emscripten_glUseProgram(e) {
        GLctx.useProgram(GL.programs[e])
    }

    function _emscripten_glValidateProgram(e) {
        GLctx.validateProgram(GL.programs[e])
    }

    function _emscripten_glVertexAttrib1f(e, t) {
        GLctx.vertexAttrib1f(e, t)
    }

    function _emscripten_glVertexAttrib1fv(e, t) {
        GLctx.vertexAttrib1f(e, HEAPF32[t >> 2])
    }

    function _emscripten_glVertexAttrib2f(e, t, r) {
        GLctx.vertexAttrib2f(e, t, r)
    }

    function _emscripten_glVertexAttrib2fv(e, t) {
        GLctx.vertexAttrib2f(e, HEAPF32[t >> 2], HEAPF32[t + 4 >> 2])
    }

    function _emscripten_glVertexAttrib3f(e, t, r, n) {
        GLctx.vertexAttrib3f(e, t, r, n)
    }

    function _emscripten_glVertexAttrib3fv(e, t) {
        GLctx.vertexAttrib3f(e, HEAPF32[t >> 2], HEAPF32[t + 4 >> 2], HEAPF32[t + 8 >> 2])
    }

    function _emscripten_glVertexAttrib4f(e, t, r, n, o) {
        GLctx.vertexAttrib4f(e, t, r, n, o)
    }

    function _emscripten_glVertexAttrib4fv(e, t) {
        GLctx.vertexAttrib4f(e, HEAPF32[t >> 2], HEAPF32[t + 4 >> 2], HEAPF32[t + 8 >> 2], HEAPF32[t + 12 >> 2])
    }

    function _emscripten_glVertexAttribDivisorANGLE(e, t) {
        GLctx.vertexAttribDivisor(e, t)
    }

    function _emscripten_glVertexAttribPointer(e, t, r, n, o, i) {
        GLctx.vertexAttribPointer(e, t, r, !!n, o, i)
    }

    function _emscripten_glViewport(e, t, r, n) {
        GLctx.viewport(e, t, r, n)
    }

    function _emscripten_has_asyncify() {
        return 0
    }

    function _emscripten_memcpy_big(e, t, r) {
        HEAPU8.copyWithin(e, t, t + r)
    }

    function __emscripten_do_request_fullscreen(e, t) {
        return JSEvents.fullscreenEnabled() ? (e = __findEventTarget(e)) ? e.requestFullscreen || e.webkitRequestFullscreen ? JSEvents.canPerformEventHandlerRequests() ? _JSEvents_requestFullscreen(e, t) : t.deferUntilInEventHandler ? (JSEvents.deferCall(_JSEvents_requestFullscreen, 1, [e, t]), 1) : -2 : -3 : -4 : -1
    }

    function _emscripten_request_fullscreen_strategy(e, t, r) {
        return __emscripten_do_request_fullscreen(e, {
            scaleMode: HEAP32[r >> 2],
            canvasResolutionScaleMode: HEAP32[r + 4 >> 2],
            filteringMode: HEAP32[r + 8 >> 2],
            deferUntilInEventHandler: t,
            canvasResizedCallback: HEAP32[r + 12 >> 2],
            canvasResizedCallbackUserData: HEAP32[r + 16 >> 2]
        })
    }

    function _emscripten_request_pointerlock(e, t) {
        return (e = __findEventTarget(e)) ? e.requestPointerLock || e.msRequestPointerLock ? JSEvents.canPerformEventHandlerRequests() ? __requestPointerLock(e) : t ? (JSEvents.deferCall(__requestPointerLock, 2, [e]), 1) : -2 : -1 : -4
    }

    function _emscripten_get_heap_size() {
        return HEAPU8.length
    }

    function abortOnCannotGrowMemory(e) {
        abort("Cannot enlarge memory arrays to size " + e + " bytes (OOM). Either (1) compile with  -s INITIAL_MEMORY=X  with X higher than the current value " + HEAP8.length + ", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ")
    }

    function _emscripten_resize_heap(e) {
        abortOnCannotGrowMemory(e >>>= 0)
    }

    function _emscripten_sample_gamepad_data() {
        return (JSEvents.lastGamepadState = navigator.getGamepads ? navigator.getGamepads() : navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : null) ? 0 : -1
    }

    function __registerBeforeUnloadEventCallback(e, t, r, n, o, i) {
        var a = {
            target: __findEventTarget(e),
            eventTypeString: i,
            callbackfunc: n,
            handlerFunc: function(e) {
                var r = e || event,
                    i = dynCall_iiii(n, o, 0, t);
                if (i && (i = UTF8ToString(i)), i) return r.preventDefault(), r.returnValue = i, i
            },
            useCapture: r
        };
        JSEvents.registerOrRemoveHandler(a)
    }

    function _emscripten_set_beforeunload_callback_on_thread(e, t, r) {
        return "undefined" == typeof onbeforeunload ? -1 : 1 !== r ? -5 : (__registerBeforeUnloadEventCallback(2, e, !0, t, 28, "beforeunload"), 0)
    }

    function __registerFocusEventCallback(e, t, r, n, o, i, a) {
        JSEvents.focusEvent || (JSEvents.focusEvent = _malloc(256));
        var s = {
            target: __findEventTarget(e),
            eventTypeString: i,
            callbackfunc: n,
            handlerFunc: function(e) {
                var r = e || event,
                    i = JSEvents.getNodeNameForTarget(r.target),
                    a = r.target.id ? r.target.id : "",
                    s = JSEvents.focusEvent;
                stringToUTF8(i, s + 0, 128), stringToUTF8(a, s + 128, 128), dynCall_iiii(n, o, s, t) && r.preventDefault()
            },
            useCapture: r
        };
        JSEvents.registerOrRemoveHandler(s)
    }

    function _emscripten_set_blur_callback_on_thread(e, t, r, n, o) {
        return __registerFocusEventCallback(e, t, r, n, 12, "blur", o), 0
    }

    function _emscripten_set_element_css_size(e, t, r) {
        return (e = __findEventTarget(e)) ? (e.style.width = t + "px", e.style.height = r + "px", 0) : -4
    }

    function _emscripten_set_focus_callback_on_thread(e, t, r, n, o) {
        return __registerFocusEventCallback(e, t, r, n, 13, "focus", o), 0
    }

    function __fillFullscreenChangeEventData(e) {
        var t = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement,
            r = !!t;
        HEAP32[e >> 2] = r, HEAP32[e + 4 >> 2] = JSEvents.fullscreenEnabled();
        var n = r ? t : JSEvents.previousFullscreenElement,
            o = JSEvents.getNodeNameForTarget(n),
            i = n && n.id ? n.id : "";
        stringToUTF8(o, e + 8, 128), stringToUTF8(i, e + 136, 128), HEAP32[e + 264 >> 2] = n ? n.clientWidth : 0, HEAP32[e + 268 >> 2] = n ? n.clientHeight : 0, HEAP32[e + 272 >> 2] = screen.width, HEAP32[e + 276 >> 2] = screen.height, r && (JSEvents.previousFullscreenElement = t)
    }

    function __registerFullscreenChangeEventCallback(e, t, r, n, o, i, a) {
        JSEvents.fullscreenChangeEvent || (JSEvents.fullscreenChangeEvent = _malloc(280));
        var s = {
            target: e,
            eventTypeString: i,
            callbackfunc: n,
            handlerFunc: function(e) {
                var r = e || event,
                    i = JSEvents.fullscreenChangeEvent;
                __fillFullscreenChangeEventData(i), dynCall_iiii(n, o, i, t) && r.preventDefault()
            },
            useCapture: r
        };
        JSEvents.registerOrRemoveHandler(s)
    }

    function _emscripten_set_fullscreenchange_callback_on_thread(e, t, r, n, o) {
        return JSEvents.fullscreenEnabled() ? (e = __findEventTarget(e)) ? (__registerFullscreenChangeEventCallback(e, t, r, n, 19, "fullscreenchange", o), __registerFullscreenChangeEventCallback(e, t, r, n, 19, "webkitfullscreenchange", o), 0) : -4 : -1
    }

    function __registerGamepadEventCallback(e, t, r, n, o, i, a) {
        JSEvents.gamepadEvent || (JSEvents.gamepadEvent = _malloc(1432));
        var s = {
            target: __findEventTarget(e),
            allowsDeferredCalls: !0,
            eventTypeString: i,
            callbackfunc: n,
            handlerFunc: function(e) {
                var r = e || event,
                    i = JSEvents.gamepadEvent;
                __fillGamepadEventData(i, r.gamepad), dynCall_iiii(n, o, i, t) && r.preventDefault()
            },
            useCapture: r
        };
        JSEvents.registerOrRemoveHandler(s)
    }

    function _emscripten_set_gamepadconnected_callback_on_thread(e, t, r, n) {
        return navigator.getGamepads || navigator.webkitGetGamepads ? (__registerGamepadEventCallback(2, e, t, r, 26, "gamepadconnected", n), 0) : -1
    }

    function _emscripten_set_gamepaddisconnected_callback_on_thread(e, t, r, n) {
        return navigator.getGamepads || navigator.webkitGetGamepads ? (__registerGamepadEventCallback(2, e, t, r, 27, "gamepaddisconnected", n), 0) : -1
    }

    function __registerKeyEventCallback(e, t, r, n, o, i, a) {
        JSEvents.keyEvent || (JSEvents.keyEvent = _malloc(164));
        var s = {
            target: __findEventTarget(e),
            allowsDeferredCalls: !0,
            eventTypeString: i,
            callbackfunc: n,
            handlerFunc: function(e) {
                assert(e);
                var r = JSEvents.keyEvent,
                    i = r >> 2;
                HEAP32[i + 0] = e.location, HEAP32[i + 1] = e.ctrlKey, HEAP32[i + 2] = e.shiftKey, HEAP32[i + 3] = e.altKey, HEAP32[i + 4] = e.metaKey, HEAP32[i + 5] = e.repeat, HEAP32[i + 6] = e.charCode, HEAP32[i + 7] = e.keyCode, HEAP32[i + 8] = e.which, stringToUTF8(e.key || "", r + 36, 32), stringToUTF8(e.code || "", r + 68, 32), stringToUTF8(e.char || "", r + 100, 32), stringToUTF8(e.locale || "", r + 132, 32), dynCall_iiii(n, o, r, t) && e.preventDefault()
            },
            useCapture: r
        };
        JSEvents.registerOrRemoveHandler(s)
    }

    function _emscripten_set_keydown_callback_on_thread(e, t, r, n, o) {
        return __registerKeyEventCallback(e, t, r, n, 2, "keydown", o), 0
    }

    function _emscripten_set_keypress_callback_on_thread(e, t, r, n, o) {
        return __registerKeyEventCallback(e, t, r, n, 1, "keypress", o), 0
    }

    function _emscripten_set_keyup_callback_on_thread(e, t, r, n, o) {
        return __registerKeyEventCallback(e, t, r, n, 3, "keyup", o), 0
    }

    function __fillMouseEventData(e, t, r) {
        HEAP32[e >> 2] = t.screenX, HEAP32[e + 4 >> 2] = t.screenY, HEAP32[e + 8 >> 2] = t.clientX, HEAP32[e + 12 >> 2] = t.clientY, HEAP32[e + 16 >> 2] = t.ctrlKey, HEAP32[e + 20 >> 2] = t.shiftKey, HEAP32[e + 24 >> 2] = t.altKey, HEAP32[e + 28 >> 2] = t.metaKey, HEAP16[e + 32 >> 1] = t.button, HEAP16[e + 34 >> 1] = t.buttons;
        var n = t.movementX || t.screenX - JSEvents.previousScreenX,
            o = t.movementY || t.screenY - JSEvents.previousScreenY;
        HEAP32[e + 36 >> 2] = n, HEAP32[e + 40 >> 2] = o;
        var i = __getBoundingClientRect(r);
        HEAP32[e + 44 >> 2] = t.clientX - i.left, HEAP32[e + 48 >> 2] = t.clientY - i.top, "wheel" !== t.type && (JSEvents.previousScreenX = t.screenX, JSEvents.previousScreenY = t.screenY)
    }

    function __registerMouseEventCallback(e, t, r, n, o, i, a) {
        JSEvents.mouseEvent || (JSEvents.mouseEvent = _malloc(64));
        var s = {
            target: e = __findEventTarget(e),
            allowsDeferredCalls: "mousemove" != i && "mouseenter" != i && "mouseleave" != i,
            eventTypeString: i,
            callbackfunc: n,
            handlerFunc: function(r) {
                var i = r || event;
                __fillMouseEventData(JSEvents.mouseEvent, i, e), dynCall_iiii(n, o, JSEvents.mouseEvent, t) && i.preventDefault()
            },
            useCapture: r
        };
        JSEvents.registerOrRemoveHandler(s)
    }

    function _emscripten_set_mousedown_callback_on_thread(e, t, r, n, o) {
        return __registerMouseEventCallback(e, t, r, n, 5, "mousedown", o), 0
    }

    function _emscripten_set_mouseenter_callback_on_thread(e, t, r, n, o) {
        return __registerMouseEventCallback(e, t, r, n, 33, "mouseenter", o), 0
    }

    function _emscripten_set_mouseleave_callback_on_thread(e, t, r, n, o) {
        return __registerMouseEventCallback(e, t, r, n, 34, "mouseleave", o), 0
    }

    function _emscripten_set_mousemove_callback_on_thread(e, t, r, n, o) {
        return __registerMouseEventCallback(e, t, r, n, 8, "mousemove", o), 0
    }

    function _emscripten_set_mouseup_callback_on_thread(e, t, r, n, o) {
        return __registerMouseEventCallback(e, t, r, n, 6, "mouseup", o), 0
    }

    function __fillPointerlockChangeEventData(e) {
        var t = document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement || document.msPointerLockElement,
            r = !!t;
        HEAP32[e >> 2] = r;
        var n = JSEvents.getNodeNameForTarget(t),
            o = t && t.id ? t.id : "";
        stringToUTF8(n, e + 4, 128), stringToUTF8(o, e + 132, 128)
    }

    function __registerPointerlockChangeEventCallback(e, t, r, n, o, i, a) {
        JSEvents.pointerlockChangeEvent || (JSEvents.pointerlockChangeEvent = _malloc(260));
        var s = {
            target: e,
            eventTypeString: i,
            callbackfunc: n,
            handlerFunc: function(e) {
                var r = e || event,
                    i = JSEvents.pointerlockChangeEvent;
                __fillPointerlockChangeEventData(i), dynCall_iiii(n, o, i, t) && r.preventDefault()
            },
            useCapture: r
        };
        JSEvents.registerOrRemoveHandler(s)
    }

    function _emscripten_set_pointerlockchange_callback_on_thread(e, t, r, n, o) {
        return document && document.body && (document.body.requestPointerLock || document.body.mozRequestPointerLock || document.body.webkitRequestPointerLock || document.body.msRequestPointerLock) ? (e = __findEventTarget(e)) ? (__registerPointerlockChangeEventCallback(e, t, r, n, 20, "pointerlockchange", o), __registerPointerlockChangeEventCallback(e, t, r, n, 20, "mozpointerlockchange", o), __registerPointerlockChangeEventCallback(e, t, r, n, 20, "webkitpointerlockchange", o), __registerPointerlockChangeEventCallback(e, t, r, n, 20, "mspointerlockchange", o), 0) : -4 : -1
    }

    function __registerUiEventCallback(e, t, r, n, o, i, a) {
        JSEvents.uiEvent || (JSEvents.uiEvent = _malloc(36));
        var s = {
            target: e = __findEventTarget(e),
            eventTypeString: i,
            callbackfunc: n,
            handlerFunc: function(r) {
                var i = r || event;
                if (i.target == e) {
                    var a = JSEvents.uiEvent,
                        s = document.body;
                    HEAP32[a >> 2] = i.detail, HEAP32[a + 4 >> 2] = s.clientWidth, HEAP32[a + 8 >> 2] = s.clientHeight, HEAP32[a + 12 >> 2] = innerWidth, HEAP32[a + 16 >> 2] = innerHeight, HEAP32[a + 20 >> 2] = outerWidth, HEAP32[a + 24 >> 2] = outerHeight, HEAP32[a + 28 >> 2] = pageXOffset, HEAP32[a + 32 >> 2] = pageYOffset, dynCall_iiii(n, o, a, t) && i.preventDefault()
                }
            },
            useCapture: r
        };
        JSEvents.registerOrRemoveHandler(s)
    }

    function _emscripten_set_resize_callback_on_thread(e, t, r, n, o) {
        return __registerUiEventCallback(e, t, r, n, 10, "resize", o), 0
    }

    function __registerTouchEventCallback(e, t, r, n, o, i, a) {
        JSEvents.touchEvent || (JSEvents.touchEvent = _malloc(1684));
        var s = {
            target: e = __findEventTarget(e),
            allowsDeferredCalls: "touchstart" == i || "touchend" == i,
            eventTypeString: i,
            callbackfunc: n,
            handlerFunc: function(r) {
                assert(r);
                for (var i = {}, a = r.touches, s = 0; s < a.length; ++s) {
                    assert(!(c = a[s]).isChanged), assert(!c.onTarget), i[c.identifier] = c
                }
                a = r.changedTouches;
                for (s = 0; s < a.length; ++s) {
                    var c;
                    assert(!(c = a[s]).onTarget), c.isChanged = 1, i[c.identifier] = c
                }
                a = r.targetTouches;
                for (s = 0; s < a.length; ++s) i[a[s].identifier].onTarget = 1;
                var l = JSEvents.touchEvent,
                    u = l >> 2;
                HEAP32[u + 1] = r.ctrlKey, HEAP32[u + 2] = r.shiftKey, HEAP32[u + 3] = r.altKey, HEAP32[u + 4] = r.metaKey, u += 5;
                var d = __getBoundingClientRect(e),
                    _ = 0;
                for (var s in i) {
                    var f = i[s];
                    if (HEAP32[u + 0] = f.identifier, HEAP32[u + 1] = f.screenX, HEAP32[u + 2] = f.screenY, HEAP32[u + 3] = f.clientX, HEAP32[u + 4] = f.clientY, HEAP32[u + 5] = f.pageX, HEAP32[u + 6] = f.pageY, HEAP32[u + 7] = f.isChanged, HEAP32[u + 8] = f.onTarget, HEAP32[u + 9] = f.clientX - d.left, HEAP32[u + 10] = f.clientY - d.top, u += 13, ++_ > 31) break
                }
                HEAP32[l >> 2] = _, dynCall_iiii(n, o, l, t) && r.preventDefault()
            },
            useCapture: r
        };
        JSEvents.registerOrRemoveHandler(s)
    }

    function _emscripten_set_touchcancel_callback_on_thread(e, t, r, n, o) {
        return __registerTouchEventCallback(e, t, r, n, 25, "touchcancel", o), 0
    }

    function _emscripten_set_touchend_callback_on_thread(e, t, r, n, o) {
        return __registerTouchEventCallback(e, t, r, n, 23, "touchend", o), 0
    }

    function _emscripten_set_touchmove_callback_on_thread(e, t, r, n, o) {
        return __registerTouchEventCallback(e, t, r, n, 24, "touchmove", o), 0
    }

    function _emscripten_set_touchstart_callback_on_thread(e, t, r, n, o) {
        return __registerTouchEventCallback(e, t, r, n, 22, "touchstart", o), 0
    }

    function __fillVisibilityChangeEventData(e) {
        var t = ["hidden", "visible", "prerender", "unloaded"].indexOf(document.visibilityState);
        HEAP32[e >> 2] = document.hidden, HEAP32[e + 4 >> 2] = t
    }

    function __registerVisibilityChangeEventCallback(e, t, r, n, o, i, a) {
        JSEvents.visibilityChangeEvent || (JSEvents.visibilityChangeEvent = _malloc(8));
        var s = {
            target: e,
            eventTypeString: i,
            callbackfunc: n,
            handlerFunc: function(e) {
                var r = e || event,
                    i = JSEvents.visibilityChangeEvent;
                __fillVisibilityChangeEventData(i), dynCall_iiii(n, o, i, t) && r.preventDefault()
            },
            useCapture: r
        };
        JSEvents.registerOrRemoveHandler(s)
    }

    function _emscripten_set_visibilitychange_callback_on_thread(e, t, r, n) {
        return specialHTMLTargets[1] ? (__registerVisibilityChangeEventCallback(specialHTMLTargets[1], e, t, r, 21, "visibilitychange", n), 0) : -4
    }

    function __registerWheelEventCallback(e, t, r, n, o, i, a) {
        JSEvents.wheelEvent || (JSEvents.wheelEvent = _malloc(96));
        var s = {
            target: e,
            allowsDeferredCalls: !0,
            eventTypeString: i,
            callbackfunc: n,
            handlerFunc: function(r) {
                var i = r || event,
                    a = JSEvents.wheelEvent;
                __fillMouseEventData(a, i, e), HEAPF64[a + 64 >> 3] = i.deltaX, HEAPF64[a + 72 >> 3] = i.deltaY, HEAPF64[a + 80 >> 3] = i.deltaZ, HEAP32[a + 88 >> 2] = i.deltaMode, dynCall_iiii(n, o, a, t) && i.preventDefault()
            },
            useCapture: r
        };
        JSEvents.registerOrRemoveHandler(s)
    }

    function _emscripten_set_wheel_callback_on_thread(e, t, r, n, o) {
        return void 0 !== (e = __findEventTarget(e)).onwheel ? (__registerWheelEventCallback(e, t, r, n, 9, "wheel", o), 0) : -1
    }

    function _emscripten_sleep() {
        throw "Please compile your program with async support in order to use asynchronous operations like emscripten_sleep"
    }
    var ENV = {};

    function __getExecutableName() {
        return thisProgram || "./this.program"
    }

    function getEnvStrings() {
        if (!getEnvStrings.strings) {
            var e = {
                USER: "web_user",
                LOGNAME: "web_user",
                PATH: "/",
                PWD: "/",
                HOME: "/home/web_user",
                LANG: ("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8",
                _: __getExecutableName()
            };
            for (var t in ENV) e[t] = ENV[t];
            var r = [];
            for (var t in e) r.push(t + "=" + e[t]);
            getEnvStrings.strings = r
        }
        return getEnvStrings.strings
    }

    function _environ_get(e, t) {
        var r = 0;
        return getEnvStrings().forEach((function(n, o) {
            var i = t + r;
            HEAP32[e + 4 * o >> 2] = i, writeAsciiToMemory(n, i), r += n.length + 1
        })), 0
    }

    function _environ_sizes_get(e, t) {
        var r = getEnvStrings();
        HEAP32[e >> 2] = r.length;
        var n = 0;
        return r.forEach((function(e) {
            n += e.length + 1
        })), HEAP32[t >> 2] = n, 0
    }

    function _exit(e) {
        exit(e)
    }

    function _fd_close(e) {
        try {
            var t = SYSCALLS.getStreamFromFD(e);
            return FS.close(t), 0
        } catch (e) {
            return void 0 !== FS && e instanceof FS.ErrnoError || abort(e), e.errno
        }
    }

    function _fd_read(e, t, r, n) {
        try {
            var o = SYSCALLS.getStreamFromFD(e),
                i = SYSCALLS.doReadv(o, t, r);
            return HEAP32[n >> 2] = i, 0
        } catch (e) {
            return void 0 !== FS && e instanceof FS.ErrnoError || abort(e), e.errno
        }
    }

    function _fd_seek(e, t, r, n, o) {
        try {
            var i = SYSCALLS.getStreamFromFD(e),
                a = 4294967296 * r + (t >>> 0),
                s = 9007199254740992;
            return a <= -s || a >= s ? -61 : (FS.llseek(i, a, n), tempI64 = [i.position >>> 0, (tempDouble = i.position, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (0 | Math_min(+Math_floor(tempDouble / 4294967296), 4294967295)) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0)], HEAP32[o >> 2] = tempI64[0], HEAP32[o + 4 >> 2] = tempI64[1], i.getdents && 0 === a && 0 === n && (i.getdents = null), 0)
        } catch (e) {
            return void 0 !== FS && e instanceof FS.ErrnoError || abort(e), e.errno
        }
    }

    function _fd_write(e, t, r, n) {
        try {
            var o = SYSCALLS.getStreamFromFD(e),
                i = SYSCALLS.doWritev(o, t, r);
            return HEAP32[n >> 2] = i, 0
        } catch (e) {
            return void 0 !== FS && e instanceof FS.ErrnoError || abort(e), e.errno
        }
    }

    function _gettimeofday(e) {
        var t = Date.now();
        return HEAP32[e >> 2] = t / 1e3 | 0, HEAP32[e + 4 >> 2] = t % 1e3 * 1e3 | 0, 0
    }

    function _glActiveTexture(e) {
        GLctx.activeTexture(e)
    }

    function _glAttachShader(e, t) {
        GLctx.attachShader(GL.programs[e], GL.shaders[t])
    }

    function _glBindBuffer(e, t) {
        GLctx.bindBuffer(e, GL.buffers[t])
    }

    function _glBindTexture(e, t) {
        GLctx.bindTexture(e, GL.textures[t])
    }

    function _glBlendFunc(e, t) {
        GLctx.blendFunc(e, t)
    }

    function _glBufferData(e, t, r, n) {
        GLctx.bufferData(e, r ? HEAPU8.subarray(r, r + t) : t, n)
    }

    function _glClear(e) {
        GLctx.clear(e)
    }

    function _glClearColor(e, t, r, n) {
        GLctx.clearColor(e, t, r, n)
    }

    function _glCompileShader(e) {
        GLctx.compileShader(GL.shaders[e])
    }

    function _glCreateProgram() {
        var e = GL.getNewId(GL.programs),
            t = GLctx.createProgram();
        return t.name = e, GL.programs[e] = t, e
    }

    function _glCreateShader(e) {
        var t = GL.getNewId(GL.shaders);
        return GL.shaders[t] = GLctx.createShader(e), t
    }

    function _glDepthFunc(e) {
        GLctx.depthFunc(e)
    }

    function _glDepthMask(e) {
        GLctx.depthMask(!!e)
    }

    function _glDisable(e) {
        GLctx.disable(e)
    }

    function _glDisableVertexAttribArray(e) {
        GLctx.disableVertexAttribArray(e)
    }

    function _glDrawArrays(e, t, r) {
        GLctx.drawArrays(e, t, r)
    }

    function _glEnable(e) {
        GLctx.enable(e)
    }

    function _glEnableVertexAttribArray(e) {
        GLctx.enableVertexAttribArray(e)
    }

    function _glGenBuffers(e, t) {
        __glGenObject(e, t, "createBuffer", GL.buffers)
    }

    function _glGenTextures(e, t) {
        __glGenObject(e, t, "createTexture", GL.textures)
    }

    function _glGetAttribLocation(e, t) {
        return GLctx.getAttribLocation(GL.programs[e], UTF8ToString(t))
    }

    function _glGetShaderInfoLog(e, t, r, n) {
        var o = GLctx.getShaderInfoLog(GL.shaders[e]);
        null === o && (o = "(unknown error)");
        var i = t > 0 && n ? stringToUTF8(o, n, t) : 0;
        r && (HEAP32[r >> 2] = i)
    }

    function _glGetShaderiv(e, t, r) {
        if (r)
            if (35716 == t) {
                var n = GLctx.getShaderInfoLog(GL.shaders[e]);
                null === n && (n = "(unknown error)"), HEAP32[r >> 2] = n.length + 1
            } else if (35720 == t) {
            var o = GLctx.getShaderSource(GL.shaders[e]),
                i = null === o || 0 == o.length ? 0 : o.length + 1;
            HEAP32[r >> 2] = i
        } else HEAP32[r >> 2] = GLctx.getShaderParameter(GL.shaders[e], t);
        else GL.recordError(1281)
    }

    function _glGetString(e) {
        if (GL.stringCache[e]) return GL.stringCache[e];
        var t;
        switch (e) {
            case 7939:
                var r = GLctx.getSupportedExtensions() || [];
                t = stringToNewUTF8((r = r.concat(r.map((function(e) {
                    return "GL_" + e
                })))).join(" "));
                break;
            case 7936:
            case 7937:
            case 37445:
            case 37446:
                var n = GLctx.getParameter(e);
                n || GL.recordError(1280), t = stringToNewUTF8(n);
                break;
            case 7938:
                var o = GLctx.getParameter(7938);
                t = stringToNewUTF8(o = "OpenGL ES 2.0 (" + o + ")");
                break;
            case 35724:
                var i = GLctx.getParameter(35724),
                    a = i.match(/^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/);
                null !== a && (3 == a[1].length && (a[1] = a[1] + "0"), i = "OpenGL ES GLSL ES " + a[1] + " (" + i + ")"), t = stringToNewUTF8(i);
                break;
            default:
                return GL.recordError(1280), 0
        }
        return GL.stringCache[e] = t, t
    }

    function _glGetUniformLocation(e, t) {
        var r = 0;
        if ("]" == (t = UTF8ToString(t))[t.length - 1]) {
            var n = t.lastIndexOf("[");
            r = "]" != t[n + 1] ? jstoi_q(t.slice(n + 1)) : 0, t = t.slice(0, n)
        }
        var o = GL.programInfos[e] && GL.programInfos[e].uniforms[t];
        return o && r >= 0 && r < o[0] ? o[1] + r : -1
    }

    function _glLinkProgram(e) {
        GLctx.linkProgram(GL.programs[e]), GL.populateUniformTable(e)
    }

    function _glPolygonOffset(e, t) {
        GLctx.polygonOffset(e, t)
    }

    function _glScissor(e, t, r, n) {
        GLctx.scissor(e, t, r, n)
    }

    function _glShaderSource(e, t, r, n) {
        var o = GL.getSource(e, t, r, n);
        GLctx.shaderSource(GL.shaders[e], o)
    }

    function _glTexImage2D(e, t, r, n, o, i, a, s, c) {
        GLctx.texImage2D(e, t, r, n, o, i, a, s, c ? emscriptenWebGLGetTexPixelData(s, a, n, o, c, r) : null)
    }

    function _glTexParameteri(e, t, r) {
        GLctx.texParameteri(e, t, r)
    }

    function _glUniform1f(e, t) {
        GLctx.uniform1f(GL.uniforms[e], t)
    }

    function _glUniform1i(e, t) {
        GLctx.uniform1i(GL.uniforms[e], t)
    }

    function _glUniform2f(e, t, r) {
        GLctx.uniform2f(GL.uniforms[e], t, r)
    }

    function _glUseProgram(e) {
        GLctx.useProgram(GL.programs[e])
    }

    function _glVertexAttribPointer(e, t, r, n, o, i) {
        GLctx.vertexAttribPointer(e, t, r, !!n, o, i)
    }

    function _glViewport(e, t, r, n) {
        GLctx.viewport(e, t, r, n)
    }

    function _usleep(e) {
        for (var t = _emscripten_get_now(); _emscripten_get_now() - t < e / 1e3;);
    }

    function _nanosleep(e, t) {
        if (0 === e) return setErrNo(28), -1;
        var r = HEAP32[e >> 2],
            n = HEAP32[e + 4 >> 2];
        return n < 0 || n > 999999999 || r < 0 ? (setErrNo(28), -1) : (0 !== t && (HEAP32[t >> 2] = 0, HEAP32[t + 4 >> 2] = 0), _usleep(1e6 * r + n / 1e3))
    }

    function _setTempRet0(e) {
        setTempRet0(0 | e)
    }

    function _sigaction(e, t, r) {
        return err("Calling stub instead of sigaction()"), 0
    }
    var __sigalrm_handler = 0;

    function _signal(e, t) {
        return 14 == e ? __sigalrm_handler = t : err("Calling stub instead of signal()"), 0
    }
    var __readAsmConstArgsArray = [];

    function readAsmConstArgs(e, t) {
        var r;
        for (assert(Array.isArray(__readAsmConstArgsArray)), assert(t % 4 == 0), __readAsmConstArgsArray.length = 0, t >>= 2; r = HEAPU8[e++];) assert(100 === r || 102 === r || 105 === r), __readAsmConstArgsArray.push(r < 105 ? HEAPF64[++t >> 1] : HEAP32[t]), ++t;
        return __readAsmConstArgsArray
    }
    var GLctx, FSNode = function(e, t, r, n) {
            e || (e = this), this.parent = e, this.mount = e.mount, this.mounted = null, this.id = FS.nextInode++, this.name = t, this.mode = r, this.node_ops = {}, this.stream_ops = {}, this.rdev = n
        },
        readMode = 365,
        writeMode = 146;
    Object.defineProperties(FSNode.prototype, {
        read: {
            get: function() {
                return (this.mode & readMode) === readMode
            },
            set: function(e) {
                e ? this.mode |= readMode : this.mode &= ~readMode
            }
        },
        write: {
            get: function() {
                return (this.mode & writeMode) === writeMode
            },
            set: function(e) {
                e ? this.mode |= writeMode : this.mode &= ~writeMode
            }
        },
        isFolder: {
            get: function() {
                return FS.isDir(this.mode)
            }
        },
        isDevice: {
            get: function() {
                return FS.isChrdev(this.mode)
            }
        }
    }), FS.FSNode = FSNode, FS.staticInit(), Module.requestFullscreen = function(e, t) {
        Browser.requestFullscreen(e, t)
    }, Module.requestFullScreen = function() {
        Browser.requestFullScreen()
    }, Module.requestAnimationFrame = function(e) {
        Browser.requestAnimationFrame(e)
    }, Module.setCanvasSize = function(e, t, r) {
        Browser.setCanvasSize(e, t, r)
    }, Module.pauseMainLoop = function() {
        Browser.mainLoop.pause()
    }, Module.resumeMainLoop = function() {
        Browser.mainLoop.resume()
    }, Module.getUserMedia = function() {
        Browser.getUserMedia()
    }, Module.createContext = function(e, t, r, n) {
        return Browser.createContext(e, t, r, n)
    };
    for (var i = 0; i < 32; ++i) __tempFixedLengthArray.push(new Array(i));
    var __miniTempWebGLFloatBuffersStorage = new Float32Array(288);
    for (i = 0; i < 288; ++i) __miniTempWebGLFloatBuffers[i] = __miniTempWebGLFloatBuffersStorage.subarray(0, i + 1);
    var __miniTempWebGLIntBuffersStorage = new Int32Array(288);
    for (i = 0; i < 288; ++i) __miniTempWebGLIntBuffers[i] = __miniTempWebGLIntBuffersStorage.subarray(0, i + 1);
    var ASSERTIONS = !0;

    function intArrayFromString(e, t, r) {
        var n = r > 0 ? r : lengthBytesUTF8(e) + 1,
            o = new Array(n),
            i = stringToUTF8Array(e, o, 0, o.length);
        return t && (o.length = i), o
    }

    function intArrayToString(e) {
        for (var t = [], r = 0; r < e.length; r++) {
            var n = e[r];
            n > 255 && (ASSERTIONS && assert(!1, "Character code " + n + " (" + String.fromCharCode(n) + ")  at offset " + r + " not in 0x00-0xFF."), n &= 255), t.push(String.fromCharCode(n))
        }
        return t.join("")
    }
    var calledRun, asmGlobalArg = {},
        asmLibraryArg = {
            __assert_fail: ___assert_fail,
            __handle_stack_overflow: ___handle_stack_overflow,
            __sys_fcntl64: ___sys_fcntl64,
            __sys_getdents64: ___sys_getdents64,
            __sys_ioctl: ___sys_ioctl,
            __sys_mkdir: ___sys_mkdir,
            __sys_open: ___sys_open,
            __sys_stat64: ___sys_stat64,
            clock_gettime: _clock_gettime,
            dlclose: _dlclose,
            eglBindAPI: _eglBindAPI,
            eglChooseConfig: _eglChooseConfig,
            eglCreateContext: _eglCreateContext,
            eglCreateWindowSurface: _eglCreateWindowSurface,
            eglDestroyContext: _eglDestroyContext,
            eglDestroySurface: _eglDestroySurface,
            eglGetConfigAttrib: _eglGetConfigAttrib,
            eglGetDisplay: _eglGetDisplay,
            eglGetError: _eglGetError,
            eglGetProcAddress: _eglGetProcAddress,
            eglInitialize: _eglInitialize,
            eglMakeCurrent: _eglMakeCurrent,
            eglQueryString: _eglQueryString,
            eglSwapBuffers: _eglSwapBuffers,
            eglSwapInterval: _eglSwapInterval,
            eglTerminate: _eglTerminate,
            eglWaitGL: _eglWaitGL,
            eglWaitNative: _eglWaitNative,
            emscripten_asm_const_iii: _emscripten_asm_const_iii,
            emscripten_exit_fullscreen: _emscripten_exit_fullscreen,
            emscripten_exit_pointerlock: _emscripten_exit_pointerlock,
            emscripten_get_device_pixel_ratio: _emscripten_get_device_pixel_ratio,
            emscripten_get_element_css_size: _emscripten_get_element_css_size,
            emscripten_get_gamepad_status: _emscripten_get_gamepad_status,
            emscripten_get_num_gamepads: _emscripten_get_num_gamepads,
            emscripten_get_sbrk_ptr: _emscripten_get_sbrk_ptr,
            emscripten_glActiveTexture: _emscripten_glActiveTexture,
            emscripten_glAttachShader: _emscripten_glAttachShader,
            emscripten_glBeginQueryEXT: _emscripten_glBeginQueryEXT,
            emscripten_glBindAttribLocation: _emscripten_glBindAttribLocation,
            emscripten_glBindBuffer: _emscripten_glBindBuffer,
            emscripten_glBindFramebuffer: _emscripten_glBindFramebuffer,
            emscripten_glBindRenderbuffer: _emscripten_glBindRenderbuffer,
            emscripten_glBindTexture: _emscripten_glBindTexture,
            emscripten_glBindVertexArrayOES: _emscripten_glBindVertexArrayOES,
            emscripten_glBlendColor: _emscripten_glBlendColor,
            emscripten_glBlendEquation: _emscripten_glBlendEquation,
            emscripten_glBlendEquationSeparate: _emscripten_glBlendEquationSeparate,
            emscripten_glBlendFunc: _emscripten_glBlendFunc,
            emscripten_glBlendFuncSeparate: _emscripten_glBlendFuncSeparate,
            emscripten_glBufferData: _emscripten_glBufferData,
            emscripten_glBufferSubData: _emscripten_glBufferSubData,
            emscripten_glCheckFramebufferStatus: _emscripten_glCheckFramebufferStatus,
            emscripten_glClear: _emscripten_glClear,
            emscripten_glClearColor: _emscripten_glClearColor,
            emscripten_glClearDepthf: _emscripten_glClearDepthf,
            emscripten_glClearStencil: _emscripten_glClearStencil,
            emscripten_glColorMask: _emscripten_glColorMask,
            emscripten_glCompileShader: _emscripten_glCompileShader,
            emscripten_glCompressedTexImage2D: _emscripten_glCompressedTexImage2D,
            emscripten_glCompressedTexSubImage2D: _emscripten_glCompressedTexSubImage2D,
            emscripten_glCopyTexImage2D: _emscripten_glCopyTexImage2D,
            emscripten_glCopyTexSubImage2D: _emscripten_glCopyTexSubImage2D,
            emscripten_glCreateProgram: _emscripten_glCreateProgram,
            emscripten_glCreateShader: _emscripten_glCreateShader,
            emscripten_glCullFace: _emscripten_glCullFace,
            emscripten_glDeleteBuffers: _emscripten_glDeleteBuffers,
            emscripten_glDeleteFramebuffers: _emscripten_glDeleteFramebuffers,
            emscripten_glDeleteProgram: _emscripten_glDeleteProgram,
            emscripten_glDeleteQueriesEXT: _emscripten_glDeleteQueriesEXT,
            emscripten_glDeleteRenderbuffers: _emscripten_glDeleteRenderbuffers,
            emscripten_glDeleteShader: _emscripten_glDeleteShader,
            emscripten_glDeleteTextures: _emscripten_glDeleteTextures,
            emscripten_glDeleteVertexArraysOES: _emscripten_glDeleteVertexArraysOES,
            emscripten_glDepthFunc: _emscripten_glDepthFunc,
            emscripten_glDepthMask: _emscripten_glDepthMask,
            emscripten_glDepthRangef: _emscripten_glDepthRangef,
            emscripten_glDetachShader: _emscripten_glDetachShader,
            emscripten_glDisable: _emscripten_glDisable,
            emscripten_glDisableVertexAttribArray: _emscripten_glDisableVertexAttribArray,
            emscripten_glDrawArrays: _emscripten_glDrawArrays,
            emscripten_glDrawArraysInstancedANGLE: _emscripten_glDrawArraysInstancedANGLE,
            emscripten_glDrawBuffersWEBGL: _emscripten_glDrawBuffersWEBGL,
            emscripten_glDrawElements: _emscripten_glDrawElements,
            emscripten_glDrawElementsInstancedANGLE: _emscripten_glDrawElementsInstancedANGLE,
            emscripten_glEnable: _emscripten_glEnable,
            emscripten_glEnableVertexAttribArray: _emscripten_glEnableVertexAttribArray,
            emscripten_glEndQueryEXT: _emscripten_glEndQueryEXT,
            emscripten_glFinish: _emscripten_glFinish,
            emscripten_glFlush: _emscripten_glFlush,
            emscripten_glFramebufferRenderbuffer: _emscripten_glFramebufferRenderbuffer,
            emscripten_glFramebufferTexture2D: _emscripten_glFramebufferTexture2D,
            emscripten_glFrontFace: _emscripten_glFrontFace,
            emscripten_glGenBuffers: _emscripten_glGenBuffers,
            emscripten_glGenFramebuffers: _emscripten_glGenFramebuffers,
            emscripten_glGenQueriesEXT: _emscripten_glGenQueriesEXT,
            emscripten_glGenRenderbuffers: _emscripten_glGenRenderbuffers,
            emscripten_glGenTextures: _emscripten_glGenTextures,
            emscripten_glGenVertexArraysOES: _emscripten_glGenVertexArraysOES,
            emscripten_glGenerateMipmap: _emscripten_glGenerateMipmap,
            emscripten_glGetActiveAttrib: _emscripten_glGetActiveAttrib,
            emscripten_glGetActiveUniform: _emscripten_glGetActiveUniform,
            emscripten_glGetAttachedShaders: _emscripten_glGetAttachedShaders,
            emscripten_glGetAttribLocation: _emscripten_glGetAttribLocation,
            emscripten_glGetBooleanv: _emscripten_glGetBooleanv,
            emscripten_glGetBufferParameteriv: _emscripten_glGetBufferParameteriv,
            emscripten_glGetError: _emscripten_glGetError,
            emscripten_glGetFloatv: _emscripten_glGetFloatv,
            emscripten_glGetFramebufferAttachmentParameteriv: _emscripten_glGetFramebufferAttachmentParameteriv,
            emscripten_glGetIntegerv: _emscripten_glGetIntegerv,
            emscripten_glGetProgramInfoLog: _emscripten_glGetProgramInfoLog,
            emscripten_glGetProgramiv: _emscripten_glGetProgramiv,
            emscripten_glGetQueryObjecti64vEXT: _emscripten_glGetQueryObjecti64vEXT,
            emscripten_glGetQueryObjectivEXT: _emscripten_glGetQueryObjectivEXT,
            emscripten_glGetQueryObjectui64vEXT: _emscripten_glGetQueryObjectui64vEXT,
            emscripten_glGetQueryObjectuivEXT: _emscripten_glGetQueryObjectuivEXT,
            emscripten_glGetQueryivEXT: _emscripten_glGetQueryivEXT,
            emscripten_glGetRenderbufferParameteriv: _emscripten_glGetRenderbufferParameteriv,
            emscripten_glGetShaderInfoLog: _emscripten_glGetShaderInfoLog,
            emscripten_glGetShaderPrecisionFormat: _emscripten_glGetShaderPrecisionFormat,
            emscripten_glGetShaderSource: _emscripten_glGetShaderSource,
            emscripten_glGetShaderiv: _emscripten_glGetShaderiv,
            emscripten_glGetString: _emscripten_glGetString,
            emscripten_glGetTexParameterfv: _emscripten_glGetTexParameterfv,
            emscripten_glGetTexParameteriv: _emscripten_glGetTexParameteriv,
            emscripten_glGetUniformLocation: _emscripten_glGetUniformLocation,
            emscripten_glGetUniformfv: _emscripten_glGetUniformfv,
            emscripten_glGetUniformiv: _emscripten_glGetUniformiv,
            emscripten_glGetVertexAttribPointerv: _emscripten_glGetVertexAttribPointerv,
            emscripten_glGetVertexAttribfv: _emscripten_glGetVertexAttribfv,
            emscripten_glGetVertexAttribiv: _emscripten_glGetVertexAttribiv,
            emscripten_glHint: _emscripten_glHint,
            emscripten_glIsBuffer: _emscripten_glIsBuffer,
            emscripten_glIsEnabled: _emscripten_glIsEnabled,
            emscripten_glIsFramebuffer: _emscripten_glIsFramebuffer,
            emscripten_glIsProgram: _emscripten_glIsProgram,
            emscripten_glIsQueryEXT: _emscripten_glIsQueryEXT,
            emscripten_glIsRenderbuffer: _emscripten_glIsRenderbuffer,
            emscripten_glIsShader: _emscripten_glIsShader,
            emscripten_glIsTexture: _emscripten_glIsTexture,
            emscripten_glIsVertexArrayOES: _emscripten_glIsVertexArrayOES,
            emscripten_glLineWidth: _emscripten_glLineWidth,
            emscripten_glLinkProgram: _emscripten_glLinkProgram,
            emscripten_glPixelStorei: _emscripten_glPixelStorei,
            emscripten_glPolygonOffset: _emscripten_glPolygonOffset,
            emscripten_glQueryCounterEXT: _emscripten_glQueryCounterEXT,
            emscripten_glReadPixels: _emscripten_glReadPixels,
            emscripten_glReleaseShaderCompiler: _emscripten_glReleaseShaderCompiler,
            emscripten_glRenderbufferStorage: _emscripten_glRenderbufferStorage,
            emscripten_glSampleCoverage: _emscripten_glSampleCoverage,
            emscripten_glScissor: _emscripten_glScissor,
            emscripten_glShaderBinary: _emscripten_glShaderBinary,
            emscripten_glShaderSource: _emscripten_glShaderSource,
            emscripten_glStencilFunc: _emscripten_glStencilFunc,
            emscripten_glStencilFuncSeparate: _emscripten_glStencilFuncSeparate,
            emscripten_glStencilMask: _emscripten_glStencilMask,
            emscripten_glStencilMaskSeparate: _emscripten_glStencilMaskSeparate,
            emscripten_glStencilOp: _emscripten_glStencilOp,
            emscripten_glStencilOpSeparate: _emscripten_glStencilOpSeparate,
            emscripten_glTexImage2D: _emscripten_glTexImage2D,
            emscripten_glTexParameterf: _emscripten_glTexParameterf,
            emscripten_glTexParameterfv: _emscripten_glTexParameterfv,
            emscripten_glTexParameteri: _emscripten_glTexParameteri,
            emscripten_glTexParameteriv: _emscripten_glTexParameteriv,
            emscripten_glTexSubImage2D: _emscripten_glTexSubImage2D,
            emscripten_glUniform1f: _emscripten_glUniform1f,
            emscripten_glUniform1fv: _emscripten_glUniform1fv,
            emscripten_glUniform1i: _emscripten_glUniform1i,
            emscripten_glUniform1iv: _emscripten_glUniform1iv,
            emscripten_glUniform2f: _emscripten_glUniform2f,
            emscripten_glUniform2fv: _emscripten_glUniform2fv,
            emscripten_glUniform2i: _emscripten_glUniform2i,
            emscripten_glUniform2iv: _emscripten_glUniform2iv,
            emscripten_glUniform3f: _emscripten_glUniform3f,
            emscripten_glUniform3fv: _emscripten_glUniform3fv,
            emscripten_glUniform3i: _emscripten_glUniform3i,
            emscripten_glUniform3iv: _emscripten_glUniform3iv,
            emscripten_glUniform4f: _emscripten_glUniform4f,
            emscripten_glUniform4fv: _emscripten_glUniform4fv,
            emscripten_glUniform4i: _emscripten_glUniform4i,
            emscripten_glUniform4iv: _emscripten_glUniform4iv,
            emscripten_glUniformMatrix2fv: _emscripten_glUniformMatrix2fv,
            emscripten_glUniformMatrix3fv: _emscripten_glUniformMatrix3fv,
            emscripten_glUniformMatrix4fv: _emscripten_glUniformMatrix4fv,
            emscripten_glUseProgram: _emscripten_glUseProgram,
            emscripten_glValidateProgram: _emscripten_glValidateProgram,
            emscripten_glVertexAttrib1f: _emscripten_glVertexAttrib1f,
            emscripten_glVertexAttrib1fv: _emscripten_glVertexAttrib1fv,
            emscripten_glVertexAttrib2f: _emscripten_glVertexAttrib2f,
            emscripten_glVertexAttrib2fv: _emscripten_glVertexAttrib2fv,
            emscripten_glVertexAttrib3f: _emscripten_glVertexAttrib3f,
            emscripten_glVertexAttrib3fv: _emscripten_glVertexAttrib3fv,
            emscripten_glVertexAttrib4f: _emscripten_glVertexAttrib4f,
            emscripten_glVertexAttrib4fv: _emscripten_glVertexAttrib4fv,
            emscripten_glVertexAttribDivisorANGLE: _emscripten_glVertexAttribDivisorANGLE,
            emscripten_glVertexAttribPointer: _emscripten_glVertexAttribPointer,
            emscripten_glViewport: _emscripten_glViewport,
            emscripten_has_asyncify: _emscripten_has_asyncify,
            emscripten_memcpy_big: _emscripten_memcpy_big,
            emscripten_request_fullscreen_strategy: _emscripten_request_fullscreen_strategy,
            emscripten_request_pointerlock: _emscripten_request_pointerlock,
            emscripten_resize_heap: _emscripten_resize_heap,
            emscripten_sample_gamepad_data: _emscripten_sample_gamepad_data,
            emscripten_set_beforeunload_callback_on_thread: _emscripten_set_beforeunload_callback_on_thread,
            emscripten_set_blur_callback_on_thread: _emscripten_set_blur_callback_on_thread,
            emscripten_set_canvas_element_size: _emscripten_set_canvas_element_size,
            emscripten_set_element_css_size: _emscripten_set_element_css_size,
            emscripten_set_focus_callback_on_thread: _emscripten_set_focus_callback_on_thread,
            emscripten_set_fullscreenchange_callback_on_thread: _emscripten_set_fullscreenchange_callback_on_thread,
            emscripten_set_gamepadconnected_callback_on_thread: _emscripten_set_gamepadconnected_callback_on_thread,
            emscripten_set_gamepaddisconnected_callback_on_thread: _emscripten_set_gamepaddisconnected_callback_on_thread,
            emscripten_set_keydown_callback_on_thread: _emscripten_set_keydown_callback_on_thread,
            emscripten_set_keypress_callback_on_thread: _emscripten_set_keypress_callback_on_thread,
            emscripten_set_keyup_callback_on_thread: _emscripten_set_keyup_callback_on_thread,
            emscripten_set_main_loop: _emscripten_set_main_loop,
            emscripten_set_mousedown_callback_on_thread: _emscripten_set_mousedown_callback_on_thread,
            emscripten_set_mouseenter_callback_on_thread: _emscripten_set_mouseenter_callback_on_thread,
            emscripten_set_mouseleave_callback_on_thread: _emscripten_set_mouseleave_callback_on_thread,
            emscripten_set_mousemove_callback_on_thread: _emscripten_set_mousemove_callback_on_thread,
            emscripten_set_mouseup_callback_on_thread: _emscripten_set_mouseup_callback_on_thread,
            emscripten_set_pointerlockchange_callback_on_thread: _emscripten_set_pointerlockchange_callback_on_thread,
            emscripten_set_resize_callback_on_thread: _emscripten_set_resize_callback_on_thread,
            emscripten_set_touchcancel_callback_on_thread: _emscripten_set_touchcancel_callback_on_thread,
            emscripten_set_touchend_callback_on_thread: _emscripten_set_touchend_callback_on_thread,
            emscripten_set_touchmove_callback_on_thread: _emscripten_set_touchmove_callback_on_thread,
            emscripten_set_touchstart_callback_on_thread: _emscripten_set_touchstart_callback_on_thread,
            emscripten_set_visibilitychange_callback_on_thread: _emscripten_set_visibilitychange_callback_on_thread,
            emscripten_set_wheel_callback_on_thread: _emscripten_set_wheel_callback_on_thread,
            emscripten_sleep: _emscripten_sleep,
            environ_get: _environ_get,
            environ_sizes_get: _environ_sizes_get,
            exit: _exit,
            fd_close: _fd_close,
            fd_read: _fd_read,
            fd_seek: _fd_seek,
            fd_write: _fd_write,
            gettimeofday: _gettimeofday,
            glActiveTexture: _glActiveTexture,
            glAttachShader: _glAttachShader,
            glBindBuffer: _glBindBuffer,
            glBindTexture: _glBindTexture,
            glBlendFunc: _glBlendFunc,
            glBufferData: _glBufferData,
            glClear: _glClear,
            glClearColor: _glClearColor,
            glCompileShader: _glCompileShader,
            glCreateProgram: _glCreateProgram,
            glCreateShader: _glCreateShader,
            glDepthFunc: _glDepthFunc,
            glDepthMask: _glDepthMask,
            glDisable: _glDisable,
            glDisableVertexAttribArray: _glDisableVertexAttribArray,
            glDrawArrays: _glDrawArrays,
            glEnable: _glEnable,
            glEnableVertexAttribArray: _glEnableVertexAttribArray,
            glGenBuffers: _glGenBuffers,
            glGenTextures: _glGenTextures,
            glGetAttribLocation: _glGetAttribLocation,
            glGetShaderInfoLog: _glGetShaderInfoLog,
            glGetShaderiv: _glGetShaderiv,
            glGetString: _glGetString,
            glGetUniformLocation: _glGetUniformLocation,
            glLinkProgram: _glLinkProgram,
            glPolygonOffset: _glPolygonOffset,
            glScissor: _glScissor,
            glShaderSource: _glShaderSource,
            glTexImage2D: _glTexImage2D,
            glTexParameteri: _glTexParameteri,
            glUniform1f: _glUniform1f,
            glUniform1i: _glUniform1i,
            glUniform2f: _glUniform2f,
            glUseProgram: _glUseProgram,
            glVertexAttribPointer: _glVertexAttribPointer,
            glViewport: _glViewport,
            memory: wasmMemory,
            nanosleep: _nanosleep,
            setTempRet0: _setTempRet0,
            sigaction: _sigaction,
            signal: _signal,
            table: wasmTable
        },
        asm = createWasm(),
        ___wasm_call_ctors = Module.___wasm_call_ctors = createExportWrapper("__wasm_call_ctors"),
        _memcpy = Module._memcpy = createExportWrapper("memcpy"),
        _memset = Module._memset = createExportWrapper("memset"),
        _malloc = Module._malloc = createExportWrapper("malloc"),
        _fflush = Module._fflush = createExportWrapper("fflush"),
        _free = Module._free = createExportWrapper("free"),
        _main = Module._main = createExportWrapper("main"),
        _strstr = Module._strstr = createExportWrapper("strstr"),
        ___errno_location = Module.___errno_location = createExportWrapper("__errno_location"),
        _emscripten_GetProcAddress = Module._emscripten_GetProcAddress = createExportWrapper("emscripten_GetProcAddress"),
        stackSave = Module.stackSave = createExportWrapper("stackSave"),
        stackRestore = Module.stackRestore = createExportWrapper("stackRestore"),
        stackAlloc = Module.stackAlloc = createExportWrapper("stackAlloc"),
        ___set_stack_limit = Module.___set_stack_limit = createExportWrapper("__set_stack_limit"),
        __growWasmMemory = Module.__growWasmMemory = createExportWrapper("__growWasmMemory"),
        dynCall_i = Module.dynCall_i = createExportWrapper("dynCall_i"),
        dynCall_v = Module.dynCall_v = createExportWrapper("dynCall_v"),
        dynCall_vii = Module.dynCall_vii = createExportWrapper("dynCall_vii"),
        dynCall_iiii = Module.dynCall_iiii = createExportWrapper("dynCall_iiii"),
        dynCall_vi = Module.dynCall_vi = createExportWrapper("dynCall_vi"),
        dynCall_iii = Module.dynCall_iii = createExportWrapper("dynCall_iii"),
        dynCall_ii = Module.dynCall_ii = createExportWrapper("dynCall_ii"),
        dynCall_vd = Module.dynCall_vd = createExportWrapper("dynCall_vd"),
        dynCall_viii = Module.dynCall_viii = createExportWrapper("dynCall_viii"),
        dynCall_d = Module.dynCall_d = createExportWrapper("dynCall_d"),
        dynCall_viiii = Module.dynCall_viiii = createExportWrapper("dynCall_viiii"),
        dynCall_vff = Module.dynCall_vff = createExportWrapper("dynCall_vff"),
        dynCall_iiiiii = Module.dynCall_iiiiii = createExportWrapper("dynCall_iiiiii"),
        dynCall_jiiij = Module.dynCall_jiiij = createExportWrapper("dynCall_jiiij"),
        dynCall_iiij = Module.dynCall_iiij = createExportWrapper("dynCall_iiij"),
        dynCall_jii = Module.dynCall_jii = createExportWrapper("dynCall_jii"),
        dynCall_iiiii = Module.dynCall_iiiii = createExportWrapper("dynCall_iiiii"),
        dynCall_jiji = Module.dynCall_jiji = createExportWrapper("dynCall_jiji"),
        dynCall_ji = Module.dynCall_ji = createExportWrapper("dynCall_ji"),
        dynCall_iiiiiiiiii = Module.dynCall_iiiiiiiiii = createExportWrapper("dynCall_iiiiiiiiii"),
        dynCall_iiiiiidii = Module.dynCall_iiiiiidii = createExportWrapper("dynCall_iiiiiidii"),
        dynCall_iiiiiiiii = Module.dynCall_iiiiiiiii = createExportWrapper("dynCall_iiiiiiiii"),
        dynCall_viiiiiii = Module.dynCall_viiiiiii = createExportWrapper("dynCall_viiiiiii"),
        dynCall_viiiiiiiiiii = Module.dynCall_viiiiiiiiiii = createExportWrapper("dynCall_viiiiiiiiiii"),
        dynCall_iiiiiiii = Module.dynCall_iiiiiiii = createExportWrapper("dynCall_iiiiiiii"),
        dynCall_iidiiii = Module.dynCall_iidiiii = createExportWrapper("dynCall_iidiiii"),
        dynCall_viiiii = Module.dynCall_viiiii = createExportWrapper("dynCall_viiiii"),
        dynCall_vffff = Module.dynCall_vffff = createExportWrapper("dynCall_vffff"),
        dynCall_vf = Module.dynCall_vf = createExportWrapper("dynCall_vf"),
        dynCall_viiiiiiii = Module.dynCall_viiiiiiii = createExportWrapper("dynCall_viiiiiiii"),
        dynCall_viiiiiiiii = Module.dynCall_viiiiiiiii = createExportWrapper("dynCall_viiiiiiiii"),
        dynCall_vfi = Module.dynCall_vfi = createExportWrapper("dynCall_vfi"),
        dynCall_viif = Module.dynCall_viif = createExportWrapper("dynCall_viif"),
        dynCall_vif = Module.dynCall_vif = createExportWrapper("dynCall_vif"),
        dynCall_viff = Module.dynCall_viff = createExportWrapper("dynCall_viff"),
        dynCall_vifff = Module.dynCall_vifff = createExportWrapper("dynCall_vifff"),
        dynCall_viffff = Module.dynCall_viffff = createExportWrapper("dynCall_viffff"),
        dynCall_viiiiii = Module.dynCall_viiiiii = createExportWrapper("dynCall_viiiiii");

    function ExitStatus(e) {
        this.name = "ExitStatus", this.message = "Program terminated with exit(" + e + ")", this.status = e
    }
    Object.getOwnPropertyDescriptor(Module, "intArrayFromString") || (Module.intArrayFromString = function() {
        abort("'intArrayFromString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "intArrayToString") || (Module.intArrayToString = function() {
        abort("'intArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "ccall") || (Module.ccall = function() {
        abort("'ccall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "cwrap") || (Module.cwrap = function() {
        abort("'cwrap' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "setValue") || (Module.setValue = function() {
        abort("'setValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "getValue") || (Module.getValue = function() {
        abort("'getValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "allocate") || (Module.allocate = function() {
        abort("'allocate' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "getMemory") || (Module.getMemory = function() {
        abort("'getMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
    }), Object.getOwnPropertyDescriptor(Module, "UTF8ArrayToString") || (Module.UTF8ArrayToString = function() {
        abort("'UTF8ArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "UTF8ToString") || (Module.UTF8ToString = function() {
        abort("'UTF8ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "stringToUTF8Array") || (Module.stringToUTF8Array = function() {
        abort("'stringToUTF8Array' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "stringToUTF8") || (Module.stringToUTF8 = function() {
        abort("'stringToUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "lengthBytesUTF8") || (Module.lengthBytesUTF8 = function() {
        abort("'lengthBytesUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "stackTrace") || (Module.stackTrace = function() {
        abort("'stackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "addOnPreRun") || (Module.addOnPreRun = function() {
        abort("'addOnPreRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "addOnInit") || (Module.addOnInit = function() {
        abort("'addOnInit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "addOnPreMain") || (Module.addOnPreMain = function() {
        abort("'addOnPreMain' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "addOnExit") || (Module.addOnExit = function() {
        abort("'addOnExit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "addOnPostRun") || (Module.addOnPostRun = function() {
        abort("'addOnPostRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "writeStringToMemory") || (Module.writeStringToMemory = function() {
        abort("'writeStringToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "writeArrayToMemory") || (Module.writeArrayToMemory = function() {
        abort("'writeArrayToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "writeAsciiToMemory") || (Module.writeAsciiToMemory = function() {
        abort("'writeAsciiToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "addRunDependency") || (Module.addRunDependency = function() {
        abort("'addRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
    }), Object.getOwnPropertyDescriptor(Module, "removeRunDependency") || (Module.removeRunDependency = function() {
        abort("'removeRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
    }), Object.getOwnPropertyDescriptor(Module, "FS_createFolder") || (Module.FS_createFolder = function() {
        abort("'FS_createFolder' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
    }), Object.getOwnPropertyDescriptor(Module, "FS_createPath") || (Module.FS_createPath = function() {
        abort("'FS_createPath' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
    }), Object.getOwnPropertyDescriptor(Module, "FS_createDataFile") || (Module.FS_createDataFile = function() {
        abort("'FS_createDataFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
    }), Object.getOwnPropertyDescriptor(Module, "FS_createPreloadedFile") || (Module.FS_createPreloadedFile = function() {
        abort("'FS_createPreloadedFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
    }), Object.getOwnPropertyDescriptor(Module, "FS_createLazyFile") || (Module.FS_createLazyFile = function() {
        abort("'FS_createLazyFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
    }), Object.getOwnPropertyDescriptor(Module, "FS_createLink") || (Module.FS_createLink = function() {
        abort("'FS_createLink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
    }), Object.getOwnPropertyDescriptor(Module, "FS_createDevice") || (Module.FS_createDevice = function() {
        abort("'FS_createDevice' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
    }), Object.getOwnPropertyDescriptor(Module, "FS_unlink") || (Module.FS_unlink = function() {
        abort("'FS_unlink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you")
    }), Object.getOwnPropertyDescriptor(Module, "dynamicAlloc") || (Module.dynamicAlloc = function() {
        abort("'dynamicAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "loadDynamicLibrary") || (Module.loadDynamicLibrary = function() {
        abort("'loadDynamicLibrary' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "loadWebAssemblyModule") || (Module.loadWebAssemblyModule = function() {
        abort("'loadWebAssemblyModule' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "getLEB") || (Module.getLEB = function() {
        abort("'getLEB' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "getFunctionTables") || (Module.getFunctionTables = function() {
        abort("'getFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "alignFunctionTables") || (Module.alignFunctionTables = function() {
        abort("'alignFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "registerFunctions") || (Module.registerFunctions = function() {
        abort("'registerFunctions' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "addFunction") || (Module.addFunction = function() {
        abort("'addFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "removeFunction") || (Module.removeFunction = function() {
        abort("'removeFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "getFuncWrapper") || (Module.getFuncWrapper = function() {
        abort("'getFuncWrapper' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "prettyPrint") || (Module.prettyPrint = function() {
        abort("'prettyPrint' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "makeBigInt") || (Module.makeBigInt = function() {
        abort("'makeBigInt' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "dynCall") || (Module.dynCall = function() {
        abort("'dynCall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "getCompilerSetting") || (Module.getCompilerSetting = function() {
        abort("'getCompilerSetting' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "print") || (Module.print = function() {
        abort("'print' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "printErr") || (Module.printErr = function() {
        abort("'printErr' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "getTempRet0") || (Module.getTempRet0 = function() {
        abort("'getTempRet0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "setTempRet0") || (Module.setTempRet0 = function() {
        abort("'setTempRet0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Module.callMain = callMain, Object.getOwnPropertyDescriptor(Module, "abort") || (Module.abort = function() {
        abort("'abort' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "stringToNewUTF8") || (Module.stringToNewUTF8 = function() {
        abort("'stringToNewUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "abortOnCannotGrowMemory") || (Module.abortOnCannotGrowMemory = function() {
        abort("'abortOnCannotGrowMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "emscripten_realloc_buffer") || (Module.emscripten_realloc_buffer = function() {
        abort("'emscripten_realloc_buffer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "ENV") || (Module.ENV = function() {
        abort("'ENV' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "ERRNO_CODES") || (Module.ERRNO_CODES = function() {
        abort("'ERRNO_CODES' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "ERRNO_MESSAGES") || (Module.ERRNO_MESSAGES = function() {
        abort("'ERRNO_MESSAGES' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "setErrNo") || (Module.setErrNo = function() {
        abort("'setErrNo' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "DNS") || (Module.DNS = function() {
        abort("'DNS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "GAI_ERRNO_MESSAGES") || (Module.GAI_ERRNO_MESSAGES = function() {
        abort("'GAI_ERRNO_MESSAGES' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "Protocols") || (Module.Protocols = function() {
        abort("'Protocols' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "Sockets") || (Module.Sockets = function() {
        abort("'Sockets' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "UNWIND_CACHE") || (Module.UNWIND_CACHE = function() {
        abort("'UNWIND_CACHE' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "readAsmConstArgs") || (Module.readAsmConstArgs = function() {
        abort("'readAsmConstArgs' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "jstoi_q") || (Module.jstoi_q = function() {
        abort("'jstoi_q' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "jstoi_s") || (Module.jstoi_s = function() {
        abort("'jstoi_s' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "abortStackOverflow") || (Module.abortStackOverflow = function() {
        abort("'abortStackOverflow' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "reallyNegative") || (Module.reallyNegative = function() {
        abort("'reallyNegative' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "formatString") || (Module.formatString = function() {
        abort("'formatString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "PATH") || (Module.PATH = function() {
        abort("'PATH' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "PATH_FS") || (Module.PATH_FS = function() {
        abort("'PATH_FS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "SYSCALLS") || (Module.SYSCALLS = function() {
        abort("'SYSCALLS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "syscallMmap2") || (Module.syscallMmap2 = function() {
        abort("'syscallMmap2' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "syscallMunmap") || (Module.syscallMunmap = function() {
        abort("'syscallMunmap' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "JSEvents") || (Module.JSEvents = function() {
        abort("'JSEvents' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "specialHTMLTargets") || (Module.specialHTMLTargets = function() {
        abort("'specialHTMLTargets' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "demangle") || (Module.demangle = function() {
        abort("'demangle' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "demangleAll") || (Module.demangleAll = function() {
        abort("'demangleAll' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "jsStackTrace") || (Module.jsStackTrace = function() {
        abort("'jsStackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "stackTrace") || (Module.stackTrace = function() {
        abort("'stackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "getEnvStrings") || (Module.getEnvStrings = function() {
        abort("'getEnvStrings' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "checkWasiClock") || (Module.checkWasiClock = function() {
        abort("'checkWasiClock' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "writeI53ToI64") || (Module.writeI53ToI64 = function() {
        abort("'writeI53ToI64' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "writeI53ToI64Clamped") || (Module.writeI53ToI64Clamped = function() {
        abort("'writeI53ToI64Clamped' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "writeI53ToI64Signaling") || (Module.writeI53ToI64Signaling = function() {
        abort("'writeI53ToI64Signaling' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "writeI53ToU64Clamped") || (Module.writeI53ToU64Clamped = function() {
        abort("'writeI53ToU64Clamped' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "writeI53ToU64Signaling") || (Module.writeI53ToU64Signaling = function() {
        abort("'writeI53ToU64Signaling' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "readI53FromI64") || (Module.readI53FromI64 = function() {
        abort("'readI53FromI64' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "readI53FromU64") || (Module.readI53FromU64 = function() {
        abort("'readI53FromU64' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "convertI32PairToI53") || (Module.convertI32PairToI53 = function() {
        abort("'convertI32PairToI53' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "convertU32PairToI53") || (Module.convertU32PairToI53 = function() {
        abort("'convertU32PairToI53' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "Browser") || (Module.Browser = function() {
        abort("'Browser' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "FS") || (Module.FS = function() {
        abort("'FS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "MEMFS") || (Module.MEMFS = function() {
        abort("'MEMFS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "TTY") || (Module.TTY = function() {
        abort("'TTY' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "PIPEFS") || (Module.PIPEFS = function() {
        abort("'PIPEFS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "SOCKFS") || (Module.SOCKFS = function() {
        abort("'SOCKFS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "GL") || (Module.GL = function() {
        abort("'GL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "emscriptenWebGLGet") || (Module.emscriptenWebGLGet = function() {
        abort("'emscriptenWebGLGet' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "emscriptenWebGLGetTexPixelData") || (Module.emscriptenWebGLGetTexPixelData = function() {
        abort("'emscriptenWebGLGetTexPixelData' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "emscriptenWebGLGetUniform") || (Module.emscriptenWebGLGetUniform = function() {
        abort("'emscriptenWebGLGetUniform' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "emscriptenWebGLGetVertexAttrib") || (Module.emscriptenWebGLGetVertexAttrib = function() {
        abort("'emscriptenWebGLGetVertexAttrib' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "AL") || (Module.AL = function() {
        abort("'AL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "SDL_unicode") || (Module.SDL_unicode = function() {
        abort("'SDL_unicode' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "SDL_ttfContext") || (Module.SDL_ttfContext = function() {
        abort("'SDL_ttfContext' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "SDL_audio") || (Module.SDL_audio = function() {
        abort("'SDL_audio' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "SDL") || (Module.SDL = function() {
        abort("'SDL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "SDL_gfx") || (Module.SDL_gfx = function() {
        abort("'SDL_gfx' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "GLUT") || (Module.GLUT = function() {
        abort("'GLUT' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "EGL") || (Module.EGL = function() {
        abort("'EGL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "GLFW_Window") || (Module.GLFW_Window = function() {
        abort("'GLFW_Window' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "GLFW") || (Module.GLFW = function() {
        abort("'GLFW' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "GLEW") || (Module.GLEW = function() {
        abort("'GLEW' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "IDBStore") || (Module.IDBStore = function() {
        abort("'IDBStore' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "runAndAbortIfError") || (Module.runAndAbortIfError = function() {
        abort("'runAndAbortIfError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "warnOnce") || (Module.warnOnce = function() {
        abort("'warnOnce' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "stackSave") || (Module.stackSave = function() {
        abort("'stackSave' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "stackRestore") || (Module.stackRestore = function() {
        abort("'stackRestore' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "stackAlloc") || (Module.stackAlloc = function() {
        abort("'stackAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "AsciiToString") || (Module.AsciiToString = function() {
        abort("'AsciiToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "stringToAscii") || (Module.stringToAscii = function() {
        abort("'stringToAscii' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "UTF16ToString") || (Module.UTF16ToString = function() {
        abort("'UTF16ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "stringToUTF16") || (Module.stringToUTF16 = function() {
        abort("'stringToUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "lengthBytesUTF16") || (Module.lengthBytesUTF16 = function() {
        abort("'lengthBytesUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "UTF32ToString") || (Module.UTF32ToString = function() {
        abort("'UTF32ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "stringToUTF32") || (Module.stringToUTF32 = function() {
        abort("'stringToUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "lengthBytesUTF32") || (Module.lengthBytesUTF32 = function() {
        abort("'lengthBytesUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "allocateUTF8") || (Module.allocateUTF8 = function() {
        abort("'allocateUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Object.getOwnPropertyDescriptor(Module, "allocateUTF8OnStack") || (Module.allocateUTF8OnStack = function() {
        abort("'allocateUTF8OnStack' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
    }), Module.writeStackCookie = writeStackCookie, Module.checkStackCookie = checkStackCookie, Object.getOwnPropertyDescriptor(Module, "ALLOC_NORMAL") || Object.defineProperty(Module, "ALLOC_NORMAL", {
        configurable: !0,
        get: function() {
            abort("'ALLOC_NORMAL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
        }
    }), Object.getOwnPropertyDescriptor(Module, "ALLOC_STACK") || Object.defineProperty(Module, "ALLOC_STACK", {
        configurable: !0,
        get: function() {
            abort("'ALLOC_STACK' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
        }
    }), Object.getOwnPropertyDescriptor(Module, "ALLOC_DYNAMIC") || Object.defineProperty(Module, "ALLOC_DYNAMIC", {
        configurable: !0,
        get: function() {
            abort("'ALLOC_DYNAMIC' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
        }
    }), Object.getOwnPropertyDescriptor(Module, "ALLOC_NONE") || Object.defineProperty(Module, "ALLOC_NONE", {
        configurable: !0,
        get: function() {
            abort("'ALLOC_NONE' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)")
        }
    });
    var calledMain = !1;

    function callMain(e) {
        assert(0 == runDependencies, 'cannot call main when async dependencies remain! (listen on Module["onRuntimeInitialized"])'), assert(0 == __ATPRERUN__.length, "cannot call main when preRun functions remain to be called");
        var t = Module._main,
            r = (e = e || []).length + 1,
            n = stackAlloc(4 * (r + 1));
        HEAP32[n >> 2] = allocateUTF8OnStack(thisProgram);
        for (var o = 1; o < r; o++) HEAP32[(n >> 2) + o] = allocateUTF8OnStack(e[o - 1]);
        HEAP32[(n >> 2) + r] = 0;
        try {
            Module.___set_stack_limit(STACK_MAX), exit(t(r, n), !0)
        } catch (e) {
            if (e instanceof ExitStatus) return;
            if ("unwind" == e) return void(noExitRuntime = !0);
            var i = e;
            e && "object" == typeof e && e.stack && (i = [e, e.stack]), err("exception thrown: " + i), quit_(1, e)
        } finally {
            calledMain = !0
        }
    }

    function run(e) {
        function t() {
            calledRun || (calledRun = !0, Module.calledRun = !0, ABORT || (initRuntime(), preMain(), Module.onRuntimeInitialized && Module.onRuntimeInitialized(), shouldRunNow && callMain(e), postRun()))
        }
        e = e || arguments_, runDependencies > 0 || (writeStackCookie(), preRun(), runDependencies > 0 || (Module.setStatus ? (Module.setStatus("Running..."), setTimeout((function() {
            setTimeout((function() {
                Module.setStatus("")
            }), 1), t()
        }), 1)) : t(), checkStackCookie()))
    }

    function checkUnflushedContent() {
        var e = out,
            t = err,
            r = !1;
        out = err = function(e) {
            r = !0
        };
        try {
            var n = Module._fflush;
            n && n(0), ["stdout", "stderr"].forEach((function(e) {
                var t = FS.analyzePath("/dev/" + e);
                if (t) {
                    var n = t.object.rdev,
                        o = TTY.ttys[n];
                    o && o.output && o.output.length && (r = !0)
                }
            }))
        } catch (e) {}
        out = e, err = t, r && warnOnce("stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the FAQ), or make sure to emit a newline when you printf etc.")
    }

    function exit(e, t) {
        if (checkUnflushedContent(), !t || !noExitRuntime || 0 !== e) {
            if (noExitRuntime) {
                if (!t) err("program exited (with status: " + e + "), but EXIT_RUNTIME is not set, so halting execution but not exiting the runtime or preventing further async execution (build with EXIT_RUNTIME=1, if you want a true shutdown)")
            } else ABORT = !0, EXITSTATUS = e, exitRuntime(), Module.onExit && Module.onExit(e);
            quit_(e, new ExitStatus(e))
        }
    }
    if (dependenciesFulfilled = function e() {
            calledRun || run(), calledRun || (dependenciesFulfilled = e)
        }, Module.run = run, Module.preInit)
        for ("function" == typeof Module.preInit && (Module.preInit = [Module.preInit]); Module.preInit.length > 0;) Module.preInit.pop()();
    var shouldRunNow = !0;
    Module.noInitialRun && (shouldRunNow = !1), noExitRuntime = !0, run();
} catch (err) {

    alert(err);

}