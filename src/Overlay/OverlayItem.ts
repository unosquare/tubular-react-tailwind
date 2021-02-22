import { OverlayItemProps } from './OverlayItemProps';

export class OverlayItem<P extends OverlayItemProps = OverlayItemProps> {
    public id: string;
    public component: React.FunctionComponent<P>;
    public props: any;
    public resolve: any;
    public reject: any;
}
