export class DestinoViaje {
    private selected: boolean;
    public servicios: string[];
    
    constructor(public nombre: string, public u: string) {
        this.servicios = ['pileta', 'desayuno'];
    }
    
    isSelected() {
        return this.selected;
    }

    setSelected(s: boolean) {
        this.selected = s;
    }
        
}
