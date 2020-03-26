import {makeStyles} from "@material-ui/core/styles";

export default makeStyles({
  code: {
    "& code[class*=language-], pre[class*=language-]": {
      color: "#ccc",
      background: "none",
      fontFamily: "Consolas, Monaco, Andale Mono, Ubuntu Mono, monospace",
      textAlign: "left",
      whiteSpace: "pre",
      wordSpacing: "normal",
      wordBreak: "normal",
      wordWrap: "normal",
      lineHeight: "1.5",
      MozTabSize: "4",
      OTabSize: "4",
      tabSize: "4",
      WebkitHyphens: "none",
      msHyphens: "none",
      hyphens: "none"
    },
    "& pre[class*=language-]": {
      padding: "1em",
      margin: ".5em 0",
      overflow: "auto"
    },
    "& :not(pre) code[class*=language-], pre[class*=language-]": {
      background: "#2d2d2d"
    },
    "& :not(pre) code[class*=language-]": {
      padding: ".1em",
      borderRadius: ".3em",
      whiteSpace: "normal"
    },
    "& .token.block-comment, .token.cdata, .token.comment, .token.doctype, .token.prolog": {
      color: "#999"
    },
    "& .token.punctuation": {color: "#ccc"},
    "& .token.attr-name, .token.deleted, .token.namespace, .token.tag": {
      color: "#e2777a"
    },
    "& .token.function-name": {color: "#6196cc"},
    "& .token.boolean, .token.function, .token.number": {color: "#f08d49"},
    "& .token.class-name, .token.constant, .token.property, .token.symbol": {
      color: "#f8c555"
    },
    "& .token.atrule, .token.builtin, .token.important, .token.keyword, .token.selector": {
      color: "#cc99cd"
    },
    "& .token.attr-value, .token.char, .token.regex, .token.string, .token.variable": {
      color: "#7ec699"
    },
    "& .token.entity, .token.operator, .token.url": {color: "#67cdcc"},
    "& .token.bold, .token.important": {fontWeight: "700"},
    "& .token.italic": {fontStyle: "italic"},
    "& .token.entity": {cursor: "help"},
    "& .token.inserted": {color: "green"},
    "& .bf-container .public-DraftEditor-content .braft-code-block-wrapper": {
      margin: "10px 0",
      backgroundColor: "#21242a",
      borderRadius: "3px"
    },
    "& .bf-container .public-DraftEditor-content .braft-code-block-wrapper .braft-code-block-header": {
      position: "relative",
      zIndex: 2,
      height: "30px"
    },
    "& .bf-container .public-DraftEditor-content .braft-code-block-wrapper .braft-code-block-header .syntax-switcher": {
      position: "relative",
      width: "120px",
      height: "28px"
    },
    "& .bf-container .public-DraftEditor-content .braft-code-block-wrapper .braft-code-block-header .syntax-switcher:hover span": {
      backgroundColor: "#fff",
      borderColor: "rgba(0, 0, 0, .1)",
      color: "#333"
    },
    "& .bf-container .public-DraftEditor-content .braft-code-block-wrapper .braft-code-block-header .syntax-switcher:hover .syntax-list": {
      display: "block"
    },
    "& .bf-container .public-DraftEditor-content .braft-code-block-wrapper .braft-code-block-header .syntax-switcher span": {
      position: "absolute",
      boxSizing: "border-box",
      top: "8px",
      left: "5px",
      display: "block",
      width: "120px",
      height: "28px",
      backgroundClip: "padding-box",
      paddingLeft: "10px",
      border: "1px solid transparent",
      borderRadius: "3px 3px 0 0",
      color: "#888",
      fontSize: "12px",
      lineHeight: "26px",
      cursor: "pointer",
      userSelect: "none"
    },
    "& .bf-container .public-DraftEditor-content .braft-code-block-wrapper .braft-code-block-header .syntax-list": {
      position: "absolute",
      boxSizing: "border-box",
      top: "34px",
      left: "5px",
      display: "none",
      width: "120px",
      height: "auto",
      maxHeight: "300px",
      margin: "0",
      padding: "0",
      listStyle: "none",
      overflow: "auto",
      backgroundColor: "#fff",
      backgroundClip: "padding-box",
      border: "1px solid rgba(0, 0, 0, .1)",
      borderRadius: "0 0 3px 3px",
      boxShadow: "1px 5px 10px rgba(0, 0, 0, .1)"
    },
    "& .bf-container .public-DraftEditor-content .braft-code-block-wrapper .braft-code-block-header .syntax-list li": {
      paddingLeft: "10px",
      lineHeight: "30px",
      color: "#666",
      fontSize: "12px",
      cursor: "pointer"
    },
    "& .bf-container .public-DraftEditor-content .braft-code-block-wrapper .braft-code-block-header .syntax-list li:hover": {
      backgroundColor: "#f1f1f1"
    },
    "& .bf-container .public-DraftEditor-content .braft-code-block-wrapper .braft-code-block": {
      maxHeight: "400px",
      margin: "0",
      overflow: "auto",
      backgroundColor: "transparent",
      color: "#eee",
      counterReset: "a"
    },
    "& .bf-container .public-DraftEditor-content .braft-code-block-wrapper .braft-code-block.show-line-number code": {
      display: "block",
      position: "relative",
      marginLeft: "55px"
    },
    "& .bf-container .public-DraftEditor-content .braft-code-block-wrapper .braft-code-block.show-line-number code:before": {
      position: "absolute",
      top: "0",
      left: "-55px",
      width: "40px",
      counterIncrement: "a",
      content: "counter(a)",
      display: "inline-block",
      borderRight: "1px solid hsla(0, 0%, 100%, .1)",
      color: "#666"
    },
    "& .bf-container .public-DraftEditor-content .braft-code-block-wrapper .braft-code-block.show-line-number code:hover:before": {
      color: "#ddd"
    }
  }
});
