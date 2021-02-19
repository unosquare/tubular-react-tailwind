import { SimpleObservable } from 'uno-js';
import { OverlayItem } from './OverlayItem';

class OverlayService extends SimpleObservable {
    private items: OverlayItem[] = [];

    public getItems() {
        return this.items;
    }

    public addItem(itemComponent: React.FunctionComponent<any>, props: any = {}) {
        return new Promise((resolve, reject) => {
            const item: OverlayItem = new OverlayItem();
            item.id = 'id' + new Date().valueOf().toString();
            item.component = itemComponent;
            item.props = props;
            item.resolve = resolve;
            item.reject = reject;

            this.items.push(item);
            this.inform();
        });
    }

    public remove(modalId: string) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === modalId) {
                this.items.splice(i, 1);
                this.inform();
                break;
            }
        }
    }
}

export const overlayService = new OverlayService();
