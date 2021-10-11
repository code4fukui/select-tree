import { create, createSelect } from "https://js.sabae.cc/stdcomp.js";
import { ArrayUtil } from "https://js.sabae.cc/ArrayUtil.js";
import { CSV } from "https://js.sabae.cc/CSV.js";

class SelectTree extends HTMLElement {
  constructor(csv) {
    super();
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
    const csv = this.csv;
    if (value) {
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
      const ar = ArrayUtil.toUnique(csv2.map(line => line[n]));
      const ar2 = ar.map(a => {
        const line = csv2.find(line => line[n] == a);
        return a + " " + line[line.length - 1];
      });
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
      };
      if (value) {
        const v = value[n];
        sel.value = ar2[ar.findIndex(a => a == v) + 1];
        sel.onchange();
      }
    };
    addSel([], this);
  }
  get value() {
    const sel = this.querySelectorAll("select");
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
    this.make(v);
    if (this.onchange) {
      this.onchange();
    }
  }
}

customElements.define("select-tree", SelectTree);

export { SelectTree };
