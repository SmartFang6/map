! function() {
	var t = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" !=
		typeof window ? window : "undefined" != typeof global ? global : {};

	function e(t) {
		return t && t.__esModule ? t.default : t
	}

	function r(t, e, r) {
		Object.defineProperty(t, e, {
			get: r,
			enumerable: !0
		})
	}
	var n, i, o = !1;

	function a() {
		return o || (o = !0, i = t => {
			var e = ["attribute vec4 vertexPos;", "attribute vec4 texturePos;", "varying vec2 textureCoord;",
					"void main()", "{", "gl_Position = vertexPos;", "textureCoord = texturePos.xy;", "}"
				].join("\n"),
				r = ["precision highp float;", "varying highp vec2 textureCoord;",
					"uniform sampler2D ySampler;", "uniform sampler2D uSampler;", "uniform sampler2D vSampler;",
					"const mat4 YUV2RGB = mat4", "(", "1.1643828125, 0, 1.59602734375, -.87078515625,",
					"1.1643828125, -.39176171875, -.81296875, .52959375,",
					"1.1643828125, 2.017234375, 0, -1.081390625,", "0, 0, 0, 1", ");", "void main(void) {",
					"highp float y = texture2D(ySampler,  textureCoord).r;",
					"highp float u = texture2D(uSampler,  textureCoord).r;",
					"highp float v = texture2D(vSampler,  textureCoord).r;",
					"gl_FragColor = vec4(y, u, v, 1) * YUV2RGB;", "}"
				].join("\n"),
				n = t.createShader(t.VERTEX_SHADER);
			t.shaderSource(n, e), t.compileShader(n), t.getShaderParameter(n, t.COMPILE_STATUS) || console.log(
				"Vertex shader failed to compile: " + t.getShaderInfoLog(n));
			var i = t.createShader(t.FRAGMENT_SHADER);
			t.shaderSource(i, r), t.compileShader(i), t.getShaderParameter(i, t.COMPILE_STATUS) || console.log(
				"Fragment shader failed to compile: " + t.getShaderInfoLog(i));
			var o = t.createProgram();
			t.attachShader(o, n), t.attachShader(o, i), t.linkProgram(o), t.getProgramParameter(o, t
					.LINK_STATUS) || console.log("Program failed to compile: " + t.getProgramInfoLog(o)), t
				.useProgram(o);
			var a = t.createBuffer();
			t.bindBuffer(t.ARRAY_BUFFER, a), t.bufferData(t.ARRAY_BUFFER, new Float32Array([1, 1, -1, 1, 1, -1,
				-1, -1
			]), t.STATIC_DRAW);
			var s = t.getAttribLocation(o, "vertexPos");
			t.enableVertexAttribArray(s), t.vertexAttribPointer(s, 2, t.FLOAT, !1, 0, 0);
			var f = t.createBuffer();
			t.bindBuffer(t.ARRAY_BUFFER, f), t.bufferData(t.ARRAY_BUFFER, new Float32Array([1, 0, 0, 0, 1, 1, 0,
				1
			]), t.STATIC_DRAW);
			var u = t.getAttribLocation(o, "texturePos");

			function h(e, r) {
				var n = t.createTexture();
				return t.bindTexture(t.TEXTURE_2D, n), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t
						.LINEAR), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR), t
					.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t
						.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), t.bindTexture(t.TEXTURE_2D, null), t
					.uniform1i(t.getUniformLocation(o, e), r), n
			}
			t.enableVertexAttribArray(u), t.vertexAttribPointer(u, 2, t.FLOAT, !1, 0, 0);
			var c = h("ySampler", 0),
				d = h("uSampler", 1),
				l = h("vSampler", 2);
			return function(e, r, n, i, o) {
				t.viewport(0, 0, e, r), t.activeTexture(t.TEXTURE0), t.bindTexture(t.TEXTURE_2D, c), t
					.texImage2D(t.TEXTURE_2D, 0, t.LUMINANCE, e, r, 0, t.LUMINANCE, t.UNSIGNED_BYTE, n), t
					.activeTexture(t.TEXTURE1), t.bindTexture(t.TEXTURE_2D, d), t.texImage2D(t.TEXTURE_2D,
						0, t.LUMINANCE, e / 2, r / 2, 0, t.LUMINANCE, t.UNSIGNED_BYTE, i), t.activeTexture(t
						.TEXTURE2), t.bindTexture(t.TEXTURE_2D, l), t.texImage2D(t.TEXTURE_2D, 0, t
						.LUMINANCE, e / 2, r / 2, 0, t.LUMINANCE, t.UNSIGNED_BYTE, o), t.drawArrays(t
						.TRIANGLE_STRIP, 0, 4)
			}
		}, r(n = {}, "default", (function() {
			return i
		}))), n
	}
	var s, f, u = !1;

	function h() {
		s = {}, a(), f = t => {
			const e = document.createElement("canvas");
			e.style.position = "absolute", e.style.top = 0, e.style.left = 0, t.$container.appendChild(e), t
				.$canvasElement = e, t.$container.style.overflow = "hidden", "absolute" !== t.$container.style
				.position && (t.$container.style.position = "relative");
			if (!t._supportOffscreen()) {
				const e = (() => {
					const e = t.$canvasElement;
					let r = null;
					const n = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"];
					let i = 0;
					for (; !r && i < n.length;) {
						const o = n[i];
						try {
							let n = {
								preserveDrawingBuffer: !0
							};
							t._opt.contextOptions && (n = Object.assign(n, t._opt.contextOptions)), r = e
								.getContext(o, n)
						} catch (t) {
							r = null
						}
						r && "function" == typeof r.getParameter || (r = null), ++i
					}
					return r
				})();
				t._contextGLRender = a().default(e), t._contextGL = e
			}
			t._destroyContextGL = () => {
				t._contextGL && (t._contextGL = null), t._contextGLRender && (t._contextGLRender = null), t
					._bitmaprenderer && (t._bitmaprenderer = null)
			}
		}, r(s, "default", (function() {
			return f
		}))
	}

	function c() {
		return u || (u = !0, h()), s
	}
	var d, l, p, m, b, g, v, y = !1;

	function w() {
		return y || (y = !0, l = {
			videoBuffer: .5,
			vod: !1,
			isResize: !0,
			isFullSize: !1,
			debug: !1,
			timeout: 30,
			supportDblclickFullscreen: !1,
			showBandwidth: !1,
			keepScreenOn: !1,
			isNotMute: !1,
			hasAudio: !0,
			operateBtns: {
				fullscreen: !1,
				screenshot: !1,
				play: !1,
				audio: !1
			},
			loadingText: "",
			background: "",
			decoder: "./EasyWasmPlayer.js",
			rotate: 0,
			text: "",
			forceNoOffscreen: !0,
			hiddenAutoPause: !1
		}, r(d = {}, "DEFAULT_OPTIONS", (function() {
			return l
		})), p = {
			init: "init",
			initSize: "initSize",
			render: "render",
			playAudio: "playAudio",
			print: "print",
			printErr: "printErr",
			initAudioPlanar: "initAudioPlanar",
			kBps: "kBps"
		}, r(d, "CMD_TYPE", (function() {
			return p
		})), m = {
			close: "close",
			play: "play",
			setVideoBuffer: "setVideoBuffer",
			init: "init"
		}, r(d, "POST_MESSAGE", (function() {
			return m
		})), b = {
			fullscreen: "fullscreen",
			play: "play",
			pause: "pause",
			mute: "mute",
			load: "load",
			videoInfo: "videoInfo",
			timeUpdate: "timeUpdate",
			audioInfo: "audioInfo",
			log: "log",
			error: "error",
			kBps: "kBps",
			timeout: "timeout",
			stats: "stats",
			performance: "performance",
			record: "record",
			buffer: "buffer",
			videoFrame: "videoFrame",
			start: "start",
			metadata: "metadata"
		}, r(d, "EVEMTS", (function() {
			return b
		})), g = {
			empty: "empty",
			buffering: "buffering",
			full: "full"
		}, r(d, "BUFFER_STATUS", (function() {
			return g
		})), v = {
			download: "download",
			base64: "base64",
			blob: "blob"
		}, r(d, "SCREENSHOT_TYPE", (function() {
			return v
		}))), d
	}
	var _, A = !1;

	function M(t) {
		t.resume();
		const e = t.createBufferSource();
		e.buffer = t.createBuffer(1, 1, 22050), e.connect(t.destination), e.noteOn ? e.noteOn(0) : e.start(0)
	}

	function E(t, e) {
		t && (t.style.display = e ? "block" : "none")
	}

	function S(t = "") {
		const e = t.split(","),
			r = atob(e[1]),
			n = e[0].replace("data:", "").replace(";base64", "");
		let i = r.length,
			o = new Uint8Array(i);
		for (; i--;) o[i] = r.charCodeAt(i);
		return new File([o], "file", {
			type: n
		})
	}

	function k(t, e) {
		const r = document.createElement("a");
		r.download = e, r.href = URL.createObjectURL(t), r.click(), URL.revokeObjectURL(t)
	}

	function B(t) {
		if (null == t || "" === t) return "0 KB/S";
		let e = parseFloat(t);
		return e = e.toFixed(2), e + "KB/S"
	}

	function T(t) {
		let e = 0;
		return t >= 24 ? e = 2 : t >= 15 && (e = 1), e
	}

	function R(t, e) {
		Object.keys(e || {}).forEach((function(r) {
			t.style[r] = e[r]
		}))
	}

	function x() {
		let t = document.fullscreenElement || window.webkitFullscreenElement || document.msFullscreenElement;
		return void 0 === t && (t = !1), !!t
	}

	function C() {}

	function I() {
		return (new Date).getTime()
	}

	function D(t) {
		Object.keys(t || {}).forEach((e => {
			"bgDom" !== e && E(t[e], !1)
		}))
	}

	function P(t) {
		E(t.pauseDom, !0), E(t.screenshotsDom, !0), E(t.fullscreenDom, !0), E(t.quietAudioDom, !0), E(t.textDom, !0), E(
			t.speedDom, !0), E(t.recordDom, !0), E(t.loadingDom, !1), E(t.playDom, !1), E(t.playBigDom, !1), E(t
			.bgDom, !1)
	}

	function O(t, e) {
		let r = w().BUFFER_STATUS.buffering;
		return 0 === t ? r = w().BUFFER_STATUS.empty : t >= e && (r = w().BUFFER_STATUS.full), r
	}

	function L() {
		return A || (A = !0, _ = {}, w(), r(_, "audioContextUnlock", (function() {
			return M
		})), r(_, "$domToggle", (function() {
			return E
		})), r(_, "dataURLToFile", (function() {
			return S
		})), r(_, "downloadImg", (function() {
			return k
		})), r(_, "bpsSize", (function() {
			return B
		})), r(_, "fpsStatus", (function() {
			return T
		})), r(_, "setStyle", (function() {
			return R
		})), r(_, "checkFull", (function() {
			return x
		})), r(_, "noop", (function() {
			return C
		})), r(_, "now", (function() {
			return I
		})), r(_, "$hideBtns", (function() {
			return D
		})), r(_, "$initBtns", (function() {
			return P
		})), r(_, "bufferStatus", (function() {
			return O
		}))), _
	}
	var U, j, N = !1;

	function z() {
		return N || (N = !0, U = {}, L(), j = t => {
			t._audioContext = new(window.AudioContext || window.webkitAudioContext), t._gainNode = t
				._audioContext.createGain(), t._audioEnabled = e => {
					e ? (L().audioContextUnlock(t._audioContext), t._audioEnabled = e => {
						e ? t._audioContext.resume() : t._audioContext.suspend()
					}, t._audioContext.resume()) : t._audioContext.suspend()
				}, t._audioEnabled(!0), t._mute = () => {
					t._audioEnabled(!1), t.quieting = !0
				}, t._cancelMute = () => {
					t._audioEnabled(!0), t.quieting = !1
				}, t._audioResume = () => {
					t._cancelMute()
				}, t._initAudioPlanar = e => {
					const r = t._audioContext;
					if (!r) return !1;
					let n = [];
					const i = r.createScriptProcessor(1024, 0, 2);
					i.onaudioprocess = function(t) {
						if (n.length) {
							const r = n.shift();
							for (let n = 0; n < e.channels; n++) {
								const e = r[n],
									i = t.outputBuffer.getChannelData(n);
								for (let t = 0; t < 1024; t++) i[t] = e[t]
							}
						}
					}, i.connect(t._gainNode), t._closeAudio = () => {
						i.disconnect(t._gainNode), t._gainNode.disconnect(r.destination), delete t
							._closeAudio, n = []
					}, t._gainNode.connect(r.destination), t._playAudio = t => n.push(t)
				}, t._destroyAudioContext = () => {
					t._audioContext.close(), t._audioContext = null, t._gainNode = null
				}
		}, r(U, "default", (function() {
			return j
		}))), U
	}
	var F, q, H = !1;

	function W() {
		return H || (H = !0, F = {}, L(), q = t => {
			t._resize$2 = () => t.resize(), t._handleVisibilityChange$2 = () => t._handleVisibilityChange(), t
				._onfullscreenchange$2 = () => t._onfullscreenchange(), t._handleWakeLock$2 = () => t
				._handleWakeLock(), window.addEventListener("resize", t._resize$2), window.addEventListener(
					"fullscreenchange", t._onfullscreenchange$2), document.addEventListener("visibilitychange",
					t._handleVisibilityChange$2), document.addEventListener("visibilitychange", t
					._handleWakeLock$2), window.addEventListener("fullscreenchange", t._handleWakeLock$2), t
				._opt.supportDblclickFullscreen && t.$canvasElement.addEventListener("dblclick", (() => {
					t.fullscreen = !t.fullscreen
				}), !1), t._removeEventListener = () => {
					window.removeEventListener("resize", t._resize$2), window.removeEventListener(
						"fullscreenchange", t._onfullscreenchange$2), document.removeEventListener(
						"visibilitychange", t._handleWakeLock$2), document.removeEventListener(
						"visibilitychange", t._handleVisibilityChange$2), window.removeEventListener(
						"fullscreenchange", t._handleWakeLock$2)
				}, t.$doms.playDom && t.$doms.playDom.addEventListener("click", (e => {
					e.stopPropagation(), t._play()
				}), !1), t.$doms.playBigDom && t.$doms.playBigDom.addEventListener("click", (e => {
					e.stopPropagation(), t._play()
				}), !1), t.$doms.pauseDom && t.$doms.pauseDom.addEventListener("click", (e => {
					e.stopPropagation(), t._pause()
				}), !1), t.$doms.screenshotsDom && t.$doms.screenshotsDom.addEventListener("click", (e => {
					e.stopPropagation();
					const r = (t._opt.text || "") + "" + L().now();
					t._screenshot(r)
				}), !1), t.$doms.fullscreenDom && t.$doms.fullscreenDom.addEventListener("click", (e => {
					e.stopPropagation(), t.fullscreen = !0
				}), !1), t.$doms.minScreenDom && t.$doms.minScreenDom.addEventListener("click", (e => {
					e.stopPropagation(), t.fullscreen = !1
				}), !1), t.$doms.recordDom && t.$doms.recordDom.addEventListener("click", (e => {
					e.stopPropagation(), t.recording = !0
				}), !1), t.$doms.recordingDom && t.$doms.recordingDom.addEventListener("click", (e => {
					e.stopPropagation(), t.recording = !1
				}), !1), t.$doms.quietAudioDom && t.$doms.quietAudioDom.addEventListener("click", (e => {
					e.stopPropagation(), t._cancelMute()
				}), !1), t.$doms.playAudioDom && t.$doms.playAudioDom.addEventListener("click", (e => {
					e.stopPropagation(), t._mute()
				}), !1), t._enableWakeLock()
		}, r(F, "default", (function() {
			return q
		}))), F
	}
	var G, Y, K = !1;

	function V() {
		return K || (K = !0, G = {}, L(), W(), Y = t => {
			t._showControl = () => {
				let e = !1,
					r = !1;
				return Object.keys(t._opt.operateBtns).forEach((e => {
					t._opt.operateBtns[e] && (r = !0)
				})), (t._opt.showBandwidth || t._opt.text || r) && (e = !0), e
			};
			const e = {},
				r = document.createDocumentFragment(),
				n = document.createElement("div"),
				i = document.createElement("div"),
				o = document.createElement("div"),
				a = document.createElement("div"),
				s = document.createElement("div"),
				f = document.createElement("div"),
				u = document.createElement("div"),
				h = document.createElement("div"),
				c = document.createElement("div"),
				d = document.createElement("div"),
				l = document.createElement("div"),
				p = document.createElement("div"),
				m = document.createElement("div"),
				b = document.createElement("div"),
				g = document.createElement("div"),
				v = document.createElement("div"),
				y = document.createElement("div"),
				w = document.createElement("div");
			m.innerText = t._opt.loadingText || "", a.innerText = t._opt.text || "", s.innerText = "", f.title =
				"播放", h.title = "暂停", c.title = "截屏", d.title = "全屏", l.title = "退出全屏", b.title = "静音", g
				.title = "取消静音", v.title = "录制", y.title = "取消录制";
			let _ = {
				position: "absolute",
				width: "100%",
				height: "100%"
			};
			t._opt.background && (_ = Object.assign({}, _, {
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center",
				backgroundSize: "100%",
				backgroundImage: "url('" + t._opt.background + "')"
			}));
			const A = {
					position: "absolute",
					width: "100%",
					height: "100%",
					textAlign: "center",
					color: "#fff",
					display: "none",
					backgroundImage: "url('data:image/gif;base64,R0lGODlhgACAAKIAAP///93d3bu7u5mZmQAA/wAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFBQAEACwCAAIAfAB8AAAD/0i63P4wygYqmDjrzbtflvWNZGliYXiubKuloivPLlzReD7al+7/Eh5wSFQIi8hHYBkwHUmD6CD5YTJLz49USuVYraRsZ7vtar7XnQ1Kjpoz6LRHvGlz35O4nEPP2O94EnpNc2sef1OBGIOFMId/inB6jSmPdpGScR19EoiYmZobnBCIiZ95k6KGGp6ni4wvqxilrqBfqo6skLW2YBmjDa28r6Eosp27w8Rov8ekycqoqUHODrTRvXsQwArC2NLF29UM19/LtxO5yJd4Au4CK7DUNxPebG4e7+8n8iv2WmQ66BtoYpo/dvfacBjIkITBE9DGlMvAsOIIZjIUAixliv9ixYZVtLUos5GjwI8gzc3iCGghypQqrbFsme8lwZgLZtIcYfNmTJ34WPTUZw5oRxdD9w0z6iOpO15MgTh1BTTJUKos39jE+o/KS64IFVmsFfYT0aU7capdy7at27dw48qdS7eu3bt480I02vUbX2F/JxYNDImw4GiGE/P9qbhxVpWOI/eFKtlNZbWXuzlmG1mv58+gQ4seTbq06dOoU6vGQZJy0FNlMcV+czhQ7SQmYd8eMhPs5BxVdfcGEtV3buDBXQ+fURxx8oM6MT9P+Fh6dOrH2zavc13u9JXVJb520Vp8dvC76wXMuN5Sepm/1WtkEZHDefnzR9Qvsd9+/wi8+en3X0ntYVcSdAE+UN4zs7ln24CaLagghIxBaGF8kFGoIYV+Ybghh841GIyI5ICIFoklJsigihmimJOLEbLYIYwxSgigiZ+8l2KB+Ml4oo/w8dijjcrouCORKwIpnJIjMnkkksalNeR4fuBIm5UEYImhIlsGCeWNNJphpJdSTlkml1jWeOY6TnaRpppUctcmFW9mGSaZceYopH9zkjnjUe59iR5pdapWaGqHopboaYua1qije67GJ6CuJAAAIfkEBQUABAAsCgACAFcAMAAAA/9Iutz+ML5Ag7w46z0r5WAoSp43nihXVmnrdusrv+s332dt4Tyo9yOBUJD6oQBIQGs4RBlHySSKyczVTtHoidocPUNZaZAr9F5FYbGI3PWdQWn1mi36buLKFJvojsHjLnshdhl4L4IqbxqGh4gahBJ4eY1kiX6LgDN7fBmQEJI4jhieD4yhdJ2KkZk8oiSqEaatqBekDLKztBG2CqBACq4wJRi4PZu1sA2+v8C6EJexrBAD1AOBzsLE0g/V1UvYR9sN3eR6lTLi4+TlY1wz6Qzr8u1t6FkY8vNzZTxaGfn6mAkEGFDgL4LrDDJDyE4hEIbdHB6ESE1iD4oVLfLAqPETIsOODwmCDJlv5MSGJklaS6khAQAh+QQFBQAEACwfAAIAVwAwAAAD/0i63P5LSAGrvTjrNuf+YKh1nWieIumhbFupkivPBEzR+GnnfLj3ooFwwPqdAshAazhEGUXJJIrJ1MGOUamJ2jQ9QVltkCv0XqFh5IncBX01afGYnDqD40u2z76JK/N0bnxweC5sRB9vF34zh4gjg4uMjXobihWTlJUZlw9+fzSHlpGYhTminKSepqebF50NmTyor6qxrLO0L7YLn0ALuhCwCrJAjrUqkrjGrsIkGMW/BMEPJcphLgDaABjUKNEh29vdgTLLIOLpF80s5xrp8ORVONgi8PcZ8zlRJvf40tL8/QPYQ+BAgjgMxkPIQ6E6hgkdjoNIQ+JEijMsasNY0RQix4gKP+YIKXKkwJIFF6JMudFEAgAh+QQFBQAEACw8AAIAQgBCAAAD/kg0PPowykmrna3dzXvNmSeOFqiRaGoyaTuujitv8Gx/661HtSv8gt2jlwIChYtc0XjcEUnMpu4pikpv1I71astytkGh9wJGJk3QrXlcKa+VWjeSPZHP4Rtw+I2OW81DeBZ2fCB+UYCBfWRqiQp0CnqOj4J1jZOQkpOUIYx/m4oxg5cuAaYBO4Qop6c6pKusrDevIrG2rkwptrupXB67vKAbwMHCFcTFxhLIt8oUzLHOE9Cy0hHUrdbX2KjaENzey9Dh08jkz8Tnx83q66bt8PHy8/T19vf4+fr6AP3+/wADAjQmsKDBf6AOKjS4aaHDgZMeSgTQcKLDhBYPEswoA1BBAgAh+QQFBQAEACxOAAoAMABXAAAD7Ei6vPOjyUkrhdDqfXHm4OZ9YSmNpKmiqVqykbuysgvX5o2HcLxzup8oKLQQix0UcqhcVo5ORi+aHFEn02sDeuWqBGCBkbYLh5/NmnldxajX7LbPBK+PH7K6narfO/t+SIBwfINmUYaHf4lghYyOhlqJWgqDlAuAlwyBmpVnnaChoqOkpaanqKmqKgGtrq+wsbA1srW2ry63urasu764Jr/CAb3Du7nGt7TJsqvOz9DR0tPU1TIA2ACl2dyi3N/aneDf4uPklObj6OngWuzt7u/d8fLY9PXr9eFX+vv8+PnYlUsXiqC3c6PmUUgAACH5BAUFAAQALE4AHwAwAFcAAAPpSLrc/m7IAau9bU7MO9GgJ0ZgOI5leoqpumKt+1axPJO1dtO5vuM9yi8TlAyBvSMxqES2mo8cFFKb8kzWqzDL7Xq/4LB4TC6bz1yBes1uu9uzt3zOXtHv8xN+Dx/x/wJ6gHt2g3Rxhm9oi4yNjo+QkZKTCgGWAWaXmmOanZhgnp2goaJdpKGmp55cqqusrZuvsJays6mzn1m4uRAAvgAvuBW/v8GwvcTFxqfIycA3zA/OytCl0tPPO7HD2GLYvt7dYd/ZX99j5+Pi6tPh6+bvXuTuzujxXens9fr7YPn+7egRI9PPHrgpCQAAIfkEBQUABAAsPAA8AEIAQgAAA/lIutz+UI1Jq7026h2x/xUncmD5jehjrlnqSmz8vrE8u7V5z/m5/8CgcEgsGo/IpHLJbDqf0Kh0ShBYBdTXdZsdbb/Yrgb8FUfIYLMDTVYz2G13FV6Wz+lX+x0fdvPzdn9WeoJGAYcBN39EiIiKeEONjTt0kZKHQGyWl4mZdREAoQAcnJhBXBqioqSlT6qqG6WmTK+rsa1NtaGsuEu6o7yXubojsrTEIsa+yMm9SL8osp3PzM2cStDRykfZ2tfUtS/bRd3ewtzV5pLo4eLjQuUp70Hx8t9E9eqO5Oku5/ztdkxi90qPg3x2EMpR6IahGocPCxp8AGtigwQAIfkEBQUABAAsHwBOAFcAMAAAA/9Iutz+MMo36pg4682J/V0ojs1nXmSqSqe5vrDXunEdzq2ta3i+/5DeCUh0CGnF5BGULC4tTeUTFQVONYAs4CfoCkZPjFar83rBx8l4XDObSUL1Ott2d1U4yZwcs5/xSBB7dBMBhgEYfncrTBGDW4WHhomKUY+QEZKSE4qLRY8YmoeUfkmXoaKInJ2fgxmpqqulQKCvqRqsP7WooriVO7u8mhu5NacasMTFMMHCm8qzzM2RvdDRK9PUwxzLKdnaz9y/Kt8SyR3dIuXmtyHpHMcd5+jvWK4i8/TXHff47SLjQvQLkU+fG29rUhQ06IkEG4X/Rryp4mwUxSgLL/7IqFETB8eONT6ChCFy5ItqJomES6kgAQAh+QQFBQAEACwKAE4AVwAwAAAD/0i63A4QuEmrvTi3yLX/4MeNUmieITmibEuppCu3sDrfYG3jPKbHveDktxIaF8TOcZmMLI9NyBPanFKJp4A2IBx4B5lkdqvtfb8+HYpMxp3Pl1qLvXW/vWkli16/3dFxTi58ZRcChwIYf3hWBIRchoiHiotWj5AVkpIXi4xLjxiaiJR/T5ehoomcnZ+EGamqq6VGoK+pGqxCtaiiuJVBu7yaHrk4pxqwxMUzwcKbyrPMzZG90NGDrh/JH8t72dq3IN1jfCHb3L/e5ebh4ukmxyDn6O8g08jt7tf26ybz+m/W9GNXzUQ9fm1Q/APoSWAhhfkMAmpEbRhFKwsvCsmosRIHx444PoKcIXKkjIImjTzjkQAAIfkEBQUABAAsAgA8AEIAQgAAA/VIBNz+8KlJq72Yxs1d/uDVjVxogmQqnaylvkArT7A63/V47/m2/8CgcEgsGo/IpHLJbDqf0Kh0Sj0FroGqDMvVmrjgrDcTBo8v5fCZki6vCW33Oq4+0832O/at3+f7fICBdzsChgJGeoWHhkV0P4yMRG1BkYeOeECWl5hXQ5uNIAOjA1KgiKKko1CnqBmqqk+nIbCkTq20taVNs7m1vKAnurtLvb6wTMbHsUq4wrrFwSzDzcrLtknW16tI2tvERt6pv0fi48jh5h/U6Zs77EXSN/BE8jP09ZFA+PmhP/xvJgAMSGBgQINvEK5ReIZhQ3QEMTBLAAAh+QQFBQAEACwCAB8AMABXAAAD50i6DA4syklre87qTbHn4OaNYSmNqKmiqVqyrcvBsazRpH3jmC7yD98OCBF2iEXjBKmsAJsWHDQKmw571l8my+16v+CweEwum8+hgHrNbrvbtrd8znbR73MVfg838f8BeoB7doN0cYZvaIuMjY6PkJGSk2gClgJml5pjmp2YYJ6dX6GeXaShWaeoVqqlU62ir7CXqbOWrLafsrNctjIDwAMWvC7BwRWtNsbGFKc+y8fNsTrQ0dK3QtXAYtrCYd3eYN3c49/a5NVj5eLn5u3s6e7x8NDo9fbL+Mzy9/T5+tvUzdN3Zp+GBAAh+QQJBQAEACwCAAIAfAB8AAAD/0i63P4wykmrvTjrzbv/YCiOZGmeaKqubOu+cCzPdArcQK2TOL7/nl4PSMwIfcUk5YhUOh3M5nNKiOaoWCuWqt1Ou16l9RpOgsvEMdocXbOZ7nQ7DjzTaeq7zq6P5fszfIASAYUBIYKDDoaGIImKC4ySH3OQEJKYHZWWi5iZG0ecEZ6eHEOio6SfqCaqpaytrpOwJLKztCO2jLi1uoW8Ir6/wCHCxMG2x7muysukzb230M6H09bX2Nna29zd3t/g4cAC5OXm5+jn3Ons7eba7vHt2fL16tj2+QL0+vXw/e7WAUwnrqDBgwgTKlzIsKHDh2gGSBwAccHEixAvaqTYcFCjRoYeNyoM6REhyZIHT4o0qPIjy5YTTcKUmHImx5cwE85cmJPnSYckK66sSAAj0aNIkypdyrSp06dQo0qdSrWq1atYs2rdyrWr169gwxZJAAA7')",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center",
					backgroundSize: "40px 40px"
				},
				M = {
					position: "absolute",
					width: "100%",
					height: "100%",
					display: "none",
					background: "rgba(0,0,0,0.4)",
					backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwEAYAAAAHkiXEAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAByBJREFUeNrlXFlIVV0U3vsaaINmZoX0YAR6y8oGMkKLoMESSjBoUJEoIogoIggigoryIQoKGqi3Roh6TKGBIkNEe6hMgzTNKLPSUlMrNdvrf/juurlP5zpc7znb+r+X755pn7W+Pe+9zpVimIEUKVKJiUIKKWRqKs5OmwZOTBQkSFBUFK5HR+tPt7WBOzpwX3U1jquqwGVleK6iQkoppSQy7a8xEBERLVwIPnsWXF9PrqCxEXzxInjpUrDH47YO0h2hw8JwtG4deN8+8OzZA0vl7Vt/iZZCCtnUhPPt7fp9o0fjvpgYHHu9uD8+Hsdsh52hggTV1uLg2DHwpUvSIz3S093ttE4hB5qSxYuRAc+f910im5vBFy6As7LALORQ7RgzBullZIBPngQ3NPRt1+vXeH7NGtN69u8oERFFRIDPnQMrZe8YZ0huLhwMDzdjb1gYC4zj4uKAeaFIkbpxAwfWvse48FOngp89s7eeS1p2Nlg63vQF7Y8iRWrlSthZXR2wZhAR0dy55gwlIqI5c8AfPtgbeuUKHIqKMi3soP3z1UzwiRP2NbqtDbxsmXuGacK3tOgG/fwJ3rbNtIDO+J2ZiQzp6ND97uzE+RUrHDaAmxprif/+HQasXm1aKKcBPxcsADc1/VEjFClS8+eH7oXcuSpSpJ480V/Y0wPOyjItjNtgofWmiPHuHa7Hxg79RUT0e1Rjxb/X1ASnDw9vf/3S9bl1K/iEFSlSixbZdz7Xr5t2fLgBuuTn2xfUjRsHmVBYGNg6gWpo+FtHNU4DuowYAZ3Ky+11GzOm/4SIiGjDBvuczM52zAHua4iI6OpVcGEheO1a8PCdP/j9CNRyKFKk9u4doBDWCRXXBOcE0GekgVBUhPuSk00LPTAdCwp0+3n0GBER4AFenbQiJ8cdg7dvpwGB5xunT4PHjTMtuL0/qan29q9fH+AB62jnyxe31moGlwFWNDbCzq1bcez+snLffr14odtrMzrCBet6/Pnz7hoabAZY8fgxT5iGRwbs36/b19kJHjnS49+BEkIIMXmy/vjt26YdCA4pKdgHKC2Fo5cvh2xiFBTu3NGPw8Ox/5CW5tG3/hi8VffokRmDQwUeNOTlwc/KSmRIbq67djx9Cm5p+W2akEKmpfnaSt5zZdTXY8+0udmQcg5h0iQwD3MfPgRPn+7UG6GjUjiqrNSver0eVIWEBP85EiSIN7H/dSxZAuY1roMHHRt02OqamOhrgnoN46SQQn76ZFoad8Hj8kOH4D/PZJOSQvYKW11jYnxNkHWK3NFhWhKz8HrB9+7xaCU06fYKIiBBgiIjfRlgHTf/j+NlNMTFgceOHXJSJEgQ9wXCVyOk9AlvLfEDWDT6X+DAAXSiHz8OOSkppJCRkfrJ9vYR+NHaql8wNV42jVevUFJ37kQ8kHX8PlRMmOD/SYIEtbZ69IAkvsATs38dP36ADx8GJyc7IzyD+xbhqxE1Nb4a8PKlfiE+HsOxyEgYZI1A+9tRUADetQtNTF2dU29CJ84Twhkz9KtVVb4+oKxMvxAWxjM101KFBvX1qNmbNkHwNWucFl4HT/QmTvSfIkGCSks9HC2MsxxzyTekp5uWLjh0dYHz88FeL2ry5ctm7LHq2NMD7rXUg6rC0cKM9+/BfQS1hghDXg1VpEjdvasvLpqHf3VWs/P+/QA3Lltm75jz8T7BZQAvn9tscJgWXpEiNWuWvd2bNwcQwONbnq6p0R8oLnYnA7Zs6Vvw7m7Yd/z4gDe5DQH2Xrum29/SwoObfh7cts1egFWrnDU4Lg785g2Ytx4LC2H4zJmmhe3XD5+dsJsD1xhHjgwwgfBwPFBXpydQXe3uFqXzfU9o7ZUSXFRkX/IHMcENGKXgixY27fBwA8TZudO+5dixY4gJ37xpyQVfvEtmpmnHTQMFMiUFevBeL6OkZMg1GQlER4P5wwTGt29g65bmvw/4HShanD+5mjIlxC+cNw/cKxqYw7RDHZY9TOEXXpEiVVurC8+jtJUrnTNAkSK1fDle2NWlG9DeDs7IMC2UM35zU2Mt8Urhel6eywalp+vCMzhM++hRDlo1LeCg/dNGNdy5Wtt4LvEuCv+HodqHCu/e2Y8Cyss5aNW0sAPzh8fx1uEkgyMGHWxqgjM8NhYGWoNSraMnvm6+89aXDHjmap1AMUpKcD9/+D2MAYNzcsD9fRDNsZMcwsedfehiPJFeUhJ4925wWVnfdvFHiDt2gEM/MXT+rwp47UMKKeT27Ti7Zw+YA6UCgbdKKyr8cTVSSCEbG3Ge/5yDwWtD48fjfv6rAl7C6LUeb4uvX8FnzuD5U6ewjP35s9M6uQaUJP4Qgz8E4SbJ2sk5BV5jevAAvHmzqS9/hs0XJxBi1CgOWtVjVnlHKSEB16Oj/wgoE0L8LsFcM169AldV8Q4UjouKULKtNch9/AdsEf6XQYgIsAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wMS0xMlQxMTo1NjowNSswODowMGcMj/QAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDEtMTJUMTE6NTY6MDUrMDg6MDAWUTdIAAAASXRFWHRzdmc6YmFzZS11cmkAZmlsZTovLy9ob21lL2FkbWluL2ljb24tZm9udC90bXAvaWNvbl9wZHMzeWYxNGczYi9ib2Zhbmcuc3Zn11us5wAAAABJRU5ErkJggg==')",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center",
					backgroundSize: "48px 48px",
					cursor: "pointer"
				},
				E = {
					position: "absolute",
					top: 0,
					height: "100%",
					display: "flex",
					alignItems: "center"
				},
				S = {
					display: "none",
					position: "relative",
					fontSize: "13px",
					color: "#fff",
					lineHeight: "20px",
					marginLeft: "5px",
					marginRight: "5px",
					userSelect: "none"
				},
				k = {
					display: "none",
					position: "relative",
					width: "16px",
					height: "16px",
					marginLeft: "8px",
					marginRight: "8px",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center",
					backgroundSize: "100%",
					cursor: "pointer"
				};
			L().setStyle(w, _), L().setStyle(n, {
					height: "38px",
					zIndex: 11,
					position: "absolute",
					left: 0,
					bottom: 0,
					width: "100%",
					background: "rgba(0,0,0)"
				}), L().setStyle(p, A), L().setStyle(u, M), L().setStyle(m, {
					position: "absolute",
					width: "100%",
					top: "60%",
					textAlign: "center"
				}), L().setStyle(i, Object.assign({}, E, {
					left: 0
				})), L().setStyle(o, Object.assign({}, E, {
					right: 0
				})), L().setStyle(a, S), L().setStyle(s, S), L().setStyle(f, Object.assign({}, k, {
					backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAARVJREFUSMe9laEOglAUhs+5k9lJFpsJ5QWMJoNGbEY0mEy+gr6GNo0a3SiQCegMRILzGdw4hl+Cd27KxPuXb2zA/91z2YXoGRERkX4fvN3A2QxUiv4dFM3n8jZRBLbbVfd+ubJuF4xjiCyXkksueb1uSKCIZYGLBTEx8ekEoV7PkICeVgs8HiGyXoO2bUigCDM4HoPnM7bI8wwJ6Gk0sEXbLSay30Oo2TQkoGcwgFCSQMhxDAvoETEscDiQkJC4LjMz8+XyZ4HrFYWjEQqHQ1asWGWZfmdFAsVINxuw00HhbvfpydpvxWkKTqdYaRCUfUPJCdzv4Gr1uqfli0tOIAzByUT/iCrL6+84y3Bw+D6ui5Ou+jwA8FnIO++FACgAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDEtMDhUMTY6NDI6NTMrMDg6MDCKP7wnAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTAxLTA4VDE2OjQyOjUzKzA4OjAw+2IEmwAAAEl0RVh0c3ZnOmJhc2UtdXJpAGZpbGU6Ly8vaG9tZS9hZG1pbi9pY29uLWZvbnQvdG1wL2ljb25fZ2Y3MDBzN2IzZncvYm9mYW5nLnN2Z8fICi0AAAAASUVORK5CYII=')"
				})), L().setStyle(h, Object.assign({}, k, {
					backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAAHVJREFUSMftkCESwCAMBEOnCtdXVMKHeC7oInkEeQJXkRoEZWraipxZc8lsQqQZBACAlIS1oqGhhTCdu3oyxyyMcdRf79c5J7SWDBky+z4173rbJvR+VF/e/qwKqIAKqMBDgZyFzAQCoZTpxq7HLDyOrw/9b07l3z4dDnI2IAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wMS0wOFQxNjo0Mjo1MyswODowMIo/vCcAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDEtMDhUMTY6NDI6NTMrMDg6MDD7YgSbAAAASnRFWHRzdmc6YmFzZS11cmkAZmlsZTovLy9ob21lL2FkbWluL2ljb24tZm9udC90bXAvaWNvbl9nZjcwMHM3YjNmdy96YW50aW5nLnN2ZxqNZJkAAAAASUVORK5CYII=')"
				})), L().setStyle(c, Object.assign({}, k, {
					backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAAaxJREFUSMfNlLFOAkEQhmevAZMjR6OGRBJKsFBzdkYNpYSaWkopIOFRCBWh1ieA+ALGRgutjK0HzV2H5SX7W/zsmY3cnTEhcZovOzcz9+/s7Ir8d4OGht7fBwAgjvEri2OTl1ffSf0xAMBxRIkS1e3Se3+vcszEMe/6OqmT/aN2m1wsNu/o5YVsNHI7BgA4PCRfXzfXCwKy1RLbcXZG9nrkzc12jvT8nPU/PtatOThgAx8fuS4WyZ0de2e+T87n5OcnuVqRsxl5cpImQDnKUc7DA1fVqpimZCu+vCSjiNH9PlmpJNTQ0INBErfeafZRAakC6FWKfH9nwU7H/l6rGdqCOx3y7c3U+aOARsMMp+1vNskwTLjulB23XJL1epqA9OshIiKeJxAIoug7UyA4OuLi6Ynr52deu+NjOy4MSc9Ln8rMDpTLybBpaOjdXbJUIqdTm8a/t2fn/RSQewR24HicTLmGhnbdzcPquvYtGY3+PIR24UKBUXd35v6Sk4lN47+9NXm/FBAEedfGTjw9JYdDm76fm6+hoS8ujGAxT6L9Im7bTKeurvIEb92+AES1b6x283XSAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTAxLTA4VDE2OjQyOjUzKzA4OjAwij+8JwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wMS0wOFQxNjo0Mjo1MyswODowMPtiBJsAAABJdEVYdHN2ZzpiYXNlLXVyaQBmaWxlOi8vL2hvbWUvYWRtaW4vaWNvbi1mb250L3RtcC9pY29uX2dmNzAwczdiM2Z3L2NhbWVyYS5zdmeyubWEAAAAAElFTkSuQmCC')"
				})), L().setStyle(d, Object.assign({}, k, {
					backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAALZJREFUSMftVbsORUAQVSj8DomChvh3lU5CoSVCQq2RObeYu8XG3deVoHCak81kds7Oaz3vxRcAAMwztOg6vX9d6/3XFQQC+b7iAoFhYE7Tvx9EIFAcy/ftO3MQGAQkCfM4MmeZWyajiLnvmYuCeduMAuSzvRBVYNluFHCssSgFp7Sq9ALKkjnPf9ubRtkDL27HNT3QtsY9cAjsNAVheHIKBOwD2wpxFHDbJpwmaHH2L1iWx+2BDy8RbXXtqbRBAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTAxLTA4VDE2OjQyOjUzKzA4OjAwij+8JwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wMS0wOFQxNjo0Mjo1MyswODowMPtiBJsAAABTdEVYdHN2ZzpiYXNlLXVyaQBmaWxlOi8vL2hvbWUvYWRtaW4vaWNvbi1mb250L3RtcC9pY29uX2dmNzAwczdiM2Z3L3F1YW5waW5nenVpZGFodWEuc3ZnTBoI7AAAAABJRU5ErkJggg==')"
				})), L().setStyle(l, Object.assign({}, k, {
					backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAAYJJREFUSMfdVbGKwkAQnQn+geAfWBixUTsVgp3YGKxSWflVNmIjARULwc5KO40ipNHWRgs/wGLniucKa+Jd5ODuuGle5u3szGRmd5bor4iIiMhuB3Sc+HXXBdp2/Lpta7v4dccRJUrUdhtNQIkSVa3C8HwG1uumg34f2OnEB+h0tF1Sv5b+YIsttpZLEhKSdhvscPi8IXFF74GJiYnHY7Cex8zMvFgkbInjmJnv98kqoO30vmhLtaRMB60WtEbDNDudgMUiKiQSzfjOMzFxoQAyCPSfw7/nQZ/PUYnpNGV6OR6BmYzJbzYIoBQCzGaRBDQvJCTdLnTLolg5HN5t6f8V1h/oUT4PrVKJWBotmEzQw+vV3J9Ow851P2/BaoX9Yfh0BrJZYKlk8uUyHOpDeLuBHwzMBJtN2PV6IPUhXK9Nf5cLMAxfluanrmGkRBggtRo03wfq66P/6CsJAnOg+f6rgfZI4BGYiYlHIx048eR6krcnq34kkj1GuVz8+jceo9+SD5A8yGh8CTq7AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTAxLTA4VDE2OjQyOjUzKzA4OjAwij+8JwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wMS0wOFQxNjo0Mjo1MyswODowMPtiBJsAAABNdEVYdHN2ZzpiYXNlLXVyaQBmaWxlOi8vL2hvbWUvYWRtaW4vaWNvbi1mb250L3RtcC9pY29uX2dmNzAwczdiM2Z3L3p1aXhpYW9odWEuc3ZnoCFr0AAAAABJRU5ErkJggg==')"
				})), L().setStyle(b, Object.assign({}, k, {
					backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAAR9JREFUSMfVlD0LglAYhe9VkwgNihpsjbYQf4JTS7+iuaGxpcGfJjS0NFRLk2NDi6MogafhJGRIX9yEzvJwrx/nvPd9VYh/F3LkyBuN2g3J1QoAgCQhPe/Hxq5Lo+0WlfJ9dYYAgGaTDAIyy/BUnwcwWJlhcLnZkN2ugIBAuy2kkEL2ep8F73S4kjfFcfn6cMj9KLodrWVBiXyf75tMyOOR+4MBOZ8XLXzorboA5UpnM/J0Ivd7+vX7xX2asqGpVKtFXi5sqWmypXefrfIWAACmU/JwKCoun8hu9zA0uk6u13wgirg+n7+bAcsibbt6SB3n9TQXPxwAwHJJpum7M6BcDDQa0SgMaw9QPkJNIxcLMo4ZcDz+eYDqQFLWbqxKV57EtW1WtMbmAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTAxLTA4VDE2OjQyOjUzKzA4OjAwij+8JwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wMS0wOFQxNjo0Mjo1MyswODowMPtiBJsAAABKdEVYdHN2ZzpiYXNlLXVyaQBmaWxlOi8vL2hvbWUvYWRtaW4vaWNvbi1mb250L3RtcC9pY29uX2dmNzAwczdiM2Z3L2ppbmd5aW4uc3ZnIlMYaQAAAABJRU5ErkJggg==')"
				})), L().setStyle(g, Object.assign({}, k, {
					backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAAU5JREFUSMftkzGKwlAURf9PULBQwULSCKK1bZAgNuoaFFyAC3AdZg0uQCwshWzAShEEO7Gy0soUCu9Occ3An5nMGCfdzGsO7+Xy3/03iVL/lbAAACiVIBCI77O37Vi9QCDZbEqLm03ycEBUAoHk818v7nYpul5Jz4tf8HBKYa1mcjwmbzd8rG8NFIsU7ffk8UjmcjE3XK+RtB4G2PT75GbDeblMttumfjSKMRCGLxsQCKTReE9KIJDJxDw/SmKxiOZWWh+ntrSlre2WXRAorbTSrZapip7X66kbMKtQUFBQCENznsmQ93vqBhh5r8fO85jAcsnIrcce1yV3uxgD8zl5uZgU+dGBVlrp6GbTKRPwffaDAek45Gz2/M0AAJ0OeTol+w0rFYrOZ3K1MhNJEjEAwHF4cBA8Z8B1zcXV6msv+JMR2yaHQ1LrXx/8Z+sNRxsWcwZeb6UAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDEtMDhUMTY6NDI6NTMrMDg6MDCKP7wnAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTAxLTA4VDE2OjQyOjUzKzA4OjAw+2IEmwAAAEt0RVh0c3ZnOmJhc2UtdXJpAGZpbGU6Ly8vaG9tZS9hZG1pbi9pY29uLWZvbnQvdG1wL2ljb25fZ2Y3MDBzN2IzZncvc2hlbmd5aW4uc3ZnFog1MQAAAABJRU5ErkJggg==')"
				})), L().setStyle(v, Object.assign({}, k, {
					backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAAPRJREFUSMflVDEOwjAQO0e8gr2sZYVunREbD6ISfAgmkBjpC/hBEQ+AtTWD6QAI0gBlqRfLp+TiXC5n1nXgMUCS5HBoNBqj6IOMMFwuEpsNAABl6d3HihWrOJaBsuRPkGW+c929HAxuYefb6L+R0ZgkMrJYiItCnCT1sl5Y1jwXj0bNniJNJWqujfX7LyrwJh8AYDxWgulU0dPp20IFlxoODm61kpE4VnS9/puBXyPYgH7LbKY3PhwUnUw+NdC4CdW9+71UgyZspwIBB9No3O0klktxUahyx+Pz+lYG0Xzu84lXRqTqwRQAGAzns8R223gUdxZXGcAK5Hp0ClIAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDEtMDhUMTY6NDI6NTMrMDg6MDCKP7wnAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTAxLTA4VDE2OjQyOjUzKzA4OjAw+2IEmwAAAE50RVh0c3ZnOmJhc2UtdXJpAGZpbGU6Ly8vaG9tZS9hZG1pbi9pY29uLWZvbnQvdG1wL2ljb25fZ2Y3MDBzN2IzZncvbHV6aGlzaGlwaW4uc3Zn5Zd7GQAAAABJRU5ErkJggg==')"
				})), L().setStyle(y, Object.assign({}, k, {
					backgroundImage: "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAAahJREFUSMdjYBjpgBFd4NZK+f+soQYG//T+yzFuUFUl2cApjEWM/758UZvysPDn3127GBkZGBgY/v4l6ICb9xTWsRbp6/9f9W8N44Jz5xgCGI4wfGFiIttrR/5n/3/U3KyR8rj8t0RdHS5lcAv+//yXzzhZTY1ii2FAmsGZocna+maD3GnWY62tNzbJBbDOffLkxie5eJYwa2uYMhaigzb2/zyGguPH/y9mTGKYYGlJUIMiYxDjHCen/4oMDAxznJzg4k8Z/jP+l5LCCAFCQP30Y5dfXVZWDI7/zzIs8PNjNGJ4/7/r+XNKA4rkoNZ4/lj0V9TmzUxJv0J+F+jrM3YyvPq/acsWujmA2oBkB9y4LifLxhoa+teAzYFtwtWr/8sZxBj9fHxo7oCbprJ72MqOHWNgZGBkYFy1isGGoZahTFSU0hAgOhcQnfph4P7/df9T9u1jPMn4nyHmxIn/bAzLGe7GxTHsZyj+f+zpUwYGBmmG6bQsiMr+L/v/rqlJY9Njm9889fW4lGEUxXCHwAomUgH3vxBG8c+f1WWf9P98sns3oaJ4FAAAbtWqHTT84QYAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDEtMDhUMTY6MzU6MjMrMDg6MDBLHbvEAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTAxLTA4VDE2OjM1OjIzKzA4OjAwOkADeAAAAE50RVh0c3ZnOmJhc2UtdXJpAGZpbGU6Ly8vaG9tZS9hZG1pbi9pY29uLWZvbnQvdG1wL2ljb25fcTM1YTFhNHBtY2MvbHV6aGlzaGlwaW4uc3Zn6xlv1QAAAABJRU5ErkJggg==')"
				})), 
                contentE2_ =document.createElement("div");
                contentE2_.className ="contorspan"
                contentE2_.innerHTML=" <img src='/cockpit/setting.png' width='32' height='32' style='margin-top:3px;' title='云台'/><ul class='cloud-ctrl'><li onmousedown=cloudDown('upleft') onmouseUp=cloudUp('upleft')>◤</li><li onmousedown=cloudDown('up') onmouseUp=cloudUp('up')>▲</li><li onmousedown=cloudDown('upright') onmouseUp=cloudUp('upright')>◥</li><li onmousedown=cloudDown('left') onmouseUp=cloudUp('left')>◀</li><li><span title='开启3D定位' onclick=localStart(this) class='video-start vjs-icon-circle-inner-circle'></span><span title='关闭3D定位' onclick=localEnd(this) class='video-end vjs-icon-circle-outline'></span><a href='' target='_blank' class='cloud_down'></a></li><li onmousedown=cloudDown('right') onmouseUp=cloudUp('right')>▶</li><li onmousedown=cloudDown('downleft') onmouseUp=cloudUp('downleft')>◣</li><li onmousedown=cloudDown('down') onmouseUp=cloudUp('down')>▼</li><li onmousedown=cloudDown('downright') onmouseUp=cloudUp('downright')>◢</li></ul><ul class='focus-ctrl'><li onmousedown=Focuscontrol('zoomout') onmouseUp=Focusstop('zoomout') title='调焦 -'><span>□</span></li><li onmousedown=Focuscontrol('zoomin') onmouseUp=Focusstop('zoomin') title='调焦 +'><span>■</span></li><li onmousedown=Focuscontrol('focusfar') onmouseUp=Focusstop('focusfar') title='聚焦 -'><span class='focus-more'>◎</span></li><li onmousedown=Focuscontrol('irisin') onmouseUp=Focusstop('irisin') title='聚焦 +'><span>⊙</span></li><li onmousedown=Focuscontrol('irisout') onmouseUp=Focusstop('irisout') title='光圈 -'><span class='focus-more'>○</span></li><li onmousedown=Focuscontrol('focusnear') onmouseUp=Focusstop('focusnear') title='光圈 +'><span class='focus-more'>●</span></li></ul>"
              //  p.appendChild(contentE2_)

                p.appendChild(m), t._opt.text && (i.appendChild(a), e.textDom = a), t._opt.showBandwidth &&
				(i.appendChild(s), e.speedDom = s), t._opt.operateBtns.record && (o.appendChild(y), o
					.appendChild(v), e.recordingDom = y, e.recordDom = v), t._opt.operateBtns.screenshot && (o.appendChild(contentE2_),o
					.appendChild(c), e.screenshotsDom = c), t._opt.operateBtns.play && (o.appendChild(f), o
					.appendChild(h),e.playDom = f, e.pauseDom = h), t._opt.operateBtns.audio && (o.appendChild(
					g), o.appendChild(b), e.playAudioDom = g, e.quietAudioDom = b), t._opt.operateBtns
				.fullscreen && (o.appendChild(d), o.appendChild(l), e.fullscreenDom = d, e.minScreenDom = l), n
				.appendChild(i), n.appendChild(o), r.appendChild(w), e.bgDom = w, r.appendChild(p), e
				.loadingDom = p, t._showControl() && r.appendChild(n), t._opt.operateBtns.play && (r
					.appendChild(u), e.playBigDom = u), t.$container.appendChild(r), t.$doms = e, t
				._removeContainerChild = () => {
					for (; t.$container.firstChild;) t.$container.removeChild(t.$container.firstChild)
				}, W().default(t), L().$hideBtns(t.$doms), t._opt.isNotMute || t._mute()
		}, r(G, "default", (function() {
			return Y
		}))), G
	}
	var Z, $, X = !1;

	function J() {
		return X || (X = !0, Z = {}, w(), L(), $ = t => {
			const e = new Worker(t._opt.decoder);
			e.onmessage = r => {
				const n = r.data;
				switch (n.cmd) {
					case w().CMD_TYPE.init:
						t.setBufferTime(t._opt.videoBuffer), e.postMessage({
							cmd: w().POST_MESSAGE.init,
							opt: JSON.stringify(t._opt),
							sampleRate: t._audioContext.sampleRate
						}), t._hasLoaded || (t._hasLoaded = !0, t.onLoad(), t._trigger(w().EVEMTS.load));
						break;
					case w().CMD_TYPE.initSize:
						t.$canvasElement.width = n.w, t.$canvasElement.height = n.h, t.onInitSize(), t
							._resize(), t._trigger(w().EVEMTS.videoInfo, {
								w: n.w,
								h: n.h
							}), t._trigger(w().EVEMTS.start), t._supportOffscreen() && (t._bitmaprenderer =
								t.$canvasElement.getContext("bitmaprenderer"));
						break;
					case w().CMD_TYPE.render:
						t.loading && (t.loading = !1, t.playing = !0, t._clearCheckLoading()), t.playing &&
							(t._supportOffscreen() ? t._bitmaprenderer.transferFromImageBitmap(n.buffer) : t
								._contextGLRender(t.$canvasElement.width, t.$canvasElement.height, n.output[
									0], n.output[1], n.output[2])), t._trigger(w().EVEMTS.timeUpdate, n.ts),
							t.onTimeUpdate(n.ts), t._updateStats({
								buf: n.delay,
								ts: n.ts
							}), t._checkHeart();
						break;
					case w().CMD_TYPE.playAudio:
						t.playing && !t.quieting && t._playAudio(n.buffer);
						break;
					case w().CMD_TYPE.print:
						t.onLog(n.text), t._trigger(w().EVEMTS.log, n.text);
						break;
					case w().CMD_TYPE.printErr:
						t.onLog(n.text), t._trigger(w().EVEMTS.log, n.text), t.onError(n.text), t._trigger(
							w().EVEMTS.error, n.text);
						break;
					case w().CMD_TYPE.initAudioPlanar:
						t._initAudioPlanar(n), t._trigger(w().EVEMTS.audioInfo, {
							numOfChannels: n.channels,
							sampleRate: n.samplerate
						});
						break;
					case w().CMD_TYPE.kBps:
						t.playing && (t.$doms.speedDom && (t.$doms.speedDom.innerText = L().bpsSize(n
							.kBps)), t._trigger(w().EVEMTS.kBps, n.kBps));
					default:
						t[n.cmd] && t[n.cmd](n)
				}
			}, t._decoderWorker = e
		}, r(Z, "default", (function() {
			return $
		}))), Z
	}
	var Q, tt, et = !1;

	function rt() {
		return et || (et = !0, Q = {}, L(), w(), tt = t => {
			t._loading = !0, t._recording = !1, t._playing = !1, t._audioPlaying = !1, t._quieting = !1, t
				._fullscreen = !1, t._stats = {
					buf: 0,
					fps: 0,
					abps: "",
					vbps: "",
					ts: ""
				}, t._hasLoaded = !1, t._playUrl = "", t._startBpsTime = "", t._bps = 0, t._checkHeartTimeout =
				null, t._wakeLock = null, t._contextGL = null, t._contextGLRender = null, t
				._checkLoadingTimeout = null, t._bitmaprenderer = null, t._isPlayingBeforePageHidden = !1, t
				._initCheckVariable = () => {
					t._startBpsTime = "", t._bps = 0, t._clearCheckHeartTimeout(), t._clearCheckLoading()
				}, t._clearCheckHeartTimeout = () => {
					t._checkHeartTimeout && (clearTimeout(t._checkHeartTimeout), t._checkHeartTimeout = null)
				}, t._startCheckHeartTimeout = () => {
					t._checkHeartTimeout = setTimeout((function() {
						t._trigger(w().EVEMTS.timeout), t.recording = !1, t.playing = !1, t._close()
					}), 1e3 * t._opt.timeout)
				}, t._clearCheckLoading = () => {
					t._checkLoadingTimeout && (clearTimeout(t._checkLoadingTimeout), t._checkLoadingTimeout =
						null)
				}, t._checkLoading = () => {
					t._clearCheckLoading(), t._checkLoadingTimeout = setTimeout((() => {
						t._trigger(w().EVEMTS.timeout), t.playing = !1, t._close(), L().$domToggle(t
							.$doms.loadingDom, !1)
					}), 1e3 * t._opt.timeout)
				}
		}, r(Q, "default", (function() {
			return tt
		}))), Q
	}
	var nt, it, ot = !1;

	function at() {
		return ot || (ot = !0, nt = {}, L(), it = t => {
			t.onPlay = L().noop, t.onPause = L().noop, t.onRecord = L().noop, t.onFullscreen = L().noop, t
				.onMute = L().noop, t.onLoad = L().noop, t.onLog = L().noop, t.onError = L().noop, t
				.onTimeUpdate = L().noop, t.onInitSize = L().noop
		}, r(nt, "default", (function() {
			return it
		}))), nt
	}
	var st, ft, ut = !1;

	function ht() {
		return ut || (ut = !0, ft = t => {
			t._on = (e, r) => {
				let n, i, o;
				if (!r) return t;
				for (n = t.__events || (t.__events = {}), e = e.split(/\s+/); i = e.shift();) o = n[i] || (
					n[i] = []), o.push(r);
				return t
			}, t._off = () => {
				let e;
				return (e = t.__events) ? (delete t.__events, t) : t
			}, t._trigger = (e, ...r) => {
				function n(t, e) {
					if (t)
						for (let r = 0, n = t.length; r < n; r += 1) t[r](...e)
				}
				let i, o, a;
				if (!(i = t.__events)) return t;
				for (e = e.split(/\s+/); o = e.shift();)(a = i[o]) && (a = a.slice()), n(a, r);
				return t
			}
		}, r(st = {}, "default", (function() {
			return ft
		}))), st
	}
	var ct, dt, lt = !1;

	function pt() {
		return lt || (lt = !0, ct = {}, L(), w(), dt = t => {
			t._pause = () => {
					t._close(), t.loading && L().$domToggle(t.$doms.loadingDom, !1), t.recording = !1, t
						.playing = !1
				}, t._play = e => {
					if (!t._playUrl && !e) return;
					let r = !1;
					e ? (t._playUrl && (t._close(), r = !0, t.clearView()), t.loading = !0, L().$domToggle(t
						.$doms.bgDom, !1), t._checkLoading(), t._playUrl = e) : t._playUrl && (t.loading ? (
						L().$hideBtns(t.$doms), L().$domToggle(t.$doms.fullscreenDom, !0), L()
						.$domToggle(t.$doms.pauseDom, !0), L().$domToggle(t.$doms.loadingDom, !0), t
						._checkLoading()) : t.playing = !0), t._initCheckVariable(), r ? setTimeout((() => {
						t._decoderWorker.postMessage({
							cmd: w().POST_MESSAGE.play,
							url: t._playUrl
						})
					}), 300) : t._decoderWorker.postMessage({
						cmd: w().POST_MESSAGE.play,
						url: t._playUrl
					})
				}, t._screenshot = (e, r, n, i) => {
					e = e || L().now(), i = i || w().SCREENSHOT_TYPE.download;
					const o = {
						png: "image/png",
						jpeg: "image/jpeg",
						webp: "image/webp"
					};
					let a = .92;
					!o[r] && w().SCREENSHOT_TYPE[r] && (i = r, r = "png", n = void 0), "string" == typeof n && (
						i = n, n = void 0), void 0 !== n && (a = Number(n));
					const s = t.$canvasElement.toDataURL(o[r] || o.png, a),
						f = L().dataURLToFile(s);
					return i === w().SCREENSHOT_TYPE.base64 ? s : i === w().SCREENSHOT_TYPE.blob ? f : void(
						i === w().SCREENSHOT_TYPE.download && L().downloadImg(f, e))
				}, t._close = () => {
					t._close$2(), t._clearView()
				}, t._close$2 = () => {
					t._opt.debug && console.log("_close$2-START"), t._closeAudio && t._closeAudio(), t
						._audioPlayBuffers = [], t._audioPlaying = !1, t._decoderWorker.postMessage({
							cmd: w().POST_MESSAGE.close
						}), delete t._playAudio, t._releaseWakeLock(), t._initCheckVariable(), t._opt.debug &&
						console.log("_close$2-END")
				}, t._releaseWakeLock = () => {
					t._wakeLock && (t._wakeLock.release(), t._wakeLock = null)
				}, t._clearView = () => {
					t._contextGL && t._contextGL.clear(t._contextGL.COLOR_BUFFER_BIT)
				}, t._resize = () => {
					let e = t.$container.clientWidth,
						r = t.$container.clientHeight;
					t._showControl() && (r -= 38);
					let n = t.$canvasElement.width,
						i = t.$canvasElement.height;
					const o = t._opt.rotate;
					let a = (e - n) / 2,
						s = (r - i) / 2;
					270 !== o && 90 !== o || (n = t.$canvasElement.height, i = t.$canvasElement.width);
					let f = e / n,
						u = r / i,
						h = f > u ? u : f;
					t._opt.isResize || f !== u && (h = f + "," + u), t._opt.isFullResize && (h = f > u ? f : u);
					let c = "scale(" + h + ")";
					o && (c += " rotate(" + o + "deg)"), t.$canvasElement.style.transform = c, t.$canvasElement
						.style.left = a + "px", t.$canvasElement.style.top = s + "px"
				}, t._enableWakeLock = () => {
					t._opt.keepScreenOn && "wakeLock" in navigator && navigator.wakeLock.request("screen").then(
						(e => {
							t._wakeLock = e
						}))
				}, t._supportOffscreen = () => !t._opt.forceNoOffscreen && "function" == typeof t.$canvasElement
				.transferControlToOffscreen, t._checkHeart = () => {
					t._clearCheckHeartTimeout(), t._startCheckHeartTimeout()
				}, t._updateStats = e => {
					e = e || {}, t._startBpsTime || (t._startBpsTime = L().now());
					const r = L().now();
					r - t._startBpsTime < 1e3 ? t._stats.fps += 1 : (t._stats.ts = e.ts, t._stats.buf = e.buf, t
						._trigger(w().EVEMTS.stats, t._stats), t._trigger(w().EVEMTS.performance, L()
							.fpsStatus(t._stats.fps)), t._trigger(w().EVEMTS.buffer, L().bufferStatus(t
							._stats.buf, 1e3 * t._opt.videoBuffer)), t._stats.fps = 0, t._startBpsTime = r)
				}, t._onfullscreenchange = () => {
					t.fullscreen = L().checkFull()
				}, t._handleVisibilityChange = () => {
					t._opt.hiddenAutoPause && (t._opt.debug && console.log(document.visibilityState, t
							._isPlayingBeforePageHidden), "visible" === document.visibilityState ? t
						._isPlayingBeforePageHidden && t._play() : (t._isPlayingBeforePageHidden = t
							.playing, t.playing && t._pause()))
				}, t._handleWakeLock = () => {
					null !== t._wakeLock && "visible" === document.visibilityState && t._enableWakeLock()
				}
		}, r(ct, "default", (function() {
			return dt
		}))), ct
	}
	var mt, bt, gt = !1;

	function vt() {
		return gt || (gt = !0, mt = {}, rt(), at(), ht(), pt(), bt = t => {
			rt().default(t), at().default(t), ht().default(t), pt().default(t)
		}, r(mt, "default", (function() {
			return bt
		}))), mt
	}
	var yt, wt = !1;
	var _t, At, Mt, Et, St, kt, Bt, Tt, Rt = !1;

	function xt() {
		throw new Error("setTimeout has not been defined")
	}

	function Ct() {
		throw new Error("clearTimeout has not been defined")
	}

	function It(t) {
		if (Mt === setTimeout) return setTimeout(t, 0);
		if ((Mt === xt || !Mt) && setTimeout) return Mt = setTimeout, setTimeout(t, 0);
		try {
			return Mt(t, 0)
		} catch (e) {
			try {
				return Mt.call(null, t, 0)
			} catch (e) {
				return Mt.call(this, t, 0)
			}
		}
	}

	function Dt() {
		kt && Bt && (kt = !1, Bt.length ? St = Bt.concat(St) : Tt = -1, St.length && Pt())
	}

	function Pt() {
		if (!kt) {
			var t = It(Dt);
			kt = !0;
			for (var e = St.length; e;) {
				for (Bt = St, St = []; ++Tt < e;) Bt && Bt[Tt].run();
				Tt = -1, e = St.length
			}
			Bt = null, kt = !1,
				function(t) {
					if (Et === clearTimeout) return clearTimeout(t);
					if ((Et === Ct || !Et) && clearTimeout) return Et = clearTimeout, clearTimeout(t);
					try {
						Et(t)
					} catch (e) {
						try {
							return Et.call(null, t)
						} catch (e) {
							return Et.call(this, t)
						}
					}
				}(t)
		}
	}

	function Ot(t, e) {
		this.fun = t, this.array = e
	}

	function Lt() {}

	function Ut() {
		return Rt || (Rt = !0, _t = {}, At = _t = {}, function() {
				try {
					Mt = "function" == typeof setTimeout ? setTimeout : xt
				} catch (t) {
					Mt = xt
				}
				try {
					Et = "function" == typeof clearTimeout ? clearTimeout : Ct
				} catch (t) {
					Et = Ct
				}
			}(), St = [], kt = !1, Tt = -1, At.nextTick = function(t) {
				var e = new Array(arguments.length - 1);
				if (arguments.length > 1)
					for (var r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
				St.push(new Ot(t, e)), 1 !== St.length || kt || It(Pt)
			}, Ot.prototype.run = function() {
				this.fun.apply(null, this.array)
			}, At.title = "browser", At.browser = !0, At.env = {}, At.argv = [], At.version = "", At.versions = {},
			At.on = Lt, At.addListener = Lt, At.once = Lt, At.off = Lt, At.removeListener = Lt, At
			.removeAllListeners = Lt, At.emit = Lt, At.prependListener = Lt, At.prependOnceListener = Lt, At
			.listeners = function(t) {
				return []
			}, At.binding = function(t) {
				throw new Error("process.binding is not supported")
			}, At.cwd = function() {
				return "/"
			}, At.chdir = function(t) {
				throw new Error("process.chdir is not supported")
			}, At.umask = function() {
				return 0
			}), _t
	}
	var jt, Nt, zt, Ft, qt, Ht, Wt, Gt, Yt = !1;

	function Kt(t) {
		var e = t.length;
		if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
		var r = t.indexOf("=");
		return -1 === r && (r = e), [r, r === e ? 0 : 4 - r % 4]
	}

	function Vt(t) {
		var e, r, n = Kt(t),
			i = n[0],
			o = n[1],
			a = new qt(function(t, e, r) {
				return 3 * (e + r) / 4 - r
			}(0, i, o)),
			s = 0,
			f = o > 0 ? i - 4 : i;
		for (r = 0; r < f; r += 4) e = Ft[t.charCodeAt(r)] << 18 | Ft[t.charCodeAt(r + 1)] << 12 | Ft[t.charCodeAt(r +
			2)] << 6 | Ft[t.charCodeAt(r + 3)], a[s++] = e >> 16 & 255, a[s++] = e >> 8 & 255, a[s++] = 255 & e;
		return 2 === o && (e = Ft[t.charCodeAt(r)] << 2 | Ft[t.charCodeAt(r + 1)] >> 4, a[s++] = 255 & e), 1 === o && (
			e = Ft[t.charCodeAt(r)] << 10 | Ft[t.charCodeAt(r + 1)] << 4 | Ft[t.charCodeAt(r + 2)] >> 2, a[s++] =
			e >> 8 & 255, a[s++] = 255 & e), a
	}

	function Zt(t, e, r) {
		for (var n, i, o = [], a = e; a < r; a += 3) n = (t[a] << 16 & 16711680) + (t[a + 1] << 8 & 65280) + (255 & t[
			a + 2]), o.push(zt[(i = n) >> 18 & 63] + zt[i >> 12 & 63] + zt[i >> 6 & 63] + zt[63 & i]);
		return o.join("")
	}

	function $t(t) {
		for (var e, r = t.length, n = r % 3, i = [], o = 16383, a = 0, s = r - n; a < s; a += o) i.push(Zt(t, a, a + o >
			s ? s : a + o));
		return 1 === n ? (e = t[r - 1], i.push(zt[e >> 2] + zt[e << 4 & 63] + "==")) : 2 === n && (e = (t[r - 2] << 8) +
			t[r - 1], i.push(zt[e >> 10] + zt[e >> 4 & 63] + zt[e << 2 & 63] + "=")), i.join("")
	}

	function Xt() {
		return Yt || (Yt = !0, function() {
			for ((jt = {}).toByteArray = Vt, Nt = $t, jt.fromByteArray = Nt, zt = [], Ft = [], qt =
				"undefined" != typeof Uint8Array ? Uint8Array : Array, Wt = 0, Gt = (Ht =
					"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/").length; Wt < Gt; ++Wt)
				zt[Wt] = Ht[Wt], Ft[Ht.charCodeAt(Wt)] = Wt;
			Ft["-".charCodeAt(0)] = 62, Ft["_".charCodeAt(0)] = 63
		}()), jt
	}
	var Jt, Qt, te = !1;

	function ee() {
		return te || (te = !0,
			/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource>*/
			(Jt = {}).read = function(t, e, r, n, i) {
				var o, a, s = 8 * i - n - 1,
					f = (1 << s) - 1,
					u = f >> 1,
					h = -7,
					c = r ? i - 1 : 0,
					d = r ? -1 : 1,
					l = t[e + c];
				for (c += d, o = l & (1 << -h) - 1, l >>= -h, h += s; h > 0; o = 256 * o + t[e + c], c += d, h -= 8)
				;
				for (a = o & (1 << -h) - 1, o >>= -h, h += n; h > 0; a = 256 * a + t[e + c], c += d, h -= 8);
				if (0 === o) o = 1 - u;
				else {
					if (o === f) return a ? NaN : 1 / 0 * (l ? -1 : 1);
					a += Math.pow(2, n), o -= u
				}
				return (l ? -1 : 1) * a * Math.pow(2, o - n)
			}, Qt = function(t, e, r, n, i, o) {
				var a, s, f, u = 8 * o - i - 1,
					h = (1 << u) - 1,
					c = h >> 1,
					d = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
					l = n ? 0 : o - 1,
					p = n ? 1 : -1,
					m = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
				for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (s = isNaN(e) ? 1 : 0, a = h) : (a = Math.floor(Math
							.log(e) / Math.LN2), e * (f = Math.pow(2, -a)) < 1 && (a--, f *= 2), (e += a + c >= 1 ?
							d / f : d * Math.pow(2, 1 - c)) * f >= 2 && (a++, f /= 2), a + c >= h ? (s = 0, a = h) :
						a + c >= 1 ? (s = (e * f - 1) * Math.pow(2, i), a += c) : (s = e * Math.pow(2, c - 1) * Math
							.pow(2, i), a = 0)); i >= 8; t[r + l] = 255 & s, l += p, s /= 256, i -= 8);
				for (a = a << i | s, u += i; u > 0; t[r + l] = 255 & a, l += p, a /= 256, u -= 8);
				t[r + l - p] |= 128 * m
			}, Jt.write = Qt), Jt
	}
	var re, ne, ie, oe, ae, se, fe, ue, he, ce = !1;

	function de(t) {
		if (t > ae) throw new RangeError('The value "' + t + '" is invalid for option "size"');
		var e = new Uint8Array(t);
		return Object.setPrototypeOf(e, le.prototype), e
	}

	function le(t, e, r) {
		if ("number" == typeof t) {
			if ("string" == typeof e) throw new TypeError(
				'The "string" argument must be of type string. Received type number');
			return be(t)
		}
		return pe(t, e, r)
	}

	function pe(t, e, r) {
		if ("string" == typeof t) return function(t, e) {
			"string" == typeof e && "" !== e || (e = "utf8");
			if (!le.isEncoding(e)) throw new TypeError("Unknown encoding: " + e);
			var r = 0 | _e(t, e),
				n = de(r),
				i = n.write(t, e);
			i !== r && (n = n.slice(0, i));
			return n
		}(t, e);
		if (ArrayBuffer.isView(t)) return function(t) {
			if (Ge(t, Uint8Array)) {
				var e = new Uint8Array(t);
				return ve(e.buffer, e.byteOffset, e.byteLength)
			}
			return ge(t)
		}(t);
		if (null == t) throw new TypeError(
			"The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
			typeof t);
		if (Ge(t, ArrayBuffer) || t && Ge(t.buffer, ArrayBuffer)) return ve(t, e, r);
		if ("undefined" != typeof SharedArrayBuffer && (Ge(t, SharedArrayBuffer) || t && Ge(t.buffer,
				SharedArrayBuffer))) return ve(t, e, r);
		if ("number" == typeof t) throw new TypeError(
			'The "value" argument must not be of type number. Received type number');
		var n = t.valueOf && t.valueOf();
		if (null != n && n !== t) return le.from(n, e, r);
		var i = function(t) {
			if (le.isBuffer(t)) {
				var e = 0 | ye(t.length),
					r = de(e);
				return 0 === r.length || t.copy(r, 0, 0, e), r
			}
			if (void 0 !== t.length) return "number" != typeof t.length || Ye(t.length) ? de(0) : ge(t);
			if ("Buffer" === t.type && Array.isArray(t.data)) return ge(t.data)
		}(t);
		if (i) return i;
		if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof t[Symbol.toPrimitive])
			return le.from(t[Symbol.toPrimitive]("string"), e, r);
		throw new TypeError(
			"The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
			typeof t)
	}

	function me(t) {
		if ("number" != typeof t) throw new TypeError('"size" argument must be of type number');
		if (t < 0) throw new RangeError('The value "' + t + '" is invalid for option "size"')
	}

	function be(t) {
		return me(t), de(t < 0 ? 0 : 0 | ye(t))
	}

	function ge(t) {
		for (var e = t.length < 0 ? 0 : 0 | ye(t.length), r = de(e), n = 0; n < e; n += 1) r[n] = 255 & t[n];
		return r
	}

	function ve(t, e, r) {
		if (e < 0 || t.byteLength < e) throw new RangeError('"offset" is outside of buffer bounds');
		if (t.byteLength < e + (r || 0)) throw new RangeError('"length" is outside of buffer bounds');
		var n;
		return n = void 0 === e && void 0 === r ? new Uint8Array(t) : void 0 === r ? new Uint8Array(t, e) :
			new Uint8Array(t, e, r), Object.setPrototypeOf(n, le.prototype), n
	}

	function ye(t) {
		if (t >= ae) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + ae.toString(16) +
			" bytes");
		return 0 | t
	}

	function we(t) {
		return +t != t && (t = 0), le.alloc(+t)
	}

	function _e(t, e) {
		if (le.isBuffer(t)) return t.length;
		if (ArrayBuffer.isView(t) || Ge(t, ArrayBuffer)) return t.byteLength;
		if ("string" != typeof t) throw new TypeError(
			'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
			typeof t);
		var r = t.length,
			n = arguments.length > 2 && !0 === arguments[2];
		if (!n && 0 === r) return 0;
		for (var i = !1;;) switch (e) {
			case "ascii":
			case "latin1":
			case "binary":
				return r;
			case "utf8":
			case "utf-8":
				return qe(t).length;
			case "ucs2":
			case "ucs-2":
			case "utf16le":
			case "utf-16le":
				return 2 * r;
			case "hex":
				return r >>> 1;
			case "base64":
				return He(t).length;
			default:
				if (i) return n ? -1 : qe(t).length;
				e = ("" + e).toLowerCase(), i = !0
		}
	}

	function Ae(t, e, r) {
		var n = !1;
		if ((void 0 === e || e < 0) && (e = 0), e > this.length) return "";
		if ((void 0 === r || r > this.length) && (r = this.length), r <= 0) return "";
		if ((r >>>= 0) <= (e >>>= 0)) return "";
		for (t || (t = "utf8");;) switch (t) {
			case "hex":
				return Oe(this, e, r);
			case "utf8":
			case "utf-8":
				return Ie(this, e, r);
			case "ascii":
				return De(this, e, r);
			case "latin1":
			case "binary":
				return Pe(this, e, r);
			case "base64":
				return Ce(this, e, r);
			case "ucs2":
			case "ucs-2":
			case "utf16le":
			case "utf-16le":
				return Le(this, e, r);
			default:
				if (n) throw new TypeError("Unknown encoding: " + t);
				t = (t + "").toLowerCase(), n = !0
		}
	}

	function Me(t, e, r) {
		var n = t[e];
		t[e] = t[r], t[r] = n
	}

	function Ee(t, e, r, n, i) {
		if (0 === t.length) return -1;
		if ("string" == typeof r ? (n = r, r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -
				2147483648), Ye(r = +r) && (r = i ? 0 : t.length - 1), r < 0 && (r = t.length + r), r >= t.length) {
			if (i) return -1;
			r = t.length - 1
		} else if (r < 0) {
			if (!i) return -1;
			r = 0
		}
		if ("string" == typeof e && (e = le.from(e, n)), le.isBuffer(e)) return 0 === e.length ? -1 : Se(t, e, r, n, i);
		if ("number" == typeof e) return e &= 255, "function" == typeof Uint8Array.prototype.indexOf ? i ? Uint8Array
			.prototype.indexOf.call(t, e, r) : Uint8Array.prototype.lastIndexOf.call(t, e, r) : Se(t, [e], r, n, i);
		throw new TypeError("val must be string, number or Buffer")
	}

	function Se(t, e, r, n, i) {
		var o, a = 1,
			s = t.length,
			f = e.length;
		if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n ||
				"utf-16le" === n)) {
			if (t.length < 2 || e.length < 2) return -1;
			a = 2, s /= 2, f /= 2, r /= 2
		}

		function u(t, e) {
			return 1 === a ? t[e] : t.readUInt16BE(e * a)
		}
		if (i) {
			var h = -1;
			for (o = r; o < s; o++)
				if (u(t, o) === u(e, -1 === h ? 0 : o - h)) {
					if (-1 === h && (h = o), o - h + 1 === f) return h * a
				} else -1 !== h && (o -= o - h), h = -1
		} else
			for (r + f > s && (r = s - f), o = r; o >= 0; o--) {
				for (var c = !0, d = 0; d < f; d++)
					if (u(t, o + d) !== u(e, d)) {
						c = !1;
						break
					} if (c) return o
			}
		return -1
	}

	function ke(t, e, r, n) {
		r = Number(r) || 0;
		var i = t.length - r;
		n ? (n = Number(n)) > i && (n = i) : n = i;
		var o = e.length;
		n > o / 2 && (n = o / 2);
		for (var a = 0; a < n; ++a) {
			var s = parseInt(e.substr(2 * a, 2), 16);
			if (Ye(s)) return a;
			t[r + a] = s
		}
		return a
	}

	function Be(t, e, r, n) {
		return We(qe(e, t.length - r), t, r, n)
	}

	function Te(t, e, r, n) {
		return We(function(t) {
			for (var e = [], r = 0; r < t.length; ++r) e.push(255 & t.charCodeAt(r));
			return e
		}(e), t, r, n)
	}

	function Re(t, e, r, n) {
		return We(He(e), t, r, n)
	}

	function xe(t, e, r, n) {
		return We(function(t, e) {
			for (var r, n, i, o = [], a = 0; a < t.length && !((e -= 2) < 0); ++a) n = (r = t.charCodeAt(a)) >>
				8, i = r % 256, o.push(i), o.push(n);
			return o
		}(e, t.length - r), t, r, n)
	}

	function Ce(t, e, r) {
		return 0 === e && r === t.length ? Xt().fromByteArray(t) : Xt().fromByteArray(t.slice(e, r))
	}

	function Ie(t, e, r) {
		r = Math.min(t.length, r);
		for (var n = [], i = e; i < r;) {
			var o, a, s, f, u = t[i],
				h = null,
				c = u > 239 ? 4 : u > 223 ? 3 : u > 191 ? 2 : 1;
			if (i + c <= r) switch (c) {
				case 1:
					u < 128 && (h = u);
					break;
				case 2:
					128 == (192 & (o = t[i + 1])) && (f = (31 & u) << 6 | 63 & o) > 127 && (h = f);
					break;
				case 3:
					o = t[i + 1], a = t[i + 2], 128 == (192 & o) && 128 == (192 & a) && (f = (15 & u) << 12 | (63 &
						o) << 6 | 63 & a) > 2047 && (f < 55296 || f > 57343) && (h = f);
					break;
				case 4:
					o = t[i + 1], a = t[i + 2], s = t[i + 3], 128 == (192 & o) && 128 == (192 & a) && 128 == (192 &
							s) && (f = (15 & u) << 18 | (63 & o) << 12 | (63 & a) << 6 | 63 & s) > 65535 && f <
						1114112 && (h = f)
			}
			null === h ? (h = 65533, c = 1) : h > 65535 && (h -= 65536, n.push(h >>> 10 & 1023 | 55296), h = 56320 |
				1023 & h), n.push(h), i += c
		}
		return function(t) {
			var e = t.length;
			if (e <= fe) return String.fromCharCode.apply(String, t);
			var r = "",
				n = 0;
			for (; n < e;) r += String.fromCharCode.apply(String, t.slice(n, n += fe));
			return r
		}(n)
	}

	function De(t, e, r) {
		var n = "";
		r = Math.min(t.length, r);
		for (var i = e; i < r; ++i) n += String.fromCharCode(127 & t[i]);
		return n
	}

	function Pe(t, e, r) {
		var n = "";
		r = Math.min(t.length, r);
		for (var i = e; i < r; ++i) n += String.fromCharCode(t[i]);
		return n
	}

	function Oe(t, e, r) {
		var n = t.length;
		(!e || e < 0) && (e = 0), (!r || r < 0 || r > n) && (r = n);
		for (var i = "", o = e; o < r; ++o) i += he[t[o]];
		return i
	}

	function Le(t, e, r) {
		for (var n = t.slice(e, r), i = "", o = 0; o < n.length - 1; o += 2) i += String.fromCharCode(n[o] + 256 * n[o +
			1]);
		return i
	}

	function Ue(t, e, r) {
		if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
		if (t + e > r) throw new RangeError("Trying to access beyond buffer length")
	}

	function je(t, e, r, n, i, o) {
		if (!le.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
		if (e > i || e < o) throw new RangeError('"value" argument is out of bounds');
		if (r + n > t.length) throw new RangeError("Index out of range")
	}

	function Ne(t, e, r, n, i, o) {
		if (r + n > t.length) throw new RangeError("Index out of range");
		if (r < 0) throw new RangeError("Index out of range")
	}

	function ze(t, e, r, n, i) {
		return e = +e, r >>>= 0, i || Ne(t, 0, r, 4), ee().write(t, e, r, n, 23, 4), r + 4
	}

	function Fe(t, e, r, n, i) {
		return e = +e, r >>>= 0, i || Ne(t, 0, r, 8), ee().write(t, e, r, n, 52, 8), r + 8
	}

	function qe(t, e) {
		var r;
		e = e || 1 / 0;
		for (var n = t.length, i = null, o = [], a = 0; a < n; ++a) {
			if ((r = t.charCodeAt(a)) > 55295 && r < 57344) {
				if (!i) {
					if (r > 56319) {
						(e -= 3) > -1 && o.push(239, 191, 189);
						continue
					}
					if (a + 1 === n) {
						(e -= 3) > -1 && o.push(239, 191, 189);
						continue
					}
					i = r;
					continue
				}
				if (r < 56320) {
					(e -= 3) > -1 && o.push(239, 191, 189), i = r;
					continue
				}
				r = 65536 + (i - 55296 << 10 | r - 56320)
			} else i && (e -= 3) > -1 && o.push(239, 191, 189);
			if (i = null, r < 128) {
				if ((e -= 1) < 0) break;
				o.push(r)
			} else if (r < 2048) {
				if ((e -= 2) < 0) break;
				o.push(r >> 6 | 192, 63 & r | 128)
			} else if (r < 65536) {
				if ((e -= 3) < 0) break;
				o.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
			} else {
				if (!(r < 1114112)) throw new Error("Invalid code point");
				if ((e -= 4) < 0) break;
				o.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128)
			}
		}
		return o
	}

	function He(t) {
		return Xt().toByteArray(function(t) {
			if ((t = (t = t.split("=")[0]).trim().replace(ue, "")).length < 2) return "";
			for (; t.length % 4 != 0;) t += "=";
			return t
		}(t))
	}

	function We(t, e, r, n) {
		for (var i = 0; i < n && !(i + r >= e.length || i >= t.length); ++i) e[i + r] = t[i];
		return i
	}

	function Ge(t, e) {
		return t instanceof e || null != t && null != t.constructor && null != t.constructor.name && t.constructor
			.name === e.name
	}

	function Ye(t) {
		return t != t
	}

	function Ke() {
		re = {}, Xt(), ee(), ne = "function" == typeof Symbol && "function" == typeof Symbol.for ? Symbol.for(
				"nodejs.util.inspect.custom") : null, ie = le, re.Buffer = ie, oe = we, re.SlowBuffer = oe, 50, re
			.INSPECT_MAX_BYTES = 50, se = ae = 2147483647, re.kMaxLength = se, le.TYPED_ARRAY_SUPPORT = function() {
				try {
					var t = new Uint8Array(1),
						e = {
							foo: function() {
								return 42
							}
						};
					return Object.setPrototypeOf(e, Uint8Array.prototype), Object.setPrototypeOf(t, e), 42 === t.foo()
				} catch (t) {
					return !1
				}
			}(), le.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error ||
			console.error(
				"This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
				), Object.defineProperty(le.prototype, "parent", {
				enumerable: !0,
				get: function() {
					if (le.isBuffer(this)) return this.buffer
				}
			}), Object.defineProperty(le.prototype, "offset", {
				enumerable: !0,
				get: function() {
					if (le.isBuffer(this)) return this.byteOffset
				}
			}), le.poolSize = 8192, le.from = function(t, e, r) {
				return pe(t, e, r)
			}, Object.setPrototypeOf(le.prototype, Uint8Array.prototype), Object.setPrototypeOf(le, Uint8Array), le
			.alloc = function(t, e, r) {
				return function(t, e, r) {
					return me(t), t <= 0 ? de(t) : void 0 !== e ? "string" == typeof r ? de(t).fill(e, r) : de(t)
						.fill(e) : de(t)
				}(t, e, r)
			}, le.allocUnsafe = function(t) {
				return be(t)
			}, le.allocUnsafeSlow = function(t) {
				return be(t)
			}, le.isBuffer = function(t) {
				return null != t && !0 === t._isBuffer && t !== le.prototype
			}, le.compare = function(t, e) {
				if (Ge(t, Uint8Array) && (t = le.from(t, t.offset, t.byteLength)), Ge(e, Uint8Array) && (e = le.from(e,
						e.offset, e.byteLength)), !le.isBuffer(t) || !le.isBuffer(e)) throw new TypeError(
					'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
				if (t === e) return 0;
				for (var r = t.length, n = e.length, i = 0, o = Math.min(r, n); i < o; ++i)
					if (t[i] !== e[i]) {
						r = t[i], n = e[i];
						break
					} return r < n ? -1 : n < r ? 1 : 0
			}, le.isEncoding = function(t) {
				switch (String(t).toLowerCase()) {
					case "hex":
					case "utf8":
					case "utf-8":
					case "ascii":
					case "latin1":
					case "binary":
					case "base64":
					case "ucs2":
					case "ucs-2":
					case "utf16le":
					case "utf-16le":
						return !0;
					default:
						return !1
				}
			}, le.concat = function(t, e) {
				if (!Array.isArray(t)) throw new TypeError('"list" argument must be an Array of Buffers');
				if (0 === t.length) return le.alloc(0);
				var r;
				if (void 0 === e)
					for (e = 0, r = 0; r < t.length; ++r) e += t[r].length;
				var n = le.allocUnsafe(e),
					i = 0;
				for (r = 0; r < t.length; ++r) {
					var o = t[r];
					if (Ge(o, Uint8Array)) i + o.length > n.length ? le.from(o).copy(n, i) : Uint8Array.prototype.set
						.call(n, o, i);
					else {
						if (!le.isBuffer(o)) throw new TypeError('"list" argument must be an Array of Buffers');
						o.copy(n, i)
					}
					i += o.length
				}
				return n
			}, le.byteLength = _e, le.prototype._isBuffer = !0, le.prototype.swap16 = function() {
				var t = this.length;
				if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
				for (var e = 0; e < t; e += 2) Me(this, e, e + 1);
				return this
			}, le.prototype.swap32 = function() {
				var t = this.length;
				if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
				for (var e = 0; e < t; e += 4) Me(this, e, e + 3), Me(this, e + 1, e + 2);
				return this
			}, le.prototype.swap64 = function() {
				var t = this.length;
				if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
				for (var e = 0; e < t; e += 8) Me(this, e, e + 7), Me(this, e + 1, e + 6), Me(this, e + 2, e + 5), Me(
					this, e + 3, e + 4);
				return this
			}, le.prototype.toString = function() {
				var t = this.length;
				return 0 === t ? "" : 0 === arguments.length ? Ie(this, 0, t) : Ae.apply(this, arguments)
			}, le.prototype.toLocaleString = le.prototype.toString, le.prototype.equals = function(t) {
				if (!le.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
				return this === t || 0 === le.compare(this, t)
			}, le.prototype.inspect = function() {
				var t = "";
				return t = this.toString("hex", 0, 50).replace(/(.{2})/g, "$1 ").trim(), this.length > 50 && (t +=
					" ... "), "<Buffer " + t + ">"
			}, ne && (le.prototype[ne] = le.prototype.inspect), le.prototype.compare = function(t, e, r, n, i) {
				if (Ge(t, Uint8Array) && (t = le.from(t, t.offset, t.byteLength)), !le.isBuffer(t)) throw new TypeError(
					'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof t);
				if (void 0 === e && (e = 0), void 0 === r && (r = t ? t.length : 0), void 0 === n && (n = 0), void 0 ===
					i && (i = this.length), e < 0 || r > t.length || n < 0 || i > this.length) throw new RangeError(
					"out of range index");
				if (n >= i && e >= r) return 0;
				if (n >= i) return -1;
				if (e >= r) return 1;
				if (this === t) return 0;
				for (var o = (i >>>= 0) - (n >>>= 0), a = (r >>>= 0) - (e >>>= 0), s = Math.min(o, a), f = this.slice(n,
						i), u = t.slice(e, r), h = 0; h < s; ++h)
					if (f[h] !== u[h]) {
						o = f[h], a = u[h];
						break
					} return o < a ? -1 : a < o ? 1 : 0
			}, le.prototype.includes = function(t, e, r) {
				return -1 !== this.indexOf(t, e, r)
			}, le.prototype.indexOf = function(t, e, r) {
				return Ee(this, t, e, r, !0)
			}, le.prototype.lastIndexOf = function(t, e, r) {
				return Ee(this, t, e, r, !1)
			}, le.prototype.write = function(t, e, r, n) {
				if (void 0 === e) n = "utf8", r = this.length, e = 0;
				else if (void 0 === r && "string" == typeof e) n = e, r = this.length, e = 0;
				else {
					if (!isFinite(e)) throw new Error(
						"Buffer.write(string, encoding, offset[, length]) is no longer supported");
					e >>>= 0, isFinite(r) ? (r >>>= 0, void 0 === n && (n = "utf8")) : (n = r, r = void 0)
				}
				var i = this.length - e;
				if ((void 0 === r || r > i) && (r = i), t.length > 0 && (r < 0 || e < 0) || e > this.length)
				throw new RangeError("Attempt to write outside buffer bounds");
				n || (n = "utf8");
				for (var o = !1;;) switch (n) {
					case "hex":
						return ke(this, t, e, r);
					case "utf8":
					case "utf-8":
						return Be(this, t, e, r);
					case "ascii":
					case "latin1":
					case "binary":
						return Te(this, t, e, r);
					case "base64":
						return Re(this, t, e, r);
					case "ucs2":
					case "ucs-2":
					case "utf16le":
					case "utf-16le":
						return xe(this, t, e, r);
					default:
						if (o) throw new TypeError("Unknown encoding: " + n);
						n = ("" + n).toLowerCase(), o = !0
				}
			}, le.prototype.toJSON = function() {
				return {
					type: "Buffer",
					data: Array.prototype.slice.call(this._arr || this, 0)
				}
			}, fe = 4096, le.prototype.slice = function(t, e) {
				var r = this.length;
				(t = ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), (e = void 0 === e ? r : ~~e) < 0 ? (e +=
					r) < 0 && (e = 0) : e > r && (e = r), e < t && (e = t);
				var n = this.subarray(t, e);
				return Object.setPrototypeOf(n, le.prototype), n
			}, le.prototype.readUintLE = le.prototype.readUIntLE = function(t, e, r) {
				t >>>= 0, e >>>= 0, r || Ue(t, e, this.length);
				for (var n = this[t], i = 1, o = 0; ++o < e && (i *= 256);) n += this[t + o] * i;
				return n
			}, le.prototype.readUintBE = le.prototype.readUIntBE = function(t, e, r) {
				t >>>= 0, e >>>= 0, r || Ue(t, e, this.length);
				for (var n = this[t + --e], i = 1; e > 0 && (i *= 256);) n += this[t + --e] * i;
				return n
			}, le.prototype.readUint8 = le.prototype.readUInt8 = function(t, e) {
				return t >>>= 0, e || Ue(t, 1, this.length), this[t]
			}, le.prototype.readUint16LE = le.prototype.readUInt16LE = function(t, e) {
				return t >>>= 0, e || Ue(t, 2, this.length), this[t] | this[t + 1] << 8
			}, le.prototype.readUint16BE = le.prototype.readUInt16BE = function(t, e) {
				return t >>>= 0, e || Ue(t, 2, this.length), this[t] << 8 | this[t + 1]
			}, le.prototype.readUint32LE = le.prototype.readUInt32LE = function(t, e) {
				return t >>>= 0, e || Ue(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) +
					16777216 * this[t + 3]
			}, le.prototype.readUint32BE = le.prototype.readUInt32BE = function(t, e) {
				return t >>>= 0, e || Ue(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] <<
					8 | this[t + 3])
			}, le.prototype.readIntLE = function(t, e, r) {
				t >>>= 0, e >>>= 0, r || Ue(t, e, this.length);
				for (var n = this[t], i = 1, o = 0; ++o < e && (i *= 256);) n += this[t + o] * i;
				return n >= (i *= 128) && (n -= Math.pow(2, 8 * e)), n
			}, le.prototype.readIntBE = function(t, e, r) {
				t >>>= 0, e >>>= 0, r || Ue(t, e, this.length);
				for (var n = e, i = 1, o = this[t + --n]; n > 0 && (i *= 256);) o += this[t + --n] * i;
				return o >= (i *= 128) && (o -= Math.pow(2, 8 * e)), o
			}, le.prototype.readInt8 = function(t, e) {
				return t >>>= 0, e || Ue(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
			}, le.prototype.readInt16LE = function(t, e) {
				t >>>= 0, e || Ue(t, 2, this.length);
				var r = this[t] | this[t + 1] << 8;
				return 32768 & r ? 4294901760 | r : r
			}, le.prototype.readInt16BE = function(t, e) {
				t >>>= 0, e || Ue(t, 2, this.length);
				var r = this[t + 1] | this[t] << 8;
				return 32768 & r ? 4294901760 | r : r
			}, le.prototype.readInt32LE = function(t, e) {
				return t >>>= 0, e || Ue(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t +
					3] << 24
			}, le.prototype.readInt32BE = function(t, e) {
				return t >>>= 0, e || Ue(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 |
					this[t + 3]
			}, le.prototype.readFloatLE = function(t, e) {
				return t >>>= 0, e || Ue(t, 4, this.length), ee().read(this, t, !0, 23, 4)
			}, le.prototype.readFloatBE = function(t, e) {
				return t >>>= 0, e || Ue(t, 4, this.length), ee().read(this, t, !1, 23, 4)
			}, le.prototype.readDoubleLE = function(t, e) {
				return t >>>= 0, e || Ue(t, 8, this.length), ee().read(this, t, !0, 52, 8)
			}, le.prototype.readDoubleBE = function(t, e) {
				return t >>>= 0, e || Ue(t, 8, this.length), ee().read(this, t, !1, 52, 8)
			}, le.prototype.writeUintLE = le.prototype.writeUIntLE = function(t, e, r, n) {
				(t = +t, e >>>= 0, r >>>= 0, n) || je(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
				var i = 1,
					o = 0;
				for (this[e] = 255 & t; ++o < r && (i *= 256);) this[e + o] = t / i & 255;
				return e + r
			}, le.prototype.writeUintBE = le.prototype.writeUIntBE = function(t, e, r, n) {
				(t = +t, e >>>= 0, r >>>= 0, n) || je(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
				var i = r - 1,
					o = 1;
				for (this[e + i] = 255 & t; --i >= 0 && (o *= 256);) this[e + i] = t / o & 255;
				return e + r
			}, le.prototype.writeUint8 = le.prototype.writeUInt8 = function(t, e, r) {
				return t = +t, e >>>= 0, r || je(this, t, e, 1, 255, 0), this[e] = 255 & t, e + 1
			}, le.prototype.writeUint16LE = le.prototype.writeUInt16LE = function(t, e, r) {
				return t = +t, e >>>= 0, r || je(this, t, e, 2, 65535, 0), this[e] = 255 & t, this[e + 1] = t >>> 8, e +
					2
			}, le.prototype.writeUint16BE = le.prototype.writeUInt16BE = function(t, e, r) {
				return t = +t, e >>>= 0, r || je(this, t, e, 2, 65535, 0), this[e] = t >>> 8, this[e + 1] = 255 & t, e +
					2
			}, le.prototype.writeUint32LE = le.prototype.writeUInt32LE = function(t, e, r) {
				return t = +t, e >>>= 0, r || je(this, t, e, 4, 4294967295, 0), this[e + 3] = t >>> 24, this[e + 2] =
					t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t, e + 4
			}, le.prototype.writeUint32BE = le.prototype.writeUInt32BE = function(t, e, r) {
				return t = +t, e >>>= 0, r || je(this, t, e, 4, 4294967295, 0), this[e] = t >>> 24, this[e + 1] = t >>>
					16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t, e + 4
			}, le.prototype.writeIntLE = function(t, e, r, n) {
				if (t = +t, e >>>= 0, !n) {
					var i = Math.pow(2, 8 * r - 1);
					je(this, t, e, r, i - 1, -i)
				}
				var o = 0,
					a = 1,
					s = 0;
				for (this[e] = 255 & t; ++o < r && (a *= 256);) t < 0 && 0 === s && 0 !== this[e + o - 1] && (s = 1),
					this[e + o] = (t / a >> 0) - s & 255;
				return e + r
			}, le.prototype.writeIntBE = function(t, e, r, n) {
				if (t = +t, e >>>= 0, !n) {
					var i = Math.pow(2, 8 * r - 1);
					je(this, t, e, r, i - 1, -i)
				}
				var o = r - 1,
					a = 1,
					s = 0;
				for (this[e + o] = 255 & t; --o >= 0 && (a *= 256);) t < 0 && 0 === s && 0 !== this[e + o + 1] && (s =
					1), this[e + o] = (t / a >> 0) - s & 255;
				return e + r
			}, le.prototype.writeInt8 = function(t, e, r) {
				return t = +t, e >>>= 0, r || je(this, t, e, 1, 127, -128), t < 0 && (t = 255 + t + 1), this[e] = 255 &
					t, e + 1
			}, le.prototype.writeInt16LE = function(t, e, r) {
				return t = +t, e >>>= 0, r || je(this, t, e, 2, 32767, -32768), this[e] = 255 & t, this[e + 1] = t >>>
					8, e + 2
			}, le.prototype.writeInt16BE = function(t, e, r) {
				return t = +t, e >>>= 0, r || je(this, t, e, 2, 32767, -32768), this[e] = t >>> 8, this[e + 1] = 255 &
					t, e + 2
			}, le.prototype.writeInt32LE = function(t, e, r) {
				return t = +t, e >>>= 0, r || je(this, t, e, 4, 2147483647, -2147483648), this[e] = 255 & t, this[e +
					1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24, e + 4
			}, le.prototype.writeInt32BE = function(t, e, r) {
				return t = +t, e >>>= 0, r || je(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t +
						1), this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t,
					e + 4
			}, le.prototype.writeFloatLE = function(t, e, r) {
				return ze(this, t, e, !0, r)
			}, le.prototype.writeFloatBE = function(t, e, r) {
				return ze(this, t, e, !1, r)
			}, le.prototype.writeDoubleLE = function(t, e, r) {
				return Fe(this, t, e, !0, r)
			}, le.prototype.writeDoubleBE = function(t, e, r) {
				return Fe(this, t, e, !1, r)
			}, le.prototype.copy = function(t, e, r, n) {
				if (!le.isBuffer(t)) throw new TypeError("argument should be a Buffer");
				if (r || (r = 0), n || 0 === n || (n = this.length), e >= t.length && (e = t.length), e || (e = 0), n >
					0 && n < r && (n = r), n === r) return 0;
				if (0 === t.length || 0 === this.length) return 0;
				if (e < 0) throw new RangeError("targetStart out of bounds");
				if (r < 0 || r >= this.length) throw new RangeError("Index out of range");
				if (n < 0) throw new RangeError("sourceEnd out of bounds");
				n > this.length && (n = this.length), t.length - e < n - r && (n = t.length - e + r);
				var i = n - r;
				return this === t && "function" == typeof Uint8Array.prototype.copyWithin ? this.copyWithin(e, r, n) :
					Uint8Array.prototype.set.call(t, this.subarray(r, n), e), i
			}, le.prototype.fill = function(t, e, r, n) {
				if ("string" == typeof t) {
					if ("string" == typeof e ? (n = e, e = 0, r = this.length) : "string" == typeof r && (n = r, r =
							this.length), void 0 !== n && "string" != typeof n) throw new TypeError(
						"encoding must be a string");
					if ("string" == typeof n && !le.isEncoding(n)) throw new TypeError("Unknown encoding: " + n);
					if (1 === t.length) {
						var i = t.charCodeAt(0);
						("utf8" === n && i < 128 || "latin1" === n) && (t = i)
					}
				} else "number" == typeof t ? t &= 255 : "boolean" == typeof t && (t = Number(t));
				if (e < 0 || this.length < e || this.length < r) throw new RangeError("Out of range index");
				if (r <= e) return this;
				var o;
				if (e >>>= 0, r = void 0 === r ? this.length : r >>> 0, t || (t = 0), "number" == typeof t)
					for (o = e; o < r; ++o) this[o] = t;
				else {
					var a = le.isBuffer(t) ? t : le.from(t, n),
						s = a.length;
					if (0 === s) throw new TypeError('The value "' + t + '" is invalid for argument "value"');
					for (o = 0; o < r - e; ++o) this[o + e] = a[o % s]
				}
				return this
			}, ue = /[^+/0-9A-Za-z-_]/g, he = function() {
				for (var t = "0123456789abcdef", e = new Array(256), r = 0; r < 16; ++r)
					for (var n = 16 * r, i = 0; i < 16; ++i) e[n + i] = t[r] + t[i];
				return e
			}()
	}

	function Ve() {
		return ce || (ce = !0, Ke()), re
	}
	var Ze, $e, Xe = !1;

	function Je(t) {
		if ("string" != typeof t) throw new TypeError("Path must be a string. Received " + JSON.stringify(t))
	}

	function Qe(t, e) {
		for (var r, n = "", i = 0, o = -1, a = 0, s = 0; s <= t.length; ++s) {
			if (s < t.length) r = t.charCodeAt(s);
			else {
				if (47 === r) break;
				r = 47
			}
			if (47 === r) {
				if (o === s - 1 || 1 === a);
				else if (o !== s - 1 && 2 === a) {
					if (n.length < 2 || 2 !== i || 46 !== n.charCodeAt(n.length - 1) || 46 !== n.charCodeAt(n.length -
							2))
						if (n.length > 2) {
							var f = n.lastIndexOf("/");
							if (f !== n.length - 1) {
								-1 === f ? (n = "", i = 0) : i = (n = n.slice(0, f)).length - 1 - n.lastIndexOf("/"),
									o = s, a = 0;
								continue
							}
						} else if (2 === n.length || 1 === n.length) {
						n = "", i = 0, o = s, a = 0;
						continue
					}
					e && (n.length > 0 ? n += "/.." : n = "..", i = 2)
				} else n.length > 0 ? n += "/" + t.slice(o + 1, s) : n = t.slice(o + 1, s), i = s - o - 1;
				o = s, a = 0
			} else 46 === r && -1 !== a ? ++a : a = -1
		}
		return n
	}

	function tr() {
		return Xe || (Xe = !0, Ze = {}, Ut(), ($e = {
			resolve: function() {
				for (var t, e = "", r = !1, n = arguments.length - 1; n >= -1 && !r; n--) {
					var i;
					n >= 0 ? i = arguments[n] : (void 0 === t && (t = Ut().cwd()), i = t), Je(i), 0 !==
						i.length && (e = i + "/" + e, r = 47 === i.charCodeAt(0))
				}
				return e = Qe(e, !r), r ? e.length > 0 ? "/" + e : "/" : e.length > 0 ? e : "."
			},
			normalize: function(t) {
				if (Je(t), 0 === t.length) return ".";
				var e = 47 === t.charCodeAt(0),
					r = 47 === t.charCodeAt(t.length - 1);
				return 0 !== (t = Qe(t, !e)).length || e || (t = "."), t.length > 0 && r && (t += "/"),
					e ? "/" + t : t
			},
			isAbsolute: function(t) {
				return Je(t), t.length > 0 && 47 === t.charCodeAt(0)
			},
			join: function() {
				if (0 === arguments.length) return ".";
				for (var t, e = 0; e < arguments.length; ++e) {
					var r = arguments[e];
					Je(r), r.length > 0 && (void 0 === t ? t = r : t += "/" + r)
				}
				return void 0 === t ? "." : $e.normalize(t)
			},
			relative: function(t, e) {
				if (Je(t), Je(e), t === e) return "";
				if ((t = $e.resolve(t)) === (e = $e.resolve(e))) return "";
				for (var r = 1; r < t.length && 47 === t.charCodeAt(r); ++r);
				for (var n = t.length, i = n - r, o = 1; o < e.length && 47 === e.charCodeAt(o); ++o);
				for (var a = e.length - o, s = i < a ? i : a, f = -1, u = 0; u <= s; ++u) {
					if (u === s) {
						if (a > s) {
							if (47 === e.charCodeAt(o + u)) return e.slice(o + u + 1);
							if (0 === u) return e.slice(o + u)
						} else i > s && (47 === t.charCodeAt(r + u) ? f = u : 0 === u && (f = 0));
						break
					}
					var h = t.charCodeAt(r + u);
					if (h !== e.charCodeAt(o + u)) break;
					47 === h && (f = u)
				}
				var c = "";
				for (u = r + f + 1; u <= n; ++u) u !== n && 47 !== t.charCodeAt(u) || (0 === c.length ?
					c += ".." : c += "/..");
				return c.length > 0 ? c + e.slice(o + f) : (o += f, 47 === e.charCodeAt(o) && ++o, e
					.slice(o))
			},
			_makeLong: function(t) {
				return t
			},
			dirname: function(t) {
				if (Je(t), 0 === t.length) return ".";
				for (var e = t.charCodeAt(0), r = 47 === e, n = -1, i = !0, o = t.length - 1; o >= 1; --
					o)
					if (47 === (e = t.charCodeAt(o))) {
						if (!i) {
							n = o;
							break
						}
					} else i = !1;
				return -1 === n ? r ? "/" : "." : r && 1 === n ? "//" : t.slice(0, n)
			},
			basename: function(t, e) {
				if (void 0 !== e && "string" != typeof e) throw new TypeError(
					'"ext" argument must be a string');
				Je(t);
				var r, n = 0,
					i = -1,
					o = !0;
				if (void 0 !== e && e.length > 0 && e.length <= t.length) {
					if (e.length === t.length && e === t) return "";
					var a = e.length - 1,
						s = -1;
					for (r = t.length - 1; r >= 0; --r) {
						var f = t.charCodeAt(r);
						if (47 === f) {
							if (!o) {
								n = r + 1;
								break
							}
						} else -1 === s && (o = !1, s = r + 1), a >= 0 && (f === e.charCodeAt(a) ? -1 ==
							--a && (i = r) : (a = -1, i = s))
					}
					return n === i ? i = s : -1 === i && (i = t.length), t.slice(n, i)
				}
				for (r = t.length - 1; r >= 0; --r)
					if (47 === t.charCodeAt(r)) {
						if (!o) {
							n = r + 1;
							break
						}
					} else -1 === i && (o = !1, i = r + 1);
				return -1 === i ? "" : t.slice(n, i)
			},
			extname: function(t) {
				Je(t);
				for (var e = -1, r = 0, n = -1, i = !0, o = 0, a = t.length - 1; a >= 0; --a) {
					var s = t.charCodeAt(a);
					if (47 !== s) - 1 === n && (i = !1, n = a + 1), 46 === s ? -1 === e ? e = a : 1 !==
						o && (o = 1) : -1 !== e && (o = -1);
					else if (!i) {
						r = a + 1;
						break
					}
				}
				return -1 === e || -1 === n || 0 === o || 1 === o && e === n - 1 && e === r + 1 ? "" : t
					.slice(e, n)
			},
			format: function(t) {
				if (null === t || "object" != typeof t) throw new TypeError(
					'The "pathObject" argument must be of type Object. Received type ' +
					typeof t);
				return function(t, e) {
					var r = e.dir || e.root,
						n = e.base || (e.name || "") + (e.ext || "");
					return r ? r === e.root ? r + n : r + t + n : n
				}("/", t)
			},
			parse: function(t) {
				Je(t);
				var e = {
					root: "",
					dir: "",
					base: "",
					ext: "",
					name: ""
				};
				if (0 === t.length) return e;
				var r, n = t.charCodeAt(0),
					i = 47 === n;
				i ? (e.root = "/", r = 1) : r = 0;
				for (var o = -1, a = 0, s = -1, f = !0, u = t.length - 1, h = 0; u >= r; --u)
					if (47 !== (n = t.charCodeAt(u))) - 1 === s && (f = !1, s = u + 1), 46 === n ? -
						1 === o ? o = u : 1 !== h && (h = 1) : -1 !== o && (h = -1);
					else if (!f) {
					a = u + 1;
					break
				}
				return -1 === o || -1 === s || 0 === h || 1 === h && o === s - 1 && o === a + 1 ? -1 !==
					s && (e.base = e.name = 0 === a && i ? t.slice(1, s) : t.slice(a, s)) : (0 === a &&
						i ? (e.name = t.slice(1, o), e.base = t.slice(1, s)) : (e.name = t.slice(a, o),
							e.base = t.slice(a, s)), e.ext = t.slice(o, s)), a > 0 ? e.dir = t.slice(0,
						a - 1) : i && (e.dir = "/"), e
			},
			sep: "/",
			delimiter: ":",
			win32: null,
			posix: null
		}).posix = $e, Ze = $e), Ze
	}
	var er, rr = !1;

	function nr() {
		return rr || (rr = !0, er = {}), er
	}
	var ir, or, ar, sr, fr = !1;

	function ur(t, e) {
		for (var r in t) e[r] = t[r]
	}

	function hr(t, e, r) {
		return sr(t, e, r)
	}

	function cr() {
		return fr || (fr = !0, ir = {}, ar = Ve(), (sr = ar.Buffer).from && sr.alloc && sr.allocUnsafe && sr
			.allocUnsafeSlow ? ir = ar : (ur(ar, ir), or = hr, ir.Buffer = or), hr.prototype = Object.create(sr
				.prototype), ur(sr, hr), hr.from = function(t, e, r) {
				if ("number" == typeof t) throw new TypeError("Argument must not be a number");
				return sr(t, e, r)
			}, hr.alloc = function(t, e, r) {
				if ("number" != typeof t) throw new TypeError("Argument must be a number");
				var n = sr(t);
				return void 0 !== e ? "string" == typeof r ? n.fill(e, r) : n.fill(e) : n.fill(0), n
			}, hr.allocUnsafe = function(t) {
				if ("number" != typeof t) throw new TypeError("Argument must be a number");
				return sr(t)
			}, hr.allocUnsafeSlow = function(t) {
				if ("number" != typeof t) throw new TypeError("Argument must be a number");
				return ar.SlowBuffer(t)
			}), ir
	}
	var dr, lr, pr, mr, br, gr = !1;

	function vr() {
		throw new Error(
			"Secure random number generation is not supported by this browser.\nUse Chrome, Firefox or Internet Explorer 11"
			)
	}

	function yr(t, e) {
		if (t > pr) throw new RangeError("requested too many random bytes");
		var r = mr.allocUnsafe(t);
		if (t > 0)
			if (t > lr)
				for (var n = 0; n < t; n += lr) br.getRandomValues(r.slice(n, n + lr));
			else br.getRandomValues(r);
		return "function" == typeof e ? Ut().nextTick((function() {
			e(null, r)
		})) : r
	}

	function wr() {
		return gr || (gr = !0, dr = {}, Ut(), lr = 65536, pr = 4294967295, mr = cr().Buffer, br = t.crypto || t
			.msCrypto, dr = br && br.getRandomValues ? yr : vr), dr
	}
	var _r, Ar = !1;

	function Mr() {
		return Ar || (Ar = !0, _r = {}, _r = "function" == typeof Object.create ? function(t, e) {
			e && (t.super_ = e, t.prototype = Object.create(e.prototype, {
				constructor: {
					value: t,
					enumerable: !1,
					writable: !0,
					configurable: !0
				}
			}))
		} : function(t, e) {
			if (e) {
				t.super_ = e;
				var r = function() {};
				r.prototype = e.prototype, t.prototype = new r, t.prototype.constructor = t
			}
		}), _r
	}
	var Er, Sr, kr, Br, Tr, Rr, xr = !1;

	function Cr() {
		Cr.init.call(this)
	}

	function Ir(t) {
		if ("function" != typeof t) throw new TypeError(
			'The "listener" argument must be of type Function. Received type ' + typeof t)
	}

	function Dr(t) {
		return void 0 === t._maxListeners ? Cr.defaultMaxListeners : t._maxListeners
	}

	function Pr(t, e, r, n) {
		var i, o, a, s;
		if (Ir(r), void 0 === (o = t._events) ? (o = t._events = Object.create(null), t._eventsCount = 0) : (void 0 !==
				o.newListener && (t.emit("newListener", e, r.listener ? r.listener : r), o = t._events), a = o[e]),
			void 0 === a) a = o[e] = r, ++t._eventsCount;
		else if ("function" == typeof a ? a = o[e] = n ? [r, a] : [a, r] : n ? a.unshift(r) : a.push(r), (i = Dr(t)) >
			0 && a.length > i && !a.warned) {
			a.warned = !0;
			var f = new Error("Possible EventEmitter memory leak detected. " + a.length + " " + String(e) +
				" listeners added. Use emitter.setMaxListeners() to increase limit");
			f.name = "MaxListenersExceededWarning", f.emitter = t, f.type = e, f.count = a.length, s = f, console &&
				console.warn && console.warn(s)
		}
		return t
	}

	function Or() {
		if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, 0 === arguments
			.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments)
	}

	function Lr(t, e, r) {
		var n = {
				fired: !1,
				wrapFn: void 0,
				target: t,
				type: e,
				listener: r
			},
			i = Or.bind(n);
		return i.listener = r, n.wrapFn = i, i
	}

	function Ur(t, e, r) {
		var n = t._events;
		if (void 0 === n) return [];
		var i = n[e];
		return void 0 === i ? [] : "function" == typeof i ? r ? [i.listener || i] : [i] : r ? function(t) {
			for (var e = new Array(t.length), r = 0; r < e.length; ++r) e[r] = t[r].listener || t[r];
			return e
		}(i) : Nr(i, i.length)
	}

	function jr(t) {
		var e = this._events;
		if (void 0 !== e) {
			var r = e[t];
			if ("function" == typeof r) return 1;
			if (void 0 !== r) return r.length
		}
		return 0
	}

	function Nr(t, e) {
		for (var r = new Array(e), n = 0; n < e; ++n) r[n] = t[n];
		return r
	}

	function zr() {
		return xr || (xr = !0, Er = {}, Sr = "object" == typeof Reflect ? Reflect : null, kr = Sr && "function" ==
			typeof Sr.apply ? Sr.apply : function(t, e, r) {
				return Function.prototype.apply.call(t, e, r)
			}, Br = Sr && "function" == typeof Sr.ownKeys ? Sr.ownKeys : Object.getOwnPropertySymbols ? function(
			t) {
				return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))
			} : function(t) {
				return Object.getOwnPropertyNames(t)
			}, Tr = Number.isNaN || function(t) {
				return t != t
			}, Er = Cr, Cr.EventEmitter = Cr, Cr.prototype._events = void 0, Cr.prototype._eventsCount = 0, Cr
			.prototype._maxListeners = void 0, Rr = 10, Object.defineProperty(Cr, "defaultMaxListeners", {
				enumerable: !0,
				get: function() {
					return Rr
				},
				set: function(t) {
					if ("number" != typeof t || t < 0 || Tr(t)) throw new RangeError(
						'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
						t + ".");
					Rr = t
				}
			}), Cr.init = function() {
				void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events =
						Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners ||
					void 0
			}, Cr.prototype.setMaxListeners = function(t) {
				if ("number" != typeof t || t < 0 || Tr(t)) throw new RangeError(
					'The value of "n" is out of range. It must be a non-negative number. Received ' + t +
					".");
				return this._maxListeners = t, this
			}, Cr.prototype.getMaxListeners = function() {
				return Dr(this)
			}, Cr.prototype.emit = function(t) {
				for (var e = [], r = 1; r < arguments.length; r++) e.push(arguments[r]);
				var n = "error" === t,
					i = this._events;
				if (void 0 !== i) n = n && void 0 === i.error;
				else if (!n) return !1;
				if (n) {
					var o;
					if (e.length > 0 && (o = e[0]), o instanceof Error) throw o;
					var a = new Error("Unhandled error." + (o ? " (" + o.message + ")" : ""));
					throw a.context = o, a
				}
				var s = i[t];
				if (void 0 === s) return !1;
				if ("function" == typeof s) kr(s, this, e);
				else {
					var f = s.length,
						u = Nr(s, f);
					for (r = 0; r < f; ++r) kr(u[r], this, e)
				}
				return !0
			}, Cr.prototype.addListener = function(t, e) {
				return Pr(this, t, e, !1)
			}, Cr.prototype.on = Cr.prototype.addListener, Cr.prototype.prependListener = function(t, e) {
				return Pr(this, t, e, !0)
			}, Cr.prototype.once = function(t, e) {
				return Ir(e), this.on(t, Lr(this, t, e)), this
			}, Cr.prototype.prependOnceListener = function(t, e) {
				return Ir(e), this.prependListener(t, Lr(this, t, e)), this
			}, Cr.prototype.removeListener = function(t, e) {
				var r, n, i, o, a;
				if (Ir(e), void 0 === (n = this._events)) return this;
				if (void 0 === (r = n[t])) return this;
				if (r === e || r.listener === e) 0 == --this._eventsCount ? this._events = Object.create(null) : (
					delete n[t], n.removeListener && this.emit("removeListener", t, r.listener || e));
				else if ("function" != typeof r) {
					for (i = -1, o = r.length - 1; o >= 0; o--)
						if (r[o] === e || r[o].listener === e) {
							a = r[o].listener, i = o;
							break
						} if (i < 0) return this;
					0 === i ? r.shift() : function(t, e) {
						for (; e + 1 < t.length; e++) t[e] = t[e + 1];
						t.pop()
					}(r, i), 1 === r.length && (n[t] = r[0]), void 0 !== n.removeListener && this.emit(
						"removeListener", t, a || e)
				}
				return this
			}, Cr.prototype.off = Cr.prototype.removeListener, Cr.prototype.removeAllListeners = function(t) {
				var e, r, n;
				if (void 0 === (r = this._events)) return this;
				if (void 0 === r.removeListener) return 0 === arguments.length ? (this._events = Object.create(
					null), this._eventsCount = 0) : void 0 !== r[t] && (0 == --this._eventsCount ? this
					._events = Object.create(null) : delete r[t]), this;
				if (0 === arguments.length) {
					var i, o = Object.keys(r);
					for (n = 0; n < o.length; ++n) "removeListener" !== (i = o[n]) && this.removeAllListeners(i);
					return this.removeAllListeners("removeListener"), this._events = Object.create(null), this
						._eventsCount = 0, this
				}
				if ("function" == typeof(e = r[t])) this.removeListener(t, e);
				else if (void 0 !== e)
					for (n = e.length - 1; n >= 0; n--) this.removeListener(t, e[n]);
				return this
			}, Cr.prototype.listeners = function(t) {
				return Ur(this, t, !0)
			}, Cr.prototype.rawListeners = function(t) {
				return Ur(this, t, !1)
			}, Cr.listenerCount = function(t, e) {
				return "function" == typeof t.listenerCount ? t.listenerCount(e) : jr.call(t, e)
			}, Cr.prototype.listenerCount = jr, Cr.prototype.eventNames = function() {
				return this._eventsCount > 0 ? Br(this._events) : []
			}), Er
	}
	var Fr, qr = !1;

	function Hr() {
		return qr || (qr = !0, Fr = {}, Fr = zr().EventEmitter), Fr
	}
	var Wr, Gr, Yr, Kr, Vr = !1;

	function Zr(t, e) {
		var r = Object.keys(t);
		if (Object.getOwnPropertySymbols) {
			var n = Object.getOwnPropertySymbols(t);
			e && (n = n.filter((function(e) {
				return Object.getOwnPropertyDescriptor(t, e).enumerable
			}))), r.push.apply(r, n)
		}
		return r
	}

	function $r(t, e, r) {
		return e in t ? Object.defineProperty(t, e, {
			value: r,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : t[e] = r, t
	}

	function Xr(t, e) {
		for (var r = 0; r < e.length; r++) {
			var n = e[r];
			n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object
				.defineProperty(t, n.key, n)
		}
	}

	function Jr() {
		Wr = {}, Ve(), Gr = Ve().Buffer, nr(), Yr = nr().inspect, Kr = Yr && Yr.custom || "inspect", Wr = function() {
			function t() {
				! function(t, e) {
					if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
				}(this, t), this.head = null, this.tail = null, this.length = 0
			}
			var e, r, n;
			return e = t, (r = [{
				key: "push",
				value: function(t) {
					var e = {
						data: t,
						next: null
					};
					this.length > 0 ? this.tail.next = e : this.head = e, this.tail = e, ++this
						.length
				}
			}, {
				key: "unshift",
				value: function(t) {
					var e = {
						data: t,
						next: this.head
					};
					0 === this.length && (this.tail = e), this.head = e, ++this.length
				}
			}, {
				key: "shift",
				value: function() {
					if (0 !== this.length) {
						var t = this.head.data;
						return 1 === this.length ? this.head = this.tail = null : this.head = this
							.head.next, --this.length, t
					}
				}
			}, {
				key: "clear",
				value: function() {
					this.head = this.tail = null, this.length = 0
				}
			}, {
				key: "join",
				value: function(t) {
					if (0 === this.length) return "";
					for (var e = this.head, r = "" + e.data; e = e.next;) r += t + e.data;
					return r
				}
			}, {
				key: "concat",
				value: function(t) {
					if (0 === this.length) return Gr.alloc(0);
					for (var e, r, n, i = Gr.allocUnsafe(t >>> 0), o = this.head, a = 0; o;) e = o
						.data, r = i, n = a, Gr.prototype.copy.call(e, r, n), a += o.data.length,
						o = o.next;
					return i
				}
			}, {
				key: "consume",
				value: function(t, e) {
					var r;
					return t < this.head.data.length ? (r = this.head.data.slice(0, t), this.head
							.data = this.head.data.slice(t)) : r = t === this.head.data.length ?
						this.shift() : e ? this._getString(t) : this._getBuffer(t), r
				}
			}, {
				key: "first",
				value: function() {
					return this.head.data
				}
			}, {
				key: "_getString",
				value: function(t) {
					var e = this.head,
						r = 1,
						n = e.data;
					for (t -= n.length; e = e.next;) {
						var i = e.data,
							o = t > i.length ? i.length : t;
						if (o === i.length ? n += i : n += i.slice(0, t), 0 == (t -= o)) {
							o === i.length ? (++r, e.next ? this.head = e.next : this.head = this
								.tail = null) : (this.head = e, e.data = i.slice(o));
							break
						}++r
					}
					return this.length -= r, n
				}
			}, {
				key: "_getBuffer",
				value: function(t) {
					var e = Gr.allocUnsafe(t),
						r = this.head,
						n = 1;
					for (r.data.copy(e), t -= r.data.length; r = r.next;) {
						var i = r.data,
							o = t > i.length ? i.length : t;
						if (i.copy(e, e.length - t, 0, o), 0 == (t -= o)) {
							o === i.length ? (++n, r.next ? this.head = r.next : this.head = this
								.tail = null) : (this.head = r, r.data = i.slice(o));
							break
						}++n
					}
					return this.length -= n, e
				}
			}, {
				key: Kr,
				value: function(t, e) {
					return Yr(this, function(t) {
						for (var e = 1; e < arguments.length; e++) {
							var r = null != arguments[e] ? arguments[e] : {};
							e % 2 ? Zr(Object(r), !0).forEach((function(e) {
									$r(t, e, r[e])
								})) : Object.getOwnPropertyDescriptors ? Object
								.defineProperties(t, Object.getOwnPropertyDescriptors(r)) :
								Zr(Object(r)).forEach((function(e) {
									Object.defineProperty(t, e, Object
										.getOwnPropertyDescriptor(r, e))
								}))
						}
						return t
					}({}, e, {
						depth: 0,
						customInspect: !1
					}))
				}
			}]) && Xr(e.prototype, r), n && Xr(e, n), t
		}()
	}
	var Qr, tn = !1;

	function en(t, e) {
		var r = this,
			n = this._readableState && this._readableState.destroyed,
			i = this._writableState && this._writableState.destroyed;
		return n || i ? (e ? e(t) : t && (this._writableState ? this._writableState.errorEmitted || (this._writableState
			.errorEmitted = !0, Ut().nextTick(an, this, t)) : Ut().nextTick(an, this, t)), this) : (this
			._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState
				.destroyed = !0), this._destroy(t || null, (function(t) {
				!e && t ? r._writableState ? r._writableState.errorEmitted ? Ut().nextTick(nn, r) : (r
					._writableState.errorEmitted = !0, Ut().nextTick(rn, r, t)) : Ut().nextTick(rn, r,
					t) : e ? (Ut().nextTick(nn, r), e(t)) : Ut().nextTick(nn, r)
			})), this)
	}

	function rn(t, e) {
		an(t, e), nn(t)
	}

	function nn(t) {
		t._writableState && !t._writableState.emitClose || t._readableState && !t._readableState.emitClose || t.emit(
			"close")
	}

	function on() {
		this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this
			._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this
			._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this
			._writableState.finalCalled = !1, this._writableState.prefinished = !1, this._writableState.finished = !
			1, this._writableState.errorEmitted = !1)
	}

	function an(t, e) {
		t.emit("error", e)
	}

	function sn(t, e) {
		var r = t._readableState,
			n = t._writableState;
		r && r.autoDestroy || n && n.autoDestroy ? t.destroy(e) : t.emit("error", e)
	}

	function fn() {
		return tn || (tn = !0, Qr = {}, Ut(), Qr = {
			destroy: en,
			undestroy: on,
			errorOrDestroy: sn
		}), Qr
	}
	var un, hn, cn, dn = !1;

	function ln(t, e, r) {
		r || (r = Error);
		var n = function(t) {
			var r, n;

			function i(r, n, i) {
				return t.call(this, function(t, r, n) {
					return "string" == typeof e ? e : e(t, r, n)
				}(r, n, i)) || this
			}
			return n = t, (r = i).prototype = Object.create(n.prototype), r.prototype.constructor = r, r.__proto__ =
				n, i
		}(r);
		n.prototype.name = r.name, n.prototype.code = t, hn[t] = n
	}

	function pn(t, e) {
		if (Array.isArray(t)) {
			var r = t.length;
			return t = t.map((function(t) {
					return String(t)
				})), r > 2 ? "one of ".concat(e, " ").concat(t.slice(0, r - 1).join(", "), ", or ") + t[r - 1] : 2 ===
				r ? "one of ".concat(e, " ").concat(t[0], " or ").concat(t[1]) : "of ".concat(e, " ").concat(t[0])
		}
		return "of ".concat(e, " ").concat(String(t))
	}

	function mn() {
		return dn || (dn = !0, un = {}, hn = {}, ln("ERR_INVALID_OPT_VALUE", (function(t, e) {
				return 'The value "' + e + '" is invalid for option "' + t + '"'
			}), TypeError), ln("ERR_INVALID_ARG_TYPE", (function(t, e, r) {
				var n, i, o, a;
				if ("string" == typeof e && (i = "not ", e.substr(!o || o < 0 ? 0 : +o, i.length) === i) ? (
						n = "must not be", e = e.replace(/^not /, "")) : n = "must be", function(t, e, r) {
						return (void 0 === r || r > t.length) && (r = t.length), t.substring(r - e.length,
							r) === e
					}(t, " argument")) a = "The ".concat(t, " ").concat(n, " ").concat(pn(e, "type"));
				else {
					var s = function(t, e, r) {
						return "number" != typeof r && (r = 0), !(r + e.length > t.length) && -1 !== t
							.indexOf(e, r)
					}(t, ".") ? "property" : "argument";
					a = 'The "'.concat(t, '" ').concat(s, " ").concat(n, " ").concat(pn(e, "type"))
				}
				return a + ". Received type ".concat(typeof r)
			}), TypeError), ln("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF"), ln(
				"ERR_METHOD_NOT_IMPLEMENTED", (function(t) {
					return "The " + t + " method is not implemented"
				})), ln("ERR_STREAM_PREMATURE_CLOSE", "Premature close"), ln("ERR_STREAM_DESTROYED", (function(t) {
				return "Cannot call " + t + " after a stream was destroyed"
			})), ln("ERR_MULTIPLE_CALLBACK", "Callback called multiple times"), ln("ERR_STREAM_CANNOT_PIPE",
				"Cannot pipe, not readable"), ln("ERR_STREAM_WRITE_AFTER_END", "write after end"), ln(
				"ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError), ln(
				"ERR_UNKNOWN_ENCODING", (function(t) {
					return "Unknown encoding: " + t
				}), TypeError), ln("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event"), cn =
			hn, un.codes = cn), un
	}
	var bn, gn, vn = !1;

	function yn(t, e, r, n) {
		var i = function(t, e, r) {
			return null != t.highWaterMark ? t.highWaterMark : e ? t[r] : null
		}(e, n, r);
		if (null != i) {
			if (!isFinite(i) || Math.floor(i) !== i || i < 0) throw new gn(n ? r : "highWaterMark", i);
			return Math.floor(i)
		}
		return t.objectMode ? 16 : 16384
	}

	function wn() {
		return vn || (vn = !0, bn = {}, gn = mn().codes.ERR_INVALID_OPT_VALUE, bn = {
			getHighWaterMark: yn
		}), bn
	}
	var _n, An = !1;

	function Mn(t, e) {
		if (En("noDeprecation")) return t;
		var r = !1;
		return function() {
			if (!r) {
				if (En("throwDeprecation")) throw new Error(e);
				En("traceDeprecation") ? console.trace(e) : console.warn(e), r = !0
			}
			return t.apply(this, arguments)
		}
	}

	function En(e) {
		try {
			if (!t.localStorage) return !1
		} catch (t) {
			return !1
		}
		var r = t.localStorage[e];
		return null != r && "true" === String(r).toLowerCase()
	}

	function Sn() {
		return An || (An = !0, _n = {}, _n = Mn), _n
	}
	var kn, Bn, Tn, Rn, xn, Cn, In, Dn, Pn, On, Ln, Un, jn, Nn, zn, Fn, qn, Hn, Wn = !1;

	function Gn(t) {
		var e = this;
		this.next = null, this.entry = null, this.finish = function() {
			! function(t, e, r) {
				var n = t.entry;
				t.entry = null;
				for (; n;) {
					var i = n.callback;
					e.pendingcb--, i(r), n = n.next
				}
				e.corkedRequestsFree.next = t
			}(e, t)
		}
	}

	function Yn() {}

	function Kn(t, e, r) {
		Bn = Bn || pi(), t = t || {}, "boolean" != typeof r && (r = e instanceof Bn), this.objectMode = !!t.objectMode,
			r && (this.objectMode = this.objectMode || !!t.writableObjectMode), this.highWaterMark = In(this, t,
				"writableHighWaterMark", r), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this
			.ended = !1, this.finished = !1, this.destroyed = !1;
		var n = !1 === t.decodeStrings;
		this.decodeStrings = !n, this.defaultEncoding = t.defaultEncoding || "utf8", this.length = 0, this.writing = !1,
			this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(t) {
				! function(t, e) {
					var r = t._writableState,
						n = r.sync,
						i = r.writecb;
					if ("function" != typeof i) throw new Ln;
					if (function(t) {
							t.writing = !1, t.writecb = null, t.length -= t.writelen, t.writelen = 0
						}(r), e) ! function(t, e, r, n, i) {
						--e.pendingcb, r ? (Ut().nextTick(i, n), Ut().nextTick(ei, t, e), t._writableState
							.errorEmitted = !0, qn(t, n)) : (i(n), t._writableState.errorEmitted = !0, qn(t, n),
							ei(t, e))
					}(t, r, n, e, i);
					else {
						var o = Qn(r) || t.destroyed;
						o || r.corked || r.bufferProcessing || !r.bufferedRequest || Jn(t, r), n ? Ut().nextTick(Xn, t,
							r, o, i) : Xn(t, r, o, i)
					}
				}(e, t)
			}, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null,
			this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.emitClose = !1 !== t.emitClose, this
			.autoDestroy = !!t.autoDestroy, this.bufferedRequestCount = 0, this.corkedRequestsFree = new Gn(this)
	}

	function Vn(t) {
		var e = this instanceof(Bn = Bn || pi());
		if (!e && !Hn.call(Vn, this)) return new Vn(t);
		this._writableState = new Kn(t, this, e), this.writable = !0, t && ("function" == typeof t.write && (this
				._write = t.write), "function" == typeof t.writev && (this._writev = t.writev), "function" ==
			typeof t.destroy && (this._destroy = t.destroy), "function" == typeof t.final && (this._final = t.final)
			), Rn.call(this)
	}

	function Zn(t, e, r, n, i, o) {
		if (!r) {
			var a = function(t, e, r) {
				return t.objectMode || !1 === t.decodeStrings || "string" != typeof e || (e = xn.from(e, r)), e
			}(e, n, i);
			n !== a && (r = !0, i = "buffer", n = a)
		}
		var s = e.objectMode ? 1 : n.length;
		e.length += s;
		var f = e.length < e.highWaterMark;
		if (f || (e.needDrain = !0), e.writing || e.corked) {
			var u = e.lastBufferedRequest;
			e.lastBufferedRequest = {
					chunk: n,
					encoding: i,
					isBuf: r,
					callback: o,
					next: null
				}, u ? u.next = e.lastBufferedRequest : e.bufferedRequest = e.lastBufferedRequest, e
				.bufferedRequestCount += 1
		} else $n(t, e, !1, s, n, i, o);
		return f
	}

	function $n(t, e, r, n, i, o, a) {
		e.writelen = n, e.writecb = a, e.writing = !0, e.sync = !0, e.destroyed ? e.onwrite(new jn("write")) : r ? t
			._writev(i, e.onwrite) : t._write(i, o, e.onwrite), e.sync = !1
	}

	function Xn(t, e, r, n) {
		r || function(t, e) {
			0 === e.length && e.needDrain && (e.needDrain = !1, t.emit("drain"))
		}(t, e), e.pendingcb--, n(), ei(t, e)
	}

	function Jn(t, e) {
		e.bufferProcessing = !0;
		var r = e.bufferedRequest;
		if (t._writev && r && r.next) {
			var n = e.bufferedRequestCount,
				i = new Array(n),
				o = e.corkedRequestsFree;
			o.entry = r;
			for (var a = 0, s = !0; r;) i[a] = r, r.isBuf || (s = !1), r = r.next, a += 1;
			i.allBuffers = s, $n(t, e, !0, e.length, i, "", o.finish), e.pendingcb++, e.lastBufferedRequest = null, o
				.next ? (e.corkedRequestsFree = o.next, o.next = null) : e.corkedRequestsFree = new Gn(e), e
				.bufferedRequestCount = 0
		} else {
			for (; r;) {
				var f = r.chunk,
					u = r.encoding,
					h = r.callback;
				if ($n(t, e, !1, e.objectMode ? 1 : f.length, f, u, h), r = r.next, e.bufferedRequestCount--, e.writing)
					break
			}
			null === r && (e.lastBufferedRequest = null)
		}
		e.bufferedRequest = r, e.bufferProcessing = !1
	}

	function Qn(t) {
		return t.ending && 0 === t.length && null === t.bufferedRequest && !t.finished && !t.writing
	}

	function ti(t, e) {
		t._final((function(r) {
			e.pendingcb--, r && qn(t, r), e.prefinished = !0, t.emit("prefinish"), ei(t, e)
		}))
	}

	function ei(t, e) {
		var r = Qn(e);
		if (r && (function(t, e) {
				e.prefinished || e.finalCalled || ("function" != typeof t._final || e.destroyed ? (e.prefinished = !
					0, t.emit("prefinish")) : (e.pendingcb++, e.finalCalled = !0, Ut().nextTick(ti, t, e)))
			}(t, e), 0 === e.pendingcb && (e.finished = !0, t.emit("finish"), e.autoDestroy))) {
			var n = t._readableState;
			(!n || n.autoDestroy && n.endEmitted) && t.destroy()
		}
		return r
	}

	function ri() {
		kn = {}, Ut(), kn = Vn, Vn.WritableState = Kn, Tn = {
				deprecate: Sn()
			}, Rn = Hr(), xn = Ve().Buffer, Cn = t.Uint8Array || function() {}, fn(), wn(), In = wn().getHighWaterMark,
			Dn = mn().codes, Pn = Dn.ERR_INVALID_ARG_TYPE, On = Dn.ERR_METHOD_NOT_IMPLEMENTED, Ln = Dn
			.ERR_MULTIPLE_CALLBACK, Un = Dn.ERR_STREAM_CANNOT_PIPE, jn = Dn.ERR_STREAM_DESTROYED, Nn = Dn
			.ERR_STREAM_NULL_VALUES, zn = Dn.ERR_STREAM_WRITE_AFTER_END, Fn = Dn.ERR_UNKNOWN_ENCODING, qn = fn()
			.errorOrDestroy, Mr()(Vn, Rn), Kn.prototype.getBuffer = function() {
				for (var t = this.bufferedRequest, e = []; t;) e.push(t), t = t.next;
				return e
			},
			function() {
				try {
					Object.defineProperty(Kn.prototype, "buffer", {
						get: Tn.deprecate((function() {
								return this.getBuffer()
							}),
							"_writableState.buffer is deprecated. Use _writableState.getBuffer instead.",
							"DEP0003")
					})
				} catch (t) {}
			}(), "function" == typeof Symbol && Symbol.hasInstance && "function" == typeof Function.prototype[Symbol
				.hasInstance] ? (Hn = Function.prototype[Symbol.hasInstance], Object.defineProperty(Vn, Symbol
				.hasInstance, {
					value: function(t) {
						return !!Hn.call(this, t) || this === Vn && (t && t._writableState instanceof Kn)
					}
				})) : Hn = function(t) {
				return t instanceof this
			}, Vn.prototype.pipe = function() {
				qn(this, new Un)
			}, Vn.prototype.write = function(t, e, r) {
				var n, i = this._writableState,
					o = !1,
					a = !i.objectMode && (n = t, xn.isBuffer(n) || n instanceof Cn);
				return a && !xn.isBuffer(t) && (t = function(t) {
						return xn.from(t)
					}(t)), "function" == typeof e && (r = e, e = null), a ? e = "buffer" : e || (e = i.defaultEncoding),
					"function" != typeof r && (r = Yn), i.ending ? function(t, e) {
						var r = new zn;
						qn(t, r), Ut().nextTick(e, r)
					}(this, r) : (a || function(t, e, r, n) {
						var i;
						return null === r ? i = new Nn : "string" == typeof r || e.objectMode || (i = new Pn(
							"chunk", ["string", "Buffer"], r)), !i || (qn(t, i), Ut().nextTick(n, i), !1)
					}(this, i, t, r)) && (i.pendingcb++, o = Zn(this, i, a, t, e, r)), o
			}, Vn.prototype.cork = function() {
				this._writableState.corked++
			}, Vn.prototype.uncork = function() {
				var t = this._writableState;
				t.corked && (t.corked--, t.writing || t.corked || t.bufferProcessing || !t.bufferedRequest || Jn(this,
					t))
			}, Vn.prototype.setDefaultEncoding = function(t) {
				if ("string" == typeof t && (t = t.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary",
						"base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"
					].indexOf((t + "").toLowerCase()) > -1)) throw new Fn(t);
				return this._writableState.defaultEncoding = t, this
			}, Object.defineProperty(Vn.prototype, "writableBuffer", {
				enumerable: !1,
				get: function() {
					return this._writableState && this._writableState.getBuffer()
				}
			}), Object.defineProperty(Vn.prototype, "writableHighWaterMark", {
				enumerable: !1,
				get: function() {
					return this._writableState.highWaterMark
				}
			}), Vn.prototype._write = function(t, e, r) {
				r(new On("_write()"))
			}, Vn.prototype._writev = null, Vn.prototype.end = function(t, e, r) {
				var n = this._writableState;
				return "function" == typeof t ? (r = t, t = null, e = null) : "function" == typeof e && (r = e, e =
						null), null != t && this.write(t, e), n.corked && (n.corked = 1, this.uncork()), n.ending ||
					function(t, e, r) {
						e.ending = !0, ei(t, e), r && (e.finished ? Ut().nextTick(r) : t.once("finish", r)), e.ended = !
							0, t.writable = !1
					}(this, n, r), this
			}, Object.defineProperty(Vn.prototype, "writableLength", {
				enumerable: !1,
				get: function() {
					return this._writableState.length
				}
			}), Object.defineProperty(Vn.prototype, "destroyed", {
				enumerable: !1,
				get: function() {
					return void 0 !== this._writableState && this._writableState.destroyed
				},
				set: function(t) {
					this._writableState && (this._writableState.destroyed = t)
				}
			}), Vn.prototype.destroy = fn().destroy, Vn.prototype._undestroy = fn().undestroy, Vn.prototype._destroy =
			function(t, e) {
				e(t)
			}
	}

	function ni() {
		return Wn || (Wn = !0, ri()), kn
	}
	var ii, oi, ai, si, fi, ui, hi = !1;

	function ci(t) {
		if (!(this instanceof ci)) return new ci(t);
		ai.call(this, t), ni().call(this, t), this.allowHalfOpen = !0, t && (!1 === t.readable && (this.readable = !1),
			!1 === t.writable && (this.writable = !1), !1 === t.allowHalfOpen && (this.allowHalfOpen = !1, this
				.once("end", di)))
	}

	function di() {
		this._writableState.ended || Ut().nextTick(li, this)
	}

	function li(t) {
		t.end()
	}

	function pi() {
		return hi || (hi = !0, function() {
			for (ii = {}, Ut(), oi = Object.keys || function(t) {
					var e = [];
					for (var r in t) e.push(r);
					return e
				}, ii = ci, ai = Yo(), ni(), Mr()(ci, ai), si = oi(ni().prototype), fi = 0; fi < si
				.length; fi++) ui = si[fi], ci.prototype[ui] || (ci.prototype[ui] = ni().prototype[ui]);
			Object.defineProperty(ci.prototype, "writableHighWaterMark", {
				enumerable: !1,
				get: function() {
					return this._writableState.highWaterMark
				}
			}), Object.defineProperty(ci.prototype, "writableBuffer", {
				enumerable: !1,
				get: function() {
					return this._writableState && this._writableState.getBuffer()
				}
			}), Object.defineProperty(ci.prototype, "writableLength", {
				enumerable: !1,
				get: function() {
					return this._writableState.length
				}
			}), Object.defineProperty(ci.prototype, "destroyed", {
				enumerable: !1,
				get: function() {
					return void 0 !== this._readableState && void 0 !== this._writableState && this
						._readableState.destroyed && this._writableState.destroyed
				},
				set: function(t) {
					void 0 !== this._readableState && void 0 !== this._writableState && (this
						._readableState.destroyed = t, this._writableState.destroyed = t)
				}
			})
		}()), ii
	}
	var mi, bi, gi, vi, yi = !1;

	function wi(t) {
		var e;
		switch (this.encoding = function(t) {
			var e = function(t) {
				if (!t) return "utf8";
				for (var e;;) switch (t) {
					case "utf8":
					case "utf-8":
						return "utf8";
					case "ucs2":
					case "ucs-2":
					case "utf16le":
					case "utf-16le":
						return "utf16le";
					case "latin1":
					case "binary":
						return "latin1";
					case "base64":
					case "ascii":
					case "hex":
						return t;
					default:
						if (e) return;
						t = ("" + t).toLowerCase(), e = !0
				}
			}(t);
			if ("string" != typeof e && (bi.isEncoding === gi || !gi(t))) throw new Error("Unknown encoding: " + t);
			return e || t
		}(t), this.encoding) {
			case "utf16le":
				this.text = Si, this.end = ki, e = 4;
				break;
			case "utf8":
				this.fillLast = Ai, e = 4;
				break;
			case "base64":
				this.text = Bi, this.end = Ti, e = 3;
				break;
			default:
				return this.write = Ri, void(this.end = xi)
		}
		this.lastNeed = 0, this.lastTotal = 0, this.lastChar = bi.allocUnsafe(e)
	}

	function _i(t) {
		return t <= 127 ? 0 : t >> 5 == 6 ? 2 : t >> 4 == 14 ? 3 : t >> 3 == 30 ? 4 : t >> 6 == 2 ? -1 : -2
	}

	function Ai(t) {
		var e = this.lastTotal - this.lastNeed,
			r = function(t, e, r) {
				if (128 != (192 & e[0])) return t.lastNeed = 0, "�";
				if (t.lastNeed > 1 && e.length > 1) {
					if (128 != (192 & e[1])) return t.lastNeed = 1, "�";
					if (t.lastNeed > 2 && e.length > 2 && 128 != (192 & e[2])) return t.lastNeed = 2, "�"
				}
			}(this, t);
		return void 0 !== r ? r : this.lastNeed <= t.length ? (t.copy(this.lastChar, e, 0, this.lastNeed), this.lastChar
			.toString(this.encoding, 0, this.lastTotal)) : (t.copy(this.lastChar, e, 0, t.length), void(this
			.lastNeed -= t.length))
	}

	function Mi(t, e) {
		var r = function(t, e, r) {
			var n = e.length - 1;
			if (n < r) return 0;
			var i = _i(e[n]);
			return i >= 0 ? (i > 0 && (t.lastNeed = i - 1), i) : --n < r || -2 === i ? 0 : (i = _i(e[n])) >= 0 ? (
				i > 0 && (t.lastNeed = i - 2), i) : --n < r || -2 === i ? 0 : (i = _i(e[n])) >= 0 ? (i > 0 && (
				2 === i ? i = 0 : t.lastNeed = i - 3), i) : 0
		}(this, t, e);
		if (!this.lastNeed) return t.toString("utf8", e);
		this.lastTotal = r;
		var n = t.length - (r - this.lastNeed);
		return t.copy(this.lastChar, 0, n), t.toString("utf8", e, n)
	}

	function Ei(t) {
		var e = t && t.length ? this.write(t) : "";
		return this.lastNeed ? e + "�" : e
	}

	function Si(t, e) {
		if ((t.length - e) % 2 == 0) {
			var r = t.toString("utf16le", e);
			if (r) {
				var n = r.charCodeAt(r.length - 1);
				if (n >= 55296 && n <= 56319) return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = t[t
					.length - 2], this.lastChar[1] = t[t.length - 1], r.slice(0, -1)
			}
			return r
		}
		return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = t[t.length - 1], t.toString("utf16le", e, t
			.length - 1)
	}

	function ki(t) {
		var e = t && t.length ? this.write(t) : "";
		if (this.lastNeed) {
			var r = this.lastTotal - this.lastNeed;
			return e + this.lastChar.toString("utf16le", 0, r)
		}
		return e
	}

	function Bi(t, e) {
		var r = (t.length - e) % 3;
		return 0 === r ? t.toString("base64", e) : (this.lastNeed = 3 - r, this.lastTotal = 3, 1 === r ? this.lastChar[
				0] = t[t.length - 1] : (this.lastChar[0] = t[t.length - 2], this.lastChar[1] = t[t.length - 1]), t
			.toString("base64", e, t.length - r))
	}

	function Ti(t) {
		var e = t && t.length ? this.write(t) : "";
		return this.lastNeed ? e + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : e
	}

	function Ri(t) {
		return t.toString(this.encoding)
	}

	function xi(t) {
		return t && t.length ? this.write(t) : ""
	}

	function Ci() {
		return yi || (yi = !0, mi = {}, bi = cr().Buffer, gi = bi.isEncoding || function(t) {
			switch ((t = "" + t) && t.toLowerCase()) {
				case "hex":
				case "utf8":
				case "utf-8":
				case "ascii":
				case "binary":
				case "base64":
				case "ucs2":
				case "ucs-2":
				case "utf16le":
				case "utf-16le":
				case "raw":
					return !0;
				default:
					return !1
			}
		}, vi = wi, mi.StringDecoder = vi, wi.prototype.write = function(t) {
			if (0 === t.length) return "";
			var e, r;
			if (this.lastNeed) {
				if (void 0 === (e = this.fillLast(t))) return "";
				r = this.lastNeed, this.lastNeed = 0
			} else r = 0;
			return r < t.length ? e ? e + this.text(t, r) : this.text(t, r) : e || ""
		}, wi.prototype.end = Ei, wi.prototype.text = Mi, wi.prototype.fillLast = function(t) {
			if (this.lastNeed <= t.length) return t.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this
				.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
			t.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, t.length), this.lastNeed -= t.length
		}), mi
	}
	var Ii, Di, Pi = !1;

	function Oi() {}

	function Li(t, e, r) {
		if ("function" == typeof e) return Li(t, null, e);
		e || (e = {}), r = function(t) {
			var e = !1;
			return function() {
				if (!e) {
					e = !0;
					for (var r = arguments.length, n = new Array(r), i = 0; i < r; i++) n[i] = arguments[i];
					t.apply(this, n)
				}
			}
		}(r || Oi);
		var n = e.readable || !1 !== e.readable && t.readable,
			i = e.writable || !1 !== e.writable && t.writable,
			o = function() {
				t.writable || s()
			},
			a = t._writableState && t._writableState.finished,
			s = function() {
				i = !1, a = !0, n || r.call(t)
			},
			f = t._readableState && t._readableState.endEmitted,
			u = function() {
				n = !1, f = !0, i || r.call(t)
			},
			h = function(e) {
				r.call(t, e)
			},
			c = function() {
				var e;
				return n && !f ? (t._readableState && t._readableState.ended || (e = new Di), r.call(t, e)) : i && !a ?
					(t._writableState && t._writableState.ended || (e = new Di), r.call(t, e)) : void 0
			},
			d = function() {
				t.req.on("finish", s)
			};
		return ! function(t) {
				return t.setHeader && "function" == typeof t.abort
			}(t) ? i && !t._writableState && (t.on("end", o), t.on("close", o)) : (t.on("complete", s), t.on("abort",
				c), t.req ? d() : t.on("request", d)), t.on("end", u), t.on("finish", s), !1 !== e.error && t.on(
				"error", h), t.on("close", c),
			function() {
				t.removeListener("complete", s), t.removeListener("abort", c), t.removeListener("request", d), t.req &&
					t.req.removeListener("finish", s), t.removeListener("end", o), t.removeListener("close", o), t
					.removeListener("finish", s), t.removeListener("end", u), t.removeListener("error", h), t
					.removeListener("close", c)
			}
	}

	function Ui() {
		return Pi || (Pi = !0, Ii = {}, Di = mn().codes.ERR_STREAM_PREMATURE_CLOSE, Ii = Li), Ii
	}
	var ji, Ni, zi, Fi, qi, Hi, Wi, Gi, Yi, Ki, Vi, Zi, $i = !1;

	function Xi(t, e, r) {
		return e in t ? Object.defineProperty(t, e, {
			value: r,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : t[e] = r, t
	}

	function Ji(t, e) {
		return {
			value: t,
			done: e
		}
	}

	function Qi(t) {
		var e = t[Fi];
		if (null !== e) {
			var r = t[Ki].read();
			null !== r && (t[Gi] = null, t[Fi] = null, t[qi] = null, e(Ji(r, !1)))
		}
	}

	function to(t) {
		Ut().nextTick(Qi, t)
	}

	function eo() {
		ji = {}, Ut(), zi = Ui(), Fi = Symbol("lastResolve"), qi = Symbol("lastReject"), Hi = Symbol("error"), Wi =
			Symbol("ended"), Gi = Symbol("lastPromise"), Yi = Symbol("handlePromise"), Ki = Symbol("stream"), Vi =
			Object.getPrototypeOf((function() {})), Zi = Object.setPrototypeOf((Xi(Ni = {
				get stream() {
					return this[Ki]
				},
				next: function() {
					var t = this,
						e = this[Hi];
					if (null !== e) return Promise.reject(e);
					if (this[Wi]) return Promise.resolve(Ji(void 0, !0));
					if (this[Ki].destroyed) return new Promise((function(e, r) {
						Ut().nextTick((function() {
							t[Hi] ? r(t[Hi]) : e(Ji(void 0, !0))
						}))
					}));
					var r, n = this[Gi];
					if (n) r = new Promise(function(t, e) {
						return function(r, n) {
							t.then((function() {
								e[Wi] ? r(Ji(void 0, !0)) : e[Yi](r, n)
							}), n)
						}
					}(n, this));
					else {
						var i = this[Ki].read();
						if (null !== i) return Promise.resolve(Ji(i, !1));
						r = new Promise(this[Yi])
					}
					return this[Gi] = r, r
				}
			}, Symbol.asyncIterator, (function() {
				return this
			})), Xi(Ni, "return", (function() {
				var t = this;
				return new Promise((function(e, r) {
					t[Ki].destroy(null, (function(t) {
						t ? r(t) : e(Ji(void 0, !0))
					}))
				}))
			})), Ni), Vi), ji = function(t) {
				var e, r = Object.create(Zi, (Xi(e = {}, Ki, {
					value: t,
					writable: !0
				}), Xi(e, Fi, {
					value: null,
					writable: !0
				}), Xi(e, qi, {
					value: null,
					writable: !0
				}), Xi(e, Hi, {
					value: null,
					writable: !0
				}), Xi(e, Wi, {
					value: t._readableState.endEmitted,
					writable: !0
				}), Xi(e, Yi, {
					value: function(t, e) {
						var n = r[Ki].read();
						n ? (r[Gi] = null, r[Fi] = null, r[qi] = null, t(Ji(n, !1))) : (r[Fi] = t,
							r[qi] = e)
					},
					writable: !0
				}), e));
				return r[Gi] = null, zi(t, (function(t) {
					if (t && "ERR_STREAM_PREMATURE_CLOSE" !== t.code) {
						var e = r[qi];
						return null !== e && (r[Gi] = null, r[Fi] = null, r[qi] = null, e(t)), void(r[Hi] =
							t)
					}
					var n = r[Fi];
					null !== n && (r[Gi] = null, r[Fi] = null, r[qi] = null, n(Ji(void 0, !0))), r[Wi] = !0
				})), t.on("readable", to.bind(null, r)), r
			}
	}
	var ro, no = !1;

	function io() {
		return no || (no = !0, ro = {}, ro = function() {
			throw new Error("Readable.from is not available in the browser")
		}), ro
	}
	var oo, ao, so, fo, uo, ho, co, lo, po, mo, bo, go, vo, yo, wo, _o, Ao, Mo, Eo, So, ko, Bo = !1;

	function To(t, e, r) {
		ao = ao || pi(), t = t || {}, "boolean" != typeof r && (r = e instanceof ao), this.objectMode = !!t.objectMode,
			r && (this.objectMode = this.objectMode || !!t.readableObjectMode), this.highWaterMark = mo(this, t,
				"readableHighWaterMark", r), this.buffer = new po, this.length = 0, this.pipes = null, this.pipesCount =
			0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this
			.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this
			.paused = !0, this.emitClose = !1 !== t.emitClose, this.autoDestroy = !!t.autoDestroy, this.destroyed = !1,
			this.defaultEncoding = t.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this
			.decoder = null, this.encoding = null, t.encoding && (_o || (_o = Ci().StringDecoder), this.decoder =
				new _o(t.encoding), this.encoding = t.encoding)
	}

	function Ro(t) {
		if (ao = ao || pi(), !(this instanceof Ro)) return new Ro(t);
		var e = this instanceof ao;
		this._readableState = new To(t, this, e), this.readable = !0, t && ("function" == typeof t.read && (this._read =
			t.read), "function" == typeof t.destroy && (this._destroy = t.destroy)), fo.call(this)
	}

	function xo(t, e, r, n, i) {
		lo("readableAddChunk", e);
		var o, a = t._readableState;
		if (null === e) a.reading = !1,
			function(t, e) {
				if (lo("onEofChunk"), e.ended) return;
				if (e.decoder) {
					var r = e.decoder.end();
					r && r.length && (e.buffer.push(r), e.length += e.objectMode ? 1 : r.length)
				}
				e.ended = !0, e.sync ? Do(t) : (e.needReadable = !1, e.emittedReadable || (e.emittedReadable = !0, Po(
					t)))
			}(t, a);
		else if (i || (o = function(t, e) {
				var r;
				n = e, uo.isBuffer(n) || n instanceof ho || "string" == typeof e || void 0 === e || t.objectMode ||
					(r = new go("chunk", ["string", "Buffer", "Uint8Array"], e));
				var n;
				return r
			}(a, e)), o) Eo(t, o);
		else if (a.objectMode || e && e.length > 0)
			if ("string" == typeof e || a.objectMode || Object.getPrototypeOf(e) === uo.prototype || (e = function(t) {
					return uo.from(t)
				}(e)), n) a.endEmitted ? Eo(t, new wo) : Co(t, a, e, !0);
			else if (a.ended) Eo(t, new vo);
		else {
			if (a.destroyed) return !1;
			a.reading = !1, a.decoder && !r ? (e = a.decoder.write(e), a.objectMode || 0 !== e.length ? Co(t, a, e, !
				1) : Oo(t, a)) : Co(t, a, e, !1)
		} else n || (a.reading = !1, Oo(t, a));
		return !a.ended && (a.length < a.highWaterMark || 0 === a.length)
	}

	function Co(t, e, r, n) {
		e.flowing && 0 === e.length && !e.sync ? (e.awaitDrain = 0, t.emit("data", r)) : (e.length += e.objectMode ? 1 :
			r.length, n ? e.buffer.unshift(r) : e.buffer.push(r), e.needReadable && Do(t)), Oo(t, e)
	}

	function Io(t, e) {
		return t <= 0 || 0 === e.length && e.ended ? 0 : e.objectMode ? 1 : t != t ? e.flowing && e.length ? e.buffer
			.head.data.length : e.length : (t > e.highWaterMark && (e.highWaterMark = function(t) {
				return t >= ko ? t = ko : (t--, t |= t >>> 1, t |= t >>> 2, t |= t >>> 4, t |= t >>> 8, t |=
					t >>> 16, t++), t
			}(t)), t <= e.length ? t : e.ended ? e.length : (e.needReadable = !0, 0))
	}

	function Do(t) {
		var e = t._readableState;
		lo("emitReadable", e.needReadable, e.emittedReadable), e.needReadable = !1, e.emittedReadable || (lo(
			"emitReadable", e.flowing), e.emittedReadable = !0, Ut().nextTick(Po, t))
	}

	function Po(t) {
		var e = t._readableState;
		lo("emitReadable_", e.destroyed, e.length, e.ended), e.destroyed || !e.length && !e.ended || (t.emit(
				"readable"), e.emittedReadable = !1), e.needReadable = !e.flowing && !e.ended && e.length <= e
			.highWaterMark, zo(t)
	}

	function Oo(t, e) {
		e.readingMore || (e.readingMore = !0, Ut().nextTick(Lo, t, e))
	}

	function Lo(t, e) {
		for (; !e.reading && !e.ended && (e.length < e.highWaterMark || e.flowing && 0 === e.length);) {
			var r = e.length;
			if (lo("maybeReadMore read 0"), t.read(0), r === e.length) break
		}
		e.readingMore = !1
	}

	function Uo(t) {
		var e = t._readableState;
		e.readableListening = t.listenerCount("readable") > 0, e.resumeScheduled && !e.paused ? e.flowing = !0 : t
			.listenerCount("data") > 0 && t.resume()
	}

	function jo(t) {
		lo("readable nexttick read 0"), t.read(0)
	}

	function No(t, e) {
		lo("resume", e.reading), e.reading || t.read(0), e.resumeScheduled = !1, t.emit("resume"), zo(t), e.flowing && !
			e.reading && t.read(0)
	}

	function zo(t) {
		var e = t._readableState;
		for (lo("flow", e.flowing); e.flowing && null !== t.read(););
	}

	function Fo(t, e) {
		return 0 === e.length ? null : (e.objectMode ? r = e.buffer.shift() : !t || t >= e.length ? (r = e.decoder ? e
			.buffer.join("") : 1 === e.buffer.length ? e.buffer.first() : e.buffer.concat(e.length), e.buffer
			.clear()) : r = e.buffer.consume(t, e.decoder), r);
	}

	function qo(t) {
		var e = t._readableState;
		lo("endReadable", e.endEmitted), e.endEmitted || (e.ended = !0, Ut().nextTick(Ho, e, t))
	}

	function Ho(t, e) {
		if (lo("endReadableNT", t.endEmitted, t.length), !t.endEmitted && 0 === t.length && (t.endEmitted = !0, e
				.readable = !1, e.emit("end"), t.autoDestroy)) {
			var r = e._writableState;
			(!r || r.autoDestroy && r.finished) && e.destroy()
		}
	}

	function Wo(t, e) {
		for (var r = 0, n = t.length; r < n; r++)
			if (t[r] === e) return r;
		return -1
	}

	function Go() {
		oo = {}, Ut(), oo = Ro, Ro.ReadableState = To, zr().EventEmitter, so = function(t, e) {
				return t.listeners(e).length
			}, fo = Hr(), uo = Ve().Buffer, ho = t.Uint8Array || function() {}, co = nr(), lo = co && co.debuglog ? co
			.debuglog("stream") : function() {}, Vr || (Vr = !0, Jr()), po = Wr, fn(), wn(), mo = wn().getHighWaterMark,
			bo = mn().codes, go = bo.ERR_INVALID_ARG_TYPE, vo = bo.ERR_STREAM_PUSH_AFTER_EOF, yo = bo
			.ERR_METHOD_NOT_IMPLEMENTED, wo = bo.ERR_STREAM_UNSHIFT_AFTER_END_EVENT, Mr()(Ro, fo), Eo = fn()
			.errorOrDestroy, So = ["error", "close", "destroy", "pause", "resume"], Object.defineProperty(Ro.prototype,
				"destroyed", {
					enumerable: !1,
					get: function() {
						return void 0 !== this._readableState && this._readableState.destroyed
					},
					set: function(t) {
						this._readableState && (this._readableState.destroyed = t)
					}
				}), Ro.prototype.destroy = fn().destroy, Ro.prototype._undestroy = fn().undestroy, Ro.prototype
			._destroy = function(t, e) {
				e(t)
			}, Ro.prototype.push = function(t, e) {
				var r, n = this._readableState;
				return n.objectMode ? r = !0 : "string" == typeof t && ((e = e || n.defaultEncoding) !== n.encoding && (
					t = uo.from(t, e), e = ""), r = !0), xo(this, t, e, !1, r)
			}, Ro.prototype.unshift = function(t) {
				return xo(this, t, null, !0, !1)
			}, Ro.prototype.isPaused = function() {
				return !1 === this._readableState.flowing
			}, Ro.prototype.setEncoding = function(t) {
				_o || (_o = Ci().StringDecoder);
				var e = new _o(t);
				this._readableState.decoder = e, this._readableState.encoding = this._readableState.decoder.encoding;
				for (var r = this._readableState.buffer.head, n = ""; null !== r;) n += e.write(r.data), r = r.next;
				return this._readableState.buffer.clear(), "" !== n && this._readableState.buffer.push(n), this
					._readableState.length = n.length, this
			}, ko = 1073741824, Ro.prototype.read = function(t) {
				lo("read", t), t = parseInt(t, 10);
				var e = this._readableState,
					r = t;
				if (0 !== t && (e.emittedReadable = !1), 0 === t && e.needReadable && ((0 !== e.highWaterMark ? e
						.length >= e.highWaterMark : e.length > 0) || e.ended)) return lo("read: emitReadable", e
					.length, e.ended), 0 === e.length && e.ended ? qo(this) : Do(this), null;
				if (0 === (t = Io(t, e)) && e.ended) return 0 === e.length && qo(this), null;
				var n, i = e.needReadable;
				return lo("need readable", i), (0 === e.length || e.length - t < e.highWaterMark) && lo(
						"length less than watermark", i = !0), e.ended || e.reading ? lo("reading or ended", i = !1) :
					i && (lo("do read"), e.reading = !0, e.sync = !0, 0 === e.length && (e.needReadable = !0), this
						._read(e.highWaterMark), e.sync = !1, e.reading || (t = Io(r, e))), null === (n = t > 0 ? Fo(t,
						e) : null) ? (e.needReadable = e.length <= e.highWaterMark, t = 0) : (e.length -= t, e
						.awaitDrain = 0), 0 === e.length && (e.ended || (e.needReadable = !0), r !== t && e.ended && qo(
						this)), null !== n && this.emit("data", n), n
			}, Ro.prototype._read = function(t) {
				Eo(this, new yo("_read()"))
			}, Ro.prototype.pipe = function(t, e) {
				var r = this,
					n = this._readableState;
				switch (n.pipesCount) {
					case 0:
						n.pipes = t;
						break;
					case 1:
						n.pipes = [n.pipes, t];
						break;
					default:
						n.pipes.push(t)
				}
				n.pipesCount += 1, lo("pipe count=%d opts=%j", n.pipesCount, e);
				var i = (!e || !1 !== e.end) && t !== Ut().stdout && t !== Ut().stderr ? a : l;

				function o(e, i) {
					lo("onunpipe"), e === r && i && !1 === i.hasUnpiped && (i.hasUnpiped = !0, lo("cleanup"), t
						.removeListener("close", c), t.removeListener("finish", d), t.removeListener("drain", s), t
						.removeListener("error", h), t.removeListener("unpipe", o), r.removeListener("end", a), r
						.removeListener("end", l), r.removeListener("data", u), f = !0, !n.awaitDrain || t
						._writableState && !t._writableState.needDrain || s())
				}

				function a() {
					lo("onend"), t.end()
				}
				n.endEmitted ? Ut().nextTick(i) : r.once("end", i), t.on("unpipe", o);
				var s = function(t) {
					return function() {
						var e = t._readableState;
						lo("pipeOnDrain", e.awaitDrain), e.awaitDrain && e.awaitDrain--, 0 === e.awaitDrain &&
							so(t, "data") && (e.flowing = !0, zo(t))
					}
				}(r);
				t.on("drain", s);
				var f = !1;

				function u(e) {
					lo("ondata");
					var i = t.write(e);
					lo("dest.write", i), !1 === i && ((1 === n.pipesCount && n.pipes === t || n.pipesCount > 1 && -1 !==
						Wo(n.pipes, t)) && !f && (lo("false write response, pause", n.awaitDrain), n
						.awaitDrain++), r.pause())
				}

				function h(e) {
					lo("onerror", e), l(), t.removeListener("error", h), 0 === so(t, "error") && Eo(t, e)
				}

				function c() {
					t.removeListener("finish", d), l()
				}

				function d() {
					lo("onfinish"), t.removeListener("close", c), l()
				}

				function l() {
					lo("unpipe"), r.unpipe(t)
				}
				return r.on("data", u),
					function(t, e, r) {
						if ("function" == typeof t.prependListener) return t.prependListener(e, r);
						t._events && t._events[e] ? Array.isArray(t._events[e]) ? t._events[e].unshift(r) : t._events[
							e] = [r, t._events[e]] : t.on(e, r)
					}(t, "error", h), t.once("close", c), t.once("finish", d), t.emit("pipe", r), n.flowing || (lo(
						"pipe resume"), r.resume()), t
			}, Ro.prototype.unpipe = function(t) {
				var e = this._readableState,
					r = {
						hasUnpiped: !1
					};
				if (0 === e.pipesCount) return this;
				if (1 === e.pipesCount) return t && t !== e.pipes || (t || (t = e.pipes), e.pipes = null, e.pipesCount =
					0, e.flowing = !1, t && t.emit("unpipe", this, r)), this;
				if (!t) {
					var n = e.pipes,
						i = e.pipesCount;
					e.pipes = null, e.pipesCount = 0, e.flowing = !1;
					for (var o = 0; o < i; o++) n[o].emit("unpipe", this, {
						hasUnpiped: !1
					});
					return this
				}
				var a = Wo(e.pipes, t);
				return -1 === a || (e.pipes.splice(a, 1), e.pipesCount -= 1, 1 === e.pipesCount && (e.pipes = e.pipes[
					0]), t.emit("unpipe", this, r)), this
			}, Ro.prototype.on = function(t, e) {
				var r = fo.prototype.on.call(this, t, e),
					n = this._readableState;
				return "data" === t ? (n.readableListening = this.listenerCount("readable") > 0, !1 !== n.flowing &&
					this.resume()) : "readable" === t && (n.endEmitted || n.readableListening || (n
					.readableListening = n.needReadable = !0, n.flowing = !1, n.emittedReadable = !1, lo(
						"on readable", n.length, n.reading), n.length ? Do(this) : n.reading || Ut().nextTick(
						jo, this))), r
			}, Ro.prototype.addListener = Ro.prototype.on, Ro.prototype.removeListener = function(t, e) {
				var r = fo.prototype.removeListener.call(this, t, e);
				return "readable" === t && Ut().nextTick(Uo, this), r
			}, Ro.prototype.removeAllListeners = function(t) {
				var e = fo.prototype.removeAllListeners.apply(this, arguments);
				return "readable" !== t && void 0 !== t || Ut().nextTick(Uo, this), e
			}, Ro.prototype.resume = function() {
				var t = this._readableState;
				return t.flowing || (lo("resume"), t.flowing = !t.readableListening, function(t, e) {
					e.resumeScheduled || (e.resumeScheduled = !0, Ut().nextTick(No, t, e))
				}(this, t)), t.paused = !1, this
			}, Ro.prototype.pause = function() {
				return lo("call pause flowing=%j", this._readableState.flowing), !1 !== this._readableState.flowing && (
						lo("pause"), this._readableState.flowing = !1, this.emit("pause")), this._readableState
					.paused = !0, this
			}, Ro.prototype.wrap = function(t) {
				var e = this,
					r = this._readableState,
					n = !1;
				for (var i in t.on("end", (function() {
						if (lo("wrapped end"), r.decoder && !r.ended) {
							var t = r.decoder.end();
							t && t.length && e.push(t)
						}
						e.push(null)
					})), t.on("data", (function(i) {
						(lo("wrapped data"), r.decoder && (i = r.decoder.write(i)), r.objectMode && null ==
							i) || (r.objectMode || i && i.length) && (e.push(i) || (n = !0, t.pause()))
					})), t) void 0 === this[i] && "function" == typeof t[i] && (this[i] = function(e) {
					return function() {
						return t[e].apply(t, arguments)
					}
				}(i));
				for (var o = 0; o < So.length; o++) t.on(So[o], this.emit.bind(this, So[o]));
				return this._read = function(e) {
					lo("wrapped _read", e), n && (n = !1, t.resume())
				}, this
			}, "function" == typeof Symbol && (Ro.prototype[Symbol.asyncIterator] = function() {
				return void 0 === Ao && ($i || ($i = !0, eo()), Ao = ji), Ao(this)
			}), Object.defineProperty(Ro.prototype, "readableHighWaterMark", {
				enumerable: !1,
				get: function() {
					return this._readableState.highWaterMark
				}
			}), Object.defineProperty(Ro.prototype, "readableBuffer", {
				enumerable: !1,
				get: function() {
					return this._readableState && this._readableState.buffer
				}
			}), Object.defineProperty(Ro.prototype, "readableFlowing", {
				enumerable: !1,
				get: function() {
					return this._readableState.flowing
				},
				set: function(t) {
					this._readableState && (this._readableState.flowing = t)
				}
			}), Ro._fromList = Fo, Object.defineProperty(Ro.prototype, "readableLength", {
				enumerable: !1,
				get: function() {
					return this._readableState.length
				}
			}), "function" == typeof Symbol && (Ro.from = function(t, e) {
				return void 0 === Mo && (Mo = io()), Mo(Ro, t, e)
			})
	}

	function Yo() {
		return Bo || (Bo = !0, Go()), oo
	}
	var Ko, Vo, Zo, $o, Xo, Jo, Qo, ta = !1;

	function ea(t, e) {
		var r = this._transformState;
		r.transforming = !1;
		var n = r.writecb;
		if (null === n) return this.emit("error", new $o);
		r.writechunk = null, r.writecb = null, null != e && this.push(e), n(t);
		var i = this._readableState;
		i.reading = !1, (i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark)
	}

	function ra(t) {
		if (!(this instanceof ra)) return new ra(t);
		Qo.call(this, t), this._transformState = {
				afterTransform: ea.bind(this),
				needTransform: !1,
				transforming: !1,
				writecb: null,
				writechunk: null,
				writeencoding: null
			}, this._readableState.needReadable = !0, this._readableState.sync = !1, t && ("function" == typeof t
				.transform && (this._transform = t.transform), "function" == typeof t.flush && (this._flush = t.flush)),
			this.on("prefinish", na)
	}

	function na() {
		var t = this;
		"function" != typeof this._flush || this._readableState.destroyed ? ia(this, null, null) : this._flush((
			function(e, r) {
				ia(t, e, r)
			}))
	}

	function ia(t, e, r) {
		if (e) return t.emit("error", e);
		if (null != r && t.push(r), t._writableState.length) throw new Jo;
		if (t._transformState.transforming) throw new Xo;
		return t.push(null)
	}

	function oa() {
		return ta || (ta = !0, Ko = {}, Ko = ra, Vo = mn().codes, Zo = Vo.ERR_METHOD_NOT_IMPLEMENTED, $o = Vo
			.ERR_MULTIPLE_CALLBACK, Xo = Vo.ERR_TRANSFORM_ALREADY_TRANSFORMING, Jo = Vo.ERR_TRANSFORM_WITH_LENGTH_0,
			Qo = pi(), Mr()(ra, Qo), ra.prototype.push = function(t, e) {
				return this._transformState.needTransform = !1, Qo.prototype.push.call(this, t, e)
			}, ra.prototype._transform = function(t, e, r) {
				r(new Zo("_transform()"))
			}, ra.prototype._write = function(t, e, r) {
				var n = this._transformState;
				if (n.writecb = r, n.writechunk = t, n.writeencoding = e, !n.transforming) {
					var i = this._readableState;
					(n.needTransform || i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark)
				}
			}, ra.prototype._read = function(t) {
				var e = this._transformState;
				null === e.writechunk || e.transforming ? e.needTransform = !0 : (e.transforming = !0, this
					._transform(e.writechunk, e.writeencoding, e.afterTransform))
			}, ra.prototype._destroy = function(t, e) {
				Qo.prototype._destroy.call(this, t, (function(t) {
					e(t)
				}))
			}), Ko
	}
	var aa, sa, fa = !1;

	function ua(t) {
		if (!(this instanceof ua)) return new ua(t);
		sa.call(this, t)
	}

	function ha() {
		return fa || (fa = !0, aa = {}, aa = ua, sa = oa(), Mr()(ua, sa), ua.prototype._transform = function(t, e, r) {
			r(null, t)
		}), aa
	}
	var ca, da, la, pa, ma, ba = !1;

	function ga(t) {
		if (t) throw t
	}

	function va(t, e, r, n) {
		n = function(t) {
			var e = !1;
			return function() {
				e || (e = !0, t.apply(void 0, arguments))
			}
		}(n);
		var i = !1;
		t.on("close", (function() {
			i = !0
		})), void 0 === da && (da = Ui()), da(t, {
			readable: e,
			writable: r
		}, (function(t) {
			if (t) return n(t);
			i = !0, n()
		}));
		var o = !1;
		return function(e) {
			if (!i && !o) return o = !0,
				function(t) {
					return t.setHeader && "function" == typeof t.abort
				}(t) ? t.abort() : "function" == typeof t.destroy ? t.destroy() : void n(e || new ma("pipe"))
		}
	}

	function ya(t) {
		t()
	}

	function wa(t, e) {
		return t.pipe(e)
	}

	function _a(t) {
		return t.length ? "function" != typeof t[t.length - 1] ? ga : t.pop() : ga
	}

	function Aa() {
		for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++) e[r] = arguments[r];
		var n, i = _a(e);
		if (Array.isArray(e[0]) && (e = e[0]), e.length < 2) throw new pa("streams");
		var o = e.map((function(t, r) {
			var a = r < e.length - 1;
			return va(t, a, r > 0, (function(t) {
				n || (n = t), t && o.forEach(ya), a || (o.forEach(ya), i(n))
			}))
		}));
		return e.reduce(wa)
	}

	function Ma() {
		return ba || (ba = !0, ca = {}, la = mn().codes, pa = la.ERR_MISSING_ARGS, ma = la.ERR_STREAM_DESTROYED, ca =
			Aa), ca
	}
	var Ea, Sa, ka, Ba, Ta, Ra, xa, Ca, Ia, Da, Pa = !1;

	function Oa() {
		return Pa || (Pa = !0, Sa = {}, Ea = Sa = Yo(), ka = Ea, Sa.Stream = ka, Ba = Ea, Sa.Readable = Ba, Ta = ni(),
			Sa.Writable = Ta, Ra = pi(), Sa.Duplex = Ra, xa = oa(), Sa.Transform = xa, Ca = ha(), Sa.PassThrough =
			Ca, Ia = Ui(), Sa.finished = Ia, Da = Ma(), Sa.pipeline = Da), Sa
	}
	var La, Ua, ja, Na = !1;

	function za(t) {
		ja.call(this), this._block = Ua.allocUnsafe(t), this._blockSize = t, this._blockOffset = 0, this._length = [0,
			0, 0, 0
		], this._finalized = !1
	}

	function Fa() {
		La = {}, Ua = cr().Buffer, ja = Oa().Transform, Mr()(za, ja), za.prototype._transform = function(t, e, r) {
			var n = null;
			try {
				this.update(t, e)
			} catch (t) {
				n = t
			}
			r(n)
		}, za.prototype._flush = function(t) {
			var e = null;
			try {
				this.push(this.digest())
			} catch (t) {
				e = t
			}
			t(e)
		}, za.prototype.update = function(t, e) {
			if (function(t, e) {
					if (!Ua.isBuffer(t) && "string" != typeof t) throw new TypeError(e +
						" must be a string or a buffer")
				}(t, "Data"), this._finalized) throw new Error("Digest already called");
			Ua.isBuffer(t) || (t = Ua.from(t, e));
			for (var r = this._block, n = 0; this._blockOffset + t.length - n >= this._blockSize;) {
				for (var i = this._blockOffset; i < this._blockSize;) r[i++] = t[n++];
				this._update(), this._blockOffset = 0
			}
			for (; n < t.length;) r[this._blockOffset++] = t[n++];
			for (var o = 0, a = 8 * t.length; a > 0; ++o) this._length[o] += a, (a = this._length[o] / 4294967296 |
				0) > 0 && (this._length[o] -= 4294967296 * a);
			return this
		}, za.prototype._update = function() {
			throw new Error("_update is not implemented")
		}, za.prototype.digest = function(t) {
			if (this._finalized) throw new Error("Digest already called");
			this._finalized = !0;
			var e = this._digest();
			void 0 !== t && (e = e.toString(t)), this._block.fill(0), this._blockOffset = 0;
			for (var r = 0; r < 4; ++r) this._length[r] = 0;
			return e
		}, za.prototype._digest = function() {
			throw new Error("_digest is not implemented")
		}, La = za
	}

	function qa() {
		return Na || (Na = !0, Fa()), La
	}
	var Ha, Wa, Ga, Ya, Ka, Va = !1;

	function Za() {
		Ga.call(this, 64), this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878
	}

	function $a(t, e) {
		return t << e | t >>> 32 - e
	}

	function Xa(t, e, r, n, i, o, a) {
		return $a(t + (e & r | ~e & n) + i + o | 0, a) + e | 0
	}

	function Ja(t, e, r, n, i, o, a) {
		return $a(t + (e & n | r & ~n) + i + o | 0, a) + e | 0
	}

	function Qa(t, e, r, n, i, o, a) {
		return $a(t + (e ^ r ^ n) + i + o | 0, a) + e | 0
	}

	function ts(t, e, r, n, i, o, a) {
		return $a(t + (r ^ (e | ~n)) + i + o | 0, a) + e | 0
	}

	function es() {
		return Va || (Va = !0, Ha = {}, Wa = Mr(), Ga = qa(), Ya = cr().Buffer, Ka = new Array(16), Wa(Za, Ga), Za
			.prototype._update = function() {
				for (var t = Ka, e = 0; e < 16; ++e) t[e] = this._block.readInt32LE(4 * e);
				var r = this._a,
					n = this._b,
					i = this._c,
					o = this._d;
				r = Xa(r, n, i, o, t[0], 3614090360, 7), o = Xa(o, r, n, i, t[1], 3905402710, 12), i = Xa(i, o, r,
						n, t[2], 606105819, 17), n = Xa(n, i, o, r, t[3], 3250441966, 22), r = Xa(r, n, i, o, t[4],
						4118548399, 7), o = Xa(o, r, n, i, t[5], 1200080426, 12), i = Xa(i, o, r, n, t[6],
						2821735955, 17), n = Xa(n, i, o, r, t[7], 4249261313, 22), r = Xa(r, n, i, o, t[8],
						1770035416, 7), o = Xa(o, r, n, i, t[9], 2336552879, 12), i = Xa(i, o, r, n, t[10],
						4294925233, 17), n = Xa(n, i, o, r, t[11], 2304563134, 22), r = Xa(r, n, i, o, t[12],
						1804603682, 7), o = Xa(o, r, n, i, t[13], 4254626195, 12), i = Xa(i, o, r, n, t[14],
						2792965006, 17), r = Ja(r, n = Xa(n, i, o, r, t[15], 1236535329, 22), i, o, t[1],
						4129170786, 5), o = Ja(o, r, n, i, t[6], 3225465664, 9), i = Ja(i, o, r, n, t[11],
						643717713, 14), n = Ja(n, i, o, r, t[0], 3921069994, 20), r = Ja(r, n, i, o, t[5],
						3593408605, 5), o = Ja(o, r, n, i, t[10], 38016083, 9), i = Ja(i, o, r, n, t[15],
						3634488961, 14), n = Ja(n, i, o, r, t[4], 3889429448, 20), r = Ja(r, n, i, o, t[9],
						568446438, 5), o = Ja(o, r, n, i, t[14], 3275163606, 9), i = Ja(i, o, r, n, t[3],
						4107603335, 14), n = Ja(n, i, o, r, t[8], 1163531501, 20), r = Ja(r, n, i, o, t[13],
						2850285829, 5), o = Ja(o, r, n, i, t[2], 4243563512, 9), i = Ja(i, o, r, n, t[7],
						1735328473, 14), r = Qa(r, n = Ja(n, i, o, r, t[12], 2368359562, 20), i, o, t[5],
						4294588738, 4), o = Qa(o, r, n, i, t[8], 2272392833, 11), i = Qa(i, o, r, n, t[11],
						1839030562, 16), n = Qa(n, i, o, r, t[14], 4259657740, 23), r = Qa(r, n, i, o, t[1],
						2763975236, 4), o = Qa(o, r, n, i, t[4], 1272893353, 11), i = Qa(i, o, r, n, t[7],
						4139469664, 16), n = Qa(n, i, o, r, t[10], 3200236656, 23), r = Qa(r, n, i, o, t[13],
						681279174, 4), o = Qa(o, r, n, i, t[0], 3936430074, 11), i = Qa(i, o, r, n, t[3],
						3572445317, 16), n = Qa(n, i, o, r, t[6], 76029189, 23), r = Qa(r, n, i, o, t[9],
						3654602809, 4), o = Qa(o, r, n, i, t[12], 3873151461, 11), i = Qa(i, o, r, n, t[15],
						530742520, 16), r = ts(r, n = Qa(n, i, o, r, t[2], 3299628645, 23), i, o, t[0], 4096336452,
						6), o = ts(o, r, n, i, t[7], 1126891415, 10), i = ts(i, o, r, n, t[14], 2878612391, 15), n =
					ts(n, i, o, r, t[5], 4237533241, 21), r = ts(r, n, i, o, t[12], 1700485571, 6), o = ts(o, r, n,
						i, t[3], 2399980690, 10), i = ts(i, o, r, n, t[10], 4293915773, 15), n = ts(n, i, o, r, t[
						1], 2240044497, 21), r = ts(r, n, i, o, t[8], 1873313359, 6), o = ts(o, r, n, i, t[15],
						4264355552, 10), i = ts(i, o, r, n, t[6], 2734768916, 15), n = ts(n, i, o, r, t[13],
						1309151649, 21), r = ts(r, n, i, o, t[4], 4149444226, 6), o = ts(o, r, n, i, t[11],
						3174756917, 10), i = ts(i, o, r, n, t[2], 718787259, 15), n = ts(n, i, o, r, t[9],
						3951481745, 21), this._a = this._a + r | 0, this._b = this._b + n | 0, this._c = this._c +
					i | 0, this._d = this._d + o | 0
			}, Za.prototype._digest = function() {
				this._block[this._blockOffset++] = 128, this._blockOffset > 56 && (this._block.fill(0, this
						._blockOffset, 64), this._update(), this._blockOffset = 0), this._block.fill(0, this
						._blockOffset, 56), this._block.writeUInt32LE(this._length[0], 56), this._block
					.writeUInt32LE(this._length[1], 60), this._update();
				var t = Ya.allocUnsafe(16);
				return t.writeInt32LE(this._a, 0), t.writeInt32LE(this._b, 4), t.writeInt32LE(this._c, 8), t
					.writeInt32LE(this._d, 12), t
			}, Ha = Za), Ha
	}
	var rs, ns, is, os, as, ss, fs, us, hs, cs, ds, ls = !1;

	function ps() {
		os.call(this, 64), this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this
			._e = 3285377520
	}

	function ms(t, e) {
		return t << e | t >>> 32 - e
	}

	function bs(t, e, r, n, i, o, a, s) {
		return ms(t + (e ^ r ^ n) + o + a | 0, s) + i | 0
	}

	function gs(t, e, r, n, i, o, a, s) {
		return ms(t + (e & r | ~e & n) + o + a | 0, s) + i | 0
	}

	function vs(t, e, r, n, i, o, a, s) {
		return ms(t + ((e | ~r) ^ n) + o + a | 0, s) + i | 0
	}

	function ys(t, e, r, n, i, o, a, s) {
		return ms(t + (e & n | r & ~n) + o + a | 0, s) + i | 0
	}

	function ws(t, e, r, n, i, o, a, s) {
		return ms(t + (e ^ (r | ~n)) + o + a | 0, s) + i | 0
	}

	function _s() {
		return ls || (ls = !0, rs = {}, ns = Ve().Buffer, is = Mr(), os = qa(), as = new Array(16), ss = [0, 1, 2, 3, 4,
			5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10,
			14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
			4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13
		], fs = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12,
			4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12,
			2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11
		], us = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15,
			9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9,
			8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6
		], hs = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12,
			7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6,
			14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11
		], cs = [0, 1518500249, 1859775393, 2400959708, 2840853838], ds = [1352829926, 1548603684, 1836072691,
			2053994217, 0
		], is(ps, os), ps.prototype._update = function() {
			for (var t = as, e = 0; e < 16; ++e) t[e] = this._block.readInt32LE(4 * e);
			for (var r = 0 | this._a, n = 0 | this._b, i = 0 | this._c, o = 0 | this._d, a = 0 | this._e, s =
					0 | this._a, f = 0 | this._b, u = 0 | this._c, h = 0 | this._d, c = 0 | this._e, d = 0; d <
				80; d += 1) {
				var l, p;
				d < 16 ? (l = bs(r, n, i, o, a, t[ss[d]], cs[0], us[d]), p = ws(s, f, u, h, c, t[fs[d]], ds[0],
						hs[d])) : d < 32 ? (l = gs(r, n, i, o, a, t[ss[d]], cs[1], us[d]), p = ys(s, f, u, h, c,
						t[fs[d]], ds[1], hs[d])) : d < 48 ? (l = vs(r, n, i, o, a, t[ss[d]], cs[2], us[d]), p =
						vs(s, f, u, h, c, t[fs[d]], ds[2], hs[d])) : d < 64 ? (l = ys(r, n, i, o, a, t[ss[d]],
						cs[3], us[d]), p = gs(s, f, u, h, c, t[fs[d]], ds[3], hs[d])) : (l = ws(r, n, i, o, a,
						t[ss[d]], cs[4], us[d]), p = bs(s, f, u, h, c, t[fs[d]], ds[4], hs[d])), r = a, a = o,
					o = ms(i, 10), i = n, n = l, s = c, c = h, h = ms(u, 10), u = f, f = p
			}
			var m = this._b + i + h | 0;
			this._b = this._c + o + c | 0, this._c = this._d + a + s | 0, this._d = this._e + r + f | 0, this
				._e = this._a + n + u | 0, this._a = m
		}, ps.prototype._digest = function() {
			this._block[this._blockOffset++] = 128, this._blockOffset > 56 && (this._block.fill(0, this
					._blockOffset, 64), this._update(), this._blockOffset = 0), this._block.fill(0, this
					._blockOffset, 56), this._block.writeUInt32LE(this._length[0], 56), this._block
				.writeUInt32LE(this._length[1], 60), this._update();
			var t = ns.alloc ? ns.alloc(20) : new ns(20);
			return t.writeInt32LE(this._a, 0), t.writeInt32LE(this._b, 4), t.writeInt32LE(this._c, 8), t
				.writeInt32LE(this._d, 12), t.writeInt32LE(this._e, 16), t
		}, rs = ps), rs
	}
	var As, Ms, Es = !1;

	function Ss(t, e) {
		this._block = Ms.alloc(t), this._finalSize = e, this._blockSize = t, this._len = 0
	}

	function ks() {
		return Es || (Es = !0, As = {}, Ms = cr().Buffer, Ss.prototype.update = function(t, e) {
			"string" == typeof t && (e = e || "utf8", t = Ms.from(t, e));
			for (var r = this._block, n = this._blockSize, i = t.length, o = this._len, a = 0; a < i;) {
				for (var s = o % n, f = Math.min(i - a, n - s), u = 0; u < f; u++) r[s + u] = t[a + u];
				a += f, (o += f) % n == 0 && this._update(r)
			}
			return this._len += i, this
		}, Ss.prototype.digest = function(t) {
			var e = this._len % this._blockSize;
			this._block[e] = 128, this._block.fill(0, e + 1), e >= this._finalSize && (this._update(this
				._block), this._block.fill(0));
			var r = 8 * this._len;
			if (r <= 4294967295) this._block.writeUInt32BE(r, this._blockSize - 4);
			else {
				var n = (4294967295 & r) >>> 0,
					i = (r - n) / 4294967296;
				this._block.writeUInt32BE(i, this._blockSize - 8), this._block.writeUInt32BE(n, this
					._blockSize - 4)
			}
			this._update(this._block);
			var o = this._hash();
			return t ? o.toString(t) : o
		}, Ss.prototype._update = function() {
			throw new Error("_update must be implemented by subclass")
		}, As = Ss), As
	}
	var Bs, Ts, Rs, xs, Cs, Is, Ds = !1;

	function Ps() {
		this.init(), this._w = Is, Rs.call(this, 64, 56)
	}

	function Os(t) {
		return t << 30 | t >>> 2
	}

	function Ls(t, e, r, n) {
		return 0 === t ? e & r | ~e & n : 2 === t ? e & r | e & n | r & n : e ^ r ^ n
	}

	function Us() {
		return Ds || (Ds = !0, Bs = {}, Ts = Mr(), Rs = ks(), xs = cr().Buffer, Cs = [1518500249, 1859775393, -
			1894007588, -899497514
		], Is = new Array(80), Ts(Ps, Rs), Ps.prototype.init = function() {
			return this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this
				._e = 3285377520, this
		}, Ps.prototype._update = function(t) {
			for (var e, r = this._w, n = 0 | this._a, i = 0 | this._b, o = 0 | this._c, a = 0 | this._d, s = 0 |
					this._e, f = 0; f < 16; ++f) r[f] = t.readInt32BE(4 * f);
			for (; f < 80; ++f) r[f] = r[f - 3] ^ r[f - 8] ^ r[f - 14] ^ r[f - 16];
			for (var u = 0; u < 80; ++u) {
				var h = ~~(u / 20),
					c = 0 | ((e = n) << 5 | e >>> 27) + Ls(h, i, o, a) + s + r[u] + Cs[h];
				s = a, a = o, o = Os(i), i = n, n = c
			}
			this._a = n + this._a | 0, this._b = i + this._b | 0, this._c = o + this._c | 0, this._d = a + this
				._d | 0, this._e = s + this._e | 0
		}, Ps.prototype._hash = function() {
			var t = xs.allocUnsafe(20);
			return t.writeInt32BE(0 | this._a, 0), t.writeInt32BE(0 | this._b, 4), t.writeInt32BE(0 | this._c,
				8), t.writeInt32BE(0 | this._d, 12), t.writeInt32BE(0 | this._e, 16), t
		}, Bs = Ps), Bs
	}
	var js, Ns, zs, Fs, qs, Hs, Ws = !1;

	function Gs() {
		this.init(), this._w = Hs, zs.call(this, 64, 56)
	}

	function Ys(t) {
		return t << 5 | t >>> 27
	}

	function Ks(t) {
		return t << 30 | t >>> 2
	}

	function Vs(t, e, r, n) {
		return 0 === t ? e & r | ~e & n : 2 === t ? e & r | e & n | r & n : e ^ r ^ n
	}

	function Zs() {
		return Ws || (Ws = !0, js = {}, Ns = Mr(), zs = ks(), Fs = cr().Buffer, qs = [1518500249, 1859775393, -
			1894007588, -899497514
		], Hs = new Array(80), Ns(Gs, zs), Gs.prototype.init = function() {
			return this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this
				._e = 3285377520, this
		}, Gs.prototype._update = function(t) {
			for (var e, r = this._w, n = 0 | this._a, i = 0 | this._b, o = 0 | this._c, a = 0 | this._d, s = 0 |
					this._e, f = 0; f < 16; ++f) r[f] = t.readInt32BE(4 * f);
			for (; f < 80; ++f) r[f] = (e = r[f - 3] ^ r[f - 8] ^ r[f - 14] ^ r[f - 16]) << 1 | e >>> 31;
			for (var u = 0; u < 80; ++u) {
				var h = ~~(u / 20),
					c = Ys(n) + Vs(h, i, o, a) + s + r[u] + qs[h] | 0;
				s = a, a = o, o = Ks(i), i = n, n = c
			}
			this._a = n + this._a | 0, this._b = i + this._b | 0, this._c = o + this._c | 0, this._d = a + this
				._d | 0, this._e = s + this._e | 0
		}, Gs.prototype._hash = function() {
			var t = Fs.allocUnsafe(20);
			return t.writeInt32BE(0 | this._a, 0), t.writeInt32BE(0 | this._b, 4), t.writeInt32BE(0 | this._c,
				8), t.writeInt32BE(0 | this._d, 12), t.writeInt32BE(0 | this._e, 16), t
		}, js = Gs), js
	}
	var $s, Xs, Js, Qs, tf, ef, rf = !1;

	function nf() {
		this.init(), this._w = ef, Js.call(this, 64, 56)
	}

	function of (t, e, r) {
		return r ^ t & (e ^ r)
	}

	function af(t, e, r) {
		return t & e | r & (t | e)
	}

	function sf(t) {
		return (t >>> 2 | t << 30) ^ (t >>> 13 | t << 19) ^ (t >>> 22 | t << 10)
	}

	function ff(t) {
		return (t >>> 6 | t << 26) ^ (t >>> 11 | t << 21) ^ (t >>> 25 | t << 7)
	}

	function uf(t) {
		return (t >>> 7 | t << 25) ^ (t >>> 18 | t << 14) ^ t >>> 3
	}

	function hf() {
		return rf || (rf = !0, $s = {}, Xs = Mr(), Js = ks(), Qs = cr().Buffer, tf = [1116352408, 1899447441,
			3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401,
			607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774,
			264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349,
			2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912,
			1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411,
			3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616,
			659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815,
			2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298
		], ef = new Array(64), Xs(nf, Js), nf.prototype.init = function() {
			return this._a = 1779033703, this._b = 3144134277, this._c = 1013904242, this._d = 2773480762, this
				._e = 1359893119, this._f = 2600822924, this._g = 528734635, this._h = 1541459225, this
		}, nf.prototype._update = function(t) {
			for (var e, r = this._w, n = 0 | this._a, i = 0 | this._b, o = 0 | this._c, a = 0 | this._d, s = 0 |
					this._e, f = 0 | this._f, u = 0 | this._g, h = 0 | this._h, c = 0; c < 16; ++c) r[c] = t
				.readInt32BE(4 * c);
			for (; c < 64; ++c) r[c] = 0 | (((e = r[c - 2]) >>> 17 | e << 15) ^ (e >>> 19 | e << 13) ^ e >>>
				10) + r[c - 7] + uf(r[c - 15]) + r[c - 16];
			for (var d = 0; d < 64; ++d) {
				var l = h + ff(s) + of (s, f, u) + tf[d] + r[d] | 0,
					p = sf(n) + af(n, i, o) | 0;
				h = u, u = f, f = s, s = a + l | 0, a = o, o = i, i = n, n = l + p | 0
			}
			this._a = n + this._a | 0, this._b = i + this._b | 0, this._c = o + this._c | 0, this._d = a + this
				._d | 0, this._e = s + this._e | 0, this._f = f + this._f | 0, this._g = u + this._g | 0, this
				._h = h + this._h | 0
		}, nf.prototype._hash = function() {
			var t = Qs.allocUnsafe(32);
			return t.writeInt32BE(this._a, 0), t.writeInt32BE(this._b, 4), t.writeInt32BE(this._c, 8), t
				.writeInt32BE(this._d, 12), t.writeInt32BE(this._e, 16), t.writeInt32BE(this._f, 20), t
				.writeInt32BE(this._g, 24), t.writeInt32BE(this._h, 28), t
		}, $s = nf), $s
	}
	var cf, df, lf, pf, mf, bf = !1;

	function gf() {
		this.init(), this._w = mf, ks().call(this, 64, 56)
	}

	function vf() {
		return bf || (bf = !0, cf = {}, df = Mr(), lf = hf(), ks(), pf = cr().Buffer, mf = new Array(64), df(gf, lf), gf
			.prototype.init = function() {
				return this._a = 3238371032, this._b = 914150663, this._c = 812702999, this._d = 4144912697, this
					._e = 4290775857, this._f = 1750603025, this._g = 1694076839, this._h = 3204075428, this
			}, gf.prototype._hash = function() {
				var t = pf.allocUnsafe(28);
				return t.writeInt32BE(this._a, 0), t.writeInt32BE(this._b, 4), t.writeInt32BE(this._c, 8), t
					.writeInt32BE(this._d, 12), t.writeInt32BE(this._e, 16), t.writeInt32BE(this._f, 20), t
					.writeInt32BE(this._g, 24), t
			}, cf = gf), cf
	}
	var yf, wf, _f, Af, Mf, Ef, Sf = !1;

	function kf() {
		this.init(), this._w = Ef, _f.call(this, 128, 112)
	}

	function Bf(t, e, r) {
		return r ^ t & (e ^ r)
	}

	function Tf(t, e, r) {
		return t & e | r & (t | e)
	}

	function Rf(t, e) {
		return (t >>> 28 | e << 4) ^ (e >>> 2 | t << 30) ^ (e >>> 7 | t << 25)
	}

	function xf(t, e) {
		return (t >>> 14 | e << 18) ^ (t >>> 18 | e << 14) ^ (e >>> 9 | t << 23)
	}

	function Cf(t, e) {
		return (t >>> 1 | e << 31) ^ (t >>> 8 | e << 24) ^ t >>> 7
	}

	function If(t, e) {
		return (t >>> 1 | e << 31) ^ (t >>> 8 | e << 24) ^ (t >>> 7 | e << 25)
	}

	function Df(t, e) {
		return (t >>> 19 | e << 13) ^ (e >>> 29 | t << 3) ^ t >>> 6
	}

	function Pf(t, e) {
		return (t >>> 19 | e << 13) ^ (e >>> 29 | t << 3) ^ (t >>> 6 | e << 26)
	}

	function Of(t, e) {
		return t >>> 0 < e >>> 0 ? 1 : 0
	}

	function Lf() {
		return Sf || (Sf = !0, yf = {}, wf = Mr(), _f = ks(), Af = cr().Buffer, Mf = [1116352408, 3609767458,
			1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472,
			1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394,
			310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383,
			2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458,
			4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901,
			1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339,
			2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026,
			3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964,
			773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390,
			1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460,
			2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344,
			3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752,
			506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427,
			1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012,
			2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344,
			2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900,
			3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554,
			174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971,
			1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948,
			4234509866, 1607167915, 987167468, 1816402316, 1246189591
		], Ef = new Array(160), wf(kf, _f), kf.prototype.init = function() {
			return this._ah = 1779033703, this._bh = 3144134277, this._ch = 1013904242, this._dh = 2773480762,
				this._eh = 1359893119, this._fh = 2600822924, this._gh = 528734635, this._hh = 1541459225, this
				._al = 4089235720, this._bl = 2227873595, this._cl = 4271175723, this._dl = 1595750129, this
				._el = 2917565137, this._fl = 725511199, this._gl = 4215389547, this._hl = 327033209, this
		}, kf.prototype._update = function(t) {
			for (var e = this._w, r = 0 | this._ah, n = 0 | this._bh, i = 0 | this._ch, o = 0 | this._dh, a =
					0 | this._eh, s = 0 | this._fh, f = 0 | this._gh, u = 0 | this._hh, h = 0 | this._al, c =
					0 | this._bl, d = 0 | this._cl, l = 0 | this._dl, p = 0 | this._el, m = 0 | this._fl, b =
					0 | this._gl, g = 0 | this._hl, v = 0; v < 32; v += 2) e[v] = t.readInt32BE(4 * v), e[v +
				1] = t.readInt32BE(4 * v + 4);
			for (; v < 160; v += 2) {
				var y = e[v - 30],
					w = e[v - 30 + 1],
					_ = Cf(y, w),
					A = If(w, y),
					M = Df(y = e[v - 4], w = e[v - 4 + 1]),
					E = Pf(w, y),
					S = e[v - 14],
					k = e[v - 14 + 1],
					B = e[v - 32],
					T = e[v - 32 + 1],
					R = A + k | 0,
					x = _ + S + Of(R, A) | 0;
				x = (x = x + M + Of(R = R + E | 0, E) | 0) + B + Of(R = R + T | 0, T) | 0, e[v] = x, e[v + 1] =
					R
			}
			for (var C = 0; C < 160; C += 2) {
				x = e[C], R = e[C + 1];
				var I = Tf(r, n, i),
					D = Tf(h, c, d),
					P = Rf(r, h),
					O = Rf(h, r),
					L = xf(a, p),
					U = xf(p, a),
					j = Mf[C],
					N = Mf[C + 1],
					z = Bf(a, s, f),
					F = Bf(p, m, b),
					q = g + U | 0,
					H = u + L + Of(q, g) | 0;
				H = (H = (H = H + z + Of(q = q + F | 0, F) | 0) + j + Of(q = q + N | 0, N) | 0) + x + Of(q = q +
					R | 0, R) | 0;
				var W = O + D | 0,
					G = P + I + Of(W, O) | 0;
				u = f, g = b, f = s, b = m, s = a, m = p, a = o + H + Of(p = l + q | 0, l) | 0, o = i, l = d,
					i = n, d = c, n = r, c = h, r = H + G + Of(h = q + W | 0, q) | 0
			}
			this._al = this._al + h | 0, this._bl = this._bl + c | 0, this._cl = this._cl + d | 0, this._dl =
				this._dl + l | 0, this._el = this._el + p | 0, this._fl = this._fl + m | 0, this._gl = this
				._gl + b | 0, this._hl = this._hl + g | 0, this._ah = this._ah + r + Of(this._al, h) | 0, this
				._bh = this._bh + n + Of(this._bl, c) | 0, this._ch = this._ch + i + Of(this._cl, d) | 0, this
				._dh = this._dh + o + Of(this._dl, l) | 0, this._eh = this._eh + a + Of(this._el, p) | 0, this
				._fh = this._fh + s + Of(this._fl, m) | 0, this._gh = this._gh + f + Of(this._gl, b) | 0, this
				._hh = this._hh + u + Of(this._hl, g) | 0
		}, kf.prototype._hash = function() {
			var t = Af.allocUnsafe(64);

			function e(e, r, n) {
				t.writeInt32BE(e, n), t.writeInt32BE(r, n + 4)
			}
			return e(this._ah, this._al, 0), e(this._bh, this._bl, 8), e(this._ch, this._cl, 16), e(this._dh,
				this._dl, 24), e(this._eh, this._el, 32), e(this._fh, this._fl, 40), e(this._gh, this._gl,
				48), e(this._hh, this._hl, 56), t
		}, yf = kf), yf
	}
	var Uf, jf, Nf, zf, Ff, qf = !1;

	function Hf() {
		this.init(), this._w = Ff, ks().call(this, 128, 112)
	}

	function Wf() {
		return qf || (qf = !0, Uf = {}, jf = Mr(), Nf = Lf(), ks(), zf = cr().Buffer, Ff = new Array(160), jf(Hf, Nf),
			Hf.prototype.init = function() {
				return this._ah = 3418070365, this._bh = 1654270250, this._ch = 2438529370, this._dh = 355462360,
					this._eh = 1731405415, this._fh = 2394180231, this._gh = 3675008525, this._hh = 1203062813, this
					._al = 3238371032, this._bl = 914150663, this._cl = 812702999, this._dl = 4144912697, this._el =
					4290775857, this._fl = 1750603025, this._gl = 1694076839, this._hl = 3204075428, this
			}, Hf.prototype._hash = function() {
				var t = zf.allocUnsafe(48);

				function e(e, r, n) {
					t.writeInt32BE(e, n), t.writeInt32BE(r, n + 4)
				}
				return e(this._ah, this._al, 0), e(this._bh, this._bl, 8), e(this._ch, this._cl, 16), e(this._dh,
					this._dl, 24), e(this._eh, this._el, 32), e(this._fh, this._fl, 40), t
			}, Uf = Hf), Uf
	}
	var Gf, Yf, Kf = !1;

	function Vf() {
		return Kf || (Kf = !0, Gf = {}, (Yf = Gf = function(t) {
			t = t.toLowerCase();
			var e = Yf[t];
			if (!e) throw new Error(t + " is not supported (we accept pull requests)");
			return new e
		}).sha = Us(), Yf.sha1 = Zs(), Yf.sha224 = vf(), Yf.sha256 = hf(), Yf.sha384 = Wf(), Yf.sha512 = Lf()), Gf
	}
	var Zf, $f, Xf, Jf, Qf = !1;

	function tu(t) {
		Xf.call(this), this.hashMode = "string" == typeof t, this.hashMode ? this[t] = this._finalOrDigest : this
			.final = this._finalOrDigest, this._final && (this.__final = this._final, this._final = null), this
			._decoder = null, this._encoding = null
	}

	function eu() {
		return Qf || (Qf = !0, Zf = {}, $f = cr().Buffer, Xf = Oa().Transform, Jf = Ci().StringDecoder, Mr()(tu, Xf), tu
			.prototype.update = function(t, e, r) {
				"string" == typeof t && (t = $f.from(t, e));
				var n = this._update(t);
				return this.hashMode ? this : (r && (n = this._toString(n, r)), n)
			}, tu.prototype.setAutoPadding = function() {}, tu.prototype.getAuthTag = function() {
				throw new Error("trying to get auth tag in unsupported state")
			}, tu.prototype.setAuthTag = function() {
				throw new Error("trying to set auth tag in unsupported state")
			}, tu.prototype.setAAD = function() {
				throw new Error("trying to set aad in unsupported state")
			}, tu.prototype._transform = function(t, e, r) {
				var n;
				try {
					this.hashMode ? this._update(t) : this.push(this._update(t))
				} catch (t) {
					n = t
				} finally {
					r(n)
				}
			}, tu.prototype._flush = function(t) {
				var e;
				try {
					this.push(this.__final())
				} catch (t) {
					e = t
				}
				t(e)
			}, tu.prototype._finalOrDigest = function(t) {
				var e = this.__final() || $f.alloc(0);
				return t && (e = this._toString(e, t, !0)), e
			}, tu.prototype._toString = function(t, e, r) {
				if (this._decoder || (this._decoder = new Jf(e), this._encoding = e), this._encoding !== e)
				throw new Error("can't switch encodings");
				var n = this._decoder.write(t);
				return r && (n += this._decoder.end()), n
			}, Zf = tu), Zf
	}
	var ru, nu, iu, ou, au, su, fu = !1;

	function uu(t) {
		su.call(this, "digest"), this._hash = t
	}

	function hu() {
		return fu || (fu = !0, ru = {}, nu = Mr(), iu = es(), ou = _s(), au = Vf(), su = eu(), nu(uu, su), uu.prototype
			._update = function(t) {
				this._hash.update(t)
			}, uu.prototype._final = function() {
				return this._hash.digest()
			}, ru = function(t) {
				return "md5" === (t = t.toLowerCase()) ? new iu : "rmd160" === t || "ripemd160" === t ? new ou :
					new uu(au(t))
			}), ru
	}
	var cu, du, lu, pu, mu, bu, gu = !1;

	function vu(t, e) {
		pu.call(this, "digest"), "string" == typeof e && (e = lu.from(e)), this._alg = t, this._key = e, e.length > bu ?
			e = t(e) : e.length < bu && (e = lu.concat([e, mu], bu));
		for (var r = this._ipad = lu.allocUnsafe(bu), n = this._opad = lu.allocUnsafe(bu), i = 0; i < bu; i++) r[i] =
			54 ^ e[i], n[i] = 92 ^ e[i];
		this._hash = [r]
	}

	function yu() {
		return gu || (gu = !0, cu = {}, du = Mr(), lu = cr().Buffer, pu = eu(), mu = lu.alloc(128), bu = 64, du(vu, pu),
			vu.prototype._update = function(t) {
				this._hash.push(t)
			}, vu.prototype._final = function() {
				var t = this._alg(lu.concat(this._hash));
				return this._alg(lu.concat([this._opad, t]))
			}, cu = vu), cu
	}
	var wu, _u, Au = !1;

	function Mu() {
		return Au || (Au = !0, wu = {}, _u = es(), wu = function(t) {
			return (new _u).update(t).digest()
		}), wu
	}
	var Eu, Su, ku, Bu, Tu, Ru, xu, Cu, Iu, Du = !1;

	function Pu(t, e) {
		Bu.call(this, "digest"), "string" == typeof e && (e = Tu.from(e));
		var r = "sha512" === t || "sha384" === t ? 128 : 64;
		(this._alg = t, this._key = e, e.length > r) ? e = ("rmd160" === t ? new xu : Cu(t)).update(e).digest(): e
			.length < r && (e = Tu.concat([e, Iu], r));
		for (var n = this._ipad = Tu.allocUnsafe(r), i = this._opad = Tu.allocUnsafe(r), o = 0; o < r; o++) n[o] = 54 ^
			e[o], i[o] = 92 ^ e[o];
		this._hash = "rmd160" === t ? new xu : Cu(t), this._hash.update(n)
	}

	function Ou() {
		return Du || (Du = !0, Eu = {}, Su = Mr(), ku = yu(), Bu = eu(), Tu = cr().Buffer, Ru = Mu(), xu = _s(), Cu =
			Vf(), Iu = Tu.alloc(128), Su(Pu, Bu), Pu.prototype._update = function(t) {
				this._hash.update(t)
			}, Pu.prototype._final = function() {
				var t = this._hash.digest();
				return ("rmd160" === this._alg ? new xu : Cu(this._alg)).update(this._opad).update(t).digest()
			}, Eu = function(t, e) {
				return "rmd160" === (t = t.toLowerCase()) || "ripemd160" === t ? new Pu("rmd160", e) : "md5" === t ?
					new ku(Ru, e) : new Pu(t, e)
			}), Eu
	}
	var Lu, Uu = !1;

	function ju() {
		return Uu || (Uu = !0, Lu = {}, Lu = JSON.parse(
			'{"sha224WithRSAEncryption":{"sign":"rsa","hash":"sha224","id":"302d300d06096086480165030402040500041c"},"RSA-SHA224":{"sign":"ecdsa/rsa","hash":"sha224","id":"302d300d06096086480165030402040500041c"},"sha256WithRSAEncryption":{"sign":"rsa","hash":"sha256","id":"3031300d060960864801650304020105000420"},"RSA-SHA256":{"sign":"ecdsa/rsa","hash":"sha256","id":"3031300d060960864801650304020105000420"},"sha384WithRSAEncryption":{"sign":"rsa","hash":"sha384","id":"3041300d060960864801650304020205000430"},"RSA-SHA384":{"sign":"ecdsa/rsa","hash":"sha384","id":"3041300d060960864801650304020205000430"},"sha512WithRSAEncryption":{"sign":"rsa","hash":"sha512","id":"3051300d060960864801650304020305000440"},"RSA-SHA512":{"sign":"ecdsa/rsa","hash":"sha512","id":"3051300d060960864801650304020305000440"},"RSA-SHA1":{"sign":"rsa","hash":"sha1","id":"3021300906052b0e03021a05000414"},"ecdsa-with-SHA1":{"sign":"ecdsa","hash":"sha1","id":""},"sha256":{"sign":"ecdsa","hash":"sha256","id":""},"sha224":{"sign":"ecdsa","hash":"sha224","id":""},"sha384":{"sign":"ecdsa","hash":"sha384","id":""},"sha512":{"sign":"ecdsa","hash":"sha512","id":""},"DSA-SHA":{"sign":"dsa","hash":"sha1","id":""},"DSA-SHA1":{"sign":"dsa","hash":"sha1","id":""},"DSA":{"sign":"dsa","hash":"sha1","id":""},"DSA-WITH-SHA224":{"sign":"dsa","hash":"sha224","id":""},"DSA-SHA224":{"sign":"dsa","hash":"sha224","id":""},"DSA-WITH-SHA256":{"sign":"dsa","hash":"sha256","id":""},"DSA-SHA256":{"sign":"dsa","hash":"sha256","id":""},"DSA-WITH-SHA384":{"sign":"dsa","hash":"sha384","id":""},"DSA-SHA384":{"sign":"dsa","hash":"sha384","id":""},"DSA-WITH-SHA512":{"sign":"dsa","hash":"sha512","id":""},"DSA-SHA512":{"sign":"dsa","hash":"sha512","id":""},"DSA-RIPEMD160":{"sign":"dsa","hash":"rmd160","id":""},"ripemd160WithRSA":{"sign":"rsa","hash":"rmd160","id":"3021300906052b2403020105000414"},"RSA-RIPEMD160":{"sign":"rsa","hash":"rmd160","id":"3021300906052b2403020105000414"},"md5WithRSAEncryption":{"sign":"rsa","hash":"md5","id":"3020300c06082a864886f70d020505000410"},"RSA-MD5":{"sign":"rsa","hash":"md5","id":"3020300c06082a864886f70d020505000410"}}'
			)), Lu
	}
	var Nu, zu = !1;

	function Fu() {
		return zu || (zu = !0, Nu = {}, Nu = ju()), Nu
	}
	var qu, Hu, Wu = !1;

	function Gu() {
		return Wu || (Wu = !0, qu = {}, Hu = Math.pow(2, 30) - 1, qu = function(t, e) {
			if ("number" != typeof t) throw new TypeError("Iterations not a number");
			if (t < 0) throw new TypeError("Bad iterations");
			if ("number" != typeof e) throw new TypeError("Key length not a number");
			if (e < 0 || e > Hu || e != e) throw new TypeError("Bad key length")
		}), qu
	}
	var Yu, Ku, Vu, Zu = !1;

	function $u() {
		return Zu || (Zu = !0, Yu = {}, Ut(), t.process && t.process.browser ? Ku = "utf-8" : t.process && t.process
			.version ? (Vu = parseInt(Ut().version.split(".")[0].slice(1), 10), Ku = Vu >= 6 ? "utf-8" : "binary") :
			Ku = "utf-8", Yu = Ku), Yu
	}
	var Xu, Ju, Qu = !1;

	function th() {
		return Qu || (Qu = !0, Xu = {}, Ju = cr().Buffer, Xu = function(t, e, r) {
			if (Ju.isBuffer(t)) return t;
			if ("string" == typeof t) return Ju.from(t, e);
			if (ArrayBuffer.isView(t)) return Ju.from(t.buffer);
			throw new TypeError(r + " must be a string, a Buffer, a typed array or a DataView")
		}), Xu
	}
	var eh, rh, nh, ih, oh, ah, sh, fh, uh, hh, ch = !1;

	function dh(t, e, r) {
		var n = function(t) {
				function e(e) {
					return ih(t).update(e).digest()
				}

				function r(t) {
					return (new nh).update(t).digest()
				}
				return "rmd160" === t || "ripemd160" === t ? r : "md5" === t ? rh : e
			}(t),
			i = "sha512" === t || "sha384" === t ? 128 : 64;
		e.length > i ? e = n(e) : e.length < i && (e = oh.concat([e, uh], i));
		for (var o = oh.allocUnsafe(i + hh[t]), a = oh.allocUnsafe(i + hh[t]), s = 0; s < i; s++) o[s] = 54 ^ e[s], a[
			s] = 92 ^ e[s];
		var f = oh.allocUnsafe(i + r + 4);
		o.copy(f, 0, 0, i), this.ipad1 = f, this.ipad2 = o, this.opad = a, this.alg = t, this.blocksize = i, this.hash =
			n, this.size = hh[t]
	}

	function lh(t, e, r, n, i) {
		ah(r, n);
		var o = new dh(i = i || "sha1", t = fh(t, sh, "Password"), (e = fh(e, sh, "Salt")).length),
			a = oh.allocUnsafe(n),
			s = oh.allocUnsafe(e.length + 4);
		e.copy(s, 0, 0, e.length);
		for (var f = 0, u = hh[i], h = Math.ceil(n / u), c = 1; c <= h; c++) {
			s.writeUInt32BE(c, e.length);
			for (var d = o.run(s, o.ipad1), l = d, p = 1; p < r; p++) {
				l = o.run(l, o.ipad2);
				for (var m = 0; m < u; m++) d[m] ^= l[m]
			}
			d.copy(a, f), f += u
		}
		return a
	}

	function ph() {
		return ch || (ch = !0, eh = {}, rh = Mu(), nh = _s(), ih = Vf(), oh = cr().Buffer, ah = Gu(), sh = $u(), fh =
			th(), uh = oh.alloc(128), hh = {
				md5: 16,
				sha1: 20,
				sha224: 28,
				sha256: 32,
				sha384: 48,
				sha512: 64,
				rmd160: 20,
				ripemd160: 20
			}, dh.prototype.run = function(t, e) {
				return t.copy(e, this.blocksize), this.hash(e).copy(this.opad, this.blocksize), this.hash(this.opad)
			}, eh = lh), eh
	}
	var mh, bh, gh, vh, yh, wh, _h, Ah, Mh, Eh, Sh, kh = !1;

	function Bh() {
		return Sh || (Sh = t.process && t.process.nextTick ? t.process.nextTick : t.queueMicrotask ? t.queueMicrotask :
			t.setImmediate ? t.setImmediate : t.setTimeout)
	}

	function Th(t, e, r, n, i) {
		return Ah.importKey("raw", t, {
			name: "PBKDF2"
		}, !1, ["deriveBits"]).then((function(t) {
			return Ah.deriveBits({
				name: "PBKDF2",
				salt: e,
				iterations: r,
				hash: {
					name: i
				}
			}, t, n << 3)
		})).then((function(t) {
			return bh.from(t)
		}))
	}

	function Rh() {
		mh = {}, bh = cr().Buffer, gh = Gu(), vh = $u(), yh = ph(), wh = th(), Ah = t.crypto && t.crypto.subtle, Mh = {
			sha: "SHA-1",
			"sha-1": "SHA-1",
			sha1: "SHA-1",
			sha256: "SHA-256",
			"sha-256": "SHA-256",
			sha384: "SHA-384",
			"sha-384": "SHA-384",
			"sha-512": "SHA-512",
			sha512: "SHA-512"
		}, Eh = [], mh = function(e, r, n, i, o, a) {
			"function" == typeof o && (a = o, o = void 0);
			var s = Mh[(o = o || "sha1").toLowerCase()];
			if (s && "function" == typeof t.Promise) {
				if (gh(n, i), e = wh(e, vh, "Password"), r = wh(r, vh, "Salt"), "function" != typeof a)
				throw new Error("No callback provided to pbkdf2");
				! function(t, e) {
					t.then((function(t) {
						Bh()((function() {
							e(null, t)
						}))
					}), (function(t) {
						Bh()((function() {
							e(t)
						}))
					}))
				}(function(e) {
					if (t.process && !t.process.browser) return Promise.resolve(!1);
					if (!Ah || !Ah.importKey || !Ah.deriveBits) return Promise.resolve(!1);
					if (void 0 !== Eh[e]) return Eh[e];
					var r = Th(_h = _h || bh.alloc(8), _h, 10, 128, e).then((function() {
						return !0
					})).catch((function() {
						return !1
					}));
					return Eh[e] = r, r
				}(s).then((function(t) {
					return t ? Th(e, r, n, i, s) : yh(e, r, n, i, o)
				})), a)
			} else Bh()((function() {
				var t;
				try {
					t = yh(e, r, n, i, o)
				} catch (t) {
					return a(t)
				}
				a(null, t)
			}))
		}
	}
	var xh, Ch, Ih, Dh = !1;

	function Ph() {
		xh = {}, kh || (kh = !0, Rh()), Ch = mh, xh.pbkdf2 = Ch, Ih = ph(), xh.pbkdf2Sync = Ih
	}

	function Oh() {
		return Dh || (Dh = !0, Ph()), xh
	}
	var Lh, Uh, jh, Nh, zh, Fh, qh, Hh, Wh, Gh, Yh, Kh, Vh, Zh, $h = !1;

	function Xh() {
		return $h || ($h = !0, (Lh = {}).readUInt32BE = function(t, e) {
			return (t[0 + e] << 24 | t[1 + e] << 16 | t[2 + e] << 8 | t[3 + e]) >>> 0
		}, Uh = function(t, e, r) {
			t[0 + r] = e >>> 24, t[1 + r] = e >>> 16 & 255, t[2 + r] = e >>> 8 & 255, t[3 + r] = 255 & e
		}, Lh.writeUInt32BE = Uh, jh = function(t, e, r, n) {
			for (var i = 0, o = 0, a = 6; a >= 0; a -= 2) {
				for (var s = 0; s <= 24; s += 8) i <<= 1, i |= e >>> s + a & 1;
				for (s = 0; s <= 24; s += 8) i <<= 1, i |= t >>> s + a & 1
			}
			for (a = 6; a >= 0; a -= 2) {
				for (s = 1; s <= 25; s += 8) o <<= 1, o |= e >>> s + a & 1;
				for (s = 1; s <= 25; s += 8) o <<= 1, o |= t >>> s + a & 1
			}
			r[n + 0] = i >>> 0, r[n + 1] = o >>> 0
		}, Lh.ip = jh, Nh = function(t, e, r, n) {
			for (var i = 0, o = 0, a = 0; a < 4; a++)
				for (var s = 24; s >= 0; s -= 8) i <<= 1, i |= e >>> s + a & 1, i <<= 1, i |= t >>> s + a & 1;
			for (a = 4; a < 8; a++)
				for (s = 24; s >= 0; s -= 8) o <<= 1, o |= e >>> s + a & 1, o <<= 1, o |= t >>> s + a & 1;
			r[n + 0] = i >>> 0, r[n + 1] = o >>> 0
		}, Lh.rip = Nh, zh = function(t, e, r, n) {
			for (var i = 0, o = 0, a = 7; a >= 5; a--) {
				for (var s = 0; s <= 24; s += 8) i <<= 1, i |= e >> s + a & 1;
				for (s = 0; s <= 24; s += 8) i <<= 1, i |= t >> s + a & 1
			}
			for (s = 0; s <= 24; s += 8) i <<= 1, i |= e >> s + a & 1;
			for (a = 1; a <= 3; a++) {
				for (s = 0; s <= 24; s += 8) o <<= 1, o |= e >> s + a & 1;
				for (s = 0; s <= 24; s += 8) o <<= 1, o |= t >> s + a & 1
			}
			for (s = 0; s <= 24; s += 8) o <<= 1, o |= t >> s + a & 1;
			r[n + 0] = i >>> 0, r[n + 1] = o >>> 0
		}, Lh.pc1 = zh, Fh = function(t, e) {
			return t << e & 268435455 | t >>> 28 - e
		}, Lh.r28shl = Fh, qh = [14, 11, 17, 4, 27, 23, 25, 0, 13, 22, 7, 18, 5, 9, 16, 24, 2, 20, 12, 21, 1, 8,
			15, 26, 15, 4, 25, 19, 9, 1, 26, 16, 5, 11, 23, 8, 12, 7, 17, 0, 22, 3, 10, 14, 6, 20, 27, 24
		], Hh = function(t, e, r, n) {
			for (var i = 0, o = 0, a = qh.length >>> 1, s = 0; s < a; s++) i <<= 1, i |= t >>> qh[s] & 1;
			for (s = a; s < qh.length; s++) o <<= 1, o |= e >>> qh[s] & 1;
			r[n + 0] = i >>> 0, r[n + 1] = o >>> 0
		}, Lh.pc2 = Hh, Wh = function(t, e, r) {
			var n = 0,
				i = 0;
			n = (1 & t) << 5 | t >>> 27;
			for (var o = 23; o >= 15; o -= 4) n <<= 6, n |= t >>> o & 63;
			for (o = 11; o >= 3; o -= 4) i |= t >>> o & 63, i <<= 6;
			i |= (31 & t) << 1 | t >>> 31, e[r + 0] = n >>> 0, e[r + 1] = i >>> 0
		}, Lh.expand = Wh, Gh = [14, 0, 4, 15, 13, 7, 1, 4, 2, 14, 15, 2, 11, 13, 8, 1, 3, 10, 10, 6, 6, 12, 12,
			11, 5, 9, 9, 5, 0, 3, 7, 8, 4, 15, 1, 12, 14, 8, 8, 2, 13, 4, 6, 9, 2, 1, 11, 7, 15, 5, 12, 11, 9,
			3, 7, 14, 3, 10, 10, 0, 5, 6, 0, 13, 15, 3, 1, 13, 8, 4, 14, 7, 6, 15, 11, 2, 3, 8, 4, 14, 9, 12, 7,
			0, 2, 1, 13, 10, 12, 6, 0, 9, 5, 11, 10, 5, 0, 13, 14, 8, 7, 10, 11, 1, 10, 3, 4, 15, 13, 4, 1, 2,
			5, 11, 8, 6, 12, 7, 6, 12, 9, 0, 3, 5, 2, 14, 15, 9, 10, 13, 0, 7, 9, 0, 14, 9, 6, 3, 3, 4, 15, 6,
			5, 10, 1, 2, 13, 8, 12, 5, 7, 14, 11, 12, 4, 11, 2, 15, 8, 1, 13, 1, 6, 10, 4, 13, 9, 0, 8, 6, 15,
			9, 3, 8, 0, 7, 11, 4, 1, 15, 2, 14, 12, 3, 5, 11, 10, 5, 14, 2, 7, 12, 7, 13, 13, 8, 14, 11, 3, 5,
			0, 6, 6, 15, 9, 0, 10, 3, 1, 4, 2, 7, 8, 2, 5, 12, 11, 1, 12, 10, 4, 14, 15, 9, 10, 3, 6, 15, 9, 0,
			0, 6, 12, 10, 11, 1, 7, 13, 13, 8, 15, 9, 1, 4, 3, 5, 14, 11, 5, 12, 2, 7, 8, 2, 4, 14, 2, 14, 12,
			11, 4, 2, 1, 12, 7, 4, 10, 7, 11, 13, 6, 1, 8, 5, 5, 0, 3, 15, 15, 10, 13, 3, 0, 9, 14, 8, 9, 6, 4,
			11, 2, 8, 1, 12, 11, 7, 10, 1, 13, 14, 7, 2, 8, 13, 15, 6, 9, 15, 12, 0, 5, 9, 6, 10, 3, 4, 0, 5,
			14, 3, 12, 10, 1, 15, 10, 4, 15, 2, 9, 7, 2, 12, 6, 9, 8, 5, 0, 6, 13, 1, 3, 13, 4, 14, 14, 0, 7,
			11, 5, 3, 11, 8, 9, 4, 14, 3, 15, 2, 5, 12, 2, 9, 8, 5, 12, 15, 3, 10, 7, 11, 0, 14, 4, 1, 10, 7, 1,
			6, 13, 0, 11, 8, 6, 13, 4, 13, 11, 0, 2, 11, 14, 7, 15, 4, 0, 9, 8, 1, 13, 10, 3, 14, 12, 3, 9, 5,
			7, 12, 5, 2, 10, 15, 6, 8, 1, 6, 1, 6, 4, 11, 11, 13, 13, 8, 12, 1, 3, 4, 7, 10, 14, 7, 10, 9, 15,
			5, 6, 0, 8, 15, 0, 14, 5, 2, 9, 3, 2, 12, 13, 1, 2, 15, 8, 13, 4, 8, 6, 10, 15, 3, 11, 7, 1, 4, 10,
			12, 9, 5, 3, 6, 14, 11, 5, 0, 0, 14, 12, 9, 7, 2, 7, 2, 11, 1, 4, 14, 1, 7, 9, 4, 12, 10, 14, 8, 2,
			13, 0, 15, 6, 12, 10, 9, 13, 0, 15, 3, 3, 5, 5, 6, 8, 11
		], Yh = function(t, e) {
			for (var r = 0, n = 0; n < 4; n++) r <<= 4, r |= Gh[64 * n + (t >>> 18 - 6 * n & 63)];
			for (n = 0; n < 4; n++) r <<= 4, r |= Gh[256 + 64 * n + (e >>> 18 - 6 * n & 63)];
			return r >>> 0
		}, Lh.substitute = Yh, Kh = [16, 25, 12, 11, 3, 20, 4, 15, 31, 17, 9, 6, 27, 14, 1, 22, 30, 24, 8, 18,
			0, 5, 29, 23, 13, 19, 2, 26, 10, 21, 28, 7
		], Vh = function(t) {
			for (var e = 0, r = 0; r < Kh.length; r++) e <<= 1, e |= t >>> Kh[r] & 1;
			return e >>> 0
		}, Lh.permute = Vh, Zh = function(t, e, r) {
			for (var n = t.toString(2); n.length < e;) n = "0" + n;
			for (var i = [], o = 0; o < e; o += r) i.push(n.slice(o, o + r));
			return i.join(" ")
		}, Lh.padSplit = Zh), Lh
	}
	var Jh, Qh = !1;

	function tc(t, e) {
		if (!t) throw new Error(e || "Assertion failed")
	}

	function ec() {
		return Qh || (Qh = !0, Jh = {}, Jh = tc, tc.equal = function(t, e, r) {
			if (t != e) throw new Error(r || "Assertion failed: " + t + " != " + e)
		}), Jh
	}
	var rc, nc = !1;

	function ic(t) {
		this.options = t, this.type = this.options.type, this.blockSize = 8, this._init(), this.buffer = new Array(this
			.blockSize), this.bufferOff = 0
	}

	function oc() {
		return nc || (nc = !0, rc = {}, ec(), rc = ic, ic.prototype._init = function() {}, ic.prototype.update =
			function(t) {
				return 0 === t.length ? [] : "decrypt" === this.type ? this._updateDecrypt(t) : this._updateEncrypt(
					t)
			}, ic.prototype._buffer = function(t, e) {
				for (var r = Math.min(this.buffer.length - this.bufferOff, t.length - e), n = 0; n < r; n++) this
					.buffer[this.bufferOff + n] = t[e + n];
				return this.bufferOff += r, r
			}, ic.prototype._flushBuffer = function(t, e) {
				return this._update(this.buffer, 0, t, e), this.bufferOff = 0, this.blockSize
			}, ic.prototype._updateEncrypt = function(t) {
				var e = 0,
					r = 0,
					n = (this.bufferOff + t.length) / this.blockSize | 0,
					i = new Array(n * this.blockSize);
				0 !== this.bufferOff && (e += this._buffer(t, e), this.bufferOff === this.buffer.length && (r +=
					this._flushBuffer(i, r)));
				for (var o = t.length - (t.length - e) % this.blockSize; e < o; e += this.blockSize) this._update(t,
					e, i, r), r += this.blockSize;
				for (; e < t.length; e++, this.bufferOff++) this.buffer[this.bufferOff] = t[e];
				return i
			}, ic.prototype._updateDecrypt = function(t) {
				for (var e = 0, r = 0, n = Math.ceil((this.bufferOff + t.length) / this.blockSize) - 1, i =
						new Array(n * this.blockSize); n > 0; n--) e += this._buffer(t, e), r += this._flushBuffer(
					i, r);
				return e += this._buffer(t, e), i
			}, ic.prototype.final = function(t) {
				var e, r;
				return t && (e = this.update(t)), r = "encrypt" === this.type ? this._finalEncrypt() : this
					._finalDecrypt(), e ? e.concat(r) : r
			}, ic.prototype._pad = function(t, e) {
				if (0 === e) return !1;
				for (; e < t.length;) t[e++] = 0;
				return !0
			}, ic.prototype._finalEncrypt = function() {
				if (!this._pad(this.buffer, this.bufferOff)) return [];
				var t = new Array(this.blockSize);
				return this._update(this.buffer, 0, t, 0), t
			}, ic.prototype._unpad = function(t) {
				return t
			}, ic.prototype._finalDecrypt = function() {
				ec().equal(this.bufferOff, this.blockSize, "Not enough data to decrypt");
				var t = new Array(this.blockSize);
				return this._flushBuffer(t, 0), this._unpad(t)
			}), rc
	}
	var ac, sc, fc, uc, hc = !1;

	function cc() {
		this.tmp = new Array(2), this.keys = null
	}

	function dc(t) {
		fc.call(this, t);
		var e = new cc;
		this._desState = e, this.deriveKeys(e, t.key)
	}

	function lc() {
		return hc || (hc = !0, ac = {}, ec(), sc = Mr(), Xh(), fc = oc(), sc(dc, fc), ac = dc, dc.create = function(t) {
			return new dc(t)
		}, uc = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1], dc.prototype.deriveKeys = function(t, e) {
			t.keys = new Array(32), ec().equal(e.length, this.blockSize, "Invalid key length");
			var r = Xh().readUInt32BE(e, 0),
				n = Xh().readUInt32BE(e, 4);
			Xh().pc1(r, n, t.tmp, 0), r = t.tmp[0], n = t.tmp[1];
			for (var i = 0; i < t.keys.length; i += 2) {
				var o = uc[i >>> 1];
				r = Xh().r28shl(r, o), n = Xh().r28shl(n, o), Xh().pc2(r, n, t.keys, i)
			}
		}, dc.prototype._update = function(t, e, r, n) {
			var i = this._desState,
				o = Xh().readUInt32BE(t, e),
				a = Xh().readUInt32BE(t, e + 4);
			Xh().ip(o, a, i.tmp, 0), o = i.tmp[0], a = i.tmp[1], "encrypt" === this.type ? this._encrypt(i, o,
					a, i.tmp, 0) : this._decrypt(i, o, a, i.tmp, 0), o = i.tmp[0], a = i.tmp[1], Xh()
				.writeUInt32BE(r, o, n), Xh().writeUInt32BE(r, a, n + 4)
		}, dc.prototype._pad = function(t, e) {
			for (var r = t.length - e, n = e; n < t.length; n++) t[n] = r;
			return !0
		}, dc.prototype._unpad = function(t) {
			for (var e = t[t.length - 1], r = t.length - e; r < t.length; r++) ec().equal(t[r], e);
			return t.slice(0, t.length - e)
		}, dc.prototype._encrypt = function(t, e, r, n, i) {
			for (var o = e, a = r, s = 0; s < t.keys.length; s += 2) {
				var f = t.keys[s],
					u = t.keys[s + 1];
				Xh().expand(a, t.tmp, 0), f ^= t.tmp[0], u ^= t.tmp[1];
				var h = Xh().substitute(f, u),
					c = a;
				a = (o ^ Xh().permute(h)) >>> 0, o = c
			}
			Xh().rip(a, o, n, i)
		}, dc.prototype._decrypt = function(t, e, r, n, i) {
			for (var o = r, a = e, s = t.keys.length - 2; s >= 0; s -= 2) {
				var f = t.keys[s],
					u = t.keys[s + 1];
				Xh().expand(o, t.tmp, 0), f ^= t.tmp[0], u ^= t.tmp[1];
				var h = Xh().substitute(f, u),
					c = o;
				o = (a ^ Xh().permute(h)) >>> 0, a = c
			}
			Xh().rip(o, a, n, i)
		}), ac
	}
	var pc, mc, bc, gc, vc = !1;

	function yc(t) {
		ec().equal(t.length, 8, "Invalid IV length"), this.iv = new Array(8);
		for (var e = 0; e < this.iv.length; e++) this.iv[e] = t[e]
	}

	function wc(t) {
		function e(e) {
			t.call(this, e), this._cbcInit()
		}
		mc(e, t);
		for (var r = Object.keys(bc), n = 0; n < r.length; n++) {
			var i = r[n];
			e.prototype[i] = bc[i]
		}
		return e.create = function(t) {
			return new e(t)
		}, e
	}

	function _c() {
		return vc || (vc = !0, pc = {}, ec(), mc = Mr(), bc = {}, gc = wc, pc.instantiate = gc, bc._cbcInit =
	function() {
			var t = new yc(this.options.iv);
			this._cbcState = t
		}, bc._update = function(t, e, r, n) {
			var i = this._cbcState,
				o = this.constructor.super_.prototype,
				a = i.iv;
			if ("encrypt" === this.type) {
				for (var s = 0; s < this.blockSize; s++) a[s] ^= t[e + s];
				for (o._update.call(this, a, 0, r, n), s = 0; s < this.blockSize; s++) a[s] = r[n + s]
			} else {
				for (o._update.call(this, t, e, r, n), s = 0; s < this.blockSize; s++) r[n + s] ^= a[s];
				for (s = 0; s < this.blockSize; s++) a[s] = t[e + s]
			}
		}), pc
	}
	var Ac, Mc, Ec, Sc = !1;

	function kc(t, e) {
		ec().equal(e.length, 24, "Invalid key length");
		var r = e.slice(0, 8),
			n = e.slice(8, 16),
			i = e.slice(16, 24);
		this.ciphers = "encrypt" === t ? [lc().create({
			type: "encrypt",
			key: r
		}), lc().create({
			type: "decrypt",
			key: n
		}), lc().create({
			type: "encrypt",
			key: i
		})] : [lc().create({
			type: "decrypt",
			key: i
		}), lc().create({
			type: "encrypt",
			key: n
		}), lc().create({
			type: "decrypt",
			key: r
		})]
	}

	function Bc(t) {
		Ec.call(this, t);
		var e = new kc(this.type, this.options.key);
		this._edeState = e
	}

	function Tc() {
		return Sc || (Sc = !0, Ac = {}, ec(), Mc = Mr(), Ec = oc(), lc(), Mc(Bc, Ec), Ac = Bc, Bc.create = function(t) {
			return new Bc(t)
		}, Bc.prototype._update = function(t, e, r, n) {
			var i = this._edeState;
			i.ciphers[0]._update(t, e, r, n), i.ciphers[1]._update(r, n, r, n), i.ciphers[2]._update(r, n, r, n)
		}, Bc.prototype._pad = lc().prototype._pad, Bc.prototype._unpad = lc().prototype._unpad), Ac
	}
	var Rc, xc, Cc, Ic, Dc, Pc, Oc = !1;

	function Lc() {
		return Oc || (Oc = !0, Rc = {}, xc = Xh(), Rc.utils = xc, Cc = oc(), Rc.Cipher = Cc, Ic = lc(), Rc.DES = Ic,
			Dc = _c(), Rc.CBC = Dc, Pc = Tc(), Rc.EDE = Pc), Rc
	}
	var Uc, jc, Nc, zc, Fc, qc = !1;

	function Hc(t) {
		jc.call(this);
		var e, r = t.mode.toLowerCase(),
			n = Fc[r];
		e = t.decrypt ? "decrypt" : "encrypt";
		var i = t.key;
		zc.isBuffer(i) || (i = zc.from(i)), "des-ede" !== r && "des-ede-cbc" !== r || (i = zc.concat([i, i.slice(0,
			8)]));
		var o = t.iv;
		zc.isBuffer(o) || (o = zc.from(o)), this._des = n.create({
			key: i,
			iv: o,
			type: e
		})
	}

	function Wc() {
		return qc || (qc = !0, Uc = {}, jc = eu(), Lc(), Nc = Mr(), zc = cr().Buffer, (Fc = {
				"des-ede3-cbc": Lc().CBC.instantiate(Lc().EDE),
				"des-ede3": Lc().EDE,
				"des-ede-cbc": Lc().CBC.instantiate(Lc().EDE),
				"des-ede": Lc().EDE,
				"des-cbc": Lc().CBC.instantiate(Lc().DES),
				"des-ecb": Lc().DES
			}).des = Fc["des-cbc"], Fc.des3 = Fc["des-ede3-cbc"], Uc = Hc, Nc(Hc, jc), Hc.prototype._update =
			function(t) {
				return zc.from(this._des.update(t))
			}, Hc.prototype._final = function() {
				return zc.from(this._des.final())
			}), Uc
	}
	var Gc, Yc, Kc = !1;

	function Vc() {
		return Kc || (Kc = !0, (Gc = {}).encrypt = function(t, e) {
			return t._cipher.encryptBlock(e)
		}, Yc = function(t, e) {
			return t._cipher.decryptBlock(e)
		}, Gc.decrypt = Yc), Gc
	}
	var Zc, $c, Xc = !1;

	function Jc() {
		return Xc || (Xc = !0, Zc = {}, $c = Ve().Buffer, Zc = function(t, e) {
			for (var r = Math.min(t.length, e.length), n = new $c(r), i = 0; i < r; ++i) n[i] = t[i] ^ e[i];
			return n
		}), Zc
	}
	var Qc, td, ed, rd, nd = !1;

	function id() {
		return nd || (nd = !0, Qc = {}, td = Jc(), ed = function(t, e) {
			var r = td(e, t._prev);
			return t._prev = t._cipher.encryptBlock(r), t._prev
		}, Qc.encrypt = ed, rd = function(t, e) {
			var r = t._prev;
			t._prev = e;
			var n = t._cipher.decryptBlock(e);
			return td(n, r)
		}, Qc.decrypt = rd), Qc
	}
	var od, ad, sd, fd, ud = !1;

	function hd(t, e, r) {
		var n = e.length,
			i = sd(e, t._cache);
		return t._cache = t._cache.slice(n), t._prev = ad.concat([t._prev, r ? e : i]), i
	}

	function cd() {
		return ud || (ud = !0, od = {}, ad = cr().Buffer, sd = Jc(), fd = function(t, e, r) {
			for (var n, i = ad.allocUnsafe(0); e.length;) {
				if (0 === t._cache.length && (t._cache = t._cipher.encryptBlock(t._prev), t._prev = ad
						.allocUnsafe(0)), !(t._cache.length <= e.length)) {
					i = ad.concat([i, hd(t, e, r)]);
					break
				}
				n = t._cache.length, i = ad.concat([i, hd(t, e.slice(0, n), r)]), e = e.slice(n)
			}
			return i
		}, od.encrypt = fd), od
	}
	var dd, ld, pd, md = !1;

	function bd(t, e, r) {
		var n = t._cipher.encryptBlock(t._prev)[0] ^ e;
		return t._prev = ld.concat([t._prev.slice(1), ld.from([r ? e : n])]), n
	}

	function gd() {
		return md || (md = !0, dd = {}, ld = cr().Buffer, pd = function(t, e, r) {
			for (var n = e.length, i = ld.allocUnsafe(n), o = -1; ++o < n;) i[o] = bd(t, e[o], r);
			return i
		}, dd.encrypt = pd), dd
	}
	var vd, yd, wd, _d = !1;

	function Ad(t, e, r) {
		for (var n, i, o = -1, a = 0; ++o < 8;) n = e & 1 << 7 - o ? 128 : 0, a += (128 & (i = t._cipher.encryptBlock(t
			._prev)[0] ^ n)) >> o % 8, t._prev = Md(t._prev, r ? n : i);
		return a
	}

	function Md(t, e) {
		var r = t.length,
			n = -1,
			i = yd.allocUnsafe(t.length);
		for (t = yd.concat([t, yd.from([e])]); ++n < r;) i[n] = t[n] << 1 | t[n + 1] >> 7;
		return i
	}

	function Ed() {
		return _d || (_d = !0, vd = {}, yd = cr().Buffer, wd = function(t, e, r) {
			for (var n = e.length, i = yd.allocUnsafe(n), o = -1; ++o < n;) i[o] = Ad(t, e[o], r);
			return i
		}, vd.encrypt = wd), vd
	}
	var Sd, kd, Bd, Td, Rd = !1;

	function xd(t) {
		return t._prev = t._cipher.encryptBlock(t._prev), t._prev
	}

	function Cd() {
		return Rd || (Rd = !0, Sd = {}, kd = Ve().Buffer, Bd = Jc(), Td = function(t, e) {
			for (; t._cache.length < e.length;) t._cache = kd.concat([t._cache, xd(t)]);
			var r = t._cache.slice(0, e.length);
			return t._cache = t._cache.slice(e.length), Bd(e, r)
		}, Sd.encrypt = Td), Sd
	}
	var Id, Dd = !1;

	function Pd(t) {
		for (var e, r = t.length; r--;) {
			if (255 !== (e = t.readUInt8(r))) {
				e++, t.writeUInt8(e, r);
				break
			}
			t.writeUInt8(0, r)
		}
	}

	function Od() {
		return Dd || (Dd = !0, Id = {}, Id = Pd), Id
	}
	var Ld, Ud, jd, Nd, zd, Fd = !1;

	function qd(t) {
		var e = t._cipher.encryptBlockRaw(t._prev);
		return Nd(t._prev), e
	}

	function Hd() {
		return Fd || (Fd = !0, Ld = {}, Ud = Jc(), jd = cr().Buffer, Nd = Od(), 16, zd = function(t, e) {
			var r = Math.ceil(e.length / 16),
				n = t._cache.length;
			t._cache = jd.concat([t._cache, jd.allocUnsafe(16 * r)]);
			for (var i = 0; i < r; i++) {
				var o = qd(t),
					a = n + 16 * i;
				t._cache.writeUInt32BE(o[0], a + 0), t._cache.writeUInt32BE(o[1], a + 4), t._cache
					.writeUInt32BE(o[2], a + 8), t._cache.writeUInt32BE(o[3], a + 12)
			}
			var s = t._cache.slice(0, e.length);
			return t._cache = t._cache.slice(e.length), Ud(e, s)
		}, Ld.encrypt = zd), Ld
	}
	var Wd, Gd = !1;

	function Yd() {
		return Gd || (Gd = !0, Wd = {}, Wd = JSON.parse(
			'{"aes-128-ecb":{"cipher":"AES","key":128,"iv":0,"mode":"ECB","type":"block"},"aes-192-ecb":{"cipher":"AES","key":192,"iv":0,"mode":"ECB","type":"block"},"aes-256-ecb":{"cipher":"AES","key":256,"iv":0,"mode":"ECB","type":"block"},"aes-128-cbc":{"cipher":"AES","key":128,"iv":16,"mode":"CBC","type":"block"},"aes-192-cbc":{"cipher":"AES","key":192,"iv":16,"mode":"CBC","type":"block"},"aes-256-cbc":{"cipher":"AES","key":256,"iv":16,"mode":"CBC","type":"block"},"aes128":{"cipher":"AES","key":128,"iv":16,"mode":"CBC","type":"block"},"aes192":{"cipher":"AES","key":192,"iv":16,"mode":"CBC","type":"block"},"aes256":{"cipher":"AES","key":256,"iv":16,"mode":"CBC","type":"block"},"aes-128-cfb":{"cipher":"AES","key":128,"iv":16,"mode":"CFB","type":"stream"},"aes-192-cfb":{"cipher":"AES","key":192,"iv":16,"mode":"CFB","type":"stream"},"aes-256-cfb":{"cipher":"AES","key":256,"iv":16,"mode":"CFB","type":"stream"},"aes-128-cfb8":{"cipher":"AES","key":128,"iv":16,"mode":"CFB8","type":"stream"},"aes-192-cfb8":{"cipher":"AES","key":192,"iv":16,"mode":"CFB8","type":"stream"},"aes-256-cfb8":{"cipher":"AES","key":256,"iv":16,"mode":"CFB8","type":"stream"},"aes-128-cfb1":{"cipher":"AES","key":128,"iv":16,"mode":"CFB1","type":"stream"},"aes-192-cfb1":{"cipher":"AES","key":192,"iv":16,"mode":"CFB1","type":"stream"},"aes-256-cfb1":{"cipher":"AES","key":256,"iv":16,"mode":"CFB1","type":"stream"},"aes-128-ofb":{"cipher":"AES","key":128,"iv":16,"mode":"OFB","type":"stream"},"aes-192-ofb":{"cipher":"AES","key":192,"iv":16,"mode":"OFB","type":"stream"},"aes-256-ofb":{"cipher":"AES","key":256,"iv":16,"mode":"OFB","type":"stream"},"aes-128-ctr":{"cipher":"AES","key":128,"iv":16,"mode":"CTR","type":"stream"},"aes-192-ctr":{"cipher":"AES","key":192,"iv":16,"mode":"CTR","type":"stream"},"aes-256-ctr":{"cipher":"AES","key":256,"iv":16,"mode":"CTR","type":"stream"},"aes-128-gcm":{"cipher":"AES","key":128,"iv":12,"mode":"GCM","type":"auth"},"aes-192-gcm":{"cipher":"AES","key":192,"iv":12,"mode":"GCM","type":"auth"},"aes-256-gcm":{"cipher":"AES","key":256,"iv":12,"mode":"GCM","type":"auth"}}'
			)), Wd
	}
	var Kd, Vd, Zd, $d, Xd = !1;

	function Jd() {
		return Xd || (Xd = !0, function() {
			for ($d in Kd = {}, Vd = {
					ECB: Vc(),
					CBC: id(),
					CFB: cd(),
					CFB8: gd(),
					CFB1: Ed(),
					OFB: Cd(),
					CTR: Hd(),
					GCM: Hd()
				}, Zd = Yd()) Zd[$d].module = Vd[Zd[$d].mode];
			Kd = Zd
		}()), Kd
	}
	var Qd, tl, el, rl, nl, il = !1;

	function ol(t) {
		tl.isBuffer(t) || (t = tl.from(t));
		for (var e = t.length / 4 | 0, r = new Array(e), n = 0; n < e; n++) r[n] = t.readUInt32BE(4 * n);
		return r
	}

	function al(t) {
		for (; 0 < t.length; t++) t[0] = 0
	}

	function sl(t, e, r, n, i) {
		for (var o, a, s, f, u = r[0], h = r[1], c = r[2], d = r[3], l = t[0] ^ e[0], p = t[1] ^ e[1], m = t[2] ^ e[2],
				b = t[3] ^ e[3], g = 4, v = 1; v < i; v++) o = u[l >>> 24] ^ h[p >>> 16 & 255] ^ c[m >>> 8 & 255] ^ d[
			255 & b] ^ e[g++], a = u[p >>> 24] ^ h[m >>> 16 & 255] ^ c[b >>> 8 & 255] ^ d[255 & l] ^ e[g++], s = u[
			m >>> 24] ^ h[b >>> 16 & 255] ^ c[l >>> 8 & 255] ^ d[255 & p] ^ e[g++], f = u[b >>> 24] ^ h[l >>> 16 &
			255] ^ c[p >>> 8 & 255] ^ d[255 & m] ^ e[g++], l = o, p = a, m = s, b = f;
		return o = (n[l >>> 24] << 24 | n[p >>> 16 & 255] << 16 | n[m >>> 8 & 255] << 8 | n[255 & b]) ^ e[g++], a = (n[
			p >>> 24] << 24 | n[m >>> 16 & 255] << 16 | n[b >>> 8 & 255] << 8 | n[255 & l]) ^ e[g++], s = (n[m >>>
			24] << 24 | n[b >>> 16 & 255] << 16 | n[l >>> 8 & 255] << 8 | n[255 & p]) ^ e[g++], f = (n[b >>> 24] <<
			24 | n[l >>> 16 & 255] << 16 | n[p >>> 8 & 255] << 8 | n[255 & m]) ^ e[g++], [o >>>= 0, a >>>= 0, s >>>=
			0, f >>>= 0
		]
	}

	function fl(t) {
		this._key = ol(t), this._reset()
	}

	function ul() {
		return il || (il = !0, Qd = {}, tl = cr().Buffer, el = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54], rl =
		function() {
				for (var t = new Array(256), e = 0; e < 256; e++) t[e] = e < 128 ? e << 1 : e << 1 ^ 283;
				for (var r = [], n = [], i = [
						[],
						[],
						[],
						[]
					], o = [
						[],
						[],
						[],
						[]
					], a = 0, s = 0, f = 0; f < 256; ++f) {
					var u = s ^ s << 1 ^ s << 2 ^ s << 3 ^ s << 4;
					u = u >>> 8 ^ 255 & u ^ 99, r[a] = u, n[u] = a;
					var h = t[a],
						c = t[h],
						d = t[c],
						l = 257 * t[u] ^ 16843008 * u;
					i[0][a] = l << 24 | l >>> 8, i[1][a] = l << 16 | l >>> 16, i[2][a] = l << 8 | l >>> 24, i[3][
						a] = l, l = 16843009 * d ^ 65537 * c ^ 257 * h ^ 16843008 * a, o[0][u] = l << 24 | l >>> 8,
						o[1][u] = l << 16 | l >>> 16, o[2][u] = l << 8 | l >>> 24, o[3][u] = l, 0 === a ? a = s =
						1 : (a = h ^ t[t[t[d ^ h]]], s ^= t[t[s]])
				}
				return {
					SBOX: r,
					INV_SBOX: n,
					SUB_MIX: i,
					INV_SUB_MIX: o
				}
			}(), fl.blockSize = 16, fl.keySize = 32, fl.prototype.blockSize = fl.blockSize, fl.prototype.keySize =
			fl.keySize, fl.prototype._reset = function() {
				for (var t = this._key, e = t.length, r = e + 6, n = 4 * (r + 1), i = [], o = 0; o < e; o++) i[o] =
					t[o];
				for (o = e; o < n; o++) {
					var a = i[o - 1];
					o % e == 0 ? (a = a << 8 | a >>> 24, a = rl.SBOX[a >>> 24] << 24 | rl.SBOX[a >>> 16 & 255] <<
							16 | rl.SBOX[a >>> 8 & 255] << 8 | rl.SBOX[255 & a], a ^= el[o / e | 0] << 24) : e >
						6 && o % e == 4 && (a = rl.SBOX[a >>> 24] << 24 | rl.SBOX[a >>> 16 & 255] << 16 | rl.SBOX[
							a >>> 8 & 255] << 8 | rl.SBOX[255 & a]), i[o] = i[o - e] ^ a
				}
				for (var s = [], f = 0; f < n; f++) {
					var u = n - f,
						h = i[u - (f % 4 ? 0 : 4)];
					s[f] = f < 4 || u <= 4 ? h : rl.INV_SUB_MIX[0][rl.SBOX[h >>> 24]] ^ rl.INV_SUB_MIX[1][rl.SBOX[
						h >>> 16 & 255]] ^ rl.INV_SUB_MIX[2][rl.SBOX[h >>> 8 & 255]] ^ rl.INV_SUB_MIX[3][rl
						.SBOX[255 & h]
					]
				}
				this._nRounds = r, this._keySchedule = i, this._invKeySchedule = s
			}, fl.prototype.encryptBlockRaw = function(t) {
				return sl(t = ol(t), this._keySchedule, rl.SUB_MIX, rl.SBOX, this._nRounds)
			}, fl.prototype.encryptBlock = function(t) {
				var e = this.encryptBlockRaw(t),
					r = tl.allocUnsafe(16);
				return r.writeUInt32BE(e[0], 0), r.writeUInt32BE(e[1], 4), r.writeUInt32BE(e[2], 8), r
					.writeUInt32BE(e[3], 12), r
			}, fl.prototype.decryptBlock = function(t) {
				var e = (t = ol(t))[1];
				t[1] = t[3], t[3] = e;
				var r = sl(t, this._invKeySchedule, rl.INV_SUB_MIX, rl.INV_SBOX, this._nRounds),
					n = tl.allocUnsafe(16);
				return n.writeUInt32BE(r[0], 0), n.writeUInt32BE(r[3], 4), n.writeUInt32BE(r[2], 8), n
					.writeUInt32BE(r[1], 12), n
			}, fl.prototype.scrub = function() {
				al(this._keySchedule), al(this._invKeySchedule), al(this._key)
			}, nl = fl, Qd.AES = nl), Qd
	}
	var hl, cl, dl, ll = !1;

	function pl(t) {
		var e = cl.allocUnsafe(16);
		return e.writeUInt32BE(t[0] >>> 0, 0), e.writeUInt32BE(t[1] >>> 0, 4), e.writeUInt32BE(t[2] >>> 0, 8), e
			.writeUInt32BE(t[3] >>> 0, 12), e
	}

	function ml(t) {
		this.h = t, this.state = cl.alloc(16, 0), this.cache = cl.allocUnsafe(0)
	}

	function bl() {
		return ll || (ll = !0, hl = {}, cl = cr().Buffer, dl = cl.alloc(16, 0), ml.prototype.ghash = function(t) {
			for (var e = -1; ++e < t.length;) this.state[e] ^= t[e];
			this._multiply()
		}, ml.prototype._multiply = function() {
			for (var t, e, r, n = [(t = this.h).readUInt32BE(0), t.readUInt32BE(4), t.readUInt32BE(8), t
					.readUInt32BE(12)
				], i = [0, 0, 0, 0], o = -1; ++o < 128;) {
				for (0 != (this.state[~~(o / 8)] & 1 << 7 - o % 8) && (i[0] ^= n[0], i[1] ^= n[1], i[2] ^= n[2],
						i[3] ^= n[3]), r = 0 != (1 & n[3]), e = 3; e > 0; e--) n[e] = n[e] >>> 1 | (1 & n[e -
					1]) << 31;
				n[0] = n[0] >>> 1, r && (n[0] = n[0] ^ 225 << 24)
			}
			this.state = pl(i)
		}, ml.prototype.update = function(t) {
			var e;
			for (this.cache = cl.concat([this.cache, t]); this.cache.length >= 16;) e = this.cache.slice(0, 16),
				this.cache = this.cache.slice(16), this.ghash(e)
		}, ml.prototype.final = function(t, e) {
			return this.cache.length && this.ghash(cl.concat([this.cache, dl], 16)), this.ghash(pl([0, t, 0,
				e])), this.state
		}, hl = ml), hl
	}
	var gl, vl, yl, wl, _l, Al, Ml, El = !1;

	function Sl(t, e, r, n) {
		yl.call(this);
		var i = vl.alloc(4, 0);
		this._cipher = new(ul().AES)(e);
		var o = this._cipher.encryptBlock(i);
		this._ghash = new _l(o), r = function(t, e, r) {
				if (12 === e.length) return t._finID = vl.concat([e, vl.from([0, 0, 0, 1])]), vl.concat([e, vl.from([0,
					0, 0, 2
				])]);
				var n = new _l(r),
					i = e.length,
					o = i % 16;
				n.update(e), o && (o = 16 - o, n.update(vl.alloc(o, 0))), n.update(vl.alloc(8, 0));
				var a = 8 * i,
					s = vl.alloc(8);
				s.writeUIntBE(a, 0, 8), n.update(s), t._finID = n.state;
				var f = vl.from(t._finID);
				return Ml(f), f
			}(this, r, o), this._prev = vl.from(r), this._cache = vl.allocUnsafe(0), this._secCache = vl.allocUnsafe(0),
			this._decrypt = n, this._alen = 0, this._len = 0, this._mode = t, this._authTag = null, this._called = !1
	}

	function kl() {
		gl = {}, ul(), vl = cr().Buffer, yl = eu(), wl = Mr(), _l = bl(), Al = Jc(), Ml = Od(), wl(Sl, yl), Sl.prototype
			._update = function(t) {
				if (!this._called && this._alen) {
					var e = 16 - this._alen % 16;
					e < 16 && (e = vl.alloc(e, 0), this._ghash.update(e))
				}
				this._called = !0;
				var r = this._mode.encrypt(this, t);
				return this._decrypt ? this._ghash.update(t) : this._ghash.update(r), this._len += t.length, r
			}, Sl.prototype._final = function() {
				if (this._decrypt && !this._authTag) throw new Error(
				"Unsupported state or unable to authenticate data");
				var t = Al(this._ghash.final(8 * this._alen, 8 * this._len), this._cipher.encryptBlock(this._finID));
				if (this._decrypt && function(t, e) {
						var r = 0;
						t.length !== e.length && r++;
						for (var n = Math.min(t.length, e.length), i = 0; i < n; ++i) r += t[i] ^ e[i];
						return r
					}(t, this._authTag)) throw new Error("Unsupported state or unable to authenticate data");
				this._authTag = t, this._cipher.scrub()
			}, Sl.prototype.getAuthTag = function() {
				if (this._decrypt || !vl.isBuffer(this._authTag)) throw new Error(
					"Attempting to get auth tag in unsupported state");
				return this._authTag
			}, Sl.prototype.setAuthTag = function(t) {
				if (!this._decrypt) throw new Error("Attempting to set auth tag in unsupported state");
				this._authTag = t
			}, Sl.prototype.setAAD = function(t) {
				if (this._called) throw new Error("Attempting to set AAD in unsupported state");
				this._ghash.update(t), this._alen += t.length
			}, gl = Sl
	}

	function Bl() {
		return El || (El = !0, kl()), gl
	}
	var Tl, Rl, xl, Cl = !1;

	function Il(t, e, r, n) {
		xl.call(this), this._cipher = new(ul().AES)(e), this._prev = Rl.from(r), this._cache = Rl.allocUnsafe(0), this
			._secCache = Rl.allocUnsafe(0), this._decrypt = n, this._mode = t
	}

	function Dl() {
		return Cl || (Cl = !0, Tl = {}, ul(), Rl = cr().Buffer, xl = eu(), Mr()(Il, xl), Il.prototype._update =
			function(t) {
				return this._mode.encrypt(this, t, this._decrypt)
			}, Il.prototype._final = function() {
				this._cipher.scrub()
			}, Tl = Il), Tl
	}
	var Pl, Ol, Ll, Ul = !1;

	function jl(t, e, r, n) {
		if (Ol.isBuffer(t) || (t = Ol.from(t, "binary")), e && (Ol.isBuffer(e) || (e = Ol.from(e, "binary")), 8 !== e
				.length)) throw new RangeError("salt should be Buffer with 8 byte length");
		for (var i = r / 8, o = Ol.alloc(i), a = Ol.alloc(n || 0), s = Ol.alloc(0); i > 0 || n > 0;) {
			var f = new Ll;
			f.update(s), f.update(t), e && f.update(e), s = f.digest();
			var u = 0;
			if (i > 0) {
				var h = o.length - i;
				u = Math.min(i, s.length), s.copy(o, h, 0, u), i -= u
			}
			if (u < s.length && n > 0) {
				var c = a.length - n,
					d = Math.min(n, s.length - u);
				s.copy(a, c, u, u + d), n -= d
			}
		}
		return s.fill(0), {
			key: o,
			iv: a
		}
	}

	function Nl() {
		return Ul || (Ul = !0, Pl = {}, Ol = cr().Buffer, Ll = es(), Pl = jl), Pl
	}
	var zl, Fl, ql, Hl, Wl, Gl, Yl, Kl, Vl, Zl, $l = !1;

	function Xl(t, e, r) {
		Gl.call(this), this._cache = new Jl, this._cipher = new(ul().AES)(e), this._prev = Hl.from(r), this._mode = t,
			this._autopadding = !0
	}

	function Jl() {
		this.cache = Hl.allocUnsafe(0)
	}

	function Ql(t, e, r) {
		var n = Fl[t.toLowerCase()];
		if (!n) throw new TypeError("invalid suite type");
		if ("string" == typeof e && (e = Hl.from(e)), e.length !== n.key / 8) throw new TypeError(
			"invalid key length " + e.length);
		if ("string" == typeof r && (r = Hl.from(r)), "GCM" !== n.mode && r.length !== n.iv) throw new TypeError(
			"invalid iv length " + r.length);
		return "stream" === n.type ? new Wl(n.module, e, r) : "auth" === n.type ? new ql(n.module, e, r) : new Xl(n
			.module, e, r)
	}

	function tp(t, e) {
		var r = Fl[t.toLowerCase()];
		if (!r) throw new TypeError("invalid suite type");
		var n = Yl(e, !1, r.key, r.iv);
		return Ql(t, n.key, n.iv)
	}

	function ep() {
		return $l || ($l = !0, zl = {}, Fl = Jd(), ql = Bl(), Hl = cr().Buffer, Wl = Dl(), Gl = eu(), ul(), Yl = Nl(),
			Mr()(Xl, Gl), Xl.prototype._update = function(t) {
				var e, r;
				this._cache.add(t);
				for (var n = []; e = this._cache.get();) r = this._mode.encrypt(this, e), n.push(r);
				return Hl.concat(n)
			}, Kl = Hl.alloc(16, 16), Xl.prototype._final = function() {
				var t = this._cache.flush();
				if (this._autopadding) return t = this._mode.encrypt(this, t), this._cipher.scrub(), t;
				if (!t.equals(Kl)) throw this._cipher.scrub(), new Error("data not multiple of block length")
			}, Xl.prototype.setAutoPadding = function(t) {
				return this._autopadding = !!t, this
			}, Jl.prototype.add = function(t) {
				this.cache = Hl.concat([this.cache, t])
			}, Jl.prototype.get = function() {
				if (this.cache.length > 15) {
					var t = this.cache.slice(0, 16);
					return this.cache = this.cache.slice(16), t
				}
				return null
			}, Jl.prototype.flush = function() {
				for (var t = 16 - this.cache.length, e = Hl.allocUnsafe(t), r = -1; ++r < t;) e.writeUInt8(t, r);
				return Hl.concat([this.cache, e])
			}, Vl = Ql, zl.createCipheriv = Vl, Zl = tp, zl.createCipher = Zl), zl
	}
	var rp, np, ip, op, ap, sp, fp, up, hp, cp = !1;

	function dp(t, e, r) {
		sp.call(this), this._cache = new lp, this._last = void 0, this._cipher = new(ul().AES)(e), this._prev = ip.from(
			r), this._mode = t, this._autopadding = !0
	}

	function lp() {
		this.cache = ip.allocUnsafe(0)
	}

	function pp(t, e, r) {
		var n = op[t.toLowerCase()];
		if (!n) throw new TypeError("invalid suite type");
		if ("string" == typeof r && (r = ip.from(r)), "GCM" !== n.mode && r.length !== n.iv) throw new TypeError(
			"invalid iv length " + r.length);
		if ("string" == typeof e && (e = ip.from(e)), e.length !== n.key / 8) throw new TypeError(
			"invalid key length " + e.length);
		return "stream" === n.type ? new ap(n.module, e, r, !0) : "auth" === n.type ? new np(n.module, e, r, !0) :
			new dp(n.module, e, r)
	}

	function mp(t, e) {
		var r = op[t.toLowerCase()];
		if (!r) throw new TypeError("invalid suite type");
		var n = fp(e, !1, r.key, r.iv);
		return pp(t, n.key, n.iv)
	}

	function bp() {
		rp = {}, np = Bl(), ip = cr().Buffer, op = Jd(), ap = Dl(), sp = eu(), ul(), fp = Nl(), Mr()(dp, sp), dp
			.prototype._update = function(t) {
				var e, r;
				this._cache.add(t);
				for (var n = []; e = this._cache.get(this._autopadding);) r = this._mode.decrypt(this, e), n.push(r);
				return ip.concat(n)
			}, dp.prototype._final = function() {
				var t = this._cache.flush();
				if (this._autopadding) return function(t) {
					var e = t[15];
					if (e < 1 || e > 16) throw new Error("unable to decrypt data");
					for (var r = -1; ++r < e;)
						if (t[r + (16 - e)] !== e) throw new Error("unable to decrypt data");
					if (16 !== e) return t.slice(0, 16 - e)
				}(this._mode.decrypt(this, t));
				if (t) throw new Error("data not multiple of block length")
			}, dp.prototype.setAutoPadding = function(t) {
				return this._autopadding = !!t, this
			}, lp.prototype.add = function(t) {
				this.cache = ip.concat([this.cache, t])
			}, lp.prototype.get = function(t) {
				var e;
				if (t) {
					if (this.cache.length > 16) return e = this.cache.slice(0, 16), this.cache = this.cache.slice(16), e
				} else if (this.cache.length >= 16) return e = this.cache.slice(0, 16), this.cache = this.cache.slice(
					16), e;
				return null
			}, lp.prototype.flush = function() {
				if (this.cache.length) return this.cache
			}, up = mp, rp.createDecipher = up, hp = pp, rp.createDecipheriv = hp
	}

	function gp() {
		return cp || (cp = !0, bp()), rp
	}
	var vp, yp, wp, _p, Ap, Mp, Ep, Sp, kp, Bp, Tp, Rp, xp = !1;

	function Cp() {
		return Object.keys(Ep)
	}

	function Ip() {
		return xp || (xp = !0, Mp = {}, ep(), gp(), Ep = Yd(), vp = ep().createCipher, Sp = Mp.Cipher = vp, Mp
			.createCipher = Sp, yp = ep().createCipheriv, kp = Mp.Cipheriv = yp, Mp.createCipheriv = kp, wp = gp()
			.createDecipher, Bp = Mp.Decipher = wp, Mp.createDecipher = Bp, _p = gp().createDecipheriv, Tp = Mp
			.Decipheriv = _p, Mp.createDecipheriv = Tp, Ap = Cp, Rp = Mp.getCiphers = Ap, Mp.listCiphers = Rp), Mp
	}
	var Dp, Pp, Op, Lp, Up, jp, Np, zp, Fp = !1;

	function qp() {
		return Fp || (Fp = !0, (Op = {})["des-ecb"] = {
			key: 8,
			iv: 0
		}, Dp = {
			key: 8,
			iv: 8
		}, Lp = Op.des = Dp, Op["des-cbc"] = Lp, Pp = {
			key: 24,
			iv: 8
		}, Up = Op.des3 = Pp, Op["des-ede3-cbc"] = Up, jp = {
			key: 24,
			iv: 0
		}, Op["des-ede3"] = jp, Np = {
			key: 16,
			iv: 8
		}, Op["des-ede-cbc"] = Np, zp = {
			key: 16,
			iv: 0
		}, Op["des-ede"] = zp), Op
	}
	var Hp, Wp, Gp, Yp, Kp, Vp, Zp, $p, Xp, Jp, Qp, tm, em, rm, nm, im = !1;

	function om(t, e) {
		var r, n;
		if (t = t.toLowerCase(), $p[t]) r = $p[t].key, n = $p[t].iv;
		else {
			if (!Xp[t]) throw new TypeError("invalid suite type");
			r = 8 * Xp[t].key, n = Xp[t].iv
		}
		var i = Jp(e, !1, r, n);
		return sm(t, i.key, i.iv)
	}

	function am(t, e) {
		var r, n;
		if (t = t.toLowerCase(), $p[t]) r = $p[t].key, n = $p[t].iv;
		else {
			if (!Xp[t]) throw new TypeError("invalid suite type");
			r = 8 * Xp[t].key, n = Xp[t].iv
		}
		var i = Jp(e, !1, r, n);
		return fm(t, i.key, i.iv)
	}

	function sm(t, e, r) {
		if (t = t.toLowerCase(), $p[t]) return Ip().createCipheriv(t, e, r);
		if (Xp[t]) return new Zp({
			key: e,
			iv: r,
			mode: t
		});
		throw new TypeError("invalid suite type")
	}

	function fm(t, e, r) {
		if (t = t.toLowerCase(), $p[t]) return Ip().createDecipheriv(t, e, r);
		if (Xp[t]) return new Zp({
			key: e,
			iv: r,
			mode: t,
			decrypt: !0
		});
		throw new TypeError("invalid suite type")
	}

	function um() {
		return Object.keys(Xp).concat(Ip().getCiphers())
	}

	function hm() {
		return im || (im = !0, Vp = {}, Zp = Wc(), Ip(), $p = Jd(), Xp = qp(), Jp = Nl(), Hp = om, Qp = Vp.Cipher = Hp,
			Vp.createCipher = Qp, Wp = sm, tm = Vp.Cipheriv = Wp, Vp.createCipheriv = tm, Gp = am, em = Vp
			.Decipher = Gp, Vp.createDecipher = em, Yp = fm, rm = Vp.Decipheriv = Yp, Vp.createDecipheriv = rm, Kp =
			um, nm = Vp.getCiphers = Kp, Vp.listCiphers = nm), Vp
	}
	var cm, dm = !1;

	function lm() {
		cm = function() {
			var t = {
				exports: this
			};
			return function(t, e) {
				function r(t, e) {
					if (!t) throw new Error(e || "Assertion failed")
				}

				function n(t, e) {
					t.super_ = e;
					var r = function() {};
					r.prototype = e.prototype, t.prototype = new r, t.prototype.constructor = t
				}

				function i(t, e, r) {
					if (i.isBN(t)) return t;
					this.negative = 0, this.words = null, this.length = 0, this.red = null, null !== t && (
						"le" !== e && "be" !== e || (r = e, e = 10), this._init(t || 0, e || 10, r || "be"))
				}
				var o;
				"object" == typeof t ? t.exports = i : e.BN = i, i.BN = i, i.wordSize = 26;
				try {
					o = "undefined" != typeof window && void 0 !== window.Buffer ? window.Buffer : nr().Buffer
				} catch (t) {}

				function a(t, e) {
					var r = t.charCodeAt(e);
					return r >= 65 && r <= 70 ? r - 55 : r >= 97 && r <= 102 ? r - 87 : r - 48 & 15
				}

				function s(t, e, r) {
					var n = a(t, r);
					return r - 1 >= e && (n |= a(t, r - 1) << 4), n
				}

				function f(t, e, r, n) {
					for (var i = 0, o = Math.min(t.length, r), a = e; a < o; a++) {
						var s = t.charCodeAt(a) - 48;
						i *= n, i += s >= 49 ? s - 49 + 10 : s >= 17 ? s - 17 + 10 : s
					}
					return i
				}
				i.isBN = function(t) {
					return t instanceof i || null !== t && "object" == typeof t && t.constructor
						.wordSize === i.wordSize && Array.isArray(t.words)
				}, i.max = function(t, e) {
					return t.cmp(e) > 0 ? t : e
				}, i.min = function(t, e) {
					return t.cmp(e) < 0 ? t : e
				}, i.prototype._init = function(t, e, n) {
					if ("number" == typeof t) return this._initNumber(t, e, n);
					if ("object" == typeof t) return this._initArray(t, e, n);
					"hex" === e && (e = 16), r(e === (0 | e) && e >= 2 && e <= 36);
					var i = 0;
					"-" === (t = t.toString().replace(/\s+/g, ""))[0] && (i++, this.negative = 1), i < t
						.length && (16 === e ? this._parseHex(t, i, n) : (this._parseBase(t, e, i), "le" ===
							n && this._initArray(this.toArray(), e, n)))
				}, i.prototype._initNumber = function(t, e, n) {
					t < 0 && (this.negative = 1, t = -t), t < 67108864 ? (this.words = [67108863 & t], this
						.length = 1) : t < 4503599627370496 ? (this.words = [67108863 & t, t /
						67108864 & 67108863
					], this.length = 2) : (r(t < 9007199254740992), this.words = [67108863 & t, t /
						67108864 & 67108863, 1
					], this.length = 3), "le" === n && this._initArray(this.toArray(), e, n)
				}, i.prototype._initArray = function(t, e, n) {
					if (r("number" == typeof t.length), t.length <= 0) return this.words = [0], this
						.length = 1, this;
					this.length = Math.ceil(t.length / 3), this.words = new Array(this.length);
					for (var i = 0; i < this.length; i++) this.words[i] = 0;
					var o, a, s = 0;
					if ("be" === n)
						for (i = t.length - 1, o = 0; i >= 0; i -= 3) a = t[i] | t[i - 1] << 8 | t[i - 2] <<
							16, this.words[o] |= a << s & 67108863, this.words[o + 1] = a >>> 26 - s &
							67108863, (s += 24) >= 26 && (s -= 26, o++);
					else if ("le" === n)
						for (i = 0, o = 0; i < t.length; i += 3) a = t[i] | t[i + 1] << 8 | t[i + 2] << 16,
							this.words[o] |= a << s & 67108863, this.words[o + 1] = a >>> 26 - s & 67108863,
							(s += 24) >= 26 && (s -= 26, o++);
					return this.strip()
				}, i.prototype._parseHex = function(t, e, r) {
					this.length = Math.ceil((t.length - e) / 6), this.words = new Array(this.length);
					for (var n = 0; n < this.length; n++) this.words[n] = 0;
					var i, o = 0,
						a = 0;
					if ("be" === r)
						for (n = t.length - 1; n >= e; n -= 2) i = s(t, e, n) << o, this.words[a] |=
							67108863 & i, o >= 18 ? (o -= 18, a += 1, this.words[a] |= i >>> 26) : o += 8;
					else
						for (n = (t.length - e) % 2 == 0 ? e + 1 : e; n < t.length; n += 2) i = s(t, e,
							n) << o, this.words[a] |= 67108863 & i, o >= 18 ? (o -= 18, a += 1, this.words[
								a] |= i >>> 26) : o += 8;
					this.strip()
				}, i.prototype._parseBase = function(t, e, r) {
					this.words = [0], this.length = 1;
					for (var n = 0, i = 1; i <= 67108863; i *= e) n++;
					n--, i = i / e | 0;
					for (var o = t.length - r, a = o % n, s = Math.min(o, o - a) + r, u = 0, h = r; h <
						s; h += n) u = f(t, h, h + n, e), this.imuln(i), this.words[0] + u < 67108864 ? this
						.words[0] += u : this._iaddn(u);
					if (0 !== a) {
						var c = 1;
						for (u = f(t, h, t.length, e), h = 0; h < a; h++) c *= e;
						this.imuln(c), this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u)
					}
					this.strip()
				}, i.prototype.copy = function(t) {
					t.words = new Array(this.length);
					for (var e = 0; e < this.length; e++) t.words[e] = this.words[e];
					t.length = this.length, t.negative = this.negative, t.red = this.red
				}, i.prototype.clone = function() {
					var t = new i(null);
					return this.copy(t), t
				}, i.prototype._expand = function(t) {
					for (; this.length < t;) this.words[this.length++] = 0;
					return this
				}, i.prototype.strip = function() {
					for (; this.length > 1 && 0 === this.words[this.length - 1];) this.length--;
					return this._normSign()
				}, i.prototype._normSign = function() {
					return 1 === this.length && 0 === this.words[0] && (this.negative = 0), this
				}, i.prototype.inspect = function() {
					return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">"
				};
				var u = ["", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000",
						"0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000",
						"000000000000000", "0000000000000000", "00000000000000000", "000000000000000000",
						"0000000000000000000", "00000000000000000000", "000000000000000000000",
						"0000000000000000000000", "00000000000000000000000", "000000000000000000000000",
						"0000000000000000000000000"
					],
					h = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5,
						5, 5, 5, 5, 5, 5, 5, 5, 5, 5
					],
					c = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721,
						1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224,
						47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907,
						17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176
					];

				function d(t, e, r) {
					r.negative = e.negative ^ t.negative;
					var n = t.length + e.length | 0;
					r.length = n, n = n - 1 | 0;
					var i = 0 | t.words[0],
						o = 0 | e.words[0],
						a = i * o,
						s = 67108863 & a,
						f = a / 67108864 | 0;
					r.words[0] = s;
					for (var u = 1; u < n; u++) {
						for (var h = f >>> 26, c = 67108863 & f, d = Math.min(u, e.length - 1), l = Math.max(0,
								u - t.length + 1); l <= d; l++) {
							var p = u - l | 0;
							h += (a = (i = 0 | t.words[p]) * (o = 0 | e.words[l]) + c) / 67108864 | 0, c =
								67108863 & a
						}
						r.words[u] = 0 | c, f = 0 | h
					}
					return 0 !== f ? r.words[u] = 0 | f : r.length--, r.strip()
				}
				i.prototype.toString = function(t, e) {
					var n;
					if (e = 0 | e || 1, 16 === (t = t || 10) || "hex" === t) {
						n = "";
						for (var i = 0, o = 0, a = 0; a < this.length; a++) {
							var s = this.words[a],
								f = (16777215 & (s << i | o)).toString(16);
							n = 0 !== (o = s >>> 24 - i & 16777215) || a !== this.length - 1 ? u[6 - f
								.length] + f + n : f + n, (i += 2) >= 26 && (i -= 26, a--)
						}
						for (0 !== o && (n = o.toString(16) + n); n.length % e != 0;) n = "0" + n;
						return 0 !== this.negative && (n = "-" + n), n
					}
					if (t === (0 | t) && t >= 2 && t <= 36) {
						var d = h[t],
							l = c[t];
						n = "";
						var p = this.clone();
						for (p.negative = 0; !p.isZero();) {
							var m = p.modn(l).toString(t);
							n = (p = p.idivn(l)).isZero() ? m + n : u[d - m.length] + m + n
						}
						for (this.isZero() && (n = "0" + n); n.length % e != 0;) n = "0" + n;
						return 0 !== this.negative && (n = "-" + n), n
					}
					r(!1, "Base should be between 2 and 36")
				}, i.prototype.toNumber = function() {
					var t = this.words[0];
					return 2 === this.length ? t += 67108864 * this.words[1] : 3 === this.length && 1 ===
						this.words[2] ? t += 4503599627370496 + 67108864 * this.words[1] : this.length >
						2 && r(!1, "Number can only safely store up to 53 bits"), 0 !== this.negative ? -t :
						t
				}, i.prototype.toJSON = function() {
					return this.toString(16)
				}, i.prototype.toBuffer = function(t, e) {
					return r(void 0 !== o), this.toArrayLike(o, t, e)
				}, i.prototype.toArray = function(t, e) {
					return this.toArrayLike(Array, t, e)
				}, i.prototype.toArrayLike = function(t, e, n) {
					var i = this.byteLength(),
						o = n || Math.max(1, i);
					r(i <= o, "byte array longer than desired length"), r(o > 0,
						"Requested array length <= 0"), this.strip();
					var a, s, f = "le" === e,
						u = new t(o),
						h = this.clone();
					if (f) {
						for (s = 0; !h.isZero(); s++) a = h.andln(255), h.iushrn(8), u[s] = a;
						for (; s < o; s++) u[s] = 0
					} else {
						for (s = 0; s < o - i; s++) u[s] = 0;
						for (s = 0; !h.isZero(); s++) a = h.andln(255), h.iushrn(8), u[o - s - 1] = a
					}
					return u
				}, Math.clz32 ? i.prototype._countBits = function(t) {
					return 32 - Math.clz32(t)
				} : i.prototype._countBits = function(t) {
					var e = t,
						r = 0;
					return e >= 4096 && (r += 13, e >>>= 13), e >= 64 && (r += 7, e >>>= 7), e >= 8 && (r +=
						4, e >>>= 4), e >= 2 && (r += 2, e >>>= 2), r + e
				}, i.prototype._zeroBits = function(t) {
					if (0 === t) return 26;
					var e = t,
						r = 0;
					return 0 == (8191 & e) && (r += 13, e >>>= 13), 0 == (127 & e) && (r += 7, e >>>= 7),
						0 == (15 & e) && (r += 4, e >>>= 4), 0 == (3 & e) && (r += 2, e >>>= 2), 0 == (1 &
							e) && r++, r
				}, i.prototype.bitLength = function() {
					var t = this.words[this.length - 1],
						e = this._countBits(t);
					return 26 * (this.length - 1) + e
				}, i.prototype.zeroBits = function() {
					if (this.isZero()) return 0;
					for (var t = 0, e = 0; e < this.length; e++) {
						var r = this._zeroBits(this.words[e]);
						if (t += r, 26 !== r) break
					}
					return t
				}, i.prototype.byteLength = function() {
					return Math.ceil(this.bitLength() / 8)
				}, i.prototype.toTwos = function(t) {
					return 0 !== this.negative ? this.abs().inotn(t).iaddn(1) : this.clone()
				}, i.prototype.fromTwos = function(t) {
					return this.testn(t - 1) ? this.notn(t).iaddn(1).ineg() : this.clone()
				}, i.prototype.isNeg = function() {
					return 0 !== this.negative
				}, i.prototype.neg = function() {
					return this.clone().ineg()
				}, i.prototype.ineg = function() {
					return this.isZero() || (this.negative ^= 1), this
				}, i.prototype.iuor = function(t) {
					for (; this.length < t.length;) this.words[this.length++] = 0;
					for (var e = 0; e < t.length; e++) this.words[e] = this.words[e] | t.words[e];
					return this.strip()
				}, i.prototype.ior = function(t) {
					return r(0 == (this.negative | t.negative)), this.iuor(t)
				}, i.prototype.or = function(t) {
					return this.length > t.length ? this.clone().ior(t) : t.clone().ior(this)
				}, i.prototype.uor = function(t) {
					return this.length > t.length ? this.clone().iuor(t) : t.clone().iuor(this)
				}, i.prototype.iuand = function(t) {
					var e;
					e = this.length > t.length ? t : this;
					for (var r = 0; r < e.length; r++) this.words[r] = this.words[r] & t.words[r];
					return this.length = e.length, this.strip()
				}, i.prototype.iand = function(t) {
					return r(0 == (this.negative | t.negative)), this.iuand(t)
				}, i.prototype.and = function(t) {
					return this.length > t.length ? this.clone().iand(t) : t.clone().iand(this)
				}, i.prototype.uand = function(t) {
					return this.length > t.length ? this.clone().iuand(t) : t.clone().iuand(this)
				}, i.prototype.iuxor = function(t) {
					var e, r;
					this.length > t.length ? (e = this, r = t) : (e = t, r = this);
					for (var n = 0; n < r.length; n++) this.words[n] = e.words[n] ^ r.words[n];
					if (this !== e)
						for (; n < e.length; n++) this.words[n] = e.words[n];
					return this.length = e.length, this.strip()
				}, i.prototype.ixor = function(t) {
					return r(0 == (this.negative | t.negative)), this.iuxor(t)
				}, i.prototype.xor = function(t) {
					return this.length > t.length ? this.clone().ixor(t) : t.clone().ixor(this)
				}, i.prototype.uxor = function(t) {
					return this.length > t.length ? this.clone().iuxor(t) : t.clone().iuxor(this)
				}, i.prototype.inotn = function(t) {
					r("number" == typeof t && t >= 0);
					var e = 0 | Math.ceil(t / 26),
						n = t % 26;
					this._expand(e), n > 0 && e--;
					for (var i = 0; i < e; i++) this.words[i] = 67108863 & ~this.words[i];
					return n > 0 && (this.words[i] = ~this.words[i] & 67108863 >> 26 - n), this.strip()
				}, i.prototype.notn = function(t) {
					return this.clone().inotn(t)
				}, i.prototype.setn = function(t, e) {
					r("number" == typeof t && t >= 0);
					var n = t / 26 | 0,
						i = t % 26;
					return this._expand(n + 1), this.words[n] = e ? this.words[n] | 1 << i : this.words[n] &
						~(1 << i), this.strip()
				}, i.prototype.iadd = function(t) {
					var e, r, n;
					if (0 !== this.negative && 0 === t.negative) return this.negative = 0, e = this.isub(t),
						this.negative ^= 1, this._normSign();
					if (0 === this.negative && 0 !== t.negative) return t.negative = 0, e = this.isub(t), t
						.negative = 1, e._normSign();
					this.length > t.length ? (r = this, n = t) : (r = t, n = this);
					for (var i = 0, o = 0; o < n.length; o++) e = (0 | r.words[o]) + (0 | n.words[o]) + i,
						this.words[o] = 67108863 & e, i = e >>> 26;
					for (; 0 !== i && o < r.length; o++) e = (0 | r.words[o]) + i, this.words[o] =
						67108863 & e, i = e >>> 26;
					if (this.length = r.length, 0 !== i) this.words[this.length] = i, this.length++;
					else if (r !== this)
						for (; o < r.length; o++) this.words[o] = r.words[o];
					return this
				}, i.prototype.add = function(t) {
					var e;
					return 0 !== t.negative && 0 === this.negative ? (t.negative = 0, e = this.sub(t), t
						.negative ^= 1, e) : 0 === t.negative && 0 !== this.negative ? (this.negative =
						0, e = t.sub(this), this.negative = 1, e) : this.length > t.length ? this
					.clone().iadd(t) : t.clone().iadd(this)
				}, i.prototype.isub = function(t) {
					if (0 !== t.negative) {
						t.negative = 0;
						var e = this.iadd(t);
						return t.negative = 1, e._normSign()
					}
					if (0 !== this.negative) return this.negative = 0, this.iadd(t), this.negative = 1, this
						._normSign();
					var r, n, i = this.cmp(t);
					if (0 === i) return this.negative = 0, this.length = 1, this.words[0] = 0, this;
					i > 0 ? (r = this, n = t) : (r = t, n = this);
					for (var o = 0, a = 0; a < n.length; a++) o = (e = (0 | r.words[a]) - (0 | n.words[a]) +
						o) >> 26, this.words[a] = 67108863 & e;
					for (; 0 !== o && a < r.length; a++) o = (e = (0 | r.words[a]) + o) >> 26, this.words[
						a] = 67108863 & e;
					if (0 === o && a < r.length && r !== this)
						for (; a < r.length; a++) this.words[a] = r.words[a];
					return this.length = Math.max(this.length, a), r !== this && (this.negative = 1), this
						.strip()
				}, i.prototype.sub = function(t) {
					return this.clone().isub(t)
				};
				var l = function(t, e, r) {
					var n, i, o, a = t.words,
						s = e.words,
						f = r.words,
						u = 0,
						h = 0 | a[0],
						c = 8191 & h,
						d = h >>> 13,
						l = 0 | a[1],
						p = 8191 & l,
						m = l >>> 13,
						b = 0 | a[2],
						g = 8191 & b,
						v = b >>> 13,
						y = 0 | a[3],
						w = 8191 & y,
						_ = y >>> 13,
						A = 0 | a[4],
						M = 8191 & A,
						E = A >>> 13,
						S = 0 | a[5],
						k = 8191 & S,
						B = S >>> 13,
						T = 0 | a[6],
						R = 8191 & T,
						x = T >>> 13,
						C = 0 | a[7],
						I = 8191 & C,
						D = C >>> 13,
						P = 0 | a[8],
						O = 8191 & P,
						L = P >>> 13,
						U = 0 | a[9],
						j = 8191 & U,
						N = U >>> 13,
						z = 0 | s[0],
						F = 8191 & z,
						q = z >>> 13,
						H = 0 | s[1],
						W = 8191 & H,
						G = H >>> 13,
						Y = 0 | s[2],
						K = 8191 & Y,
						V = Y >>> 13,
						Z = 0 | s[3],
						$ = 8191 & Z,
						X = Z >>> 13,
						J = 0 | s[4],
						Q = 8191 & J,
						tt = J >>> 13,
						et = 0 | s[5],
						rt = 8191 & et,
						nt = et >>> 13,
						it = 0 | s[6],
						ot = 8191 & it,
						at = it >>> 13,
						st = 0 | s[7],
						ft = 8191 & st,
						ut = st >>> 13,
						ht = 0 | s[8],
						ct = 8191 & ht,
						dt = ht >>> 13,
						lt = 0 | s[9],
						pt = 8191 & lt,
						mt = lt >>> 13;
					r.negative = t.negative ^ e.negative, r.length = 19;
					var bt = (u + (n = Math.imul(c, F)) | 0) + ((8191 & (i = (i = Math.imul(c, q)) + Math
						.imul(d, F) | 0)) << 13) | 0;
					u = ((o = Math.imul(d, q)) + (i >>> 13) | 0) + (bt >>> 26) | 0, bt &= 67108863, n = Math
						.imul(p, F), i = (i = Math.imul(p, q)) + Math.imul(m, F) | 0, o = Math.imul(m, q);
					var gt = (u + (n = n + Math.imul(c, W) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(c,
						G) | 0) + Math.imul(d, W) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(d, G) | 0) + (i >>> 13) | 0) + (gt >>> 26) | 0, gt &= 67108863,
						n = Math.imul(g, F), i = (i = Math.imul(g, q)) + Math.imul(v, F) | 0, o = Math.imul(
							v, q), n = n + Math.imul(p, W) | 0, i = (i = i + Math.imul(p, G) | 0) + Math
						.imul(m, W) | 0, o = o + Math.imul(m, G) | 0;
					var vt = (u + (n = n + Math.imul(c, K) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(c,
						V) | 0) + Math.imul(d, K) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(d, V) | 0) + (i >>> 13) | 0) + (vt >>> 26) | 0, vt &= 67108863,
						n = Math.imul(w, F), i = (i = Math.imul(w, q)) + Math.imul(_, F) | 0, o = Math.imul(
							_, q), n = n + Math.imul(g, W) | 0, i = (i = i + Math.imul(g, G) | 0) + Math
						.imul(v, W) | 0, o = o + Math.imul(v, G) | 0, n = n + Math.imul(p, K) | 0, i = (i =
							i + Math.imul(p, V) | 0) + Math.imul(m, K) | 0, o = o + Math.imul(m, V) | 0;
					var yt = (u + (n = n + Math.imul(c, $) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(c,
						X) | 0) + Math.imul(d, $) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(d, X) | 0) + (i >>> 13) | 0) + (yt >>> 26) | 0, yt &= 67108863,
						n = Math.imul(M, F), i = (i = Math.imul(M, q)) + Math.imul(E, F) | 0, o = Math.imul(
							E, q), n = n + Math.imul(w, W) | 0, i = (i = i + Math.imul(w, G) | 0) + Math
						.imul(_, W) | 0, o = o + Math.imul(_, G) | 0, n = n + Math.imul(g, K) | 0, i = (i =
							i + Math.imul(g, V) | 0) + Math.imul(v, K) | 0, o = o + Math.imul(v, V) | 0, n =
						n + Math.imul(p, $) | 0, i = (i = i + Math.imul(p, X) | 0) + Math.imul(m, $) | 0,
						o = o + Math.imul(m, X) | 0;
					var wt = (u + (n = n + Math.imul(c, Q) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(c,
						tt) | 0) + Math.imul(d, Q) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(d, tt) | 0) + (i >>> 13) | 0) + (wt >>> 26) | 0, wt &= 67108863,
						n = Math.imul(k, F), i = (i = Math.imul(k, q)) + Math.imul(B, F) | 0, o = Math.imul(
							B, q), n = n + Math.imul(M, W) | 0, i = (i = i + Math.imul(M, G) | 0) + Math
						.imul(E, W) | 0, o = o + Math.imul(E, G) | 0, n = n + Math.imul(w, K) | 0, i = (i =
							i + Math.imul(w, V) | 0) + Math.imul(_, K) | 0, o = o + Math.imul(_, V) | 0, n =
						n + Math.imul(g, $) | 0, i = (i = i + Math.imul(g, X) | 0) + Math.imul(v, $) | 0,
						o = o + Math.imul(v, X) | 0, n = n + Math.imul(p, Q) | 0, i = (i = i + Math.imul(p,
							tt) | 0) + Math.imul(m, Q) | 0, o = o + Math.imul(m, tt) | 0;
					var _t = (u + (n = n + Math.imul(c, rt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(c,
						nt) | 0) + Math.imul(d, rt) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(d, nt) | 0) + (i >>> 13) | 0) + (_t >>> 26) | 0, _t &= 67108863,
						n = Math.imul(R, F), i = (i = Math.imul(R, q)) + Math.imul(x, F) | 0, o = Math.imul(
							x, q), n = n + Math.imul(k, W) | 0, i = (i = i + Math.imul(k, G) | 0) + Math
						.imul(B, W) | 0, o = o + Math.imul(B, G) | 0, n = n + Math.imul(M, K) | 0, i = (i =
							i + Math.imul(M, V) | 0) + Math.imul(E, K) | 0, o = o + Math.imul(E, V) | 0, n =
						n + Math.imul(w, $) | 0, i = (i = i + Math.imul(w, X) | 0) + Math.imul(_, $) | 0,
						o = o + Math.imul(_, X) | 0, n = n + Math.imul(g, Q) | 0, i = (i = i + Math.imul(g,
							tt) | 0) + Math.imul(v, Q) | 0, o = o + Math.imul(v, tt) | 0, n = n + Math.imul(
							p, rt) | 0, i = (i = i + Math.imul(p, nt) | 0) + Math.imul(m, rt) | 0, o = o +
						Math.imul(m, nt) | 0;
					var At = (u + (n = n + Math.imul(c, ot) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(c,
						at) | 0) + Math.imul(d, ot) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(d, at) | 0) + (i >>> 13) | 0) + (At >>> 26) | 0, At &= 67108863,
						n = Math.imul(I, F), i = (i = Math.imul(I, q)) + Math.imul(D, F) | 0, o = Math.imul(
							D, q), n = n + Math.imul(R, W) | 0, i = (i = i + Math.imul(R, G) | 0) + Math
						.imul(x, W) | 0, o = o + Math.imul(x, G) | 0, n = n + Math.imul(k, K) | 0, i = (i =
							i + Math.imul(k, V) | 0) + Math.imul(B, K) | 0, o = o + Math.imul(B, V) | 0, n =
						n + Math.imul(M, $) | 0, i = (i = i + Math.imul(M, X) | 0) + Math.imul(E, $) | 0,
						o = o + Math.imul(E, X) | 0, n = n + Math.imul(w, Q) | 0, i = (i = i + Math.imul(w,
							tt) | 0) + Math.imul(_, Q) | 0, o = o + Math.imul(_, tt) | 0, n = n + Math.imul(
							g, rt) | 0, i = (i = i + Math.imul(g, nt) | 0) + Math.imul(v, rt) | 0, o = o +
						Math.imul(v, nt) | 0, n = n + Math.imul(p, ot) | 0, i = (i = i + Math.imul(p, at) |
							0) + Math.imul(m, ot) | 0, o = o + Math.imul(m, at) | 0;
					var Mt = (u + (n = n + Math.imul(c, ft) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(c,
						ut) | 0) + Math.imul(d, ft) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(d, ut) | 0) + (i >>> 13) | 0) + (Mt >>> 26) | 0, Mt &= 67108863,
						n = Math.imul(O, F), i = (i = Math.imul(O, q)) + Math.imul(L, F) | 0, o = Math.imul(
							L, q), n = n + Math.imul(I, W) | 0, i = (i = i + Math.imul(I, G) | 0) + Math
						.imul(D, W) | 0, o = o + Math.imul(D, G) | 0, n = n + Math.imul(R, K) | 0, i = (i =
							i + Math.imul(R, V) | 0) + Math.imul(x, K) | 0, o = o + Math.imul(x, V) | 0, n =
						n + Math.imul(k, $) | 0, i = (i = i + Math.imul(k, X) | 0) + Math.imul(B, $) | 0,
						o = o + Math.imul(B, X) | 0, n = n + Math.imul(M, Q) | 0, i = (i = i + Math.imul(M,
							tt) | 0) + Math.imul(E, Q) | 0, o = o + Math.imul(E, tt) | 0, n = n + Math.imul(
							w, rt) | 0, i = (i = i + Math.imul(w, nt) | 0) + Math.imul(_, rt) | 0, o = o +
						Math.imul(_, nt) | 0, n = n + Math.imul(g, ot) | 0, i = (i = i + Math.imul(g, at) |
							0) + Math.imul(v, ot) | 0, o = o + Math.imul(v, at) | 0, n = n + Math.imul(p,
							ft) | 0, i = (i = i + Math.imul(p, ut) | 0) + Math.imul(m, ft) | 0, o = o + Math
						.imul(m, ut) | 0;
					var Et = (u + (n = n + Math.imul(c, ct) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(c,
						dt) | 0) + Math.imul(d, ct) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(d, dt) | 0) + (i >>> 13) | 0) + (Et >>> 26) | 0, Et &= 67108863,
						n = Math.imul(j, F), i = (i = Math.imul(j, q)) + Math.imul(N, F) | 0, o = Math.imul(
							N, q), n = n + Math.imul(O, W) | 0, i = (i = i + Math.imul(O, G) | 0) + Math
						.imul(L, W) | 0, o = o + Math.imul(L, G) | 0, n = n + Math.imul(I, K) | 0, i = (i =
							i + Math.imul(I, V) | 0) + Math.imul(D, K) | 0, o = o + Math.imul(D, V) | 0, n =
						n + Math.imul(R, $) | 0, i = (i = i + Math.imul(R, X) | 0) + Math.imul(x, $) | 0,
						o = o + Math.imul(x, X) | 0, n = n + Math.imul(k, Q) | 0, i = (i = i + Math.imul(k,
							tt) | 0) + Math.imul(B, Q) | 0, o = o + Math.imul(B, tt) | 0, n = n + Math.imul(
							M, rt) | 0, i = (i = i + Math.imul(M, nt) | 0) + Math.imul(E, rt) | 0, o = o +
						Math.imul(E, nt) | 0, n = n + Math.imul(w, ot) | 0, i = (i = i + Math.imul(w, at) |
							0) + Math.imul(_, ot) | 0, o = o + Math.imul(_, at) | 0, n = n + Math.imul(g,
							ft) | 0, i = (i = i + Math.imul(g, ut) | 0) + Math.imul(v, ft) | 0, o = o + Math
						.imul(v, ut) | 0, n = n + Math.imul(p, ct) | 0, i = (i = i + Math.imul(p, dt) | 0) +
						Math.imul(m, ct) | 0, o = o + Math.imul(m, dt) | 0;
					var St = (u + (n = n + Math.imul(c, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(c,
						mt) | 0) + Math.imul(d, pt) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(d, mt) | 0) + (i >>> 13) | 0) + (St >>> 26) | 0, St &= 67108863,
						n = Math.imul(j, W), i = (i = Math.imul(j, G)) + Math.imul(N, W) | 0, o = Math.imul(
							N, G), n = n + Math.imul(O, K) | 0, i = (i = i + Math.imul(O, V) | 0) + Math
						.imul(L, K) | 0, o = o + Math.imul(L, V) | 0, n = n + Math.imul(I, $) | 0, i = (i =
							i + Math.imul(I, X) | 0) + Math.imul(D, $) | 0, o = o + Math.imul(D, X) | 0, n =
						n + Math.imul(R, Q) | 0, i = (i = i + Math.imul(R, tt) | 0) + Math.imul(x, Q) | 0,
						o = o + Math.imul(x, tt) | 0, n = n + Math.imul(k, rt) | 0, i = (i = i + Math.imul(
							k, nt) | 0) + Math.imul(B, rt) | 0, o = o + Math.imul(B, nt) | 0, n = n + Math
						.imul(M, ot) | 0, i = (i = i + Math.imul(M, at) | 0) + Math.imul(E, ot) | 0, o = o +
						Math.imul(E, at) | 0, n = n + Math.imul(w, ft) | 0, i = (i = i + Math.imul(w, ut) |
							0) + Math.imul(_, ft) | 0, o = o + Math.imul(_, ut) | 0, n = n + Math.imul(g,
							ct) | 0, i = (i = i + Math.imul(g, dt) | 0) + Math.imul(v, ct) | 0, o = o + Math
						.imul(v, dt) | 0;
					var kt = (u + (n = n + Math.imul(p, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(p,
						mt) | 0) + Math.imul(m, pt) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(m, mt) | 0) + (i >>> 13) | 0) + (kt >>> 26) | 0, kt &= 67108863,
						n = Math.imul(j, K), i = (i = Math.imul(j, V)) + Math.imul(N, K) | 0, o = Math.imul(
							N, V), n = n + Math.imul(O, $) | 0, i = (i = i + Math.imul(O, X) | 0) + Math
						.imul(L, $) | 0, o = o + Math.imul(L, X) | 0, n = n + Math.imul(I, Q) | 0, i = (i =
							i + Math.imul(I, tt) | 0) + Math.imul(D, Q) | 0, o = o + Math.imul(D, tt) | 0,
						n = n + Math.imul(R, rt) | 0, i = (i = i + Math.imul(R, nt) | 0) + Math.imul(x,
						rt) | 0, o = o + Math.imul(x, nt) | 0, n = n + Math.imul(k, ot) | 0, i = (i = i +
							Math.imul(k, at) | 0) + Math.imul(B, ot) | 0, o = o + Math.imul(B, at) | 0, n =
						n + Math.imul(M, ft) | 0, i = (i = i + Math.imul(M, ut) | 0) + Math.imul(E, ft) | 0,
						o = o + Math.imul(E, ut) | 0, n = n + Math.imul(w, ct) | 0, i = (i = i + Math.imul(
							w, dt) | 0) + Math.imul(_, ct) | 0, o = o + Math.imul(_, dt) | 0;
					var Bt = (u + (n = n + Math.imul(g, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(g,
						mt) | 0) + Math.imul(v, pt) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(v, mt) | 0) + (i >>> 13) | 0) + (Bt >>> 26) | 0, Bt &= 67108863,
						n = Math.imul(j, $), i = (i = Math.imul(j, X)) + Math.imul(N, $) | 0, o = Math.imul(
							N, X), n = n + Math.imul(O, Q) | 0, i = (i = i + Math.imul(O, tt) | 0) + Math
						.imul(L, Q) | 0, o = o + Math.imul(L, tt) | 0, n = n + Math.imul(I, rt) | 0, i = (
							i = i + Math.imul(I, nt) | 0) + Math.imul(D, rt) | 0, o = o + Math.imul(D, nt) |
						0, n = n + Math.imul(R, ot) | 0, i = (i = i + Math.imul(R, at) | 0) + Math.imul(x,
							ot) | 0, o = o + Math.imul(x, at) | 0, n = n + Math.imul(k, ft) | 0, i = (i =
							i + Math.imul(k, ut) | 0) + Math.imul(B, ft) | 0, o = o + Math.imul(B, ut) | 0,
						n = n + Math.imul(M, ct) | 0, i = (i = i + Math.imul(M, dt) | 0) + Math.imul(E,
						ct) | 0, o = o + Math.imul(E, dt) | 0;
					var Tt = (u + (n = n + Math.imul(w, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(w,
						mt) | 0) + Math.imul(_, pt) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(_, mt) | 0) + (i >>> 13) | 0) + (Tt >>> 26) | 0, Tt &= 67108863,
						n = Math.imul(j, Q), i = (i = Math.imul(j, tt)) + Math.imul(N, Q) | 0, o = Math
						.imul(N, tt), n = n + Math.imul(O, rt) | 0, i = (i = i + Math.imul(O, nt) | 0) +
						Math.imul(L, rt) | 0, o = o + Math.imul(L, nt) | 0, n = n + Math.imul(I, ot) | 0,
						i = (i = i + Math.imul(I, at) | 0) + Math.imul(D, ot) | 0, o = o + Math.imul(D,
						at) | 0, n = n + Math.imul(R, ft) | 0, i = (i = i + Math.imul(R, ut) | 0) + Math
						.imul(x, ft) | 0, o = o + Math.imul(x, ut) | 0, n = n + Math.imul(k, ct) | 0, i = (
							i = i + Math.imul(k, dt) | 0) + Math.imul(B, ct) | 0, o = o + Math.imul(B, dt) |
						0;
					var Rt = (u + (n = n + Math.imul(M, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(M,
						mt) | 0) + Math.imul(E, pt) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(E, mt) | 0) + (i >>> 13) | 0) + (Rt >>> 26) | 0, Rt &= 67108863,
						n = Math.imul(j, rt), i = (i = Math.imul(j, nt)) + Math.imul(N, rt) | 0, o = Math
						.imul(N, nt), n = n + Math.imul(O, ot) | 0, i = (i = i + Math.imul(O, at) | 0) +
						Math.imul(L, ot) | 0, o = o + Math.imul(L, at) | 0, n = n + Math.imul(I, ft) | 0,
						i = (i = i + Math.imul(I, ut) | 0) + Math.imul(D, ft) | 0, o = o + Math.imul(D,
						ut) | 0, n = n + Math.imul(R, ct) | 0, i = (i = i + Math.imul(R, dt) | 0) + Math
						.imul(x, ct) | 0, o = o + Math.imul(x, dt) | 0;
					var xt = (u + (n = n + Math.imul(k, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(k,
						mt) | 0) + Math.imul(B, pt) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(B, mt) | 0) + (i >>> 13) | 0) + (xt >>> 26) | 0, xt &= 67108863,
						n = Math.imul(j, ot), i = (i = Math.imul(j, at)) + Math.imul(N, ot) | 0, o = Math
						.imul(N, at), n = n + Math.imul(O, ft) | 0, i = (i = i + Math.imul(O, ut) | 0) +
						Math.imul(L, ft) | 0, o = o + Math.imul(L, ut) | 0, n = n + Math.imul(I, ct) | 0,
						i = (i = i + Math.imul(I, dt) | 0) + Math.imul(D, ct) | 0, o = o + Math.imul(D,
						dt) | 0;
					var Ct = (u + (n = n + Math.imul(R, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(R,
						mt) | 0) + Math.imul(x, pt) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(x, mt) | 0) + (i >>> 13) | 0) + (Ct >>> 26) | 0, Ct &= 67108863,
						n = Math.imul(j, ft), i = (i = Math.imul(j, ut)) + Math.imul(N, ft) | 0, o = Math
						.imul(N, ut), n = n + Math.imul(O, ct) | 0, i = (i = i + Math.imul(O, dt) | 0) +
						Math.imul(L, ct) | 0, o = o + Math.imul(L, dt) | 0;
					var It = (u + (n = n + Math.imul(I, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(I,
						mt) | 0) + Math.imul(D, pt) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(D, mt) | 0) + (i >>> 13) | 0) + (It >>> 26) | 0, It &= 67108863,
						n = Math.imul(j, ct), i = (i = Math.imul(j, dt)) + Math.imul(N, ct) | 0, o = Math
						.imul(N, dt);
					var Dt = (u + (n = n + Math.imul(O, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(O,
						mt) | 0) + Math.imul(L, pt) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(L, mt) | 0) + (i >>> 13) | 0) + (Dt >>> 26) | 0, Dt &= 67108863;
					var Pt = (u + (n = Math.imul(j, pt)) | 0) + ((8191 & (i = (i = Math.imul(j, mt)) + Math
						.imul(N, pt) | 0)) << 13) | 0;
					return u = ((o = Math.imul(N, mt)) + (i >>> 13) | 0) + (Pt >>> 26) | 0, Pt &= 67108863,
						f[0] = bt, f[1] = gt, f[2] = vt, f[3] = yt, f[4] = wt, f[5] = _t, f[6] = At, f[7] =
						Mt, f[8] = Et, f[9] = St, f[10] = kt, f[11] = Bt, f[12] = Tt, f[13] = Rt, f[14] =
						xt, f[15] = Ct, f[16] = It, f[17] = Dt, f[18] = Pt, 0 !== u && (f[19] = u, r
							.length++), r
				};

				function p(t, e, r) {
					return (new m).mulp(t, e, r)
				}

				function m(t, e) {
					this.x = t, this.y = e
				}
				Math.imul || (l = d), i.prototype.mulTo = function(t, e) {
					var r = this.length + t.length;
					return 10 === this.length && 10 === t.length ? l(this, t, e) : r < 63 ? d(this, t, e) :
						r < 1024 ? function(t, e, r) {
							r.negative = e.negative ^ t.negative, r.length = t.length + e.length;
							for (var n = 0, i = 0, o = 0; o < r.length - 1; o++) {
								var a = i;
								i = 0;
								for (var s = 67108863 & n, f = Math.min(o, e.length - 1), u = Math.max(0,
										o - t.length + 1); u <= f; u++) {
									var h = o - u,
										c = (0 | t.words[h]) * (0 | e.words[u]),
										d = 67108863 & c;
									s = 67108863 & (d = d + s | 0), i += (a = (a = a + (c / 67108864 | 0) |
										0) + (d >>> 26) | 0) >>> 26, a &= 67108863
								}
								r.words[o] = s, n = a, a = i
							}
							return 0 !== n ? r.words[o] = n : r.length--, r.strip()
						}(this, t, e) : p(this, t, e)
				}, m.prototype.makeRBT = function(t) {
					for (var e = new Array(t), r = i.prototype._countBits(t) - 1, n = 0; n < t; n++) e[n] =
						this.revBin(n, r, t);
					return e
				}, m.prototype.revBin = function(t, e, r) {
					if (0 === t || t === r - 1) return t;
					for (var n = 0, i = 0; i < e; i++) n |= (1 & t) << e - i - 1, t >>= 1;
					return n
				}, m.prototype.permute = function(t, e, r, n, i, o) {
					for (var a = 0; a < o; a++) n[a] = e[t[a]], i[a] = r[t[a]]
				}, m.prototype.transform = function(t, e, r, n, i, o) {
					this.permute(o, t, e, r, n, i);
					for (var a = 1; a < i; a <<= 1)
						for (var s = a << 1, f = Math.cos(2 * Math.PI / s), u = Math.sin(2 * Math.PI / s),
								h = 0; h < i; h += s)
							for (var c = f, d = u, l = 0; l < a; l++) {
								var p = r[h + l],
									m = n[h + l],
									b = r[h + l + a],
									g = n[h + l + a],
									v = c * b - d * g;
								g = c * g + d * b, b = v, r[h + l] = p + b, n[h + l] = m + g, r[h + l + a] =
									p - b, n[h + l + a] = m - g, l !== s && (v = f * c - u * d, d = f * d +
										u * c, c = v)
							}
				}, m.prototype.guessLen13b = function(t, e) {
					var r = 1 | Math.max(e, t),
						n = 1 & r,
						i = 0;
					for (r = r / 2 | 0; r; r >>>= 1) i++;
					return 1 << i + 1 + n
				}, m.prototype.conjugate = function(t, e, r) {
					if (!(r <= 1))
						for (var n = 0; n < r / 2; n++) {
							var i = t[n];
							t[n] = t[r - n - 1], t[r - n - 1] = i, i = e[n], e[n] = -e[r - n - 1], e[r - n -
								1] = -i
						}
				}, m.prototype.normalize13b = function(t, e) {
					for (var r = 0, n = 0; n < e / 2; n++) {
						var i = 8192 * Math.round(t[2 * n + 1] / e) + Math.round(t[2 * n] / e) + r;
						t[n] = 67108863 & i, r = i < 67108864 ? 0 : i / 67108864 | 0
					}
					return t
				}, m.prototype.convert13b = function(t, e, n, i) {
					for (var o = 0, a = 0; a < e; a++) o += 0 | t[a], n[2 * a] = 8191 & o, o >>>= 13, n[2 *
						a + 1] = 8191 & o, o >>>= 13;
					for (a = 2 * e; a < i; ++a) n[a] = 0;
					r(0 === o), r(0 == (-8192 & o))
				}, m.prototype.stub = function(t) {
					for (var e = new Array(t), r = 0; r < t; r++) e[r] = 0;
					return e
				}, m.prototype.mulp = function(t, e, r) {
					var n = 2 * this.guessLen13b(t.length, e.length),
						i = this.makeRBT(n),
						o = this.stub(n),
						a = new Array(n),
						s = new Array(n),
						f = new Array(n),
						u = new Array(n),
						h = new Array(n),
						c = new Array(n),
						d = r.words;
					d.length = n, this.convert13b(t.words, t.length, a, n), this.convert13b(e.words, e
						.length, u, n), this.transform(a, o, s, f, n, i), this.transform(u, o, h, c, n,
						i);
					for (var l = 0; l < n; l++) {
						var p = s[l] * h[l] - f[l] * c[l];
						f[l] = s[l] * c[l] + f[l] * h[l], s[l] = p
					}
					return this.conjugate(s, f, n), this.transform(s, f, d, o, n, i), this.conjugate(d, o,
							n), this.normalize13b(d, n), r.negative = t.negative ^ e.negative, r.length = t
						.length + e.length, r.strip()
				}, i.prototype.mul = function(t) {
					var e = new i(null);
					return e.words = new Array(this.length + t.length), this.mulTo(t, e)
				}, i.prototype.mulf = function(t) {
					var e = new i(null);
					return e.words = new Array(this.length + t.length), p(this, t, e)
				}, i.prototype.imul = function(t) {
					return this.clone().mulTo(t, this)
				}, i.prototype.imuln = function(t) {
					r("number" == typeof t), r(t < 67108864);
					for (var e = 0, n = 0; n < this.length; n++) {
						var i = (0 | this.words[n]) * t,
							o = (67108863 & i) + (67108863 & e);
						e >>= 26, e += i / 67108864 | 0, e += o >>> 26, this.words[n] = 67108863 & o
					}
					return 0 !== e && (this.words[n] = e, this.length++), this
				}, i.prototype.muln = function(t) {
					return this.clone().imuln(t)
				}, i.prototype.sqr = function() {
					return this.mul(this)
				}, i.prototype.isqr = function() {
					return this.imul(this.clone())
				}, i.prototype.pow = function(t) {
					var e = function(t) {
						for (var e = new Array(t.bitLength()), r = 0; r < e.length; r++) {
							var n = r / 26 | 0,
								i = r % 26;
							e[r] = (t.words[n] & 1 << i) >>> i
						}
						return e
					}(t);
					if (0 === e.length) return new i(1);
					for (var r = this, n = 0; n < e.length && 0 === e[n]; n++, r = r.sqr());
					if (++n < e.length)
						for (var o = r.sqr(); n < e.length; n++, o = o.sqr()) 0 !== e[n] && (r = r.mul(o));
					return r
				}, i.prototype.iushln = function(t) {
					r("number" == typeof t && t >= 0);
					var e, n = t % 26,
						i = (t - n) / 26,
						o = 67108863 >>> 26 - n << 26 - n;
					if (0 !== n) {
						var a = 0;
						for (e = 0; e < this.length; e++) {
							var s = this.words[e] & o,
								f = (0 | this.words[e]) - s << n;
							this.words[e] = f | a, a = s >>> 26 - n
						}
						a && (this.words[e] = a, this.length++)
					}
					if (0 !== i) {
						for (e = this.length - 1; e >= 0; e--) this.words[e + i] = this.words[e];
						for (e = 0; e < i; e++) this.words[e] = 0;
						this.length += i
					}
					return this.strip()
				}, i.prototype.ishln = function(t) {
					return r(0 === this.negative), this.iushln(t)
				}, i.prototype.iushrn = function(t, e, n) {
					var i;
					r("number" == typeof t && t >= 0), i = e ? (e - e % 26) / 26 : 0;
					var o = t % 26,
						a = Math.min((t - o) / 26, this.length),
						s = 67108863 ^ 67108863 >>> o << o,
						f = n;
					if (i -= a, i = Math.max(0, i), f) {
						for (var u = 0; u < a; u++) f.words[u] = this.words[u];
						f.length = a
					}
					if (0 === a);
					else if (this.length > a)
						for (this.length -= a, u = 0; u < this.length; u++) this.words[u] = this.words[u +
							a];
					else this.words[0] = 0, this.length = 1;
					var h = 0;
					for (u = this.length - 1; u >= 0 && (0 !== h || u >= i); u--) {
						var c = 0 | this.words[u];
						this.words[u] = h << 26 - o | c >>> o, h = c & s
					}
					return f && 0 !== h && (f.words[f.length++] = h), 0 === this.length && (this.words[0] =
						0, this.length = 1), this.strip()
				}, i.prototype.ishrn = function(t, e, n) {
					return r(0 === this.negative), this.iushrn(t, e, n)
				}, i.prototype.shln = function(t) {
					return this.clone().ishln(t)
				}, i.prototype.ushln = function(t) {
					return this.clone().iushln(t)
				}, i.prototype.shrn = function(t) {
					return this.clone().ishrn(t)
				}, i.prototype.ushrn = function(t) {
					return this.clone().iushrn(t)
				}, i.prototype.testn = function(t) {
					r("number" == typeof t && t >= 0);
					var e = t % 26,
						n = (t - e) / 26,
						i = 1 << e;
					return !(this.length <= n) && !!(this.words[n] & i)
				}, i.prototype.imaskn = function(t) {
					r("number" == typeof t && t >= 0);
					var e = t % 26,
						n = (t - e) / 26;
					if (r(0 === this.negative, "imaskn works only with positive numbers"), this.length <= n)
						return this;
					if (0 !== e && n++, this.length = Math.min(n, this.length), 0 !== e) {
						var i = 67108863 ^ 67108863 >>> e << e;
						this.words[this.length - 1] &= i
					}
					return this.strip()
				}, i.prototype.maskn = function(t) {
					return this.clone().imaskn(t)
				}, i.prototype.iaddn = function(t) {
					return r("number" == typeof t), r(t < 67108864), t < 0 ? this.isubn(-t) : 0 !== this
						.negative ? 1 === this.length && (0 | this.words[0]) < t ? (this.words[0] = t - (0 |
							this.words[0]), this.negative = 0, this) : (this.negative = 0, this.isubn(t),
							this.negative = 1, this) : this._iaddn(t)
				}, i.prototype._iaddn = function(t) {
					this.words[0] += t;
					for (var e = 0; e < this.length && this.words[e] >= 67108864; e++) this.words[e] -=
						67108864, e === this.length - 1 ? this.words[e + 1] = 1 : this.words[e + 1]++;
					return this.length = Math.max(this.length, e + 1), this
				}, i.prototype.isubn = function(t) {
					if (r("number" == typeof t), r(t < 67108864), t < 0) return this.iaddn(-t);
					if (0 !== this.negative) return this.negative = 0, this.iaddn(t), this.negative = 1,
						this;
					if (this.words[0] -= t, 1 === this.length && this.words[0] < 0) this.words[0] = -this
						.words[0], this.negative = 1;
					else
						for (var e = 0; e < this.length && this.words[e] < 0; e++) this.words[e] +=
							67108864, this.words[e + 1] -= 1;
					return this.strip()
				}, i.prototype.addn = function(t) {
					return this.clone().iaddn(t)
				}, i.prototype.subn = function(t) {
					return this.clone().isubn(t)
				}, i.prototype.iabs = function() {
					return this.negative = 0, this
				}, i.prototype.abs = function() {
					return this.clone().iabs()
				}, i.prototype._ishlnsubmul = function(t, e, n) {
					var i, o, a = t.length + n;
					this._expand(a);
					var s = 0;
					for (i = 0; i < t.length; i++) {
						o = (0 | this.words[i + n]) + s;
						var f = (0 | t.words[i]) * e;
						s = ((o -= 67108863 & f) >> 26) - (f / 67108864 | 0), this.words[i + n] = 67108863 &
							o
					}
					for (; i < this.length - n; i++) s = (o = (0 | this.words[i + n]) + s) >> 26, this
						.words[i + n] = 67108863 & o;
					if (0 === s) return this.strip();
					for (r(-1 === s), s = 0, i = 0; i < this.length; i++) s = (o = -(0 | this.words[i]) +
						s) >> 26, this.words[i] = 67108863 & o;
					return this.negative = 1, this.strip()
				}, i.prototype._wordDiv = function(t, e) {
					var r = (this.length, t.length),
						n = this.clone(),
						o = t,
						a = 0 | o.words[o.length - 1];
					0 !== (r = 26 - this._countBits(a)) && (o = o.ushln(r), n.iushln(r), a = 0 | o.words[o
						.length - 1]);
					var s, f = n.length - o.length;
					if ("mod" !== e) {
						(s = new i(null)).length = f + 1, s.words = new Array(s.length);
						for (var u = 0; u < s.length; u++) s.words[u] = 0
					}
					var h = n.clone()._ishlnsubmul(o, 1, f);
					0 === h.negative && (n = h, s && (s.words[f] = 1));
					for (var c = f - 1; c >= 0; c--) {
						var d = 67108864 * (0 | n.words[o.length + c]) + (0 | n.words[o.length + c - 1]);
						for (d = Math.min(d / a | 0, 67108863), n._ishlnsubmul(o, d, c); 0 !== n.negative;)
							d--, n.negative = 0, n._ishlnsubmul(o, 1, c), n.isZero() || (n.negative ^= 1);
						s && (s.words[c] = d)
					}
					return s && s.strip(), n.strip(), "div" !== e && 0 !== r && n.iushrn(r), {
						div: s || null,
						mod: n
					}
				}, i.prototype.divmod = function(t, e, n) {
					return r(!t.isZero()), this.isZero() ? {
						div: new i(0),
						mod: new i(0)
					} : 0 !== this.negative && 0 === t.negative ? (s = this.neg().divmod(t, e),
						"mod" !== e && (o = s.div.neg()), "div" !== e && (a = s.mod.neg(), n && 0 !== a
							.negative && a.iadd(t)), {
							div: o,
							mod: a
						}) : 0 === this.negative && 0 !== t.negative ? (s = this.divmod(t.neg(), e),
						"mod" !== e && (o = s.div.neg()), {
							div: o,
							mod: s.mod
						}) : 0 != (this.negative & t.negative) ? (s = this.neg().divmod(t.neg(), e),
						"div" !== e && (a = s.mod.neg(), n && 0 !== a.negative && a.isub(t)), {
							div: s.div,
							mod: a
						}) : t.length > this.length || this.cmp(t) < 0 ? {
						div: new i(0),
						mod: this
					} : 1 === t.length ? "div" === e ? {
						div: this.divn(t.words[0]),
						mod: null
					} : "mod" === e ? {
						div: null,
						mod: new i(this.modn(t.words[0]))
					} : {
						div: this.divn(t.words[0]),
						mod: new i(this.modn(t.words[0]))
					} : this._wordDiv(t, e);
				}, i.prototype.div = function(t) {
					return this.divmod(t, "div", !1).div
				}, i.prototype.mod = function(t) {
					return this.divmod(t, "mod", !1).mod
				}, i.prototype.umod = function(t) {
					return this.divmod(t, "mod", !0).mod
				}, i.prototype.divRound = function(t) {
					var e = this.divmod(t);
					if (e.mod.isZero()) return e.div;
					var r = 0 !== e.div.negative ? e.mod.isub(t) : e.mod,
						n = t.ushrn(1),
						i = t.andln(1),
						o = r.cmp(n);
					return o < 0 || 1 === i && 0 === o ? e.div : 0 !== e.div.negative ? e.div.isubn(1) : e
						.div.iaddn(1)
				}, i.prototype.modn = function(t) {
					r(t <= 67108863);
					for (var e = (1 << 26) % t, n = 0, i = this.length - 1; i >= 0; i--) n = (e * n + (0 |
						this.words[i])) % t;
					return n
				}, i.prototype.idivn = function(t) {
					r(t <= 67108863);
					for (var e = 0, n = this.length - 1; n >= 0; n--) {
						var i = (0 | this.words[n]) + 67108864 * e;
						this.words[n] = i / t | 0, e = i % t
					}
					return this.strip()
				}, i.prototype.divn = function(t) {
					return this.clone().idivn(t)
				}, i.prototype.egcd = function(t) {
					r(0 === t.negative), r(!t.isZero());
					var e = this,
						n = t.clone();
					e = 0 !== e.negative ? e.umod(t) : e.clone();
					for (var o = new i(1), a = new i(0), s = new i(0), f = new i(1), u = 0; e.isEven() && n
						.isEven();) e.iushrn(1), n.iushrn(1), ++u;
					for (var h = n.clone(), c = e.clone(); !e.isZero();) {
						for (var d = 0, l = 1; 0 == (e.words[0] & l) && d < 26; ++d, l <<= 1);
						if (d > 0)
							for (e.iushrn(d); d-- > 0;)(o.isOdd() || a.isOdd()) && (o.iadd(h), a.isub(c)), o
								.iushrn(1), a.iushrn(1);
						for (var p = 0, m = 1; 0 == (n.words[0] & m) && p < 26; ++p, m <<= 1);
						if (p > 0)
							for (n.iushrn(p); p-- > 0;)(s.isOdd() || f.isOdd()) && (s.iadd(h), f.isub(c)), s
								.iushrn(1), f.iushrn(1);
						e.cmp(n) >= 0 ? (e.isub(n), o.isub(s), a.isub(f)) : (n.isub(e), s.isub(o), f.isub(
							a))
					}
					return {
						a: s,
						b: f,
						gcd: n.iushln(u)
					}
				}, i.prototype._invmp = function(t) {
					r(0 === t.negative), r(!t.isZero());
					var e = this,
						n = t.clone();
					e = 0 !== e.negative ? e.umod(t) : e.clone();
					for (var o, a = new i(1), s = new i(0), f = n.clone(); e.cmpn(1) > 0 && n.cmpn(1) >
						0;) {
						for (var u = 0, h = 1; 0 == (e.words[0] & h) && u < 26; ++u, h <<= 1);
						if (u > 0)
							for (e.iushrn(u); u-- > 0;) a.isOdd() && a.iadd(f), a.iushrn(1);
						for (var c = 0, d = 1; 0 == (n.words[0] & d) && c < 26; ++c, d <<= 1);
						if (c > 0)
							for (n.iushrn(c); c-- > 0;) s.isOdd() && s.iadd(f), s.iushrn(1);
						e.cmp(n) >= 0 ? (e.isub(n), a.isub(s)) : (n.isub(e), s.isub(a))
					}
					return (o = 0 === e.cmpn(1) ? a : s).cmpn(0) < 0 && o.iadd(t), o
				}, i.prototype.gcd = function(t) {
					if (this.isZero()) return t.abs();
					if (t.isZero()) return this.abs();
					var e = this.clone(),
						r = t.clone();
					e.negative = 0, r.negative = 0;
					for (var n = 0; e.isEven() && r.isEven(); n++) e.iushrn(1), r.iushrn(1);
					for (;;) {
						for (; e.isEven();) e.iushrn(1);
						for (; r.isEven();) r.iushrn(1);
						var i = e.cmp(r);
						if (i < 0) {
							var o = e;
							e = r, r = o
						} else if (0 === i || 0 === r.cmpn(1)) break;
						e.isub(r)
					}
					return r.iushln(n)
				}, i.prototype.invm = function(t) {
					return this.egcd(t).a.umod(t)
				}, i.prototype.isEven = function() {
					return 0 == (1 & this.words[0])
				}, i.prototype.isOdd = function() {
					return 1 == (1 & this.words[0])
				}, i.prototype.andln = function(t) {
					return this.words[0] & t
				}, i.prototype.bincn = function(t) {
					r("number" == typeof t);
					var e = t % 26,
						n = (t - e) / 26,
						i = 1 << e;
					if (this.length <= n) return this._expand(n + 1), this.words[n] |= i, this;
					for (var o = i, a = n; 0 !== o && a < this.length; a++) {
						var s = 0 | this.words[a];
						o = (s += o) >>> 26, s &= 67108863, this.words[a] = s
					}
					return 0 !== o && (this.words[a] = o, this.length++), this
				}, i.prototype.isZero = function() {
					return 1 === this.length && 0 === this.words[0]
				}, i.prototype.cmpn = function(t) {
					var e, n = t < 0;
					if (0 !== this.negative && !n) return -1;
					if (0 === this.negative && n) return 1;
					if (this.strip(), this.length > 1) e = 1;
					else {
						n && (t = -t), r(t <= 67108863, "Number is too big");
						var i = 0 | this.words[0];
						e = i === t ? 0 : i < t ? -1 : 1
					}
					return 0 !== this.negative ? 0 | -e : e
				}, i.prototype.cmp = function(t) {
					if (0 !== this.negative && 0 === t.negative) return -1;
					if (0 === this.negative && 0 !== t.negative) return 1;
					var e = this.ucmp(t);
					return 0 !== this.negative ? 0 | -e : e
				}, i.prototype.ucmp = function(t) {
					if (this.length > t.length) return 1;
					if (this.length < t.length) return -1;
					for (var e = 0, r = this.length - 1; r >= 0; r--) {
						var n = 0 | this.words[r],
							i = 0 | t.words[r];
						if (n !== i) {
							n < i ? e = -1 : n > i && (e = 1);
							break
						}
					}
					return e
				}, i.prototype.gtn = function(t) {
					return 1 === this.cmpn(t)
				}, i.prototype.gt = function(t) {
					return 1 === this.cmp(t)
				}, i.prototype.gten = function(t) {
					return this.cmpn(t) >= 0
				}, i.prototype.gte = function(t) {
					return this.cmp(t) >= 0
				}, i.prototype.ltn = function(t) {
					return -1 === this.cmpn(t)
				}, i.prototype.lt = function(t) {
					return -1 === this.cmp(t)
				}, i.prototype.lten = function(t) {
					return this.cmpn(t) <= 0
				}, i.prototype.lte = function(t) {
					return this.cmp(t) <= 0
				}, i.prototype.eqn = function(t) {
					return 0 === this.cmpn(t)
				}, i.prototype.eq = function(t) {
					return 0 === this.cmp(t)
				}, i.red = function(t) {
					return new A(t)
				}, i.prototype.toRed = function(t) {
					return r(!this.red, "Already a number in reduction context"), r(0 === this.negative,
						"red works only with positives"), t.convertTo(this)._forceRed(t)
				}, i.prototype.fromRed = function() {
					return r(this.red, "fromRed works only with numbers in reduction context"), this.red
						.convertFrom(this)
				}, i.prototype._forceRed = function(t) {
					return this.red = t, this
				}, i.prototype.forceRed = function(t) {
					return r(!this.red, "Already a number in reduction context"), this._forceRed(t)
				}, i.prototype.redAdd = function(t) {
					return r(this.red, "redAdd works only with red numbers"), this.red.add(this, t)
				}, i.prototype.redIAdd = function(t) {
					return r(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, t)
				}, i.prototype.redSub = function(t) {
					return r(this.red, "redSub works only with red numbers"), this.red.sub(this, t)
				}, i.prototype.redISub = function(t) {
					return r(this.red, "redISub works only with red numbers"), this.red.isub(this, t)
				}, i.prototype.redShl = function(t) {
					return r(this.red, "redShl works only with red numbers"), this.red.shl(this, t)
				}, i.prototype.redMul = function(t) {
					return r(this.red, "redMul works only with red numbers"), this.red._verify2(this, t),
						this.red.mul(this, t)
				}, i.prototype.redIMul = function(t) {
					return r(this.red, "redMul works only with red numbers"), this.red._verify2(this, t),
						this.red.imul(this, t)
				}, i.prototype.redSqr = function() {
					return r(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this
						.red.sqr(this)
				}, i.prototype.redISqr = function() {
					return r(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this
						.red.isqr(this)
				}, i.prototype.redSqrt = function() {
					return r(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this
						.red.sqrt(this)
				}, i.prototype.redInvm = function() {
					return r(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this
						.red.invm(this)
				}, i.prototype.redNeg = function() {
					return r(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this
						.red.neg(this)
				}, i.prototype.redPow = function(t) {
					return r(this.red && !t.red, "redPow(normalNum)"), this.red._verify1(this), this.red
						.pow(this, t)
				};
				var b = {
					k256: null,
					p224: null,
					p192: null,
					p25519: null
				};

				function g(t, e) {
					this.name = t, this.p = new i(e, 16), this.n = this.p.bitLength(), this.k = new i(1).iushln(
						this.n).isub(this.p), this.tmp = this._tmp()
				}

				function v() {
					g.call(this, "k256",
						"ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")
				}

				function y() {
					g.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")
				}

				function w() {
					g.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")
				}

				function _() {
					g.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")
				}

				function A(t) {
					if ("string" == typeof t) {
						var e = i._prime(t);
						this.m = e.p, this.prime = e
					} else r(t.gtn(1), "modulus must be greater than 1"), this.m = t, this.prime = null
				}

				function M(t) {
					A.call(this, t), this.shift = this.m.bitLength(), this.shift % 26 != 0 && (this.shift +=
							26 - this.shift % 26), this.r = new i(1).iushln(this.shift), this.r2 = this.imod(
							this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r)
						.isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this
							.minv)
				}
				g.prototype._tmp = function() {
					var t = new i(null);
					return t.words = new Array(Math.ceil(this.n / 13)), t
				}, g.prototype.ireduce = function(t) {
					var e, r = t;
					do {
						this.split(r, this.tmp), e = (r = (r = this.imulK(r)).iadd(this.tmp)).bitLength()
					} while (e > this.n);
					var n = e < this.n ? -1 : r.ucmp(this.p);
					return 0 === n ? (r.words[0] = 0, r.length = 1) : n > 0 ? r.isub(this.p) : void 0 !== r
						.strip ? r.strip() : r._strip(), r
				}, g.prototype.split = function(t, e) {
					t.iushrn(this.n, 0, e)
				}, g.prototype.imulK = function(t) {
					return t.imul(this.k)
				}, n(v, g), v.prototype.split = function(t, e) {
					for (var r = 4194303, n = Math.min(t.length, 9), i = 0; i < n; i++) e.words[i] = t
						.words[i];
					if (e.length = n, t.length <= 9) return t.words[0] = 0, void(t.length = 1);
					var o = t.words[9];
					for (e.words[e.length++] = o & r, i = 10; i < t.length; i++) {
						var a = 0 | t.words[i];
						t.words[i - 10] = (a & r) << 4 | o >>> 22, o = a
					}
					o >>>= 22, t.words[i - 10] = o, 0 === o && t.length > 10 ? t.length -= 10 : t.length -=
						9
				}, v.prototype.imulK = function(t) {
					t.words[t.length] = 0, t.words[t.length + 1] = 0, t.length += 2;
					for (var e = 0, r = 0; r < t.length; r++) {
						var n = 0 | t.words[r];
						e += 977 * n, t.words[r] = 67108863 & e, e = 64 * n + (e / 67108864 | 0)
					}
					return 0 === t.words[t.length - 1] && (t.length--, 0 === t.words[t.length - 1] && t
						.length--), t
				}, n(y, g), n(w, g), n(_, g), _.prototype.imulK = function(t) {
					for (var e = 0, r = 0; r < t.length; r++) {
						var n = 19 * (0 | t.words[r]) + e,
							i = 67108863 & n;
						n >>>= 26, t.words[r] = i, e = n
					}
					return 0 !== e && (t.words[t.length++] = e), t
				}, i._prime = function(t) {
					if (b[t]) return b[t];
					var e;
					if ("k256" === t) e = new v;
					else if ("p224" === t) e = new y;
					else if ("p192" === t) e = new w;
					else {
						if ("p25519" !== t) throw new Error("Unknown prime " + t);
						e = new _
					}
					return b[t] = e, e
				}, A.prototype._verify1 = function(t) {
					r(0 === t.negative, "red works only with positives"), r(t.red,
						"red works only with red numbers")
				}, A.prototype._verify2 = function(t, e) {
					r(0 == (t.negative | e.negative), "red works only with positives"), r(t.red && t.red ===
						e.red, "red works only with red numbers")
				}, A.prototype.imod = function(t) {
					return this.prime ? this.prime.ireduce(t)._forceRed(this) : t.umod(this.m)._forceRed(
						this)
				}, A.prototype.neg = function(t) {
					return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this)
				}, A.prototype.add = function(t, e) {
					this._verify2(t, e);
					var r = t.add(e);
					return r.cmp(this.m) >= 0 && r.isub(this.m), r._forceRed(this)
				}, A.prototype.iadd = function(t, e) {
					this._verify2(t, e);
					var r = t.iadd(e);
					return r.cmp(this.m) >= 0 && r.isub(this.m), r
				}, A.prototype.sub = function(t, e) {
					this._verify2(t, e);
					var r = t.sub(e);
					return r.cmpn(0) < 0 && r.iadd(this.m), r._forceRed(this)
				}, A.prototype.isub = function(t, e) {
					this._verify2(t, e);
					var r = t.isub(e);
					return r.cmpn(0) < 0 && r.iadd(this.m), r
				}, A.prototype.shl = function(t, e) {
					return this._verify1(t), this.imod(t.ushln(e))
				}, A.prototype.imul = function(t, e) {
					return this._verify2(t, e), this.imod(t.imul(e))
				}, A.prototype.mul = function(t, e) {
					return this._verify2(t, e), this.imod(t.mul(e))
				}, A.prototype.isqr = function(t) {
					return this.imul(t, t.clone())
				}, A.prototype.sqr = function(t) {
					return this.mul(t, t)
				}, A.prototype.sqrt = function(t) {
					if (t.isZero()) return t.clone();
					var e = this.m.andln(3);
					if (r(e % 2 == 1), 3 === e) {
						var n = this.m.add(new i(1)).iushrn(2);
						return this.pow(t, n)
					}
					for (var o = this.m.subn(1), a = 0; !o.isZero() && 0 === o.andln(1);) a++, o.iushrn(1);
					r(!o.isZero());
					var s = new i(1).toRed(this),
						f = s.redNeg(),
						u = this.m.subn(1).iushrn(1),
						h = this.m.bitLength();
					for (h = new i(2 * h * h).toRed(this); 0 !== this.pow(h, u).cmp(f);) h.redIAdd(f);
					for (var c = this.pow(h, o), d = this.pow(t, o.addn(1).iushrn(1)), l = this.pow(t, o),
							p = a; 0 !== l.cmp(s);) {
						for (var m = l, b = 0; 0 !== m.cmp(s); b++) m = m.redSqr();
						r(b < p);
						var g = this.pow(c, new i(1).iushln(p - b - 1));
						d = d.redMul(g), c = g.redSqr(), l = l.redMul(c), p = b
					}
					return d
				}, A.prototype.invm = function(t) {
					var e = t._invmp(this.m);
					return 0 !== e.negative ? (e.negative = 0, this.imod(e).redNeg()) : this.imod(e)
				}, A.prototype.pow = function(t, e) {
					if (e.isZero()) return new i(1).toRed(this);
					if (0 === e.cmpn(1)) return t.clone();
					var r = new Array(16);
					r[0] = new i(1).toRed(this), r[1] = t;
					for (var n = 2; n < r.length; n++) r[n] = this.mul(r[n - 1], t);
					var o = r[0],
						a = 0,
						s = 0,
						f = e.bitLength() % 26;
					for (0 === f && (f = 26), n = e.length - 1; n >= 0; n--) {
						for (var u = e.words[n], h = f - 1; h >= 0; h--) {
							var c = u >> h & 1;
							o !== r[0] && (o = this.sqr(o)), 0 !== c || 0 !== a ? (a <<= 1, a |= c, (4 ===
									++s || 0 === n && 0 === h) && (o = this.mul(o, r[a]), s = 0, a = 0)) :
								s = 0
						}
						f = 26
					}
					return o
				}, A.prototype.convertTo = function(t) {
					var e = t.umod(this.m);
					return e === t ? e.clone() : e
				}, A.prototype.convertFrom = function(t) {
					var e = t.clone();
					return e.red = null, e
				}, i.mont = function(t) {
					return new M(t)
				}, n(M, A), M.prototype.convertTo = function(t) {
					return this.imod(t.ushln(this.shift))
				}, M.prototype.convertFrom = function(t) {
					var e = this.imod(t.mul(this.rinv));
					return e.red = null, e
				}, M.prototype.imul = function(t, e) {
					if (t.isZero() || e.isZero()) return t.words[0] = 0, t.length = 1, t;
					var r = t.imul(e),
						n = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
						i = r.isub(n).iushrn(this.shift),
						o = i;
					return i.cmp(this.m) >= 0 ? o = i.isub(this.m) : i.cmpn(0) < 0 && (o = i.iadd(this.m)),
						o._forceRed(this)
				}, M.prototype.mul = function(t, e) {
					if (t.isZero() || e.isZero()) return new i(0)._forceRed(this);
					var r = t.mul(e),
						n = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
						o = r.isub(n).iushrn(this.shift),
						a = o;
					return o.cmp(this.m) >= 0 ? a = o.isub(this.m) : o.cmpn(0) < 0 && (a = o.iadd(this.m)),
						a._forceRed(this)
				}, M.prototype.invm = function(t) {
					return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this)
				}
			}(void 0 === t || t, this), t.exports
		}.call({})
	}

	function pm() {
		return dm || (dm = !0, lm()), cm
	}
	var mm, bm, gm, vm = !1;

	function ym(t) {
		this.rand = t
	}

	function wm() {
		return vm || (vm = !0, function() {
			if (mm = {}, mm = function(t) {
					return bm || (bm = new ym(null)), bm.generate(t)
				}, gm = ym, mm.Rand = gm, ym.prototype.generate = function(t) {
					return this._rand(t)
				}, ym.prototype._rand = function(t) {
					if (this.rand.getBytes) return this.rand.getBytes(t);
					for (var e = new Uint8Array(t), r = 0; r < e.length; r++) e[r] = this.rand.getByte();
					return e
				}, "object" == typeof self) self.crypto && self.crypto.getRandomValues ? ym.prototype._rand =
				function(t) {
					var e = new Uint8Array(t);
					return self.crypto.getRandomValues(e), e
				} : self.msCrypto && self.msCrypto.getRandomValues ? ym.prototype._rand = function(t) {
					var e = new Uint8Array(t);
					return self.msCrypto.getRandomValues(e), e
				} : "object" == typeof window && (ym.prototype._rand = function() {
					throw new Error("Not implemented yet")
				});
			else try {
				if (nr(), "function" != typeof nr().randomBytes) throw new Error("Not supported");
				ym.prototype._rand = function(t) {
					return nr().randomBytes(t)
				}
			} catch (t) {}
		}()), mm
	}
	var _m, Am, Mm = !1;

	function Em(t) {
		this.rand = t || new(wm().Rand)
	}

	function Sm() {
		return Mm || (Mm = !0, _m = {}, Am = pm(), wm(), _m = Em, Em.create = function(t) {
			return new Em(t)
		}, Em.prototype._randbelow = function(t) {
			var e = t.bitLength(),
				r = Math.ceil(e / 8);
			do {
				var n = new Am(this.rand.generate(r))
			} while (n.cmp(t) >= 0);
			return n
		}, Em.prototype._randrange = function(t, e) {
			var r = e.sub(t);
			return t.add(this._randbelow(r))
		}, Em.prototype.test = function(t, e, r) {
			var n = t.bitLength(),
				i = Am.mont(t),
				o = new Am(1).toRed(i);
			e || (e = Math.max(1, n / 48 | 0));
			for (var a = t.subn(1), s = 0; !a.testn(s); s++);
			for (var f = t.shrn(s), u = a.toRed(i); e > 0; e--) {
				var h = this._randrange(new Am(2), a);
				r && r(h);
				var c = h.toRed(i).redPow(f);
				if (0 !== c.cmp(o) && 0 !== c.cmp(u)) {
					for (var d = 1; d < s; d++) {
						if (0 === (c = c.redSqr()).cmp(o)) return !1;
						if (0 === c.cmp(u)) break
					}
					if (d === s) return !1
				}
			}
			return !0
		}, Em.prototype.getDivisor = function(t, e) {
			var r = t.bitLength(),
				n = Am.mont(t),
				i = new Am(1).toRed(n);
			e || (e = Math.max(1, r / 48 | 0));
			for (var o = t.subn(1), a = 0; !o.testn(a); a++);
			for (var s = t.shrn(a), f = o.toRed(n); e > 0; e--) {
				var u = this._randrange(new Am(2), o),
					h = t.gcd(u);
				if (0 !== h.cmpn(1)) return h;
				var c = u.toRed(n).redPow(s);
				if (0 !== c.cmp(i) && 0 !== c.cmp(f)) {
					for (var d = 1; d < a; d++) {
						if (0 === (c = c.redSqr()).cmp(i)) return c.fromRed().subn(1).gcd(t);
						if (0 === c.cmp(f)) break
					}
					if (d === a) return (c = c.redSqr()).fromRed().subn(1).gcd(t)
				}
			}
			return !1
		}), _m
	}
	var km, Bm, Tm, Rm, xm, Cm, Im, Dm, Pm, Om, Lm, Um, jm, Nm, zm = !1;

	function Fm(t) {
		for (var e = function() {
				if (null !== Nm) return Nm;
				var t = [];
				t[0] = 2;
				for (var e = 1, r = 3; r < 1048576; r += 2) {
					for (var n = Math.ceil(Math.sqrt(r)), i = 0; i < e && t[i] <= n && r % t[i] != 0; i++);
					e !== i && t[i] <= n || (t[e++] = r)
				}
				return Nm = t, t
			}(), r = 0; r < e.length; r++)
			if (0 === t.modn(e[r])) return 0 === t.cmpn(e[r]);
		return !0
	}

	function qm(t) {
		var e = Tm.mont(t);
		return 0 === Dm.toRed(e).redPow(t.subn(1)).fromRed().cmpn(1)
	}

	function Hm(t, e) {
		if (t < 16) return new Tm(2 === e || 5 === e ? [140, 123] : [140, 39]);
		var r, n;
		for (e = new Tm(e);;) {
			for (r = new Tm(Bm(Math.ceil(t / 8))); r.bitLength() > t;) r.ishrn(1);
			if (r.isEven() && r.iadd(Im), r.testn(1) || r.iadd(Dm), e.cmp(Dm)) {
				if (!e.cmp(Pm))
					for (; r.mod(Om).cmp(Lm);) r.iadd(jm)
			} else
				for (; r.mod(Rm).cmp(Um);) r.iadd(jm);
			if (Fm(n = r.shrn(1)) && Fm(r) && qm(n) && qm(r) && Cm.test(n) && Cm.test(r)) return r
		}
	}

	function Wm() {
		return zm || (zm = !0, km = {}, Bm = wr(), km = Hm, Hm.simpleSieve = Fm, Hm.fermatTest = qm, Tm = pm(), Rm =
			new Tm(24), xm = Sm(), Cm = new xm, Im = new Tm(1), Dm = new Tm(2), Pm = new Tm(5), new Tm(16), new Tm(
				8), Om = new Tm(10), Lm = new Tm(3), new Tm(7), Um = new Tm(11), jm = new Tm(4), new Tm(12), Nm =
			null), km
	}
	var Gm, Ym = !1;

	function Km() {
		return Ym || (Ym = !0, Gm = {}, Gm = JSON.parse(
			'{"modp1":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a63a3620ffffffffffffffff"},"modp2":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece65381ffffffffffffffff"},"modp5":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca237327ffffffffffffffff"},"modp14":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aacaa68ffffffffffffffff"},"modp15":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a93ad2caffffffffffffffff"},"modp16":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c934063199ffffffffffffffff"},"modp17":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dcc4024ffffffffffffffff"},"modp18":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dbe115974a3926f12fee5e438777cb6a932df8cd8bec4d073b931ba3bc832b68d9dd300741fa7bf8afc47ed2576f6936ba424663aab639c5ae4f5683423b4742bf1c978238f16cbe39d652de3fdb8befc848ad922222e04a4037c0713eb57a81a23f0c73473fc646cea306b4bcbc8862f8385ddfa9d4b7fa2c087e879683303ed5bdd3a062b3cf5b3a278a66d2a13f83f44f82ddf310ee074ab6a364597e899a0255dc164f31cc50846851df9ab48195ded7ea1b1d510bd7ee74d73faf36bc31ecfa268359046f4eb879f924009438b481c6cd7889a002ed5ee382bc9190da6fc026e479558e4475677e9aa9e3050e2765694dfc81f56e880b96e7160c980dd98edd3dfffffffffffffffff"}}'
			)), Gm
	}
	var Vm, Zm, $m, Xm, Jm, Qm, tb, eb, rb, nb, ib, ob, ab = !1;

	function sb(t, e) {
		return e = e || "utf8", Zm.isBuffer(t) || (t = new Zm(t, e)), this._pub = new $m(t), this
	}

	function fb(t, e) {
		return e = e || "utf8", Zm.isBuffer(t) || (t = new Zm(t, e)), this._priv = new $m(t), this
	}

	function ub(t, e, r) {
		this.setGenerator(e), this.__prime = new $m(t), this._prime = $m.mont(this.__prime), this._primeLen = t.length,
			this._pub = void 0, this._priv = void 0, this._primeCode = void 0, r ? (this.setPublicKey = sb, this
				.setPrivateKey = fb) : this._primeCode = 8
	}

	function hb(t, e) {
		var r = new Zm(t.toArray());
		return e ? r.toString(e) : r
	}

	function cb() {
		Vm = {}, Zm = Ve().Buffer, $m = pm(), Xm = Sm(), Jm = new Xm, Qm = new $m(24), tb = new $m(11), eb = new $m(10),
			rb = new $m(3), nb = new $m(7), Wm(), ib = wr(), Vm = ub, ob = {}, Object.defineProperty(ub.prototype,
				"verifyError", {
					enumerable: !0,
					get: function() {
						return "number" != typeof this._primeCode && (this._primeCode = function(t, e) {
							var r = e.toString("hex"),
								n = [r, t.toString(16)].join("_");
							if (n in ob) return ob[n];
							var i, o = 0;
							if (t.isEven() || !Wm().simpleSieve || !Wm().fermatTest(t) || !Jm.test(t))
								return o += 1, o += "02" === r || "05" === r ? 8 : 4, ob[n] = o, o;
							switch (Jm.test(t.shrn(1)) || (o += 2), r) {
								case "02":
									t.mod(Qm).cmp(tb) && (o += 8);
									break;
								case "05":
									(i = t.mod(eb)).cmp(rb) && i.cmp(nb) && (o += 8);
									break;
								default:
									o += 4
							}
							return ob[n] = o, o
						}(this.__prime, this.__gen)), this._primeCode
					}
				}), ub.prototype.generateKeys = function() {
				return this._priv || (this._priv = new $m(ib(this._primeLen))), this._pub = this._gen.toRed(this._prime)
					.redPow(this._priv).fromRed(), this.getPublicKey()
			}, ub.prototype.computeSecret = function(t) {
				var e = (t = (t = new $m(t)).toRed(this._prime)).redPow(this._priv).fromRed(),
					r = new Zm(e.toArray()),
					n = this.getPrime();
				if (r.length < n.length) {
					var i = new Zm(n.length - r.length);
					i.fill(0), r = Zm.concat([i, r])
				}
				return r
			}, ub.prototype.getPublicKey = function(t) {
				return hb(this._pub, t)
			}, ub.prototype.getPrivateKey = function(t) {
				return hb(this._priv, t)
			}, ub.prototype.getPrime = function(t) {
				return hb(this.__prime, t)
			}, ub.prototype.getGenerator = function(t) {
				return hb(this._gen, t)
			}, ub.prototype.setGenerator = function(t, e) {
				return e = e || "utf8", Zm.isBuffer(t) || (t = new Zm(t, e)), this.__gen = t, this._gen = new $m(t),
					this
			}
	}
	var db, lb, pb, mb, bb, gb, vb, yb, wb, _b, Ab, Mb = !1;

	function Eb(t) {
		var e = new bb(vb[t].prime, "hex"),
			r = new bb(vb[t].gen, "hex");
		return new yb(e, r)
	}

	function Sb(t, e, r, n) {
		return bb.isBuffer(e) || void 0 === wb[e] ? Sb(t, "binary", e, r) : (e = e || "binary", n = n || "binary", r =
			r || new bb([2]), bb.isBuffer(r) || (r = new bb(r, n)), "number" == typeof t ? new yb(gb(t, r), r, !0) :
			(bb.isBuffer(t) || (t = new bb(t, e)), new yb(t, r, !0)))
	}

	function kb() {
		mb = {}, bb = Ve().Buffer, gb = Wm(), vb = Km(), ab || (ab = !0, cb()), yb = Vm, wb = {
				binary: !0,
				hex: !0,
				base64: !0
			}, lb = Eb, db = mb.getDiffieHellman = lb, _b = mb.createDiffieHellmanGroup = db, mb.DiffieHellmanGroup =
			_b, pb = Sb, Ab = mb.DiffieHellman = pb, mb.createDiffieHellman = Ab
	}
	var Bb, Tb = !1;

	function Rb() {
		Bb = function() {
			var t = {
				exports: this
			};
			return function(t, e) {
				function r(t, e) {
					if (!t) throw new Error(e || "Assertion failed")
				}

				function n(t, e) {
					t.super_ = e;
					var r = function() {};
					r.prototype = e.prototype, t.prototype = new r, t.prototype.constructor = t
				}

				function i(t, e, r) {
					if (i.isBN(t)) return t;
					this.negative = 0, this.words = null, this.length = 0, this.red = null, null !== t && (
						"le" !== e && "be" !== e || (r = e, e = 10), this._init(t || 0, e || 10, r || "be"))
				}
				var o;
				"object" == typeof t ? t.exports = i : e.BN = i, i.BN = i, i.wordSize = 26;
				try {
					o = "undefined" != typeof window && void 0 !== window.Buffer ? window.Buffer : nr().Buffer
				} catch (t) {}

				function a(t, e) {
					var n = t.charCodeAt(e);
					return n >= 48 && n <= 57 ? n - 48 : n >= 65 && n <= 70 ? n - 55 : n >= 97 && n <= 102 ? n -
						87 : void r(!1, "Invalid character in " + t)
				}

				function s(t, e, r) {
					var n = a(t, r);
					return r - 1 >= e && (n |= a(t, r - 1) << 4), n
				}

				function f(t, e, n, i) {
					for (var o = 0, a = 0, s = Math.min(t.length, n), f = e; f < s; f++) {
						var u = t.charCodeAt(f) - 48;
						o *= i, a = u >= 49 ? u - 49 + 10 : u >= 17 ? u - 17 + 10 : u, r(u >= 0 && a < i,
							"Invalid character"), o += a
					}
					return o
				}

				function u(t, e) {
					t.words = e.words, t.length = e.length, t.negative = e.negative, t.red = e.red
				}
				if (i.isBN = function(t) {
						return t instanceof i || null !== t && "object" == typeof t && t.constructor
							.wordSize === i.wordSize && Array.isArray(t.words)
					}, i.max = function(t, e) {
						return t.cmp(e) > 0 ? t : e
					}, i.min = function(t, e) {
						return t.cmp(e) < 0 ? t : e
					}, i.prototype._init = function(t, e, n) {
						if ("number" == typeof t) return this._initNumber(t, e, n);
						if ("object" == typeof t) return this._initArray(t, e, n);
						"hex" === e && (e = 16), r(e === (0 | e) && e >= 2 && e <= 36);
						var i = 0;
						"-" === (t = t.toString().replace(/\s+/g, ""))[0] && (i++, this.negative = 1), i < t
							.length && (16 === e ? this._parseHex(t, i, n) : (this._parseBase(t, e, i), "le" ===
								n && this._initArray(this.toArray(), e, n)))
					}, i.prototype._initNumber = function(t, e, n) {
						t < 0 && (this.negative = 1, t = -t), t < 67108864 ? (this.words = [67108863 & t], this
							.length = 1) : t < 4503599627370496 ? (this.words = [67108863 & t, t /
							67108864 & 67108863
						], this.length = 2) : (r(t < 9007199254740992), this.words = [67108863 & t, t /
							67108864 & 67108863, 1
						], this.length = 3), "le" === n && this._initArray(this.toArray(), e, n)
					}, i.prototype._initArray = function(t, e, n) {
						if (r("number" == typeof t.length), t.length <= 0) return this.words = [0], this
							.length = 1, this;
						this.length = Math.ceil(t.length / 3), this.words = new Array(this.length);
						for (var i = 0; i < this.length; i++) this.words[i] = 0;
						var o, a, s = 0;
						if ("be" === n)
							for (i = t.length - 1, o = 0; i >= 0; i -= 3) a = t[i] | t[i - 1] << 8 | t[i - 2] <<
								16, this.words[o] |= a << s & 67108863, this.words[o + 1] = a >>> 26 - s &
								67108863, (s += 24) >= 26 && (s -= 26, o++);
						else if ("le" === n)
							for (i = 0, o = 0; i < t.length; i += 3) a = t[i] | t[i + 1] << 8 | t[i + 2] << 16,
								this.words[o] |= a << s & 67108863, this.words[o + 1] = a >>> 26 - s & 67108863,
								(s += 24) >= 26 && (s -= 26, o++);
						return this._strip()
					}, i.prototype._parseHex = function(t, e, r) {
						this.length = Math.ceil((t.length - e) / 6), this.words = new Array(this.length);
						for (var n = 0; n < this.length; n++) this.words[n] = 0;
						var i, o = 0,
							a = 0;
						if ("be" === r)
							for (n = t.length - 1; n >= e; n -= 2) i = s(t, e, n) << o, this.words[a] |=
								67108863 & i, o >= 18 ? (o -= 18, a += 1, this.words[a] |= i >>> 26) : o += 8;
						else
							for (n = (t.length - e) % 2 == 0 ? e + 1 : e; n < t.length; n += 2) i = s(t, e,
								n) << o, this.words[a] |= 67108863 & i, o >= 18 ? (o -= 18, a += 1, this.words[
									a] |= i >>> 26) : o += 8;
						this._strip()
					}, i.prototype._parseBase = function(t, e, r) {
						this.words = [0], this.length = 1;
						for (var n = 0, i = 1; i <= 67108863; i *= e) n++;
						n--, i = i / e | 0;
						for (var o = t.length - r, a = o % n, s = Math.min(o, o - a) + r, u = 0, h = r; h <
							s; h += n) u = f(t, h, h + n, e), this.imuln(i), this.words[0] + u < 67108864 ? this
							.words[0] += u : this._iaddn(u);
						if (0 !== a) {
							var c = 1;
							for (u = f(t, h, t.length, e), h = 0; h < a; h++) c *= e;
							this.imuln(c), this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u)
						}
						this._strip()
					}, i.prototype.copy = function(t) {
						t.words = new Array(this.length);
						for (var e = 0; e < this.length; e++) t.words[e] = this.words[e];
						t.length = this.length, t.negative = this.negative, t.red = this.red
					}, i.prototype._move = function(t) {
						u(t, this)
					}, i.prototype.clone = function() {
						var t = new i(null);
						return this.copy(t), t
					}, i.prototype._expand = function(t) {
						for (; this.length < t;) this.words[this.length++] = 0;
						return this
					}, i.prototype._strip = function() {
						for (; this.length > 1 && 0 === this.words[this.length - 1];) this.length--;
						return this._normSign()
					}, i.prototype._normSign = function() {
						return 1 === this.length && 0 === this.words[0] && (this.negative = 0), this
					}, "undefined" != typeof Symbol && "function" == typeof Symbol.for) try {
					i.prototype[Symbol.for("nodejs.util.inspect.custom")] = h
				} catch (t) {
					i.prototype.inspect = h
				} else i.prototype.inspect = h;

				function h() {
					return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">"
				}
				var c = ["", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000",
						"0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000",
						"000000000000000", "0000000000000000", "00000000000000000", "000000000000000000",
						"0000000000000000000", "00000000000000000000", "000000000000000000000",
						"0000000000000000000000", "00000000000000000000000", "000000000000000000000000",
						"0000000000000000000000000"
					],
					d = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5,
						5, 5, 5, 5, 5, 5, 5, 5, 5, 5
					],
					l = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721,
						1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224,
						47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907,
						17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176
					];
				i.prototype.toString = function(t, e) {
					var n;
					if (e = 0 | e || 1, 16 === (t = t || 10) || "hex" === t) {
						n = "";
						for (var i = 0, o = 0, a = 0; a < this.length; a++) {
							var s = this.words[a],
								f = (16777215 & (s << i | o)).toString(16);
							n = 0 !== (o = s >>> 24 - i & 16777215) || a !== this.length - 1 ? c[6 - f
								.length] + f + n : f + n, (i += 2) >= 26 && (i -= 26, a--)
						}
						for (0 !== o && (n = o.toString(16) + n); n.length % e != 0;) n = "0" + n;
						return 0 !== this.negative && (n = "-" + n), n
					}
					if (t === (0 | t) && t >= 2 && t <= 36) {
						var u = d[t],
							h = l[t];
						n = "";
						var p = this.clone();
						for (p.negative = 0; !p.isZero();) {
							var m = p.modrn(h).toString(t);
							n = (p = p.idivn(h)).isZero() ? m + n : c[u - m.length] + m + n
						}
						for (this.isZero() && (n = "0" + n); n.length % e != 0;) n = "0" + n;
						return 0 !== this.negative && (n = "-" + n), n
					}
					r(!1, "Base should be between 2 and 36")
				}, i.prototype.toNumber = function() {
					var t = this.words[0];
					return 2 === this.length ? t += 67108864 * this.words[1] : 3 === this.length && 1 ===
						this.words[2] ? t += 4503599627370496 + 67108864 * this.words[1] : this.length >
						2 && r(!1, "Number can only safely store up to 53 bits"), 0 !== this.negative ? -t :
						t
				}, i.prototype.toJSON = function() {
					return this.toString(16, 2)
				}, o && (i.prototype.toBuffer = function(t, e) {
					return this.toArrayLike(o, t, e)
				}), i.prototype.toArray = function(t, e) {
					return this.toArrayLike(Array, t, e)
				};

				function p(t, e, r) {
					r.negative = e.negative ^ t.negative;
					var n = t.length + e.length | 0;
					r.length = n, n = n - 1 | 0;
					var i = 0 | t.words[0],
						o = 0 | e.words[0],
						a = i * o,
						s = 67108863 & a,
						f = a / 67108864 | 0;
					r.words[0] = s;
					for (var u = 1; u < n; u++) {
						for (var h = f >>> 26, c = 67108863 & f, d = Math.min(u, e.length - 1), l = Math.max(0,
								u - t.length + 1); l <= d; l++) {
							var p = u - l | 0;
							h += (a = (i = 0 | t.words[p]) * (o = 0 | e.words[l]) + c) / 67108864 | 0, c =
								67108863 & a
						}
						r.words[u] = 0 | c, f = 0 | h
					}
					return 0 !== f ? r.words[u] = 0 | f : r.length--, r._strip()
				}
				i.prototype.toArrayLike = function(t, e, n) {
					this._strip();
					var i = this.byteLength(),
						o = n || Math.max(1, i);
					r(i <= o, "byte array longer than desired length"), r(o > 0,
						"Requested array length <= 0");
					var a = function(t, e) {
						return t.allocUnsafe ? t.allocUnsafe(e) : new t(e)
					}(t, o);
					return this["_toArrayLike" + ("le" === e ? "LE" : "BE")](a, i), a
				}, i.prototype._toArrayLikeLE = function(t, e) {
					for (var r = 0, n = 0, i = 0, o = 0; i < this.length; i++) {
						var a = this.words[i] << o | n;
						t[r++] = 255 & a, r < t.length && (t[r++] = a >> 8 & 255), r < t.length && (t[r++] =
							a >> 16 & 255), 6 === o ? (r < t.length && (t[r++] = a >> 24 & 255), n = 0,
							o = 0) : (n = a >>> 24, o += 2)
					}
					if (r < t.length)
						for (t[r++] = n; r < t.length;) t[r++] = 0
				}, i.prototype._toArrayLikeBE = function(t, e) {
					for (var r = t.length - 1, n = 0, i = 0, o = 0; i < this.length; i++) {
						var a = this.words[i] << o | n;
						t[r--] = 255 & a, r >= 0 && (t[r--] = a >> 8 & 255), r >= 0 && (t[r--] = a >> 16 &
							255), 6 === o ? (r >= 0 && (t[r--] = a >> 24 & 255), n = 0, o = 0) : (n =
							a >>> 24, o += 2)
					}
					if (r >= 0)
						for (t[r--] = n; r >= 0;) t[r--] = 0
				}, Math.clz32 ? i.prototype._countBits = function(t) {
					return 32 - Math.clz32(t)
				} : i.prototype._countBits = function(t) {
					var e = t,
						r = 0;
					return e >= 4096 && (r += 13, e >>>= 13), e >= 64 && (r += 7, e >>>= 7), e >= 8 && (r +=
						4, e >>>= 4), e >= 2 && (r += 2, e >>>= 2), r + e
				}, i.prototype._zeroBits = function(t) {
					if (0 === t) return 26;
					var e = t,
						r = 0;
					return 0 == (8191 & e) && (r += 13, e >>>= 13), 0 == (127 & e) && (r += 7, e >>>= 7),
						0 == (15 & e) && (r += 4, e >>>= 4), 0 == (3 & e) && (r += 2, e >>>= 2), 0 == (1 &
							e) && r++, r
				}, i.prototype.bitLength = function() {
					var t = this.words[this.length - 1],
						e = this._countBits(t);
					return 26 * (this.length - 1) + e
				}, i.prototype.zeroBits = function() {
					if (this.isZero()) return 0;
					for (var t = 0, e = 0; e < this.length; e++) {
						var r = this._zeroBits(this.words[e]);
						if (t += r, 26 !== r) break
					}
					return t
				}, i.prototype.byteLength = function() {
					return Math.ceil(this.bitLength() / 8)
				}, i.prototype.toTwos = function(t) {
					return 0 !== this.negative ? this.abs().inotn(t).iaddn(1) : this.clone()
				}, i.prototype.fromTwos = function(t) {
					return this.testn(t - 1) ? this.notn(t).iaddn(1).ineg() : this.clone()
				}, i.prototype.isNeg = function() {
					return 0 !== this.negative
				}, i.prototype.neg = function() {
					return this.clone().ineg()
				}, i.prototype.ineg = function() {
					return this.isZero() || (this.negative ^= 1), this
				}, i.prototype.iuor = function(t) {
					for (; this.length < t.length;) this.words[this.length++] = 0;
					for (var e = 0; e < t.length; e++) this.words[e] = this.words[e] | t.words[e];
					return this._strip()
				}, i.prototype.ior = function(t) {
					return r(0 == (this.negative | t.negative)), this.iuor(t)
				}, i.prototype.or = function(t) {
					return this.length > t.length ? this.clone().ior(t) : t.clone().ior(this)
				}, i.prototype.uor = function(t) {
					return this.length > t.length ? this.clone().iuor(t) : t.clone().iuor(this)
				}, i.prototype.iuand = function(t) {
					var e;
					e = this.length > t.length ? t : this;
					for (var r = 0; r < e.length; r++) this.words[r] = this.words[r] & t.words[r];
					return this.length = e.length, this._strip()
				}, i.prototype.iand = function(t) {
					return r(0 == (this.negative | t.negative)), this.iuand(t)
				}, i.prototype.and = function(t) {
					return this.length > t.length ? this.clone().iand(t) : t.clone().iand(this)
				}, i.prototype.uand = function(t) {
					return this.length > t.length ? this.clone().iuand(t) : t.clone().iuand(this)
				}, i.prototype.iuxor = function(t) {
					var e, r;
					this.length > t.length ? (e = this, r = t) : (e = t, r = this);
					for (var n = 0; n < r.length; n++) this.words[n] = e.words[n] ^ r.words[n];
					if (this !== e)
						for (; n < e.length; n++) this.words[n] = e.words[n];
					return this.length = e.length, this._strip()
				}, i.prototype.ixor = function(t) {
					return r(0 == (this.negative | t.negative)), this.iuxor(t)
				}, i.prototype.xor = function(t) {
					return this.length > t.length ? this.clone().ixor(t) : t.clone().ixor(this)
				}, i.prototype.uxor = function(t) {
					return this.length > t.length ? this.clone().iuxor(t) : t.clone().iuxor(this)
				}, i.prototype.inotn = function(t) {
					r("number" == typeof t && t >= 0);
					var e = 0 | Math.ceil(t / 26),
						n = t % 26;
					this._expand(e), n > 0 && e--;
					for (var i = 0; i < e; i++) this.words[i] = 67108863 & ~this.words[i];
					return n > 0 && (this.words[i] = ~this.words[i] & 67108863 >> 26 - n), this._strip()
				}, i.prototype.notn = function(t) {
					return this.clone().inotn(t)
				}, i.prototype.setn = function(t, e) {
					r("number" == typeof t && t >= 0);
					var n = t / 26 | 0,
						i = t % 26;
					return this._expand(n + 1), this.words[n] = e ? this.words[n] | 1 << i : this.words[n] &
						~(1 << i), this._strip()
				}, i.prototype.iadd = function(t) {
					var e, r, n;
					if (0 !== this.negative && 0 === t.negative) return this.negative = 0, e = this.isub(t),
						this.negative ^= 1, this._normSign();
					if (0 === this.negative && 0 !== t.negative) return t.negative = 0, e = this.isub(t), t
						.negative = 1, e._normSign();
					this.length > t.length ? (r = this, n = t) : (r = t, n = this);
					for (var i = 0, o = 0; o < n.length; o++) e = (0 | r.words[o]) + (0 | n.words[o]) + i,
						this.words[o] = 67108863 & e, i = e >>> 26;
					for (; 0 !== i && o < r.length; o++) e = (0 | r.words[o]) + i, this.words[o] =
						67108863 & e, i = e >>> 26;
					if (this.length = r.length, 0 !== i) this.words[this.length] = i, this.length++;
					else if (r !== this)
						for (; o < r.length; o++) this.words[o] = r.words[o];
					return this
				}, i.prototype.add = function(t) {
					var e;
					return 0 !== t.negative && 0 === this.negative ? (t.negative = 0, e = this.sub(t), t
						.negative ^= 1, e) : 0 === t.negative && 0 !== this.negative ? (this.negative =
						0, e = t.sub(this), this.negative = 1, e) : this.length > t.length ? this
					.clone().iadd(t) : t.clone().iadd(this)
				}, i.prototype.isub = function(t) {
					if (0 !== t.negative) {
						t.negative = 0;
						var e = this.iadd(t);
						return t.negative = 1, e._normSign()
					}
					if (0 !== this.negative) return this.negative = 0, this.iadd(t), this.negative = 1, this
						._normSign();
					var r, n, i = this.cmp(t);
					if (0 === i) return this.negative = 0, this.length = 1, this.words[0] = 0, this;
					i > 0 ? (r = this, n = t) : (r = t, n = this);
					for (var o = 0, a = 0; a < n.length; a++) o = (e = (0 | r.words[a]) - (0 | n.words[a]) +
						o) >> 26, this.words[a] = 67108863 & e;
					for (; 0 !== o && a < r.length; a++) o = (e = (0 | r.words[a]) + o) >> 26, this.words[
						a] = 67108863 & e;
					if (0 === o && a < r.length && r !== this)
						for (; a < r.length; a++) this.words[a] = r.words[a];
					return this.length = Math.max(this.length, a), r !== this && (this.negative = 1), this
						._strip()
				}, i.prototype.sub = function(t) {
					return this.clone().isub(t)
				};
				var m = function(t, e, r) {
					var n, i, o, a = t.words,
						s = e.words,
						f = r.words,
						u = 0,
						h = 0 | a[0],
						c = 8191 & h,
						d = h >>> 13,
						l = 0 | a[1],
						p = 8191 & l,
						m = l >>> 13,
						b = 0 | a[2],
						g = 8191 & b,
						v = b >>> 13,
						y = 0 | a[3],
						w = 8191 & y,
						_ = y >>> 13,
						A = 0 | a[4],
						M = 8191 & A,
						E = A >>> 13,
						S = 0 | a[5],
						k = 8191 & S,
						B = S >>> 13,
						T = 0 | a[6],
						R = 8191 & T,
						x = T >>> 13,
						C = 0 | a[7],
						I = 8191 & C,
						D = C >>> 13,
						P = 0 | a[8],
						O = 8191 & P,
						L = P >>> 13,
						U = 0 | a[9],
						j = 8191 & U,
						N = U >>> 13,
						z = 0 | s[0],
						F = 8191 & z,
						q = z >>> 13,
						H = 0 | s[1],
						W = 8191 & H,
						G = H >>> 13,
						Y = 0 | s[2],
						K = 8191 & Y,
						V = Y >>> 13,
						Z = 0 | s[3],
						$ = 8191 & Z,
						X = Z >>> 13,
						J = 0 | s[4],
						Q = 8191 & J,
						tt = J >>> 13,
						et = 0 | s[5],
						rt = 8191 & et,
						nt = et >>> 13,
						it = 0 | s[6],
						ot = 8191 & it,
						at = it >>> 13,
						st = 0 | s[7],
						ft = 8191 & st,
						ut = st >>> 13,
						ht = 0 | s[8],
						ct = 8191 & ht,
						dt = ht >>> 13,
						lt = 0 | s[9],
						pt = 8191 & lt,
						mt = lt >>> 13;
					r.negative = t.negative ^ e.negative, r.length = 19;
					var bt = (u + (n = Math.imul(c, F)) | 0) + ((8191 & (i = (i = Math.imul(c, q)) + Math
						.imul(d, F) | 0)) << 13) | 0;
					u = ((o = Math.imul(d, q)) + (i >>> 13) | 0) + (bt >>> 26) | 0, bt &= 67108863, n = Math
						.imul(p, F), i = (i = Math.imul(p, q)) + Math.imul(m, F) | 0, o = Math.imul(m, q);
					var gt = (u + (n = n + Math.imul(c, W) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(c,
						G) | 0) + Math.imul(d, W) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(d, G) | 0) + (i >>> 13) | 0) + (gt >>> 26) | 0, gt &= 67108863,
						n = Math.imul(g, F), i = (i = Math.imul(g, q)) + Math.imul(v, F) | 0, o = Math.imul(
							v, q), n = n + Math.imul(p, W) | 0, i = (i = i + Math.imul(p, G) | 0) + Math
						.imul(m, W) | 0, o = o + Math.imul(m, G) | 0;
					var vt = (u + (n = n + Math.imul(c, K) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(c,
						V) | 0) + Math.imul(d, K) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(d, V) | 0) + (i >>> 13) | 0) + (vt >>> 26) | 0, vt &= 67108863,
						n = Math.imul(w, F), i = (i = Math.imul(w, q)) + Math.imul(_, F) | 0, o = Math.imul(
							_, q), n = n + Math.imul(g, W) | 0, i = (i = i + Math.imul(g, G) | 0) + Math
						.imul(v, W) | 0, o = o + Math.imul(v, G) | 0, n = n + Math.imul(p, K) | 0, i = (i =
							i + Math.imul(p, V) | 0) + Math.imul(m, K) | 0, o = o + Math.imul(m, V) | 0;
					var yt = (u + (n = n + Math.imul(c, $) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(c,
						X) | 0) + Math.imul(d, $) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(d, X) | 0) + (i >>> 13) | 0) + (yt >>> 26) | 0, yt &= 67108863,
						n = Math.imul(M, F), i = (i = Math.imul(M, q)) + Math.imul(E, F) | 0, o = Math.imul(
							E, q), n = n + Math.imul(w, W) | 0, i = (i = i + Math.imul(w, G) | 0) + Math
						.imul(_, W) | 0, o = o + Math.imul(_, G) | 0, n = n + Math.imul(g, K) | 0, i = (i =
							i + Math.imul(g, V) | 0) + Math.imul(v, K) | 0, o = o + Math.imul(v, V) | 0, n =
						n + Math.imul(p, $) | 0, i = (i = i + Math.imul(p, X) | 0) + Math.imul(m, $) | 0,
						o = o + Math.imul(m, X) | 0;
					var wt = (u + (n = n + Math.imul(c, Q) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(c,
						tt) | 0) + Math.imul(d, Q) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(d, tt) | 0) + (i >>> 13) | 0) + (wt >>> 26) | 0, wt &= 67108863,
						n = Math.imul(k, F), i = (i = Math.imul(k, q)) + Math.imul(B, F) | 0, o = Math.imul(
							B, q), n = n + Math.imul(M, W) | 0, i = (i = i + Math.imul(M, G) | 0) + Math
						.imul(E, W) | 0, o = o + Math.imul(E, G) | 0, n = n + Math.imul(w, K) | 0, i = (i =
							i + Math.imul(w, V) | 0) + Math.imul(_, K) | 0, o = o + Math.imul(_, V) | 0, n =
						n + Math.imul(g, $) | 0, i = (i = i + Math.imul(g, X) | 0) + Math.imul(v, $) | 0,
						o = o + Math.imul(v, X) | 0, n = n + Math.imul(p, Q) | 0, i = (i = i + Math.imul(p,
							tt) | 0) + Math.imul(m, Q) | 0, o = o + Math.imul(m, tt) | 0;
					var _t = (u + (n = n + Math.imul(c, rt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(c,
						nt) | 0) + Math.imul(d, rt) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(d, nt) | 0) + (i >>> 13) | 0) + (_t >>> 26) | 0, _t &= 67108863,
						n = Math.imul(R, F), i = (i = Math.imul(R, q)) + Math.imul(x, F) | 0, o = Math.imul(
							x, q), n = n + Math.imul(k, W) | 0, i = (i = i + Math.imul(k, G) | 0) + Math
						.imul(B, W) | 0, o = o + Math.imul(B, G) | 0, n = n + Math.imul(M, K) | 0, i = (i =
							i + Math.imul(M, V) | 0) + Math.imul(E, K) | 0, o = o + Math.imul(E, V) | 0, n =
						n + Math.imul(w, $) | 0, i = (i = i + Math.imul(w, X) | 0) + Math.imul(_, $) | 0,
						o = o + Math.imul(_, X) | 0, n = n + Math.imul(g, Q) | 0, i = (i = i + Math.imul(g,
							tt) | 0) + Math.imul(v, Q) | 0, o = o + Math.imul(v, tt) | 0, n = n + Math.imul(
							p, rt) | 0, i = (i = i + Math.imul(p, nt) | 0) + Math.imul(m, rt) | 0, o = o +
						Math.imul(m, nt) | 0;
					var At = (u + (n = n + Math.imul(c, ot) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(c,
						at) | 0) + Math.imul(d, ot) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(d, at) | 0) + (i >>> 13) | 0) + (At >>> 26) | 0, At &= 67108863,
						n = Math.imul(I, F), i = (i = Math.imul(I, q)) + Math.imul(D, F) | 0, o = Math.imul(
							D, q), n = n + Math.imul(R, W) | 0, i = (i = i + Math.imul(R, G) | 0) + Math
						.imul(x, W) | 0, o = o + Math.imul(x, G) | 0, n = n + Math.imul(k, K) | 0, i = (i =
							i + Math.imul(k, V) | 0) + Math.imul(B, K) | 0, o = o + Math.imul(B, V) | 0, n =
						n + Math.imul(M, $) | 0, i = (i = i + Math.imul(M, X) | 0) + Math.imul(E, $) | 0,
						o = o + Math.imul(E, X) | 0, n = n + Math.imul(w, Q) | 0, i = (i = i + Math.imul(w,
							tt) | 0) + Math.imul(_, Q) | 0, o = o + Math.imul(_, tt) | 0, n = n + Math.imul(
							g, rt) | 0, i = (i = i + Math.imul(g, nt) | 0) + Math.imul(v, rt) | 0, o = o +
						Math.imul(v, nt) | 0, n = n + Math.imul(p, ot) | 0, i = (i = i + Math.imul(p, at) |
							0) + Math.imul(m, ot) | 0, o = o + Math.imul(m, at) | 0;
					var Mt = (u + (n = n + Math.imul(c, ft) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(c,
						ut) | 0) + Math.imul(d, ft) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(d, ut) | 0) + (i >>> 13) | 0) + (Mt >>> 26) | 0, Mt &= 67108863,
						n = Math.imul(O, F), i = (i = Math.imul(O, q)) + Math.imul(L, F) | 0, o = Math.imul(
							L, q), n = n + Math.imul(I, W) | 0, i = (i = i + Math.imul(I, G) | 0) + Math
						.imul(D, W) | 0, o = o + Math.imul(D, G) | 0, n = n + Math.imul(R, K) | 0, i = (i =
							i + Math.imul(R, V) | 0) + Math.imul(x, K) | 0, o = o + Math.imul(x, V) | 0, n =
						n + Math.imul(k, $) | 0, i = (i = i + Math.imul(k, X) | 0) + Math.imul(B, $) | 0,
						o = o + Math.imul(B, X) | 0, n = n + Math.imul(M, Q) | 0, i = (i = i + Math.imul(M,
							tt) | 0) + Math.imul(E, Q) | 0, o = o + Math.imul(E, tt) | 0, n = n + Math.imul(
							w, rt) | 0, i = (i = i + Math.imul(w, nt) | 0) + Math.imul(_, rt) | 0, o = o +
						Math.imul(_, nt) | 0, n = n + Math.imul(g, ot) | 0, i = (i = i + Math.imul(g, at) |
							0) + Math.imul(v, ot) | 0, o = o + Math.imul(v, at) | 0, n = n + Math.imul(p,
							ft) | 0, i = (i = i + Math.imul(p, ut) | 0) + Math.imul(m, ft) | 0, o = o + Math
						.imul(m, ut) | 0;
					var Et = (u + (n = n + Math.imul(c, ct) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(c,
						dt) | 0) + Math.imul(d, ct) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(d, dt) | 0) + (i >>> 13) | 0) + (Et >>> 26) | 0, Et &= 67108863,
						n = Math.imul(j, F), i = (i = Math.imul(j, q)) + Math.imul(N, F) | 0, o = Math.imul(
							N, q), n = n + Math.imul(O, W) | 0, i = (i = i + Math.imul(O, G) | 0) + Math
						.imul(L, W) | 0, o = o + Math.imul(L, G) | 0, n = n + Math.imul(I, K) | 0, i = (i =
							i + Math.imul(I, V) | 0) + Math.imul(D, K) | 0, o = o + Math.imul(D, V) | 0, n =
						n + Math.imul(R, $) | 0, i = (i = i + Math.imul(R, X) | 0) + Math.imul(x, $) | 0,
						o = o + Math.imul(x, X) | 0, n = n + Math.imul(k, Q) | 0, i = (i = i + Math.imul(k,
							tt) | 0) + Math.imul(B, Q) | 0, o = o + Math.imul(B, tt) | 0, n = n + Math.imul(
							M, rt) | 0, i = (i = i + Math.imul(M, nt) | 0) + Math.imul(E, rt) | 0, o = o +
						Math.imul(E, nt) | 0, n = n + Math.imul(w, ot) | 0, i = (i = i + Math.imul(w, at) |
							0) + Math.imul(_, ot) | 0, o = o + Math.imul(_, at) | 0, n = n + Math.imul(g,
							ft) | 0, i = (i = i + Math.imul(g, ut) | 0) + Math.imul(v, ft) | 0, o = o + Math
						.imul(v, ut) | 0, n = n + Math.imul(p, ct) | 0, i = (i = i + Math.imul(p, dt) | 0) +
						Math.imul(m, ct) | 0, o = o + Math.imul(m, dt) | 0;
					var St = (u + (n = n + Math.imul(c, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(c,
						mt) | 0) + Math.imul(d, pt) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(d, mt) | 0) + (i >>> 13) | 0) + (St >>> 26) | 0, St &= 67108863,
						n = Math.imul(j, W), i = (i = Math.imul(j, G)) + Math.imul(N, W) | 0, o = Math.imul(
							N, G), n = n + Math.imul(O, K) | 0, i = (i = i + Math.imul(O, V) | 0) + Math
						.imul(L, K) | 0, o = o + Math.imul(L, V) | 0, n = n + Math.imul(I, $) | 0, i = (i =
							i + Math.imul(I, X) | 0) + Math.imul(D, $) | 0, o = o + Math.imul(D, X) | 0, n =
						n + Math.imul(R, Q) | 0, i = (i = i + Math.imul(R, tt) | 0) + Math.imul(x, Q) | 0,
						o = o + Math.imul(x, tt) | 0, n = n + Math.imul(k, rt) | 0, i = (i = i + Math.imul(
							k, nt) | 0) + Math.imul(B, rt) | 0, o = o + Math.imul(B, nt) | 0, n = n + Math
						.imul(M, ot) | 0, i = (i = i + Math.imul(M, at) | 0) + Math.imul(E, ot) | 0, o = o +
						Math.imul(E, at) | 0, n = n + Math.imul(w, ft) | 0, i = (i = i + Math.imul(w, ut) |
							0) + Math.imul(_, ft) | 0, o = o + Math.imul(_, ut) | 0, n = n + Math.imul(g,
							ct) | 0, i = (i = i + Math.imul(g, dt) | 0) + Math.imul(v, ct) | 0, o = o + Math
						.imul(v, dt) | 0;
					var kt = (u + (n = n + Math.imul(p, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(p,
						mt) | 0) + Math.imul(m, pt) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(m, mt) | 0) + (i >>> 13) | 0) + (kt >>> 26) | 0, kt &= 67108863,
						n = Math.imul(j, K), i = (i = Math.imul(j, V)) + Math.imul(N, K) | 0, o = Math.imul(
							N, V), n = n + Math.imul(O, $) | 0, i = (i = i + Math.imul(O, X) | 0) + Math
						.imul(L, $) | 0, o = o + Math.imul(L, X) | 0, n = n + Math.imul(I, Q) | 0, i = (i =
							i + Math.imul(I, tt) | 0) + Math.imul(D, Q) | 0, o = o + Math.imul(D, tt) | 0,
						n = n + Math.imul(R, rt) | 0, i = (i = i + Math.imul(R, nt) | 0) + Math.imul(x,
						rt) | 0, o = o + Math.imul(x, nt) | 0, n = n + Math.imul(k, ot) | 0, i = (i = i +
							Math.imul(k, at) | 0) + Math.imul(B, ot) | 0, o = o + Math.imul(B, at) | 0, n =
						n + Math.imul(M, ft) | 0, i = (i = i + Math.imul(M, ut) | 0) + Math.imul(E, ft) | 0,
						o = o + Math.imul(E, ut) | 0, n = n + Math.imul(w, ct) | 0, i = (i = i + Math.imul(
							w, dt) | 0) + Math.imul(_, ct) | 0, o = o + Math.imul(_, dt) | 0;
					var Bt = (u + (n = n + Math.imul(g, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(g,
						mt) | 0) + Math.imul(v, pt) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(v, mt) | 0) + (i >>> 13) | 0) + (Bt >>> 26) | 0, Bt &= 67108863,
						n = Math.imul(j, $), i = (i = Math.imul(j, X)) + Math.imul(N, $) | 0, o = Math.imul(
							N, X), n = n + Math.imul(O, Q) | 0, i = (i = i + Math.imul(O, tt) | 0) + Math
						.imul(L, Q) | 0, o = o + Math.imul(L, tt) | 0, n = n + Math.imul(I, rt) | 0, i = (
							i = i + Math.imul(I, nt) | 0) + Math.imul(D, rt) | 0, o = o + Math.imul(D, nt) |
						0, n = n + Math.imul(R, ot) | 0, i = (i = i + Math.imul(R, at) | 0) + Math.imul(x,
							ot) | 0, o = o + Math.imul(x, at) | 0, n = n + Math.imul(k, ft) | 0, i = (i =
							i + Math.imul(k, ut) | 0) + Math.imul(B, ft) | 0, o = o + Math.imul(B, ut) | 0,
						n = n + Math.imul(M, ct) | 0, i = (i = i + Math.imul(M, dt) | 0) + Math.imul(E,
						ct) | 0, o = o + Math.imul(E, dt) | 0;
					var Tt = (u + (n = n + Math.imul(w, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(w,
						mt) | 0) + Math.imul(_, pt) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(_, mt) | 0) + (i >>> 13) | 0) + (Tt >>> 26) | 0, Tt &= 67108863,
						n = Math.imul(j, Q), i = (i = Math.imul(j, tt)) + Math.imul(N, Q) | 0, o = Math
						.imul(N, tt), n = n + Math.imul(O, rt) | 0, i = (i = i + Math.imul(O, nt) | 0) +
						Math.imul(L, rt) | 0, o = o + Math.imul(L, nt) | 0, n = n + Math.imul(I, ot) | 0,
						i = (i = i + Math.imul(I, at) | 0) + Math.imul(D, ot) | 0, o = o + Math.imul(D,
						at) | 0, n = n + Math.imul(R, ft) | 0, i = (i = i + Math.imul(R, ut) | 0) + Math
						.imul(x, ft) | 0, o = o + Math.imul(x, ut) | 0, n = n + Math.imul(k, ct) | 0, i = (
							i = i + Math.imul(k, dt) | 0) + Math.imul(B, ct) | 0, o = o + Math.imul(B, dt) |
						0;
					var Rt = (u + (n = n + Math.imul(M, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(M,
						mt) | 0) + Math.imul(E, pt) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(E, mt) | 0) + (i >>> 13) | 0) + (Rt >>> 26) | 0, Rt &= 67108863,
						n = Math.imul(j, rt), i = (i = Math.imul(j, nt)) + Math.imul(N, rt) | 0, o = Math
						.imul(N, nt), n = n + Math.imul(O, ot) | 0, i = (i = i + Math.imul(O, at) | 0) +
						Math.imul(L, ot) | 0, o = o + Math.imul(L, at) | 0, n = n + Math.imul(I, ft) | 0,
						i = (i = i + Math.imul(I, ut) | 0) + Math.imul(D, ft) | 0, o = o + Math.imul(D,
						ut) | 0, n = n + Math.imul(R, ct) | 0, i = (i = i + Math.imul(R, dt) | 0) + Math
						.imul(x, ct) | 0, o = o + Math.imul(x, dt) | 0;
					var xt = (u + (n = n + Math.imul(k, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(k,
						mt) | 0) + Math.imul(B, pt) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(B, mt) | 0) + (i >>> 13) | 0) + (xt >>> 26) | 0, xt &= 67108863,
						n = Math.imul(j, ot), i = (i = Math.imul(j, at)) + Math.imul(N, ot) | 0, o = Math
						.imul(N, at), n = n + Math.imul(O, ft) | 0, i = (i = i + Math.imul(O, ut) | 0) +
						Math.imul(L, ft) | 0, o = o + Math.imul(L, ut) | 0, n = n + Math.imul(I, ct) | 0,
						i = (i = i + Math.imul(I, dt) | 0) + Math.imul(D, ct) | 0, o = o + Math.imul(D,
						dt) | 0;
					var Ct = (u + (n = n + Math.imul(R, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(R,
						mt) | 0) + Math.imul(x, pt) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(x, mt) | 0) + (i >>> 13) | 0) + (Ct >>> 26) | 0, Ct &= 67108863,
						n = Math.imul(j, ft), i = (i = Math.imul(j, ut)) + Math.imul(N, ft) | 0, o = Math
						.imul(N, ut), n = n + Math.imul(O, ct) | 0, i = (i = i + Math.imul(O, dt) | 0) +
						Math.imul(L, ct) | 0, o = o + Math.imul(L, dt) | 0;
					var It = (u + (n = n + Math.imul(I, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(I,
						mt) | 0) + Math.imul(D, pt) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(D, mt) | 0) + (i >>> 13) | 0) + (It >>> 26) | 0, It &= 67108863,
						n = Math.imul(j, ct), i = (i = Math.imul(j, dt)) + Math.imul(N, ct) | 0, o = Math
						.imul(N, dt);
					var Dt = (u + (n = n + Math.imul(O, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(O,
						mt) | 0) + Math.imul(L, pt) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(L, mt) | 0) + (i >>> 13) | 0) + (Dt >>> 26) | 0, Dt &= 67108863;
					var Pt = (u + (n = Math.imul(j, pt)) | 0) + ((8191 & (i = (i = Math.imul(j, mt)) + Math
						.imul(N, pt) | 0)) << 13) | 0;
					return u = ((o = Math.imul(N, mt)) + (i >>> 13) | 0) + (Pt >>> 26) | 0, Pt &= 67108863,
						f[0] = bt, f[1] = gt, f[2] = vt, f[3] = yt, f[4] = wt, f[5] = _t, f[6] = At, f[7] =
						Mt, f[8] = Et, f[9] = St, f[10] = kt, f[11] = Bt, f[12] = Tt, f[13] = Rt, f[14] =
						xt, f[15] = Ct, f[16] = It, f[17] = Dt, f[18] = Pt, 0 !== u && (f[19] = u, r
							.length++), r
				};

				function b(t, e, r) {
					r.negative = e.negative ^ t.negative, r.length = t.length + e.length;
					for (var n = 0, i = 0, o = 0; o < r.length - 1; o++) {
						var a = i;
						i = 0;
						for (var s = 67108863 & n, f = Math.min(o, e.length - 1), u = Math.max(0, o - t.length +
								1); u <= f; u++) {
							var h = o - u,
								c = (0 | t.words[h]) * (0 | e.words[u]),
								d = 67108863 & c;
							s = 67108863 & (d = d + s | 0), i += (a = (a = a + (c / 67108864 | 0) | 0) + (d >>>
								26) | 0) >>> 26, a &= 67108863
						}
						r.words[o] = s, n = a, a = i
					}
					return 0 !== n ? r.words[o] = n : r.length--, r._strip()
				}

				function g(t, e, r) {
					return b(t, e, r)
				}

				function v(t, e) {
					this.x = t, this.y = e
				}
				Math.imul || (m = p), i.prototype.mulTo = function(t, e) {
					var r = this.length + t.length;
					return 10 === this.length && 10 === t.length ? m(this, t, e) : r < 63 ? p(this, t, e) :
						r < 1024 ? b(this, t, e) : g(this, t, e)
				}, v.prototype.makeRBT = function(t) {
					for (var e = new Array(t), r = i.prototype._countBits(t) - 1, n = 0; n < t; n++) e[n] =
						this.revBin(n, r, t);
					return e
				}, v.prototype.revBin = function(t, e, r) {
					if (0 === t || t === r - 1) return t;
					for (var n = 0, i = 0; i < e; i++) n |= (1 & t) << e - i - 1, t >>= 1;
					return n
				}, v.prototype.permute = function(t, e, r, n, i, o) {
					for (var a = 0; a < o; a++) n[a] = e[t[a]], i[a] = r[t[a]]
				}, v.prototype.transform = function(t, e, r, n, i, o) {
					this.permute(o, t, e, r, n, i);
					for (var a = 1; a < i; a <<= 1)
						for (var s = a << 1, f = Math.cos(2 * Math.PI / s), u = Math.sin(2 * Math.PI / s),
								h = 0; h < i; h += s)
							for (var c = f, d = u, l = 0; l < a; l++) {
								var p = r[h + l],
									m = n[h + l],
									b = r[h + l + a],
									g = n[h + l + a],
									v = c * b - d * g;
								g = c * g + d * b, b = v, r[h + l] = p + b, n[h + l] = m + g, r[h + l + a] =
									p - b, n[h + l + a] = m - g, l !== s && (v = f * c - u * d, d = f * d +
										u * c, c = v)
							}
				}, v.prototype.guessLen13b = function(t, e) {
					var r = 1 | Math.max(e, t),
						n = 1 & r,
						i = 0;
					for (r = r / 2 | 0; r; r >>>= 1) i++;
					return 1 << i + 1 + n
				}, v.prototype.conjugate = function(t, e, r) {
					if (!(r <= 1))
						for (var n = 0; n < r / 2; n++) {
							var i = t[n];
							t[n] = t[r - n - 1], t[r - n - 1] = i, i = e[n], e[n] = -e[r - n - 1], e[r - n -
								1] = -i
						}
				}, v.prototype.normalize13b = function(t, e) {
					for (var r = 0, n = 0; n < e / 2; n++) {
						var i = 8192 * Math.round(t[2 * n + 1] / e) + Math.round(t[2 * n] / e) + r;
						t[n] = 67108863 & i, r = i < 67108864 ? 0 : i / 67108864 | 0
					}
					return t
				}, v.prototype.convert13b = function(t, e, n, i) {
					for (var o = 0, a = 0; a < e; a++) o += 0 | t[a], n[2 * a] = 8191 & o, o >>>= 13, n[2 *
						a + 1] = 8191 & o, o >>>= 13;
					for (a = 2 * e; a < i; ++a) n[a] = 0;
					r(0 === o), r(0 == (-8192 & o))
				}, v.prototype.stub = function(t) {
					for (var e = new Array(t), r = 0; r < t; r++) e[r] = 0;
					return e
				}, v.prototype.mulp = function(t, e, r) {
					var n = 2 * this.guessLen13b(t.length, e.length),
						i = this.makeRBT(n),
						o = this.stub(n),
						a = new Array(n),
						s = new Array(n),
						f = new Array(n),
						u = new Array(n),
						h = new Array(n),
						c = new Array(n),
						d = r.words;
					d.length = n, this.convert13b(t.words, t.length, a, n), this.convert13b(e.words, e
						.length, u, n), this.transform(a, o, s, f, n, i), this.transform(u, o, h, c, n,
						i);
					for (var l = 0; l < n; l++) {
						var p = s[l] * h[l] - f[l] * c[l];
						f[l] = s[l] * c[l] + f[l] * h[l], s[l] = p
					}
					return this.conjugate(s, f, n), this.transform(s, f, d, o, n, i), this.conjugate(d, o,
							n), this.normalize13b(d, n), r.negative = t.negative ^ e.negative, r.length = t
						.length + e.length, r._strip()
				}, i.prototype.mul = function(t) {
					var e = new i(null);
					return e.words = new Array(this.length + t.length), this.mulTo(t, e)
				}, i.prototype.mulf = function(t) {
					var e = new i(null);
					return e.words = new Array(this.length + t.length), g(this, t, e)
				}, i.prototype.imul = function(t) {
					return this.clone().mulTo(t, this)
				}, i.prototype.imuln = function(t) {
					var e = t < 0;
					e && (t = -t), r("number" == typeof t), r(t < 67108864);
					for (var n = 0, i = 0; i < this.length; i++) {
						var o = (0 | this.words[i]) * t,
							a = (67108863 & o) + (67108863 & n);
						n >>= 26, n += o / 67108864 | 0, n += a >>> 26, this.words[i] = 67108863 & a
					}
					return 0 !== n && (this.words[i] = n, this.length++), e ? this.ineg() : this
				}, i.prototype.muln = function(t) {
					return this.clone().imuln(t)
				}, i.prototype.sqr = function() {
					return this.mul(this)
				}, i.prototype.isqr = function() {
					return this.imul(this.clone())
				}, i.prototype.pow = function(t) {
					var e = function(t) {
						for (var e = new Array(t.bitLength()), r = 0; r < e.length; r++) {
							var n = r / 26 | 0,
								i = r % 26;
							e[r] = t.words[n] >>> i & 1
						}
						return e
					}(t);
					if (0 === e.length) return new i(1);
					for (var r = this, n = 0; n < e.length && 0 === e[n]; n++, r = r.sqr());
					if (++n < e.length)
						for (var o = r.sqr(); n < e.length; n++, o = o.sqr()) 0 !== e[n] && (r = r.mul(o));
					return r
				}, i.prototype.iushln = function(t) {
					r("number" == typeof t && t >= 0);
					var e, n = t % 26,
						i = (t - n) / 26,
						o = 67108863 >>> 26 - n << 26 - n;
					if (0 !== n) {
						var a = 0;
						for (e = 0; e < this.length; e++) {
							var s = this.words[e] & o,
								f = (0 | this.words[e]) - s << n;
							this.words[e] = f | a, a = s >>> 26 - n
						}
						a && (this.words[e] = a, this.length++)
					}
					if (0 !== i) {
						for (e = this.length - 1; e >= 0; e--) this.words[e + i] = this.words[e];
						for (e = 0; e < i; e++) this.words[e] = 0;
						this.length += i
					}
					return this._strip()
				}, i.prototype.ishln = function(t) {
					return r(0 === this.negative), this.iushln(t)
				}, i.prototype.iushrn = function(t, e, n) {
					var i;
					r("number" == typeof t && t >= 0), i = e ? (e - e % 26) / 26 : 0;
					var o = t % 26,
						a = Math.min((t - o) / 26, this.length),
						s = 67108863 ^ 67108863 >>> o << o,
						f = n;
					if (i -= a, i = Math.max(0, i), f) {
						for (var u = 0; u < a; u++) f.words[u] = this.words[u];
						f.length = a
					}
					if (0 === a);
					else if (this.length > a)
						for (this.length -= a, u = 0; u < this.length; u++) this.words[u] = this.words[u +
							a];
					else this.words[0] = 0, this.length = 1;
					var h = 0;
					for (u = this.length - 1; u >= 0 && (0 !== h || u >= i); u--) {
						var c = 0 | this.words[u];
						this.words[u] = h << 26 - o | c >>> o, h = c & s
					}
					return f && 0 !== h && (f.words[f.length++] = h), 0 === this.length && (this.words[0] =
						0, this.length = 1), this._strip()
				}, i.prototype.ishrn = function(t, e, n) {
					return r(0 === this.negative), this.iushrn(t, e, n)
				}, i.prototype.shln = function(t) {
					return this.clone().ishln(t)
				}, i.prototype.ushln = function(t) {
					return this.clone().iushln(t)
				}, i.prototype.shrn = function(t) {
					return this.clone().ishrn(t)
				}, i.prototype.ushrn = function(t) {
					return this.clone().iushrn(t)
				}, i.prototype.testn = function(t) {
					r("number" == typeof t && t >= 0);
					var e = t % 26,
						n = (t - e) / 26,
						i = 1 << e;
					return !(this.length <= n) && !!(this.words[n] & i)
				}, i.prototype.imaskn = function(t) {
					r("number" == typeof t && t >= 0);
					var e = t % 26,
						n = (t - e) / 26;
					if (r(0 === this.negative, "imaskn works only with positive numbers"), this.length <= n)
						return this;
					if (0 !== e && n++, this.length = Math.min(n, this.length), 0 !== e) {
						var i = 67108863 ^ 67108863 >>> e << e;
						this.words[this.length - 1] &= i
					}
					return this._strip()
				}, i.prototype.maskn = function(t) {
					return this.clone().imaskn(t)
				}, i.prototype.iaddn = function(t) {
					return r("number" == typeof t), r(t < 67108864), t < 0 ? this.isubn(-t) : 0 !== this
						.negative ? 1 === this.length && (0 | this.words[0]) <= t ? (this.words[0] = t - (
							0 | this.words[0]), this.negative = 0, this) : (this.negative = 0, this.isubn(
							t), this.negative = 1, this) : this._iaddn(t)
				}, i.prototype._iaddn = function(t) {
					this.words[0] += t;
					for (var e = 0; e < this.length && this.words[e] >= 67108864; e++) this.words[e] -=
						67108864, e === this.length - 1 ? this.words[e + 1] = 1 : this.words[e + 1]++;
					return this.length = Math.max(this.length, e + 1), this
				}, i.prototype.isubn = function(t) {
					if (r("number" == typeof t), r(t < 67108864), t < 0) return this.iaddn(-t);
					if (0 !== this.negative) return this.negative = 0, this.iaddn(t), this.negative = 1,
						this;
					if (this.words[0] -= t, 1 === this.length && this.words[0] < 0) this.words[0] = -this
						.words[0], this.negative = 1;
					else
						for (var e = 0; e < this.length && this.words[e] < 0; e++) this.words[e] +=
							67108864, this.words[e + 1] -= 1;
					return this._strip()
				}, i.prototype.addn = function(t) {
					return this.clone().iaddn(t)
				}, i.prototype.subn = function(t) {
					return this.clone().isubn(t)
				}, i.prototype.iabs = function() {
					return this.negative = 0, this
				}, i.prototype.abs = function() {
					return this.clone().iabs()
				}, i.prototype._ishlnsubmul = function(t, e, n) {
					var i, o, a = t.length + n;
					this._expand(a);
					var s = 0;
					for (i = 0; i < t.length; i++) {
						o = (0 | this.words[i + n]) + s;
						var f = (0 | t.words[i]) * e;
						s = ((o -= 67108863 & f) >> 26) - (f / 67108864 | 0), this.words[i + n] = 67108863 &
							o
					}
					for (; i < this.length - n; i++) s = (o = (0 | this.words[i + n]) + s) >> 26, this
						.words[i + n] = 67108863 & o;
					if (0 === s) return this._strip();
					for (r(-1 === s), s = 0, i = 0; i < this.length; i++) s = (o = -(0 | this.words[i]) +
						s) >> 26, this.words[i] = 67108863 & o;
					return this.negative = 1, this._strip()
				}, i.prototype._wordDiv = function(t, e) {
					var r = (this.length, t.length),
						n = this.clone(),
						o = t,
						a = 0 | o.words[o.length - 1];
					0 !== (r = 26 - this._countBits(a)) && (o = o.ushln(r), n.iushln(r), a = 0 | o.words[o
						.length - 1]);
					var s, f = n.length - o.length;
					if ("mod" !== e) {
						(s = new i(null)).length = f + 1, s.words = new Array(s.length);
						for (var u = 0; u < s.length; u++) s.words[u] = 0
					}
					var h = n.clone()._ishlnsubmul(o, 1, f);
					0 === h.negative && (n = h, s && (s.words[f] = 1));
					for (var c = f - 1; c >= 0; c--) {
						var d = 67108864 * (0 | n.words[o.length + c]) + (0 | n.words[o.length + c - 1]);
						for (d = Math.min(d / a | 0, 67108863), n._ishlnsubmul(o, d, c); 0 !== n.negative;)
							d--, n.negative = 0, n._ishlnsubmul(o, 1, c), n.isZero() || (n.negative ^= 1);
						s && (s.words[c] = d)
					}
					return s && s._strip(), n._strip(), "div" !== e && 0 !== r && n.iushrn(r), {
						div: s || null,
						mod: n
					}
				}, i.prototype.divmod = function(t, e, n) {
					return r(!t.isZero()), this.isZero() ? {
						div: new i(0),
						mod: new i(0)
					} : 0 !== this.negative && 0 === t.negative ? (s = this.neg().divmod(t, e),
						"mod" !== e && (o = s.div.neg()), "div" !== e && (a = s.mod.neg(), n && 0 !== a
							.negative && a.iadd(t)), {
							div: o,
							mod: a
						}) : 0 === this.negative && 0 !== t.negative ? (s = this.divmod(t.neg(), e),
						"mod" !== e && (o = s.div.neg()), {
							div: o,
							mod: s.mod
						}) : 0 != (this.negative & t.negative) ? (s = this.neg().divmod(t.neg(), e),
						"div" !== e && (a = s.mod.neg(), n && 0 !== a.negative && a.isub(t)), {
							div: s.div,
							mod: a
						}) : t.length > this.length || this.cmp(t) < 0 ? {
						div: new i(0),
						mod: this
					} : 1 === t.length ? "div" === e ? {
						div: this.divn(t.words[0]),
						mod: null
					} : "mod" === e ? {
						div: null,
						mod: new i(this.modrn(t.words[0]))
					} : {
						div: this.divn(t.words[0]),
						mod: new i(this.modrn(t.words[0]))
					} : this._wordDiv(t, e);
				}, i.prototype.div = function(t) {
					return this.divmod(t, "div", !1).div
				}, i.prototype.mod = function(t) {
					return this.divmod(t, "mod", !1).mod
				}, i.prototype.umod = function(t) {
					return this.divmod(t, "mod", !0).mod
				}, i.prototype.divRound = function(t) {
					var e = this.divmod(t);
					if (e.mod.isZero()) return e.div;
					var r = 0 !== e.div.negative ? e.mod.isub(t) : e.mod,
						n = t.ushrn(1),
						i = t.andln(1),
						o = r.cmp(n);
					return o < 0 || 1 === i && 0 === o ? e.div : 0 !== e.div.negative ? e.div.isubn(1) : e
						.div.iaddn(1)
				}, i.prototype.modrn = function(t) {
					var e = t < 0;
					e && (t = -t), r(t <= 67108863);
					for (var n = (1 << 26) % t, i = 0, o = this.length - 1; o >= 0; o--) i = (n * i + (0 |
						this.words[o])) % t;
					return e ? -i : i
				}, i.prototype.modn = function(t) {
					return this.modrn(t)
				}, i.prototype.idivn = function(t) {
					var e = t < 0;
					e && (t = -t), r(t <= 67108863);
					for (var n = 0, i = this.length - 1; i >= 0; i--) {
						var o = (0 | this.words[i]) + 67108864 * n;
						this.words[i] = o / t | 0, n = o % t
					}
					return this._strip(), e ? this.ineg() : this
				}, i.prototype.divn = function(t) {
					return this.clone().idivn(t)
				}, i.prototype.egcd = function(t) {
					r(0 === t.negative), r(!t.isZero());
					var e = this,
						n = t.clone();
					e = 0 !== e.negative ? e.umod(t) : e.clone();
					for (var o = new i(1), a = new i(0), s = new i(0), f = new i(1), u = 0; e.isEven() && n
						.isEven();) e.iushrn(1), n.iushrn(1), ++u;
					for (var h = n.clone(), c = e.clone(); !e.isZero();) {
						for (var d = 0, l = 1; 0 == (e.words[0] & l) && d < 26; ++d, l <<= 1);
						if (d > 0)
							for (e.iushrn(d); d-- > 0;)(o.isOdd() || a.isOdd()) && (o.iadd(h), a.isub(c)), o
								.iushrn(1), a.iushrn(1);
						for (var p = 0, m = 1; 0 == (n.words[0] & m) && p < 26; ++p, m <<= 1);
						if (p > 0)
							for (n.iushrn(p); p-- > 0;)(s.isOdd() || f.isOdd()) && (s.iadd(h), f.isub(c)), s
								.iushrn(1), f.iushrn(1);
						e.cmp(n) >= 0 ? (e.isub(n), o.isub(s), a.isub(f)) : (n.isub(e), s.isub(o), f.isub(
							a))
					}
					return {
						a: s,
						b: f,
						gcd: n.iushln(u)
					}
				}, i.prototype._invmp = function(t) {
					r(0 === t.negative), r(!t.isZero());
					var e = this,
						n = t.clone();
					e = 0 !== e.negative ? e.umod(t) : e.clone();
					for (var o, a = new i(1), s = new i(0), f = n.clone(); e.cmpn(1) > 0 && n.cmpn(1) >
						0;) {
						for (var u = 0, h = 1; 0 == (e.words[0] & h) && u < 26; ++u, h <<= 1);
						if (u > 0)
							for (e.iushrn(u); u-- > 0;) a.isOdd() && a.iadd(f), a.iushrn(1);
						for (var c = 0, d = 1; 0 == (n.words[0] & d) && c < 26; ++c, d <<= 1);
						if (c > 0)
							for (n.iushrn(c); c-- > 0;) s.isOdd() && s.iadd(f), s.iushrn(1);
						e.cmp(n) >= 0 ? (e.isub(n), a.isub(s)) : (n.isub(e), s.isub(a))
					}
					return (o = 0 === e.cmpn(1) ? a : s).cmpn(0) < 0 && o.iadd(t), o
				}, i.prototype.gcd = function(t) {
					if (this.isZero()) return t.abs();
					if (t.isZero()) return this.abs();
					var e = this.clone(),
						r = t.clone();
					e.negative = 0, r.negative = 0;
					for (var n = 0; e.isEven() && r.isEven(); n++) e.iushrn(1), r.iushrn(1);
					for (;;) {
						for (; e.isEven();) e.iushrn(1);
						for (; r.isEven();) r.iushrn(1);
						var i = e.cmp(r);
						if (i < 0) {
							var o = e;
							e = r, r = o
						} else if (0 === i || 0 === r.cmpn(1)) break;
						e.isub(r)
					}
					return r.iushln(n)
				}, i.prototype.invm = function(t) {
					return this.egcd(t).a.umod(t)
				}, i.prototype.isEven = function() {
					return 0 == (1 & this.words[0])
				}, i.prototype.isOdd = function() {
					return 1 == (1 & this.words[0])
				}, i.prototype.andln = function(t) {
					return this.words[0] & t
				}, i.prototype.bincn = function(t) {
					r("number" == typeof t);
					var e = t % 26,
						n = (t - e) / 26,
						i = 1 << e;
					if (this.length <= n) return this._expand(n + 1), this.words[n] |= i, this;
					for (var o = i, a = n; 0 !== o && a < this.length; a++) {
						var s = 0 | this.words[a];
						o = (s += o) >>> 26, s &= 67108863, this.words[a] = s
					}
					return 0 !== o && (this.words[a] = o, this.length++), this
				}, i.prototype.isZero = function() {
					return 1 === this.length && 0 === this.words[0]
				}, i.prototype.cmpn = function(t) {
					var e, n = t < 0;
					if (0 !== this.negative && !n) return -1;
					if (0 === this.negative && n) return 1;
					if (this._strip(), this.length > 1) e = 1;
					else {
						n && (t = -t), r(t <= 67108863, "Number is too big");
						var i = 0 | this.words[0];
						e = i === t ? 0 : i < t ? -1 : 1
					}
					return 0 !== this.negative ? 0 | -e : e
				}, i.prototype.cmp = function(t) {
					if (0 !== this.negative && 0 === t.negative) return -1;
					if (0 === this.negative && 0 !== t.negative) return 1;
					var e = this.ucmp(t);
					return 0 !== this.negative ? 0 | -e : e
				}, i.prototype.ucmp = function(t) {
					if (this.length > t.length) return 1;
					if (this.length < t.length) return -1;
					for (var e = 0, r = this.length - 1; r >= 0; r--) {
						var n = 0 | this.words[r],
							i = 0 | t.words[r];
						if (n !== i) {
							n < i ? e = -1 : n > i && (e = 1);
							break
						}
					}
					return e
				}, i.prototype.gtn = function(t) {
					return 1 === this.cmpn(t)
				}, i.prototype.gt = function(t) {
					return 1 === this.cmp(t)
				}, i.prototype.gten = function(t) {
					return this.cmpn(t) >= 0
				}, i.prototype.gte = function(t) {
					return this.cmp(t) >= 0
				}, i.prototype.ltn = function(t) {
					return -1 === this.cmpn(t)
				}, i.prototype.lt = function(t) {
					return -1 === this.cmp(t)
				}, i.prototype.lten = function(t) {
					return this.cmpn(t) <= 0
				}, i.prototype.lte = function(t) {
					return this.cmp(t) <= 0
				}, i.prototype.eqn = function(t) {
					return 0 === this.cmpn(t)
				}, i.prototype.eq = function(t) {
					return 0 === this.cmp(t)
				}, i.red = function(t) {
					return new S(t)
				}, i.prototype.toRed = function(t) {
					return r(!this.red, "Already a number in reduction context"), r(0 === this.negative,
						"red works only with positives"), t.convertTo(this)._forceRed(t)
				}, i.prototype.fromRed = function() {
					return r(this.red, "fromRed works only with numbers in reduction context"), this.red
						.convertFrom(this)
				}, i.prototype._forceRed = function(t) {
					return this.red = t, this
				}, i.prototype.forceRed = function(t) {
					return r(!this.red, "Already a number in reduction context"), this._forceRed(t)
				}, i.prototype.redAdd = function(t) {
					return r(this.red, "redAdd works only with red numbers"), this.red.add(this, t)
				}, i.prototype.redIAdd = function(t) {
					return r(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, t)
				}, i.prototype.redSub = function(t) {
					return r(this.red, "redSub works only with red numbers"), this.red.sub(this, t)
				}, i.prototype.redISub = function(t) {
					return r(this.red, "redISub works only with red numbers"), this.red.isub(this, t)
				}, i.prototype.redShl = function(t) {
					return r(this.red, "redShl works only with red numbers"), this.red.shl(this, t)
				}, i.prototype.redMul = function(t) {
					return r(this.red, "redMul works only with red numbers"), this.red._verify2(this, t),
						this.red.mul(this, t)
				}, i.prototype.redIMul = function(t) {
					return r(this.red, "redMul works only with red numbers"), this.red._verify2(this, t),
						this.red.imul(this, t)
				}, i.prototype.redSqr = function() {
					return r(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this
						.red.sqr(this)
				}, i.prototype.redISqr = function() {
					return r(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this
						.red.isqr(this)
				}, i.prototype.redSqrt = function() {
					return r(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this
						.red.sqrt(this)
				}, i.prototype.redInvm = function() {
					return r(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this
						.red.invm(this)
				}, i.prototype.redNeg = function() {
					return r(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this
						.red.neg(this)
				}, i.prototype.redPow = function(t) {
					return r(this.red && !t.red, "redPow(normalNum)"), this.red._verify1(this), this.red
						.pow(this, t)
				};
				var y = {
					k256: null,
					p224: null,
					p192: null,
					p25519: null
				};

				function w(t, e) {
					this.name = t, this.p = new i(e, 16), this.n = this.p.bitLength(), this.k = new i(1).iushln(
						this.n).isub(this.p), this.tmp = this._tmp()
				}

				function _() {
					w.call(this, "k256",
						"ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")
				}

				function A() {
					w.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")
				}

				function M() {
					w.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")
				}

				function E() {
					w.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")
				}

				function S(t) {
					if ("string" == typeof t) {
						var e = i._prime(t);
						this.m = e.p, this.prime = e
					} else r(t.gtn(1), "modulus must be greater than 1"), this.m = t, this.prime = null
				}

				function k(t) {
					S.call(this, t), this.shift = this.m.bitLength(), this.shift % 26 != 0 && (this.shift +=
							26 - this.shift % 26), this.r = new i(1).iushln(this.shift), this.r2 = this.imod(
							this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r)
						.isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this
							.minv)
				}
				w.prototype._tmp = function() {
					var t = new i(null);
					return t.words = new Array(Math.ceil(this.n / 13)), t
				}, w.prototype.ireduce = function(t) {
					var e, r = t;
					do {
						this.split(r, this.tmp), e = (r = (r = this.imulK(r)).iadd(this.tmp)).bitLength()
					} while (e > this.n);
					var n = e < this.n ? -1 : r.ucmp(this.p);
					return 0 === n ? (r.words[0] = 0, r.length = 1) : n > 0 ? r.isub(this.p) : void 0 !== r
						.strip ? r.strip() : r._strip(), r
				}, w.prototype.split = function(t, e) {
					t.iushrn(this.n, 0, e)
				}, w.prototype.imulK = function(t) {
					return t.imul(this.k)
				}, n(_, w), _.prototype.split = function(t, e) {
					for (var r = 4194303, n = Math.min(t.length, 9), i = 0; i < n; i++) e.words[i] = t
						.words[i];
					if (e.length = n, t.length <= 9) return t.words[0] = 0, void(t.length = 1);
					var o = t.words[9];
					for (e.words[e.length++] = o & r, i = 10; i < t.length; i++) {
						var a = 0 | t.words[i];
						t.words[i - 10] = (a & r) << 4 | o >>> 22, o = a
					}
					o >>>= 22, t.words[i - 10] = o, 0 === o && t.length > 10 ? t.length -= 10 : t.length -=
						9
				}, _.prototype.imulK = function(t) {
					t.words[t.length] = 0, t.words[t.length + 1] = 0, t.length += 2;
					for (var e = 0, r = 0; r < t.length; r++) {
						var n = 0 | t.words[r];
						e += 977 * n, t.words[r] = 67108863 & e, e = 64 * n + (e / 67108864 | 0)
					}
					return 0 === t.words[t.length - 1] && (t.length--, 0 === t.words[t.length - 1] && t
						.length--), t
				}, n(A, w), n(M, w), n(E, w), E.prototype.imulK = function(t) {
					for (var e = 0, r = 0; r < t.length; r++) {
						var n = 19 * (0 | t.words[r]) + e,
							i = 67108863 & n;
						n >>>= 26, t.words[r] = i, e = n
					}
					return 0 !== e && (t.words[t.length++] = e), t
				}, i._prime = function(t) {
					if (y[t]) return y[t];
					var e;
					if ("k256" === t) e = new _;
					else if ("p224" === t) e = new A;
					else if ("p192" === t) e = new M;
					else {
						if ("p25519" !== t) throw new Error("Unknown prime " + t);
						e = new E
					}
					return y[t] = e, e
				}, S.prototype._verify1 = function(t) {
					r(0 === t.negative, "red works only with positives"), r(t.red,
						"red works only with red numbers")
				}, S.prototype._verify2 = function(t, e) {
					r(0 == (t.negative | e.negative), "red works only with positives"), r(t.red && t.red ===
						e.red, "red works only with red numbers")
				}, S.prototype.imod = function(t) {
					return this.prime ? this.prime.ireduce(t)._forceRed(this) : (u(t, t.umod(this.m)
						._forceRed(this)), t)
				}, S.prototype.neg = function(t) {
					return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this)
				}, S.prototype.add = function(t, e) {
					this._verify2(t, e);
					var r = t.add(e);
					return r.cmp(this.m) >= 0 && r.isub(this.m), r._forceRed(this)
				}, S.prototype.iadd = function(t, e) {
					this._verify2(t, e);
					var r = t.iadd(e);
					return r.cmp(this.m) >= 0 && r.isub(this.m), r
				}, S.prototype.sub = function(t, e) {
					this._verify2(t, e);
					var r = t.sub(e);
					return r.cmpn(0) < 0 && r.iadd(this.m), r._forceRed(this)
				}, S.prototype.isub = function(t, e) {
					this._verify2(t, e);
					var r = t.isub(e);
					return r.cmpn(0) < 0 && r.iadd(this.m), r
				}, S.prototype.shl = function(t, e) {
					return this._verify1(t), this.imod(t.ushln(e))
				}, S.prototype.imul = function(t, e) {
					return this._verify2(t, e), this.imod(t.imul(e))
				}, S.prototype.mul = function(t, e) {
					return this._verify2(t, e), this.imod(t.mul(e))
				}, S.prototype.isqr = function(t) {
					return this.imul(t, t.clone())
				}, S.prototype.sqr = function(t) {
					return this.mul(t, t)
				}, S.prototype.sqrt = function(t) {
					if (t.isZero()) return t.clone();
					var e = this.m.andln(3);
					if (r(e % 2 == 1), 3 === e) {
						var n = this.m.add(new i(1)).iushrn(2);
						return this.pow(t, n)
					}
					for (var o = this.m.subn(1), a = 0; !o.isZero() && 0 === o.andln(1);) a++, o.iushrn(1);
					r(!o.isZero());
					var s = new i(1).toRed(this),
						f = s.redNeg(),
						u = this.m.subn(1).iushrn(1),
						h = this.m.bitLength();
					for (h = new i(2 * h * h).toRed(this); 0 !== this.pow(h, u).cmp(f);) h.redIAdd(f);
					for (var c = this.pow(h, o), d = this.pow(t, o.addn(1).iushrn(1)), l = this.pow(t, o),
							p = a; 0 !== l.cmp(s);) {
						for (var m = l, b = 0; 0 !== m.cmp(s); b++) m = m.redSqr();
						r(b < p);
						var g = this.pow(c, new i(1).iushln(p - b - 1));
						d = d.redMul(g), c = g.redSqr(), l = l.redMul(c), p = b
					}
					return d
				}, S.prototype.invm = function(t) {
					var e = t._invmp(this.m);
					return 0 !== e.negative ? (e.negative = 0, this.imod(e).redNeg()) : this.imod(e)
				}, S.prototype.pow = function(t, e) {
					if (e.isZero()) return new i(1).toRed(this);
					if (0 === e.cmpn(1)) return t.clone();
					var r = new Array(16);
					r[0] = new i(1).toRed(this), r[1] = t;
					for (var n = 2; n < r.length; n++) r[n] = this.mul(r[n - 1], t);
					var o = r[0],
						a = 0,
						s = 0,
						f = e.bitLength() % 26;
					for (0 === f && (f = 26), n = e.length - 1; n >= 0; n--) {
						for (var u = e.words[n], h = f - 1; h >= 0; h--) {
							var c = u >> h & 1;
							o !== r[0] && (o = this.sqr(o)), 0 !== c || 0 !== a ? (a <<= 1, a |= c, (4 ===
									++s || 0 === n && 0 === h) && (o = this.mul(o, r[a]), s = 0, a = 0)) :
								s = 0
						}
						f = 26
					}
					return o
				}, S.prototype.convertTo = function(t) {
					var e = t.umod(this.m);
					return e === t ? e.clone() : e
				}, S.prototype.convertFrom = function(t) {
					var e = t.clone();
					return e.red = null, e
				}, i.mont = function(t) {
					return new k(t)
				}, n(k, S), k.prototype.convertTo = function(t) {
					return this.imod(t.ushln(this.shift))
				}, k.prototype.convertFrom = function(t) {
					var e = this.imod(t.mul(this.rinv));
					return e.red = null, e
				}, k.prototype.imul = function(t, e) {
					if (t.isZero() || e.isZero()) return t.words[0] = 0, t.length = 1, t;
					var r = t.imul(e),
						n = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
						i = r.isub(n).iushrn(this.shift),
						o = i;
					return i.cmp(this.m) >= 0 ? o = i.isub(this.m) : i.cmpn(0) < 0 && (o = i.iadd(this.m)),
						o._forceRed(this)
				}, k.prototype.mul = function(t, e) {
					if (t.isZero() || e.isZero()) return new i(0)._forceRed(this);
					var r = t.mul(e),
						n = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
						o = r.isub(n).iushrn(this.shift),
						a = o;
					return o.cmp(this.m) >= 0 ? a = o.isub(this.m) : o.cmpn(0) < 0 && (a = o.iadd(this.m)),
						a._forceRed(this)
				}, k.prototype.invm = function(t) {
					return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this)
				}
			}(void 0 === t || t, this), t.exports
		}.call({})
	}
	var xb, Cb, Ib, Db, Pb = !1;

	function Ob(t) {
		var e, r = t.modulus.byteLength();
		do {
			e = new Ib(Db(r))
		} while (e.cmp(t.modulus) >= 0 || !e.umod(t.prime1) || !e.umod(t.prime2));
		return e
	}

	function Lb(t, e) {
		var r = function(t) {
				var e = Ob(t);
				return {
					blinder: e.toRed(Ib.mont(t.modulus)).redPow(new Ib(t.publicExponent)).fromRed(),
					unblinder: e.invm(t.modulus)
				}
			}(e),
			n = e.modulus.byteLength(),
			i = new Ib(t).mul(r.blinder).umod(e.modulus),
			o = i.toRed(Ib.mont(e.prime1)),
			a = i.toRed(Ib.mont(e.prime2)),
			s = e.coefficient,
			f = e.prime1,
			u = e.prime2,
			h = o.redPow(e.exponent1).fromRed(),
			c = a.redPow(e.exponent2).fromRed(),
			d = h.isub(c).imul(s).umod(f).imul(u);
		return c.iadd(d).imul(r.unblinder).umod(e.modulus).toArrayLike(Cb, "be", n)
	}

	function Ub() {
		xb = {}, Cb = Ve().Buffer, Tb || (Tb = !0, Rb()), Ib = Bb, Db = wr(), Lb.getr = Ob, xb = Lb
	}

	function jb() {
		return Pb || (Pb = !0, Ub()), xb
	}
	var Nb, zb = !1;

	function Fb() {
		return zb || (zb = !0, Nb = {}, Nb = JSON.parse(
			'{"name":"elliptic","version":"6.5.4","description":"EC cryptography","main":"lib/elliptic.js","files":["lib"],"scripts":{"lint":"eslint lib test","lint:fix":"npm run lint -- --fix","unit":"istanbul test _mocha --reporter=spec test/index.js","test":"npm run lint && npm run unit","version":"grunt dist && git add dist/"},"repository":{"type":"git","url":"git@github.com:indutny/elliptic"},"keywords":["EC","Elliptic","curve","Cryptography"],"author":"Fedor Indutny <fedor@indutny.com>","license":"MIT","bugs":{"url":"https://github.com/indutny/elliptic/issues"},"homepage":"https://github.com/indutny/elliptic","devDependencies":{"brfs":"^2.0.2","coveralls":"^3.1.0","eslint":"^7.6.0","grunt":"^1.2.1","grunt-browserify":"^5.3.0","grunt-cli":"^1.3.2","grunt-contrib-connect":"^3.0.0","grunt-contrib-copy":"^1.0.0","grunt-contrib-uglify":"^5.0.0","grunt-mocha-istanbul":"^5.0.2","grunt-saucelabs":"^9.0.1","istanbul":"^0.4.5","mocha":"^8.0.1"},"dependencies":{"bn.js":"^4.11.9","brorand":"^1.1.0","hash.js":"^1.0.0","hmac-drbg":"^1.0.1","inherits":"^2.0.4","minimalistic-assert":"^1.0.1","minimalistic-crypto-utils":"^1.0.1"}}'
			)), Nb
	}
	var qb, Hb, Wb = !1;

	function Gb(t, e) {
		if (Array.isArray(t)) return t.slice();
		if (!t) return [];
		var r = [];
		if ("string" != typeof t) {
			for (var n = 0; n < t.length; n++) r[n] = 0 | t[n];
			return r
		}
		if ("hex" === e) {
			(t = t.replace(/[^a-z0-9]+/gi, "")).length % 2 != 0 && (t = "0" + t);
			for (n = 0; n < t.length; n += 2) r.push(parseInt(t[n] + t[n + 1], 16))
		} else
			for (n = 0; n < t.length; n++) {
				var i = t.charCodeAt(n),
					o = i >> 8,
					a = 255 & i;
				o ? r.push(o, a) : r.push(a)
			}
		return r
	}

	function Yb(t) {
		return 1 === t.length ? "0" + t : t
	}

	function Kb(t) {
		for (var e = "", r = 0; r < t.length; r++) e += Yb(t[r].toString(16));
		return e
	}

	function Vb() {
		return Wb || (Wb = !0, (Hb = qb = {}).toArray = Gb, Hb.zero2 = Yb, Hb.toHex = Kb, Hb.encode = function(t, e) {
			return "hex" === e ? Kb(t) : t
		}), qb
	}
	var Zb, $b, Xb, Jb, Qb = !1;

	function tg(t, e, r) {
		var n = new Array(Math.max(t.bitLength(), r) + 1);
		n.fill(0);
		for (var i = 1 << e + 1, o = t.clone(), a = 0; a < n.length; a++) {
			var s, f = o.andln(i - 1);
			o.isOdd() ? (s = f > (i >> 1) - 1 ? (i >> 1) - f : f, o.isubn(s)) : s = 0, n[a] = s, o.iushrn(1)
		}
		return n
	}

	function eg(t, e) {
		var r = [
			[],
			[]
		];
		t = t.clone(), e = e.clone();
		for (var n, i = 0, o = 0; t.cmpn(-i) > 0 || e.cmpn(-o) > 0;) {
			var a, s, f = t.andln(3) + i & 3,
				u = e.andln(3) + o & 3;
			3 === f && (f = -1), 3 === u && (u = -1), a = 0 == (1 & f) ? 0 : 3 !== (n = t.andln(7) + i & 7) && 5 !==
				n || 2 !== u ? f : -f, r[0].push(a), s = 0 == (1 & u) ? 0 : 3 !== (n = e.andln(7) + o & 7) && 5 !== n ||
				2 !== f ? u : -u, r[1].push(s), 2 * i === a + 1 && (i = 1 - i), 2 * o === s + 1 && (o = 1 - o), t
				.iushrn(1), e.iushrn(1)
		}
		return r
	}

	function rg(t, e, r) {
		var n = "_" + e;
		t.prototype[e] = function() {
			return void 0 !== this[n] ? this[n] : this[n] = r.call(this)
		}
	}

	function ng(t) {
		return "string" == typeof t ? $b.toArray(t, "hex") : t
	}

	function ig(t) {
		return new Xb(t, "hex", "le")
	}

	function og() {
		return Qb || (Qb = !0, $b = Zb = {}, Xb = pm(), Jb = ec(), Vb(), $b.assert = Jb, $b.toArray = Vb().toArray, $b
			.zero2 = Vb().zero2, $b.toHex = Vb().toHex, $b.encode = Vb().encode, $b.getNAF = tg, $b.getJSF = eg, $b
			.cachedProperty = rg, $b.parseBytes = ng, $b.intFromLE = ig), Zb
	}
	var ag, sg, fg, ug, hg, cg = !1;

	function dg(t, e) {
		this.type = t, this.p = new sg(e.p, 16), this.red = e.prime ? sg.red(e.prime) : sg.mont(this.p), this.zero =
			new sg(0).toRed(this.red), this.one = new sg(1).toRed(this.red), this.two = new sg(2).toRed(this.red), this
			.n = e.n && new sg(e.n, 16), this.g = e.g && this.pointFromJSON(e.g, e.gRed), this._wnafT1 = new Array(4),
			this._wnafT2 = new Array(4), this._wnafT3 = new Array(4), this._wnafT4 = new Array(4), this._bitLength =
			this.n ? this.n.bitLength() : 0;
		var r = this.n && this.p.div(this.n);
		!r || r.cmpn(100) > 0 ? this.redN = null : (this._maxwellTrick = !0, this.redN = this.n.toRed(this.red))
	}

	function lg(t, e) {
		this.curve = t, this.type = e, this.precomputed = null
	}

	function pg() {
		return cg || (cg = !0, ag = {}, sg = pm(), og(), fg = og().getNAF, ug = og().getJSF, hg = og().assert, ag = dg,
			dg.prototype.point = function() {
				throw new Error("Not implemented")
			}, dg.prototype.validate = function() {
				throw new Error("Not implemented")
			}, dg.prototype._fixedNafMul = function(t, e) {
				hg(t.precomputed);
				var r = t._getDoubles(),
					n = fg(e, 1, this._bitLength),
					i = (1 << r.step + 1) - (r.step % 2 == 0 ? 2 : 1);
				i /= 3;
				var o, a, s = [];
				for (o = 0; o < n.length; o += r.step) {
					a = 0;
					for (var f = o + r.step - 1; f >= o; f--) a = (a << 1) + n[f];
					s.push(a)
				}
				for (var u = this.jpoint(null, null, null), h = this.jpoint(null, null, null), c = i; c > 0; c--) {
					for (o = 0; o < s.length; o++)(a = s[o]) === c ? h = h.mixedAdd(r.points[o]) : a === -c && (h =
						h.mixedAdd(r.points[o].neg()));
					u = u.add(h)
				}
				return u.toP()
			}, dg.prototype._wnafMul = function(t, e) {
				var r = 4,
					n = t._getNAFPoints(r);
				r = n.wnd;
				for (var i = n.points, o = fg(e, r, this._bitLength), a = this.jpoint(null, null, null), s = o
						.length - 1; s >= 0; s--) {
					for (var f = 0; s >= 0 && 0 === o[s]; s--) f++;
					if (s >= 0 && f++, a = a.dblp(f), s < 0) break;
					var u = o[s];
					hg(0 !== u), a = "affine" === t.type ? u > 0 ? a.mixedAdd(i[u - 1 >> 1]) : a.mixedAdd(i[-u -
						1 >> 1].neg()) : u > 0 ? a.add(i[u - 1 >> 1]) : a.add(i[-u - 1 >> 1].neg())
				}
				return "affine" === t.type ? a.toP() : a
			}, dg.prototype._wnafMulAdd = function(t, e, r, n, i) {
				var o, a, s, f = this._wnafT1,
					u = this._wnafT2,
					h = this._wnafT3,
					c = 0;
				for (o = 0; o < n; o++) {
					var d = (s = e[o])._getNAFPoints(t);
					f[o] = d.wnd, u[o] = d.points
				}
				for (o = n - 1; o >= 1; o -= 2) {
					var l = o - 1,
						p = o;
					if (1 === f[l] && 1 === f[p]) {
						var m = [e[l], null, null, e[p]];
						0 === e[l].y.cmp(e[p].y) ? (m[1] = e[l].add(e[p]), m[2] = e[l].toJ().mixedAdd(e[p].neg())) :
							0 === e[l].y.cmp(e[p].y.redNeg()) ? (m[1] = e[l].toJ().mixedAdd(e[p]), m[2] = e[l].add(
								e[p].neg())) : (m[1] = e[l].toJ().mixedAdd(e[p]), m[2] = e[l].toJ().mixedAdd(e[p]
								.neg()));
						var b = [-3, -1, -5, -7, 0, 7, 5, 1, 3],
							g = ug(r[l], r[p]);
						for (c = Math.max(g[0].length, c), h[l] = new Array(c), h[p] = new Array(c), a = 0; a <
							c; a++) {
							var v = 0 | g[0][a],
								y = 0 | g[1][a];
							h[l][a] = b[3 * (v + 1) + (y + 1)], h[p][a] = 0, u[l] = m
						}
					} else h[l] = fg(r[l], f[l], this._bitLength), h[p] = fg(r[p], f[p], this._bitLength), c = Math
						.max(h[l].length, c), c = Math.max(h[p].length, c)
				}
				var w = this.jpoint(null, null, null),
					_ = this._wnafT4;
				for (o = c; o >= 0; o--) {
					for (var A = 0; o >= 0;) {
						var M = !0;
						for (a = 0; a < n; a++) _[a] = 0 | h[a][o], 0 !== _[a] && (M = !1);
						if (!M) break;
						A++, o--
					}
					if (o >= 0 && A++, w = w.dblp(A), o < 0) break;
					for (a = 0; a < n; a++) {
						var E = _[a];
						0 !== E && (E > 0 ? s = u[a][E - 1 >> 1] : E < 0 && (s = u[a][-E - 1 >> 1].neg()), w =
							"affine" === s.type ? w.mixedAdd(s) : w.add(s))
					}
				}
				for (o = 0; o < n; o++) u[o] = null;
				return i ? w : w.toP()
			}, dg.BasePoint = lg, lg.prototype.eq = function() {
				throw new Error("Not implemented")
			}, lg.prototype.validate = function() {
				return this.curve.validate(this)
			}, dg.prototype.decodePoint = function(t, e) {
				t = og().toArray(t, e);
				var r = this.p.byteLength();
				if ((4 === t[0] || 6 === t[0] || 7 === t[0]) && t.length - 1 == 2 * r) return 6 === t[0] ? hg(t[t
					.length - 1] % 2 == 0) : 7 === t[0] && hg(t[t.length - 1] % 2 == 1), this.point(t.slice(
					1, 1 + r), t.slice(1 + r, 1 + 2 * r));
				if ((2 === t[0] || 3 === t[0]) && t.length - 1 === r) return this.pointFromX(t.slice(1, 1 + r),
					3 === t[0]);
				throw new Error("Unknown point format")
			}, lg.prototype.encodeCompressed = function(t) {
				return this.encode(t, !0)
			}, lg.prototype._encode = function(t) {
				var e = this.curve.p.byteLength(),
					r = this.getX().toArray("be", e);
				return t ? [this.getY().isEven() ? 2 : 3].concat(r) : [4].concat(r, this.getY().toArray("be", e))
			}, lg.prototype.encode = function(t, e) {
				return og().encode(this._encode(e), t)
			}, lg.prototype.precompute = function(t) {
				if (this.precomputed) return this;
				var e = {
					doubles: null,
					naf: null,
					beta: null
				};
				return e.naf = this._getNAFPoints(8), e.doubles = this._getDoubles(4, t), e.beta = this._getBeta(),
					this.precomputed = e, this
			}, lg.prototype._hasDoubles = function(t) {
				if (!this.precomputed) return !1;
				var e = this.precomputed.doubles;
				return !!e && e.points.length >= Math.ceil((t.bitLength() + 1) / e.step)
			}, lg.prototype._getDoubles = function(t, e) {
				if (this.precomputed && this.precomputed.doubles) return this.precomputed.doubles;
				for (var r = [this], n = this, i = 0; i < e; i += t) {
					for (var o = 0; o < t; o++) n = n.dbl();
					r.push(n)
				}
				return {
					step: t,
					points: r
				}
			}, lg.prototype._getNAFPoints = function(t) {
				if (this.precomputed && this.precomputed.naf) return this.precomputed.naf;
				for (var e = [this], r = (1 << t) - 1, n = 1 === r ? null : this.dbl(), i = 1; i < r; i++) e[i] = e[
					i - 1].add(n);
				return {
					wnd: t,
					points: e
				}
			}, lg.prototype._getBeta = function() {
				return null
			}, lg.prototype.dblp = function(t) {
				for (var e = this, r = 0; r < t; r++) e = e.dbl();
				return e
			}), ag
	}
	var mg, bg, gg, vg, yg, wg = !1;

	function _g(t) {
		vg.call(this, "short", t), this.a = new bg(t.a, 16).toRed(this.red), this.b = new bg(t.b, 16).toRed(this.red),
			this.tinv = this.two.redInvm(), this.zeroA = 0 === this.a.fromRed().cmpn(0), this.threeA = 0 === this.a
			.fromRed().sub(this.p).cmpn(-3), this.endo = this._getEndomorphism(t), this._endoWnafT1 = new Array(4), this
			._endoWnafT2 = new Array(4)
	}

	function Ag(t, e, r, n) {
		vg.BasePoint.call(this, t, "affine"), null === e && null === r ? (this.x = null, this.y = null, this.inf = !0) :
			(this.x = new bg(e, 16), this.y = new bg(r, 16), n && (this.x.forceRed(this.curve.red), this.y.forceRed(this
				.curve.red)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y
				.toRed(this.curve.red)), this.inf = !1)
	}

	function Mg(t, e, r, n) {
		vg.BasePoint.call(this, t, "jacobian"), null === e && null === r && null === n ? (this.x = this.curve.one, this
				.y = this.curve.one, this.z = new bg(0)) : (this.x = new bg(e, 16), this.y = new bg(r, 16), this.z =
				new bg(n, 16)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y
				.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.zOne = this.z ===
			this.curve.one
	}

	function Eg() {
		return wg || (wg = !0, mg = {}, og(), bg = pm(), gg = Mr(), vg = pg(), yg = og().assert, gg(_g, vg), mg = _g, _g
			.prototype._getEndomorphism = function(t) {
				if (this.zeroA && this.g && this.n && 1 === this.p.modn(3)) {
					var e, r;
					if (t.beta) e = new bg(t.beta, 16).toRed(this.red);
					else {
						var n = this._getEndoRoots(this.p);
						e = (e = n[0].cmp(n[1]) < 0 ? n[0] : n[1]).toRed(this.red)
					}
					if (t.lambda) r = new bg(t.lambda, 16);
					else {
						var i = this._getEndoRoots(this.n);
						0 === this.g.mul(i[0]).x.cmp(this.g.x.redMul(e)) ? r = i[0] : (r = i[1], yg(0 === this.g
							.mul(r).x.cmp(this.g.x.redMul(e))))
					}
					return {
						beta: e,
						lambda: r,
						basis: t.basis ? t.basis.map((function(t) {
							return {
								a: new bg(t.a, 16),
								b: new bg(t.b, 16)
							}
						})) : this._getEndoBasis(r)
					}
				}
			}, _g.prototype._getEndoRoots = function(t) {
				var e = t === this.p ? this.red : bg.mont(t),
					r = new bg(2).toRed(e).redInvm(),
					n = r.redNeg(),
					i = new bg(3).toRed(e).redNeg().redSqrt().redMul(r);
				return [n.redAdd(i).fromRed(), n.redSub(i).fromRed()]
			}, _g.prototype._getEndoBasis = function(t) {
				for (var e, r, n, i, o, a, s, f, u, h = this.n.ushrn(Math.floor(this.n.bitLength() / 2)), c = t, d =
						this.n.clone(), l = new bg(1), p = new bg(0), m = new bg(0), b = new bg(1), g = 0; 0 !== c
					.cmpn(0);) {
					var v = d.div(c);
					f = d.sub(v.mul(c)), u = m.sub(v.mul(l));
					var y = b.sub(v.mul(p));
					if (!n && f.cmp(h) < 0) e = s.neg(), r = l, n = f.neg(), i = u;
					else if (n && 2 == ++g) break;
					s = f, d = c, c = f, m = l, l = u, b = p, p = y
				}
				o = f.neg(), a = u;
				var w = n.sqr().add(i.sqr());
				return o.sqr().add(a.sqr()).cmp(w) >= 0 && (o = e, a = r), n.negative && (n = n.neg(), i = i.neg()),
					o.negative && (o = o.neg(), a = a.neg()), [{
						a: n,
						b: i
					}, {
						a: o,
						b: a
					}]
			}, _g.prototype._endoSplit = function(t) {
				var e = this.endo.basis,
					r = e[0],
					n = e[1],
					i = n.b.mul(t).divRound(this.n),
					o = r.b.neg().mul(t).divRound(this.n),
					a = i.mul(r.a),
					s = o.mul(n.a),
					f = i.mul(r.b),
					u = o.mul(n.b);
				return {
					k1: t.sub(a).sub(s),
					k2: f.add(u).neg()
				}
			}, _g.prototype.pointFromX = function(t, e) {
				(t = new bg(t, 16)).red || (t = t.toRed(this.red));
				var r = t.redSqr().redMul(t).redIAdd(t.redMul(this.a)).redIAdd(this.b),
					n = r.redSqrt();
				if (0 !== n.redSqr().redSub(r).cmp(this.zero)) throw new Error("invalid point");
				var i = n.fromRed().isOdd();
				return (e && !i || !e && i) && (n = n.redNeg()), this.point(t, n)
			}, _g.prototype.validate = function(t) {
				if (t.inf) return !0;
				var e = t.x,
					r = t.y,
					n = this.a.redMul(e),
					i = e.redSqr().redMul(e).redIAdd(n).redIAdd(this.b);
				return 0 === r.redSqr().redISub(i).cmpn(0)
			}, _g.prototype._endoWnafMulAdd = function(t, e, r) {
				for (var n = this._endoWnafT1, i = this._endoWnafT2, o = 0; o < t.length; o++) {
					var a = this._endoSplit(e[o]),
						s = t[o],
						f = s._getBeta();
					a.k1.negative && (a.k1.ineg(), s = s.neg(!0)), a.k2.negative && (a.k2.ineg(), f = f.neg(!0)), n[
						2 * o] = s, n[2 * o + 1] = f, i[2 * o] = a.k1, i[2 * o + 1] = a.k2
				}
				for (var u = this._wnafMulAdd(1, n, i, 2 * o, r), h = 0; h < 2 * o; h++) n[h] = null, i[h] = null;
				return u
			}, gg(Ag, vg.BasePoint), _g.prototype.point = function(t, e, r) {
				return new Ag(this, t, e, r)
			}, _g.prototype.pointFromJSON = function(t, e) {
				return Ag.fromJSON(this, t, e)
			}, Ag.prototype._getBeta = function() {
				if (this.curve.endo) {
					var t = this.precomputed;
					if (t && t.beta) return t.beta;
					var e = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
					if (t) {
						var r = this.curve,
							n = function(t) {
								return r.point(t.x.redMul(r.endo.beta), t.y)
							};
						t.beta = e, e.precomputed = {
							beta: null,
							naf: t.naf && {
								wnd: t.naf.wnd,
								points: t.naf.points.map(n)
							},
							doubles: t.doubles && {
								step: t.doubles.step,
								points: t.doubles.points.map(n)
							}
						}
					}
					return e
				}
			}, Ag.prototype.toJSON = function() {
				return this.precomputed ? [this.x, this.y, this.precomputed && {
					doubles: this.precomputed.doubles && {
						step: this.precomputed.doubles.step,
						points: this.precomputed.doubles.points.slice(1)
					},
					naf: this.precomputed.naf && {
						wnd: this.precomputed.naf.wnd,
						points: this.precomputed.naf.points.slice(1)
					}
				}] : [this.x, this.y]
			}, Ag.fromJSON = function(t, e, r) {
				"string" == typeof e && (e = JSON.parse(e));
				var n = t.point(e[0], e[1], r);
				if (!e[2]) return n;

				function i(e) {
					return t.point(e[0], e[1], r)
				}
				var o = e[2];
				return n.precomputed = {
					beta: null,
					doubles: o.doubles && {
						step: o.doubles.step,
						points: [n].concat(o.doubles.points.map(i))
					},
					naf: o.naf && {
						wnd: o.naf.wnd,
						points: [n].concat(o.naf.points.map(i))
					}
				}, n
			}, Ag.prototype.inspect = function() {
				return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16,
					2) + " y: " + this.y.fromRed().toString(16, 2) + ">"
			}, Ag.prototype.isInfinity = function() {
				return this.inf
			}, Ag.prototype.add = function(t) {
				if (this.inf) return t;
				if (t.inf) return this;
				if (this.eq(t)) return this.dbl();
				if (this.neg().eq(t)) return this.curve.point(null, null);
				if (0 === this.x.cmp(t.x)) return this.curve.point(null, null);
				var e = this.y.redSub(t.y);
				0 !== e.cmpn(0) && (e = e.redMul(this.x.redSub(t.x).redInvm()));
				var r = e.redSqr().redISub(this.x).redISub(t.x),
					n = e.redMul(this.x.redSub(r)).redISub(this.y);
				return this.curve.point(r, n)
			}, Ag.prototype.dbl = function() {
				if (this.inf) return this;
				var t = this.y.redAdd(this.y);
				if (0 === t.cmpn(0)) return this.curve.point(null, null);
				var e = this.curve.a,
					r = this.x.redSqr(),
					n = t.redInvm(),
					i = r.redAdd(r).redIAdd(r).redIAdd(e).redMul(n),
					o = i.redSqr().redISub(this.x.redAdd(this.x)),
					a = i.redMul(this.x.redSub(o)).redISub(this.y);
				return this.curve.point(o, a)
			}, Ag.prototype.getX = function() {
				return this.x.fromRed()
			}, Ag.prototype.getY = function() {
				return this.y.fromRed()
			}, Ag.prototype.mul = function(t) {
				return t = new bg(t, 16), this.isInfinity() ? this : this._hasDoubles(t) ? this.curve._fixedNafMul(
					this, t) : this.curve.endo ? this.curve._endoWnafMulAdd([this], [t]) : this.curve._wnafMul(
					this, t)
			}, Ag.prototype.mulAdd = function(t, e, r) {
				var n = [this, e],
					i = [t, r];
				return this.curve.endo ? this.curve._endoWnafMulAdd(n, i) : this.curve._wnafMulAdd(1, n, i, 2)
			}, Ag.prototype.jmulAdd = function(t, e, r) {
				var n = [this, e],
					i = [t, r];
				return this.curve.endo ? this.curve._endoWnafMulAdd(n, i, !0) : this.curve._wnafMulAdd(1, n, i, 2, !
					0)
			}, Ag.prototype.eq = function(t) {
				return this === t || this.inf === t.inf && (this.inf || 0 === this.x.cmp(t.x) && 0 === this.y.cmp(t
					.y))
			}, Ag.prototype.neg = function(t) {
				if (this.inf) return this;
				var e = this.curve.point(this.x, this.y.redNeg());
				if (t && this.precomputed) {
					var r = this.precomputed,
						n = function(t) {
							return t.neg()
						};
					e.precomputed = {
						naf: r.naf && {
							wnd: r.naf.wnd,
							points: r.naf.points.map(n)
						},
						doubles: r.doubles && {
							step: r.doubles.step,
							points: r.doubles.points.map(n)
						}
					}
				}
				return e
			}, Ag.prototype.toJ = function() {
				return this.inf ? this.curve.jpoint(null, null, null) : this.curve.jpoint(this.x, this.y, this.curve
					.one)
			}, gg(Mg, vg.BasePoint), _g.prototype.jpoint = function(t, e, r) {
				return new Mg(this, t, e, r)
			}, Mg.prototype.toP = function() {
				if (this.isInfinity()) return this.curve.point(null, null);
				var t = this.z.redInvm(),
					e = t.redSqr(),
					r = this.x.redMul(e),
					n = this.y.redMul(e).redMul(t);
				return this.curve.point(r, n)
			}, Mg.prototype.neg = function() {
				return this.curve.jpoint(this.x, this.y.redNeg(), this.z)
			}, Mg.prototype.add = function(t) {
				if (this.isInfinity()) return t;
				if (t.isInfinity()) return this;
				var e = t.z.redSqr(),
					r = this.z.redSqr(),
					n = this.x.redMul(e),
					i = t.x.redMul(r),
					o = this.y.redMul(e.redMul(t.z)),
					a = t.y.redMul(r.redMul(this.z)),
					s = n.redSub(i),
					f = o.redSub(a);
				if (0 === s.cmpn(0)) return 0 !== f.cmpn(0) ? this.curve.jpoint(null, null, null) : this.dbl();
				var u = s.redSqr(),
					h = u.redMul(s),
					c = n.redMul(u),
					d = f.redSqr().redIAdd(h).redISub(c).redISub(c),
					l = f.redMul(c.redISub(d)).redISub(o.redMul(h)),
					p = this.z.redMul(t.z).redMul(s);
				return this.curve.jpoint(d, l, p)
			}, Mg.prototype.mixedAdd = function(t) {
				if (this.isInfinity()) return t.toJ();
				if (t.isInfinity()) return this;
				var e = this.z.redSqr(),
					r = this.x,
					n = t.x.redMul(e),
					i = this.y,
					o = t.y.redMul(e).redMul(this.z),
					a = r.redSub(n),
					s = i.redSub(o);
				if (0 === a.cmpn(0)) return 0 !== s.cmpn(0) ? this.curve.jpoint(null, null, null) : this.dbl();
				var f = a.redSqr(),
					u = f.redMul(a),
					h = r.redMul(f),
					c = s.redSqr().redIAdd(u).redISub(h).redISub(h),
					d = s.redMul(h.redISub(c)).redISub(i.redMul(u)),
					l = this.z.redMul(a);
				return this.curve.jpoint(c, d, l)
			}, Mg.prototype.dblp = function(t) {
				if (0 === t) return this;
				if (this.isInfinity()) return this;
				if (!t) return this.dbl();
				var e;
				if (this.curve.zeroA || this.curve.threeA) {
					var r = this;
					for (e = 0; e < t; e++) r = r.dbl();
					return r
				}
				var n = this.curve.a,
					i = this.curve.tinv,
					o = this.x,
					a = this.y,
					s = this.z,
					f = s.redSqr().redSqr(),
					u = a.redAdd(a);
				for (e = 0; e < t; e++) {
					var h = o.redSqr(),
						c = u.redSqr(),
						d = c.redSqr(),
						l = h.redAdd(h).redIAdd(h).redIAdd(n.redMul(f)),
						p = o.redMul(c),
						m = l.redSqr().redISub(p.redAdd(p)),
						b = p.redISub(m),
						g = l.redMul(b);
					g = g.redIAdd(g).redISub(d);
					var v = u.redMul(s);
					e + 1 < t && (f = f.redMul(d)), o = m, s = v, u = g
				}
				return this.curve.jpoint(o, u.redMul(i), s)
			}, Mg.prototype.dbl = function() {
				return this.isInfinity() ? this : this.curve.zeroA ? this._zeroDbl() : this.curve.threeA ? this
					._threeDbl() : this._dbl()
			}, Mg.prototype._zeroDbl = function() {
				var t, e, r;
				if (this.zOne) {
					var n = this.x.redSqr(),
						i = this.y.redSqr(),
						o = i.redSqr(),
						a = this.x.redAdd(i).redSqr().redISub(n).redISub(o);
					a = a.redIAdd(a);
					var s = n.redAdd(n).redIAdd(n),
						f = s.redSqr().redISub(a).redISub(a),
						u = o.redIAdd(o);
					u = (u = u.redIAdd(u)).redIAdd(u), t = f, e = s.redMul(a.redISub(f)).redISub(u), r = this.y
						.redAdd(this.y)
				} else {
					var h = this.x.redSqr(),
						c = this.y.redSqr(),
						d = c.redSqr(),
						l = this.x.redAdd(c).redSqr().redISub(h).redISub(d);
					l = l.redIAdd(l);
					var p = h.redAdd(h).redIAdd(h),
						m = p.redSqr(),
						b = d.redIAdd(d);
					b = (b = b.redIAdd(b)).redIAdd(b), t = m.redISub(l).redISub(l), e = p.redMul(l.redISub(t))
						.redISub(b), r = (r = this.y.redMul(this.z)).redIAdd(r)
				}
				return this.curve.jpoint(t, e, r)
			}, Mg.prototype._threeDbl = function() {
				var t, e, r;
				if (this.zOne) {
					var n = this.x.redSqr(),
						i = this.y.redSqr(),
						o = i.redSqr(),
						a = this.x.redAdd(i).redSqr().redISub(n).redISub(o);
					a = a.redIAdd(a);
					var s = n.redAdd(n).redIAdd(n).redIAdd(this.curve.a),
						f = s.redSqr().redISub(a).redISub(a);
					t = f;
					var u = o.redIAdd(o);
					u = (u = u.redIAdd(u)).redIAdd(u), e = s.redMul(a.redISub(f)).redISub(u), r = this.y.redAdd(this
						.y)
				} else {
					var h = this.z.redSqr(),
						c = this.y.redSqr(),
						d = this.x.redMul(c),
						l = this.x.redSub(h).redMul(this.x.redAdd(h));
					l = l.redAdd(l).redIAdd(l);
					var p = d.redIAdd(d),
						m = (p = p.redIAdd(p)).redAdd(p);
					t = l.redSqr().redISub(m), r = this.y.redAdd(this.z).redSqr().redISub(c).redISub(h);
					var b = c.redSqr();
					b = (b = (b = b.redIAdd(b)).redIAdd(b)).redIAdd(b), e = l.redMul(p.redISub(t)).redISub(b)
				}
				return this.curve.jpoint(t, e, r)
			}, Mg.prototype._dbl = function() {
				var t = this.curve.a,
					e = this.x,
					r = this.y,
					n = this.z,
					i = n.redSqr().redSqr(),
					o = e.redSqr(),
					a = r.redSqr(),
					s = o.redAdd(o).redIAdd(o).redIAdd(t.redMul(i)),
					f = e.redAdd(e),
					u = (f = f.redIAdd(f)).redMul(a),
					h = s.redSqr().redISub(u.redAdd(u)),
					c = u.redISub(h),
					d = a.redSqr();
				d = (d = (d = d.redIAdd(d)).redIAdd(d)).redIAdd(d);
				var l = s.redMul(c).redISub(d),
					p = r.redAdd(r).redMul(n);
				return this.curve.jpoint(h, l, p)
			}, Mg.prototype.trpl = function() {
				if (!this.curve.zeroA) return this.dbl().add(this);
				var t = this.x.redSqr(),
					e = this.y.redSqr(),
					r = this.z.redSqr(),
					n = e.redSqr(),
					i = t.redAdd(t).redIAdd(t),
					o = i.redSqr(),
					a = this.x.redAdd(e).redSqr().redISub(t).redISub(n),
					s = (a = (a = (a = a.redIAdd(a)).redAdd(a).redIAdd(a)).redISub(o)).redSqr(),
					f = n.redIAdd(n);
				f = (f = (f = f.redIAdd(f)).redIAdd(f)).redIAdd(f);
				var u = i.redIAdd(a).redSqr().redISub(o).redISub(s).redISub(f),
					h = e.redMul(u);
				h = (h = h.redIAdd(h)).redIAdd(h);
				var c = this.x.redMul(s).redISub(h);
				c = (c = c.redIAdd(c)).redIAdd(c);
				var d = this.y.redMul(u.redMul(f.redISub(u)).redISub(a.redMul(s)));
				d = (d = (d = d.redIAdd(d)).redIAdd(d)).redIAdd(d);
				var l = this.z.redAdd(a).redSqr().redISub(r).redISub(s);
				return this.curve.jpoint(c, d, l)
			}, Mg.prototype.mul = function(t, e) {
				return t = new bg(t, e), this.curve._wnafMul(this, t)
			}, Mg.prototype.eq = function(t) {
				if ("affine" === t.type) return this.eq(t.toJ());
				if (this === t) return !0;
				var e = this.z.redSqr(),
					r = t.z.redSqr();
				if (0 !== this.x.redMul(r).redISub(t.x.redMul(e)).cmpn(0)) return !1;
				var n = e.redMul(this.z),
					i = r.redMul(t.z);
				return 0 === this.y.redMul(i).redISub(t.y.redMul(n)).cmpn(0)
			}, Mg.prototype.eqXToP = function(t) {
				var e = this.z.redSqr(),
					r = t.toRed(this.curve.red).redMul(e);
				if (0 === this.x.cmp(r)) return !0;
				for (var n = t.clone(), i = this.curve.redN.redMul(e);;) {
					if (n.iadd(this.curve.n), n.cmp(this.curve.p) >= 0) return !1;
					if (r.redIAdd(i), 0 === this.x.cmp(r)) return !0
				}
			}, Mg.prototype.inspect = function() {
				return this.isInfinity() ? "<EC JPoint Infinity>" : "<EC JPoint x: " + this.x.toString(16, 2) +
					" y: " + this.y.toString(16, 2) + " z: " + this.z.toString(16, 2) + ">"
			}, Mg.prototype.isInfinity = function() {
				return 0 === this.z.cmpn(0)
			}), mg
	}
	var Sg, kg, Bg, Tg, Rg = !1;

	function xg(t) {
		Tg.call(this, "mont", t), this.a = new kg(t.a, 16).toRed(this.red), this.b = new kg(t.b, 16).toRed(this.red),
			this.i4 = new kg(4).toRed(this.red).redInvm(), this.two = new kg(2).toRed(this.red), this.a24 = this.i4
			.redMul(this.a.redAdd(this.two))
	}

	function Cg(t, e, r) {
		Tg.BasePoint.call(this, t, "projective"), null === e && null === r ? (this.x = this.curve.one, this.z = this
			.curve.zero) : (this.x = new kg(e, 16), this.z = new kg(r, 16), this.x.red || (this.x = this.x.toRed(
			this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)))
	}

	function Ig() {
		return Rg || (Rg = !0, Sg = {}, kg = pm(), Bg = Mr(), Tg = pg(), og(), Bg(xg, Tg), Sg = xg, xg.prototype
			.validate = function(t) {
				var e = t.normalize().x,
					r = e.redSqr(),
					n = r.redMul(e).redAdd(r.redMul(this.a)).redAdd(e);
				return 0 === n.redSqrt().redSqr().cmp(n)
			}, Bg(Cg, Tg.BasePoint), xg.prototype.decodePoint = function(t, e) {
				return this.point(og().toArray(t, e), 1)
			}, xg.prototype.point = function(t, e) {
				return new Cg(this, t, e)
			}, xg.prototype.pointFromJSON = function(t) {
				return Cg.fromJSON(this, t)
			}, Cg.prototype.precompute = function() {}, Cg.prototype._encode = function() {
				return this.getX().toArray("be", this.curve.p.byteLength())
			}, Cg.fromJSON = function(t, e) {
				return new Cg(t, e[0], e[1] || t.one)
			}, Cg.prototype.inspect = function() {
				return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16,
					2) + " z: " + this.z.fromRed().toString(16, 2) + ">"
			}, Cg.prototype.isInfinity = function() {
				return 0 === this.z.cmpn(0)
			}, Cg.prototype.dbl = function() {
				var t = this.x.redAdd(this.z).redSqr(),
					e = this.x.redSub(this.z).redSqr(),
					r = t.redSub(e),
					n = t.redMul(e),
					i = r.redMul(e.redAdd(this.curve.a24.redMul(r)));
				return this.curve.point(n, i)
			}, Cg.prototype.add = function() {
				throw new Error("Not supported on Montgomery curve")
			}, Cg.prototype.diffAdd = function(t, e) {
				var r = this.x.redAdd(this.z),
					n = this.x.redSub(this.z),
					i = t.x.redAdd(t.z),
					o = t.x.redSub(t.z).redMul(r),
					a = i.redMul(n),
					s = e.z.redMul(o.redAdd(a).redSqr()),
					f = e.x.redMul(o.redISub(a).redSqr());
				return this.curve.point(s, f)
			}, Cg.prototype.mul = function(t) {
				for (var e = t.clone(), r = this, n = this.curve.point(null, null), i = []; 0 !== e.cmpn(0); e
					.iushrn(1)) i.push(e.andln(1));
				for (var o = i.length - 1; o >= 0; o--) 0 === i[o] ? (r = r.diffAdd(n, this), n = n.dbl()) : (n = r
					.diffAdd(n, this), r = r.dbl());
				return n
			}, Cg.prototype.mulAdd = function() {
				throw new Error("Not supported on Montgomery curve")
			}, Cg.prototype.jumlAdd = function() {
				throw new Error("Not supported on Montgomery curve")
			}, Cg.prototype.eq = function(t) {
				return 0 === this.getX().cmp(t.getX())
			}, Cg.prototype.normalize = function() {
				return this.x = this.x.redMul(this.z.redInvm()), this.z = this.curve.one, this
			}, Cg.prototype.getX = function() {
				return this.normalize(), this.x.fromRed()
			}), Sg
	}
	var Dg, Pg, Og, Lg, Ug, jg = !1;

	function Ng(t) {
		this.twisted = 1 != (0 | t.a), this.mOneA = this.twisted && -1 == (0 | t.a), this.extended = this.mOneA, Lg
			.call(this, "edwards", t), this.a = new Pg(t.a, 16).umod(this.red.m), this.a = this.a.toRed(this.red), this
			.c = new Pg(t.c, 16).toRed(this.red), this.c2 = this.c.redSqr(), this.d = new Pg(t.d, 16).toRed(this.red),
			this.dd = this.d.redAdd(this.d), Ug(!this.twisted || 0 === this.c.fromRed().cmpn(1)), this.oneC = 1 == (0 |
				t.c)
	}

	function zg(t, e, r, n, i) {
		Lg.BasePoint.call(this, t, "projective"), null === e && null === r && null === n ? (this.x = this.curve.zero,
			this.y = this.curve.one, this.z = this.curve.one, this.t = this.curve.zero, this.zOne = !0) : (this.x =
			new Pg(e, 16), this.y = new Pg(r, 16), this.z = n ? new Pg(n, 16) : this.curve.one, this.t = i &&
			new Pg(i, 16), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y
				.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.t && !this.t
			.red && (this.t = this.t.toRed(this.curve.red)), this.zOne = this.z === this.curve.one, this.curve
			.extended && !this.t && (this.t = this.x.redMul(this.y), this.zOne || (this.t = this.t.redMul(this.z
				.redInvm()))))
	}

	function Fg() {
		return jg || (jg = !0, Dg = {}, og(), Pg = pm(), Og = Mr(), Lg = pg(), Ug = og().assert, Og(Ng, Lg), Dg = Ng, Ng
			.prototype._mulA = function(t) {
				return this.mOneA ? t.redNeg() : this.a.redMul(t)
			}, Ng.prototype._mulC = function(t) {
				return this.oneC ? t : this.c.redMul(t)
			}, Ng.prototype.jpoint = function(t, e, r, n) {
				return this.point(t, e, r, n)
			}, Ng.prototype.pointFromX = function(t, e) {
				(t = new Pg(t, 16)).red || (t = t.toRed(this.red));
				var r = t.redSqr(),
					n = this.c2.redSub(this.a.redMul(r)),
					i = this.one.redSub(this.c2.redMul(this.d).redMul(r)),
					o = n.redMul(i.redInvm()),
					a = o.redSqrt();
				if (0 !== a.redSqr().redSub(o).cmp(this.zero)) throw new Error("invalid point");
				var s = a.fromRed().isOdd();
				return (e && !s || !e && s) && (a = a.redNeg()), this.point(t, a)
			}, Ng.prototype.pointFromY = function(t, e) {
				(t = new Pg(t, 16)).red || (t = t.toRed(this.red));
				var r = t.redSqr(),
					n = r.redSub(this.c2),
					i = r.redMul(this.d).redMul(this.c2).redSub(this.a),
					o = n.redMul(i.redInvm());
				if (0 === o.cmp(this.zero)) {
					if (e) throw new Error("invalid point");
					return this.point(this.zero, t)
				}
				var a = o.redSqrt();
				if (0 !== a.redSqr().redSub(o).cmp(this.zero)) throw new Error("invalid point");
				return a.fromRed().isOdd() !== e && (a = a.redNeg()), this.point(a, t)
			}, Ng.prototype.validate = function(t) {
				if (t.isInfinity()) return !0;
				t.normalize();
				var e = t.x.redSqr(),
					r = t.y.redSqr(),
					n = e.redMul(this.a).redAdd(r),
					i = this.c2.redMul(this.one.redAdd(this.d.redMul(e).redMul(r)));
				return 0 === n.cmp(i)
			}, Og(zg, Lg.BasePoint), Ng.prototype.pointFromJSON = function(t) {
				return zg.fromJSON(this, t)
			}, Ng.prototype.point = function(t, e, r, n) {
				return new zg(this, t, e, r, n)
			}, zg.fromJSON = function(t, e) {
				return new zg(t, e[0], e[1], e[2])
			}, zg.prototype.inspect = function() {
				return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16,
						2) + " y: " + this.y.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) +
					">"
			}, zg.prototype.isInfinity = function() {
				return 0 === this.x.cmpn(0) && (0 === this.y.cmp(this.z) || this.zOne && 0 === this.y.cmp(this.curve
					.c))
			}, zg.prototype._extDbl = function() {
				var t = this.x.redSqr(),
					e = this.y.redSqr(),
					r = this.z.redSqr();
				r = r.redIAdd(r);
				var n = this.curve._mulA(t),
					i = this.x.redAdd(this.y).redSqr().redISub(t).redISub(e),
					o = n.redAdd(e),
					a = o.redSub(r),
					s = n.redSub(e),
					f = i.redMul(a),
					u = o.redMul(s),
					h = i.redMul(s),
					c = a.redMul(o);
				return this.curve.point(f, u, c, h)
			}, zg.prototype._projDbl = function() {
				var t, e, r, n, i, o, a = this.x.redAdd(this.y).redSqr(),
					s = this.x.redSqr(),
					f = this.y.redSqr();
				if (this.curve.twisted) {
					var u = (n = this.curve._mulA(s)).redAdd(f);
					this.zOne ? (t = a.redSub(s).redSub(f).redMul(u.redSub(this.curve.two)), e = u.redMul(n.redSub(
						f)), r = u.redSqr().redSub(u).redSub(u)) : (i = this.z.redSqr(), o = u.redSub(i)
						.redISub(i), t = a.redSub(s).redISub(f).redMul(o), e = u.redMul(n.redSub(f)), r = u
						.redMul(o))
				} else n = s.redAdd(f), i = this.curve._mulC(this.z).redSqr(), o = n.redSub(i).redSub(i), t = this
					.curve._mulC(a.redISub(n)).redMul(o), e = this.curve._mulC(n).redMul(s.redISub(f)), r = n
					.redMul(o);
				return this.curve.point(t, e, r)
			}, zg.prototype.dbl = function() {
				return this.isInfinity() ? this : this.curve.extended ? this._extDbl() : this._projDbl()
			}, zg.prototype._extAdd = function(t) {
				var e = this.y.redSub(this.x).redMul(t.y.redSub(t.x)),
					r = this.y.redAdd(this.x).redMul(t.y.redAdd(t.x)),
					n = this.t.redMul(this.curve.dd).redMul(t.t),
					i = this.z.redMul(t.z.redAdd(t.z)),
					o = r.redSub(e),
					a = i.redSub(n),
					s = i.redAdd(n),
					f = r.redAdd(e),
					u = o.redMul(a),
					h = s.redMul(f),
					c = o.redMul(f),
					d = a.redMul(s);
				return this.curve.point(u, h, d, c)
			}, zg.prototype._projAdd = function(t) {
				var e, r, n = this.z.redMul(t.z),
					i = n.redSqr(),
					o = this.x.redMul(t.x),
					a = this.y.redMul(t.y),
					s = this.curve.d.redMul(o).redMul(a),
					f = i.redSub(s),
					u = i.redAdd(s),
					h = this.x.redAdd(this.y).redMul(t.x.redAdd(t.y)).redISub(o).redISub(a),
					c = n.redMul(f).redMul(h);
				return this.curve.twisted ? (e = n.redMul(u).redMul(a.redSub(this.curve._mulA(o))), r = f.redMul(
					u)) : (e = n.redMul(u).redMul(a.redSub(o)), r = this.curve._mulC(f).redMul(u)), this.curve
					.point(c, e, r)
			}, zg.prototype.add = function(t) {
				return this.isInfinity() ? t : t.isInfinity() ? this : this.curve.extended ? this._extAdd(t) : this
					._projAdd(t)
			}, zg.prototype.mul = function(t) {
				return this._hasDoubles(t) ? this.curve._fixedNafMul(this, t) : this.curve._wnafMul(this, t)
			}, zg.prototype.mulAdd = function(t, e, r) {
				return this.curve._wnafMulAdd(1, [this, e], [t, r], 2, !1)
			}, zg.prototype.jmulAdd = function(t, e, r) {
				return this.curve._wnafMulAdd(1, [this, e], [t, r], 2, !0)
			}, zg.prototype.normalize = function() {
				if (this.zOne) return this;
				var t = this.z.redInvm();
				return this.x = this.x.redMul(t), this.y = this.y.redMul(t), this.t && (this.t = this.t.redMul(t)),
					this.z = this.curve.one, this.zOne = !0, this
			}, zg.prototype.neg = function() {
				return this.curve.point(this.x.redNeg(), this.y, this.z, this.t && this.t.redNeg())
			}, zg.prototype.getX = function() {
				return this.normalize(), this.x.fromRed()
			}, zg.prototype.getY = function() {
				return this.normalize(), this.y.fromRed()
			}, zg.prototype.eq = function(t) {
				return this === t || 0 === this.getX().cmp(t.getX()) && 0 === this.getY().cmp(t.getY())
			}, zg.prototype.eqXToP = function(t) {
				var e = t.toRed(this.curve.red).redMul(this.z);
				if (0 === this.x.cmp(e)) return !0;
				for (var r = t.clone(), n = this.curve.redN.redMul(this.z);;) {
					if (r.iadd(this.curve.n), r.cmp(this.curve.p) >= 0) return !1;
					if (e.redIAdd(n), 0 === this.x.cmp(e)) return !0
				}
			}, zg.prototype.toP = zg.prototype.normalize, zg.prototype.mixedAdd = zg.prototype.add), Dg
	}
	var qg, Hg, Wg = !1;

	function Gg() {
		return Wg || (Wg = !0, (Hg = qg = {}).base = pg(), Hg.short = Eg(), Hg.mont = Ig(), Hg.edwards = Fg()), qg
	}
	var Yg, Kg, Vg, Zg, $g, Xg, Jg, Qg, tv, ev, rv, nv, iv, ov, av, sv, fv, uv, hv, cv, dv, lv, pv, mv, bv, gv, vv, yv,
		wv, _v = !1;

	function Av(t, e) {
		return 55296 == (64512 & t.charCodeAt(e)) && (!(e < 0 || e + 1 >= t.length) && 56320 == (64512 & t.charCodeAt(
			e + 1)))
	}

	function Mv(t, e) {
		if (Array.isArray(t)) return t.slice();
		if (!t) return [];
		var r = [];
		if ("string" == typeof t)
			if (e) {
				if ("hex" === e)
					for ((t = t.replace(/[^a-z0-9]+/gi, "")).length % 2 != 0 && (t = "0" + t), i = 0; i < t.length; i +=
						2) r.push(parseInt(t[i] + t[i + 1], 16))
			} else
				for (var n = 0, i = 0; i < t.length; i++) {
					var o = t.charCodeAt(i);
					o < 128 ? r[n++] = o : o < 2048 ? (r[n++] = o >> 6 | 192, r[n++] = 63 & o | 128) : Av(t, i) ? (o =
						65536 + ((1023 & o) << 10) + (1023 & t.charCodeAt(++i)), r[n++] = o >> 18 | 240, r[n++] =
						o >> 12 & 63 | 128, r[n++] = o >> 6 & 63 | 128, r[n++] = 63 & o | 128) : (r[n++] = o >> 12 |
						224, r[n++] = o >> 6 & 63 | 128, r[n++] = 63 & o | 128)
				} else
					for (i = 0; i < t.length; i++) r[i] = 0 | t[i];
		return r
	}

	function Ev(t) {
		for (var e = "", r = 0; r < t.length; r++) e += Bv(t[r].toString(16));
		return e
	}

	function Sv(t) {
		return (t >>> 24 | t >>> 8 & 65280 | t << 8 & 16711680 | (255 & t) << 24) >>> 0
	}

	function kv(t, e) {
		for (var r = "", n = 0; n < t.length; n++) {
			var i = t[n];
			"little" === e && (i = Sv(i)), r += Tv(i.toString(16))
		}
		return r
	}

	function Bv(t) {
		return 1 === t.length ? "0" + t : t
	}

	function Tv(t) {
		return 7 === t.length ? "0" + t : 6 === t.length ? "00" + t : 5 === t.length ? "000" + t : 4 === t.length ?
			"0000" + t : 3 === t.length ? "00000" + t : 2 === t.length ? "000000" + t : 1 === t.length ? "0000000" + t :
			t
	}

	function Rv(t, e, r, n) {
		var i = r - e;
		Kg(i % 4 == 0);
		for (var o = new Array(i / 4), a = 0, s = e; a < o.length; a++, s += 4) {
			var f;
			f = "big" === n ? t[s] << 24 | t[s + 1] << 16 | t[s + 2] << 8 | t[s + 3] : t[s + 3] << 24 | t[s + 2] << 16 |
				t[s + 1] << 8 | t[s], o[a] = f >>> 0
		}
		return o
	}

	function xv(t, e) {
		for (var r = new Array(4 * t.length), n = 0, i = 0; n < t.length; n++, i += 4) {
			var o = t[n];
			"big" === e ? (r[i] = o >>> 24, r[i + 1] = o >>> 16 & 255, r[i + 2] = o >>> 8 & 255, r[i + 3] = 255 & o) : (
				r[i + 3] = o >>> 24, r[i + 2] = o >>> 16 & 255, r[i + 1] = o >>> 8 & 255, r[i] = 255 & o)
		}
		return r
	}

	function Cv(t, e) {
		return t >>> e | t << 32 - e
	}

	function Iv(t, e) {
		return t << e | t >>> 32 - e
	}

	function Dv(t, e) {
		return t + e >>> 0
	}

	function Pv(t, e, r) {
		return t + e + r >>> 0
	}

	function Ov(t, e, r, n) {
		return t + e + r + n >>> 0
	}

	function Lv(t, e, r, n, i) {
		return t + e + r + n + i >>> 0
	}

	function Uv(t, e, r, n) {
		var i = t[e],
			o = n + t[e + 1] >>> 0,
			a = (o < n ? 1 : 0) + r + i;
		t[e] = a >>> 0, t[e + 1] = o
	}

	function jv(t, e, r, n) {
		return (e + n >>> 0 < e ? 1 : 0) + t + r >>> 0
	}

	function Nv(t, e, r, n) {
		return e + n >>> 0
	}

	function zv(t, e, r, n, i, o, a, s) {
		var f = 0,
			u = e;
		return f += (u = u + n >>> 0) < e ? 1 : 0, f += (u = u + o >>> 0) < o ? 1 : 0, t + r + i + a + (f += (u = u +
			s >>> 0) < s ? 1 : 0) >>> 0
	}

	function Fv(t, e, r, n, i, o, a, s) {
		return e + n + o + s >>> 0
	}

	function qv(t, e, r, n, i, o, a, s, f, u) {
		var h = 0,
			c = e;
		return h += (c = c + n >>> 0) < e ? 1 : 0, h += (c = c + o >>> 0) < o ? 1 : 0, h += (c = c + s >>> 0) < s ? 1 :
			0, t + r + i + a + f + (h += (c = c + u >>> 0) < u ? 1 : 0) >>> 0
	}

	function Hv(t, e, r, n, i, o, a, s, f, u) {
		return e + n + o + s + u >>> 0
	}

	function Wv(t, e, r) {
		return (e << 32 - r | t >>> r) >>> 0
	}

	function Gv(t, e, r) {
		return (t << 32 - r | e >>> r) >>> 0
	}

	function Yv(t, e, r) {
		return t >>> r
	}

	function Kv(t, e, r) {
		return (t << 32 - r | e >>> r) >>> 0
	}

	function Vv() {
		return _v || (_v = !0, Yg = {}, Kg = ec(), Vg = Mr(), Zg = Vg, Yg.inherits = Zg, $g = Mv, Yg.toArray = $g, Xg =
			Ev, Yg.toHex = Xg, Jg = Sv, Yg.htonl = Jg, Qg = kv, Yg.toHex32 = Qg, tv = Bv, Yg.zero2 = tv, ev = Tv, Yg
			.zero8 = ev, rv = Rv, Yg.join32 = rv, nv = xv, Yg.split32 = nv, iv = Cv, Yg.rotr32 = iv, ov = Iv, Yg
			.rotl32 = ov, av = Dv, Yg.sum32 = av, sv = Pv, Yg.sum32_3 = sv, fv = Ov, Yg.sum32_4 = fv, uv = Lv, Yg
			.sum32_5 = uv, hv = Uv, Yg.sum64 = hv, cv = jv, Yg.sum64_hi = cv, dv = Nv, Yg.sum64_lo = dv, lv = zv, Yg
			.sum64_4_hi = lv, pv = Fv, Yg.sum64_4_lo = pv, mv = qv, Yg.sum64_5_hi = mv, bv = Hv, Yg.sum64_5_lo = bv,
			gv = Wv, Yg.rotr64_hi = gv, vv = Gv, Yg.rotr64_lo = vv, yv = Yv, Yg.shr64_hi = yv, wv = Kv, Yg
			.shr64_lo = wv), Yg
	}
	var Zv, $v, Xv, Jv = !1;

	function Qv() {
		this.pending = null, this.pendingTotal = 0, this.blockSize = this.constructor.blockSize, this.outSize = this
			.constructor.outSize, this.hmacStrength = this.constructor.hmacStrength, this.padLength = this.constructor
			.padLength / 8, this.endian = "big", this._delta8 = this.blockSize / 8, this._delta32 = this.blockSize / 32
	}

	function ty() {
		return Jv || (Jv = !0, Zv = {}, Vv(), $v = ec(), Xv = Qv, Zv.BlockHash = Xv, Qv.prototype.update = function(t,
			e) {
			if (t = Vv().toArray(t, e), this.pending ? this.pending = this.pending.concat(t) : this.pending = t,
				this.pendingTotal += t.length, this.pending.length >= this._delta8) {
				var r = (t = this.pending).length % this._delta8;
				this.pending = t.slice(t.length - r, t.length), 0 === this.pending.length && (this.pending =
					null), t = Vv().join32(t, 0, t.length - r, this.endian);
				for (var n = 0; n < t.length; n += this._delta32) this._update(t, n, n + this._delta32)
			}
			return this
		}, Qv.prototype.digest = function(t) {
			return this.update(this._pad()), $v(null === this.pending), this._digest(t)
		}, Qv.prototype._pad = function() {
			var t = this.pendingTotal,
				e = this._delta8,
				r = e - (t + this.padLength) % e,
				n = new Array(r + this.padLength);
			n[0] = 128;
			for (var i = 1; i < r; i++) n[i] = 0;
			if (t <<= 3, "big" === this.endian) {
				for (var o = 8; o < this.padLength; o++) n[i++] = 0;
				n[i++] = 0, n[i++] = 0, n[i++] = 0, n[i++] = 0, n[i++] = t >>> 24 & 255, n[i++] = t >>> 16 &
					255, n[i++] = t >>> 8 & 255, n[i++] = 255 & t
			} else
				for (n[i++] = 255 & t, n[i++] = t >>> 8 & 255, n[i++] = t >>> 16 & 255, n[i++] = t >>> 24 & 255,
					n[i++] = 0, n[i++] = 0, n[i++] = 0, n[i++] = 0, o = 8; o < this.padLength; o++) n[i++] = 0;
			return n
		}), Zv
	}
	var ey, ry, ny, iy, oy, ay, sy, fy, uy, hy = !1;

	function cy(t, e, r, n) {
		return 0 === t ? dy(e, r, n) : 1 === t || 3 === t ? function(t, e, r) {
			return t ^ e ^ r
		}(e, r, n) : 2 === t ? ly(e, r, n) : void 0
	}

	function dy(t, e, r) {
		return t & e ^ ~t & r
	}

	function ly(t, e, r) {
		return t & e ^ t & r ^ e & r
	}

	function py(t) {
		return ry(t, 2) ^ ry(t, 13) ^ ry(t, 22)
	}

	function my(t) {
		return ry(t, 6) ^ ry(t, 11) ^ ry(t, 25)
	}

	function by(t) {
		return ry(t, 7) ^ ry(t, 18) ^ t >>> 3
	}

	function gy(t) {
		return ry(t, 17) ^ ry(t, 19) ^ t >>> 10
	}

	function vy() {
		return hy || (hy = !0, ey = {}, Vv(), ry = Vv().rotr32, ny = cy, ey.ft_1 = ny, iy = dy, ey.ch32 = iy, oy = ly,
			ey.maj32 = oy, ay = py, ey.s0_256 = ay, sy = my, ey.s1_256 = sy, fy = by, ey.g0_256 = fy, uy = gy, ey
			.g1_256 = uy), ey
	}
	var yy, wy, _y, Ay, My, Ey, Sy, ky = !1;

	function By() {
		if (!(this instanceof By)) return new By;
		Ey.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.W = new Array(80)
	}

	function Ty() {
		return ky || (ky = !0, yy = {}, Vv(), ty(), vy(), wy = Vv().rotl32, _y = Vv().sum32, Ay = Vv().sum32_5, My =
			vy().ft_1, Ey = ty().BlockHash, Sy = [1518500249, 1859775393, 2400959708, 3395469782], Vv().inherits(By,
				Ey), yy = By, By.blockSize = 512, By.outSize = 160, By.hmacStrength = 80, By.padLength = 64, By
			.prototype._update = function(t, e) {
				for (var r = this.W, n = 0; n < 16; n++) r[n] = t[e + n];
				for (; n < r.length; n++) r[n] = wy(r[n - 3] ^ r[n - 8] ^ r[n - 14] ^ r[n - 16], 1);
				var i = this.h[0],
					o = this.h[1],
					a = this.h[2],
					s = this.h[3],
					f = this.h[4];
				for (n = 0; n < r.length; n++) {
					var u = ~~(n / 20),
						h = Ay(wy(i, 5), My(u, o, a, s), f, r[n], Sy[u]);
					f = s, s = a, a = wy(o, 30), o = i, i = h
				}
				this.h[0] = _y(this.h[0], i), this.h[1] = _y(this.h[1], o), this.h[2] = _y(this.h[2], a), this.h[
					3] = _y(this.h[3], s), this.h[4] = _y(this.h[4], f)
			}, By.prototype._digest = function(t) {
				return "hex" === t ? Vv().toHex32(this.h, "big") : Vv().split32(this.h, "big")
			}), yy
	}
	var Ry, xy, Cy, Iy, Dy, Py, Oy, Ly, Uy, jy, Ny, zy, Fy, qy = !1;

	function Hy() {
		if (!(this instanceof Hy)) return new Hy;
		zy.call(this), this.h = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635,
			1541459225
		], this.k = Fy, this.W = new Array(64)
	}

	function Wy() {
		return qy || (qy = !0, Ry = {}, Vv(), ty(), vy(), xy = ec(), Cy = Vv().sum32, Iy = Vv().sum32_4, Dy = Vv()
			.sum32_5, Py = vy().ch32, Oy = vy().maj32, Ly = vy().s0_256, Uy = vy().s1_256, jy = vy().g0_256, Ny =
			vy().g1_256, zy = ty().BlockHash, Fy = [1116352408, 1899447441, 3049323471, 3921009573, 961987163,
				1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388,
				2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983,
				1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891,
				3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700,
				1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817,
				3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571,
				1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474,
				2756734187, 3204031479, 3329325298
			], Vv().inherits(Hy, zy), Ry = Hy, Hy.blockSize = 512, Hy.outSize = 256, Hy.hmacStrength = 192, Hy
			.padLength = 64, Hy.prototype._update = function(t, e) {
				for (var r = this.W, n = 0; n < 16; n++) r[n] = t[e + n];
				for (; n < r.length; n++) r[n] = Iy(Ny(r[n - 2]), r[n - 7], jy(r[n - 15]), r[n - 16]);
				var i = this.h[0],
					o = this.h[1],
					a = this.h[2],
					s = this.h[3],
					f = this.h[4],
					u = this.h[5],
					h = this.h[6],
					c = this.h[7];
				for (xy(this.k.length === r.length), n = 0; n < r.length; n++) {
					var d = Dy(c, Uy(f), Py(f, u, h), this.k[n], r[n]),
						l = Cy(Ly(i), Oy(i, o, a));
					c = h, h = u, u = f, f = Cy(s, d), s = a, a = o, o = i, i = Cy(d, l)
				}
				this.h[0] = Cy(this.h[0], i), this.h[1] = Cy(this.h[1], o), this.h[2] = Cy(this.h[2], a), this.h[
					3] = Cy(this.h[3], s), this.h[4] = Cy(this.h[4], f), this.h[5] = Cy(this.h[5], u), this.h[6] =
					Cy(this.h[6], h), this.h[7] = Cy(this.h[7], c)
			}, Hy.prototype._digest = function(t) {
				return "hex" === t ? Vv().toHex32(this.h, "big") : Vv().split32(this.h, "big")
			}), Ry
	}
	var Gy, Yy, Ky = !1;

	function Vy() {
		if (!(this instanceof Vy)) return new Vy;
		Yy.call(this), this.h = [3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839,
			3204075428
		]
	}

	function Zy() {
		return Ky || (Ky = !0, Gy = {}, Vv(), Yy = Wy(), Vv().inherits(Vy, Yy), Gy = Vy, Vy.blockSize = 512, Vy
			.outSize = 224, Vy.hmacStrength = 192, Vy.padLength = 64, Vy.prototype._digest = function(t) {
				return "hex" === t ? Vv().toHex32(this.h.slice(0, 7), "big") : Vv().split32(this.h.slice(0, 7),
					"big")
			}), Gy
	}
	var $y, Xy, Jy, Qy, tw, ew, rw, nw, iw, ow, aw, sw, fw, uw, hw, cw = !1;

	function dw() {
		if (!(this instanceof dw)) return new dw;
		uw.call(this), this.h = [1779033703, 4089235720, 3144134277, 2227873595, 1013904242, 4271175723, 2773480762,
			1595750129, 1359893119, 2917565137, 2600822924, 725511199, 528734635, 4215389547, 1541459225, 327033209
		], this.k = hw, this.W = new Array(160)
	}

	function lw(t, e, r, n, i) {
		var o = t & r ^ ~t & i;
		return o < 0 && (o += 4294967296), o
	}

	function pw(t, e, r, n, i, o) {
		var a = e & n ^ ~e & o;
		return a < 0 && (a += 4294967296), a
	}

	function mw(t, e, r, n, i) {
		var o = t & r ^ t & i ^ r & i;
		return o < 0 && (o += 4294967296), o
	}

	function bw(t, e, r, n, i, o) {
		var a = e & n ^ e & o ^ n & o;
		return a < 0 && (a += 4294967296), a
	}

	function gw(t, e) {
		var r = Jy(t, e, 28) ^ Jy(e, t, 2) ^ Jy(e, t, 7);
		return r < 0 && (r += 4294967296), r
	}

	function vw(t, e) {
		var r = Qy(t, e, 28) ^ Qy(e, t, 2) ^ Qy(e, t, 7);
		return r < 0 && (r += 4294967296), r
	}

	function yw(t, e) {
		var r = Qy(t, e, 14) ^ Qy(t, e, 18) ^ Qy(e, t, 9);
		return r < 0 && (r += 4294967296), r
	}

	function ww(t, e) {
		var r = Jy(t, e, 1) ^ Jy(t, e, 8) ^ tw(t, e, 7);
		return r < 0 && (r += 4294967296), r
	}

	function _w(t, e) {
		var r = Qy(t, e, 1) ^ Qy(t, e, 8) ^ ew(t, e, 7);
		return r < 0 && (r += 4294967296), r
	}

	function Aw(t, e) {
		var r = Qy(t, e, 19) ^ Qy(e, t, 29) ^ ew(t, e, 6);
		return r < 0 && (r += 4294967296), r
	}

	function Mw() {
		return cw || (cw = !0, $y = {}, Vv(), ty(), Xy = ec(), Jy = Vv().rotr64_hi, Qy = Vv().rotr64_lo, tw = Vv()
			.shr64_hi, ew = Vv().shr64_lo, rw = Vv().sum64, nw = Vv().sum64_hi, iw = Vv().sum64_lo, ow = Vv()
			.sum64_4_hi, aw = Vv().sum64_4_lo, sw = Vv().sum64_5_hi, fw = Vv().sum64_5_lo, uw = ty().BlockHash,
			hw = [1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548,
				961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560,
				3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994,
				1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868,
				3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933,
				770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837,
				2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956,
				3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936,
				666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823,
				1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627,
				2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008,
				3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720,
				430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280,
				958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899,
				1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044,
				2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427,
				3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992,
				116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315,
				685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676,
				1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591
			], Vv().inherits(dw, uw), $y = dw, dw.blockSize = 1024, dw.outSize = 512, dw.hmacStrength = 192, dw
			.padLength = 128, dw.prototype._prepareBlock = function(t, e) {
				for (var r, n, i, o = this.W, a = 0; a < 32; a++) o[a] = t[e + a];
				for (; a < o.length; a += 2) {
					var s = (r = o[a - 4], n = o[a - 3], i = void 0, (i = Jy(r, n, 19) ^ Jy(n, r, 29) ^ tw(r, n,
							6)) < 0 && (i += 4294967296), i),
						f = Aw(o[a - 4], o[a - 3]),
						u = o[a - 14],
						h = o[a - 13],
						c = ww(o[a - 30], o[a - 29]),
						d = _w(o[a - 30], o[a - 29]),
						l = o[a - 32],
						p = o[a - 31];
					o[a] = ow(s, f, u, h, c, d, l, p), o[a + 1] = aw(s, f, u, h, c, d, l, p)
				}
			}, dw.prototype._update = function(t, e) {
				this._prepareBlock(t, e);
				var r, n, i, o = this.W,
					a = this.h[0],
					s = this.h[1],
					f = this.h[2],
					u = this.h[3],
					h = this.h[4],
					c = this.h[5],
					d = this.h[6],
					l = this.h[7],
					p = this.h[8],
					m = this.h[9],
					b = this.h[10],
					g = this.h[11],
					v = this.h[12],
					y = this.h[13],
					w = this.h[14],
					_ = this.h[15];
				Xy(this.k.length === o.length);
				for (var A = 0; A < o.length; A += 2) {
					var M = w,
						E = _,
						S = (i = void 0, (i = Jy(r = p, n = m, 14) ^ Jy(r, n, 18) ^ Jy(n, r, 9)) < 0 && (i +=
							4294967296), i),
						k = yw(p, m),
						B = lw(p, 0, b, 0, v),
						T = pw(0, m, 0, g, 0, y),
						R = this.k[A],
						x = this.k[A + 1],
						C = o[A],
						I = o[A + 1],
						D = sw(M, E, S, k, B, T, R, x, C, I),
						P = fw(M, E, S, k, B, T, R, x, C, I);
					M = gw(a, s), E = vw(a, s), S = mw(a, 0, f, 0, h), k = bw(0, s, 0, u, 0, c);
					var O = nw(M, E, S, k),
						L = iw(M, E, S, k);
					w = v, _ = y, v = b, y = g, b = p, g = m, p = nw(d, l, D, P), m = iw(l, l, D, P), d = h, l = c,
						h = f, c = u, f = a, u = s, a = nw(D, P, O, L), s = iw(D, P, O, L)
				}
				rw(this.h, 0, a, s), rw(this.h, 2, f, u), rw(this.h, 4, h, c), rw(this.h, 6, d, l), rw(this.h, 8, p,
					m), rw(this.h, 10, b, g), rw(this.h, 12, v, y), rw(this.h, 14, w, _)
			}, dw.prototype._digest = function(t) {
				return "hex" === t ? Vv().toHex32(this.h, "big") : Vv().split32(this.h, "big")
			}), $y
	}
	var Ew, Sw, kw = !1;

	function Bw() {
		if (!(this instanceof Bw)) return new Bw;
		Sw.call(this), this.h = [3418070365, 3238371032, 1654270250, 914150663, 2438529370, 812702999, 355462360,
			4144912697, 1731405415, 4290775857, 2394180231, 1750603025, 3675008525, 1694076839, 1203062813,
			3204075428
		]
	}

	function Tw() {
		return kw || (kw = !0, Ew = {}, Vv(), Sw = Mw(), Vv().inherits(Bw, Sw), Ew = Bw, Bw.blockSize = 1024, Bw
			.outSize = 384, Bw.hmacStrength = 192, Bw.padLength = 128, Bw.prototype._digest = function(t) {
				return "hex" === t ? Vv().toHex32(this.h.slice(0, 12), "big") : Vv().split32(this.h.slice(0, 12),
					"big")
			}), Ew
	}
	var Rw, xw, Cw, Iw, Dw, Pw, Ow = !1;

	function Lw() {
		return Ow || (Ow = !0, Rw = {}, xw = Ty(), Rw.sha1 = xw, Cw = Zy(), Rw.sha224 = Cw, Iw = Wy(), Rw.sha256 = Iw,
			Dw = Tw(), Rw.sha384 = Dw, Pw = Mw(), Rw.sha512 = Pw), Rw
	}
	var Uw, jw, Nw, zw, Fw, qw, Hw, Ww, Gw, Yw, Kw, Vw = !1;

	function Zw() {
		if (!(this instanceof Zw)) return new Zw;
		qw.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.endian = "little"
	}

	function $w(t, e, r, n) {
		return t <= 15 ? e ^ r ^ n : t <= 31 ? e & r | ~e & n : t <= 47 ? (e | ~r) ^ n : t <= 63 ? e & n | r & ~n : e ^
			(r | ~n)
	}

	function Xw(t) {
		return t <= 15 ? 0 : t <= 31 ? 1518500249 : t <= 47 ? 1859775393 : t <= 63 ? 2400959708 : 2840853838
	}

	function Jw(t) {
		return t <= 15 ? 1352829926 : t <= 31 ? 1548603684 : t <= 47 ? 1836072691 : t <= 63 ? 2053994217 : 0
	}

	function Qw() {
		return Vw || (Vw = !0, Uw = {}, Vv(), ty(), jw = Vv().rotl32, Nw = Vv().sum32, zw = Vv().sum32_3, Fw = Vv()
			.sum32_4, qw = ty().BlockHash, Vv().inherits(Zw, qw), Hw = Zw, Uw.ripemd160 = Hw, Zw.blockSize = 512, Zw
			.outSize = 160, Zw.hmacStrength = 192, Zw.padLength = 64, Zw.prototype._update = function(t, e) {
				for (var r = this.h[0], n = this.h[1], i = this.h[2], o = this.h[3], a = this.h[4], s = r, f = n,
						u = i, h = o, c = a, d = 0; d < 80; d++) {
					var l = Nw(jw(Fw(r, $w(d, n, i, o), t[Ww[d] + e], Xw(d)), Yw[d]), a);
					r = a, a = o, o = jw(i, 10), i = n, n = l, l = Nw(jw(Fw(s, $w(79 - d, f, u, h), t[Gw[d] + e],
						Jw(d)), Kw[d]), c), s = c, c = h, h = jw(u, 10), u = f, f = l
				}
				l = zw(this.h[1], i, h), this.h[1] = zw(this.h[2], o, c), this.h[2] = zw(this.h[3], a, s), this.h[
					3] = zw(this.h[4], r, f), this.h[4] = zw(this.h[0], n, u), this.h[0] = l
			}, Zw.prototype._digest = function(t) {
				return "hex" === t ? Vv().toHex32(this.h, "little") : Vv().split32(this.h, "little")
			}, Ww = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5,
				2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13,
				3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13
			], Gw = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12,
				4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12,
				2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11
			], Yw = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15,
				9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9,
				8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6
			], Kw = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12,
				7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6,
				14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11
			]), Uw
	}
	var t_, e_, r_ = !1;

	function n_(t, e, r) {
		if (!(this instanceof n_)) return new n_(t, e, r);
		this.Hash = t, this.blockSize = t.blockSize / 8, this.outSize = t.outSize / 8, this.inner = null, this.outer =
			null, this._init(Vv().toArray(e, r))
	}

	function i_() {
		return r_ || (r_ = !0, t_ = {}, Vv(), e_ = ec(), t_ = n_, n_.prototype._init = function(t) {
			t.length > this.blockSize && (t = (new this.Hash).update(t).digest()), e_(t.length <= this
				.blockSize);
			for (var e = t.length; e < this.blockSize; e++) t.push(0);
			for (e = 0; e < t.length; e++) t[e] ^= 54;
			for (this.inner = (new this.Hash).update(t), e = 0; e < t.length; e++) t[e] ^= 106;
			this.outer = (new this.Hash).update(t)
		}, n_.prototype.update = function(t, e) {
			return this.inner.update(t, e), this
		}, n_.prototype.digest = function(t) {
			return this.outer.update(this.inner.digest()), this.outer.digest(t)
		}), t_
	}
	var o_, a_, s_ = !1;

	function f_() {
		return s_ || (s_ = !0, (a_ = o_ = {}).utils = Vv(), a_.common = ty(), a_.sha = Lw(), a_.ripemd = Qw(), a_.hmac =
			i_(), a_.sha1 = a_.sha.sha1, a_.sha256 = a_.sha.sha256, a_.sha224 = a_.sha.sha224, a_.sha384 = a_.sha
			.sha384, a_.sha512 = a_.sha.sha512, a_.ripemd160 = a_.ripemd.ripemd160), o_
	}
	var u_, h_ = !1;

	function c_() {
		return h_ || (h_ = !0, u_ = {}, u_ = {
			doubles: {
				step: 4,
				points: [
					["e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a",
						"f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821"
					],
					["8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508",
						"11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf"
					],
					["175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739",
						"d3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695"
					],
					["363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640",
						"4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9"
					],
					["8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c",
						"4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36"
					],
					["723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda",
						"96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f"
					],
					["eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa",
						"5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999"
					],
					["100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0",
						"cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09"
					],
					["e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d",
						"9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d"
					],
					["feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d",
						"e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088"
					],
					["da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1",
						"9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d"
					],
					["53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0",
						"5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8"
					],
					["8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047",
						"10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a"
					],
					["385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862",
						"283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453"
					],
					["6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7",
						"7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160"
					],
					["3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd",
						"56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0"
					],
					["85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83",
						"7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6"
					],
					["948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a",
						"53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589"
					],
					["6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8",
						"bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17"
					],
					["e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d",
						"4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda"
					],
					["e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725",
						"7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd"
					],
					["213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754",
						"4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2"
					],
					["4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c",
						"17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6"
					],
					["fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6",
						"6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f"
					],
					["76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39",
						"c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01"
					],
					["c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891",
						"893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3"
					],
					["d895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b",
						"febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f"
					],
					["b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03",
						"2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7"
					],
					["e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d",
						"eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78"
					],
					["a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070",
						"7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1"
					],
					["90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4",
						"e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150"
					],
					["8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da",
						"662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82"
					],
					["e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11",
						"1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc"
					],
					["8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e",
						"efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b"
					],
					["e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41",
						"2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51"
					],
					["b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef",
						"67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45"
					],
					["d68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8",
						"db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120"
					],
					["324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d",
						"648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84"
					],
					["4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96",
						"35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d"
					],
					["9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd",
						"ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d"
					],
					["6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5",
						"9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8"
					],
					["a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266",
						"40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8"
					],
					["7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71",
						"34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac"
					],
					["928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac",
						"c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f"
					],
					["85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751",
						"1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962"
					],
					["ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e",
						"493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907"
					],
					["827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241",
						"c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec"
					],
					["eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3",
						"be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d"
					],
					["e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f",
						"4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414"
					],
					["1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19",
						"aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd"
					],
					["146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be",
						"b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0"
					],
					["fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9",
						"6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811"
					],
					["da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2",
						"8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1"
					],
					["a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13",
						"7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c"
					],
					["174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c",
						"ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73"
					],
					["959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba",
						"2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd"
					],
					["d2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151",
						"e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405"
					],
					["64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073",
						"d99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589"
					],
					["8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458",
						"38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e"
					],
					["13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b",
						"69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27"
					],
					["bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366",
						"d3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1"
					],
					["8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa",
						"40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482"
					],
					["8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0",
						"620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945"
					],
					["dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787",
						"7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573"
					],
					["f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e",
						"ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82"
					]
				]
			},
			naf: {
				wnd: 7,
				points: [
					["f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9",
						"388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672"
					],
					["2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4",
						"d8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6"
					],
					["5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc",
						"6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da"
					],
					["acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe",
						"cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37"
					],
					["774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb",
						"d984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b"
					],
					["f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8",
						"ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81"
					],
					["d7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e",
						"581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58"
					],
					["defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34",
						"4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77"
					],
					["2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c",
						"85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a"
					],
					["352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5",
						"321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c"
					],
					["2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f",
						"2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67"
					],
					["9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714",
						"73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402"
					],
					["daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729",
						"a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55"
					],
					["c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db",
						"2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482"
					],
					["6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4",
						"e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82"
					],
					["1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5",
						"b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396"
					],
					["605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479",
						"2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49"
					],
					["62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d",
						"80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf"
					],
					["80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f",
						"1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a"
					],
					["7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb",
						"d0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7"
					],
					["d528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9",
						"eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933"
					],
					["49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963",
						"758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a"
					],
					["77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74",
						"958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6"
					],
					["f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530",
						"e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37"
					],
					["463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b",
						"5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e"
					],
					["f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247",
						"cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6"
					],
					["caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1",
						"cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476"
					],
					["2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120",
						"4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40"
					],
					["7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435",
						"91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61"
					],
					["754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18",
						"673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683"
					],
					["e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8",
						"59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5"
					],
					["186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb",
						"3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b"
					],
					["df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f",
						"55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417"
					],
					["5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143",
						"efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868"
					],
					["290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba",
						"e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a"
					],
					["af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45",
						"f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6"
					],
					["766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a",
						"744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996"
					],
					["59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e",
						"c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e"
					],
					["f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8",
						"e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d"
					],
					["7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c",
						"30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2"
					],
					["948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519",
						"e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e"
					],
					["7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab",
						"100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437"
					],
					["3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca",
						"ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311"
					],
					["d3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf",
						"8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4"
					],
					["1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610",
						"68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575"
					],
					["733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4",
						"f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d"
					],
					["15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c",
						"d56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d"
					],
					["a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940",
						"edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629"
					],
					["e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980",
						"a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06"
					],
					["311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3",
						"66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374"
					],
					["34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf",
						"9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee"
					],
					["f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63",
						"4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1"
					],
					["d7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448",
						"fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b"
					],
					["32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf",
						"5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661"
					],
					["7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5",
						"8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6"
					],
					["ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6",
						"8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e"
					],
					["16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5",
						"5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d"
					],
					["eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99",
						"f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc"
					],
					["78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51",
						"f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4"
					],
					["494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5",
						"42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c"
					],
					["a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5",
						"204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b"
					],
					["c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997",
						"4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913"
					],
					["841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881",
						"73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154"
					],
					["5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5",
						"39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865"
					],
					["36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66",
						"d2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc"
					],
					["336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726",
						"ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224"
					],
					["8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede",
						"6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e"
					],
					["1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94",
						"60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6"
					],
					["85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31",
						"3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511"
					],
					["29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51",
						"b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b"
					],
					["a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252",
						"ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2"
					],
					["4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5",
						"cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c"
					],
					["d24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b",
						"6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3"
					],
					["ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4",
						"322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d"
					],
					["af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f",
						"6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700"
					],
					["e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889",
						"2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4"
					],
					["591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246",
						"b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196"
					],
					["11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984",
						"998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4"
					],
					["3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a",
						"b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257"
					],
					["cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030",
						"bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13"
					],
					["c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197",
						"6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096"
					],
					["c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593",
						"c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38"
					],
					["a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef",
						"21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f"
					],
					["347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38",
						"60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448"
					],
					["da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a",
						"49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a"
					],
					["c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111",
						"5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4"
					],
					["4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502",
						"7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437"
					],
					["3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea",
						"be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7"
					],
					["cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26",
						"8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d"
					],
					["b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986",
						"39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a"
					],
					["d4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e",
						"62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54"
					],
					["48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4",
						"25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77"
					],
					["dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda",
						"ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517"
					],
					["6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859",
						"cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10"
					],
					["e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f",
						"f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125"
					],
					["eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c",
						"6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e"
					],
					["13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942",
						"fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1"
					],
					["ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a",
						"1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2"
					],
					["b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80",
						"5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423"
					],
					["ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d",
						"438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8"
					],
					["8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1",
						"cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758"
					],
					["52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63",
						"c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375"
					],
					["e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352",
						"6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d"
					],
					["7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193",
						"ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec"
					],
					["5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00",
						"9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0"
					],
					["32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58",
						"ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c"
					],
					["e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7",
						"d3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4"
					],
					["8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8",
						"c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f"
					],
					["4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e",
						"67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649"
					],
					["3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d",
						"cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826"
					],
					["674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b",
						"299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5"
					],
					["d32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f",
						"f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87"
					],
					["30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6",
						"462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b"
					],
					["be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297",
						"62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc"
					],
					["93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a",
						"7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c"
					],
					["b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c",
						"ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f"
					],
					["d5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52",
						"4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a"
					],
					["d3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb",
						"bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46"
					],
					["463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065",
						"bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f"
					],
					["7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917",
						"603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03"
					],
					["74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9",
						"cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08"
					],
					["30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3",
						"553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8"
					],
					["9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57",
						"712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373"
					],
					["176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66",
						"ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3"
					],
					["75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8",
						"9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8"
					],
					["809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721",
						"9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1"
					],
					["1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180",
						"4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9"
					]
				]
			}
		}), u_
	}
	var d_, l_, p_, m_, b_ = !1;

	function g_(t) {
		"short" === t.type ? this.curve = new(Gg().short)(t) : "edwards" === t.type ? this.curve = new(Gg().edwards)(
			t) : this.curve = new(Gg().mont)(t), this.g = this.curve.g, this.n = this.curve.n, this.hash = t.hash, p_(
				this.g.validate(), "Invalid curve"), p_(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O")
	}

	function v_(t, e) {
		Object.defineProperty(l_, t, {
			configurable: !0,
			enumerable: !0,
			get: function() {
				var r = new g_(e);
				return Object.defineProperty(l_, t, {
					configurable: !0,
					enumerable: !0,
					value: r
				}), r
			}
		})
	}

	function y_() {
		return b_ || (b_ = !0, function() {
			l_ = d_ = {}, f_(), Gg(), og(), p_ = og().assert, l_.PresetCurve = g_, v_("p192", {
				type: "short",
				prime: "p192",
				p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
				a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",
				b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",
				n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",
				hash: f_().sha256,
				gRed: !1,
				g: ["188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012",
					"07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"
				]
			}), v_("p224", {
				type: "short",
				prime: "p224",
				p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
				a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",
				b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",
				n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",
				hash: f_().sha256,
				gRed: !1,
				g: ["b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21",
					"bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"
				]
			}), v_("p256", {
				type: "short",
				prime: null,
				p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",
				a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",
				b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",
				n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",
				hash: f_().sha256,
				gRed: !1,
				g: ["6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296",
					"4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"
				]
			}), v_("p384", {
				type: "short",
				prime: null,
				p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",
				a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",
				b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",
				n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",
				hash: f_().sha384,
				gRed: !1,
				g: ["aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7",
					"3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"
				]
			}), v_("p521", {
				type: "short",
				prime: null,
				p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",
				a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",
				b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",
				n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",
				hash: f_().sha512,
				gRed: !1,
				g: ["000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66",
					"00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"
				]
			}), v_("curve25519", {
				type: "mont",
				prime: "p25519",
				p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
				a: "76d06",
				b: "1",
				n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
				hash: f_().sha256,
				gRed: !1,
				g: ["9"]
			}), v_("ed25519", {
				type: "edwards",
				prime: "p25519",
				p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
				a: "-1",
				c: "1",
				d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",
				n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
				hash: f_().sha256,
				gRed: !1,
				g: ["216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a",
					"6666666666666666666666666666666666666666666666666666666666666658"
				]
			});
			try {
				m_ = c_()
			} catch (t) {
				m_ = void 0
			}
			v_("secp256k1", {
				type: "short",
				prime: "k256",
				p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
				a: "0",
				b: "7",
				n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
				h: "1",
				hash: f_().sha256,
				beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",
				lambda: "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",
				basis: [{
					a: "3086d221a7d46bcde86c90e49284eb15",
					b: "-e4437ed6010e88286f547fa90abfe4c3"
				}, {
					a: "114ca50f7a8e2f3f657c1108d9d44cfd8",
					b: "3086d221a7d46bcde86c90e49284eb15"
				}],
				gRed: !1,
				g: ["79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
					"483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8", m_
				]
			})
		}()), d_
	}
	var w_, __, A_ = !1;

	function M_(t) {
		if (!(this instanceof M_)) return new M_(t);
		this.hash = t.hash, this.predResist = !!t.predResist, this.outLen = this.hash.outSize, this.minEntropy = t
			.minEntropy || this.hash.hmacStrength, this._reseed = null, this.reseedInterval = null, this.K = null, this
			.V = null;
		var e = Vb().toArray(t.entropy, t.entropyEnc || "hex"),
			r = Vb().toArray(t.nonce, t.nonceEnc || "hex"),
			n = Vb().toArray(t.pers, t.persEnc || "hex");
		__(e.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy + " bits"), this._init(
			e, r, n)
	}

	function E_() {
		return A_ || (A_ = !0, w_ = {}, f_(), Vb(), __ = ec(), w_ = M_, M_.prototype._init = function(t, e, r) {
			var n = t.concat(e).concat(r);
			this.K = new Array(this.outLen / 8), this.V = new Array(this.outLen / 8);
			for (var i = 0; i < this.V.length; i++) this.K[i] = 0, this.V[i] = 1;
			this._update(n), this._reseed = 1, this.reseedInterval = 281474976710656
		}, M_.prototype._hmac = function() {
			return new(f_().hmac)(this.hash, this.K)
		}, M_.prototype._update = function(t) {
			var e = this._hmac().update(this.V).update([0]);
			t && (e = e.update(t)), this.K = e.digest(), this.V = this._hmac().update(this.V).digest(), t && (
				this.K = this._hmac().update(this.V).update([1]).update(t).digest(), this.V = this._hmac()
				.update(this.V).digest())
		}, M_.prototype.reseed = function(t, e, r, n) {
			"string" != typeof e && (n = r, r = e, e = null), t = Vb().toArray(t, e), r = Vb().toArray(r, n),
				__(t.length >= this.minEntropy / 8, "Not enough entropy. Minimum is: " + this.minEntropy +
					" bits"), this._update(t.concat(r || [])), this._reseed = 1
		}, M_.prototype.generate = function(t, e, r, n) {
			if (this._reseed > this.reseedInterval) throw new Error("Reseed is required");
			"string" != typeof e && (n = r, r = e, e = null), r && (r = Vb().toArray(r, n || "hex"), this
				._update(r));
			for (var i = []; i.length < t;) this.V = this._hmac().update(this.V).digest(), i = i.concat(this.V);
			var o = i.slice(0, t);
			return this._update(r), this._reseed++, Vb().encode(o, e)
		}), w_
	}
	var S_, k_, B_, T_ = !1;

	function R_(t, e) {
		this.ec = t, this.priv = null, this.pub = null, e.priv && this._importPrivate(e.priv, e.privEnc), e.pub && this
			._importPublic(e.pub, e.pubEnc)
	}

	function x_() {
		return T_ || (T_ = !0, S_ = {}, k_ = pm(), og(), B_ = og().assert, S_ = R_, R_.fromPublic = function(t, e, r) {
			return e instanceof R_ ? e : new R_(t, {
				pub: e,
				pubEnc: r
			})
		}, R_.fromPrivate = function(t, e, r) {
			return e instanceof R_ ? e : new R_(t, {
				priv: e,
				privEnc: r
			})
		}, R_.prototype.validate = function() {
			var t = this.getPublic();
			return t.isInfinity() ? {
				result: !1,
				reason: "Invalid public key"
			} : t.validate() ? t.mul(this.ec.curve.n).isInfinity() ? {
				result: !0,
				reason: null
			} : {
				result: !1,
				reason: "Public key * N != O"
			} : {
				result: !1,
				reason: "Public key is not a point"
			}
		}, R_.prototype.getPublic = function(t, e) {
			return "string" == typeof t && (e = t, t = null), this.pub || (this.pub = this.ec.g.mul(this.priv)),
				e ? this.pub.encode(e, t) : this.pub
		}, R_.prototype.getPrivate = function(t) {
			return "hex" === t ? this.priv.toString(16, 2) : this.priv
		}, R_.prototype._importPrivate = function(t, e) {
			this.priv = new k_(t, e || 16), this.priv = this.priv.umod(this.ec.curve.n)
		}, R_.prototype._importPublic = function(t, e) {
			if (t.x || t.y) return "mont" === this.ec.curve.type ? B_(t.x, "Need x coordinate") : "short" !==
				this.ec.curve.type && "edwards" !== this.ec.curve.type || B_(t.x && t.y,
					"Need both x and y coordinate"), void(this.pub = this.ec.curve.point(t.x, t.y));
			this.pub = this.ec.curve.decodePoint(t, e)
		}, R_.prototype.derive = function(t) {
			return t.validate() || B_(t.validate(), "public point not validated"), t.mul(this.priv).getX()
		}, R_.prototype.sign = function(t, e, r) {
			return this.ec.sign(t, this, e, r)
		}, R_.prototype.verify = function(t, e) {
			return this.ec.verify(t, e, this)
		}, R_.prototype.inspect = function() {
			return "<Key priv: " + (this.priv && this.priv.toString(16, 2)) + " pub: " + (this.pub && this.pub
				.inspect()) + " >"
		}), S_
	}
	var C_, I_, D_, P_ = !1;

	function O_(t, e) {
		if (t instanceof O_) return t;
		this._importDER(t, e) || (D_(t.r && t.s, "Signature without r or s"), this.r = new I_(t.r, 16), this.s = new I_(
				t.s, 16), void 0 === t.recoveryParam ? this.recoveryParam = null : this.recoveryParam = t
			.recoveryParam)
	}

	function L_() {
		this.place = 0
	}

	function U_(t, e) {
		var r = t[e.place++];
		if (!(128 & r)) return r;
		var n = 15 & r;
		if (0 === n || n > 4) return !1;
		for (var i = 0, o = 0, a = e.place; o < n; o++, a++) i <<= 8, i |= t[a], i >>>= 0;
		return !(i <= 127) && (e.place = a, i)
	}

	function j_(t) {
		for (var e = 0, r = t.length - 1; !t[e] && !(128 & t[e + 1]) && e < r;) e++;
		return 0 === e ? t : t.slice(e)
	}

	function N_(t, e) {
		if (e < 128) t.push(e);
		else {
			var r = 1 + (Math.log(e) / Math.LN2 >>> 3);
			for (t.push(128 | r); --r;) t.push(e >>> (r << 3) & 255);
			t.push(e)
		}
	}

	function z_() {
		return P_ || (P_ = !0, C_ = {}, I_ = pm(), og(), D_ = og().assert, C_ = O_, O_.prototype._importDER = function(
			t, e) {
			t = og().toArray(t, e);
			var r = new L_;
			if (48 !== t[r.place++]) return !1;
			var n = U_(t, r);
			if (!1 === n) return !1;
			if (n + r.place !== t.length) return !1;
			if (2 !== t[r.place++]) return !1;
			var i = U_(t, r);
			if (!1 === i) return !1;
			var o = t.slice(r.place, i + r.place);
			if (r.place += i, 2 !== t[r.place++]) return !1;
			var a = U_(t, r);
			if (!1 === a) return !1;
			if (t.length !== a + r.place) return !1;
			var s = t.slice(r.place, a + r.place);
			if (0 === o[0]) {
				if (!(128 & o[1])) return !1;
				o = o.slice(1)
			}
			if (0 === s[0]) {
				if (!(128 & s[1])) return !1;
				s = s.slice(1)
			}
			return this.r = new I_(o), this.s = new I_(s), this.recoveryParam = null, !0
		}, O_.prototype.toDER = function(t) {
			var e = this.r.toArray(),
				r = this.s.toArray();
			for (128 & e[0] && (e = [0].concat(e)), 128 & r[0] && (r = [0].concat(r)), e = j_(e), r = j_(r); !(
					r[0] || 128 & r[1]);) r = r.slice(1);
			var n = [2];
			N_(n, e.length), (n = n.concat(e)).push(2), N_(n, r.length);
			var i = n.concat(r),
				o = [48];
			return N_(o, i.length), o = o.concat(i), og().encode(o, t)
		}), C_
	}
	var F_, q_, H_, W_, G_, Y_, K_, V_, Z_ = !1;

	function $_(t) {
		if (!(this instanceof $_)) return new $_(t);
		"string" == typeof t && (Y_(Object.prototype.hasOwnProperty.call(W_, t), "Unknown curve " + t), t = W_[t]),
			t instanceof W_.PresetCurve && (t = {
				curve: t
			}), this.curve = t.curve.curve, this.n = this.curve.n, this.nh = this.n.ushrn(1), this.g = this.curve.g,
			this.g = t.curve.g, this.g.precompute(t.curve.n.bitLength() + 1), this.hash = t.hash || t.curve.hash
	}

	function X_() {
		return Z_ || (Z_ = !0, F_ = {}, q_ = pm(), H_ = E_(), og(), W_ = y_(), G_ = wm(), Y_ = og().assert, K_ = x_(),
			V_ = z_(), F_ = $_, $_.prototype.keyPair = function(t) {
				return new K_(this, t)
			}, $_.prototype.keyFromPrivate = function(t, e) {
				return K_.fromPrivate(this, t, e)
			}, $_.prototype.keyFromPublic = function(t, e) {
				return K_.fromPublic(this, t, e)
			}, $_.prototype.genKeyPair = function(t) {
				t || (t = {});
				for (var e = new H_({
						hash: this.hash,
						pers: t.pers,
						persEnc: t.persEnc || "utf8",
						entropy: t.entropy || G_(this.hash.hmacStrength),
						entropyEnc: t.entropy && t.entropyEnc || "utf8",
						nonce: this.n.toArray()
					}), r = this.n.byteLength(), n = this.n.sub(new q_(2));;) {
					var i = new q_(e.generate(r));
					if (!(i.cmp(n) > 0)) return i.iaddn(1), this.keyFromPrivate(i)
				}
			}, $_.prototype._truncateToN = function(t, e) {
				var r = 8 * t.byteLength() - this.n.bitLength();
				return r > 0 && (t = t.ushrn(r)), !e && t.cmp(this.n) >= 0 ? t.sub(this.n) : t
			}, $_.prototype.sign = function(t, e, r, n) {
				"object" == typeof r && (n = r, r = null), n || (n = {}), e = this.keyFromPrivate(e, r), t = this
					._truncateToN(new q_(t, 16));
				for (var i = this.n.byteLength(), o = e.getPrivate().toArray("be", i), a = t.toArray("be", i), s =
						new H_({
							hash: this.hash,
							entropy: o,
							nonce: a,
							pers: n.pers,
							persEnc: n.persEnc || "utf8"
						}), f = this.n.sub(new q_(1)), u = 0;; u++) {
					var h = n.k ? n.k(u) : new q_(s.generate(this.n.byteLength()));
					if (!((h = this._truncateToN(h, !0)).cmpn(1) <= 0 || h.cmp(f) >= 0)) {
						var c = this.g.mul(h);
						if (!c.isInfinity()) {
							var d = c.getX(),
								l = d.umod(this.n);
							if (0 !== l.cmpn(0)) {
								var p = h.invm(this.n).mul(l.mul(e.getPrivate()).iadd(t));
								if (0 !== (p = p.umod(this.n)).cmpn(0)) {
									var m = (c.getY().isOdd() ? 1 : 0) | (0 !== d.cmp(l) ? 2 : 0);
									return n.canonical && p.cmp(this.nh) > 0 && (p = this.n.sub(p), m ^= 1),
								new V_({
										r: l,
										s: p,
										recoveryParam: m
									})
								}
							}
						}
					}
				}
			}, $_.prototype.verify = function(t, e, r, n) {
				t = this._truncateToN(new q_(t, 16)), r = this.keyFromPublic(r, n);
				var i = (e = new V_(e, "hex")).r,
					o = e.s;
				if (i.cmpn(1) < 0 || i.cmp(this.n) >= 0) return !1;
				if (o.cmpn(1) < 0 || o.cmp(this.n) >= 0) return !1;
				var a, s = o.invm(this.n),
					f = s.mul(t).umod(this.n),
					u = s.mul(i).umod(this.n);
				return this.curve._maxwellTrick ? !(a = this.g.jmulAdd(f, r.getPublic(), u)).isInfinity() && a
					.eqXToP(i) : !(a = this.g.mulAdd(f, r.getPublic(), u)).isInfinity() && 0 === a.getX().umod(this
						.n).cmp(i)
			}, $_.prototype.recoverPubKey = function(t, e, r, n) {
				Y_((3 & r) === r, "The recovery param is more than two bits"), e = new V_(e, n);
				var i = this.n,
					o = new q_(t),
					a = e.r,
					s = e.s,
					f = 1 & r,
					u = r >> 1;
				if (a.cmp(this.curve.p.umod(this.curve.n)) >= 0 && u) throw new Error(
					"Unable to find sencond key candinate");
				a = u ? this.curve.pointFromX(a.add(this.curve.n), f) : this.curve.pointFromX(a, f);
				var h = e.r.invm(i),
					c = i.sub(o).mul(h).umod(i),
					d = s.mul(h).umod(i);
				return this.g.mulAdd(c, a, d)
			}, $_.prototype.getKeyRecoveryParam = function(t, e, r, n) {
				if (null !== (e = new V_(e, n)).recoveryParam) return e.recoveryParam;
				for (var i = 0; i < 4; i++) {
					var o;
					try {
						o = this.recoverPubKey(t, e, i)
					} catch (t) {
						continue
					}
					if (o.eq(r)) return i
				}
				throw new Error("Unable to find valid recovery factor")
			}), F_
	}
	var J_, Q_, tA, eA, rA = !1;

	function nA(t, e) {
		this.eddsa = t, this._secret = tA(e.secret), t.isPoint(e.pub) ? this._pub = e.pub : this._pubBytes = tA(e.pub)
	}

	function iA() {
		return rA || (rA = !0, J_ = {}, og(), Q_ = og().assert, tA = og().parseBytes, eA = og().cachedProperty, nA
			.fromPublic = function(t, e) {
				return e instanceof nA ? e : new nA(t, {
					pub: e
				})
			}, nA.fromSecret = function(t, e) {
				return e instanceof nA ? e : new nA(t, {
					secret: e
				})
			}, nA.prototype.secret = function() {
				return this._secret
			}, eA(nA, "pubBytes", (function() {
				return this.eddsa.encodePoint(this.pub())
			})), eA(nA, "pub", (function() {
				return this._pubBytes ? this.eddsa.decodePoint(this._pubBytes) : this.eddsa.g.mul(this
				.priv())
			})), eA(nA, "privBytes", (function() {
				var t = this.eddsa,
					e = this.hash(),
					r = t.encodingLength - 1,
					n = e.slice(0, t.encodingLength);
				return n[0] &= 248, n[r] &= 127, n[r] |= 64, n
			})), eA(nA, "priv", (function() {
				return this.eddsa.decodeInt(this.privBytes())
			})), eA(nA, "hash", (function() {
				return this.eddsa.hash().update(this.secret()).digest()
			})), eA(nA, "messagePrefix", (function() {
				return this.hash().slice(this.eddsa.encodingLength)
			})), nA.prototype.sign = function(t) {
				return Q_(this._secret, "KeyPair can only verify"), this.eddsa.sign(t, this)
			}, nA.prototype.verify = function(t, e) {
				return this.eddsa.verify(t, e, this)
			}, nA.prototype.getSecret = function(t) {
				return Q_(this._secret, "KeyPair is public only"), og().encode(this.secret(), t)
			}, nA.prototype.getPublic = function(t) {
				return og().encode(this.pubBytes(), t)
			}, J_ = nA), J_
	}
	var oA, aA, sA, fA, uA, hA = !1;

	function cA(t, e) {
		this.eddsa = t, "object" != typeof e && (e = uA(e)), Array.isArray(e) && (e = {
			R: e.slice(0, t.encodingLength),
			S: e.slice(t.encodingLength)
		}), sA(e.R && e.S, "Signature without R or S"), t.isPoint(e.R) && (this._R = e.R), e.S instanceof aA && (
			this._S = e.S), this._Rencoded = Array.isArray(e.R) ? e.R : e.Rencoded, this._Sencoded = Array.isArray(e
			.S) ? e.S : e.Sencoded
	}

	function dA() {
		return hA || (hA = !0, oA = {}, aA = pm(), og(), sA = og().assert, fA = og().cachedProperty, uA = og()
			.parseBytes, fA(cA, "S", (function() {
				return this.eddsa.decodeInt(this.Sencoded())
			})), fA(cA, "R", (function() {
				return this.eddsa.decodePoint(this.Rencoded())
			})), fA(cA, "Rencoded", (function() {
				return this.eddsa.encodePoint(this.R())
			})), fA(cA, "Sencoded", (function() {
				return this.eddsa.encodeInt(this.S())
			})), cA.prototype.toBytes = function() {
				return this.Rencoded().concat(this.Sencoded())
			}, cA.prototype.toHex = function() {
				return og().encode(this.toBytes(), "hex").toUpperCase()
			}, oA = cA), oA
	}
	var lA, pA, mA, bA, gA, vA = !1;

	function yA(t) {
		if (mA("ed25519" === t, "only tested with ed25519 so far"), !(this instanceof yA)) return new yA(t);
		t = pA[t].curve, this.curve = t, this.g = t.g, this.g.precompute(t.n.bitLength() + 1), this.pointClass = t
			.point().constructor, this.encodingLength = Math.ceil(t.n.bitLength() / 8), this.hash = f_().sha512
	}

	function wA() {
		return vA || (vA = !0, lA = {}, f_(), pA = y_(), og(), mA = og().assert, bA = og().parseBytes, iA(), gA = dA(),
			lA = yA, yA.prototype.sign = function(t, e) {
				t = bA(t);
				var r = this.keyFromSecret(e),
					n = this.hashInt(r.messagePrefix(), t),
					i = this.g.mul(n),
					o = this.encodePoint(i),
					a = this.hashInt(o, r.pubBytes(), t).mul(r.priv()),
					s = n.add(a).umod(this.curve.n);
				return this.makeSignature({
					R: i,
					S: s,
					Rencoded: o
				})
			}, yA.prototype.verify = function(t, e, r) {
				t = bA(t), e = this.makeSignature(e);
				var n = this.keyFromPublic(r),
					i = this.hashInt(e.Rencoded(), n.pubBytes(), t),
					o = this.g.mul(e.S());
				return e.R().add(n.pub().mul(i)).eq(o)
			}, yA.prototype.hashInt = function() {
				for (var t = this.hash(), e = 0; e < arguments.length; e++) t.update(arguments[e]);
				return og().intFromLE(t.digest()).umod(this.curve.n)
			}, yA.prototype.keyFromPublic = function(t) {
				return iA().fromPublic(this, t)
			}, yA.prototype.keyFromSecret = function(t) {
				return iA().fromSecret(this, t)
			}, yA.prototype.makeSignature = function(t) {
				return t instanceof gA ? t : new gA(this, t)
			}, yA.prototype.encodePoint = function(t) {
				var e = t.getY().toArray("le", this.encodingLength);
				return e[this.encodingLength - 1] |= t.getX().isOdd() ? 128 : 0, e
			}, yA.prototype.decodePoint = function(t) {
				var e = (t = og().parseBytes(t)).length - 1,
					r = t.slice(0, e).concat(-129 & t[e]),
					n = 0 != (128 & t[e]),
					i = og().intFromLE(r);
				return this.curve.pointFromY(i, n)
			}, yA.prototype.encodeInt = function(t) {
				return t.toArray("le", this.encodingLength)
			}, yA.prototype.decodeInt = function(t) {
				return og().intFromLE(t)
			}, yA.prototype.isPoint = function(t) {
				return t instanceof this.pointClass
			}), lA
	}
	var _A, AA, MA = !1;

	function EA() {
		return MA || (MA = !0, (AA = _A = {}).version = Fb().version, AA.utils = og(), AA.rand = wm(), AA.curve = Gg(),
			AA.curves = y_(), AA.ec = X_(), AA.eddsa = wA()), _A
	}
	var SA, kA = !1;

	function BA() {
		SA = function() {
			var t = {
				exports: this
			};
			return function(t, e) {
				function r(t, e) {
					if (!t) throw new Error(e || "Assertion failed")
				}

				function n(t, e) {
					t.super_ = e;
					var r = function() {};
					r.prototype = e.prototype, t.prototype = new r, t.prototype.constructor = t
				}

				function i(t, e, r) {
					if (i.isBN(t)) return t;
					this.negative = 0, this.words = null, this.length = 0, this.red = null, null !== t && (
						"le" !== e && "be" !== e || (r = e, e = 10), this._init(t || 0, e || 10, r || "be"))
				}
				var o;
				"object" == typeof t ? t.exports = i : e.BN = i, i.BN = i, i.wordSize = 26;
				try {
					o = "undefined" != typeof window && void 0 !== window.Buffer ? window.Buffer : nr().Buffer
				} catch (t) {}

				function a(t, e) {
					var n = t.charCodeAt(e);
					return n >= 48 && n <= 57 ? n - 48 : n >= 65 && n <= 70 ? n - 55 : n >= 97 && n <= 102 ? n -
						87 : void r(!1, "Invalid character in " + t)
				}

				function s(t, e, r) {
					var n = a(t, r);
					return r - 1 >= e && (n |= a(t, r - 1) << 4), n
				}

				function f(t, e, n, i) {
					for (var o = 0, a = 0, s = Math.min(t.length, n), f = e; f < s; f++) {
						var u = t.charCodeAt(f) - 48;
						o *= i, a = u >= 49 ? u - 49 + 10 : u >= 17 ? u - 17 + 10 : u, r(u >= 0 && a < i,
							"Invalid character"), o += a
					}
					return o
				}

				function u(t, e) {
					t.words = e.words, t.length = e.length, t.negative = e.negative, t.red = e.red
				}
				if (i.isBN = function(t) {
						return t instanceof i || null !== t && "object" == typeof t && t.constructor
							.wordSize === i.wordSize && Array.isArray(t.words)
					}, i.max = function(t, e) {
						return t.cmp(e) > 0 ? t : e
					}, i.min = function(t, e) {
						return t.cmp(e) < 0 ? t : e
					}, i.prototype._init = function(t, e, n) {
						if ("number" == typeof t) return this._initNumber(t, e, n);
						if ("object" == typeof t) return this._initArray(t, e, n);
						"hex" === e && (e = 16), r(e === (0 | e) && e >= 2 && e <= 36);
						var i = 0;
						"-" === (t = t.toString().replace(/\s+/g, ""))[0] && (i++, this.negative = 1), i < t
							.length && (16 === e ? this._parseHex(t, i, n) : (this._parseBase(t, e, i), "le" ===
								n && this._initArray(this.toArray(), e, n)))
					}, i.prototype._initNumber = function(t, e, n) {
						t < 0 && (this.negative = 1, t = -t), t < 67108864 ? (this.words = [67108863 & t], this
							.length = 1) : t < 4503599627370496 ? (this.words = [67108863 & t, t /
							67108864 & 67108863
						], this.length = 2) : (r(t < 9007199254740992), this.words = [67108863 & t, t /
							67108864 & 67108863, 1
						], this.length = 3), "le" === n && this._initArray(this.toArray(), e, n)
					}, i.prototype._initArray = function(t, e, n) {
						if (r("number" == typeof t.length), t.length <= 0) return this.words = [0], this
							.length = 1, this;
						this.length = Math.ceil(t.length / 3), this.words = new Array(this.length);
						for (var i = 0; i < this.length; i++) this.words[i] = 0;
						var o, a, s = 0;
						if ("be" === n)
							for (i = t.length - 1, o = 0; i >= 0; i -= 3) a = t[i] | t[i - 1] << 8 | t[i - 2] <<
								16, this.words[o] |= a << s & 67108863, this.words[o + 1] = a >>> 26 - s &
								67108863, (s += 24) >= 26 && (s -= 26, o++);
						else if ("le" === n)
							for (i = 0, o = 0; i < t.length; i += 3) a = t[i] | t[i + 1] << 8 | t[i + 2] << 16,
								this.words[o] |= a << s & 67108863, this.words[o + 1] = a >>> 26 - s & 67108863,
								(s += 24) >= 26 && (s -= 26, o++);
						return this._strip()
					}, i.prototype._parseHex = function(t, e, r) {
						this.length = Math.ceil((t.length - e) / 6), this.words = new Array(this.length);
						for (var n = 0; n < this.length; n++) this.words[n] = 0;
						var i, o = 0,
							a = 0;
						if ("be" === r)
							for (n = t.length - 1; n >= e; n -= 2) i = s(t, e, n) << o, this.words[a] |=
								67108863 & i, o >= 18 ? (o -= 18, a += 1, this.words[a] |= i >>> 26) : o += 8;
						else
							for (n = (t.length - e) % 2 == 0 ? e + 1 : e; n < t.length; n += 2) i = s(t, e,
								n) << o, this.words[a] |= 67108863 & i, o >= 18 ? (o -= 18, a += 1, this.words[
									a] |= i >>> 26) : o += 8;
						this._strip()
					}, i.prototype._parseBase = function(t, e, r) {
						this.words = [0], this.length = 1;
						for (var n = 0, i = 1; i <= 67108863; i *= e) n++;
						n--, i = i / e | 0;
						for (var o = t.length - r, a = o % n, s = Math.min(o, o - a) + r, u = 0, h = r; h <
							s; h += n) u = f(t, h, h + n, e), this.imuln(i), this.words[0] + u < 67108864 ? this
							.words[0] += u : this._iaddn(u);
						if (0 !== a) {
							var c = 1;
							for (u = f(t, h, t.length, e), h = 0; h < a; h++) c *= e;
							this.imuln(c), this.words[0] + u < 67108864 ? this.words[0] += u : this._iaddn(u)
						}
						this._strip()
					}, i.prototype.copy = function(t) {
						t.words = new Array(this.length);
						for (var e = 0; e < this.length; e++) t.words[e] = this.words[e];
						t.length = this.length, t.negative = this.negative, t.red = this.red
					}, i.prototype._move = function(t) {
						u(t, this)
					}, i.prototype.clone = function() {
						var t = new i(null);
						return this.copy(t), t
					}, i.prototype._expand = function(t) {
						for (; this.length < t;) this.words[this.length++] = 0;
						return this
					}, i.prototype._strip = function() {
						for (; this.length > 1 && 0 === this.words[this.length - 1];) this.length--;
						return this._normSign()
					}, i.prototype._normSign = function() {
						return 1 === this.length && 0 === this.words[0] && (this.negative = 0), this
					}, "undefined" != typeof Symbol && "function" == typeof Symbol.for) try {
					i.prototype[Symbol.for("nodejs.util.inspect.custom")] = h
				} catch (t) {
					i.prototype.inspect = h
				} else i.prototype.inspect = h;

				function h() {
					return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">"
				}
				var c = ["", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000",
						"0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000",
						"000000000000000", "0000000000000000", "00000000000000000", "000000000000000000",
						"0000000000000000000", "00000000000000000000", "000000000000000000000",
						"0000000000000000000000", "00000000000000000000000", "000000000000000000000000",
						"0000000000000000000000000"
					],
					d = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5,
						5, 5, 5, 5, 5, 5, 5, 5, 5, 5
					],
					l = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721,
						1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224,
						47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907,
						17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176
					];
				i.prototype.toString = function(t, e) {
					var n;
					if (e = 0 | e || 1, 16 === (t = t || 10) || "hex" === t) {
						n = "";
						for (var i = 0, o = 0, a = 0; a < this.length; a++) {
							var s = this.words[a],
								f = (16777215 & (s << i | o)).toString(16);
							n = 0 !== (o = s >>> 24 - i & 16777215) || a !== this.length - 1 ? c[6 - f
								.length] + f + n : f + n, (i += 2) >= 26 && (i -= 26, a--)
						}
						for (0 !== o && (n = o.toString(16) + n); n.length % e != 0;) n = "0" + n;
						return 0 !== this.negative && (n = "-" + n), n
					}
					if (t === (0 | t) && t >= 2 && t <= 36) {
						var u = d[t],
							h = l[t];
						n = "";
						var p = this.clone();
						for (p.negative = 0; !p.isZero();) {
							var m = p.modrn(h).toString(t);
							n = (p = p.idivn(h)).isZero() ? m + n : c[u - m.length] + m + n
						}
						for (this.isZero() && (n = "0" + n); n.length % e != 0;) n = "0" + n;
						return 0 !== this.negative && (n = "-" + n), n
					}
					r(!1, "Base should be between 2 and 36")
				}, i.prototype.toNumber = function() {
					var t = this.words[0];
					return 2 === this.length ? t += 67108864 * this.words[1] : 3 === this.length && 1 ===
						this.words[2] ? t += 4503599627370496 + 67108864 * this.words[1] : this.length >
						2 && r(!1, "Number can only safely store up to 53 bits"), 0 !== this.negative ? -t :
						t
				}, i.prototype.toJSON = function() {
					return this.toString(16, 2)
				}, o && (i.prototype.toBuffer = function(t, e) {
					return this.toArrayLike(o, t, e)
				}), i.prototype.toArray = function(t, e) {
					return this.toArrayLike(Array, t, e)
				};

				function p(t, e, r) {
					r.negative = e.negative ^ t.negative;
					var n = t.length + e.length | 0;
					r.length = n, n = n - 1 | 0;
					var i = 0 | t.words[0],
						o = 0 | e.words[0],
						a = i * o,
						s = 67108863 & a,
						f = a / 67108864 | 0;
					r.words[0] = s;
					for (var u = 1; u < n; u++) {
						for (var h = f >>> 26, c = 67108863 & f, d = Math.min(u, e.length - 1), l = Math.max(0,
								u - t.length + 1); l <= d; l++) {
							var p = u - l | 0;
							h += (a = (i = 0 | t.words[p]) * (o = 0 | e.words[l]) + c) / 67108864 | 0, c =
								67108863 & a
						}
						r.words[u] = 0 | c, f = 0 | h
					}
					return 0 !== f ? r.words[u] = 0 | f : r.length--, r._strip()
				}
				i.prototype.toArrayLike = function(t, e, n) {
					this._strip();
					var i = this.byteLength(),
						o = n || Math.max(1, i);
					r(i <= o, "byte array longer than desired length"), r(o > 0,
						"Requested array length <= 0");
					var a = function(t, e) {
						return t.allocUnsafe ? t.allocUnsafe(e) : new t(e)
					}(t, o);
					return this["_toArrayLike" + ("le" === e ? "LE" : "BE")](a, i), a
				}, i.prototype._toArrayLikeLE = function(t, e) {
					for (var r = 0, n = 0, i = 0, o = 0; i < this.length; i++) {
						var a = this.words[i] << o | n;
						t[r++] = 255 & a, r < t.length && (t[r++] = a >> 8 & 255), r < t.length && (t[r++] =
							a >> 16 & 255), 6 === o ? (r < t.length && (t[r++] = a >> 24 & 255), n = 0,
							o = 0) : (n = a >>> 24, o += 2)
					}
					if (r < t.length)
						for (t[r++] = n; r < t.length;) t[r++] = 0
				}, i.prototype._toArrayLikeBE = function(t, e) {
					for (var r = t.length - 1, n = 0, i = 0, o = 0; i < this.length; i++) {
						var a = this.words[i] << o | n;
						t[r--] = 255 & a, r >= 0 && (t[r--] = a >> 8 & 255), r >= 0 && (t[r--] = a >> 16 &
							255), 6 === o ? (r >= 0 && (t[r--] = a >> 24 & 255), n = 0, o = 0) : (n =
							a >>> 24, o += 2)
					}
					if (r >= 0)
						for (t[r--] = n; r >= 0;) t[r--] = 0
				}, Math.clz32 ? i.prototype._countBits = function(t) {
					return 32 - Math.clz32(t)
				} : i.prototype._countBits = function(t) {
					var e = t,
						r = 0;
					return e >= 4096 && (r += 13, e >>>= 13), e >= 64 && (r += 7, e >>>= 7), e >= 8 && (r +=
						4, e >>>= 4), e >= 2 && (r += 2, e >>>= 2), r + e
				}, i.prototype._zeroBits = function(t) {
					if (0 === t) return 26;
					var e = t,
						r = 0;
					return 0 == (8191 & e) && (r += 13, e >>>= 13), 0 == (127 & e) && (r += 7, e >>>= 7),
						0 == (15 & e) && (r += 4, e >>>= 4), 0 == (3 & e) && (r += 2, e >>>= 2), 0 == (1 &
							e) && r++, r
				}, i.prototype.bitLength = function() {
					var t = this.words[this.length - 1],
						e = this._countBits(t);
					return 26 * (this.length - 1) + e
				}, i.prototype.zeroBits = function() {
					if (this.isZero()) return 0;
					for (var t = 0, e = 0; e < this.length; e++) {
						var r = this._zeroBits(this.words[e]);
						if (t += r, 26 !== r) break
					}
					return t
				}, i.prototype.byteLength = function() {
					return Math.ceil(this.bitLength() / 8)
				}, i.prototype.toTwos = function(t) {
					return 0 !== this.negative ? this.abs().inotn(t).iaddn(1) : this.clone()
				}, i.prototype.fromTwos = function(t) {
					return this.testn(t - 1) ? this.notn(t).iaddn(1).ineg() : this.clone()
				}, i.prototype.isNeg = function() {
					return 0 !== this.negative
				}, i.prototype.neg = function() {
					return this.clone().ineg()
				}, i.prototype.ineg = function() {
					return this.isZero() || (this.negative ^= 1), this
				}, i.prototype.iuor = function(t) {
					for (; this.length < t.length;) this.words[this.length++] = 0;
					for (var e = 0; e < t.length; e++) this.words[e] = this.words[e] | t.words[e];
					return this._strip()
				}, i.prototype.ior = function(t) {
					return r(0 == (this.negative | t.negative)), this.iuor(t)
				}, i.prototype.or = function(t) {
					return this.length > t.length ? this.clone().ior(t) : t.clone().ior(this)
				}, i.prototype.uor = function(t) {
					return this.length > t.length ? this.clone().iuor(t) : t.clone().iuor(this)
				}, i.prototype.iuand = function(t) {
					var e;
					e = this.length > t.length ? t : this;
					for (var r = 0; r < e.length; r++) this.words[r] = this.words[r] & t.words[r];
					return this.length = e.length, this._strip()
				}, i.prototype.iand = function(t) {
					return r(0 == (this.negative | t.negative)), this.iuand(t)
				}, i.prototype.and = function(t) {
					return this.length > t.length ? this.clone().iand(t) : t.clone().iand(this)
				}, i.prototype.uand = function(t) {
					return this.length > t.length ? this.clone().iuand(t) : t.clone().iuand(this)
				}, i.prototype.iuxor = function(t) {
					var e, r;
					this.length > t.length ? (e = this, r = t) : (e = t, r = this);
					for (var n = 0; n < r.length; n++) this.words[n] = e.words[n] ^ r.words[n];
					if (this !== e)
						for (; n < e.length; n++) this.words[n] = e.words[n];
					return this.length = e.length, this._strip()
				}, i.prototype.ixor = function(t) {
					return r(0 == (this.negative | t.negative)), this.iuxor(t)
				}, i.prototype.xor = function(t) {
					return this.length > t.length ? this.clone().ixor(t) : t.clone().ixor(this)
				}, i.prototype.uxor = function(t) {
					return this.length > t.length ? this.clone().iuxor(t) : t.clone().iuxor(this)
				}, i.prototype.inotn = function(t) {
					r("number" == typeof t && t >= 0);
					var e = 0 | Math.ceil(t / 26),
						n = t % 26;
					this._expand(e), n > 0 && e--;
					for (var i = 0; i < e; i++) this.words[i] = 67108863 & ~this.words[i];
					return n > 0 && (this.words[i] = ~this.words[i] & 67108863 >> 26 - n), this._strip()
				}, i.prototype.notn = function(t) {
					return this.clone().inotn(t)
				}, i.prototype.setn = function(t, e) {
					r("number" == typeof t && t >= 0);
					var n = t / 26 | 0,
						i = t % 26;
					return this._expand(n + 1), this.words[n] = e ? this.words[n] | 1 << i : this.words[n] &
						~(1 << i), this._strip()
				}, i.prototype.iadd = function(t) {
					var e, r, n;
					if (0 !== this.negative && 0 === t.negative) return this.negative = 0, e = this.isub(t),
						this.negative ^= 1, this._normSign();
					if (0 === this.negative && 0 !== t.negative) return t.negative = 0, e = this.isub(t), t
						.negative = 1, e._normSign();
					this.length > t.length ? (r = this, n = t) : (r = t, n = this);
					for (var i = 0, o = 0; o < n.length; o++) e = (0 | r.words[o]) + (0 | n.words[o]) + i,
						this.words[o] = 67108863 & e, i = e >>> 26;
					for (; 0 !== i && o < r.length; o++) e = (0 | r.words[o]) + i, this.words[o] =
						67108863 & e, i = e >>> 26;
					if (this.length = r.length, 0 !== i) this.words[this.length] = i, this.length++;
					else if (r !== this)
						for (; o < r.length; o++) this.words[o] = r.words[o];
					return this
				}, i.prototype.add = function(t) {
					var e;
					return 0 !== t.negative && 0 === this.negative ? (t.negative = 0, e = this.sub(t), t
						.negative ^= 1, e) : 0 === t.negative && 0 !== this.negative ? (this.negative =
						0, e = t.sub(this), this.negative = 1, e) : this.length > t.length ? this
					.clone().iadd(t) : t.clone().iadd(this)
				}, i.prototype.isub = function(t) {
					if (0 !== t.negative) {
						t.negative = 0;
						var e = this.iadd(t);
						return t.negative = 1, e._normSign()
					}
					if (0 !== this.negative) return this.negative = 0, this.iadd(t), this.negative = 1, this
						._normSign();
					var r, n, i = this.cmp(t);
					if (0 === i) return this.negative = 0, this.length = 1, this.words[0] = 0, this;
					i > 0 ? (r = this, n = t) : (r = t, n = this);
					for (var o = 0, a = 0; a < n.length; a++) o = (e = (0 | r.words[a]) - (0 | n.words[a]) +
						o) >> 26, this.words[a] = 67108863 & e;
					for (; 0 !== o && a < r.length; a++) o = (e = (0 | r.words[a]) + o) >> 26, this.words[
						a] = 67108863 & e;
					if (0 === o && a < r.length && r !== this)
						for (; a < r.length; a++) this.words[a] = r.words[a];
					return this.length = Math.max(this.length, a), r !== this && (this.negative = 1), this
						._strip()
				}, i.prototype.sub = function(t) {
					return this.clone().isub(t)
				};
				var m = function(t, e, r) {
					var n, i, o, a = t.words,
						s = e.words,
						f = r.words,
						u = 0,
						h = 0 | a[0],
						c = 8191 & h,
						d = h >>> 13,
						l = 0 | a[1],
						p = 8191 & l,
						m = l >>> 13,
						b = 0 | a[2],
						g = 8191 & b,
						v = b >>> 13,
						y = 0 | a[3],
						w = 8191 & y,
						_ = y >>> 13,
						A = 0 | a[4],
						M = 8191 & A,
						E = A >>> 13,
						S = 0 | a[5],
						k = 8191 & S,
						B = S >>> 13,
						T = 0 | a[6],
						R = 8191 & T,
						x = T >>> 13,
						C = 0 | a[7],
						I = 8191 & C,
						D = C >>> 13,
						P = 0 | a[8],
						O = 8191 & P,
						L = P >>> 13,
						U = 0 | a[9],
						j = 8191 & U,
						N = U >>> 13,
						z = 0 | s[0],
						F = 8191 & z,
						q = z >>> 13,
						H = 0 | s[1],
						W = 8191 & H,
						G = H >>> 13,
						Y = 0 | s[2],
						K = 8191 & Y,
						V = Y >>> 13,
						Z = 0 | s[3],
						$ = 8191 & Z,
						X = Z >>> 13,
						J = 0 | s[4],
						Q = 8191 & J,
						tt = J >>> 13,
						et = 0 | s[5],
						rt = 8191 & et,
						nt = et >>> 13,
						it = 0 | s[6],
						ot = 8191 & it,
						at = it >>> 13,
						st = 0 | s[7],
						ft = 8191 & st,
						ut = st >>> 13,
						ht = 0 | s[8],
						ct = 8191 & ht,
						dt = ht >>> 13,
						lt = 0 | s[9],
						pt = 8191 & lt,
						mt = lt >>> 13;
					r.negative = t.negative ^ e.negative, r.length = 19;
					var bt = (u + (n = Math.imul(c, F)) | 0) + ((8191 & (i = (i = Math.imul(c, q)) + Math
						.imul(d, F) | 0)) << 13) | 0;
					u = ((o = Math.imul(d, q)) + (i >>> 13) | 0) + (bt >>> 26) | 0, bt &= 67108863, n = Math
						.imul(p, F), i = (i = Math.imul(p, q)) + Math.imul(m, F) | 0, o = Math.imul(m, q);
					var gt = (u + (n = n + Math.imul(c, W) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(c,
						G) | 0) + Math.imul(d, W) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(d, G) | 0) + (i >>> 13) | 0) + (gt >>> 26) | 0, gt &= 67108863,
						n = Math.imul(g, F), i = (i = Math.imul(g, q)) + Math.imul(v, F) | 0, o = Math.imul(
							v, q), n = n + Math.imul(p, W) | 0, i = (i = i + Math.imul(p, G) | 0) + Math
						.imul(m, W) | 0, o = o + Math.imul(m, G) | 0;
					var vt = (u + (n = n + Math.imul(c, K) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(c,
						V) | 0) + Math.imul(d, K) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(d, V) | 0) + (i >>> 13) | 0) + (vt >>> 26) | 0, vt &= 67108863,
						n = Math.imul(w, F), i = (i = Math.imul(w, q)) + Math.imul(_, F) | 0, o = Math.imul(
							_, q), n = n + Math.imul(g, W) | 0, i = (i = i + Math.imul(g, G) | 0) + Math
						.imul(v, W) | 0, o = o + Math.imul(v, G) | 0, n = n + Math.imul(p, K) | 0, i = (i =
							i + Math.imul(p, V) | 0) + Math.imul(m, K) | 0, o = o + Math.imul(m, V) | 0;
					var yt = (u + (n = n + Math.imul(c, $) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(c,
						X) | 0) + Math.imul(d, $) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(d, X) | 0) + (i >>> 13) | 0) + (yt >>> 26) | 0, yt &= 67108863,
						n = Math.imul(M, F), i = (i = Math.imul(M, q)) + Math.imul(E, F) | 0, o = Math.imul(
							E, q), n = n + Math.imul(w, W) | 0, i = (i = i + Math.imul(w, G) | 0) + Math
						.imul(_, W) | 0, o = o + Math.imul(_, G) | 0, n = n + Math.imul(g, K) | 0, i = (i =
							i + Math.imul(g, V) | 0) + Math.imul(v, K) | 0, o = o + Math.imul(v, V) | 0, n =
						n + Math.imul(p, $) | 0, i = (i = i + Math.imul(p, X) | 0) + Math.imul(m, $) | 0,
						o = o + Math.imul(m, X) | 0;
					var wt = (u + (n = n + Math.imul(c, Q) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(c,
						tt) | 0) + Math.imul(d, Q) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(d, tt) | 0) + (i >>> 13) | 0) + (wt >>> 26) | 0, wt &= 67108863,
						n = Math.imul(k, F), i = (i = Math.imul(k, q)) + Math.imul(B, F) | 0, o = Math.imul(
							B, q), n = n + Math.imul(M, W) | 0, i = (i = i + Math.imul(M, G) | 0) + Math
						.imul(E, W) | 0, o = o + Math.imul(E, G) | 0, n = n + Math.imul(w, K) | 0, i = (i =
							i + Math.imul(w, V) | 0) + Math.imul(_, K) | 0, o = o + Math.imul(_, V) | 0, n =
						n + Math.imul(g, $) | 0, i = (i = i + Math.imul(g, X) | 0) + Math.imul(v, $) | 0,
						o = o + Math.imul(v, X) | 0, n = n + Math.imul(p, Q) | 0, i = (i = i + Math.imul(p,
							tt) | 0) + Math.imul(m, Q) | 0, o = o + Math.imul(m, tt) | 0;
					var _t = (u + (n = n + Math.imul(c, rt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(c,
						nt) | 0) + Math.imul(d, rt) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(d, nt) | 0) + (i >>> 13) | 0) + (_t >>> 26) | 0, _t &= 67108863,
						n = Math.imul(R, F), i = (i = Math.imul(R, q)) + Math.imul(x, F) | 0, o = Math.imul(
							x, q), n = n + Math.imul(k, W) | 0, i = (i = i + Math.imul(k, G) | 0) + Math
						.imul(B, W) | 0, o = o + Math.imul(B, G) | 0, n = n + Math.imul(M, K) | 0, i = (i =
							i + Math.imul(M, V) | 0) + Math.imul(E, K) | 0, o = o + Math.imul(E, V) | 0, n =
						n + Math.imul(w, $) | 0, i = (i = i + Math.imul(w, X) | 0) + Math.imul(_, $) | 0,
						o = o + Math.imul(_, X) | 0, n = n + Math.imul(g, Q) | 0, i = (i = i + Math.imul(g,
							tt) | 0) + Math.imul(v, Q) | 0, o = o + Math.imul(v, tt) | 0, n = n + Math.imul(
							p, rt) | 0, i = (i = i + Math.imul(p, nt) | 0) + Math.imul(m, rt) | 0, o = o +
						Math.imul(m, nt) | 0;
					var At = (u + (n = n + Math.imul(c, ot) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(c,
						at) | 0) + Math.imul(d, ot) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(d, at) | 0) + (i >>> 13) | 0) + (At >>> 26) | 0, At &= 67108863,
						n = Math.imul(I, F), i = (i = Math.imul(I, q)) + Math.imul(D, F) | 0, o = Math.imul(
							D, q), n = n + Math.imul(R, W) | 0, i = (i = i + Math.imul(R, G) | 0) + Math
						.imul(x, W) | 0, o = o + Math.imul(x, G) | 0, n = n + Math.imul(k, K) | 0, i = (i =
							i + Math.imul(k, V) | 0) + Math.imul(B, K) | 0, o = o + Math.imul(B, V) | 0, n =
						n + Math.imul(M, $) | 0, i = (i = i + Math.imul(M, X) | 0) + Math.imul(E, $) | 0,
						o = o + Math.imul(E, X) | 0, n = n + Math.imul(w, Q) | 0, i = (i = i + Math.imul(w,
							tt) | 0) + Math.imul(_, Q) | 0, o = o + Math.imul(_, tt) | 0, n = n + Math.imul(
							g, rt) | 0, i = (i = i + Math.imul(g, nt) | 0) + Math.imul(v, rt) | 0, o = o +
						Math.imul(v, nt) | 0, n = n + Math.imul(p, ot) | 0, i = (i = i + Math.imul(p, at) |
							0) + Math.imul(m, ot) | 0, o = o + Math.imul(m, at) | 0;
					var Mt = (u + (n = n + Math.imul(c, ft) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(c,
						ut) | 0) + Math.imul(d, ft) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(d, ut) | 0) + (i >>> 13) | 0) + (Mt >>> 26) | 0, Mt &= 67108863,
						n = Math.imul(O, F), i = (i = Math.imul(O, q)) + Math.imul(L, F) | 0, o = Math.imul(
							L, q), n = n + Math.imul(I, W) | 0, i = (i = i + Math.imul(I, G) | 0) + Math
						.imul(D, W) | 0, o = o + Math.imul(D, G) | 0, n = n + Math.imul(R, K) | 0, i = (i =
							i + Math.imul(R, V) | 0) + Math.imul(x, K) | 0, o = o + Math.imul(x, V) | 0, n =
						n + Math.imul(k, $) | 0, i = (i = i + Math.imul(k, X) | 0) + Math.imul(B, $) | 0,
						o = o + Math.imul(B, X) | 0, n = n + Math.imul(M, Q) | 0, i = (i = i + Math.imul(M,
							tt) | 0) + Math.imul(E, Q) | 0, o = o + Math.imul(E, tt) | 0, n = n + Math.imul(
							w, rt) | 0, i = (i = i + Math.imul(w, nt) | 0) + Math.imul(_, rt) | 0, o = o +
						Math.imul(_, nt) | 0, n = n + Math.imul(g, ot) | 0, i = (i = i + Math.imul(g, at) |
							0) + Math.imul(v, ot) | 0, o = o + Math.imul(v, at) | 0, n = n + Math.imul(p,
							ft) | 0, i = (i = i + Math.imul(p, ut) | 0) + Math.imul(m, ft) | 0, o = o + Math
						.imul(m, ut) | 0;
					var Et = (u + (n = n + Math.imul(c, ct) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(c,
						dt) | 0) + Math.imul(d, ct) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(d, dt) | 0) + (i >>> 13) | 0) + (Et >>> 26) | 0, Et &= 67108863,
						n = Math.imul(j, F), i = (i = Math.imul(j, q)) + Math.imul(N, F) | 0, o = Math.imul(
							N, q), n = n + Math.imul(O, W) | 0, i = (i = i + Math.imul(O, G) | 0) + Math
						.imul(L, W) | 0, o = o + Math.imul(L, G) | 0, n = n + Math.imul(I, K) | 0, i = (i =
							i + Math.imul(I, V) | 0) + Math.imul(D, K) | 0, o = o + Math.imul(D, V) | 0, n =
						n + Math.imul(R, $) | 0, i = (i = i + Math.imul(R, X) | 0) + Math.imul(x, $) | 0,
						o = o + Math.imul(x, X) | 0, n = n + Math.imul(k, Q) | 0, i = (i = i + Math.imul(k,
							tt) | 0) + Math.imul(B, Q) | 0, o = o + Math.imul(B, tt) | 0, n = n + Math.imul(
							M, rt) | 0, i = (i = i + Math.imul(M, nt) | 0) + Math.imul(E, rt) | 0, o = o +
						Math.imul(E, nt) | 0, n = n + Math.imul(w, ot) | 0, i = (i = i + Math.imul(w, at) |
							0) + Math.imul(_, ot) | 0, o = o + Math.imul(_, at) | 0, n = n + Math.imul(g,
							ft) | 0, i = (i = i + Math.imul(g, ut) | 0) + Math.imul(v, ft) | 0, o = o + Math
						.imul(v, ut) | 0, n = n + Math.imul(p, ct) | 0, i = (i = i + Math.imul(p, dt) | 0) +
						Math.imul(m, ct) | 0, o = o + Math.imul(m, dt) | 0;
					var St = (u + (n = n + Math.imul(c, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(c,
						mt) | 0) + Math.imul(d, pt) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(d, mt) | 0) + (i >>> 13) | 0) + (St >>> 26) | 0, St &= 67108863,
						n = Math.imul(j, W), i = (i = Math.imul(j, G)) + Math.imul(N, W) | 0, o = Math.imul(
							N, G), n = n + Math.imul(O, K) | 0, i = (i = i + Math.imul(O, V) | 0) + Math
						.imul(L, K) | 0, o = o + Math.imul(L, V) | 0, n = n + Math.imul(I, $) | 0, i = (i =
							i + Math.imul(I, X) | 0) + Math.imul(D, $) | 0, o = o + Math.imul(D, X) | 0, n =
						n + Math.imul(R, Q) | 0, i = (i = i + Math.imul(R, tt) | 0) + Math.imul(x, Q) | 0,
						o = o + Math.imul(x, tt) | 0, n = n + Math.imul(k, rt) | 0, i = (i = i + Math.imul(
							k, nt) | 0) + Math.imul(B, rt) | 0, o = o + Math.imul(B, nt) | 0, n = n + Math
						.imul(M, ot) | 0, i = (i = i + Math.imul(M, at) | 0) + Math.imul(E, ot) | 0, o = o +
						Math.imul(E, at) | 0, n = n + Math.imul(w, ft) | 0, i = (i = i + Math.imul(w, ut) |
							0) + Math.imul(_, ft) | 0, o = o + Math.imul(_, ut) | 0, n = n + Math.imul(g,
							ct) | 0, i = (i = i + Math.imul(g, dt) | 0) + Math.imul(v, ct) | 0, o = o + Math
						.imul(v, dt) | 0;
					var kt = (u + (n = n + Math.imul(p, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(p,
						mt) | 0) + Math.imul(m, pt) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(m, mt) | 0) + (i >>> 13) | 0) + (kt >>> 26) | 0, kt &= 67108863,
						n = Math.imul(j, K), i = (i = Math.imul(j, V)) + Math.imul(N, K) | 0, o = Math.imul(
							N, V), n = n + Math.imul(O, $) | 0, i = (i = i + Math.imul(O, X) | 0) + Math
						.imul(L, $) | 0, o = o + Math.imul(L, X) | 0, n = n + Math.imul(I, Q) | 0, i = (i =
							i + Math.imul(I, tt) | 0) + Math.imul(D, Q) | 0, o = o + Math.imul(D, tt) | 0,
						n = n + Math.imul(R, rt) | 0, i = (i = i + Math.imul(R, nt) | 0) + Math.imul(x,
						rt) | 0, o = o + Math.imul(x, nt) | 0, n = n + Math.imul(k, ot) | 0, i = (i = i +
							Math.imul(k, at) | 0) + Math.imul(B, ot) | 0, o = o + Math.imul(B, at) | 0, n =
						n + Math.imul(M, ft) | 0, i = (i = i + Math.imul(M, ut) | 0) + Math.imul(E, ft) | 0,
						o = o + Math.imul(E, ut) | 0, n = n + Math.imul(w, ct) | 0, i = (i = i + Math.imul(
							w, dt) | 0) + Math.imul(_, ct) | 0, o = o + Math.imul(_, dt) | 0;
					var Bt = (u + (n = n + Math.imul(g, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(g,
						mt) | 0) + Math.imul(v, pt) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(v, mt) | 0) + (i >>> 13) | 0) + (Bt >>> 26) | 0, Bt &= 67108863,
						n = Math.imul(j, $), i = (i = Math.imul(j, X)) + Math.imul(N, $) | 0, o = Math.imul(
							N, X), n = n + Math.imul(O, Q) | 0, i = (i = i + Math.imul(O, tt) | 0) + Math
						.imul(L, Q) | 0, o = o + Math.imul(L, tt) | 0, n = n + Math.imul(I, rt) | 0, i = (
							i = i + Math.imul(I, nt) | 0) + Math.imul(D, rt) | 0, o = o + Math.imul(D, nt) |
						0, n = n + Math.imul(R, ot) | 0, i = (i = i + Math.imul(R, at) | 0) + Math.imul(x,
							ot) | 0, o = o + Math.imul(x, at) | 0, n = n + Math.imul(k, ft) | 0, i = (i =
							i + Math.imul(k, ut) | 0) + Math.imul(B, ft) | 0, o = o + Math.imul(B, ut) | 0,
						n = n + Math.imul(M, ct) | 0, i = (i = i + Math.imul(M, dt) | 0) + Math.imul(E,
						ct) | 0, o = o + Math.imul(E, dt) | 0;
					var Tt = (u + (n = n + Math.imul(w, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(w,
						mt) | 0) + Math.imul(_, pt) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(_, mt) | 0) + (i >>> 13) | 0) + (Tt >>> 26) | 0, Tt &= 67108863,
						n = Math.imul(j, Q), i = (i = Math.imul(j, tt)) + Math.imul(N, Q) | 0, o = Math
						.imul(N, tt), n = n + Math.imul(O, rt) | 0, i = (i = i + Math.imul(O, nt) | 0) +
						Math.imul(L, rt) | 0, o = o + Math.imul(L, nt) | 0, n = n + Math.imul(I, ot) | 0,
						i = (i = i + Math.imul(I, at) | 0) + Math.imul(D, ot) | 0, o = o + Math.imul(D,
						at) | 0, n = n + Math.imul(R, ft) | 0, i = (i = i + Math.imul(R, ut) | 0) + Math
						.imul(x, ft) | 0, o = o + Math.imul(x, ut) | 0, n = n + Math.imul(k, ct) | 0, i = (
							i = i + Math.imul(k, dt) | 0) + Math.imul(B, ct) | 0, o = o + Math.imul(B, dt) |
						0;
					var Rt = (u + (n = n + Math.imul(M, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(M,
						mt) | 0) + Math.imul(E, pt) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(E, mt) | 0) + (i >>> 13) | 0) + (Rt >>> 26) | 0, Rt &= 67108863,
						n = Math.imul(j, rt), i = (i = Math.imul(j, nt)) + Math.imul(N, rt) | 0, o = Math
						.imul(N, nt), n = n + Math.imul(O, ot) | 0, i = (i = i + Math.imul(O, at) | 0) +
						Math.imul(L, ot) | 0, o = o + Math.imul(L, at) | 0, n = n + Math.imul(I, ft) | 0,
						i = (i = i + Math.imul(I, ut) | 0) + Math.imul(D, ft) | 0, o = o + Math.imul(D,
						ut) | 0, n = n + Math.imul(R, ct) | 0, i = (i = i + Math.imul(R, dt) | 0) + Math
						.imul(x, ct) | 0, o = o + Math.imul(x, dt) | 0;
					var xt = (u + (n = n + Math.imul(k, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(k,
						mt) | 0) + Math.imul(B, pt) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(B, mt) | 0) + (i >>> 13) | 0) + (xt >>> 26) | 0, xt &= 67108863,
						n = Math.imul(j, ot), i = (i = Math.imul(j, at)) + Math.imul(N, ot) | 0, o = Math
						.imul(N, at), n = n + Math.imul(O, ft) | 0, i = (i = i + Math.imul(O, ut) | 0) +
						Math.imul(L, ft) | 0, o = o + Math.imul(L, ut) | 0, n = n + Math.imul(I, ct) | 0,
						i = (i = i + Math.imul(I, dt) | 0) + Math.imul(D, ct) | 0, o = o + Math.imul(D,
						dt) | 0;
					var Ct = (u + (n = n + Math.imul(R, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(R,
						mt) | 0) + Math.imul(x, pt) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(x, mt) | 0) + (i >>> 13) | 0) + (Ct >>> 26) | 0, Ct &= 67108863,
						n = Math.imul(j, ft), i = (i = Math.imul(j, ut)) + Math.imul(N, ft) | 0, o = Math
						.imul(N, ut), n = n + Math.imul(O, ct) | 0, i = (i = i + Math.imul(O, dt) | 0) +
						Math.imul(L, ct) | 0, o = o + Math.imul(L, dt) | 0;
					var It = (u + (n = n + Math.imul(I, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(I,
						mt) | 0) + Math.imul(D, pt) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(D, mt) | 0) + (i >>> 13) | 0) + (It >>> 26) | 0, It &= 67108863,
						n = Math.imul(j, ct), i = (i = Math.imul(j, dt)) + Math.imul(N, ct) | 0, o = Math
						.imul(N, dt);
					var Dt = (u + (n = n + Math.imul(O, pt) | 0) | 0) + ((8191 & (i = (i = i + Math.imul(O,
						mt) | 0) + Math.imul(L, pt) | 0)) << 13) | 0;
					u = ((o = o + Math.imul(L, mt) | 0) + (i >>> 13) | 0) + (Dt >>> 26) | 0, Dt &= 67108863;
					var Pt = (u + (n = Math.imul(j, pt)) | 0) + ((8191 & (i = (i = Math.imul(j, mt)) + Math
						.imul(N, pt) | 0)) << 13) | 0;
					return u = ((o = Math.imul(N, mt)) + (i >>> 13) | 0) + (Pt >>> 26) | 0, Pt &= 67108863,
						f[0] = bt, f[1] = gt, f[2] = vt, f[3] = yt, f[4] = wt, f[5] = _t, f[6] = At, f[7] =
						Mt, f[8] = Et, f[9] = St, f[10] = kt, f[11] = Bt, f[12] = Tt, f[13] = Rt, f[14] =
						xt, f[15] = Ct, f[16] = It, f[17] = Dt, f[18] = Pt, 0 !== u && (f[19] = u, r
							.length++), r
				};

				function b(t, e, r) {
					r.negative = e.negative ^ t.negative, r.length = t.length + e.length;
					for (var n = 0, i = 0, o = 0; o < r.length - 1; o++) {
						var a = i;
						i = 0;
						for (var s = 67108863 & n, f = Math.min(o, e.length - 1), u = Math.max(0, o - t.length +
								1); u <= f; u++) {
							var h = o - u,
								c = (0 | t.words[h]) * (0 | e.words[u]),
								d = 67108863 & c;
							s = 67108863 & (d = d + s | 0), i += (a = (a = a + (c / 67108864 | 0) | 0) + (d >>>
								26) | 0) >>> 26, a &= 67108863
						}
						r.words[o] = s, n = a, a = i
					}
					return 0 !== n ? r.words[o] = n : r.length--, r._strip()
				}

				function g(t, e, r) {
					return b(t, e, r)
				}

				function v(t, e) {
					this.x = t, this.y = e
				}
				Math.imul || (m = p), i.prototype.mulTo = function(t, e) {
					var r = this.length + t.length;
					return 10 === this.length && 10 === t.length ? m(this, t, e) : r < 63 ? p(this, t, e) :
						r < 1024 ? b(this, t, e) : g(this, t, e)
				}, v.prototype.makeRBT = function(t) {
					for (var e = new Array(t), r = i.prototype._countBits(t) - 1, n = 0; n < t; n++) e[n] =
						this.revBin(n, r, t);
					return e
				}, v.prototype.revBin = function(t, e, r) {
					if (0 === t || t === r - 1) return t;
					for (var n = 0, i = 0; i < e; i++) n |= (1 & t) << e - i - 1, t >>= 1;
					return n
				}, v.prototype.permute = function(t, e, r, n, i, o) {
					for (var a = 0; a < o; a++) n[a] = e[t[a]], i[a] = r[t[a]]
				}, v.prototype.transform = function(t, e, r, n, i, o) {
					this.permute(o, t, e, r, n, i);
					for (var a = 1; a < i; a <<= 1)
						for (var s = a << 1, f = Math.cos(2 * Math.PI / s), u = Math.sin(2 * Math.PI / s),
								h = 0; h < i; h += s)
							for (var c = f, d = u, l = 0; l < a; l++) {
								var p = r[h + l],
									m = n[h + l],
									b = r[h + l + a],
									g = n[h + l + a],
									v = c * b - d * g;
								g = c * g + d * b, b = v, r[h + l] = p + b, n[h + l] = m + g, r[h + l + a] =
									p - b, n[h + l + a] = m - g, l !== s && (v = f * c - u * d, d = f * d +
										u * c, c = v)
							}
				}, v.prototype.guessLen13b = function(t, e) {
					var r = 1 | Math.max(e, t),
						n = 1 & r,
						i = 0;
					for (r = r / 2 | 0; r; r >>>= 1) i++;
					return 1 << i + 1 + n
				}, v.prototype.conjugate = function(t, e, r) {
					if (!(r <= 1))
						for (var n = 0; n < r / 2; n++) {
							var i = t[n];
							t[n] = t[r - n - 1], t[r - n - 1] = i, i = e[n], e[n] = -e[r - n - 1], e[r - n -
								1] = -i
						}
				}, v.prototype.normalize13b = function(t, e) {
					for (var r = 0, n = 0; n < e / 2; n++) {
						var i = 8192 * Math.round(t[2 * n + 1] / e) + Math.round(t[2 * n] / e) + r;
						t[n] = 67108863 & i, r = i < 67108864 ? 0 : i / 67108864 | 0
					}
					return t
				}, v.prototype.convert13b = function(t, e, n, i) {
					for (var o = 0, a = 0; a < e; a++) o += 0 | t[a], n[2 * a] = 8191 & o, o >>>= 13, n[2 *
						a + 1] = 8191 & o, o >>>= 13;
					for (a = 2 * e; a < i; ++a) n[a] = 0;
					r(0 === o), r(0 == (-8192 & o))
				}, v.prototype.stub = function(t) {
					for (var e = new Array(t), r = 0; r < t; r++) e[r] = 0;
					return e
				}, v.prototype.mulp = function(t, e, r) {
					var n = 2 * this.guessLen13b(t.length, e.length),
						i = this.makeRBT(n),
						o = this.stub(n),
						a = new Array(n),
						s = new Array(n),
						f = new Array(n),
						u = new Array(n),
						h = new Array(n),
						c = new Array(n),
						d = r.words;
					d.length = n, this.convert13b(t.words, t.length, a, n), this.convert13b(e.words, e
						.length, u, n), this.transform(a, o, s, f, n, i), this.transform(u, o, h, c, n,
						i);
					for (var l = 0; l < n; l++) {
						var p = s[l] * h[l] - f[l] * c[l];
						f[l] = s[l] * c[l] + f[l] * h[l], s[l] = p
					}
					return this.conjugate(s, f, n), this.transform(s, f, d, o, n, i), this.conjugate(d, o,
							n), this.normalize13b(d, n), r.negative = t.negative ^ e.negative, r.length = t
						.length + e.length, r._strip()
				}, i.prototype.mul = function(t) {
					var e = new i(null);
					return e.words = new Array(this.length + t.length), this.mulTo(t, e)
				}, i.prototype.mulf = function(t) {
					var e = new i(null);
					return e.words = new Array(this.length + t.length), g(this, t, e)
				}, i.prototype.imul = function(t) {
					return this.clone().mulTo(t, this)
				}, i.prototype.imuln = function(t) {
					var e = t < 0;
					e && (t = -t), r("number" == typeof t), r(t < 67108864);
					for (var n = 0, i = 0; i < this.length; i++) {
						var o = (0 | this.words[i]) * t,
							a = (67108863 & o) + (67108863 & n);
						n >>= 26, n += o / 67108864 | 0, n += a >>> 26, this.words[i] = 67108863 & a
					}
					return 0 !== n && (this.words[i] = n, this.length++), e ? this.ineg() : this
				}, i.prototype.muln = function(t) {
					return this.clone().imuln(t)
				}, i.prototype.sqr = function() {
					return this.mul(this)
				}, i.prototype.isqr = function() {
					return this.imul(this.clone())
				}, i.prototype.pow = function(t) {
					var e = function(t) {
						for (var e = new Array(t.bitLength()), r = 0; r < e.length; r++) {
							var n = r / 26 | 0,
								i = r % 26;
							e[r] = t.words[n] >>> i & 1
						}
						return e
					}(t);
					if (0 === e.length) return new i(1);
					for (var r = this, n = 0; n < e.length && 0 === e[n]; n++, r = r.sqr());
					if (++n < e.length)
						for (var o = r.sqr(); n < e.length; n++, o = o.sqr()) 0 !== e[n] && (r = r.mul(o));
					return r
				}, i.prototype.iushln = function(t) {
					r("number" == typeof t && t >= 0);
					var e, n = t % 26,
						i = (t - n) / 26,
						o = 67108863 >>> 26 - n << 26 - n;
					if (0 !== n) {
						var a = 0;
						for (e = 0; e < this.length; e++) {
							var s = this.words[e] & o,
								f = (0 | this.words[e]) - s << n;
							this.words[e] = f | a, a = s >>> 26 - n
						}
						a && (this.words[e] = a, this.length++)
					}
					if (0 !== i) {
						for (e = this.length - 1; e >= 0; e--) this.words[e + i] = this.words[e];
						for (e = 0; e < i; e++) this.words[e] = 0;
						this.length += i
					}
					return this._strip()
				}, i.prototype.ishln = function(t) {
					return r(0 === this.negative), this.iushln(t)
				}, i.prototype.iushrn = function(t, e, n) {
					var i;
					r("number" == typeof t && t >= 0), i = e ? (e - e % 26) / 26 : 0;
					var o = t % 26,
						a = Math.min((t - o) / 26, this.length),
						s = 67108863 ^ 67108863 >>> o << o,
						f = n;
					if (i -= a, i = Math.max(0, i), f) {
						for (var u = 0; u < a; u++) f.words[u] = this.words[u];
						f.length = a
					}
					if (0 === a);
					else if (this.length > a)
						for (this.length -= a, u = 0; u < this.length; u++) this.words[u] = this.words[u +
							a];
					else this.words[0] = 0, this.length = 1;
					var h = 0;
					for (u = this.length - 1; u >= 0 && (0 !== h || u >= i); u--) {
						var c = 0 | this.words[u];
						this.words[u] = h << 26 - o | c >>> o, h = c & s
					}
					return f && 0 !== h && (f.words[f.length++] = h), 0 === this.length && (this.words[0] =
						0, this.length = 1), this._strip()
				}, i.prototype.ishrn = function(t, e, n) {
					return r(0 === this.negative), this.iushrn(t, e, n)
				}, i.prototype.shln = function(t) {
					return this.clone().ishln(t)
				}, i.prototype.ushln = function(t) {
					return this.clone().iushln(t)
				}, i.prototype.shrn = function(t) {
					return this.clone().ishrn(t)
				}, i.prototype.ushrn = function(t) {
					return this.clone().iushrn(t)
				}, i.prototype.testn = function(t) {
					r("number" == typeof t && t >= 0);
					var e = t % 26,
						n = (t - e) / 26,
						i = 1 << e;
					return !(this.length <= n) && !!(this.words[n] & i)
				}, i.prototype.imaskn = function(t) {
					r("number" == typeof t && t >= 0);
					var e = t % 26,
						n = (t - e) / 26;
					if (r(0 === this.negative, "imaskn works only with positive numbers"), this.length <= n)
						return this;
					if (0 !== e && n++, this.length = Math.min(n, this.length), 0 !== e) {
						var i = 67108863 ^ 67108863 >>> e << e;
						this.words[this.length - 1] &= i
					}
					return this._strip()
				}, i.prototype.maskn = function(t) {
					return this.clone().imaskn(t)
				}, i.prototype.iaddn = function(t) {
					return r("number" == typeof t), r(t < 67108864), t < 0 ? this.isubn(-t) : 0 !== this
						.negative ? 1 === this.length && (0 | this.words[0]) <= t ? (this.words[0] = t - (
							0 | this.words[0]), this.negative = 0, this) : (this.negative = 0, this.isubn(
							t), this.negative = 1, this) : this._iaddn(t)
				}, i.prototype._iaddn = function(t) {
					this.words[0] += t;
					for (var e = 0; e < this.length && this.words[e] >= 67108864; e++) this.words[e] -=
						67108864, e === this.length - 1 ? this.words[e + 1] = 1 : this.words[e + 1]++;
					return this.length = Math.max(this.length, e + 1), this
				}, i.prototype.isubn = function(t) {
					if (r("number" == typeof t), r(t < 67108864), t < 0) return this.iaddn(-t);
					if (0 !== this.negative) return this.negative = 0, this.iaddn(t), this.negative = 1,
						this;
					if (this.words[0] -= t, 1 === this.length && this.words[0] < 0) this.words[0] = -this
						.words[0], this.negative = 1;
					else
						for (var e = 0; e < this.length && this.words[e] < 0; e++) this.words[e] +=
							67108864, this.words[e + 1] -= 1;
					return this._strip()
				}, i.prototype.addn = function(t) {
					return this.clone().iaddn(t)
				}, i.prototype.subn = function(t) {
					return this.clone().isubn(t)
				}, i.prototype.iabs = function() {
					return this.negative = 0, this
				}, i.prototype.abs = function() {
					return this.clone().iabs()
				}, i.prototype._ishlnsubmul = function(t, e, n) {
					var i, o, a = t.length + n;
					this._expand(a);
					var s = 0;
					for (i = 0; i < t.length; i++) {
						o = (0 | this.words[i + n]) + s;
						var f = (0 | t.words[i]) * e;
						s = ((o -= 67108863 & f) >> 26) - (f / 67108864 | 0), this.words[i + n] = 67108863 &
							o
					}
					for (; i < this.length - n; i++) s = (o = (0 | this.words[i + n]) + s) >> 26, this
						.words[i + n] = 67108863 & o;
					if (0 === s) return this._strip();
					for (r(-1 === s), s = 0, i = 0; i < this.length; i++) s = (o = -(0 | this.words[i]) +
						s) >> 26, this.words[i] = 67108863 & o;
					return this.negative = 1, this._strip()
				}, i.prototype._wordDiv = function(t, e) {
					var r = (this.length, t.length),
						n = this.clone(),
						o = t,
						a = 0 | o.words[o.length - 1];
					0 !== (r = 26 - this._countBits(a)) && (o = o.ushln(r), n.iushln(r), a = 0 | o.words[o
						.length - 1]);
					var s, f = n.length - o.length;
					if ("mod" !== e) {
						(s = new i(null)).length = f + 1, s.words = new Array(s.length);
						for (var u = 0; u < s.length; u++) s.words[u] = 0
					}
					var h = n.clone()._ishlnsubmul(o, 1, f);
					0 === h.negative && (n = h, s && (s.words[f] = 1));
					for (var c = f - 1; c >= 0; c--) {
						var d = 67108864 * (0 | n.words[o.length + c]) + (0 | n.words[o.length + c - 1]);
						for (d = Math.min(d / a | 0, 67108863), n._ishlnsubmul(o, d, c); 0 !== n.negative;)
							d--, n.negative = 0, n._ishlnsubmul(o, 1, c), n.isZero() || (n.negative ^= 1);
						s && (s.words[c] = d)
					}
					return s && s._strip(), n._strip(), "div" !== e && 0 !== r && n.iushrn(r), {
						div: s || null,
						mod: n
					}
				}, i.prototype.divmod = function(t, e, n) {
					return r(!t.isZero()), this.isZero() ? {
						div: new i(0),
						mod: new i(0)
					} : 0 !== this.negative && 0 === t.negative ? (s = this.neg().divmod(t, e),
						"mod" !== e && (o = s.div.neg()), "div" !== e && (a = s.mod.neg(), n && 0 !== a
							.negative && a.iadd(t)), {
							div: o,
							mod: a
						}) : 0 === this.negative && 0 !== t.negative ? (s = this.divmod(t.neg(), e),
						"mod" !== e && (o = s.div.neg()), {
							div: o,
							mod: s.mod
						}) : 0 != (this.negative & t.negative) ? (s = this.neg().divmod(t.neg(), e),
						"div" !== e && (a = s.mod.neg(), n && 0 !== a.negative && a.isub(t)), {
							div: s.div,
							mod: a
						}) : t.length > this.length || this.cmp(t) < 0 ? {
						div: new i(0),
						mod: this
					} : 1 === t.length ? "div" === e ? {
						div: this.divn(t.words[0]),
						mod: null
					} : "mod" === e ? {
						div: null,
						mod: new i(this.modrn(t.words[0]))
					} : {
						div: this.divn(t.words[0]),
						mod: new i(this.modrn(t.words[0]))
					} : this._wordDiv(t, e);
				}, i.prototype.div = function(t) {
					return this.divmod(t, "div", !1).div
				}, i.prototype.mod = function(t) {
					return this.divmod(t, "mod", !1).mod
				}, i.prototype.umod = function(t) {
					return this.divmod(t, "mod", !0).mod
				}, i.prototype.divRound = function(t) {
					var e = this.divmod(t);
					if (e.mod.isZero()) return e.div;
					var r = 0 !== e.div.negative ? e.mod.isub(t) : e.mod,
						n = t.ushrn(1),
						i = t.andln(1),
						o = r.cmp(n);
					return o < 0 || 1 === i && 0 === o ? e.div : 0 !== e.div.negative ? e.div.isubn(1) : e
						.div.iaddn(1)
				}, i.prototype.modrn = function(t) {
					var e = t < 0;
					e && (t = -t), r(t <= 67108863);
					for (var n = (1 << 26) % t, i = 0, o = this.length - 1; o >= 0; o--) i = (n * i + (0 |
						this.words[o])) % t;
					return e ? -i : i
				}, i.prototype.modn = function(t) {
					return this.modrn(t)
				}, i.prototype.idivn = function(t) {
					var e = t < 0;
					e && (t = -t), r(t <= 67108863);
					for (var n = 0, i = this.length - 1; i >= 0; i--) {
						var o = (0 | this.words[i]) + 67108864 * n;
						this.words[i] = o / t | 0, n = o % t
					}
					return this._strip(), e ? this.ineg() : this
				}, i.prototype.divn = function(t) {
					return this.clone().idivn(t)
				}, i.prototype.egcd = function(t) {
					r(0 === t.negative), r(!t.isZero());
					var e = this,
						n = t.clone();
					e = 0 !== e.negative ? e.umod(t) : e.clone();
					for (var o = new i(1), a = new i(0), s = new i(0), f = new i(1), u = 0; e.isEven() && n
						.isEven();) e.iushrn(1), n.iushrn(1), ++u;
					for (var h = n.clone(), c = e.clone(); !e.isZero();) {
						for (var d = 0, l = 1; 0 == (e.words[0] & l) && d < 26; ++d, l <<= 1);
						if (d > 0)
							for (e.iushrn(d); d-- > 0;)(o.isOdd() || a.isOdd()) && (o.iadd(h), a.isub(c)), o
								.iushrn(1), a.iushrn(1);
						for (var p = 0, m = 1; 0 == (n.words[0] & m) && p < 26; ++p, m <<= 1);
						if (p > 0)
							for (n.iushrn(p); p-- > 0;)(s.isOdd() || f.isOdd()) && (s.iadd(h), f.isub(c)), s
								.iushrn(1), f.iushrn(1);
						e.cmp(n) >= 0 ? (e.isub(n), o.isub(s), a.isub(f)) : (n.isub(e), s.isub(o), f.isub(
							a))
					}
					return {
						a: s,
						b: f,
						gcd: n.iushln(u)
					}
				}, i.prototype._invmp = function(t) {
					r(0 === t.negative), r(!t.isZero());
					var e = this,
						n = t.clone();
					e = 0 !== e.negative ? e.umod(t) : e.clone();
					for (var o, a = new i(1), s = new i(0), f = n.clone(); e.cmpn(1) > 0 && n.cmpn(1) >
						0;) {
						for (var u = 0, h = 1; 0 == (e.words[0] & h) && u < 26; ++u, h <<= 1);
						if (u > 0)
							for (e.iushrn(u); u-- > 0;) a.isOdd() && a.iadd(f), a.iushrn(1);
						for (var c = 0, d = 1; 0 == (n.words[0] & d) && c < 26; ++c, d <<= 1);
						if (c > 0)
							for (n.iushrn(c); c-- > 0;) s.isOdd() && s.iadd(f), s.iushrn(1);
						e.cmp(n) >= 0 ? (e.isub(n), a.isub(s)) : (n.isub(e), s.isub(a))
					}
					return (o = 0 === e.cmpn(1) ? a : s).cmpn(0) < 0 && o.iadd(t), o
				}, i.prototype.gcd = function(t) {
					if (this.isZero()) return t.abs();
					if (t.isZero()) return this.abs();
					var e = this.clone(),
						r = t.clone();
					e.negative = 0, r.negative = 0;
					for (var n = 0; e.isEven() && r.isEven(); n++) e.iushrn(1), r.iushrn(1);
					for (;;) {
						for (; e.isEven();) e.iushrn(1);
						for (; r.isEven();) r.iushrn(1);
						var i = e.cmp(r);
						if (i < 0) {
							var o = e;
							e = r, r = o
						} else if (0 === i || 0 === r.cmpn(1)) break;
						e.isub(r)
					}
					return r.iushln(n)
				}, i.prototype.invm = function(t) {
					return this.egcd(t).a.umod(t)
				}, i.prototype.isEven = function() {
					return 0 == (1 & this.words[0])
				}, i.prototype.isOdd = function() {
					return 1 == (1 & this.words[0])
				}, i.prototype.andln = function(t) {
					return this.words[0] & t
				}, i.prototype.bincn = function(t) {
					r("number" == typeof t);
					var e = t % 26,
						n = (t - e) / 26,
						i = 1 << e;
					if (this.length <= n) return this._expand(n + 1), this.words[n] |= i, this;
					for (var o = i, a = n; 0 !== o && a < this.length; a++) {
						var s = 0 | this.words[a];
						o = (s += o) >>> 26, s &= 67108863, this.words[a] = s
					}
					return 0 !== o && (this.words[a] = o, this.length++), this
				}, i.prototype.isZero = function() {
					return 1 === this.length && 0 === this.words[0]
				}, i.prototype.cmpn = function(t) {
					var e, n = t < 0;
					if (0 !== this.negative && !n) return -1;
					if (0 === this.negative && n) return 1;
					if (this._strip(), this.length > 1) e = 1;
					else {
						n && (t = -t), r(t <= 67108863, "Number is too big");
						var i = 0 | this.words[0];
						e = i === t ? 0 : i < t ? -1 : 1
					}
					return 0 !== this.negative ? 0 | -e : e
				}, i.prototype.cmp = function(t) {
					if (0 !== this.negative && 0 === t.negative) return -1;
					if (0 === this.negative && 0 !== t.negative) return 1;
					var e = this.ucmp(t);
					return 0 !== this.negative ? 0 | -e : e
				}, i.prototype.ucmp = function(t) {
					if (this.length > t.length) return 1;
					if (this.length < t.length) return -1;
					for (var e = 0, r = this.length - 1; r >= 0; r--) {
						var n = 0 | this.words[r],
							i = 0 | t.words[r];
						if (n !== i) {
							n < i ? e = -1 : n > i && (e = 1);
							break
						}
					}
					return e
				}, i.prototype.gtn = function(t) {
					return 1 === this.cmpn(t)
				}, i.prototype.gt = function(t) {
					return 1 === this.cmp(t)
				}, i.prototype.gten = function(t) {
					return this.cmpn(t) >= 0
				}, i.prototype.gte = function(t) {
					return this.cmp(t) >= 0
				}, i.prototype.ltn = function(t) {
					return -1 === this.cmpn(t)
				}, i.prototype.lt = function(t) {
					return -1 === this.cmp(t)
				}, i.prototype.lten = function(t) {
					return this.cmpn(t) <= 0
				}, i.prototype.lte = function(t) {
					return this.cmp(t) <= 0
				}, i.prototype.eqn = function(t) {
					return 0 === this.cmpn(t)
				}, i.prototype.eq = function(t) {
					return 0 === this.cmp(t)
				}, i.red = function(t) {
					return new S(t)
				}, i.prototype.toRed = function(t) {
					return r(!this.red, "Already a number in reduction context"), r(0 === this.negative,
						"red works only with positives"), t.convertTo(this)._forceRed(t)
				}, i.prototype.fromRed = function() {
					return r(this.red, "fromRed works only with numbers in reduction context"), this.red
						.convertFrom(this)
				}, i.prototype._forceRed = function(t) {
					return this.red = t, this
				}, i.prototype.forceRed = function(t) {
					return r(!this.red, "Already a number in reduction context"), this._forceRed(t)
				}, i.prototype.redAdd = function(t) {
					return r(this.red, "redAdd works only with red numbers"), this.red.add(this, t)
				}, i.prototype.redIAdd = function(t) {
					return r(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, t)
				}, i.prototype.redSub = function(t) {
					return r(this.red, "redSub works only with red numbers"), this.red.sub(this, t)
				}, i.prototype.redISub = function(t) {
					return r(this.red, "redISub works only with red numbers"), this.red.isub(this, t)
				}, i.prototype.redShl = function(t) {
					return r(this.red, "redShl works only with red numbers"), this.red.shl(this, t)
				}, i.prototype.redMul = function(t) {
					return r(this.red, "redMul works only with red numbers"), this.red._verify2(this, t),
						this.red.mul(this, t)
				}, i.prototype.redIMul = function(t) {
					return r(this.red, "redMul works only with red numbers"), this.red._verify2(this, t),
						this.red.imul(this, t)
				}, i.prototype.redSqr = function() {
					return r(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this
						.red.sqr(this)
				}, i.prototype.redISqr = function() {
					return r(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this
						.red.isqr(this)
				}, i.prototype.redSqrt = function() {
					return r(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this
						.red.sqrt(this)
				}, i.prototype.redInvm = function() {
					return r(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this
						.red.invm(this)
				}, i.prototype.redNeg = function() {
					return r(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this
						.red.neg(this)
				}, i.prototype.redPow = function(t) {
					return r(this.red && !t.red, "redPow(normalNum)"), this.red._verify1(this), this.red
						.pow(this, t)
				};
				var y = {
					k256: null,
					p224: null,
					p192: null,
					p25519: null
				};

				function w(t, e) {
					this.name = t, this.p = new i(e, 16), this.n = this.p.bitLength(), this.k = new i(1).iushln(
						this.n).isub(this.p), this.tmp = this._tmp()
				}

				function _() {
					w.call(this, "k256",
						"ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")
				}

				function A() {
					w.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")
				}

				function M() {
					w.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")
				}

				function E() {
					w.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")
				}

				function S(t) {
					if ("string" == typeof t) {
						var e = i._prime(t);
						this.m = e.p, this.prime = e
					} else r(t.gtn(1), "modulus must be greater than 1"), this.m = t, this.prime = null
				}

				function k(t) {
					S.call(this, t), this.shift = this.m.bitLength(), this.shift % 26 != 0 && (this.shift +=
							26 - this.shift % 26), this.r = new i(1).iushln(this.shift), this.r2 = this.imod(
							this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r)
						.isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this
							.minv)
				}
				w.prototype._tmp = function() {
					var t = new i(null);
					return t.words = new Array(Math.ceil(this.n / 13)), t
				}, w.prototype.ireduce = function(t) {
					var e, r = t;
					do {
						this.split(r, this.tmp), e = (r = (r = this.imulK(r)).iadd(this.tmp)).bitLength()
					} while (e > this.n);
					var n = e < this.n ? -1 : r.ucmp(this.p);
					return 0 === n ? (r.words[0] = 0, r.length = 1) : n > 0 ? r.isub(this.p) : void 0 !== r
						.strip ? r.strip() : r._strip(), r
				}, w.prototype.split = function(t, e) {
					t.iushrn(this.n, 0, e)
				}, w.prototype.imulK = function(t) {
					return t.imul(this.k)
				}, n(_, w), _.prototype.split = function(t, e) {
					for (var r = 4194303, n = Math.min(t.length, 9), i = 0; i < n; i++) e.words[i] = t
						.words[i];
					if (e.length = n, t.length <= 9) return t.words[0] = 0, void(t.length = 1);
					var o = t.words[9];
					for (e.words[e.length++] = o & r, i = 10; i < t.length; i++) {
						var a = 0 | t.words[i];
						t.words[i - 10] = (a & r) << 4 | o >>> 22, o = a
					}
					o >>>= 22, t.words[i - 10] = o, 0 === o && t.length > 10 ? t.length -= 10 : t.length -=
						9
				}, _.prototype.imulK = function(t) {
					t.words[t.length] = 0, t.words[t.length + 1] = 0, t.length += 2;
					for (var e = 0, r = 0; r < t.length; r++) {
						var n = 0 | t.words[r];
						e += 977 * n, t.words[r] = 67108863 & e, e = 64 * n + (e / 67108864 | 0)
					}
					return 0 === t.words[t.length - 1] && (t.length--, 0 === t.words[t.length - 1] && t
						.length--), t
				}, n(A, w), n(M, w), n(E, w), E.prototype.imulK = function(t) {
					for (var e = 0, r = 0; r < t.length; r++) {
						var n = 19 * (0 | t.words[r]) + e,
							i = 67108863 & n;
						n >>>= 26, t.words[r] = i, e = n
					}
					return 0 !== e && (t.words[t.length++] = e), t
				}, i._prime = function(t) {
					if (y[t]) return y[t];
					var e;
					if ("k256" === t) e = new _;
					else if ("p224" === t) e = new A;
					else if ("p192" === t) e = new M;
					else {
						if ("p25519" !== t) throw new Error("Unknown prime " + t);
						e = new E
					}
					return y[t] = e, e
				}, S.prototype._verify1 = function(t) {
					r(0 === t.negative, "red works only with positives"), r(t.red,
						"red works only with red numbers")
				}, S.prototype._verify2 = function(t, e) {
					r(0 == (t.negative | e.negative), "red works only with positives"), r(t.red && t.red ===
						e.red, "red works only with red numbers")
				}, S.prototype.imod = function(t) {
					return this.prime ? this.prime.ireduce(t)._forceRed(this) : (u(t, t.umod(this.m)
						._forceRed(this)), t)
				}, S.prototype.neg = function(t) {
					return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this)
				}, S.prototype.add = function(t, e) {
					this._verify2(t, e);
					var r = t.add(e);
					return r.cmp(this.m) >= 0 && r.isub(this.m), r._forceRed(this)
				}, S.prototype.iadd = function(t, e) {
					this._verify2(t, e);
					var r = t.iadd(e);
					return r.cmp(this.m) >= 0 && r.isub(this.m), r
				}, S.prototype.sub = function(t, e) {
					this._verify2(t, e);
					var r = t.sub(e);
					return r.cmpn(0) < 0 && r.iadd(this.m), r._forceRed(this)
				}, S.prototype.isub = function(t, e) {
					this._verify2(t, e);
					var r = t.isub(e);
					return r.cmpn(0) < 0 && r.iadd(this.m), r
				}, S.prototype.shl = function(t, e) {
					return this._verify1(t), this.imod(t.ushln(e))
				}, S.prototype.imul = function(t, e) {
					return this._verify2(t, e), this.imod(t.imul(e))
				}, S.prototype.mul = function(t, e) {
					return this._verify2(t, e), this.imod(t.mul(e))
				}, S.prototype.isqr = function(t) {
					return this.imul(t, t.clone())
				}, S.prototype.sqr = function(t) {
					return this.mul(t, t)
				}, S.prototype.sqrt = function(t) {
					if (t.isZero()) return t.clone();
					var e = this.m.andln(3);
					if (r(e % 2 == 1), 3 === e) {
						var n = this.m.add(new i(1)).iushrn(2);
						return this.pow(t, n)
					}
					for (var o = this.m.subn(1), a = 0; !o.isZero() && 0 === o.andln(1);) a++, o.iushrn(1);
					r(!o.isZero());
					var s = new i(1).toRed(this),
						f = s.redNeg(),
						u = this.m.subn(1).iushrn(1),
						h = this.m.bitLength();
					for (h = new i(2 * h * h).toRed(this); 0 !== this.pow(h, u).cmp(f);) h.redIAdd(f);
					for (var c = this.pow(h, o), d = this.pow(t, o.addn(1).iushrn(1)), l = this.pow(t, o),
							p = a; 0 !== l.cmp(s);) {
						for (var m = l, b = 0; 0 !== m.cmp(s); b++) m = m.redSqr();
						r(b < p);
						var g = this.pow(c, new i(1).iushln(p - b - 1));
						d = d.redMul(g), c = g.redSqr(), l = l.redMul(c), p = b
					}
					return d
				}, S.prototype.invm = function(t) {
					var e = t._invmp(this.m);
					return 0 !== e.negative ? (e.negative = 0, this.imod(e).redNeg()) : this.imod(e)
				}, S.prototype.pow = function(t, e) {
					if (e.isZero()) return new i(1).toRed(this);
					if (0 === e.cmpn(1)) return t.clone();
					var r = new Array(16);
					r[0] = new i(1).toRed(this), r[1] = t;
					for (var n = 2; n < r.length; n++) r[n] = this.mul(r[n - 1], t);
					var o = r[0],
						a = 0,
						s = 0,
						f = e.bitLength() % 26;
					for (0 === f && (f = 26), n = e.length - 1; n >= 0; n--) {
						for (var u = e.words[n], h = f - 1; h >= 0; h--) {
							var c = u >> h & 1;
							o !== r[0] && (o = this.sqr(o)), 0 !== c || 0 !== a ? (a <<= 1, a |= c, (4 ===
									++s || 0 === n && 0 === h) && (o = this.mul(o, r[a]), s = 0, a = 0)) :
								s = 0
						}
						f = 26
					}
					return o
				}, S.prototype.convertTo = function(t) {
					var e = t.umod(this.m);
					return e === t ? e.clone() : e
				}, S.prototype.convertFrom = function(t) {
					var e = t.clone();
					return e.red = null, e
				}, i.mont = function(t) {
					return new k(t)
				}, n(k, S), k.prototype.convertTo = function(t) {
					return this.imod(t.ushln(this.shift))
				}, k.prototype.convertFrom = function(t) {
					var e = this.imod(t.mul(this.rinv));
					return e.red = null, e
				}, k.prototype.imul = function(t, e) {
					if (t.isZero() || e.isZero()) return t.words[0] = 0, t.length = 1, t;
					var r = t.imul(e),
						n = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
						i = r.isub(n).iushrn(this.shift),
						o = i;
					return i.cmp(this.m) >= 0 ? o = i.isub(this.m) : i.cmpn(0) < 0 && (o = i.iadd(this.m)),
						o._forceRed(this)
				}, k.prototype.mul = function(t, e) {
					if (t.isZero() || e.isZero()) return new i(0)._forceRed(this);
					var r = t.mul(e),
						n = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
						o = r.isub(n).iushrn(this.shift),
						a = o;
					return o.cmp(this.m) >= 0 ? a = o.isub(this.m) : o.cmpn(0) < 0 && (a = o.iadd(this.m)),
						a._forceRed(this)
				}, k.prototype.invm = function(t) {
					return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this)
				}
			}(void 0 === t || t, this), t.exports
		}.call({})
	}

	function TA() {
		return kA || (kA = !0, BA()), SA
	}
	var RA, xA, CA, IA, DA, PA, OA = !1;

	function LA() {
		return OA || (OA = !0, function() {
			for (DA in RA = {}, Ut(), xA = Ve(), CA = xA.Buffer, IA = {}, xA) xA.hasOwnProperty(DA) &&
				"SlowBuffer" !== DA && "Buffer" !== DA && (IA[DA] = xA[DA]);
			for (DA in PA = IA.Buffer = {}, CA) CA.hasOwnProperty(DA) && "allocUnsafe" !== DA &&
				"allocUnsafeSlow" !== DA && (PA[DA] = CA[DA]);
			if (IA.Buffer.prototype = CA.prototype, PA.from && PA.from !== Uint8Array.from || (PA.from =
					function(t, e, r) {
						if ("number" == typeof t) throw new TypeError(
							'The "value" argument must not be of type number. Received type ' + typeof t
							);
						if (t && void 0 === t.length) throw new TypeError(
							"The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
							typeof t);
						return CA(t, e, r)
					}), PA.alloc || (PA.alloc = function(t, e, r) {
					if ("number" != typeof t) throw new TypeError(
						'The "size" argument must be of type number. Received type ' + typeof t);
					if (t < 0 || t >= 2 * (1 << 30)) throw new RangeError('The value "' + t +
						'" is invalid for option "size"');
					var n = CA(t);
					return e && 0 !== e.length ? "string" == typeof r ? n.fill(e, r) : n.fill(e) : n.fill(
						0), n
				}), !IA.kStringMaxLength) try {
				IA.kStringMaxLength = Ut().binding("buffer").kStringMaxLength
			} catch (t) {}
			IA.constants || (IA.constants = {
				MAX_LENGTH: IA.kMaxLength
			}, IA.kStringMaxLength && (IA.constants.MAX_STRING_LENGTH = IA.kStringMaxLength)), RA = IA
		}()), RA
	}
	var UA, jA, NA, zA = !1;

	function FA(t) {
		this._reporterState = {
			obj: null,
			path: [],
			options: t || {},
			errors: []
		}
	}

	function qA(t, e) {
		this.path = t, this.rethrow(e)
	}

	function HA() {
		return zA || (zA = !0, UA = {}, jA = Mr(), NA = FA, UA.Reporter = NA, FA.prototype.isError = function(t) {
			return t instanceof qA
		}, FA.prototype.save = function() {
			const t = this._reporterState;
			return {
				obj: t.obj,
				pathLen: t.path.length
			}
		}, FA.prototype.restore = function(t) {
			const e = this._reporterState;
			e.obj = t.obj, e.path = e.path.slice(0, t.pathLen)
		}, FA.prototype.enterKey = function(t) {
			return this._reporterState.path.push(t)
		}, FA.prototype.exitKey = function(t) {
			const e = this._reporterState;
			e.path = e.path.slice(0, t - 1)
		}, FA.prototype.leaveKey = function(t, e, r) {
			const n = this._reporterState;
			this.exitKey(t), null !== n.obj && (n.obj[e] = r)
		}, FA.prototype.path = function() {
			return this._reporterState.path.join("/")
		}, FA.prototype.enterObject = function() {
			const t = this._reporterState,
				e = t.obj;
			return t.obj = {}, e
		}, FA.prototype.leaveObject = function(t) {
			const e = this._reporterState,
				r = e.obj;
			return e.obj = t, r
		}, FA.prototype.error = function(t) {
			let e;
			const r = this._reporterState,
				n = t instanceof qA;
			if (e = n ? t : new qA(r.path.map((function(t) {
					return "[" + JSON.stringify(t) + "]"
				})).join(""), t.message || t, t.stack), !r.options.partial) throw e;
			return n || r.errors.push(e), e
		}, FA.prototype.wrapResult = function(t) {
			const e = this._reporterState;
			return e.options.partial ? {
				result: this.isError(t) ? null : t,
				errors: e.errors
			} : t
		}, jA(qA, Error), qA.prototype.rethrow = function(t) {
			if (this.message = t + " at: " + (this.path || "(shallow)"), Error.captureStackTrace && Error
				.captureStackTrace(this, qA), !this.stack) try {
				throw new Error(this.message)
			} catch (t) {
				this.stack = t.stack
			}
			return this
		}), UA
	}
	var WA, GA, YA, KA, VA, ZA, $A = !1;

	function XA(t, e) {
		YA.call(this, e), KA.isBuffer(t) ? (this.base = t, this.offset = 0, this.length = t.length) : this.error(
			"Input not Buffer")
	}

	function JA(t, e) {
		if (Array.isArray(t)) this.length = 0, this.value = t.map((function(t) {
			return JA.isEncoderBuffer(t) || (t = new JA(t, e)), this.length += t.length, t
		}), this);
		else if ("number" == typeof t) {
			if (!(0 <= t && t <= 255)) return e.error("non-byte EncoderBuffer value");
			this.value = t, this.length = 1
		} else if ("string" == typeof t) this.value = t, this.length = KA.byteLength(t);
		else {
			if (!KA.isBuffer(t)) return e.error("Unsupported type: " + typeof t);
			this.value = t, this.length = t.length
		}
	}

	function QA() {
		return $A || ($A = !0, WA = {}, GA = Mr(), YA = HA().Reporter, KA = LA().Buffer, GA(XA, YA), VA = XA, WA
			.DecoderBuffer = VA, XA.isDecoderBuffer = function(t) {
				return t instanceof XA || "object" == typeof t && KA.isBuffer(t.base) && "DecoderBuffer" === t
					.constructor.name && "number" == typeof t.offset && "number" == typeof t.length && "function" ==
					typeof t.save && "function" == typeof t.restore && "function" == typeof t.isEmpty &&
					"function" == typeof t.readUInt8 && "function" == typeof t.skip && "function" == typeof t.raw
			}, XA.prototype.save = function() {
				return {
					offset: this.offset,
					reporter: YA.prototype.save.call(this)
				}
			}, XA.prototype.restore = function(t) {
				const e = new XA(this.base);
				return e.offset = t.offset, e.length = this.offset, this.offset = t.offset, YA.prototype.restore
					.call(this, t.reporter), e
			}, XA.prototype.isEmpty = function() {
				return this.offset === this.length
			}, XA.prototype.readUInt8 = function(t) {
				return this.offset + 1 <= this.length ? this.base.readUInt8(this.offset++, !0) : this.error(t ||
					"DecoderBuffer overrun")
			}, XA.prototype.skip = function(t, e) {
				if (!(this.offset + t <= this.length)) return this.error(e || "DecoderBuffer overrun");
				const r = new XA(this.base);
				return r._reporterState = this._reporterState, r.offset = this.offset, r.length = this.offset + t,
					this.offset += t, r
			}, XA.prototype.raw = function(t) {
				return this.base.slice(t ? t.offset : this.offset, this.length)
			}, ZA = JA, WA.EncoderBuffer = ZA, JA.isEncoderBuffer = function(t) {
				return t instanceof JA || "object" == typeof t && "EncoderBuffer" === t.constructor.name &&
					"number" == typeof t.length && "function" == typeof t.join
			}, JA.prototype.join = function(t, e) {
				return t || (t = KA.alloc(this.length)), e || (e = 0), 0 === this.length || (Array.isArray(this
					.value) ? this.value.forEach((function(r) {
					r.join(t, e), e += r.length
				})) : ("number" == typeof this.value ? t[e] = this.value : "string" == typeof this.value ? t
					.write(this.value, e) : KA.isBuffer(this.value) && this.value.copy(t, e), e += this
					.length)), t
			}), WA
	}
	var tM, eM, rM, nM, iM, oM, aM, sM, fM, uM = !1;

	function hM(t, e, r) {
		const n = {};
		this._baseState = n, n.name = r, n.enc = t, n.parent = e || null, n.children = null, n.tag = null, n.args =
			null, n.reverseArgs = null, n.choice = null, n.optional = !1, n.any = !1, n.obj = !1, n.use = null, n
			.useDecoder = null, n.key = null, n.default = null, n.explicit = null, n.implicit = null, n.contains = null,
			n.parent || (n.children = [], this._wrap())
	}

	function cM() {
		return uM || (uM = !0, tM = {}, eM = HA().Reporter, rM = QA().EncoderBuffer, nM = QA().DecoderBuffer, iM = ec(),
			aM = ["key", "obj", "use", "optional", "explicit", "implicit", "def", "choice", "any", "contains"]
			.concat(oM = ["seq", "seqof", "set", "setof", "objid", "bool", "gentime", "utctime", "null_", "enum",
				"int", "objDesc", "bitstr", "bmpstr", "charstr", "genstr", "graphstr", "ia5str", "iso646str",
				"numstr", "octstr", "printstr", "t61str", "unistr", "utf8str", "videostr"
			]), sM = ["_peekTag", "_decodeTag", "_use", "_decodeStr", "_decodeObjid", "_decodeTime", "_decodeNull",
				"_decodeInt", "_decodeBool", "_decodeList", "_encodeComposite", "_encodeStr", "_encodeObjid",
				"_encodeTime", "_encodeNull", "_encodeInt", "_encodeBool"
			], tM = hM, fM = ["enc", "parent", "children", "tag", "args", "reverseArgs", "choice", "optional",
				"any", "obj", "use", "alteredUse", "key", "default", "explicit", "implicit", "contains"
			], hM.prototype.clone = function() {
				const t = this._baseState,
					e = {};
				fM.forEach((function(r) {
					e[r] = t[r]
				}));
				const r = new this.constructor(e.parent);
				return r._baseState = e, r
			}, hM.prototype._wrap = function() {
				const t = this._baseState;
				aM.forEach((function(e) {
					this[e] = function() {
						const r = new this.constructor(this);
						return t.children.push(r), r[e].apply(r, arguments)
					}
				}), this)
			}, hM.prototype._init = function(t) {
				const e = this._baseState;
				iM(null === e.parent), t.call(this), e.children = e.children.filter((function(t) {
					return t._baseState.parent === this
				}), this), iM.equal(e.children.length, 1, "Root node can have only one child")
			}, hM.prototype._useArgs = function(t) {
				const e = this._baseState,
					r = t.filter((function(t) {
						return t instanceof this.constructor
					}), this);
				t = t.filter((function(t) {
					return !(t instanceof this.constructor)
				}), this), 0 !== r.length && (iM(null === e.children), e.children = r, r.forEach((function(t) {
					t._baseState.parent = this
				}), this)), 0 !== t.length && (iM(null === e.args), e.args = t, e.reverseArgs = t.map((function(
					t) {
					if ("object" != typeof t || t.constructor !== Object) return t;
					const e = {};
					return Object.keys(t).forEach((function(r) {
						r == (0 | r) && (r |= 0);
						const n = t[r];
						e[n] = r
					})), e
				})))
			}, sM.forEach((function(t) {
				hM.prototype[t] = function() {
					const e = this._baseState;
					throw new Error(t + " not implemented for encoding: " + e.enc)
				}
			})), oM.forEach((function(t) {
				hM.prototype[t] = function() {
					const e = this._baseState,
						r = Array.prototype.slice.call(arguments);
					return iM(null === e.tag), e.tag = t, this._useArgs(r), this
				}
			})), hM.prototype.use = function(t) {
				iM(t);
				const e = this._baseState;
				return iM(null === e.use), e.use = t, this
			}, hM.prototype.optional = function() {
				return this._baseState.optional = !0, this
			}, hM.prototype.def = function(t) {
				const e = this._baseState;
				return iM(null === e.default), e.default = t, e.optional = !0, this
			}, hM.prototype.explicit = function(t) {
				const e = this._baseState;
				return iM(null === e.explicit && null === e.implicit), e.explicit = t, this
			}, hM.prototype.implicit = function(t) {
				const e = this._baseState;
				return iM(null === e.explicit && null === e.implicit), e.implicit = t, this
			}, hM.prototype.obj = function() {
				const t = this._baseState,
					e = Array.prototype.slice.call(arguments);
				return t.obj = !0, 0 !== e.length && this._useArgs(e), this
			}, hM.prototype.key = function(t) {
				const e = this._baseState;
				return iM(null === e.key), e.key = t, this
			}, hM.prototype.any = function() {
				return this._baseState.any = !0, this
			}, hM.prototype.choice = function(t) {
				const e = this._baseState;
				return iM(null === e.choice), e.choice = t, this._useArgs(Object.keys(t).map((function(e) {
					return t[e]
				}))), this
			}, hM.prototype.contains = function(t) {
				const e = this._baseState;
				return iM(null === e.use), e.contains = t, this
			}, hM.prototype._decode = function(t, e) {
				const r = this._baseState;
				if (null === r.parent) return t.wrapResult(r.children[0]._decode(t, e));
				let n, i = r.default,
					o = !0,
					a = null;
				if (null !== r.key && (a = t.enterKey(r.key)), r.optional) {
					let n = null;
					if (null !== r.explicit ? n = r.explicit : null !== r.implicit ? n = r.implicit : null !== r
						.tag && (n = r.tag), null !== n || r.any) {
						if (o = this._peekTag(t, n, r.any), t.isError(o)) return o
					} else {
						const n = t.save();
						try {
							null === r.choice ? this._decodeGeneric(r.tag, t, e) : this._decodeChoice(t, e), o = !0
						} catch (t) {
							o = !1
						}
						t.restore(n)
					}
				}
				if (r.obj && o && (n = t.enterObject()), o) {
					if (null !== r.explicit) {
						const e = this._decodeTag(t, r.explicit);
						if (t.isError(e)) return e;
						t = e
					}
					const n = t.offset;
					if (null === r.use && null === r.choice) {
						let e;
						r.any && (e = t.save());
						const n = this._decodeTag(t, null !== r.implicit ? r.implicit : r.tag, r.any);
						if (t.isError(n)) return n;
						r.any ? i = t.raw(e) : t = n
					}
					if (e && e.track && null !== r.tag && e.track(t.path(), n, t.length, "tagged"), e && e.track &&
						null !== r.tag && e.track(t.path(), t.offset, t.length, "content"), r.any || (i = null === r
							.choice ? this._decodeGeneric(r.tag, t, e) : this._decodeChoice(t, e)), t.isError(i))
						return i;
					if (r.any || null !== r.choice || null === r.children || r.children.forEach((function(r) {
							r._decode(t, e)
						})), r.contains && ("octstr" === r.tag || "bitstr" === r.tag)) {
						const n = new nM(i);
						i = this._getUse(r.contains, t._reporterState.obj)._decode(n, e)
					}
				}
				return r.obj && o && (i = t.leaveObject(n)), null === r.key || null === i && !0 !== o ? null !==
					a && t.exitKey(a) : t.leaveKey(a, r.key, i), i
			}, hM.prototype._decodeGeneric = function(t, e, r) {
				const n = this._baseState;
				return "seq" === t || "set" === t ? null : "seqof" === t || "setof" === t ? this._decodeList(e, t, n
						.args[0], r) : /str$/.test(t) ? this._decodeStr(e, t, r) : "objid" === t && n.args ? this
					._decodeObjid(e, n.args[0], n.args[1], r) : "objid" === t ? this._decodeObjid(e, null, null,
					r) : "gentime" === t || "utctime" === t ? this._decodeTime(e, t, r) : "null_" === t ? this
					._decodeNull(e, r) : "bool" === t ? this._decodeBool(e, r) : "objDesc" === t ? this._decodeStr(
						e, t, r) : "int" === t || "enum" === t ? this._decodeInt(e, n.args && n.args[0], r) :
					null !== n.use ? this._getUse(n.use, e._reporterState.obj)._decode(e, r) : e.error(
						"unknown tag: " + t)
			}, hM.prototype._getUse = function(t, e) {
				const r = this._baseState;
				return r.useDecoder = this._use(t, e), iM(null === r.useDecoder._baseState.parent), r.useDecoder = r
					.useDecoder._baseState.children[0], r.implicit !== r.useDecoder._baseState.implicit && (r
						.useDecoder = r.useDecoder.clone(), r.useDecoder._baseState.implicit = r.implicit), r
					.useDecoder
			}, hM.prototype._decodeChoice = function(t, e) {
				const r = this._baseState;
				let n = null,
					i = !1;
				return Object.keys(r.choice).some((function(o) {
					const a = t.save(),
						s = r.choice[o];
					try {
						const r = s._decode(t, e);
						if (t.isError(r)) return !1;
						n = {
							type: o,
							value: r
						}, i = !0
					} catch (e) {
						return t.restore(a), !1
					}
					return !0
				}), this), i ? n : t.error("Choice not matched")
			}, hM.prototype._createEncoderBuffer = function(t) {
				return new rM(t, this.reporter)
			}, hM.prototype._encode = function(t, e, r) {
				const n = this._baseState;
				if (null !== n.default && n.default === t) return;
				const i = this._encodeValue(t, e, r);
				return void 0 === i || this._skipDefault(i, e, r) ? void 0 : i
			}, hM.prototype._encodeValue = function(t, e, r) {
				const n = this._baseState;
				if (null === n.parent) return n.children[0]._encode(t, e || new eM);
				let i = null;
				if (this.reporter = e, n.optional && void 0 === t) {
					if (null === n.default) return;
					t = n.default
				}
				let o = null,
					a = !1;
				if (n.any) i = this._createEncoderBuffer(t);
				else if (n.choice) i = this._encodeChoice(t, e);
				else if (n.contains) o = this._getUse(n.contains, r)._encode(t, e), a = !0;
				else if (n.children) o = n.children.map((function(r) {
					if ("null_" === r._baseState.tag) return r._encode(null, e, t);
					if (null === r._baseState.key) return e.error("Child should have a key");
					const n = e.enterKey(r._baseState.key);
					if ("object" != typeof t) return e.error("Child expected, but input is not object");
					const i = r._encode(t[r._baseState.key], e, t);
					return e.leaveKey(n), i
				}), this).filter((function(t) {
					return t
				})), o = this._createEncoderBuffer(o);
				else if ("seqof" === n.tag || "setof" === n.tag) {
					if (!n.args || 1 !== n.args.length) return e.error("Too many args for : " + n.tag);
					if (!Array.isArray(t)) return e.error("seqof/setof, but data is not Array");
					const r = this.clone();
					r._baseState.implicit = null, o = this._createEncoderBuffer(t.map((function(r) {
						const n = this._baseState;
						return this._getUse(n.args[0], t)._encode(r, e)
					}), r))
				} else null !== n.use ? i = this._getUse(n.use, r)._encode(t, e) : (o = this._encodePrimitive(n.tag,
					t), a = !0);
				if (!n.any && null === n.choice) {
					const t = null !== n.implicit ? n.implicit : n.tag,
						r = null === n.implicit ? "universal" : "context";
					null === t ? null === n.use && e.error("Tag could be omitted only for .use()") : null === n
						.use && (i = this._encodeComposite(t, a, r, o))
				}
				return null !== n.explicit && (i = this._encodeComposite(n.explicit, !1, "context", i)), i
			}, hM.prototype._encodeChoice = function(t, e) {
				const r = this._baseState,
					n = r.choice[t.type];
				return n || iM(!1, t.type + " not found in " + JSON.stringify(Object.keys(r.choice))), n._encode(t
					.value, e)
			}, hM.prototype._encodePrimitive = function(t, e) {
				const r = this._baseState;
				if (/str$/.test(t)) return this._encodeStr(e, t);
				if ("objid" === t && r.args) return this._encodeObjid(e, r.reverseArgs[0], r.args[1]);
				if ("objid" === t) return this._encodeObjid(e, null, null);
				if ("gentime" === t || "utctime" === t) return this._encodeTime(e, t);
				if ("null_" === t) return this._encodeNull();
				if ("int" === t || "enum" === t) return this._encodeInt(e, r.args && r.reverseArgs[0]);
				if ("bool" === t) return this._encodeBool(e);
				if ("objDesc" === t) return this._encodeStr(e, t);
				throw new Error("Unsupported tag: " + t)
			}, hM.prototype._isNumstr = function(t) {
				return /^[0-9 ]*$/.test(t)
			}, hM.prototype._isPrintstr = function(t) {
				return /^[A-Za-z0-9 '()+,-./:=?]*$/.test(t)
			}), tM
	}
	var dM, lM, pM, mM, bM, gM = !1;

	function vM(t) {
		const e = {};
		return Object.keys(t).forEach((function(r) {
			(0 | r) == r && (r |= 0);
			const n = t[r];
			e[n] = r
		})), e
	}

	function yM() {
		return gM || (gM = !0, (dM = {}).tagClass = lM = {
			0: "universal",
			1: "application",
			2: "context",
			3: "private"
		}, pM = vM(lM), dM.tagClassByName = pM, mM = {
			0: "end",
			1: "bool",
			2: "int",
			3: "bitstr",
			4: "octstr",
			5: "null_",
			6: "objid",
			7: "objDesc",
			8: "external",
			9: "real",
			10: "enum",
			11: "embed",
			12: "utf8str",
			13: "relativeOid",
			16: "seq",
			17: "set",
			18: "numstr",
			19: "printstr",
			20: "t61str",
			21: "videostr",
			22: "ia5str",
			23: "utctime",
			24: "gentime",
			25: "graphstr",
			26: "iso646str",
			27: "genstr",
			28: "unistr",
			29: "charstr",
			30: "bmpstr"
		}, dM.tag = mM, bM = vM(mM), dM.tagByName = bM), dM
	}
	var wM, _M, AM, MM, EM = !1;

	function SM(t) {
		this.enc = "der", this.name = t.name, this.entity = t, this.tree = new kM, this.tree._init(t.body)
	}

	function kM(t) {
		MM.call(this, "der", t)
	}

	function BM(t) {
		return t < 10 ? "0" + t : t
	}

	function TM() {
		wM = {}, _M = Mr(), AM = LA().Buffer, MM = cM(), yM(), wM = SM, SM.prototype.encode = function(t, e) {
			return this.tree._encode(t, e).join()
		}, _M(kM, MM), kM.prototype._encodeComposite = function(t, e, r, n) {
			const i = function(t, e, r, n) {
				let i;
				if ("seqof" === t ? t = "seq" : "setof" === t && (t = "set"), yM().tagByName.hasOwnProperty(t))
					i = yM().tagByName[t];
				else {
					if ("number" != typeof t || (0 | t) !== t) return n.error("Unknown tag: " + t);
					i = t
				}
				return i >= 31 ? n.error("Multi-octet tag encoding unsupported") : (e || (i |= 32), i |= yM()
					.tagClassByName[r || "universal"] << 6, i)
			}(t, e, r, this.reporter);
			if (n.length < 128) {
				const t = AM.alloc(2);
				return t[0] = i, t[1] = n.length, this._createEncoderBuffer([t, n])
			}
			let o = 1;
			for (let t = n.length; t >= 256; t >>= 8) o++;
			const a = AM.alloc(2 + o);
			a[0] = i, a[1] = 128 | o;
			for (let t = 1 + o, e = n.length; e > 0; t--, e >>= 8) a[t] = 255 & e;
			return this._createEncoderBuffer([a, n])
		}, kM.prototype._encodeStr = function(t, e) {
			if ("bitstr" === e) return this._createEncoderBuffer([0 | t.unused, t.data]);
			if ("bmpstr" === e) {
				const e = AM.alloc(2 * t.length);
				for (let r = 0; r < t.length; r++) e.writeUInt16BE(t.charCodeAt(r), 2 * r);
				return this._createEncoderBuffer(e)
			}
			return "numstr" === e ? this._isNumstr(t) ? this._createEncoderBuffer(t) : this.reporter.error(
					"Encoding of string type: numstr supports only digits and space") : "printstr" === e ? this
				._isPrintstr(t) ? this._createEncoderBuffer(t) : this.reporter.error(
					"Encoding of string type: printstr supports only latin upper and lower case letters, digits, space, apostrophe, left and rigth parenthesis, plus sign, comma, hyphen, dot, slash, colon, equal sign, question mark"
					) : /str$/.test(e) || "objDesc" === e ? this._createEncoderBuffer(t) : this.reporter.error(
					"Encoding of string type: " + e + " unsupported")
		}, kM.prototype._encodeObjid = function(t, e, r) {
			if ("string" == typeof t) {
				if (!e) return this.reporter.error("string objid given, but no values map found");
				if (!e.hasOwnProperty(t)) return this.reporter.error("objid not found in values map");
				t = e[t].split(/[\s.]+/g);
				for (let e = 0; e < t.length; e++) t[e] |= 0
			} else if (Array.isArray(t)) {
				t = t.slice();
				for (let e = 0; e < t.length; e++) t[e] |= 0
			}
			if (!Array.isArray(t)) return this.reporter.error("objid() should be either array or string, got: " +
				JSON.stringify(t));
			if (!r) {
				if (t[1] >= 40) return this.reporter.error("Second objid identifier OOB");
				t.splice(0, 2, 40 * t[0] + t[1])
			}
			let n = 0;
			for (let e = 0; e < t.length; e++) {
				let r = t[e];
				for (n++; r >= 128; r >>= 7) n++
			}
			const i = AM.alloc(n);
			let o = i.length - 1;
			for (let e = t.length - 1; e >= 0; e--) {
				let r = t[e];
				for (i[o--] = 127 & r;
					(r >>= 7) > 0;) i[o--] = 128 | 127 & r
			}
			return this._createEncoderBuffer(i)
		}, kM.prototype._encodeTime = function(t, e) {
			let r;
			const n = new Date(t);
			return "gentime" === e ? r = [BM(n.getUTCFullYear()), BM(n.getUTCMonth() + 1), BM(n.getUTCDate()), BM(n
					.getUTCHours()), BM(n.getUTCMinutes()), BM(n.getUTCSeconds()), "Z"].join("") : "utctime" === e ?
				r = [BM(n.getUTCFullYear() % 100), BM(n.getUTCMonth() + 1), BM(n.getUTCDate()), BM(n.getUTCHours()),
					BM(n.getUTCMinutes()), BM(n.getUTCSeconds()), "Z"
				].join("") : this.reporter.error("Encoding " + e + " time is not supported yet"), this._encodeStr(r,
					"octstr")
		}, kM.prototype._encodeNull = function() {
			return this._createEncoderBuffer("")
		}, kM.prototype._encodeInt = function(t, e) {
			if ("string" == typeof t) {
				if (!e) return this.reporter.error("String int or enum given, but no values map");
				if (!e.hasOwnProperty(t)) return this.reporter.error("Values map doesn't contain: " + JSON
					.stringify(t));
				t = e[t]
			}
			if ("number" != typeof t && !AM.isBuffer(t)) {
				const e = t.toArray();
				!t.sign && 128 & e[0] && e.unshift(0), t = AM.from(e)
			}
			if (AM.isBuffer(t)) {
				let e = t.length;
				0 === t.length && e++;
				const r = AM.alloc(e);
				return t.copy(r), 0 === t.length && (r[0] = 0), this._createEncoderBuffer(r)
			}
			if (t < 128) return this._createEncoderBuffer(t);
			if (t < 256) return this._createEncoderBuffer([0, t]);
			let r = 1;
			for (let e = t; e >= 256; e >>= 8) r++;
			const n = new Array(r);
			for (let e = n.length - 1; e >= 0; e--) n[e] = 255 & t, t >>= 8;
			return 128 & n[0] && n.unshift(0), this._createEncoderBuffer(AM.from(n))
		}, kM.prototype._encodeBool = function(t) {
			return this._createEncoderBuffer(t ? 255 : 0)
		}, kM.prototype._use = function(t, e) {
			return "function" == typeof t && (t = t(e)), t._getEncoder("der").tree
		}, kM.prototype._skipDefault = function(t, e, r) {
			const n = this._baseState;
			let i;
			if (null === n.default) return !1;
			const o = t.join();
			if (void 0 === n.defaultBuffer && (n.defaultBuffer = this._encodeValue(n.default, e, r).join()), o
				.length !== n.defaultBuffer.length) return !1;
			for (i = 0; i < o.length; i++)
				if (o[i] !== n.defaultBuffer[i]) return !1;
			return !0
		}
	}

	function RM() {
		return EM || (EM = !0, TM()), wM
	}
	var xM, CM, IM, DM = !1;

	function PM(t) {
		IM.call(this, t), this.enc = "pem"
	}

	function OM() {
		return DM || (DM = !0, xM = {}, CM = Mr(), IM = RM(), CM(PM, IM), xM = PM, PM.prototype.encode = function(t,
		e) {
			const r = IM.prototype.encode.call(this, t).toString("base64"),
				n = ["-----BEGIN " + e.label + "-----"];
			for (let t = 0; t < r.length; t += 64) n.push(r.slice(t, t + 64));
			return n.push("-----END " + e.label + "-----"), n.join("\n")
		}), xM
	}
	var LM, UM, jM = !1;

	function NM() {
		return jM || (jM = !0, (UM = LM = {}).der = RM(), UM.pem = OM()), LM
	}
	var zM, FM, qM, HM, WM, GM = !1;

	function YM(t) {
		this.enc = "der", this.name = t.name, this.entity = t, this.tree = new KM, this.tree._init(t.body)
	}

	function KM(t) {
		WM.call(this, "der", t)
	}

	function VM(t, e) {
		let r = t.readUInt8(e);
		if (t.isError(r)) return r;
		const n = yM().tagClass[r >> 6],
			i = 0 == (32 & r);
		if (31 == (31 & r)) {
			let n = r;
			for (r = 0; 128 == (128 & n);) {
				if (n = t.readUInt8(e), t.isError(n)) return n;
				r <<= 7, r |= 127 & n
			}
		} else r &= 31;
		return {
			cls: n,
			primitive: i,
			tag: r,
			tagStr: yM().tag[r]
		}
	}

	function ZM(t, e, r) {
		let n = t.readUInt8(r);
		if (t.isError(n)) return n;
		if (!e && 128 === n) return null;
		if (0 == (128 & n)) return n;
		const i = 127 & n;
		if (i > 4) return t.error("length octect is too long");
		n = 0;
		for (let e = 0; e < i; e++) {
			n <<= 8;
			const e = t.readUInt8(r);
			if (t.isError(e)) return e;
			n |= e
		}
		return n
	}

	function $M() {
		return GM || (GM = !0, zM = {}, FM = Mr(), qM = pm(), HM = QA().DecoderBuffer, WM = cM(), yM(), zM = YM, YM
			.prototype.decode = function(t, e) {
				return HM.isDecoderBuffer(t) || (t = new HM(t, e)), this.tree._decode(t, e)
			}, FM(KM, WM), KM.prototype._peekTag = function(t, e, r) {
				if (t.isEmpty()) return !1;
				const n = t.save(),
					i = VM(t, 'Failed to peek tag: "' + e + '"');
				return t.isError(i) ? i : (t.restore(n), i.tag === e || i.tagStr === e || i.tagStr + "of" === e ||
					r)
			}, KM.prototype._decodeTag = function(t, e, r) {
				const n = VM(t, 'Failed to decode tag of "' + e + '"');
				if (t.isError(n)) return n;
				let i = ZM(t, n.primitive, 'Failed to get length of "' + e + '"');
				if (t.isError(i)) return i;
				if (!r && n.tag !== e && n.tagStr !== e && n.tagStr + "of" !== e) return t.error(
					'Failed to match tag: "' + e + '"');
				if (n.primitive || null !== i) return t.skip(i, 'Failed to match body of: "' + e + '"');
				const o = t.save(),
					a = this._skipUntilEnd(t, 'Failed to skip indefinite length body: "' + this.tag + '"');
				return t.isError(a) ? a : (i = t.offset - o.offset, t.restore(o), t.skip(i,
					'Failed to match body of: "' + e + '"'))
			}, KM.prototype._skipUntilEnd = function(t, e) {
				for (;;) {
					const r = VM(t, e);
					if (t.isError(r)) return r;
					const n = ZM(t, r.primitive, e);
					if (t.isError(n)) return n;
					let i;
					if (i = r.primitive || null !== n ? t.skip(n) : this._skipUntilEnd(t, e), t.isError(i))
				return i;
					if ("end" === r.tagStr) break
				}
			}, KM.prototype._decodeList = function(t, e, r, n) {
				const i = [];
				for (; !t.isEmpty();) {
					const e = this._peekTag(t, "end");
					if (t.isError(e)) return e;
					const o = r.decode(t, "der", n);
					if (t.isError(o) && e) break;
					i.push(o)
				}
				return i
			}, KM.prototype._decodeStr = function(t, e) {
				if ("bitstr" === e) {
					const e = t.readUInt8();
					return t.isError(e) ? e : {
						unused: e,
						data: t.raw()
					}
				}
				if ("bmpstr" === e) {
					const e = t.raw();
					if (e.length % 2 == 1) return t.error("Decoding of string type: bmpstr length mismatch");
					let r = "";
					for (let t = 0; t < e.length / 2; t++) r += String.fromCharCode(e.readUInt16BE(2 * t));
					return r
				}
				if ("numstr" === e) {
					const e = t.raw().toString("ascii");
					return this._isNumstr(e) ? e : t.error("Decoding of string type: numstr unsupported characters")
				}
				if ("octstr" === e) return t.raw();
				if ("objDesc" === e) return t.raw();
				if ("printstr" === e) {
					const e = t.raw().toString("ascii");
					return this._isPrintstr(e) ? e : t.error(
						"Decoding of string type: printstr unsupported characters")
				}
				return /str$/.test(e) ? t.raw().toString() : t.error("Decoding of string type: " + e +
					" unsupported")
			}, KM.prototype._decodeObjid = function(t, e, r) {
				let n;
				const i = [];
				let o = 0,
					a = 0;
				for (; !t.isEmpty();) a = t.readUInt8(), o <<= 7, o |= 127 & a, 0 == (128 & a) && (i.push(o), o =
				0);
				128 & a && i.push(o);
				const s = i[0] / 40 | 0,
					f = i[0] % 40;
				if (n = r ? i : [s, f].concat(i.slice(1)), e) {
					let t = e[n.join(" ")];
					void 0 === t && (t = e[n.join(".")]), void 0 !== t && (n = t)
				}
				return n
			}, KM.prototype._decodeTime = function(t, e) {
				const r = t.raw().toString();
				let n, i, o, a, s, f;
				if ("gentime" === e) n = 0 | r.slice(0, 4), i = 0 | r.slice(4, 6), o = 0 | r.slice(6, 8), a = 0 | r
					.slice(8, 10), s = 0 | r.slice(10, 12), f = 0 | r.slice(12, 14);
				else {
					if ("utctime" !== e) return t.error("Decoding " + e + " time is not supported yet");
					n = 0 | r.slice(0, 2), i = 0 | r.slice(2, 4), o = 0 | r.slice(4, 6), a = 0 | r.slice(6, 8), s =
						0 | r.slice(8, 10), f = 0 | r.slice(10, 12), n = n < 70 ? 2e3 + n : 1900 + n
				}
				return Date.UTC(n, i - 1, o, a, s, f, 0)
			}, KM.prototype._decodeNull = function() {
				return null
			}, KM.prototype._decodeBool = function(t) {
				const e = t.readUInt8();
				return t.isError(e) ? e : 0 !== e
			}, KM.prototype._decodeInt = function(t, e) {
				const r = t.raw();
				let n = new qM(r);
				return e && (n = e[n.toString(10)] || n), n
			}, KM.prototype._use = function(t, e) {
				return "function" == typeof t && (t = t(e)), t._getDecoder("der").tree
			}), zM
	}
	var XM, JM, QM, tE, eE = !1;

	function rE(t) {
		tE.call(this, t), this.enc = "pem"
	}

	function nE() {
		return eE || (eE = !0, XM = {}, JM = Mr(), QM = LA().Buffer, tE = $M(), JM(rE, tE), XM = rE, rE.prototype
			.decode = function(t, e) {
				const r = t.toString().split(/[\r\n]+/g),
					n = e.label.toUpperCase(),
					i = /^-----(BEGIN|END) ([^-]+)-----$/;
				let o = -1,
					a = -1;
				for (let t = 0; t < r.length; t++) {
					const e = r[t].match(i);
					if (null !== e && e[2] === n) {
						if (-1 !== o) {
							if ("END" !== e[1]) break;
							a = t;
							break
						}
						if ("BEGIN" !== e[1]) break;
						o = t
					}
				}
				if (-1 === o || -1 === a) throw new Error("PEM section not found for: " + n);
				const s = r.slice(o + 1, a).join("");
				s.replace(/[^a-z0-9+/=]+/gi, "");
				const f = QM.from(s, "base64");
				return tE.prototype.decode.call(this, f, e)
			}), XM
	}
	var iE, oE, aE = !1;

	function sE() {
		return aE || (aE = !0, (oE = iE = {}).der = $M(), oE.pem = nE()), iE
	}
	var fE, uE, hE, cE, dE = !1;

	function lE(t, e) {
		this.name = t, this.body = e, this.decoders = {}, this.encoders = {}
	}

	function pE() {
		return dE || (dE = !0, fE = {}, uE = NM(), hE = sE(), cE = Mr(), fE.define = function(t, e) {
			return new lE(t, e)
		}, lE.prototype._createNamed = function(t) {
			const e = this.name;

			function r(t) {
				this._initNamed(t, e)
			}
			return cE(r, t), r.prototype._initNamed = function(e, r) {
				t.call(this, e, r)
			}, new r(this)
		}, lE.prototype._getDecoder = function(t) {
			return t = t || "der", this.decoders.hasOwnProperty(t) || (this.decoders[t] = this._createNamed(hE[
				t])), this.decoders[t]
		}, lE.prototype.decode = function(t, e, r) {
			return this._getDecoder(e).decode(t, r)
		}, lE.prototype._getEncoder = function(t) {
			return t = t || "der", this.encoders.hasOwnProperty(t) || (this.encoders[t] = this._createNamed(uE[
				t])), this.encoders[t]
		}, lE.prototype.encode = function(t, e, r) {
			return this._getEncoder(e).encode(t, r)
		}), fE
	}
	var mE, bE, gE = !1;

	function vE() {
		return gE || (gE = !0, (bE = mE = {}).Reporter = HA().Reporter, bE.DecoderBuffer = QA().DecoderBuffer, bE
			.EncoderBuffer = QA().EncoderBuffer, bE.Node = cM()), mE
	}
	var yE, wE, _E = !1;

	function AE() {
		return _E || (_E = !0, (wE = yE = {})._reverse = function(t) {
			const e = {};
			return Object.keys(t).forEach((function(r) {
				(0 | r) == r && (r |= 0);
				const n = t[r];
				e[n] = r
			})), e
		}, wE.der = yM()), yE
	}
	var ME, EE, SE = !1;

	function kE() {
		return SE || (SE = !0, (EE = ME = {}).bignum = pm(), EE.define = pE().define, EE.base = vE(), EE.constants =
		AE(), EE.decoders = sE(), EE.encoders = NM()), ME
	}
	var BE, TE, RE, xE, CE, IE, DE, PE, OE, LE, UE, jE, NE = !1;

	function zE() {
		return NE || (NE = !0, BE = {}, kE(), TE = kE().define("Time", (function() {
			this.choice({
				utcTime: this.utctime(),
				generalTime: this.gentime()
			})
		})), RE = kE().define("AttributeTypeValue", (function() {
			this.seq().obj(this.key("type").objid(), this.key("value").any())
		})), xE = kE().define("AlgorithmIdentifier", (function() {
			this.seq().obj(this.key("algorithm").objid(), this.key("parameters").optional(), this.key(
				"curve").objid().optional())
		})), CE = kE().define("SubjectPublicKeyInfo", (function() {
			this.seq().obj(this.key("algorithm").use(xE), this.key("subjectPublicKey").bitstr())
		})), IE = kE().define("RelativeDistinguishedName", (function() {
			this.setof(RE)
		})), DE = kE().define("RDNSequence", (function() {
			this.seqof(IE)
		})), PE = kE().define("Name", (function() {
			this.choice({
				rdnSequence: this.use(DE)
			})
		})), OE = kE().define("Validity", (function() {
			this.seq().obj(this.key("notBefore").use(TE), this.key("notAfter").use(TE))
		})), LE = kE().define("Extension", (function() {
			this.seq().obj(this.key("extnID").objid(), this.key("critical").bool().def(!1), this.key(
				"extnValue").octstr())
		})), UE = kE().define("TBSCertificate", (function() {
			this.seq().obj(this.key("version").explicit(0).int().optional(), this.key("serialNumber")
				.int(), this.key("signature").use(xE), this.key("issuer").use(PE), this.key(
					"validity").use(OE), this.key("subject").use(PE), this.key(
					"subjectPublicKeyInfo").use(CE), this.key("issuerUniqueID").implicit(1).bitstr()
				.optional(), this.key("subjectUniqueID").implicit(2).bitstr().optional(), this.key(
					"extensions").explicit(3).seqof(LE).optional())
		})), jE = kE().define("X509Certificate", (function() {
			this.seq().obj(this.key("tbsCertificate").use(UE), this.key("signatureAlgorithm").use(xE),
				this.key("signatureValue").bitstr())
		})), BE = jE), BE
	}
	var FE, qE, HE, WE, GE, YE, KE, VE, ZE, $E, XE, JE, QE, tS, eS, rS, nS, iS, oS, aS, sS = !1;

	function fS() {
		return sS || (sS = !0, FE = {}, kE(), qE = zE(), FE.certificate = qE, HE = kE().define("RSAPrivateKey", (
			function() {
				this.seq().obj(this.key("version").int(), this.key("modulus").int(), this.key(
						"publicExponent").int(), this.key("privateExponent").int(), this.key("prime1")
					.int(), this.key("prime2").int(), this.key("exponent1").int(), this.key("exponent2")
					.int(), this.key("coefficient").int())
			})), WE = HE, FE.RSAPrivateKey = WE, GE = kE().define("RSAPublicKey", (function() {
			this.seq().obj(this.key("modulus").int(), this.key("publicExponent").int())
		})), YE = GE, FE.RSAPublicKey = YE, KE = kE().define("SubjectPublicKeyInfo", (function() {
			this.seq().obj(this.key("algorithm").use(ZE), this.key("subjectPublicKey").bitstr())
		})), VE = KE, FE.PublicKey = VE, ZE = kE().define("AlgorithmIdentifier", (function() {
			this.seq().obj(this.key("algorithm").objid(), this.key("none").null_().optional(), this.key(
				"curve").objid().optional(), this.key("params").seq().obj(this.key("p").int(),
				this.key("q").int(), this.key("g").int()).optional())
		})), $E = kE().define("PrivateKeyInfo", (function() {
			this.seq().obj(this.key("version").int(), this.key("algorithm").use(ZE), this.key(
				"subjectPrivateKey").octstr())
		})), XE = $E, FE.PrivateKey = XE, JE = kE().define("EncryptedPrivateKeyInfo", (function() {
			this.seq().obj(this.key("algorithm").seq().obj(this.key("id").objid(), this.key("decrypt")
				.seq().obj(this.key("kde").seq().obj(this.key("id").objid(), this.key(
					"kdeparams").seq().obj(this.key("salt").octstr(), this.key("iters")
					.int())), this.key("cipher").seq().obj(this.key("algo").objid(), this
					.key("iv").octstr()))), this.key("subjectPrivateKey").octstr())
		})), QE = JE, FE.EncryptedPrivateKey = QE, tS = kE().define("DSAPrivateKey", (function() {
			this.seq().obj(this.key("version").int(), this.key("p").int(), this.key("q").int(), this
				.key("g").int(), this.key("pub_key").int(), this.key("priv_key").int())
		})), eS = tS, FE.DSAPrivateKey = eS, rS = kE().define("DSAparam", (function() {
			this.int()
		})), FE.DSAparam = rS, nS = kE().define("ECPrivateKey", (function() {
			this.seq().obj(this.key("version").int(), this.key("privateKey").octstr(), this.key(
					"parameters").optional().explicit(0).use(oS), this.key("publicKey").optional()
				.explicit(1).bitstr())
		})), iS = nS, FE.ECPrivateKey = iS, oS = kE().define("ECParameters", (function() {
			this.choice({
				namedCurve: this.objid()
			})
		})), aS = kE().define("signature", (function() {
			this.seq().obj(this.key("r").int(), this.key("s").int())
		})), FE.signature = aS), FE
	}
	var uS, hS = !1;

	function cS() {
		return hS || (hS = !0, uS = {}, uS = JSON.parse(
			'{"2.16.840.1.101.3.4.1.1":"aes-128-ecb","2.16.840.1.101.3.4.1.2":"aes-128-cbc","2.16.840.1.101.3.4.1.3":"aes-128-ofb","2.16.840.1.101.3.4.1.4":"aes-128-cfb","2.16.840.1.101.3.4.1.21":"aes-192-ecb","2.16.840.1.101.3.4.1.22":"aes-192-cbc","2.16.840.1.101.3.4.1.23":"aes-192-ofb","2.16.840.1.101.3.4.1.24":"aes-192-cfb","2.16.840.1.101.3.4.1.41":"aes-256-ecb","2.16.840.1.101.3.4.1.42":"aes-256-cbc","2.16.840.1.101.3.4.1.43":"aes-256-ofb","2.16.840.1.101.3.4.1.44":"aes-256-cfb"}'
			)), uS
	}
	var dS, lS, pS, mS, bS, gS, vS = !1;

	function yS() {
		return vS || (vS = !0, dS = {}, lS =
			/Proc-Type: 4,ENCRYPTED[\n\r]+DEK-Info: AES-((?:128)|(?:192)|(?:256))-CBC,([0-9A-H]+)[\n\r]+([0-9A-z\n\r+/=]+)[\n\r]+/m,
			pS = /^-----BEGIN ((?:.*? KEY)|CERTIFICATE)-----/m, mS =
			/^-----BEGIN ((?:.*? KEY)|CERTIFICATE)-----([0-9A-z\n\r+/=]+)-----END \1-----$/m, bS = Nl(), Ip(), gS =
			cr().Buffer, dS = function(t, e) {
				var r, n = t.toString(),
					i = n.match(lS);
				if (i) {
					var o = "aes" + i[1],
						a = gS.from(i[2], "hex"),
						s = gS.from(i[3].replace(/[\r\n]/g, ""), "base64"),
						f = bS(e, a.slice(0, 8), parseInt(i[1], 10)).key,
						u = [],
						h = Ip().createDecipheriv(o, f, a);
					u.push(h.update(s)), u.push(h.final()), r = gS.concat(u)
				} else {
					var c = n.match(mS);
					r = gS.from(c[2].replace(/[\r\n]/g, ""), "base64")
				}
				return {
					tag: n.match(pS)[1],
					data: r
				}
			}), dS
	}
	var wS, _S, AS, MS, ES = !1;

	function SS(t) {
		var e;
		"object" != typeof t || MS.isBuffer(t) || (e = t.passphrase, t = t.key), "string" == typeof t && (t = MS.from(
			t));
		var r, n, i = AS(t, e),
			o = i.tag,
			a = i.data;
		switch (o) {
			case "CERTIFICATE":
				n = fS().certificate.decode(a, "der").tbsCertificate.subjectPublicKeyInfo;
			case "PUBLIC KEY":
				switch (n || (n = fS().PublicKey.decode(a, "der")), r = n.algorithm.algorithm.join(".")) {
					case "1.2.840.113549.1.1.1":
						return fS().RSAPublicKey.decode(n.subjectPublicKey.data, "der");
					case "1.2.840.10045.2.1":
						return n.subjectPrivateKey = n.subjectPublicKey, {
							type: "ec",
							data: n
						};
					case "1.2.840.10040.4.1":
						return n.algorithm.params.pub_key = fS().DSAparam.decode(n.subjectPublicKey.data, "der"), {
							type: "dsa",
							data: n.algorithm.params
						};
					default:
						throw new Error("unknown key id " + r)
				}
				case "ENCRYPTED PRIVATE KEY":
					a = function(t, e) {
						var r = t.algorithm.decrypt.kde.kdeparams.salt,
							n = parseInt(t.algorithm.decrypt.kde.kdeparams.iters.toString(), 10),
							i = _S[t.algorithm.decrypt.cipher.algo.join(".")],
							o = t.algorithm.decrypt.cipher.iv,
							a = t.subjectPrivateKey,
							s = parseInt(i.split("-")[1], 10) / 8,
							f = Oh().pbkdf2Sync(e, r, n, s, "sha1"),
							u = Ip().createDecipheriv(i, f, o),
							h = [];
						return h.push(u.update(a)), h.push(u.final()), MS.concat(h)
					}(a = fS().EncryptedPrivateKey.decode(a, "der"), e);
				case "PRIVATE KEY":
					switch (r = (n = fS().PrivateKey.decode(a, "der")).algorithm.algorithm.join(".")) {
						case "1.2.840.113549.1.1.1":
							return fS().RSAPrivateKey.decode(n.subjectPrivateKey, "der");
						case "1.2.840.10045.2.1":
							return {
								curve: n.algorithm.curve, privateKey: fS().ECPrivateKey.decode(n.subjectPrivateKey,
									"der").privateKey
							};
						case "1.2.840.10040.4.1":
							return n.algorithm.params.priv_key = fS().DSAparam.decode(n.subjectPrivateKey, "der"), {
								type: "dsa",
								params: n.algorithm.params
							};
						default:
							throw new Error("unknown key id " + r)
					}
					case "RSA PUBLIC KEY":
						return fS().RSAPublicKey.decode(a, "der");
					case "RSA PRIVATE KEY":
						return fS().RSAPrivateKey.decode(a, "der");
					case "DSA PRIVATE KEY":
						return {
							type: "dsa", params: fS().DSAPrivateKey.decode(a, "der")
						};
					case "EC PRIVATE KEY":
						return {
							curve: (a = fS().ECPrivateKey.decode(a, "der")).parameters.value, privateKey: a.privateKey
						};
					default:
						throw new Error("unknown key type " + o)
		}
	}

	function kS() {
		return ES || (ES = !0, wS = {}, fS(), _S = cS(), AS = yS(), Ip(), Oh(), MS = cr().Buffer, wS = SS, SS
			.signature = fS().signature), wS
	}
	var BS, TS = !1;

	function RS() {
		return TS || (TS = !0, BS = {}, BS = JSON.parse(
			'{"1.3.132.0.10":"secp256k1","1.3.132.0.33":"p224","1.2.840.10045.3.1.1":"p192","1.2.840.10045.3.1.7":"p256","1.3.132.0.34":"p384","1.3.132.0.35":"p521"}'
			)), BS
	}
	var xS, CS, IS, DS, PS, OS, LS, US, jS, NS, zS = !1;

	function FS(t, e, r, n, i) {
		var o = LS(e);
		if (o.curve) {
			if ("ecdsa" !== n && "ecdsa/rsa" !== n) throw new Error("wrong private key type");
			return function(t, e) {
				var r = US[e.curve.join(".")];
				if (!r) throw new Error("unknown curve " + e.curve.join("."));
				var n = new PS(r).keyFromPrivate(e.privateKey).sign(t);
				return CS.from(n.toDER())
			}(t, o)
		}
		if ("dsa" === o.type) {
			if ("dsa" !== n) throw new Error("wrong private key type");
			return function(t, e, r) {
				var n, i = e.params.priv_key,
					o = e.params.p,
					a = e.params.q,
					s = e.params.g,
					f = new OS(0),
					u = HS(t, a).mod(a),
					h = !1,
					c = qS(i, a, t, r);
				for (; !1 === h;) f = GS(s, n = WS(a, c, r), o, a), 0 === (h = n.invm(a).imul(u.add(i.mul(f))).mod(
					a)).cmpn(0) && (h = !1, f = new OS(0));
				return function(t, e) {
					t = t.toArray(), e = e.toArray(), 128 & t[0] && (t = [0].concat(t));
					128 & e[0] && (e = [0].concat(e));
					var r = [48, t.length + e.length + 4, 2, t.length];
					return r = r.concat(t, [2, e.length], e), CS.from(r)
				}(f, h)
			}(t, o, r)
		}
		if ("rsa" !== n && "ecdsa/rsa" !== n) throw new Error("wrong private key type");
		t = CS.concat([i, t]);
		for (var a = o.modulus.byteLength(), s = [0, 1]; t.length + s.length + 1 < a;) s.push(255);
		s.push(0);
		for (var f = -1; ++f < t.length;) s.push(t[f]);
		return DS(s, o)
	}

	function qS(t, e, r, n) {
		if ((t = CS.from(t.toArray())).length < e.byteLength()) {
			var i = CS.alloc(e.byteLength() - t.length);
			t = CS.concat([i, t])
		}
		var o = r.length,
			a = function(t, e) {
				t = (t = HS(t, e)).mod(e);
				var r = CS.from(t.toArray());
				if (r.length < e.byteLength()) {
					var n = CS.alloc(e.byteLength() - r.length);
					r = CS.concat([n, r])
				}
				return r
			}(r, e),
			s = CS.alloc(o);
		s.fill(1);
		var f = CS.alloc(o);
		return f = IS(n, f).update(s).update(CS.from([0])).update(t).update(a).digest(), s = IS(n, f).update(s)
		.digest(), {
				k: f = IS(n, f).update(s).update(CS.from([1])).update(t).update(a).digest(),
				v: s = IS(n, f).update(s).digest()
			}
	}

	function HS(t, e) {
		var r = new OS(t),
			n = (t.length << 3) - e.bitLength();
		return n > 0 && r.ishrn(n), r
	}

	function WS(t, e, r) {
		var n, i;
		do {
			for (n = CS.alloc(0); 8 * n.length < t.bitLength();) e.v = IS(r, e.k).update(e.v).digest(), n = CS.concat([
				n, e.v
			]);
			i = HS(n, t), e.k = IS(r, e.k).update(e.v).update(CS.from([0])).digest(), e.v = IS(r, e.k).update(e.v)
				.digest()
		} while (-1 !== i.cmp(t));
		return i
	}

	function GS(t, e, r, n) {
		return t.toRed(OS.mont(r)).redPow(e).fromRed().mod(n)
	}

	function YS() {
		return zS || (zS = !0, xS = {}, CS = cr().Buffer, IS = Ou(), DS = jb(), PS = EA().ec, OS = TA(), LS = kS(), US =
			RS(), jS = qS, (xS = FS).getKey = jS, NS = WS, xS.makeKey = NS), xS
	}
	var KS, VS, ZS, $S, XS, JS, QS = !1;

	function tk(t, e, r, n, i) {
		var o = XS(r);
		if ("ec" === o.type) {
			if ("ecdsa" !== n && "ecdsa/rsa" !== n) throw new Error("wrong public key type");
			return function(t, e, r) {
				var n = JS[r.data.algorithm.curve.join(".")];
				if (!n) throw new Error("unknown curve " + r.data.algorithm.curve.join("."));
				var i = new $S(n),
					o = r.data.subjectPrivateKey.data;
				return i.verify(e, t, o)
			}(t, e, o)
		}
		if ("dsa" === o.type) {
			if ("dsa" !== n) throw new Error("wrong public key type");
			return function(t, e, r) {
				var n = r.data.p,
					i = r.data.q,
					o = r.data.g,
					a = r.data.pub_key,
					s = XS.signature.decode(t, "der"),
					f = s.s,
					u = s.r;
				ek(f, i), ek(u, i);
				var h = ZS.mont(n),
					c = f.invm(i);
				return 0 === o.toRed(h).redPow(new ZS(e).mul(c).mod(i)).fromRed().mul(a.toRed(h).redPow(u.mul(c)
					.mod(i)).fromRed()).mod(n).mod(i).cmp(u)
			}(t, e, o)
		}
		if ("rsa" !== n && "ecdsa/rsa" !== n) throw new Error("wrong public key type");
		e = VS.concat([i, e]);
		for (var a = o.modulus.byteLength(), s = [1], f = 0; e.length + s.length + 2 < a;) s.push(255), f++;
		s.push(0);
		for (var u = -1; ++u < e.length;) s.push(e[u]);
		s = VS.from(s);
		var h = ZS.mont(o.modulus);
		t = (t = new ZS(t).toRed(h)).redPow(new ZS(o.publicExponent)), t = VS.from(t.fromRed().toArray());
		var c = f < 8 ? 1 : 0;
		for (a = Math.min(t.length, s.length), t.length !== s.length && (c = 1), u = -1; ++u < a;) c |= t[u] ^ s[u];
		return 0 === c
	}

	function ek(t, e) {
		if (t.cmpn(0) <= 0) throw new Error("invalid sig");
		if (t.cmp(e) >= e) throw new Error("invalid sig")
	}

	function rk() {
		return QS || (QS = !0, KS = {}, VS = cr().Buffer, ZS = TA(), $S = EA().ec, XS = kS(), JS = RS(), KS = tk), KS
	}
	var nk, ik, ok, ak, sk, fk, uk, hk = !1;

	function ck(t) {
		Oa().Writable.call(this);
		var e = uk[t];
		if (!e) throw new Error("Unknown message digest");
		this._hashType = e.hash, this._hash = ok(e.hash), this._tag = e.id, this._signType = e.sign
	}

	function dk(t) {
		Oa().Writable.call(this);
		var e = uk[t];
		if (!e) throw new Error("Unknown message digest");
		this._hash = ok(e.hash), this._tag = e.id, this._signType = e.sign
	}

	function lk(t) {
		return new ck(t)
	}

	function pk(t) {
		return new dk(t)
	}

	function mk() {
		return hk || (hk = !0, nk = {}, ik = cr().Buffer, ok = hu(), Oa(), ak = Mr(), sk = YS(), fk = rk(), uk = ju(),
			Object.keys(uk).forEach((function(t) {
				uk[t].id = ik.from(uk[t].id, "hex"), uk[t.toLowerCase()] = uk[t]
			})), ak(ck, Oa().Writable), ck.prototype._write = function(t, e, r) {
				this._hash.update(t), r()
			}, ck.prototype.update = function(t, e) {
				return "string" == typeof t && (t = ik.from(t, e)), this._hash.update(t), this
			}, ck.prototype.sign = function(t, e) {
				this.end();
				var r = this._hash.digest(),
					n = sk(r, t, this._hashType, this._signType, this._tag);
				return e ? n.toString(e) : n
			}, ak(dk, Oa().Writable), dk.prototype._write = function(t, e, r) {
				this._hash.update(t), r()
			}, dk.prototype.update = function(t, e) {
				return "string" == typeof t && (t = ik.from(t, e)), this._hash.update(t), this
			}, dk.prototype.verify = function(t, e, r) {
				"string" == typeof e && (e = ik.from(e, r)), this.end();
				var n = this._hash.digest();
				return fk(e, n, t, this._signType, this._tag)
			}, nk = {
				Sign: lk,
				Verify: pk,
				createSign: lk,
				createVerify: pk
			}), nk
	}
	var bk, gk, vk, yk, wk = !1;

	function _k(t) {
		this.curveType = yk[t], this.curveType || (this.curveType = {
			name: t
		}), this.curve = new(EA().ec)(this.curveType.name), this.keys = void 0
	}

	function Ak(t, e, r) {
		Array.isArray(t) || (t = t.toArray());
		var n = new gk(t);
		if (r && n.length < r) {
			var i = new gk(r - n.length);
			i.fill(0), n = gk.concat([i, n])
		}
		return e ? n.toString(e) : n
	}

	function Mk() {
		return wk || (wk = !0, bk = {}, gk = Ve().Buffer, EA(), vk = pm(), bk = function(t) {
				return new _k(t)
			}, (yk = {
				secp256k1: {
					name: "secp256k1",
					byteLength: 32
				},
				secp224r1: {
					name: "p224",
					byteLength: 28
				},
				prime256v1: {
					name: "p256",
					byteLength: 32
				},
				prime192v1: {
					name: "p192",
					byteLength: 24
				},
				ed25519: {
					name: "ed25519",
					byteLength: 32
				},
				secp384r1: {
					name: "p384",
					byteLength: 48
				},
				secp521r1: {
					name: "p521",
					byteLength: 66
				}
			}).p224 = yk.secp224r1, yk.p256 = yk.secp256r1 = yk.prime256v1, yk.p192 = yk.secp192r1 = yk.prime192v1,
			yk.p384 = yk.secp384r1, yk.p521 = yk.secp521r1, _k.prototype.generateKeys = function(t, e) {
				return this.keys = this.curve.genKeyPair(), this.getPublicKey(t, e)
			}, _k.prototype.computeSecret = function(t, e, r) {
				return e = e || "utf8", gk.isBuffer(t) || (t = new gk(t, e)), Ak(this.curve.keyFromPublic(t)
					.getPublic().mul(this.keys.getPrivate()).getX(), r, this.curveType.byteLength)
			}, _k.prototype.getPublicKey = function(t, e) {
				var r = this.keys.getPublic("compressed" === e, !0);
				return "hybrid" === e && (r[r.length - 1] % 2 ? r[0] = 7 : r[0] = 6), Ak(r, t)
			}, _k.prototype.getPrivateKey = function(t) {
				return Ak(this.keys.getPrivate(), t)
			}, _k.prototype.setPublicKey = function(t, e) {
				return e = e || "utf8", gk.isBuffer(t) || (t = new gk(t, e)), this.keys._importPublic(t), this
			}, _k.prototype.setPrivateKey = function(t, e) {
				e = e || "utf8", gk.isBuffer(t) || (t = new gk(t, e));
				var r = new vk(t);
				return r = r.toString(16), this.keys = this.curve.genKeyPair(), this.keys._importPrivate(r), this
			}), bk
	}
	var Ek, Sk, kk, Bk = !1;

	function Tk(t) {
		var e = kk.allocUnsafe(4);
		return e.writeUInt32BE(t, 0), e
	}

	function Rk() {
		return Bk || (Bk = !0, Ek = {}, Sk = hu(), kk = cr().Buffer, Ek = function(t, e) {
			for (var r, n = kk.alloc(0), i = 0; n.length < e;) r = Tk(i++), n = kk.concat([n, Sk("sha1").update(
				t).update(r).digest()]);
			return n.slice(0, e)
		}), Ek
	}
	var xk, Ck = !1;

	function Ik() {
		return Ck || (Ck = !0, xk = {}, xk = function(t, e) {
			for (var r = t.length, n = -1; ++n < r;) t[n] ^= e[n];
			return t
		}), xk
	}
	var Dk, Pk, Ok, Lk = !1;

	function Uk(t, e) {
		return Ok.from(t.toRed(Pk.mont(e.modulus)).redPow(new Pk(e.publicExponent)).fromRed().toArray())
	}

	function jk() {
		return Lk || (Lk = !0, Dk = {}, Pk = pm(), Ok = cr().Buffer, Dk = Uk), Dk
	}
	var Nk, zk, Fk, qk, Hk, Wk, Gk, Yk, Kk, Vk, Zk = !1;

	function $k(t, e, r) {
		var n, i = e.length,
			o = t.modulus.byteLength();
		if (i > o - 11) throw new Error("message too long");
		return n = r ? Vk.alloc(o - i - 3, 255) : function(t) {
			var e, r = Vk.allocUnsafe(t),
				n = 0,
				i = Fk(2 * t),
				o = 0;
			for (; n < t;) o === i.length && (i = Fk(2 * t), o = 0), (e = i[o++]) && (r[n++] = e);
			return r
		}(o - i - 3), new Gk(Vk.concat([Vk.from([0, r ? 1 : 2]), n, Vk.alloc(1), e], o))
	}

	function Xk() {
		Nk = {}, zk = kS(), Fk = wr(), qk = hu(), Hk = Rk(), Wk = Ik(), Gk = pm(), Yk = jk(), Kk = jb(), Vk = cr()
			.Buffer, Nk = function(t, e, r) {
				var n;
				n = t.padding ? t.padding : r ? 1 : 4;
				var i, o = zk(t);
				if (4 === n) i = function(t, e) {
					var r = t.modulus.byteLength(),
						n = e.length,
						i = qk("sha1").update(Vk.alloc(0)).digest(),
						o = i.length,
						a = 2 * o;
					if (n > r - a - 2) throw new Error("message too long");
					var s = Vk.alloc(r - n - a - 2),
						f = r - o - 1,
						u = Fk(o),
						h = Wk(Vk.concat([i, s, Vk.alloc(1, 1), e], f), Hk(u, f)),
						c = Wk(u, Hk(h, o));
					return new Gk(Vk.concat([Vk.alloc(1), c, h], r))
				}(o, e);
				else if (1 === n) i = $k(o, e, r);
				else {
					if (3 !== n) throw new Error("unknown padding");
					if ((i = new Gk(e)).cmp(o.modulus) >= 0) throw new Error("data too long for modulus")
				}
				return r ? Kk(i, o) : Yk(i, o)
			}
	}
	var Jk, Qk, tB, eB, rB, nB, iB, oB, aB, sB = !1;

	function fB(t, e) {
		var r = t.modulus.byteLength(),
			n = iB("sha1").update(aB.alloc(0)).digest(),
			i = n.length;
		if (0 !== e[0]) throw new Error("decryption error");
		var o = e.slice(1, i + 1),
			a = e.slice(i + 1),
			s = eB(o, tB(a, i)),
			f = eB(a, tB(s, r - i - 1));
		if (function(t, e) {
				t = aB.from(t), e = aB.from(e);
				var r = 0,
					n = t.length;
				t.length !== e.length && (r++, n = Math.min(t.length, e.length));
				var i = -1;
				for (; ++i < n;) r += t[i] ^ e[i];
				return r
			}(n, f.slice(0, i))) throw new Error("decryption error");
		for (var u = i; 0 === f[u];) u++;
		if (1 !== f[u++]) throw new Error("decryption error");
		return f.slice(u)
	}

	function uB() {
		Jk = {}, Qk = kS(), tB = Rk(), eB = Ik(), rB = pm(), nB = jb(), iB = hu(), oB = jk(), aB = cr().Buffer, Jk =
			function(t, e, r) {
				var n;
				n = t.padding ? t.padding : r ? 1 : 4;
				var i, o = Qk(t),
					a = o.modulus.byteLength();
				if (e.length > a || new rB(e).cmp(o.modulus) >= 0) throw new Error("decryption error");
				i = r ? oB(new rB(e), o) : nB(e, o);
				var s = aB.alloc(a - i.length);
				if (i = aB.concat([s, i], a), 4 === n) return fB(o, i);
				if (1 === n) return function(t, e, r) {
					for (var n = e.slice(0, 2), i = 2, o = 0; 0 !== e[i++];)
						if (i >= e.length) {
							o++;
							break
						} var a = e.slice(2, i - 1);
					if (("0002" !== n.toString("hex") && !r || "0001" !== n.toString("hex") && r) && o++, a
						.length < 8 && o++, o) throw new Error("decryption error");
					return e.slice(i)
				}(0, i, r);
				if (3 === n) return i;
				throw new Error("unknown padding")
			}
	}
	var hB, cB, dB, lB, pB, mB = !1;

	function bB() {
		hB = {}, Zk || (Zk = !0, Xk()), cB = Nk, hB.publicEncrypt = cB, sB || (sB = !0, uB()), dB = Jk, hB
			.privateDecrypt = dB, lB = function(t, e) {
				return cB(t, e, !0)
			}, hB.privateEncrypt = lB, pB = function(t, e) {
				return dB(t, e, !0)
			}, hB.publicDecrypt = pB
	}
	var gB, vB, yB, wB, _B, AB, MB, EB = !1;

	function SB() {
		throw new Error(
			"secure random number generation not supported by this browser\nuse chrome, FireFox or Internet Explorer 11"
			)
	}

	function kB(t, e) {
		if ("number" != typeof t || t != t) throw new TypeError("offset must be a number");
		if (t > MB || t < 0) throw new TypeError("offset must be a uint32");
		if (t > _B || t > e) throw new RangeError("offset out of range")
	}

	function BB(t, e, r) {
		if ("number" != typeof t || t != t) throw new TypeError("size must be a number");
		if (t > MB || t < 0) throw new TypeError("size must be a uint32");
		if (t + e > r || t > _B) throw new RangeError("buffer too small")
	}

	function TB(e, r, n, i) {
		if (!(wB.isBuffer(e) || e instanceof t.Uint8Array)) throw new TypeError(
			'"buf" argument must be a Buffer or Uint8Array');
		if ("function" == typeof r) i = r, r = 0, n = e.length;
		else if ("function" == typeof n) i = n, n = e.length - r;
		else if ("function" != typeof i) throw new TypeError('"cb" argument must be a function');
		return kB(r, e.length), BB(n, r, e.length), RB(e, r, n, i)
	}

	function RB(t, e, r, n) {
		var i = t.buffer,
			o = new Uint8Array(i, e, r);
		return AB.getRandomValues(o), n ? void Ut().nextTick((function() {
			n(null, t)
		})) : t
	}

	function xB(e, r, n) {
		if (void 0 === r && (r = 0), !(wB.isBuffer(e) || e instanceof t.Uint8Array)) throw new TypeError(
			'"buf" argument must be a Buffer or Uint8Array');
		return kB(r, e.length), void 0 === n && (n = e.length - r), BB(n, r, e.length), RB(e, r, n)
	}

	function CB() {
		return EB || (EB = !0, yB = {}, Ut(), cr(), wr(), wB = cr().Buffer, _B = cr().kMaxLength, AB = t.crypto || t
			.msCrypto, MB = Math.pow(2, 32) - 1, AB && AB.getRandomValues ? (gB = TB, yB.randomFill = gB, vB = xB,
				yB.randomFillSync = vB) : (gB = SB, yB.randomFill = gB, vB = SB, yB.randomFillSync = vB)), yB
	}
	var IB, DB, PB, OB, LB, UB, jB, NB, zB, FB, qB, HB, WB = !1;

	function GB() {
		UB = {}, PB = wr(), DB = UB.prng = PB, IB = UB.pseudoRandomBytes = DB, jB = UB.rng = IB, UB.randomBytes = jB,
			OB = hu(), NB = UB.Hash = OB, UB.createHash = NB, LB = Ou(), zB = UB.Hmac = LB, UB.createHmac = zB, FB =
			Fu(), qB = Object.keys(FB), ["sha1", "sha224", "sha256", "sha384", "sha512", "md5", "rmd160"].concat(qB),
			Oh(), hm(), Mb || (Mb = !0, kb()), mk(), HB = Mk(), UB.createECDH = HB, mB || (mB = !0, bB()), CB()
	}

	function YB() {
		return WB || (WB = !0, GB()), UB
	}
	var KB, VB, ZB, $B, XB, JB, QB, tT, eT, rT, nT, iT, oT, aT, sT, fT, uT, hT, cT, dT, lT, pT, mT, bT, gT, vT, yT, wT,
		_T, AT, MT, ET, ST, kT, BT, TT, RT, xT, CT, IT, DT, PT, OT, LT, UT, jT, NT, zT, FT, qT, HT, WT, GT, YT, KT, VT,
		ZT, $T, XT, JT, QT, tR, eR, rR, nR, iR, oR, aR, sR, fR, uR, hR, cR, dR, lR, pR, mR, bR, gR, vR, yR, wR, _R,
		AR = !1;

	function MR(t) {
		return $B.locateFile ? $B.locateFile(t, oT) : oT + t
	}

	function ER(t) {
		ER.shown || (ER.shown = {}), ER.shown[t] || (ER.shown[t] = 1, dT(t))
	}

	function SR(t, e) {
		t || NR("Assertion failed: " + e)
	}

	function kR(t, e, r) {
		for (var n = e + r, i = e; t[i] && !(i >= n);) ++i;
		if (i - e > 16 && t.subarray && vT) return vT.decode(t.subarray(e, i));
		for (var o = ""; e < i;) {
			var a = t[e++];
			if (128 & a) {
				var s = 63 & t[e++];
				if (192 != (224 & a)) {
					var f = 63 & t[e++];
					if ((a = 224 == (240 & a) ? (15 & a) << 12 | s << 6 | f : (7 & a) << 18 | s << 12 | f << 6 | 63 & t[
							e++]) < 65536) o += String.fromCharCode(a);
					else {
						var u = a - 65536;
						o += String.fromCharCode(55296 | u >> 10, 56320 | 1023 & u)
					}
				} else o += String.fromCharCode((31 & a) << 6 | s)
			} else o += String.fromCharCode(a)
		}
		return o
	}

	function BR(t, e) {
		return t ? kR(AT, t, e) : ""
	}

	function TR(t, e, r, n) {
		if (!(n > 0)) return 0;
		for (var i = r, o = r + n - 1, a = 0; a < t.length; ++a) {
			var s = t.charCodeAt(a);
			if (s >= 55296 && s <= 57343) s = 65536 + ((1023 & s) << 10) | 1023 & t.charCodeAt(++a);
			if (s <= 127) {
				if (r >= o) break;
				e[r++] = s
			} else if (s <= 2047) {
				if (r + 1 >= o) break;
				e[r++] = 192 | s >> 6, e[r++] = 128 | 63 & s
			} else if (s <= 65535) {
				if (r + 2 >= o) break;
				e[r++] = 224 | s >> 12, e[r++] = 128 | s >> 6 & 63, e[r++] = 128 | 63 & s
			} else {
				if (r + 3 >= o) break;
				e[r++] = 240 | s >> 18, e[r++] = 128 | s >> 12 & 63, e[r++] = 128 | s >> 6 & 63, e[r++] = 128 | 63 & s
			}
		}
		return e[r] = 0, r - i
	}

	function RR(t, e, r) {
		return TR(t, AT, e, r)
	}

	function xR(t) {
		for (var e = 0, r = 0; r < t.length; ++r) {
			var n = t.charCodeAt(r);
			n >= 55296 && n <= 57343 && (n = 65536 + ((1023 & n) << 10) | 1023 & t.charCodeAt(++r)), n <= 127 ? ++e :
				e += n <= 2047 ? 2 : n <= 65535 ? 3 : 4
		}
		return e
	}

	function CR(t, e) {
		for (var r = t, n = r >> 1, i = n + e / 2; !(n >= i) && ET[n];) ++n;
		if ((r = n << 1) - t > 32 && yT) return yT.decode(AT.subarray(t, r));
		for (var o = "", a = 0; !(a >= e / 2); ++a) {
			var s = MT[t + 2 * a >> 1];
			if (0 == s) break;
			o += String.fromCharCode(s)
		}
		return o
	}

	function IR(t, e, r) {
		if (void 0 === r && (r = 2147483647), r < 2) return 0;
		for (var n = e, i = (r -= 2) < 2 * t.length ? r / 2 : t.length, o = 0; o < i; ++o) {
			var a = t.charCodeAt(o);
			MT[e >> 1] = a, e += 2
		}
		return MT[e >> 1] = 0, e - n
	}

	function DR(t) {
		return 2 * t.length
	}

	function PR(t, e) {
		for (var r = 0, n = ""; !(r >= e / 4);) {
			var i = ST[t + 4 * r >> 2];
			if (0 == i) break;
			if (++r, i >= 65536) {
				var o = i - 65536;
				n += String.fromCharCode(55296 | o >> 10, 56320 | 1023 & o)
			} else n += String.fromCharCode(i)
		}
		return n
	}

	function OR(t, e, r) {
		if (void 0 === r && (r = 2147483647), r < 4) return 0;
		for (var n = e, i = n + r - 4, o = 0; o < t.length; ++o) {
			var a = t.charCodeAt(o);
			if (a >= 55296 && a <= 57343) a = 65536 + ((1023 & a) << 10) | 1023 & t.charCodeAt(++o);
			if (ST[e >> 2] = a, (e += 4) + 4 > i) break
		}
		return ST[e >> 2] = 0, e - n
	}

	function LR(t) {
		for (var e = 0, r = 0; r < t.length; ++r) {
			var n = t.charCodeAt(r);
			n >= 55296 && n <= 57343 && ++r, e += 4
		}
		return e
	}

	function UR(t) {
		DT++, $B.monitorRunDependencies && $B.monitorRunDependencies(DT)
	}

	function jR(t) {
		if (DT--, $B.monitorRunDependencies && $B.monitorRunDependencies(DT), 0 == DT && (null !== PT && (clearInterval(
				PT), PT = null), OT)) {
			var e = OT;
			OT = null, e()
		}
	}

	function NR(t) {
		throw $B.onAbort && $B.onAbort(t), dT(t += ""), gT = !0, 1, t = "abort(" + t +
			"). Build with -s ASSERTIONS=1 for more info.", new WebAssembly.RuntimeError(t)
	}

	function zR(t) {
		return t.startsWith(LT)
	}

	function FR(t) {
		return t.startsWith("file://")
	}

	function qR(t) {
		try {
			if (t == UT && mT) return new Uint8Array(mT);
			if (fT) return fT(t);
			throw "both async and sync fetching of the wasm failed"
		} catch (t) {
			NR(t)
		}
	}

	function HR() {
		var t = {
			a: pR
		};

		function e(t, e) {
			var r, n, i = t.exports;
			$B.asm = i, bT = $B.asm.J, r = bT.buffer, wT = r, $B.HEAP8 = _T = new Int8Array(r), $B.HEAP16 = MT =
				new Int16Array(r), $B.HEAP32 = ST = new Int32Array(r), $B.HEAPU8 = AT = new Uint8Array(r), $B.HEAPU16 =
				ET = new Uint16Array(r), $B.HEAPU32 = kT = new Uint32Array(r), $B.HEAPF32 = BT = new Float32Array(r), $B
				.HEAPF64 = TT = new Float64Array(r), RT = $B.asm.N, n = $B.asm.K, CT.unshift(n), jR()
		}

		function r(t) {
			e(t.instance)
		}

		function n(e) {
			return function() {
				if (!mT && (eT || rT)) {
					if ("function" == typeof fetch && !FR(UT)) return fetch(UT, {
						credentials: "same-origin"
					}).then((function(t) {
						if (!t.ok) throw "failed to load wasm binary file at '" + UT + "'";
						return t.arrayBuffer()
					})).catch((function() {
						return qR(UT)
					}));
					if (sT) return new Promise((function(t, e) {
						sT(UT, (function(e) {
							t(new Uint8Array(e))
						}), e)
					}))
				}
				return Promise.resolve().then((function() {
					return qR(UT)
				}))
			}().then((function(e) {
				return WebAssembly.instantiate(e, t)
			})).then(e, (function(t) {
				dT("failed to asynchronously prepare wasm: " + t), NR(t)
			}))
		}
		if (UR(), $B.instantiateWasm) try {
			return $B.instantiateWasm(t, e)
		} catch (t) {
			return dT("Module.instantiateWasm callback failed with error: " + t), !1
		}
		return mT || "function" != typeof WebAssembly.instantiateStreaming || zR(UT) || FR(UT) || "function" !=
			typeof fetch ? n(r) : fetch(UT, {
				credentials: "same-origin"
			}).then((function(e) {
				return WebAssembly.instantiateStreaming(e, t).then(r, (function(t) {
					return dT("wasm streaming compile failed: " + t), dT(
						"falling back to ArrayBuffer instantiation"), n(r)
				}))
			})), {}
	}

	function WR(t) {
		for (; t.length > 0;) {
			var e = t.shift();
			if ("function" != typeof e) {
				var r = e.func;
				"number" == typeof r ? void 0 === e.arg ? RT.get(r)() : RT.get(r)(e.arg) : r(void 0 === e.arg ? null : e
					.arg)
			} else e($B)
		}
	}

	function GR() {
		var t = new Error;
		if (!t.stack) {
			try {
				throw new Error
			} catch (e) {
				t = e
			}
			if (!t.stack) return "(no stack trace available)"
		}
		return t.stack.toString()
	}

	function YR() {
		if ("object" == typeof crypto && "function" == typeof crypto.getRandomValues) {
			var t = new Uint8Array(1);
			return function() {
				return crypto.getRandomValues(t), t[0]
			}
		}
		if (nT) try {
			return YB(),
				function() {
					return YB().randomBytes(1)[0]
				}
		} catch (t) {}
		return function() {
			NR("randomDevice")
		}
	}

	function KR(t) {
		for (var e = function(t, e) {
				return e || (e = lT), Math.ceil(t / e) * e
			}(t, 65536), r = bR(e); t < e;) _T[r + t++] = 0;
		return r
	}

	function VR(t, e, r) {
		GT.varargs = r;
		try {
			var n = GT.getStreamFromFD(t);
			switch (e) {
				case 0:
					return (i = GT.get()) < 0 ? -28 : WT.open(n.path, n.flags, 0, i).fd;
				case 1:
				case 2:
					return 0;
				case 3:
					return n.flags;
				case 4:
					var i = GT.get();
					return n.flags |= i, 0;
				case 12:
					i = GT.get();
					return MT[i + 0 >> 1] = 2, 0;
				case 13:
				case 14:
					return 0;
				case 16:
				case 8:
					return -28;
				case 9:
					return o = 28, ST[vR() >> 2] = o, -1;
				default:
					return -28
			}
		} catch (t) {
			return void 0 !== WT && t instanceof WT.ErrnoError || NR(t), -t.errno
		}
	}

	function ZR(t, e, r) {
		GT.varargs = r;
		try {
			var n = GT.getStr(t),
				i = r ? GT.get() : 0;
			return WT.open(n, e, i).fd
		} catch (t) {
			return void 0 !== WT && t instanceof WT.ErrnoError || NR(t), -t.errno
		}
	}

	function $R(t, e, r, n, i) {}

	function XR(t) {
		switch (t) {
			case 1:
				return 0;
			case 2:
				return 1;
			case 4:
				return 2;
			case 8:
				return 3;
			default:
				throw new TypeError("Unknown type size: " + t)
		}
	}

	function JR() {
		for (var t = new Array(256), e = 0; e < 256; ++e) t[e] = String.fromCharCode(e);
		YT = t
	}

	function QR(t) {
		for (var e = "", r = t; AT[r];) e += YT[AT[r++]];
		return e
	}

	function tx(t) {
		if (void 0 === t) return "_unknown";
		var e = (t = t.replace(/[^a-zA-Z0-9_]/g, "$")).charCodeAt(0);
		return e >= $T && e <= XT ? "_" + t : t
	}

	function ex(t, e) {
		return t = tx(t), new Function("body", "return function " + t +
			'() {\n    "use strict";    return body.apply(this, arguments);\n};\n')(e)
	}

	function rx(t, e) {
		var r = ex(e, (function(t) {
			this.name = e, this.message = t;
			var r = new Error(t).stack;
			void 0 !== r && (this.stack = this.toString() + "\n" + r.replace(/^Error(:[^\n]*)?\n/, ""))
		}));
		return r.prototype = Object.create(t.prototype), r.prototype.constructor = r, r.prototype.toString =
	function() {
			return void 0 === this.message ? this.name : this.name + ": " + this.message
		}, r
	}

	function nx(t) {
		throw new JT(t)
	}

	function ix(t) {
		throw new QT(t)
	}

	function ox(t, e, r) {
		function n(e) {
			var n = r(e);
			n.length !== t.length && ix("Mismatched type converter count");
			for (var i = 0; i < t.length; ++i) ax(t[i], n[i])
		}
		t.forEach((function(t) {
			ZT[t] = e
		}));
		var i = new Array(e.length),
			o = [],
			a = 0;
		e.forEach((function(t, e) {
			VT.hasOwnProperty(t) ? i[e] = VT[t] : (o.push(t), KT.hasOwnProperty(t) || (KT[t] = []), KT[t]
				.push((function() {
					i[e] = VT[t], ++a === o.length && n(i)
				})))
		})), 0 === o.length && n(i)
	}

	function ax(t, e, r) {
		if (r = r || {}, !("argPackAdvance" in e)) throw new TypeError(
			"registerType registeredInstance requires argPackAdvance");
		var n = e.name;
		if (t || nx('type "' + n + '" must have a positive integer typeid pointer'), VT.hasOwnProperty(t)) {
			if (r.ignoreDuplicateRegistrations) return;
			nx("Cannot register type '" + n + "' twice")
		}
		if (VT[t] = e, delete ZT[t], KT.hasOwnProperty(t)) {
			var i = KT[t];
			delete KT[t], i.forEach((function(t) {
				t()
			}))
		}
	}

	function sx(t, e, r, n, i) {
		var o = XR(r);
		ax(t, {
			name: e = QR(e),
			fromWireType: function(t) {
				return !!t
			},
			toWireType: function(t, e) {
				return e ? n : i
			},
			argPackAdvance: 8,
			readValueFromPointer: function(t) {
				var n;
				if (1 === r) n = _T;
				else if (2 === r) n = MT;
				else {
					if (4 !== r) throw new TypeError("Unknown boolean type size: " + e);
					n = ST
				}
				return this.fromWireType(n[t >> o])
			},
			destructorFunction: null
		})
	}

	function fx(t) {
		if (!(this instanceof yx)) return !1;
		if (!(t instanceof yx)) return !1;
		for (var e = this.$$.ptrType.registeredClass, r = this.$$.ptr, n = t.$$.ptrType.registeredClass, i = t.$$.ptr; e
			.baseClass;) r = e.upcast(r), e = e.baseClass;
		for (; n.baseClass;) i = n.upcast(i), n = n.baseClass;
		return e === n && r === i
	}

	function ux(t) {
		nx(t.$$.ptrType.registeredClass.name + " instance already deleted")
	}

	function hx(t) {}

	function cx(t) {
		t.count.value -= 1, 0 === t.count.value && function(t) {
			t.smartPtr ? t.smartPtrType.rawDestructor(t.smartPtr) : t.ptrType.registeredClass.rawDestructor(t.ptr)
		}(t)
	}

	function dx(t) {
		return "undefined" == typeof FinalizationGroup ? (dx = function(t) {
			return t
		}, t) : (tR = new FinalizationGroup((function(t) {
			for (var e = t.next(); !e.done; e = t.next()) {
				var r = e.value;
				r.ptr ? cx(r) : console.warn("object already deleted: " + r.ptr)
			}
		})), hx = function(t) {
			tR.unregister(t.$$)
		}, (dx = function(t) {
			return tR.register(t, t.$$, t.$$), t
		})(t))
	}

	function lx() {
		if (this.$$.ptr || ux(this), this.$$.preservePointerOnDelete) return this.$$.count.value += 1, this;
		var t, e = dx(Object.create(Object.getPrototypeOf(this), {
			$$: {
				value: (t = this.$$, {
					count: t.count,
					deleteScheduled: t.deleteScheduled,
					preservePointerOnDelete: t.preservePointerOnDelete,
					ptr: t.ptr,
					ptrType: t.ptrType,
					smartPtr: t.smartPtr,
					smartPtrType: t.smartPtrType
				})
			}
		}));
		return e.$$.count.value += 1, e.$$.deleteScheduled = !1, e
	}

	function px() {
		this.$$.ptr || ux(this), this.$$.deleteScheduled && !this.$$.preservePointerOnDelete && nx(
			"Object already scheduled for deletion"), hx(this), cx(this.$$), this.$$.preservePointerOnDelete || (
			this.$$.smartPtr = void 0, this.$$.ptr = void 0)
	}

	function mx() {
		return !this.$$.ptr
	}

	function bx() {
		for (; rR.length;) {
			var t = rR.pop();
			t.$$.deleteScheduled = !1, t.delete()
		}
	}

	function gx() {
		return this.$$.ptr || ux(this), this.$$.deleteScheduled && !this.$$.preservePointerOnDelete && nx(
				"Object already scheduled for deletion"), rR.push(this), 1 === rR.length && eR && eR(bx), this.$$
			.deleteScheduled = !0, this
	}

	function vx() {
		yx.prototype.isAliasOf = fx, yx.prototype.clone = lx, yx.prototype.delete = px, yx.prototype.isDeleted = mx, yx
			.prototype.deleteLater = gx
	}

	function yx() {}

	function wx(t, e, r) {
		if (void 0 === t[e].overloadTable) {
			var n = t[e];
			t[e] = function() {
				return t[e].overloadTable.hasOwnProperty(arguments.length) || nx("Function '" + r +
						"' called with an invalid number of arguments (" + arguments.length +
						") - expects one of (" + t[e].overloadTable + ")!"), t[e].overloadTable[arguments.length]
					.apply(this, arguments)
			}, t[e].overloadTable = [], t[e].overloadTable[n.argCount] = n
		}
	}

	function _x(t, e, r, n, i, o, a, s) {
		this.name = t, this.constructor = e, this.instancePrototype = r, this.rawDestructor = n, this.baseClass = i,
			this.getActualType = o, this.upcast = a, this.downcast = s, this.pureVirtualFunctions = []
	}

	function Ax(t, e, r) {
		for (; e !== r;) e.upcast || nx("Expected null or instance of " + r.name + ", got an instance of " + e.name),
			t = e.upcast(t), e = e.baseClass;
		return t
	}

	function Mx(t, e) {
		if (null === e) return this.isReference && nx("null is not a valid " + this.name), 0;
		e.$$ || nx('Cannot pass "' + iC(e) + '" as a ' + this.name), e.$$.ptr || nx(
			"Cannot pass deleted object as a pointer of type " + this.name);
		var r = e.$$.ptrType.registeredClass;
		return Ax(e.$$.ptr, r, this.registeredClass)
	}

	function Ex(t, e) {
		var r;
		if (null === e) return this.isReference && nx("null is not a valid " + this.name), this.isSmartPointer ? (r =
			this.rawConstructor(), null !== t && t.push(this.rawDestructor, r), r) : 0;
		e.$$ || nx('Cannot pass "' + iC(e) + '" as a ' + this.name), e.$$.ptr || nx(
				"Cannot pass deleted object as a pointer of type " + this.name), !this.isConst && e.$$.ptrType
			.isConst && nx("Cannot convert argument of type " + (e.$$.smartPtrType ? e.$$.smartPtrType.name : e.$$
				.ptrType.name) + " to parameter type " + this.name);
		var n = e.$$.ptrType.registeredClass;
		if (r = Ax(e.$$.ptr, n, this.registeredClass), this.isSmartPointer) switch (void 0 === e.$$.smartPtr && nx(
			"Passing raw pointer to smart pointer is illegal"), this.sharingPolicy) {
			case 0:
				e.$$.smartPtrType === this ? r = e.$$.smartPtr : nx("Cannot convert argument of type " + (e.$$
						.smartPtrType ? e.$$.smartPtrType.name : e.$$.ptrType.name) + " to parameter type " +
					this.name);
				break;
			case 1:
				r = e.$$.smartPtr;
				break;
			case 2:
				if (e.$$.smartPtrType === this) r = e.$$.smartPtr;
				else {
					var i = e.clone();
					r = this.rawShare(r, rC((function() {
						i.delete()
					}))), null !== t && t.push(this.rawDestructor, r)
				}
				break;
			default:
				nx("Unsupporting sharing policy")
		}
		return r
	}

	function Sx(t, e) {
		if (null === e) return this.isReference && nx("null is not a valid " + this.name), 0;
		e.$$ || nx('Cannot pass "' + iC(e) + '" as a ' + this.name), e.$$.ptr || nx(
			"Cannot pass deleted object as a pointer of type " + this.name), e.$$.ptrType.isConst && nx(
			"Cannot convert argument of type " + e.$$.ptrType.name + " to parameter type " + this.name);
		var r = e.$$.ptrType.registeredClass;
		return Ax(e.$$.ptr, r, this.registeredClass)
	}

	function kx(t) {
		return this.fromWireType(kT[t >> 2])
	}

	function Bx(t) {
		return this.rawGetPointee && (t = this.rawGetPointee(t)), t
	}

	function Tx(t) {
		this.rawDestructor && this.rawDestructor(t)
	}

	function Rx(t) {
		null !== t && t.delete()
	}

	function xx(t, e, r) {
		if (e === r) return t;
		if (void 0 === r.baseClass) return null;
		var n = xx(t, e, r.baseClass);
		return null === n ? null : r.downcast(n)
	}

	function Cx() {
		return Object.keys(iR).length
	}

	function Ix() {
		var t = [];
		for (var e in iR) iR.hasOwnProperty(e) && t.push(iR[e]);
		return t
	}

	function Dx(t) {
		eR = t, rR.length && eR && eR(bx)
	}

	function Px() {
		$B.getInheritedInstanceCount = Cx, $B.getLiveInheritedInstances = Ix, $B.flushPendingDeletes = bx, $B
			.setDelayFunction = Dx
	}

	function Ox(t, e) {
		return e = function(t, e) {
			for (void 0 === e && nx("ptr should not be undefined"); t.baseClass;) e = t.upcast(e), t = t.baseClass;
			return e
		}(t, e), iR[e]
	}

	function Lx(t, e) {
		return e.ptrType && e.ptr || ix("makeClassHandle requires ptr and ptrType"), !!e.smartPtrType !== !!e
			.smartPtr && ix("Both smartPtrType and smartPtr must be specified"), e.count = {
				value: 1
			}, dx(Object.create(t, {
				$$: {
					value: e
				}
			}))
	}

	function Ux(t) {
		var e = this.getPointee(t);
		if (!e) return this.destructor(t), null;
		var r = Ox(this.registeredClass, e);
		if (void 0 !== r) {
			if (0 === r.$$.count.value) return r.$$.ptr = e, r.$$.smartPtr = t, r.clone();
			var n = r.clone();
			return this.destructor(t), n
		}

		function i() {
			return this.isSmartPointer ? Lx(this.registeredClass.instancePrototype, {
				ptrType: this.pointeeType,
				ptr: e,
				smartPtrType: this,
				smartPtr: t
			}) : Lx(this.registeredClass.instancePrototype, {
				ptrType: this,
				ptr: t
			})
		}
		var o, a = this.registeredClass.getActualType(e),
			s = nR[a];
		if (!s) return i.call(this);
		o = this.isConst ? s.constPointerType : s.pointerType;
		var f = xx(e, this.registeredClass, o.registeredClass);
		return null === f ? i.call(this) : this.isSmartPointer ? Lx(o.registeredClass.instancePrototype, {
			ptrType: o,
			ptr: f,
			smartPtrType: this,
			smartPtr: t
		}) : Lx(o.registeredClass.instancePrototype, {
			ptrType: o,
			ptr: f
		})
	}

	function jx() {
		Nx.prototype.getPointee = Bx, Nx.prototype.destructor = Tx, Nx.prototype.argPackAdvance = 8, Nx.prototype
			.readValueFromPointer = kx, Nx.prototype.deleteObject = Rx, Nx.prototype.fromWireType = Ux
	}

	function Nx(t, e, r, n, i, o, a, s, f, u, h) {
		this.name = t, this.registeredClass = e, this.isReference = r, this.isConst = n, this.isSmartPointer = i, this
			.pointeeType = o, this.sharingPolicy = a, this.rawGetPointee = s, this.rawConstructor = f, this.rawShare =
			u, this.rawDestructor = h, i || void 0 !== e.baseClass ? this.toWireType = Ex : n ? (this.toWireType = Mx,
				this.destructorFunction = null) : (this.toWireType = Sx, this.destructorFunction = null)
	}

	function zx(t, e, r) {
		return t.includes("j") ? function(t, e, r) {
			var n = $B["dynCall_" + t];
			return r && r.length ? n.apply(null, [e].concat(r)) : n.call(null, e)
		}(t, e, r) : RT.get(e).apply(null, r)
	}

	function Fx(t, e) {
		var r, n, i, o = (t = QR(t)).includes("j") ? (r = t, n = e, i = [], function() {
			i.length = arguments.length;
			for (var t = 0; t < arguments.length; t++) i[t] = arguments[t];
			return zx(r, n, i)
		}) : RT.get(e);
		return "function" != typeof o && nx("unknown function pointer with signature " + t + ": " + e), o
	}

	function qx(t) {
		var e = yR(t),
			r = QR(e);
		return mR(e), r
	}

	function Hx(t, e) {
		var r = [],
			n = {};
		throw e.forEach((function t(e) {
			n[e] || VT[e] || (ZT[e] ? ZT[e].forEach(t) : (r.push(e), n[e] = !0))
		})), new oR(t + ": " + r.map(qx).join([", "]))
	}

	function Wx(t, e, r, n, i, o, a, s, f, u, h, c, d) {
		h = QR(h), o = Fx(i, o), s && (s = Fx(a, s)), u && (u = Fx(f, u)), d = Fx(c, d);
		var l = tx(h);
		! function(t, e, r) {
			$B.hasOwnProperty(t) ? ((void 0 === r || void 0 !== $B[t].overloadTable && void 0 !== $B[t].overloadTable[
					r]) && nx("Cannot register public name '" + t + "' twice"), wx($B, t, t), $B.hasOwnProperty(
				r) && nx("Cannot register multiple overloads of a function with the same number of arguments (" +
					r + ")!"), $B[t].overloadTable[r] = e) : ($B[t] = e, void 0 !== r && ($B[t].numArguments = r))
		}(l, (function() {
			Hx("Cannot construct " + h + " due to unbound types", [n])
		})), ox([t, e, r], n ? [n] : [], (function(e) {
			var r, i;
			e = e[0], i = n ? (r = e.registeredClass).instancePrototype : yx.prototype;
			var a = ex(l, (function() {
					if (Object.getPrototypeOf(this) !== f) throw new JT("Use 'new' to construct " +
						h);
					if (void 0 === c.constructor_body) throw new JT(h +
						" has no accessible constructor");
					var t = c.constructor_body[arguments.length];
					if (void 0 === t) throw new JT("Tried to invoke ctor of " + h +
						" with invalid number of parameters (" + arguments.length +
						") - expected (" + Object.keys(c.constructor_body).toString() +
						") parameters instead!");
					return t.apply(this, arguments)
				})),
				f = Object.create(i, {
					constructor: {
						value: a
					}
				});
			a.prototype = f;
			var c = new _x(h, a, f, d, r, o, s, u),
				p = new Nx(h, c, !0, !1, !1),
				m = new Nx(h + "*", c, !1, !1, !1),
				b = new Nx(h + " const*", c, !1, !0, !1);
			return nR[t] = {
					pointerType: m,
					constPointerType: b
				},
				function(t, e, r) {
					$B.hasOwnProperty(t) || ix("Replacing nonexistant public symbol"), void 0 !== $B[t]
						.overloadTable && void 0 !== r ? $B[t].overloadTable[r] = e : ($B[t] = e, $B[t]
							.argCount = r)
				}(l, a), [p, m, b]
		}))
	}

	function Gx(t, e) {
		for (var r = [], n = 0; n < t; n++) r.push(ST[(e >> 2) + n]);
		return r
	}

	function Yx(t) {
		for (; t.length;) {
			var e = t.pop();
			t.pop()(e)
		}
	}

	function Kx(t, e, r, n, i, o) {
		SR(e > 0);
		var a = Gx(e, r);
		i = Fx(n, i);
		var s = [o],
			f = [];
		ox([], [t], (function(t) {
			var r = "constructor " + (t = t[0]).name;
			if (void 0 === t.registeredClass.constructor_body && (t.registeredClass.constructor_body = []),
				void 0 !== t.registeredClass.constructor_body[e - 1]) throw new JT(
				"Cannot register multiple constructors with identical number of parameters (" + (e -
					1) + ") for class '" + t.name +
				"'! Overload resolution is currently only performed using the parameter count, not actual type info!"
				);
			return t.registeredClass.constructor_body[e - 1] = function() {
				Hx("Cannot construct " + t.name + " due to unbound types", a)
			}, ox([], a, (function(n) {
				return t.registeredClass.constructor_body[e - 1] = function() {
					arguments.length !== e - 1 && nx(r + " called with " + arguments
							.length + " arguments, expected " + (e - 1)), f.length = 0, s
						.length = e;
					for (var t = 1; t < e; ++t) s[t] = n[t].toWireType(f, arguments[t - 1]);
					var o = i.apply(null, s);
					return Yx(f), n[0].fromWireType(o)
				}, []
			})), []
		}))
	}

	function Vx(t, e) {
		if (!(t instanceof Function)) throw new TypeError("new_ called with constructor type " + typeof t +
			" which is not a function");
		var r = ex(t.name || "unknownFunctionName", (function() {}));
		r.prototype = t.prototype;
		var n = new r,
			i = t.apply(n, e);
		return i instanceof Object ? i : n
	}

	function Zx(t, e, r, n, i, o, a, s) {
		var f = Gx(r, n);
		e = QR(e), o = Fx(i, o), ox([], [t], (function(t) {
			var n = (t = t[0]).name + "." + e;

			function i() {
				Hx("Cannot call " + n + " due to unbound types", f)
			}
			s && t.registeredClass.pureVirtualFunctions.push(e);
			var u = t.registeredClass.instancePrototype,
				h = u[e];
			return void 0 === h || void 0 === h.overloadTable && h.className !== t.name && h.argCount ===
				r - 2 ? (i.argCount = r - 2, i.className = t.name, u[e] = i) : (wx(u, e, n), u[e]
					.overloadTable[r - 2] = i), ox([], f, (function(i) {
					var s = function(t, e, r, n, i) {
						var o = e.length;
						o < 2 && nx(
							"argTypes array size mismatch! Must at least get return value and 'this' types!"
							);
						for (var a = null !== e[1] && null !== r, s = !1, f = 1; f < e
							.length; ++f)
							if (null !== e[f] && void 0 === e[f].destructorFunction) {
								s = !0;
								break
							} var u = "void" !== e[0].name,
							h = "",
							c = "";
						for (f = 0; f < o - 2; ++f) h += (0 !== f ? ", " : "") + "arg" + f, c +=
							(0 !== f ? ", " : "") + "arg" + f + "Wired";
						var d = "return function " + tx(t) + "(" + h +
							") {\nif (arguments.length !== " + (o - 2) +
							") {\nthrowBindingError('function " + t +
							" called with ' + arguments.length + ' arguments, expected " + (o -
								2) + " args!');\n}\n";
						s && (d += "var destructors = [];\n");
						var l = s ? "destructors" : "null",
							p = ["throwBindingError", "invoker", "fn", "runDestructors",
								"retType", "classParam"
							],
							m = [nx, n, i, Yx, e[0], e[1]];
						for (a && (d += "var thisWired = classParam.toWireType(" + l +
								", this);\n"), f = 0; f < o - 2; ++f) d += "var arg" + f +
							"Wired = argType" + f + ".toWireType(" + l + ", arg" + f +
							"); // " + e[f + 2].name + "\n", p.push("argType" + f), m.push(e[f +
								2]);
						if (a && (c = "thisWired" + (c.length > 0 ? ", " : "") + c), d += (u ?
								"var rv = " : "") + "invoker(fn" + (c.length > 0 ? ", " : "") +
							c + ");\n", s) d += "runDestructors(destructors);\n";
						else
							for (f = a ? 1 : 2; f < e.length; ++f) {
								var b = 1 === f ? "thisWired" : "arg" + (f - 2) + "Wired";
								null !== e[f].destructorFunction && (d += b + "_dtor(" + b +
									"); // " + e[f].name + "\n", p.push(b + "_dtor"), m
									.push(e[f].destructorFunction))
							}
						return u && (d += "var ret = retType.fromWireType(rv);\nreturn ret;\n"),
							d += "}\n", p.push(d), Vx(Function, p).apply(null, m)
					}(n, i, t, o, a);
					return void 0 === u[e].overloadTable ? (s.argCount = r - 2, u[e] = s) : u[e]
						.overloadTable[r - 2] = s, []
				})), []
		}))
	}

	function $x(t, e, r) {
		return t instanceof Object || nx(r + ' with invalid "this": ' + t), t instanceof e.registeredClass
			.constructor || nx(r + ' incompatible with "this" of type ' + t.constructor.name), t.$$.ptr || nx(
				"cannot call emscripten binding method " + r + " on deleted object"), Ax(t.$$.ptr, t.$$.ptrType
				.registeredClass, e.registeredClass)
	}

	function Xx(t, e, r, n, i, o, a, s, f, u) {
		e = QR(e), i = Fx(n, i), ox([], [t], (function(t) {
			var n = (t = t[0]).name + "." + e,
				h = {
					get: function() {
						Hx("Cannot access " + n + " due to unbound types", [r, a])
					},
					enumerable: !0,
					configurable: !0
				};
			return h.set = f ? function() {
				Hx("Cannot access " + n + " due to unbound types", [r, a])
			} : function(t) {
				nx(n + " is a read-only property")
			}, Object.defineProperty(t.registeredClass.instancePrototype, e, h), ox([], f ? [r, a] : [
				r], (function(r) {
					var a = r[0],
						h = {
							get: function() {
								var e = $x(this, t, n + " getter");
								return a.fromWireType(i(o, e))
							},
							enumerable: !0
						};
					if (f) {
						f = Fx(s, f);
						var c = r[1];
						h.set = function(e) {
							var r = $x(this, t, n + " setter"),
								i = [];
							f(u, r, c.toWireType(i, e)), Yx(i)
						}
					}
					return Object.defineProperty(t.registeredClass.instancePrototype, e, h), []
				})), []
		}))
	}

	function Jx(t) {
		t > 4 && 0 == --sR[t].refcount && (sR[t] = void 0, aR.push(t))
	}

	function Qx() {
		for (var t = 0, e = 5; e < sR.length; ++e) void 0 !== sR[e] && ++t;
		return t
	}

	function tC() {
		for (var t = 5; t < sR.length; ++t)
			if (void 0 !== sR[t]) return sR[t];
		return null
	}

	function eC() {
		$B.count_emval_handles = Qx, $B.get_first_emval = tC
	}

	function rC(t) {
		switch (t) {
			case void 0:
				return 1;
			case null:
				return 2;
			case !0:
				return 3;
			case !1:
				return 4;
			default:
				var e = aR.length ? aR.pop() : sR.length;
				return sR[e] = {
					refcount: 1,
					value: t
				}, e
		}
	}

	function nC(t, e) {
		ax(t, {
			name: e = QR(e),
			fromWireType: function(t) {
				var e = sR[t].value;
				return Jx(t), e
			},
			toWireType: function(t, e) {
				return rC(e)
			},
			argPackAdvance: 8,
			readValueFromPointer: kx,
			destructorFunction: null
		})
	}

	function iC(t) {
		if (null === t) return "null";
		var e = typeof t;
		return "object" === e || "array" === e || "function" === e ? t.toString() : "" + t
	}

	function oC(t, e) {
		switch (e) {
			case 2:
				return function(t) {
					return this.fromWireType(BT[t >> 2])
				};
			case 3:
				return function(t) {
					return this.fromWireType(TT[t >> 3])
				};
			default:
				throw new TypeError("Unknown float type: " + t)
		}
	}

	function aC(t, e, r) {
		var n = XR(r);
		ax(t, {
			name: e = QR(e),
			fromWireType: function(t) {
				return t
			},
			toWireType: function(t, e) {
				if ("number" != typeof e && "boolean" != typeof e) throw new TypeError('Cannot convert "' +
					iC(e) + '" to ' + this.name);
				return e
			},
			argPackAdvance: 8,
			readValueFromPointer: oC(e, n),
			destructorFunction: null
		})
	}

	function sC(t, e, r) {
		switch (e) {
			case 0:
				return r ? function(t) {
					return _T[t]
				} : function(t) {
					return AT[t]
				};
			case 1:
				return r ? function(t) {
					return MT[t >> 1]
				} : function(t) {
					return ET[t >> 1]
				};
			case 2:
				return r ? function(t) {
					return ST[t >> 2]
				} : function(t) {
					return kT[t >> 2]
				};
			default:
				throw new TypeError("Unknown integer type: " + t)
		}
	}

	function fC(t, e, r, n, i) {
		e = QR(e), -1 === i && (i = 4294967295);
		var o = XR(r),
			a = function(t) {
				return t
			};
		if (0 === n) {
			var s = 32 - 8 * r;
			a = function(t) {
				return t << s >>> s
			}
		}
		var f = e.includes("unsigned");
		ax(t, {
			name: e,
			fromWireType: a,
			toWireType: function(t, r) {
				if ("number" != typeof r && "boolean" != typeof r) throw new TypeError('Cannot convert "' +
					iC(r) + '" to ' + this.name);
				if (r < n || r > i) throw new TypeError('Passing a number "' + iC(r) +
					'" from JS side to C/C++ side to an argument of type "' + e +
					'", which is outside the valid range [' + n + ", " + i + "]!");
				return f ? r >>> 0 : 0 | r
			},
			argPackAdvance: 8,
			readValueFromPointer: sC(e, o, 0 !== n),
			destructorFunction: null
		})
	}

	function uC(t, e, r) {
		var n = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][
		e];

		function i(t) {
			var e = kT,
				r = e[t >>= 2],
				i = e[t + 1];
			return new n(wT, i, r)
		}
		ax(t, {
			name: r = QR(r),
			fromWireType: i,
			argPackAdvance: 8,
			readValueFromPointer: i
		}, {
			ignoreDuplicateRegistrations: !0
		})
	}

	function hC(t, e) {
		var r = "std::string" === (e = QR(e));
		ax(t, {
			name: e,
			fromWireType: function(t) {
				var e, n = kT[t >> 2];
				if (r)
					for (var i = t + 4, o = 0; o <= n; ++o) {
						var a = t + 4 + o;
						if (o == n || 0 == AT[a]) {
							var s = BR(i, a - i);
							void 0 === e ? e = s : (e += String.fromCharCode(0), e += s), i = a + 1
						}
					} else {
						var f = new Array(n);
						for (o = 0; o < n; ++o) f[o] = String.fromCharCode(AT[t + 4 + o]);
						e = f.join("")
					}
				return mR(t), e
			},
			toWireType: function(t, e) {
				e instanceof ArrayBuffer && (e = new Uint8Array(e));
				var n = "string" == typeof e;
				n || e instanceof Uint8Array || e instanceof Uint8ClampedArray || e instanceof Int8Array ||
					nx("Cannot pass non-string to std::string");
				var i = (r && n ? function() {
						return xR(e)
					} : function() {
						return e.length
					})(),
					o = bR(4 + i + 1);
				if (kT[o >> 2] = i, r && n) RR(e, o + 4, i + 1);
				else if (n)
					for (var a = 0; a < i; ++a) {
						var s = e.charCodeAt(a);
						s > 255 && (mR(o), nx("String has UTF-16 code units that do not fit in 8 bits")),
							AT[o + 4 + a] = s
					} else
						for (a = 0; a < i; ++a) AT[o + 4 + a] = e[a];
				return null !== t && t.push(mR, o), o
			},
			argPackAdvance: 8,
			readValueFromPointer: kx,
			destructorFunction: function(t) {
				mR(t)
			}
		})
	}

	function cC(t, e, r) {
		var n, i, o, a, s;
		r = QR(r), 2 === e ? (n = CR, i = IR, a = DR, o = function() {
			return ET
		}, s = 1) : 4 === e && (n = PR, i = OR, a = LR, o = function() {
			return kT
		}, s = 2), ax(t, {
			name: r,
			fromWireType: function(t) {
				for (var r, i = kT[t >> 2], a = o(), f = t + 4, u = 0; u <= i; ++u) {
					var h = t + 4 + u * e;
					if (u == i || 0 == a[h >> s]) {
						var c = n(f, h - f);
						void 0 === r ? r = c : (r += String.fromCharCode(0), r += c), f = h + e
					}
				}
				return mR(t), r
			},
			toWireType: function(t, n) {
				"string" != typeof n && nx("Cannot pass non-string to C++ string type " + r);
				var o = a(n),
					f = bR(4 + o + e);
				return kT[f >> 2] = o >> s, i(n, f + 4, o + e), null !== t && t.push(mR, f), f
			},
			argPackAdvance: 8,
			readValueFromPointer: kx,
			destructorFunction: function(t) {
				mR(t)
			}
		})
	}

	function dC(t, e) {
		ax(t, {
			isVoid: !0,
			name: e = QR(e),
			argPackAdvance: 0,
			fromWireType: function() {},
			toWireType: function(t, e) {}
		})
	}

	function lC(t) {
		return t || nx("Cannot use deleted val. handle = " + t), sR[t].value
	}

	function pC(t, e) {
		var r = VT[t];
		return void 0 === r && nx(e + " has unknown type " + qx(t)), r
	}

	function mC(t, e, r) {
		t = lC(t), e = pC(e, "emval::as");
		var n = [],
			i = rC(n);
		return ST[r >> 2] = i, e.toWireType(n, t)
	}

	function bC(t, e, r, n) {
		var i, o;
		(t = uR[t])(e = lC(e), r = void 0 === (o = fR[i = r]) ? QR(i) : o, null, n)
	}

	function gC(t, e) {
		for (var r = function(t, e) {
				for (var r = new Array(t), n = 0; n < t; ++n) r[n] = pC(ST[(e >> 2) + n], "parameter " + n);
				return r
			}(t, e), n = r[0], i = n.name + "_$" + r.slice(1).map((function(t) {
				return t.name
			})).join("_") + "$", o = ["retType"], a = [n], s = "", f = 0; f < t - 1; ++f) s += (0 !== f ? ", " : "") +
			"arg" + f, o.push("argType" + f), a.push(r[1 + f]);
		var u = "return function " + tx("methodCaller_" + i) + "(handle, name, destructors, args) {\n",
			h = 0;
		for (f = 0; f < t - 1; ++f) u += "    var arg" + f + " = argType" + f + ".readValueFromPointer(args" + (h ?
			"+" + h : "") + ");\n", h += r[f + 1].argPackAdvance;
		u += "    var rv = handle[name](" + s + ");\n";
		for (f = 0; f < t - 1; ++f) r[f + 1].deleteObject && (u += "    argType" + f + ".deleteObject(arg" + f +
		");\n");
		n.isVoid || (u += "    return retType.toWireType(destructors, rv);\n"), u += "};\n", o.push(u);
		var c, d, l = Vx(Function, o).apply(null, a);
		return c = l, d = uR.length, uR.push(c), d
	}

	function vC(t) {
		t > 4 && (sR[t].refcount += 1)
	}

	function yC(t) {
		Yx(sR[t].value), Jx(t)
	}

	function wC(t, e) {
		return rC((t = pC(t, "_emval_take_value")).readValueFromPointer(e))
	}

	function _C() {
		NR()
	}

	function AC() {
		return void 0 === AC.start && (AC.start = Date.now()), 1e3 * (Date.now() - AC.start) | 0
	}

	function MC(t, e) {
		return (t >>> 0) + 4294967296 * e
	}

	function EC(t, e) {
		if (t <= 0) return t;
		var r = e <= 32 ? Math.abs(1 << e - 1) : Math.pow(2, e - 1);
		return t >= r && (e <= 32 || t > r) && (t = -2 * r + t), t
	}

	function SC(t, e) {
		return t >= 0 ? t : e <= 32 ? 2 * Math.abs(1 << e - 1) + t : Math.pow(2, e) + t
	}

	function kC(t) {
		if (!t || !t.callee || !t.callee.name) return [null, "", ""];
		t.callee.toString();
		var e = t.callee.name,
			r = "(",
			n = !0;
		for (var i in t) {
			var o = t[i];
			n || (r += ", "), n = !1, r += "number" == typeof o || "string" == typeof o ? o : "(" + typeof o + ")"
		}
		r += ")";
		var a = t.callee.caller;
		return n && (r = ""), [t = a ? a.arguments : [], e, r]
	}

	function BC(t, e) {
		24 & t && (e = e.replace(/\s+$/, ""), e += (e.length > 0 ? "\n" : "") + function(t) {
				var e = GR(),
					r = e.lastIndexOf("_emscripten_log"),
					n = e.lastIndexOf("_emscripten_get_callstack"),
					i = e.indexOf("\n", Math.max(r, n)) + 1;
				e = e.slice(i), 32 & t && ER("EM_LOG_DEMANGLE is deprecated; ignoring"), 8 & t && "undefined" ==
					typeof emscripten_source_map && (ER(
						'Source map information is not available, emscripten_log with EM_LOG_C_STACK will be ignored. Build with "--pre-js $EMSCRIPTEN/src/emscripten-source-map.min.js" linker flag to add source map loading to code.'
						), t ^= 8, t |= 16);
				var o = null;
				if (128 & t)
					for (o = kC(arguments); o[1].includes("_emscripten_");) o = kC(o[0]);
				var a = e.split("\n");
				e = "";
				var s = new RegExp("\\s*(.*?)@(.*?):([0-9]+):([0-9]+)"),
					f = new RegExp("\\s*(.*?)@(.*):(.*)(:(.*))?"),
					u = new RegExp("\\s*at (.*?) \\((.*):(.*):(.*)\\)");
				for (var h in a) {
					var c = a[h],
						d = "",
						l = "",
						p = 0,
						m = 0,
						b = u.exec(c);
					if (b && 5 == b.length) d = b[1], l = b[2], p = b[3], m = b[4];
					else {
						if ((b = s.exec(c)) || (b = f.exec(c)), !(b && b.length >= 4)) {
							e += c + "\n";
							continue
						}
						d = b[1], l = b[2], p = b[3], m = 0 | b[4]
					}
					var g = !1;
					if (8 & t) {
						var v = emscripten_source_map.originalPositionFor({
							line: p,
							column: m
						});
						(g = v && v.source) && (64 & t && (v.source = v.source.substring(v.source.replace(/\\/g,
								"/").lastIndexOf("/") + 1)), e += "    at " + d + " (" + v.source + ":" + v.line +
							":" + v.column + ")\n")
					}(16 & t || !g) && (64 & t && (l = l.substring(l.replace(/\\/g, "/").lastIndexOf("/") + 1)),
						e += (g ? "     = " + d : "    at " + d) + " (" + l + ":" + p + ":" + m + ")\n"), 128 & t &&
						o[0] && (o[1] == d && o[2].length > 0 && (e = e.replace(/\s+$/, ""), e += " with values: " +
							o[1] + o[2] + "\n"), o = kC(o[0]))
				}
				return e.replace(/\s+$/, "")
			}(t)), 1 & t ? 4 & t ? console.error(e) : 2 & t ? console.warn(e) : 512 & t ? console.info(e) : 256 & t ?
			console.debug(e) : console.log(e) : 6 & t ? dT(e) : cT(e)
	}

	function TC(t, e, r) {
		BC(t, kR(function(t, e) {
			var r = t,
				n = e;

			function i(t) {
				var e;
				return n = function(t, e) {
					return "double" !== e && "i64" !== e || 7 & t && (t += 4), t
				}(n, t), "double" === t ? (e = TT[n >> 3], n += 8) : "i64" == t ? (e = [ST[n >> 2], ST[
					n + 4 >> 2]], n += 8) : (t = "i32", e = ST[n >> 2], n += 4), e
			}
			for (var o, a, s, f, u = [];;) {
				var h = r;
				if (0 === (o = _T[r >> 0])) break;
				if (a = _T[r + 1 >> 0], 37 == o) {
					var c = !1,
						d = !1,
						l = !1,
						p = !1,
						m = !1;
					t: for (;;) {
						switch (a) {
							case 43:
								c = !0;
								break;
							case 45:
								d = !0;
								break;
							case 35:
								l = !0;
								break;
							case 48:
								if (p) break t;
								p = !0;
								break;
							case 32:
								m = !0;
								break;
							default:
								break t
						}
						r++, a = _T[r + 1 >> 0]
					}
					var b = 0;
					if (42 == a) b = i("i32"), r++, a = _T[r + 1 >> 0];
					else
						for (; a >= 48 && a <= 57;) b = 10 * b + (a - 48), r++, a = _T[r + 1 >> 0];
					var g, v = !1,
						y = -1;
					if (46 == a) {
						if (y = 0, v = !0, r++, 42 == (a = _T[r + 1 >> 0])) y = i("i32"), r++;
						else
							for (;;) {
								var w = _T[r + 1 >> 0];
								if (w < 48 || w > 57) break;
								y = 10 * y + (w - 48), r++
							}
						a = _T[r + 1 >> 0]
					}
					switch (y < 0 && (y = 6, v = !1), String.fromCharCode(a)) {
						case "h":
							104 == _T[r + 2 >> 0] ? (r++, g = 1) : g = 2;
							break;
						case "l":
							108 == _T[r + 2 >> 0] ? (r++, g = 8) : g = 4;
							break;
						case "L":
						case "q":
						case "j":
							g = 8;
							break;
						case "z":
						case "t":
						case "I":
							g = 4;
							break;
						default:
							g = null
					}
					switch (g && r++, a = _T[r + 1 >> 0], String.fromCharCode(a)) {
						case "d":
						case "i":
						case "u":
						case "o":
						case "x":
						case "X":
						case "p":
							var _ = 100 == a || 105 == a;
							s = i("i" + 8 * (g = g || 4)), 8 == g && (s = 117 == a ? (s[0] >>> 0) +
								4294967296 * (s[1] >>> 0) : MC(s[0], s[1])), g <= 4 && (s = (_ ? EC :
								SC)(s & Math.pow(256, g) - 1, 8 * g));
							var A = Math.abs(s),
								M = "";
							if (100 == a || 105 == a) k = EC(s, 8 * g).toString(10);
							else if (117 == a) k = SC(s, 8 * g).toString(10), s = Math.abs(s);
							else if (111 == a) k = (l ? "0" : "") + A.toString(8);
							else if (120 == a || 88 == a) {
								if (M = l && 0 != s ? "0x" : "", s < 0) {
									s = -s, k = (A - 1).toString(16);
									for (var E = [], S = 0; S < k.length; S++) E.push((15 - parseInt(k[S],
										16)).toString(16));
									for (k = E.join(""); k.length < 2 * g;) k = "f" + k
								} else k = A.toString(16);
								88 == a && (M = M.toUpperCase(), k = k.toUpperCase())
							} else 112 == a && (0 === A ? k = "(nil)" : (M = "0x", k = A.toString(16)));
							if (v)
								for (; k.length < y;) k = "0" + k;
							for (s >= 0 && (c ? M = "+" + M : m && (M = " " + M)), "-" == k.charAt(0) && (
									M = "-" + M, k = k.substr(1)); M.length + k.length < b;) d ? k += " " :
								p ? k = "0" + k : M = " " + M;
							(k = M + k).split("").forEach((function(t) {
								u.push(t.charCodeAt(0))
							}));
							break;
						case "f":
						case "F":
						case "e":
						case "E":
						case "g":
						case "G":
							var k;
							if (s = i("double"), isNaN(s)) k = "nan", p = !1;
							else if (isFinite(s)) {
								var B = !1,
									T = Math.min(y, 20);
								if (103 == a || 71 == a) {
									B = !0, y = y || 1;
									var R = parseInt(s.toExponential(T).split("e")[1], 10);
									y > R && R >= -4 ? (a = (103 == a ? "f" : "F").charCodeAt(0), y -= R +
											1) : (a = (103 == a ? "e" : "E").charCodeAt(0), y--), T = Math
										.min(y, 20)
								}
								101 == a || 69 == a ? (k = s.toExponential(T), /[eE][-+]\d$/.test(k) && (k =
									k.slice(0, -1) + "0" + k.slice(-1))) : 102 != a && 70 != a || (k = s
									.toFixed(T), 0 === s && ((f = s) < 0 || 0 === f && 1 / f == -1 /
									0) && (k = "-" + k));
								var x = k.split("e");
								if (B && !l)
									for (; x[0].length > 1 && x[0].includes(".") && ("0" == x[0].slice(-
											1) || "." == x[0].slice(-1));) x[0] = x[0].slice(0, -1);
								else
									for (l && -1 == k.indexOf(".") && (x[0] += "."); y > T++;) x[0] += "0";
								k = x[0] + (x.length > 1 ? "e" + x[1] : ""), 69 == a && (k = k
								.toUpperCase()), s >= 0 && (c ? k = "+" + k : m && (k = " " + k))
							} else k = (s < 0 ? "-" : "") + "inf", p = !1;
							for (; k.length < b;) d ? k += " " : k = !p || "-" != k[0] && "+" != k[0] ? (p ?
								"0" : " ") + k : k[0] + "0" + k.slice(1);
							a < 97 && (k = k.toUpperCase()), k.split("").forEach((function(t) {
								u.push(t.charCodeAt(0))
							}));
							break;
						case "s":
							var C = i("i8*"),
								I = C ? gR(C) : "(null)".length;
							if (v && (I = Math.min(I, y)), !d)
								for (; I < b--;) u.push(32);
							if (C)
								for (S = 0; S < I; S++) u.push(AT[C++ >> 0]);
							else u = u.concat(zC("(null)".substr(0, I), !0));
							if (d)
								for (; I < b--;) u.push(32);
							break;
						case "c":
							for (d && u.push(i("i8")); --b > 0;) u.push(32);
							d || u.push(i("i8"));
							break;
						case "n":
							var D = i("i32*");
							ST[D >> 2] = u.length;
							break;
						case "%":
							u.push(o);
							break;
						default:
							for (S = h; S < r + 2; S++) u.push(_T[S >> 0])
					}
					r += 2
				} else u.push(o), r += 1
			}
			return u
		}(e, r), 0))
	}

	function RC(t) {
		AT.length;
		NR("OOM")
	}

	function xC() {
		if (!xC.strings) {
			var t = {
				USER: "web_user",
				LOGNAME: "web_user",
				PATH: "/",
				PWD: "/",
				HOME: "/home/web_user",
				LANG: ("object" == typeof navigator && navigator.languages && navigator.languages[0] || "C")
					.replace("-", "_") + ".UTF-8",
				_: tT || "./this.program"
			};
			for (var e in hR) t[e] = hR[e];
			var r = [];
			for (var e in t) r.push(e + "=" + t[e]);
			xC.strings = r
		}
		return xC.strings
	}

	function CC(t, e) {
		try {
			var r = 0;
			return xC().forEach((function(n, i) {
				var o = e + r;
				ST[t + 4 * i >> 2] = o,
					function(t, e, r) {
						for (var n = 0; n < t.length; ++n) _T[e++ >> 0] = t.charCodeAt(n);
						r || (_T[e >> 0] = 0)
					}(n, o), r += n.length + 1
			})), 0
		} catch (t) {
			return void 0 !== WT && t instanceof WT.ErrnoError || NR(t), t.errno
		}
	}

	function IC(t, e) {
		try {
			var r = xC();
			ST[t >> 2] = r.length;
			var n = 0;
			return r.forEach((function(t) {
				n += t.length + 1
			})), ST[e >> 2] = n, 0
		} catch (t) {
			return void 0 !== WT && t instanceof WT.ErrnoError || NR(t), t.errno
		}
	}

	function DC(t) {
		try {
			var e = GT.getStreamFromFD(t);
			return WT.close(e), 0
		} catch (t) {
			return void 0 !== WT && t instanceof WT.ErrnoError || NR(t), t.errno
		}
	}

	function PC(t, e) {
		try {
			var r = GT.getStreamFromFD(t),
				n = r.tty ? 2 : WT.isDir(r.mode) ? 3 : WT.isLink(r.mode) ? 7 : 4;
			return _T[e >> 0] = n, 0
		} catch (t) {
			return void 0 !== WT && t instanceof WT.ErrnoError || NR(t), t.errno
		}
	}

	function OC(t, e, r, n) {
		try {
			var i = GT.getStreamFromFD(t),
				o = GT.doReadv(i, e, r);
			return ST[n >> 2] = o, 0
		} catch (t) {
			return void 0 !== WT && t instanceof WT.ErrnoError || NR(t), t.errno
		}
	}

	function LC(t, e, r, n, i) {
		try {
			var o = GT.getStreamFromFD(t),
				a = 4294967296 * r + (e >>> 0),
				s = 9007199254740992;
			return a <= -s || a >= s ? -61 : (WT.llseek(o, a, n), NT = [o.position >>> 0, (jT = o.position, +Math.abs(
						jT) >= 1 ? jT > 0 ? (0 | Math.min(+Math.floor(jT / 4294967296), 4294967295)) >>> 0 : ~~+
					Math.ceil((jT - +(~~jT >>> 0)) / 4294967296) >>> 0 : 0)], ST[i >> 2] = NT[0], ST[i + 4 >> 2] =
				NT[1], o.getdents && 0 === a && 0 === n && (o.getdents = null), 0)
		} catch (t) {
			return void 0 !== WT && t instanceof WT.ErrnoError || NR(t), t.errno
		}
	}

	function UC(t, e, r, n) {
		try {
			var i = GT.getStreamFromFD(t),
				o = GT.doWritev(i, e, r);
			return ST[n >> 2] = o, 0
		} catch (t) {
			return void 0 !== WT && t instanceof WT.ErrnoError || NR(t), t.errno
		}
	}

	function jC(t) {
		var e = Date.now();
		return ST[t >> 2] = e / 1e3 | 0, ST[t + 4 >> 2] = e % 1e3 * 1e3 | 0, 0
	}

	function NC(t) {
		pT(t)
	}

	function zC(t, e, r) {
		var n = r > 0 ? r : xR(t) + 1,
			i = new Array(n),
			o = TR(t, i, 0, i.length);
		return e && (i.length = o), i
	}

	function FC(t) {
		this.name = "ExitStatus", this.message = "Program terminated with exit(" + t + ")", this.status = t
	}

	function qC(t) {
		function e() {
			wR || (wR = !0, $B.calledRun = !0, gT || (!0, $B.noFSInit || WT.init.initialized || WT.init(), qT.init(),
				WR(CT), $B.onRuntimeInitialized && $B.onRuntimeInitialized(),
				function() {
					if ($B.postRun)
						for ("function" == typeof $B.postRun && ($B.postRun = [$B.postRun]); $B.postRun.length;)
							t = $B.postRun.shift(), IT.unshift(t);
					var t;
					WR(IT)
				}()))
		}
		t = t || QB, DT > 0 || (! function() {
			if ($B.preRun)
				for ("function" == typeof $B.preRun && ($B.preRun = [$B.preRun]); $B.preRun.length;) t = $B
					.preRun.shift(), xT.unshift(t);
			var t;
			WR(xT)
		}(), DT > 0 || ($B.setStatus ? ($B.setStatus("Running..."), setTimeout((function() {
			setTimeout((function() {
				$B.setStatus("")
			}), 1), e()
		}), 1)) : e()))
	}

	function HC() {
		for (JB in {}, KB = Ut(), VB = "", ZB = Ve().Buffer,
			XB = {}, $B = void 0 !== $B ? $B : {}) $B.hasOwnProperty(JB) && (XB[JB] = $B[JB]);
		for (JB in QB = [], tT = "./this.program", function(t, e) {
				throw e
			}, eT = !1, rT = !1, nT = !1, iT = !1, eT = "object" == typeof window, rT = "function" ==
			typeof importScripts, nT = "object" == typeof KB && "object" == typeof KB.versions && "string" == typeof KB
			.versions.node, iT = !eT && !nT && !rT, oT = "", nT ? (oT = rT ? tr().dirname(oT) + "/" : VB + "/", aT =
				function(t, e) {
					return uT || (uT = nr()), hT || (hT = tr()), t = hT.normalize(t), uT.readFileSync(t, e ? null :
						"utf8")
				}, fT = function(t) {
					var e = aT(t, !0);
					return e.buffer || (e = new Uint8Array(e)), SR(e.buffer), e
				}, KB.argv.length > 1 && (tT = KB.argv[1].replace(/\\/g, "/")), QB = KB.argv.slice(2), $B, KB.on(
					"uncaughtException", (function(t) {
						if (!(t instanceof FC)) throw t
					})), KB.on("unhandledRejection", NR),
				function(t) {
					KB.exit(t)
				}, $B.inspect = function() {
					return "[Emscripten Module object]"
				}) : iT ? ("undefined" != typeof read && (aT = function(t) {
					return read(t)
				}), fT = function(t) {
					var e;
					return "function" == typeof readbuffer ? new Uint8Array(readbuffer(t)) : (SR("object" == typeof(e =
						read(t, "binary"))), e)
				}, "undefined" != typeof scriptArgs ? QB = scriptArgs : void 0 !== arguments && (QB = arguments),
				"function" == typeof quit && function(t) {
					quit(t)
				}, "undefined" != typeof print && ("undefined" == typeof console && (console = {}), console.log = print,
					console.warn = console.error = "undefined" != typeof printErr ? printErr : print)) : (eT || rT) && (
				rT ? oT = self.location.href : "undefined" != typeof document && document.currentScript && (oT =
					document.currentScript.src), oT = 0 !== oT.indexOf("blob:") ? oT.substr(0, oT.lastIndexOf("/") +
				1) : "", aT = function(t) {
					var e = new XMLHttpRequest;
					return e.open("GET", t, !1), e.send(null), e.responseText
				}, rT && (fT = function(t) {
					var e = new XMLHttpRequest;
					return e.open("GET", t, !1), e.responseType = "arraybuffer", e.send(null), new Uint8Array(e
						.response)
				}), sT = function(t, e, r) {
					var n = new XMLHttpRequest;
					n.open("GET", t, !0), n.responseType = "arraybuffer", n.onload = function() {
						200 == n.status || 0 == n.status && n.response ? e(n.response) : r()
					}, n.onerror = r, n.send(null)
				},
				function(t) {
					document.title = t
				}), cT = $B.print || console.log.bind(console), dT = $B.printErr || console.warn.bind(console), XB) XB
			.hasOwnProperty(JB) && ($B[JB] = XB[JB]);
		if (XB = null, $B.arguments && (QB = $B.arguments), $B.thisProgram && (tT = $B.thisProgram), $B.quit && $B.quit,
			lT = 16, 0, pT = function(t) {
				t
			}, $B.wasmBinary && (mT = $B.wasmBinary), $B.noExitRuntime || !0, "object" != typeof WebAssembly && NR(
				"no native wasm support detected"), gT = !1, vT = "undefined" != typeof TextDecoder ? new TextDecoder(
				"utf8") : void 0, yT = "undefined" != typeof TextDecoder ? new TextDecoder("utf-16le") : void 0, $B
			.INITIAL_MEMORY || 67108864, xT = [], CT = [], IT = [], !1, DT = 0, PT = null, OT = null, $B
			.preloadedImages = {}, $B.preloadedAudios = {}, LT = "data:application/octet-stream;base64,", zR(UT =
				"libDecoder.wasm") || (UT = MR(UT)), zT = {
				splitPath: function(t) {
					return /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(t).slice(1)
				},
				normalizeArray: function(t, e) {
					for (var r = 0, n = t.length - 1; n >= 0; n--) {
						var i = t[n];
						"." === i ? t.splice(n, 1) : ".." === i ? (t.splice(n, 1), r++) : r && (t.splice(n, 1), r--)
					}
					if (e)
						for (; r; r--) t.unshift("..");
					return t
				},
				normalize: function(t) {
					var e = "/" === t.charAt(0),
						r = "/" === t.substr(-1);
					return (t = zT.normalizeArray(t.split("/").filter((function(t) {
						return !!t
					})), !e).join("/")) || e || (t = "."), t && r && (t += "/"), (e ? "/" : "") + t
				},
				dirname: function(t) {
					var e = zT.splitPath(t),
						r = e[0],
						n = e[1];
					return r || n ? (n && (n = n.substr(0, n.length - 1)), r + n) : "."
				},
				basename: function(t) {
					if ("/" === t) return "/";
					var e = (t = (t = zT.normalize(t)).replace(/\/$/, "")).lastIndexOf("/");
					return -1 === e ? t : t.substr(e + 1)
				},
				extname: function(t) {
					return zT.splitPath(t)[3]
				},
				join: function() {
					var t = Array.prototype.slice.call(arguments, 0);
					return zT.normalize(t.join("/"))
				},
				join2: function(t, e) {
					return zT.normalize(t + "/" + e)
				}
			}, FT = {
				resolve: function() {
					for (var t = "", e = !1, r = arguments.length - 1; r >= -1 && !e; r--) {
						var n = r >= 0 ? arguments[r] : WT.cwd();
						if ("string" != typeof n) throw new TypeError("Arguments to path.resolve must be strings");
						if (!n) return "";
						t = n + "/" + t, e = "/" === n.charAt(0)
					}
					return (e ? "/" : "") + (t = zT.normalizeArray(t.split("/").filter((function(t) {
						return !!t
					})), !e).join("/")) || "."
				},
				relative: function(t, e) {
					function r(t) {
						for (var e = 0; e < t.length && "" === t[e]; e++);
						for (var r = t.length - 1; r >= 0 && "" === t[r]; r--);
						return e > r ? [] : t.slice(e, r - e + 1)
					}
					t = FT.resolve(t).substr(1), e = FT.resolve(e).substr(1);
					for (var n = r(t.split("/")), i = r(e.split("/")), o = Math.min(n.length, i.length), a = o, s =
							0; s < o; s++)
						if (n[s] !== i[s]) {
							a = s;
							break
						} var f = [];
					for (s = a; s < n.length; s++) f.push("..");
					return (f = f.concat(i.slice(a))).join("/")
				}
			}, qT = {
				ttys: [],
				init: function() {},
				shutdown: function() {},
				register: function(t, e) {
					qT.ttys[t] = {
						input: [],
						output: [],
						ops: e
					}, WT.registerDevice(t, qT.stream_ops)
				},
				stream_ops: {
					open: function(t) {
						var e = qT.ttys[t.node.rdev];
						if (!e) throw new WT.ErrnoError(43);
						t.tty = e, t.seekable = !1
					},
					close: function(t) {
						t.tty.ops.flush(t.tty)
					},
					flush: function(t) {
						t.tty.ops.flush(t.tty)
					},
					read: function(t, e, r, n, i) {
						if (!t.tty || !t.tty.ops.get_char) throw new WT.ErrnoError(60);
						for (var o = 0, a = 0; a < n; a++) {
							var s;
							try {
								s = t.tty.ops.get_char(t.tty)
							} catch (t) {
								throw new WT.ErrnoError(29)
							}
							if (void 0 === s && 0 === o) throw new WT.ErrnoError(6);
							if (null == s) break;
							o++, e[r + a] = s
						}
						return o && (t.node.timestamp = Date.now()), o
					},
					write: function(t, e, r, n, i) {
						if (!t.tty || !t.tty.ops.put_char) throw new WT.ErrnoError(60);
						try {
							for (var o = 0; o < n; o++) t.tty.ops.put_char(t.tty, e[r + o])
						} catch (t) {
							throw new WT.ErrnoError(29)
						}
						return n && (t.node.timestamp = Date.now()), o
					}
				},
				default_tty_ops: {
					get_char: function(t) {
						if (!t.input.length) {
							var e = null;
							if (nT) {
								var r = ZB.alloc ? ZB.alloc(256) : new ZB(256),
									n = 0;
								try {
									n = uT.readSync(KB.stdin.fd, r, 0, 256, null)
								} catch (t) {
									if (!t.toString().includes("EOF")) throw t;
									n = 0
								}
								e = n > 0 ? r.slice(0, n).toString("utf-8") : null
							} else "undefined" != typeof window && "function" == typeof window.prompt ? null !== (
									e = window.prompt("Input: ")) && (e += "\n") : "function" == typeof readline &&
								null !== (e = readline()) && (e += "\n");
							if (!e) return null;
							t.input = zC(e, !0)
						}
						return t.input.shift()
					},
					put_char: function(t, e) {
						null === e || 10 === e ? (cT(kR(t.output, 0)), t.output = []) : 0 != e && t.output.push(e)
					},
					flush: function(t) {
						t.output && t.output.length > 0 && (cT(kR(t.output, 0)), t.output = [])
					}
				},
				default_tty1_ops: {
					put_char: function(t, e) {
						null === e || 10 === e ? (dT(kR(t.output, 0)), t.output = []) : 0 != e && t.output.push(e)
					},
					flush: function(t) {
						t.output && t.output.length > 0 && (dT(kR(t.output, 0)), t.output = [])
					}
				}
			}, HT = {
				ops_table: null,
				mount: function(t) {
					return HT.createNode(null, "/", 16895, 0)
				},
				createNode: function(t, e, r, n) {
					if (WT.isBlkdev(r) || WT.isFIFO(r)) throw new WT.ErrnoError(63);
					HT.ops_table || (HT.ops_table = {
						dir: {
							node: {
								getattr: HT.node_ops.getattr,
								setattr: HT.node_ops.setattr,
								lookup: HT.node_ops.lookup,
								mknod: HT.node_ops.mknod,
								rename: HT.node_ops.rename,
								unlink: HT.node_ops.unlink,
								rmdir: HT.node_ops.rmdir,
								readdir: HT.node_ops.readdir,
								symlink: HT.node_ops.symlink
							},
							stream: {
								llseek: HT.stream_ops.llseek
							}
						},
						file: {
							node: {
								getattr: HT.node_ops.getattr,
								setattr: HT.node_ops.setattr
							},
							stream: {
								llseek: HT.stream_ops.llseek,
								read: HT.stream_ops.read,
								write: HT.stream_ops.write,
								allocate: HT.stream_ops.allocate,
								mmap: HT.stream_ops.mmap,
								msync: HT.stream_ops.msync
							}
						},
						link: {
							node: {
								getattr: HT.node_ops.getattr,
								setattr: HT.node_ops.setattr,
								readlink: HT.node_ops.readlink
							},
							stream: {}
						},
						chrdev: {
							node: {
								getattr: HT.node_ops.getattr,
								setattr: HT.node_ops.setattr
							},
							stream: WT.chrdev_stream_ops
						}
					});
					var i = WT.createNode(t, e, r, n);
					return WT.isDir(i.mode) ? (i.node_ops = HT.ops_table.dir.node, i.stream_ops = HT.ops_table.dir
							.stream, i.contents = {}) : WT.isFile(i.mode) ? (i.node_ops = HT.ops_table.file.node, i
							.stream_ops = HT.ops_table.file.stream, i.usedBytes = 0, i.contents = null) : WT.isLink(
							i.mode) ? (i.node_ops = HT.ops_table.link.node, i.stream_ops = HT.ops_table.link
						.stream) : WT.isChrdev(i.mode) && (i.node_ops = HT.ops_table.chrdev.node, i.stream_ops = HT
							.ops_table.chrdev.stream), i.timestamp = Date.now(), t && (t.contents[e] = i, t
							.timestamp = i.timestamp), i
				},
				getFileDataAsTypedArray: function(t) {
					return t.contents ? t.contents.subarray ? t.contents.subarray(0, t.usedBytes) : new Uint8Array(t
						.contents) : new Uint8Array(0)
				},
				expandFileStorage: function(t, e) {
					var r = t.contents ? t.contents.length : 0;
					if (!(r >= e)) {
						e = Math.max(e, r * (r < 1048576 ? 2 : 1.125) >>> 0), 0 != r && (e = Math.max(e, 256));
						var n = t.contents;
						t.contents = new Uint8Array(e), t.usedBytes > 0 && t.contents.set(n.subarray(0, t
							.usedBytes), 0)
					}
				},
				resizeFileStorage: function(t, e) {
					if (t.usedBytes != e)
						if (0 == e) t.contents = null, t.usedBytes = 0;
						else {
							var r = t.contents;
							t.contents = new Uint8Array(e), r && t.contents.set(r.subarray(0, Math.min(e, t
								.usedBytes))), t.usedBytes = e
						}
				},
				node_ops: {
					getattr: function(t) {
						var e = {};
						return e.dev = WT.isChrdev(t.mode) ? t.id : 1, e.ino = t.id, e.mode = t.mode, e.nlink = 1, e
							.uid = 0, e.gid = 0, e.rdev = t.rdev, WT.isDir(t.mode) ? e.size = 4096 : WT.isFile(t
								.mode) ? e.size = t.usedBytes : WT.isLink(t.mode) ? e.size = t.link.length : e
							.size = 0, e.atime = new Date(t.timestamp), e.mtime = new Date(t.timestamp), e.ctime =
							new Date(t.timestamp), e.blksize = 4096, e.blocks = Math.ceil(e.size / e.blksize), e
					},
					setattr: function(t, e) {
						void 0 !== e.mode && (t.mode = e.mode), void 0 !== e.timestamp && (t.timestamp = e
							.timestamp), void 0 !== e.size && HT.resizeFileStorage(t, e.size)
					},
					lookup: function(t, e) {
						throw WT.genericErrors[44]
					},
					mknod: function(t, e, r, n) {
						return HT.createNode(t, e, r, n)
					},
					rename: function(t, e, r) {
						if (WT.isDir(t.mode)) {
							var n;
							try {
								n = WT.lookupNode(e, r)
							} catch (t) {}
							if (n)
								for (var i in n.contents) throw new WT.ErrnoError(55)
						}
						delete t.parent.contents[t.name], t.parent.timestamp = Date.now(), t.name = r, e.contents[
							r] = t, e.timestamp = t.parent.timestamp, t.parent = e
					},
					unlink: function(t, e) {
						delete t.contents[e], t.timestamp = Date.now()
					},
					rmdir: function(t, e) {
						var r = WT.lookupNode(t, e);
						for (var n in r.contents) throw new WT.ErrnoError(55);
						delete t.contents[e], t.timestamp = Date.now()
					},
					readdir: function(t) {
						var e = [".", ".."];
						for (var r in t.contents) t.contents.hasOwnProperty(r) && e.push(r);
						return e
					},
					symlink: function(t, e, r) {
						var n = HT.createNode(t, e, 41471, 0);
						return n.link = r, n
					},
					readlink: function(t) {
						if (!WT.isLink(t.mode)) throw new WT.ErrnoError(28);
						return t.link
					}
				},
				stream_ops: {
					read: function(t, e, r, n, i) {
						var o = t.node.contents;
						if (i >= t.node.usedBytes) return 0;
						var a = Math.min(t.node.usedBytes - i, n);
						if (a > 8 && o.subarray) e.set(o.subarray(i, i + a), r);
						else
							for (var s = 0; s < a; s++) e[r + s] = o[i + s];
						return a
					},
					write: function(t, e, r, n, i, o) {
						if (!n) return 0;
						var a = t.node;
						if (a.timestamp = Date.now(), e.subarray && (!a.contents || a.contents.subarray)) {
							if (o) return a.contents = e.subarray(r, r + n), a.usedBytes = n, n;
							if (0 === a.usedBytes && 0 === i) return a.contents = e.slice(r, r + n), a.usedBytes =
								n, n;
							if (i + n <= a.usedBytes) return a.contents.set(e.subarray(r, r + n), i), n
						}
						if (HT.expandFileStorage(a, i + n), a.contents.subarray && e.subarray) a.contents.set(e
							.subarray(r, r + n), i);
						else
							for (var s = 0; s < n; s++) a.contents[i + s] = e[r + s];
						return a.usedBytes = Math.max(a.usedBytes, i + n), n
					},
					llseek: function(t, e, r) {
						var n = e;
						if (1 === r ? n += t.position : 2 === r && WT.isFile(t.node.mode) && (n += t.node
							.usedBytes), n < 0) throw new WT.ErrnoError(28);
						return n
					},
					allocate: function(t, e, r) {
						HT.expandFileStorage(t.node, e + r), t.node.usedBytes = Math.max(t.node.usedBytes, e + r)
					},
					mmap: function(t, e, r, n, i, o) {
						if (0 !== e) throw new WT.ErrnoError(28);
						if (!WT.isFile(t.node.mode)) throw new WT.ErrnoError(43);
						var a, s, f = t.node.contents;
						if (2 & o || f.buffer !== wT) {
							if ((n > 0 || n + r < f.length) && (f = f.subarray ? f.subarray(n, n + r) : Array
									.prototype.slice.call(f, n, n + r)), s = !0, !(a = KR(r))) throw new WT
								.ErrnoError(48);
							_T.set(f, a)
						} else s = !1, a = f.byteOffset;
						return {
							ptr: a,
							allocated: s
						}
					},
					msync: function(t, e, r, n, i) {
						if (!WT.isFile(t.node.mode)) throw new WT.ErrnoError(43);
						if (2 & i) return 0;
						HT.stream_ops.write(t, e, 0, n, r, !1);
						return 0
					}
				}
			}, WT = {
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
				lookupPath: function(t, e) {
					if (e = e || {}, !(t = FT.resolve(WT.cwd(), t))) return {
						path: "",
						node: null
					};
					var r = {
						follow_mount: !0,
						recurse_count: 0
					};
					for (var n in r) void 0 === e[n] && (e[n] = r[n]);
					if (e.recurse_count > 8) throw new WT.ErrnoError(32);
					for (var i = zT.normalizeArray(t.split("/").filter((function(t) {
							return !!t
						})), !1), o = WT.root, a = "/", s = 0; s < i.length; s++) {
						var f = s === i.length - 1;
						if (f && e.parent) break;
						if (o = WT.lookupNode(o, i[s]), a = zT.join2(a, i[s]), WT.isMountpoint(o) && (!f || f && e
								.follow_mount) && (o = o.mounted.root), !f || e.follow)
							for (var u = 0; WT.isLink(o.mode);) {
								var h = WT.readlink(a);
								if (a = FT.resolve(zT.dirname(a), h), o = WT.lookupPath(a, {
										recurse_count: e.recurse_count
									}).node, u++ > 40) throw new WT.ErrnoError(32)
							}
					}
					return {
						path: a,
						node: o
					}
				},
				getPath: function(t) {
					for (var e;;) {
						if (WT.isRoot(t)) {
							var r = t.mount.mountpoint;
							return e ? "/" !== r[r.length - 1] ? r + "/" + e : r + e : r
						}
						e = e ? t.name + "/" + e : t.name, t = t.parent
					}
				},
				hashName: function(t, e) {
					for (var r = 0, n = 0; n < e.length; n++) r = (r << 5) - r + e.charCodeAt(n) | 0;
					return (t + r >>> 0) % WT.nameTable.length
				},
				hashAddNode: function(t) {
					var e = WT.hashName(t.parent.id, t.name);
					t.name_next = WT.nameTable[e], WT.nameTable[e] = t
				},
				hashRemoveNode: function(t) {
					var e = WT.hashName(t.parent.id, t.name);
					if (WT.nameTable[e] === t) WT.nameTable[e] = t.name_next;
					else
						for (var r = WT.nameTable[e]; r;) {
							if (r.name_next === t) {
								r.name_next = t.name_next;
								break
							}
							r = r.name_next
						}
				},
				lookupNode: function(t, e) {
					var r = WT.mayLookup(t);
					if (r) throw new WT.ErrnoError(r, t);
					for (var n = WT.hashName(t.id, e), i = WT.nameTable[n]; i; i = i.name_next) {
						var o = i.name;
						if (i.parent.id === t.id && o === e) return i
					}
					return WT.lookup(t, e)
				},
				createNode: function(t, e, r, n) {
					var i = new WT.FSNode(t, e, r, n);
					return WT.hashAddNode(i), i
				},
				destroyNode: function(t) {
					WT.hashRemoveNode(t)
				},
				isRoot: function(t) {
					return t === t.parent
				},
				isMountpoint: function(t) {
					return !!t.mounted
				},
				isFile: function(t) {
					return 32768 == (61440 & t)
				},
				isDir: function(t) {
					return 16384 == (61440 & t)
				},
				isLink: function(t) {
					return 40960 == (61440 & t)
				},
				isChrdev: function(t) {
					return 8192 == (61440 & t)
				},
				isBlkdev: function(t) {
					return 24576 == (61440 & t)
				},
				isFIFO: function(t) {
					return 4096 == (61440 & t)
				},
				isSocket: function(t) {
					return 49152 == (49152 & t)
				},
				flagModes: {
					r: 0,
					"r+": 2,
					w: 577,
					"w+": 578,
					a: 1089,
					"a+": 1090
				},
				modeStringToFlags: function(t) {
					var e = WT.flagModes[t];
					if (void 0 === e) throw new Error("Unknown file open mode: " + t);
					return e
				},
				flagsToPermissionString: function(t) {
					var e = ["r", "w", "rw"][3 & t];
					return 512 & t && (e += "w"), e
				},
				nodePermissions: function(t, e) {
					return WT.ignorePermissions || (!e.includes("r") || 292 & t.mode) && (!e.includes("w") || 146 &
						t.mode) && (!e.includes("x") || 73 & t.mode) ? 0 : 2
				},
				mayLookup: function(t) {
					var e = WT.nodePermissions(t, "x");
					return e || (t.node_ops.lookup ? 0 : 2)
				},
				mayCreate: function(t, e) {
					try {
						WT.lookupNode(t, e);
						return 20
					} catch (t) {}
					return WT.nodePermissions(t, "wx")
				},
				mayDelete: function(t, e, r) {
					var n;
					try {
						n = WT.lookupNode(t, e)
					} catch (t) {
						return t.errno
					}
					var i = WT.nodePermissions(t, "wx");
					if (i) return i;
					if (r) {
						if (!WT.isDir(n.mode)) return 54;
						if (WT.isRoot(n) || WT.getPath(n) === WT.cwd()) return 10
					} else if (WT.isDir(n.mode)) return 31;
					return 0
				},
				mayOpen: function(t, e) {
					return t ? WT.isLink(t.mode) ? 32 : WT.isDir(t.mode) && ("r" !== WT.flagsToPermissionString(
						e) || 512 & e) ? 31 : WT.nodePermissions(t, WT.flagsToPermissionString(e)) : 44
				},
				MAX_OPEN_FDS: 4096,
				nextfd: function(t, e) {
					t = t || 0, e = e || WT.MAX_OPEN_FDS;
					for (var r = t; r <= e; r++)
						if (!WT.streams[r]) return r;
					throw new WT.ErrnoError(33)
				},
				getStream: function(t) {
					return WT.streams[t]
				},
				createStream: function(t, e, r) {
					WT.FSStream || (WT.FSStream = function() {}, WT.FSStream.prototype = {
						object: {
							get: function() {
								return this.node
							},
							set: function(t) {
								this.node = t
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
					var n = new WT.FSStream;
					for (var i in t) n[i] = t[i];
					t = n;
					var o = WT.nextfd(e, r);
					return t.fd = o, WT.streams[o] = t, t
				},
				closeStream: function(t) {
					WT.streams[t] = null
				},
				chrdev_stream_ops: {
					open: function(t) {
						var e = WT.getDevice(t.node.rdev);
						t.stream_ops = e.stream_ops, t.stream_ops.open && t.stream_ops.open(t)
					},
					llseek: function() {
						throw new WT.ErrnoError(70)
					}
				},
				major: function(t) {
					return t >> 8
				},
				minor: function(t) {
					return 255 & t
				},
				makedev: function(t, e) {
					return t << 8 | e
				},
				registerDevice: function(t, e) {
					WT.devices[t] = {
						stream_ops: e
					}
				},
				getDevice: function(t) {
					return WT.devices[t]
				},
				getMounts: function(t) {
					for (var e = [], r = [t]; r.length;) {
						var n = r.pop();
						e.push(n), r.push.apply(r, n.mounts)
					}
					return e
				},
				syncfs: function(t, e) {
					"function" == typeof t && (e = t, t = !1), WT.syncFSRequests++, WT.syncFSRequests > 1 && dT(
						"warning: " + WT.syncFSRequests +
						" FS.syncfs operations in flight at once, probably just doing extra work");
					var r = WT.getMounts(WT.root.mount),
						n = 0;

					function i(t) {
						return WT.syncFSRequests--, e(t)
					}

					function o(t) {
						if (t) return o.errored ? void 0 : (o.errored = !0, i(t));
						++n >= r.length && i(null)
					}
					r.forEach((function(e) {
						if (!e.type.syncfs) return o(null);
						e.type.syncfs(e, t, o)
					}))
				},
				mount: function(t, e, r) {
					var n, i = "/" === r,
						o = !r;
					if (i && WT.root) throw new WT.ErrnoError(10);
					if (!i && !o) {
						var a = WT.lookupPath(r, {
							follow_mount: !1
						});
						if (r = a.path, n = a.node, WT.isMountpoint(n)) throw new WT.ErrnoError(10);
						if (!WT.isDir(n.mode)) throw new WT.ErrnoError(54)
					}
					var s = {
							type: t,
							opts: e,
							mountpoint: r,
							mounts: []
						},
						f = t.mount(s);
					return f.mount = s, s.root = f, i ? WT.root = f : n && (n.mounted = s, n.mount && n.mount.mounts
						.push(s)), f
				},
				unmount: function(t) {
					var e = WT.lookupPath(t, {
						follow_mount: !1
					});
					if (!WT.isMountpoint(e.node)) throw new WT.ErrnoError(28);
					var r = e.node,
						n = r.mounted,
						i = WT.getMounts(n);
					Object.keys(WT.nameTable).forEach((function(t) {
						for (var e = WT.nameTable[t]; e;) {
							var r = e.name_next;
							i.includes(e.mount) && WT.destroyNode(e), e = r
						}
					})), r.mounted = null;
					var o = r.mount.mounts.indexOf(n);
					r.mount.mounts.splice(o, 1)
				},
				lookup: function(t, e) {
					return t.node_ops.lookup(t, e)
				},
				mknod: function(t, e, r) {
					var n = WT.lookupPath(t, {
							parent: !0
						}).node,
						i = zT.basename(t);
					if (!i || "." === i || ".." === i) throw new WT.ErrnoError(28);
					var o = WT.mayCreate(n, i);
					if (o) throw new WT.ErrnoError(o);
					if (!n.node_ops.mknod) throw new WT.ErrnoError(63);
					return n.node_ops.mknod(n, i, e, r)
				},
				create: function(t, e) {
					return e = void 0 !== e ? e : 438, e &= 4095, e |= 32768, WT.mknod(t, e, 0)
				},
				mkdir: function(t, e) {
					return e = void 0 !== e ? e : 511, e &= 1023, e |= 16384, WT.mknod(t, e, 0)
				},
				mkdirTree: function(t, e) {
					for (var r = t.split("/"), n = "", i = 0; i < r.length; ++i)
						if (r[i]) {
							n += "/" + r[i];
							try {
								WT.mkdir(n, e)
							} catch (t) {
								if (20 != t.errno) throw t
							}
						}
				},
				mkdev: function(t, e, r) {
					return void 0 === r && (r = e, e = 438), e |= 8192, WT.mknod(t, e, r)
				},
				symlink: function(t, e) {
					if (!FT.resolve(t)) throw new WT.ErrnoError(44);
					var r = WT.lookupPath(e, {
						parent: !0
					}).node;
					if (!r) throw new WT.ErrnoError(44);
					var n = zT.basename(e),
						i = WT.mayCreate(r, n);
					if (i) throw new WT.ErrnoError(i);
					if (!r.node_ops.symlink) throw new WT.ErrnoError(63);
					return r.node_ops.symlink(r, n, t)
				},
				rename: function(t, e) {
					var r, n, i = zT.dirname(t),
						o = zT.dirname(e),
						a = zT.basename(t),
						s = zT.basename(e);
					if (r = WT.lookupPath(t, {
							parent: !0
						}).node, n = WT.lookupPath(e, {
							parent: !0
						}).node, !r || !n) throw new WT.ErrnoError(44);
					if (r.mount !== n.mount) throw new WT.ErrnoError(75);
					var f, u = WT.lookupNode(r, a),
						h = FT.relative(t, o);
					if ("." !== h.charAt(0)) throw new WT.ErrnoError(28);
					if ("." !== (h = FT.relative(e, i)).charAt(0)) throw new WT.ErrnoError(55);
					try {
						f = WT.lookupNode(n, s)
					} catch (t) {}
					if (u !== f) {
						var c = WT.isDir(u.mode),
							d = WT.mayDelete(r, a, c);
						if (d) throw new WT.ErrnoError(d);
						if (d = f ? WT.mayDelete(n, s, c) : WT.mayCreate(n, s)) throw new WT.ErrnoError(d);
						if (!r.node_ops.rename) throw new WT.ErrnoError(63);
						if (WT.isMountpoint(u) || f && WT.isMountpoint(f)) throw new WT.ErrnoError(10);
						if (n !== r && (d = WT.nodePermissions(r, "w"))) throw new WT.ErrnoError(d);
						try {
							WT.trackingDelegate.willMovePath && WT.trackingDelegate.willMovePath(t, e)
						} catch (r) {
							dT("FS.trackingDelegate['willMovePath']('" + t + "', '" + e +
								"') threw an exception: " + r.message)
						}
						WT.hashRemoveNode(u);
						try {
							r.node_ops.rename(u, n, s)
						} catch (t) {
							throw t
						} finally {
							WT.hashAddNode(u)
						}
						try {
							WT.trackingDelegate.onMovePath && WT.trackingDelegate.onMovePath(t, e)
						} catch (r) {
							dT("FS.trackingDelegate['onMovePath']('" + t + "', '" + e + "') threw an exception: " +
								r.message)
						}
					}
				},
				rmdir: function(t) {
					var e = WT.lookupPath(t, {
							parent: !0
						}).node,
						r = zT.basename(t),
						n = WT.lookupNode(e, r),
						i = WT.mayDelete(e, r, !0);
					if (i) throw new WT.ErrnoError(i);
					if (!e.node_ops.rmdir) throw new WT.ErrnoError(63);
					if (WT.isMountpoint(n)) throw new WT.ErrnoError(10);
					try {
						WT.trackingDelegate.willDeletePath && WT.trackingDelegate.willDeletePath(t)
					} catch (e) {
						dT("FS.trackingDelegate['willDeletePath']('" + t + "') threw an exception: " + e.message)
					}
					e.node_ops.rmdir(e, r), WT.destroyNode(n);
					try {
						WT.trackingDelegate.onDeletePath && WT.trackingDelegate.onDeletePath(t)
					} catch (e) {
						dT("FS.trackingDelegate['onDeletePath']('" + t + "') threw an exception: " + e.message)
					}
				},
				readdir: function(t) {
					var e = WT.lookupPath(t, {
						follow: !0
					}).node;
					if (!e.node_ops.readdir) throw new WT.ErrnoError(54);
					return e.node_ops.readdir(e)
				},
				unlink: function(t) {
					var e = WT.lookupPath(t, {
							parent: !0
						}).node,
						r = zT.basename(t),
						n = WT.lookupNode(e, r),
						i = WT.mayDelete(e, r, !1);
					if (i) throw new WT.ErrnoError(i);
					if (!e.node_ops.unlink) throw new WT.ErrnoError(63);
					if (WT.isMountpoint(n)) throw new WT.ErrnoError(10);
					try {
						WT.trackingDelegate.willDeletePath && WT.trackingDelegate.willDeletePath(t)
					} catch (e) {
						dT("FS.trackingDelegate['willDeletePath']('" + t + "') threw an exception: " + e.message)
					}
					e.node_ops.unlink(e, r), WT.destroyNode(n);
					try {
						WT.trackingDelegate.onDeletePath && WT.trackingDelegate.onDeletePath(t)
					} catch (e) {
						dT("FS.trackingDelegate['onDeletePath']('" + t + "') threw an exception: " + e.message)
					}
				},
				readlink: function(t) {
					var e = WT.lookupPath(t).node;
					if (!e) throw new WT.ErrnoError(44);
					if (!e.node_ops.readlink) throw new WT.ErrnoError(28);
					return FT.resolve(WT.getPath(e.parent), e.node_ops.readlink(e))
				},
				stat: function(t, e) {
					var r = WT.lookupPath(t, {
						follow: !e
					}).node;
					if (!r) throw new WT.ErrnoError(44);
					if (!r.node_ops.getattr) throw new WT.ErrnoError(63);
					return r.node_ops.getattr(r)
				},
				lstat: function(t) {
					return WT.stat(t, !0)
				},
				chmod: function(t, e, r) {
					var n;
					"string" == typeof t ? n = WT.lookupPath(t, {
						follow: !r
					}).node : n = t;
					if (!n.node_ops.setattr) throw new WT.ErrnoError(63);
					n.node_ops.setattr(n, {
						mode: 4095 & e | -4096 & n.mode,
						timestamp: Date.now()
					})
				},
				lchmod: function(t, e) {
					WT.chmod(t, e, !0)
				},
				fchmod: function(t, e) {
					var r = WT.getStream(t);
					if (!r) throw new WT.ErrnoError(8);
					WT.chmod(r.node, e)
				},
				chown: function(t, e, r, n) {
					var i;
					"string" == typeof t ? i = WT.lookupPath(t, {
						follow: !n
					}).node : i = t;
					if (!i.node_ops.setattr) throw new WT.ErrnoError(63);
					i.node_ops.setattr(i, {
						timestamp: Date.now()
					})
				},
				lchown: function(t, e, r) {
					WT.chown(t, e, r, !0)
				},
				fchown: function(t, e, r) {
					var n = WT.getStream(t);
					if (!n) throw new WT.ErrnoError(8);
					WT.chown(n.node, e, r)
				},
				truncate: function(t, e) {
					if (e < 0) throw new WT.ErrnoError(28);
					var r;
					"string" == typeof t ? r = WT.lookupPath(t, {
						follow: !0
					}).node : r = t;
					if (!r.node_ops.setattr) throw new WT.ErrnoError(63);
					if (WT.isDir(r.mode)) throw new WT.ErrnoError(31);
					if (!WT.isFile(r.mode)) throw new WT.ErrnoError(28);
					var n = WT.nodePermissions(r, "w");
					if (n) throw new WT.ErrnoError(n);
					r.node_ops.setattr(r, {
						size: e,
						timestamp: Date.now()
					})
				},
				ftruncate: function(t, e) {
					var r = WT.getStream(t);
					if (!r) throw new WT.ErrnoError(8);
					if (0 == (2097155 & r.flags)) throw new WT.ErrnoError(28);
					WT.truncate(r.node, e)
				},
				utime: function(t, e, r) {
					var n = WT.lookupPath(t, {
						follow: !0
					}).node;
					n.node_ops.setattr(n, {
						timestamp: Math.max(e, r)
					})
				},
				open: function(t, e, r, n, i) {
					if ("" === t) throw new WT.ErrnoError(44);
					var o;
					if (r = void 0 === r ? 438 : r, r = 64 & (e = "string" == typeof e ? WT.modeStringToFlags(e) :
							e) ? 4095 & r | 32768 : 0, "object" == typeof t) o = t;
					else {
						t = zT.normalize(t);
						try {
							o = WT.lookupPath(t, {
								follow: !(131072 & e)
							}).node
						} catch (t) {}
					}
					var a = !1;
					if (64 & e)
						if (o) {
							if (128 & e) throw new WT.ErrnoError(20)
						} else o = WT.mknod(t, r, 0), a = !0;
					if (!o) throw new WT.ErrnoError(44);
					if (WT.isChrdev(o.mode) && (e &= -513), 65536 & e && !WT.isDir(o.mode)) throw new WT.ErrnoError(
						54);
					if (!a) {
						var s = WT.mayOpen(o, e);
						if (s) throw new WT.ErrnoError(s)
					}
					512 & e && WT.truncate(o, 0), e &= -131713;
					var f = WT.createStream({
						node: o,
						path: WT.getPath(o),
						flags: e,
						seekable: !0,
						position: 0,
						stream_ops: o.stream_ops,
						ungotten: [],
						error: !1
					}, n, i);
					f.stream_ops.open && f.stream_ops.open(f), !$B.logReadFiles || 1 & e || (WT.readFiles || (WT
						.readFiles = {}), t in WT.readFiles || (WT.readFiles[t] = 1, dT(
						"FS.trackingDelegate error on read file: " + t)));
					try {
						if (WT.trackingDelegate.onOpenFile) {
							var u = 0;
							1 != (2097155 & e) && (u |= WT.tracking.openFlags.READ), 0 != (2097155 & e) && (u |= WT
								.tracking.openFlags.WRITE), WT.trackingDelegate.onOpenFile(t, u)
						}
					} catch (e) {
						dT("FS.trackingDelegate['onOpenFile']('" + t + "', flags) threw an exception: " + e.message)
					}
					return f
				},
				close: function(t) {
					if (WT.isClosed(t)) throw new WT.ErrnoError(8);
					t.getdents && (t.getdents = null);
					try {
						t.stream_ops.close && t.stream_ops.close(t)
					} catch (t) {
						throw t
					} finally {
						WT.closeStream(t.fd)
					}
					t.fd = null
				},
				isClosed: function(t) {
					return null === t.fd
				},
				llseek: function(t, e, r) {
					if (WT.isClosed(t)) throw new WT.ErrnoError(8);
					if (!t.seekable || !t.stream_ops.llseek) throw new WT.ErrnoError(70);
					if (0 != r && 1 != r && 2 != r) throw new WT.ErrnoError(28);
					return t.position = t.stream_ops.llseek(t, e, r), t.ungotten = [], t.position
				},
				read: function(t, e, r, n, i) {
					if (n < 0 || i < 0) throw new WT.ErrnoError(28);
					if (WT.isClosed(t)) throw new WT.ErrnoError(8);
					if (1 == (2097155 & t.flags)) throw new WT.ErrnoError(8);
					if (WT.isDir(t.node.mode)) throw new WT.ErrnoError(31);
					if (!t.stream_ops.read) throw new WT.ErrnoError(28);
					var o = void 0 !== i;
					if (o) {
						if (!t.seekable) throw new WT.ErrnoError(70)
					} else i = t.position;
					var a = t.stream_ops.read(t, e, r, n, i);
					return o || (t.position += a), a
				},
				write: function(t, e, r, n, i, o) {
					if (n < 0 || i < 0) throw new WT.ErrnoError(28);
					if (WT.isClosed(t)) throw new WT.ErrnoError(8);
					if (0 == (2097155 & t.flags)) throw new WT.ErrnoError(8);
					if (WT.isDir(t.node.mode)) throw new WT.ErrnoError(31);
					if (!t.stream_ops.write) throw new WT.ErrnoError(28);
					t.seekable && 1024 & t.flags && WT.llseek(t, 0, 2);
					var a = void 0 !== i;
					if (a) {
						if (!t.seekable) throw new WT.ErrnoError(70)
					} else i = t.position;
					var s = t.stream_ops.write(t, e, r, n, i, o);
					a || (t.position += s);
					try {
						t.path && WT.trackingDelegate.onWriteToFile && WT.trackingDelegate.onWriteToFile(t.path)
					} catch (e) {
						dT("FS.trackingDelegate['onWriteToFile']('" + t.path + "') threw an exception: " + e
							.message)
					}
					return s
				},
				allocate: function(t, e, r) {
					if (WT.isClosed(t)) throw new WT.ErrnoError(8);
					if (e < 0 || r <= 0) throw new WT.ErrnoError(28);
					if (0 == (2097155 & t.flags)) throw new WT.ErrnoError(8);
					if (!WT.isFile(t.node.mode) && !WT.isDir(t.node.mode)) throw new WT.ErrnoError(43);
					if (!t.stream_ops.allocate) throw new WT.ErrnoError(138);
					t.stream_ops.allocate(t, e, r)
				},
				mmap: function(t, e, r, n, i, o) {
					if (0 != (2 & i) && 0 == (2 & o) && 2 != (2097155 & t.flags)) throw new WT.ErrnoError(2);
					if (1 == (2097155 & t.flags)) throw new WT.ErrnoError(2);
					if (!t.stream_ops.mmap) throw new WT.ErrnoError(43);
					return t.stream_ops.mmap(t, e, r, n, i, o)
				},
				msync: function(t, e, r, n, i) {
					return t && t.stream_ops.msync ? t.stream_ops.msync(t, e, r, n, i) : 0
				},
				munmap: function(t) {
					return 0
				},
				ioctl: function(t, e, r) {
					if (!t.stream_ops.ioctl) throw new WT.ErrnoError(59);
					return t.stream_ops.ioctl(t, e, r)
				},
				readFile: function(t, e) {
					if ((e = e || {}).flags = e.flags || 0, e.encoding = e.encoding || "binary", "utf8" !== e
						.encoding && "binary" !== e.encoding) throw new Error('Invalid encoding type "' + e
						.encoding + '"');
					var r, n = WT.open(t, e.flags),
						i = WT.stat(t).size,
						o = new Uint8Array(i);
					return WT.read(n, o, 0, i, 0), "utf8" === e.encoding ? r = kR(o, 0) : "binary" === e.encoding &&
						(r = o), WT.close(n), r
				},
				writeFile: function(t, e, r) {
					(r = r || {}).flags = r.flags || 577;
					var n = WT.open(t, r.flags, r.mode);
					if ("string" == typeof e) {
						var i = new Uint8Array(xR(e) + 1),
							o = TR(e, i, 0, i.length);
						WT.write(n, i, 0, o, void 0, r.canOwn)
					} else {
						if (!ArrayBuffer.isView(e)) throw new Error("Unsupported data type");
						WT.write(n, e, 0, e.byteLength, void 0, r.canOwn)
					}
					WT.close(n)
				},
				cwd: function() {
					return WT.currentPath
				},
				chdir: function(t) {
					var e = WT.lookupPath(t, {
						follow: !0
					});
					if (null === e.node) throw new WT.ErrnoError(44);
					if (!WT.isDir(e.node.mode)) throw new WT.ErrnoError(54);
					var r = WT.nodePermissions(e.node, "x");
					if (r) throw new WT.ErrnoError(r);
					WT.currentPath = e.path
				},
				createDefaultDirectories: function() {
					WT.mkdir("/tmp"), WT.mkdir("/home"), WT.mkdir("/home/web_user")
				},
				createDefaultDevices: function() {
					WT.mkdir("/dev"), WT.registerDevice(WT.makedev(1, 3), {
						read: function() {
							return 0
						},
						write: function(t, e, r, n, i) {
							return n
						}
					}), WT.mkdev("/dev/null", WT.makedev(1, 3)), qT.register(WT.makedev(5, 0), qT
						.default_tty_ops), qT.register(WT.makedev(6, 0), qT.default_tty1_ops), WT.mkdev(
						"/dev/tty", WT.makedev(5, 0)), WT.mkdev("/dev/tty1", WT.makedev(6, 0));
					var t = YR();
					WT.createDevice("/dev", "random", t), WT.createDevice("/dev", "urandom", t), WT.mkdir(
						"/dev/shm"), WT.mkdir("/dev/shm/tmp")
				},
				createSpecialDirectories: function() {
					WT.mkdir("/proc");
					var t = WT.mkdir("/proc/self");
					WT.mkdir("/proc/self/fd"), WT.mount({
						mount: function() {
							var e = WT.createNode(t, "fd", 16895, 73);
							return e.node_ops = {
								lookup: function(t, e) {
									var r = +e,
										n = WT.getStream(r);
									if (!n) throw new WT.ErrnoError(8);
									var i = {
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
									return i.parent = i, i
								}
							}, e
						}
					}, {}, "/proc/self/fd")
				},
				createStandardStreams: function() {
					$B.stdin ? WT.createDevice("/dev", "stdin", $B.stdin) : WT.symlink("/dev/tty", "/dev/stdin"), $B
						.stdout ? WT.createDevice("/dev", "stdout", null, $B.stdout) : WT.symlink("/dev/tty",
							"/dev/stdout"), $B.stderr ? WT.createDevice("/dev", "stderr", null, $B.stderr) : WT
						.symlink("/dev/tty1", "/dev/stderr");
					WT.open("/dev/stdin", 0), WT.open("/dev/stdout", 1), WT.open("/dev/stderr", 1)
				},
				ensureErrnoError: function() {
					WT.ErrnoError || (WT.ErrnoError = function(t, e) {
							this.node = e, this.setErrno = function(t) {
								this.errno = t
							}, this.setErrno(t), this.message = "FS error"
						}, WT.ErrnoError.prototype = new Error, WT.ErrnoError.prototype.constructor = WT
						.ErrnoError, [44].forEach((function(t) {
							WT.genericErrors[t] = new WT.ErrnoError(t), WT.genericErrors[t].stack =
								"<generic error, no stack>"
						})))
				},
				staticInit: function() {
					WT.ensureErrnoError(), WT.nameTable = new Array(4096), WT.mount(HT, {}, "/"), WT
						.createDefaultDirectories(), WT.createDefaultDevices(), WT.createSpecialDirectories(), WT
						.filesystems = {
							MEMFS: HT
						}
				},
				init: function(t, e, r) {
					WT.init.initialized = !0, WT.ensureErrnoError(), $B.stdin = t || $B.stdin, $B.stdout = e || $B
						.stdout, $B.stderr = r || $B.stderr, WT.createStandardStreams()
				},
				quit: function() {
					WT.init.initialized = !1;
					var t = $B._fflush;
					t && t(0);
					for (var e = 0; e < WT.streams.length; e++) {
						var r = WT.streams[e];
						r && WT.close(r)
					}
				},
				getMode: function(t, e) {
					var r = 0;
					return t && (r |= 365), e && (r |= 146), r
				},
				findObject: function(t, e) {
					var r = WT.analyzePath(t, e);
					return r.exists ? r.object : null
				},
				analyzePath: function(t, e) {
					try {
						t = (n = WT.lookupPath(t, {
							follow: !e
						})).path
					} catch (t) {}
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
						var n = WT.lookupPath(t, {
							parent: !0
						});
						r.parentExists = !0, r.parentPath = n.path, r.parentObject = n.node, r.name = zT.basename(
							t), n = WT.lookupPath(t, {
								follow: !e
							}), r.exists = !0, r.path = n.path, r.object = n.node, r.name = n.node.name, r.isRoot =
							"/" === n.path
					} catch (t) {
						r.error = t.errno
					}
					return r
				},
				createPath: function(t, e, r, n) {
					t = "string" == typeof t ? t : WT.getPath(t);
					for (var i = e.split("/").reverse(); i.length;) {
						var o = i.pop();
						if (o) {
							var a = zT.join2(t, o);
							try {
								WT.mkdir(a)
							} catch (t) {}
							t = a
						}
					}
					return a
				},
				createFile: function(t, e, r, n, i) {
					var o = zT.join2("string" == typeof t ? t : WT.getPath(t), e),
						a = WT.getMode(n, i);
					return WT.create(o, a)
				},
				createDataFile: function(t, e, r, n, i, o) {
					var a = e ? zT.join2("string" == typeof t ? t : WT.getPath(t), e) : t,
						s = WT.getMode(n, i),
						f = WT.create(a, s);
					if (r) {
						if ("string" == typeof r) {
							for (var u = new Array(r.length), h = 0, c = r.length; h < c; ++h) u[h] = r.charCodeAt(
								h);
							r = u
						}
						WT.chmod(f, 146 | s);
						var d = WT.open(f, 577);
						WT.write(d, r, 0, r.length, 0, o), WT.close(d), WT.chmod(f, s)
					}
					return f
				},
				createDevice: function(t, e, r, n) {
					var i = zT.join2("string" == typeof t ? t : WT.getPath(t), e),
						o = WT.getMode(!!r, !!n);
					WT.createDevice.major || (WT.createDevice.major = 64);
					var a = WT.makedev(WT.createDevice.major++, 0);
					return WT.registerDevice(a, {
						open: function(t) {
							t.seekable = !1
						},
						close: function(t) {
							n && n.buffer && n.buffer.length && n(10)
						},
						read: function(t, e, n, i, o) {
							for (var a = 0, s = 0; s < i; s++) {
								var f;
								try {
									f = r()
								} catch (t) {
									throw new WT.ErrnoError(29)
								}
								if (void 0 === f && 0 === a) throw new WT.ErrnoError(6);
								if (null == f) break;
								a++, e[n + s] = f
							}
							return a && (t.node.timestamp = Date.now()), a
						},
						write: function(t, e, r, i, o) {
							for (var a = 0; a < i; a++) try {
								n(e[r + a])
							} catch (t) {
								throw new WT.ErrnoError(29)
							}
							return i && (t.node.timestamp = Date.now()), a
						}
					}), WT.mkdev(i, o, a)
				},
				forceLoadFile: function(t) {
					if (t.isDevice || t.isFolder || t.link || t.contents) return !0;
					if ("undefined" != typeof XMLHttpRequest) throw new Error(
						"Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread."
						);
					if (!aT) throw new Error("Cannot load without read() or XMLHttpRequest.");
					try {
						t.contents = zC(aT(t.url), !0), t.usedBytes = t.contents.length
					} catch (t) {
						throw new WT.ErrnoError(29)
					}
				},
				createLazyFile: function(t, e, r, n, i) {
					function o() {
						this.lengthKnown = !1, this.chunks = []
					}
					if (o.prototype.get = function(t) {
							if (!(t > this.length - 1 || t < 0)) {
								var e = t % this.chunkSize,
									r = t / this.chunkSize | 0;
								return this.getter(r)[e]
							}
						}, o.prototype.setDataGetter = function(t) {
							this.getter = t
						}, o.prototype.cacheLength = function() {
							var t = new XMLHttpRequest;
							if (t.open("HEAD", r, !1), t.send(null), !(t.status >= 200 && t.status < 300 || 304 ===
									t.status)) throw new Error("Couldn't load " + r + ". Status: " + t.status);
							var e, n = Number(t.getResponseHeader("Content-length")),
								i = (e = t.getResponseHeader("Accept-Ranges")) && "bytes" === e,
								o = (e = t.getResponseHeader("Content-Encoding")) && "gzip" === e,
								a = 1048576;
							i || (a = n);
							var s = this;
							s.setDataGetter((function(t) {
								var e = t * a,
									i = (t + 1) * a - 1;
								if (i = Math.min(i, n - 1), void 0 === s.chunks[t] && (s.chunks[t] =
										function(t, e) {
											if (t > e) throw new Error("invalid range (" + t + ", " +
												e + ") or no bytes requested!");
											if (e > n - 1) throw new Error("only " + n +
												" bytes available! programmer error!");
											var i = new XMLHttpRequest;
											if (i.open("GET", r, !1), n !== a && i.setRequestHeader(
													"Range", "bytes=" + t + "-" + e), "undefined" !=
												typeof Uint8Array && (i.responseType = "arraybuffer"), i
												.overrideMimeType && i.overrideMimeType(
													"text/plain; charset=x-user-defined"), i.send(null),
												!(i.status >= 200 && i.status < 300 || 304 === i.status)
												) throw new Error("Couldn't load " + r + ". Status: " +
												i.status);
											return void 0 !== i.response ? new Uint8Array(i.response ||
												[]) : zC(i.responseText || "", !0)
										}(e, i)), void 0 === s.chunks[t]) throw new Error(
									"doXHR failed!");
								return s.chunks[t]
							})), !o && n || (a = n = 1, n = this.getter(0).length, a = n, cT(
								"LazyFiles on gzip forces download of the whole file when length is accessed"
								)), this._length = n, this._chunkSize = a, this.lengthKnown = !0
						}, "undefined" != typeof XMLHttpRequest) {
						if (!rT)
					throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
						var a = new o;
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
					var f = WT.createFile(t, e, s, n, i);
					s.contents ? f.contents = s.contents : s.url && (f.contents = null, f.url = s.url), Object
						.defineProperties(f, {
							usedBytes: {
								get: function() {
									return this.contents.length
								}
							}
						});
					var u = {};
					return Object.keys(f.stream_ops).forEach((function(t) {
						var e = f.stream_ops[t];
						u[t] = function() {
							return WT.forceLoadFile(f), e.apply(null, arguments)
						}
					})), u.read = function(t, e, r, n, i) {
						WT.forceLoadFile(f);
						var o = t.node.contents;
						if (i >= o.length) return 0;
						var a = Math.min(o.length - i, n);
						if (o.slice)
							for (var s = 0; s < a; s++) e[r + s] = o[i + s];
						else
							for (s = 0; s < a; s++) e[r + s] = o.get(i + s);
						return a
					}, f.stream_ops = u, f
				},
				createPreloadedFile: function(t, e, r, n, i, o, a, s, f, u) {
					Browser.init();
					var h = e ? FT.resolve(zT.join2(t, e)) : t;

					function c(r) {
						function c(r) {
							u && u(), s || WT.createDataFile(t, e, r, n, i, f), o && o(), jR()
						}
						var d = !1;
						$B.preloadPlugins.forEach((function(t) {
							d || t.canHandle(h) && (t.handle(r, h, c, (function() {
								a && a(), jR()
							})), d = !0)
						})), d || c(r)
					}
					UR(), "string" == typeof r ? Browser.asyncLoad(r, (function(t) {
						c(t)
					}), a) : c(r)
				},
				indexedDB: function() {
					return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
				},
				DB_NAME: function() {
					return "EM_FS_" + window.location.pathname
				},
				DB_VERSION: 20,
				DB_STORE_NAME: "FILE_DATA",
				saveFilesToDB: function(t, e, r) {
					e = e || function() {}, r = r || function() {};
					var n = WT.indexedDB();
					try {
						var i = n.open(WT.DB_NAME(), WT.DB_VERSION)
					} catch (t) {
						return r(t)
					}
					i.onupgradeneeded = function() {
						cT("creating db"), i.result.createObjectStore(WT.DB_STORE_NAME)
					}, i.onsuccess = function() {
						var n = i.result.transaction([WT.DB_STORE_NAME], "readwrite"),
							o = n.objectStore(WT.DB_STORE_NAME),
							a = 0,
							s = 0,
							f = t.length;

						function u() {
							0 == s ? e() : r()
						}
						t.forEach((function(t) {
							var e = o.put(WT.analyzePath(t).object.contents, t);
							e.onsuccess = function() {
								++a + s == f && u()
							}, e.onerror = function() {
								s++, a + s == f && u()
							}
						})), n.onerror = r
					}, i.onerror = r
				},
				loadFilesFromDB: function(t, e, r) {
					e = e || function() {}, r = r || function() {};
					var n = WT.indexedDB();
					try {
						var i = n.open(WT.DB_NAME(), WT.DB_VERSION)
					} catch (t) {
						return r(t)
					}
					i.onupgradeneeded = r, i.onsuccess = function() {
						var n = i.result;
						try {
							var o = n.transaction([WT.DB_STORE_NAME], "readonly")
						} catch (t) {
							return void r(t)
						}
						var a = o.objectStore(WT.DB_STORE_NAME),
							s = 0,
							f = 0,
							u = t.length;

						function h() {
							0 == f ? e() : r()
						}
						t.forEach((function(t) {
							var e = a.get(t);
							e.onsuccess = function() {
								WT.analyzePath(t).exists && WT.unlink(t), WT.createDataFile(zT
										.dirname(t), zT.basename(t), e.result, !0, !0, !0), ++
									s + f == u && h()
							}, e.onerror = function() {
								f++, s + f == u && h()
							}
						})), o.onerror = r
					}, i.onerror = r
				}
			}, GT = {
				mappings: {},
				DEFAULT_POLLMASK: 5,
				umask: 511,
				calculateAt: function(t, e, r) {
					if ("/" === e[0]) return e;
					var n;
					if (-100 === t) n = WT.cwd();
					else {
						var i = WT.getStream(t);
						if (!i) throw new WT.ErrnoError(8);
						n = i.path
					}
					if (0 == e.length) {
						if (!r) throw new WT.ErrnoError(44);
						return n
					}
					return zT.join2(n, e)
				},
				doStat: function(t, e, r) {
					try {
						var n = t(e)
					} catch (t) {
						if (t && t.node && zT.normalize(e) !== zT.normalize(WT.getPath(t.node))) return -54;
						throw t
					}
					return ST[r >> 2] = n.dev, ST[r + 4 >> 2] = 0, ST[r + 8 >> 2] = n.ino, ST[r + 12 >> 2] = n.mode,
						ST[r + 16 >> 2] = n.nlink, ST[r + 20 >> 2] = n.uid, ST[r + 24 >> 2] = n.gid, ST[r + 28 >>
						2] = n.rdev, ST[r + 32 >> 2] = 0, NT = [n.size >>> 0, (jT = n.size, +Math.abs(jT) >= 1 ?
							jT > 0 ? (0 | Math.min(+Math.floor(jT / 4294967296), 4294967295)) >>> 0 : ~~+Math
							.ceil((jT - +(~~jT >>> 0)) / 4294967296) >>> 0 : 0)], ST[r + 40 >> 2] = NT[0], ST[r +
							44 >> 2] = NT[1], ST[r + 48 >> 2] = 4096, ST[r + 52 >> 2] = n.blocks, ST[r + 56 >> 2] =
						n.atime.getTime() / 1e3 | 0, ST[r + 60 >> 2] = 0, ST[r + 64 >> 2] = n.mtime.getTime() /
						1e3 | 0, ST[r + 68 >> 2] = 0, ST[r + 72 >> 2] = n.ctime.getTime() / 1e3 | 0, ST[r + 76 >>
						2] = 0, NT = [n.ino >>> 0, (jT = n.ino, +Math.abs(jT) >= 1 ? jT > 0 ? (0 | Math.min(+Math
							.floor(jT / 4294967296), 4294967295)) >>> 0 : ~~+Math.ceil((jT - +(~~jT >>>
							0)) / 4294967296) >>> 0 : 0)], ST[r + 80 >> 2] = NT[0], ST[r + 84 >> 2] = NT[1], 0
				},
				doMsync: function(t, e, r, n, i) {
					var o = AT.slice(t, t + r);
					WT.msync(e, o, i, r, n)
				},
				doMkdir: function(t, e) {
					return "/" === (t = zT.normalize(t))[t.length - 1] && (t = t.substr(0, t.length - 1)), WT.mkdir(
						t, e, 0), 0
				},
				doMknod: function(t, e, r) {
					switch (61440 & e) {
						case 32768:
						case 8192:
						case 24576:
						case 4096:
						case 49152:
							break;
						default:
							return -28
					}
					return WT.mknod(t, e, r), 0
				},
				doReadlink: function(t, e, r) {
					if (r <= 0) return -28;
					var n = WT.readlink(t),
						i = Math.min(r, xR(n)),
						o = _T[e + i];
					return RR(n, e, r + 1), _T[e + i] = o, i
				},
				doAccess: function(t, e) {
					if (-8 & e) return -28;
					var r;
					if (!(r = WT.lookupPath(t, {
							follow: !0
						}).node)) return -44;
					var n = "";
					return 4 & e && (n += "r"), 2 & e && (n += "w"), 1 & e && (n += "x"), n && WT.nodePermissions(r,
						n) ? -2 : 0
				},
				doDup: function(t, e, r) {
					var n = WT.getStream(r);
					return n && WT.close(n), WT.open(t, e, 0, r, r).fd
				},
				doReadv: function(t, e, r, n) {
					for (var i = 0, o = 0; o < r; o++) {
						var a = ST[e + 8 * o >> 2],
							s = ST[e + (8 * o + 4) >> 2],
							f = WT.read(t, _T, a, s, n);
						if (f < 0) return -1;
						if (i += f, f < s) break
					}
					return i
				},
				doWritev: function(t, e, r, n) {
					for (var i = 0, o = 0; o < r; o++) {
						var a = ST[e + 8 * o >> 2],
							s = ST[e + (8 * o + 4) >> 2],
							f = WT.write(t, _T, a, s, n);
						if (f < 0) return -1;
						i += f
					}
					return i
				},
				varargs: void 0,
				get: function() {
					return GT.varargs += 4, ST[GT.varargs - 4 >> 2]
				},
				getStr: function(t) {
					return BR(t)
				},
				getStreamFromFD: function(t) {
					var e = WT.getStream(t);
					if (!e) throw new WT.ErrnoError(8);
					return e
				},
				get64: function(t, e) {
					return t
				}
			}, YT = void 0, KT = {}, VT = {}, ZT = {}, $T = 48, XT = 57, JT = void 0, QT = void 0, tR = !1, eR = void 0,
			rR = [], nR = {}, iR = {}, oR = void 0, aR = [], sR = [{}, {
				value: void 0
			}, {
				value: null
			}, {
				value: !0
			}, {
				value: !1
			}], fR = {}, uR = [], hR = {}, cR = function(t, e, r, n) {
				t || (t = this), this.parent = t, this.mount = t.mount, this.mounted = null, this.id = WT.nextInode++,
					this.name = e, this.mode = r, this.node_ops = {}, this.stream_ops = {}, this.rdev = n
			}, dR = 365, lR = 146, Object.defineProperties(cR.prototype, {
				read: {
					get: function() {
						return (this.mode & dR) === dR
					},
					set: function(t) {
						t ? this.mode |= dR : this.mode &= ~dR
					}
				},
				write: {
					get: function() {
						return (this.mode & lR) === lR
					},
					set: function(t) {
						t ? this.mode |= lR : this.mode &= ~lR
					}
				},
				isFolder: {
					get: function() {
						return WT.isDir(this.mode)
					}
				},
				isDevice: {
					get: function() {
						return WT.isChrdev(this.mode)
					}
				}
			}), WT.FSNode = cR, WT.staticInit(), JR(), JT = $B.BindingError = rx(Error, "BindingError"), QT = $B
			.InternalError = rx(Error, "InternalError"), vx(), jx(), Px(), oR = $B.UnboundTypeError = rx(Error,
				"UnboundTypeError"), eC(), pR = {
				z: VR,
				y: ZR,
				t: $R,
				D: sx,
				o: Wx,
				j: Kx,
				g: Zx,
				I: Xx,
				C: nC,
				m: aC,
				c: fC,
				b: uC,
				n: hC,
				i: cC,
				E: dC,
				r: mC,
				e: bC,
				p: Jx,
				d: gC,
				H: vC,
				q: yC,
				w: wC,
				a: _C,
				G: AC,
				f: TC,
				u: RC,
				v: CC,
				x: IC,
				l: DC,
				A: PC,
				B: OC,
				s: LC,
				k: UC,
				F: jC,
				h: NC
			}, HR(), $B.___wasm_call_ctors = function() {
				return ($B.___wasm_call_ctors = $B.asm.K).apply(null, arguments)
			}, mR = $B._free = function() {
				return (mR = $B._free = $B.asm.L).apply(null, arguments)
			}, bR = $B._malloc = function() {
				return (bR = $B._malloc = $B.asm.M).apply(null, arguments)
			}, gR = $B._strlen = function() {
				return (gR = $B._strlen = $B.asm.O).apply(null, arguments)
			}, vR = $B.___errno_location = function() {
				return (vR = $B.___errno_location = $B.asm.P).apply(null, arguments)
			}, yR = $B.___getTypeName = function() {
				return (yR = $B.___getTypeName = $B.asm.Q).apply(null, arguments)
			}, $B.___embind_register_native_and_builtin_types = function() {
				return ($B.___embind_register_native_and_builtin_types = $B.asm.R).apply(null, arguments)
			}, $B.dynCall_ijiii = function() {
				return ($B.dynCall_ijiii = $B.asm.S).apply(null, arguments)
			}, $B.dynCall_viiijj = function() {
				return ($B.dynCall_viiijj = $B.asm.T).apply(null, arguments)
			}, $B.dynCall_jij = function() {
				return ($B.dynCall_jij = $B.asm.U).apply(null, arguments)
			}, $B.dynCall_jii = function() {
				return ($B.dynCall_jii = $B.asm.V).apply(null, arguments)
			}, $B.dynCall_jiji = function() {
				return ($B.dynCall_jiji = $B.asm.W).apply(null, arguments)
			}, $B._ff_h264_cabac_tables = 77157, OT = function t() {
				wR || qC(), wR || (OT = t)
			}, $B.run = qC, $B.preInit)
			for ("function" == typeof $B.preInit && ($B.preInit = [$B.preInit]); $B.preInit.length > 0;) $B.preInit
			.pop()();
		qC(), _R = e($B)
	}
	var WC = !1;

	function GC(t) {
		let e = t.next(),
			r = null;
		return n => {
			var i = new Uint8Array(n);
			if (r) {
				var o = new Uint8Array(r.length + i.length);
				o.set(r), o.set(i, r.length), i = o, r = null
			}
			for (; i.length >= e.value;) {
				var a = i.slice(e.value);
				e = t.next(i.slice(0, e.value)), i = a
			}
			i.length > 0 && (r = i)
		}
	}

	function YC() {
		({}), AR || (AR = !0, HC()), a(), (() => {
			try {
				if ("object" == typeof WebAssembly && "function" == typeof WebAssembly.instantiate) {
					const t = new WebAssembly.Module(Uint8Array.of(0, 97, 115, 109, 1, 0, 0, 0));
					if (t instanceof WebAssembly.Module) return new WebAssembly.Instance(
						t) instanceof WebAssembly.Instance
				}
			} catch (t) {}
			return !1
		})(), Date.now || (Date.now = function() {
			return (new Date).getTime()
		}), _R.print = function(t) {
			postMessage({
				cmd: "print",
				text: t
			})
		}, _R.printErr = function(t) {
			postMessage({
				cmd: "printErr",
				text: t
			})
		}, _R.postRun = function() {
			var t = [],
				e = {
					_firstCheckpoint: 0,
					_lastCheckpoint: 0,
					_intervalBytes: 0,
					_lastSecondBytes: 0,
					addBytes: function(t) {
						0 === e._firstCheckpoint ? (e._firstCheckpoint = Date.now(), e._lastCheckpoint = e
								._firstCheckpoint, e._intervalBytes += t) : Date.now() - e._lastCheckpoint <
							1e3 ? e._intervalBytes += t : (e._lastSecondBytes = e._intervalBytes, e
								._intervalBytes = t, e._lastCheckpoint = Date.now())
					},
					reset: function() {
						e._firstCheckpoint = e._lastCheckpoint = 0, e._intervalBytes = 0, e._lastSecondBytes = 0
					},
					getCurrentKBps: function() {
						e.addBytes(0);
						var t = (Date.now() - e._lastCheckpoint) / 1e3;
						return 0 == t && (t = 1), e._intervalBytes / t / 1024
					},
					getLastSecondKBps: function() {
						return e.addBytes(0), 0 !== e._lastSecondBytes ? e._lastSecondBytes / 1024 : Date
						.now() - e._lastCheckpoint >= 500 ? e.getCurrentKBps() : 0
					}
				},
				r = {
					opt: {},
					initAudioPlanar: function(t, e) {
						postMessage({
							cmd: "initAudioPlanar",
							samplerate: e,
							channels: t
						});
						var r = [],
							n = [],
							i = 0;
						this.playAudioPlanar = function(e, o) {
							for (var a = o, s = [], f = 0, u = 0; u < 2; u++) {
								var h = _R.HEAPU32[(e >> 2) + u] >> 2;
								s[u] = _R.HEAPF32.subarray(h, h + a)
							}
							if (i) {
								if (!(a >= (o = 1024 - i))) return i += a, r[0] = Float32Array.of(...r[0],
									...s[0]), void(2 == t && (r[1] = Float32Array.of(...r[1], ...s[
									1])));
								n[0] = Float32Array.of(...r[0], ...s[0].subarray(0, o)), 2 == t && (n[1] =
									Float32Array.of(...r[1], ...s[1].subarray(0, o))), postMessage({
									cmd: "playAudio",
									buffer: n
								}, n.map((t => t.buffer))), f = o, a -= o
							}
							for (i = a; i >= 1024; i -= 1024) n[0] = s[0].slice(f, f += 1024), 2 == t && (n[
								1] = s[1].slice(f - 1024, f)), postMessage({
								cmd: "playAudio",
								buffer: n
							}, n.map((t => t.buffer)));
							i && (r[0] = s[0].slice(f), 2 == t && (r[1] = s[1].slice(f)))
						}
					},
					inputFlv: function*() {
						yield 9;
						for (var e = new ArrayBuffer(4), r = new Uint8Array(e), o = new Uint32Array(e);;) {
							r[3] = 0;
							var a = yield 15, s = a[4];
							r[0] = a[7], r[1] = a[6], r[2] = a[5];
							var f = o[0];
							r[0] = a[10], r[1] = a[9], r[2] = a[8];
							var u = o[0];
							16777215 === u && (r[3] = a[11], u = o[0]);
							var h = yield f;
							switch (s) {
								case 8:
									this.opt.hasAudio && t.push({
										ts: u,
										payload: h,
										decoder: n,
										type: 0
									});
									break;
								case 9:
									t.push({
										ts: u,
										payload: h,
										decoder: i,
										type: h[0] >> 4
									})
							}
						}
					},
					play: function(r) {
						this.opt.debug && console.log("EasyWasmPlayer play", r), this.getDelay = function(t) {
							return t ? (this.firstTimestamp = t, this.startTimestamp = Date.now(), this
								.getDelay = function(t) {
									return this.delay = Date.now() - this.startTimestamp - (t - this
										.firstTimestamp), this.delay
								}, -1) : -1
						};
						if (this.stopId = setInterval((() => {
								if (t.length)
									if (this.dropping) {
										for (e = t.shift(); 1 !== e.type && t.length;) e = t.shift();
										1 === e.type && (this.dropping = !1, e.decoder.decode(e
											.payload))
									} else {
										var e = t[0];
										if (-1 === this.getDelay(e.ts)) t.shift(), this.ts = e.ts, e
											.decoder.decode(e.payload);
										else if (this.delay > this.videoBuffer + 1e3) this.dropping = !
										0;
										else
											for (; t.length && (e = t[0], this.getDelay(e.ts) > this
													.videoBuffer);) t.shift(), this.ts = e.ts, e.decoder
												.decode(e.payload)
									}
							}), 10), this.speedSamplerId = setInterval((() => {
								postMessage({
									cmd: "kBps",
									kBps: e.getLastSecondKBps()
								})
							}), 1e3), 0 == r.indexOf("http")) {
							this.flvMode = !0;
							var o = this,
								s = new AbortController;
							fetch(r, {
								signal: s.signal
							}).then((function(t) {
								var r = t.body.getReader(),
									n = o.inputFlv(),
									i = GC(n),
									a = function() {
										r.read().then((({
											done: t,
											value: r
										}) => {
											t ? n.return(null) : (e.addBytes(r
												.byteLength), i(r), a())
										})).catch((function(t) {
											n.return(null), o.opt.debug && console
												.error(t), -1 === t.toString().indexOf(
													"The user aborted a request") &&
												postMessage({
													cmd: "printErr",
													text: t.toString()
												})
										}))
									};
								a()
							})).catch((t => {
								postMessage({
									cmd: "printErr",
									text: t.message
								})
							})), this._close = function() {
								s.abort()
							}
						} else {
							if (this.flvMode = -1 != r.indexOf(".flv"), this.ws = new WebSocket(r), this.ws
								.binaryType = "arraybuffer", this.flvMode) {
								let t = this.inputFlv();
								var f = GC(t);
								this.ws.onmessage = t => {
									e.addBytes(t.data.byteLength), f(t.data)
								}, this.ws.onerror = e => {
									t.return(null), postMessage({
										cmd: "printErr",
										text: e.toString()
									})
								}
							} else this.ws.onmessage = r => {
								e.addBytes(r.data.byteLength);
								var o = new DataView(r.data);
								switch (o.getUint8(0)) {
									case 1:
										this.opt.hasAudio && t.push({
											ts: o.getUint32(1, !1),
											payload: new Uint8Array(r.data, 5),
											decoder: n,
											type: 0
										});
										break;
									case 2:
										t.push({
											ts: o.getUint32(1, !1),
											payload: new Uint8Array(r.data, 5),
											decoder: i,
											type: o.getUint8(5) >> 4
										})
								}
							}, this.ws.onerror = t => {
								postMessage({
									cmd: "printErr",
									text: t.toString()
								})
							};
							this._close = function() {
								this.ws.close(), this.ws = null
							}
						}
						this.setVideoSize = function(t, e) {
							postMessage({
								cmd: "initSize",
								w: t,
								h: e
							});
							var r = t * e,
								n = r >> 2;
							if (this.opt.forceNoOffscreen || "undefined" == typeof OffscreenCanvas) this
								.draw = function(t, e, i, o) {
									var a = [_R.HEAPU8.subarray(e, e + r), _R.HEAPU8.subarray(i, i + n), _R
										.HEAPU8.subarray(o, o + n)
									].map((t => Uint8Array.from(t)));
									postMessage({
										cmd: "render",
										compositionTime: t,
										delay: this.delay,
										ts: this.ts,
										output: a
									}, a.map((t => t.buffer)))
								};
							else {
								this.offscreenCanvas = new OffscreenCanvas(t, e), this.offscreenCanvasGL =
									this.offscreenCanvas.getContext("webgl");
								var i = a().default(this.offscreenCanvasGL);
								this.draw = function(o, a, s, f) {
									i(t, e, _R.HEAPU8.subarray(a, a + r), _R.HEAPU8.subarray(s, s + n),
										_R.HEAPU8.subarray(f, f + n));
									let u = this.offscreenCanvas.transferToImageBitmap();
									postMessage({
										cmd: "render",
										compositionTime: o,
										delay: this.delay,
										ts: this.ts,
										buffer: u
									}, [u])
								}
							}
						}
					},
					close: function() {
						this._close && (this.opt.debug && console.log("worker close"), this._close(),
							clearInterval(this.stopId), this.stopId = null, clearInterval(this
								.speedSamplerId), this.speedSamplerId = null, e.reset(), this.ws = null, n
							.clear(), i.clear(), this.firstTimestamp = 0, this.startTimestamp = 0, this
							.delay = 0, this.ts = 0, this.flvMode = !1, this.offscreenCanvas && (this
								.offscreenCanvas = null), this.offscreenCanvasGL && (this
								.offscreenCanvasGL = null), t = [], delete this.playAudioPlanar, delete this
							.draw, delete this.getDelay)
					}
				},
				n = new _R.AudioDecoder(r),
				i = new _R.VideoDecoder(r);
			postMessage({
				cmd: "init"
			}), self.onmessage = function(t) {
				var e = t.data;
				switch (e.cmd) {
					case "init":
						r.opt = JSON.parse(e.opt), n.sample_rate = e.sampleRate;
						break;
					case "getProp":
						postMessage({
							cmd: "getProp",
							value: r[e.prop]
						});
						break;
					case "setProp":
						r[e.prop] = e.value;
						break;
					case "play":
						r.play(e.url);
						break;
					case "setVideoBuffer":
						r.videoBuffer = 1e3 * e.time | 0;
						break;
					case "close":
						r.close()
				}
			}
		}
	}
	"undefined" == typeof importScripts ? wt || (wt = !0, {}, c(), z(), V(), J(), vt(), w(), L(), yt = class {
		constructor(t) {
			if (this._opt = Object.assign(w().DEFAULT_OPTIONS, t), this.$container = t.container,
				"string" == typeof t.container && (this.$container = document.querySelector(t.container)), !
				this.$container) throw new Error("EasyWasmPlayer need container option");
			delete this._opt.container, this._opt.debug && console.log("options", this._opt), vt().default(
				this), c().default(this), z().default(this), J().default(this), V().default(this)
		}
		set fullscreen(t) {
			t ? (L().checkFull() || this.$container.requestFullscreen(), L().$domToggle(this.$doms
				.minScreenDom, !0), L().$domToggle(this.$doms.fullscreenDom, !1)) : (L().checkFull() &&
				document.exitFullscreen(), L().$domToggle(this.$doms.minScreenDom, !1), L().$domToggle(
					this.$doms.fullscreenDom, !0)), this._fullscreen !== t && (this.onFullscreen(t),
				this._trigger(w().EVEMTS.fullscreen, t)), this._fullscreen = t
		}
		get fullscreen() {
			return this._fullscreen
		}
		set playing(t) {
			t ? (L().$domToggle(this.$doms.playBigDom, !1), L().$domToggle(this.$doms.playDom, !1), L()
				.$domToggle(this.$doms.pauseDom, !0), L().$domToggle(this.$doms.screenshotsDom, !0), L()
				.$domToggle(this.$doms.recordDom, !0), this._quieting ? (L().$domToggle(this.$doms
					.quietAudioDom, !0), L().$domToggle(this.$doms.playAudioDom, !1)) : (L().$domToggle(
					this.$doms.quietAudioDom, !1), L().$domToggle(this.$doms.playAudioDom, !0))) : (this
				.$doms.speedDom && (this.$doms.speedDom.innerText = ""), this._playUrl && (L()
					.$domToggle(this.$doms.playDom, !0), L().$domToggle(this.$doms.playBigDom, !0), L()
					.$domToggle(this.$doms.pauseDom, !1)), L().$domToggle(this.$doms.recordDom, !1), L()
				.$domToggle(this.$doms.recordingDom, !1), L().$domToggle(this.$doms.screenshotsDom, !1),
				L().$domToggle(this.$doms.quietAudioDom, !1), L().$domToggle(this.$doms.playAudioDom, !
					1)), this._playing !== t && (t ? (this.onPlay(), this._trigger(w().EVEMTS.play)) : (
				this.onPause(), this._trigger(w().EVEMTS.pause))), this._playing = t
		}
		get playing() {
			return this._playing
		}
		set quieting(t) {
			t ? (L().$domToggle(this.$doms.quietAudioDom, !0), L().$domToggle(this.$doms.playAudioDom, !
				1)) : (L().$domToggle(this.$doms.quietAudioDom, !1), L().$domToggle(this.$doms.playAudioDom,
					!0)), this._quieting !== t && (this.onMute(t), this._trigger(w().EVEMTS.mute, t)), this
				._quieting = t
		}
		get quieting() {
			return this._quieting
		}
		set loading(t) {
			t ? (L().$hideBtns(this.$doms), L().$domToggle(this.$doms.fullscreenDom, !0), L().$domToggle(
				this.$doms.pauseDom, !0), L().$domToggle(this.$doms.loadingDom, !0)) : L().$initBtns(
				this.$doms), this._loading = t
		}
		get loading() {
			return this._loading
		}
		set recording(t) {
			t ? (L().$domToggle(this.$doms.recordDom, !1), L().$domToggle(this.$doms.recordingDom, !0)) : (
					L().$domToggle(this.$doms.recordDom, !0), L().$domToggle(this.$doms.recordingDom, !1)),
				this._recording !== t && (this.onRecord(t), this._trigger(w().EVEMTS.record, t), this
					._recording = t)
		}
		get recording() {
			return this._recording
		}
		isPlaying() {
			return this.playing
		}
		isMute() {
			return this.quieting
		}
		setDebug(t) {
			this._opt.isDebug = !!t
		}
		setTimeout(t) {
			this._opt.timeout = Number(t)
		}
		setVod(t) {
			this._opt.vod = !!t
		}
		setNoOffscreen(t) {
			this._opt.forceNoOffscreen = !!t
		}
		setScaleMode(t) {
			0 === (t = Number(t)) ? (this._opt.isFullResize = !1, this._opt.isResize = !1) : 1 === t ? (this
				._opt.isFullResize = !1, this._opt.isResize = !0) : 2 === t && (this._opt
				.isFullResize = !0), this._resize()
		}
		mute() {
			this._mute()
		}
		cancelMute() {
			this._cancelMute()
		}
		audioResume() {
			this._cancelMute()
		}
		pause() {
			this._pause()
		}
		play(t) {
			this._play(t)
		}
		close() {
			this._close()
		}
		destroy() {
			this._close(), this._destroyAudioContext(), this._destroyContextGL(), this._decoderWorker
				.terminate(), this._removeEventListener(), this._initCheckVariable(), this._off(), this
				._removeContainerChild()
		}
		clearView() {
			this._clearView()
		}
		resize() {
			this._resize()
		}
		setBufferTime(t) {
			t = Number(t), this._decoderWorker.postMessage({
				cmd: w().POST_MESSAGE.setVideoBuffer,
				time: t
			})
		}
		setRotate(t) {
			t = parseInt(t, 10), this._opt.rotate !== t && -1 !== [0, 90, 270].indexOf(t) && (this._opt
				.rotate = t, this.resize())
		}
		setVolume(t) {
			if (this._gainNode) {
				if (t = parseFloat(t), isNaN(t)) return;
				this._gainNode.gain.setValueAtTime(t, this._audioContext.currentTime)
			}
		}
		setKeepScreenOn() {
			this._opt.keepScreenOn = !0
		}
		setFullscreen(t) {
			const e = !!t;
			this.fullscreen !== e && (this.fullscreen = e)
		}
		hasLoaded() {
			return this._hasLoaded
		}
		screenshot(t, e, r, n) {
			return this._screenshot(t, e, r, n)
		}
		on(t, e) {
			this._on(t, e)
		}
	}, window.EasyWasmPlayer = yt) : WC || (WC = !0, YC())
}();
function cloudDown(types){
    window.downcallbacK(types)

}
function cloudUp(types){
    window.upcallbacK(types)
    
}
function Focuscontrol(types){
    window.downcallbacK(types)
}
function Focusstop(types){
    window.upcallbacK(types)
}