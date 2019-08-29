import { _decorator, Component, Prefab, ScrollViewComponent, Node } from "cc";
const { ccclass, property } = _decorator;
import { HomeUI } from "./HomeUI";

@ccclass
export class BackPackUI extends Component {
    @property({
        type: Prefab
    })
    slotPrefab: Prefab | null = null;
    @property({
        type: ScrollViewComponent
    })
    scrollView: ScrollViewComponent | null = null;
    @property
    totalCount = 0;

    public home: HomeUI | null = null;
    public heroSlots: Node[] = [];

    init(home: HomeUI) {
        this.heroSlots.length = 0;
        this.home = home;
        for (let i = 0; i < this.totalCount; ++i) {
            let heroSlot = this.addHeroSlot();
            this.heroSlots.push(heroSlot);
        }
    }

    addHeroSlot() {
        let heroSlot = cc.instantiate(this.slotPrefab);
        this.scrollView.content.addChild(heroSlot);
        return heroSlot;
    }

    show() {
        this.node.active = true;
        this.node.emit('fade-in');
        this.home.toggleHomeBtns(false);
    }

    hide() {
        this.node.active = false;
        this.node.emit('fade-out');
        this.home.toggleHomeBtns(true);
    }
}