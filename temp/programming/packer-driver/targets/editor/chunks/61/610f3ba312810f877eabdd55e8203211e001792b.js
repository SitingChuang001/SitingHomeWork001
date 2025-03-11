System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, sp, _dec, _class, _crd, ccclass, property, boyPrefab;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      sp = _cc.sp;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "2e4f4kjSGxL04g4EP9wTMcQ", "boyPrefab", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'sp']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("boyPrefab", boyPrefab = (_dec = ccclass('boyPrefab'), _dec(_class = class boyPrefab extends Component {
        constructor(...args) {
          super(...args);
          this.allReadyWin = false;
          this.spine = void 0;
          this[89] = void 0;
        }

        start() {
          this.spine = this.node.getComponent(sp.Skeleton);
        }

        init() {
          this.allReadyWin = false;
        }

        update(deltaTime) {}

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=610f3ba312810f877eabdd55e8203211e001792b.js.map