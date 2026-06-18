/* @ds-bundle: {"format":3,"namespace":"OxyLoopDesignSystem_0d2024","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"StatusPill","sourcePath":"components/core/StatusPill.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Stepper","sourcePath":"components/forms/Stepper.jsx"},{"name":"StepDots","sourcePath":"components/navigation/StepDots.jsx"},{"name":"TopBar","sourcePath":"components/navigation/TopBar.jsx"},{"name":"BottomSheet","sourcePath":"components/surfaces/BottomSheet.jsx"},{"name":"Card","sourcePath":"components/surfaces/Card.jsx"},{"name":"SelectTile","sourcePath":"components/surfaces/SelectTile.jsx"},{"name":"StatTile","sourcePath":"components/surfaces/StatTile.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"14a62a9dfaf2","components/core/Button.jsx":"094508a9e0c7","components/core/IconButton.jsx":"1cbed41563d5","components/core/StatusPill.jsx":"c2f4716801b9","components/core/Tag.jsx":"303379134347","components/forms/Input.jsx":"cf4f551d3525","components/forms/Stepper.jsx":"5481d824ba45","components/navigation/StepDots.jsx":"583886bb8efe","components/navigation/TopBar.jsx":"fb1a938068fe","components/surfaces/BottomSheet.jsx":"26af56ae3813","components/surfaces/Card.jsx":"e0120336a370","components/surfaces/SelectTile.jsx":"e75d4d5205ab","components/surfaces/StatTile.jsx":"298b0ec43a87","ui_kits/kiosk/kioskHome.jsx":"1b36fc3259fe","ui_kits/kiosk/kioskRecycle.jsx":"367355c20a2a","ui_kits/kiosk/parts.jsx":"85ff6195aebb","ui_kits/mobile/inflateScreen.jsx":"0fd405d0c519","ui_kits/mobile/mapScreen.jsx":"380de6048871","ui_kits/mobile/parts.jsx":"ae7b273a2aea","ui_kits/mobile/productScreen.jsx":"b6e5cc612186","ui_kits/mobile/recycleScreen.jsx":"c62d1da27916","ui_kits/mobile/redeemScreen.jsx":"52fee7d8ee8a","ui_kits/mobile/rentRefillScreen.jsx":"2a70dfb4d8b5","ui_kits/mobile/scanScreen.jsx":"deeead6dbe18"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.OxyLoopDesignSystem_0d2024 = window.OxyLoopDesignSystem_0d2024 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Small label / count badge. Tones map to the brand palette.
 */
function Badge({
  children,
  tone = 'cyan',
  style = {},
  ...rest
}) {
  const tones = {
    cyan: {
      background: 'var(--oxy-cyan)',
      color: 'var(--pure-white)'
    },
    dark: {
      background: 'var(--deep-oxygen)',
      color: 'var(--text-on-dark)'
    },
    wash: {
      background: 'var(--aqua-wash)',
      color: 'var(--pine-text)'
    },
    mint: {
      background: 'var(--mist-bg)',
      color: 'var(--muted-gray)'
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 22,
      height: 22,
      padding: '0 8px',
      borderRadius: 'var(--radius-full)',
      fontFamily: 'var(--font-text)',
      fontWeight: 'var(--fw-bold)',
      fontSize: '12px',
      lineHeight: 1,
      ...tones[tone],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Oxy Loop primary action button. Highly rounded, bold, large tap target.
 * Variants: primary (Deep Oxygen) · brand (Aqua liquid w/ glow) · secondary (mint outline) · ghost.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  style = {},
  ...rest
}) {
  const heights = {
    md: 'var(--control-h-mobile)',
    kiosk: 'var(--control-h-kiosk)',
    sm: 'var(--control-h-sm)'
  };
  const fontSizes = {
    md: '18px',
    kiosk: '17px',
    sm: '15px'
  };
  const pads = {
    md: '0 28px',
    kiosk: '0 26px',
    sm: '0 18px'
  };
  const palettes = {
    primary: {
      background: 'var(--deep-oxygen)',
      color: 'var(--text-on-dark)',
      border: '1.5px solid var(--deep-oxygen)',
      boxShadow: 'var(--shadow-sm)'
    },
    brand: {
      background: 'var(--aqua-light)',
      color: 'var(--deep-oxygen)',
      border: '1.5px solid var(--aqua-light)',
      boxShadow: 'var(--glow-brand)'
    },
    secondary: {
      background: 'var(--pure-white)',
      color: 'var(--pine-text)',
      border: '1.5px solid var(--border-mint)',
      boxShadow: 'none'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--pine-text)',
      border: '1.5px solid transparent',
      boxShadow: 'none'
    }
  };
  const disabledStyle = {
    background: 'var(--border-mint)',
    color: 'var(--muted-gray)',
    border: '1.5px solid var(--border-mint)',
    boxShadow: 'none',
    cursor: 'not-allowed'
  };
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    width: fullWidth ? '100%' : 'auto',
    minHeight: heights[size],
    padding: pads[size],
    borderRadius: 'var(--radius-xl)',
    fontFamily: 'var(--font-text)',
    fontWeight: 'var(--fw-bold)',
    fontSize: fontSizes[size],
    lineHeight: 1,
    letterSpacing: '0',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    transition: 'transform var(--dur-fast) var(--ease-soft), filter var(--dur-fast) var(--ease-soft), box-shadow var(--dur-fast) var(--ease-soft)',
    WebkitTapHighlightColor: 'transparent',
    ...(disabled ? disabledStyle : palettes[variant]),
    ...style
  };
  const onDown = e => {
    if (!disabled) e.currentTarget.style.transform = 'scale(0.97)';
  };
  const onUp = e => {
    e.currentTarget.style.transform = 'scale(1)';
  };
  const onEnter = e => {
    if (!disabled) e.currentTarget.style.filter = 'brightness(1.06)';
  };
  const onLeave = e => {
    e.currentTarget.style.filter = 'none';
    e.currentTarget.style.transform = 'scale(1)';
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    style: base,
    onMouseDown: onDown,
    onMouseUp: onUp,
    onMouseEnter: onEnter,
    onMouseLeave: onLeave
  }, rest), iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex'
    }
  }, iconLeft), children, iconRight && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex'
    }
  }, iconRight));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Circular / rounded-square icon button. Used for floating back buttons
 * (white on render), toolbar actions, and compact controls.
 */
function IconButton({
  children,
  variant = 'surface',
  shape = 'rounded',
  size = 44,
  disabled = false,
  style = {},
  ...rest
}) {
  const palettes = {
    surface: {
      background: 'var(--pure-white)',
      color: 'var(--pine-text)',
      boxShadow: 'var(--shadow-sm)',
      border: 'none'
    },
    brand: {
      background: 'var(--oxy-cyan)',
      color: 'var(--pure-white)',
      boxShadow: 'var(--glow-brand)',
      border: 'none'
    },
    dark: {
      background: 'var(--deep-oxygen)',
      color: 'var(--text-on-dark)',
      boxShadow: 'var(--shadow-sm)',
      border: 'none'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--pine-text)',
      boxShadow: 'none',
      border: '1.5px solid var(--border-mint)'
    }
  };
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: size,
    height: size,
    borderRadius: shape === 'circle' ? 'var(--radius-full)' : 'var(--radius-md)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'transform var(--dur-fast) var(--ease-soft), filter var(--dur-fast) var(--ease-soft)',
    WebkitTapHighlightColor: 'transparent',
    ...palettes[variant],
    ...style
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    style: base,
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = 'scale(0.92)';
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = 'scale(1)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = 'scale(1)';
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/StatusPill.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Semantic status pill — never relies on color alone, always pairs the
 * status color with an icon + text label (accessibility rule).
 */
function StatusPill({
  status = 'success',
  children,
  style = {},
  ...rest
}) {
  const map = {
    success: {
      fill: 'var(--status-success)',
      label: children || 'Sufficient oxygen',
      icon: 'check'
    },
    warning: {
      fill: 'var(--status-warning)',
      ink: 'var(--deep-oxygen)',
      label: children || 'Low oxygen',
      icon: 'warn'
    },
    error: {
      fill: 'var(--status-error)',
      label: children || 'Missing item',
      icon: 'error'
    },
    detected: {
      fill: 'var(--oxy-cyan)',
      label: children || 'Detected',
      icon: 'check'
    }
  };
  const s = map[status];
  const ink = s.ink || 'var(--pure-white)';
  const icons = {
    check: /*#__PURE__*/React.createElement("path", {
      d: "M20 6 9 17l-5-5"
    }),
    warn: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "9",
      x2: "12",
      y2: "13.5"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "17",
      x2: "12.01",
      y2: "17"
    })),
    error: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "9"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "15",
      y1: "9",
      x2: "9",
      y2: "15"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "9",
      y1: "9",
      x2: "15",
      y2: "15"
    }))
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '7px',
      padding: '7px 14px 7px 11px',
      borderRadius: 'var(--radius-full)',
      background: s.fill,
      color: ink,
      fontFamily: 'var(--font-text)',
      fontWeight: 'var(--fw-bold)',
      fontSize: '14px',
      lineHeight: 1,
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: ink,
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, icons[s.icon]), s.label);
}
Object.assign(__ds_scope, { StatusPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StatusPill.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Keyword / filter chip. Selectable (cyan) or static (wash).
 */
function Tag({
  children,
  selected = false,
  iconLeft = null,
  onClick,
  style = {},
  ...rest
}) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    borderRadius: 'var(--radius-full)',
    fontFamily: 'var(--font-text)',
    fontWeight: 'var(--fw-bold)',
    fontSize: '14px',
    lineHeight: 1,
    cursor: onClick ? 'pointer' : 'default',
    border: selected ? '1.5px solid var(--oxy-cyan)' : '1.5px solid var(--border-mint)',
    background: selected ? 'var(--aqua-wash)' : 'var(--pure-white)',
    color: selected ? 'var(--pine-text)' : 'var(--muted-gray)',
    transition: 'background var(--dur-fast) var(--ease-soft), border-color var(--dur-fast) var(--ease-soft)',
    ...style
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: base,
    onClick: onClick
  }, rest), iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex'
    }
  }, iconLeft), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Text input with rounded mint field, cyan focus ring, optional leading icon.
 */
function Input({
  label,
  iconLeft = null,
  error = false,
  hint,
  style = {},
  id,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || React.useId();
  const borderColor = error ? 'var(--status-error)' : focus ? 'var(--oxy-cyan)' : 'var(--border-mint)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      width: '100%'
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontFamily: 'var(--font-text)',
      fontWeight: 'var(--fw-bold)',
      fontSize: '14px',
      color: 'var(--pine-text)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      height: 'var(--control-h-mobile)',
      padding: '0 18px',
      background: 'var(--pure-white)',
      border: `${focus ? '2px' : '1.5px'} solid ${borderColor}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: focus ? '0 0 0 4px rgba(53,217,214,0.16)' : 'none',
      transition: 'border-color var(--dur-fast) var(--ease-soft), box-shadow var(--dur-fast) var(--ease-soft)',
      ...style
    }
  }, iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      color: 'var(--muted-gray)',
      flex: '0 0 auto'
    }
  }, iconLeft), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      minWidth: 0,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-text)',
      fontSize: '16px',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--text-primary)'
    }
  }, rest))), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '13px',
      color: error ? 'var(--status-error)' : 'var(--muted-gray)'
    }
  }, hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Stepper.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Quantity stepper — round minus/plus controls flanking a value.
 */
function Stepper({
  value = 1,
  min = 0,
  max = 99,
  onChange,
  style = {},
  ...rest
}) {
  const set = v => {
    const n = Math.max(min, Math.min(max, v));
    onChange && onChange(n);
  };
  const btn = disabled => ({
    width: 40,
    height: 40,
    borderRadius: 'var(--radius-full)',
    border: '1.5px solid var(--border-mint)',
    background: 'var(--pure-white)',
    color: disabled ? 'var(--border-mint)' : 'var(--pine-text)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'transform var(--dur-fast) var(--ease-soft)'
  });
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '14px',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Decrease",
    disabled: value <= min,
    style: btn(value <= min),
    onMouseDown: e => {
      if (value > min) e.currentTarget.style.transform = 'scale(0.9)';
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = 'scale(1)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = 'scale(1)';
    },
    onClick: () => set(value - 1)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "3",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "5",
    y1: "12",
    x2: "19",
    y2: "12"
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 28,
      textAlign: 'center',
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-bold)',
      fontSize: '20px',
      color: 'var(--pine-text)'
    }
  }, value), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Increase",
    disabled: value >= max,
    style: btn(value >= max),
    onMouseDown: e => {
      if (value < max) e.currentTarget.style.transform = 'scale(0.9)';
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = 'scale(1)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = 'scale(1)';
    },
    onClick: () => set(value + 1)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "3",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "5",
    x2: "12",
    y2: "19"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "5",
    y1: "12",
    x2: "19",
    y2: "12"
  }))));
}
Object.assign(__ds_scope, { Stepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Stepper.jsx", error: String((e && e.message) || e) }); }

// components/navigation/StepDots.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Step progress dots — current step is an elongated cyan pill; others are mint dots.
 */
function StepDots({
  count = 3,
  active = 0,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      ...style
    }
  }, rest), Array.from({
    length: count
  }).map((_, i) => {
    const on = i === active;
    const done = i < active;
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        height: 8,
        width: on ? 24 : 8,
        borderRadius: 'var(--radius-full)',
        background: on ? 'var(--oxy-cyan)' : done ? 'var(--aqua-soft)' : 'var(--border-mint)',
        transition: 'width var(--dur-base) var(--ease-soft), background var(--dur-base) var(--ease-soft)'
      }
    });
  }));
}
Object.assign(__ds_scope, { StepDots });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/StepDots.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TopBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Screen top bar — floating back button (left), centered title, optional action (right).
 * Use over light backgrounds or over a render (transparent).
 */
function TopBar({
  title,
  onBack,
  right = null,
  transparent = false,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'grid',
      gridTemplateColumns: '44px 1fr 44px',
      alignItems: 'center',
      gap: 'var(--space-3)',
      padding: 'var(--space-3) var(--space-4)',
      background: transparent ? 'transparent' : 'var(--surface-page)',
      ...style
    }
  }, rest), onBack ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Back",
    onClick: onBack,
    style: {
      width: 44,
      height: 44,
      borderRadius: 'var(--radius-md)',
      border: 'none',
      background: 'var(--pure-white)',
      boxShadow: 'var(--shadow-sm)',
      color: 'var(--pine-text)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m15 18-6-6 6-6"
  }))) : /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-bold)',
      fontSize: '18px',
      color: 'var(--pine-text)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      justifyContent: 'flex-end'
    }
  }, right));
}
Object.assign(__ds_scope, { TopBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TopBar.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/BottomSheet.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Bottom action sheet — the fixed dark (or light) action zone pinned to the
 * bottom of mobile screens. Large top radius, upward shadow.
 */
function BottomSheet({
  children,
  tone = 'dark',
  style = {},
  ...rest
}) {
  const tones = {
    dark: {
      background: 'var(--surface-inverse)',
      color: 'var(--text-on-dark)'
    },
    light: {
      background: 'var(--surface-raised)',
      color: 'var(--text-primary)'
    }
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      borderTopLeftRadius: 'var(--radius-2xl)',
      borderTopRightRadius: 'var(--radius-2xl)',
      boxShadow: 'var(--shadow-sheet)',
      padding: 'var(--space-6) var(--space-6) var(--space-8)',
      ...tones[tone],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { BottomSheet });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/BottomSheet.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Rounded surface card — Ice White on Mist, thin mint outline, soft low-cast shadow.
 */
function Card({
  children,
  padding = 'var(--space-5)',
  elevation = 'sm',
  interactive = false,
  style = {},
  ...rest
}) {
  const shadows = {
    none: 'none',
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)'
  };
  const base = {
    background: 'var(--surface-card)',
    border: '1.5px solid var(--border-mint)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: shadows[elevation],
    padding,
    transition: 'transform var(--dur-base) var(--ease-soft), box-shadow var(--dur-base) var(--ease-soft)',
    cursor: interactive ? 'pointer' : 'default',
    ...style
  };
  const hover = interactive ? {
    onMouseEnter: e => {
      e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      e.currentTarget.style.transform = 'translateY(-2px)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.boxShadow = shadows[elevation];
      e.currentTarget.style.transform = 'translateY(0)';
    }
  } : {};
  return /*#__PURE__*/React.createElement("div", _extends({
    style: base
  }, hover, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Card.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/SelectTile.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Selection tile — large tappable option. When selected, shows a 4px cyan
 * outline, aqua wash, and a circular check badge (top-right).
 */
function SelectTile({
  children,
  selected = false,
  onClick,
  title,
  subtitle,
  icon = null,
  style = {},
  ...rest
}) {
  const base = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-4)',
    width: '100%',
    textAlign: 'left',
    padding: 'var(--space-4) var(--space-5)',
    borderRadius: 'var(--radius-lg)',
    background: selected ? 'var(--aqua-wash)' : 'var(--surface-card)',
    border: selected ? '4px solid var(--oxy-cyan)' : '1.5px solid var(--border-mint)',
    boxShadow: selected ? 'none' : 'var(--shadow-xs)',
    cursor: 'pointer',
    transition: 'background var(--dur-base) var(--ease-soft), border-color var(--dur-base) var(--ease-soft)',
    WebkitTapHighlightColor: 'transparent',
    ...style
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "button",
    onClick: onClick,
    style: base
  }, rest), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      flex: '0 0 auto',
      color: selected ? 'var(--oxy-cyan)' : 'var(--pine-text)'
    }
  }, icon), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-text)',
      fontWeight: 'var(--fw-bold)',
      fontSize: '17px',
      color: 'var(--pine-text)'
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-text)',
      fontSize: '14px',
      color: 'var(--muted-gray)',
      marginTop: 2
    }
  }, subtitle), children), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      flex: '0 0 auto',
      width: 26,
      height: 26,
      borderRadius: 'var(--radius-full)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: selected ? 'var(--oxy-cyan)' : 'transparent',
      border: selected ? 'none' : '2px solid var(--border-mint)'
    }
  }, selected && /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "3.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6 9 17l-5-5"
  }))));
}
Object.assign(__ds_scope, { SelectTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/SelectTile.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/StatTile.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Compact stat tile — an icon, a big value, and a small label.
 * Used in product detail (walking time, jar retention, price).
 */
function StatTile({
  icon = null,
  value,
  label,
  tone = 'plain',
  style = {},
  ...rest
}) {
  const tones = {
    plain: {
      background: 'var(--surface-card)',
      border: '1.5px solid var(--border-mint)'
    },
    wash: {
      background: 'var(--aqua-wash)',
      border: '1.5px solid transparent'
    }
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      padding: 'var(--space-4)',
      borderRadius: 'var(--radius-md)',
      minWidth: 0,
      ...tones[tone],
      ...style
    }
  }, rest), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      color: 'var(--oxy-cyan)'
    }
  }, icon), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-bold)',
      fontSize: '22px',
      color: 'var(--pine-text)',
      lineHeight: 1.1
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-text)',
      fontSize: '13px',
      color: 'var(--muted-gray)',
      fontWeight: 'var(--fw-semibold)'
    }
  }, label));
}
Object.assign(__ds_scope, { StatTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/StatTile.jsx", error: String((e && e.message) || e) }); }

// ui_kits/kiosk/kioskHome.jsx
try { (() => {
// Kiosk home — three large service bays (Rent / Refill / Recycle) + redeem strip.
// window.OxyKiosk.KioskHome

function KioskHome({
  onPick
}) {
  const {
    KioskShell
  } = window.OxyKioskParts;
  const bottle = "M9 2h6M10 2v3.5L8.5 8A3 3 0 0 0 8 9.6V20a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V9.6A3 3 0 0 0 15.5 8L14 5.5V2";
  const refill = "M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5";
  const recycle = "M7 19H4.8a2 2 0 0 1-1.7-3l1.3-2.2M7.5 4.2 6.4 6.1m-.1-.1 2.6 1.5M17 5h2.2a2 2 0 0 1 1.7 3l-1.3 2.2M14 22l1.5-2.5M19.7 14l1.1 1.9a2 2 0 0 1-.6 2.7L18 22M9 11l3-5 3 5";
  const gift = "M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7ZM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7Z";
  const bays = [{
    id: 'rent',
    label: 'RENT',
    d: bottle,
    title: 'Rent oxygen',
    sub: 'Take a filled reusable cylinder',
    price: '$1.25'
  }, {
    id: 'refill',
    label: 'REFILL',
    d: refill,
    title: 'Refill cylinder',
    sub: 'Top up your own bottle',
    price: '$0.52'
  }, {
    id: 'recycle',
    label: 'RECYCLE',
    d: recycle,
    title: 'Recycle & redeem',
    sub: 'Return empties, keep your jar',
    price: 'Free'
  }];
  return /*#__PURE__*/React.createElement(KioskShell, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      padding: 40,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 38,
      color: 'var(--pine-text)',
      margin: '4px 0 4px'
    }
  }, "How can we help you breathe easy?"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 18,
      color: 'var(--muted-gray)',
      margin: '0 0 28px'
    }
  }, "Tap a service to begin. Clean, circular oxygen for the plateau."), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 24
    }
  }, bays.map(b => /*#__PURE__*/React.createElement("button", {
    key: b.id,
    onClick: () => onPick(b.id),
    style: bayStyle(),
    onMouseEnter: e => {
      e.currentTarget.style.borderColor = 'var(--oxy-cyan)';
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = 'var(--shadow-md)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.borderColor = 'var(--border-mint)';
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 76,
      height: 76,
      borderRadius: 22,
      background: 'var(--aqua-wash)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "40",
    height: "40",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--oxy-cyan)",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: b.d
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-text)',
      fontWeight: 800,
      fontSize: 13,
      letterSpacing: '0.12em',
      color: 'var(--muted-gray)'
    }
  }, b.label)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 26,
      color: 'var(--pine-text)'
    }
  }, b.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: 'var(--muted-gray)',
      margin: '6px 0 16px'
    }
  }, b.sub), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 18px',
      borderRadius: 999,
      background: 'var(--deep-oxygen)',
      color: '#fff',
      fontWeight: 700,
      fontSize: 16
    }
  }, b.price, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M13 6l6 6-6 6"
  }))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '0 0 auto',
      marginTop: 24,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px 26px',
      background: 'var(--pure-white)',
      border: '1.5px solid var(--border-mint)',
      borderRadius: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "28",
    height: "28",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--oxy-cyan)",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: gift
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      fontSize: 18,
      color: 'var(--pine-text)'
    }
  }, "Have a souvenir jar?"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      color: 'var(--muted-gray)'
    }
  }, "Scan it to refill for free."))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      color: 'var(--muted-gray)',
      fontWeight: 700
    }
  }, "Need help? Press and hold anywhere"))));
}
function bayStyle() {
  return {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    padding: 28,
    borderRadius: 24,
    background: 'var(--surface-card)',
    border: '1.5px solid var(--border-mint)',
    boxShadow: 'var(--shadow-sm)',
    cursor: 'pointer',
    transition: 'transform var(--dur-base) var(--ease-soft), border-color var(--dur-base) var(--ease-soft), box-shadow var(--dur-base) var(--ease-soft)'
  };
}
Object.assign(window, {
  OxyKiosk: {
    ...(window.OxyKiosk || {}),
    KioskHome
  }
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/kiosk/kioskHome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/kiosk/kioskRecycle.jsx
try { (() => {
// Kiosk recycle action — insert cylinder, detection states, success. Reuses StatusPill, Button, StepDots.
// window.OxyKiosk.KioskRecycle

function KioskRecycle({
  onExit
}) {
  const {
    KioskShell
  } = window.OxyKioskParts;
  const {
    Button,
    StatusPill,
    StepDots
  } = window.OxyLoopDesignSystem_0d2024;
  const [phase, setPhase] = React.useState('insert'); // insert · detected · done

  React.useEffect(() => {
    if (phase === 'insert') {
      const t = setTimeout(() => setPhase('detected'), 1600);
      return () => clearTimeout(t);
    }
  }, [phase]);
  const back = "m15 18-6-6 6-6";
  const stepIndex = phase === 'done' ? 2 : phase === 'detected' ? 1 : 0;
  return /*#__PURE__*/React.createElement(KioskShell, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'grid',
      gridTemplateColumns: '1.15fr 1fr'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      background: 'linear-gradient(160deg,#EFF9F9,#E1F1F1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onExit,
    "aria-label": "Back",
    style: {
      position: 'absolute',
      top: 24,
      left: 24,
      width: 52,
      height: 52,
      borderRadius: 16,
      border: 'none',
      background: 'var(--pure-white)',
      boxShadow: 'var(--shadow-sm)',
      color: 'var(--pine-text)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: back
  }))), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/imagery/inflate.png",
    alt: "Insert cylinder",
    style: {
      width: 560,
      transition: 'transform var(--dur-slow) var(--ease-soft)',
      transform: phase === 'insert' ? 'translateX(40px)' : 'translateX(0)'
    }
  }), phase === 'detected' && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 36,
      left: '50%',
      transform: 'translateX(-50%)'
    }
  }, /*#__PURE__*/React.createElement(StatusPill, {
    status: "detected"
  }, "Cylinder detected"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 48,
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--pure-white)'
    }
  }, /*#__PURE__*/React.createElement(StepDots, {
    count: 3,
    active: stepIndex
  }), phase !== 'done' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 40,
      color: 'var(--pine-text)',
      margin: '28px 0 14px',
      lineHeight: 1.08
    }
  }, phase === 'insert' ? 'Put in your bottle' : 'Ready to recycle'), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 19,
      lineHeight: 1.5,
      color: 'var(--muted-gray)',
      margin: 0
    }
  }, phase === 'insert' ? 'Insert your empty cylinder into the lit RECYCLE port. Keep it level until the ring turns cyan.' : 'We detected one reusable cylinder. Recycle it now to keep your souvenir jar and earn a free refill.'), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32,
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Row, {
    label: "Detected items",
    value: phase === 'insert' ? '—' : '1 cylinder'
  }), /*#__PURE__*/React.createElement(Row, {
    label: "Jar retention",
    value: "#25"
  }), /*#__PURE__*/React.createElement(Row, {
    label: "Reward",
    value: "Free refill"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "kiosk",
    fullWidth: true,
    disabled: phase === 'insert',
    onClick: () => setPhase('done')
  }, phase === 'insert' ? 'Waiting for cylinder…' : 'Recycle now'))) : /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 96,
      height: 96,
      borderRadius: '50%',
      background: 'var(--oxy-cyan)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 12px 30px rgba(53,217,214,0.4)',
      marginBottom: 26
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "48",
    height: "48",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "3.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6 9 17l-5-5"
  }))), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 42,
      color: 'var(--pine-text)',
      margin: '0 0 12px'
    }
  }, "Recycle successful"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 19,
      color: 'var(--muted-gray)',
      margin: '0 0 36px'
    }
  }, "Souvenir jar #25 retained. Tap Done to return to the home screen."), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "kiosk",
    fullWidth: true,
    onClick: onExit
  }, "Done")))));
}
function Row({
  label,
  value
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 18px',
      background: 'var(--mist-bg)',
      borderRadius: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      color: 'var(--muted-gray)',
      fontWeight: 600
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 17,
      color: 'var(--pine-text)',
      fontWeight: 800
    }
  }, value));
}
Object.assign(window, {
  OxyKiosk: {
    ...(window.OxyKiosk || {}),
    KioskRecycle
  }
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/kiosk/kioskRecycle.jsx", error: String((e && e.message) || e) }); }

// ui_kits/kiosk/parts.jsx
try { (() => {
// Kiosk shell — landscape station touch panel chrome (header + body).
// window.OxyKioskParts.KioskShell

function KioskShell({
  children,
  station = 'Plateau station 12'
}) {
  const {
    StatusPill
  } = window.OxyLoopDesignSystem_0d2024;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1280,
      height: 800,
      background: 'var(--surface-page)',
      borderRadius: 28,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 40px 90px rgba(0,31,29,0.28)',
      border: '1px solid var(--border-mint)',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '0 0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '26px 40px',
      background: 'var(--pure-white)',
      borderBottom: '1.5px solid var(--border-mint)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/oxy-mark.svg",
    alt: "Oxy Loop",
    style: {
      height: 44
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 22,
      color: 'var(--pine-text)',
      lineHeight: 1.1
    }
  }, "Oxy Loop"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--muted-gray)',
      fontWeight: 600
    }
  }, station))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(StatusPill, {
    status: "success"
  }, "Oxygen available"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 22,
      color: 'var(--pine-text)'
    }
  }, "09:41"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      position: 'relative'
    }
  }, children));
}
Object.assign(window, {
  OxyKioskParts: {
    KioskShell
  }
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/kiosk/parts.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mobile/inflateScreen.jsx
try { (() => {
// Inflate guide / Tips (基站充气指引) — window.OxyScreens.InflateScreen
function InflateScreen({
  onNext,
  onBack
}) {
  const {
    PhoneShell,
    BackButton
  } = window.OxyParts;
  return /*#__PURE__*/React.createElement(PhoneShell, {
    bg: "#E9F3F2",
    statusInk: "#021817"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: '#E7F2F1'
    }
  }), /*#__PURE__*/React.createElement(BackButton, {
    onClick: onBack,
    top: 62,
    left: 26
  }), /*#__PURE__*/React.createElement("img", {
    src: "assets/rings-scene.png",
    alt: "Insert cylinder to refill",
    style: {
      position: 'absolute',
      left: '50%',
      top: 200,
      transform: 'translateX(-50%)',
      width: 420,
      WebkitMaskImage: 'radial-gradient(ellipse 78% 82% at 50% 48%, #000 62%, transparent 100%)',
      maskImage: 'radial-gradient(ellipse 78% 82% at 50% 48%, #000 62%, transparent 100%)'
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: onNext,
    style: {
      position: 'absolute',
      left: 16,
      right: 16,
      bottom: 54,
      width: 'calc(100% - 32px)',
      textAlign: 'left',
      border: 'none',
      cursor: 'pointer',
      background: '#021817',
      borderRadius: 26,
      padding: '24px 26px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 11
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--m-display)',
      fontWeight: 600,
      fontSize: 22,
      color: '#fff'
    }
  }, "Tips"), /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "rgba(255,255,255,0.45)",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 16v-4M12 8h.01"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--m-text)',
      fontSize: 14,
      lineHeight: 1.55,
      color: 'rgba(255,255,255,0.72)'
    }
  }, "Align the cylinder with the lit refill port and push gently until the cyan ring confirms. Tap to continue once filled.")));
}
Object.assign(window, {
  OxyScreens: {
    ...(window.OxyScreens || {}),
    InflateScreen
  }
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mobile/inflateScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mobile/mapScreen.jsx
try { (() => {
// Map / Plateau Oxygen Station (小程序导航) — window.OxyScreens.MapScreen
function MapScreen({
  onGo
}) {
  const {
    PhoneShell,
    BackButton
  } = window.OxyParts;
  return /*#__PURE__*/React.createElement(PhoneShell, {
    bg: "#FDFDFD",
    statusInk: "#230309",
    homeLight: false
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: 393,
      height: 527,
      background: '#E8EEF0',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "393",
    height: "527",
    viewBox: "0 0 393 527",
    style: {
      position: 'absolute',
      inset: 0
    }
  }, /*#__PURE__*/React.createElement("g", {
    stroke: "#FDFDFD",
    strokeWidth: "13",
    fill: "none",
    strokeLinecap: "square"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M-20 120 L150 60 L420 150"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M-20 250 L160 200 L430 300"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M-20 410 L180 360 L210 527"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M70 -20 L120 230 L60 540"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M250 -20 L210 240 L300 540"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M360 40 L300 280 L360 540"
  })), /*#__PURE__*/React.createElement("g", {
    stroke: "#F1F5F6",
    strokeWidth: "6",
    fill: "none",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M-20 185 L430 150"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M-20 330 L430 360"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M170 -20 L150 540"
  }))), [[225, 118], [320, 120], [130, 318], [300, 300], [60, 430]].map(([x, y], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      position: 'absolute',
      left: x - 7,
      top: y - 7,
      width: 14,
      height: 14,
      borderRadius: '50%',
      background: '#C7D6D6',
      boxShadow: '0 0 0 4px #FDFDFD'
    }
  })), /*#__PURE__*/React.createElement("svg", {
    width: "230",
    height: "150",
    viewBox: "0 0 230 150",
    style: {
      position: 'absolute',
      left: 118,
      top: 175
    },
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M22 70 C 60 100, 70 40, 115 75 S 165 95, 196 60",
    stroke: "#031F1E",
    strokeWidth: "5",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M186 48 L202 58 L188 72",
    stroke: "#031F1E",
    strokeWidth: "5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 35,
      top: 206,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '9px 15px',
      background: '#031F1E',
      borderRadius: 12,
      boxShadow: '0 8px 22px rgba(2,24,23,0.20)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "13",
    cy: "4",
    r: "1.6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M13 8v5l3 2M9 21l2.5-6.5M11 13l-3 2"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--m-text)',
      fontWeight: 700,
      fontSize: 15,
      color: '#fff'
    }
  }, "5mins"))), /*#__PURE__*/React.createElement(BackButton, {
    onClick: () => {},
    top: 61,
    left: 30
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      top: 448,
      width: 393,
      height: 404,
      borderRadius: '40px 40px 0 0',
      background: 'linear-gradient(20deg, #021817 56%, #0B6F6A 240%)'
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: "assets/station-kiosk.png",
    alt: "Plateau oxygen station",
    style: {
      position: 'absolute',
      left: 206,
      top: 316,
      width: 168,
      height: 'auto',
      filter: 'drop-shadow(0 18px 26px rgba(2,24,23,0.22))'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 35,
      top: 486,
      width: 210,
      fontFamily: 'var(--m-display)',
      fontWeight: 700,
      fontSize: 25,
      lineHeight: 1.12,
      color: '#fff'
    }
  }, "Plateau Oxygen Station"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 35,
      top: 574,
      width: 149,
      height: 63,
      borderRadius: 14,
      background: 'rgba(255,255,255,0.05)',
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.2)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 18,
      top: 13,
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "13",
    cy: "4",
    r: "1.6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M13 8v5l3 2M9 21l2.5-6.5M11 13l-3 2"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--m-text)',
      fontWeight: 700,
      fontSize: 15,
      color: '#fff'
    }
  }, "5mins")), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 18,
      top: 38,
      fontFamily: 'var(--m-text)',
      fontSize: 12,
      color: 'rgba(255,255,255,0.5)'
    }
  }, "Walking time")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 208,
      top: 574,
      width: 149,
      height: 63,
      borderRadius: 14,
      background: 'rgba(255,255,255,0.05)',
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.2)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 18,
      top: 13,
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 2h6M10 2v3l-1.5 2.2A3 3 0 0 0 8 9.6V20a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V9.6a3 3 0 0 0-.5-1.6L15 5V2"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--m-text)',
      fontWeight: 700,
      fontSize: 15,
      color: '#fff'
    }
  }, "25")), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 18,
      top: 38,
      fontFamily: 'var(--m-text)',
      fontSize: 12,
      color: 'rgba(255,255,255,0.5)'
    }
  }, "Jar retention")), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 35,
      top: 667,
      fontFamily: 'var(--m-text)',
      fontSize: 14,
      color: 'rgba(255,255,255,0.8)'
    }
  }, "Details:"), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 35,
      top: 695,
      width: 324,
      fontFamily: 'var(--m-text)',
      fontSize: 12,
      lineHeight: 1.6,
      color: 'rgba(255,255,255,0.3)'
    }
  }, "Here are the detailed explanations Here are the detailed explanations Here are the detailed explanations Here are the detailed explanations"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      top: 746,
      width: 393,
      height: 106,
      borderRadius: '24px 24px 0 0',
      background: '#fff'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 35,
      top: 781,
      display: 'flex',
      alignItems: 'baseline',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      whiteSpace: 'nowrap',
      fontFamily: 'var(--m-text)',
      fontWeight: 800,
      fontSize: 22,
      color: '#031D1C'
    }
  }, "$ 0.52"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--m-text)',
      fontWeight: 600,
      fontSize: 14,
      color: '#031D1C'
    }
  }, "/Once")), /*#__PURE__*/React.createElement("button", {
    onClick: onGo,
    style: {
      position: 'absolute',
      left: 202,
      top: 765,
      width: 156,
      height: 52,
      borderRadius: 24,
      border: 'none',
      background: '#031F1E',
      color: '#fff',
      fontFamily: 'var(--m-text)',
      fontWeight: 700,
      fontSize: 16,
      cursor: 'pointer'
    }
  }, "Go Now"));
}
Object.assign(window, {
  OxyScreens: {
    ...(window.OxyScreens || {}),
    MapScreen
  }
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mobile/mapScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mobile/parts.jsx
try { (() => {
// Oxy Loop mobile kit — shared phone shell, status bar, back button.
// window.OxyParts.{ PhoneShell, BackButton }

function StatusBar({
  ink = '#021817'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: 393,
      height: 50,
      zIndex: 20,
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 28,
      top: 16,
      fontFamily: 'var(--m-text)',
      fontWeight: 700,
      fontSize: 15,
      letterSpacing: '-0.3px',
      color: ink
    }
  }, "9:41"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 20,
      top: 18,
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      color: ink
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "12",
    viewBox: "0 0 18 12",
    fill: "none"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "8",
    width: "3",
    height: "4",
    rx: "1",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "5",
    y: "5.5",
    width: "3",
    height: "6.5",
    rx: "1",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "10",
    y: "3",
    width: "3",
    height: "9",
    rx: "1",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "15",
    y: "0.5",
    width: "3",
    height: "11.5",
    rx: "1",
    fill: "currentColor"
  })), /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "12",
    viewBox: "0 0 17 12",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8.5 2.4c2.55 0 4.9 0.98 6.66 2.6l-1.4 1.5A7.4 7.4 0 0 0 8.5 4.5 7.4 7.4 0 0 0 3.24 6.5l-1.4-1.5A9.55 9.55 0 0 1 8.5 2.4Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.5 6.2c1.46 0 2.8 0.57 3.8 1.5l-1.45 1.5a3.3 3.3 0 0 0-4.7 0L4.7 7.7A5.4 5.4 0 0 1 8.5 6.2Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "8.5",
    cy: "10.3",
    r: "1.35",
    fill: "currentColor"
  })), /*#__PURE__*/React.createElement("svg", {
    width: "26",
    height: "13",
    viewBox: "0 0 26 13",
    fill: "none"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0.5",
    y: "0.7",
    width: "22",
    height: "11.6",
    rx: "3.3",
    stroke: "currentColor",
    strokeOpacity: "0.4"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "2.2",
    width: "18.5",
    height: "8.6",
    rx: "2",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M24 4.3v4.4c0.8-0.34 1.3-1.12 1.3-2.2 0-1.08-0.5-1.86-1.3-2.2Z",
    fill: "currentColor",
    fillOpacity: "0.4"
  }))));
}
function HomeIndicator({
  light = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: 393,
      height: 34,
      zIndex: 20,
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      paddingBottom: 9
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 140,
      height: 5,
      borderRadius: 100,
      background: light ? 'rgba(255,255,255,0.85)' : '#000'
    }
  }));
}
function PhoneShell({
  children,
  bg = '#FDFDFD',
  statusInk = '#021817',
  homeLight = false,
  showChrome = true
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 393,
      height: 852,
      background: bg,
      borderRadius: 47,
      overflow: 'hidden',
      flex: '0 0 auto',
      boxShadow: '0 40px 90px rgba(2,24,23,0.28), 0 0 0 1px rgba(2,24,23,0.06)'
    }
  }, children, showChrome && /*#__PURE__*/React.createElement(StatusBar, {
    ink: statusInk
  }), showChrome && /*#__PURE__*/React.createElement(HomeIndicator, {
    light: homeLight
  }));
}

// Floating white rounded-square back button (matches Figma: 36×36, r12, white .8)
function BackButton({
  onClick,
  top = 61,
  left = 30
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    "aria-label": "Back",
    style: {
      position: 'absolute',
      left,
      top,
      width: 36,
      height: 36,
      zIndex: 15,
      border: 'none',
      borderRadius: 12,
      background: 'rgba(255,255,255,0.85)',
      boxShadow: '0 2px 13px rgba(112,123,122,0.18)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backdropFilter: 'blur(4px)'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#495858",
    strokeWidth: "2.4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m15 18-6-6 6-6"
  })));
}
Object.assign(window, {
  OxyParts: {
    PhoneShell,
    BackButton,
    StatusBar,
    HomeIndicator
  }
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mobile/parts.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mobile/productScreen.jsx
try { (() => {
// Product detail / Rental oxygen cylinder (购买) — window.OxyScreens.ProductScreen
function ProductScreen({
  onBack,
  onBuy
}) {
  const {
    PhoneShell,
    BackButton
  } = window.OxyParts;
  const [qty, setQty] = React.useState(0);
  const recycleIcon = "M7 19H4.8a2 2 0 0 1-1.7-3l1.3-2.2M7.5 4.2 6.4 6.1m-.1-.1 2.6 1.5M17 5h2.2a2 2 0 0 1 1.7 3l-1.3 2.2M14 22l1.5-2.5M19.7 14l1.1 1.9a2 2 0 0 1-.6 2.7L18 22M9 11l3-5 3 5";
  const leafIcon = "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Zm0 0c0-4 1.5-8 6.5-11";
  return /*#__PURE__*/React.createElement(PhoneShell, {
    bg: "#fff",
    statusInk: "#230309",
    homeLight: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(192deg, #D3DEDE -9%, #E7F3F3 16%, #FFFFFF 96%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 172,
      top: -76,
      width: 228,
      height: 223,
      borderRadius: 200,
      background: 'rgba(202,255,252,0.2)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 300,
      top: 24,
      width: 228,
      height: 223,
      borderRadius: 200,
      background: 'rgba(202,255,214,0.2)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 120,
      top: 392,
      width: 180,
      height: 24,
      borderRadius: '50%',
      background: 'radial-gradient(ellipse, rgba(71,102,103,0.28), rgba(71,102,103,0) 70%)'
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: "assets/bottle.png",
    alt: "Rental oxygen cylinder",
    style: {
      position: 'absolute',
      left: '50%',
      top: 74,
      transform: 'translateX(-50%)',
      height: 350,
      filter: 'drop-shadow(0 22px 26px rgba(2,24,23,0.12))'
    }
  }), /*#__PURE__*/React.createElement(BackButton, {
    onClick: onBack,
    top: 61,
    left: 30
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 29,
      top: 452,
      width: 335
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--m-display)',
      fontWeight: 700,
      fontSize: 31,
      lineHeight: 1.08,
      color: 'rgba(2,24,23,0.9)'
    }
  }, "Rental oxygen cylinder"), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'rgba(0,0,0,0.06)',
      margin: '22px 0 20px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 37
    }
  }, [recycleIcon, leafIcon].map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "rgba(2,24,23,0.5)",
    strokeWidth: "1.7",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: d
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 9,
      fontFamily: 'var(--m-text)',
      fontWeight: 500,
      fontSize: 16,
      lineHeight: 1.25,
      color: 'rgba(28,47,46,0.32)'
    }
  }, "Reusable oxygen tank")))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      fontFamily: 'var(--m-text)',
      fontSize: 14,
      color: 'rgba(28,47,46,0.8)'
    }
  }, "Details:"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      fontFamily: 'var(--m-text)',
      fontSize: 12,
      lineHeight: 1.6,
      color: 'rgba(28,47,46,0.3)'
    }
  }, "Here are the detailed explanations Here are the detailed explanations Here are the detailed explanations Here are the detailed explanations")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      top: 746,
      width: 393,
      height: 106,
      borderRadius: '28px 28px 0 0',
      background: '#021817'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 30,
      top: 783,
      display: 'flex',
      alignItems: 'center',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setQty(q => Math.max(0, q - 1)),
    "aria-label": "Minus",
    style: stepBtn()
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    stroke: "rgba(255,255,255,0.8)",
    strokeWidth: "2.4",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "5",
    y1: "12",
    x2: "19",
    y2: "12"
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 14,
      textAlign: 'center',
      fontFamily: 'var(--m-text)',
      fontWeight: 700,
      fontSize: 20,
      color: '#fff'
    }
  }, qty), /*#__PURE__*/React.createElement("button", {
    onClick: () => setQty(q => Math.min(9, q + 1)),
    "aria-label": "Plus",
    style: stepBtn()
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    stroke: "rgba(255,255,255,0.8)",
    strokeWidth: "2.4",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "5",
    x2: "12",
    y2: "19"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "5",
    y1: "12",
    x2: "19",
    y2: "12"
  })))), /*#__PURE__*/React.createElement("button", {
    onClick: onBuy,
    style: {
      position: 'absolute',
      left: 152,
      top: 762,
      width: 213,
      height: 66,
      borderRadius: 22,
      border: 'none',
      background: '#4DD8D3',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--m-text)',
      fontWeight: 700,
      fontSize: 16,
      color: 'rgba(255,255,255,0.85)'
    }
  }, "$ ", (1.25 * Math.max(1, qty)).toFixed(2)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--m-text)',
      fontWeight: 500,
      fontSize: 20,
      color: '#fff'
    }
  }, "Purchase")));
}
function stepBtn() {
  return {
    width: 24,
    height: 24,
    padding: 0,
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };
}
Object.assign(window, {
  OxyScreens: {
    ...(window.OxyScreens || {}),
    ProductScreen
  }
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mobile/productScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mobile/recycleScreen.jsx
try { (() => {
// Recycle guide (基站回收指引 1/2/3) — window.OxyScreens.RecycleScreen
// step: 'mask' | 'bottle' | 'success'
function RecycleScreen({
  step = 'mask',
  onNext,
  onBack
}) {
  const {
    PhoneShell,
    BackButton
  } = window.OxyParts;
  const [inserted, setInserted] = React.useState(false);
  React.useEffect(() => {
    setInserted(false);
  }, [step]);
  const cfg = {
    mask: {
      n: '1',
      title: 'Put in your mask',
      body: 'After separating the oxygen mask from the cylinder, place it into the recycling chute below.',
      img: 'assets/mask.png',
      imgH: 108
    },
    bottle: {
      n: '2',
      title: 'Put in your bottle',
      body: 'Simply throw the bottle into the lower recycling slot to complete the recycling process.',
      img: 'assets/bottle.png',
      imgH: 150
    }
  }[step];
  if (step === 'success') {
    return /*#__PURE__*/React.createElement(PhoneShell, {
      bg: "#fff",
      statusInk: "#021817"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: 393,
        height: 632,
        background: '#E8F0EE',
        borderRadius: '0 0 28px 28px'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: 0,
        top: 120,
        width: 393,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 96,
        height: 96,
        borderRadius: '50%',
        background: '#35D3D9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 14px 32px rgba(53,211,217,0.4)'
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "50",
      height: "50",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "#fff",
      strokeWidth: "3",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M20 6 9 17l-5-5"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 30,
        fontFamily: 'var(--m-display)',
        fontWeight: 700,
        fontSize: 30,
        color: '#021817'
      }
    }, "Recycle successful"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 12,
        fontFamily: 'var(--m-text)',
        fontSize: 16,
        color: 'rgba(28,47,46,0.45)'
      }
    }, "Click Next to receive your souvenir")), /*#__PURE__*/React.createElement("button", {
      onClick: onNext,
      style: nextBtn(true)
    }, "Next"));
  }
  return /*#__PURE__*/React.createElement(PhoneShell, {
    bg: "#fff",
    statusInk: "#021817"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: 393,
      height: 632,
      background: '#E8F0EE',
      borderRadius: '0 0 28px 28px'
    }
  }), /*#__PURE__*/React.createElement(BackButton, {
    onClick: onBack,
    top: 62,
    left: 26
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 26,
      top: 116,
      display: 'flex',
      alignItems: 'center',
      gap: 13
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: '50%',
      background: '#1A2E2D',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--m-display)',
      fontWeight: 700,
      fontSize: 15,
      color: '#fff'
    }
  }, cfg.n), /*#__PURE__*/React.createElement("div", {
    style: {
      whiteSpace: 'nowrap',
      fontFamily: 'var(--m-display)',
      fontWeight: 700,
      fontSize: 23,
      color: '#1A2E2D'
    }
  }, cfg.title)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 28,
      top: 162,
      width: 330,
      fontFamily: 'var(--m-text)',
      fontSize: 15,
      lineHeight: 1.5,
      color: 'rgba(28,47,46,0.6)'
    }
  }, cfg.body), /*#__PURE__*/React.createElement("button", {
    onClick: () => setInserted(true),
    style: {
      position: 'absolute',
      left: '50%',
      top: 285,
      transform: 'translateX(-50%)',
      width: 236,
      height: 172,
      borderRadius: 22,
      background: '#D8E5E5',
      cursor: 'pointer',
      padding: 0,
      border: inserted ? '4px solid #35D3D9' : '2px solid rgba(53,211,217,0.35)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'border-color .2s'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: cfg.img,
    alt: cfg.title,
    style: {
      height: cfg.imgH,
      opacity: inserted ? 1 : 0.9,
      filter: 'drop-shadow(0 8px 14px rgba(2,24,23,0.12))'
    }
  }), inserted && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 14,
      bottom: 14,
      width: 26,
      height: 26,
      borderRadius: '50%',
      background: '#35D3D9',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "15",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "3.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6 9 17l-5-5"
  })))), /*#__PURE__*/React.createElement("button", {
    onClick: inserted ? onNext : undefined,
    disabled: !inserted,
    style: nextBtn(inserted)
  }, "Next"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      top: 786,
      width: 393,
      textAlign: 'center',
      fontFamily: 'var(--m-text)',
      fontSize: 14,
      color: 'rgba(28,47,46,0.35)'
    }
  }, "Lost or irrecoverable?"));
}
function nextBtn(enabled) {
  return {
    position: 'absolute',
    left: '50%',
    top: 702,
    transform: 'translateX(-50%)',
    width: 312,
    height: 62,
    borderRadius: 20,
    border: 'none',
    background: enabled ? '#1A2E2D' : '#B7BFBE',
    color: '#fff',
    fontFamily: 'var(--m-text)',
    fontWeight: 600,
    fontSize: 22,
    cursor: enabled ? 'pointer' : 'not-allowed',
    transition: 'background .2s'
  };
}
Object.assign(window, {
  OxyScreens: {
    ...(window.OxyScreens || {}),
    RecycleScreen
  }
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mobile/recycleScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mobile/redeemScreen.jsx
try { (() => {
// Redeem souvenir (基站兑换) — window.OxyScreens.RedeemScreen
function RedeemScreen({
  onRedeem,
  onBack
}) {
  const {
    PhoneShell,
    BackButton
  } = window.OxyParts;
  const [sel, setSel] = React.useState(1);
  const items = [{
    img: 'assets/souvenir-red.png'
  }, {
    img: 'assets/souvenir-blue.png'
  }, {
    img: 'assets/souvenir-red.png'
  }, {
    img: 'assets/souvenir-blue.png'
  }];
  const Tile = ({
    item,
    i
  }) => {
    const on = sel === i;
    return /*#__PURE__*/React.createElement("button", {
      onClick: () => setSel(i),
      style: {
        position: 'relative',
        width: 156,
        height: 126,
        borderRadius: 20,
        background: '#D8E5E5',
        padding: 0,
        cursor: 'pointer',
        border: on ? '4px solid #35D3D9' : '2px solid transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: item.img,
      alt: "Souvenir",
      style: {
        height: 96
      }
    }), on && /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        right: 10,
        bottom: 10,
        width: 24,
        height: 24,
        borderRadius: '50%',
        background: '#35D3D9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "#fff",
      strokeWidth: "3.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M20 6 9 17l-5-5"
    }))));
  };
  return /*#__PURE__*/React.createElement(PhoneShell, {
    bg: "#E9F3F2",
    statusInk: "#021817"
  }, /*#__PURE__*/React.createElement(BackButton, {
    onClick: onBack,
    top: 62,
    left: 26
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 30,
      top: 112,
      fontFamily: 'var(--m-display)',
      fontWeight: 700,
      fontSize: 26,
      color: 'rgba(2,24,23,0.9)'
    }
  }, "Choose a souvenir"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 30,
      top: 156,
      width: 333,
      fontFamily: 'var(--m-text)',
      fontSize: 14,
      lineHeight: 1.5,
      color: 'rgba(28,47,46,0.8)'
    }
  }, "The souvenir is made from plastic masks you recycled. Thanks for your efforts in protecting the environment!"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 30,
      top: 250,
      width: 333,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      rowGap: 14,
      columnGap: 21
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Tile, {
    item: it,
    i: i
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--m-text)',
      fontSize: 14,
      color: 'rgba(28,47,46,0.8)'
    }
  }, "Souvenir Name")))), /*#__PURE__*/React.createElement("button", {
    onClick: onRedeem,
    style: {
      position: 'absolute',
      left: '50%',
      top: 686,
      transform: 'translateX(-50%)',
      width: 260,
      height: 70,
      borderRadius: 22,
      border: 'none',
      background: '#1A2E2D',
      color: '#fff',
      fontFamily: 'var(--m-display)',
      fontWeight: 600,
      fontSize: 28,
      cursor: 'pointer',
      boxShadow: '0 16px 36px rgba(2,24,23,0.3)'
    }
  }, "Redeem"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: 393,
      height: 120,
      background: 'linear-gradient(180deg, rgba(233,243,242,0), #E9F3F2 70%)',
      pointerEvents: 'none'
    }
  }));
}
Object.assign(window, {
  OxyScreens: {
    ...(window.OxyScreens || {}),
    RedeemScreen
  }
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mobile/redeemScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mobile/rentRefillScreen.jsx
try { (() => {
// Rent / Refill select (Group 20232) — window.OxyScreens.RentRefillScreen
function RentRefillScreen({
  onRent,
  onRefill
}) {
  const {
    PhoneShell,
    BackButton
  } = window.OxyParts;
  const Half = ({
    bg,
    img,
    imgStyle,
    label,
    caption,
    onClick
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 393,
      height: 426,
      background: bg,
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 175,
      height: '100%',
      position: 'relative',
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: img,
    alt: caption,
    style: {
      position: 'absolute',
      ...imgStyle
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingRight: 18
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      width: 168,
      height: 74,
      borderRadius: 24,
      border: 'none',
      background: '#021817',
      color: '#fff',
      fontFamily: 'var(--m-display)',
      fontWeight: 600,
      fontSize: 28,
      cursor: 'pointer'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      fontFamily: 'var(--m-text)',
      fontSize: 14,
      color: 'rgba(28,47,46,0.4)'
    }
  }, caption)));
  return /*#__PURE__*/React.createElement(PhoneShell, {
    bg: "#fff",
    statusInk: "#021817"
  }, /*#__PURE__*/React.createElement(Half, {
    bg: "linear-gradient(180deg,#F1FAF9,#E7F3F2)",
    img: "assets/bottle.png",
    imgStyle: {
      left: 34,
      top: 88,
      height: 250
    },
    label: "Rent",
    caption: "Reusable oxygen canister",
    onClick: onRent
  }), /*#__PURE__*/React.createElement(Half, {
    bg: "#EFF7F6",
    img: "assets/rings-scene.png",
    imgStyle: {
      left: -26,
      top: 150,
      width: 240,
      WebkitMaskImage: 'radial-gradient(ellipse 80% 84% at 50% 50%, #000 60%, transparent 100%)',
      maskImage: 'radial-gradient(ellipse 80% 84% at 50% 50%, #000 60%, transparent 100%)'
    },
    label: "Refill",
    caption: "Reusable canister service",
    onClick: onRefill
  }), /*#__PURE__*/React.createElement(BackButton, {
    onClick: () => {},
    top: 62,
    left: 26
  }));
}
Object.assign(window, {
  OxyScreens: {
    ...(window.OxyScreens || {}),
    RentRefillScreen
  }
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mobile/rentRefillScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/mobile/scanScreen.jsx
try { (() => {
// Scan entry (基站扫码) — window.OxyScreens.ScanScreen
function ScanScreen({
  onScan
}) {
  const {
    PhoneShell
  } = window.OxyParts;
  return /*#__PURE__*/React.createElement(PhoneShell, {
    bg: "#E9F3F2",
    statusInk: "#021817"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/oxy-mark.svg",
    alt: "Oxy Loop",
    style: {
      position: 'absolute',
      left: 30,
      top: 70,
      width: 52
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '50%',
      top: 250,
      transform: 'translateX(-50%)',
      width: 248,
      height: 248,
      borderRadius: 24,
      background: '#fff',
      boxShadow: '0 0 0 6px rgba(53,211,217,0.45), 0 20px 50px rgba(2,24,23,0.12)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/qr.png",
    alt: "QR code",
    style: {
      width: 212,
      height: 212,
      mixBlendMode: 'multiply'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      top: 545,
      width: 393,
      textAlign: 'center',
      fontFamily: 'var(--m-display)',
      fontWeight: 600,
      fontSize: 24,
      color: '#021817'
    }
  }, "Scan"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      top: 585,
      width: 393,
      textAlign: 'center',
      fontFamily: 'var(--m-text)',
      fontSize: 15,
      lineHeight: 1.5,
      color: 'rgba(28,47,46,0.5)'
    }
  }, "Scan to register or log in at the station,", /*#__PURE__*/React.createElement("br", null), "then collect your oxygen kit."), /*#__PURE__*/React.createElement("button", {
    onClick: onScan,
    style: {
      position: 'absolute',
      left: '50%',
      top: 720,
      transform: 'translateX(-50%)',
      width: 312,
      height: 60,
      borderRadius: 20,
      border: 'none',
      background: '#1A2E2D',
      color: '#fff',
      fontFamily: 'var(--m-text)',
      fontWeight: 600,
      fontSize: 20,
      cursor: 'pointer'
    }
  }, "Scan now"));
}
Object.assign(window, {
  OxyScreens: {
    ...(window.OxyScreens || {}),
    ScanScreen
  }
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/mobile/scanScreen.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.StatusPill = __ds_scope.StatusPill;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Stepper = __ds_scope.Stepper;

__ds_ns.StepDots = __ds_scope.StepDots;

__ds_ns.TopBar = __ds_scope.TopBar;

__ds_ns.BottomSheet = __ds_scope.BottomSheet;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.SelectTile = __ds_scope.SelectTile;

__ds_ns.StatTile = __ds_scope.StatTile;

})();
