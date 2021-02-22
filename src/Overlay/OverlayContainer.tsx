import * as React from 'react';
import { OverlayItem } from './OverlayItem';
import { overlayService } from './OverlayService';

export const OverlayContainer = () => {
    const [items, setItems] = React.useState([]);
    const onUpdate = () => {
        setItems([...overlayService.getItems()]);
    };

    React.useEffect(() => {
        overlayService.subscribe(onUpdate);
    }, []);

    const onCloseItem = (item: OverlayItem) => (param: any) => {
        overlayService.remove(item.id);
        item.resolve(param ? param.$value : null);
    };

    return (
        <div>
            {items.map((item) => {
                const WrappedComponent = item.component;
                return <WrappedComponent key={item.id} {...item.props} close={onCloseItem(item)} />;
            })}
        </div>
    );
};
