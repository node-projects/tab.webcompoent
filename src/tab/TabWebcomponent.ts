import { BaseCustomWebComponentConstructorAppend, css, html } from "@node-projects/base-custom-webcomponent";

export class TabWebcomponent extends BaseCustomWebComponentConstructorAppend {

    public static override readonly style = css`
            :host {
                display: block;
                background: lightgray
            }

            .tab-header-container {
                height: 30px;
                display: flex;
                user-select: none; 
                flex-direction: row; 
                cursor: pointer; 
                background: inherit;
            }

            .tab-header-container > div {
                padding: 5px;
            }
            
            .tab-container {
                height: calc(100% - 30px);
                overflow: none;
            }
            `;

    public static override readonly template = html`
            <div style="display: flex; flex-direction: column; height: 100%; width: 100%;">
                <div id="tabs" class="tab-header-container" style="height: 30px;"></div>
                <div id="panels" class="tab-container">
                    <slot></slot>
                </div>
            </div>
        `;

    public static readonly is = 'node-projects-tab';

    public static properties = {
        selectedIndex: Number
    }

    private _tabs: HTMLDivElement;
    private _selectedIndex = 0;
    private _oldIndex: number;
    private _isInitialized = false;

    public get selectedIndex() {
        return this._selectedIndex;
    }
    public set selectedIndex(value) {
        this._selectedIndex = value;
        this._selectedIndexChanged();
    }

    constructor() {
        super();
        this._restoreCachedInititalValues();

        this._tabs = this._getDomElement<HTMLDivElement>('tabs');
    }

    ready() {
        this._parseAttributesToProperties();

        for (let item of this.children as unknown as HTMLElement[]) {
            const div = document.createElement('div');
            div.innerText = item.getAttribute('header');
            div.onclick = (e) => this._headerClick(e);
            this._tabs.appendChild(div);
        }

        this._oldIndex = -1;
        this._selectedIndexChanged();
        this._isInitialized = true;
    }

    _headerClick(e) {
        this.selectedIndex = Array.from(this._tabs.children).indexOf(e.target);
        e.target.focus();
        this.refresh();
    }

    _selectedIndexChanged() {
        if (this._oldIndex != this.selectedIndex) {
            const old = this._oldIndex;
            this._oldIndex = this.selectedIndex;
            let i = 0;
            for (const item of this.children as any as HTMLElement[]) {
                if (i == this.selectedIndex) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
                i++;
            }
            i = 0;
            for (const item of this._tabs.children as any as HTMLElement[]) {
                if (i == this.selectedIndex) {
                    item.style.background = 'white';
                } else {
                    item.style.background = '';
                }
                i++;
            }
            if (this._isInitialized && this._oldIndex != -1) {
                this.dispatchEvent(new CustomEvent("selected-index-changed", {
                    detail: {
                        selectedIndex: this.selectedIndex,
                        oldIndex: old
                    }
                }))
            }
        }
    }

    public refresh() {
        this._oldIndex = -1;
        this._selectedIndexChanged();
    }
}

customElements.define(TabWebcomponent.is, TabWebcomponent);