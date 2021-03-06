import { create, createSelect } from "https://js.sabae.cc/stdcomp.js";
import { ArrayUtil } from "https://js.sabae.cc/ArrayUtil.js";
import { CSV } from "https://js.sabae.cc/CSV.js";

class SelectTree extends HTMLElement {
  constructor(csv, opts = { showLabel: true }) {
    super();
    this.opts = opts;
    if (opts) {
      for (const name in opts) {
        if (opts[name] != null) {
          this.setAttribute(name, opts[name]);
        }
      }
    }
    this.init(csv);
  }
  async init(csv) {
    const src = this.getAttribute("src");
    if (src) {
      csv = await CSV.fetch(src);
    }
    if (!csv) {
      return;
    }
    const header = csv.shift();
    //console.log(header);
    this.csv = csv;
    this.make();
  }
  make(value) {
    //console.log("seltree make", value, this.csv)
    if (!value) {
      value = this.getAttribute("value");
    }
    //console.log("seltree make", value)
    const csv = this.csv;
    if (!csv) {
      createSelect([], this);
      return;
    }
    if (value && !Array.isArray(value)) {
      const ns = value.indexOf(" ");
      if (ns > 0) {
        value = value.substring(0, ns);
      }
      if (csv) {
        value = csv.find(line => line.find(l => l == value));
      }
    }
    
    const addSel = (selected, parent) => {
      parent.innerHTML = "";
      const n = selected.length;
      const csv2 = csv.filter(l => {
        for (let i = 0; i < selected.length; i++) {
          if (l[i] != selected[i])
            return false;
        }
        return true;
      });
      const ar = ArrayUtil.toUnique(csv2.map(line => line[n])).filter(a => a);
      if (ar.length == 0) {
        return;
      }
      const ar2 = this.opts.showLabel ? ar.map(a => {
        const line = csv2.find(line => line[n] == a);
        return a + " " + line[line.length - 1];
      }) : ar.slice();
      ar2.unshift("-");
      const c = create("span", parent);
      const sel = createSelect(ar2, c);
      const child = create("span", c);
      sel.onchange = () => {
        if (selected.length < csv[0].length - 2) {
          if (sel.value == "-") {
            child.innerHTML = "";
          } else {
            const seled = [...selected, sel.value.split(" ")[0]];
            addSel(seled, child);
          }
        }
        this._checkRequired();
      };
      if (value) {
        const v = value[n];
        sel.value = ar2[ar.findIndex(a => a == v) + 1];
        sel.onchange();
      }
      this._checkRequired();
    };
    addSel([], this);
  }
  get value() {
    const sel = this.querySelectorAll("select");
    if (!sel || sel.length == 0) {
      return null;
    }
    const v = sel[sel.length - 1].value;
    if (v != "-") {
      return v;
    }
    if (sel.length == 1) {
      return null;
    }
    return sel[sel.length - 2].value;
  }
  set value(v) {
    this.setAttribute("value", v);
    this.make(v);
    if (this.onchange) {
      this.onchange();
    }
  }
  _checkRequired() {
    if (this.getAttribute("required") == "required") {
      if (this.value) {
        this.querySelector("select")?.classList.remove("required");
      } else {
        this.querySelector("select")?.classList.add("required");
      }
    }
  }
}

customElements.define("select-tree", SelectTree);

export { SelectTree };
