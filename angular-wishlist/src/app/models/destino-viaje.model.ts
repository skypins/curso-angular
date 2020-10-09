export class DestinoViaje {
    private selected: boolean;
    
    constructor(public nombre: string, public u: string) {}
    
    isSelected() {
        return this.selected;
    }

    setSelected(s: boolean) {
        this.selected = s;
    }
        
}
